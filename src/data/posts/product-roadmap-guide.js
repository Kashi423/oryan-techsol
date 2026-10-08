import { callout, checklist, compare, cta, h2, p, steps, table, timeline, ul } from './helpers.js'

export default {
  slug: 'product-roadmap-guide',
  title: 'Product Roadmaps: How to Plan Features Without Chaos',
  shortTitle: 'Product roadmap guide',
  description:
    'Product roadmap guide: outcome vs feature roadmaps, prioritisation methods like MoSCoW and RICE, gathering input and communicating plans without chaos.',
  date: '2027-01-28',
  updated: '2027-01-28',
  category: 'Guides',
  keywords:
    'product roadmap guide, how to prioritise features, moscow method, rice scoring, roadmap for startups, outcome based roadmap, how far ahead should a roadmap go',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['mvp-development-guide-for-startups', 'how-to-write-an-app-requirements-document', 'agile-vs-waterfall-for-software-projects', 'how-to-validate-an-app-idea'],
  intro:
    'Every product team has more ideas than it can build: features customers request, improvements engineers want, opportunities executives spot, bugs that nag and technical work that cannot be postponed forever. Without a way to decide what comes next, the loudest voice wins, priorities change weekly, developers lose focus and customers lose patience. A product roadmap is the tool that turns this chaos into a coherent plan: a shared, evolving view of where the product is going and why. But roadmaps have a reputation for being either fantasy documents that are wrong from day one, or rigid promises that trap the team. This guide explains what a good roadmap is, how to build one around outcomes instead of feature lists, how to prioritise fairly, how to gather input, how to communicate it to different audiences and how to keep it useful as reality changes.',
  takeaways: [
    'A roadmap is a strategic communication tool: it shows direction and priorities, not a guaranteed delivery schedule.',
    'Frame roadmap items around problems and outcomes, and treat features as hypotheses to be tested.',
    'Use a simple, transparent prioritisation method, and combine scoring with judgement.',
    'Roadmaps should be time-horizon based (now, next, later) with more certainty near-term and flexibility further out.',
    'Review and update regularly, communicate changes openly and tie everything to goals and evidence.',
  ],
  blocks: [
    h2('What a product roadmap is, and is not'),
    p(
      'A product roadmap is a high-level visual summary of how a product is expected to evolve over time and, crucially, why. It aligns the team, stakeholders and sometimes customers on direction and priorities. It is not a detailed project plan with task-level dates, a backlog of every possible feature, or a contract. Confusing these causes most roadmap failures: a roadmap treated as a promise forces the team to build the wrong things on schedule, while one with no commitment at all gives no direction.',
    ),
    table(
      'Roadmap vs. related documents',
      ['Document', 'Purpose', 'Level of detail'],
      [
        ['Vision and strategy', 'Where the product is going and why it should exist', 'Very high level'],
        ['Roadmap', 'Priorities and themes over time, tied to goals', 'High level, outcome-focused'],
        ['Backlog', 'The detailed list of work items, ordered by priority', 'Detailed, changes constantly'],
        ['Release plan', 'What ships in a specific release and when', 'Short term, specific'],
        ['Project plan', 'Tasks, owners and dates for a defined project', 'Granular'],
      ],
    ),
    callout(
      'note',
      'A roadmap is a hypothesis',
      'Every item represents a bet that solving a particular problem will move a goal. The roadmap changes as you learn, which is a sign of a healthy process rather than failure.',
    ),

    h2('Start from goals and outcomes'),
    p(
      'Before listing features, define what the product must achieve in the coming period: grow active users, increase retention, reduce support costs, enter a new market, improve conversion. These goals, often written as objectives with measurable key results, give you a basis to evaluate every idea. A feature that does not move a goal is hard to justify, however attractive.',
    ),
    compare(
      'Feature roadmaps vs. outcome roadmaps',
      {
        title: 'Feature-based',
        tone: 'bad',
        points: [
          'List of features with dates',
          'Implies certainty about solutions',
          'Success measured by shipping',
          'Hard to change without “breaking promises”',
        ],
      },
      {
        title: 'Outcome-based',
        points: [
          'Themes framed as problems to solve',
          'Leaves room to find the best solution',
          'Success measured by results',
          'Flexible while staying focused',
        ],
      },
    ),
    p(
      'For example, instead of “Q3: add in-app chat”, write “Reduce time to first reply for new customers from two days to two hours”, then explore whether chat, notifications or automation is the best answer. This is consistent with the validation-first approach in [how to validate an app idea](/blog/how-to-validate-an-app-idea).',
    ),

    h2('Choose a format: now, next, later'),
    p(
      'Specific dates beyond a few weeks are usually fiction in software. A popular and honest format organises work by time horizon and confidence rather than by calendar.',
    ),
    timeline(
      'A now-next-later roadmap',
      [
        { label: 'Now', title: 'Committed and in progress', text: 'Work being built or about to start; scope is clear and dates are reliable.' },
        { label: 'Next', title: 'Planned and being shaped', text: 'Prioritised problems being researched and designed; solutions may still change.' },
        { label: 'Later', title: 'Under consideration', text: 'Promising opportunities and strategic themes, deliberately vague and subject to learning.' },
      ],
      'Certainty decreases as you look further ahead; the roadmap should say so.',
    ),
    p(
      'Some teams use quarters or themes by month, which can work if everyone understands that later periods are directional. For fixed external commitments, such as regulatory deadlines or contractual deliverables, maintain separate, specific dates.',
    ),

    h2('Gather inputs'),
    p(
      'Good roadmaps draw on several sources, none of which should dominate.',
    ),
    ul(
      '**Customers and users:** interviews, feedback, support tickets and usage data show real problems.',
      '**Data and analytics:** where users succeed, struggle and drop off; see [mobile app analytics metrics](/blog/mobile-app-analytics-metrics) for what to track.',
      '**Sales and customer success:** recurring objections, lost deals and requests.',
      '**Business strategy:** market position, pricing, partnerships and growth targets.',
      '**Engineering:** technical debt, scalability, security and maintenance needs; see [technical debt explained](/blog/technical-debt-explained).',
      '**Competitors and market trends:** context, not a template to copy.',
    ),
    callout(
      'warn',
      'Requests are not requirements',
      'A customer asking for a feature is describing a symptom. Ask what they are trying to achieve and what happens if they cannot. Often there is a simpler or better solution than the one requested.',
    ),

    h2('Prioritise with a method'),
    p(
      'Prioritisation methods make trade-offs explicit and reduce politics. Use one as a conversation structure, not as an oracle; scores inform judgement, they do not replace it.',
    ),
    table(
      'Common prioritisation frameworks',
      ['Framework', 'How it works', 'Best for'],
      [
        ['MoSCoW', 'Classify as Must, Should, Could and Won’t have (this time)', 'Release scoping and MVPs; see [MVP development guide](/blog/mvp-development-guide-for-startups)'],
        ['RICE', 'Score Reach × Impact × Confidence ÷ Effort', 'Comparing many ideas quantitatively'],
        ['Value vs. effort', 'Plot ideas on a two-by-two: high value and low effort first', 'Quick visual triage'],
        ['Kano model', 'Separate basics, performance features and delighters', 'Understanding what customers expect vs. what excites them'],
        ['Weighted scoring', 'Score against criteria such as revenue, retention and strategic fit, with weights', 'Aligning stakeholders on criteria'],
        ['Cost of delay', 'Estimate the value lost per week of delaying an item', 'Time-sensitive decisions'],
      ],
    ),
    p(
      'Whichever you use, be explicit about the criteria and the evidence, record the reasoning and revisit it as data arrives. Estimates of effort come from engineering, and their accuracy limits the method; see [software project estimation](/blog/software-project-estimation).',
    ),
    checklist(
      'Questions to test any roadmap item',
      [
        'Which goal or key result does this support?',
        'What problem does it solve, and for whom? What is the evidence?',
        'What happens if we do not do it?',
        'How big is the effect, and how confident are we?',
        'What is the smallest version that tests the idea?',
        'What are the dependencies and risks?',
        'What will we measure to know whether it worked?',
      ],
    ),

    h2('Balance different kinds of work'),
    p(
      'A roadmap that contains only shiny new features starves everything else. Include investment in quality, reliability and the foundations that enable future speed.',
    ),
    ul(
      '**New value:** features and improvements that grow the product.',
      '**Retention and experience:** fixing friction, onboarding and performance.',
      '**Platform and technical health:** refactoring, upgrades, security and infrastructure.',
      '**Customer commitments:** contractual or regulatory items.',
      '**Learning:** experiments and research to reduce uncertainty.',
      '**Capacity buffer:** time for bugs, support and the unexpected.',
    ),

    h2('Communicate the roadmap'),
    p(
      'Different audiences need different views. A single document rarely serves everyone.',
    ),
    table(
      'Tailoring the message',
      ['Audience', 'What they need', 'Format'],
      [
        ['Executives and investors', 'Strategy, outcomes and risks', 'High-level themes tied to business goals'],
        ['Development team', 'Priorities, context and rationale', 'Detailed near-term plan with the “why”'],
        ['Sales and support', 'What is coming and what is not, in plain language', 'Roadmap summary with caveats on timing'],
        ['Customers', 'Direction and responsiveness without hard promises', 'Public themes, “now/next/later” and changelogs'],
      ],
    ),
    ul(
      '**Be clear about confidence:** mark commitments, plans and ideas differently.',
      '**Avoid promising dates** you cannot guarantee; explain the reasoning when priorities change.',
      '**Say no thoughtfully:** explain what you chose over what, and why.',
      '**Close the loop:** tell customers when their feedback shaped something.',
    ),

    h2('Keep it alive'),
    steps(
      'A roadmap rhythm',
      [
        { title: 'Review regularly', text: 'Check the roadmap monthly or quarterly against goals and new evidence.' },
        { title: 'Update based on learning', text: 'Move, drop or add items when data and customers justify it.' },
        { title: 'Retire stale items', text: 'Remove ideas that no longer fit; a long “someday” list is clutter.' },
        { title: 'Measure outcomes', text: 'After release, check whether the expected result happened.' },
        { title: 'Share the changes', text: 'Tell stakeholders what changed and why.' },
      ],
    ),
    p(
      'Roadmaps work best alongside an agile delivery process where plans adapt to learning, as discussed in [agile vs. waterfall](/blog/agile-vs-waterfall-for-software-projects), and a clear requirements document for each significant initiative; see [how to write an app requirements document](/blog/how-to-write-an-app-requirements-document).',
    ),

    h2('Common mistakes'),
    ul(
      '**Using the roadmap as a delivery contract,** then missing dates and losing trust.',
      '**Listing features without goals,** so nobody knows why they matter.',
      '**Prioritising by the loudest stakeholder** or the largest customer.',
      '**Over-planning far into the future** with false precision.',
      '**Ignoring technical health,** until it forces a halt.',
      '**Never saying no,** producing an overloaded, unfocused plan.',
      '**Failing to measure results,** so you cannot learn which bets paid off.',
    ),
    cta(
      'Want a clear, outcome-focused plan for your product and a team to build it? We help founders define priorities, scope releases and deliver in small, measurable steps.',
      '/contact',
      'Plan your product roadmap',
    ),
  ],
  faqs: [
    {
      question: 'How do I prioritise features?',
      answer:
        'Tie each idea to goals, assess value, evidence and effort using a transparent method such as MoSCoW, RICE or value versus effort, discuss the trade-offs with stakeholders and use judgement alongside the scores.',
    },
    {
      question: 'What is the MoSCoW method?',
      answer:
        'MoSCoW sorts items into Must have, Should have, Could have and Won’t have this time. It helps scope releases and MVPs by making clear what is essential and what can wait.',
    },
    {
      question: 'How far ahead should a roadmap go?',
      answer:
        'Be specific for the next few weeks to a quarter and directional beyond that. A now-next-later format reflects decreasing certainty and avoids false precision.',
    },
    {
      question: 'Should I share my roadmap with customers?',
      answer:
        'You can share a high-level version showing themes and direction without date commitments. It builds trust and gathers feedback, but avoid promising specifics you cannot guarantee.',
    },
    {
      question: 'How often should I update the roadmap?',
      answer:
        'Review it regularly, often monthly or quarterly, and update when you learn something important, such as new data, customer feedback, strategy changes or delivery realities.',
    },
  ],
}
