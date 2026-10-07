<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Admin authentication: PHP sessions (HttpOnly, SameSite=Strict, Secure on HTTPS), bcrypt/argon
// password hashes, login throttling, per-session CSRF token, and an audit trail.
final class Auth
{
    private static bool $started = false;
    private static ?array $user = null;

    public static function start(): void
    {
        if (self::$started) {
            return;
        }
        $dir = API_DIR . '/storage/sessions';
        if (!is_dir($dir)) {
            @mkdir($dir, 0700, true);
        }
        if (is_dir($dir) && is_writable($dir)) {
            session_save_path($dir);
        }
        session_name((string) Cfg::get('session_name', 'oryan_admin'));
        ini_set('session.use_strict_mode', '1');
        ini_set('session.use_only_cookies', '1');
        ini_set('session.gc_maxlifetime', '28800');
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'secure' => Http::isHttps(),
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
        session_start();
        self::$started = true;
    }

    public static function user(): ?array
    {
        self::start();
        if (self::$user !== null) {
            return self::$user;
        }
        $id = (int) ($_SESSION['uid'] ?? 0);
        if ($id <= 0) {
            return null;
        }
        $row = Db::one('SELECT id, email, name, role, active FROM users WHERE id = ?', [$id]);
        if ($row === null || !(int) $row['active']) {
            self::logout();
            return null;
        }
        return self::$user = $row;
    }

    public static function require(?string $role = null): array
    {
        $user = self::user();
        if ($user === null) {
            throw new HttpError(401, 'Please sign in.');
        }
        if ($role !== null && $user['role'] !== $role) {
            throw new HttpError(403, 'You do not have permission to do that.');
        }
        return $user;
    }

    public static function csrf(): string
    {
        self::start();
        if (empty($_SESSION['csrf'])) {
            $_SESSION['csrf'] = bin2hex(random_bytes(32));
        }
        return (string) $_SESSION['csrf'];
    }

    /** State-changing admin requests must carry the session's CSRF token and a same-site Origin. */
    public static function verifyCsrf(): void
    {
        Http::checkOrigin();
        $sent = (string) ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
        if ($sent === '' || !hash_equals(self::csrf(), $sent)) {
            throw new HttpError(403, 'Your session expired. Please refresh the page and try again.');
        }
    }

    public static function login(string $email, string $password): array
    {
        $email = strtolower(Http::str($email, 190));
        $ipBucket = 'login:ip:' . Http::ipHash();
        $userBucket = 'login:user:' . substr(hash('sha256', $email), 0, 32);
        if (Rate::hits($ipBucket, 900) >= 10 || Rate::hits($userBucket, 900) >= 5) {
            throw new HttpError(429, 'Too many sign-in attempts. Please wait 15 minutes and try again.');
        }

        $row = Db::one('SELECT * FROM users WHERE email = ?', [$email]);
        // Always run a hash comparison so timing doesn't reveal whether the email exists.
        $hash = $row['password_hash'] ?? password_hash(bin2hex(random_bytes(8)), PASSWORD_DEFAULT);
        $valid = password_verify($password, $hash) && $row !== null && (int) $row['active'] === 1;

        if (!$valid) {
            Rate::hit($ipBucket);
            Rate::hit($userBucket);
            throw new HttpError(401, 'Incorrect email or password.');
        }

        self::start();
        session_regenerate_id(true);
        $_SESSION['uid'] = (int) $row['id'];
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
        Db::update('users', ['last_login_at' => Db::now()], 'id = ?', [$row['id']]);
        if (password_needs_rehash($row['password_hash'], PASSWORD_DEFAULT)) {
            Db::update('users', ['password_hash' => password_hash($password, PASSWORD_DEFAULT)], 'id = ?', [$row['id']]);
        }
        self::$user = ['id' => $row['id'], 'email' => $row['email'], 'name' => $row['name'], 'role' => $row['role'], 'active' => 1];
        self::audit('login');
        return self::$user;
    }

    public static function logout(): void
    {
        self::start();
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $p = session_get_cookie_params();
            setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => $p['path'], 'secure' => $p['secure'], 'httponly' => true, 'samesite' => 'Strict']);
        }
        @session_destroy();
        self::$user = null;
    }

    public static function checkPasswordStrength(string $password): void
    {
        if (mb_strlen($password) < 10) {
            throw new HttpError(422, 'Use a password of at least 10 characters.');
        }
        if (mb_strlen($password) > 200) {
            throw new HttpError(422, 'That password is too long.');
        }
    }

    public static function createUser(string $email, string $name, string $password, string $role = 'admin'): int
    {
        $email = strtolower(Http::str($email, 190));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new HttpError(422, 'Enter a valid email address.');
        }
        self::checkPasswordStrength($password);
        if (Db::val('SELECT COUNT(*) FROM users WHERE email = ?', [$email])) {
            throw new HttpError(409, 'A user with that email already exists.');
        }
        return Db::insert('users', [
            'email' => $email,
            'name' => Http::str($name, 120) ?: $email,
            'password_hash' => password_hash($password, PASSWORD_DEFAULT),
            'role' => $role === 'editor' ? 'editor' : 'admin',
            'active' => 1,
            'created_at' => Db::now(),
        ]);
    }

    public static function audit(string $action, ?string $entity = null, string|int|null $entityId = null, ?string $detail = null): void
    {
        try {
            $user = self::$user;
            Db::insert('audit_log', [
                'user_id' => (int) ($user['id'] ?? 0),
                'user_email' => $user['email'] ?? null,
                'action' => $action,
                'entity' => $entity,
                'entity_id' => $entityId === null ? null : (string) $entityId,
                'detail' => $detail === null ? null : mb_substr($detail, 0, 500),
                'created_at' => Db::now(),
            ]);
        } catch (Throwable) {
            // Auditing must never break the action itself.
        }
    }
}
