# Outline: Your Zap is straining. Fix it, split it or replace it?

Status: outline for Waqas to write from. Not article text. Checked 2026-10-20.
Target length: about 1,500 words (Zapier range 750-2,500). First person, his own voice, his own stories. Zapier's guidelines: no AI-generated writing, first-hand experience, actionable advice.

One-sentence takeaway: Most strained Zaps need a fix or a split; move a step into code only when you can name the specific reason it cannot stay.

Style match (from Zapier posts read 2026-10-20: "How our agency uses Zapier to onboard clients" (guest, about 1,400 words, first person, closes with a note naming the author's firm and linking its site), "From a garage and a pickup truck to $3.8 million" (customer story, about 1,700 words, specific numbers and dates, links the company twice), Code by Zapier guide (updated June 2026)): plain sentences, concrete numbers, a real workflow shown step by step, honest limits.

## Sections

### 1. Open on one real Zap that hurt  (about 150 words)
- A specific workflow, what it did, what went wrong, what it cost. [Q1, Q2]
- No client name unless allowed. Say what kind of business.

### 2. Four signs a Zap is outgrowing itself  (about 250 words)
- It needs to remember earlier runs, or look up many records and loop through them.
- It handles heavy or long-running work and hits time limits.
- A failure costs money or customers (orders, invoices, bookings).
- The data must stay in your own systems.
- For each sign: one line from his own experience. [Q3]
- Source for the limits idea: Zapier Code step limits (see sources 1-2). Do not quote numbers here that you have not rechecked on the day you write.

### 3. Try these inside Zapier first  (about 300 words)
- Split one long Zap into smaller ones with a clear handoff.
- Move awkward logic into a Code by Zapier step (JavaScript or Python) before building anything outside.
- Add error handling and use replay; know what it cannot do (held runs, replay window).
- State which of these he tried, what worked and what did not. [Q4]

### 4. Fix or split or replace: the rule  (about 250 words)
- A decision rule he actually uses, in his words. [Q5]
- Worked example with his real numbers, or numbers clearly labelled "for illustration".
- Link spot (the only body link to us): where he says the full cost and risk comparison is longer than this post, one sentence pointing to Oryan's guide "Zapier, Make or Custom-Built Automation: Which Should You Use?" https://oryantechsol.com/blog/zapier-make-or-custom-automation (live, dated 2026-10-12). It helps here because the reader who has just run the rule wants to price the replace option. Zapier may remove or reword it; their rule is links "where appropriate". Do not insist.

### 5. Replacing only one piece  (about 250 words)
- Keep the trigger and the simple steps in Zapier; send the hard part to a small service through a webhook. [Q6]
- Run both in parallel until results match, then switch. [Q7]
- What he would do differently. [Q8]

### 6. What to write down before you hand it over  (about 150 words)
- Named owner, an alert that reaches a person, a manual fallback. (Option 3 folded in.) [Q9]
- End with a short checklist the reader can copy. No sales line.

### Bio (Zapier adds a blurb, name and photo to every post)
Waqas Ahmad Asghar is CEO and Full-Stack Architect at Oryan Techsol, [one factual line about what he builds, from his own words]. Link: https://oryantechsol.com

## Where a real example must go
Sections 1, 2, 4 and 5. The repo has no documented automation project, no measured result and no Zapier or Make client story (portfolio-copy.md, PORTFOLIO.md and caseStudies.js contain none). The school, pharmacy and clinic systems include notifications and an AI receptionist, but nothing records them as a Zap-to-code move. Leave a visible placeholder wherever the story is missing.

## Sources to cite (checked 2026-10-20)

| # | Fact it supports | URL | Note |
|---|---|---|---|
| 1 | Code steps have per-plan runtime and rate limits; a step that runs too long fails with a timeout; runs are held when the rate limit is hit (table listed Free 1 s, Professional and Team 30 s, Enterprise 2 min; 512 MB; extended runtimes up to 10 min for action steps on paid plans) | https://help.zapier.com/hc/en-us/articles/45405528551181 | Recheck on the day; the figures vary between Zapier pages |
| 2 | Zapier's guide says Code steps are a fallback when built-in actions cannot do the job, e.g. looping through records and calling a second app; it quotes a two-minute default runtime and a 10-minute maximum | https://zapier.com/blog/code-by-zapier-guide/ | Last updated June 2026. Its numbers differ from source 1; resolve before quoting either |
| 3 | Autoreplay retries a failed step up to five times; it does not replay held runs; manual replay works within 60 days; significant edits can block replay | https://help.zapier.com/hc/en-us/articles/8496241726989-Replay-Zap-runs | Also https://help.zapier.com/hc/en-us/articles/19220226086797-What-is-replay |
| 4 | Custom error handlers run an alternative path when a step fails; Zaps with error handlers cannot be manually replayed | https://help.zapier.com/hc/en-us/articles/22495436062605-Set-up-custom-error-handling | Verify the page text before quoting |
| 5 | Make offers error handlers (Break, Commit, Ignore, Resume, Rollback) and incomplete executions, if he mentions Make | https://help.make.com/Overview-of-error-handling | Labels differ between Make pages; check the current interface |
| 6 | Zapier's own process-mapping content is a tools roundup (supports Option 2's gap) | https://zapier.com/blog/process-mapping-tools.md | Only needed if Option 2 is used |

All six are from search results and page fetches; I could not confirm every figure line by line. Waqas should open each page and check the exact wording before quoting.

## Overlap check on Zapier (2026-10-20)
- Searched for a Zapier post on moving from Zapier to custom code: none found on zapier.com (results were third-party agencies). Closest: Code by Zapier guide (does not discuss leaving Zapier).
- Searched for process mapping before automating: closest is the process-mapping-tools roundup. Exceptions-first not covered there.
- Zapier's blog home showed many "best X" and "X vs. Y" posts; those are the excluded type. Do not drift toward comparing tools.
- Not done: the form's linked editorial policy page was not read. Read it before submitting.

## Our own live articles (dates verified in src/data/posts-index.json, today 2026-10-20)
- zapier-make-or-custom-automation, 2026-10-12, OK to link.
- business-process-automation-where-to-start, 2026-10-04, OK to link (Option 2 only; do not add a second link in the same post).
Do not reuse their wording. Both are generic guides; the Zapier post must be built from his own stories.
