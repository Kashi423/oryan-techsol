<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Admin API — website content: blog posts, team, portfolio projects, page-text overrides and
// extra menu buttons. Every successful change bumps the content version so the live site (and
// the next rebuild) picks it up.

function slugOk(string $slug): bool
{
    return (bool) preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug) && strlen($slug) <= 160;
}

// --- blog posts --------------------------------------------------------------------------------

/** @return array<string,mixed> columns for the posts table, from an editor payload */
function postColumns(array $in, ?array $existing): array
{
    $slug = strtolower(Http::str($in['slug'] ?? '', 160));
    $title = Http::str($in['title'] ?? '', 255);
    if ($title === '') {
        throw new HttpError(422, 'A title is required.');
    }
    if ($slug === '') {
        $slug = trim((string) preg_replace('/[^a-z0-9]+/', '-', strtolower($title)), '-');
        $slug = substr($slug, 0, 120);
    }
    if (!slugOk($slug)) {
        throw new HttpError(422, 'The URL slug may only contain lowercase letters, numbers and hyphens.');
    }
    $clash = Db::val('SELECT COUNT(*) FROM posts WHERE slug = ? AND id <> ?', [$slug, (int) ($existing['id'] ?? 0)]);
    if ($clash) {
        throw new HttpError(409, 'Another article already uses that URL slug.');
    }
    $status = ($in['status'] ?? 'draft') === 'published' ? 'published' : 'draft';
    $publishedAt = $existing['published_at'] ?? null;
    if ($status === 'published' && !$publishedAt) {
        $publishedAt = Db::now();
    }
    if (!empty($in['publishDate']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $in['publishDate'])) {
        $publishedAt = $in['publishDate'] . ' 09:00:00';
    }
    $to = Content::cleanUrl($in['serviceTo'] ?? '/contact') ?: '/contact';
    return [
        'slug' => $slug,
        'title' => $title,
        'short_title' => Http::str($in['shortTitle'] ?? '', 190) ?: $title,
        'description' => Http::str($in['description'] ?? '', 320),
        'category' => Http::str($in['category'] ?? '', 80),
        'keywords' => Http::str($in['keywords'] ?? '', 800),
        'service_label' => Http::str($in['serviceLabel'] ?? '', 160) ?: 'Contact us',
        'service_to' => $to,
        'intro' => Http::str($in['intro'] ?? '', 4000),
        'takeaways' => Content::encode(Content::strings($in['takeaways'] ?? [], 12, 500)),
        'blocks' => Content::encode(Content::cleanBlocks($in['blocks'] ?? [])),
        'faqs' => Content::encode(Content::cleanFaqs($in['faqs'] ?? [])),
        'related' => Content::encode(Content::strings($in['related'] ?? [], 6, 160)),
        'image_url' => Http::str($in['image'] ?? '', 255) ?: null,
        'status' => $status,
        'published_at' => $publishedAt,
    ];
}

Router::get('/admin/posts', static function (): array {
    $rows = Db::all('SELECT id, slug, title, category, status, published_at, updated_at FROM posts ORDER BY COALESCE(published_at, updated_at) DESC, id DESC');
    return ['items' => array_map(static fn(array $r): array => [
        'id' => (int) $r['id'], 'slug' => $r['slug'], 'title' => $r['title'], 'category' => $r['category'],
        'status' => $r['status'], 'publishedAt' => $r['published_at'], 'updatedAt' => $r['updated_at'],
    ], $rows)];
}, true);

Router::get('/admin/posts/{id}', static function (array $p): array {
    $row = Db::one('SELECT * FROM posts WHERE id = ?', [(int) $p['id']]);
    if (!$row) {
        throw new HttpError(404, 'Article not found.');
    }
    return Content::postAdmin($row);
}, true);

Router::post('/admin/posts', static function (array $p, array $in): array {
    $now = Db::now();
    $id = Db::insert('posts', postColumns($in, null) + ['created_at' => $now, 'updated_at' => $now]);
    Content::markManaged('posts');
    Content::bump();
    Auth::audit('post_create', 'post', $id);
    return Content::postAdmin(Db::one('SELECT * FROM posts WHERE id = ?', [$id]));
}, true);

