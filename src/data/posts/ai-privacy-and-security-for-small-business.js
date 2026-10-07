import { callout, checklist, compare, cta, h2, h3, p, table, ul } from './helpers.js'

export default {
  slug: 'ai-privacy-and-security-for-small-business',
  title: 'AI Privacy and Security for Small Businesses: A Practical Guide',
  shortTitle: 'AI privacy and security',
  description:
    'How to use AI tools without exposing customer data: what not to share, vendor questions, data retention, access controls, staff policies and compliance basics.',
  date: '2026-10-31',
  updated: '2026-10-31',
  category: 'AI Bots',
  keywords:
    'AI privacy small business, AI data security, is ChatGPT safe for business data, AI policy for employees, chatbot data privacy, GDPR AI tools, secure AI adoption',
  service: { label: 'AI bots & automation services', to: '/ai-bots' },
  related: ['ai-agents-for-business-explained', 'train-a-chatbot-on-your-business-data', 'ai-chatbot-vs-live-chat-for-small-business'],
  intro:
    'AI tools are now part of everyday work: drafting emails, summarising documents, answering customers. Each convenience raises a question owners rarely have time to answer — where does the information I paste into this tool go? Used carelessly, AI can leak customer data, breach contracts or expose confidential plans. Used thoughtfully, it is no riskier than other cloud software. This guide gives small businesses a practical framework: what never to share, what to ask vendors, how to configure access, and a short policy your team can follow.',
  takeaways: [
    'Treat any AI tool as a third party: know what data goes in, where it is processed, how long it is kept and whether it is used to train models.',
    'Never paste passwords, payment card data or sensitive personal information into general-purpose AI tools.',
    'Prefer business-grade plans and settings that exclude your data from model training and give you controls.',
    'Write a short AI-use policy, train staff and keep an inventory of approved tools.',
    'Keep humans accountable for outputs: AI can be wrong, biased or confidently invent facts.',
  ],
  blocks: [
    h2('The main risks'),
    table(
      'AI privacy and security risks',
      ['Risk', 'Example', 'Mitigation'],
      [
        ['Data leakage', 'An employee pastes customer records into a public chatbot', 'Policy, training and approved tools'],
        ['Unwanted training use', 'Your inputs are used to improve a vendor’s model', 'Choose plans and settings that exclude training; read the terms'],
        ['Excessive access', 'An AI assistant can read every file and mailbox', 'Least-privilege access; scoped integrations'],
        ['Inaccurate output', 'The AI invents a policy, price or legal claim', 'Human review; grounding in approved content'],
        ['Compliance breach', 'Personal data processed without a lawful basis or notice', 'Privacy review; documented purposes and vendor agreements'],
        ['Vendor risk', 'A tool changes terms, is breached or shuts down', 'Due diligence; export options; avoid single dependence'],
      ],
    ),

    h2('What never to put into a general-purpose AI tool'),
    checklist(
      'Keep these out of public or unvetted AI tools',
      [
        'Passwords, API keys, access tokens and other credentials',
        'Payment card numbers and bank details',
        'Identity documents and government ID numbers',
        'Health, financial or other sensitive personal information about customers or staff',
        'Confidential contracts, source code or unreleased plans, unless the tool is approved for them',
        'Anything you are contractually or legally prohibited from sharing',
      ],
    ),
    callout(
      'tip',
      'When in doubt, anonymise',
      'Often you can get the value of AI without the sensitive details: replace names and identifiers with placeholders, summarise instead of pasting entire records, or use a version of the tool approved for your data.',
    ),

    h2('Questions to ask any AI vendor'),
    ul(
      '**Where is data processed and stored,** and in which countries?',
      '**Is my data used to train models?** Can I opt out, and is that the default?',
      '**How long is data retained,** and can I delete it on request?',
      '**Who can access it** at the vendor, and how is access logged?',
      '**What security measures and certifications** do they hold or follow?',
      '**Is there a data-processing agreement** that meets my legal obligations?',
      '**What happens to my data if I leave?** Can I export it?',
    ),

    h2('Consumer vs. business-grade tools'),
    compare(
      'Why plan type matters',
      {
        title: 'Free or consumer plans',
        points: [
          'May use inputs to improve models unless you opt out',
          'Limited admin, logging and access control',
          'Terms designed for individuals',
          'Poor fit for customer or confidential data',
        ],
      },
      {
        title: 'Business or enterprise plans',
        points: [
          'Typically exclude your data from training by default',
          'Admin controls, single sign-on and audit logs',
          'Contractual data-protection commitments',
          'Better suited to company information',
        ],
      },
      'Features and terms vary by provider and change — always read the current documentation.',
    ),

    h2('Building AI into your own systems securely'),
    p(
      'When AI is part of a product or workflow — a customer chatbot, an assistant that reads emails — the same principles apply with extra care. Give the system the minimum access it needs, store logs securely, ground answers in approved content as described in [how to train a chatbot on your data](/blog/train-a-chatbot-on-your-business-data), and keep a human in the loop for consequential actions, as we explain in [AI agents for business](/blog/ai-agents-for-business-explained).',
    ),
    checklist(
      'Secure-by-design checklist',
      [
        'Minimise the personal data the AI sees and stores',
        'Use least-privilege permissions for every connected system',
        'Protect API keys and keep them out of client-side code',
        'Log what the AI did and review samples regularly',
        'Tell users they are interacting with an automated assistant',
        'Provide a clear path to a human and to data deletion requests',
        'Test for prompt-injection and data-leak scenarios before launch',
      ],
    ),

    h2('A short AI-use policy for your team'),
    h3('What to include'),
    ul(
      'Which AI tools are approved, and for what purposes.',
      'What data may and may not be entered (use the list above).',
      'A rule that outputs must be reviewed by a person before use with customers.',
      'How to disclose AI use to customers where appropriate.',
      'Who to ask when something is unclear, and how to report a mistake.',
    ),
    p(
      'Keep it to one page and train staff with real examples. Review it every few months — tools and rules change quickly.',
    ),

    h2('Compliance basics'),
    ul(
      'Know which privacy laws apply to you (for example GDPR in the EU/UK or state privacy laws in the US).',
      'Document what personal data you process with AI, why and on what lawful basis.',
      'Update your privacy policy to describe AI-assisted processing honestly.',
      'Honour access, correction and deletion requests, including data held by AI vendors.',
      'Take professional advice for regulated sectors such as health or finance.',
    ),
    p(
      'This guide is general information, not legal advice. For where chatbots fit into customer service, see [AI chatbot vs. live chat](/blog/ai-chatbot-vs-live-chat-for-small-business).',
    ),
    cta(
      'Want AI that helps your business without putting customer data at risk? We will design assistants with sensible access, grounding and human oversight from the start.',
      '/contact',
      'Talk to us about secure AI',
    ),
  ],
  faqs: [
    {
      question: 'Is it safe to use ChatGPT or other AI tools with business data?',
      answer:
        'It depends on the tool, plan and settings. Avoid entering sensitive or customer data into consumer tools; prefer business-grade plans that exclude your data from training and offer admin controls, and read the vendor’s terms.',
    },
    {
      question: 'What should employees never paste into AI tools?',
      answer:
        'Passwords and keys, payment card data, identity documents, sensitive personal information about customers or staff, and confidential material they are not authorised to share.',
    },
    {
      question: 'Does AI use my data to train its models?',
      answer:
        'Some consumer tools may unless you opt out; many business plans exclude customer data from training by default. Check the current terms and settings for each tool you use.',
    },
    {
      question: 'Do I need an AI policy?',
      answer:
        'A short one-page policy is strongly recommended: approved tools, what data is allowed, review requirements and who to ask. It reduces mistakes and shows customers you take privacy seriously.',
    },
    {
      question: 'Does using AI affect GDPR compliance?',
      answer:
        'Yes, if you process personal data. You need a lawful basis, transparency, appropriate agreements with vendors and the ability to honour individuals’ rights. Seek professional advice for your situation.',
    },
  ],
}
