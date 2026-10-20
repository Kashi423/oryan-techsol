# Pitch: Smashing Magazine (outline pitch via contact form)

Status: pitch-ready. NOT sent. Waqas must answer author-questions.md first, then send it himself at https://www.smashingmagazine.com/contact/ (no email address is published).

Guidelines checked 2026-10-20 (https://www.smashingmagazine.com/write-for-us/): outline of 200-300 words covering audience, takeaway, why you, sections; articles from individual authors (not a company or team); no content marketing; tutorials, research-backed opinion, ultimate guides and case studies with reusable lessons are wanted; honorarium paid. Publishing policy: "Links in our articles are not for sale." AI use is not addressed anywhere.

## Subject
Outline pitch: fixing layout shift when a client-rendered React app replaces prerendered HTML

## Message to paste into the contact form (about 260 words)

Hello Smashing team,

I would like to propose an article for your front-end audience.

Working title: The Blank Frame: Fixing Layout Shift When a Client-Rendered React App Replaces Prerendered HTML

Audience: front-end developers who ship Vite and React sites with prerendered HTML. Intermediate level; they know code-splitting and Core Web Vitals.

Takeaway: if prerendered HTML is replaced by a lazy route that has not loaded, the page blanks and shifts. Readers will learn to find the cause in DevTools and fix it by loading the route chunk before the first client render. They will also learn to keep content out of the main bundle.

Why me: I am Waqas Ahmad Asghar, full-stack architect at Oryan Techsol. I hit this problem on our own site in October 2026, measured it, and fixed it. I have the commits and the before/after numbers. [LINKS TO MY OWN WRITING OR CODE]

Outline:
1. The symptom: footer layout shift of about 0.4 after load.
2. The cause: createRoot replacing prerendered HTML through an empty Suspense fallback.
3. The fix: preload the current route's chunk, then render it synchronously.
4. A second cost: article text inside a 1.94 MB bundle, moved to per-page files (about 450 KB).
5. Measuring it honestly: lab versus field data, and what Lighthouse could not tell me.
6. Trade-offs: when hydrateRoot or a framework is the better choice.

The code is short and I will include runnable snippets. This is a technical write-up, not product promotion.

Thank you for considering it. I am happy to adjust the scope.

Waqas Ahmad Asghar

## The 3 topic options evaluated

1. **Layout shift when a client-rendered React app replaces prerendered HTML (RECOMMENDED).** Real before/after on one site: footer CLS about 0.4 to about 0 (commit 7ca63d3, 2026-10-09), and main bundle 1.94 MB to about 450 KB, Lighthouse performance 36-39 to 60-70 on the same machine (commit d48f782, 2026-10-09). Readers: front-end developers with Vite/React. Not covered by Smashing: their 2021 [Next.js e-commerce CLS case study](https://www.smashingmagazine.com/2021/10/nextjs-ecommerce-cls-case-study/) is about a zoom lens, fonts, images and infinite scroll, and does not touch route-chunk preloading or the prerender-to-client swap. Their 2021 [performance case study](https://www.smashingmagazine.com/2021/01/smashingmag-performance-case-study/) covers font and asset shifts. Searches of their site found no piece on this exact cause.
2. **Moving content out of the main JavaScript bundle (generated index plus per-page JSON).** Real and measurable, but smaller and more of a how-to tip; better as a section of option 1 than a standalone piece.
3. **Skylark hotel-booking case study.** Rejected: docs/PORTFOLIO.md and src/data/caseStudies.js hold only what the public site shows (features, Next.js). There are no measurements, decisions or outcomes, so no honest first-hand case study exists, and it would read as portfolio promotion.

## Why option 1 can be pitched honestly
- The numbers come from commit messages in this repository, written at the time of the work, not from marketing copy.
- The mechanism is visible in the code diff (src/App.jsx, src/main.jsx): `createRoot` renders over prerendered HTML, and a lazy route that had not loaded rendered an empty Suspense fallback.
- It teaches a reusable technique and mentions no product. The company appears only in the bio.
- State in the article that the figures are lab measurements on one site, not field data across users.

## Notes for the sender
- Do not send until the bracketed placeholder is replaced with links to writing or code that Waqas himself authored. Do not offer the Oryan blog as a writing sample unless Waqas wrote that post himself; the 90-article batch was AI-assisted.
- In the form, ask the editor whether Smashing has a policy on AI-assisted drafting (not stated on the site), and the expected article length. Write the article yourself, in your own voice.
- Smashing wants a photo with the byline.
- Never mention link benefits to the editor.
