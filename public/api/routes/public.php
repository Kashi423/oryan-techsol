<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Public (no sign-in) endpoints: health, the live content snapshot, the contact form and the
// chat-logging endpoint used by the AI consultation widget.

/** Sends JSON with an ETag, answering 304 when the browser already has this version. */
function sendCached(array $data, string $etag, int $maxAge = 30): never
{
    $quoted = '"' . $etag . '"';
    if (($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === $quoted) {
        http_response_code(304);
        header('ETag: ' . $quoted);
        header('Cache-Control: public, max-age=' . $maxAge . ', must-revalidate');
        exit;
    }
    Http::json($data, 200, ['ETag' => $quoted, 'Cache-Control' => 'public, max-age=' . $maxAge . ', must-revalidate']);
}

Router::get('/health', static function (): array {
    return ['ok' => true, 'installed' => Schema::installed(), 'php' => PHP_VERSION];
});

Router::get('/public/content', static function (): never {
    sendCached(Content::snapshot(), 'c-' . Content::version());
});

Router::get('/public/posts', static function (): never {
    sendCached(['version' => Content::version(), 'posts' => Content::publishedPosts()], 'p-' . Content::version());
});

Router::post('/public/contact', static function (array $p, array $in): array {
    // Honeypot: real visitors never fill the hidden "hp" field. Pretend success so bots move on.
    if (Http::str($in['hp'] ?? '', 50) !== '') {
        return ['ok' => true];
    }
    // Time trap: a human takes more than a couple of seconds to fill this form.
    $renderedAt = Http::intval($in['ts'] ?? 0, 0, 0);
    if ($renderedAt > 0 && (microtime(true) * 1000 - $renderedAt) < 2500) {
        return ['ok' => true];
    }

    $name = Http::str($in['name'] ?? '', 160);
    $email = strtolower(Http::str($in['email'] ?? '', 190));
    $challenge = Http::str($in['challenge'] ?? '', 4000);
    $need = Http::str($in['need'] ?? '', 500);
    $errors = [];
    if ($name === '') {
        $errors['name'] = 'Please enter your name.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please enter a valid email address.';
    }
    if ($need === '' && $challenge === '') {
        $errors['need'] = 'Please tell us what you need.';
    }
    $website = Http::str($in['website'] ?? '', 255);
    if ($website !== '' && !preg_match('#^https?://#i', $website)) {
        $website = 'https://' . $website;
    }
    if ($errors) {
        throw new HttpError(422, 'Please check the highlighted fields.', ['fields' => $errors]);
    }

    // Drop exact duplicates sent within 10 minutes (double-clicks, retries).
    $since = gmdate('Y-m-d H:i:s', time() - 600);
    if (Db::val('SELECT COUNT(*) FROM leads WHERE email = ? AND challenge = ? AND created_at >= ?', [$email, $challenge, $since])) {
        return ['ok' => true];
    }

    Rate::limit('contact:' . Http::ipHash(), 5, 3600, 'You have sent several inquiries recently. Please email us directly instead.');

    $now = Db::now();
    $lead = [
        'name' => $name,
        'company' => Http::str($in['company'] ?? '', 190),
        'email' => $email,
        'phone' => Http::str($in['phone'] ?? '', 60),
        'website' => $website,
        'need' => $need,
        'project_type' => Http::str($in['projectType'] ?? '', 80),
        'challenge' => $challenge,
        'budget' => Http::str($in['budget'] ?? '', 80),
        'timeline' => Http::str($in['timeline'] ?? '', 80),
        'additional' => Http::str($in['additional'] ?? '', 4000),
        'source_path' => Http::str($in['source'] ?? '/contact', 190),
        'status' => 'new',
        'notes' => '',
        'ip_hash' => Http::ipHash(),
        'user_agent' => Http::str($_SERVER['HTTP_USER_AGENT'] ?? '', 255),
        'created_at' => $now,
        'updated_at' => $now,
    ];
    $id = Db::insert('leads', $lead);

    $to = Db::setting('notify_email') ?: (string) Cfg::get('notify_email', '');
    if ($to !== '') {
        $lines = [
            'Name: ' . $lead['name'],
            'Company: ' . ($lead['company'] ?: '—'),
            'Email: ' . $lead['email'],
            'Phone: ' . ($lead['phone'] ?: '—'),
            'Website: ' . ($lead['website'] ?: '—'),
            'Project type: ' . ($lead['project_type'] ?: '—'),
            'Budget: ' . ($lead['budget'] ?: '—'),
            'Timeline: ' . ($lead['timeline'] ?: '—'),
            '',
            'What they need:',
            $lead['need'] ?: '—',
            '',
            'Current challenge:',
            $lead['challenge'] ?: '—',
            '',
            'Additional information:',
            $lead['additional'] ?: '—',
            '',
            'Open in admin: ' . rtrim((string) Cfg::get('site_url', ''), '/') . '/admin/leads/' . $id,
        ];
        Mailer::send($to, 'New website inquiry — ' . ($lead['project_type'] ?: 'General') . ' — ' . $lead['name'], implode("\n", $lines), $lead['email']);
    }

    return ['ok' => true, 'id' => $id];
});

Router::post('/public/chat', static function (array $p, array $in): array {
    $key = preg_replace('/[^A-Za-z0-9_-]/', '', Http::str($in['sessionId'] ?? '', 64)) ?? '';
    if (strlen($key) < 8) {
        throw new HttpError(422, 'Invalid session.');
    }
    $messages = [];
    foreach (array_slice(is_array($in['messages'] ?? null) ? $in['messages'] : [], 0, 12) as $m) {
        $role = ($m['role'] ?? '') === 'assistant' ? 'assistant' : (($m['role'] ?? '') === 'user' ? 'user' : '');
        $content = Http::str($m['content'] ?? '', 4000);
        if ($role !== '' && $content !== '') {
            $messages[] = ['role' => $role, 'content' => $content];
        }
    }
    if (!$messages) {
        return ['ok' => true];
    }

    Rate::limit('chat:' . Http::ipHash(), 150, 3600);

    $now = Db::now();
    $session = Db::one('SELECT * FROM chat_sessions WHERE session_key = ?', [$key]);
    if ($session === null) {
        $firstUser = '';
        foreach ($messages as $m) {
            if ($m['role'] === 'user') {
                $firstUser = $m['content'];
                break;
            }
        }
        $sessionId = Db::insert('chat_sessions', [
            'session_key' => $key,
            'page' => Http::str($in['page'] ?? '', 190),
            'first_message' => mb_substr($firstUser, 0, 255),
            'message_count' => 0,
            'reviewed' => 0,
            'started_at' => $now,
            'last_at' => $now,
        ]);
        $session = ['id' => $sessionId, 'message_count' => 0, 'contact_email' => null, 'contact_phone' => null];
    }
    if ((int) $session['message_count'] >= 200) {
        throw new HttpError(429, 'This conversation is too long.');
    }

    $email = $session['contact_email'];
    $phone = $session['contact_phone'];
    foreach ($messages as $m) {
        Db::insert('chat_messages', ['session_id' => (int) $session['id'], 'role' => $m['role'], 'content' => $m['content'], 'created_at' => $now]);
        if ($m['role'] === 'user') {
            if (!$email && preg_match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i', $m['content'], $hit)) {
                $email = mb_substr($hit[0], 0, 190);
            }
            if (!$phone && preg_match('/\+?\d[\d\s().-]{7,18}\d/', $m['content'], $hit)) {
                $phone = mb_substr(trim($hit[0]), 0, 60);
            }
        }
    }
    Db::update('chat_sessions', [
        'message_count' => (int) $session['message_count'] + count($messages),
        'last_at' => $now,
        'contact_email' => $email,
        'contact_phone' => $phone,
    ], 'id = ?', [(int) $session['id']]);

    return ['ok' => true];
});
