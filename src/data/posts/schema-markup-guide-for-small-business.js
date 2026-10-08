import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'schema-markup-guide-for-small-business',
  title: 'Schema Markup Explained: Rich Results for Small Business Websites',
  shortTitle: 'Schema markup guide',
  description:
    'Schema markup explained for small businesses: what structured data is, which types to use, how to add and test it and mistakes that block rich results.',
  date: '2026-11-25',
  updated: '2026-11-25',
  category: 'Web Development',
  keywords:
    'schema markup guide, structured data for small business, json-ld examples, local business schema, faq schema, rich results, how to add schema markup, test structured data',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['technical-seo-checklist-for-business-websites', 'local-seo-checklist-for-service-businesses', 'rank-in-google-ai-overviews', 'website-redesign-seo-checklist'],
  intro:
    'Search results are no longer ten plain blue links. Stars under a product, opening hours on a business listing, a recipe card, a breadcrumb trail beneath the title: these enhancements are called rich results, and many of them are powered by structured data on the page, usually referred to as schema markup. For a small business, schema is a relatively low-cost way to help search engines understand exactly what your pages describe, and to qualify for richer listings where they are offered. It is also widely misunderstood: it is not a ranking trick, it cannot fix weak content, and incorrect markup can do more harm than none. This guide explains what schema is, which types actually matter for small businesses, how to add and test it, and the mistakes to avoid.',
  takeaways: [
    'Schema markup is code that describes your page content in a standard vocabulary so search engines can interpret it accurately.',
    'It can make pages eligible for rich results, but it does not guarantee them and is not a direct ranking factor.',
    'JSON-LD, placed in the page, is the format Google recommends for structured data.',
    'Mark up only what is visible on the page, keep it accurate and test it with Google’s tools.',
    'Start with Organization or LocalBusiness, breadcrumbs, articles and products, then expand where it fits.',
  ],
  blocks: [
    h2('What schema markup is'),
    p(
      'Humans understand a page by reading it. Machines need help. If your page says “Acme Plumbing, 14 High Street, open 8am to 6pm, 4.8 stars from 120 reviews”, a search engine has to guess which words are the name, the address and the rating. Schema markup removes the guessing. It is a set of labels, defined at Schema.org and supported by major search engines, that identify each piece of information on a page: this is a business name, this is an address, this is a price, this is an author.',
    ),
    p(
      'The code is added to the page, typically as a small block of JSON-LD in the head or body, and is invisible to visitors. Search engines read it alongside the visible content to understand the page better, and may use it to show enhanced search features.',
    ),
    callout(
      'note',
      'What it is not',
      'Schema is not a magic ranking switch. Google has said structured data helps it understand content and enables certain features, but it should match what users see on the page, and not every markup type produces a visible enhancement.',
    ),

    h2('Why small businesses should care'),
    ul(
      '**Clarity:** it tells search engines exactly who you are, what you offer and where you operate, supporting local and entity understanding.',
      '**Eligibility for rich results:** such as product details, review snippets, breadcrumbs, event information and more, where Google supports them.',
      '**Better click-through potential:** richer listings can attract more attention.',
      '**Future readiness:** structured, consistent information is easier for emerging AI and answer systems to use; see [ranking in Google AI Overviews](/blog/rank-in-google-ai-overviews).',
    ),

    h2('The schema types worth knowing'),
    table(
      'Useful schema types for small business sites',
      ['Type', 'Use it on', 'What it describes'],
      [
        ['Organization', 'Home and About pages', 'Business name, logo, website, contact details, official social profiles'],
        ['LocalBusiness (and subtypes)', 'Contact and location pages', 'Address, phone, opening hours, service area, geo coordinates'],
        ['BreadcrumbList', 'Most inner pages', 'The page’s position in your site hierarchy'],
        ['Article / BlogPosting', 'Blog posts and guides', 'Headline, author, dates, image and publisher'],
        ['Product and Offer', 'Product pages', 'Name, image, price, availability and reviews where they are genuine'],
        ['FAQPage', 'Pages with real FAQs', 'Questions and answers visible on the page'],
        ['Service', 'Service pages', 'The service, provider and area served'],
        ['Event', 'Event pages', 'Date, location and ticket information'],
        ['VideoObject', 'Pages with video', 'Title, description, thumbnail and upload date'],
      ],
      'Eligibility for specific rich results changes over time. Check Google Search Central for current supported features and guidelines.',
    ),
    p(
      'A note on FAQ markup: Google significantly reduced how often FAQ rich results appear for most sites, so do not add it expecting a visible boost. The questions are still worth publishing for users, and marking them up accurately does no harm when they match the visible content.',
    ),

    h2('What it looks like: a JSON-LD example'),
    p(
      'A simplified example of Organization markup describes your business in a way machines can read. In practice, you would include your real details and add more properties such as contact points and profiles. The structure is a nested set of properties: a type (“Organization”), then fields such as name, URL, logo and sameAs links to your official profiles. A LocalBusiness block adds the address, phone number, opening hours and service area. Developers usually generate this from data already stored on the site so it stays accurate when details change.',
    ),
    callout(
      'tip',
      'Generate it from real data',
      'Hand-pasted markup goes stale. If your opening hours change but the schema still says otherwise, you have created a mismatch. Have your developer or CMS output schema from the same fields that display on the page.',
    ),

    h2('How to add schema to your website'),
    steps(
      'Three practical routes',
      [
        { title: 'Plugin or built-in tools', text: 'Many CMS platforms and SEO plugins generate common schema automatically.' },
        { title: 'Template-level code', text: 'A developer adds schema to templates so every page of a type is covered consistently.' },
        { title: 'Manual per page', text: 'For a handful of pages, paste JSON-LD into the page head or a custom field.' },
      ],
    ),
    compare(
      'Plugins vs. developer-built schema',
      {
        title: 'Plugin or CMS setting',
        points: [
          'Fast to turn on',
          'Covers common types well',
          'Limited customisation',
          'Check output for duplicates and errors',
        ],
      },
      {
        title: 'Developer-built',
        points: [
          'Matches your exact data and templates',
          'Can connect multiple entities consistently',
          'Needs development time',
          'Easier to keep accurate at scale',
        ],
      },
    ),

    h2('Test and validate'),
    p(
      'After adding schema, always test it. Google offers tools such as the Rich Results Test, which checks whether a page is eligible for supported enhancements, and the Schema Markup Validator from Schema.org, which checks general syntax. Then use Search Console’s enhancement reports to watch for errors and warnings at scale across your site.',
    ),
    checklist(
      'Validation checklist',
      [
        'Run key pages through the Rich Results Test and the Schema Markup Validator',
        'Fix errors first, then warnings that apply to eligible features',
        'Confirm the markup matches the visible page content',
        'Check there are no duplicate or conflicting blocks from different plugins',
        'Monitor enhancement reports in Search Console after launch',
        'Retest after template, plugin or redesign changes',
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Marking up content that is not on the page:** hidden or invented reviews and prices violate guidelines and risk a manual action.',
      '**Fake or self-written review markup:** reviews must be genuine and about the item, not the whole site written by you.',
      '**Duplicate schema from several plugins:** conflicting blocks confuse search engines.',
      '**Outdated details:** wrong hours, prices or addresses undermine trust.',
      '**Expecting instant results:** rich results depend on eligibility and Google’s discretion.',
      '**Copying markup between unrelated pages:** each page needs markup that describes that page.',
    ),

    h2('A practical priority order'),
    p(
      'You do not need every type. A sensible order for most small business sites is Organization or LocalBusiness on the home and contact pages, BreadcrumbList across the site, Article or BlogPosting on blog content, Product and Offer for shops, and Service where you list distinct services. Pair it with solid technical foundations from our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites) and, for service-area businesses, the steps in [local SEO for service businesses](/blog/local-seo-checklist-for-service-businesses). If you are rebuilding your site, include schema in the plan and verify it after launch, as outlined in the [website redesign SEO checklist](/blog/website-redesign-seo-checklist).',
    ),
    h3('Keep it maintained'),
    p(
      'Schema is part of your site’s data layer, not a one-time job. Review it whenever you change your business details, add new page types or redesign templates. A few minutes of validation after each significant change prevents silent errors from lingering for months.',
    ),
    h2('Example: a local service business'),
    p(
      'Take a regional electrician with a website, a Google Business Profile and a blog. A sensible schema setup would mark the home page with Organization details, the contact page with LocalBusiness data including address, phone, opening hours and the areas served, every inner page with a breadcrumb trail, and each blog post with article markup that names the author and publication date. The service pages could use Service markup describing each offering. Nothing is hidden or exaggerated: every property corresponds to text a visitor can see. When the business changes its hours, the site updates the visible text and the markup together, because both come from the same data source. This quiet consistency is what search engines reward, and it is what makes schema genuinely useful rather than decorative.',
    ),
    cta(
      'Want structured data implemented correctly, generated from your real content and tested at launch? We build schema into every site we deliver.',
      '/contact',
      'Get schema set up properly',
    ),
  ],
  faqs: [
    {
      question: 'What schema types should a business use?',
      answer:
        'Most small businesses should start with Organization or LocalBusiness, BreadcrumbList, Article or BlogPosting for content and Product and Offer for shops, then add Service and others where they match real page content.',
    },
    {
      question: 'Does structured data improve rankings?',
      answer:
        'It is not a direct ranking factor, but it helps search engines understand your content and can make pages eligible for rich results, which may improve visibility and clicks.',
    },
    {
      question: 'How do I test schema markup?',
      answer:
        'Use Google’s Rich Results Test for eligibility and the Schema Markup Validator for syntax, then monitor Search Console enhancement reports for errors and warnings across your site.',
    },
    {
      question: 'What is JSON-LD?',
      answer:
        'JSON-LD is a format for writing structured data in a small script block on the page. Google recommends it because it is easy to add and maintain without altering visible HTML.',
    },
    {
      question: 'Can wrong schema hurt my site?',
      answer:
        'Misleading or spammy markup can lead to lost rich result eligibility or manual actions. Always mark up only visible, accurate content and keep it up to date.',
    },
  ],
}
