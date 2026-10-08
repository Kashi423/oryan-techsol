# Pinterest playbook for Oryan Techsol

Pinterest is a search engine. Pins keep sending traffic for months, so consistency and keywords matter more than follower count.

## 1. Profile (do once)
- **Display name:** `Oryan Techsol | App, Web & AI Development` (keywords in the name are indexed).
- **Bio:** `Practical guides on app development, websites, custom software, AI chatbots and business automation for growing companies.`
- **Website:** claimed (done). Add the profile link to the site footer/social links once the URL exists (`src/config/site.js`).
- **Logo** as profile picture, a clean banner/cover if offered.

## 2. Boards
Auto-publish saves to one board. Add 5–6 topic boards so the account looks like an authority and each pin can also be re-saved to a niche board:
1. App, Web & AI Development Tips (auto-publish target)
2. Mobile App Development Guides
3. AI Chatbots & Business Automation
4. Custom Software & SaaS for Business
5. Website Design & SEO Tips
6. Startup & Small Business Tech

Every board needs a keyword-rich description (1–2 sentences) and a category. Keep boards public.

## 3. Pin cadence
- 1–3 new pins per day beats 20 in one go. Auto-publish gives one pin per article; the 90 scheduled articles give a pin a day from 2026-11-08.
- Repin each new pin to 1–2 matching topic boards a day or two later (not all at once).
- **Fresh pins:** after 30–60 days, make a second, different image for the best articles and pin it to the same URL. Pinterest treats it as new content.

## 4. Pin copy rules
- Title (≤100 chars): main keyword first, then a benefit or year.
- Description (≤500 chars): 2–3 sentences, natural keywords, a call to action ("Save this", "Read the full guide"), 3–4 hashtags at the end.
- Link goes to the article (the feed adds UTM tags so Google Analytics shows Pinterest as a source).

## 5. Technical setup
- Domain claimed. ✔
- **Rich Pins:** article pages already expose the required tags. Validate one at https://developers.pinterest.com/tools/url-debugger/ and click Apply. Rich pins show the article title and description automatically.
- **Save button / Pinterest tag:** optional. A Save button on blog images lets readers pin from the site. A Pinterest tag (needs your tag ID from Ads Manager) enables conversion tracking. Ask me to add either.

## 6. Measure (Pinterest Analytics + Google Analytics)
- Pinterest: watch Impressions, Saves, Outbound clicks per pin.
- GA: Acquisition → filter source `pinterest`.
- After 4 weeks, make more pins in the style of the top 10% and retire what gets no impressions.

## 7. Don'ts
- No duplicate pins with the same image and link.
- No buying followers or follow/unfollow schemes.
- No clickbait the article doesn't deliver.
