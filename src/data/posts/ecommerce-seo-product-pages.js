import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'ecommerce-seo-product-pages',
  title: 'Ecommerce SEO: Product Pages That Rank and Convert',
  shortTitle: 'Ecommerce SEO for product pages',
  description:
    'Ecommerce SEO guide: keyword research, product titles and descriptions, images, schema, reviews, category pages, duplicate content and out-of-stock handling.',
  date: '2026-12-26',
  updated: '2026-12-26',
  category: 'Web Development',
  keywords:
    'ecommerce seo, product page seo, how to write product descriptions for seo, product schema markup, out of stock pages seo, category page seo, ecommerce site structure',
  service: { label: 'E-commerce solutions', to: '/ecommerce' },
  related: ['shopify-vs-woocommerce-vs-custom-store', 'technical-seo-checklist-for-business-websites', 'image-seo-guide', 'schema-markup-guide-for-small-business'],
  intro:
    'An online shop lives or dies by traffic that arrives with intent to buy, and search engines are the largest source of it. Yet many stores publish thousands of near-identical product pages, copy manufacturer descriptions and let technical problems bury their best products. Ecommerce SEO is different from SEO for a brochure site because of scale, constantly changing inventory, filters that create endless URL variations and the need to rank for both informational and transactional searches. This guide covers the practical steps: researching what shoppers search for, structuring categories and URLs, writing product titles and descriptions that persuade, using images and schema well, harnessing reviews, avoiding duplicate content, handling out-of-stock products, keeping the site fast and measuring what matters.',
  takeaways: [
    'Category pages usually target the highest-value, most competitive searches, so optimise them as carefully as product pages.',
    'Write unique, helpful product content rather than copying manufacturer descriptions.',
    'Use clear site structure, clean URLs, canonical tags and controlled faceted navigation to prevent duplicate and wasted pages.',
    'Product schema, quality images and genuine reviews improve visibility and click-through.',
    'Speed, mobile usability and smooth checkout matter as much as rankings: traffic only helps if it converts.',
  ],
  blocks: [
    h2('How shoppers search'),
    p(
      'Buyers use a mix of search types, and each calls for a different kind of page. Broad category searches, such as “running shoes women”, attract people comparing options. Specific product or model searches, such as a particular brand and model number, come from people close to purchase. Question and research searches, such as “how to choose a trail running shoe”, come early in the journey and are best served by guides. A strong ecommerce SEO plan covers all of them: category pages for broad commercial terms, product pages for specific items and content pages for research, linked together so shoppers can move from learning to buying.',
    ),
    table(
      'Page types and their jobs',
      ['Page type', 'Typical searches', 'SEO job'],
      [
        ['Home page', 'Brand and general category terms', 'Brand authority; route visitors to key categories'],
        ['Category and subcategory pages', '“Mens waterproof jackets”', 'Rank for high-volume commercial terms'],
        ['Product pages', 'Specific products, models, long-tail queries', 'Convert high-intent traffic; capture long-tail'],
        ['Buying guides and blog posts', '“How to choose…”, “best … for …”', 'Capture research traffic; build authority and internal links'],
        ['Brand and collection pages', 'Brand plus product type', 'Capture brand-led searches'],
      ],
    ),

    h2('Keyword research for online stores'),
    p(
      'Start with the language customers use, which often differs from your supplier’s. Use search suggestions, competitor categories and your own site search data and customer questions. For methodology, see [keyword research for service businesses](/blog/keyword-research-for-service-businesses); the same approach applies, with a focus on commercial intent. Assign each target keyword to one page, usually a category for broad terms and a product for specific ones, to avoid pages competing against each other.',
    ),
    ul(
      '**Category terms:** high volume, competitive; target with strong category pages.',
      '**Product-specific terms:** brand, model and attribute combinations; target with product pages.',
      '**Modifiers that signal purchase:** “buy”, “cheap”, “near me”, “free delivery”, sizes and colours.',
      '**Questions:** use for FAQs on product pages and for guides.',
    ),

    h2('Site structure and URLs'),
    p(
      'A shallow, logical structure helps search engines and shoppers. Aim for every product to be reachable within three or four clicks from the home page: home, category, subcategory, product. Use descriptive, readable URLs that reflect the hierarchy and do not change when a product moves; avoid long strings of parameters. Breadcrumbs reinforce structure and help users navigate; mark them up with schema, as described in our [schema markup guide](/blog/schema-markup-guide-for-small-business). Link between related products, categories and guides with descriptive anchor text, following the principles in [internal linking strategy](/blog/internal-linking-strategy).',
    ),
    checklist(
      'Structure checklist',
      [
        'Clear category hierarchy that matches how people shop',
        'Short, descriptive URLs without session IDs or unnecessary parameters',
        'Breadcrumbs on category and product pages',
        'Every important page linked from navigation or relevant content',
        'XML sitemap listing canonical, indexable pages only',
        'Consistent handling of trailing slashes, capitalisation and HTTPS',
      ],
    ),

    h2('Optimising category pages'),
    p(
      'Category pages often have the biggest ranking potential, yet many stores treat them as bare grids of products. Give each important category a clear title and heading containing its main keyword, a short, useful introduction that helps shoppers choose, perhaps a more detailed buying guide section lower on the page, and well-organised filters and sorting. Link to relevant subcategories and guides. Avoid stuffing the page with keyword-heavy boilerplate; write for the shopper first. Product listings should load quickly and show enough information, such as image, name, price, rating and availability, to support a decision.',
    ),

    h2('Product pages that rank and convert'),
    h3('Titles and headings'),
    p(
      'Write a clear page title with the product name, key attribute and brand where natural, and a single H1 that matches. Avoid generic titles and keyword stuffing; shoppers should recognise exactly what the product is.',
    ),
    h3('Descriptions'),
    p(
      'Manufacturer descriptions are used by every retailer, so copying them gives search engines no reason to rank you. Write unique descriptions that explain who the product is for, its key features and benefits, sizing and compatibility details, care instructions, what is in the box and answers to common questions. Use headings, bullet points and short paragraphs for readability. Where you sell hundreds of near-identical variants, prioritise unique content for best-sellers and high-margin items and use a consistent template for the rest, with variations for key attributes.',
    ),
    compare(
      'Weak vs. strong product copy',
      {
        title: 'Weak',
        tone: 'bad',
        points: [
          'Copied supplier text',
          'Vague, hype-filled adjectives',
          'No sizing, materials or compatibility',
          'No answers to common questions',
        ],
      },
      {
        title: 'Strong',
        points: [
          'Unique, helpful and specific',
          'Benefits tied to real use cases',
          'Clear specifications and policies',
          'FAQs and social proof included',
        ],
      },
    ),
    h3('Images and media'),
    p(
      'Product photography sells and also earns traffic from image search. Use multiple high-quality images, show detail and scale, add video where useful, compress for speed and write descriptive file names and alt text, following our [image SEO guide](/blog/image-seo-guide). Make sure the main image loads quickly, since it is typically the Largest Contentful Paint element.',
    ),
    h3('Price, availability and delivery'),
    p(
      'Show price, stock status, delivery times and returns information clearly and consistently with your structured data. Shoppers and search engines both reward transparency.',
    ),

    h2('Structured data and rich results'),
    p(
      'Product schema describes your item’s name, image, description, brand, SKU, price, currency, availability and, where genuine, ratings and reviews. It can make pages eligible for rich results with price, availability and star ratings, and supports shopping features across Google surfaces. Ensure markup matches visible page content, keep prices and stock current, and use review markup only for genuine reviews of the product. Test with Google’s tools and monitor for errors in Search Console. Consider also submitting a product feed to merchant programmes where relevant.',
    ),

    h2('Reviews and user-generated content'),
    p(
      'Reviews add fresh, unique content, build trust and raise conversion. Make it easy for buyers to leave them, for example with a follow-up email, display them prominently and respond to critical ones constructively. Never fake or incentivise reviews in ways that break platform rules. Questions and answers on product pages also capture long-tail searches and reduce support load.',
    ),

    h2('Avoiding duplicate content and index bloat'),
    p(
      'Ecommerce sites generate huge numbers of URL variations: sorting options, filters, tracking parameters, pagination and product variants. Left uncontrolled, they create duplicate and thin pages that waste crawl budget and dilute rankings.',
    ),
    ul(
      '**Canonical tags:** point variations to the main version of a page.',
      '**Faceted navigation:** allow indexing only for filter combinations with real search demand and unique value; block or noindex the rest.',
      '**Variants:** use one page with selectable options where appropriate, or separate pages only when searchers look for them separately and content differs.',
      '**Pagination:** make sure paginated pages are crawlable, with unique titles and sensible canonicals.',
      '**Parameters:** avoid indexable tracking parameters and session IDs.',
    ),
    p(
      'These and other technical points are covered in the [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites).',
    ),

    h2('Out-of-stock and discontinued products'),
    table(
      'What to do with unavailable products',
      ['Situation', 'Recommended handling'],
      [
        ['Temporarily out of stock', 'Keep the page live, show availability clearly and offer back-in-stock alerts and alternatives'],
        ['Seasonal or recurring product', 'Keep the page live to preserve ranking and reuse it when stock returns'],
        ['Permanently discontinued, with a close replacement', '301 redirect to the replacement or the most relevant category'],
        ['Discontinued with no replacement, and little value', 'Redirect to the parent category, or return a 410 status if appropriate'],
        ['Product with strong backlinks or traffic', 'Keep it as an informational page with alternatives'],
      ],
    ),
    callout(
      'tip',
      'Never leave dead ends',
      'A page that says “not available” with nowhere to go loses the visitor and the ranking value. Always offer related products, a category link or a notification option.',
    ),

    h2('Speed, mobile and checkout'),
    p(
      'Most shopping happens on phones, and slow pages lose sales. Optimise images, limit heavy scripts, use caching and a content delivery network and keep layout stable as pages load; see [Core Web Vitals explained](/blog/core-web-vitals-explained). Make checkout simple and trustworthy, since SEO traffic is wasted if shoppers abandon; our guide to [reducing cart abandonment](/blog/how-to-reduce-cart-abandonment) covers the details. Your platform choice affects what is easy or hard here; see [Shopify vs. WooCommerce vs. a custom store](/blog/shopify-vs-woocommerce-vs-custom-store).',
    ),

    h2('Content marketing for stores'),
    p(
      'Guides, comparisons and how-to articles attract shoppers earlier in their journey and earn links. Write buying guides for your key categories, size and fit guides, care instructions and use-case articles, and link them to the relevant products and categories. Repurpose them in email and social channels.',
    ),

    h2('Measure and improve'),
    steps(
      'Review monthly',
      [
        { title: 'Check indexing', text: 'Confirm important products and categories are indexed; fix excluded pages.' },
        { title: 'Review queries', text: 'See which searches bring impressions and clicks; improve pages that rank on page two.' },
        { title: 'Analyse conversion', text: 'Compare organic landing pages by revenue, not just traffic.' },
        { title: 'Fix technical issues', text: 'Broken links, redirects, slow pages and structured data errors.' },
        { title: 'Refresh content', text: 'Update top products and categories with new information, images and reviews.' },
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Copying manufacturer descriptions** across thousands of pages.',
      '**Ignoring category pages** while focusing only on products.',
      '**Letting filters create endless indexable URLs.**',
      '**Deleting out-of-stock pages** and losing their ranking value.',
      '**Slow, image-heavy pages** on mobile.',
      '**Fake or misleading structured data and reviews.**',
      '**Measuring traffic instead of revenue.**',
    ),
    cta(
      'Want an online store that attracts shoppers from search and turns them into customers? We build fast, SEO-ready e-commerce sites and optimise existing stores.',
      '/contact',
      'Grow your store’s organic sales',
    ),
  ],
  faqs: [
    {
      question: 'How do I write product descriptions for SEO?',
      answer:
        'Write unique, helpful descriptions that explain who the product is for, its features, benefits, specifications and common questions, using natural language and a clear structure. Avoid copying manufacturer text and keyword stuffing.',
    },
    {
      question: 'How do I handle out-of-stock pages?',
      answer:
        'Keep temporarily unavailable pages live with clear availability, alternatives and back-in-stock alerts. Redirect permanently discontinued products to a close replacement or relevant category, and avoid leaving dead ends.',
    },
    {
      question: 'Do product reviews help rankings?',
      answer:
        'Reviews add unique content, build trust, can enable rich results with ratings and improve conversion. Use genuine reviews only and follow guidelines for review markup.',
    },
    {
      question: 'Should I optimise category pages or product pages first?',
      answer:
        'Both matter. Category pages often target higher-volume commercial keywords, so optimise them early, then improve best-selling product pages and add guides to capture research traffic.',
    },
    {
      question: 'How do I avoid duplicate content from filters and variants?',
      answer:
        'Use canonical tags, control which faceted combinations are indexable, manage variants thoughtfully, avoid indexable tracking parameters and keep sitemaps limited to canonical pages.',
    },
  ],
}
