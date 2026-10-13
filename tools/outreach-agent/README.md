# Oryan outreach agent

CLI agent that finds local businesses that could use a website/app, writes a personalised email for each with Claude, and sends it from a Gmail account under guardrails. Runs on your PC; nothing is deployed to the website.

```
find  ->  enrich  ->  draft  ->  YOU approve  ->  send  ->  replies  ->  follow-ups (auto)
```

## One-time setup (you do these; they need your logins)

1. **Gmail**: create the sending account, turn on 2-Step Verification, then create an App Password at https://myaccount.google.com/apppasswords.
2. **Google Places API key**: Google Cloud console -> new project -> enable **Places API (New)** -> Credentials -> API key (restrict it to that API). Billing must be on; text search is a few cents per 1,000 after the free monthly credit.
3. **Anthropic API key** from console.anthropic.com.
4. `cp .env.example .env` and fill it in. Then:

```bash
cd tools/outreach-agent
npm install
npm run agent test-email     # sends a sample to the Gmail itself
```

## Daily use

```bash
npm run agent find "dentists" --in "Austin, TX" --max 40
npm run agent enrich
npm run agent draft --limit 10
npm run agent list drafts
npm run agent show 3
npm run agent approve 1 2 3        # or: approve all
npm run agent send                 # dry run: shows what would go out
npm run agent send --live          # really sends
npm run agent run --live           # replies -> follow-ups -> send (put this on Task Scheduler, hourly)
```

`status`, `pause` / `resume` (kill switch), `unsub <email|domain>`, `list sent|leads`.

## Guardrails (all enforced in code, tested in `npm test`)

| Guardrail | Behaviour |
|---|---|
| First emails need your approval | Only `approved` messages can send. Follow-ups to a lead you already approved are auto-queued. |
| Dry-run by default | `send` and `run` do nothing without `--live`. |
| Daily cap | `DAILY_CAP` (default 15). New Gmail: stay at 10-20/day for weeks. |
| Send window | Mon-Fri, 9-17 local time. |
| Spacing | Random 90-240 s between emails. |
| Opt-out | Footer on every email (added in code, not by the model) with postal address; replies like "no thanks / unsubscribe / stop" suppress the address and cancel queued follow-ups. `List-Unsubscribe` header set. |
| Replies stop the sequence | Any reply cancels pending follow-ups. Max 2 follow-ups (day 4 and day 10). |
| Bounce breaker | 3 bounces in the last 25 sends pauses everything. |
| One lead per domain, no role/no-reply addresses | Skipped at enrich/send time. |
| Truthful copy | The model may only use the facts collected from the business's own site and Google listing. |
| Kill switch | `pause`, or create a file named `PAUSE`. |

## Things to know

- **Gmail is not built for cold email.** Google's terms limit bulk/unsolicited mail and a new account that sends cold outreach is the most likely thing to be suspended (taking its Drive/Docs with it). Use a throwaway Gmail you don't mind losing, keep volume low, or move to Google Workspace on `oryantechsol.com` (set `GMAIL_USER` to that address; nothing else changes). Gmail's hard limit is ~500 recipients/day.
- **Only public business emails** found on the business's own site are used. Businesses without a website or a visible email are marked `no_email` and skipped.
- **Law**: US (CAN-SPAM) B2B cold email is allowed with a truthful sender/subject, postal address and a working opt-out, which this does. If you target the UK/EU/Canada, rules are stricter (consent or "implied B2B interest" tests); stay US-only unless you check.
- **No open/click tracking** on purpose: it hurts deliverability and privacy.
- Data lives in `data/outreach.db` (SQLite, gitignored).

## Easiest way: the local app

Double-click `start-agent.bat` (or run `npm start`). A page opens at http://localhost:4477 with four tabs:
Setup (paste three keys once), Find customers, Review & send, Sent & replies. No terminal commands, no config files.
The app only listens on your own computer. Close its window to stop it.

## Try it first: demo mode

Double-click `start-demo.bat`. It runs the same app with fake businesses, fake websites, fake drafts and a fake mail server, so you can click through every step with no keys. Nothing is searched or sent, and your real settings and data are not touched. Use "Demo: skip ahead 5 days" on the Sent tab to see follow-ups appear.

## Which AI writes the emails

Paste either a **Claude API key** (console.anthropic.com) or an **OpenAI API key** (platform.openai.com) on the Setup tab. A Claude key is used if both are set. A ChatGPT Plus or Claude.ai subscription login cannot be used by apps; it has to be an API key, which is billed per use (a few cents per hundred drafts).

### Free options
- **AI writer:** Google Gemini (aistudio.google.com/apikey) or Groq (console.groq.com/keys) both have free plans. Pick the service on the Setup tab and paste its key.
- **Business search:** Google Places has a free monthly allowance, but needs a billing account on file. At 20-60 searches a day you stay inside it.
- **Sending:** your existing Google Workspace mailbox.

## Advanced features

