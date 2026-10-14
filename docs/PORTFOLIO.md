# How the Portfolio works (plain English)

The projects on your website come from **one file**: `src/data/caseStudies.js`. You do not need the admin panel for these.

- The five projects in that file are what visitors see (Aurex7, Skylark, School CRM Portal, Pharmacy POS System, Clinic Appointment & Records Portal).
- Illustrative samples are **never shown** once a real project exists, so there are no "Sample project" tags.
- If the admin database holds a different copy of one of these projects, **the file wins**, so an old or sample copy can never show up.
- Projects you add in **Admin > Portfolio** still appear, after these five.

## To change a project, or add one

Ask me, or edit `src/data/caseStudies.js`. Each project has:

| Field | What to write |
|---|---|
| title, industry, solutionType | Name, who it is for, one line on what it is. Add "private client project" if there is no public link |
| problem, solution | What the client needed, and what you built |
| platform | For example `['Web']`, `['iOS', 'Android']` |
| features | A list of real, shipped features, one per line |
| technology | Only if you are sure. Leave `[]` otherwise. The page hides it |
| backend, aiIntegration, automation | Short lines, only if they really apply |
| result | **Only a real, measured outcome.** Leave `''` otherwise |
| placeholder | `false` for real work. `true` only for illustrative samples |

Rules that keep the site honest:
- Never write a result or a number you cannot prove.
- Never publish a client's name, link or screenshots without permission.
- If you are not sure about a detail, leave it out rather than guess.

## What is published right now

| Project | Link | Details shown |
|---|---|---|
| Aurex7 Trading Platform | aurex7.com | Spot and futures trading, Earn, daily AX7 mining with boost packages, ICO sale, 2FA and reviewed withdrawals, ledger and audit log. Next.js, PostgreSQL, Prisma |
| Skylark Luxury Hotel Booking | skylark.com | Hotel search by destination, dates, guests and rooms; curated Members' List; destination pages; plan-a-trip; membership with VIP perks. Next.js |
| School CRM Portal | private | Student and parent records, fees and invoices, attendance and results, admissions and messaging, staff salaries, inventory, biometric staff attendance, mobile app for homework, absence alerts and notifications. Web and Mobile |
| Pharmacy POS System | private | Billing at the counter, stock and expiry tracking, suppliers and purchasing, sales and profit reports |
| Clinic Appointment & Records Portal | private | Appointment scheduling, patient records and history, prescriptions and billing, reminders and reports, AI receptionist. Web |

The Aurex7 and Skylark details come from what those two public sites show. The three private projects list exactly what you confirmed. Still missing: technology, the platform of the pharmacy system, how many users or branches, and go-live dates. Add them when you can; leave them out rather than guess.

## To make the three private projects stronger

Send me, per project, whatever is true:
1. The main modules or screens (for example "fee collection", "stock and expiry tracking", "online appointment booking").
2. Who uses it (staff roles) and roughly how many users or branches.
3. Technology (web, mobile, desktop; the stack if you know it).
4. How long it took and when it went live.
5. Any real outcome you can stand behind ("replaced paper registers", "cut billing time"). Skip it if you cannot prove it.
6. Whether the client is happy to be named, or a short quote from them.

## Optional: the admin button

Admin > Portfolio > **Publish the site template projects** copies the file's projects into the admin database and removes the old samples there. It is no longer needed for the site to look right, but it keeps the admin list tidy.
