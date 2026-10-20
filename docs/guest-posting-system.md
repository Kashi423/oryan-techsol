# Guest-posting system

A pipeline of Claude Code agents that finds suitable sites, writes original guest posts and pitch emails, fact-checks them, and hands you send-ready drafts. **It drafts only; you decide what is sent.**

## Run it
In Claude Code, from this project:

```
/guest-posts            # find 3 sites and prepare drafts
/guest-posts 5          # find 5
/guest-posts https://example.com/write-for-us
/guest-posts "mobile app budgeting"
```

You can also call one agent directly: `guest-post-prospector`, `guest-post-writer`, `guest-post-editor`.

## What happens
1. **Prospector** searches for sites that really accept guest posts in our niche, reads their guidelines and recent articles, scores them (relevance, editorial quality, audience, fit, minus risk flags) and keeps only the good ones. Results: `docs/guest-posts/prospects.csv`.
2. **Writer** (one per site, in parallel) studies the site, proposes three topics, builds a sourced outline, writes the article and the pitch email, and runs the lint until it passes. Output: `docs/guest-posts/<domain>/article.md` and `pitch.md`.
3. **Editor** independently fact-checks every claim against sources, checks originality, voice, the site's guidelines and the link policy, and fixes or sends back the draft (up to 2 rounds).
4. **Lint** (`node scripts/guest-post-lint.mjs <article.md>`) enforces the mechanical rules in code: word count, headings, exactly one body link to us plus one bio link, no commercial exact-match anchors, our linked article is live, external links work, unsourced figures, filler phrases, promotional language, unresolved placeholders.
5. **Tracker**: `docs/guest-posts/tracker.csv` records every draft and its status; update `pitched_on`, `response` and `published_url` by hand as things happen.

## What you do
- **Treat every draft as a skeleton, not a finished piece.** Several publishers (for example Mind the Product) reject fully AI-written articles. Rewrite the draft in your own words with your own real experience before submitting. Editors can tell, and a genuine voice also gets more readers.
- Fill any `[ADD REAL EXAMPLE]` placeholders with real project facts (the agents will not invent them).
- Send the pitch yourself from your email (or the site's form), pasting `pitch.md`. After they accept, send `article.md`.
- Keep the pace natural: about 5-8 new links per week at most. Do not send the same article to more than one site.
- Check `Search Console → Links` monthly.

## Rules baked in
- One contextual link in the body, one in the bio; descriptive or brand anchors only; `nofollow`/`sponsored` whenever the site requires it.
- No fabricated statistics, quotes, clients or credentials; only what is in `team.js`, `site.js`, the portfolio docs and our live articles.
- Original text only (never our blog copy, never another site's).
- No paid links, exchanges or networks. Pay-to-publish sites are rejected.

## Honest limits
Acceptance depends on each site's editors; nothing guarantees a placement. The system raises quality and removes busywork, but results come from sending relevant pitches to the right sites over time.
