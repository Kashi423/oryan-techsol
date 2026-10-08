import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'rank-in-google-ai-overviews',
  title: 'How to Rank in Google AI Overviews and AI Search',
  shortTitle: 'Rank in Google AI Overviews',
  description:
    'How to get cited in Google AI Overviews and AI search: what they are, what helps, content structure, structured data, technical checks and tracking.',
  date: '2026-11-13',
  updated: '2026-11-13',
  category: 'Web Development',
  keywords:
    'rank in google ai overviews, google ai overviews seo, ai search optimization, get cited in ai overviews, ai mode seo, seo for ai search, structured data ai overviews',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['ai-content-and-seo-what-google-says', 'technical-seo-checklist-for-business-websites', 'core-web-vitals-explained', 'website-redesign-seo-checklist'],
  intro:
    'When a search results page opens with a written summary above the links, the first thing many people read is no longer a website. Google’s AI Overviews and similar AI answer features have changed how people find information, and they have left business owners asking whether SEO still works. The good news is that the pages these systems cite are overwhelmingly pages that already do the fundamentals of SEO well. The better news is that a few specific habits, around clear answers, structure, trust and technical health, make your pages easier to understand and more likely to be used as a source. This guide explains what AI Overviews are and how to improve your chances of being included, without chasing myths.',
  takeaways: [
    'AI Overviews summarise answers from pages in the normal search index, so strong traditional SEO is the foundation.',
    'There is no special markup or hidden switch; Google’s guidance is to create helpful, reliable, people-first content.',
    'Pages that state clear answers, use good structure and show real expertise are easier to cite.',
    'Technical basics, such as crawlability, indexability and speed, remain essential.',
    'Track impressions, clicks and brand mentions; the goal is visibility and trust, not just rankings.',
  ],
  blocks: [
    h2('What AI Overviews and AI search are'),
    p(
      'AI Overviews are generated summaries that Google shows for some queries, usually informational or multi-part questions. They synthesise an answer and display links to the sources used. AI-style experiences in other places, such as chat assistants with web search, work similarly: they retrieve pages, read them and compose an answer, sometimes with citations. Features, layouts and eligibility change often, so treat anything fixed about them as provisional and check Google Search Central for current documentation.',
    ),
    p(
      'What matters strategically is the pattern. These systems do not invent their knowledge of your industry from nowhere. They retrieve pages that are relevant, accessible and trustworthy, then summarise. To be part of the answer, your page has to be found, understood and judged reliable. That is a content and technical challenge, not a trick.',
    ),
    callout(
      'note',
      'No special switch',
      'Google has stated that there are no additional technical requirements for appearing in AI features beyond being indexed and eligible to show with a snippet in Search. Be wary of anyone selling a secret “AI Overview markup”.',
    ),

    h2('How AI answers choose their sources'),
    p(
      'Google does not publish an exact formula, but the observable pattern is consistent: pages that rank well and satisfy the query often appear, and so do pages that answer a specific part of a question particularly clearly, even if they are not at the very top of the classic results. Many AI answers are built by breaking a question into sub-questions and retrieving the best passage for each, which means **well-structured sections that answer one thing clearly** have an advantage.',
    ),
    table(
      'What tends to help a page get used',
      ['Factor', 'Why it matters', 'What to do'],
      [
        ['Relevance to the question', 'The system matches passages to sub-questions', 'Cover the topic fully; use headings that mirror real questions'],
        ['Clear, direct answers', 'Easy to extract and quote accurately', 'Give a concise answer first, then the detail'],
        ['Expertise and trust', 'Reliable sources are preferred', 'Named authors, sources, first-hand evidence, accurate facts'],
        ['Freshness where it matters', 'Out-of-date answers are riskier', 'Update key pages and show the updated date'],
        ['Technical accessibility', 'Pages must be crawled, rendered and indexed', 'Fix crawl, rendering and speed issues'],
        ['Unique value', 'Duplicates add nothing', 'Include original data, examples, tools or viewpoints'],
      ],
    ),

    h2('Write answers that can be quoted'),
    p(
      'Imagine a reader, or a machine, skimming your page for a single answer. Make that easy. Start sections with a plain, self-contained answer in the first sentence or two, then expand with context, examples and exceptions. Use specific, unambiguous language: “A basic business website typically takes four to eight weeks from kickoff to launch” is far more extractable than “it depends on many factors”.',
    ),
    checklist(
      'Answer-friendly writing habits',
      [
        'Use H2 and H3 headings phrased like the questions people actually ask',
        'Put the direct answer first, then the explanation',
        'Keep paragraphs short and focused on one idea',
        'Use lists and tables for steps, comparisons and criteria',
        'Define terms in plain English the first time you use them',
        'Include numbers, ranges and conditions instead of vague claims',
        'Add a short FAQ with real customer questions and honest answers',
      ],
    ),
    p(
      'We structure our own articles this way, with key takeaways at the top, scannable sections and a visible FAQ, because it helps readers first and machines second.',
    ),

    h2('Show real experience and expertise'),
    p(
      'AI summaries can already generate generic advice. What they cannot produce, and what search engines reward, is evidence that a real person has done the thing. Include first-hand detail: what you tested, what went wrong, what the numbers looked like, what you would do differently. Show who wrote the page and why they are qualified, link to credible sources where you cite facts, and keep your business details and policies clear. This aligns with the guidance we explore in [AI content and SEO: what Google says](/blog/ai-content-and-seo-what-google-says).',
    ),

    h2('Technical foundations that still decide everything'),
    p(
      'If a page cannot be crawled, rendered or indexed, it cannot be used by any search feature. Most websites we audit have at least a few avoidable problems.',
    ),
    ul(
      '**Crawlability:** do not block important pages or resources in robots.txt; keep a clean XML sitemap.',
      '**Indexability:** check for stray noindex tags, canonical errors and duplicate versions.',
      '**Rendering:** make sure key content appears in the HTML a crawler sees, not only after heavy client-side scripts.',
      '**Snippet eligibility:** do not use settings that prevent snippets on pages you want summarised.',
      '**Performance:** fast, stable pages serve users and crawlers better; see [Core Web Vitals explained](/blog/core-web-vitals-explained).',
      '**Mobile usability:** most queries come from phones.',
    ),
    p(
      'Work through the full list in our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites). If you plan a redesign, use the [website redesign SEO checklist](/blog/website-redesign-seo-checklist) so you do not lose pages that currently earn citations and clicks.',
    ),

    h2('Structured data: useful, not magical'),
    p(
      'Schema markup helps search engines understand what a page is about: an article, an organisation, a product, a FAQ, a local business. It can make you eligible for rich results and reduces ambiguity. It does not guarantee inclusion in AI Overviews, and the markup must match visible page content. Use it for accuracy and clarity, and validate it with Google’s testing tools.',
    ),
    h3('Which types are worth adding'),
    ul(
      '**Organization and LocalBusiness:** name, logo, contact details and social profiles.',
      '**Article or BlogPosting:** headline, author, dates and image.',
      '**Product and Offer:** for ecommerce pages with real prices and availability.',
      '**FAQPage and HowTo:** only where the content genuinely matches, and bearing in mind that Google has limited how often these display as rich results.',
      '**BreadcrumbList:** clarifies site structure.',
    ),

    h2('Build topical depth and internal links'),
    p(
      'Systems that break a question into parts reward sites that cover a subject broadly and consistently. Instead of one thin page per keyword, build clusters: a comprehensive guide linked to supporting articles about related questions, costs, comparisons and mistakes. Link them with descriptive anchor text so both people and crawlers can follow the relationships. A single-topic site with many accurate, linked, expert pages is a strong signal of authority.',
    ),

    h2('A practical optimisation workflow'),
    steps(
      'Improve a page for AI search',
      [
        { title: 'Pick the page', text: 'Choose a page already ranking on page one or two for a question-style query.' },
        { title: 'Add a direct answer', text: 'Place a clear summary near the top of the relevant section.' },
        { title: 'Restructure', text: 'Use question-style headings, lists and tables.' },
        { title: 'Add evidence', text: 'Insert original examples, data, quotes and sources.' },
        { title: 'Check technicals', text: 'Confirm indexing, rendering, speed and structured data.' },
        { title: 'Refresh and monitor', text: 'Update the date honestly and watch Search Console.' },
      ],
    ),

    h2('Measuring results'),
    p(
      'Measurement is still evolving. Google reports performance in AI features within its overall Search Console data, so you may not see a dedicated breakdown. Track impressions and clicks for question-style queries, branded search growth, referral traffic from AI assistants where visible, and the quality of the leads that arrive. Search for your key questions regularly and note whether and how your brand is cited.',
    ),
    compare(
      'Old thinking vs. current reality',
      {
        title: 'Old thinking',
        tone: 'bad',
        points: [
          'Only position one matters',
          'Write for keywords and word counts',
          'Technical SEO is a one-off job',
          'Content can be generic if it is long',
        ],
      },
      {
        title: 'Current reality',
        points: [
          'Being cited and trusted matters alongside rankings',
          'Write for questions, with clear extractable answers',
          'Technical health is ongoing hygiene',
          'Unique expertise and evidence win',
        ],
      },
    ),

    h2('Common mistakes'),
    ul(
      '**Chasing hacks:** there is no secret markup or prompt that forces inclusion.',
      '**Publishing thin AI pages at scale:** this risks spam policies and wastes effort.',
      '**Hiding answers behind interactions:** content that requires clicks, tabs or scripts may not be read reliably.',
      '**Ignoring brand:** being mentioned across the web builds the trust AI systems lean on.',
      '**Stopping at one page:** topic depth matters more than a single optimised article.',
    ),
    cta(
      'Want a website built to rank and be cited in both classic and AI search? We combine fast, clean engineering with content structure that search engines can use.',
      '/contact',
      'Improve your search visibility',
    ),
  ],
  faqs: [
    {
      question: 'How do I get my website cited in AI Overviews?',
      answer:
        'Make sure your pages are crawlable and indexed, then publish helpful, expert, well-structured content that answers specific questions clearly. There is no special markup guaranteeing inclusion; relevance, trust and clarity are what help.',
    },
    {
      question: 'Does schema markup help AI search?',
      answer:
        'Structured data helps search engines understand your content and can support rich results, but it does not guarantee inclusion in AI Overviews. Use accurate markup that matches visible content, alongside good content and technical SEO.',
    },
    {
      question: 'Is SEO dead because of AI?',
      answer:
        'No. AI features draw on the search index, so pages must still be found, understood and trusted. The emphasis is shifting towards clear answers, expertise and brand credibility, but the fundamentals of SEO still apply.',
    },
    {
      question: 'Will AI Overviews reduce my website traffic?',
      answer:
        'For some simple informational queries, users may click less. Pages that offer depth, tools, original data or a reason to visit tend to hold up better, and being cited can still bring visibility and qualified visits.',
    },
    {
      question: 'How can I track whether my pages appear in AI answers?',
      answer:
        'Search Console includes AI feature traffic in its overall performance data. Combine it with manual checks of your key questions, monitoring branded searches and noting referrals from AI assistants where visible.',
    },
  ],
}
