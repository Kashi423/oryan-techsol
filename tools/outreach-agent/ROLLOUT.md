# Rollout checklist: 5 mailboxes, start at 8 a day, add 1 per sending day

Tick these in order. Everything marked **(you)** needs your own login, so I cannot do it for you.

## Part A. One-time setup (about 45 minutes)

### A1. Pre-flight on the domain (5 min)
- [ ] **(you)** Admin console > Apps > Google Workspace > Gmail > Authenticate email: DKIM for `oryantechsol.com` shows **Authenticating email**. (If it says "not started", click Start authentication.)
- [ ] DNS already has: SPF (with `_spf.google.com`), DMARC `p=none`, DKIM TXT, MX to Google. Nothing to add.
- [ ] Decide the 5 personas (first names that real people on your team can answer as). Example: Rai, Sara, Omar, Ayesha, Hamza. Emails are signed with these, so a human must be able to take the reply.

### A2. Create the 5 mailboxes (5 min each) **(you)**
For each mailbox:
1. Admin console > Directory > Users > **Add new user**: `firstname@oryantechsol.com`, set a password you keep.
2. Sign in once in an **incognito window** at mail.google.com and accept the prompts.
3. Turn on 2-Step Verification: myaccount.google.com/signinoptions/twosv
4. Create an App Password named `outreach`: myaccount.google.com/apppasswords. Copy the 16 letters.
5. In the app (`start-agent.bat`) > Setup > **A2. Sending mailboxes**: enter address, App Password, the name it signs as, leave "Daily limit" blank. Click **Add mailbox**, then **Test**.
6. Open that test email in Gmail > ⋮ > **Show original**: check `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`.

- [ ] Mailbox 1   - [ ] Mailbox 2   - [ ] Mailbox 3   - [ ] Mailbox 4   - [ ] Mailbox 5

### A3. Settings in the app (5 min)
- [ ] Setup > **A2** > Warm-up ramp: start **8**, add **1**, highest **25**. Total all mailboxes **100**. Save both.
- [ ] Setup > **Email look**: "Auto" (plain text first).
- [ ] Setup > **Services & starting prices**: confirm the prices. Add any REAL proof points (leave blank if none).
- [ ] Setup > **B**: your AI writer is connected (Gemini), or leave on templates.
- [ ] Alerts: "Replies also go to" is `sales@oryantechsol.com` (where hot-lead alerts arrive).

### A4. First-day safety check
- [ ] Run **start-demo.bat** once and click through Find > Approve > Send > Check replies so you know what each screen does with nothing at risk.
- [ ] Close it and open **start-agent.bat** for real use.

## Part B. Weeks 1 to 5: what the ramp does

Sends happen **Tuesday to Thursday, 8 to 11am in each business's own time zone**. The ramp counts *sending days*, not calendar days, so it follows real activity.

| Calendar week | Sending days | Per mailbox per day | All 5 per day | Emails that week |
|---|---|---|---|---|
| 1 | 1 to 3 | 8, 9, 10 | 40, 45, 50 | 135 |
| 2 | 4 to 6 | 11, 12, 13 | 55, 60, 65 | 180 |
| 3 | 7 to 9 | 14, 15, 16 | 70, 75, 80 | 225 |
| 4 | 10 to 12 | 17, 18, 19 | 85, 90, 95 | 270 |
| 5 | 13 to 15 | 20, 21, 22 | 100 (held by the total limit) | 300 |

Follow-ups come out of the same numbers (days 3, 7 and 14 after the first email), so in the first week all sends are new businesses, and by week 3 about three in four sends are follow-ups.

**Leads you need to approve:** about 40 on day 1, then roughly 25 to 30 new businesses per sending day once follow-ups start filling the limit. Do not approve more than the mailboxes can send; the rest simply wait.

## Part C. Daily routine (10 minutes)

1. Open the app. Look at the strip at the top: replies to answer, drafts to review.
2. **Replies** tab: answer interested replies first (they are listed first, with a suggested response).
3. **Find customers**: search a business type and area, 10 to 25 at a time.
4. **Review & send**: read the quality score and findings. Fix or reject anything under 80 or that you would not send yourself. Approve the rest.
5. Leave the window open (or install the daily task, see below). Sending happens at the right local mornings by itself.

Optional: double-click **install-daily-task.bat** once so Windows runs the cycle hourly on weekdays without the window open.

## Part D. Weekly health check (5 minutes, Stats tab)

| Number | Healthy | If worse |
|---|---|---|
| Bounce rate | under 2% | Lower the highest-per-mailbox, clean the list, check addresses before approving |
| Opt-outs | under 3% | Tighten who you target; rewrite the offer |
| Reply rate | 2 to 5% is normal | Test the other subject style; try the Rewrite buttons |
| A mailbox shows "Held: bounces" | investigate | Pause it, find the bad addresses, resume after a few days |

Automatic brakes: 2+ bounces or 4+ opt-outs in a mailbox's last 25 sends hold it at 5 a day; 3 bounces overall stops everything.

## Part E. If something goes wrong

- **Stop everything:** Pause button (Sent tab), or create a file named `PAUSE` in the `outreach-agent` folder.
- **Mail landing in spam** (check by sending to a personal Gmail and an Outlook address): pause for a few days, drop the daily limit by half, send only to your best-scoring leads.
- **A mailbox gets a Google warning:** pause it, do not retry for 24 hours.

## Part F. When the trial ends

- [ ] Reply to anyone still in conversation from their own mailbox first, and tell them the new address.
- [ ] Remove mailboxes beyond your paid licences in Setup (so the agent stops using them), then downgrade.
- [ ] Mailboxes you remove in Google lose their mail. Forward anything you need to `sales@oryantechsol.com` before downgrading.
- [ ] Keep 2 to 3 mailboxes for steady outreach, and lower the totals to match (Setup > total limit).
