---
description: Run the Oryan Techsol guest-post pipeline end to end (find sites, write, edit, quality-gate), producing send-ready drafts. Never sends anything.
argument-hint: [number of sites | a site URL | a topic]  (default: 3 sites)
---

Run the guest-posting pipeline. The user's input: `$ARGUMENTS`

Interpret it as one of: a **number** (find that many prospects, default 3, max 8 per run), a **site URL** (skip prospecting, write for that site), or a **topic** (find prospects for that topic). If empty, use 3 prospects and let the prospector choose topics from our services and our live articles in `src/data/posts-index.json`.

Follow these stages in order. Use the project's subagents; run independent writers in parallel (a single message with several Agent calls).

## Stage 1: Prospect
Unless a URL was given, call the **guest-post-prospector** agent with the topic/count. It writes `docs/guest-posts/prospects.csv`. Take its shortlisted sites. If it returns none that qualify, report that honestly and stop; do not lower the bar.

## Stage 2: Write
For each shortlisted site, call **guest-post-writer** with the site URL, the topic ideas the prospector suggested, and the instruction to follow its own method and to leave drafts in `docs/guest-posts/<domain>/`. Run these in parallel. Make sure each topic is different so no two articles overlap and no article repeats one already on our blog.

## Stage 3: Edit and gate
For each draft call **guest-post-editor** on `docs/guest-posts/<domain>/article.md`. If its verdict is **REVISE**, send its numbered fixes back to **guest-post-writer** (resume that agent with SendMessage if available, otherwise start a new one with the draft path and the fixes), then call the editor again. At most **2 revision rounds** per draft. A draft that still fails after that is marked `needs-human` in the tracker with the reason; do not present it as ready.

## Stage 4: Verify yourself
For every draft marked PASS, run `node scripts/guest-post-lint.mjs docs/guest-posts/<domain>/article.md` yourself and confirm it reports no errors. Do not rely on an agent's claim.

## Stage 5: Update the tracker and report
Update `docs/guest-posts/tracker.csv` (status `ready-to-send`, `needs-human` or `rejected`, lint result, editor verdict). Then give the user a short report:
- A table: site, article title, status, where our link sits (and its anchor), word count.
- Every placeholder or fact only Waqas can supply (list them exactly).
- The exact next step per site: where to send the pitch (the contact route printed on the site) and which files to attach or paste.
- Anything that worries you about a target.

## Hard rules for you (the orchestrator)
- **Never send, submit, post or contact anyone**, and never create accounts. Outreach is the user's decision; you prepare it.
- Never mark something ready unless the lint passes and the editor said PASS.
- Be honest about outcomes: acceptance depends on the site's editors, and nothing here can guarantee a placement. Do not promise results.
- Keep to at most 8 sites per run, and about 5-8 new links per week overall (see `docs/link-building-kit.md` section 7).
