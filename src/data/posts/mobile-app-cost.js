import { bars, callout, checklist, compare, cta, h2, h3, p, steps, table, timeline, ul } from './helpers.js'

export default {
  slug: 'how-much-does-a-mobile-app-cost',
  title: 'How Much Does It Cost to Build a Mobile App in 2026? A Plain-English Guide',
  shortTitle: 'How much does a mobile app cost?',
  description:
    'What a mobile app really costs in 2026: five cost drivers, budget ranges by complexity, hidden costs and ways to save without cutting quality.',
  date: '2026-10-04',
  updated: '2026-10-07',
  category: 'App Development',
  keywords:
    'mobile app development cost, how much does it cost to build an app, app development cost 2026, app development budget, MVP cost, cross-platform app cost',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['react-native-vs-flutter-vs-native', 'how-to-choose-a-software-development-company', 'custom-software-vs-off-the-shelf'],
  intro:
    'Ask five agencies what a mobile app costs and you will get five very different numbers — and every one of them can be honest. An app is not a product with a sticker price; it is a bundle of decisions about features, platforms, design depth, back-end systems and long-term support. This guide explains what actually moves the number, gives you realistic planning ranges, and shows you how to scope a project so the quote you receive is one you can trust.',
  takeaways: [
    'Cost is driven by scope, not by the number of screens: features, user roles, back-end work and integrations matter most.',
    'As illustrative planning ranges, a simple app often lands in the low tens of thousands of dollars, a mid-complexity product in the tens-to-low-hundreds of thousands, and a complex platform above that.',
    'Building iOS and Android together with a cross-platform framework usually costs noticeably less than two separate native apps.',
    'Budget for the first year after launch too — maintenance, hosting and updates are a recurring cost, not an optional extra.',
    'The most reliable way to control cost is an MVP: one core user journey, built well, then expanded using real user feedback.',
  ],
  blocks: [
    h2('The honest answer: it depends on scope, not screens'),
    p(
      'People often estimate an app by counting screens. It is an intuitive instinct, and it is why so many early budgets are wrong. A login screen and a payment-processing screen look equally simple on a wireframe, but one is a few hours of work and the other involves a payment provider, security requirements, failure handling, refunds, receipts and compliance considerations.',
    ),
    p(
      'What really determines mobile app development cost is the amount of **decision-making and engineering work** hidden behind each feature. That is why a reputable team will ask you many questions before quoting — and why a very low price offered after a five-minute conversation should make you cautious.',
    ),
    callout(
      'note',
      'About the numbers in this guide',
      'Every price range and timeline below is an **illustrative planning range** reflecting what agencies in the US market commonly quote for professionally built apps. Real quotes vary with team location, seniority, scope and quality bar. Use them to sanity-check a budget — not as a quotation.',
    ),
    table(
      'Illustrative budget ranges by app complexity',
      ['App complexity', 'Typical examples', 'Planning range (USD)', 'Typical timeline'],
      [
        ['Simple', 'Single-purpose utility, content or booking app with basic accounts', '$15,000 – $40,000', '2 – 3 months'],
        ['Mid-complexity', 'Marketplace, on-demand service, fitness or learning app with payments and an admin panel', '$40,000 – $120,000', '3 – 6 months'],
        ['Complex', 'Fintech, healthcare, real-time or multi-sided platforms with heavy integrations and compliance', '$120,000 – $300,000+', '6 – 12+ months'],
      ],
      'Planning ranges only. Not a quote — your project may fall outside them, especially with offshore, nearshore or in-house teams.',
    ),
    p(
      'If your idea sits between two rows, that is normal. The right way to find your real number is a short discovery phase, which we cover in the “how to get a quote you can trust” section below.',
    ),

    h2('The five factors that actually drive app development cost'),
    p(
      'Almost every cost conversation comes down to the same five levers. Understand them and you can reshape a quote — by changing the scope, not by squeezing quality.',
    ),
    bars(
      'How much each factor typically moves the budget',
      [
        { label: 'Features & business logic', value: 92, display: 'Largest lever', note: 'Every feature adds design, build, testing and edge cases.' },
        { label: 'Back-end, data & APIs', value: 80, display: 'Often hidden', note: 'Accounts, databases, admin tools and servers are frequently more work than the visible app.' },
        { label: 'Integrations (payments, maps, CRM)', value: 66, display: 'High', note: 'Each third-party service means setup, error handling and testing.' },
        { label: 'Design depth & custom animation', value: 52, display: 'Medium', note: 'A clean standard interface is faster than a fully bespoke design system.' },
        { label: 'Platforms (iOS, Android, both)', value: 44, display: 'Medium', note: 'Cross-platform frameworks share most code between platforms.' },
      ],
      'Illustrative relative effort, not measured data. Actual weight varies by project.',
    ),

    h3('1. Features and business logic'),
    p(
      'This is the biggest driver, and the one most under your control. Core features that every user needs are worth building first; “nice to have” features are what quietly double a budget. Ask of each feature: **would a first user still get value if this did not exist at launch?** If yes, it belongs in version two.',
    ),
    h3('2. Back-end, data and admin tools'),
    p(
      'The part of an app people see is often the smaller half. Behind it sit user accounts, a database, business rules, notifications, file storage and an admin dashboard so your team can manage content, users and orders. If your app needs to talk to existing systems, that is [API and system integration](/api-integrations) work — and it is where many budgets expand.',
    ),
    h3('3. Third-party integrations'),
    p(
      'Payments, maps, chat, analytics, push notifications, identity verification, your CRM or ERP: each is a well-trodden path, but none is free. Plan roughly a few days to a few weeks per meaningful integration, depending on how many edge cases the provider has. Our guide to [what API integration is](/blog/what-is-api-integration) explains what that work involves and why it is worth doing properly.',
    ),
    h3('4. Design depth'),
    p(
      'Good design is not decoration — it is the difference between an app people finish tasks in and an app they delete. But the scale of design effort varies: using established patterns and a tidy component library is efficient; designing custom illustrations, motion and a unique interaction model for every screen is a different budget entirely.',
    ),
    h3('5. Platforms and technology choices'),
    p(
      'You can build iOS and Android separately (native), or share most of the code between them (cross-platform, using frameworks such as React Native or Flutter). For most business apps, cross-platform delivers a very similar user experience at a meaningfully lower total cost. We compare the options in detail in [React Native vs Flutter vs native development](/blog/react-native-vs-flutter-vs-native).',
    ),

    h2('Where the money goes: the stages of an app project'),
    p(
      'It helps to see a budget as a sequence of stages rather than a single number. Here is the usual shape of a professionally run project — and why skipping the early stages tends to make the later ones more expensive.',
    ),
    steps(
      'The stages of a mobile app project',
      [
        { title: 'Discovery', text: 'Goals, users, features, risks. The cheapest place to fix a wrong assumption.' },
        { title: 'UX & UI design', text: 'User flows, wireframes, then visual design and a clickable prototype.' },
        { title: 'Build', text: 'App, back-end and integrations, delivered in small, reviewable increments.' },
        { title: 'Test', text: 'Device testing, bug fixing, performance and security checks.' },
        { title: 'Launch & support', text: 'Store submission, monitoring and the first rounds of improvement.' },
      ],
      'Typical sequence; stages overlap on well-run projects.',
    ),
    p(
      'A frequent mistake is treating discovery and design as optional to “save money”. In practice, changing a decision in discovery costs a conversation; changing the same decision after the build costs rework. That is why many experienced teams recommend spending a modest slice of the budget on discovery before committing to a fixed scope.',
    ),

    h2('What kind of app are you building? Complexity by type'),
    p(
      'Different app types carry very different hidden complexity. A content app with a simple feed and a marketplace connecting buyers and sellers are both “apps”, but the second needs two sets of users, payments, trust and safety, disputes, notifications and an operations dashboard.',
    ),
    table(
      'Where complexity hides, by app type',
      ['App type', 'What adds cost beyond the screens'],
      [
        ['Booking / on-demand service', 'Calendars and availability, payments, notifications, provider and customer accounts, admin tooling'],
        ['Marketplace', 'Two-sided accounts, listings, search and filters, payments and payouts, reviews, moderation'],
        ['E-commerce / retail', 'Catalogue, inventory sync, checkout, shipping and tax rules, order management. See [e-commerce solutions](/ecommerce)'],
        ['Fitness / learning', 'Content delivery, progress tracking, subscriptions, offline support, push reminders'],
        ['Fintech / healthcare', 'Security, compliance, identity verification, audit trails, extensive testing'],
        ['Internal business app', 'Single sign-on, integrations with internal systems, reporting, role-based permissions'],
      ],
    ),

    h2('Native or cross-platform: how the choice affects the budget'),
    p(
      'Native development means building a separate app for iOS and for Android in each platform’s own tools. It gives maximum access to every device feature and can be the right choice for performance-critical or hardware-heavy products. Cross-platform development shares most of the code across both platforms, which usually shortens the timeline and lowers cost, while delivering a result most users cannot tell apart from native.',
    ),
    compare(
      'Cross-platform vs. two native apps',
      {
        title: 'Cross-platform (React Native, Flutter)',
        points: [
          'One shared codebase for iOS and Android',
          'Typically faster delivery and a lower total build cost',
          'Easier to keep both platforms in sync as you add features',
          'Strong fit for most business, marketplace and content apps',
        ],
      },
      {
        title: 'Two native apps (Swift / Kotlin)',
        points: [
          'Two codebases, two sets of work and maintenance',
          'Higher total cost and longer timeline',
          'Best for heavy graphics, advanced hardware or platform-specific features',
          'Features can drift between platforms if not carefully managed',
        ],
      },
      'A rule of thumb, not a law — the right answer depends on your product. We cover the trade-offs in depth in our [cross-platform vs native guide](/blog/react-native-vs-flutter-vs-native).',
    ),

    h2('The costs people forget to budget for'),
    p(
      'The build is not the end of the bill. These are the line items that surprise first-time founders the most — put them in your plan from day one.',
    ),
    checklist(
      'Hidden and recurring costs checklist',
      [
        'Apple Developer and Google Play accounts, plus store review requirements',
        'Hosting, databases and cloud services that scale with your users',
        'Push notifications, SMS, email and other messaging providers',
        'Third-party service fees (payments, maps, analytics, identity checks)',
        'Maintenance: fixing bugs and supporting each new iOS and Android version',
        'Security updates and dependency upgrades',
        'Analytics and crash reporting so you can see how the app performs',
        'Customer support tooling and content or moderation work',
        'Marketing and user acquisition — an app does not market itself',
      ],
    ),
    callout(
      'tip',
      'Plan for the year after launch',
      'A commonly used planning rule of thumb is to reserve roughly **15–20% of the original build cost per year** for maintenance and improvement. Treat it as a starting assumption and refine it with your team once the architecture is chosen.',
    ),

    h2('How to reduce app development cost without cutting quality'),
    p(
      'The goal is never the cheapest quote — it is the best result per dollar. These approaches reduce cost by removing waste, not by lowering standards.',
    ),
    ul(
      '**Start with an MVP.** Build the smallest version that proves the idea: one core user journey, done well and built on a codebase you will not have to throw away.',
      '**Go cross-platform** unless you have a specific reason not to. Sharing code across iOS and Android is usually the largest single saving.',
      '**Use proven building blocks** — standard authentication, payment and messaging providers — instead of building custom versions of solved problems.',
      '**Prioritise ruthlessly.** Rank every feature as must-have, should-have or later. Ship the first group.',
      '**Decide early.** Changes made after design sign-off cost far more than changes made during discovery.',
      '**Keep one decision-maker.** Projects slow down and grow when feedback arrives from five people with five opinions.',
    ),
    compare(
      'MVP-first vs. “everything at launch”',
      {
        title: 'MVP-first approach',
        points: [
          'Lower upfront cost and a faster path to real users',
          'Features chosen from evidence, not guesses',
          'Money saved if an assumption turns out wrong',
          'Easy to add features in planned phases',
        ],
      },
      {
        title: 'Everything-at-launch approach',
        tone: 'bad',
        points: [
          'Higher cost and a longer wait before any feedback',
          'Risk of building features nobody uses',
          'Harder to change direction once most of the budget is spent',
          'Larger, riskier launch',
        ],
      },
    ),
    cta(
      'Not sure which features belong in your MVP? We will help you scope it honestly — including what to leave out.',
      '/contact',
      'Book a free consultation',
    ),

    h2('How to get a quote you can trust'),
    p(
      'A trustworthy estimate starts with a good brief and ends with transparent assumptions. Whoever you talk to — an agency, a freelancer or an in-house team — make the conversation easier with a short document covering:',
    ),
    ul(
      '**Who the users are** and the main problem the app solves for them.',
      '**The three to five core features** you consider essential at launch.',
      '**Platforms needed** (iOS, Android, or both) and any devices or regions that matter.',
      '**What already exists:** designs, brand assets, a back-end, systems to integrate with.',
      '**Constraints:** timeline, budget range, compliance or security requirements.',
    ),
    p(
      'Then ask for the estimate **broken down by phase**, with assumptions and exclusions written down, and ask how changes in scope are handled once work begins. Be wary of a firm fixed price offered before anyone has asked you detailed questions. If you are weighing several teams, our guide on [how to choose a software development company](/blog/how-to-choose-a-software-development-company) gives you a full evaluation checklist.',
    ),
    timeline(
      'A realistic path from idea to launch',
      [
        { label: 'Weeks 1–2', title: 'Discovery and scoping', text: 'Define users, goals, core features and risks. Agree what is in and out of version one.' },
        { label: 'Weeks 3–5', title: 'Design and prototype', text: 'Wireframes, visual design and a clickable prototype you can test with real people.' },
        { label: 'Weeks 6–14', title: 'Build in increments', text: 'App, back-end and integrations delivered in reviewable stages, with regular demos.' },
        { label: 'Weeks 15–16', title: 'Testing and launch prep', text: 'Device testing, performance and security checks, store assets and submission.' },
        { label: 'After launch', title: 'Learn and improve', text: 'Monitor, fix, and plan the next release from real usage data.' },
      ],
      'Indicative timeline for a mid-complexity app — simple apps are shorter, complex platforms longer.',
    ),

    h2('Your next step'),
    p(
      'You do not need a perfect specification to start a useful conversation — you need a clear problem and a willingness to prioritise. If you would like an honest view of what your app would involve, what to build first and what a realistic budget looks like, [talk to our team](/contact) or read more about our [mobile app development services](/app-development). If your app needs to connect to a CRM, payment gateway or other systems, our [API integration service](/api-integrations) covers that side too.',
    ),
  ],
  faqs: [
    {
      question: 'How much does it cost to build a simple mobile app?',
      answer:
        'As an illustrative planning range, a simple single-purpose app built by a professional agency commonly lands in the low tens of thousands of dollars and takes a couple of months. The exact figure depends on features, platforms, design depth and back-end needs — a short discovery phase gives a reliable number.',
    },
    {
      question: 'Is it cheaper to build one app for both iOS and Android?',
      answer:
        'Usually yes. Cross-platform frameworks such as React Native and Flutter share most of the code between platforms, which typically shortens delivery and lowers cost compared with building two separate native apps, while still giving users a polished experience.',
    },
    {
      question: 'How long does it take to develop a mobile app?',
      answer:
        'A simple app often takes two to three months, a mid-complexity product three to six months, and a complex platform six to twelve months or more. Timelines depend on scope clarity, feedback speed and how many integrations are involved.',
    },
    {
      question: 'What is an MVP and why does it reduce cost?',
      answer:
        'An MVP (minimum viable product) is the smallest version of your app that delivers real value to a first group of users. It reduces cost because you build only the essential features first, learn from real usage, and invest in additions that users actually want.',
    },
    {
      question: 'What ongoing costs should I expect after launch?',
      answer:
        'Expect hosting and cloud services, third-party service fees, store accounts, maintenance for new iOS and Android versions, security updates and support. A common planning rule of thumb is to reserve about 15–20% of the build cost per year, then refine it with your development team.',
    },
    {
      question: 'Why do app development quotes vary so much?',
      answer:
        'Quotes differ because teams interpret scope differently, use different technologies, have different seniority and locations, and include different assumptions. Comparing quotes only works when each is broken down by phase with assumptions and exclusions written down.',
    },
  ],
}
