import { callout, checklist, cta, h2, p, steps, table, timeline, ul } from './helpers.js'

export default {
  slug: 'website-redesign-seo-checklist',
  title: 'Website Redesign SEO Checklist: Relaunch Without Losing Your Rankings',
  shortTitle: 'Website redesign SEO checklist',
  description:
    'A step-by-step website redesign SEO checklist: audit, redirect map, content and URL preservation, testing, launch and post-launch monitoring to protect traffic.',
  date: '2026-10-30',
  updated: '2026-10-30',
  category: 'Web Development',
  keywords:
    'website redesign SEO checklist, redesign without losing SEO, site migration checklist, 301 redirects redesign, protect rankings website relaunch, SEO for new website launch',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['technical-seo-checklist-for-business-websites', 'core-web-vitals-explained', 'how-much-does-a-business-website-cost'],
  intro:
    'A redesign should make a website better for visitors and customers — yet many relaunches quietly destroy years of search traffic. Pages change address without redirects, valuable content disappears, titles and headings are rewritten carelessly, and a staging-site “noindex” tag survives into production. The damage can take months to repair. The remedy is a methodical process: record what you have, decide what to keep, map every old address to its new home, test before launch and watch closely afterwards. This checklist follows that sequence.',
  takeaways: [
    'Document your current rankings, traffic and top pages before changing anything.',
    'Keep URLs and content that perform; where addresses must change, 301-redirect every old URL to its closest new equivalent.',
    'Test on a staging site that search engines cannot index — and remove the block at launch.',
    'Launch at a quiet time, then monitor Search Console and analytics daily for the first weeks.',
    'Some fluctuation after a relaunch is normal; a sharp, sustained drop signals a fixable problem.',
  ],
  blocks: [
    h2('The redesign SEO timeline'),
    timeline(
      'Four phases',
      [
        { label: 'Before', title: 'Audit and plan', text: 'Benchmark performance, list pages and decide what stays, changes or goes.' },
        { label: 'During', title: 'Build and map', text: 'Design and develop with SEO requirements; create the redirect map.' },
        { label: 'Launch', title: 'Test, switch, verify', text: 'Pre-launch tests, go live, submit sitemaps and verify redirects.' },
        { label: 'After', title: 'Monitor and fix', text: 'Watch rankings, crawl errors and traffic; patch issues quickly.' },
      ],
    ),

    h2('Phase 1: Before you design anything'),
    checklist(
      'Benchmark and inventory',
      [
        'Export current rankings, organic traffic and conversions (Search Console and analytics)',
        'Crawl the existing site to list every URL, title, heading and status code',
        'Identify top pages by traffic, conversions and backlinks — these are the ones to protect',
        'Record important backlinks pointing to your site',
        'Note which pages are weak or outdated and can be merged or removed',
        'Save a full copy of the current site and content',
      ],
    ),
    callout(
      'tip',
      'Protect the winners',
      'Pages that rank and convert are your most valuable assets. Keep their URLs, key content, headings and internal links intact unless there is a strong reason to change them.',
    ),

    h2('Phase 2: Build with SEO in mind'),
    ul(
      '**URL structure:** keep it logical and, where possible, unchanged for existing pages.',
      '**Content:** preserve the substance of high-performing pages; improve rather than replace.',
      '**On-page elements:** unique titles, meta descriptions and a single H1 per page; sensible heading hierarchy.',
      '**Internal linking:** carry over and improve links between related pages.',
      '**Technical foundations:** mobile-friendly, fast, crawlable and rendered correctly — see our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites) and [Core Web Vitals guide](/blog/core-web-vitals-explained).',
      '**Structured data and Open Graph tags** rebuilt for the new templates.',
    ),
    h2('The redirect map: the most important document'),
    p(
      'Every old URL that will not exist at the same address must permanently redirect (301) to the most relevant new page. Redirecting everything to the homepage is treated like a soft 404 and wastes the old page’s value.',
    ),
    table(
      'Example redirect map',
      ['Old URL', 'New URL', 'Action'],
      [
        ['/services/web-design', '/web-development', '301 redirect to closest equivalent'],
        ['/blog/old-post-title', '/blog/updated-post-title', '301 redirect to renamed article'],
        ['/about-us.html', '/about', '301 redirect to cleaner URL'],
        ['/old-promo-2019', '/', '301 to the nearest relevant page, or 410 if truly gone'],
      ],
    ),

    h2('Phase 3: Launch checklist'),
    steps(
      'Launch-day sequence',
      [
        { title: 'Test on staging', text: 'Crawl it, check redirects, templates, forms and tracking — with search engines blocked.' },
        { title: 'Remove blocks', text: 'Delete the staging noindex and robots.txt disallow before going live.' },
        { title: 'Switch over', text: 'Go live at a quiet time with the redirect map active.' },
        { title: 'Verify immediately', text: 'Test top URLs, redirects, canonicals, sitemap and analytics.' },
        { title: 'Tell Google', text: 'Submit the new XML sitemap and request indexing of key pages.' },
      ],
    ),
    checklist(
      'Day-one verification',
      [
        'Site is not set to noindex and robots.txt allows crawling',
        'Old URLs redirect with a single 301 hop to the right pages',
        'Canonical tags point to the live domain, not staging',
        'XML sitemap lists the new URLs and is submitted',
        'Analytics and conversion tracking fire correctly',
        'Forms, checkout and key journeys work on mobile',
        'HTTPS works everywhere with no mixed content',
      ],
    ),

    h2('Phase 4: Monitor and fix'),
    p(
      'For the first four to eight weeks, check Search Console for crawl errors and coverage changes, watch rankings and organic traffic for your top pages, review 404 reports and fix broken links or missing redirects. A short, mild dip is common while search engines reprocess the site; a steep, lasting fall points to something specific — missing redirects, blocked pages, lost content or slow performance.',
    ),
    ul(
      'Fix 404s that have backlinks or traffic first.',
      'Compare key page content, titles and internal links with the old versions.',
      'Check that important pages are indexed and rendering properly.',
      'Keep publishing and improving — redesign is a milestone, not the finish line.',
    ),
    p(
      'Planning a redesign? Our [guide to website costs](/blog/how-much-does-a-business-website-cost) will help you budget, including the SEO work that protects your traffic.',
    ),
    cta(
      'Thinking about a redesign and worried about your rankings? We build SEO protection into every relaunch plan — talk to us before you start.',
      '/contact',
      'Plan a safe website redesign',
    ),
  ],
  faqs: [
    {
      question: 'Will a website redesign hurt my SEO?',
      answer:
        'It can if URLs change without redirects, content is lost or technical blocks slip through. With benchmarking, a redirect map, staging tests and post-launch monitoring, you can usually avoid long-term damage.',
    },
    {
      question: 'What is a 301 redirect and why does it matter?',
      answer:
        'A 301 redirect tells browsers and search engines that a page has moved permanently to a new address, passing its value across. Every changed URL should 301 to its closest new equivalent.',
    },
    {
      question: 'Should I keep the same URLs after a redesign?',
      answer:
        'Where possible, yes — especially for pages that rank and convert. If you must change them, redirect each old URL to the most relevant new page.',
    },
    {
      question: 'How long does it take for rankings to recover after a relaunch?',
      answer:
        'A mild fluctuation for a few weeks is common. If the migration was handled well, rankings usually stabilise within weeks; a large sustained drop indicates problems to investigate.',
    },
    {
      question: 'What is the most common redesign SEO mistake?',
      answer:
        'Launching with the staging noindex tag or robots block still in place, or changing URLs without redirects. Both are avoidable with a launch checklist.',
    },
  ],
}
