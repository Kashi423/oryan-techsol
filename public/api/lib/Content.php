<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Everything that turns database rows into the JSON shapes the website expects (and back), plus
// the public content snapshot, the content version counter and the starter-content importer.
final class Content
{
    public const BLOCK_TYPES = ['p', 'h2', 'h3', 'ul', 'ol', 'callout', 'cta', 'stats', 'steps', 'bars', 'compare', 'table', 'checklist', 'timeline'];

    // --- version ------------------------------------------------------------------------------

    public static function bump(): void
    {
        Db::setSetting('content_version', (string) (int) round(microtime(true) * 1000));
    }

    public static function version(): string
    {
        return Db::setting('content_version', '0') ?? '0';
    }

    // --- JSON helpers -------------------------------------------------------------------------

    /** @return array<mixed> */
    public static function decode(?string $json): array
    {
        if ($json === null || $json === '') {
            return [];
        }
        $data = json_decode($json, true);
        return is_array($data) ? $data : [];
    }

    public static function encode(mixed $value): string
    {
        return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '[]';
    }

    /** @param mixed $list @return list<string> */
    public static function strings(mixed $list, int $maxItems = 60, int $maxLen = 2000): array
    {
        if (!is_array($list)) {
            return [];
        }
        $out = [];
        foreach (array_slice(array_values($list), 0, $maxItems) as $item) {
            $text = Http::str($item, $maxLen);
            if ($text !== '') {
                $out[] = $text;
            }
        }
        return $out;
    }

    public static function cleanUrl(mixed $value): string
    {
        $text = Http::str($value, 500);
        if ($text === '') {
            return '';
        }
        return preg_match('#^(/(?!/)|https?://|mailto:|tel:|\#)#i', $text) ? $text : '';
    }

    // --- blog blocks --------------------------------------------------------------------------

