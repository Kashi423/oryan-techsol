import { callout, checklist, compare, cta, h2, p, steps, table } from './helpers.js'

export default {
  slug: 'ai-customer-support-automation-guide',
  title: 'AI Customer Support Automation: What to Automate, What to Keep Human',
  shortTitle: 'AI customer support automation',
  description:
    'How to automate customer support with AI safely: the best tasks to automate, where humans must stay, a rollout plan, metrics to track and mistakes to avoid.',
  date: '2026-10-19',
  updated: '2026-10-19',
  category: 'AI Bots',
  keywords:
    'AI customer support automation, automate customer service, AI support agent, helpdesk automation, chatbot ticket triage, customer support AI best practices',
  service: { label: 'AI bots & automation services', to: '/ai-bots' },
  related: ['ai-chatbot-vs-live-chat-for-small-business', 'train-a-chatbot-on-your-business-data', 'ai-agents-for-business-explained'],
  intro:
    'Support teams everywhere face the same squeeze: customers want faster answers, at any hour, on more channels — while headcount stays flat. AI can take a meaningful share of the repetitive work, but the businesses that succeed are not the ones that automate the most; they are the ones that automate the right things and design a graceful path to a human for everything else. This guide shows which support tasks to automate, which to keep human, and how to roll it out without hurting the customer experience.',
  takeaways: [
    'Automate the repetitive and rules-based: FAQs, order status, ticket tagging and routing, drafting replies.',
    'Keep humans for emotional, high-stakes, ambiguous and relationship-critical conversations.',
    'The best systems are assistive: AI drafts and routes, people approve and handle exceptions.',
    'Track resolution quality and satisfaction, not just how many chats the bot handled.',
    'Roll out in stages — suggest-only first, then limited autonomy — and keep reading real conversations.',
  ],
  blocks: [
    h2('Where AI helps most in support'),
    table(
      'Support tasks and how suited they are to automation',
      ['Task', 'Automate?', 'How'],
      [
        ['Answering common questions (hours, shipping, returns)', 'Yes', 'Chatbot grounded in your content'],
        ['Order, booking or account status lookups', 'Yes', 'Bot connected to your systems via API'],
        ['Tagging, prioritising and routing tickets', 'Yes', 'AI classification into queues'],
        ['Drafting replies for agents', 'Assist', 'AI proposes, a person edits and sends'],
        ['Summarising long threads', 'Assist', 'AI summary at the top of the ticket'],
        ['Refunds, exceptions, complaints', 'Mostly human', 'Escalate with context; humans decide'],
        ['Emotionally sensitive or high-value customers', 'Human', 'Route straight to experienced staff'],
      ],
    ),
    p(
      'The pattern is consistent: AI excels where the answer exists in your content or systems and the stakes are low; people excel where empathy, judgement or authority is needed. For the underlying choice between bots and live agents, see [AI chatbot vs. live chat](/blog/ai-chatbot-vs-live-chat-for-small-business).',
    ),

    h2('Four building blocks of an automated support stack'),
    steps(
      'How the pieces fit',
      [
        { title: 'Self-service answers', text: 'A grounded chatbot and help centre resolve common questions instantly.' },
        { title: 'Smart intake', text: 'AI captures the issue, order number and urgency before a human sees it.' },
        { title: 'Routing', text: 'Tickets are classified and sent to the right queue or specialist.' },
        { title: 'Agent assist', text: 'Suggested replies, summaries and knowledge snippets speed up human work.' },
      ],
    ),
    callout(
      'tip',
      'Start with agent assist',
      'Letting AI draft replies that your team approves is the lowest-risk way to begin. Quality improves, speed rises and you learn what the AI gets wrong before customers ever see it.',
    ),

    h2('Where humans must stay in the loop'),
    compare(
      'Bot-led vs. human-led conversations',
      {
        title: 'Let the bot lead',
        points: [
          'Clear, factual, answerable questions',
          'Status checks and simple account changes',
          'Collecting details before handover',
          'Out-of-hours coverage for routine needs',
        ],
      },
      {
        title: 'Send to a person',
        points: [
          'Complaints, cancellations and refunds',
          'Anything involving safety, health, legal or money disputes',
          'Customers who ask for a human or sound distressed',
          'Cases the bot is not confident about',
        ],
      },
    ),

    h2('A staged rollout plan'),
    steps(
      'From pilot to scale',
      [
        { title: 'Analyse tickets', text: 'Find the top 20 request types and how often each occurs.' },
        { title: 'Prepare content', text: 'Write clear, current answers — see [training a chatbot on your data](/blog/train-a-chatbot-on-your-business-data).' },
        { title: 'Pilot in suggest-only', text: 'AI drafts; agents review. Measure accuracy.' },
        { title: 'Automate the safest', text: 'Let the bot resolve the highest-volume, lowest-risk requests alone.' },
        { title: 'Review weekly', text: 'Read conversations, fix gaps, expand carefully.' },
      ],
    ),

    h2('Measure what matters'),
    table(
      'Support automation metrics',
      ['Metric', 'Why it matters'],
      [
        ['Resolution rate (without human)', 'Share of conversations actually solved, not just handled'],
        ['Customer satisfaction (CSAT)', 'Whether customers are happy with bot and human help'],
        ['First response and resolution time', 'Speed improvements customers feel'],
        ['Escalation quality', 'Handovers arrive with context and the right topic'],
        ['Re-contact rate', 'Customers returning because the first answer failed'],
        ['Cost per resolved issue', 'The true efficiency measure'],
      ],
    ),

    h2('Mistakes that damage trust'),
    checklist(
      'Common automation mistakes',
      [
        'Hiding the human option or making it hard to reach',
        'Letting the bot guess at policies, prices or deadlines',
        'Measuring deflection instead of resolution',
        'Training on outdated or contradictory content',
        'Not telling customers they are talking to an automated assistant',
        'Skipping privacy review of what customer data the AI sees',
        'Launching everywhere at once instead of piloting',
      ],
    ),
    p(
      'Support is often the first place businesses meet the wider idea of AI that can *act*, not just answer — the subject of [AI agents for business](/blog/ai-agents-for-business-explained).',
    ),
    cta(
      'Want to see which of your support requests could be automated safely? Share a sample of tickets and we will map the quick wins and the no-go areas.',
      '/contact',
      'Review my support workflow',
    ),
  ],
  faqs: [
    {
      question: 'What customer support tasks can AI automate?',
      answer:
        'Answering common questions, checking order or booking status, tagging and routing tickets, drafting replies for agents and summarising long conversations are all good candidates.',
    },
    {
      question: 'Will AI replace my support team?',
      answer:
        'It is better used to remove repetitive work so your team can focus on complex, sensitive and high-value conversations. Humans remain essential for judgement and empathy.',
    },
    {
      question: 'How do I start with AI in customer support?',
      answer:
        'Analyse your ticket types, prepare accurate content, and begin in suggest-only mode where AI drafts and agents approve. Automate the safest, highest-volume requests next.',
    },
    {
      question: 'How do I measure success?',
      answer:
        'Track resolution rate, customer satisfaction, response and resolution times, re-contact rate and cost per resolved issue — not just the number of chats the bot handled.',
    },
    {
      question: 'What are the risks of AI support?',
      answer:
        'Wrong or invented answers, poor handovers, privacy lapses and frustrated customers who cannot reach a person. Ground the AI in approved content, set clear escalation rules and review conversations regularly.',
    },
  ],
}
