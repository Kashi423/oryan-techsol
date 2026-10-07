import { bars, callout, checklist, cta, h2, h3, p, table, ul } from './helpers.js'

export default {
  slug: 'mobile-app-maintenance-what-to-budget',
  title: 'Mobile App Maintenance Costs: What to Budget After Launch',
  shortTitle: 'Mobile app maintenance costs',
  description:
    'What mobile app maintenance includes after launch: OS updates, bug fixes, security, hosting and store fees, plus a realistic yearly budget percentage.',
  date: '2026-11-07',
  updated: '2026-11-07',
  category: 'App Development',
  keywords:
    'mobile app maintenance cost, app maintenance budget, app support after launch, annual app maintenance, app update costs, keep app running, app hosting costs',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['how-much-does-a-mobile-app-cost', 'mobile-app-security-checklist', 'app-store-optimization-basics'],
  intro:
    'Launch day is not the finish line. Phones get new operating system versions every year, devices and screen sizes change, third-party services update their APIs, and users expect fixes and improvements. An app that is not maintained gradually breaks, becomes insecure and attracts bad reviews. Many first-time owners budget carefully for development and forget this ongoing cost entirely. This guide explains what maintenance covers, what influences the price and how to plan a realistic annual budget.',
  takeaways: [
    'A common rule of thumb is to budget roughly 15–25% of the original build cost per year for maintenance — more for complex or fast-growing apps.',
    'Maintenance covers four things: keeping it working, keeping it secure, keeping it current and keeping it improving.',
    'Fixed costs such as hosting, services and store fees come on top of developer time.',
    'Skipping updates is a false economy: costs rise and the app may be removed from stores.',
    'A support agreement with defined response times and hours is better than ad hoc fixes.',
  ],
  blocks: [
    h2('What maintenance actually covers'),
    table(
      'Maintenance categories',
      ['Category', 'What it involves', 'Why it matters'],
      [
        ['Corrective', 'Bug fixes and crash resolution', 'Protects ratings and retention'],
        ['Adaptive', 'Updates for new iOS/Android versions, devices, libraries and API changes', 'Prevents the app breaking or being removed from stores'],
        ['Security', 'Patching vulnerabilities, rotating keys, reviewing access', 'Protects user data and your reputation'],
        ['Perfective', 'Small improvements, performance tuning, usability tweaks', 'Keeps the app competitive'],
        ['Operations', 'Monitoring, backups, hosting, support', 'Keeps everything running day to day'],
      ],
    ),
    p(
      'Security upkeep is covered in more depth in our [mobile app security checklist](/blog/mobile-app-security-checklist).',
    ),

    h2('How much to budget'),
    p(
      'The widely quoted guideline is about 15–25% of the initial development cost per year. A simple app on stable technology may sit at the low end; an app with many integrations, real-time features, heavy user growth or strict compliance needs sits higher. Treat this as a planning range, not a quote — your actual costs depend on scope and how actively you evolve the product.',
    ),
    bars(
      'Illustrative yearly maintenance split (typical app)',
      [
        { label: 'Bug fixes and support', value: 30, display: '≈30%' },
        { label: 'OS and device updates', value: 25, display: '≈25%' },
        { label: 'Security and dependency updates', value: 15, display: '≈15%' },
        { label: 'Small improvements', value: 20, display: '≈20%' },
        { label: 'Monitoring and operations', value: 10, display: '≈10%' },
      ],
      'Percentages are illustrative of a typical distribution, not a benchmark. Your mix will vary.',
    ),
    p(
      'For how the original build is priced, see [how much a mobile app costs](/blog/how-much-does-a-mobile-app-cost).',
    ),

    h2('Costs beyond developer time'),
    checklist(
      'Recurring running costs',
      [
        'Cloud hosting, databases, storage and bandwidth',
        'Third-party services: maps, payments, SMS, email, analytics, push notifications',
        'Apple Developer Program and Google Play developer fees',
        'Monitoring, crash reporting and logging tools',
        'Domain, certificates and backups',
        'Licences for libraries, design tools or SDKs',
        'Customer support tools and staff time',
      ],
    ),
    callout(
      'warn',
      'Usage-based costs grow with success',
      'Many cloud and messaging services charge by usage. A successful launch can raise your running costs sharply, so review pricing tiers before you scale and set spending alerts.',
    ),

    h2('What affects the maintenance price'),
    ul(
      '**Complexity:** more features and integrations mean more to test and update.',
      '**Platforms:** supporting iOS, Android and web multiplies testing; cross-platform frameworks can help.',
      '**Technology choices:** well-supported tools are cheaper to maintain than obscure or abandoned ones.',
      '**Code quality and documentation:** clean, tested code is far cheaper to change.',
      '**Release pace:** frequent feature work is development, not maintenance — budget it separately.',
      '**Support expectations:** 24/7 coverage or fast response times cost more than business-hours support.',
    ),

    h2('Plan it properly'),
    h3('Choose a support model'),
    table(
      'Common arrangements',
      ['Model', 'Best for', 'Trade-off'],
      [
        ['Retainer (monthly hours)', 'Active apps with steady needs', 'Predictable cost; unused hours may expire'],
        ['Support plan with SLA', 'Business-critical apps', 'Guaranteed response times; higher fee'],
        ['Pay as you go', 'Small, stable apps', 'Flexible, but no guaranteed availability'],
        ['In-house team', 'Large, evolving products', 'Full control; hiring and management overhead'],
      ],
    ),
    checklist(
      'Maintenance planning checklist',
      [
        'Agree who is responsible after launch before the build ends',
        'Get the source code, accounts and documentation handed over to you',
        'Set a yearly budget and a monthly review of crashes, reviews and usage',
        'Schedule updates around major iOS and Android releases each year',
        'Keep dependencies current rather than letting them age',
        'Track store ratings and feedback — see [App Store Optimization basics](/blog/app-store-optimization-basics)',
      ],
    ),
    p(
      'The cheapest approach is rarely doing nothing. Deferred updates compound: a few skipped OS versions can turn a small fix into a major rework, and an unpatched vulnerability can cost far more than the patch.',
    ),
    cta(
      'Want predictable costs after launch? We offer maintenance and support plans for the apps we build — and for apps built elsewhere.',
      '/contact',
      'Ask about app maintenance',
    ),
  ],
  faqs: [
    {
      question: 'How much does mobile app maintenance cost per year?',
      answer:
        'A common guideline is roughly 15–25% of the original development cost per year, plus hosting, services and store fees. Simple apps can be lower and complex or fast-growing apps higher.',
    },
    {
      question: 'What does app maintenance include?',
      answer:
        'Bug fixes, updates for new operating system versions and devices, security patches, dependency and API updates, small improvements, monitoring, backups and support.',
    },
    {
      question: 'Can I skip maintenance and just leave the app as is?',
      answer:
        'It is risky. Apps can break with new OS versions, become insecure and eventually be removed from the stores. Deferred maintenance usually costs more later.',
    },
    {
      question: 'Is maintenance the same as adding new features?',
      answer:
        'No. Maintenance keeps the app working, secure and current; new features are additional development and should be budgeted separately.',
    },
    {
      question: 'Who should maintain my app after launch?',
      answer:
        'Ideally the team that built it, under a support agreement, or an in-house or third-party team with full access to the code and documentation.',
    },
  ],
}
