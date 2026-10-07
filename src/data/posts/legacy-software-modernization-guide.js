import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'legacy-software-modernization-guide',
  title: 'Legacy Software Modernization: When to Upgrade, Rebuild or Replace',
  shortTitle: 'Legacy software modernization',
  description:
    'Modernizing legacy software: warning signs, the four options (rehost, refactor, rebuild, replace), a phased plan, risks and how to decide.',
  date: '2026-11-03',
  updated: '2026-11-03',
  category: 'Custom Software',
  keywords:
    'legacy software modernization, legacy system upgrade, rewrite vs refactor, replace legacy software, application modernization, technical debt, migrate legacy system',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['custom-software-vs-off-the-shelf', 'agile-vs-waterfall-for-software-projects', 'what-is-api-integration'],
  intro:
    'Almost every established business runs on software that was built years ago and quietly grew into something nobody wants to touch. It still works, mostly — until it becomes slow, expensive to change, insecure, or dependent on one person who remembers how it works. Modernizing legacy software does not have to mean a risky big-bang rewrite. There is a spectrum of options, from small safe steps to full replacement. This guide helps you recognise when modernization is due, compare the options and approach it in phases that keep the business running.',
  takeaways: [
    'Legacy is about risk and cost of change, not age alone: software that is stable and cheap to run may be fine.',
    'There are four broad options — rehost, refactor, rebuild or replace — and the cheapest safe step is often the best first move.',
    'Big-bang rewrites are the riskiest option; incremental modernization lets you deliver value continuously.',
    'Document what the system actually does before changing it; hidden business rules are the biggest trap.',
    'Plan data migration, integrations and user training as seriously as the code.',
  ],
  blocks: [
    h2('Signs your software needs modernizing'),
    checklist(
      'Warning signs',
      [
        'Simple changes take weeks or break unrelated features',
        'Only one or two people understand how it works',
        'It runs on unsupported languages, frameworks, servers or databases',
        'Security patches cannot be applied, or audits flag vulnerabilities',
        'It cannot integrate with modern tools, payments or APIs',
        'Performance degrades as data and users grow',
        'Staff rely on spreadsheets and workarounds around it',
        'Hosting and maintenance costs keep rising while value does not',
      ],
    ),
    callout(
      'note',
      'Old is not automatically bad',
      'A stable system that meets today’s needs, is secure and is cheap to maintain may not need replacing. Modernize when the cost and risk of staying put exceed the cost of change.',
    ),

    h2('The four main options'),
    table(
      'Modernization options compared',
      ['Option', 'What it means', 'Effort / risk', 'Best when'],
      [
        ['Rehost', 'Move the same software to new infrastructure (e.g. cloud)', 'Low / low', 'Hardware or hosting is the problem'],
        ['Refactor / update', 'Improve the code, upgrade frameworks, fix hotspots, add APIs', 'Medium / medium', 'Core logic is sound but hard to change'],
        ['Rebuild', 'Redesign and rewrite on modern technology, reusing the requirements', 'High / high', 'Architecture blocks every future need'],
        ['Replace', 'Adopt an off-the-shelf product and retire the old system', 'Medium / medium', 'Your needs are standard and a good product exists'],
      ],
    ),
    p(
      'The replace-or-rebuild question mirrors the build-versus-buy decision in [custom software vs. off-the-shelf](/blog/custom-software-vs-off-the-shelf): buy when your process is standard, build when it is a competitive advantage.',
    ),

    h2('A phased approach that keeps the business running'),
    steps(
      'Incremental modernization',
      [
        { title: 'Assess', text: 'Inventory features, data, integrations, risks and costs.' },
        { title: 'Stabilise', text: 'Add backups, monitoring, tests and documentation first.' },
        { title: 'Prioritise', text: 'Pick the modules where change delivers the most value.' },
        { title: 'Replace in slices', text: 'Rebuild or refactor one area at a time behind a stable interface.' },
        { title: 'Migrate and retire', text: 'Move data, switch users over, switch the old part off.' },
      ],
    ),
    p(
      'This slice-by-slice pattern (often called the strangler approach) lets new components take over gradually, so there is no single risky cutover. It works best with the iterative delivery described in [agile vs. waterfall](/blog/agile-vs-waterfall-for-software-projects).',
    ),

    h2('Big-bang rewrite vs. incremental'),
    compare(
      'Two strategies',
      {
        title: 'Big-bang rewrite',
        tone: 'bad',
        points: [
          'Long period with no visible value',
          'Requirements drift while you rebuild',
          'Hidden business rules get lost',
          'One risky cutover day',
        ],
      },
      {
        title: 'Incremental modernization',
        points: [
          'Value delivered continuously',
          'Risk spread across small releases',
          'Old and new run side by side',
          'Easy to pause, reprioritise or stop',
        ],
      },
    ),

    h2('The hidden traps'),
    ul(
      '**Undocumented business rules:** the old system embodies years of exceptions. Interview users and read the code before specifying the new one.',
      '**Data migration:** messy, duplicated or inconsistent data needs cleaning and test migrations.',
      '**Integrations:** other systems may depend on files, databases or behaviours nobody listed. See [what API integration is](/blog/what-is-api-integration) for how to expose clean interfaces.',
      '**User adoption:** people rely on habits and shortcuts; involve them early and train them.',
      '**Scope creep:** “while we are at it” turns modernization into reinvention. Prioritise ruthlessly.',
    ),
    h3('Questions to ask before you start'),
    checklist(
      'Decision checklist',
      [
        'What business problem will modernization solve, and how will we measure it?',
        'What must the new system do identically, and what can change?',
        'What is the cost and risk of doing nothing for another two years?',
        'Can we modernize incrementally rather than all at once?',
        'Who owns the knowledge of the old system, and can we capture it now?',
        'What is the rollback plan if a release goes wrong?',
      ],
    ),

    h2('What does it cost?'),
    p(
      'Costs vary enormously with size, quality of documentation and data complexity. A rehost may be modest; a rebuild of a complex line-of-business system is a substantial project. A short assessment phase usually pays for itself by replacing guesses with a prioritised plan and a realistic range. Measure the return in avoided downtime, faster change, lower support costs and risk reduction — not just development spend.',
    ),
    cta(
      'Running software that holds your business back? We will assess it, show you the options and propose a phased plan that keeps operations running throughout.',
      '/contact',
      'Request a modernization assessment',
    ),
  ],
  faqs: [
    {
      question: 'What is legacy software modernization?',
      answer:
        'Updating, restructuring, rebuilding or replacing older software so it is secure, maintainable and able to meet current business needs, while preserving the value it already delivers.',
    },
    {
      question: 'Should I rewrite or refactor my old software?',
      answer:
        'Refactoring or incremental replacement is usually safer and cheaper than a full rewrite. A rewrite makes sense when the architecture fundamentally blocks your needs and the requirements are well understood.',
    },
    {
      question: 'How do I know if my system is a candidate for modernization?',
      answer:
        'Look for slow and risky changes, dependence on a few people, unsupported technology, security gaps, integration limits and rising costs.',
    },
    {
      question: 'How long does modernization take?',
      answer:
        'From weeks for rehosting or targeted refactoring to many months for large rebuilds. Phased delivery means you get benefits along the way instead of waiting for the end.',
    },
    {
      question: 'Can I modernize without downtime?',
      answer:
        'Often yes, by running old and new components side by side, migrating data in stages and switching users over gradually with a rollback plan.',
    },
  ],
}
