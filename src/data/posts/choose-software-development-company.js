import { callout, checklist, compare, cta, h2, h3, p, steps, table } from './helpers.js'

export default {
  slug: 'how-to-choose-a-software-development-company',
  title: 'How to Choose a Software Development Company: A 10-Point Checklist',
  shortTitle: 'How to choose a software development company',
  description:
    'Use this 10-point checklist to evaluate software development companies on experience, process, pricing, code ownership and red flags.',
  date: '2026-10-07',
  updated: '2026-10-07',
  category: 'Guides',
  keywords:
    'how to choose a software development company, hire software development company, software outsourcing checklist, choosing a development partner, red flags software agency, custom software vendor selection',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['how-much-does-a-mobile-app-cost', 'custom-software-vs-off-the-shelf', 'react-native-vs-flutter-vs-native'],
  intro:
    'Choosing a software development partner is one of the most consequential decisions a growing business makes. The right team becomes an extension of your company; the wrong one costs you months, money and momentum. Portfolios and price lists only tell part of the story. This checklist gives you a practical way to compare companies on the things that actually predict a good outcome — and to spot the warning signs early.',
  takeaways: [
    'Judge on evidence — relevant shipped work, references and a clear process — not on the sales pitch.',
    'A good partner asks you many questions before quoting, and writes down assumptions and exclusions.',
    'Insist on clear communication rhythms, regular demos and visibility into progress.',
    'Agree code, design and data ownership in writing, plus documentation and a handover plan.',
    'The cheapest quote is rarely the lowest total cost; compare scope, quality and support, not just price.',
  ],
  blocks: [
    h2('Start with your own clarity'),
    p(
      'Before you speak to any company, spend an hour writing down the basics: the problem you are solving, who will use the software, the three to five features that matter most, any systems it must connect to, and your timeline and budget range. Teams respond to clarity with better questions and better estimates — and a company that cannot engage with your brief deserves a second look. If you are unsure whether to build at all, our guide to [custom software vs. off-the-shelf](/blog/custom-software-vs-off-the-shelf) will help you decide first.',
    ),

    h2('The 10-point checklist'),
    steps(
      'The evaluation, in order',
      [
        { title: '1. Relevant experience', text: 'Have they built something similar, at similar scale?' },
        { title: '2. Process', text: 'Discovery, design, build, test, launch — is it clear?' },
        { title: '3. Communication', text: 'Who do you talk to, how often, and in what channels?' },
        { title: '4. Team', text: 'Who actually does the work, and how senior are they?' },
        { title: '5. Technology fit', text: 'Do they choose tools for your needs, or just their favourites?' },
      ],
    ),
    steps(
      'The evaluation, continued',
      [
        { title: '6. Pricing model', text: 'Fixed, time-and-materials or phased — and what is excluded?' },
        { title: '7. Quality & testing', text: 'How do they test, review code and handle bugs?' },
        { title: '8. Security & data', text: 'How do they protect data and manage access?' },
        { title: '9. Ownership & handover', text: 'Do you own the code, designs and data? Is it documented?' },
        { title: '10. Support after launch', text: 'Who maintains it, and on what terms?' },
      ],
    ),

    h3('1. Relevant experience'),
    p(
      'Ask for specific examples of projects like yours — in industry, in type (mobile, web, integration, AI) and in complexity. A portfolio shows what they have made; a conversation shows how they think. Ask what went wrong on a past project and what they changed afterwards. Honest answers are a good sign.',
    ),
    h3('2. A clear process'),
    p(
      'Good teams can explain how a project runs: discovery to confirm goals, design you can react to early, development in small increments with regular demos, then testing and launch. Be cautious of anyone who goes straight from a brief to a price with no discovery.',
    ),
    h3('3. Communication'),
    p(
      'Poor communication causes more failed projects than weak coding. Agree up front who your day-to-day contact is, how often you will meet, how progress is shown (working demos beat status reports) and how quickly questions are answered. Time zones and language matter less than reliability and clarity.',
    ),
    h3('4. The team you actually get'),
    p(
      'Ask who will do the work, not who attends the sales call. Find out the seniority mix, whether people are employees or subcontractors, and what happens if a key person leaves. A small, stable, senior-led team is often better than a large, rotating one.',
    ),
    h3('5. Technology fit'),
    p(
      'A trustworthy partner recommends technology based on your requirements and explains the trade-offs — for example, [React Native vs. Flutter vs. native](/blog/react-native-vs-flutter-vs-native) for mobile — rather than pushing whatever they happen to sell. Ask what they have shipped to production, and how they plan for maintenance.',
    ),
    h3('6. Pricing model'),
    compare(
      'Common pricing models',
      {
        title: 'Fixed price',
        points: [
          'Predictable budget for a well-defined scope',
          'Works best when requirements are clear and stable',
          'Changes usually mean change requests',
          'Check what is excluded — a low fixed price can hide gaps',
        ],
      },
      {
        title: 'Time and materials / phased',
        points: [
          'Flexible when scope will evolve',
          'You pay for work actually done',
          'Needs good reporting and a shared priority list',
          'Often combined with capped phases or milestones',
        ],
      },
    ),
    p(
      'Whatever the model, ask for the estimate broken down by phase, with assumptions and exclusions written down. Our [mobile app cost guide](/blog/how-much-does-a-mobile-app-cost) shows what a sensible breakdown looks like.',
    ),
    h3('7. Quality and testing'),
    p(
      'Ask how they test (automated and manual), how they review code, how they handle bugs found after launch, and what “done” means for a feature. A mature team can describe its quality process without hesitation.',
    ),
    h3('8. Security and data handling'),
    p(
      'Ask how they manage access to your systems and data, how credentials are stored, how they approach privacy and compliance, and what they do if something goes wrong. For projects that connect systems, include [API integration](/blog/what-is-api-integration) reliability and security in the discussion.',
    ),
    h3('9. Ownership and handover'),
    p(
      'Get in writing that you own the source code, designs and data, and that you will receive documentation and access to repositories and hosting accounts. You should never be locked in to a single provider by something as basic as not holding your own code.',
    ),
    h3('10. Support after launch'),
    p(
      'Software needs ongoing care: updates, fixes, security patches and improvements. Ask what is included, what a support agreement costs, how quickly issues are handled, and whether the people who built it will maintain it.',
    ),

    h2('Onshore, nearshore or offshore: what changes?'),
    p(
      'Where a team is based affects cost, time-zone overlap and communication style, but it rarely determines quality on its own. A strong offshore team with excellent process often beats a weak local one — and the reverse is just as true. What matters is how well the team communicates and how mature its delivery process is.',
    ),
    table(
      'Comparing delivery locations',
      ['Model', 'Typical advantages', 'Things to manage'],
      [
        ['Onshore (same country)', 'Easy time-zone overlap, shared business culture, simpler legal arrangements', 'Usually the highest rates'],
        ['Nearshore (nearby time zones)', 'Good overlap with lower rates; relatively easy collaboration', 'Some cultural and legal differences'],
        ['Offshore (distant time zones)', 'Often the most cost-effective; access to a large talent pool', 'Limited overlap hours; needs strong communication discipline and clear documentation'],
      ],
      'General patterns. Individual companies vary widely.',
    ),
    h2('How to compare proposals side by side'),
    p(
      'Once two or three companies send proposals, resist the urge to compare only the total price. Lay the proposals next to each other and score them on the same criteria. A simple weighted score keeps the decision grounded in what matters to your project.',
    ),
    table(
      'A simple proposal scorecard',
      ['Criterion', 'What to look for', 'Suggested weight'],
      [
        ['Understanding of your problem', 'Does the proposal reflect your goals, not a generic template?', 'High'],
        ['Relevant experience', 'Similar projects, references and honest lessons learned', 'High'],
        ['Clarity of scope', 'Deliverables, assumptions and exclusions written down', 'High'],
        ['Team and communication', 'Named people, cadence, demos and escalation path', 'Medium'],
        ['Price and value', 'Breakdown by phase; what is and is not included', 'Medium'],
        ['Ownership and support', 'Code ownership, handover, post-launch support terms', 'Medium'],
      ],
    ),
    checklist(
      'What a good proposal contains',
      [
        'A summary of your goals in your own words',
        'Scope broken into phases with deliverables',
        'Assumptions, dependencies and exclusions',
        'Timeline with milestones and review points',
        'The team, roles and time commitments',
        'Clear pricing and a process for handling changes',
        'Ownership, confidentiality and support terms',
        'A realistic list of risks and how they will be managed',
      ],
    ),

    h2('Red flags to watch for'),
    compare(
      'Good signs vs. warning signs',
      {
        title: 'Good signs',
        points: [
          'Asks detailed questions before quoting',
          'Explains trade-offs and recommends leaving things out',
          'Shows relevant work and offers references',
          'Written assumptions, exclusions and ownership terms',
          'Regular demos and a named point of contact',
        ],
      },
      {
        title: 'Warning signs',
        tone: 'bad',
        points: [
          'A firm price after a five-minute conversation',
          'Promises that sound too good: “everything, fast and cheap”',
          'Vague answers about who does the work',
          'No testing or documentation plan',
          'Reluctance to put ownership or exit terms in writing',
        ],
      },
    ),
    callout(
      'warn',
      'The cheapest quote is not the cheapest project',
      'A low quote can mean a thinner scope, junior staff or costs that appear later as change requests and rework. Compare what is included, not just the headline number.',
    ),

    h2('Questions to ask on the first call'),
    checklist(
      'Ten questions worth asking',
      [
        'Which projects have you delivered that are most like ours?',
        'Who will work on our project, and what is their experience?',
        'How do you run discovery and what do we receive from it?',
        'How often will we see working software?',
        'What is in and out of this estimate?',
        'How are changes in scope handled?',
        'Who owns the code, designs and data?',
        'How do you test and secure what you build?',
        'What does support look like after launch?',
        'Can we speak to a past client?',
      ],
    ),

    h2('Run a small paid trial'),
    p(
      'If you are still torn, reduce the risk with a small paid first phase: a discovery workshop, a prototype or a single module. You learn how the team communicates, estimates and delivers — at a fraction of the cost of a full project — and you keep what they produce either way.',
    ),
    cta(
      'Speaking to a few providers? We are happy to be one of them — and to give you our honest view even if the best answer is “you do not need custom software yet”.',
      '/contact',
      'Talk to Oryan Techsol',
    ),
    p(
      'You can also read more about how we work on our [About page](/about), see examples in our [portfolio](/portfolio), or explore the [services we offer](/custom-software).',
    ),
  ],
  faqs: [
    {
      question: 'What should I look for in a software development company?',
      answer:
        'Look for relevant shipped work, a clear process with discovery and regular demos, transparent communication, a stable and experienced team, a fair and clearly scoped pricing model, solid testing and security practices, written ownership terms and post-launch support.',
    },
    {
      question: 'Is it better to hire a freelancer or a software development company?',
      answer:
        'Freelancers can suit small, well-defined tasks. For projects needing several skills — design, development, testing, project management — and ongoing support, a company offers continuity and shared responsibility. Evaluate either on evidence and process.',
    },
    {
      question: 'Fixed price or time and materials: which is better?',
      answer:
        'Fixed price suits clear, stable requirements. Time and materials, ideally in capped phases, suits evolving scope. Either works with good scoping, written assumptions and regular demos.',
    },
    {
      question: 'Who should own the source code?',
      answer:
        'You should. Agree ownership of source code, designs and data in writing before work starts, and make sure you receive documentation and access to repositories and hosting accounts.',
    },
    {
      question: 'How can I reduce the risk of choosing the wrong partner?',
      answer:
        'Speak to past clients, ask for relevant examples, start with a small paid discovery or prototype phase, and insist on written scope, assumptions and ownership terms before committing to the full project.',
    },
  ],
}
