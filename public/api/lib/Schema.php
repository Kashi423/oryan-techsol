<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Database schema. Written to run unchanged on MySQL/MariaDB (production on Namecheap) and on
// SQLite (local tests): column types and index syntax are chosen per driver below.
// Migrations are idempotent and numbered — add a new entry to MIGRATIONS to change the schema
// later; never edit an old one.
final class Schema
{
    private static function mysql(): bool
    {
        return Db::driver() === 'mysql';
    }

    /** @return array<string,string> */
    private static function types(): array
    {
        $mysql = self::mysql();
        return [
            'pk'   => $mysql ? 'INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT',
            'int'  => $mysql ? 'INT UNSIGNED NOT NULL DEFAULT 0' : 'INTEGER NOT NULL DEFAULT 0',
            'bool' => $mysql ? 'TINYINT(1) NOT NULL DEFAULT 0' : 'INTEGER NOT NULL DEFAULT 0',
            'long' => $mysql ? 'LONGTEXT' : 'TEXT',
            'time' => $mysql ? 'DATETIME NOT NULL' : 'TEXT NOT NULL',
            'timeNull' => $mysql ? 'DATETIME NULL' : 'TEXT NULL',
        ];
    }

    /** @param list<string> $columns column definitions  @param list<array{0:string,1:string}> $indexes [name, columns] */
    private static function table(string $name, array $columns, array $indexes = [], array $uniques = []): void
    {
        $lines = $columns;
        if (self::mysql()) {
            foreach ($uniques as $uname => $ucols) {
                $lines[] = "UNIQUE KEY $uname ($ucols)";
            }
            foreach ($indexes as [$iname, $icols]) {
                $lines[] = "KEY $iname ($icols)";
            }
            $suffix = ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci';
        } else {
            foreach ($uniques as $uname => $ucols) {
                $lines[] = "UNIQUE ($ucols)";
            }
            $suffix = '';
        }
        Db::pdo()->exec("CREATE TABLE IF NOT EXISTS $name (\n  " . implode(",\n  ", $lines) . "\n)$suffix");
        if (!self::mysql()) {
            foreach ($indexes as [$iname, $icols]) {
                Db::pdo()->exec("CREATE INDEX IF NOT EXISTS {$name}_{$iname} ON $name ($icols)");
            }
        }
    }

