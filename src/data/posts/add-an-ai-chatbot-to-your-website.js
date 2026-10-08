import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'add-an-ai-chatbot-to-your-website',
  title: 'How to Add an AI Chatbot to Your Website: No-Code and Custom Options',
  shortTitle: 'Add an AI chatbot to your website',
  description:
    'How to add an AI chatbot to your website: no-code widgets vs custom builds, setup steps, training data, design, SEO and speed impact, privacy and costs.',
  date: '2026-11-11',
  updated: '2026-11-11',
  category: 'AI Bots',
  keywords:
    'add ai chatbot to website, website chatbot setup, best ai chatbot for small business website, no code chatbot, custom website chatbot, chatbot seo impact, embed chatbot',
  service: { label: 'AI bots & automation services', to: '/ai-bots' },
  related: ['ai-chatbot-vs-live-chat-for-small-business', 'train-a-chatbot-on-your-business-data', 'ai-customer-support-automation-guide', 'core-web-vitals-explained'],
  intro:
    'Adding an AI chatbot to a website used to mean a long project. Today you can paste a snippet of code and have a widget answering visitors in minutes. That ease is a trap as well as a gift: it is just as easy to launch a bot that gives wrong answers, slows your pages, ignores privacy rules and annoys the very visitors you hoped to help. This guide shows how to add a chatbot properly, comparing no-code tools with custom builds, and covers the setup steps, content preparation, design, speed and SEO impact, privacy and costs, so your chatbot earns leads instead of losing them.',
  takeaways: [
    'Decide the chatbot’s job first: answer questions, capture leads, book calls or support customers.',
    'No-code widgets are fast and cheap to start; custom builds win on control, integration and brand fit.',
    'Your chatbot is only as good as the content you give it, so prepare accurate, current knowledge.',
    'Load the widget without hurting speed, and never let it replace crawlable page content.',
    'Disclose that it is an AI, protect visitor data and always offer a path to a human.',
  ],
  blocks: [
    h2('Start with the job, not the tool'),
    p(
      'The best chatbots do one or two things well. Before comparing products, write down what success looks like. Do you want visitors to find answers without emailing you? To leave their details when you are closed? To book a consultation? To get help with an order? Each goal needs different content, integrations and conversation design, and each is measured differently. A bot with a clear purpose, such as “answer pricing and service questions, then offer to book a call”, is far easier to build, test and improve than one that is expected to “handle everything”.',
    ),
    table(
      'Common website chatbot goals',
      ['Goal', 'What the bot does', 'How to measure it'],
      [
        ['Answer questions', 'Finds answers in your content', 'Resolution rate, fewer support emails'],
        ['Capture leads', 'Asks qualifying questions, collects contact details', 'Leads per week, lead quality'],
        ['Book meetings', 'Checks availability and schedules calls', 'Bookings per 100 chats'],
        ['Support customers', 'Looks up orders and common issues', 'Tickets deflected, satisfaction'],
        ['Guide shoppers', 'Recommends products and answers sizing or delivery questions', 'Conversion rate, cart value'],
      ],
    ),

    h2('Option 1: No-code chatbot widgets'),
    p(
      'Many platforms let you create a chatbot by uploading documents or pointing at your website, then adding a script to your pages. You configure the look and behaviour in a dashboard. This is the quickest way to learn what your visitors actually ask, and it is a sensible first step for small sites with straightforward needs.',
    ),
    ul(
      '**Pros:** live in hours, no developer needed, predictable monthly pricing, built-in analytics and live-chat handover.',
      '**Cons:** limited customisation, data held by a third party, integration depth varies, and a recurring fee that grows with usage or seats.',
      '**Watch for:** third-party scripts that slow the page, branding you cannot remove on lower plans, and unclear policies on how your data is used.',
    ),

    h2('Option 2: A custom-built chatbot'),
    p(
      'A custom chatbot is designed around your business. It can match your branding exactly, connect to your CRM, booking system, inventory or order database, follow your approval rules, and run on infrastructure you control. It is the right choice when the bot touches sensitive data, needs real actions, or when volume makes per-seat pricing expensive. The technology behind it, including how knowledge is retrieved, is covered in [RAG vs. fine-tuning](/blog/rag-vs-fine-tuning) and [training a chatbot on your business data](/blog/train-a-chatbot-on-your-business-data).',
    ),
    compare(
      'No-code or custom?',
      {
        title: 'Choose no-code if…',
        points: [
          'You want to test demand quickly',
          'Questions are mostly FAQs from your own content',
          'No sensitive data or system actions are needed',
          'Budget and time are tight',
        ],
      },
      {
        title: 'Choose custom if…',
        points: [
          'It must connect to CRM, booking or order systems',
          'Brand experience and tone are critical',
          'You handle personal or regulated data',
          'Volume or complexity makes subscriptions costly',
        ],
      },
    ),

    h2('Step-by-step: adding a chatbot to your site'),
    steps(
      'From idea to live widget',
      [
        { title: 'Define the goal', text: 'Pick one primary job and the metric that proves it works.' },
        { title: 'Gather the knowledge', text: 'Collect accurate FAQs, policies, prices and service pages.' },
        { title: 'Build or configure', text: 'Set up the bot, its instructions, tone and hand-over rules.' },
        { title: 'Test properly', text: 'Ask it fifty real questions, including tricky and off-topic ones.' },
        { title: 'Install the widget', text: 'Add the snippet or integrate it into your site code.' },
        { title: 'Launch and review', text: 'Read real conversations weekly and fix gaps.' },
      ],
    ),
    h3('Prepare the content properly'),
    p(
      'Out-of-date pricing or contradictory policy pages will be repeated confidently by a chatbot. Before you connect anything, clean up: remove old versions, resolve conflicts, and write short, plain answers to the questions customers ask most. Treat this as a content project; it also improves your website’s own [SEO and helpfulness](/blog/technical-seo-checklist-for-business-websites).',
    ),
    h3('Write the instructions and guardrails'),
    p(
      'Tell the bot who it is, what it covers, what tone to use, and what it must not do: no discounts, no legal or medical advice, no promises about delivery dates. Instruct it to say when it does not know and to offer a human. Our guide to [AI customer support automation](/blog/ai-customer-support-automation-guide) goes deeper on handover design.',
    ),

    h2('Design and placement that work'),
    ul(
      '**A clear opening message:** say what the bot can help with (“Ask about pricing, timelines or book a call”).',
      '**Suggested first questions:** buttons reduce blank-page paralysis.',
      '**Smart placement:** show it where help is needed (pricing, checkout, contact), not as an intrusive pop-up on every page.',
      '**Mobile first:** a widget must not cover key buttons or content on small screens.',
      '**Visible human option:** “Talk to a person” should always be one tap away.',
      '**Accessibility:** keyboard operable, readable contrast and screen-reader friendly, as outlined in [website accessibility basics](/blog/website-accessibility-basics).',
    ),

    h2('Speed and SEO: protect your rankings'),
    p(
      'A chatbot is extra JavaScript, and heavy widgets are a classic cause of poor Core Web Vitals. Load it **after** the main content, ideally on user interaction or after a short delay, and test your pages before and after installing it. Check [Core Web Vitals](/blog/core-web-vitals-explained) in the field data, not only in lab tests.',
    ),
    callout(
      'warn',
      'A chatbot is not content',
      'Search engines rely on the text on your pages. Never hide important information behind the chat window. If visitors keep asking the same question, publish the answer as a page or FAQ. That helps both people and search, and often reduces chat volume.',
    ),

    h2('Privacy and compliance'),
    checklist(
      'Before the bot goes live',
      [
        'Tell visitors they are talking to an AI assistant',
        'Link to your privacy policy and explain what chat data is stored',
        'Obtain consent where your region requires it for cookies or recordings',
        'Avoid collecting sensitive data in chat unless truly necessary and secured',
        'Check where the provider processes and stores data and whether it trains on it',
        'Set a retention period and a way to delete transcripts on request',
      ],
    ),
    p(
      'Our guide on [AI privacy and security for small business](/blog/ai-privacy-and-security-for-small-business) covers these questions in more detail.',
    ),

    h2('What to measure after launch'),
    ul(
      '**Conversations and completion rate:** are people getting what they came for?',
      '**Handover rate:** how often does the bot pass to a human, and why?',
      '**Leads and bookings:** the business outcome.',
      '**Unanswered questions:** your best source of new content and bot improvements.',
      '**Satisfaction:** a simple thumbs up or down after the chat.',
    ),
    p(
      'Review the transcripts weekly for the first month. You will quickly find missing knowledge, confusing wording and opportunities to automate more. If you are unsure whether a bot or live chat suits your team, compare them in [AI chatbot vs. live chat](/blog/ai-chatbot-vs-live-chat-for-small-business).',
    ),
    h2('Common mistakes to avoid'),
    ul(
      '**Launching without testing:** a bot that misquotes your prices does more harm than no bot.',
      '**Pop-ups on every page:** intrusive widgets annoy visitors and can hurt engagement.',
      '**No owner:** someone must be responsible for reading chats and updating knowledge each week.',
      '**Hiding the human option:** visitors with urgent or complex needs need a quick route to a person.',
      '**Measuring only chats:** judge success by leads, bookings and solved problems, not by message counts.',
    ),
    p(
      'A good chatbot is a living product. As your services, prices and customers change, update its knowledge and instructions, and keep improving the conversations that fail. Small, regular adjustments are what turn a gimmick into a dependable part of your sales and support.',
    ),
    cta(
      'Want a chatbot that fits your brand, answers accurately and feeds leads into your systems? We build and integrate website chatbots, from quick pilots to full custom assistants.',
      '/contact',
      'Add an AI chatbot to your site',
    ),
  ],
  faqs: [
    {
      question: 'What is the best AI chatbot for a small business website?',
      answer:
        'There is no single best: choose by goal. Simple FAQ and lead capture often suit a no-code widget, while bots that must use your CRM, bookings or orders, or handle sensitive data, are better built custom. Test with real questions before committing.',
    },
    {
      question: 'How long does it take to set up a chatbot?',
      answer:
        'A basic no-code chatbot can be live within hours, but plan days to prepare content and test properly. A custom chatbot with integrations typically takes weeks, depending on systems, data and approvals.',
    },
    {
      question: 'Will a chatbot hurt my SEO?',
      answer:
        'It can if the script slows your pages or if important content is only available inside the chat. Load the widget efficiently, check Core Web Vitals, and keep your answers published as normal page content.',
    },
    {
      question: 'How do I train a chatbot on my business information?',
      answer:
        'Provide accurate, current content such as FAQs, service pages and policies, usually through retrieval so the bot answers from those sources. Test it with real questions and fix gaps based on the conversations you review.',
    },
    {
      question: 'Do I need to tell visitors it is an AI?',
      answer:
        'You should. Disclosing it builds trust, avoids misleading visitors, and may be required in some regions. Also give an easy way to reach a human.',
    },
  ],
}
