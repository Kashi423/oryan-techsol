import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'freelancer-vs-agency-vs-in-house',
  title: 'Hiring a Freelancer vs. an Agency vs. an In-House Team',
  shortTitle: 'Freelancer vs. agency vs. in-house',
  description:
    'Freelancer, agency or in-house developers? Compare cost, speed, quality and risk, with a decision guide by project stage and tips for vetting each option.',
  date: '2027-01-11',
  updated: '2027-01-11',
  category: 'Guides',
  keywords:
    'freelancer vs agency, hire developers in house or outsource, freelance developer or agency, in house vs agency cost, how to vet a developer, build a software team, when to hire in house developers',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['outsourcing-software-development', 'how-to-choose-a-software-development-company', 'software-project-estimation', 'mvp-development-guide-for-startups'],
  intro:
    'You have a software or website project and a decision to make: hire a freelancer, engage an agency or build an in-house team. Each option has loyal advocates and horror stories. Freelancers are flexible and affordable until yours vanishes mid-project. Agencies bring depth and process, at a higher price and with a risk of being a small fish in a big pond. In-house teams give control and continuity, but recruiting and retaining engineers is slow and expensive. The right answer depends on the stage of your business, the complexity and duration of the work, your budget and how much management capacity you have. This guide compares the three models honestly, offers a decision framework by situation, explains how to vet each option and shows how many successful businesses blend them over time.',
  takeaways: [
    'Freelancers suit small, well-defined tasks and specialist gaps; agencies suit multi-skill projects needing process and accountability; in-house suits long-term, core products.',
    'The cheapest hourly rate is rarely the cheapest outcome; consider quality, reliability, management effort and rework.',
    'Your stage matters: early validation favours flexible, lean options; scaling products eventually need in-house ownership.',
    'Mitigate each model’s risks: contracts, documentation, code ownership, backups of knowledge and regular reviews.',
    'Hybrid approaches, such as an agency to build and an in-house lead to own, often work best.',
  ],
  blocks: [
    h2('The three models in brief'),
    p(
      '**A freelancer** is an independent professional you engage for a project or on a flexible basis. **An agency** (or software house) is a company with a team of designers, developers, testers and project managers that delivers projects to clients. **An in-house team** consists of employees working only for your company, managed by you. Each differs in cost structure, capacity, risk and the amount of management you must provide.',
    ),
    table(
      'Side-by-side comparison',
      ['Factor', 'Freelancer', 'Agency', 'In-house team'],
      [
        ['Typical cost structure', 'Hourly or project rate; no overhead for you', 'Higher day rates that include management and overhead', 'Salaries, benefits, equipment, recruitment and management'],
        ['Speed to start', 'Fast', 'Fast to moderate', 'Slow: recruiting takes months'],
        ['Skills breadth', 'Narrow: one person’s skills', 'Broad: design, front end, back end, QA, DevOps, PM', 'Whatever you hire; gaps persist'],
        ['Capacity and scalability', 'Limited to one person’s hours', 'Can add people as needed', 'Hard to scale quickly'],
        ['Management effort for you', 'High: you coordinate and review', 'Lower: a project manager handles delivery', 'High: you lead and manage the team'],
        ['Continuity and key-person risk', 'High risk if the person leaves or is unavailable', 'Lower: team can replace people', 'Moderate; turnover is a real risk'],
        ['Product knowledge over time', 'Depends on the relationship', 'Retained in the team and documentation', 'Strongest: lives in your company'],
        ['Best for', 'Small tasks, specialist input, prototypes', 'Defined projects needing diverse skills and accountability', 'Core, long-lived products and continuous development'],
      ],
    ),

    h2('Freelancers: pros, cons and when to use them'),
    h3('Advantages'),
    ul(
      'Often the most economical option for small, well-defined work.',
      'Flexible and quick to engage, with no long-term commitment.',
      'Direct access to the person doing the work.',
      'Excellent for specialist skills you need briefly: an integration, a performance fix, a design.',
    ),
    h3('Risks'),
    ul(
      '**Availability and reliability:** one person means one point of failure: illness, other clients or disappearance.',
      '**Limited breadth:** a strong developer may not be a designer, tester or DevOps engineer.',
      '**Quality variance:** the market ranges from outstanding to unqualified, and it is hard to judge before you start.',
      '**Management burden:** you must define tasks, review quality and coordinate multiple freelancers.',
      '**Documentation and continuity:** knowledge may leave with them unless you require handover.',
    ),
    p(
      'Use freelancers for contained tasks with clear scope, for augmenting an existing team or for early prototypes, ideally with a technical person on your side to review the work.',
    ),

    h2('Agencies: pros, cons and when to use them'),
    h3('Advantages'),
    ul(
      'Complete teams with complementary skills and established processes.',
      'Accountability: a company with a reputation and contract stands behind delivery.',
      'Capacity to scale and to replace people without stopping the project.',
      'Project management, QA and DevOps included, reducing your workload.',
      'Experience across many projects and industries.',
    ),
    h3('Risks'),
    ul(
      '**Higher cost per hour,** reflecting overhead and management.',
      '**Variable quality:** agencies differ enormously; some hand work to junior staff after the sales pitch.',
      '**Less direct access:** layers of account management can slow communication.',
      '**Misaligned incentives:** fixed-price work can lead to corner-cutting; hourly work can lead to drift.',
      '**Dependency:** knowledge sits with the agency unless you insist on documentation and ownership.',
    ),
    p(
      'Agencies fit projects needing design, development and testing together, such as a new website, app or platform, particularly when you lack technical leadership. Our guide on [choosing a software development company](/blog/how-to-choose-a-software-development-company) explains how to evaluate them, and [outsourcing software development](/blog/outsourcing-software-development) covers contracts and remote management.',
    ),

    h2('In-house teams: pros, cons and when to use them'),
    h3('Advantages'),
    ul(
      'Deep, lasting knowledge of your product, customers and domain.',
      'Full control over priorities, quality and culture.',
      'Continuous development without contract renegotiation.',
      'Easier alignment with the rest of the business.',
      'Often more cost-effective than agencies for sustained, full-time work.',
    ),
    h3('Risks'),
    ul(
      '**Recruitment is slow and competitive:** good engineers are in demand, and a bad hire is expensive.',
      '**High fixed costs:** salaries, benefits, equipment, training and management are ongoing, even in quiet periods.',
      '**Skills gaps:** a small team rarely covers design, security, DevOps and every technology.',
      '**Management demands:** you need technical leadership; a non-technical founder may struggle to assess quality.',
      '**Retention risk:** when a key person leaves, knowledge goes with them.',
    ),
    callout(
      'tip',
      'Hire a technical lead before a team',
      'If you build in-house, the first and most important hire is someone senior who can set architecture, standards and hiring bars. A group of juniors without leadership produces fragile software.',
    ),

    h2('Which fits which situation?'),
    table(
      'Decision guide',
      ['Your situation', 'Often best choice'],
      [
        ['Validating an idea with a prototype', 'Small agency or experienced freelancer; keep it lean, see [MVP development guide](/blog/mvp-development-guide-for-startups)'],
        ['Small, well-defined feature or fix', 'Freelancer'],
        ['New website, app or platform needing design and engineering', 'Agency'],
        ['Non-technical founder with no tech lead', 'Agency, or fractional CTO plus agency'],
        ['Established product with continuous roadmap', 'In-house core team, possibly with agency or freelancers for peaks'],
        ['Short-term capacity boost or specialist skills', 'Freelancers or agency augmentation'],
        ['Highly sensitive or regulated systems', 'In-house or a vetted, contractually bound partner'],
        ['Limited budget and uncertain direction', 'Phased approach: validate first, then invest'],
      ],
    ),

    h2('The true cost comparison'),
    p(
      'Hourly rates mislead. A freelancer’s rate may look low, but add your time managing them, the cost of rework if quality is uneven and the risk of delays. An agency’s rate looks high, but includes project management, testing, design and continuity that you would otherwise pay for separately. An employee’s salary understates the real cost: add employer taxes, benefits, equipment, software, recruitment, training and management time, plus idle time between projects. A realistic comparison asks: what will it cost to deliver this outcome, to the required quality, by the required date, with acceptable risk? See [software project estimation](/blog/software-project-estimation) for how to compare quotes properly.',
    ),
    compare(
      'Cost thinking: sticker price vs. total cost',
      {
        title: 'Sticker price thinking',
        tone: 'bad',
        points: [
          'Compare hourly rates only',
          'Ignore management and rework',
          'Assume freelancers never disappear',
          'Treat salaries as the full employee cost',
        ],
      },
      {
        title: 'Total cost thinking',
        points: [
          'Compare cost per delivered outcome',
          'Include management, QA, risk and continuity',
          'Account for recruitment and overhead',
          'Consider the cost of delay and of being wrong',
        ],
      },
    ),

    h2('How to vet each option'),
    checklist(
      'Vetting a freelancer',
      [
        'Review their portfolio and, ideally, working products they built',
        'Check references from previous clients, including difficult situations',
        'Run a small paid trial task before a larger commitment',
        'Look at their communication: clarity, responsiveness and honesty about risks',
        'Confirm availability, other commitments and a backup plan',
        'Agree code ownership, repository access and documentation expectations in writing',
      ],
    ),
    checklist(
      'Vetting an agency',
      [
        'Meet the people who will actually do the work, not just sales',
        'Ask for case studies and speak to recent clients',
        'Review their process: planning, testing, code review, demos and reporting',
        'Understand team stability and how they handle staff changes',
        'Scrutinise the proposal: scope, assumptions, exclusions and pricing',
        'Check ownership, security and exit terms in the contract',
      ],
    ),
    checklist(
      'Vetting in-house candidates',
      [
        'Use structured interviews and practical exercises relevant to your product',
        'Involve a technical reviewer if you are not technical yourself',
        'Check references and evidence of shipping real software',
        'Assess communication, ownership mindset and learning ability, not just tools',
        'Be clear about the role, growth and how you will retain talent',
      ],
    ),

    h2('Hybrid models'),
    p(
      'Many businesses combine approaches as they grow. A common path: begin with an agency or experienced freelancers to build the first version quickly; hire a technical lead who understands the product; gradually build an in-house core team for ongoing development; and keep an agency or specialists for design, peaks and specific projects. Another pattern is a fractional or part-time CTO who guides vendors and decisions while you are small. The common thread is retaining ownership of knowledge: code, documentation, accounts and product decisions should live with you, whoever writes the code.',
    ),
    steps(
      'A typical evolution',
      [
        { title: 'Validate', text: 'A lean MVP built by a small agency or freelancers.' },
        { title: 'Learn', text: 'Gather user feedback and refine the roadmap.' },
        { title: 'Bring ownership in-house', text: 'Hire a technical lead; ensure documentation and repositories are yours.' },
        { title: 'Build the core team', text: 'Recruit engineers for continuous development.' },
        { title: 'Augment as needed', text: 'Use agencies and freelancers for specialist or peak work.' },
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Choosing on hourly rate alone.**',
      '**Hiring a freelancer for a project that needs several skills** and no management.',
      '**Building in-house too early** without technical leadership or enough work.',
      '**Not owning code and accounts,** whichever model you choose.',
      '**Skipping a paid trial** before a major commitment.',
      '**Switching vendors repeatedly,** losing context each time.',
      '**Assuming the model solves poor requirements.** Clear scope matters in every case.',
    ),
    cta(
      'Not sure which model suits your project and stage? We will give you an honest recommendation, even if that is a freelancer or an in-house hire, and can support you at any stage.',
      '/contact',
      'Get hiring advice',
    ),
  ],
  faqs: [
    {
      question: 'When is a freelancer enough?',
      answer:
        'For small, well-defined tasks, specialist input or prototypes where the scope is clear, you have someone to review the work and the risk of losing a single person is acceptable.',
    },
    {
      question: 'What does an agency cost compared to hiring?',
      answer:
        'Agencies charge higher rates that include management, design, testing and overhead, but you avoid recruitment, salaries and idle time. Compare the total cost to deliver your outcome, not just hourly rates.',
    },
    {
      question: 'How do I vet a developer?',
      answer:
        'Review their work, speak to references, run a small paid task, assess communication and clarify availability and ownership terms. For in-house hires, use structured interviews and practical exercises, with technical input.',
    },
    {
      question: 'When should I hire in-house developers?',
      answer:
        'When you have a long-lived core product with continuous development, enough work to keep a team busy and the technical leadership to manage them. Before that, flexible options are usually lower risk.',
    },
    {
      question: 'Can I mix freelancers, agencies and in-house staff?',
      answer:
        'Yes, and many successful companies do. Keep ownership of code, documentation and product decisions in-house, and use external help for specific skills and peak capacity.',
    },
  ],
}
