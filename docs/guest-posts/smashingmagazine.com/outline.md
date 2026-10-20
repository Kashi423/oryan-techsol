# Outline: Smashing Magazine article (the author writes it himself, from first-hand experience)

Working title: The Blank Frame: Fixing Layout Shift When a Client-Rendered React App Replaces Prerendered HTML
One-sentence takeaway: A prerendered page stays stable only if the first client render matches it, so load the route's code before rendering and keep per-page content out of the main bundle.
Audience: intermediate front-end developers using Vite or similar with React and prerendered HTML. Length: not stated by Smashing; their recent pieces run about 2,000-3,300 words. Ask the editor.

Style cues from recent pieces (checked 2026-10-20): H2 sections; problem, then concept, then examples, then caveats; first-person and candid; short code snippets with comments; worked examples labelled honestly; third-person bio ending in a link to the author page. Read: [Container queries](https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/), [UX ROI case](https://www.smashingmagazine.com/2026/09/building-ux-roi-case-survives-boardroom/), [Next.js CLS case study (2021)](https://www.smashingmagazine.com/2021/10/nextjs-ecommerce-cls-case-study/).

## Sections (each needs Waqas's own material; see author-questions.md)

1. **The symptom: a footer that jumps on load**
   - How the shift showed up (tool, page, what moved). Repo fact: footer CLS about 0.4 before the fix (commit 7ca63d3).
   - Why a prerendered page can still shift: Vite build, then each route snapshotted with a headless browser (scripts/prerender.mjs), then the client replaces it.
   - [ADD REAL EXAMPLE: screenshot or recording of the blank frame, from Waqas]
2. **Finding the cause**
   - What he tried first and ruled out (his account only).
   - The finding: `createRoot` renders into the prerendered container; a `lazy` route that has not loaded suspends, the Suspense fallback is an empty placeholder, the page blanks, then the footer moves.
   - Sources: `lazy` does not call `load` until first render and suspends while loading (https://react.dev/reference/react/lazy); `hydrateRoot` attaches to existing HTML while `createRoot` renders from scratch (https://react.dev/reference/react-dom/client/hydrateRoot).
3. **The fix: load the route before the first render**
   - Show a trimmed `page()` wrapper: keep a map of loaded modules; render synchronously if loaded, otherwise fall back to `lazy`. Show `preloadRoute(pathname)` called in main.jsx before `createRoot().render`. (Code is in commit 7ca63d3; rewrite and explain it, do not paste the diff.)
   - Edge cases in the real code: trailing slash, home page bundled with the shell, admin and unknown routes, a failed preload must not block rendering.
   - Result: CLS about 0.4 to about 0 (commit message). [Waqas: confirm measure, device, throttling]
4. **Why not hydrateRoot, and what the approach costs**
   - Honest trade-off: first client render waits for the chunk, so interactivity waits too. React says hydration needs identical output (link above). [Waqas's own reasoning for the choice]
5. **The second cost: article text in the main bundle**
   - Repo fact: the main bundle carried every article's full text, 1.94 MB raw (commit d48f782). Fix: a small generated index (scripts/build-post-index.mjs) and one JSON body per article loaded only on that page. Main bundle about 450 KB; Lighthouse performance 36-39 to 60-70 on the same machine.
   - Say it is raw size; add gzip or brotli only if he measured it.
6. **Measuring honestly**
   - CLS "good" is 0.1 or less, "poor" above 0.25, at the 75th percentile of page loads (https://web.dev/articles/cls). Lab runs on one machine are not field data; say what was and was not checked. [Waqas: any CrUX or Search Console data?]
   - Shifts after load can be missed by lab tools (Smashing's 2021 case study, link above).
7. **A short checklist for your own site** (5 checks at most, so it does not become a listicle)
   - Does the first client render match the prerendered HTML? Is any route lazy on first paint? What sits in the main bundle that only one page needs? Where is CLS measured? What would hydrateRoot change?

## Where a link to Oryan fits
- Body: none. Smashing rejects product-heavy pieces and nothing here needs a company page. At most one plain mention of the site in the story (oryantechsol.com), only if Waqas wants it and the editor allows it.
- Bio (third person, factual): Waqas Ahmad Asghar is CEO and Full-Stack Architect at Oryan Techsol. [Waqas adds anything else that is true, and a photo.]
- /blog/core-web-vitals-explained (dated 2026-10-14, present in posts-index.json) is for business owners, not Smashing's readers; do not link it in the body.

## Sources to cite (fetched 2026-10-20)
| Fact | Source |
|---|---|
| CLS good is 0.1 or less, poor above 0.25, at the 75th percentile; score = impact fraction x distance fraction | https://web.dev/articles/cls |
| lazy defers loading until first render and suspends, needing a Suspense boundary | https://react.dev/reference/react/lazy |
| hydrateRoot attaches to server HTML and needs identical output; createRoot renders from scratch | https://react.dev/reference/react-dom/client/hydrateRoot |
| Post-load shifts can be missed by lab tools (hover-triggered zoom lens) | https://www.smashingmagazine.com/2021/10/nextjs-ecommerce-cls-case-study/ |
| Smashing's earlier coverage of performance, to avoid repeating it | https://www.smashingmagazine.com/2021/01/smashingmag-performance-case-study/ |
| Our own numbers | git commits 7ca63d3 and d48f782 (2026-10-09), commit messages in this repository |

## Figures not to use as given
- The brief said CLS "about 0.4-0.5". The commit message says "about 0.4 down to about 0". Use 0.4 unless Waqas has a record of 0.5.
- Do not quote any Lighthouse figure other than "36-39 to 60-70 on the same machine" without a saved report.