Router::put('/admin/posts/{id}', static function (array $p, array $in): array {
    $id = (int) $p['id'];
    $existing = Db::one('SELECT * FROM posts WHERE id = ?', [$id]);
    if (!$existing) {
        throw new HttpError(404, 'Article not found.');
    }
    Db::update('posts', postColumns($in, $existing) + ['updated_at' => Db::now()], 'id = ?', [$id]);
    Content::bump();
    Auth::audit('post_update', 'post', $id);
    return Content::postAdmin(Db::one('SELECT * FROM posts WHERE id = ?', [$id]));
}, true);

Router::delete('/admin/posts/{id}', static function (array $p): array {
    Db::exec('DELETE FROM posts WHERE id = ?', [(int) $p['id']]);
    Content::bump();
    Auth::audit('post_delete', 'post', $p['id']);
    return ['ok' => true];
}, true);

// --- team --------------------------------------------------------------------------------------

function teamColumns(array $in): array
{
    $name = Http::str($in['name'] ?? '', 160);
    if ($name === '') {
        throw new HttpError(422, 'A name is required.');
    }
    return [
        'name' => $name,
        'role' => Http::str($in['role'] ?? '', 160),
        'bio' => Http::str($in['bio'] ?? '', 1500),
        'photo_url' => Http::str($in['photo'] ?? '', 255) ?: null,
        'active' => array_key_exists('active', $in) && !$in['active'] ? 0 : 1,
    ];
}

function setLead(int $id): void
{
    Db::exec('UPDATE team_members SET is_lead = 0');
    Db::exec('UPDATE team_members SET is_lead = 1 WHERE id = ?', [$id]);
}

Router::get('/admin/team', static fn(): array => ['items' => array_map([Content::class, 'teamAdmin'], Db::all('SELECT * FROM team_members ORDER BY is_lead DESC, sort_order, id'))], true);

Router::post('/admin/team', static function (array $p, array $in): array {
    $now = Db::now();
    $order = (int) Db::val('SELECT COALESCE(MAX(sort_order), 0) FROM team_members') + 1;
    $id = Db::insert('team_members', teamColumns($in) + ['is_lead' => 0, 'sort_order' => $order, 'created_at' => $now, 'updated_at' => $now]);
    if (!empty($in['isLead'])) {
        setLead($id);
    }
    Content::markManaged('team');
    Content::bump();
    Auth::audit('team_create', 'team', $id);
    return Content::teamAdmin(Db::one('SELECT * FROM team_members WHERE id = ?', [$id]));
}, true);

Router::post('/admin/team/reorder', static function (array $p, array $in): array {
    foreach (array_values((array) ($in['ids'] ?? [])) as $i => $id) {
        Db::update('team_members', ['sort_order' => $i + 1], 'id = ?', [(int) $id]);
    }
    Content::bump();
    return ['ok' => true];
}, true);

Router::put('/admin/team/{id}', static function (array $p, array $in): array {
    $id = (int) $p['id'];
    if (!Db::val('SELECT COUNT(*) FROM team_members WHERE id = ?', [$id])) {
        throw new HttpError(404, 'Team member not found.');
    }
    Db::update('team_members', teamColumns($in) + ['updated_at' => Db::now()], 'id = ?', [$id]);
    if (!empty($in['isLead'])) {
        setLead($id);
    }
    Content::bump();
    Auth::audit('team_update', 'team', $id);
    return Content::teamAdmin(Db::one('SELECT * FROM team_members WHERE id = ?', [$id]));
}, true);

Router::delete('/admin/team/{id}', static function (array $p): array {
    Db::exec('DELETE FROM team_members WHERE id = ?', [(int) $p['id']]);
    Content::bump();
    Auth::audit('team_delete', 'team', $p['id']);
    return ['ok' => true];
}, true);

// --- portfolio projects ----------------------------------------------------------------------------

Router::get('/admin/projects', static fn(): array => ['items' => array_map([Content::class, 'projectAdmin'], Db::all('SELECT * FROM projects ORDER BY sort_order, id'))], true);

