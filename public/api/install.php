<?php
declare(strict_types=1);

// One-time setup wizard: creates the database tables, your first admin account and (optionally)
// loads the site's current blog/team/portfolio content into the database.
//
// Open:  https://YOUR-SITE/api/install.php?key=<install_key from config.php>
// It locks itself after a successful install (storage/installed.lock). Steps: docs/ADMIN-SETUP.md

define('ORYAN_API', true);
define('API_DIR', __DIR__);
require __DIR__ . '/lib/bootstrap.php';

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function page(string $title, string $body): never
{
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . h($title) . '</title>'
        . '<style>body{font-family:system-ui,sans-serif;background:#030f2d;color:#e8eefc;margin:0;padding:32px 16px}main{max-width:560px;margin:0 auto;background:#0a1d4a;border:1px solid #1d3a7a;border-radius:16px;padding:28px}'
        . 'h1{margin:0 0 8px;font-size:22px}p,li{line-height:1.55;color:#b9c6e4}label{display:block;margin:14px 0 6px;font-weight:600;color:#fff}input[type=text],input[type=email],input[type=password]{width:100%;box-sizing:border-box;padding:11px 12px;border-radius:10px;border:1px solid #2b4a90;background:#06143a;color:#fff;font-size:15px}'
        . 'button{margin-top:20px;background:#0fd1e8;color:#03112b;border:0;border-radius:999px;padding:12px 22px;font-weight:700;font-size:15px;cursor:pointer}.ok{color:#4ade80}.bad{color:#ff8a8a}code{background:#06143a;padding:2px 6px;border-radius:6px}.box{background:#06143a;border-radius:10px;padding:12px 14px;margin:12px 0}</style></head><body><main>'
        . $body . '</main></body></html>';
    exit;
}

