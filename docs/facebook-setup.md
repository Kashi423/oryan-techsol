# Facebook auto-posting

Each day's new blog article is posted to the Oryan Techsol Facebook Page by `scripts/facebook-post.mjs`, as the last step of the daily deploy workflow. Until the two secrets below exist, the step skips quietly and nothing is posted.

- Page: https://www.facebook.com/profile.php?id=61593868535933
- Page ID (Business Suite asset id): `1304484202743571` (confirm with `/me/accounts` in step 3; the number in the Page profile URL, 61593868535933, is a different identifier)

## One-time setup (about 15 minutes, done by the Page admin)

Facebook's screens change often, so labels may differ slightly.

1. **Create a Meta developer app.** Go to https://developers.facebook.com → My Apps → Create App → choose the *Business* type (or "Other → Business"). Name it "Oryan Techsol Poster". Keep it in **Development mode**: no App Review is needed, because you are an admin of both the app and the Page.
2. **Get a user token with the right permissions.** Open the Graph API Explorer (Tools → Graph API Explorer). Select your app, choose *User Token*, and add the permissions `pages_show_list`, `pages_read_engagement` and `pages_manage_posts`. Click Generate Access Token and approve the prompts, making sure the Oryan Techsol Page is ticked.
3. **Make it long-lived, then get the Page token.** In a terminal (replace the capitals):

   ```bash
   curl "https://graph.facebook.com/v25.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_USER_TOKEN"
   ```

   Then, using the `access_token` that returns (the long-lived user token):

   ```bash
   curl "https://graph.facebook.com/v25.0/me/accounts?access_token=LONG_USER_TOKEN"
   ```

   Find the entry named "Oryan Techsol" (its `id` should be `1304484202743571`). Its `access_token` is the **Page access token**. A Page token obtained this way from a long-lived user token does not expire.
4. **Store the secrets in GitHub.** Repo → Settings → Secrets and variables → Actions (use the same place as the FTP secrets, the "FTP Server" environment, or repository secrets):
   - `FACEBOOK_PAGE_ID` = the `id` of that entry (`1304484202743571`)
   - `FACEBOOK_PAGE_TOKEN` = the Page access token

   Never paste the token into chat, a file or the repo.
5. **Test.** Actions → "Deploy to Namecheap" → Run workflow, and type an article slug (for example `what-is-api-integration`) in the *facebook_slug* box. The article should appear on the Page within a minute, with a link preview.

## What gets posted

- On the daily scheduled run (00:20 UTC), any article **dated today** is posted (at most 3). Pushes never post. When Facebook allows reading the Page feed, an article already on the Page is skipped.
- Post text: the article title, its description and hashtags, plus the link (Facebook builds the preview from the page's `og:` tags and the share image).
- The first 8 articles (dated 7 October) are not posted automatically. Use the *facebook_slug* box to post any of them by hand.

## If it stops working

- The step is marked "continue on error", so the site always deploys. Open the workflow run → "Post today's article to Facebook" to read the message.
- Error code 190 = the token expired or was revoked; repeat step 2–4.
- Error code 200/10 = a permission is missing; repeat step 2 with all three permissions.
