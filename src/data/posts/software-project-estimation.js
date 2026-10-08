import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'software-project-estimation',
  title: 'Software Estimation: Why Projects Run Over and How to Prevent It',
  shortTitle: 'Software project estimation',
  description:
    'Why software projects run over budget and how to prevent it: how estimates work, hidden causes, scope control, contingency and how to get an accurate quote.',
  date: '2027-01-09',
  updated: '2027-01-09',
  category: 'Guides',
  keywords:
    'software project estimation, why software projects go over budget, how to get an accurate software quote, software cost overruns, project scope creep, estimate software development cost, fixed price vs time and materials',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['agile-vs-waterfall-for-software-projects', 'how-to-write-an-app-requirements-document', 'how-to-choose-a-software-development-company', 'mvp-development-guide-for-startups'],
  intro:
    'Almost everyone who has commissioned custom software has a story about a project that cost more and took longer than promised. It is so common that people treat it as a law of nature. In truth, overruns have understandable causes, and most of them can be reduced. Estimation is hard because software is a creative, uncertain activity: requirements are fuzzy, the details emerge as you build and the people estimating are often forecasting work they have never done in exactly that form before. Understanding why estimates go wrong helps clients and vendors alike. This guide explains how estimates are produced, why they miss, what really drives overruns, and what you can do, as a client or a delivery team, to get estimates you can trust and a project that stays on track.',
  takeaways: [
    'An estimate is a forecast under uncertainty, not a promise; ranges and assumptions are signs of honesty, not weakness.',
    'The biggest causes of overruns are unclear or changing requirements, hidden complexity, integration surprises and slow decisions.',
    'Better scoping, smaller releases, early risk testing and clear change control prevent most problems.',
    'Compare quotes on the same written scope, and read the assumptions and exclusions.',
    'Choose a contract and process, fixed, flexible or hybrid, that fits how certain your requirements really are.',
  ],
  blocks: [
    h2('What an estimate really is'),
    p(
      'An estimate predicts the effort, time and cost needed to deliver a defined scope. It is built from assumptions: about what the software must do, how complex each part is, how productive the team will be, how quickly decisions will be made and what will go wrong. Because every assumption carries uncertainty, a sensible estimate expresses a range, such as “between ten and fourteen weeks”, or a most likely figure with stated risks. The precision of a single number is usually false precision. Early in a project, when little is known, the range is wide; it narrows as the team learns, which is why delivering in stages helps, as described in [agile vs. waterfall](/blog/agile-vs-waterfall-for-software-projects).',
    ),
    table(
      'Common estimation methods',
      ['Method', 'How it works', 'Best for'],
      [
        ['Expert judgement', 'Experienced developers estimate based on similar past work', 'Early, rough estimates'],
        ['Analogy', 'Compare with a comparable completed project', 'Projects similar to previous ones'],
        ['Bottom-up (work breakdown)', 'Break scope into small tasks, estimate each, sum with buffers', 'Well-defined scopes'],
        ['Three-point estimation', 'Estimate best, likely and worst cases and weight them', 'Quantifying uncertainty'],
        ['Story points and velocity', 'Relative sizing, calibrated by the team’s actual pace', 'Agile teams delivering iteratively'],
        ['Time-boxed discovery', 'Spend a small fixed effort exploring before committing to a full estimate', 'High-uncertainty projects'],
      ],
    ),

    h2('Why estimates go wrong'),
    h3('1. Unclear or changing requirements'),
    p(
      'The number-one cause. If the scope is vague, different people picture different products, and the estimate prices one while the client expects another. Even clear requirements change as stakeholders see working software and realise what they actually need. “Can we just add…” is the sound of budgets expanding. Writing a proper brief, as in [how to write an app requirements document](/blog/how-to-write-an-app-requirements-document), is the best single defence.',
    ),
    h3('2. Hidden complexity'),
    p(
      'Features that sound simple often hide intricate rules. “Users can reschedule bookings” involves availability, cancellation windows, refunds, notifications, time zones and staff calendars. Estimators who do not probe these details underestimate. Experienced teams ask many questions precisely to uncover complexity before pricing it.',
    ),
    h3('3. Integrations and unknowns'),
    p(
      'Connecting to third-party systems is notorious for surprises: poor documentation, rate limits, inconsistent data, access delays and behaviour that differs from the specification. A legacy system with no proper interface can multiply effort. Test the riskiest integrations early with a small spike before committing to a full estimate; see [what API integration is](/blog/what-is-api-integration).',
    ),
    h3('4. Optimism and pressure'),
    p(
      'People tend to estimate best-case scenarios, forgetting meetings, reviews, bugs, rework, illness and the time that interruptions consume. Sales pressure to win a project can also push estimates down. Padding is not the answer; realism and explicit contingency are.',
    ),
    h3('5. Slow decisions and dependencies'),
    p(
      'Projects stall waiting for content, approvals, credentials, designs, legal sign-off or answers to questions. The calendar stretches even if the effort does not, and idle teams still cost money.',
    ),
    h3('6. Underestimating non-functional work'),
    p(
      'Testing, security, performance, accessibility, deployment, documentation, project management and fixing bugs are all real effort, and often left out of naive estimates. So is learning a new technology.',
    ),
    h3('7. Technical debt and legacy code'),
    p(
      'Building on top of an existing messy codebase is slower and riskier than starting fresh, and the true state is often unknown until the team looks inside; see [legacy software modernization](/blog/legacy-software-modernization-guide).',
    ),
    callout(
      'note',
      'The cone of uncertainty',
      'Estimates made at the very start of a project can be off by large factors in either direction. Uncertainty shrinks as requirements firm up and the team builds. Treat early figures as ranges and plan to refine them.',
    ),

    h2('What you can do as a client'),
    checklist(
      'Practical steps to get reliable estimates',
      [
        'Write a clear brief with goals, users, features, priorities and constraints',
        'Separate must-haves from nice-to-haves and say what is out of scope',
        'Share existing assets: designs, data, API documentation, brand guidelines',
        'Give each bidder the same information so quotes are comparable',
        'Ask for ranges, assumptions, exclusions and risks, not just a total',
        'Request a paid discovery phase for complex or uncertain projects',
        'Name one decision-maker and agree turnaround times for feedback',
        'Plan for contingency, commonly ten to twenty percent, in your budget',
      ],
    ),
    p(
      'Choosing the right partner matters as much as the document; see [how to choose a software development company](/blog/how-to-choose-a-software-development-company). Good teams ask hard questions, flag risks and push back on vague scope. Beware the vendor who quotes a low, confident number after a ten-minute call.',
    ),

    h2('What good delivery teams do'),
    ul(
      '**Discover before quoting:** spend time understanding goals, users and risks.',
      '**Break work into small pieces** and estimate them individually.',
      '**Identify and test risks early,** with spikes or prototypes for unknowns.',
      '**State assumptions explicitly** so changes are visible.',
      '**Deliver in short increments** with working software each cycle, so problems appear early.',
      '**Track progress honestly** with visible burn-up or milestone charts.',
      '**Manage change deliberately,** pricing and prioritising additions.',
      '**Keep communication constant,** with short regular check-ins.',
    ),

    h2('Contracts and pricing models'),
    p(
      'How you buy affects who carries risk and how overruns are handled. No model is universally best.',
    ),
    compare(
      'Fixed price vs. time and materials',
      {
        title: 'Fixed price',
        points: [
          'Budget certainty for a defined scope',
          'Needs detailed requirements upfront',
          'Changes become formal change requests',
          'Vendor may add risk premium or cut corners if underpriced',
        ],
      },
      {
        title: 'Time and materials (or capped)',
        points: [
          'Flexibility to adapt as you learn',
          'You pay for actual effort; use a cap or budget for control',
          'Requires trust, transparency and active management',
          'Risk of drift without disciplined prioritisation',
        ],
      },
    ),
    p(
      'A popular compromise is a **fixed-price discovery** followed by phased delivery under a capped or fixed price per phase, giving certainty where requirements are known and flexibility where they are not. Whatever the model, insist on a clear definition of done, acceptance criteria and a change process.',
    ),

    h2('Controlling scope during the project'),
    steps(
      'A change-control routine',
      [
        { title: 'Capture the request', text: 'Write down what is being asked and why.' },
        { title: 'Assess the impact', text: 'Estimate effort, cost and effect on the timeline.' },
        { title: 'Decide', text: 'Accept, defer or decline with the decision-maker.' },
        { title: 'Trade off', text: 'If adding something, agree what to remove or accept a new date and cost.' },
        { title: 'Record and communicate', text: 'Update the backlog, plan and budget.' },
      ],
    ),
    p(
      'Starting with a lean first release, as in the [MVP development guide](/blog/mvp-development-guide-for-startups), is one of the most effective ways to control cost: you commit to the essentials first and let evidence decide what comes next.',
    ),

    h2('Reading a quote critically'),
    table(
      'What to look for in an estimate',
      ['Item', 'Questions to ask'],
      [
        ['Scope and deliverables', 'Is every feature listed? What is explicitly excluded?'],
        ['Assumptions', 'What must be true for this price to hold, such as access, content and timely feedback?'],
        ['Breakdown', 'How are design, development, testing, management and deployment priced?'],
        ['Risks', 'What are the main uncertainties, and how are they handled?'],
        ['Contingency', 'Is there a buffer, and how is it used?'],
        ['Change process', 'How are additions priced and approved?'],
        ['Support and warranty', 'What happens after launch? How long are bugs fixed at no cost?'],
        ['Team', 'Who will actually work on the project, and with what experience?'],
      ],
    ),
    callout(
      'warn',
      'The cheapest quote is often the most expensive',
      'A low price may reflect misunderstanding, missing scope or a plan to recover margin through change requests. Compare scope and assumptions before price.',
    ),

    h2('Common mistakes'),
    ul(
      '**Treating an early estimate as a guarantee.**',
      '**Comparing quotes with different scopes** or hidden exclusions.',
      '**Skipping discovery** on complex projects.',
      '**No contingency** in the budget.',
      '**Letting scope creep unmanaged,** one small request at a time.',
      '**Slow feedback** from the client side.',
      '**Ignoring testing and maintenance** in the plan.',
    ),
    cta(
      'Want an estimate you can rely on? We run a short discovery, clarify scope and risks, and give you a clear range, a phased plan and honest assumptions.',
      '/contact',
      'Get a realistic project estimate',
    ),
  ],
  faqs: [
    {
      question: 'Why do software projects cost more than quoted?',
      answer:
        'Usually because requirements were unclear or changed, hidden complexity and integration surprises emerged, estimates were optimistic, decisions were slow, or non-functional work such as testing and security was underestimated.',
    },
    {
      question: 'What is a fair hourly rate for developers?',
      answer:
        'Rates vary widely by region, experience and the type of provider. Focus on total value, quality and fit rather than the hourly rate alone, and compare quotes on the same scope.',
    },
    {
      question: 'How do I get an accurate quote?',
      answer:
        'Provide a clear written brief with priorities and constraints, share existing assets, give all bidders the same information, ask for ranges and assumptions and consider a paid discovery phase for complex projects.',
    },
    {
      question: 'Is fixed price or time and materials better?',
      answer:
        'Fixed price suits well-defined scopes; time and materials or capped budgets suit uncertain, evolving requirements. A hybrid of fixed discovery and phased delivery often works well.',
    },
    {
      question: 'How much contingency should I budget?',
      answer:
        'Commonly ten to twenty percent for well-understood projects, and more when uncertainty is high. Adjust to the risk and revisit it as the project progresses.',
    },
  ],
}
