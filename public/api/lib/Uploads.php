<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Image uploads for team photos, portfolio shots and blog images. Only real JPEG/PNG/WebP/GIF
// files are accepted (checked by content, not by name), saved under /uploads with a random
// name, and large images are scaled down when the GD extension is available.
final class Uploads
{
    private const MAX_BYTES = 5 * 1024 * 1024;
    private const MAX_WIDTH = 1800;
    private const TYPES = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
    ];

    public static function dir(): string
    {
        return dirname(API_DIR) . '/uploads';
    }

    private static function ensureDir(string $dir): void
    {
        if (!is_dir($dir) && !@mkdir($dir, 0755, true) && !is_dir($dir)) {
            throw new HttpError(500, 'Could not create the uploads folder.');
        }
        $guard = self::dir() . '/.htaccess';
        if (!is_file($guard)) {
            @file_put_contents($guard, "# No script execution inside uploads.\n<FilesMatch \"\\.(php|phtml|phar|php[0-9])$\">\n  <IfModule mod_authz_core.c>\n    Require all denied\n  </IfModule>\n  <IfModule !mod_authz_core.c>\n    Deny from all\n  </IfModule>\n</FilesMatch>\nOptions -Indexes -ExecCGI\n");
        }
    }

    /** @param array<string,mixed> $file one entry of $_FILES */
    public static function save(array $file, ?string $uploadedBy): array
    {
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            throw new HttpError(422, 'The upload failed. Please try again with a smaller image.');
        }
        $tmp = (string) ($file['tmp_name'] ?? '');
        $size = (int) ($file['size'] ?? 0);
        if ($size <= 0 || $size > self::MAX_BYTES) {
            throw new HttpError(422, 'Images must be under 5 MB.');
        }
        $info = @getimagesize($tmp);
        if ($info === false || !isset(self::TYPES[$info['mime'] ?? ''])) {
            throw new HttpError(422, 'Only JPG, PNG, WebP or GIF images are allowed.');
        }
        $mime = $info['mime'];
        $ext = self::TYPES[$mime];

        $sub = gmdate('Y/m');
        $dir = self::dir() . '/' . $sub;
        self::ensureDir($dir);
        $name = bin2hex(random_bytes(10)) . '.' . $ext;
        $target = $dir . '/' . $name;

        $width = (int) $info[0];
        $height = (int) $info[1];
        $resized = false;
        if ($width > self::MAX_WIDTH && $mime !== 'image/gif' && function_exists('imagecreatetruecolor')) {
            $resized = self::resize($tmp, $mime, $target, self::MAX_WIDTH);
            if ($resized) {
                $height = (int) round($height * self::MAX_WIDTH / $width);
                $width = self::MAX_WIDTH;
            }
        }
        if (!$resized && !@move_uploaded_file($tmp, $target)) {
            // move_uploaded_file refuses non-HTTP uploads (used in tests) — fall back to rename.
            if (!@rename($tmp, $target) && !@copy($tmp, $target)) {
                throw new HttpError(500, 'Could not save the image.');
            }
        }
        @chmod($target, 0644);

        $url = '/uploads/' . $sub . '/' . $name;
        $id = Db::insert('media', [
            'path' => 'uploads/' . $sub . '/' . $name,
            'url' => $url,
            'original_name' => Http::str(basename((string) ($file['name'] ?? '')), 190),
            'mime' => $mime,
            'size' => (int) (@filesize($target) ?: $size),
            'width' => $width,
            'height' => $height,
            'uploaded_by' => $uploadedBy,
            'created_at' => Db::now(),
        ]);
        return ['id' => $id, 'url' => $url, 'width' => $width, 'height' => $height];
    }

    private static function resize(string $source, string $mime, string $target, int $maxWidth): bool
    {
        try {
            $image = match ($mime) {
                'image/jpeg' => @imagecreatefromjpeg($source),
                'image/png' => @imagecreatefrompng($source),
                'image/webp' => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($source) : false,
                default => false,
            };
            if (!$image) {
                return false;
            }
            $scaled = imagescale($image, $maxWidth);
            if (!$scaled) {
                return false;
            }
            $ok = match ($mime) {
                'image/jpeg' => imagejpeg($scaled, $target, 86),
                'image/png' => imagepng($scaled, $target, 7),
                'image/webp' => imagewebp($scaled, $target, 86),
                default => false,
            };
            return (bool) $ok;
        } catch (Throwable) {
            return false;
        }
    }

    public static function deleteByUrl(string $url): void
    {
        if (!str_starts_with($url, '/uploads/') || str_contains($url, '..')) {
            return;
        }
        $path = dirname(API_DIR) . $url;
        if (is_file($path)) {
            @unlink($path);
        }
        Db::exec('DELETE FROM media WHERE url = ?', [$url]);
    }
}
