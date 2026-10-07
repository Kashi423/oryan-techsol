<?php
declare(strict_types=1);

// Front controller for the Oryan Techsol admin/API backend. Every /api/* request lands here
// (see .htaccess). Setup: docs/ADMIN-SETUP.md.

define('ORYAN_API', true);
define('API_DIR', __DIR__);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/routes/public.php';
require __DIR__ . '/routes/admin_core.php';
require __DIR__ . '/routes/admin_content.php';

Router::dispatch();
