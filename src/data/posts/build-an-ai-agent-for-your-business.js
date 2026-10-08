import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'build-an-ai-agent-for-your-business',
  title: 'How to Build an AI Agent for Your Business, Step by Step',
  shortTitle: 'Build an AI agent for your business',
  description:
    'Step-by-step guide to building an AI agent for your business: choosing a task, tools, data, guardrails, testing, launch and the real costs involved.',
  date: '2026-11-08',
  updated: '2026-11-08',
  category: 'AI Bots',
  keywords:
    'build ai agent for business, how to create an ai agent, ai agent development, business ai agent, ai agent vs chatbot, custom ai agent cost, ai agent tools and guardrails',
  service: { label: 'AI bots & automation services', to: '/ai-bots' },
  related: ['ai-agents-for-business-explained', 'train-a-chatbot-on-your-business-data', 'ai-privacy-and-security-for-small-business', 'business-process-automation-where-to-start'],
  intro:
    'Everyone is talking about AI agents, but most business owners are still unsure what building one actually involves. Is it a chatbot with extra steps? A script wired to a language model? Something only large companies with machine learning teams can attempt? In reality, a useful business AI agent is a fairly ordinary piece of software: a language model that can read a request, decide what to do, call a few tools, and report back, all inside clear limits. This guide walks through the whole process in order, from choosing the right first task to launching safely, so you can plan a project, brief a developer, or judge whether an agent is worth building for your company.',
  takeaways: [
    'An AI agent is a language model plus tools, memory and rules, working towards a goal with limited human supervision.',
    'Start with one narrow, repetitive, well-defined task; breadth comes later.',
    'The hard part is rarely the model. It is the data access, tool design, guardrails and testing around it.',
    'Keep a human approval step for anything that spends money, changes records or contacts customers, at least at first.',
    'Measure the agent against a baseline (time saved, errors, resolution rate) before expanding its powers.',
  ],
  blocks: [
    h2('What an AI agent actually is'),
    p(
      'A chatbot answers questions. An AI agent **does work**. It receives a goal (for example, “qualify this new lead and book a call if they fit”), decides which steps to take, uses tools such as your CRM, calendar or email, checks the results, and continues until the task is finished or it needs help. We explain the idea in depth in [AI agents for business explained](/blog/ai-agents-for-business-explained); here we focus on how to build one.',
    ),
    p(
      'Under the hood, nearly every business agent has the same five parts: a **model** that reasons in language, a set of **tools** it may call (search your knowledge base, create a ticket, send a draft), **instructions** that define its role and limits, **memory or context** about the customer and task, and an **orchestration layer** that runs the loop, logs every step and enforces permissions. Once you see an agent as these five parts, the project becomes much less mysterious.',
    ),
    table(
      'Chatbot, workflow automation and AI agent compared',
      ['', 'Chatbot', 'Fixed automation', 'AI agent'],
      [
        ['Handles', 'Conversations', 'Predictable, rule-based steps', 'Variable tasks that need judgement'],
        ['Decides its own steps', 'No', 'No', 'Yes, within limits'],
        ['Uses business tools', 'Rarely', 'Yes, as scripted', 'Yes, chosen as needed'],
        ['Best for', 'FAQs and support', 'Repeatable processes', 'Messy inputs and multi-step jobs'],
        ['Main risk', 'Wrong answers', 'Breaks when inputs change', 'Wrong actions, so it needs guardrails'],
      ],
    ),

    h2('Step 1: Pick one narrow job'),
    p(
      'The most common reason agent projects fail is ambition. “An agent that runs customer service” is a programme, not a project. “An agent that reads incoming support emails, drafts a reply from our help centre, and attaches the right order details” is a project you can finish in weeks. Choose a job with these traits: it happens often, it follows a recognisable pattern, the inputs are digital, the cost of an occasional mistake is manageable, and someone on your team can say clearly what a good result looks like.',
    ),
    checklist(
      'A good first agent task',
      [
        'Happens at least dozens of times a week',
        'Currently done by a person following a mental checklist',
        'Inputs arrive as text, email, forms or documents',
        'Mistakes are reversible or reviewed before they matter',
        'Success can be measured (minutes saved, tickets resolved, leads booked)',
        'You already have examples of good outcomes to learn from',
      ],
    ),
    callout(
      'tip',
      'Shadow the human first',
      'Before writing any code, sit with the person who does the task today. Write down every step, every system they open and every judgement call. That document becomes your agent specification and exposes tasks that are not ready for automation.',
    ),

    h2('Step 2: Map the tools and data it needs'),
    p(
      'An agent is only as useful as what it can reach. List the systems involved: CRM, inbox, calendar, help centre, order database, payment platform, spreadsheet. For each, decide whether the agent needs to **read**, **write** or both, and what the smallest safe permission looks like. Reading a customer’s order status is low risk; issuing a refund is not. This is where [API integration](/blog/what-is-api-integration) work usually takes the largest share of the budget, because every tool needs a reliable, secured connection.',
    ),
    p(
      'Then look at your knowledge. If the agent must answer from company policies, product details or past tickets, that content has to be organised, current and retrievable. Our guide on [training a chatbot on your business data](/blog/train-a-chatbot-on-your-business-data) covers how to prepare it. Messy, contradictory documents produce messy, contradictory agents, so clean-up here pays back immediately.',
    ),
    ul(
      '**Read-only tools first:** search, look up, summarise.',
      '**Draft-only write tools next:** the agent prepares an email or record that a person approves.',
      '**Direct write tools last:** only for low-risk, well-tested actions.',
    ),

    h2('Step 3: Choose the build approach'),
    p(
      'There are three realistic routes, and the right one depends on your volume, sensitivity and how unusual your process is.',
    ),
    compare(
      'No-code platform or custom build?',
      {
        title: 'No-code / low-code agent platforms',
        points: [
          'Fastest to a working prototype, often in days',
          'Lower upfront cost, with monthly subscription fees',
          'Limited control over logic, logging and data location',
          'Good for simple, low-risk tasks and experiments',
        ],
      },
      {
        title: 'Custom-built agent',
        points: [
          'Fits your exact workflow, systems and security rules',
          'Full control of prompts, tools, logging and hosting',
          'Higher upfront cost, lower cost at high volume',
          'Right for customer-facing or sensitive processes',
        ],
      },
    ),
    p(
      'Many teams do both: prove the idea on a no-code tool, then rebuild the proven workflow as custom software once it is clearly valuable. The comparison with simple workflow tools is similar to the one in our guide to [Zapier, Make or custom automation](/blog/zapier-make-or-custom-automation).',
    ),

    h2('Step 4: Write instructions and guardrails'),
    p(
      'The agent’s instructions are its job description. Good ones state its role, the goal, the tone, the tools available and, just as importantly, what it must **not** do. Ambiguity is the enemy: “be helpful” is useless, while “never promise delivery dates; if asked, link the tracking page and offer a human callback” is precise and testable.',
    ),
    h3('Guardrails that matter in practice'),
    checklist(
      'Minimum safety rules for a business agent',
      [
        'Least-privilege access: the agent can only use the tools and records its job requires',
        'Human approval for refunds, deletions, contracts, outbound messages to new contacts and anything involving money',
        'Spending, rate and volume limits (for example, no more than ten emails per run)',
        'A clear escalation rule: when unsure, stop and hand over to a person with context',
        'No sensitive data in prompts beyond what is needed; follow your [AI privacy and security](/blog/ai-privacy-and-security-for-small-business) policy',
        'Full logging of inputs, tool calls, outputs and who approved what',
      ],
    ),

    h2('Step 5: Build the loop and the tools'),
    p(
      'Technically, the agent runs a loop: read the goal, decide the next action, call a tool, read the result, repeat until done. Each tool is a small function with a clear name, description and strict input format, such as `find_order(email)` or `create_draft_reply(ticket_id, text)`. Clean, narrow tools make agents dramatically more reliable than a few vague, powerful ones. Developers also add timeouts, retries and a maximum number of steps so a confused agent cannot loop forever.',
    ),
    steps(
      'The agent loop',
      [
        { title: 'Receive', text: 'A trigger arrives: email, form, schedule or message.' },
        { title: 'Plan', text: 'The model decides the next step using instructions and context.' },
        { title: 'Act', text: 'It calls a tool: search, look up, draft or update.' },
        { title: 'Check', text: 'Results are validated by code and, where needed, a person.' },
        { title: 'Finish or escalate', text: 'Done and logged, or handed to a human with a summary.' },
      ],
    ),

    h2('Step 6: Test like you mean it'),
    p(
      'Do not judge an agent from three impressive demos. Build a **test set** of at least fifty real examples, including awkward ones: angry customers, missing information, duplicate requests, attempts to trick it. Run the agent against them, score the results against what a skilled person would do, and keep the set so you can re-run it after every change. Pay special attention to failure modes: what does the agent do when a tool errors, when the data is missing, or when asked something outside its remit?',
    ),
    ul(
      '**Accuracy:** was the result correct and complete?',
      '**Safety:** did it stay inside its permissions and refuse what it should?',
      '**Cost and speed:** what did each run cost and how long did it take?',
      '**Tone:** does it sound like your business?',
    ),

    h2('Step 7: Launch gradually'),
    p(
      'Release in stages. Start in **shadow mode**, where the agent produces drafts but people do the real work and compare. Move to **assisted mode**, where people approve each action with one click. Only then allow **autonomous mode** for the specific, proven actions, with sampling checks and alerts. Track resolution rate, error rate, time saved and user satisfaction against the baseline you recorded in Step 1. For a deeper look at tracking returns, see our guide on [business process automation](/blog/business-process-automation-where-to-start).',
    ),
    callout(
      'warn',
      'Tell people it is an AI',
      'Customers and staff should know when they are dealing with an automated agent, and always have a route to a person. It is good practice, builds trust and, in some regions, a legal expectation.',
    ),

    h2('What does it cost?'),
    p(
      'Costs split into build and run. **Build** depends on the number of tools and integrations, the data preparation required, the testing depth and the interface (email, chat, voice). A focused single-task agent is a small project; a multi-system agent with approvals and dashboards is a mid-sized one. **Run** costs include model usage, hosting, monitoring and ongoing tuning. Model usage is typically priced per volume of text processed, so cost scales with how often the agent runs and how much context each run needs. Ask any vendor for an estimate at your expected monthly volume, not just the build quote.',
    ),

    h2('Common mistakes to avoid'),
    ul(
      '**Starting too broad:** a general “assistant” with fifty tools is hard to test and trust.',
      '**Skipping the baseline:** without before-and-after numbers, you cannot prove value.',
      '**Giving write access too early:** earn autonomy through evidence.',
      '**Ignoring maintenance:** prompts, tools and knowledge drift as your business changes.',
      '**Forgetting the human experience:** make handover and approval effortless.',
    ),
    cta(
      'Ready to turn a repetitive process into a working AI agent? We scope, build and safely launch business agents, starting with one task that proves the value.',
      '/contact',
      'Plan your AI agent',
    ),
  ],
  faqs: [
    {
      question: 'What is the difference between an AI agent and a chatbot?',
      answer:
        'A chatbot mainly holds conversations and answers questions. An AI agent is given a goal and can plan steps and use tools, such as your CRM, email or calendar, to complete tasks, ideally within clear limits and with human approval for sensitive actions.',
    },
    {
      question: 'Do I need to code to build an AI agent?',
      answer:
        'Not for simple, low-risk tasks: no-code platforms can produce a working prototype quickly. For customer-facing, sensitive or high-volume processes, a custom build gives you better control over logic, security, logging and costs.',
    },
    {
      question: 'How much does an AI agent cost to run per month?',
      answer:
        'It depends on how often it runs and how much text it processes per run, plus hosting and monitoring. A narrow agent handling a few hundred tasks a month typically costs far less than the staff time it saves; ask for an estimate based on your expected volume.',
    },
    {
      question: 'How long does it take to build a business AI agent?',
      answer:
        'A narrow, single-task agent with a few integrations can often be piloted in a few weeks. Larger agents with many systems, approvals and reporting take longer, mostly because of integration, data preparation and testing.',
    },
    {
      question: 'Is it safe to let an AI agent take actions on its own?',
      answer:
        'Only after it has proven itself. Start read-only, move to draft-and-approve, and allow autonomous actions only for low-risk, well-tested tasks, with permissions, spending limits, logging and escalation rules in place.',
    },
  ],
}
