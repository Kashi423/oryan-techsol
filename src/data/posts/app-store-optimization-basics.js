import { callout, checklist, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'app-store-optimization-basics',
  title: 'App Store Optimization (ASO) Basics: Get Your App Found and Downloaded',
  shortTitle: 'App Store Optimization basics',
  description:
    'App Store Optimization basics: keywords, title, icon, screenshots, ratings and localization for the Apple App Store and Google Play.',
  date: '2026-11-04',
  updated: '2026-11-04',
  category: 'App Development',
  keywords:
    'app store optimization, ASO basics, app store keywords, google play optimization, app screenshots conversion, improve app downloads, app ratings and reviews',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['mobile-app-development-process', 'how-to-validate-an-app-idea', 'mobile-app-security-checklist'],
  intro:
    'Publishing an app is not the same as getting it discovered. Most downloads begin with a search inside the Apple App Store or Google Play, or with a browse through a store listing someone lands on. App Store Optimization — ASO — is the practice of improving that listing so it ranks for the right searches and persuades visitors to install. It is the mobile equivalent of SEO plus conversion optimisation, and it costs far less than paid acquisition. This guide covers the fundamentals for both stores.',
  takeaways: [
    'ASO has two jobs: visibility (ranking for relevant searches) and conversion (turning listing views into installs).',
    'Title, subtitle/short description and keywords drive ranking; icon, screenshots and ratings drive conversion.',
    'Apple and Google index metadata differently — optimise for each store separately.',
    'Ratings, reviews and update frequency are signals of quality for both users and algorithms.',
    'Measure, change one thing at a time and keep iterating; ASO is ongoing.',
  ],
  blocks: [
    h2('How people find apps'),
    p(
      'Users discover apps through store search, charts and featured lists, recommendations, web search results and referrals. Search is typically the largest source for most apps, which makes your listing text and creative the foundation of organic growth.',
    ),
    steps(
      'The ASO cycle',
      [
        { title: 'Research', text: 'Find the phrases your audience searches and study competitors.' },
        { title: 'Optimise', text: 'Update metadata and creative assets.' },
        { title: 'Launch changes', text: 'Publish with a clear hypothesis.' },
        { title: 'Measure', text: 'Track impressions, page views, installs and rankings.' },
        { title: 'Iterate', text: 'Keep what works; test the next idea.' },
      ],
    ),

    h2('Visibility: metadata that ranks'),
    table(
      'Where keywords go on each store',
      ['Element', 'Apple App Store', 'Google Play'],
      [
        ['App name / title', 'Up to 30 characters; strongly weighted', 'Up to 30 characters; strongly weighted'],
        ['Subtitle / short description', 'Subtitle (30 chars) is indexed', 'Short description (80 chars) is shown and read'],
        ['Keyword field', 'Hidden 100-character keyword field', 'No hidden field; keywords come from visible text'],
        ['Long description', 'Not indexed for search; for conversion', 'Indexed; use keywords naturally'],
        ['Other signals', 'Ratings, downloads, retention, updates', 'Ratings, installs, engagement, updates'],
      ],
      'Limits and indexing rules change; always check each store’s current guidelines.',
    ),
    h3('Choosing keywords'),
    ul(
      'Start with what your users would type to solve the problem, not your internal feature names.',
      'Balance popularity with competition: very broad terms are crowded; specific phrases convert better.',
      'Put your most important phrase in the title, and do not repeat words across fields on Apple — repetition wastes space.',
      'Use natural language on Google Play; keyword stuffing is penalised and hurts conversion.',
      'Re-check keywords every few months as trends and competitors shift.',
    ),

    h2('Conversion: make the listing persuasive'),
    checklist(
      'Creative assets checklist',
      [
        'Icon: simple, distinctive, readable at small sizes and consistent with your brand',
        'Screenshots: show benefits, not just screens — use short captions on the first two or three',
        'Preview video: a short demo of the core value in the first few seconds',
        'Description: lead with the main benefit; use short paragraphs and bullet points',
        'Social proof: awards, press and ratings highlighted truthfully',
        'Localised assets for your main markets',
      ],
    ),
    callout(
      'tip',
      'The first screenshots do the selling',
      'Most visitors never scroll beyond the first few images. Put your strongest benefit and a clear message there, and design them for a quick glance.',
    ),

    h2('Ratings and reviews'),
    p(
      'Ratings influence both rankings and trust. Ask for a rating at a moment of success — after a task is completed, not on first launch — using the platform’s native prompt, and never incentivise or gate reviews in ways the stores forbid. Reply to reviews, especially negative ones: a prompt, courteous answer shows prospective users you care, and fixing the problems they raise improves your rating over time.',
    ),
    ul(
      'Fix crashes and recurring complaints quickly; they are the fastest way to lift ratings.',
      'Reply publicly and professionally to criticism.',
      'Keep a stable, secure app — see our [mobile app security checklist](/blog/mobile-app-security-checklist).',
      'Release updates regularly with meaningful notes.',
    ),

    h2('Localisation and experiments'),
    p(
      'Translating your listing and adapting screenshots for key markets can lift visibility and installs substantially, because users search in their own language. Both stores offer ways to test listing variations; change one element at a time, run tests long enough to be meaningful and keep notes of what you learn.',
    ),
    table(
      'Metrics to watch',
      ['Metric', 'What it tells you'],
      [
        ['Impressions', 'How often your listing appears in search and browse'],
        ['Product page views', 'How many people open your listing'],
        ['Conversion rate', 'Share of page views that become installs'],
        ['Keyword rankings', 'Where you appear for target phrases'],
        ['Retention and uninstalls', 'Whether the app delivers on the listing’s promise'],
      ],
    ),

    h2('Begin before launch'),
    p(
      'Research keywords and competitors while you build, plan your screenshots as part of design and prepare localisation early. Validating demand first — as in [how to validate an app idea](/blog/how-to-validate-an-app-idea) — tells you which phrases and benefits matter. ASO fits the launch stage of the [mobile app development process](/blog/mobile-app-development-process).',
    ),
    cta(
      'Want an app that is built to be discovered, not just published? We plan store listings, creative and launch alongside development.',
      '/contact',
      'Plan your app launch',
    ),
  ],
  faqs: [
    {
      question: 'What is App Store Optimization?',
      answer:
        'ASO is the process of improving an app’s store listing — keywords, title, icon, screenshots, description and ratings — to rank higher in store search and convert more visitors into installs.',
    },
    {
      question: 'Is ASO different for Apple and Google Play?',
      answer:
        'Yes. Apple uses a title, subtitle and hidden keyword field and does not index the long description for search, while Google Play indexes the title, short and long descriptions. Optimise each separately.',
    },
    {
      question: 'How long does ASO take to work?',
      answer:
        'Metadata changes can affect rankings within days to weeks, but meaningful growth comes from steady iteration, better creative and improving ratings over months.',
    },
    {
      question: 'Do ratings affect app rankings?',
      answer:
        'Yes. Ratings and reviews influence both user trust and store visibility, so ask at good moments, respond to feedback and fix issues quickly.',
    },
    {
      question: 'Do I need ASO if I run paid ads?',
      answer:
        'Yes. A strong listing converts paid and organic traffic better, lowering your cost per install.',
    },
  ],
}
