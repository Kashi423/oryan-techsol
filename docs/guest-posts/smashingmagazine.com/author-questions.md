# Questions for Waqas (answer in your own words; the article must be yours)

Smashing accepts articles only from individual authors and states no rule on AI. Write the answers and the final article yourself. Nothing below has been answered for you.

1. What exactly did you see on 2026-10-09? Which page, which tool (Lighthouse, DevTools Performance panel, Search Console), and what moved? The commit says footer CLS about 0.4; was it ever 0.5, and where is that recorded?
2. How did you find the cause? What did you suspect first, and what did you rule out? Walk through the steps you actually took.
3. Do you have a before/after screenshot, recording or saved Lighthouse report of the blank frame and the fixed page? Can you share them?
4. What setup produced the 0.4 and near-zero figures (device or emulation, network throttling, cold cache, how many runs)?
5. Why does the site use createRoot over prerendered HTML instead of hydrateRoot? Was it deliberate, a constraint (the prerender uses a headless browser, scripts/prerender.mjs), or inherited? Would you choose differently now?
6. What did the preload approach cost? Did first render or interaction get slower on slow connections? Did you measure it?
7. Did anything break while doing this (trailing-slash routes, admin routes, the home page, 404 pages, a failed preload)? What did you do?
8. For the bundle change (1.94 MB to about 450 KB): is 1.94 MB the raw size? Do you have gzip or brotli sizes? What else was in the bundle besides article text?
9. Lighthouse performance went from 36-39 to 60-70 on the same machine. What were the LCP, TBT/INP and CLS parts? Is any field data (CrUX, Search Console) available now?
10. What would you tell a developer with the same stack and little time: the one fix to do first?
11. Are you comfortable naming oryantechsol.com as the site in the story? Is the code public (a repository link), or would you share trimmed snippets only?
12. Which writing, talks or open-source work that you wrote yourself can you link as proof of expertise? Do you have a photo for the byline? Our records give only "CEO & Full-Stack Architect"; what else about your background is true and that you want in the bio?
13. Before sending: ask the editor whether Smashing has any rule on AI-assisted drafting, and what length they expect.
