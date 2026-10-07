<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Plain-text email via PHP mail() (works on Namecheap shared hosting). Every header value is
// stripped of line breaks so visitor input can never inject extra headers.
final class Mailer
{
    public static function send(string $to, string $subject, string $body, ?string $replyTo = null): bool
    {
        $to = Http::headerSafe($to);
        if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        $from = Http::headerSafe((string) Cfg::get('mail_from', 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost')));
        $headers = [
            'From: Oryan Techsol <' . $from . '>',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'X-Mailer: Oryan Techsol CMS',
        ];
        if ($replyTo !== null && filter_var(Http::headerSafe($replyTo), FILTER_VALIDATE_EMAIL)) {
            $headers[] = 'Reply-To: ' . Http::headerSafe($replyTo);
        }
        $encodedSubject = '=?UTF-8?B?' . base64_encode(Http::headerSafe($subject)) . '?=';
        try {
            $ok = @mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $from);
        } catch (Throwable) {
            $ok = false;
        }
        if (!$ok) {
            @file_put_contents(API_DIR . '/storage/mail-failed.log', '[' . gmdate('c') . "] to=$to subject=$subject\n", FILE_APPEND);
        }
        return (bool) $ok;
    }
}