| Feature | What it does |
|---|---|
| **Lead scoring** | Each business gets a 0-100 score (no website, old or slow site, no booking, good reviews, public email). Best prospects are drafted and shown first. |
| **Website audit** | Honest findings from the homepage ("I couldn't spot an online booking option...") are placed in the email, up to two. |
| **Subject A/B test** | Subject A is plain and specific, B is a short question. They alternate automatically; the Stats tab shows reply rate per variant. |
| **Reply handling** | Replies are read, labelled (interested / question / not interested / out of office), a suggested response is drafted for you to edit, and you get an email alert for hot leads. Nothing is sent until you click Send. |
| **Pipeline** | New, Contacted, Replied, Meeting, Won, Lost, with notes and CSV export. A to-do strip shows what needs you today. |
| **Warm-up ramp** | A new sender starts at 5 emails a day and gains 4 a day each week, never above your limit, and holds at 5 if 2+ recent sends bounced. Turn off with `WARMUP=0`. |
| **Runs by itself** | Double-click `install-daily-task.bat` once. Windows then runs `src/daily.js` hourly on weekdays 9-17: reads replies, writes follow-ups, sends emails you already approved. It never approves or finds anything new on its own. Remove with `remove-daily-task.bat`. Log: `data/daily.log`. |

Safety that always applies: first emails need your approval, opted-out addresses are never contacted, a message can only be sent once even if the app and the daily runner run together, and the Pause button stops everything.

## AI features and branded email

| Feature | What it does |
|---|---|
| **Quality gate** | Every draft is scored 0-100 on the Review tab: spam wording, length, no call to action, invented numbers, "I'm local" style claims. Drafts under 60 are marked for review. |
| **AI fact-check** | One click re-checks a draft against the facts collected about the business and lists any unsupported claim. |
| **Recommended offer** | Each business gets one thing to lead with (booking system, mobile refresh, new site...). The writer leads with only that, so emails stay focused. |
| **Rewrite in a tone** | Friendly, direct, short or formal, one click per draft. |
| **Target ideas** | "Suggest business types" proposes who to search next, using your own reply results once you have them. |
| **Smarter follow-ups** | Follow-up 1 adds one useful tip; follow-up 2 is a graceful last note. Not just a bump. |
| **Branded HTML email** | Navy and cyan layout with wordmark, signature, reply button and an unsubscribe line. Always sent with a plain-text version. Preview any draft before approving. Set `EMAIL_STYLE=plain` or use the Setup page to turn it off. |

Deliverability notes: the HTML is deliberately light (one column, no tracking pixel, no images unless you set `EMAIL_LOGO_URL`). Cold email with heavy images or many links lands in spam. If replies drop after switching to HTML, set the style back to plain text and compare on the Stats tab.

## Services and prices

The Setup tab has a **Services & starting prices** card with your 8 services. Enter a "from" price for any service and emails for businesses we would offer that service quote it as "from $X". Leave it blank and no price is mentioned. Every email lists all 8 services in the signature. The writer is blocked from claiming to be "cheapest", "below market" or "cheaper than other agencies", because those claims cannot be proven; a drafted email that tries is retried and then replaced by the template. Prices are stored in `data/catalog.json` on your computer.

## What the emails are built on (research summary)

Sources are mostly cold-email vendors (Belkins, Gong Labs via summaries, Instantly, Hunter, and others), so treat the numbers as directional and let your own Stats tab decide.

| Finding | What the agent does |
|---|---|
| Personalised, short subject lines (2-5 words) open and reply better | Subjects contain the business name, under 40 characters, A/B tested (plain vs question) |
| Bodies of roughly 50-125 words reply best | First email is 50-95 words, three short paragraphs |
| Interest-based questions beat "book a call" in a first email (Gong, ~300k emails) | First email ends with "Want me to send over the quick fixes I noted?". No call ask until they reply |
| Plain text is the safer first touch for deliverability (sources conflict) | Default "Auto": plain text for cold emails and follow-ups, branded HTML once someone has replied |
| Follow-ups drive a large share of replies; 4-6 touches over 2-3 weeks | First email plus 3 follow-ups on days 3, 7 and 14: a useful tip, a different angle or proof, then a break-up note |
| Mid-week mornings in the recipient's time zone | Emails wait for Tue-Thu 8-11am in the business's own time zone (from its address) |
| Specific, true detail beats generic flattery | Each email opens with one finding from the business's own site, nothing invented |

Proof: the case studies and testimonials currently on the website are samples, so they are never used. Add real, true proof points in Setup and the agent uses at most one, word for word.

## Using up to 10 mailboxes (e.g. a Workspace trial)

Setup > **A2. Sending mailboxes**: add each mailbox with its own App Password, the name it signs emails with, and an optional daily limit. Then:

- **Load is shared out evenly.** Each new draft goes to the mailbox with the most room today, and is signed with that mailbox's name.
- **One mailbox per lead.** The whole sequence (first email and follow-ups) comes from the same mailbox, in the same thread.
- **Each mailbox warms up on its own.** A new mailbox starts at 5 a day and gains 4 a day each week from its own first send. Two or more bounces hold only that mailbox.
- **A total limit across all mailboxes** (default 40 a day), because they share one domain and inbox providers judge the domain as a whole. Raise it slowly.
- **A failing mailbox is skipped**, its message is kept for retry, and the others carry on.
- **Replies come back to the mailbox that sent the email** and every mailbox's inbox is read, so a reply to any of them stops that lead's follow-ups. (Earlier versions set a Reply-To header that sent replies elsewhere; that is removed.)
- **Hot-lead alerts and the alert address:** the "Replies also go to" setting is now only where hot-lead alerts are emailed.

Honest limits: ten mailboxes on one domain share one domain reputation, so this spreads volume, it does not multiply what is safe. A good first month is 4-5 mailboxes at 5-10 emails each. If the trial ends, mailboxes beyond your paid licences stop working, so remove them from Setup and keep any replies you need first.
