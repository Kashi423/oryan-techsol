import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'what-is-a-headless-cms',
  title: 'What Is a Headless CMS, and Do You Need One?',
  shortTitle: 'What is a headless CMS',
  description:
    'What a headless CMS is, how it differs from WordPress, its benefits, costs and drawbacks, SEO considerations and a checklist to decide if you need one.',
  date: '2026-11-20',
  updated: '2026-11-20',
  category: 'Web Development',
  keywords:
    'headless cms explained, what is a headless cms, headless cms vs wordpress, headless cms seo, headless cms benefits, best headless cms, decoupled cms cost',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['nextjs-vs-react', 'choose-a-tech-stack-for-your-startup', 'technical-seo-checklist-for-business-websites', 'how-much-does-a-business-website-cost'],
  intro:
    '“Headless CMS” has gone from developer jargon to a line item in agency proposals, usually accompanied by promises of speed, flexibility and “future-proofing”. For a business owner, it is hard to tell whether that is genuine value or an expensive way to complicate a simple website. A headless CMS can be an excellent choice in the right situation, and an unnecessary burden in the wrong one. This guide explains what it is in plain language, how it compares with a traditional CMS such as WordPress, what it does to SEO, speed and cost, and a clear checklist to help you decide whether you actually need one.',
  takeaways: [
    'A headless CMS stores and manages content but does not decide how it looks; a separate front end displays it, via an API.',
    'It suits multi-channel content, custom front ends and performance-focused sites with a development team behind them.',
    'It adds complexity and cost; for a typical small business website, a traditional CMS is usually enough.',
    'SEO depends on how the front end is built, so server or static rendering and good technical practice are essential.',
    'Choose it for a reason you can state clearly, not because it sounds modern.',
  ],
  blocks: [
    h2('Head and body: the simple explanation'),
    p(
      'A **content management system (CMS)** is the tool editors use to create and organise content: pages, posts, products, images. In a traditional CMS such as WordPress, the system does two jobs at once. It stores the content (the “body”) and also controls how it is presented to visitors through themes and templates (the “head”). Both are bundled together.',
    ),
    p(
      'A **headless CMS** removes the head. It is purely a content store with an editing interface and an API. Your website, mobile app, kiosk or any other channel then fetches the content through that API and displays it however its own front end decides. “Headless” simply means the presentation layer has been cut off and is built separately. Think of it as a warehouse of content with a loading dock, instead of a shop where the shelves and the stock are one and the same.',
    ),
    steps(
      'How content flows in a headless setup',
      [
        { title: 'Editors write', text: 'Content is created in the CMS interface as structured fields.' },
        { title: 'API exposes it', text: 'The CMS provides content as data through an API.' },
        { title: 'Front end fetches', text: 'A website or app requests the content it needs.' },
        { title: 'Pages are built', text: 'The front end renders pages, either ahead of time or on request.' },
        { title: 'Visitors see it', text: 'Delivered quickly, often via a global content network.' },
      ],
    ),

    h2('Headless vs. traditional CMS'),
    table(
      'Comparing the two approaches',
      ['Factor', 'Traditional (e.g. WordPress)', 'Headless'],
      [
        ['Front end', 'Themes and plugins inside the same system', 'Custom-built separately'],
        ['Design flexibility', 'Limited to what themes and builders allow', 'Complete freedom'],
        ['Multi-channel publishing', 'Possible but awkward', 'Natural: one content source, many outputs'],
        ['Speed potential', 'Good with care; can be slowed by plugins', 'Excellent with static or edge delivery'],
        ['Upfront cost', 'Lower: themes and plugins', 'Higher: a front end must be developed'],
        ['Editor experience', 'Familiar, with live preview', 'Depends on setup; preview needs configuring'],
        ['Security surface', 'Larger: plugins and themes are common targets', 'Smaller front end exposure; API must be secured'],
        ['Developer needs', 'Low to moderate', 'Ongoing development skills required'],
      ],
      'Generalisations only; individual products and builds vary widely.',
    ),
    p(
      'We compare the most popular traditional option in more detail in WordPress vs. a custom website.',
    ),

    h2('The real benefits'),
    ul(
      '**Publish everywhere:** the same content can feed a website, a mobile app, a smart display and a partner portal without duplication.',
      '**Freedom for developers and designers:** you can build any interface and use modern frameworks such as those in our [Next.js vs. React guide](/blog/nextjs-vs-react).',
      '**Performance:** pre-built pages served from a global network are very fast, which helps conversion and [Core Web Vitals](/blog/core-web-vitals-explained).',
      '**Structured content:** modelling content as fields, rather than free-form pages, keeps it consistent and reusable.',
      '**Security and scaling:** a decoupled front end with no public admin or plugin ecosystem reduces common attack routes and handles traffic spikes well.',
      '**Independent evolution:** you can redesign the front end without migrating the content, and vice versa.',
    ),

    h2('The honest drawbacks'),
    callout(
      'warn',
      'Headless is not “easier”',
      'It shifts work from configuration to engineering. You pay for a developed front end, hosting for it, integration work and ongoing maintenance of two systems instead of one.',
    ),
    ul(
      '**Higher cost and complexity:** more moving parts to build, secure, monitor and upgrade.',
      '**Dependence on developers:** changes to layout or features usually need engineering, not a plugin install.',
      '**Editor friction:** live previews, page-builder style editing and “click and drag” layout changes may be limited or need extra work.',
      '**Plugin gaps:** features that a traditional CMS gets from plugins, such as forms, SEO tools and search, must be implemented or integrated.',
      '**Vendor lock-in risk:** some hosted headless platforms have pricing that scales with usage, so model costs as you grow.',
    ),

    h2('Headless and SEO'),
    p(
      'A headless CMS neither helps nor harms SEO by itself. Results depend on the front end. If pages are rendered as complete HTML on the server or at build time, with proper titles, meta tags, canonical URLs, structured data, sitemaps and clean URLs, they can perform extremely well. If the front end sends crawlers an empty shell that relies on JavaScript, indexing can suffer. The same fundamentals apply as in our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites): crawlability, speed, structure and quality content.',
    ),
    checklist(
      'SEO requirements for a headless site',
      [
        'Server-side or static rendering of public pages',
        'Editable title, meta description, canonical and Open Graph fields in the CMS',
        'Automatic XML sitemap and robots.txt',
        'Structured data generated from content fields',
        'Redirect management for changed URLs',
        'Image handling with alt text, modern formats and sizes',
        'Preview environment so editors can check pages before publishing',
      ],
    ),

    h2('Who actually needs a headless CMS'),
    compare(
      'A good fit vs. probably unnecessary',
      {
        title: 'Often a good fit',
        points: [
          'Content must appear on a website and one or more apps',
          'A bespoke, highly branded front end is required',
          'Performance and scale are business-critical',
          'A development team is available long term',
        ],
      },
      {
        title: 'Probably unnecessary',
        tone: 'bad',
        points: [
          'A five to ten page brochure site',
          'Editors want to restructure layouts freely themselves',
          'Budget is tight and no developer is retained',
          'The main goal is simply to be online',
        ],
      },
    ),
    p(
      'If you are choosing between a website and a full application, read [web app vs. website](/blog/web-app-vs-website-which-do-you-need) first; the answer often determines how much architecture you need.',
    ),

    h2('Choosing a headless CMS'),
    h3('What to evaluate'),
    ul(
      '**Content modelling:** how easily can you define fields, relationships and reusable blocks?',
      '**Editor experience:** is it pleasant for non-technical staff, with roles, drafts, scheduling and preview?',
      '**API quality:** does it offer well-documented REST or GraphQL APIs and webhooks for rebuilding sites on publish?',
      '**Hosting model:** hosted service, self-hosted open source or a hybrid?',
      '**Pricing:** per user, per record, per API call or bandwidth, and what happens as you grow?',
      '**Ecosystem and longevity:** documentation, community, integrations and company stability.',
    ),
    p(
      'Options range from hosted services to open-source systems you run yourself. Evaluate two or three against a real content sample before committing, and make sure your chosen developer has experience with it. Our guide on [choosing a tech stack](/blog/choose-a-tech-stack-for-your-startup) applies the same boring-is-good logic.',
    ),

    h2('A pragmatic middle path'),
    p(
      'You do not have to go fully headless to get many of the benefits. Some teams use a traditional CMS purely as a content back end and build a custom front end, which gives editors a familiar interface and developers freedom. Others adopt a simple Git-based or file-based content workflow for small sites. Match the solution to your editing needs, team and budget, and keep the option to evolve. For typical cost ranges, see [how much a business website costs](/blog/how-much-does-a-business-website-cost).',
    ),
    h2('Migrating to a headless setup without drama'),
    p(
      'If you already have a WordPress or similar site, moving to a headless architecture is a migration project, and it deserves the same care as a redesign. Start by auditing existing content and URLs, then model the content as structured fields, import it, and rebuild the front end so that every important URL either stays the same or redirects permanently to its new home. Run both systems in parallel on a staging environment, test previews with your editors, and launch at a quiet time. A phased approach, starting with the blog or a single section, lets you learn before committing the whole site.',
    ),
    checklist(
      'Migration safety checklist',
      [
        'Full inventory of current pages, URLs, redirects and backlinks',
        'Content model agreed with editors before development starts',
        'Redirect map covering every changed URL',
        'Preview and publishing workflow tested by real editors',
        'Performance and SEO checks on staging before launch',
        'Monitoring in Search Console for crawl errors after go-live',
      ],
    ),
    cta(
      'Wondering whether a headless CMS makes sense for your site or app? We will review your content, channels and team, and recommend the simplest architecture that does the job.',
      '/contact',
      'Get a CMS recommendation',
    ),
  ],
  faqs: [
    {
      question: 'Is headless CMS better for SEO?',
      answer:
        'Not automatically. SEO depends on the front end. With server or static rendering, clean URLs, metadata and structured data, a headless site can rank very well and load fast, but a poorly built one can hurt indexing.',
    },
    {
      question: 'Headless CMS vs WordPress: which is cheaper?',
      answer:
        'WordPress is usually cheaper to launch because themes and plugins avoid custom front-end development. Headless typically costs more upfront and to maintain, though it can pay off for multi-channel, high-performance or highly custom projects.',
    },
    {
      question: 'What are the best headless CMS options?',
      answer:
        'There are many hosted and open-source choices. The best one depends on your content model, editors, budget, hosting preferences and developer experience, so test two or three with real content before deciding.',
    },
    {
      question: 'Can non-technical editors use a headless CMS?',
      answer:
        'Yes, editing interfaces are designed for non-developers, but features like visual page building and live preview may need extra configuration. Involve your editors when choosing and setting it up.',
    },
    {
      question: 'Do I need a headless CMS for a small business website?',
      answer:
        'Usually not. A traditional CMS or simple static site is generally cheaper and easier for a small brochure website. Consider headless when you need multi-channel content, a bespoke front end or very high performance.',
    },
  ],
}
