import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'choose-a-tech-stack-for-your-startup',
  title: 'How to Choose a Tech Stack for Your Startup in 2027',
  shortTitle: 'Choose a tech stack for your startup',
  description:
    'How to choose a startup tech stack in 2027: criteria that matter, sensible defaults for web, mobile and SaaS, mistakes to avoid and questions to ask developers.',
  date: '2026-11-18',
  updated: '2026-11-18',
  category: 'Custom Software',
  keywords:
    'best tech stack for startup, how to choose a tech stack, startup technology stack 2027, tech stack for mvp, non technical founder tech stack, web app tech stack, saas tech stack',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['mvp-development-guide-for-startups', 'how-to-build-a-saas-product', 'react-native-vs-flutter-vs-native', 'how-to-choose-a-software-development-company'],
  intro:
    'Few decisions feel as technical, and as intimidating, to a founder as choosing a tech stack. Every developer has a favourite, the internet is full of strong opinions, and a wrong choice seems like it could doom the company. The truth is calmer. For most startups the stack matters far less than clear scope, good engineering habits and shipping quickly, and there are a few sensible defaults that work for the majority of products. This guide explains how to choose a startup tech stack in plain language: the criteria that really matter, safe options for web, mobile and SaaS products, the mistakes that cost the most, and the questions to ask so you can judge your developers’ advice even if you are not technical.',
  takeaways: [
    'Choose boring, well-supported technology your team already knows; novelty is a cost, not a feature.',
    'Optimise for speed to learn, hiring availability and maintainability, not for imagined future scale.',
    'Most startups are well served by a popular web framework, a relational database and managed cloud services.',
    'Avoid premature microservices, exotic databases and building what you can safely buy.',
    'Document the reasons for each choice and revisit them at milestones rather than constantly.',
  ],
  blocks: [
    h2('What a tech stack is'),
    p(
      'A tech stack is the set of technologies used to build and run your product. It usually has several layers: the **front end** (what users see in the browser or on the phone), the **back end** (the server logic and APIs), the **database** (where data is stored), the **infrastructure** (where it all runs, and how it is deployed and monitored), and the **third-party services** you connect to, such as payments, email, analytics and authentication. Founders rarely need to know each tool in detail, but they do need to understand the trade-offs, because the stack influences cost, hiring, speed and risk.',
    ),
    steps(
      'The layers of a typical stack',
      [
        { title: 'Front end', text: 'Web or mobile interface: what users click and see.' },
        { title: 'Back end', text: 'Business logic, rules, APIs and background jobs.' },
        { title: 'Database', text: 'Structured storage for users, orders, content and more.' },
        { title: 'Infrastructure', text: 'Hosting, deployment, monitoring and backups.' },
        { title: 'Services', text: 'Payments, email, search, analytics, authentication.' },
      ],
    ),

    h2('The criteria that really matter'),
    p(
      'Rather than asking “what is the best stack?”, ask “what is the best stack **for us, now**?” Seven criteria cover most of the decision.',
    ),
    table(
      'Stack selection criteria',
      ['Criterion', 'Question to ask', 'Why it matters'],
      [
        ['Team skills', 'What can our developers build well today?', 'A familiar tool beats a theoretically better one'],
        ['Speed to market', 'How fast can we ship a first version?', 'Learning from real users is your biggest advantage'],
        ['Hiring', 'Can we find and afford developers for it?', 'Obscure stacks make growth slow and costly'],
        ['Ecosystem', 'Are there mature libraries, docs and community help?', 'Reduces custom work and risk'],
        ['Maintainability', 'Will a new developer understand it in two years?', 'Technical debt kills momentum'],
        ['Cost', 'What do hosting, licences and services cost at our scale?', 'Burn rate matters early'],
        ['Fit for the product', 'Does it suit real-time, data-heavy, content or transactional needs?', 'Some workloads favour specific tools'],
      ],
    ),
    callout(
      'tip',
      'Hiring is part of the stack',
      'A stack is also a labour market. Popular technologies such as JavaScript and TypeScript, Python and PHP have large pools of developers and agencies. A rare language might be elegant, but replacing the one person who knows it can stall your company.',
    ),

    h2('Sensible defaults by product type'),
    p(
      'There is no universal answer, but these defaults are widely used, well supported and low risk. Treat them as starting points to discuss with your developers, not instructions.',
    ),
    h3('Content or marketing website'),
    p(
      'A static or server-rendered site with a headless or traditional CMS is usually enough. Priorities are speed, search friendliness and easy editing. See [how much a business website costs](/blog/how-much-does-a-business-website-cost) for what to budget.',
    ),
    h3('Web application or SaaS'),
    p(
      'A mainstream web framework (for example in JavaScript or TypeScript, Python, PHP or Ruby), a relational database such as PostgreSQL or MySQL, managed hosting and a managed authentication and payments provider. Keep it as a single application at first: a well-organised “modular monolith” is faster to build and easier to change than a collection of microservices. Our [guide to building a SaaS product](/blog/how-to-build-a-saas-product) goes deeper.',
    ),
    h3('Mobile app'),
    p(
      'Cross-platform frameworks let one team ship to iOS and Android from a shared codebase, which is usually the economical choice for an MVP. Native development is justified for performance-critical or deeply platform-specific apps. We compare the options in [React Native vs. Flutter vs. native](/blog/react-native-vs-flutter-vs-native).',
    ),
    h3('Marketplace or e-commerce'),
    p(
      'Strongly consider proven platforms and services for payments, search and inventory rather than building them. Custom code should go where your business is different.',
    ),
    compare(
      'Boring and proven vs. new and exciting',
      {
        title: 'Boring and proven',
        points: [
          'Large communities and plentiful tutorials',
          'Known failure modes and good tooling',
          'Easier hiring and handover',
          'Rarely the reason a startup fails',
        ],
      },
      {
        title: 'New and exciting',
        tone: 'bad',
        points: [
          'Fewer developers and thinner documentation',
          'Breaking changes and unknown limits',
          'Higher risk of dead ends and rewrites',
          'Fun for engineers, costly for the business',
        ],
      },
    ),

    h2('Build, buy or integrate?'),
    p(
      'The cheapest code is the code you never write. Authentication, payments, email delivery, file storage, search, analytics and customer support tooling are mostly solved problems with reliable providers. Integrating them lets your team focus on what makes your product unique. Buy when the capability is standard and mature; build when it is core to your competitive advantage or when no tool fits your workflow. This is the same logic as [custom software vs. off-the-shelf](/blog/custom-software-vs-off-the-shelf), applied to individual components.',
    ),
    ul(
      '**Usually buy or integrate:** authentication, payments, email, SMS, hosting, monitoring, analytics.',
      '**Often build:** your core workflow, pricing logic, matching or recommendation rules, the user experience.',
      '**Decide case by case:** search, notifications, reporting, admin tools.',
    ),

    h2('Scale: plan for success without paying for it too early'),
    p(
      'Founders often over-engineer for millions of users they do not have. A modest, well-built application on managed cloud services can serve a surprisingly large business. The sensible approach is to choose technology that **can** scale when needed, keep the code clean and tests in place, monitor performance, and solve scaling problems when real data shows them. Premature microservices, complex queues and multi-region setups add cost and failure points long before they add value. If scaling concerns grow later, read microservices vs. monolith for guidance on when to split things up.',
    ),

    h2('Questions to ask your developers or agency'),
    checklist(
      'Questions that reveal good advice',
      [
        'Why this stack for our product, and what are the alternatives you rejected?',
        'How easy will it be to hire or replace developers for it?',
        'Which parts are we building and which are bought or integrated?',
        'What will hosting and third-party services cost at 100, 1,000 and 10,000 users?',
        'How is the code tested and deployed, and how fast can we ship changes?',
        'Who owns the code, the accounts and the infrastructure?',
        'How does this choice affect our ability to switch partners later?',
      ],
    ),
    p(
      'Good advisers answer in plain language and admit trade-offs. If the answer is a stream of buzzwords, or a stack that happens to be what the vendor sells, be careful. Our checklist on [choosing a software development company](/blog/how-to-choose-a-software-development-company) covers how to assess partners more broadly.',
    ),

    h2('Common mistakes to avoid'),
    ul(
      '**Choosing for the CV:** engineers sometimes pick technology they want to learn, not what the business needs.',
      '**Following hype:** a tool being popular on social media does not make it right for you.',
      '**Locking yourself in unknowingly:** check data export, open standards and your ability to move providers.',
      '**Ignoring security and compliance:** regulated products, such as health or finance, constrain choices from day one.',
      '**No ownership:** founders should hold the repository, cloud accounts and domain, not the contractor.',
    ),

    h2('A simple process for deciding'),
    steps(
      'Decide in a week, not a quarter',
      [
        { title: 'Write requirements', text: 'List core features, users, integrations and constraints.' },
        { title: 'Shortlist', text: 'Pick two stack options your team or partner can build well.' },
        { title: 'Score', text: 'Rate each against the criteria table above.' },
        { title: 'Prototype the risky bit', text: 'Test the hardest technical assumption with a quick spike.' },
        { title: 'Decide and record', text: 'Write down the choice and the reasons in one page.' },
        { title: 'Review at milestones', text: 'Revisit at launch and at major growth steps, not weekly.' },
      ],
    ),
    p(
      'Remember that you are rarely stuck forever. Companies migrate stacks as they grow, and many successful products began on modest foundations. What you cannot recover is time lost by agonising. For an overall approach to scoping your first release, see our [MVP development guide](/blog/mvp-development-guide-for-startups).',
    ),
    cta(
      'Want an independent view on your stack before you commit budget? We review requirements and recommend a pragmatic architecture, then build it if you like.',
      '/contact',
      'Get a tech stack recommendation',
    ),
  ],
  faqs: [
    {
      question: 'What tech stack should a non-technical founder choose?',
      answer:
        'Choose proven, popular technology that your developers know well and that is easy to hire for, such as a mainstream web framework, a relational database and managed cloud services. Ask for the reasoning and alternatives, and make sure you own the code and accounts.',
    },
    {
      question: 'Is Next.js good for startups?',
      answer:
        'Next.js is a popular React framework that suits many startup web products, offering strong performance, search-friendly rendering and a large community. It is a sensible default if your team knows React, though the best choice depends on your product and skills.',
    },
    {
      question: 'React vs Vue vs Angular: which should I pick?',
      answer:
        'All three are mature. React has the largest ecosystem and hiring pool, Vue is approachable and productive, and Angular is structured for large enterprise teams. Pick the one your team knows best and can hire for.',
    },
    {
      question: 'Should a startup use microservices?',
      answer:
        'Usually not at the beginning. A well-organised single application is faster to build, cheaper to run and easier to change. Consider splitting services later, when specific scaling or team-size problems appear.',
    },
    {
      question: 'Can I change my tech stack later?',
      answer:
        'Yes, but it costs time and money, so choose carefully at the start. Clean code, good tests and modular design make later changes much easier, and many companies successfully evolve or migrate their stacks as they grow.',
    },
  ],
}
