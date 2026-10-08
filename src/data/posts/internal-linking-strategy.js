import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'internal-linking-strategy',
  title: 'Internal Linking Strategy: How to Link Your Pages for Better Rankings',
  shortTitle: 'Internal linking strategy',
  description:
    'Internal linking strategy for SEO: how to link pages, choose anchor text, build topic clusters, fix orphan pages and audit your links step by step.',
  date: '2026-11-27',
  updated: '2026-11-27',
  category: 'Web Development',
  keywords:
    'internal linking strategy, internal links seo, anchor text best practices, topic clusters, orphan pages, how many internal links per page, site structure seo, link equity',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['technical-seo-checklist-for-business-websites', 'website-redesign-seo-checklist', 'image-seo-guide', 'schema-markup-guide-for-small-business'],
  intro:
    'Ask most business owners how to improve their SEO and they will talk about getting links from other websites. Yet one of the most powerful and underused levers is entirely in your hands: the links between your own pages. Internal links tell search engines which pages matter, how topics relate and how to crawl your site, and they guide visitors toward what they need next. A smart internal linking strategy can lift the rankings of pages you already have, rescue pages that are not being found and improve conversions, all without writing a new article. This guide explains how internal links work, how to plan and write them, how to build topic clusters, and how to audit and fix your current structure.',
  takeaways: [
    'Internal links help search engines discover pages, understand topics and distribute authority across your site.',
    'Use descriptive, natural anchor text and link from relevant context, not just from menus and footers.',
    'Organise content into topic clusters: a comprehensive pillar page linked with supporting articles.',
    'Make sure every important page is reachable within a few clicks, and fix orphan pages that nothing links to.',
    'Audit regularly: broken links, redirect chains and weak anchor text quietly waste your effort.',
  ],
  blocks: [
    h2('What internal links do'),
    p(
      'An internal link is a hyperlink from one page on your website to another page on the same site. Menus, footers, breadcrumbs and links inside your text are all internal links. They serve three purposes.',
    ),
    ul(
      '**Discovery:** crawlers find new pages by following links. A page with no links pointing to it may never be found or may be crawled rarely.',
      '**Context:** the words used in a link, the anchor text, and the content around it help search engines understand what the target page is about and how it relates to others.',
      '**Importance:** pages that receive many links from relevant, prominent pages tend to be treated as more important within your site. This is often described as passing link equity or authority.',
    ),
    p(
      'Just as important, internal links serve readers. They answer the next question, offer deeper detail and lead people toward a service page or contact form. Good internal linking is good user experience.',
    ),

    h2('Site structure: the foundation'),
    p(
      'Before worrying about individual links, check your overall structure. A healthy site has a clear hierarchy: the home page links to main category or service pages, which link to detailed pages and articles, which link back up and across to related content. Important pages should be reachable within about three clicks from the home page. Flat, logical structures are easier for crawlers and people to navigate than deep, tangled ones.',
    ),
    table(
      'Types of internal links',
      ['Type', 'Where it appears', 'Main job'],
      [
        ['Navigation', 'Header and main menu', 'Show core sections and services'],
        ['Breadcrumbs', 'Top of inner pages', 'Show position in the hierarchy; help crawlers'],
        ['Contextual', 'Within body content', 'Strongest topical relevance; guide readers deeper'],
        ['Footer', 'Bottom of every page', 'Utility links; not a substitute for contextual links'],
        ['Related content', 'End of articles or product pages', 'Keep users exploring and connect clusters'],
        ['Calls to action', 'Buttons and banners', 'Drive enquiries and conversions'],
      ],
    ),
    callout(
      'note',
      'Contextual links carry the most meaning',
      'A link placed in a relevant sentence, with helpful anchor text, tells search engines more than a repeated menu link. Prioritise these when planning your strategy.',
    ),

    h2('Anchor text: how to write it'),
    p(
      'Anchor text is the clickable words of a link. It should be descriptive, natural and relevant to the page you are linking to. “Our guide to technical SEO” is clear. “Click here” tells neither users nor search engines anything. Vary your wording naturally rather than repeating exactly the same keyword phrase everywhere, which can look manipulative.',
    ),
    compare(
      'Anchor text examples',
      {
        title: 'Helpful anchors',
        points: [
          '“our technical SEO checklist”',
          '“how to protect rankings during a redesign”',
          '“image optimisation guide”',
          'Natural variations within sentences',
        ],
      },
      {
        title: 'Unhelpful anchors',
        tone: 'bad',
        points: [
          '“click here”, “read more”, “this page”',
          'The same exact-match keyword in every link',
          'Very long sentences as anchors',
          'Naked URLs in body text',
        ],
      },
    ),
    p(
      'Accessibility benefits too: screen-reader users often navigate by listing links, so descriptive anchors are far more useful than a series of identical “read more” links.',
    ),

    h2('Build topic clusters'),
    p(
      'A topic cluster is a group of pages covering one subject in depth. A broad **pillar page** gives a comprehensive overview; **supporting pages** go deep on subtopics, questions and comparisons. They link to one another, and each supporting page links back to the pillar. This shows search engines that you cover the subject thoroughly and makes it easy for visitors to follow their interests.',
    ),
    steps(
      'Creating a cluster',
      [
        { title: 'Choose a core topic', text: 'Something central to your business and with real search demand.' },
        { title: 'Plan the pillar', text: 'A comprehensive guide that links out to every subtopic.' },
        { title: 'List supporting questions', text: 'Costs, comparisons, how-tos, mistakes and checklists.' },
        { title: 'Write and link', text: 'Each supporting page links to the pillar and to relevant siblings.' },
        { title: 'Update the pillar', text: 'Add links to new supporting pages as they are published.' },
      ],
    ),
    p(
      'For example, a site about web projects might have a pillar on website planning, linked to supporting articles on technical SEO, speed, images and redesign migration. Our own guides, such as the [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites), [image SEO guide](/blog/image-seo-guide) and [website redesign SEO checklist](/blog/website-redesign-seo-checklist), form such a cluster.',
    ),

    h2('How many internal links is enough?'),
    p(
      'There is no magic number. Google has no strict limit, but every link should be useful. A typical blog article might include a handful to a dozen contextual links, spread naturally through the content, and a “related reading” section at the end. Avoid stuffing links so densely that the page becomes hard to read, and avoid linking to the same target repeatedly in one section. The test is simple: would a reader find this link helpful at this point?',
    ),

    h2('Find and fix orphan pages'),
    p(
      'An orphan page has no internal links pointing to it. Search engines may not discover it, and if they do, they see it as unimportant. Orphans commonly arise from old campaigns, forgotten landing pages, pages removed from menus and new content that was never linked. Find them by comparing a crawl of your site, which follows links, against your sitemap or CMS list of pages. Then decide for each: link to it from relevant pages, merge it into another page, redirect it, or remove it.',
    ),
    checklist(
      'Quick wins for existing content',
      [
        'Link new articles from at least three relevant older pages on the day you publish',
        'Add links from high-traffic pages to important service or conversion pages',
        'Replace “click here” anchors with descriptive text',
        'Fix broken internal links and redirect chains',
        'Link to deeper, related guides from your main service pages',
        'Add a related-content section to blog posts and product pages',
        'Include important pages in the XML sitemap and navigation where appropriate',
      ],
    ),

    h2('How to audit your internal links'),
    steps(
      'A simple link audit',
      [
        { title: 'Crawl the site', text: 'Use a crawling tool to map every page and link.' },
        { title: 'Check for errors', text: 'Look for broken links, redirects and non-indexable pages being linked.' },
        { title: 'Count inbound links', text: 'List pages by number of internal links received; check that priority pages are near the top.' },
        { title: 'Review anchors', text: 'Find generic or repetitive anchors and improve them.' },
        { title: 'Find opportunities', text: 'Identify pages ranking on page two that deserve more links.' },
        { title: 'Fix and recrawl', text: 'Make changes, then verify and monitor in Search Console.' },
      ],
    ),
    p(
      'Search Console’s links report shows which pages receive the most internal links, which is a useful reality check. A key service page with only two internal links is probably under-supported.',
    ),

    h2('Common mistakes'),
    ul(
      '**Relying only on navigation and footer links:** these are weaker than contextual ones.',
      '**Linking to redirects and broken pages:** wastes crawl effort and loses equity.',
      '**Using JavaScript-only links** that crawlers cannot follow; use real anchor tags with href attributes.',
      '**Nofollowing your own links** without a reason.',
      '**Over-optimising anchors** with identical keyword phrases.',
      '**Never updating:** old posts should link to new, relevant content too.',
    ),
    p(
      'Internal linking is also a design consideration during rebuilds; when you [redesign a website](/blog/website-redesign-seo-checklist), carry over and improve the link structure so you do not lose the equity your pages have built. Structured data, such as breadcrumbs, can reinforce the hierarchy; see our [schema markup guide](/blog/schema-markup-guide-for-small-business).',
    ),
    cta(
      'Want a site structure that helps both visitors and search engines? We plan content clusters, internal links and technical foundations into every website we build.',
      '/contact',
      'Improve your site structure',
    ),
  ],
  faqs: [
    {
      question: 'How many internal links per page is ideal?',
      answer:
        'There is no fixed number. Include as many as are genuinely helpful, typically a handful to a dozen contextual links in a long article, plus navigation and related content. Prioritise relevance and readability over quantity.',
    },
    {
      question: 'What is anchor text and how should I write it?',
      answer:
        'Anchor text is the clickable text of a link. Make it descriptive and natural so readers and search engines know what the destination page is about, avoiding generic phrases like “click here” and repeated exact-match keywords.',
    },
    {
      question: 'What are orphan pages?',
      answer:
        'Orphan pages are pages that no other page on your site links to. They are hard for crawlers and visitors to find, so link to them from relevant pages, merge or redirect them, or remove them if they serve no purpose.',
    },
    {
      question: 'Do internal links help SEO?',
      answer:
        'Yes. They help search engines discover and understand pages, show which content is important and spread authority across the site, while also improving navigation for users.',
    },
    {
      question: 'Should internal links open in a new tab?',
      answer:
        'Generally no. Keep users in the same tab for internal navigation unless there is a clear reason, such as a document or a form where leaving would lose their progress.',
    },
  ],
}
