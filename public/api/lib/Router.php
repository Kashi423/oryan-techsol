<?php
declare(strict_types=1);
defined('ORYAN_API') || exit;

// Minimal router. Routes are registered by routes/*.php with Router::get/post/put/patch/delete.
//   Router::get('/admin/leads/{id}', fn(array $p, array $in) => [...], auth: true)
// Handlers return data (sent as JSON) or throw HttpError. `auth` routes require a signed-in
// user; state-changing ones also verify the CSRF token. `role: 'admin'` restricts further.
final class Router
{
    /** @var list<array{string,string,callable,bool,?string}> */
    private static array $routes = [];

    public static function add(string $method, string $pattern, callable $handler, bool $auth = false, ?string $role = null): void
    {
        $regex = '#^' . preg_replace('#\{([a-z_]+)\}#i', '(?P<$1>[^/]+)', $pattern) . '/?$#';
        self::$routes[] = [$method, $regex, $handler, $auth, $role];
    }

    public static function get(string $p, callable $h, bool $auth = false, ?string $role = null): void { self::add('GET', $p, $h, $auth, $role); }
    public static function post(string $p, callable $h, bool $auth = false, ?string $role = null): void { self::add('POST', $p, $h, $auth, $role); }
    public static function put(string $p, callable $h, bool $auth = false, ?string $role = null): void { self::add('PUT', $p, $h, $auth, $role); }
    public static function patch(string $p, callable $h, bool $auth = false, ?string $role = null): void { self::add('PATCH', $p, $h, $auth, $role); }
    public static function delete(string $p, callable $h, bool $auth = false, ?string $role = null): void { self::add('DELETE', $p, $h, $auth, $role); }

    public static function path(): string
    {
        $uri = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
        $base = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/api/index.php')), '/');
        if ($base !== '' && str_starts_with($uri, $base)) {
            $uri = substr($uri, strlen($base));
        }
        $uri = '/' . trim(preg_replace('#/index\.php$#', '', $uri) ?? '', '/');
        return rawurldecode($uri === '' ? '/' : $uri);
    }

    public static function dispatch(): never
    {
        $method = Http::method();
        if ($method === 'OPTIONS') {
            Http::json(['ok' => true], 204);
        }
        $path = self::path();
        $allowedMethods = [];
        foreach (self::$routes as [$m, $regex, $handler, $auth, $role]) {
            if (!preg_match($regex, $path, $matches)) {
                continue;
            }
            if ($m !== $method) {
                $allowedMethods[] = $m;
                continue;
            }
            $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
            if ($auth) {
                Auth::require($role);
                if ($method !== 'GET') {
                    Auth::verifyCsrf();
                }
            } elseif ($method !== 'GET') {
                Http::checkOrigin();
            }
            $isUpload = str_contains(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'multipart/form-data');
            $input = ($method === 'GET' || $method === 'DELETE' || $isUpload) ? [] : Http::body(4_194_304);
            $result = $handler($params, $input);
            Http::json($result ?? ['ok' => true]);
        }
        if ($allowedMethods) {
            throw new HttpError(405, 'Method not allowed.');
        }
        throw new HttpError(404, 'Not found.');
    }
}