    public static function migrate(): void
    {
        $t = self::types();
        // Version 1 — initial schema.
        self::table('settings', ['k VARCHAR(100) NOT NULL PRIMARY KEY', "v {$t['long']}"]);
        $current = (int) (Db::setting('schema_version', '0') ?? '0');
        if ($current >= 1) {
            return;
        }

        self::table('users', [
            "id {$t['pk']}", 'email VARCHAR(190) NOT NULL', 'name VARCHAR(120) NOT NULL',
            'password_hash VARCHAR(255) NOT NULL', "role VARCHAR(20) NOT NULL DEFAULT 'admin'",
            "active {$t['bool']}", "last_login_at {$t['timeNull']}", "created_at {$t['time']}",
        ], [], ['uq_users_email' => 'email']);

        self::table('rate_hits', [
            "id {$t['pk']}", 'bucket VARCHAR(80) NOT NULL', "created_at {$t['time']}",
        ], [['bucket', 'bucket, created_at']]);

        self::table('leads', [
            "id {$t['pk']}", 'name VARCHAR(160) NOT NULL', 'company VARCHAR(190) NULL', 'email VARCHAR(190) NOT NULL',
            'phone VARCHAR(60) NULL', 'website VARCHAR(255) NULL', 'need VARCHAR(500) NULL', 'project_type VARCHAR(80) NULL',
            "challenge {$t['long']}", 'budget VARCHAR(80) NULL', 'timeline VARCHAR(80) NULL', "additional {$t['long']}",
            'source_path VARCHAR(190) NULL', "status VARCHAR(20) NOT NULL DEFAULT 'new'", "notes {$t['long']}",
            'ip_hash VARCHAR(40) NULL', 'user_agent VARCHAR(255) NULL', "created_at {$t['time']}", "updated_at {$t['time']}",
        ], [['status', 'status, created_at'], ['ip', 'ip_hash, created_at']]);

        self::table('chat_sessions', [
            "id {$t['pk']}", 'session_key VARCHAR(64) NOT NULL', 'page VARCHAR(190) NULL', 'first_message VARCHAR(255) NULL',
            'contact_email VARCHAR(190) NULL', 'contact_phone VARCHAR(60) NULL', "message_count {$t['int']}",
            "reviewed {$t['bool']}", "started_at {$t['time']}", "last_at {$t['time']}",
        ], [['last', 'last_at']], ['uq_chat_key' => 'session_key']);

        self::table('chat_messages', [
            "id {$t['pk']}", "session_id {$t['int']}", 'role VARCHAR(12) NOT NULL', "content {$t['long']}", "created_at {$t['time']}",
        ], [['session', 'session_id, id']]);

        self::table('posts', [
            "id {$t['pk']}", 'slug VARCHAR(160) NOT NULL', 'title VARCHAR(255) NOT NULL', 'short_title VARCHAR(190) NULL',
            'description VARCHAR(320) NULL', 'category VARCHAR(80) NULL', "keywords {$t['long']}",
            'service_label VARCHAR(160) NULL', 'service_to VARCHAR(160) NULL', "intro {$t['long']}",
            "takeaways {$t['long']}", "blocks {$t['long']}", "faqs {$t['long']}", "related {$t['long']}",
            'image_url VARCHAR(255) NULL', "status VARCHAR(12) NOT NULL DEFAULT 'draft'", "published_at {$t['timeNull']}",
            "created_at {$t['time']}", "updated_at {$t['time']}",
        ], [['status', 'status, published_at']], ['uq_posts_slug' => 'slug']);

        self::table('team_members', [
            "id {$t['pk']}", 'name VARCHAR(160) NOT NULL', 'role VARCHAR(160) NULL', "bio {$t['long']}", 'photo_url VARCHAR(255) NULL',
            "is_lead {$t['bool']}", "sort_order {$t['int']}", 'active TINYINT(1) NOT NULL DEFAULT 1',
            "created_at {$t['time']}", "updated_at {$t['time']}",
        ], [['sort', 'sort_order']]);

        self::table('projects', [
            "id {$t['pk']}", 'slug VARCHAR(160) NOT NULL', 'title VARCHAR(255) NOT NULL', 'category VARCHAR(40) NULL',
            'industry VARCHAR(120) NULL', 'solution_type VARCHAR(160) NULL', "problem {$t['long']}", "solution {$t['long']}",
            "technology {$t['long']}", "result {$t['long']}", "platform {$t['long']}", "features {$t['long']}",
            'backend VARCHAR(190) NULL', 'ai_integration VARCHAR(255) NULL', 'automation VARCHAR(255) NULL',
            "screenshots {$t['long']}", "is_placeholder {$t['bool']}", "status VARCHAR(12) NOT NULL DEFAULT 'published'",
            "sort_order {$t['int']}", "created_at {$t['time']}", "updated_at {$t['time']}",
        ], [['sort', 'sort_order']], ['uq_projects_slug' => 'slug']);

        self::table('text_overrides', [
            "id {$t['pk']}", 'hash CHAR(40) NOT NULL', "original {$t['long']}", "replacement {$t['long']}",
            'page_path VARCHAR(190) NULL', 'updated_by VARCHAR(190) NULL', "updated_at {$t['time']}",
        ], [], ['uq_text_hash' => 'hash']);

        self::table('nav_items', [
            "id {$t['pk']}", 'label VARCHAR(80) NOT NULL', 'url VARCHAR(255) NOT NULL', "new_tab {$t['bool']}",
            "style VARCHAR(12) NOT NULL DEFAULT 'link'", "sort_order {$t['int']}", 'active TINYINT(1) NOT NULL DEFAULT 1',
            "created_at {$t['time']}",
        ], [['sort', 'sort_order']]);

        self::table('media', [
            "id {$t['pk']}", 'path VARCHAR(255) NOT NULL', 'url VARCHAR(255) NOT NULL', 'original_name VARCHAR(190) NULL',
            'mime VARCHAR(60) NULL', "size {$t['int']}", "width {$t['int']}", "height {$t['int']}",
            'uploaded_by VARCHAR(190) NULL', "created_at {$t['time']}",
        ]);

        self::table('audit_log', [
            "id {$t['pk']}", "user_id {$t['int']}", 'user_email VARCHAR(190) NULL', 'action VARCHAR(40) NOT NULL',
            'entity VARCHAR(40) NULL', 'entity_id VARCHAR(60) NULL', 'detail VARCHAR(500) NULL', "created_at {$t['time']}",
        ], [['created', 'created_at']]);

        Db::setSetting('schema_version', '1');
    }

    public static function installed(): bool
    {
        try {
            return (int) (Db::setting('schema_version', '0') ?? '0') >= 1
                && (int) Db::val('SELECT COUNT(*) FROM users') > 0;
        } catch (Throwable) {
            return false;
        }
    }
}
