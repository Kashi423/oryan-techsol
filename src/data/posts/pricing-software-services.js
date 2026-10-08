import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'pricing-software-services',
  title: 'Pricing Your Software Services: Hourly, Fixed or Retainer',
  shortTitle: 'Pricing software services',
  description:
    'How to price software and web development services: hourly, fixed price, retainers and value-based pricing, how to calculate rates, scope and raise prices.',
  date: '2027-01-23',
  updated: '2027-01-23',
  category: 'Guides',
  keywords:
    'pricing software services, hourly vs fixed price development, how to price a retainer, value based pricing agency, how to raise your rates, freelancer pricing guide, how to quote a web project',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['software-project-estimation', 'software-development-contract-guide', 'freelancer-vs-agency-vs-in-house', 'b2b-content-marketing-for-tech-companies'],
  intro:
    'Whether you are a freelance developer, a small agency or an in-house team charging internal clients, pricing is one of the hardest parts of selling software services. Charge too little and you work for free; charge too much and prospects walk away. Choose the wrong model and you absorb all the risk of overruns, or you leave money on the table when you deliver faster than expected. Clients, meanwhile, struggle to compare quotes that are structured in completely different ways. This guide looks at the pricing problem from the provider’s side, while helping buyers understand what they are seeing. It explains the main models, hourly, fixed price, retainers and value-based pricing, how to calculate a sustainable rate, how to structure and communicate quotes, how to protect yourself from scope creep and how to raise prices confidently.',
  takeaways: [
    'No model is universally best: choose by how certain the scope is, how much value you create and how the client prefers to buy.',
    'Calculate your costs and a sustainable target rate first, then adjust for market, expertise and demand.',
    'Fixed prices need clear scope and change control; hourly rates need trust and transparency; retainers suit ongoing work.',
    'Value-based pricing aligns fees with client outcomes but requires understanding their business.',
    'Present options, explain assumptions and review prices regularly; underpricing harms quality and sustainability.',
  ],
  blocks: [
    h2('Why pricing is hard in software'),
    p(
      'Software work is uncertain, the value delivered varies enormously and clients often cannot judge quality or effort. The same feature may take one developer a day and another a week. A small tool might save a client millions, or nothing. Add the temptation to compete on price, and many providers drift into undervaluing their work. Understanding the models and the thinking behind each helps you choose deliberately. The buyer’s view, covered in [software project estimation](/blog/software-project-estimation), is the mirror image of this guide.',
    ),

    h2('Start with your numbers'),
    p(
      'Before choosing a model, know the minimum you must earn. For a freelancer, work out your target annual income, add costs such as tax, insurance, equipment, software, training, marketing and unpaid time off, then divide by the billable hours you can realistically sell. Billable utilisation is far below total working hours because of sales, admin, learning and gaps between projects, often in the range of half to two-thirds of the week, depending on the business. For an agency, include salaries, overhead, management, sales and profit, and calculate a blended rate or per-person day rate.',
    ),
    table(
      'Rate calculation inputs',
      ['Input', 'Notes'],
      [
        ['Target income or profit', 'What the business or you need to earn after all costs'],
        ['Business costs', 'Tax, insurance, tools, hosting, premises, equipment, accounting and legal'],
        ['Non-billable time', 'Sales, admin, learning, meetings that are not charged, holidays and sickness'],
        ['Realistic billable hours', 'Hours you can reliably sell, not total working hours'],
        ['Market position', 'Experience, specialisation, demand and what comparable providers charge'],
        ['Risk and payment terms', 'Fixed-price risk, slow-paying clients and scope uncertainty'],
      ],
    ),
    callout(
      'tip',
      'Price to be sustainable, not just competitive',
      'Underpricing leads to rushed work, burnout, poor communication and no budget for improvement. Clients who value quality accept fair prices; clients who only compare the lowest hourly rate are rarely your best customers.',
    ),

    h2('Hourly and day rates (time and materials)'),
    p(
      'The client pays for the time spent, at an agreed rate, usually with periodic invoices and often an estimate or cap. It is simple and flexible.',
    ),
    ul(
      '**Advantages:** fair for uncertain or evolving scope, easy to start, reflects actual effort, and lets clients change direction.',
      '**Disadvantages:** penalises efficiency (the faster you work, the less you earn), invites scrutiny of hours, gives clients no price certainty and caps your income by time.',
      '**Best for:** discovery, consulting, maintenance, projects with uncertain requirements and agile work.',
      '**Tips:** give estimates and ranges, report progress transparently, agree a cap or approval point for overruns and consider day rates for large chunks of work.',
    ),

    h2('Fixed-price projects'),
    p(
      'The client pays an agreed price for a defined scope and deliverables, usually in milestones. It offers cost certainty for the buyer and rewards efficiency for the provider, but moves estimation risk to you.',
    ),
    ul(
      '**Advantages:** easy for clients to approve and compare, rewards speed and expertise, aligns with outcomes.',
      '**Disadvantages:** scope creep and underestimation hurt you, discourages flexibility and can cause disputes over what is included.',
      '**Best for:** well-defined projects, such as a brochure website, a standard integration or a clearly specified feature set.',
      '**Tips:** run a paid discovery first, write a detailed scope with explicit exclusions, state assumptions, include a change process and contingency and tie payments to milestones. See [software development contract guide](/blog/software-development-contract-guide) for the clauses to include.',
    ),
    compare(
      'Hourly vs. fixed price',
      {
        title: 'Hourly or time and materials',
        points: [
          'Flexible when requirements change',
          'Client carries budget uncertainty; you carry reputation risk of delays',
          'Income tied to time spent',
          'Suits discovery and ongoing work',
        ],
      },
      {
        title: 'Fixed price',
        points: [
          'Certainty for the client',
          'You carry estimation and scope risk',
          'Efficiency increases your margin',
          'Suits well-defined deliverables',
        ],
      },
    ),

    h2('Retainers'),
    p(
      'A retainer is a recurring monthly fee for a defined level of service: a block of hours, a set of deliverables or access to a team. It provides predictable revenue for you and priority access for the client. It is common for maintenance, support, ongoing development and advisory work.',
    ),
    ul(
      '**Define what is included:** hours, response times, types of work and what falls outside.',
      '**Decide about unused hours:** whether they roll over, expire or are refunded.',
      '**Set reporting and review rhythms** so the client sees value.',
      '**Price for the commitment:** retainers often include a modest discount for the guaranteed income, balanced against availability commitments.',
      '**Include notice periods** and a review of scope and price annually.',
    ),
    p(
      'Examples include website care and maintenance, which we describe from the client’s perspective in [website maintenance plans and costs](/blog/website-maintenance-plans-and-costs) and [mobile app maintenance](/blog/mobile-app-maintenance-what-to-budget).',
    ),

    h2('Value-based pricing'),
    p(
      'Value-based pricing sets fees by the value the work creates for the client rather than by your time. If a system saves a company a hundred thousand a year, a fee representing a fraction of that can be both a bargain for the client and highly profitable for you, even if it takes you a fraction of the time. It requires understanding the client’s economics, confidence in your ability to deliver results and credible evidence.',
    ),
    checklist(
      'When value-based pricing works',
      [
        'You can quantify the client’s gain: revenue, savings, risk reduction',
        'You have relevant case studies and proven outcomes',
        'The buyer is a decision-maker who thinks in business terms, not purchasing hours',
        'You are a specialist rather than a commodity provider',
        'The scope and results can be defined and agreed',
      ],
    ),
    p(
      'It fits automation and integration projects well, where the return can be measured; see [measuring ROI on AI and automation projects](/blog/measure-roi-on-ai-and-automation).',
    ),

    h2('Productised services and packages'),
    p(
      'Many providers package common services at set prices: a website in a fixed set of pages, an SEO audit, an app discovery sprint, an integration starter package. Productising creates clarity for buyers, shortens sales cycles and lets you refine delivery and become more efficient. It works best for repeatable work and can be combined with optional add-ons and retainers.',
    ),
    table(
      'Comparing the models',
      ['Model', 'Best for', 'Client benefit', 'Provider benefit', 'Main risk'],
      [
        ['Hourly / T&M', 'Uncertain scope, consulting, support', 'Flexibility; pay for actual work', 'Simple; low scope risk', 'Capped income; client budget anxiety'],
        ['Fixed price', 'Defined projects', 'Cost certainty', 'Reward for efficiency', 'Underestimation and scope creep'],
        ['Retainer', 'Ongoing work and maintenance', 'Priority access; predictable cost', 'Predictable income', 'Scope drift; unused capacity'],
        ['Value-based', 'High-impact projects', 'Pay relative to results', 'Premium pricing', 'Needs credibility and proof'],
        ['Productised package', 'Repeatable services', 'Clear price and scope', 'Efficiency and easier sales', 'Fits only standard needs'],
      ],
    ),

    h2('Structuring and presenting quotes'),
    steps(
      'A strong proposal process',
      [
        { title: 'Understand the problem and budget', text: 'Ask about goals, constraints and what success is worth.' },
        { title: 'Define the scope clearly', text: 'Deliverables, assumptions and exclusions in plain language.' },
        { title: 'Offer options', text: 'Good, better and best packages let clients choose and anchor to value.' },
        { title: 'Explain what drives the price', text: 'Transparency builds trust, even if you do not itemise every hour.' },
        { title: 'Show the process and timeline', text: 'Milestones, responsibilities and review points.' },
        { title: 'Handle changes and extras', text: 'State how additional work will be estimated and approved.' },
        { title: 'Set terms', text: 'Payment schedule, validity period and next steps.' },
      ],
    ),
    ul(
      '**Lead with outcomes and value,** not just a list of tasks.',
      '**Include a contingency or ranges** where uncertainty is real.',
      '**Discount scope, not rate:** if the client’s budget is low, offer less, not the same for less.',
      '**Collect deposits** and bill by milestone to protect cash flow.',
      '**Avoid free speculative work;** offer a paid discovery instead.',
    ),

    h2('Protecting yourself from scope creep and bad clients'),
    ul(
      '**Written scope and a change-control process:** every addition is estimated and approved.',
      '**Clear acceptance criteria and review periods** so projects can close.',
      '**Payment terms with milestones,** and stop work if invoices go unpaid.',
      '**Limits on revisions** for design or content stages.',
      '**Qualify prospects:** budget, authority, timeline and fit; walk away from poor matches.',
    ),
    callout(
      'warn',
      'Cheap clients are often the most expensive',
      'Clients who negotiate hardest on price tend to demand the most, communicate worst and pay latest. Pricing at a sustainable level filters for better relationships.',
    ),

    h2('Raising your prices'),
    p(
      'Many providers charge the same rates for years while their skills, reputation and costs grow. Raise prices regularly: for new clients immediately, and for existing ones with notice and justification, perhaps annually or when scope changes. If everyone accepts your quotes without question, you are probably too cheap. Expect some pushback, but also notice that higher prices often improve perceived value and client quality. Support increases with clear results, case studies and improved processes, and offer existing clients a transition period.',
    ),
    checklist(
      'Signs it is time to raise prices',
      [
        'You win almost every proposal',
        'Your calendar is full and you are turning work down',
        'Your skills and results have clearly improved',
        'Costs have increased and margins have shrunk',
        'You feel resentful about client demands relative to what you earn',
        'Comparable providers charge significantly more',
      ],
    ),

    h2('For buyers: reading quotes with this in mind'),
    p(
      'If you are commissioning software, remember that the cheapest quote may hide missing scope, and the most expensive may include a large risk premium. Compare the scope, assumptions and exclusions, ask how changes are priced and choose the model that matches how clear your requirements are. Our guides on [how to choose a software development company](/blog/how-to-choose-a-software-development-company) and [freelancer vs. agency vs. in-house](/blog/freelancer-vs-agency-vs-in-house) help you evaluate offers.',
    ),

    h2('Common mistakes'),
    ul(
      '**Pricing from fear or from competitors’ lowest rates.**',
      '**Fixed prices with vague scope.**',
      '**Forgetting non-billable time and overhead** in rates.',
      '**Free discovery and speculative work.**',
      '**No change process,** absorbing scope creep.',
      '**Never raising prices.**',
      '**Discounting to win work** without reducing scope.',
    ),
    cta(
      'Need a software partner with transparent pricing and clear scope? We offer fixed-price discovery, phased delivery and straightforward support plans so you always know what you are paying for.',
      '/contact',
      'Get a clear project quote',
    ),
  ],
  faqs: [
    {
      question: 'Hourly vs fixed price: which is better?',
      answer:
        'Fixed price suits well-defined projects and gives cost certainty, while hourly or time and materials suits uncertain or evolving scope. Many providers combine them: fixed-price discovery followed by phased delivery or capped hourly work.',
    },
    {
      question: 'How do I price a retainer?',
      answer:
        'Define what is included, such as hours, response times and types of work, estimate the monthly effort, price for the commitment and availability, and set terms for unused hours, reporting and review. Revisit scope and price annually.',
    },
    {
      question: 'How do I raise my rates?',
      answer:
        'Raise prices for new clients first, give existing clients notice and justification, support increases with results and improved service, and review prices at least annually.',
    },
    {
      question: 'What is value-based pricing?',
      answer:
        'It sets fees according to the value a project creates for the client, such as revenue gained or costs saved, rather than the time spent. It requires understanding the client’s economics and credible evidence of results.',
    },
    {
      question: 'How do I stop scope creep?',
      answer:
        'Write a detailed scope with exclusions, define acceptance criteria and use a change-request process where every addition is estimated, approved and priced before work begins.',
    },
  ],
}
