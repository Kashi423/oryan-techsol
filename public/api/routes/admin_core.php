<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Admin API — session, dashboard, leads, chat logs, settings, users, uploads, publish, seed.
// Every route here requires a signed-in user (state-changing ones also verify the CSRF token)
// except login and "me", which report the session state.

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'];

function pageParams(int $perPage = 25): array
{
    $page = Http::intval($_GET['page'] ?? 1, 1, 1, 100000);
    return [$page, $perPage, ($page - 1) * $perPage];
}

function leadAdmin(array $r): array
{
    return [
        'id' => (int) $r['id'], 'name' => $r['name'], 'company' => $r['company'], 'email' => $r['email'], 'phone' => $r['phone'],
        'website' => $r['website'], 'need' => $r['need'], 'projectType' => $r['project_type'], 'challenge' => $r['challenge'],
        'budget' => $r['budget'], 'timeline' => $r['timeline'], 'additional' => $r['additional'], 'source' => $r['source_path'],
        'status' => $r['status'], 'notes' => $r['notes'], 'createdAt' => $r['created_at'], 'updatedAt' => $r['updated_at'],
    ];
}

// --- session -----------------------------------------------------------------------------------

Router::post('/admin/login', static function (array $p, array $in): array {
    $user = Auth::login((string) ($in['email'] ?? ''), (string) ($in['password'] ?? ''));
    return ['user' => $user, 'csrf' => Auth::csrf()];
});

Router::get('/admin/me', static function (): array {
    $user = Auth::user();
    if ($user === null) {
        return ['authenticated' => false];
    }
    return ['authenticated' => true, 'user' => $user, 'csrf' => Auth::csrf()];
});

Router::post('/admin/logout', static function (): array {
    Auth::logout();
    return ['ok' => true];
}, true);

Router::post('/admin/password', static function (array $p, array $in): array {
    $user = Auth::require();
    $row = Db::one('SELECT password_hash FROM users WHERE id = ?', [$user['id']]);
    if (!$row || !password_verify((string) ($in['current'] ?? ''), $row['password_hash'])) {
        throw new HttpError(422, 'Your current password is incorrect.');
    }
    $new = (string) ($in['new'] ?? '');
    Auth::checkPasswordStrength($new);
    Db::update('users', ['password_hash' => password_hash($new, PASSWORD_DEFAULT)], 'id = ?', [$user['id']]);
    Auth::audit('password_change', 'user', $user['id']);
    return ['ok' => true];
}, true);

// --- dashboard ---------------------------------------------------------------------------------

Router::get('/admin/dashboard', static function (): array {
    $week = gmdate('Y-m-d H:i:s', time() - 7 * 86400);
    $status = [];
    foreach (Db::all('SELECT status, COUNT(*) AS n FROM leads GROUP BY status') as $r) {
        $status[$r['status']] = (int) $r['n'];
    }
    return [
        'leads' => [
            'total' => array_sum($status),
            'new' => $status['new'] ?? 0,
            'thisWeek' => (int) Db::val('SELECT COUNT(*) FROM leads WHERE created_at >= ?', [$week]),
            'byStatus' => (object) $status,
        ],
        'chats' => [
            'total' => (int) Db::val('SELECT COUNT(*) FROM chat_sessions'),
            'unreviewed' => (int) Db::val('SELECT COUNT(*) FROM chat_sessions WHERE reviewed = 0'),
            'withContact' => (int) Db::val('SELECT COUNT(*) FROM chat_sessions WHERE contact_email IS NOT NULL OR contact_phone IS NOT NULL'),
        ],
        'posts' => [
            'published' => (int) Db::val("SELECT COUNT(*) FROM posts WHERE status = 'published'"),
            'drafts' => (int) Db::val("SELECT COUNT(*) FROM posts WHERE status = 'draft'"),
        ],
        'team' => (int) Db::val('SELECT COUNT(*) FROM team_members WHERE active = 1'),
        'projects' => (int) Db::val('SELECT COUNT(*) FROM projects'),
        'texts' => (int) Db::val('SELECT COUNT(*) FROM text_overrides'),
        'recentLeads' => array_map('leadAdmin', Db::all('SELECT * FROM leads ORDER BY id DESC LIMIT 6')),
        'recentChats' => array_map(
            static fn(array $c): array => ['id' => (int) $c['id'], 'firstMessage' => $c['first_message'], 'messages' => (int) $c['message_count'], 'lastAt' => $c['last_at'], 'contactEmail' => $c['contact_email']],
            Db::all('SELECT * FROM chat_sessions ORDER BY last_at DESC LIMIT 5'),
        ),
        'contentVersion' => Content::version(),
        'publish' => ['lastAt' => Db::setting('last_publish_at'), 'lastStatus' => Db::setting('last_publish_status'), 'configured' => (string) Cfg::get('github.token', '') !== ''],
        'seedImported' => Db::setting('managed_posts') === '1',
    ];
}, true);

