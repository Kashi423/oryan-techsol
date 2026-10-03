// Blog posts. Each post is plain data: `sections` render as h2 + paragraphs + optional bullet
// list. To publish a new article, add an entry here, then add its /blog/<slug> to
// scripts/prerender.mjs and public/sitemap.xml.

export const posts = [
  {
    slug: 'how-much-does-a-mobile-app-cost',
    title: 'How Much Does It Cost to Build a Mobile App?',
    description:
      'What actually drives mobile app development cost — scope, platforms, backend, design and maintenance — and how to budget without surprises.',
    date: '2026-10-04',
    readMinutes: 6,
    category: 'App Development',
    related: { label: 'App Development services', to: '/app-development' },
    intro:
      'There is no honest single price for "an app". Two apps that look similar on a phone can differ by ten times in effort. Here is what really moves the number, so you can scope sensibly and compare quotes fairly.',
    sections: [
      {
        heading: 'The five things that drive cost',
        list: [
          'Scope and feature count: every screen, role, and integration adds design, build and testing time.',
          'Platforms: iOS only, Android only, or both. Cross-platform frameworks such as React Native or Flutter share most code and usually cost less than two native apps.',
          'Backend and data: user accounts, a database, admin tools, and APIs are often more work than the visible app.',
          'Design: a clean, standard interface is faster than custom animation and a bespoke design system.',
          'Third-party integrations: payments, maps, chat, analytics, and your existing CRM or ERP each take integration and testing effort.',
        ],
      },
      {
        heading: 'Start with an MVP, not the full vision',
        paragraphs: [
          'The cheapest way to reduce risk is to build the smallest version that proves the idea: one core user journey, done well. You learn from real users before paying to build features nobody asked for.',
          'A good MVP is not a rough prototype. It is a focused, stable release with room to grow, built on a codebase you will not have to throw away.',
        ],
      },
      {
        heading: 'Costs people forget',
        list: [
          'App Store and Google Play developer accounts and review requirements.',
          'Hosting, cloud services, push notifications, and SMS or email delivery.',
          'Ongoing maintenance: OS updates, bug fixes and security patches. Plan for this every year, not just at launch.',
          'Analytics and support tooling so you can see how the app is used.',
        ],
      },
      {
        heading: 'How to get a quote you can trust',
        paragraphs: [
          'Give any agency a short brief: who the users are, the three to five core features, the platforms you need, and what you already have (designs, backend, brand). Ask for the estimate broken down by phase, ask what is excluded, and ask how changes are handled once work starts.',
          'Be wary of a firm fixed price offered before anyone has asked you a single question about your workflow.',
        ],
      },
    ],
  },
  {
    slug: 'ai-chatbot-vs-live-chat-for-small-business',
    title: 'AI Chatbot vs. Live Chat: Which Is Right for Your Business?',
    description:
      'A practical comparison of AI chatbots and human live chat for small and mid-sized businesses — response time, cost, accuracy and when to combine them.',
    date: '2026-10-04',
    readMinutes: 5,
    category: 'AI Bots',
    related: { label: 'AI Bots & Automation', to: '/ai-bots' },
    intro:
      'Customers expect quick answers at any hour. Live chat gives you a human; an AI chatbot gives you instant coverage. The best setup for most businesses is not either-or.',
    sections: [
      {
        heading: 'Where AI chatbots shine',
        list: [
          'Instant replies, 24/7, including nights, weekends and holidays.',
          'Handling the same repetitive questions: hours, pricing, order status, bookings, basic troubleshooting.',
          'Qualifying leads: collecting name, need and budget before a person ever gets involved.',
          'Scaling to many conversations at once without adding headcount.',
        ],
      },
      {
        heading: 'Where humans still win',
        list: [
          'Sensitive, emotional or complex situations, such as complaints and billing disputes.',
          'Negotiation and high-value sales conversations.',
          'Anything outside the knowledge the bot has been given.',
        ],
      },
      {
        heading: 'The hybrid model',
        paragraphs: [
          'A well-built bot answers what it can from your own content, collects context, and hands off to a person with the full conversation attached when it reaches its limit. Customers get speed; your team keeps the conversations that need judgment.',
          'The key is honesty and a clear escape hatch: always let people reach a human, and never let the bot guess at things like prices or policies it was not given.',
        ],
      },
      {
        heading: 'What to check before you build one',
        list: [
          'Is your FAQ, pricing and policy content written down and up to date? The bot is only as good as its source material.',
          'Which systems should it connect to (CRM, calendar, helpdesk, store)?',
          'How will you review conversations and fix wrong answers?',
          'Where does customer data go, and does that meet your privacy obligations?',
        ],
      },
    ],
  },
  {
    slug: 'custom-software-vs-off-the-shelf',
    title: 'Custom Software vs. Off-the-Shelf: How to Decide',
    description:
      'When to buy a ready-made tool and when to build custom software — a straightforward framework covering cost, fit, control, and long-term flexibility.',
    date: '2026-10-04',
    readMinutes: 5,
    category: 'Custom Software',
    related: { label: 'Custom Software development', to: '/custom-software' },
    intro:
      'Off-the-shelf software is faster and cheaper to start. Custom software fits your process exactly. Neither is always right — the decision comes down to how unique your workflow is and how much it matters to your business.',
    sections: [
      {
        heading: 'Buy off-the-shelf when…',
        list: [
          'The need is common: accounting, email marketing, basic CRM, project management.',
          'You need to be running next week, not next quarter.',
          'A tool already covers about 80–90% of what you need and the rest is minor.',
        ],
      },
      {
        heading: 'Build custom when…',
        list: [
          'Your process is a competitive advantage and generic tools force you to bend it.',
          'You are stitching together five tools with spreadsheets and manual copy-paste.',
          'Per-seat licence fees keep climbing as you grow.',
          'You need specific integrations, reporting, or workflows that nothing on the market supports.',
        ],
      },
      {
        heading: 'A middle path',
        paragraphs: [
          'You do not have to choose one for everything. Many companies keep standard tools for standard needs and build custom software only for the core workflow, then connect the two through APIs. That keeps the build small and the value high.',
        ],
      },
      {
        heading: 'Questions to ask before committing',
        list: [
          'What does the current workaround cost us each month in time and mistakes?',
          'Who will maintain the software in three years?',
          'Will we own the source code and the data?',
          'Can we start with one module and expand?',
        ],
      },
    ],
  },
  {
    slug: 'what-is-api-integration',
    title: 'What Is API Integration and When Does Your Business Need It?',
    description:
      'A plain-English explanation of API integration, common examples such as payments, CRM and shipping, and the signs it is time to connect your systems.',
    date: '2026-10-04',
    readMinutes: 4,
    category: 'API Integrations',
    related: { label: 'API & System Integrations', to: '/api-integrations' },
    intro:
      'An API is how one piece of software talks to another. API integration means connecting your systems so data moves automatically instead of being retyped by a person.',
    sections: [
      {
        heading: 'Everyday examples',
        list: [
          'A new online order automatically creates an invoice and a shipping label.',
          'A website form submission lands in your CRM and notifies the right salesperson.',
          'Payments from Stripe or PayPal update your accounting software.',
          'Inventory counts stay in sync between your store, warehouse and marketplace listings.',
        ],
      },
      {
        heading: 'Signs you need integration',
        list: [
          'Staff copy the same information between two or more systems.',
          'Reports disagree depending on which tool you open.',
          'Customers wait because information is trapped in another system.',
          'You are about to add another tool and dread the extra manual work.',
        ],
      },
      {
        heading: 'What a good integration includes',
        paragraphs: [
          'Reliable integration is more than "it worked once". Look for error handling and retries, logging so you can see what happened, secure storage of credentials, and monitoring that alerts you when something breaks. Those are the parts that keep it working a year later.',
        ],
      },
    ],
  },
  {
    slug: 'business-process-automation-where-to-start',
    title: 'Business Process Automation: Where to Start',
    description:
      'How to find the workflows worth automating first, measure the return, and avoid automating a broken process.',
    date: '2026-10-04',
    readMinutes: 5,
    category: 'Automation',
    related: { label: 'Business Automation', to: '/business-automation' },
    intro:
      'Automation pays off fastest on tasks that are frequent, rule-based and annoying. The trick is choosing the right first one — and fixing the process before you automate it.',
    sections: [
      {
        heading: 'Pick candidates with this checklist',
        list: [
          'It happens often (daily or weekly), not once a year.',
          'The steps follow clear rules that rarely change.',
          'People currently copy data, send reminders, or chase approvals by hand.',
          'Mistakes are costly or customers notice delays.',
        ],
      },
      {
        heading: 'Common first wins',
        list: [
          'Lead capture to CRM, with instant follow-up emails.',
          'Invoice and payment reminders.',
          'Onboarding checklists and document collection.',
          'Approval routing for purchases, leave or content.',
          'Weekly reporting pulled automatically from your tools.',
        ],
      },
      {
        heading: 'Fix before you automate',
        paragraphs: [
          'Automating a messy process just makes the mess faster. Map the current steps, remove the ones that add no value, then automate what is left. Start with one workflow, measure hours saved and errors avoided, and use that evidence to choose the next.',
        ],
      },
    ],
  },
]

export const getPostBySlug = (slug) => posts.find((post) => post.slug === slug)
