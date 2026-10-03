# Oryan Techsol — Link-Building Kit

Goal: 40–60 genuine, relevant backlinks in ~90 days. Quality and consistency beat volume —
mass-posted links on throwaway sites risk a Google penalty and add nothing.

## 1. NAP block (copy exactly everywhere)

Inconsistent name/address/phone across listings weakens local SEO. Never vary it.

- **Name:** Oryan Techsol
- **Website:** https://oryantechsol.com
- **Email:** hello@oryantechsol.com
- **Phone:** +1 (917) 217-0535
- **Address:** 1938 West 7th Street, Brooklyn, NY
- **Tagline:** Innovate. Integrate. Elevate.
- **Categories:** Software Development, Mobile App Development, Web Development, AI/Chatbot Development, Business Process Automation

## 2. Descriptions (paste-ready)

**Short (≤160 chars)**
Oryan Techsol builds custom mobile apps, software, websites, AI bots and automation for growing businesses.

**Medium (~300 chars)**
Oryan Techsol is a Brooklyn-based software company that builds custom mobile apps, web platforms, e-commerce stores, AI business bots and workflow automation. We design technology around how your business actually works — from MVP to scale — and integrate it with the tools you already use.

**Long (~600 chars)**
Oryan Techsol helps growing companies innovate, integrate and elevate through technology. Our team delivers iOS and Android apps, custom web development, SaaS products, e-commerce storefronts, API and system integrations, business process automation, and AI chat/voice bots. Every project starts with understanding your workflow, then we build reliable, scalable software that fits it — and stay on to support it. Based in Brooklyn, NY, serving clients across the US and internationally.

**Services list:** App Development · AI Bots & Automation · Web Development · Custom Software · Business Automation · E-commerce · SaaS Development · API Integrations

## 3. Target list, in priority order

Do these in order. Create each account yourself (use a shared company email and a password manager).

### Tier 1 — Foundation (week 1–2, ~12 links)
| # | Site | Type | Notes |
|---|------|------|-------|
| 1 | Google Business Profile | Local | Needs address verification; biggest local win |
| 2 | LinkedIn Company Page | Social | Also fill the footer link in `src/config/site.js` |
| 3 | Facebook Business Page | Social | Same |
| 4 | Instagram | Social | Same |
| 5 | YouTube channel | Social | Same |
| 6 | Crunchbase | Company profile | Free profile, dofollow-ish authority |
| 7 | GitHub organization | Dev | Org profile + website field; publish a small open-source repo |
| 8 | Bing Places | Local | Quick import from Google |
| 9 | Apple Business Connect | Local | |
| 10 | Yelp for Business | Local | Brooklyn address |
| 11 | Better Business Bureau | Local | Optional; accreditation is paid |
| 12 | Brooklyn Chamber of Commerce | Local | Membership paid; strong local link |

### Tier 2 — B2B review/directory sites (week 2–6, ~15 links)
Clutch, GoodFirms, DesignRush, The Manifest, TechBehemoths, SoftwareWorld, Sortlist, Upwork Agency profile, Topdevelopers.co, ITfirms.co, Extract.co, Best Software Companies (bestsoftwarecompanies / SoftwareSuggest), Capterra/Software Advice (only if you have a product), G2 (only if you have a product), Goodfirms "AI" category.
- Ask 3–5 past clients for reviews on Clutch/GoodFirms — a reviewed profile ranks and converts far better than a bare one.

### Tier 3 — Portfolio & community (week 3–8, ~10 links)
Behance, Dribbble, Product Hunt (launch a project/product), Indie Hackers, Hacker News "Show HN" (only for genuinely interesting builds), Dev.to, Hashnode, Medium, Hackernoon, Reddit (r/webdev, r/startups — contribute first, don't spam links), Stack Overflow / Stack Exchange (answer questions; profile link only).

### Tier 4 — Earned links (ongoing, the high-value ones)
- **Guest posts:** Smashing Magazine, SitePoint, DZone, Hackernoon, Entrepreneur contributors, Startup-focused blogs. Pitch templates below.
- **HARO alternatives:** Qwoted, Featured.com, Source of Sources — answer journalist queries on AI/app development.
- **Podcasts:** pitch to appear on startup and tech podcasts.
- **Partnerships:** link exchange pages with *real* partners (hosting, payment, Shopify/Stripe/Twilio ecosystems — apply for partner directories).
- **Resources:** publish one genuinely linkable asset (e.g., "App development cost guide 2026", free ROI calculator, checklist PDF). Sites link to useful tools, not services.

## 4. Pitch templates

**Guest post pitch**
> Subject: Guest post idea: [Title]
>
> Hi [Name],
> I read your piece on [specific article] — [one genuine sentence about it]. I'm [your name] at Oryan Techsol, where we build apps and AI automation for growing businesses.
> I'd like to contribute an article: **"[Title]"**. It would cover [3 bullets]. I can include [original data / screenshots / a real project example] and it'd be unpublished elsewhere.
> Happy to share an outline or a past sample. Would this fit your readers?
> Thanks, [Name] — hello@oryantechsol.com

**Partner/resource link request**
> Hi [Name], I noticed your page "[page title]" lists resources on [topic]. We published [asset + URL], which [one-line value]. If you find it useful, it may be a good addition for your readers. Either way, thanks for the great resource.

**Client review request**
> Hi [Name], it was a pleasure building [project] with you. Would you mind leaving a short review on [Clutch/GoodFirms link]? It takes about 5 minutes and helps other businesses find us. Happy to return the favour.

## 5. Content to publish on our own site (gives people a reason to link)

1. Blog posts on `/blog`: "How much does a mobile app cost in 2026", "AI chatbot vs. live chat for small business", "Custom software vs. off-the-shelf", "What is API integration and when do you need it".
2. Case studies with real numbers (already have `CaseStudyDetail.jsx` — fill it).
3. A free tool: project cost estimator or automation ROI calculator.

## 6. Tracking sheet (copy into a spreadsheet)

`Site | URL | Tier | Account email | Date submitted | Live URL of our listing | Link type (dofollow/nofollow) | Status | Notes`

## 7. Rules to protect the site

- Max ~5–8 new links per week; steady, not bursty.
- Vary anchor text: mostly brand name ("Oryan Techsol") and bare URL; only occasional keyword anchors.
- Skip: link farms, paid link packages, comment spam, "1000 backlinks" services, PBNs.
- Check progress monthly in Google Search Console → Links, and disavow only genuinely toxic links.
- Before launch of outreach: set `VITE_SITE_URL=https://oryantechsol.com` and confirm real social URLs are in `socialLinks` (they're `#` placeholders now) so profiles can cross-link.
