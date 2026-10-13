# How to update the Portfolio (plain English)

Your website shows projects from the **admin panel**, not from a file. So there are two places:

| Where | What it is | When you touch it |
|---|---|---|
| `src/data/caseStudies.js` | The **template**: your list of real projects, kept in the code | Only when I (or a developer) change it |
| **Admin > Portfolio** | What the **live site actually shows** | Whenever you want to change what visitors see |

## The easy way: one click (after the site has been redeployed)

1. Go to `oryantechsol.com/admin` and sign in.
2. Open **Portfolio**.
3. Click **Publish the site template projects**.
4. A box tells you exactly what it will do, for example:
   *add 4, update 1, remove 5 (the old sample projects)*. Click OK.
5. Wait for the green message. The new projects go live on the next site rebuild.
   If you do not want to wait, use **Publish** in the admin.

That adds Skylark, School CRM Portal, Pharmacy POS System and Clinic Appointment & Records Portal, updates Aurex7, and removes the five "Sample project" entries.

## Adding one project by hand later

Admin > Portfolio > **Add project**, then fill in:

| Box | What to write | Example |
|---|---|---|
| Title | Name of the project | Clinic Appointment & Records Portal |
| Category | Web, Software, AI or Automation | Software |
| Industry | Who it is for | Healthcare |
| Solution type | One line. Add "private client project" if there is no public link | Custom clinic portal · private client project |
| The problem | What the client needed, one or two sentences | A clinic needed one portal for booking appointments and keeping its records. |
| The solution | What you built. Add "live at yourdomain.com" if public | We built a custom portal for appointments and record keeping. |
| Technology | Comma-separated. **Leave empty if you are not sure** | Next.js, PostgreSQL |
| Result | **Only a real, measured outcome.** Leave empty otherwise | (empty) |
| Tick "Sample project" | **Leave unticked** for real work | |

Rules that keep the site honest:
- Never write a result or a number you cannot prove (for example "doubled bookings").
- Leave Technology empty rather than guess. The page simply hides that section.
- Never publish a client's name, link or screenshots without their permission. Private systems are described in general terms.

## Currently published (from the template)

| Project | Type | Link |
|---|---|---|
| Aurex7 Trading Platform | Software · Finance | aurex7.com |
| Skylark Luxury Hotel Booking | Web · Hospitality & Travel | skylark.com |
| School CRM Portal | Software · Education | private |
| Pharmacy POS System | Software · Healthcare & Retail | private |
| Clinic Appointment & Records Portal | Software · Healthcare | private |

## Things to check before you publish

1. **"Pharmacy POS"**: you wrote "PSO". I assumed it means point-of-sale (POS). Tell me if it should say something else.
2. **Aurex7 wording** is the text already on your site ("cloud mining plans", "two-factor authentication"). Confirm it matches what you built.
3. **Skylark**: the site was showing only a loading screen when I looked ("Preparing your experience"). Make sure it loads for visitors before you point people to it.
4. **Testimonials**: the three on the homepage are still examples, not real clients. Replace them with real quotes, or remove that section.