// --- leads -------------------------------------------------------------------------------------

Router::get('/admin/leads/export', static function (): never {
    Auth::require();
    $rows = Db::all('SELECT * FROM leads ORDER BY id DESC');
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="leads-' . gmdate('Y-m-d') . '.csv"');
    header('Cache-Control: no-store');
    $out = fopen('php://output', 'w');
    fwrite($out, "\xEF\xBB\xBF");
    $cols = ['id', 'created_at', 'status', 'name', 'company', 'email', 'phone', 'website', 'project_type', 'budget', 'timeline', 'need', 'challenge', 'additional', 'notes', 'source_path'];
    fputcsv($out, $cols);
    foreach ($rows as $r) {
        // Prefix cells that look like spreadsheet formulas so Excel never executes them.
        fputcsv($out, array_map(static fn($c) => is_string($c) && preg_match('/^[=+\-@]/', $c) ? "'" . $c : $c, array_map(static fn($c) => $r[$c], $cols)));
    }
    fclose($out);
    exit;
}, true);

Router::get('/admin/leads', static function (): array {
    [$page, $per, $offset] = pageParams();
    $where = [];
    $args = [];
    $status = Http::str($_GET['status'] ?? '', 20);
    if (in_array($status, LEAD_STATUSES, true)) {
        $where[] = 'status = ?';
        $args[] = $status;
    }
    $q = Http::str($_GET['q'] ?? '', 100);
    if ($q !== '') {
        $like = '%' . str_replace(['%', '_'], ['\\%', '\\_'], $q) . '%';
        $where[] = '(name LIKE ? OR email LIKE ? OR company LIKE ? OR need LIKE ? OR challenge LIKE ?)';
        array_push($args, $like, $like, $like, $like, $like);
    }
    $clause = $where ? 'WHERE ' . implode(' AND ', $where) : '';
    $total = (int) Db::val("SELECT COUNT(*) FROM leads $clause", $args);
    $rows = Db::all("SELECT * FROM leads $clause ORDER BY id DESC LIMIT $per OFFSET $offset", $args);
    return ['items' => array_map('leadAdmin', $rows), 'total' => $total, 'page' => $page, 'perPage' => $per];
}, true);

Router::get('/admin/leads/{id}', static function (array $p): array {
    $row = Db::one('SELECT * FROM leads WHERE id = ?', [(int) $p['id']]);
    if (!$row) {
        throw new HttpError(404, 'Lead not found.');
    }
    return leadAdmin($row);
}, true);

