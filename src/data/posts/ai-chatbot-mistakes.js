import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'ai-chatbot-mistakes',
  title: 'AI Chatbot Mistakes That Cost You Customers (and How to Fix Them)',
  shortTitle: 'AI chatbot mistakes',
  description:
    'The most common AI chatbot mistakes, from wrong answers and no human handover to poor design and privacy gaps, with practical fixes and a quality checklist.',
  date: '2027-01-07',
  updated: '2027-01-07',
  category: 'AI Bots',
  keywords:
    'chatbot mistakes, why chatbots frustrate customers, chatbot best practices, measure chatbot performance, chatbot human handover, ai chatbot failure, improve customer service chatbot',
  service: { label: 'AI bots & automation services', to: '/ai-bots' },
  related: ['add-an-ai-chatbot-to-your-website', 'train-a-chatbot-on-your-business-data', 'ai-customer-support-automation-guide', 'ai-chatbot-vs-live-chat-for-small-business'],
  intro:
    'A good chatbot answers questions at midnight, qualifies leads while your team sleeps and resolves routine requests before a customer ever thinks of calling. A bad one makes people repeat themselves, gives confident wrong answers, traps them in loops and leaves a lasting impression that your business does not care. Surveys and personal experience agree that many customers have been frustrated by chatbots, and the cause is rarely the technology alone. It is a handful of avoidable design, content and operational mistakes. This guide lists the most common AI chatbot mistakes, explains why each one costs you customers, shows how to fix it and gives you a quality checklist and a way to measure whether your bot is helping or harming.',
  takeaways: [
    'Most chatbot failures come from poor content, unclear purpose, missing human handover and lack of testing, not from the AI model.',
    'A bot should do a few things well and know when to stop and pass to a person.',
    'Wrong answers are worse than no answers: ground the bot in accurate, current content and let it say it does not know.',
    'Measure resolution, handover quality and satisfaction, not just chat volume.',
    'Treat the chatbot as a product that needs an owner, regular review and continuous improvement.',
  ],
  blocks: [
    h2('Mistake 1: No clear purpose'),
    p(
      'Many chatbots are launched because “everyone has one”, with no defined job. The result is a generic assistant that greets visitors, answers a few FAQs, fails on anything else and has no way to tell whether it is succeeding. Without a purpose, you cannot decide what content it needs, what success looks like or which conversations it should hand over.',
    ),
    p(
      '**Fix:** choose one or two primary jobs, such as answering pricing and delivery questions, booking calls or tracking orders, and design everything around them. Write down the metric that will prove it works: leads captured, tickets deflected, bookings made.',
    ),

    h2('Mistake 2: Giving wrong answers confidently'),
    p(
      'AI models are fluent. That is both their strength and their danger: a bot can state an incorrect price, an outdated policy or an invented feature in a calm, convincing tone. Customers act on those answers, and you may be held to them. Hallucination is usually a content and design problem: the bot has no reliable source to answer from, or no instruction to admit uncertainty.',
    ),
    ul(
      'Ground the bot in approved, current content using retrieval, as explained in [how to train a chatbot on your business data](/blog/train-a-chatbot-on-your-business-data) and [RAG vs. fine-tuning](/blog/rag-vs-fine-tuning).',
      'Instruct it to answer only from supplied sources and to say “I am not sure” when it cannot find the answer.',
      'Show sources or links so customers can verify answers.',
      'Block commitments the bot cannot make, such as discounts, guarantees or delivery dates.',
      'Review conversations weekly and correct the content behind wrong answers.',
    ),
    callout(
      'warn',
      'Businesses can be held to what their bots say',
      'Courts and regulators in several places have treated chatbot statements as the company’s statements. Do not allow the bot to improvise on prices, terms or legal matters.',
    ),

    h2('Mistake 3: No easy way to reach a human'),
    p(
      'Nothing erodes trust faster than a bot that will not let go. Customers with urgent, emotional or complex problems need a person, and hiding the option, or looping them through the same menu, turns a small issue into a lost customer.',
    ),
    p(
      '**Fix:** make human handover obvious and easy. Offer it up front (“Talk to a person”), trigger it automatically when the bot fails twice, detects frustration or hits sensitive topics such as complaints, cancellations or payments, and pass along the conversation so the customer does not have to repeat themselves. Out of hours, offer a callback or a message with a clear response time. For the trade-offs between bots and live chat, see [AI chatbot vs. live chat](/blog/ai-chatbot-vs-live-chat-for-small-business).',
    ),

    h2('Mistake 4: Trying to do everything'),
    p(
      'A bot expected to handle every possible question tends to handle none of them well. Broad scope creates confusion, more wrong answers and a testing burden nobody can meet.',
    ),
    p(
      '**Fix:** start narrow and expand based on real conversations. Make clear at the start what the bot can help with, and gracefully route out-of-scope requests to the right place. A bot that does five things reliably beats one that attempts fifty badly.',
    ),

    h2('Mistake 5: Outdated or messy content'),
    p(
      'A chatbot is a mirror of your knowledge. If your website has conflicting prices, old policies and duplicate pages, the bot will repeat the confusion. Content that changes, such as opening hours, stock, promotions and terms, goes stale quickly unless someone owns it.',
    ),
    checklist(
      'Content hygiene',
      [
        'Remove duplicate, outdated and contradictory pages and documents',
        'Write short, plain answers to the top fifty customer questions',
        'Assign an owner for each content area with a review schedule',
        'Update the bot’s knowledge whenever prices, policies or products change',
        'Mark sources with dates so freshness can be checked',
        'Use real customer wording, not internal jargon',
      ],
    ),

    h2('Mistake 6: A robotic, impersonal experience'),
    p(
      'Walls of text, stiff corporate language and irrelevant canned replies make customers feel they are talking to a machine that does not understand them. Equally, pretending to be human is a mistake; it breaches trust and, in some places, rules on disclosure.',
    ),
    ul(
      '**Be honest:** introduce the bot as an automated assistant.',
      '**Keep replies short** and easy to scan, with buttons for common choices.',
      '**Match your brand voice** and be friendly without being gimmicky.',
      '**Acknowledge the problem** before jumping to solutions in support settings.',
      '**Handle typos, slang and mixed questions** gracefully.',
      '**Offer quick replies** and clear next steps.',
    ),

    h2('Mistake 7: Ignoring context and memory'),
    p(
      'Few things annoy customers more than being asked for the same information repeatedly, or being greeted as a stranger when they are logged in with an order history. A bot that cannot use context, such as the page the customer is on, their account or earlier messages, feels unintelligent.',
    ),
    p(
      '**Fix:** pass relevant context into the conversation: the current page, the customer’s identity and orders where appropriate and the earlier steps in the chat. Integrations with your order system or CRM, covered in [AI customer support automation](/blog/ai-customer-support-automation-guide), make answers specific rather than generic.',
    ),

    h2('Mistake 8: Poor placement and intrusive behaviour'),
    p(
      'A chat pop-up that appears instantly on every page, covers important buttons or blocks mobile content irritates visitors and may hurt conversions and page speed. Heavy widgets can slow your site, as discussed in [adding an AI chatbot to your website](/blog/add-an-ai-chatbot-to-your-website).',
    ),
    p(
      '**Fix:** show the bot where help is most valuable, such as pricing, checkout, contact and support pages, delay or soften proactive messages, keep it unobtrusive on mobile and load it efficiently.',
    ),

    h2('Mistake 9: No testing before launch'),
    p(
      'Many teams test a bot with a handful of friendly questions and launch. Real customers ask messy, emotional, ambiguous and sometimes hostile questions. Without systematic testing, you discover the failures in public.',
    ),
    steps(
      'A proper test routine',
      [
        { title: 'Build a test set', text: 'Fifty or more real questions, including edge cases and off-topic requests.' },
        { title: 'Define good answers', text: 'What should the bot say, and when should it hand over?' },
        { title: 'Test adversarially', text: 'Try to confuse it, make it break rules or reveal data.' },
        { title: 'Check handover', text: 'Does a human receive the conversation with context?' },
        { title: 'Re-test after changes', text: 'Run the set whenever content or prompts change.' },
      ],
    ),

    h2('Mistake 10: Neglecting privacy and security'),
    p(
      'Chat conversations often contain personal data, and a bot connected to your systems can expose information if permissions are loose. Customers may paste sensitive details; the bot may log them indefinitely; a vendor may use them to train models.',
    ),
    ul(
      'Tell users what data is collected and link your privacy policy.',
      'Avoid asking for sensitive data in chat unless necessary and secured.',
      'Give the bot least-privilege access and require authentication before it reveals account details.',
      'Check where data is stored, whether it is used for training and how long it is kept.',
      'Defend against prompt injection and attempts to extract confidential information.',
    ),
    p(
      'Our guide to [AI privacy and security for small business](/blog/ai-privacy-and-security-for-small-business) lists the questions to ask vendors.',
    ),

    h2('Mistake 11: Not measuring or improving'),
    p(
      'A bot left alone decays. Products change, customers ask new questions and the model’s behaviour may shift when providers update it. Without measurement and ownership, quality drifts down unnoticed.',
    ),
    table(
      'Metrics that show whether the bot helps',
      ['Metric', 'What it tells you'],
      [
        ['Resolution rate', 'Share of conversations solved without a human'],
        ['Handover rate and reasons', 'Where the bot fails or is out of scope'],
        ['Customer satisfaction (thumbs up/down or short survey)', 'Whether people found it helpful'],
        ['Fallback and “I do not know” rate', 'Gaps in content or understanding'],
        ['Conversion and lead quality', 'Business impact for sales bots'],
        ['Containment vs. repeat contacts', 'Whether “resolved” conversations really were'],
        ['Time to first useful answer', 'Speed and experience'],
      ],
    ),
    compare(
      'Healthy vs. unhealthy chatbot programmes',
      {
        title: 'Healthy',
        points: [
          'Clear owner and weekly review of conversations',
          'Content updated whenever the business changes',
          'Easy human handover with context',
          'Metrics tied to business outcomes',
        ],
      },
      {
        title: 'Unhealthy',
        tone: 'bad',
        points: [
          'Launched and forgotten',
          'No one reads transcripts',
          'Customers trapped in loops',
          'Success measured by chat volume only',
        ],
      },
    ),

    h2('A quality checklist before you launch'),
    checklist(
      'Chatbot readiness',
      [
        'A clear purpose and success metric',
        'Accurate, current knowledge with named content owners',
        'Instructions that forbid guessing and promises the business cannot keep',
        'Visible, easy handover to a person, with context passed along',
        'Tested on a large, realistic question set including edge cases',
        'Honest disclosure that it is an automated assistant',
        'Privacy policy link, data retention rules and vendor review completed',
        'Performance and mobile experience checked',
        'Analytics and a weekly review routine in place',
      ],
    ),
    p(
      'If your bot is already live and misbehaving, start with the transcripts: read fifty recent conversations, tag the failures by cause and fix the top three. Small changes to content and handover often produce big improvements.',
    ),
    cta(
      'Is your chatbot frustrating customers instead of helping them? We audit existing bots, fix content and handover and build assistants that actually resolve problems.',
      '/contact',
      'Get a chatbot audit',
    ),
  ],
  faqs: [
    {
      question: 'Why do chatbots frustrate customers?',
      answer:
        'Common causes are wrong or outdated answers, no easy way to reach a human, an unclear scope, impersonal or looping conversations and a lack of context about the customer. These are design and content problems that can be fixed.',
    },
    {
      question: 'How do I measure chatbot performance?',
      answer:
        'Track resolution rate, handover rate and reasons, customer satisfaction, fallback frequency and, for sales bots, leads and conversions. Review transcripts regularly to understand why metrics move.',
    },
    {
      question: 'When should a chatbot hand off to a human?',
      answer:
        'When it fails to understand twice, when the customer asks for a person, when they are frustrated or the topic is sensitive, such as complaints, cancellations or payments, or when the bot lacks reliable information.',
    },
    {
      question: 'Can a chatbot make legally binding statements?',
      answer:
        'Statements made by a company’s chatbot can be treated as the company’s statements. Prevent the bot from making promises, quoting terms or giving advice it is not authorised to give, and keep answers grounded in approved content.',
    },
    {
      question: 'How often should I update my chatbot?',
      answer:
        'Review conversations weekly at first and update content whenever your products, prices or policies change. Treat the bot as a living product with an owner.',
    },
  ],
}
