import { callout, checklist, compare, cta, h2, h3, p, table, ul } from './helpers.js'

export default {
  slug: 'how-to-write-an-app-requirements-document',
  title: 'How to Write an App Requirements Document (With a Free Template Outline)',
  shortTitle: 'App requirements document',
  description:
    'How to write an app requirements document: what to include, how to describe features as user stories, common mistakes and a ready-to-use outline.',
  date: '2026-11-02',
  updated: '2026-11-02',
  category: 'App Development',
  keywords:
    'app requirements document, software requirements specification, project brief template, user stories examples, write app requirements, product requirements document, how to brief a developer',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['mobile-app-development-process', 'mvp-development-guide-for-startups', 'how-to-choose-a-software-development-company'],
  intro:
    'The quality of an app quote — and of the app — depends heavily on the quality of the brief. A vague “we want an Uber for X” produces wildly different estimates and expensive misunderstandings. A clear requirements document does not need to be long or technical; it needs to explain who the app is for, what they must be able to do, and what “done” looks like. This guide shows what to include, how to describe features and user stories, and gives you an outline you can copy, so developers can estimate accurately and build the right thing.',
  takeaways: [
    'A good brief answers who, why, what, and how you will know it worked — in plain language.',
    'Describe features as user stories and acceptance criteria, not technical solutions.',
    'Separate must-haves from nice-to-haves and state what is out of scope.',
    'Include constraints: budget range, timeline, platforms, integrations, compliance and existing assets.',
    'Treat the document as a living agreement to refine with your development team during discovery.',
  ],
  blocks: [
    h2('Why a requirements document matters'),
    p(
      'It forces you to make decisions before money is spent, gives every bidder the same information so quotes are comparable, and becomes the reference when scope questions arise. It also speeds up discovery: a team that starts from a solid brief spends its time improving your idea rather than decoding it. It pairs naturally with validation ([how to validate an app idea](/blog/how-to-validate-an-app-idea)) and with the first stage of the [mobile app development process](/blog/mobile-app-development-process).',
    ),

    h2('The outline: what to include'),
    table(
      'App requirements document outline',
      ['Section', 'What to write'],
      [
        ['1. Overview', 'One paragraph: what the app is, for whom and why it exists'],
        ['2. Goals and success measures', 'Business goals and how you will measure them (users, bookings, revenue, time saved)'],
        ['3. Users', 'Who they are, their needs and the main situations in which they use the app'],
        ['4. Features and user stories', 'What users can do, prioritised (see below)'],
        ['5. Out of scope', 'What the first version will not include'],
        ['6. Platforms and devices', 'iOS, Android, web; minimum versions; tablets'],
        ['7. Integrations and data', 'Systems to connect (payments, CRM, maps), data you hold or must migrate'],
        ['8. Design and branding', 'Existing brand assets, style references, apps you admire'],
        ['9. Non-functional needs', 'Performance, security, privacy, accessibility, languages, compliance'],
        ['10. Constraints', 'Budget range, timeline, team, dependencies'],
        ['11. Competitors and references', 'Similar products and what you like or dislike'],
        ['12. Open questions and assumptions', 'What you do not know yet'],
      ],
    ),

    h2('Describe features as user stories'),
    p(
      'A user story states who wants what and why, without dictating how to build it: “As a **[type of user]**, I want to **[do something]** so that **[benefit]**.” Add acceptance criteria — simple checks that tell you when it works.',
    ),
    callout(
      'note',
      'Example',
      '**Story:** As a customer, I want to reschedule my booking so that I can avoid cancelling and rebooking. **Acceptance:** I can pick a new available slot; I receive a confirmation; the old slot is released; I cannot reschedule within 24 hours of the start.',
    ),
    compare(
      'Good vs. weak requirements',
      {
        title: 'Good',
        points: [
          '“Customers can search providers by location and availability.”',
          '“Admins can export bookings to CSV.”',
          'Specific, testable, tied to a user need',
          'States priority: must / should / later',
        ],
      },
      {
        title: 'Weak',
        tone: 'bad',
        points: [
          '“It should be user-friendly and fast.”',
          '“Like Uber but for plumbers.”',
          'A list of screens without purposes',
          'Technical prescriptions with no reason',
        ],
      },
    ),

    h2('Prioritise ruthlessly'),
    ul(
      '**Must have:** the app does not deliver value without it.',
      '**Should have:** important, but the first version can launch without it.',
      '**Could have:** pleasant extras.',
      '**Won’t have (yet):** explicitly deferred — which prevents scope creep.',
    ),
    p(
      'This is the same discipline described in the [MVP development guide](/blog/mvp-development-guide-for-startups): a smaller first version gets to market sooner and teaches you more.',
    ),

    h2('Do not forget the “non-functional” requirements'),
    checklist(
      'Often-missed requirements',
      [
        'Security and privacy expectations; sensitive data you will handle (see our [mobile app security checklist](/blog/mobile-app-security-checklist))',
        'Accessibility needs (screen readers, text size, colour contrast)',
        'Languages, currencies and regions',
        'Offline behaviour and poor-connection handling',
        'Expected number of users and growth',
        'Analytics and reporting you need',
        'Admin tools for managing content, users and orders',
        'Support and maintenance expectations after launch',
      ],
    ),
    h3('Share what already exists'),
    p(
      'Include brand guidelines, logos, existing designs, sketches, data samples, API documentation for systems you use, and screenshots of apps you like. Existing assets reduce guesswork and cost.',
    ),

    h2('Common mistakes'),
    ul(
      '**Describing the solution, not the problem:** let the team propose better ways to meet the need.',
      '**Leaving out the budget range:** it helps a team recommend what is realistic. Our [app cost guide](/blog/how-much-does-a-mobile-app-cost) can help you set one.',
      '**Everything is “high priority”:** if all is a must-have, nothing is prioritised.',
      '**Ignoring admin and back-office needs:** they often equal the visible app in effort.',
      '**Treating the document as final:** expect to refine it in discovery.',
    ),
    h2('Using it to choose a partner'),
    p(
      'Send the same document to each shortlisted team and compare how they respond: the quality of their questions tells you as much as the price. Our checklist on [choosing a software development company](/blog/how-to-choose-a-software-development-company) shows what else to look for.',
    ),
    cta(
      'Want a hand turning your idea into a clear brief? We will run a short discovery session and give you a requirements document and a realistic estimate.',
      '/contact',
      'Book a discovery call',
    ),
  ],
  faqs: [
    {
      question: 'What should an app requirements document include?',
      answer:
        'An overview, goals and success measures, users, prioritised features as user stories, what is out of scope, platforms, integrations and data, design assets, non-functional needs such as security and accessibility, constraints like budget and timeline, and open questions.',
    },
    {
      question: 'How long should the document be?',
      answer:
        'As long as it takes to be clear — often two to ten pages. Clarity and prioritisation matter more than length.',
    },
    {
      question: 'What is a user story?',
      answer:
        'A short statement of the form “As a [user], I want to [do something] so that [benefit]”, usually with acceptance criteria that define when it works.',
    },
    {
      question: 'Do I need technical knowledge to write one?',
      answer:
        'No. Describe the problem, the users and what they need to do in plain language; your development partner will handle the technical choices.',
    },
    {
      question: 'Should I share my budget in the brief?',
      answer:
        'Yes, at least a range. It helps teams propose a realistic scope instead of guessing, and makes quotes easier to compare.',
    },
  ],
}