Router::patch('/admin/leads/{id}', static function (array $p, array $in): array {
    $id = (int) $p['id'];
    $row = Db::one('SELECT * FROM leads WHERE id = ?', [$id]);
    if (!$row) {
        throw new HttpError(404, 'Lead not found.');
    }
    $data = ['updated_at' => Db::now()];
    if (isset($in['status'])) {
        if (!in_array($in['status'], LEAD_STATUSES, true)) {
            throw new HttpError(422, 'Unknown status.');
        }
        $data['status'] = $in['status'];
    }
    if (array_key_exists('notes', $in)) {
        $data['notes'] = Http::str($in['notes'], 8000);
    }
    Db::update('leads', $data, 'id = ?', [$id]);
    Auth::audit('lead_update', 'lead', $id, $data['status'] ?? null);
    return leadAdmin(Db::one('SELECT * FROM leads WHERE id = ?', [$id]));
}, true);

Router::delete('/admin/leads/{id}', static function (array $p): array {
    Db::exec('DELETE FROM leads WHERE id = ?', [(int) $p['id']]);
    Auth::audit('lead_delete', 'lead', $p['id']);
    return ['ok' => true];
}, true);

// --- chats -------------------------------------------------------------------------------------

function chatAdmin(array $c): array
{
    return [
        'id' => (int) $c['id'], 'firstMessage' => $c['first_message'], 'page' => $c['page'], 'messages' => (int) $c['message_count'],
        'contactEmail' => $c['contact_email'], 'contactPhone' => $c['contact_phone'], 'reviewed' => (bool) $c['reviewed'],
        'startedAt' => $c['started_at'], 'lastAt' => $c['last_at'],
    ];
}

Router::get('/admin/chats', static function (): array {
    [$page, $per, $offset] = pageParams();
    $where = [];
    $args = [];
    if (($_GET['contact'] ?? '') === '1') {
        $where[] = '(contact_email IS NOT NULL OR contact_phone IS NOT NULL)';
    }
    if (($_GET['unreviewed'] ?? '') === '1') {
        $where[] = 'reviewed = 0';
    }
    $q = Http::str($_GET['q'] ?? '', 100);
    if ($q !== '') {
        $like = '%' . str_replace(['%', '_'], ['\\%', '\\_'], $q) . '%';
        $where[] = '(first_message LIKE ? OR contact_email LIKE ? OR id IN (SELECT session_id FROM chat_messages WHERE content LIKE ?))';
        array_push($args, $like, $like, $like);
    }
    $clause = $where ? 'WHERE ' . implode(' AND ', $where) : '';
    $total = (int) Db::val("SELECT COUNT(*) FROM chat_sessions $clause", $args);
    $rows = Db::all("SELECT * FROM chat_sessions $clause ORDER BY last_at DESC LIMIT $per OFFSET $offset", $args);
    return ['items' => array_map('chatAdmin', $rows), 'total' => $total, 'page' => $page, 'perPage' => $per];
}, true);

Router::get('/admin/chats/{id}', static function (array $p): array {
    $c = Db::one('SELECT * FROM chat_sessions WHERE id = ?', [(int) $p['id']]);
    if (!$c) {
        throw new HttpError(404, 'Conversation not found.');
    }
    $messages = Db::all('SELECT role, content, created_at FROM chat_messages WHERE session_id = ? ORDER BY id', [(int) $c['id']]);
    return chatAdmin($c) + ['transcript' => array_map(static fn(array $m): array => ['role' => $m['role'], 'content' => $m['content'], 'at' => $m['created_at']], $messages)];
}, true);

Router::patch('/admin/chats/{id}', static function (array $p, array $in): array {
    Db::update('chat_sessions', ['reviewed' => empty($in['reviewed']) ? 0 : 1], 'id = ?', [(int) $p['id']]);
    return ['ok' => true];
}, true);

Router::delete('/admin/chats/{id}', static function (array $p): array {
    $id = (int) $p['id'];
    Db::exec('DELETE FROM chat_messages WHERE session_id = ?', [$id]);
    Db::exec('DELETE FROM chat_sessions WHERE id = ?', [$id]);
    Auth::audit('chat_delete', 'chat', $id);
    return ['ok' => true];
}, true);

// --- settings ----------------------------------------------------------------------------------

const SETTING_KEYS = ['notify_email', 'contact_email', 'contact_phone', 'contact_location', 'social_linkedin', 'social_facebook', 'social_instagram', 'social_youtube'];