    /** Validates and normalises an article's blocks so malformed content can never break the site. */
    public static function cleanBlocks(mixed $blocks): array
    {
        if (!is_array($blocks)) {
            return [];
        }
        $out = [];
        foreach (array_slice(array_values($blocks), 0, 400) as $b) {
            if (!is_array($b) || !in_array($b['type'] ?? '', self::BLOCK_TYPES, true)) {
                continue;
            }
            $type = $b['type'];
            $title = Http::str($b['title'] ?? '', 200);
            $caption = Http::str($b['caption'] ?? '', 600);
            $base = ['type' => $type];
            switch ($type) {
                case 'p':
                case 'h2':
                case 'h3':
                    $text = Http::str($b['text'] ?? '', 6000);
                    if ($text !== '') {
                        $out[] = $base + ['text' => $text];
                    }
                    break;
                case 'ul':
                case 'ol':
                    $items = self::strings($b['items'] ?? []);
                    if ($items) {
                        $out[] = $base + ['items' => $items];
                    }
                    break;
                case 'checklist':
                    $items = self::strings($b['items'] ?? []);
                    if ($items) {
                        $out[] = $base + ['title' => $title, 'items' => $items, 'caption' => $caption];
                    }
                    break;
                case 'callout':
                    $tone = in_array($b['tone'] ?? '', ['note', 'tip', 'warn'], true) ? $b['tone'] : 'note';
                    $text = Http::str($b['text'] ?? '', 3000);
                    if ($text !== '') {
                        $out[] = $base + ['tone' => $tone, 'title' => $title, 'text' => $text];
                    }
                    break;
                case 'cta':
                    $to = self::cleanUrl($b['to'] ?? '');
                    $text = Http::str($b['text'] ?? '', 600);
                    if ($text !== '' && $to !== '') {
                        $out[] = $base + ['text' => $text, 'to' => $to, 'label' => Http::str($b['label'] ?? 'Learn more', 80)];
                    }
                    break;
                case 'stats':
                    $items = [];
                    foreach (array_slice((array) ($b['items'] ?? []), 0, 8) as $i) {
                        if (is_array($i) && Http::str($i['value'] ?? '', 40) !== '') {
                            $items[] = ['value' => Http::str($i['value'], 40), 'label' => Http::str($i['label'] ?? '', 120), 'note' => Http::str($i['note'] ?? '', 300)];
                        }
                    }
                    if ($items) {
                        $out[] = $base + ['title' => $title, 'items' => $items, 'caption' => $caption];
                    }
                    break;
                case 'steps':
                    $items = [];
                    foreach (array_slice((array) ($b['items'] ?? []), 0, 8) as $i) {
                        if (is_array($i) && Http::str($i['title'] ?? '', 120) !== '') {
                            $items[] = ['title' => Http::str($i['title'], 120), 'text' => Http::str($i['text'] ?? '', 500)];
                        }
                    }
                    if ($items) {
                        $out[] = $base + ['title' => $title, 'items' => $items, 'caption' => $caption];
                    }
                    break;
                case 'timeline':
                    $items = [];
                    foreach (array_slice((array) ($b['items'] ?? []), 0, 12) as $i) {
                        if (is_array($i) && Http::str($i['label'] ?? '', 80) !== '') {
                            $items[] = ['label' => Http::str($i['label'], 80), 'title' => Http::str($i['title'] ?? '', 160), 'text' => Http::str($i['text'] ?? '', 500)];
                        }
                    }
                    if ($items) {
                        $out[] = $base + ['title' => $title, 'items' => $items, 'caption' => $caption];
                    }
                    break;
                case 'bars':
                    $items = [];
                    foreach (array_slice((array) ($b['items'] ?? []), 0, 12) as $i) {
                        if (is_array($i) && Http::str($i['label'] ?? '', 160) !== '') {
                            $items[] = [
                                'label' => Http::str($i['label'], 160),
                                'value' => Http::intval($i['value'] ?? 0, 0, 0, 100),
                                'display' => Http::str($i['display'] ?? '', 80),
                                'note' => Http::str($i['note'] ?? '', 300),
                            ];
                        }
                    }
                    if ($items) {
                        $out[] = $base + ['title' => $title, 'items' => $items, 'caption' => $caption];
                    }
                    break;
                case 'compare':
                    $side = static function (mixed $s): array {
                        $s = is_array($s) ? $s : [];
                        $tone = ($s['tone'] ?? '') === 'bad' ? 'bad' : 'good';
                        return ['title' => Http::str($s['title'] ?? '', 160), 'points' => Content::strings($s['points'] ?? [], 12, 300), 'tone' => $tone];
                    };
                    $left = $side($b['left'] ?? []);
                    $right = $side($b['right'] ?? []);
                    if ($left['points'] && $right['points']) {
                        $out[] = $base + ['title' => $title, 'left' => $left, 'right' => $right, 'caption' => $caption];
                    }
                    break;
                case 'table':
                    $columns = self::strings($b['columns'] ?? [], 8, 120);
                    $rows = [];
                    foreach (array_slice((array) ($b['rows'] ?? []), 0, 40) as $r) {
                        if (is_array($r)) {
                            $cells = array_map(static fn($c) => Http::str($c, 800), array_slice(array_values($r), 0, count($columns)));
                            while (count($cells) < count($columns)) {
                                $cells[] = '';
                            }
                            $rows[] = $cells;
                        }
                    }
                    if ($columns && $rows) {
                        $out[] = $base + ['title' => $title, 'columns' => $columns, 'rows' => $rows, 'caption' => $caption];
                    }
                    break;
            }
        }
        return $out;
    }

    public static function cleanFaqs(mixed $faqs): array
    {
        $out = [];
        foreach (array_slice(is_array($faqs) ? array_values($faqs) : [], 0, 20) as $f) {
            if (is_array($f) && Http::str($f['question'] ?? '', 300) !== '' && Http::str($f['answer'] ?? '', 3000) !== '') {
                $out[] = ['question' => Http::str($f['question'], 300), 'answer' => Http::str($f['answer'], 3000)];
            }
        }
        return $out;
    }

