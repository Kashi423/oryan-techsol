import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'how-to-validate-an-app-idea',
  title: 'How to Validate an App Idea Before You Spend a Dollar on Development',
  shortTitle: 'Validate an app idea',
  description:
    'Test whether your app idea is worth building: define the problem, talk to users, check demand and competitors, run a prototype test and decide with evidence.',
  date: '2026-10-13',
  updated: '2026-10-13',
  category: 'App Development',
  keywords:
    'validate app idea, app idea validation, how to test an app idea, startup idea validation, customer discovery interviews, prototype testing, is my app idea good',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['how-much-does-a-mobile-app-cost', 'mobile-app-development-process', 'how-to-choose-a-software-development-company'],
  intro:
    'Most apps do not fail because they were badly built. They fail because nobody needed them enough to download, learn and keep using them. The good news is that you can find this out cheaply — in weeks, for a fraction of a development budget — before a line of code is written. This guide gives you a practical, step-by-step way to validate an app idea: define the problem, talk to real people, size the demand, study alternatives and test a prototype, then decide with evidence rather than excitement.',
  takeaways: [
    'Validate the problem first; the app is only one possible solution.',
    'Talk to 10–20 people in your target group and ask about their past behaviour, not hypothetical features.',
    'Check what people use today — competitors, spreadsheets and workarounds all count as proof of demand.',
    'A clickable prototype or a manual “concierge” version tests demand for a fraction of the cost of building.',
    'Decide in advance what result would make you proceed, pivot or stop.',
  ],
  blocks: [
    h2('Why validate first?'),
    p(
      'Building is the most expensive way to learn whether an idea works. Validation inverts the order: learn first, build second. Even a few weeks of structured testing can save months of effort — or confirm that you are onto something and sharpen exactly what to build. If you do decide to build, validation also gives your development team a far clearer brief, which lowers cost and risk (see our guide to [what mobile apps cost](/blog/how-much-does-a-mobile-app-cost)).',
    ),
    steps(
      'The validation path',
      [
        { title: 'Define the problem', text: 'Who has it, how often, how painful?' },
        { title: 'Talk to users', text: 'Interview 10–20 people about past behaviour.' },
        { title: 'Check alternatives', text: 'What do they use today, and why is it not enough?' },
        { title: 'Test a prototype', text: 'Show a clickable version or run it manually.' },
        { title: 'Measure real intent', text: 'Sign-ups, deposits, pilots — not compliments.' },
        { title: 'Decide', text: 'Proceed, pivot or stop, against criteria you set in advance.' },
      ],
    ),

    h2('Step 1: Write the problem down'),
    p('Complete this sentence in plain language. If you cannot, the idea is not ready to test yet.'),
    callout(
      'note',
      'Problem statement template',
      '“[Specific type of person] struggles to [job they need done] because [obstacle]. Today they cope by [current workaround], which costs them [time, money or frustration].”',
    ),
    ul(
      '**Specific beats general.** “Independent physiotherapists who lose income to no-shows” beats “health professionals”.',
      '**Frequency matters.** A problem faced daily is a better app candidate than one faced yearly.',
      '**Pain you can measure** (hours, money, errors) makes a stronger case than mild inconvenience.',
    ),

    h2('Step 2: Interview real people'),
    p(
      'Aim for 10–20 conversations with people who genuinely have the problem. The goal is to learn, not to pitch. The most useful questions are about the past, because people are poor predictors of their own future behaviour.',
    ),
    compare(
      'Questions that teach vs. questions that mislead',
      {
        title: 'Ask this',
        points: [
          '“Tell me about the last time you had to [do the task].”',
          '“What did you try to fix it? What did that cost?”',
          '“What would happen if you did nothing?”',
          '“How do you decide what to use for this today?”',
        ],
      },
      {
        title: 'Not this',
        tone: 'bad',
        points: [
          '“Would you use an app that does X?”',
          '“Do you like my idea?”',
          '“Would you pay for this?” (people are polite)',
          '“What features would you want?” (they will invent a wish list)',
        ],
      },
    ),
    h3('What to listen for'),
    ul(
      'Stories where the problem cost real time or money.',
      'Workarounds they built themselves (spreadsheets, group chats, paper).',
      'Words they use to describe the problem — reuse them in your marketing.',
      'Patterns: the same pain from several unrelated people is a strong signal.',
    ),

    h2('Step 3: Study the alternatives'),
    p(
      'Competitors are good news: they prove demand. The warning sign is a market with no alternatives and no workarounds, which often means nobody cares enough. Map what people use today — apps, spreadsheets, agencies, doing nothing — and write one line on why each falls short.',
    ),
    table(
      'A simple alternatives map',
      ['Alternative', 'Who uses it', 'What they like', 'Where it falls short'],
      [
        ['Direct competitor app', 'Early adopters', 'Familiar, polished', 'Expensive / too generic / missing a key feature'],
        ['Spreadsheet or paper', 'Small teams', 'Free and flexible', 'Manual, error-prone, hard to share'],
        ['Hiring a person or agency', 'Larger organisations', 'Handles exceptions', 'Slow and costly'],
        ['Doing nothing', 'Everyone else', 'No effort', 'Problem remains'],
      ],
    ),

    h2('Step 4: Test with a prototype or a manual version'),
    p('You can test the solution without building it:'),
    ul(
      '**Clickable prototype:** designers can build a realistic one in days. Put it in front of users and watch where they hesitate.',
      '**Concierge version:** deliver the service by hand (spreadsheets, messages, calls) to a few customers to learn what really matters.',
      '**Landing page test:** describe the app, show mock-ups and measure sign-ups or enquiries.',
      '**Pilot with one customer:** nothing validates like someone using a basic version in their real work.',
    ),
    callout(
      'tip',
      'Measure behaviour, not compliments',
      'Sign-ups, deposits, pre-orders, a signed pilot and repeat use are evidence. “Great idea!” is not. Decide up front what number would convince you — for example, 30 of 100 visitors leave an email, or 5 of 10 pilot users come back every week.',
    ),

    h2('Step 5: Decide — proceed, pivot or stop'),
    checklist(
      'Green lights to look for',
      [
        'Several people described the problem unprompted and in detail',
        'They already spend time or money on workarounds',
        'You can reach this group affordably',
        'Prototype testers completed the main task and asked when it would be ready',
        'At least some people gave real commitment (deposit, pilot, introduction)',
        'You can describe a smallest useful first version',
      ],
    ),
    p(
      'If the signals are strong, move to defining a minimum viable product and a scoped brief, then follow the process in [the mobile app development process](/blog/mobile-app-development-process). If they are weak, pivot the problem, the audience or the solution — or stop and keep your budget. Either outcome is a win compared with building blind.',
    ),
    cta(
      'Have an idea you want pressure-tested? We will help you scope the smallest version worth building — and tell you honestly if something should be tested further first.',
      '/contact',
      'Talk through your app idea',
    ),
  ],
  faqs: [
    {
      question: 'How do I know if my app idea is good?',
      answer:
        'Check that a specific group has a frequent, painful problem, already spends time or money on workarounds, and shows real commitment to a prototype or pilot. Evidence of behaviour matters more than enthusiasm.',
    },
    {
      question: 'How many people should I interview?',
      answer:
        'Ten to twenty conversations with people who genuinely have the problem usually reveal clear patterns. Stop when you keep hearing the same things.',
    },
    {
      question: 'Can I validate an app without building it?',
      answer:
        'Yes. Use a clickable prototype, a manual concierge version, a landing page that measures sign-ups, or a small pilot with one customer.',
    },
    {
      question: 'What if a competitor already exists?',
      answer:
        'Competition usually proves demand. Study what they do well and where they fall short, and look for a specific group or job they serve poorly.',
    },
    {
      question: 'How long does validation take?',
      answer:
        'Typically two to six weeks of part-time effort, depending on how quickly you can reach people and run a prototype test.',
    },
  ],
}
