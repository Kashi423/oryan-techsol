# Admin panel — setup & daily use

The website now has a private **admin panel** at `https://oryantechsol.com/admin` with a small PHP +
MySQL backend that runs on your existing Namecheap hosting. It gives you:

| Area | What you can do |
|---|---|
| **Leads** | Every contact-form inquiry is saved (and emailed to you). Filter, search, add notes, change status, export to CSV. |
| **Chats** | Read the conversations visitors had with the AI chat; spot people who left an email or phone number. |
| **Blog** | Write, edit and publish articles — with infographics, tables, FAQs and SEO fields — in a visual editor. |
| **Team** | Add/edit people, photos, roles and order for the About page. |
| **Portfolio** | Add/edit case studies. |
| **Page text** | Click any text on any page and change it, without touching code. |
| **Menu** | Add your own links and buttons to the top menu. |
| **Settings** | Public contact details, social-media links, lead-alert email, users and passwords. |

Until you finish this one-time setup the website keeps working exactly as before (the contact form
falls back to opening the visitor's email app, the blog/team/portfolio use the content in the code).

---

## One-time setup (about 15 minutes)

You do these steps in your Namecheap **cPanel**. Nothing here needs coding.

### 1. Deploy the code
Push to `main` as usual. The deploy uploads the new site **and** the backend files into `public_html/api/`.
(You can check: `https://oryantechsol.com/api/health` should answer with a short message — it will say
the API is not configured yet, which is expected.)

### 2. Create the database
1. cPanel → **MySQL® Databases**.
2. **Create New Database** → name it e.g. `oryan` (cPanel adds a prefix, so it becomes like `abcd1234_oryan`).
3. **MySQL Users → Add New User** → e.g. `oryan` with a **strong generated password**. Copy the password.
4. **Add User To Database** → choose the user and the database → tick **ALL PRIVILEGES** → Make Changes.

Write down the three values: **database name**, **user name**, **password** (all include the cPanel prefix).

### 3. Check the PHP version
cPanel → **Select PHP Version** (or MultiPHP Manager): choose **PHP 8.1 or newer** for the domain.
In the extensions list make sure these are ticked (they usually already are): `pdo_mysql`, `mbstring`,
`gd`, `curl`, `fileinfo`.

### 4. Create the config file
1. cPanel → **File Manager** → open `public_html/api/`.
2. Right-click **`config.sample.php`** → **Copy** → name the copy **`config.php`**.
3. Right-click `config.php` → **Edit** and fill in:
   - `db` → `name`, `user`, `pass` (from step 2). Leave `host` as `localhost`.
   - `install_key` → a long random string (40+ characters). Think of it as a one-time master password.
     Any password generator works. **Keep it secret.**
   - `notify_email` → where new-lead alerts should go (e.g. `hello@oryantechsol.com`).
   - `mail_from` → an address on your own domain, e.g. `no-reply@oryantechsol.com`.
4. Save.

> `config.php` lives only on the server. The deploy never uploads or deletes it, and it is not in GitHub.

### 5. Run the installer
Open this address in your browser (replace `YOUR_KEY` with the `install_key` you chose):

```
https://oryantechsol.com/api/install.php?key=YOUR_KEY
```

It checks your setup, then asks for **your name, email and a password** (10+ characters). Leave
**"Load the website's current blog articles, team and portfolio"** ticked — this copies everything that is
on the site today into the admin so you can edit it. Press **Install**.

### 6. Sign in
Go to `https://oryantechsol.com/admin` and sign in with the account you just created. 🎉

Optional but recommended: delete `public_html/api/install.php` afterwards (it is already locked, so this
is only extra tidiness — the next deploy will put it back, and it stays locked).

---

## Day-to-day use

### Leads
New inquiries appear on the dashboard and under **Leads**, and are emailed to you. Open one to see the
full message, set a status (new → contacted → qualified → won/lost), add private notes, or reply by email.
**Export CSV** downloads everything for a spreadsheet.

### Chats
Every AI-chat conversation is saved under **Chats**. Tick *Shared contact details* to see only the people who
left an email or phone number. Mark conversations as reviewed once you've read them.

### Blog
**Blog → New article.** Give it a title, intro and key takeaways, then build the body from blocks:
paragraphs, headings, lists, callouts, and the infographic blocks (stat cards, process steps, bar chart,
side-by-side comparison, table, checklist, timeline). Lists and tables are typed as simple lines, e.g.
`Label | Value | Note`. Add FAQs and the SEO fields (URL slug, meta description, share image).
Use **Save as draft** while writing and **Publish** when ready.

Inside any text you can write links as `[anchor text](/blog/another-article)` and bold as `**bold**`.
Linking your articles to each other and to your service pages is good for SEO.

### Team and Portfolio
Add, edit, reorder and hide people/projects. Upload photos with the **Upload image** button (JPG/PNG/WebP,
up to 5 MB; large images are resized automatically). Tick **Sample project** for illustrative case studies so
visitors are told they aren't real clients.

### Editing any text on the website
1. **Page text → Edit text on the website** (or visit `https://oryantechsol.com/?cms-edit=1` while signed in).
2. Click **Edit text** in the bar at the bottom-left. Every piece of text gets a dashed outline.
3. Click any text, type the new wording, press **Apply**. Repeat as needed.
4. Press **Save changes**. Visitors see it immediately.

Good to know: a change applies everywhere that *exact* wording appears (a button label used on five pages
changes on all five). Edited texts are listed under **Page text**, where you can adjust or restore them.

### Menu
**Menu → Add menu item.** Choose a *link* (appears inside the menu bar) or a *button* (appears next to
“Book a Free Consultation”). Use `/pricing` for pages on your site or a full `https://…` address.

### Settings
Public phone/email/address, social-media links (they appear as icons in the footer), where lead alerts go,
your password, and — as an admin — other users (admins can do everything; editors manage content and leads
but not settings, users or publishing).

---

## "Live" changes vs. "Publish site"

- **Live:** the moment you save in the admin, visitors' browsers pick up the change (menu, text, team,
  portfolio, new/edited blog articles).
