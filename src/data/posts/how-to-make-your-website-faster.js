import { bars, callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'how-to-make-your-website-faster',
  title: 'Website Speed: 15 Fixes That Make Sites Load Faster',
  shortTitle: 'How to make your website faster',
  description:
    'How to make your website faster: 15 proven fixes for images, caching, scripts, fonts and hosting, plus a step-by-step speed audit for business sites.',
  date: '2027-01-16',
  updated: '2027-01-16',
  category: 'Web Development',
  keywords:
    'improve website speed, how to make website faster, why is my website slow, page speed optimization, speed up wordpress, reduce page load time, website performance fixes',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['core-web-vitals-explained', 'image-seo-guide', 'wordpress-vs-custom-website', 'website-maintenance-plans-and-costs'],
  intro:
    'Speed is one of the few website qualities that every visitor notices and almost nobody praises. A fast site feels effortless; a slow one feels broken. Study after study by browser makers and large retailers has linked faster loading to better engagement and conversion, and search engines include page experience among their signals. Yet many business sites are painfully slow, burdened by oversized images, heavy plugins, unoptimised scripts and cheap hosting. The good news is that most slowness comes from a small number of causes, and fixing them does not require a rebuild. This guide gives you fifteen practical fixes, ordered roughly by impact for typical business sites, along with a simple method to measure before and after and a clear audit process so you know where to start.',
  takeaways: [
    'Measure first: use real-world field data and lab tools to find what is actually slow.',
    'Images, JavaScript and hosting or server response are the most common culprits.',
    'Compress and resize images, use modern formats, lazy-load below-the-fold content and load critical resources early.',
    'Reduce and defer scripts, limit plugins and third-party tags, and use caching and a CDN.',
    'Speed work is ongoing: set budgets, monitor and keep new features from slowing the site.',
  ],
  blocks: [
    h2('Why speed matters'),
    p(
      'People leave slow pages, particularly on mobile connections. Faster sites keep more visitors, convert better and rank more easily, because search engines favour good page experience, measured through Core Web Vitals. Speed also lowers hosting load and improves accessibility for users with slower devices and networks. Our guide to [Core Web Vitals explained](/blog/core-web-vitals-explained) covers the metrics in detail: Largest Contentful Paint (loading), Interaction to Next Paint (responsiveness) and Cumulative Layout Shift (visual stability).',
    ),
    bars(
      'Where slowness typically comes from (illustrative)',
      [
        { label: 'Oversized or unoptimised images', value: 85, display: 'Very common' },
        { label: 'Heavy JavaScript and third-party scripts', value: 80, display: 'Very common' },
        { label: 'Slow server response and weak hosting', value: 60, display: 'Common' },
        { label: 'Render-blocking CSS and fonts', value: 50, display: 'Common' },
        { label: 'No caching or CDN', value: 55, display: 'Common' },
      ],
      'Illustrative ranking of typical causes on business websites, not measured data. Every site differs; measure yours.',
    ),

    h2('First, measure: how to find out what is slow'),
    steps(
      'A simple speed audit',
      [
        { title: 'Check field data', text: 'Use Search Console’s Core Web Vitals report and PageSpeed Insights to see how real users experience your pages.' },
        { title: 'Run lab tests', text: 'Use Lighthouse or WebPageTest on your key pages: home, top landing pages and a product or service page.' },
        { title: 'Test on a phone', text: 'Use a mid-range device on a typical mobile connection, not just a fast office machine.' },
        { title: 'Identify the heaviest items', text: 'Look at the waterfall chart: largest images, slowest requests, long-running scripts.' },
        { title: 'Set a baseline and target', text: 'Record current scores and decide what good looks like.' },
      ],
    ),
    callout(
      'tip',
      'Test the pages that earn money first',
      'Do not optimise the page nobody visits. Start with your home page, top organic landing pages and any page involved in conversions.',
    ),

    h2('The 15 fixes'),
    h3('1. Compress and resize images'),
    p(
      'Images are usually the largest part of a page. Resize them to the size they are displayed, not the camera original, and compress them. A hero image of several megabytes can often shrink to a couple of hundred kilobytes with no visible loss. See [image SEO](/blog/image-seo-guide) for details.',
    ),
    h3('2. Use modern image formats'),
    p(
      'WebP and AVIF produce smaller files than JPEG and PNG at similar quality. Serve them with fallbacks where needed and use responsive images (srcset) so phones download smaller versions.',
    ),
    h3('3. Lazy-load below-the-fold images and iframes'),
    p(
      'Load images, videos and embedded maps only as the user scrolls towards them. But never lazy-load your main hero image, which should load as early as possible.',
    ),
    h3('4. Set image dimensions'),
    p(
      'Specify width and height (or aspect ratio) so browsers reserve space and avoid layout shifts as images load.',
    ),
    h3('5. Reduce and defer JavaScript'),
    p(
      'Large scripts block the browser from becoming interactive. Remove what you do not need, split code so each page loads only what it uses and use defer or async attributes for non-critical scripts. Heavy page builders and sliders are frequent offenders.',
    ),
    h3('6. Audit third-party scripts'),
    p(
      'Analytics, chat widgets, advertising tags, social embeds and tracking pixels each add requests and processing time. List every third-party script, ask what value it provides and remove or delay the ones you do not need. Load chat widgets after interaction or a delay.',
    ),
    h3('7. Enable caching'),
    p(
      'Browser caching stores static files on the visitor’s device so repeat visits are faster; server and page caching avoid regenerating pages for every visitor. For dynamic sites, caching can transform response times.',
    ),
    h3('8. Use a content delivery network (CDN)'),
    p(
      'A CDN serves your static files from servers near each visitor, reducing latency, especially for international audiences, and absorbs traffic spikes. Many CDNs also compress and optimise assets automatically.',
    ),
    h3('9. Improve server response time'),
    p(
      'If the server takes a second to respond before sending anything, no front-end optimisation can fully compensate. Upgrade hosting if needed, tune the database, use caching and keep server software current. Our guide to [cloud hosting costs](/blog/cloud-hosting-costs-for-small-business) discusses the options.',
    ),
    h3('10. Minify and compress files'),
    p(
      'Minification removes unnecessary characters from CSS, JavaScript and HTML, and Gzip or Brotli compression shrinks text-based files in transit. Most build tools and hosts support both.',
    ),
    h3('11. Optimise CSS and avoid render-blocking'),
    p(
      'Large stylesheets delay the first paint. Inline critical CSS for above-the-fold content, load the rest asynchronously and remove unused styles, which accumulate quickly with themes and frameworks.',
    ),
    h3('12. Optimise web fonts'),
    p(
      'Custom fonts add requests and can cause flashes of invisible or shifting text. Limit the number of families and weights, use modern formats such as WOFF2, self-host where practical, preload the key font and use font-display settings to show text immediately.',
    ),
    h3('13. Limit plugins and bloat'),
    p(
      'On platforms like WordPress, every plugin can add scripts, styles and database queries. Remove unused ones, replace heavy plugins with lighter alternatives and choose lean themes. See [WordPress vs. a custom website](/blog/wordpress-vs-custom-website) for how platform choices affect performance.',
    ),
    h3('14. Reduce redirects and fix errors'),
    p(
      'Redirect chains and broken resources add delays and wasted requests. Link directly to final URLs and fix 404s for assets.',
    ),
    h3('15. Prioritise critical resources'),
    p(
      'Tell the browser what matters most: preload the main image and key font, preconnect to essential third-party domains and avoid chains of dependent requests that delay the largest element from appearing.',
    ),
    table(
      'Fix, effort and typical effect',
      ['Fix', 'Effort', 'Typical impact'],
      [
        ['Compress and resize images', 'Low', 'High'],
        ['Modern formats and responsive images', 'Low to medium', 'High'],
        ['Lazy-load below-the-fold media', 'Low', 'Medium'],
        ['Defer and trim JavaScript', 'Medium', 'High'],
        ['Audit third-party scripts', 'Low', 'Medium to high'],
        ['Caching and CDN', 'Low to medium', 'High'],
        ['Faster hosting and server tuning', 'Medium', 'High when the server is the bottleneck'],
        ['Optimise fonts and CSS', 'Medium', 'Medium'],
        ['Plugin clean-up', 'Low', 'Medium to high on plugin-heavy sites'],
      ],
    ),

    h2('Performance budgets and habits'),
    p(
      'Sites get slower over time as features, scripts and content accumulate. A performance budget sets limits, such as a maximum page weight, number of requests or Largest Contentful Paint time, that new work must respect. Add speed checks to your release process and review key pages monthly. When someone requests a new widget or tracking tag, ask what it costs in speed and whether it is worth it.',
    ),
    checklist(
      'Ongoing speed routine',
      [
        'Run PageSpeed or Lighthouse tests on key pages monthly',
        'Review Core Web Vitals field data in Search Console',
        'Compress images as part of every content upload',
        'Review third-party tags and plugins quarterly',
        'Set a page-weight and LCP budget for new pages',
        'Test major releases on a real mid-range phone',
        'Keep software, themes and plugins updated',
      ],
    ),

    h2('Quick decision guide'),
    compare(
      'Where to focus first',
      {
        title: 'If your pages are heavy',
        points: [
          'Compress and resize images',
          'Remove unused scripts and plugins',
          'Defer non-critical JavaScript',
          'Use lazy-loading below the fold',
        ],
      },
      {
        title: 'If your server responds slowly',
        points: [
          'Enable page and object caching',
          'Upgrade or change hosting',
          'Optimise the database and queries',
          'Add a CDN to reduce distance',
        ],
      },
    ),

    h2('Common mistakes'),
    ul(
      '**Optimising without measuring,** so effort goes to the wrong things.',
      '**Testing only on fast desktop connections.**',
      '**Chasing a perfect score** instead of real user experience and business impact.',
      '**Lazy-loading the hero image,** hurting Largest Contentful Paint.',
      '**Piling on plugins and tags** to solve small problems.',
      '**Ignoring the server** while fixing front-end details.',
      '**One-off fixes** with no monitoring, letting speed decay again.',
    ),
    p(
      'Speed work also supports SEO and conversions, as covered in our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites) and [website maintenance plans](/blog/website-maintenance-plans-and-costs).',
    ),
    cta(
      'Is your site slower than it should be? We audit performance, fix the biggest bottlenecks and build fast sites that pass Core Web Vitals.',
      '/contact',
      'Speed up your website',
    ),
  ],
  faqs: [
    {
      question: 'Why is my website slow on mobile?',
      answer:
        'Common causes are oversized images, heavy JavaScript, too many third-party scripts, slow hosting and render-blocking resources. Mobile devices have less processing power and slower networks, so these problems show up more.',
    },
    {
      question: 'Does page speed affect rankings?',
      answer:
        'Page experience, including speed-related Core Web Vitals, is one of many ranking signals, and slow pages also hurt engagement and conversions, which matter in their own right. Speed is a good investment either way.',
    },
    {
      question: 'What is a good page load time?',
      answer:
        'Aim for the Core Web Vitals “good” thresholds, with Largest Contentful Paint at or under about 2.5 seconds for most visitors. Faster is better, especially on mobile.',
    },
    {
      question: 'What should I fix first?',
      answer:
        'Start by measuring, then compress and resize images, trim and defer JavaScript and third-party scripts, enable caching and consider a CDN. Address hosting if the server response is slow.',
    },
    {
      question: 'Will a CDN make my website faster?',
      answer:
        'Usually yes for static content, especially for visitors far from your server, because assets are served from nearby locations. It does not fix a slow origin server or heavy pages, so combine it with other optimisations.',
    },
  ],
}