    // --- row <-> shape mappers ----------------------------------------------------------------

    public static function postPublic(array $r): array
    {
        $date = substr((string) ($r['published_at'] ?: $r['created_at']), 0, 10);
        $post = [
            'slug' => $r['slug'],
            'title' => $r['title'],
            'shortTitle' => $r['short_title'] ?: $r['title'],
            'description' => (string) $r['description'],
            'date' => $date,
            'updated' => substr((string) $r['updated_at'], 0, 10),
            'category' => (string) $r['category'],
            'keywords' => (string) $r['keywords'],
            'service' => ['label' => (string) ($r['service_label'] ?: 'Contact us'), 'to' => (string) ($r['service_to'] ?: '/contact')],
            'related' => self::decode($r['related']),
            'intro' => (string) $r['intro'],
            'takeaways' => self::decode($r['takeaways']),
            'blocks' => self::decode($r['blocks']),
            'faqs' => self::decode($r['faqs']),
        ];
        if (!empty($r['image_url'])) {
            $post['image'] = $r['image_url'];
        }
        return $post;
    }

    public static function postAdmin(array $r): array
    {
        return self::postPublic($r) + [
            'id' => (int) $r['id'],
            'status' => $r['status'],
            'publishedAt' => $r['published_at'],
            'createdAt' => $r['created_at'],
            'updatedAtFull' => $r['updated_at'],
        ];
    }

    public static function teamPublic(array $r): array
    {
        return ['name' => $r['name'], 'role' => (string) $r['role'], 'bio' => (string) $r['bio'], 'photo' => $r['photo_url'] ?: null];
    }

    public static function teamAdmin(array $r): array
    {
        return self::teamPublic($r) + ['id' => (int) $r['id'], 'isLead' => (bool) $r['is_lead'], 'sortOrder' => (int) $r['sort_order'], 'active' => (bool) $r['active']];
    }

    public static function projectPublic(array $r): array
    {
        $p = [
            'slug' => $r['slug'],
            'title' => $r['title'],
            'category' => (string) $r['category'],
            'industry' => (string) $r['industry'],
            'solutionType' => (string) $r['solution_type'],
            'problem' => (string) $r['problem'],
            'solution' => (string) $r['solution'],
            'technology' => self::decode($r['technology']),
            'placeholder' => (bool) $r['is_placeholder'],
        ];
        foreach (['result' => 'result', 'backend' => 'backend', 'aiIntegration' => 'ai_integration', 'automation' => 'automation'] as $key => $col) {
            if (!empty($r[$col])) {
                $p[$key] = $r[$col];
            }
        }
        foreach (['platform', 'features', 'screenshots'] as $key) {
            $list = self::decode($r[$key]);
            if ($list) {
                $p[$key] = $list;
            }
        }
        return $p;
    }

    public static function projectAdmin(array $r): array
    {
        return self::projectPublic($r) + ['id' => (int) $r['id'], 'status' => $r['status'], 'sortOrder' => (int) $r['sort_order']];
    }

    // --- managed flags + snapshot -------------------------------------------------------------

    public static function managed(string $kind): bool
    {
        if (Db::setting("managed_$kind") === '1') {
            return true;
        }
        $table = ['posts' => 'posts', 'team' => 'team_members', 'projects' => 'projects'][$kind];
        return (int) Db::val("SELECT COUNT(*) FROM $table") > 0;
    }

    public static function markManaged(string $kind): void
    {
        Db::setSetting("managed_$kind", '1');
    }