- **Publish site:** the website is *pre-built* so Google and social-media previews (Facebook, LinkedIn,
  WhatsApp) can read it without running JavaScript. After bigger edits — new articles, rewritten pages —
  press **Settings → Publish site**. It rebuilds the site in a few minutes using the latest admin content.
  Anything you push to GitHub also rebuilds it.

### Optional: enable the Publish button
The button needs permission to start your deploy workflow on GitHub:
1. GitHub → your profile picture → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Repository access:** *Only select repositories* → `oryan-techsol`.
3. **Permissions → Repository permissions → Actions:** *Read and write*. Nothing else.
4. Copy the token into `public_html/api/config.php` under `'github' => ['token' => '…']`.

Without a token everything still works — run the **"Deploy to Namecheap"** workflow from GitHub's Actions tab
(*Run workflow*) when you want to publish.

---

## Security notes

- Sign-in uses HttpOnly, same-site session cookies, hashed passwords, a CSRF token on every change, and
  throttling after repeated failed sign-ins. Use a strong, unique password.
- Visitor IP addresses are **never stored** — only a one-way token used for spam limits.
- Uploads are checked by content, resized, and the uploads folder cannot run scripts.
- Only the people you add as users can see leads and chats. Remove a user (or deactivate them) in
  **Settings → Users** when someone leaves.
- Back up the database now and then: cPanel → **phpMyAdmin** → select the database → **Export**. Also keep a
  copy of the `public_html/uploads/` folder (photos you uploaded).

## Forgot your admin password?
Open `https://oryantechsol.com/api/install.php?key=YOUR_KEY&reset=1`, enter the account email and a new
password. (You need the `install_key` from `config.php`.)

## Troubleshooting
| Problem | Fix |
|---|---|
| `/admin` says the service isn't set up | `config.php` is missing or wrong — redo step 4 — then run the installer. |
| Installer says "Database problem" | The database name/user/password in `config.php` are wrong (remember the cPanel prefix), or the user isn't added to the database with ALL PRIVILEGES. |
| No lead-alert emails arrive | Check spam. Make sure `mail_from` is an address on your domain. The lead is always saved in **Leads** even if the email fails. |
| "Publish site" does nothing | Add the GitHub token (above), or use *Run workflow* on GitHub. |
| A text edit changed more places than expected | Page text applies to the exact wording everywhere. Restore it under **Page text** and edit a more specific sentence instead. |
| Photos don't appear | Re-upload; make sure the file is JPG/PNG/WebP under 5 MB. |

## For developers
- Backend: `public/api/` (PHP 8.1+, PDO MySQL; SQLite is supported for local tests). Routes in `routes/`,
  helpers in `lib/`. Schema is created by `lib/Schema.php` (numbered, idempotent migrations).
- Admin UI: `src/admin/` (React, lazy-loaded at `/admin`, never shipped to normal visitors).
- Content flow: `scripts/fetch-cms.mjs` pulls published content into `src/data/cms-snapshot.js` in CI before
  the build; `src/lib/cms/store.js` then keeps it fresh at runtime. Text edits are applied by the custom JSX
  runtime in `src/lib/cms-jsx/`.
- Starter content for the installer: `npm run seed` regenerates `public/api/seed/content.json` from the code.
- Local admin development: run the PHP API somewhere (`php -S`), then
  `VITE_API_PROXY=http://127.0.0.1:8000 npm run dev`.