Router::get('/admin/projects/{id}', static function (array $p): array {
    $row = Db::one('SELECT * FROM projects WHERE id = ?', [(int) $p['id']]);
    if (!$row) {
        throw new HttpError(404, 'Project not found.');
    }
    return Content::projectAdmin($row);
}, true);

function projectColumns(array $in, ?int $id): array
{
    $row = Content::projectRow($in);
    if ($row['title'] === '') {
        throw new HttpError(422, 'A title is required.');
    }
    if ($row['slug'] === '') {
        $row['slug'] = substr(trim((string) preg_replace('/[^a-z0-9]+/', '-', strtolower($row['title'])), '-'), 0, 120);
    }
    $row['slug'] = strtolower($row['slug']);
    if (!slugOk($row['slug'])) {
        throw new HttpError(422, 'The URL slug may only contain lowercase letters, numbers and hyphens.');
    }
    if (Db::val('SELECT COUNT(*) FROM projects WHERE slug = ? AND id <> ?', [$row['slug'], (int) $id])) {
        throw new HttpError(409, 'Another project already uses that URL slug.');
    }
    return $row;
}

Router::post('/admin/projects', static function (array $p, array $in): array {
    $now = Db::now();
    $order = (int) Db::val('SELECT COALESCE(MAX(sort_order), 0) FROM projects') + 1;
    $id = Db::insert('projects', projectColumns($in, null) + ['sort_order' => $order, 'created_at' => $now, 'updated_at' => $now]);
    Content::markManaged('projects');
    Content::bump();
    Auth::audit('project_create', 'project', $id);
    return Content::projectAdmin(Db::one('SELECT * FROM projects WHERE id = ?', [$id]));
}, true);

Router::post('/admin/projects/reorder', static function (array $p, array $in): array {
    foreach (array_values((array) ($in['ids'] ?? [])) as $i => $id) {
        Db::update('projects', ['sort_order' => $i + 1], 'id = ?', [(int) $id]);
    }
    Content::bump();
    return ['ok' => true];
}, true);

Router::put('/admin/projects/{id}', static function (array $p, array $in): array {
    $id = (int) $p['id'];
    if (!Db::val('SELECT COUNT(*) FROM projects WHERE id = ?', [$id])) {
        throw new HttpError(404, 'Project not found.');
    }
    Db::update('projects', projectColumns($in, $id) + ['updated_at' => Db::now()], 'id = ?', [$id]);
    Content::bump();
    Auth::audit('project_update', 'project', $id);
    return Content::projectAdmin(Db::one('SELECT * FROM projects WHERE id = ?', [$id]));
}, true);

Router::delete('/admin/projects/{id}', static function (array $p): array {
    Db::exec('DELETE FROM projects WHERE id = ?', [(int) $p['id']]);
    Content::bump();
    Auth::audit('project_delete', 'project', $p['id']);
    return ['ok' => true];
}, true);

// --- page text overrides -----------------------------------------------------------------------

Router::get('/admin/texts', static function (): array {
    $rows = Db::all('SELECT * FROM text_overrides ORDER BY updated_at DESC, id DESC');
    return ['items' => array_map(static fn(array $t): array => [
        'id' => (int) $t['id'], 'original' => $t['original'], 'replacement' => $t['replacement'],
        'page' => $t['page_path'], 'updatedBy' => $t['updated_by'], 'updatedAt' => $t['updated_at'],
    ], $rows)];
}, true);

