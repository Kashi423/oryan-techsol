---
target: mindtheproduct.com
title: Scoping an MVP when the budget is fixed
meta_description: Most MVP plans start with a feature list and end with a number. Reverse it: fix the budget first, then cut scope in a set order with your team.
link_url: https://oryantechsol.com/blog/mvp-development-guide-for-startups
link_anchor: a longer guide to building an MVP
word_range: 1000-1500
---
# Scoping an MVP when the budget is fixed

Most MVP plans start with a feature list and end with an estimate. The estimate then collides with the budget, and the team spends a month negotiating. A calmer approach is to reverse the order. Fix the budget first, then let scope be the thing that moves. The takeaway: an MVP is a time-and-money box, and the product manager's job is to decide, in advance and together with engineering, what leaves the box first.

## Why estimate-first plans fail

An estimate starts with a design and ends with a number. A budget-first plan starts with a number and ends with a design. Basecamp's [*Shape Up*](https://basecamp.com/shapeup/1.2-chapter-03) calls this an "appetite": the amount of time you want to spend, as opposed to an estimate. Its principle is "fixed time, variable scope."

Estimate-first planning has a built-in problem. Everyone sees the number only after the scope is agreed, so every cut feels like a loss. In a budget-first plan the cut is the method, not the failure.

Scale matters too. [McKinsey and Oxford](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value) studied more than 5,400 IT projects. Large ones (initial price tags above $15 million) ran about 45% over budget on average and delivered 56% less value than predicted. An MVP is far smaller than that. But the mechanism is the same: scope agreed first, cost discovered later.

## Start with the question the MVP must answer

