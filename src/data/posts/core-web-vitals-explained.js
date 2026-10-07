import { callout, checklist, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'core-web-vitals-explained',
  title: 'Core Web Vitals Explained: LCP, INP and CLS for Business Owners',
  shortTitle: 'Core Web Vitals explained',
  description:
    'Core Web Vitals explained: good-score thresholds for LCP, INP and CLS, how to measure them and the fixes that matter most for a faster, higher-converting site.',
  date: '2026-10-14',
  updated: '2026-10-14',
  category: 'Web Development',
  keywords:
    'core web vitals, LCP, INP, CLS, website speed, page experience, improve core web vitals, PageSpeed Insights, website performance SEO',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['how-much-does-a-business-website-cost', 'custom-software-vs-off-the-shelf', 'what-is-api-integration'],
  intro:
    'Visitors judge a website in seconds: does it appear quickly, respond when I tap, and stay still while I read? Google measures exactly these three things with a set of metrics called Core Web Vitals. They are one signal among many in search rankings — content and relevance matter more — but they also drive something more important: whether a visitor stays and buys. This guide explains the three metrics in plain English, the scores to aim for, how to measure them for free, and the fixes that usually matter most.',
  takeaways: [
    'Core Web Vitals measure loading (LCP), responsiveness (INP) and visual stability (CLS).',
    'Good scores are: LCP within 2.5 seconds, INP within 200 milliseconds and CLS of 0.1 or less, judged at the 75th percentile of real visits.',
    'They are a ranking signal but a modest one; their bigger value is user experience and conversions.',
    'Measure with PageSpeed Insights and the Core Web Vitals report in Google Search Console.',
    'Most gains come from a few fixes: optimised images, less JavaScript, reserved space and tamed third-party scripts.',
  ],
  blocks: [
    h2('The three metrics in plain English'),
    table(
      'Core Web Vitals and their “good” thresholds',
      ['Metric', 'What it measures', 'In plain English', 'Good score'],
      [
        ['LCP — Largest Contentful Paint', 'Loading', 'How long until the main content (hero image or headline) appears', '2.5 seconds or less'],
        ['INP — Interaction to Next Paint', 'Responsiveness', 'How quickly the page reacts when someone taps, clicks or types', '200 milliseconds or less'],
        ['CLS — Cumulative Layout Shift', 'Visual stability', 'How much content jumps around while the page loads', '0.1 or less'],
      ],
      'Google assesses these at the 75th percentile of real-user visits, separately for mobile and desktop.',
    ),
    callout(
      'note',
      'INP replaced FID',
      'In March 2024 Google replaced the older First Input Delay metric with Interaction to Next Paint, which looks at responsiveness across the whole visit rather than just the first tap.',
    ),

    h2('Why they matter beyond rankings'),
    p(
      'Google confirms that Core Web Vitals contribute to its page-experience signals, but that great content can still rank with imperfect scores. The commercial argument is stronger: slow, jumpy pages lose visitors before they read a word, and faster pages tend to convert better. Treat vitals as a quality standard for the visitor, with SEO as a bonus.',
    ),

    h2('How to measure your site (free)'),
    steps(
      'A simple measurement routine',
      [
        { title: 'PageSpeed Insights', text: 'Enter a URL to see real-user data (if available) and a lab test with suggestions.' },
        { title: 'Search Console report', text: 'The Core Web Vitals report groups your URLs into good, needs improvement and poor.' },
        { title: 'Test key pages', text: 'Home, top landing pages and your main conversion path — on mobile first.' },
        { title: 'Fix, then re-test', text: 'Change one thing at a time; real-user data takes weeks to update.' },
      ],
    ),
    p(
      'Understand the difference between **lab data** (a simulated test, instant, good for debugging) and **field data** (real visitors over the previous 28 days, what Google uses). A page can look fine in the lab and still struggle in the field on slow phones.',
    ),

    h2('Fixing LCP: make the main content appear sooner'),
    ul(
      '**Optimise the hero image:** correct dimensions, modern formats (WebP/AVIF) and compression; never ship a 4 MB photo to a phone.',
      '**Do not lazy-load the main image:** load it eagerly and consider preloading it.',
      '**Speed up the server:** caching and a CDN reduce time to first byte.',
      '**Remove render-blocking resources:** inline critical CSS, defer non-essential scripts.',
      '**Avoid heavy fonts and sliders above the fold:** they delay the largest element.',
    ),

    h2('Fixing INP: make interactions feel instant'),
    ul(
      '**Ship less JavaScript:** every kilobyte must be downloaded, parsed and run.',
      '**Break up long tasks:** heavy scripts that block the main thread make taps feel laggy.',
      '**Be selective with third-party scripts:** chat widgets, tag managers and trackers all compete for the same thread.',
      '**Keep event handlers light:** do the minimum work in response to a click and defer the rest.',
    ),
    h3('A frequent culprit: too many tools'),
    p(
      'Sites accumulate analytics tags, heatmaps, chat widgets and A/B testing scripts over the years. Audit them: remove what nobody uses, load the rest after the page is interactive, and test the result.',
    ),

    h2('Fixing CLS: stop the page jumping'),
    checklist(
      'Layout-shift fixes that usually work',
      [
        'Give every image and video explicit width and height (or an aspect ratio)',
        'Reserve space for ads, banners and embeds before they load',
        'Avoid inserting content above existing content after load',
        'Use font-display and similar techniques so text swaps do not shift layout',
        'Animate with transforms rather than properties that move surrounding content',
        'Test cookie banners and pop-ups, which commonly cause shifts',
      ],
    ),

    h2('Build speed in, rather than bolting it on'),
    p(
      'It is far cheaper to build a fast site than to rescue a slow one. Choices made at the start — a lightweight front end, optimised assets, sensible third-party use, good hosting — decide most of your scores. That is one reason a custom build can outperform a heavily plugin-driven template, as we discuss when comparing [custom and off-the-shelf approaches](/blog/custom-software-vs-off-the-shelf) and in our [website cost guide](/blog/how-much-does-a-business-website-cost).',
    ),
    cta(
      'Not sure how your site scores or what to fix first? We can audit your Core Web Vitals and give you a short, prioritised plan.',
      '/contact',
      'Ask for a performance review',
    ),
  ],
  faqs: [
    {
      question: 'What are Core Web Vitals?',
      answer:
        'Core Web Vitals are Google’s three user-experience metrics: Largest Contentful Paint (loading), Interaction to Next Paint (responsiveness) and Cumulative Layout Shift (visual stability).',
    },
    {
      question: 'What are good Core Web Vitals scores?',
      answer:
        'LCP of 2.5 seconds or less, INP of 200 milliseconds or less and CLS of 0.1 or less, measured at the 75th percentile of real-user visits.',
    },
    {
      question: 'Do Core Web Vitals affect SEO?',
      answer:
        'They are part of Google’s page-experience signals, but relevance and content quality matter more. Good scores help most when other factors are equal, and they improve user experience and conversions.',
    },
    {
      question: 'How do I check my Core Web Vitals?',
      answer:
        'Use PageSpeed Insights for individual URLs and the Core Web Vitals report in Google Search Console for your whole site, checking mobile first.',
    },
    {
      question: 'How long until improvements show up?',
      answer:
        'Lab tests update immediately, but field data in Search Console reflects the previous 28 days, so expect to wait several weeks to see the full effect.',
    },
  ],
}
