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