[Eric Ries](https://leanstartup.co/what-is-an-mvp/) defined the MVP as the version of a new product that lets a team collect the maximum amount of validated learning about customers with the least effort. He also wrote that an MVP, despite the name, is not about creating minimal products.

So before you list features, write one sentence: "After launch we will know whether ___." For example: "whether clinic receptionists will book appointments in our tool instead of the paper diary." Everything in the plan must either help answer that sentence or be cut. If the team cannot agree on the sentence, no amount of feature prioritizing will help. Fix that in the meeting first.

## Convert the budget into build capacity

Money is hard to reason about in a planning meeting. Capacity is easier. Translate the budget into a number of engineer-weeks, after subtracting the things that are easy to forget:

- design and user testing
- hosting, accounts and app-store or payment setup
- QA and bug fixing
- a reserve for the unexpected

Hold back a reserve. There is no standard size: it depends on how well your team has estimated in the past, so pick a starting figure (for example, the invented numbers below use 20%, an arbitrary choice) and adjust it as you learn.

For example, with invented numbers: a budget that buys 20 engineer-weeks has about 16 left after a 20% reserve. If design, setup and QA take four, you have 12 engineer-weeks of actual feature work. That is the box.

## Sort scope into three buckets

Write every candidate feature on a card and sort it into one of three buckets:

1. **Answers the question.** Without it, the launch cannot teach you what you wrote in the sentence above.
2. **Makes the answer trustworthy.** Sign-in, basic security, data you cannot lose. Users will not use the product honestly without these.
3. **Everything else.** Settings pages, reports, polish, extra user roles.

Buckets 1 and 2 go into the box. Bucket 3 stays out until there is room. The trap is bucket 2 growing. "Trustworthy" is easy to stretch, so ask of each item: would a real user stop using the product on day one without it?

## Put a range on each card

Ask engineering to size each remaining card in rough weeks, as ranges, not single numbers. Add the optimistic ends and the pessimistic ends separately.

Illustrative example: a small appointment-booking MVP.

| Feature | Bucket | Estimate (weeks) |
|---|---|---|
| Book and cancel an appointment | 1 | 2-3 |
| Staff calendar view | 1 | 2-4 |
| Sign-in and roles (staff only) | 2 | 1-2 |
| SMS reminders | 1 | 1-2 |
| Patient history notes | 3 | 2-3 |
| Billing | 3 | 3-5 |

For example, buckets 1 and 2 add up to 6-11 weeks against a 12-week box. That fits even in the pessimistic case, with one week to spare. If the pessimistic total were 15, you would know on day one that something has to go, and you would know which card, because you agreed the order in advance. These numbers are invented to show the method. They are not benchmarks.

[ADD REAL EXAMPLE: one real project where a fixed budget or deadline forced a cut. State what was in the first scope, what was cut and why, and what the team learned after launch. Use real numbers only if the client has agreed. Delete this line if there is none.]

## Agree the cut order before you start

The hardest moment in an MVP is often mid-build, when something takes longer than expected. Nobody wants to decide under pressure, so decide now. Rank the bucket 1 and 2 cards from "last to cut" to "first to cut" and write it down. *Shape Up* [names the practices](https://basecamp.com/shapeup/1.1-chapter-02) that follow. "Scope hammering" is forcefully questioning a design or use case to cut scope and finish inside the fixed time box. "Nice-to-haves" are left for the end of the cycle and cut if there is no time.

Three rules make the order stick:

- **Cut features, not quality.** Drop a whole feature, or simplify it. Do not ship everything half-tested.
- **Cut, do not extend.** If the date moves, the budget moves, and you no longer have a fixed budget. Make extending a conscious decision by a named person, not a drift.
- **Review at the midpoint.** At half the time, compare what is done to what remains. This is when a cut is cheap.

## Common mistakes

**Hiding the pessimistic estimate.** If only the average goes into the plan, you have planned for a coin flip. Show the range.

**Treating "later" as "never".** Bucket 3 is a backlog with an owner and a date to revisit, not a graveyard. Stakeholders accept cuts more readily when the list is visible.

**Skipping the alignment meeting.** The scoping session should include the person who holds the budget, the person who builds, and the person who talks to users. Each one will challenge a different card. One focused meeting is usually cheaper than a long email thread.

**Letting the sentence drift.** If sales, support or leadership each add a "just one more question" to the learning goal, the MVP becomes a version 1.0. Keep the single sentence on the wall.

## A checklist you can use this week

1. Write the one-sentence learning goal and get it agreed.
2. Convert the budget to engineer-weeks, minus design, setup, QA and a reserve.
3. List every feature and sort it into the three buckets.
4. Get range estimates from the people who will build it.
5. Check that buckets 1 and 2 fit, even at the pessimistic end.
6. Rank the cut order and write it down.
7. Book a midpoint review.

If you want more on the planning side, here is [a longer guide to building an MVP](https://oryantechsol.com/blog/mvp-development-guide-for-startups) covering feature choice and what to measure after launch.

## About the author

Waqas Ahmad Asghar is CEO and Full-Stack Architect at [Oryan Techsol](https://oryantechsol.com), a software company that builds custom mobile apps, websites and business software. [ADD AUTHOR DETAIL: one factual line on his hands-on role in MVP or product work, only if true.]

## Evidence

| Claim | Source URL | How verified |
|---|---|---|
| Appetite is "the amount of time we want to spend on a project, as opposed to an estimate"; "fixed time, variable scope"; estimates start with a design and end with a number, appetites the reverse | https://basecamp.com/shapeup/1.2-chapter-03 | WebFetch of the page, exact sentences returned |
| "Scope hammering" definition; nice-to-haves are cut if there is no time; completing the project in fixed time requires limiting scope | https://basecamp.com/shapeup/1.1-chapter-02 | WebFetch (glossary and chapter 2) |
| MVP: collect "the maximum amount of validated learning about customers" with the least effort; "MVP, despite the name, is not about creating minimal products" | https://leanstartup.co/what-is-an-mvp/ | WebFetch excerpt confirmed; full sentence confirmed via WebSearch summary |
| 5,400+ IT projects; large projects (initial price above $15M) about 45% over budget, 56% less value than predicted | https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value | Editor 2026-10-20: direct page fetch timed out, but a second WebSearch returned the McKinsey article's own text: 5,400+ projects (with Oxford BT Centre), large = initial price above $15M, average 45% over budget (and 7% over time), 56% less value than predicted. Consistent across several McKinsey URLs. VERIFIED |
| 20% reserve | none needed | Rewritten: no longer claimed as a common rule; presented as an arbitrary starting figure inside the invented example |
| Booking-app table, 20/16/12 engineer-weeks | none | Clearly labelled illustrative, not data |

## Pre-send checklist

- [x] Facts verified (editor 2026-10-20: McKinsey figures confirmed via search of its own text; Shape Up and Ries quotes re-fetched and exact)
- [ ] Placeholders resolved: [ADD REAL EXAMPLE] and [ADD AUTHOR DETAIL] filled or deleted
- [ ] Link policy followed: one body link, one bio link; Mind the Product states no link rules
- [ ] Matches site style: sentence-case headings, 1,000-1,500 words, practical framework
- [ ] Rewritten in the author's own words from his own experience (site rejects AI-only writing)
- [ ] Author is a builder (founder/engineer), not a marketer: eligible
- [x] Lint passed (0 error; only TODOs for the placeholders remain)
- [ ] Editor verdict: REVISE (2026-10-20). Facts, originality and site rules are clean. Not send-ready only because [ADD REAL EXAMPLE] and [ADD AUTHOR DETAIL] need Waqas's real facts and the text must be rewritten in his own voice (site rejects fully AI-written pieces).
