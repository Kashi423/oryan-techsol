import { callout, checklist, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'google-search-console-indexing-guide',
  title: 'Google Search Console: A Beginner’s Guide to Fixing Indexing Issues',
  shortTitle: 'Search Console indexing guide',
  description:
    'Google Search Console for beginners: set up, submit sitemaps, read the reports and fix indexing issues like crawled or discovered but not indexed.',
  date: '2027-01-20',
  updated: '2027-01-20',
  category: 'Web Development',
  keywords:
    'google search console guide, why is my page not indexed, crawled currently not indexed, discovered currently not indexed, submit sitemap search console, search console performance report, fix indexing issues',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['technical-seo-checklist-for-business-websites', 'internal-linking-strategy', 'google-analytics-4-setup-guide', 'website-redesign-seo-checklist'],
  intro:
    'You publish a page, wait a few days and search for it on Google. Nothing. A week later, still nothing. The page exists, but Google may not have indexed it, or has indexed it and decided not to show it. Google Search Console is the free tool that tells you exactly what Google sees: which of your pages are indexed, which are not and why, which queries bring impressions and clicks, and which technical issues affect your visibility. Many site owners verify their site once and never look again, missing the clearest source of SEO insight available. This beginner’s guide walks through setting up Search Console, submitting your sitemap, reading the key reports, understanding what the indexing statuses mean and fixing the most common problems, with a routine you can follow every month.',
  takeaways: [
    'Search Console shows how Google crawls, indexes and ranks your site, straight from the source.',
    'Verify your site, submit an XML sitemap and use the Pages and URL Inspection tools to diagnose indexing.',
    '“Crawled, currently not indexed” and “Discovered, currently not indexed” usually point to quality, structure or crawl issues rather than a bug.',
    'Fix technical blockers first, then improve content value and internal linking; requesting indexing helps but does not guarantee it.',
    'Review Search Console monthly for performance trends, errors and opportunities.',
  ],
  blocks: [
    h2('What Search Console is'),
    p(
      'Google Search Console is a free service from Google that helps you monitor and troubleshoot your site’s presence in Google Search. Unlike analytics tools, which measure what visitors do once they arrive, Search Console reports on the stage before: whether Google can find your pages, whether it has chosen to index them, which searches show your site and how often people click. It also reports problems such as crawl errors, mobile usability issues, Core Web Vitals and security warnings. It complements [Google Analytics 4](/blog/google-analytics-4-setup-guide) and is essential for the diagnostic work in our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites).',
    ),

    h2('Step 1: Add and verify your site'),
    p(
      'Add your site as a property. Google offers two types: a **domain property**, which covers all subdomains and both HTTP and HTTPS versions and is verified through DNS, and a **URL-prefix property**, which covers a specific address and offers several verification methods such as an HTML file, a meta tag or Google Analytics. A domain property is the most complete choice if you can edit your DNS records. Verify with an account that your business controls, and add colleagues and agencies as users rather than sharing logins. Data begins accumulating after verification, so do it early.',
    ),
    callout(
      'tip',
      'Verify every version of your site',
      'If you use a URL-prefix property, verify the exact version you serve, such as the HTTPS version with or without www, and ensure other versions redirect to it. Domain properties avoid this problem.',
    ),

    h2('Step 2: Submit your sitemap'),
    p(
      'An XML sitemap lists the pages you want search engines to discover, with optional last-modified dates. Submit it under Sitemaps so Google can find new and updated pages efficiently. Make sure it lists only canonical, indexable URLs that return a normal status, not redirects, errors, noindexed pages or duplicates. Most CMS platforms generate a sitemap automatically. A sitemap helps discovery but does not guarantee indexing: it is a suggestion, not a command.',
    ),
    checklist(
      'Sitemap checklist',
      [
        'Sitemap reachable at a stable URL and referenced in robots.txt',
        'Only canonical, indexable pages included',
        'Updated automatically when content changes',
        'Large sites split into several sitemaps with an index file',
        'Submitted in Search Console, with the report showing success and the discovered URL count',
        'Image or news sitemap entries where relevant, as described in [image SEO](/blog/image-seo-guide)',
      ],
    ),

    h2('Step 3: Understand the indexing report'),
    p(
      'The Pages report (previously called Coverage) shows how many URLs Google knows about, how many are indexed and why others are not. Understanding the statuses saves a lot of worry. Not every non-indexed URL is a problem: duplicate and redirected URLs are supposed to be excluded.',
    ),
    table(
      'Common statuses and what they mean',
      ['Status', 'Meaning', 'Typical action'],
      [
        ['Indexed', 'Google has the page in its index and it can appear in results', 'Nothing, unless unexpected pages are indexed'],
        ['Crawled, currently not indexed', 'Google fetched the page but chose not to index it for now', 'Improve content quality and uniqueness, add internal links, check duplication; see below'],
        ['Discovered, currently not indexed', 'Google knows the URL but has not crawled it yet', 'Improve internal linking and site health; avoid low-value URLs; be patient'],
        ['Duplicate without user-selected canonical', 'Google sees duplicates and chose its own canonical', 'Set a clear canonical tag and reduce duplicate URLs'],
        ['Duplicate, Google chose different canonical than user', 'Google disagrees with your canonical', 'Check signals: content similarity, internal links and redirects'],
        ['Alternate page with proper canonical tag', 'The page points to another canonical', 'Usually expected'],
        ['Excluded by noindex tag', 'The page tells Google not to index it', 'Remove noindex if indexing is wanted'],
        ['Blocked by robots.txt', 'Crawling is disallowed', 'Allow crawling if the page should be indexed'],
        ['Page with redirect', 'The URL redirects elsewhere', 'Expected for redirected URLs; update internal links to the final URL'],
        ['Not found (404)', 'The URL returns an error', 'Redirect if there is a replacement; leave true removals as 404 or 410'],
        ['Soft 404', 'The page looks empty or like an error but returns a success status', 'Improve the content or return the correct status code'],
        ['Server error (5xx)', 'The server failed when Google requested the page', 'Fix hosting or application errors'],
      ],
      'Status names and wording evolve; use Search Console’s help text for current definitions.',
    ),

    h2('Diagnosing a page that is not indexed'),
    steps(
      'The URL Inspection workflow',
      [
        { title: 'Inspect the URL', text: 'Paste it into the search bar at the top of Search Console.' },
        { title: 'Read the verdict', text: 'See whether it is on Google, and the reason if not.' },
        { title: 'Test the live URL', text: 'Check that it is reachable, not blocked and rendered correctly.' },
        { title: 'Check the canonical and rendering', text: 'Confirm Google’s chosen canonical, and view the rendered page and screenshot for missing content.' },
        { title: 'Fix issues', text: 'Remove blocks, fix errors and improve content or links.' },
        { title: 'Request indexing', text: 'For important pages, request indexing after fixing, understanding that it is a request, not a guarantee.' },
      ],
    ),
    h3('If the status is “Crawled, currently not indexed”'),
    p(
      'This means Google looked at the page and decided it was not worth indexing at that time. It is usually a quality or value signal, not a technical failure. Consider whether the page is thin, duplicates other pages, offers nothing beyond what already exists or is buried with no internal links. Strengthen it: add original, genuinely useful content, answer the searcher’s question better than competing pages, improve titles and headings, link to it from relevant, important pages and make sure it is part of your site structure; see [internal linking strategy](/blog/internal-linking-strategy). If it truly has no value, consolidate or remove it.',
    ),
    h3('If the status is “Discovered, currently not indexed”'),
    p(
      'Google knows the URL, often from your sitemap or a link, but has not crawled it. This often happens on new or large sites where Google is cautious about crawl load, or where it expects low value from the URLs, such as filter combinations and thin pages. Improve site speed and server reliability, prune low-value URLs, strengthen internal links to important pages and ensure the sitemap lists only pages you want. New sites often need weeks to build crawl trust.',
    ),
    callout(
      'warn',
      'Requesting indexing repeatedly does not help',
      'Submitting the same URL again and again will not force indexing and may waste effort. If a page is not indexed after a fix and a request, wait, strengthen the page and links and check again later.',
    ),

    h2('The Performance report'),
    p(
      'Performance shows how your site appears in Google Search: **impressions** (times your pages were shown), **clicks**, **click-through rate** and **average position**, broken down by query, page, country and device. It is a goldmine for content and SEO decisions.',
    ),
    ul(
      '**Find queries with many impressions and few clicks:** improve titles and descriptions, or the page’s match to the query.',
      '**Find pages ranking on the second page** (positions 8 to 20): add depth, examples and internal links to push them up.',
      '**Discover unexpected queries** that suggest new content ideas and keyword opportunities; see [keyword research for service businesses](/blog/keyword-research-for-service-businesses).',
      '**Compare periods** to see the effect of changes and updates.',
      '**Segment by device and country** to spot mobile or regional problems.',
    ),
    callout(
      'note',
      'Position is an average',
      'Average position blends many queries, locations and result types, so treat it as a trend indicator, not an exact rank.',
    ),

    h2('Other reports worth checking'),
    table(
      'Search Console reports',
      ['Report', 'What it tells you', 'When to act'],
      [
        ['Core Web Vitals', 'Real-user loading, interactivity and stability for URL groups', 'When pages are flagged poor or need improvement; see [Core Web Vitals explained](/blog/core-web-vitals-explained)'],
        ['Mobile usability and page experience', 'Issues affecting mobile users', 'When errors appear'],
        ['Enhancements (structured data)', 'Rich result eligibility and errors for supported markup types', 'When errors or warnings appear; see [schema markup guide](/blog/schema-markup-guide-for-small-business)'],
        ['Links', 'Top linked pages, external linkers and internal link counts', 'To spot weakly linked important pages'],
        ['Manual actions and security issues', 'Penalties or hacking warnings', 'Immediately if anything appears'],
        ['Removals and URL parameters tools', 'Temporary hiding of URLs and legacy parameter handling', 'Only for specific, urgent cases'],
      ],
    ),

    h2('A monthly Search Console routine'),
    checklist(
      'What to check each month',
      [
        'Performance: trend of clicks and impressions, top queries and pages, big winners and losers',
        'Pages report: new errors, changes in indexed counts, unexpected exclusions',
        'Sitemaps: successful reads and the expected number of discovered URLs',
        'Core Web Vitals and page experience issues',
        'Enhancements and structured data errors',
        'Manual actions and security issues, which should be empty',
        'Links: new important links and weakly linked key pages',
        'Note actions taken and results, so improvements accumulate',
      ],
    ),
    p(
      'During a redesign or migration, Search Console becomes your early-warning system: monitor indexing, errors and traffic closely for weeks, as outlined in the [website redesign SEO checklist](/blog/website-redesign-seo-checklist).',
    ),

    h2('Common indexing blockers to rule out'),
    ul(
      '**A leftover noindex tag or robots.txt block** from staging, a classic launch mistake.',
      '**Canonical tags pointing to the wrong URL.**',
      '**Pages only reachable through scripts or forms,** with no crawlable links.',
      '**Content rendered only by JavaScript** that Google fails to process correctly; test with URL Inspection.',
      '**Thin or duplicate content** across many near-identical pages.',
      '**Slow or unreliable servers** that make crawling difficult.',
      '**Orphan pages** with no internal links.',
      '**Redirect chains and loops.**',
    ),

    h2('Common mistakes'),
    ul(
      '**Never opening Search Console after verification.**',
      '**Panicking about every excluded URL,** though many are intentional.',
      '**Submitting a sitemap full of noindexed or redirected pages.**',
      '**Requesting indexing instead of fixing the underlying issue.**',
      '**Ignoring performance data** that reveals easy wins.',
      '**Letting the verification lapse** or losing access when staff change.',
    ),
    cta(
      'Pages not showing up in Google? We diagnose indexing and technical SEO issues, fix the blockers and set up monitoring so your content gets found.',
      '/contact',
      'Get an indexing audit',
    ),
  ],
  faqs: [
    {
      question: 'Why is my page not indexed?',
      answer:
        'Common reasons are noindex or robots.txt blocks, canonical issues, server errors, thin or duplicate content, no internal links or Google simply deciding the page is not valuable enough yet. Use URL Inspection to see the specific reason.',
    },
    {
      question: 'What does “crawled – currently not indexed” mean?',
      answer:
        'Google fetched the page but chose not to include it in its index at that time, usually due to quality, duplication or low perceived value. Improve the content, add internal links and make sure it offers something unique.',
    },
    {
      question: 'How do I submit a sitemap?',
      answer:
        'In Search Console, open the Sitemaps report, enter your sitemap URL and submit it. Make sure it lists only canonical, indexable pages, and check that Google reads it successfully.',
    },
    {
      question: 'How long does indexing take?',
      answer:
        'It can range from hours to weeks depending on site authority, crawl budget and content quality. New sites and low-value pages take longer. Strong internal links and a healthy site help.',
    },
    {
      question: 'Does requesting indexing guarantee my page will be indexed?',
      answer:
        'No. It prompts Google to crawl the URL sooner, but indexing depends on quality and technical factors. Fix issues first, then request once rather than repeatedly.',
    },
  ],
}
