import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'software-development-contract-guide',
  title: 'Software Development Contracts: What to Put in Your Agreement',
  shortTitle: 'Software development contract guide',
  description:
    'What to include in a software development contract: scope, IP ownership, payment milestones, acceptance, warranty, confidentiality, change control and exit.',
  date: '2027-01-12',
  updated: '2027-01-12',
  category: 'Guides',
  keywords:
    'software development contract, software development agreement template, who owns the code in a development contract, nda for developers, payment milestones software project, change request clause, software project warranty',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['outsourcing-software-development', 'software-project-estimation', 'freelancer-vs-agency-vs-in-house', 'how-to-choose-a-software-development-company'],
  intro:
    'Most software projects begin with enthusiasm and a handshake. The contract feels like an obstacle, something lawyers insist on and nobody reads. Then a deadline slips, a feature is disputed, the relationship sours and both sides discover that the agreement says little about the very things they are arguing over: who owns the code, what counts as finished, who pays for changes, what happens if the vendor walks away. A good software development agreement does not make a project adversarial; it makes expectations explicit and protects both parties when things get difficult. This guide walks through the key clauses that every software or app development contract should address, explains what to look for and what to avoid, and suggests how to work with a lawyer efficiently. It is general information, not legal advice; always have a qualified lawyer review your agreement for your jurisdiction.',
  takeaways: [
    'A contract should define scope, deliverables, acceptance criteria, timelines and price in plain language.',
    'Intellectual property ownership, confidentiality and security obligations need to be explicit.',
    'Tie payments to milestones and acceptance, and set a clear process for changes to scope.',
    'Include warranty, support, exit and handover terms so you are never locked in or left stranded.',
    'The contract complements, not replaces, good communication and a clear brief.',
  ],
  blocks: [
    h2('Why a proper contract matters'),
    p(
      'Software is intangible, evolving and easy to argue about. “It should be fast”, “make it intuitive” and “the same as the competitor’s” mean different things to different people. A contract translates intentions into obligations: what will be delivered, by when, for what price, to what standard and what happens if either side does not do their part. It also matters for practical reasons beyond disputes: investors and acquirers will ask who owns your code, regulators may expect data-protection terms and your own team needs clarity on what the vendor is responsible for.',
    ),
    callout(
      'note',
      'Get legal advice',
      'Contract law varies by country and state, and software contracts have particular pitfalls around intellectual property and liability. Use this guide to prepare and ask better questions, then have a qualified lawyer review the final agreement.',
    ),

    h2('The documents you may need'),
    table(
      'Typical contract documents',
      ['Document', 'Purpose'],
      [
        ['Non-disclosure agreement (NDA)', 'Protects confidential information shared before and during the project'],
        ['Master services agreement (MSA)', 'The general legal terms that govern the relationship across projects'],
        ['Statement of work (SOW) or project schedule', 'The specific scope, deliverables, timeline, team and fees for a project or phase'],
        ['Data processing agreement', 'Required when the vendor handles personal data on your behalf, under laws such as GDPR'],
        ['Service level agreement (SLA)', 'Defines support response times and uptime for hosted or maintained systems'],
        ['Maintenance and support agreement', 'Terms for ongoing fixes and updates after launch'],
      ],
    ),
    p(
      'Small projects may combine these into a single agreement; larger relationships separate the stable legal terms (MSA) from the changing project details (SOWs). The more complex the project, the more valuable this structure becomes.',
    ),

    h2('Scope, deliverables and acceptance'),
    p(
      'Vague scope is the biggest source of disputes. Describe what is being built in enough detail that both sides could tell, objectively, whether it has been done. Attach or reference the requirements document or specifications, user stories or wireframes, and list deliverables such as source code, builds, documentation, designs and test reports. If the details will emerge during an agile process, define the process, the backlog mechanism and a budget cap instead of pretending everything is known; see [agile vs. waterfall](/blog/agile-vs-waterfall-for-software-projects) and [how to write an app requirements document](/blog/how-to-write-an-app-requirements-document).',
    ),
    checklist(
      'Scope and acceptance checklist',
      [
        'A clear description of the product, features and platforms',
        'What is explicitly out of scope',
        'Assumptions the price depends on, such as client-supplied content, access and timely feedback',
        'Acceptance criteria: how each deliverable will be tested and approved',
        'A defined acceptance period and what happens if the client does not respond',
        'A process for rejecting deliverables and requiring fixes',
        'Definition of “done”, including documentation and deployment',
      ],
    ),

    h2('Intellectual property ownership'),
    p(
      'This is the clause people most often get wrong. Under many legal systems, the author of software, which could be the developer or the agency, initially owns the copyright unless there is a written assignment or the work qualifies as work made for hire. Simply paying for a project does not automatically transfer ownership. Your contract should state clearly who owns what.',
    ),
    ul(
      '**Assignment of IP:** the client owns the custom code, designs and deliverables created for the project, effective on payment, with the vendor assigning all rights.',
      '**Pre-existing and third-party materials:** the vendor keeps ownership of its pre-existing tools, frameworks and libraries but grants the client a licence to use them as part of the deliverable.',
      '**Open-source components:** the vendor should identify them and comply with their licences, avoiding terms that could force you to disclose your code.',
      '**Moral rights and waivers:** where relevant in your jurisdiction.',
      '**Licences you need:** perpetual, irrevocable rights to use, modify and maintain the software, including through other developers.',
      '**Access:** source code, repositories, design files and credentials delivered to you, ideally hosted in your own accounts from the start.',
    ),
    callout(
      'warn',
      'Beware of licence-only deals',
      'Some vendors retain ownership and only license the software to you. That can be reasonable for products they sell to many clients, but not for custom software you commissioned. Make sure you understand which you are getting, and the consequences if the vendor disappears.',
    ),

    h2('Price, payments and expenses'),
    p(
      'State the pricing model, whether fixed price, time and materials, capped or retainer, and how and when you pay. Tie payments to milestones or accepted deliverables rather than large upfront sums, and avoid paying for work that has not been reviewed.',
    ),
    table(
      'Payment structures',
      ['Model', 'How payment works', 'Contract points to cover'],
      [
        ['Fixed price', 'Agreed total for defined scope, paid by milestones', 'Scope definition, change process, acceptance criteria'],
        ['Time and materials', 'Pay for actual hours at agreed rates', 'Rates, estimates, caps, reporting and approval of overages'],
        ['Capped budget', 'Time and materials with a maximum', 'What happens when the cap is reached'],
        ['Retainer', 'Monthly fee for a set amount of capacity', 'Unused hours, rollover, response times and scope'],
      ],
    ),
    ul(
      'Specify currency, taxes, invoicing schedule, late-payment terms and who bears third-party costs such as licences, hosting and app store fees.',
      'Define how expenses are approved and reimbursed.',
      'For fixed-price work, state what a change request will cost and how it is priced.',
    ),
    p(
      'Our guide to [software project estimation](/blog/software-project-estimation) explains how different pricing structures distribute risk.',
    ),

    h2('Timeline, milestones and delays'),
    ul(
      'Include a delivery schedule with milestones and dependencies on the client, such as content, approvals and access.',
      'State what happens if either side causes delays, including extensions and re-planning.',
      'Avoid unrealistic “time is of the essence” clauses unless truly needed; link remedies to material delays.',
      'Specify communication cadence: meetings, demos and reports.',
    ),

    h2('Change control'),
    p(
      'Changes will occur. The question is whether they are managed or chaotic. Define a simple process: a change request is written, the vendor estimates the impact on cost and schedule, the client approves or declines in writing and only approved changes proceed. This protects the client from surprise invoices and the vendor from unpaid scope creep.',
    ),
    steps(
      'A workable change process',
      [
        { title: 'Request', text: 'The client or vendor describes the proposed change in writing.' },
        { title: 'Assess', text: 'The vendor estimates effort, cost and effect on dates.' },
        { title: 'Decide', text: 'The client approves, defers or rejects within an agreed time.' },
        { title: 'Document', text: 'An amendment or backlog update records the decision.' },
        { title: 'Deliver', text: 'Work proceeds under the updated terms.' },
      ],
    ),

    h2('Quality, warranty and support'),
    ul(
      '**Warranty:** the vendor should warrant that the software will conform to the specification and be free of material defects for a defined period after acceptance, such as thirty to ninety days, during which bugs are fixed at no extra charge.',
      '**Standards:** expectations about coding standards, testing, documentation and security practices.',
      '**Support and maintenance:** whether ongoing support is included, response times by severity and pricing for continued work; see [website maintenance plans](/blog/website-maintenance-plans-and-costs) and [mobile app maintenance](/blog/mobile-app-maintenance-what-to-budget).',
      '**Compatibility:** supported browsers, devices and operating system versions.',
      '**Performance and uptime:** if relevant, measurable targets rather than vague promises.',
    ),

    h2('Confidentiality, data and security'),
    checklist(
      'Protecting information',
      [
        'A mutual NDA covering business, technical and customer information',
        'Limits on who at the vendor can access your data and systems, including subcontractors',
        'Compliance with applicable data-protection laws, with a data processing agreement where personal data is involved',
        'Security requirements: access control, encryption, secure development, incident notification',
        'Return or deletion of data and materials at the end of the engagement',
        'Restrictions on using your data or code to train AI models or in other client projects, unless you agree',
        'Rules on using third-party AI coding tools with your confidential code',
      ],
    ),
    p(
      'These obligations connect with the practices in [AI privacy and security for small business](/blog/ai-privacy-and-security-for-small-business) and the [mobile app security checklist](/blog/mobile-app-security-checklist).',
    ),

    h2('Liability, indemnity and insurance'),
    p(
      'Contracts usually limit each party’s liability, often to the fees paid, and exclude indirect losses. Be aware of what is capped and what is not. Common points of negotiation include indemnities for IP infringement, where the vendor protects you if their code infringes a third party’s rights, liability for data breaches caused by the vendor’s negligence and professional indemnity or cyber insurance requirements for the vendor. Understand the risks relevant to your project and negotiate accordingly, with legal advice.',
    ),

    h2('Termination and exit'),
    p(
      'Plan for the end at the beginning. Good exit terms are your insurance against lock-in.',
    ),
    ul(
      '**Termination rights:** for convenience with notice, and for cause such as material breach or insolvency.',
      '**Payment on termination:** you pay for accepted work and reasonable costs incurred, not for work not delivered.',
      '**Handover:** immediate delivery of source code, documentation, credentials and assets, with reasonable transition assistance.',
      '**Return of materials and data,** with confirmation of deletion.',
      '**Survival:** confidentiality and IP clauses continue after termination.',
    ),
    compare(
      'Strong vs. weak agreements',
      {
        title: 'A strong agreement',
        points: [
          'Clear scope, acceptance criteria and change process',
          'Explicit IP assignment and code access',
          'Milestone-based payments',
          'Warranty, support and exit terms',
        ],
      },
      {
        title: 'A weak agreement',
        tone: 'bad',
        points: [
          'Vague scope: “build an app”',
          'Silent on who owns the code',
          'Large upfront payments with no milestones',
          'No termination or handover provisions',
        ],
      },
    ),

    h2('Working with a lawyer efficiently'),
    steps(
      'Make legal review cheaper and faster',
      [
        { title: 'Prepare your brief', text: 'A clear scope and requirements document reduces legal drafting.' },
        { title: 'List key business terms', text: 'Price, timeline, ownership, support, confidentiality and exit expectations.' },
        { title: 'Review the vendor’s draft', text: 'Mark confusing or one-sided clauses before the lawyer sees it.' },
        { title: 'Prioritise issues', text: 'Focus negotiation on IP, payment, liability and termination.' },
        { title: 'Keep a record', text: 'Store the signed contract and all amendments and change approvals.' },
      ],
    ),
    p(
      'Before signing with anyone, also evaluate the vendor’s track record using our guide on [choosing a software development company](/blog/how-to-choose-a-software-development-company) and the engagement advice in [outsourcing software development](/blog/outsourcing-software-development).',
    ),

    h2('Common mistakes'),
    ul(
      '**Starting work without a signed agreement.**',
      '**Assuming payment transfers IP automatically.**',
      '**Vague scope and no acceptance criteria.**',
      '**Large upfront payments** without milestones.',
      '**Ignoring change control,** leading to disputes over extras.',
      '**Skipping exit terms,** leaving you locked in.',
      '**Using a generic template** that does not fit your project or jurisdiction.',
    ),
    cta(
      'Starting a software project and want clear scope and fair terms from day one? We work with transparent proposals, defined deliverables and full code ownership for our clients.',
      '/contact',
      'Start with a clear proposal',
    ),
  ],
  faqs: [
    {
      question: 'Who owns the code in a development contract?',
      answer:
        'It depends on what the contract says and local law. Do not assume payment transfers ownership. Ensure the agreement clearly assigns intellectual property in the custom work to you, with licences for any pre-existing or third-party components.',
    },
    {
      question: 'What is an NDA for developers?',
      answer:
        'A non-disclosure agreement is a contract that obliges the developer or vendor to keep your confidential information private and use it only for the project. It should be signed before you share sensitive details.',
    },
    {
      question: 'What payment milestones are standard?',
      answer:
        'Common structures include a modest deposit, payments on accepted deliverables or phases and a final payment on acceptance and launch, sometimes with a retention until the warranty period ends. Avoid large upfront payments without reviewed progress.',
    },
    {
      question: 'What is a change request clause?',
      answer:
        'It defines how changes to scope are proposed, estimated, approved and paid for, so additions are managed and priced rather than causing surprise costs or disputes.',
    },
    {
      question: 'Do I need a lawyer to review a software contract?',
      answer:
        'It is strongly advisable, especially for significant projects. A lawyer familiar with technology contracts in your jurisdiction can protect your IP, limit liability and ensure the terms match your intentions.',
    },
  ],
}
