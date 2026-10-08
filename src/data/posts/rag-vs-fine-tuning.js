import { callout, checklist, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'rag-vs-fine-tuning',
  title: 'RAG vs. Fine-Tuning: Which Is Right for Your Company Data?',
  shortTitle: 'RAG vs. fine-tuning',
  description:
    'RAG or fine-tuning? Learn how each works, when to use which for company data, costs, accuracy, privacy trade-offs and how to avoid AI hallucinations.',
  date: '2026-11-09',
  updated: '2026-11-09',
  category: 'AI Bots',
  keywords:
    'rag vs fine tuning, retrieval augmented generation, fine tune llm on company data, ai chatbot with company documents, reduce ai hallucinations, custom ai knowledge base, rag for business',
  service: { label: 'AI bots & automation services', to: '/ai-bots' },
  related: ['train-a-chatbot-on-your-business-data', 'build-an-ai-agent-for-your-business', 'ai-privacy-and-security-for-small-business', 'ai-agents-for-business-explained'],
  intro:
    'You want an AI assistant that knows your products, policies and past projects. Two techniques come up in almost every conversation: retrieval-augmented generation (RAG) and fine-tuning. They sound similar, are often confused, and solve different problems. Choosing wrongly can cost you months and still leave you with an assistant that invents answers. This guide explains both in plain language, shows when each one wins, compares cost, accuracy and privacy, and gives a simple decision path so you can pick the right approach for your company data.',
  takeaways: [
    'RAG gives a model **access to your documents at answer time**; fine-tuning changes **how the model behaves**.',
    'For factual questions about changing company information, RAG is usually the better, cheaper and safer first choice.',
    'Fine-tuning shines for consistent style, format and specialised behaviour, not for teaching new facts.',
    'Many strong systems combine both, but start with RAG and good prompts before considering fine-tuning.',
    'Whatever you choose, quality of your source data, access control and testing decide the results.',
  ],
  blocks: [
    h2('The problem both techniques try to solve'),
    p(
      'General-purpose language models know a great deal about the world, but they know nothing about **your** pricing, contracts, internal procedures or last quarter’s tickets. Asked about them, they may guess confidently and be wrong, a failure usually called hallucination. To make a model useful for your business you must connect it to your knowledge somehow. RAG and fine-tuning are the two main ways to do that, and they work in fundamentally different ways.',
    ),

    h2('How RAG works'),
    p(
      'Retrieval-augmented generation keeps your knowledge **outside** the model. When someone asks a question, the system first searches your documents for the most relevant passages, then gives those passages to the model together with the question and tells it to answer using them. Think of an open-book exam: the model does not need to memorise your handbook, it just needs to read the right page before answering.',
    ),
    steps(
      'The RAG pipeline',
      [
        { title: 'Ingest', text: 'Documents are cleaned and split into small, meaningful chunks.' },
        { title: 'Index', text: 'Each chunk is converted into a searchable representation and stored.' },
        { title: 'Retrieve', text: 'A question triggers a search for the most relevant chunks.' },
        { title: 'Generate', text: 'The model answers using only the retrieved text.' },
        { title: 'Cite', text: 'The answer points to its sources so people can verify it.' },
      ],
    ),
    p(
      'Because the knowledge lives in your document store, updating the assistant means updating a document. Publish a new price list tonight and the assistant uses it tomorrow, with no retraining. You can also control **who may see what**: the search can respect permissions, so an employee only gets answers from files they are allowed to read.',
    ),

    h2('How fine-tuning works'),
    p(
      'Fine-tuning takes an existing model and trains it further on a set of example inputs and desired outputs, adjusting the model’s internal weights. The knowledge and behaviour become part of the model itself. It is more like sending a new hire on a training course: afterwards they act differently without needing to look things up for every task.',
    ),
    p(
      'This is powerful for **behaviour**: writing in your brand voice, always returning a specific JSON format, classifying tickets into your own categories, following a specialised reasoning style. It is a poor tool for **facts**. Models fine-tuned on documents tend to absorb them unreliably, cannot easily cite where an answer came from, and become out of date the moment your information changes. Removing or correcting a single fact later is awkward, because it is baked into the weights.',
    ),

    h2('Side-by-side comparison'),
    table(
      'RAG vs. fine-tuning',
      ['Factor', 'RAG', 'Fine-tuning'],
      [
        ['Best for', 'Answering from your documents and data', 'Consistent style, format or specialised behaviour'],
        ['Handles changing information', 'Excellent: update the documents', 'Poor: retrain to update'],
        ['Shows sources', 'Yes, can cite passages', 'No'],
        ['Upfront effort', 'Data preparation, search quality', 'Curated training examples, training runs'],
        ['Running cost', 'Search plus longer prompts per query', 'Often shorter prompts, but retraining costs'],
        ['Access control', 'Can follow document permissions', 'Hard: knowledge is in the model'],
        ['Hallucination risk on facts', 'Lower when grounded and tested', 'Higher'],
        ['Time to first version', 'Days to weeks', 'Weeks, plus data creation'],
      ],
      'General guidance. Actual results depend on data quality, model choice and implementation.',
    ),

    h2('When RAG is the right choice'),
    ul(
      'Your knowledge changes often: prices, policies, stock, documentation, tickets.',
      'People need **verifiable** answers with a source link.',
      'Different users should see different information.',
      'You have a lot of reference material but few training examples.',
      'You want to start quickly and prove value before investing further.',
    ),
    p(
      'This covers the large majority of business assistants: support bots, internal helpdesks, sales enablement tools and policy look-ups. Our guide on [training a chatbot on your business data](/blog/train-a-chatbot-on-your-business-data) walks through the practical preparation.',
    ),

    h2('When fine-tuning earns its place'),
    ul(
      'You need a **very consistent output format** or tone that prompting alone cannot hold.',
      'You run a high volume of narrow tasks (classification, extraction, tagging) where a smaller tuned model can be cheaper and faster.',
      'The task needs specialised terminology or reasoning patterns that are not in general models.',
      'You have hundreds or thousands of high-quality, reviewed examples of ideal outputs.',
    ),
    callout(
      'note',
      'A useful rule of thumb',
      'Use RAG to teach the model **what to know**. Use fine-tuning to teach it **how to behave**. If your problem is “it does not know our facts”, you almost certainly want RAG.',
    ),

    h2('Using both together'),
    p(
      'The approaches are complementary. A common mature design uses RAG to fetch the right facts and a lightly fine-tuned model to present them in your house style and structure. Resist the urge to start there: it doubles the moving parts. Begin with RAG and strong instructions, measure the gaps, and add fine-tuning only to fix a specific, demonstrated weakness.',
    ),

    h2('Reducing hallucinations in practice'),
    p(
      'Whichever route you take, accuracy comes from engineering discipline rather than magic. The following habits make the biggest difference to the reliability of an assistant built on company data.',
    ),
    checklist(
      'Practical accuracy checklist',
      [
        'Clean the sources first: remove duplicates, outdated versions and contradictions',
        'Split documents sensibly so each chunk makes sense on its own',
        'Instruct the model to answer only from the supplied text and to say “I do not know” otherwise',
        'Require citations and show them to users',
        'Build a test set of real questions with known good answers and re-run it after every change',
        'Add a human hand-over for low-confidence or high-stakes questions',
        'Review failed and flagged conversations weekly and fix the underlying document or prompt',
      ],
    ),
    h3('Search quality is half the battle'),
    p(
      'In RAG, the model can only be as good as what it is shown. If the search retrieves the wrong passages, even the best model will answer badly. Teams improve retrieval by combining keyword and semantic search, adding metadata filters such as product or region, and re-ranking results before they reach the model. Investing here usually beats switching to a bigger model.',
    ),

    h2('Privacy and security considerations'),
    p(
      'With RAG, your documents stay in your own store and only the relevant snippets are sent to the model at question time, which makes it easier to apply access rules and to exclude sensitive files. With fine-tuning, training data is sent to a provider or processed on your infrastructure, and the resulting model may effectively memorise it, so only use data you are comfortable embedding permanently. In both cases check whether your provider uses your data for training, where it is processed and how long it is retained, as we cover in [AI privacy and security for small business](/blog/ai-privacy-and-security-for-small-business).',
    ),

    h2('A simple decision path'),
    steps(
      'Choose your approach',
      [
        { title: 'Define the job', text: 'Is the goal answering from documents, or changing behaviour?' },
        { title: 'Try prompting', text: 'Test a good model with clear instructions first.' },
        { title: 'Add RAG', text: 'If it needs your facts, connect your documents.' },
        { title: 'Measure', text: 'Score answers against a real test set.' },
        { title: 'Fine-tune if needed', text: 'Only for proven gaps in style, format or narrow tasks.' },
      ],
    ),
    p(
      'If you plan to give your assistant the ability to take actions as well as answer questions, read our guide to [building an AI agent for your business](/blog/build-an-ai-agent-for-your-business).',
    ),
    cta(
      'Not sure whether your project needs RAG, fine-tuning or neither? We will review your data and goals and recommend the simplest approach that works.',
      '/contact',
      'Get an AI architecture review',
    ),
  ],
  faqs: [
    {
      question: 'Is RAG better than fine-tuning?',
      answer:
        'For answering questions from changing company information, usually yes: it is cheaper, easier to update, can cite sources and respects access rules. Fine-tuning is better for consistent style, format or specialised behaviour. They solve different problems.',
    },
    {
      question: 'Can I fine-tune a model on my own documents?',
      answer:
        'You can, but it is rarely the best way to teach facts. Fine-tuning works best with curated input-output examples, and knowledge learned this way is hard to update, verify or remove. RAG is normally the better route for document knowledge.',
    },
    {
      question: 'How do I stop an AI chatbot from hallucinating?',
      answer:
        'Ground it in clean source documents with RAG, instruct it to answer only from those sources and admit when it does not know, show citations, test on real questions, and hand over to a person for uncertain or high-stakes topics.',
    },
    {
      question: 'Does RAG require sending my data to an AI provider?',
      answer:
        'Only the retrieved snippets relevant to a question are sent to the model at answer time, and you can choose providers and hosting that match your privacy needs. Review each provider’s data retention and training policies.',
    },
    {
      question: 'How much data do I need for RAG or fine-tuning?',
      answer:
        'RAG works with whatever documents you already have, quality matters more than quantity. Fine-tuning typically needs hundreds to thousands of high-quality example pairs, which take real effort to create and review.',
    },
  ],
}
