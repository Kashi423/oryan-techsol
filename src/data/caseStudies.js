// Single source of truth for portfolio content — read by both the homepage preview grid
// and each case study's detail page (/portfolio/:slug). To add a project: add one object
// here with a unique `slug`; no other file needs to change.
//
// Entries marked `placeholder: true` are illustrative, not real clients — both the card and
// detail layout surface that fact to visitors ("Sample project"). Replace an entry's fields
// (and drop `placeholder`) once a real project is ready to publish — the shape stays the same.
//
// Adding a real app or e-commerce project: use the same required fields as any entry below
// (slug, title, category, industry, solutionType, problem, solution, technology), plus
// whichever of these optional fields actually apply — never fill one in with a guess:
//   platform      — e.g. ['iOS', 'Android'] or ['Web']
//   features      — string[] of real, shipped features
//   screenshots   — string[] of real image paths (no stock/mockup images presented as the app)
//   backend       — short string, e.g. 'Node.js + PostgreSQL'
//   aiIntegration — short string describing a real AI feature, if any
//   automation    — short string describing real automated workflows, if any
//   result        — only if a real, documented outcome exists; omit rather than guess
// To make a new category filterable (e.g. 'app' once a real app project exists), add it to
// `categories` below — adding it before any project uses that category would show an empty
// tab, so wait until the first matching entry is added.

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'ai', label: 'AI' },
  { value: 'web', label: 'Web' },
  { value: 'software', label: 'Software' },
  { value: 'automation', label: 'Automation' },
]

export const caseStudies = [
  {
    slug: 'ai-support-assistant',
    title: 'AI Customer Support Assistant',
    category: 'ai',
    industry: 'E-commerce',
    solutionType: 'AI Bot & Automation',
    problem:
      'Support requests were piling up faster than the team could reply, with the same questions answered manually again and again.',
    solution:
      'A custom AI assistant trained on real support conversations, handling common questions instantly and routing anything complex to a human.',
    technology: ['React', 'Node.js', 'OpenAI API'],
    result: 'Sample result — cut average first-response time by more than half.',
    placeholder: true,
  },
  {
    slug: 'lead-qualification-agent',
    title: 'AI Lead Qualification Agent',
    category: 'ai',
    industry: 'Real Estate',
    solutionType: 'AI Agent & CRM Automation',
    problem:
      'Inbound property enquiries sat unanswered for hours, and unqualified leads took up as much time as serious buyers.',
    solution:
      'An AI agent that qualifies enquiries in real time, books viewings and syncs every conversation straight into the CRM.',
    technology: ['Next.js', 'OpenAI API', 'HubSpot API'],
    result: 'Sample result — cut lead response time from hours to minutes.',
    placeholder: true,
  },
  {
    slug: 'marketing-website-rebuild',
    title: 'Marketing Website Rebuild',
    category: 'web',
    industry: 'Professional Services',
    solutionType: 'Custom Web Development',
    problem: 'An outdated, slow website was losing visitors before they ever reached a contact form.',
    solution:
      "A fast, modern site rebuilt around the firm's actual services and client journey, with clear calls to action throughout.",
    technology: ['React', 'Tailwind CSS', 'Vercel'],
    result: 'Sample result — more visitors reaching the contact form after launch.',
    placeholder: true,
  },
  {
    slug: 'internal-operations-platform',
    title: 'Internal Operations Platform',
    category: 'software',
    industry: 'Logistics',
    solutionType: 'Custom Software Development',
    problem: 'Dispatch, inventory and reporting lived in three disconnected spreadsheets, with no shared source of truth.',
    solution:
      "A single internal platform built around the team's actual dispatch process, replacing the spreadsheets with one connected system.",
    technology: ['React', 'PostgreSQL', 'Node.js'],
    result: 'Placeholder — the real result will be added once this project ships.',
    placeholder: true,
  },
  {
    slug: 'workflow-automation-suite',
    title: 'Workflow Automation Suite',
    category: 'automation',
    industry: 'Finance',
    solutionType: 'Business Process Automation',
    problem: 'Client onboarding involved the same manual data entry across four different tools every time.',
    solution:
      'An automated workflow connecting the CRM, document signing and billing tools, removing the manual handoffs.',
    technology: ['Zapier', 'API Integrations', 'CRM Automation'],
    result: 'Sample result — removed a full day of manual data entry per week.',
    placeholder: true,
  },
  {
    // "Aurex7" is the client-facing name (used everywhere below); "Forgepoint" was
    // OryanTechsol's internal project codename during development — not shown to visitors.
    slug: 'aurex7',
    title: 'Aurex7 Trading Platform',
    category: 'software',
    industry: 'Finance',
    solutionType: 'Custom Software Development',
    problem:
      'The business wanted one account covering crypto mining, token sales and trading — instead of stitching together separate tools and logins.',
    solution:
      'We built Aurex7 end to end: a unified platform with cloud mining plans, ICO token sales, spot and futures trading, secure two-factor authentication and a full admin back office.',
    technology: ['Next.js', 'PostgreSQL', 'Prisma'],
    result: 'Sample result — one account replacing three separate logins for mining, trading and token sales.',
    placeholder: false,
  },
]

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((project) => project.slug === slug)
}