    /** @return array<string,mixed> the lightweight, cacheable content the live site syncs at runtime */
    public static function snapshot(): array
    {
        $settings = [];
        $contact = [];
        foreach (['email' => 'contact_email', 'phone' => 'contact_phone', 'location' => 'contact_location'] as $key => $setting) {
            $value = Db::setting($setting, '') ?? '';
            if ($value !== '') {
                $contact[$key] = $value;
            }
        }
        $social = [];
        foreach (['linkedin', 'facebook', 'instagram', 'youtube'] as $network) {
            $value = Db::setting("social_$network", '') ?? '';
            if ($value !== '') {
                $social[$network] = $value;
            }
        }
        if ($contact) {
            $settings['contact'] = $contact;
        }
        if ($social) {
            $settings['social'] = $social;
        }

        $nav = array_map(
            static fn(array $n): array => ['label' => $n['label'], 'url' => $n['url'], 'newTab' => (bool) $n['new_tab'], 'style' => $n['style']],
            Db::all('SELECT * FROM nav_items WHERE active = 1 ORDER BY sort_order, id'),
        );

        $texts = array_map(
            static fn(array $t): array => [$t['original'], $t['replacement']],
            Db::all('SELECT original, replacement FROM text_overrides ORDER BY id'),
        );

        $team = null;
        if (self::managed('team')) {
            $members = Db::all('SELECT * FROM team_members WHERE active = 1 ORDER BY is_lead DESC, sort_order, id');
            $lead = null;
            $others = [];
            foreach ($members as $m) {
                if ($lead === null && (int) $m['is_lead'] === 1) {
                    $lead = self::teamPublic($m);
                } else {
                    $others[] = self::teamPublic($m);
                }
            }
            $team = ['lead' => $lead, 'members' => $others];
        }

        $projects = [];
        if (self::managed('projects')) {
            $projects = array_map([self::class, 'projectPublic'], Db::all("SELECT * FROM projects WHERE status = 'published' ORDER BY sort_order, id"));
        }

        return [
            'version' => self::version(),
            'managed' => ['posts' => self::managed('posts'), 'team' => self::managed('team'), 'projects' => self::managed('projects')],
            'settings' => (object) $settings,
            'nav' => $nav,
            'texts' => $texts,
            'team' => $team,
            'projects' => $projects,
        ];
    }

    /** @return list<array<string,mixed>> all published posts, full content (used on blog pages + at build time) */
    public static function publishedPosts(): array
    {
        return array_map(
            [self::class, 'postPublic'],
            Db::all("SELECT * FROM posts WHERE status = 'published' AND (published_at IS NULL OR published_at <= ?) ORDER BY published_at DESC, id DESC", [gmdate('Y-m-d H:i:s')]),
        );
    }

    // --- starter content ----------------------------------------------------------------------

