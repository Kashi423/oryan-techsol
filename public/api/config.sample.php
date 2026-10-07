<?php
// Copy this file to config.php (same folder) on the server and fill it in. config.php is
// git-ignored and is NEVER uploaded by the deploy workflow — it lives only on the server.
// See docs/ADMIN-SETUP.md for the step-by-step guide.

return [
    // --- Database (create the DB + user in cPanel → MySQL® Databases) ---------------------
    'db' => [
        'driver'  => 'mysql',            // 'mysql' on Namecheap. ('sqlite' is only for local tests.)
        'host'    => 'localhost',
        'name'    => 'cpanelprefix_oryan',
        'user'    => 'cpanelprefix_oryan',
        'pass'    => 'CHANGE-ME',
        'charset' => 'utf8mb4',
    ],

    // --- Site -------------------------------------------------------------------------------
    'site_url'        => 'https://oryantechsol.com',
    'allowed_origins' => ['https://oryantechsol.com', 'https://www.oryantechsol.com'],

    // Long random string (40+ chars). Needed to open install.php, and used to hash visitor IPs
    // for rate limiting. Keep it secret; changing it later only resets rate-limit history.
    'install_key' => 'CHANGE-ME-TO-A-LONG-RANDOM-STRING',

    // --- Email (new-lead alerts) ---------------------------------------------------------
    'notify_email' => 'hello@oryantechsol.com',
    'mail_from'    => 'no-reply@oryantechsol.com',   // must be an address on your own domain

    // --- "Publish site" button (optional) ------------------------------------------------
    // A GitHub fine-grained token limited to THIS repository with only "Actions: Read and
    // write". Leave 'token' empty to disable the button (the site still updates live for
    // visitors; the button just rebuilds the SEO snapshot).
    'github' => [
        'token'    => '',
        'repo'     => 'Kashi423/oryan-techsol',
        'workflow' => 'deploy.yml',
        'ref'      => 'main',
    ],

    'debug' => false,
];