// Bulk save from the on-site editor: [{ original, replacement, page }]. Setting the replacement
// back to the original removes the override.
Router::put('/admin/texts', static function (array $p, array $in): array {
    $user = Auth::require();
    $items = array_slice((array) ($in['items'] ?? []), 0, 200);
    $saved = 0;
    $removed = 0;
    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }
        $original = (string) ($item['original'] ?? '');
        $replacement = (string) ($item['replacement'] ?? '');
        if ($original === '' || mb_strlen($original) > 2000 || mb_strlen($replacement) > 4000) {
            continue;
        }
        $hash = sha1($original);
        if ($replacement === $original) {
            $removed += Db::exec('DELETE FROM text_overrides WHERE hash = ?', [$hash]);
            continue;
        }
        $data = [
            'original' => $original,
            'replacement' => $replacement,
            'page_path' => Http::str($item['page'] ?? '', 190),
            'updated_by' => $user['email'],
            'updated_at' => Db::now(),
        ];
        if (Db::val('SELECT COUNT(*) FROM text_overrides WHERE hash = ?', [$hash])) {
            Db::update('text_overrides', $data, 'hash = ?', [$hash]);
        } else {
            Db::insert('text_overrides', $data + ['hash' => $hash]);
        }
        $saved++;
    }
    Content::bump();
    Auth::audit('texts_update', 'texts', null, "saved=$saved removed=$removed");
    return ['ok' => true, 'saved' => $saved, 'removed' => $removed, 'version' => Content::version()];
}, true);

Router::delete('/admin/texts/{id}', static function (array $p): array {
    Db::exec('DELETE FROM text_overrides WHERE id = ?', [(int) $p['id']]);
    Content::bump();
    Auth::audit('text_delete', 'texts', $p['id']);
    return ['ok' => true];
}, true);

// --- extra menu buttons ------------------------------------------------------------------------

function navAdmin(array $n): array
{
    return ['id' => (int) $n['id'], 'label' => $n['label'], 'url' => $n['url'], 'newTab' => (bool) $n['new_tab'], 'style' => $n['style'], 'sortOrder' => (int) $n['sort_order'], 'active' => (bool) $n['active']];
}

function navColumns(array $in): array
{
    $label = Http::str($in['label'] ?? '', 80);
    $url = Content::cleanUrl($in['url'] ?? '');
    if ($label === '') {
        throw new HttpError(422, 'A label is required.');
    }
    if ($url === '') {
        throw new HttpError(422, 'Enter a link that starts with / (a page on this site) or https://');
    }
    return [
        'label' => $label,
        'url' => $url,
        'new_tab' => !empty($in['newTab']) ? 1 : 0,
        'style' => ($in['style'] ?? 'link') === 'button' ? 'button' : 'link',
        'active' => array_key_exists('active', $in) && !$in['active'] ? 0 : 1,
    ];
}

Router::get('/admin/nav', static fn(): array => ['items' => array_map('navAdmin', Db::all('SELECT * FROM nav_items ORDER BY sort_order, id'))], true);

Router::post('/admin/nav', static function (array $p, array $in): array {
    $order = (int) Db::val('SELECT COALESCE(MAX(sort_order), 0) FROM nav_items') + 1;
    $id = Db::insert('nav_items', navColumns($in) + ['sort_order' => $order, 'created_at' => Db::now()]);
    Content::bump();
    Auth::audit('nav_create', 'nav', $id);
    return navAdmin(Db::one('SELECT * FROM nav_items WHERE id = ?', [$id]));
}, true);

Router::post('/admin/nav/reorder', static function (array $p, array $in): array {
    foreach (array_values((array) ($in['ids'] ?? [])) as $i => $id) {
        Db::update('nav_items', ['sort_order' => $i + 1], 'id = ?', [(int) $id]);
    }
    Content::bump();
    return ['ok' => true];
}, true);

Router::put('/admin/nav/{id}', static function (array $p, array $in): array {
    $id = (int) $p['id'];
    if (!Db::val('SELECT COUNT(*) FROM nav_items WHERE id = ?', [$id])) {
        throw new HttpError(404, 'Menu item not found.');
    }
    Db::update('nav_items', navColumns($in), 'id = ?', [$id]);
    Content::bump();
    Auth::audit('nav_update', 'nav', $id);
    return navAdmin(Db::one('SELECT * FROM nav_items WHERE id = ?', [$id]));
}, true);

Router::delete('/admin/nav/{id}', static function (array $p): array {
    Db::exec('DELETE FROM nav_items WHERE id = ?', [(int) $p['id']]);
    Content::bump();
    Auth::audit('nav_delete', 'nav', $p['id']);
    return ['ok' => true];
}, true);