    /** @param array<string,mixed> $seed @return array<string,int> */
    public static function importSeed(array $seed, bool $replace = false): array
    {
        $now = Db::now();
        $counts = ['posts' => 0, 'team' => 0, 'projects' => 0];

        if (!empty($seed['posts']) && is_array($seed['posts'])) {
            if ($replace) {
                Db::exec('DELETE FROM posts');
            }
            foreach ($seed['posts'] as $p) {
                if (!is_array($p) || empty($p['slug']) || Db::val('SELECT COUNT(*) FROM posts WHERE slug = ?', [$p['slug']])) {
                    continue;
                }
                $date = (string) ($p['date'] ?? gmdate('Y-m-d'));
                Db::insert('posts', [
                    'slug' => Http::str($p['slug'], 160),
                    'title' => Http::str($p['title'] ?? '', 255),
                    'short_title' => Http::str($p['shortTitle'] ?? '', 190),
                    'description' => Http::str($p['description'] ?? '', 320),
                    'category' => Http::str($p['category'] ?? '', 80),
                    'keywords' => Http::str($p['keywords'] ?? '', 800),
                    'service_label' => Http::str($p['service']['label'] ?? '', 160),
                    'service_to' => Http::str($p['service']['to'] ?? '', 160),
                    'intro' => Http::str($p['intro'] ?? '', 4000),
                    'takeaways' => self::encode(self::strings($p['takeaways'] ?? [], 12, 500)),
                    'blocks' => self::encode(self::cleanBlocks($p['blocks'] ?? [])),
                    'faqs' => self::encode(self::cleanFaqs($p['faqs'] ?? [])),
                    'related' => self::encode(self::strings($p['related'] ?? [], 6, 160)),
                    'status' => 'published',
                    'published_at' => $date . ' 09:00:00',
                    'created_at' => $date . ' 09:00:00',
                    'updated_at' => ((string) ($p['updated'] ?? $date)) . ' 09:00:00',
                ]);
                $counts['posts']++;
            }
            self::markManaged('posts');
        }

        if (!empty($seed['team']) && is_array($seed['team'])) {
            if ($replace) {
                Db::exec('DELETE FROM team_members');
            }
            if ((int) Db::val('SELECT COUNT(*) FROM team_members') === 0) {
                $order = 0;
                $people = [];
                if (!empty($seed['team']['lead'])) {
                    $people[] = ['lead' => 1] + (array) $seed['team']['lead'];
                }
                foreach ((array) ($seed['team']['members'] ?? []) as $m) {
                    $people[] = ['lead' => 0] + (array) $m;
                }
                foreach ($people as $m) {
                    Db::insert('team_members', [
                        'name' => Http::str($m['name'] ?? '', 160),
                        'role' => Http::str($m['role'] ?? '', 160),
                        'bio' => Http::str($m['bio'] ?? '', 1500),
                        'photo_url' => Http::str($m['photo'] ?? '', 255) ?: null,
                        'is_lead' => (int) $m['lead'],
                        'sort_order' => $order++,
                        'active' => 1,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                    $counts['team']++;
                }
                self::markManaged('team');
            }
        }

        if (!empty($seed['projects']) && is_array($seed['projects'])) {
            if ($replace) {
                Db::exec('DELETE FROM projects');
            }
            $order = (int) Db::val('SELECT COALESCE(MAX(sort_order), 0) FROM projects');
            foreach ($seed['projects'] as $p) {
                if (!is_array($p) || empty($p['slug']) || Db::val('SELECT COUNT(*) FROM projects WHERE slug = ?', [$p['slug']])) {
                    continue;
                }
                Db::insert('projects', self::projectRow($p) + ['sort_order' => ++$order, 'created_at' => $now, 'updated_at' => $now]);
                $counts['projects']++;
            }
            self::markManaged('projects');
        }

        self::bump();
        return $counts;
    }

    /** @param array<string,mixed> $p @return array<string,mixed> columns for the projects table */
    public static function projectRow(array $p): array
    {
        return [
            'slug' => Http::str($p['slug'] ?? '', 160),
            'title' => Http::str($p['title'] ?? '', 255),
            'category' => Http::str($p['category'] ?? '', 40),
            'industry' => Http::str($p['industry'] ?? '', 120),
            'solution_type' => Http::str($p['solutionType'] ?? '', 160),
            'problem' => Http::str($p['problem'] ?? '', 2000),
            'solution' => Http::str($p['solution'] ?? '', 2000),
            'technology' => self::encode(self::strings($p['technology'] ?? [], 20, 80)),
            'result' => Http::str($p['result'] ?? '', 2000),
            'platform' => self::encode(self::strings($p['platform'] ?? [], 10, 40)),
            'features' => self::encode(self::strings($p['features'] ?? [], 30, 200)),
            'backend' => Http::str($p['backend'] ?? '', 190) ?: null,
            'ai_integration' => Http::str($p['aiIntegration'] ?? '', 255) ?: null,
            'automation' => Http::str($p['automation'] ?? '', 255) ?: null,
            'screenshots' => self::encode(self::strings($p['screenshots'] ?? [], 12, 255)),
            'is_placeholder' => !empty($p['placeholder']) ? 1 : 0,
            'status' => ($p['status'] ?? 'published') === 'draft' ? 'draft' : 'published',
        ];
    }
}
