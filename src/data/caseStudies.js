// Single source of truth for portfolio content — read by both the homepage preview grid
// and each case study's detail page (/portfolio/:slug). To add a project: add one object
// here with a unique `slug`; no other file needs to change.
//
// IMPORTANT: once the admin panel manages projects (it does on the live site), the live site
// shows what is saved in the admin Portfolio page, not this file. This file is the starter
// template: use the "Publish the site template projects" button on the admin Portfolio page to
// copy it into the admin, or edit the projects there directly.
//
// Fields (never fill one in with a guess):
//   slug, title, category, industry, solutionType, problem, solution   — required
//   technology    — string[]; leave [] when you do not know it. The page hides the section.
//   result        — only a real, documented outcome. Leave '' to hide the Result section.
//   platform      — e.g. ['iOS', 'Android'] or ['Web']
//   features      — string[] of real, shipped features
//   backend, aiIntegration, automation — short strings, only if they really apply
//   placeholder   — true only for illustrative entries; the site labels them "Sample project"
//
// Private client work (no public link) is described in general terms and says so in
// `solutionType`, so visitors are not left looking for a link that does not exist.

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'ai', label: 'AI' },
  { value: 'web', label: 'Web' },
  { value: 'software', label: 'Software' },
  { value: 'automation', label: 'Automation' },
]

export const caseStudies = [
  {
    // "Aurex7" is the client-facing name (used everywhere below); "Forgepoint" was
    // OryanTechsol's internal project codename during development — not shown to visitors.
    slug: 'aurex7',
    title: 'Aurex7 Trading Platform',
    category: 'software',
    industry: 'Finance',
    solutionType: 'Custom Software Development · live at aurex7.com',
    problem:
      'The business wanted one account covering crypto mining, token sales and trading — instead of stitching together separate tools and logins.',
    solution:
      'We built Aurex7 end to end: a unified platform with cloud mining plans, ICO token sales, spot and futures trading, secure two-factor authentication and a full admin back office.',
    technology: ['Next.js', 'PostgreSQL', 'Prisma'],
    result: '',
    placeholder: false,
  },
  {
    slug: 'skylark',
    title: 'Skylark Luxury Hotel Booking',
    category: 'web',
    industry: 'Hospitality & Travel',
    solutionType: 'Hotel booking platform · live at skylark.com',
    problem:
      'A luxury hotel booking brand needed a premium online experience where guests can book stays and access exclusive VIP perks.',
    solution:
      'We built Skylark, a booking platform for luxury hotel stays with VIP perks for its guests, live at skylark.com.',
    technology: [],
    result: '',
    placeholder: false,
  },
  {
    slug: 'school-crm-portal',
    title: 'School CRM Portal',
    category: 'software',
    industry: 'Education',
    solutionType: 'Custom CRM portal · private client project',
    problem: 'A school needed a single portal to manage its students, families and day-to-day administration.',
    solution:
      'We built a custom CRM portal for a school. It is a private client system, so there is no public link; details are available on request.',
    technology: [],
    result: '',
    placeholder: false,
  },
  {
    slug: 'pharmacy-pos-system',
    title: 'Pharmacy POS System',
    category: 'software',
    industry: 'Healthcare & Retail',
    solutionType: 'Custom point-of-sale system · private client project',
    problem: 'A pharmacy needed one system covering the everyday needs of running a pharmacy.',
    solution:
      'We built a custom point-of-sale system covering the everyday needs of a pharmacy. It is a private client system, so there is no public link; details are available on request.',
    technology: [],
    result: '',
    placeholder: false,
  },
  {
    slug: 'clinic-appointment-records-portal',
    title: 'Clinic Appointment & Records Portal',
    category: 'software',
    industry: 'Healthcare',
    solutionType: 'Custom clinic management portal · private client project',
    problem: 'A clinic needed one portal for booking appointments and keeping its records.',
    solution:
      'We built a custom portal for appointments and record keeping covering the everyday needs of a clinic. It is a private client system, so there is no public link; details are available on request.',
    technology: [],
    result: '',
    placeholder: false,
  },
]

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((project) => project.slug === slug)
}

/** Filter tabs worth showing: "All" plus only the categories that actually have a project. */
export function categoriesInUse(projects, all = categories) {
  return all.filter((c) => c.value === 'all' || projects.some((p) => p.category === c.value))
}

/** True when at least one project is an illustrative sample. */
export const hasSamples = (projects) => projects.some((p) => p.placeholder)
