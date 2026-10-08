import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'keyword-research-for-service-businesses',
  title: 'How to Do Keyword Research for a Service Business',
  shortTitle: 'Keyword research for service businesses',
  description:
    'Keyword research for service businesses: find the phrases clients search, judge intent and difficulty, use free tools and build a practical keyword map.',
  date: '2026-11-28',
  updated: '2026-11-28',
  category: 'Guides',
  keywords:
    'keyword research for small business, how to do keyword research, find low competition keywords, long tail keywords, search intent, free keyword research tools, keyword mapping',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['technical-seo-checklist-for-business-websites', 'local-seo-checklist-for-service-businesses', 'internal-linking-strategy', 'ai-content-and-seo-what-google-says'],
  intro:
    'Every search that brings a client to your website begins with a few words typed into a box. Keyword research is the process of finding out which words and phrases your future clients actually use, how many people use them, and what they really want when they do. Done well, it tells you which pages to create, how to title and structure them, and where your effort will bring enquiries rather than idle traffic. Done badly, it produces a list of impressive-sounding phrases that nobody ready to buy ever searches. This guide shows a practical, tool-light method for service businesses: start from customers, understand intent, evaluate opportunity, and turn the results into a keyword map you can act on.',
  takeaways: [
    'Start with your customers’ problems and language, not with a tool or a list of industry jargon.',
    'Search intent matters more than volume: a phrase with 50 searches from ready-to-hire people can beat one with 5,000 from researchers.',
    'Long-tail, specific phrases are easier to win and often convert better for service businesses.',
    'Use free sources, such as Google suggestions, Search Console and your own enquiries, before paying for tools.',
    'Map each keyword group to one page so pages support each other instead of competing.',
  ],
  blocks: [
    h2('What keyword research is for'),
    p(
      'Keyword research answers practical questions. What do potential clients type when they have the problem you solve? Which of those searches show a desire to hire someone, and which are idle curiosity? How competitive is each? Which should become service pages, which blog posts, and which are not worth chasing at all? The output is not a spreadsheet for its own sake but a plan for what to publish and how to describe it.',
    ),
    p(
      'For service businesses this is particularly valuable because your sales cycle often starts with a search: “website developer for a small business”, “how much does an accountant cost for a limited company”, “emergency boiler repair”. Matching those phrases with clear, helpful pages is how you appear at the moment of need.',
    ),

    h2('Step 1: Start with your customers, not a tool'),
    p(
      'The best raw material is what real clients say. Gather it from sales calls, enquiry forms, emails, reviews, support tickets and the questions you answer repeatedly. Note the exact words they use for their problems, which are often very different from your professional terminology. A client rarely says “we need a digital transformation initiative”; they say “our invoices take forever and the spreadsheet keeps breaking”.',
    ),
    checklist(
      'Where to collect seed phrases',
      [
        'Sales and discovery call notes: how do prospects describe their problem?',
        'Enquiry forms and emails: what do they ask first?',
        'Customer reviews of you and your competitors',
        'Common objections and questions during proposals',
        'Your competitors’ service pages, headings and FAQs',
        'Forums and communities where your clients ask for help',
        'Google’s autocomplete, “people also ask” and related searches',
      ],
    ),
    callout(
      'tip',
      'List problems, services and outcomes',
      'Create three seed lists: the **problems** clients have, the **services** you provide and the **outcomes** they want. Searchers use all three, and each leads to different pages.',
    ),

    h2('Step 2: Understand search intent'),
    p(
      'Intent is why someone is searching. Google tries to match results to it, and so must you. Four broad types cover most queries, and service businesses usually care most about the last two.',
    ),
    table(
      'Search intent types',
      ['Intent', 'Example', 'What the searcher wants', 'Best page type'],
      [
        ['Informational', 'how does invoice automation work', 'To learn', 'Guide or blog article'],
        ['Commercial investigation', 'best crm for small agency', 'To compare options', 'Comparison, review or in-depth guide'],
        ['Transactional / service', 'hire app developer for startup', 'To hire or buy', 'Service page with clear calls to action'],
        ['Local', 'web designer near me', 'To find a nearby provider', 'Local landing page and Business Profile'],
      ],
    ),
    p(
      'Check intent by searching the phrase yourself. If the results are all guides, a sales page is unlikely to rank; if they are all service pages, a blog post will struggle. Let the results tell you which format Google believes people want. For location-driven queries, our [local SEO checklist](/blog/local-seo-checklist-for-service-businesses) goes deeper.',
    ),

    h2('Step 3: Expand your list'),
    p(
      'Once you have seed phrases, expand them using free and low-cost sources.',
    ),
    ul(
      '**Google autocomplete and related searches:** type your phrase and note suggestions and the “related searches” at the bottom.',
      '**People also ask:** these questions are excellent for headings and FAQs.',
      '**Google Search Console:** if your site already has traffic, the queries report shows what you appear for, including phrases you did not target.',
      '**Competitor pages:** note the headings, terms and topics repeated across top-ranking pages.',
      '**Keyword tools:** free and paid tools estimate volume and difficulty. Treat numbers as rough guides, not facts.',
      '**Questions from your own team:** what do clients ask before they hire you?',
    ),
    h3('Prefer specific, long-tail phrases'),
    p(
      'Long-tail keywords are longer, more specific phrases, such as “react native developer for healthcare app”. Individually they have less volume, but they are less competitive, closer to purchase intent and collectively account for a large share of searches. For a service business, a page that wins ten specific phrases is usually worth more than a hopeful attempt at one giant generic term.',
    ),
    compare(
      'Broad vs. specific keywords',
      {
        title: 'Broad terms',
        points: [
          'High volume, mixed intent',
          'Dominated by large, authoritative sites',
          'Hard to rank for; slow to convert',
          'Useful for brand and awareness over time',
        ],
      },
      {
        title: 'Specific, long-tail terms',
        points: [
          'Lower volume, clear intent',
          'Less competition; faster wins',
          'Closer to hiring decisions',
          'Great for service pages and detailed guides',
        ],
      },
    ),

    h2('Step 4: Judge the opportunity'),
    p(
      'For each promising phrase, ask four questions. Is the intent a good fit for a page you can create? Is there enough demand to matter? Can you realistically compete? And would a visitor from this search be likely to become a client? Volume is only one input. A phrase with modest volume but strong buying intent can be worth far more than a popular informational term.',
    ),
    steps(
      'A simple scoring routine',
      [
        { title: 'Relevance', text: 'Does it match a service you want to sell?' },
        { title: 'Intent', text: 'Would the searcher plausibly hire or enquire?' },
        { title: 'Competition', text: 'Look at the first page: big brands, or smaller sites like yours?' },
        { title: 'Demand', text: 'Is there steady search interest, even if small?' },
        { title: 'Winnability', text: 'Can you create a better, more useful page than the existing ones?' },
      ],
    ),
    p(
      'To check competition without a tool, search the phrase and look at who ranks. If the top results are national publications and giant marketplaces, choose a more specific variation. If they are small agencies with thin pages, there is likely an opening.',
    ),

    h2('Step 5: Build a keyword map'),
    p(
      'A keyword map assigns each target phrase to a single page, so your site has a clear structure and pages do not compete with each other. Group closely related phrases, those that share intent, and give each group one page. Record the primary keyword, a few supporting variations, the intent, the page type and the status (new, update, or exists).',
    ),
    table(
      'Example keyword map',
      ['Page', 'Primary keyword', 'Supporting phrases', 'Intent'],
      [
        ['Service: mobile app development', 'mobile app development company', 'custom app developers, app development services', 'Transactional'],
        ['Guide: app cost', 'how much does it cost to build an app', 'app development cost, price of a mobile app', 'Informational / commercial'],
        ['Comparison: frameworks', 'react native vs flutter', 'which is better for startups, cross platform comparison', 'Commercial investigation'],
        ['Local page', 'app developers in leeds', 'leeds mobile app agency', 'Local'],
      ],
    ),
    p(
      'Link related pages together as described in our [internal linking strategy](/blog/internal-linking-strategy), and make sure your technical foundations are sound with the [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites).',
    ),

    h2('Using keywords well in your content'),
    ul(
      'Put the primary phrase naturally in the title, main heading, opening paragraph, URL and a few subheadings.',
      'Answer the question the keyword implies, completely and clearly, before anything else.',
      'Cover related subtopics and questions people ask, rather than repeating the phrase.',
      'Write for humans: if the sentence sounds odd read aloud, rewrite it.',
      'Add a helpful call to action that fits the intent of the page.',
    ),
    callout(
      'warn',
      'Do not stuff keywords',
      'Repeating a phrase unnaturally does not help and can hurt. Modern search understands meaning and synonyms, so write clearly and thoroughly. For guidance on AI-assisted writing, see [AI content and SEO: what Google says](/blog/ai-content-and-seo-what-google-says).',
    ),

    h2('Common mistakes'),
    ul(
      '**Chasing volume:** high numbers with the wrong intent bring traffic that never enquires.',
      '**Using industry jargon:** clients use their own words.',
      '**Targeting the same keyword with several pages,** causing cannibalisation.',
      '**Ignoring local and question-based searches** that signal high intent.',
      '**One-off research:** language and competition change, so revisit every few months.',
      '**Not checking the results page:** the live search results are the best guide to intent and format.',
    ),
    p(
      'Review your performance monthly in Search Console. See which queries bring impressions and clicks, improve pages that rank on the second page, and use new queries as ideas for content. Keyword research is a loop, not a one-time task.',
    ),
    cta(
      'Want a keyword map and content plan tailored to your services? We combine research with technical SEO and fast website builds so your pages can actually rank.',
      '/contact',
      'Plan your SEO strategy',
    ),
  ],
  faqs: [
    {
      question: 'How do I find keywords with low competition?',
      answer:
        'Look for specific, long-tail phrases, check the first page of results for smaller or thin sites, use Google suggestions and Search Console queries, and target questions and local variations that big sites ignore.',
    },
    {
      question: 'What are long-tail keywords?',
      answer:
        'Long-tail keywords are longer, more specific search phrases with lower volume but clearer intent and less competition, such as “mobile app developer for healthcare startup” instead of “app developer”.',
    },
    {
      question: 'Which free tools work for keyword research?',
      answer:
        'Google autocomplete, related searches and People Also Ask, Google Search Console, Google Trends and your own enquiries and reviews are strong free sources. Free versions of paid tools can add rough volume estimates.',
    },
    {
      question: 'How many keywords should a page target?',
      answer:
        'One primary keyword plus closely related phrases with the same intent. If two phrases need different content to satisfy searchers, they should have separate pages.',
    },
    {
      question: 'How often should I update my keyword research?',
      answer:
        'Review it at least quarterly using Search Console data, new customer questions and competitor changes, and update pages that are close to ranking well.',
    },
  ],
}
