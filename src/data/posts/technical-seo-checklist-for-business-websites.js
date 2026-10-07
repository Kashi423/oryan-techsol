import { callout, checklist, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'technical-seo-checklist-for-business-websites',
  title: 'Technical SEO Checklist for Business Websites (2026 Edition)',
  shortTitle: 'Technical SEO checklist',
  description:
    'A practical technical SEO checklist for business websites: crawling, indexing, structure, speed, mobile, structured data, security and how to audit each step.',
  date: '2026-10-20',
  updated: '2026-10-20',
  category: 'SEO',
  keywords:
    'technical SEO checklist, technical SEO audit, website SEO checklist, crawlability, indexing, structured data, sitemap, canonical tags, SEO for developers',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['core-web-vitals-explained', 'how-much-does-a-business-website-cost', 'how-to-choose-a-software-development-company'],
  intro:
    'Great content cannot rank if search engines cannot find, understand or trust your pages. Technical SEO is the foundation underneath: making sure your site can be crawled, indexed, rendered quickly on mobile and described clearly to machines. Most business sites have a handful of fixable technical problems that quietly hold them back. This checklist walks through the essentials in the order a professional audit would — what to check, why it matters and how to verify it.',
  takeaways: [
    'Technical SEO makes pages discoverable (crawl), eligible to appear (index) and easy to understand (structure and markup).',
    'Start with indexing: robots.txt, XML sitemap, canonical tags and no accidental noindex.',
    'Mobile experience and Core Web Vitals are part of page experience.',
    'Structured data helps search engines understand your business, articles and FAQs.',
    'Audit with Google Search Console first — it shows what Google actually sees.',
  ],
  blocks: [
    h2('How search engines see your site'),
    steps(
      'Crawl, render, index, rank',
      [
        { title: 'Discover', text: 'Search engines find URLs through links and sitemaps.' },
        { title: 'Crawl', text: 'A bot fetches the page, if robots.txt allows.' },
        { title: 'Render', text: 'The page is processed, including JavaScript.' },
        { title: 'Index', text: 'Eligible, useful pages are stored.' },
        { title: 'Rank', text: 'Indexed pages are ordered for each query.' },
      ],
    ),
    p(
      'A problem at any step stops the pages that follow. That is why the checklist begins at the start of the chain.',
    ),

    h2('1. Crawling and indexing'),
    checklist(
      'Crawl and index checks',
      [
        'robots.txt exists and does not block important pages or resources',
        'An XML sitemap lists all indexable URLs and is submitted in Search Console',
        'Important pages are not set to noindex by mistake (check templates and staging leftovers)',
        'Each page has a self-referencing canonical tag pointing to its preferred URL',
        'Duplicate versions (http/https, www/non-www, trailing slashes) redirect to one',
        'No important pages are orphaned — each is linked from somewhere',
        'Search Console shows no large “Excluded” or error buckets you did not expect',
      ],
    ),
    callout(
      'tip',
      'Start in Google Search Console',
      'The Pages (indexing) report tells you which URLs are indexed and why others are not. It is the single most useful free technical SEO tool.',
    ),

    h2('2. Site structure and internal links'),
    ul(
      '**Logical hierarchy:** home → category/service → detail pages, ideally within three clicks of the homepage.',
      '**Clean, descriptive URLs:** short, lowercase, hyphenated, no unnecessary parameters.',
      '**Internal links with descriptive anchor text:** link related pages together; it spreads authority and helps users.',
      '**Breadcrumbs:** help users and give search engines the hierarchy.',
      '**No broken links or long redirect chains:** fix 404s and collapse multi-step redirects.',
    ),

    h2('3. Speed and mobile'),
    p(
      'Google primarily uses the mobile version of your site for indexing, so the mobile experience is the experience. Check that content and links on mobile match desktop, tap targets are usable and pages load quickly. Our guide to [Core Web Vitals](/blog/core-web-vitals-explained) covers the loading, responsiveness and stability metrics and their fixes in detail.',
    ),
    checklist(
      'Mobile and speed checks',
      [
        'Responsive layout with the viewport meta tag set',
        'Text readable without zooming; tap targets not crammed together',
        'Images compressed, correctly sized and in modern formats',
        'Largest content element loads quickly (LCP)',
        'No intrusive pop-ups blocking content',
        'Third-party scripts audited and deferred where possible',
      ],
    ),

    h2('4. On-page technical elements'),
    table(
      'Elements every indexable page should have',
      ['Element', 'Good practice'],
      [
        ['Title tag', 'Unique, descriptive, roughly 50–60 characters, key topic first'],
        ['Meta description', 'Unique summary, roughly 150–160 characters, written for clicks'],
        ['One H1', 'Clear page topic; sensible H2/H3 hierarchy below'],
        ['Image alt text', 'Describes the image; useful for accessibility and image search'],
        ['Canonical tag', 'Points to the preferred URL'],
        ['Open Graph tags', 'Controls how links look when shared on social media'],
      ],
    ),

    h2('5. Structured data'),
    p(
      'Structured data (schema.org markup, usually JSON-LD) tells search engines what a page is about in a machine-readable way and can make you eligible for rich results. Useful types for businesses include **Organization**, **LocalBusiness**, **Article/BlogPosting**, **FAQPage**, **BreadcrumbList** and **Product**. Mark up only what is actually visible on the page, and validate it with Google’s Rich Results Test.',
    ),
    callout(
      'warn',
      'Do not mark up invisible or misleading content',
      'Structured data must reflect what users can see. Fake reviews or hidden FAQs violate guidelines and can lead to manual actions.',
    ),

    h2('6. Security and hygiene'),
    ul(
      'HTTPS everywhere, with valid certificates and no mixed content.',
      'Redirect old URLs when you restructure — preserve rankings with 301 redirects.',
      'Return real 404 status codes for missing pages (not “soft 404s” with a 200 status).',
      'Keep software and plugins updated; hacked sites lose rankings fast.',
      'Handle pagination and filters carefully to avoid thousands of near-duplicate URLs.',
    ),

    h2('7. JavaScript sites and rendering'),
    p(
      'Modern sites built with JavaScript frameworks can be indexed, but it adds risk: content that only appears after scripts run may be crawled later or missed by other bots and social previews. For important pages, make sure the key content, links and metadata are present in the initial HTML — through server-side rendering or pre-rendering — and test with the URL Inspection tool.',
    ),

    h2('How to run the audit'),
    steps(
      'A simple audit routine',
      [
        { title: 'Search Console', text: 'Review indexing, sitemaps, Core Web Vitals and manual actions.' },
        { title: 'Crawl the site', text: 'Use a crawler to find broken links, redirects, missing tags and duplicates.' },
        { title: 'Test key templates', text: 'Check home, service, article and product pages on mobile.' },
        { title: 'Prioritise fixes', text: 'Indexing blockers first, then speed, then polish.' },
        { title: 'Re-check monthly', text: 'Technical SEO is maintenance, not a one-off project.' },
      ],
    ),
    p(
      'Technical SEO is far cheaper to build in than to retrofit — it is one reason we scope it into every project, as described in our [website cost guide](/blog/how-much-does-a-business-website-cost). If you are hiring help, our [checklist for choosing a development partner](/blog/how-to-choose-a-software-development-company) applies here too.',
    ),
    cta(
      'Want a technical SEO review of your site with a prioritised list of fixes? Send us your URL and we will tell you where the biggest wins are.',
      '/contact',
      'Request an SEO review',
    ),
  ],
  faqs: [
    {
      question: 'What is technical SEO?',
      answer:
        'Technical SEO is optimising your website’s infrastructure so search engines can crawl, render, index and understand it — covering crawlability, site structure, speed, mobile usability, structured data and security.',
    },
    {
      question: 'What should I check first in a technical SEO audit?',
      answer:
        'Indexing: robots.txt, the XML sitemap, canonical tags and noindex settings, using Google Search Console’s Pages report. Problems here stop everything else from working.',
    },
    {
      question: 'Do I need structured data?',
      answer:
        'It is not required to rank, but it helps search engines understand your content and can make you eligible for rich results such as FAQs and breadcrumbs. Mark up only what is visible on the page.',
    },
    {
      question: 'Are JavaScript websites bad for SEO?',
      answer:
        'Not inherently, but they add risk. Make sure critical content, links and metadata appear in the initial HTML via server-side rendering or pre-rendering, and test with Google’s URL Inspection tool.',
    },
    {
      question: 'How often should I run a technical SEO audit?',
      answer:
        'A thorough audit once or twice a year, plus a monthly look at Search Console for new errors, and a check after any site redesign, migration or platform change.',
    },
  ],
}
