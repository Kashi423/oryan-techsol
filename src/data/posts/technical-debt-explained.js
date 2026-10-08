import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'technical-debt-explained',
  title: 'Technical Debt: What It Is and How to Pay It Down',
  shortTitle: 'Technical debt explained',
  description:
    'Technical debt explained for business owners: what it is, warning signs, how to measure it, ways to pay it down and how to explain it to management.',
  date: '2027-01-26',
  updated: '2027-01-26',
  category: 'Custom Software',
  keywords:
    'technical debt explained, what is technical debt, how to reduce technical debt, technical debt examples, when to rewrite software, code refactoring business case, explain technical debt to management',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['legacy-software-modernization-guide', 'software-project-estimation', 'microservices-vs-monolith', 'devops-and-ci-cd-for-small-teams'],
  intro:
    'If your developers keep saying that a simple change will take weeks, that fixing one bug causes two more, or that “we need to clean this up first”, you are hearing the language of technical debt. It is one of the most important concepts in software, and one of the hardest for non-technical leaders to grasp, because the cost is invisible until it suddenly is not. Technical debt is not simply bad code or a failure of the team; it is the accumulated cost of shortcuts, evolving requirements and ageing technology, and every software product carries some. Managed deliberately, it can be a useful tool: a conscious shortcut to hit a deadline or test an idea. Left unmanaged, it slows delivery, increases bugs and security risk and eventually forces expensive rewrites. This guide explains what technical debt is in plain language, how it builds up, how to spot and measure it, strategies to pay it down and how to make the business case for doing so.',
  takeaways: [
    'Technical debt is the future cost of choices made today, such as shortcuts, outdated components and messy structure.',
    'Some debt is deliberate and sensible; the danger is debt that is unrecognised, unmanaged and compounding.',
    'Symptoms include slowing delivery, frequent bugs, fragile releases, difficulty onboarding and fear of changing code.',
    'Pay it down continuously with small, prioritised improvements, backed by tests and automation, rather than waiting for a big rewrite.',
    'Frame it in business terms: speed, risk, cost and customer impact, so leaders can prioritise it alongside features.',
  ],
  blocks: [
    h2('The debt metaphor'),
    p(
      'The term was coined by Ward Cunningham, a pioneer of agile development, as a metaphor. Taking a shortcut in code is like borrowing money: you get something faster now, such as an earlier launch, but you pay **interest** later in the form of extra effort every time you work in that area. If you repay the principal by fixing the shortcut, the interest stops. If you never do, the interest compounds: each new feature takes longer because it has to work around the earlier shortcuts. Eventually, so much effort goes into paying interest that little remains for progress.',
    ),
    table(
      'Debt metaphor mapped to software',
      ['Finance', 'Software'],
      [
        ['Borrowing', 'Taking a shortcut, such as skipping tests or hard-coding values'],
        ['Principal', 'The work needed to fix the shortcut properly'],
        ['Interest', 'Extra time and risk each time you change related code'],
        ['Compounding', 'New features piling onto a poor foundation, increasing complexity'],
        ['Bankruptcy', 'A system so costly to change that a rewrite or replacement is the only option'],
      ],
    ),
    callout(
      'note',
      'Technical debt is not a moral failing',
      'Every successful product accumulates it. Requirements change, understanding improves and technology ages. The question is whether you are aware of it, deciding on it deliberately and paying it down regularly.',
    ),

    h2('Where technical debt comes from'),
    h3('Deliberate debt'),
    p(
      'Sometimes teams knowingly choose speed over polish: launching a minimum viable product, meeting a trade-show deadline, testing an idea before investing in a robust solution. This can be good business, as long as the debt is recorded and repaid. It matches the lean approach in our [MVP development guide](/blog/mvp-development-guide-for-startups).',
    ),
    h3('Accidental and inadvertent debt'),
    ul(
      '**Unclear or changing requirements:** the design that made sense at the start no longer fits the product.',
      '**Learning as you go:** the team builds, then discovers a better approach.',
      '**Inexperience:** poor practices from lack of knowledge, such as tangled structure or missing tests.',
      '**Pressure:** repeated “just make it work” instructions.',
      '**Poor documentation and lost knowledge:** code that only one person understands.',
    ),
    h3('Debt from ageing technology'),
    p(
      'Libraries, frameworks and platforms evolve. Code that was modern five years ago may rely on unsupported versions, with security patches no longer available. Delayed upgrades make each later upgrade harder. This overlaps with [legacy software modernization](/blog/legacy-software-modernization-guide).',
    ),
    h3('Debt in other places'),
    p(
      'It is not only code. Poor infrastructure, manual deployment processes, missing automated tests, outdated documentation, tangled data models and unmanaged dependencies are all forms of technical debt. Even architectural choices, such as splitting a system into services too early, can create debt; see [microservices vs. monolith](/blog/microservices-vs-monolith).',
    ),

    h2('Warning signs'),
    checklist(
      'Symptoms of heavy technical debt',
      [
        'Simple changes take much longer than they used to, or than seems reasonable',
        'Fixing one bug creates others, and regressions are common',
        'Releases are scary, infrequent and often followed by emergency fixes',
        'Developers avoid certain parts of the code and say “do not touch that”',
        'New team members take months to become productive',
        'Estimates are consistently wrong, and the team cannot explain why',
        'Tests are missing, flaky or ignored',
        'Security patches and upgrades are repeatedly postponed',
        'Knowledge lives in one or two people’s heads',
        'Morale and retention suffer because working in the code is painful',
      ],
    ),
    p(
      'If your estimates and costs keep ballooning, read our guide to [software project estimation](/blog/software-project-estimation); technical debt is one of the hidden causes.',
    ),

    h2('How to measure and see it'),
    p(
      'Debt is hard to quantify precisely, but you can make it visible enough to manage. Combine qualitative and quantitative views.',
    ),
    table(
      'Ways to assess technical debt',
      ['Method', 'What it reveals'],
      [
        ['Developer survey and interviews', 'Where the team feels pain and what slows them down'],
        ['Delivery metrics', 'Lead time, deployment frequency, change failure rate and time to restore service'],
        ['Bug and incident analysis', 'Which areas cause repeated problems'],
        ['Code analysis tools', 'Complexity, duplication, test coverage, outdated dependencies and known vulnerabilities'],
        ['Dependency and version audit', 'How far behind frameworks, libraries and platforms are'],
        ['Architecture review', 'Structural problems and risks that tools cannot measure'],
        ['Time tracking by category', 'Proportion of time spent on new value vs. fixing and workarounds'],
      ],
    ),
    p(
      'Keep a visible **debt register**: a list of known debt items, their location, why they matter, an estimate of effort to fix and the business impact if left. This turns vague unease into something that can be prioritised.',
    ),

    h2('Strategies to pay it down'),
    h3('1. Make it a habit, not a project'),
    p(
      'The most effective approach is continuous, incremental improvement. Allocate a share of every cycle, for example ten to twenty percent of capacity, to paying down debt, and apply the “boy scout rule”: leave code a little better than you found it. Small, frequent improvements prevent crises.',
    ),
    h3('2. Prioritise by interest, not by annoyance'),
    p(
      'Fix the debt that costs the most: code that changes often, causes frequent bugs or blocks planned features. A messy part nobody touches can wait; a messy part everybody touches daily is expensive.',
    ),
    h3('3. Build a safety net first'),
    p(
      'Automated tests, continuous integration and reliable deployment make improvement safe. Without them, refactoring is risky. See [DevOps for small teams](/blog/devops-and-ci-cd-for-small-teams) for practical foundations.',
    ),
    h3('4. Refactor in small steps'),
    p(
      'Improve structure without changing behaviour, in small, tested steps, rather than long rewrites. Techniques include extracting functions and modules, removing duplication, clarifying names and simplifying logic.',
    ),
    h3('5. Update dependencies regularly'),
    p(
      'Regular, small upgrades are easier than occasional massive ones. Automate dependency monitoring and security alerts, and schedule time for updates.',
    ),
    h3('6. Replace gradually, not catastrophically'),
    p(
      'For deeply flawed components, replace them piece by piece, running old and new in parallel and migrating gradually, rather than a risky big-bang rewrite.',
    ),
    h3('7. Improve documentation and knowledge sharing'),
    p(
      'Document architecture and decisions, pair programme and review code so knowledge is shared and not locked in individuals.',
    ),
    compare(
      'Continuous paydown vs. big rewrite',
      {
        title: 'Continuous improvement',
        points: [
          'Steady value alongside new features',
          'Lower risk; changes are small and tested',
          'Debt never grows out of control',
          'Requires discipline and visible priorities',
        ],
      },
      {
        title: 'Big-bang rewrite',
        tone: 'bad',
        points: [
          'Long period with no new value',
          'High risk of repeating mistakes and losing hidden knowledge',
          'Moving target as business needs change',
          'Sometimes unavoidable, but rarely the first choice',
        ],
      },
    ),

    h2('Prevention: avoid unnecessary debt'),
    ul(
      '**Clear requirements and priorities,** as in [how to write an app requirements document](/blog/how-to-write-an-app-requirements-document).',
      '**Code review and agreed standards** to maintain quality.',
      '**Automated tests for important logic.**',
      '**Realistic timelines and estimates,** avoiding chronic crunch.',
      '**Architecture that fits current needs,** not over-engineered or hastily patched.',
      '**Deliberate, recorded shortcuts** with a plan to repay.',
      '**Careful use of AI-generated code,** which can accelerate debt; see [vibe coding risks and benefits](/blog/vibe-coding-risks-and-benefits).',
    ),

    h2('How to explain technical debt to management'),
    p(
      'Executives rarely care about code quality for its own sake; they care about speed, cost, risk and customers. Translate debt into those terms.',
    ),
    table(
      'Business language for technical debt',
      ['Technical statement', 'Business translation'],
      [
        ['“The codebase is messy.”', '“New features take about twice as long as they should, and each release carries more risk of outages.”'],
        ['“We are on an unsupported framework.”', '“We cannot receive security fixes, which exposes us to breaches and compliance problems.”'],
        ['“We lack tests.”', '“Every change risks breaking things customers rely on, so we release slowly and fix problems in production.”'],
        ['“One person knows this module.”', '“If they leave, we cannot safely maintain a revenue-critical system.”'],
      ],
    ),
    steps(
      'Making the case',
      [
        { title: 'Quantify the cost', text: 'Time lost, incidents, delayed features and support burden.' },
        { title: 'Show the trend', text: 'Delivery speed or defect rates over time.' },
        { title: 'Link to business goals', text: 'Which planned initiatives are blocked or slowed by the debt?' },
        { title: 'Propose a plan', text: 'A phased paydown with milestones and expected benefits.' },
        { title: 'Report results', text: 'Measure improvements after each phase to build trust.' },
      ],
    ),

    h2('When a rewrite is justified'),
    p(
      'Sometimes the debt is so deep, the technology so obsolete or the architecture so misaligned that incremental repair costs more than starting again. Signs include a platform that cannot be hosted or secured, a dwindling pool of developers who know the technology, fundamental limits that block core business needs and a codebase nobody can test or change safely. Even then, prefer staged replacement, extracting and rebuilding module by module, over a single massive switchover. The decision framework in [legacy software modernization](/blog/legacy-software-modernization-guide) covers the options.',
    ),

    h2('Common mistakes'),
    ul(
      '**Ignoring debt until a crisis.**',
      '**Treating it as the developers’ problem** instead of a business risk.',
      '**Demanding speed constantly,** with no capacity for repair.',
      '**Paying down debt randomly,** not by impact.',
      '**Starting a rewrite** without understanding why the old system is hard to change.',
      '**Refactoring without tests,** causing regressions.',
      '**Not tracking debt,** so it stays invisible.',
    ),
    cta(
      'Is technical debt slowing your product or inflating your costs? We assess codebases, build a prioritised paydown plan and modernise safely, while keeping your team shipping.',
      '/contact',
      'Get a code health review',
    ),
  ],
  faqs: [
    {
      question: 'What causes technical debt?',
      answer:
        'Deliberate shortcuts to meet deadlines, unclear or changing requirements, inexperience, lack of tests and documentation, ageing technology and accumulating complexity as features are added.',
    },
    {
      question: 'How do I explain technical debt to management?',
      answer:
        'Translate it into business terms: slower delivery, higher defect and outage risk, security exposure, dependency on key people and cost. Show trends and link debt to planned goals it blocks, with a phased plan and measurable benefits.',
    },
    {
      question: 'When is a rewrite justified?',
      answer:
        'When the technology is obsolete or unsecurable, the architecture fundamentally blocks business needs and incremental repair costs more than replacement. Even then, staged replacement is usually safer than a big-bang rewrite.',
    },
    {
      question: 'How much time should we spend on technical debt?',
      answer:
        'Many teams allocate roughly ten to twenty percent of capacity to continuous improvement, adjusting by the severity of problems and business priorities.',
    },
    {
      question: 'Is all technical debt bad?',
      answer:
        'No. Deliberate, recorded shortcuts can be good business decisions, for example in an MVP. The problem is unmanaged debt that is never repaid and keeps compounding.',
    },
  ],
}
