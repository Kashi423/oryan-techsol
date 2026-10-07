import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'train-a-chatbot-on-your-business-data',
  title: 'How to Train a Chatbot on Your Own Business Data (Without Making It Hallucinate)',
  shortTitle: 'Train a chatbot on your data',
  description:
    'How a business chatbot learns from your own content: RAG vs fine-tuning, preparing data, guardrails against wrong answers, testing and keeping it up to date.',
  date: '2026-10-11',
  updated: '2026-10-11',
  category: 'AI Bots',
  keywords:
    'train chatbot on business data, RAG chatbot, retrieval augmented generation for business, custom AI chatbot, chatbot knowledge base, stop chatbot hallucination, fine-tuning vs RAG',
  service: { label: 'AI bots & automation services', to: '/ai-bots' },
  related: ['ai-chatbot-vs-live-chat-for-small-business', 'ai-agents-for-business-explained', 'what-is-api-integration'],
  intro:
    'A generic AI model knows a great deal about the world and nothing about your prices, policies, products or customers. To be useful, a business chatbot needs access to your own information — and rules about what to do when it does not know. “Training” is the word most people use, but for most business bots the technique is not training at all: it is giving the model the right documents at the right moment. This guide explains how that works, how to prepare your data, and how to keep answers accurate.',
  takeaways: [
    'Most business chatbots use retrieval-augmented generation (RAG): they look up relevant passages from your content, then answer using only those.',
    'Fine-tuning changes how a model writes or behaves; it is rarely the right way to teach it your facts.',
    'Answer quality depends on your source content — clear, current, well-organised documents beat a bigger model.',
    'Guardrails matter: tell the bot to say “I’m not sure” and hand over to a person instead of guessing.',
    'Test with real questions, review conversations regularly and treat the bot’s knowledge as a living asset.',
  ],
  blocks: [
    h2('“Training” a chatbot: what people usually mean'),
    p(
      'When a business owner says “train it on our data”, they usually want the bot to answer questions about *their* company accurately. There are two main techniques, and they solve different problems.',
    ),
    compare(
      'RAG vs. fine-tuning',
      {
        title: 'Retrieval-augmented generation (RAG)',
        points: [
          'Looks up relevant passages from your documents for every question',
          'Answers are grounded in your current content',
          'Update a document and the bot knows immediately',
          'Can cite which source an answer came from',
        ],
      },
      {
        title: 'Fine-tuning',
        points: [
          'Adjusts the model’s style, tone or task behaviour',
          'Needs many carefully prepared examples',
          'Facts are baked in and go stale when your business changes',
          'Harder to explain or correct a specific wrong answer',
        ],
      },
      'For facts that change — prices, hours, policies, product details — RAG is almost always the better fit.',
    ),

    h2('How a RAG chatbot answers a question'),
    steps(
      'From question to grounded answer',
      [
        { title: 'Question', text: 'A visitor asks, “Do you offer same-day delivery?”' },
        { title: 'Search', text: 'The system finds the most relevant passages in your content.' },
        { title: 'Assemble', text: 'It gives the model the question plus those passages and clear instructions.' },
        { title: 'Answer', text: 'The model replies using only the supplied material.' },
        { title: 'Fallback', text: 'If nothing relevant is found, it says so and offers a person.' },
      ],
    ),
    p(
      'The quality of step two — finding the right passage — decides how good the bot is. That is why preparing your content matters more than choosing the newest model.',
    ),

    h2('Step 1: Gather and clean your knowledge'),
    p('Start with what customers actually ask, then collect the documents that answer those questions.'),
    ul(
      '**FAQs, policies and terms:** returns, delivery, cancellations, warranties.',
      '**Product or service details:** descriptions, specifications, what is and is not included.',
      '**Pricing structure:** published prices or how pricing works (see the warning below).',
      '**Process explanations:** how ordering, onboarding or booking works.',
      '**Past support conversations:** the real wording customers use, to spot gaps.',
    ),
    callout(
      'warn',
      'Never let a bot invent prices or promises',
      'If a price, deadline or guarantee is not in the approved content, the bot must not state one. Configure it to say a person will confirm — and hand the conversation over with context.',
    ),
    table(
      'Source content: good vs. problematic',
      ['Good source', 'Why it works', 'Problematic source', 'Why it fails'],
      [
        ['Short, single-topic pages', 'Easy to retrieve precisely', 'Huge PDFs with mixed topics', 'Relevant passage is hard to isolate'],
        ['Current, dated documents', 'Answers stay accurate', 'Outdated policies still lying around', 'Bot repeats old rules'],
        ['Plain-language answers', 'Clear for customers', 'Internal jargon and acronyms', 'Confusing replies'],
        ['One source of truth', 'No contradictions', 'Conflicting versions', 'Inconsistent answers'],
      ],
    ),

    h2('Step 2: Set the rules (guardrails)'),
    p('A grounded bot also needs written instructions about behaviour. Good ones cover:'),
    checklist(
      'Chatbot guardrails to define',
      [
        'Answer only from the supplied material; otherwise say you are not sure',
        'Never quote prices, discounts or deadlines that are not in the content',
        'Tone of voice and how to introduce itself as an automated assistant',
        'When and how to hand over to a person, and what to pass along',
        'Topics to decline (legal, medical or financial advice, for example)',
        'How to handle personal data and when to ask for contact details',
      ],
    ),

    h2('Step 3: Connect it to your systems'),
    p(
      'A bot that only answers questions is useful; one that can check an order, book a slot or create a lead in your CRM is valuable. That requires secure connections to your tools — the topic of our guide to [API integration](/blog/what-is-api-integration). Start read-only (checking status) before allowing actions (changing records), and keep a person in the loop for anything consequential, as we discuss in [AI agents for business](/blog/ai-agents-for-business-explained).',
    ),

    h2('Step 4: Test before you launch'),
    h3('Build a test set from real questions'),
    p(
      'Collect 50–100 questions customers genuinely ask, including awkward ones: misspellings, vague wording, questions the bot should refuse, and questions your content does not cover. Run them all, mark each answer correct, wrong or unsafe, then fix the content or the rules and re-run. Repeat after every significant change.',
    ),
    table(
      'What to check in each answer',
      ['Check', 'Pass looks like'],
      [
        ['Accuracy', 'Matches your current content exactly'],
        ['Honesty', 'Admits when it does not know'],
        ['Safety', 'Declines out-of-scope requests politely'],
        ['Tone', 'Sounds like your brand; clear and concise'],
        ['Handover', 'Escalates sensitive cases with context'],
      ],
    ),

    h2('Step 5: Keep it accurate over time'),
    ul(
      'Name an owner for the bot’s knowledge — someone who updates it when prices, policies or offers change.',
      'Read a sample of real conversations every week at first; fix wrong answers at the source.',
      'Track unanswered questions: they are a to-do list for new content.',
      'Review privacy: what is stored, for how long, and who can see it (see our guide on [chatbots vs. live chat](/blog/ai-chatbot-vs-live-chat-for-small-business)).',
    ),
    cta(
      'Want a chatbot that answers from your own content — and knows when to hand over? We will review your material and show you what a grounded assistant would handle.',
      '/contact',
      'Talk to us about a custom chatbot',
    ),
  ],
  faqs: [
    {
      question: 'Do I need to train an AI model to make a business chatbot?',
      answer:
        'Usually not. Most business chatbots use retrieval-augmented generation (RAG): they search your documents and have a pre-trained model answer from them. This keeps answers current without retraining.',
    },
    {
      question: 'What is the difference between RAG and fine-tuning?',
      answer:
        'RAG supplies relevant passages from your content at question time, so facts stay current. Fine-tuning adjusts a model’s behaviour or style using examples, and is poor at storing facts that change.',
    },
    {
      question: 'How do I stop a chatbot from making things up?',
      answer:
        'Ground it in approved content, instruct it to say it is not sure when the answer is not in the material, forbid invented prices or promises, test with real questions, and review conversations regularly.',
    },
    {
      question: 'What data should I give a business chatbot?',
      answer:
        'FAQs, policies, product or service details, pricing structure, process descriptions and the wording of real customer questions. Keep documents short, current and consistent.',
    },
    {
      question: 'Is it safe to put customer data into a chatbot?',
      answer:
        'Only with care: minimise what you share, understand where data is processed and stored, avoid sensitive information in the training content, and meet your privacy obligations. Ask any provider how data is handled.',
    },
  ],
}