try {
    $key = (string) ($_GET['key'] ?? $_POST['key'] ?? '');
    $expected = (string) Cfg::get('install_key', '');
    if ($expected === '' || str_starts_with($expected, 'CHANGE-ME') || strlen($expected) < 24) {
        page('Setup', '<h1>Set an install key first</h1><p>Open <code>config.php</code> on the server and set <code>install_key</code> to a long random string (at least 24 characters). Then open this page again with <code>?key=YOUR_KEY</code>.</p>');
    }
    if (!hash_equals($expected, $key)) {
        http_response_code(403);
        page('Setup', '<h1>Access denied</h1><p>Open this page with <code>?key=</code> followed by the <code>install_key</code> from your <code>config.php</code>.</p>');
    }

    @mkdir(API_DIR . '/storage', 0700, true);
    if (is_file(API_DIR . '/storage/installed.lock')) {
        // Lost-password recovery: with the install key, set a new password for an existing account.
        if (($_GET['reset'] ?? $_POST['reset'] ?? '') === '1') {
            $resetEmail = strtolower(Http::str($_POST['email'] ?? '', 190));
            $resetError = '';
            if (Http::method() === 'POST') {
                $newPassword = (string) ($_POST['password'] ?? '');
                $user = Db::one('SELECT id FROM users WHERE email = ?', [$resetEmail]);
                if (!$user) {
                    $resetError = 'No account uses that email address.';
                } elseif ($newPassword !== (string) ($_POST['confirm'] ?? '')) {
                    $resetError = 'The two passwords do not match.';
                } elseif (mb_strlen($newPassword) < 10) {
                    $resetError = 'Use a password of at least 10 characters.';
                } else {
                    Db::update('users', ['password_hash' => password_hash($newPassword, PASSWORD_DEFAULT), 'active' => 1], 'id = ?', [$user['id']]);
                    Db::exec("DELETE FROM rate_hits WHERE bucket LIKE 'login:%'");
                    page('Password reset', '<h1 class="ok">Password updated</h1><p><a href="/admin" style="color:#0fd1e8;font-weight:700">Sign in to the admin →</a></p>');
                }
            }
            page('Reset password', '<h1>Reset an admin password</h1><p>Enter the account email and a new password.</p>'
                . ($resetError ? '<div class="box bad">' . h($resetError) . '</div>' : '')
                . '<form method="post"><input type="hidden" name="key" value="' . h($key) . '"><input type="hidden" name="reset" value="1">'
                . '<label for="email">Account email</label><input id="email" type="email" name="email" value="' . h($resetEmail) . '" required>'
                . '<label for="password">New password (10+ characters)</label><input id="password" type="password" name="password" required minlength="10" autocomplete="new-password">'
                . '<label for="confirm">Confirm new password</label><input id="confirm" type="password" name="confirm" required minlength="10" autocomplete="new-password">'
                . '<button type="submit">Set new password</button></form>');
        }
        page('Setup', '<h1>Already installed</h1><p>This site has already been set up. <a href="/admin" style="color:#0fd1e8">Go to the admin sign-in</a>.</p><p>Forgot your password? Open this page with <code>&amp;reset=1</code> added to the address.</p><p>For extra safety you can delete <code>api/install.php</code> from the server.</p>');
    }

    $checks = [];
    try {
        Db::pdo();
        $checks[] = ['Database connection', true, 'Connected (' . Db::driver() . ').'];
    } catch (HttpError $e) {
        page('Setup', '<h1>Database problem</h1><p class="bad">' . h($e->getMessage()) . '</p><p>Check the <code>db</code> section of <code>config.php</code> (host, name, user, password) and reload.</p>');
    }
    $checks[] = ['PHP version', true, PHP_VERSION];
    $checks[] = ['Image library (GD)', extension_loaded('gd'), extension_loaded('gd') ? 'Available — uploads are resized.' : 'Not available — uploads still work, but are not resized.'];
    $checks[] = ['Email (mail function)', function_exists('mail'), function_exists('mail') ? 'Available.' : 'Not available — lead alerts will not be emailed.'];
    $checks[] = ['cURL (Publish button)', function_exists('curl_init'), function_exists('curl_init') ? 'Available.' : 'Not available — the Publish button cannot trigger a rebuild.'];

    $seedFile = API_DIR . '/seed/content.json';
    $errors = [];
    $values = ['name' => '', 'email' => '', 'seed' => '1'];

    if (Http::method() === 'POST') {
        $values['name'] = Http::str($_POST['name'] ?? '', 120);
        $values['email'] = strtolower(Http::str($_POST['email'] ?? '', 190));
        $password = (string) ($_POST['password'] ?? '');
        $confirm = (string) ($_POST['confirm'] ?? '');
        $values['seed'] = empty($_POST['seed']) ? '' : '1';
        if ($values['name'] === '') {
            $errors[] = 'Enter your name.';
        }
        if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Enter a valid email address.';
        }
        if ($password !== $confirm) {
            $errors[] = 'The two passwords do not match.';
        }
        if (mb_strlen($password) < 10) {
            $errors[] = 'Use a password of at least 10 characters.';
        }
        if (!$errors) {
            Schema::migrate();
            $note = '';
            if ((int) Db::val('SELECT COUNT(*) FROM users') === 0) {
                Auth::createUser($values['email'], $values['name'], $password, 'admin');
            } else {
                $note = '<p class="bad">An admin account already existed, so no new account was created.</p>';
            }
            $imported = '';
            if ($values['seed'] === '1' && is_file($seedFile)) {
                $seed = json_decode((string) file_get_contents($seedFile), true);
                if (is_array($seed)) {
                    $counts = Content::importSeed($seed, false);
                    $imported = '<p>Loaded starter content: ' . (int) $counts['posts'] . ' articles, ' . (int) $counts['team'] . ' team members, ' . (int) $counts['projects'] . ' portfolio projects.</p>';
                }
            }
            file_put_contents(API_DIR . '/storage/installed.lock', gmdate('c'));
            page('Setup complete', '<h1 class="ok">Setup complete</h1>' . $note . $imported
                . '<p>Your admin account is ready.</p><p><a href="/admin" style="color:#0fd1e8;font-weight:700">Sign in to the admin →</a></p>'
                . '<div class="box"><b>Next steps</b><ol><li>Sign in and open <b>Settings</b> to confirm the lead-alert email.</li><li>Optionally delete <code>api/install.php</code> from the server.</li></ol></div>');
        }
    }

    $list = '';
    foreach ($checks as [$label, $ok, $msg]) {
        $list .= '<li><b>' . h($label) . ':</b> <span class="' . ($ok ? 'ok' : 'bad') . '">' . h($msg) . '</span></li>';
    }
    $err = $errors ? '<div class="box bad">' . implode('<br>', array_map('h', $errors)) . '</div>' : '';
    $seedBox = is_file($seedFile)
        ? '<label style="font-weight:400"><input type="checkbox" name="seed" value="1"' . ($values['seed'] === '1' ? ' checked' : '') . '> Load the website\'s current blog articles, team and portfolio into the admin (recommended)</label>'
        : '';
    page('Setup', '<h1>Oryan Techsol — admin setup</h1><p>Create your administrator account.</p><ul>' . $list . '</ul>' . $err
        . '<form method="post"><input type="hidden" name="key" value="' . h($key) . '">'
        . '<label for="name">Your name</label><input id="name" type="text" name="name" value="' . h($values['name']) . '" required>'
        . '<label for="email">Email (your sign-in)</label><input id="email" type="email" name="email" value="' . h($values['email']) . '" required>'
        . '<label for="password">Password (10+ characters)</label><input id="password" type="password" name="password" required minlength="10" autocomplete="new-password">'
        . '<label for="confirm">Confirm password</label><input id="confirm" type="password" name="confirm" required minlength="10" autocomplete="new-password">'
        . $seedBox . '<button type="submit">Install</button></form>');
} catch (HttpError $e) {
    page('Setup', '<h1>Setup problem</h1><p class="bad">' . h($e->getMessage()) . '</p><p>Create <code>api/config.php</code> from <code>config.sample.php</code> (see docs/ADMIN-SETUP.md) and reload.</p>');
}
