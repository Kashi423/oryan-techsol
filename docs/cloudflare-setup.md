# Cloudflare (free) in front of oryantechsol.com

**Why:** the host (Namecheap shared, LiteSpeed) takes about 1–2.5 seconds to answer even small requests from far-away visitors. Cloudflare serves the static files (JS, CSS, images, fonts) from a nearby data centre and keeps connections warm, which mainly improves load time (LCP) and the Core Web Vitals Google uses for ranking.

**What stays the same:** the site is still deployed by GitHub Actions over FTP to Namecheap. Cloudflare only sits in front.

## What DNS looks like today (checked 2026-10-20)
- Nameservers: `dns1.namecheaphosting.com`, `dns2.namecheaphosting.com`
- `oryantechsol.com` and `www` → `184.94.213.232`
- **Mail (must not break):** MX → `smtp.google.com` (Google Workspace). TXT records: SPF (`v=spf1 … include:_spf.google.com …`) and two `google-site-verification=…` records (Search Console).

## Steps (about 20 minutes; you must do these, they involve your accounts)
1. **Create a free account** at cloudflare.com and choose **Add a site** → `oryantechsol.com` → **Free** plan.
2. **Check the imported DNS records.** Cloudflare scans the existing records. Make sure these exist before continuing:
   - `A oryantechsol.com → 184.94.213.232` and `A`/`CNAME www`
   - the `MX` record(s) for Google, the SPF `TXT`, and both `google-site-verification` `TXT` records
   - anything for cPanel mail (`mail`, `ftp`, `cpanel`) if you use it
   Set **MX records and mail-related hosts to "DNS only" (grey cloud)**. Set the website's `A` and `www` records to **Proxied (orange cloud)**. `ftp` must be **DNS only** or the deploy's FTP upload will fail.
3. **Change the nameservers** at Namecheap (Domain List → Manage → Nameservers → *Custom DNS*) to the two Cloudflare ones it shows you. It can take from a few minutes up to a day; the site keeps working throughout.
4. In Cloudflare **SSL/TLS** set **Full (strict)** (the origin already has a valid certificate), and turn on **Always Use HTTPS**.
5. **Speed** settings: leave **Brotli** on; turn **Early Hints** on; keep **Rocket Loader off** (it breaks React apps); do not enable Auto Minify.
6. **Cache rules** (Caching → Cache Rules), in this order:
   1. *Bypass cache* when the path starts with `/api/` or `/admin` (the CMS and admin must never be cached).
   2. *Cache everything, Edge TTL 1 month, Browser TTL respect origin* when the path starts with `/assets/`, `/blog/covers/`, `/pins/`, `/og/`, `/team/`.
   3. Leave HTML pages at Cloudflare's default (they are served with `no-cache`, so they are revalidated and always fresh after a deploy). Do **not** add "Cache Everything" for HTML unless you also purge the cache after each deploy (see below).
7. **Verify:** open the site in a private window; in Chrome DevTools → Network, a JS file should show a response header `cf-cache-status: HIT` on the second load, and `server: cloudflare`.

## After it is on
- The daily rebuild uploads new HTML; because HTML is not edge-cached, new articles show immediately.
- Optional later: cache HTML at the edge for a big extra speed-up. That needs an API token stored as a GitHub secret and a "purge cache" step added to the deploy workflow. Ask for it when you want it.
- If anything misbehaves, switch the orange cloud to grey (DNS only) on the `A` record to bypass Cloudflare instantly.

## Do not
- Proxy (orange cloud) the mail or FTP hostnames.
- Turn on "Under Attack Mode" or aggressive bot settings; they can block Googlebot and the Facebook/Pinterest link scrapers.
- Enable Rocket Loader, Auto Minify or Mirage.
