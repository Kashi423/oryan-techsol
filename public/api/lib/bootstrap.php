<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Shared setup for every API entry point (index.php, install.php): error handling, config
// loading and the tiny set of helper classes. Requires PHP 8.1+, PDO (MySQL or SQLite).

if (version_compare(PHP_VERSION, '8.1.0', '<')) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'php_version', 'message' => 'PHP 8.1 or newer is required.']);
    exit;
}

date_default_timezone_set('UTC');
mb_internal_encoding('UTF-8');
ini_set('display_errors', '0');
ini_set('log_errors', '1');

final class HttpError extends Exception
{
    public function __construct(public int $status, string $message, public array $extra = [])
    {
        parent::__construct($message);
    }
}

final class Cfg
{
    private static ?array $data = null;

    public static function load(): array
    {
        if (self::$data !== null) {
            return self::$data;
        }
        $file = API_DIR . '/config.php';
        if (!is_file($file)) {
            throw new HttpError(503, 'The API is not configured yet (config.php is missing).');
        }
        $loaded = require $file;
        if (!is_array($loaded)) {
            throw new HttpError(503, 'config.php must return an array.');
        }
        self::$data = $loaded;
        return self::$data;
    }

    public static function get(string $path, mixed $default = null): mixed
    {
        $node = self::load();
        foreach (explode('.', $path) as $key) {
            if (!is_array($node) || !array_key_exists($key, $node)) {
                return $default;
            }
            $node = $node[$key];
        }
        return $node;
    }

    public static function debug(): bool
    {
        try {
            return (bool) self::get('debug', false);
        } catch (Throwable) {
            return false;
        }
    }
}

final class Http
{
    public static function json(mixed $data, int $status = 200, array $headers = []): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        if (!isset($headers['Cache-Control'])) {
            header('Cache-Control: no-store');
        }
        foreach ($headers as $name => $value) {
            header($name . ': ' . $value);
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE | JSON_PARTIAL_OUTPUT_ON_ERROR);
        exit;
    }

    public static function method(): string
    {
        return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    }

    /** Parsed request body: JSON object, or form fields. Capped to $maxBytes. */
    public static function body(int $maxBytes = 1_048_576): array
    {
        $length = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
        if ($length > $maxBytes) {
            throw new HttpError(413, 'Request body is too large.');
        }
        $type = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
        if (str_contains($type, 'application/json')) {
            $raw = file_get_contents('php://input', false, null, 0, $maxBytes + 1);
            if ($raw === false || $raw === '') {
                return [];
            }
            if (strlen($raw) > $maxBytes) {
                throw new HttpError(413, 'Request body is too large.');
            }
            $data = json_decode($raw, true);
            if (!is_array($data)) {
                throw new HttpError(400, 'Invalid JSON body.');
            }
            return $data;
        }
        return $_POST;
    }

    public static function host(): string
    {
        return strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    }

    public static function isHttps(): bool
    {
        return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || strtolower((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';
    }

    /**
     * Browsers always send Origin on cross-site POSTs. If it is present it must be this site
     * (or an allowed origin). A missing Origin (curl, some privacy modes) is tolerated here —
     * admin routes additionally require the session + CSRF token.
     */
    public static function checkOrigin(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if ($origin === '') {
            return;
        }
        $host = strtolower((string) parse_url($origin, PHP_URL_HOST));
        $port = parse_url($origin, PHP_URL_PORT);
        $originHost = $host . ($port ? ':' . $port : '');
        $allowed = array_map('strtolower', (array) Cfg::get('allowed_origins', []));
        if ($originHost === self::host() || in_array(strtolower($origin), $allowed, true)) {
            return;
        }
        throw new HttpError(403, 'Cross-origin request blocked.');
    }

    public static function ip(): string
    {
        return (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
    }

    /** Stable, non-reversible token for a visitor IP (never store raw IPs). */
    public static function ipHash(): string
    {
        return substr(hash_hmac('sha256', self::ip(), (string) Cfg::get('install_key', 'oryan')), 0, 32);
    }

    public static function str(mixed $value, int $max = 255): string
    {
        if (!is_scalar($value)) {
            return '';
        }
        $text = trim((string) $value);
        $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $text) ?? '';
        return mb_substr($text, 0, $max);
    }

    public static function intval(mixed $value, int $default = 0, int $min = PHP_INT_MIN, int $max = PHP_INT_MAX): int
    {
        if (!is_numeric($value)) {
            return $default;
        }
        return max($min, min($max, (int) $value));
    }

    /** Collapse CR/LF so a value can never inject extra email headers. */
    public static function headerSafe(string $value): string
    {
        return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
    }
}

final class Db
{
    private static ?PDO $pdo = null;

    public static function driver(): string
    {
        return (string) Cfg::get('db.driver', 'mysql');
    }

    public static function pdo(): PDO
    {
        if (self::$pdo !== null) {
            return self::$pdo;
        }
        $db = (array) Cfg::get('db', []);
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];
        try {
            if (self::driver() === 'sqlite') {
                $path = (string) ($db['path'] ?? (API_DIR . '/storage/dev.sqlite'));
                self::$pdo = new PDO('sqlite:' . $path, null, null, $options);
                self::$pdo->exec('PRAGMA journal_mode = WAL');
            } else {
                $dsn = sprintf(
                    'mysql:host=%s;dbname=%s;charset=%s',
                    $db['host'] ?? 'localhost',
                    $db['name'] ?? '',
                    $db['charset'] ?? 'utf8mb4',
                );
                $options[PDO::ATTR_EMULATE_PREPARES] = false;
                self::$pdo = new PDO($dsn, (string) ($db['user'] ?? ''), (string) ($db['pass'] ?? ''), $options);
            }
        } catch (PDOException $e) {
            throw new HttpError(503, 'Could not connect to the database.' . (Cfg::debug() ? ' ' . $e->getMessage() : ''));
        }
        return self::$pdo;
    }

    public static function now(): string
    {
        return gmdate('Y-m-d H:i:s');
    }

    public static function all(string $sql, array $params = []): array
    {
        $stmt = self::pdo()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function one(string $sql, array $params = []): ?array
    {
        $stmt = self::pdo()->prepare($sql);
        $stmt->execute($params);
        $row = $stmt->fetch();
        return $row === false ? null : $row;
    }

    public static function val(string $sql, array $params = []): mixed
    {
        $stmt = self::pdo()->prepare($sql);
        $stmt->execute($params);
        $value = $stmt->fetchColumn();
        return $value === false ? null : $value;
    }

    public static function exec(string $sql, array $params = []): int
    {
        $stmt = self::pdo()->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }

    /** @param array<string,mixed> $data column => value (column names are code-controlled) */
    public static function insert(string $table, array $data): int
    {
        $columns = array_keys($data);
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $table,
            implode(', ', $columns),
            implode(', ', array_fill(0, count($columns), '?')),
        );
        self::exec($sql, array_values($data));
        return (int) self::pdo()->lastInsertId();
    }

    /** @param array<string,mixed> $data */
    public static function update(string $table, array $data, string $where, array $params = []): int
    {
        $sets = implode(', ', array_map(static fn(string $c): string => $c . ' = ?', array_keys($data)));
        return self::exec("UPDATE $table SET $sets WHERE $where", [...array_values($data), ...$params]);
    }

    public static function setting(string $key, ?string $default = null): ?string
    {
        $value = self::val('SELECT v FROM settings WHERE k = ?', [$key]);
        return $value === null ? $default : (string) $value;
    }

    public static function setSetting(string $key, string $value): void
    {
        if (self::val('SELECT COUNT(*) FROM settings WHERE k = ?', [$key])) {
            self::exec('UPDATE settings SET v = ? WHERE k = ?', [$value, $key]);
        } else {
            self::exec('INSERT INTO settings (k, v) VALUES (?, ?)', [$key, $value]);
        }
    }
}