Router::get('/admin/settings', static function (): array {
    $out = [];
    foreach (SETTING_KEYS as $key) {
        $out[$key] = Db::setting($key, '') ?? '';
    }
    if ($out['notify_email'] === '') {
        $out['notify_email'] = (string) Cfg::get('notify_email', '');
    }
    return ['settings' => $out];
}, true);

Router::put('/admin/settings', static function (array $p, array $in): array {
    Auth::require('admin');
    foreach (SETTING_KEYS as $key) {
        if (!array_key_exists($key, $in)) {
            continue;
        }
        $value = Http::str($in[$key], 300);
        if (str_starts_with($key, 'social_') && $value !== '' && !preg_match('#^https://#i', $value)) {
            throw new HttpError(422, 'Social links must start with https://');
        }
        if (in_array($key, ['notify_email', 'contact_email'], true) && $value !== '' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new HttpError(422, 'Enter a valid email address.');
        }
        Db::setSetting($key, $value);
    }
    Content::bump();
    Auth::audit('settings_update', 'settings');
    return ['ok' => true];
}, true, 'admin');

// --- users -------------------------------------------------------------------------------------

function userAdmin(array $u): array
{
    return ['id' => (int) $u['id'], 'email' => $u['email'], 'name' => $u['name'], 'role' => $u['role'], 'active' => (bool) $u['active'], 'lastLoginAt' => $u['last_login_at'], 'createdAt' => $u['created_at']];
}

Router::get('/admin/users', static fn(): array => ['items' => array_map('userAdmin', Db::all('SELECT * FROM users ORDER BY id'))], true, 'admin');

Router::post('/admin/users', static function (array $p, array $in): array {
    $id = Auth::createUser((string) ($in['email'] ?? ''), (string) ($in['name'] ?? ''), (string) ($in['password'] ?? ''), (string) ($in['role'] ?? 'editor'));
    Auth::audit('user_create', 'user', $id);
    return userAdmin(Db::one('SELECT * FROM users WHERE id = ?', [$id]));
}, true, 'admin');

Router::put('/admin/users/{id}', static function (array $p, array $in): array {
    $id = (int) $p['id'];
    $me = Auth::require('admin');
    $row = Db::one('SELECT * FROM users WHERE id = ?', [$id]);
    if (!$row) {
        throw new HttpError(404, 'User not found.');
    }
    $data = [];
    if (isset($in['name'])) {
        $data['name'] = Http::str($in['name'], 120) ?: $row['name'];
    }
    if (isset($in['role']) && in_array($in['role'], ['admin', 'editor'], true)) {
        $data['role'] = $in['role'];
    }
    if (isset($in['active'])) {
        $data['active'] = $in['active'] ? 1 : 0;
    }
    if (!empty($in['password'])) {
        Auth::checkPasswordStrength((string) $in['password']);
        $data['password_hash'] = password_hash((string) $in['password'], PASSWORD_DEFAULT);
    }
    $demotes = (isset($data['role']) && $data['role'] !== 'admin') || (isset($data['active']) && !$data['active']);
    if ($id === (int) $me['id'] && $demotes) {
        throw new HttpError(422, 'You cannot demote or deactivate your own account.');
    }
    if ($data) {
        Db::update('users', $data, 'id = ?', [$id]);
    }
    Auth::audit('user_update', 'user', $id);
    return userAdmin(Db::one('SELECT * FROM users WHERE id = ?', [$id]));
}, true, 'admin');

Router::delete('/admin/users/{id}', static function (array $p): array {
    $me = Auth::require('admin');
    if ((int) $p['id'] === (int) $me['id']) {
        throw new HttpError(422, 'You cannot delete your own account.');
    }
    Db::exec('DELETE FROM users WHERE id = ?', [(int) $p['id']]);
    Auth::audit('user_delete', 'user', $p['id']);
    return ['ok' => true];
}, true, 'admin');

