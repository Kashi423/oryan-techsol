import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'progressive-web-app-development',
  title: 'Progressive Web App Development: When and How to Build One',
  shortTitle: 'Progressive web app development',
  description:
    'Progressive web app development guide: what PWAs are, benefits and limits, iPhone support, offline and install features, costs, SEO and when to choose one.',
  date: '2026-12-13',
  updated: '2026-12-13',
  category: 'Web Development',
  keywords:
    'progressive web app development, what is a pwa, pwa vs native app, do pwas work on iphone, pwa offline support, service worker, build a pwa, pwa cost',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['pwa-vs-native-app', 'web-app-vs-website-which-do-you-need', 'core-web-vitals-explained', 'nextjs-vs-react'],
  intro:
    'What if your website could be installed on a customer’s home screen, work offline, send notifications and feel like an app, without going through an app store or building separate iOS and Android versions? That is the promise of a progressive web app, or PWA. It is a real and increasingly popular option, particularly for businesses that want app-like convenience at website-like cost. But PWAs are not a magic replacement for native apps: they have genuine limits, and platform support differs, especially on iPhones. This guide explains what PWAs are, how they work, what you can and cannot do with them, what building one involves, how they affect SEO and when they are the smart choice. For a head-to-head comparison with native apps, see also our guide to [PWA vs. native app](/blog/pwa-vs-native-app).',
  takeaways: [
    'A PWA is a website built with modern web technology so it can be installed, work offline and feel like an app.',
    'It is typically cheaper and faster to build and maintain than separate native apps, and it is discoverable by search engines.',
    'Capabilities depend on the browser and operating system; check current support on iOS and Android for any feature you need.',
    'PWAs suit content, e-commerce, booking, dashboards and internal tools; they are less suited to heavy graphics or deep hardware access.',
    'Quality still depends on performance, design and testing: a PWA is a standard of engineering, not a label.',
  ],
  blocks: [
    h2('What a PWA is'),
    p(
      'A progressive web app is a web application that uses a set of web standards to deliver an app-like experience. It lives at a normal web address, loads in the browser and can be shared with a link. But with the right engineering it can also be added to the home screen, launch in its own window without browser chrome, work with poor or no connection, load quickly on repeat visits and, on supported platforms, send push notifications. The “progressive” part means that it works for everyone on any browser, and gains extra abilities where the device supports them.',
    ),
    table(
      'The three pillars of a PWA',
      ['Pillar', 'What it provides', 'How it is done'],
      [
        ['Reliable', 'Loads fast and works with poor or no connection', 'Service worker caching strategies'],
        ['Installable', 'Can be added to the home screen and launched like an app', 'Web app manifest with icons, name and display mode'],
        ['Engaging', 'Feels app-like with notifications and smooth interaction', 'Push notifications where supported; responsive, fast UI'],
      ],
    ),
    p(
      'Under the hood, the key ingredients are a **service worker**, a script that sits between your app and the network and can cache files and handle requests, a **web app manifest**, a file describing the app’s name, icons and appearance, and **HTTPS**, which is required for these features.',
    ),

    h2('What PWAs can do'),
    ul(
      '**Install to the home screen:** with an icon and full-screen launch, without an app store.',
      '**Work offline or on weak networks:** by caching the app shell and important data.',
      '**Load quickly:** cached assets make repeat visits very fast.',
      '**Send push notifications:** supported in modern browsers; see below for iPhone details.',
      '**Access many device features:** camera, geolocation, file access, sharing and more through standard web APIs, subject to browser support.',
      '**Update instantly:** new versions deploy like a website, with no review process.',
      '**Be found in search:** pages can be indexed and shared by URL.',
    ),

    h2('Where PWAs fall short'),
    callout(
      'warn',
      'Check platform support for every feature you need',
      'Browser and operating system support for PWA features differs and changes over time, notably between Android and iOS. Verify current support for push notifications, background tasks, installation prompts and any hardware access before you commit.',
    ),
    ul(
      '**iPhone and iPad:** PWAs can be added to the home screen and, on recent iOS versions, support push notifications for installed apps, but some capabilities remain more limited than on Android or than in native apps. Confirm the current state for your needs.',
      '**Deep hardware access:** advanced Bluetooth use, background processing, specialised sensors or system integrations may be restricted.',
      '**App store presence:** a PWA does not automatically appear in the stores, though some can be packaged for them, and not all stores accept all PWAs.',
      '**Performance for heavy tasks:** games and graphic-intensive apps usually run better natively.',
      '**User expectations:** many users still look in the store for an app, so you may need to promote the install option.',
    ),

    h2('PWA, native or both?'),
    compare(
      'Choosing between approaches',
      {
        title: 'PWA is a good fit when…',
        points: [
          'You already have or need a website and want app-like features cheaply',
          'Your app is content, commerce, booking, forms or dashboards',
          'You want search visibility and shareable links',
          'You want one codebase and instant updates',
        ],
      },
      {
        title: 'Native is a better fit when…',
        points: [
          'You need deep device integration or heavy graphics',
          'App store presence is central to your strategy',
          'You depend on features iOS or Android restrict for the web',
          'You want the most polished platform-specific experience',
        ],
      },
    ),
    p(
      'Many businesses start with a PWA to validate the idea cheaply, then add native apps if usage and requirements justify them, a staged path consistent with our [MVP development guide](/blog/mvp-development-guide-for-startups). For comparing cross-platform native frameworks, see [Flutter vs. React Native](/blog/flutter-vs-react-native-2027).',
    ),

    h2('How a PWA is built'),
    steps(
      'A typical build path',
      [
        { title: 'Build a great responsive web app', text: 'Mobile-first design, fast loading and accessible interactions.' },
        { title: 'Serve over HTTPS', text: 'Required for service workers and many modern features.' },
        { title: 'Add the web app manifest', text: 'Name, icons, colours and display mode for installation.' },
        { title: 'Implement a service worker', text: 'Cache assets and define offline and update strategies.' },
        { title: 'Add features progressively', text: 'Push notifications, background sync and device APIs where supported.' },
        { title: 'Test across devices and audit', text: 'Use tools like Lighthouse and test on real phones.' },
      ],
    ),
    h3('Caching and offline strategies'),
    p(
      'Offline support is not automatic; you design it. Common strategies include caching the application shell so the interface loads instantly, “stale-while-revalidate” for content that can be slightly old, and network-first for data that must be fresh, with graceful fallbacks when offline. Decide what should work without a connection, such as viewing saved items or drafting forms, and how changes sync later. Poor caching can show users outdated content or break updates, so plan versioning carefully.',
    ),
    checklist(
      'PWA quality checklist',
      [
        'Responsive, touch-friendly design that works on small screens',
        'Fast load times and good Core Web Vitals, covered in [Core Web Vitals explained](/blog/core-web-vitals-explained)',
        'Valid manifest with correct icons, including maskable icons',
        'Service worker with a clear caching and update strategy',
        'Meaningful offline experience, not just an error page',
        'Accessible design and keyboard support',
        'Tested installation flow on Android and iOS',
        'Security: HTTPS everywhere, safe handling of stored data',
      ],
    ),

    h2('PWAs and SEO'),
    p(
      'Because a PWA is a website, it can be discovered and indexed by search engines, which is a significant advantage over native apps. The same principles apply: crawlable content, fast loading, clean URLs, structured data and mobile friendliness. Be careful with single-page application patterns that rely entirely on client-side rendering; for content that needs to rank, use server rendering or pre-rendering, as discussed in [Next.js vs. React](/blog/nextjs-vs-react). Make sure service worker caching never serves stale or broken content to search engine crawlers, and follow our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites).',
    ),

    h2('Costs and timelines'),
    p(
      'A PWA is generally cheaper than building and maintaining separate iOS and Android apps, because one codebase serves all devices and updates need no store review. If you already have a well-built responsive site, adding PWA features can be a modest project. A new PWA with complex features, offline data sync, push notifications and integrations costs more, similar to any custom web application; see [web app vs. website](/blog/web-app-vs-website-which-do-you-need) for context. Budget for testing on real devices, since support differences between platforms are the main source of surprises.',
    ),

    h2('Typical use cases'),
    table(
      'Where PWAs shine',
      ['Use case', 'Why a PWA works'],
      [
        ['E-commerce and retail', 'Fast, installable shopping with push alerts for orders and offers'],
        ['Booking and service businesses', 'Easy scheduling, reminders and repeat bookings'],
        ['Content and media', 'Offline reading, fast loading and shareable links'],
        ['Field and internal tools', 'Works with patchy connectivity; easy deployment to staff'],
        ['Dashboards and portals', 'Installable access to business data without store distribution'],
        ['Event and local community apps', 'Low-friction access through a link or QR code'],
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Treating PWA as a checkbox:** installable but slow, with no real offline value.',
      '**Ignoring iOS testing,** where behaviour and support differ.',
      '**Over-aggressive caching,** which leaves users on old versions.',
      '**Expecting full native capabilities** and discovering limits late.',
      '**Forgetting to promote installation:** users will not find the option unless you guide them.',
      '**Neglecting SEO** by relying on client-only rendering for public content.',
    ),
    cta(
      'Wondering whether a PWA, a native app or both is right for your product? We build fast, installable web apps and will recommend the most cost-effective route to your goals.',
      '/contact',
      'Plan your PWA',
    ),
  ],
  faqs: [
    {
      question: 'Can a PWA replace a native app?',
      answer:
        'For many content, commerce, booking and business tools, yes. For apps needing deep hardware access, heavy graphics or strong app store presence, native may still be better. Evaluate the features you need against current platform support.',
    },
    {
      question: 'Do PWAs work on iPhone?',
      answer:
        'Yes, PWAs can run on iPhones and be added to the home screen, and recent iOS versions support some features such as push notifications for installed web apps. Some capabilities remain more limited than on Android, so check current support and test on real devices.',
    },
    {
      question: 'How do I make my site a PWA?',
      answer:
        'Serve it over HTTPS, add a web app manifest, implement a service worker with an offline and caching strategy, ensure it is fast and responsive, and test installation and offline behaviour on real devices.',
    },
    {
      question: 'Are PWAs cheaper than native apps?',
      answer:
        'Usually, because one codebase serves all platforms and updates skip store review. Cost still depends on features, offline logic, integrations and testing requirements.',
    },
    {
      question: 'Can PWAs be listed in app stores?',
      answer:
        'Some PWAs can be packaged and submitted to certain stores, but acceptance varies by store and policy. Many users simply install them from the browser, so promote that option.',
    },
  ],
}
