import { bars, callout, checklist, compare, cta, h2, h3, p, steps, table, timeline, ul } from './helpers.js'

export default {
  slug: 'business-process-automation-where-to-start',
  title: 'Business Process Automation: Where to Start (and What to Automate First)',
  shortTitle: 'Business process automation: where to start',
  description:
    'How to start with business process automation: pick the right workflows, score them, estimate the return and roll out step by step.',
  date: '2026-10-04',
  updated: '2026-10-07',
  category: 'Automation',
  keywords:
    'business process automation, workflow automation for small business, what to automate first, automate repetitive tasks, automation ROI, process automation examples',
  service: { label: 'Business automation services', to: '/business-automation' },
  related: ['what-is-api-integration', 'ai-agents-for-business-explained', 'ai-chatbot-vs-live-chat-for-small-business'],
  intro:
    'Every business has work that people do over and over: copying data between systems, chasing approvals, sending reminders, assembling the same weekly report. Automation hands that work to software so your team can focus on what needs a human. But automating the wrong thing — or a broken process — wastes money. This guide shows you how to find the right first targets, estimate the return honestly, and roll automation out without disruption.',
  takeaways: [
    'The best first candidates are frequent, rule-based, error-prone and tedious — not rare or judgement-heavy.',
    'Fix the process before you automate it; automation makes a messy process faster, not better.',
    'Score candidates by frequency, time per run, error cost and complexity, then start with the highest value and lowest effort.',
    'Measure hours saved and errors avoided on the first workflow, and use the evidence to choose the second.',
    'Keep a human in the loop for exceptions, approvals and anything with real consequences.',
  ],
  blocks: [
    h2('What is business process automation?'),
    p(
      '**Business process automation (BPA)** means using software to carry out repeatable steps of a business process with little or no manual effort: moving data, sending notifications, creating documents, routing approvals, updating records. It ranges from a simple rule — “when a form is submitted, create a task and email the owner” — to multi-system workflows that run end to end.',
    ),
    p(
      'It is closely related to, but different from, [API integration](/blog/what-is-api-integration). Integration is the **plumbing** that lets systems exchange data; automation is the **logic** on top that decides what should happen, when and for whom. Most useful automations rely on both.',
    ),

    h2('How to recognise a good automation candidate'),
    p(
      'Not every task deserves automation. A task is a strong candidate when most of the following are true:',
    ),
    checklist(
      'The good-candidate test',
      [
        'It happens often — daily or weekly, not once a year',
        'The steps follow clear rules that rarely change',
        'People copy data, send reminders or chase approvals by hand',
        'Mistakes are costly, or customers notice delays',
        'It involves several systems or people waiting on each other',
        'The result can be checked — you will know if it worked',
      ],
    ),
    callout(
      'warn',
      'Poor candidates',
      'Tasks that are rare, highly variable, or driven by personal judgement and relationships are usually better left to people — or only partially automated, with a person making the final call.',
    ),

    h2('Common first wins by department'),
    table(
      'Automation ideas that usually pay off quickly',
      ['Area', 'What to automate', 'Benefit'],
      [
        ['Sales', 'Capture website and chat leads into the CRM, assign an owner, send an instant reply and schedule follow-ups', 'Faster response and no lost leads'],
        ['Finance', 'Create invoices from orders, send payment reminders, reconcile payments', 'Faster payment and fewer errors'],
        ['Operations', 'Approval routing for purchases, leave and content; status notifications', 'Fewer stalled requests'],
        ['HR', 'Onboarding checklists, document collection, equipment and account set-up requests', 'Consistent, quicker onboarding'],
        ['Customer support', 'Ticket tagging and routing, order-status replies, bot-handled FAQs. See [AI chatbot vs. live chat](/blog/ai-chatbot-vs-live-chat-for-small-business)', 'Quicker answers and a calmer team'],
        ['Reporting', 'Weekly dashboards and summaries pulled automatically from your tools', 'Hours saved and a single source of truth'],
      ],
    ),

    h2('Score your candidates: a simple prioritisation method'),
    p(
      'Rather than going on instinct, give each candidate a quick score. For each one, estimate how often it happens, how long it takes each time, how many people are involved, how costly mistakes are, and how hard it would be to automate. The best first project combines **high value with low effort**.',
    ),
    table(
      'A simple scoring grid (score each 1–5)',
      ['Candidate workflow', 'Frequency', 'Time per run', 'Error cost', 'Effort to automate', 'Priority'],
      [
        ['Lead capture to CRM', '5', '3', '4', '2 (low)', 'High — start here'],
        ['Invoice reminders', '4', '3', '3', '2 (low)', 'High'],
        ['Monthly board report', '1', '5', '3', '4 (high)', 'Later'],
        ['Custom contract drafting', '2', '4', '5', '5 (very high)', 'Keep human-led'],
      ],
      'Example scores for illustration. Higher “Effort” means harder. Replace with your own workflows.',
    ),
    bars(
      'Where first automations usually land (value vs. effort)',
      [
        { label: 'Lead capture and instant follow-up', value: 88, display: 'High value · low effort' },
        { label: 'Payment reminders and invoice creation', value: 78, display: 'High value · low effort' },
        { label: 'Multi-step approval routing', value: 62, display: 'Good value · medium effort' },
        { label: 'Cross-system reporting dashboards', value: 52, display: 'Good value · higher effort' },
      ],
      'Illustrative ranking of common workflows, not measured data.',
    ),

    h2('Fix the process before you automate it'),
    p(
      'It is tempting to automate a process exactly as it is. Resist that. If a process has needless steps, unclear ownership or inconsistent data, automation will simply do the wrong things faster. Map the current steps, ask why each exists, remove what adds no value, and only then automate what is left.',
    ),
    compare(
      'Automating the process as-is vs. fixing it first',
      {
        title: 'Map, simplify, then automate',
        points: [
          'Removes steps that never needed to exist',
          'Clear owners and rules make automation reliable',
          'Smaller, cheaper, easier-to-maintain workflows',
          'Results you can actually measure',
        ],
      },
      {
        title: 'Automate the mess as it is',
        tone: 'bad',
        points: [
          'Locks in unnecessary steps',
          'Fails on exceptions nobody documented',
          'Creates hard-to-debug “spaghetti” workflows',
          'Frustrates the team that has to live with it',
        ],
      },
    ),

    h2('A step-by-step approach to your first automation'),
    steps(
      'From idea to a working automation',
      [
        { title: 'List & choose', text: 'List repetitive tasks, score them, and pick one high-value, low-effort workflow.' },
        { title: 'Map the process', text: 'Write down each step, who does it, which systems are involved and the exceptions.' },
        { title: 'Simplify', text: 'Remove unnecessary steps and agree one clear set of rules.' },
        { title: 'Build & connect', text: 'Automate the steps and connect the systems, via [APIs](/blog/what-is-api-integration) where needed.' },
        { title: 'Test, launch, measure', text: 'Pilot with real data, keep a human check at first, then track the results.' },
      ],
    ),
    h3('How to estimate the return'),
    p(
      'A simple way to see whether an automation will pay off: **time saved = how often it happens × minutes per run × number of people involved**. For example, if a task happens 20 times a week and takes 10 minutes each time, that is 200 minutes — a little over three hours — every week, before counting avoided errors and faster responses. Compare that against the cost to build and maintain the automation to see the payback period.',
    ),
    callout(
      'note',
      'Be honest about the numbers',
      'Use your own measurements, not generic percentages. A good partner will not promise a fixed saving before they have seen how your business actually works.',
    ),
    cta(
      'Want help choosing your first workflow? We will map your processes, score the candidates and give you a straight view of what is worth automating.',
      '/contact',
      'Book a free consultation',
    ),

    h2('Tools and approaches: no-code, custom or RPA?'),
    p(
      'There is no single “automation tool”. The right approach depends on volume, complexity and how critical the process is.',
    ),
    table(
      'Choosing an automation approach',
      ['Approach', 'Best for', 'Watch out for'],
      [
        ['No-code / low-code platforms', 'Simple, low-volume workflows and quick proofs of concept', 'Per-task pricing at scale, limits on complex logic'],
        ['Custom-built automation', 'Core, high-volume or complex processes needing reliability and security', 'Higher upfront cost; needs an owner'],
        ['Robotic process automation (RPA)', 'Legacy systems with no API, where software must operate the screen like a person', 'Fragile when screens change; often a stop-gap'],
        ['AI-assisted automation', 'Messy inputs such as emails and documents. See [AI agents](/blog/ai-agents-for-business-explained)', 'Needs review and guardrails for high-stakes steps'],
      ],
    ),
    h2('How to measure the success of an automation'),
    checklist(
      'Measure these before and after',
      [
        'Hours spent on the task each week',
        'Time from trigger to completion',
        'Error or rework rate',
        'Customer or colleague satisfaction with the process',
        'Cost to run and maintain the automation',
        'Number of exceptions that still need a person',
      ],
    ),

    h2('Mistakes to avoid'),
    ul(
      '**Automating too much at once.** Start with one workflow, prove it, then expand.',
      '**Removing people from decisions that need judgement.** Keep humans in the loop for exceptions, approvals and sensitive cases.',
      '**Ignoring exceptions.** Plan what happens when data is missing, a system is down or a case does not fit the rules.',
      '**No ownership.** Every automation needs a named owner who keeps it working as the business changes.',
      '**No monitoring.** Automations should log what they do and alert you when something fails.',
      '**Skipping the team.** The people doing the work today know where the real problems are — involve them early.',
    ),

    h2('Where AI fits in'),
    p(
      'Traditional automation follows fixed rules. AI adds the ability to handle messy inputs — reading an email, classifying a request, drafting a reply, extracting details from a document. Used well, AI extends what you can automate, with a human reviewing anything high-stakes. We cover the next step beyond rules-based automation in [AI agents for business, explained](/blog/ai-agents-for-business-explained).',
    ),

    h2('A realistic rollout timeline'),
    timeline(
      'Rolling out automation without disruption',
      [
        { label: 'Weeks 1–2', title: 'Discover and prioritise', text: 'List tasks, interview the people who do them and score the candidates.' },
        { label: 'Weeks 3–5', title: 'Build the first workflow', text: 'Simplify, automate and connect systems with logging and alerts.' },
        { label: 'Weeks 6–7', title: 'Pilot with a human check', text: 'Run with real data, review outputs, fix edge cases.' },
        { label: 'Week 8+', title: 'Measure and expand', text: 'Report time saved and errors avoided, then pick workflow number two.' },
      ],
      'Indicative. Simple automations can be faster; multi-system workflows take longer.',
    ),
    p(
      'If you would like a partner to help you find and build your first automations, explore our [business automation services](/business-automation) or [get in touch](/contact).',
    ),
  ],
  faqs: [
    {
      question: 'What should a small business automate first?',
      answer:
        'Start with a frequent, rule-based, error-prone task — such as capturing leads into your CRM with an instant follow-up, sending payment reminders, or routing approvals. Choose the one with high value and low effort to automate, and measure the result before moving on.',
    },
    {
      question: 'Will automation replace my employees?',
      answer:
        'Automation is best used to remove repetitive, rules-based work so people can spend time on tasks that need judgement, creativity and relationships. Keep humans in the loop for exceptions and important decisions.',
    },
    {
      question: 'How much does business process automation cost?',
      answer:
        'It depends on the number of systems involved, the complexity of the rules and the reliability required. Simple workflows are inexpensive; multi-system automations cost more. Estimate time saved against the cost to build and maintain it to see the payback period.',
    },
    {
      question: 'What is the difference between automation and API integration?',
      answer:
        'API integration connects systems so they can exchange data. Automation is the logic on top that decides what should happen and when. Most valuable automations use both.',
    },
    {
      question: 'Do I need to fix my process before automating it?',
      answer:
        'Yes. Map the current steps, remove the ones that add no value and agree clear rules first. Automating a messy process only makes the mess faster.',
    },
  ],
}