// --- uploads -----------------------------------------------------------------------------------

Router::post('/admin/uploads', static function (): array {
    $user = Auth::require();
    if (empty($_FILES['file']) || !is_array($_FILES['file'])) {
        throw new HttpError(422, 'Choose an image to upload.');
    }
    $saved = Uploads::save($_FILES['file'], $user['email']);
    Auth::audit('upload', 'media', $saved['id']);
    return $saved;
}, true);

Router::get('/admin/uploads', static function (): array {
    $rows = Db::all('SELECT id, url, original_name, width, height, size, created_at FROM media ORDER BY id DESC LIMIT 60');
    return ['items' => array_map(static fn(array $m): array => ['id' => (int) $m['id'], 'url' => $m['url'], 'name' => $m['original_name'], 'width' => (int) $m['width'], 'height' => (int) $m['height'], 'size' => (int) $m['size'], 'createdAt' => $m['created_at']], $rows)];
}, true);

Router::delete('/admin/uploads/{id}', static function (array $p): array {
    $row = Db::one('SELECT url FROM media WHERE id = ?', [(int) $p['id']]);
    if ($row) {
        Uploads::deleteByUrl($row['url']);
    }
    return ['ok' => true];
}, true);

// --- publish (rebuild the SEO snapshot via GitHub Actions) ---------------------------------------

Router::get('/admin/publish', static function (): array {
    return [
        'configured' => (string) Cfg::get('github.token', '') !== '',
        'lastAt' => Db::setting('last_publish_at'),
        'lastStatus' => Db::setting('last_publish_status'),
        'repo' => Cfg::get('github.repo'),
    ];
}, true);

Router::post('/admin/publish', static function (): array {
    Auth::require('admin');
    $token = (string) Cfg::get('github.token', '');
    if ($token === '') {
        throw new HttpError(422, 'Publishing is not configured. Add a GitHub token to config.php (see the setup guide), or run the "Deploy to Namecheap" workflow from GitHub.');
    }
    if (!function_exists('curl_init')) {
        throw new HttpError(500, 'PHP cURL is not available on this server.');
    }
    $repo = (string) Cfg::get('github.repo', '');
    $workflow = (string) Cfg::get('github.workflow', 'deploy.yml');
    $url = "https://api.github.com/repos/$repo/actions/workflows/$workflow/dispatches";
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode(['ref' => (string) Cfg::get('github.ref', 'main')]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => [
            'Accept: application/vnd.github+json',
            'Authorization: Bearer ' . $token,
            'X-GitHub-Api-Version: 2022-11-28',
            'User-Agent: oryan-techsol-cms',
            'Content-Type: application/json',
        ],
    ]);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    Db::setSetting('last_publish_at', Db::now());
    if ($status === 204) {
        Db::setSetting('last_publish_status', 'started');
        Auth::audit('publish', 'site');
        return ['ok' => true, 'message' => 'Rebuild started. The SEO snapshot refreshes in a few minutes.'];
    }
    Db::setSetting('last_publish_status', 'failed (' . $status . ')');
    throw new HttpError(502, 'GitHub refused the request (HTTP ' . $status . '). Check the token and repository in config.php.', ['detail' => is_string($body) ? mb_substr($body, 0, 300) : '']);
}, true, 'admin');

// --- starter content -----------------------------------------------------------------------------

Router::post('/admin/seed', static function (array $p, array $in): array {
    $file = API_DIR . '/seed/content.json';
    if (!is_file($file)) {
        throw new HttpError(404, 'No starter content file found on the server.');
    }
    $seed = json_decode((string) file_get_contents($file), true);
    if (!is_array($seed)) {
        throw new HttpError(500, 'Starter content file is invalid.');
    }
    $counts = Content::importSeed($seed, !empty($in['replace']));
    Auth::audit('seed_import', 'content', null, json_encode($counts) ?: null);
    return ['ok' => true, 'imported' => $counts];
}, true, 'admin');
