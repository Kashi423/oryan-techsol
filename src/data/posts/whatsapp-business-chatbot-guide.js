import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'whatsapp-business-chatbot-guide',
  title: 'WhatsApp Business Chatbot: How It Works, Rules to Follow and Use Cases',
  shortTitle: 'WhatsApp business chatbot',
  description:
    'How to set up a WhatsApp chatbot for your business: app vs API, opt-in and 24-hour rules, message templates, best use cases and mistakes to avoid.',
  date: '2026-10-15',
  updated: '2026-10-15',
  category: 'AI Bots',
  keywords:
    'WhatsApp business chatbot, WhatsApp Business API, WhatsApp automation, WhatsApp chatbot for customer service, WhatsApp message templates, WhatsApp opt-in rules',
  service: { label: 'AI bots & automation services', to: '/ai-bots' },
  related: ['ai-chatbot-vs-live-chat-for-small-business', 'train-a-chatbot-on-your-business-data', 'ai-agents-for-business-explained'],
  intro:
    'In many countries your customers already live in WhatsApp. A chatbot there meets them where they are: they can ask a question, check an order or book an appointment in a conversation they already know, at any hour. But WhatsApp is not an open channel you can blast with messages — it has rules about consent, timing and templates, and breaking them can get your number restricted. This guide explains how a WhatsApp business chatbot works, the rules that matter, and where it genuinely earns its keep.',
  takeaways: [
    'Automated chatbots need the WhatsApp Business Platform (API), not just the free WhatsApp Business app.',
    'Customers must opt in; unsolicited promotional messaging breaks the rules and risks your number.',
    'Free-form replies are allowed inside a 24-hour window after the customer’s message; outside it you need pre-approved templates.',
    'Pricing and policies are set by Meta and change — always check the current terms.',
    'Best use cases: order updates, appointment reminders, FAQs and lead capture, with a clear handover to a person.',
  ],
  blocks: [
    h2('WhatsApp Business app vs. WhatsApp Business Platform'),
    p(
      'Two products share the name and are easy to confuse. The **WhatsApp Business app** is a free app for small businesses to chat manually, with quick replies and a catalogue. The **WhatsApp Business Platform** (the API) is for automation: it connects WhatsApp to software, so a chatbot can respond and systems can send notifications.',
    ),
    table(
      'Which do you need?',
      ['', 'WhatsApp Business app', 'WhatsApp Business Platform (API)'],
      [
        ['Best for', 'Small teams chatting by hand', 'Automation, chatbots, integrations'],
        ['Chatbot support', 'Basic auto-replies only', 'Full chatbots and AI assistants'],
        ['Multiple agents', 'Very limited', 'Yes, through a connected inbox'],
        ['Integrations (CRM, store)', 'No', 'Yes — see [API integration](/blog/what-is-api-integration)'],
        ['Setup', 'Install and go', 'Verified business account, usually via a provider'],
      ],
    ),
    p(
      'Most businesses reach the Platform through a **Business Solution Provider** or a development partner who handles the account, number verification and technical connection.',
    ),

    h2('The rules that matter'),
    callout(
      'warn',
      'Respect consent and timing',
      'WhatsApp expects people to have opted in to hear from you, and it limits when and how you can message them. Violations can lead to quality restrictions or a blocked number. Always read Meta’s current business and commerce policies.',
    ),
    h3('1. Opt-in'),
    p(
      'Customers must agree to receive messages from you on WhatsApp — for example by ticking a box at checkout, starting the conversation themselves or sending a keyword. Keep a record of how and when they opted in.',
    ),
    h3('2. The 24-hour customer-service window'),
    p(
      'When a customer messages you, a 24-hour window opens during which you can reply freely, including with a chatbot. After it closes, you can only message them with a **pre-approved template**.',
    ),
    h3('3. Message templates'),
    p(
      'Templates are structured messages (such as an appointment reminder or order update) submitted to WhatsApp for approval, with placeholders for details like name and date. They are how you start conversations or follow up after the window closes. Pricing is set by Meta, varies by message category and country, and changes — check the current rates before planning volumes.',
    ),

    h2('What a WhatsApp chatbot can do well'),
    ul(
      '**Answer FAQs instantly:** hours, delivery times, returns, how a service works.',
      '**Order and delivery updates:** pulled from your store or logistics system.',
      '**Appointment booking and reminders:** fewer no-shows with timely templates.',
      '**Lead capture:** collect name, need and timing, then pass a clean lead to your team.',
      '**Support triage:** gather details and route to the right person with the transcript.',
    ),
    compare(
      'Good fit vs. poor fit',
      {
        title: 'Good fit for WhatsApp automation',
        points: [
          'Customers already message you on WhatsApp',
          'High volume of repetitive questions',
          'Time-sensitive updates (delivery, bookings)',
          'Markets where WhatsApp is the default messenger',
        ],
      },
      {
        title: 'Think twice if…',
        tone: 'bad',
        points: [
          'Your audience rarely uses WhatsApp',
          'You plan to send bulk promotions without consent',
          'You have no one to handle escalations',
          'Conversations involve highly sensitive data',
        ],
      },
    ),

    h2('How to set it up'),
    steps(
      'From idea to a live WhatsApp bot',
      [
        { title: 'Map conversations', text: 'List the questions and tasks the bot should handle — and what needs a person.' },
        { title: 'Get API access', text: 'Create a verified business account and connect a number via a provider.' },
        { title: 'Build the bot', text: 'Ground it in your content ([how to train a chatbot on your data](/blog/train-a-chatbot-on-your-business-data)) and connect your systems.' },
        { title: 'Create templates', text: 'Submit reminders and updates for approval.' },
        { title: 'Pilot and review', text: 'Launch to a small group, read conversations, fix gaps, then expand.' },
      ],
    ),

    h2('Mistakes to avoid'),
    checklist(
      'WhatsApp chatbot pitfalls',
      [
        'Messaging people who never opted in',
        'No clear way to reach a human',
        'Letting the bot guess at prices or policies',
        'Ignoring template approval lead times',
        'Not telling people they are talking to an automated assistant',
        'Collecting more personal data than you need',
      ],
    ),
    p(
      'WhatsApp is one channel in a wider support strategy; for the bigger picture on bots and humans working together, read [AI chatbot vs. live chat](/blog/ai-chatbot-vs-live-chat-for-small-business).',
    ),
    cta(
      'Thinking about WhatsApp for customer service or bookings? We will tell you whether it fits your audience and what a first version would cover.',
      '/contact',
      'Plan a WhatsApp chatbot',
    ),
  ],
  faqs: [
    {
      question: 'Can I build a chatbot on the free WhatsApp Business app?',
      answer:
        'Only simple auto-replies. A real chatbot that connects to your systems needs the WhatsApp Business Platform (API), usually set up through a provider or development partner.',
    },
    {
      question: 'Do customers have to opt in?',
      answer:
        'Yes. Businesses should have customers’ consent to message them on WhatsApp, and keep a record of it. Unsolicited promotional messages can lead to restrictions.',
    },
    {
      question: 'What is the 24-hour window?',
      answer:
        'After a customer messages you, you can reply with free-form messages for 24 hours. After that, you can only contact them with pre-approved message templates.',
    },
    {
      question: 'How much does a WhatsApp chatbot cost?',
      answer:
        'Costs include the build, any provider fees and Meta’s per-message pricing, which varies by category and country and changes over time. Check current pricing and estimate your message volumes.',
    },
    {
      question: 'Can a WhatsApp chatbot hand over to a person?',
      answer:
        'Yes, and it should. A good setup transfers the conversation, with its history, to a team member when the bot reaches its limits or the customer asks for one.',
    },
  ],
}
