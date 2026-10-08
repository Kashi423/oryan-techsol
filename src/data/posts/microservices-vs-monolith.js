import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'microservices-vs-monolith',
  title: 'Microservices vs. Monolith: What Small Teams Should Choose',
  shortTitle: 'Microservices vs. monolith',
  description:
    'Microservices vs monolith for small teams: pros, cons, costs, when to split, the modular monolith middle path and a decision checklist for startups.',
  date: '2026-12-17',
  updated: '2026-12-17',
  category: 'Custom Software',
  keywords:
    'microservices vs monolith, modular monolith, are microservices worth it for startups, when to use microservices, monolith architecture, software architecture for small teams, split a monolith',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['choose-a-tech-stack-for-your-startup', 'how-to-build-a-saas-product', 'legacy-software-modernization-guide', 'api-design-best-practices'],
  intro:
    'Few topics generate more strong opinions in software than microservices versus monoliths. Conference talks celebrate the architectures of giant tech companies, and teams of three developers wonder whether they should do the same. The honest answer for most small teams is simple: start with a well-structured monolith, and split things up only when real problems demand it. Microservices solve problems of scale, team size and independent deployment that many products never have, and they introduce complexity that can sink small teams. This guide explains the two approaches in plain language, weighs their costs and benefits, introduces the modular monolith as a pragmatic middle path, and gives a checklist for deciding when, if ever, to split.',
  takeaways: [
    'A monolith is one deployable application; microservices are many small, independently deployed services that communicate over a network.',
    'For small teams and new products, a well-organised (modular) monolith is usually faster, cheaper and easier to run.',
    'Microservices help with large teams, independent scaling and fault isolation, but add distributed-systems complexity.',
    'Most “monolith problems” are really code-organisation problems that better structure can solve.',
    'Split deliberately, one service at a time, when specific pain points justify the cost.',
  ],
  blocks: [
    h2('Two ways to organise the same software'),
    p(
      'A **monolith** is a single application where all the functionality, such as user accounts, orders, payments, notifications and reporting, lives in one codebase and is deployed as one unit. A **microservices architecture** divides that functionality into many small services, each owning a piece of the business domain, with its own code and often its own database, deployed independently and communicating through APIs or messages.',
    ),
    table(
      'Monolith vs. microservices at a glance',
      ['Aspect', 'Monolith', 'Microservices'],
      [
        ['Deployment', 'One unit; simple', 'Many units; needs automation and orchestration'],
        ['Development speed (small team)', 'Fast: one codebase, simple debugging', 'Slower: more setup, more coordination'],
        ['Scaling', 'Scale the whole app together', 'Scale individual services independently'],
        ['Data', 'Usually one database; easy transactions', 'Data split across services; consistency is harder'],
        ['Failure impact', 'A serious bug can take down everything', 'Faults can be isolated, if designed well'],
        ['Team structure', 'Works best for one or a few teams', 'Suits many teams owning separate services'],
        ['Operations', 'Simple to monitor and host', 'Needs advanced monitoring, tracing and infrastructure'],
        ['Cost', 'Lower infrastructure and tooling cost', 'Higher: more infrastructure and engineering overhead'],
      ],
    ),

    h2('Why microservices are attractive'),
    ul(
      '**Independent deployment:** teams can release their service without coordinating a whole-company release.',
      '**Independent scaling:** a busy search service can scale without scaling billing.',
      '**Technology freedom:** different services can use different languages or databases where it makes sense.',
      '**Fault isolation:** a failing recommendation service need not crash checkout.',
      '**Team autonomy:** clear ownership boundaries help large organisations move in parallel.',
    ),
    p(
      'These benefits are real, but they depend on having the problems they solve: many teams, huge scale or very different scaling needs. Companies that popularised microservices had thousands of engineers and traffic few businesses will see.',
    ),

    h2('The hidden costs of microservices'),
    callout(
      'warn',
      'You are building a distributed system',
      'Once services talk over a network, you inherit problems that do not exist inside one application: latency, partial failures, retries, data consistency across services, versioning of interfaces, distributed debugging and complex deployment.',
    ),
    ul(
      '**Operational overhead:** containers, orchestration, service discovery, configuration, secrets and many pipelines.',
      '**Observability needs:** centralised logging, metrics and tracing to follow a request across services.',
      '**Data consistency:** no simple transactions across services; you need patterns like events and sagas.',
      '**Testing complexity:** integration tests across services are slower and harder.',
      '**Interface management:** every service API must be versioned and documented; see [API design best practices](/blog/api-design-best-practices).',
      '**Cognitive load:** developers must understand many moving parts, not one codebase.',
      '**Cost:** more infrastructure, tooling and people.',
    ),
    p(
      'A small team often spends more time operating the architecture than building product features. That is the trap.',
    ),

    h2('The monolith’s bad reputation'),
    p(
      'Monoliths are blamed for slow, fragile software, but the culprit is usually poor structure, not the deployment model. A “big ball of mud” with tangled dependencies, no boundaries and no tests is hard to change whether it is one app or ten. A well-designed monolith with clear module boundaries, good tests and automated deployment can serve a growing business for years, and many successful companies run large monoliths.',
    ),

    h2('The middle path: the modular monolith'),
    p(
      'A **modular monolith** is a single deployable application organised into well-defined modules, each representing a business area with its own code, clear public interfaces and limited dependencies on others. Inside the codebase, modules communicate through explicit interfaces, not by reaching into one another’s internals, and each module owns its data. You get the simplicity of one deployment and one database, and the discipline of boundaries that would also make a later split easy.',
    ),
    compare(
      'Tangled monolith vs. modular monolith',
      {
        title: 'Tangled monolith',
        tone: 'bad',
        points: [
          'Everything depends on everything',
          'Changes in one area break others',
          'Hard to test and onboard new developers',
          'Splitting later is very painful',
        ],
      },
      {
        title: 'Modular monolith',
        points: [
          'Clear modules with defined interfaces',
          'Changes are local and testable',
          'One deployment and simple operations',
          'Modules can become services later if needed',
        ],
      },
    ),
    p(
      'This is the approach we recommend for most startups and small businesses, consistent with the “boring technology” principle in [how to choose a tech stack](/blog/choose-a-tech-stack-for-your-startup) and the lean philosophy in our guide to [building a SaaS product](/blog/how-to-build-a-saas-product).',
    ),

    h2('When splitting becomes worthwhile'),
    checklist(
      'Signs you may need to extract a service',
      [
        'Different parts of the system have very different scaling needs, and scaling everything together is wasteful',
        'Multiple teams constantly block each other in the same codebase and release cycle',
        'A component needs a different technology, runtime or security boundary',
        'One area’s failures repeatedly threaten the whole system and cannot be contained otherwise',
        'Regulatory or security isolation requires separation of certain data or functions',
        'Deployments are slow and risky because the codebase has become too large for the team to handle',
        'You have the operational maturity: automation, monitoring and on-call practices',
      ],
    ),
    p(
      'If few of these apply, you are probably better off improving the structure of your monolith, optimising performance and investing in tests and deployment automation.',
    ),

    h2('How to split safely, if you must'),
    steps(
      'Evolving from monolith to services',
      [
        { title: 'Find the seams', text: 'Identify modules with clear boundaries and limited dependencies.' },
        { title: 'Strengthen interfaces', text: 'Make module interactions explicit and covered by tests.' },
        { title: 'Extract one service', text: 'Choose a candidate with a strong reason, such as scaling or isolation.' },
        { title: 'Route traffic gradually', text: 'Use a gateway or feature flag to move calls to the new service.' },
        { title: 'Own the data', text: 'Move or replicate the relevant data and avoid shared databases.' },
        { title: 'Observe and learn', text: 'Monitor, measure the benefits and costs, then decide the next step.' },
      ],
    ),
    p(
      'This incremental approach mirrors modernisation strategies for ageing systems described in [legacy software modernization](/blog/legacy-software-modernization-guide): avoid big-bang rewrites and move in small, reversible steps.',
    ),

    h2('Practical advice for small teams'),
    ul(
      '**Default to a modular monolith** with clear module boundaries and tests.',
      '**Invest in the basics:** automated deployment, monitoring, backups and a good development workflow.',
      '**Use managed services** for databases, queues and hosting to reduce operational burden.',
      '**Keep the option open:** design interfaces and data ownership so extraction is possible.',
      '**Measure before splitting:** use real performance and team-friction data, not fashion.',
      '**Revisit at milestones,** such as team doubling or major scale increases.',
    ),

    h2('Common mistakes'),
    ul(
      '**Starting with microservices “to be ready for scale”** before there is a product.',
      '**Splitting by technical layer** (a “database service”) instead of by business capability.',
      '**Sharing one database across many services,** getting the downsides of both worlds.',
      '**Ignoring observability,** making failures impossible to diagnose.',
      '**Blaming architecture for organisational problems** such as unclear ownership or lack of tests.',
      '**Rewriting everything at once.**',
    ),
    h2('A realistic example'),
    p(
      'Picture a four-person team building a booking platform. In month one, they create a single application with modules for accounts, bookings, payments, notifications and reporting. Each module has its own folder, a small public interface and its own tables, and the team enforces simple rules: modules call each other only through those interfaces, and there are tests at module boundaries. They deploy through an automated pipeline to a managed platform, with centralised logging and alerts. A year later, the notification module is sending huge volumes of messages and affecting performance. Because its boundaries are clean, they extract it into a separate worker service with its own queue, leaving the rest of the system untouched. The extraction takes weeks, not months, and happens exactly when and where it earns its keep. The team never needed to run dozens of services to get there.',
    ),
    p(
      'That is the argument for starting simple: complexity is a cost you should pay only when it buys you something concrete.',
    ),
    cta(
      'Not sure how to structure your application for growth? We design pragmatic architectures, usually modular monoliths, that stay simple today and can evolve when you need them to.',
      '/contact',
      'Review your architecture',
    ),
  ],
  faqs: [
    {
      question: 'Are microservices worth it for startups?',
      answer:
        'Usually not at the beginning. A well-structured monolith is faster to build, cheaper to run and easier to change. Consider microservices later if scaling needs, team size or isolation requirements justify the added complexity.',
    },
    {
      question: 'What is a modular monolith?',
      answer:
        'A single deployable application organised into well-defined modules with clear interfaces and limited dependencies. It offers simple operations and keeps the door open to extracting services later.',
    },
    {
      question: 'When should I split my monolith?',
      answer:
        'When specific problems appear: very different scaling needs, teams blocking each other, a need for technology or security isolation or deployment risk that cannot be solved by better structure. Split one service at a time.',
    },
    {
      question: 'Do microservices improve performance?',
      answer:
        'Not automatically. They can let you scale parts independently, but network calls add latency and complexity. Many performance problems are better solved by optimising code, queries and caching.',
    },
    {
      question: 'Can I start with a monolith and move to microservices later?',
      answer:
        'Yes, and it is often the best path, provided you keep modules well separated. Clean boundaries make later extraction far easier.',
    },
  ],
}