final class Rate
{
    /** Counts hits for a bucket in the last $window seconds; records this one when $record. */
    public static function hits(string $bucket, int $window): int
    {
        $since = gmdate('Y-m-d H:i:s', time() - $window);
        return (int) Db::val('SELECT COUNT(*) FROM rate_hits WHERE bucket = ? AND created_at >= ?', [$bucket, $since]);
    }

    public static function hit(string $bucket): void
    {
        Db::insert('rate_hits', ['bucket' => $bucket, 'created_at' => Db::now()]);
        // Opportunistic clean-up so the table never grows unbounded.
        if (random_int(1, 40) === 1) {
            Db::exec('DELETE FROM rate_hits WHERE created_at < ?', [gmdate('Y-m-d H:i:s', time() - 86400 * 2)]);
        }
    }

    /** Throws 429 when the bucket already has $max hits in the window; otherwise records one. */
    public static function limit(string $bucket, int $max, int $window, string $message = 'Too many requests. Please try again later.'): void
    {
        if (self::hits($bucket, $window) >= $max) {
            throw new HttpError(429, $message);
        }
        self::hit($bucket);
    }
}

set_exception_handler(static function (Throwable $e): void {
    if ($e instanceof HttpError) {
        Http::json(['error' => true, 'message' => $e->getMessage()] + $e->extra, $e->status);
    }
    $log = API_DIR . '/storage/error.log';
    @file_put_contents($log, '[' . gmdate('c') . '] ' . get_class($e) . ': ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine() . "\n", FILE_APPEND);
    $message = Cfg::debug() ? $e->getMessage() : 'Something went wrong on the server.';
    Http::json(['error' => true, 'message' => $message], 500);
});

require_once __DIR__ . '/Schema.php';
require_once __DIR__ . '/Auth.php';
require_once __DIR__ . '/Mailer.php';
require_once __DIR__ . '/Content.php';
require_once __DIR__ . '/Uploads.php';
require_once __DIR__ . '/Router.php';
