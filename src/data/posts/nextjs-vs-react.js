import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'nextjs-vs-react',
  title: 'Next.js vs. React: When to Use Which for Your Website or App',
  shortTitle: 'Next.js vs. React',
  description:
    'Next.js vs React explained for business owners: how they differ, SEO and performance implications, costs, use cases and how to choose for your website or app.',
  date: '2026-11-19',
  updated: '2026-11-19',
  category: 'Web Development',
  keywords:
    'next.js vs react, nextjs or react for business website, react vs next js seo, server side rendering explained, react framework comparison, next js for startups, migrate react to next js',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['choose-a-tech-stack-for-your-startup', 'web-app-vs-website-which-do-you-need', 'core-web-vitals-explained', 'technical-seo-checklist-for-business-websites'],
  intro:
    'If you have asked a developer to build a modern website or web app, you have probably heard “we will use React” or “we will use Next.js”, sometimes by the same person in the same sentence. The names sound like competitors, but they are not quite. React is a library for building user interfaces; Next.js is a framework built on top of React that adds routing, rendering options and production features. Understanding the difference helps you ask better questions and avoid paying for the wrong thing. This guide explains how the two relate, what each is best at, how they affect SEO, speed and cost, and a simple way to decide for your project.',
  takeaways: [
    'React is the UI library; Next.js is a framework that uses React and adds structure, routing and server-side features.',
    'For public, search-driven sites, a framework with server or static rendering, such as Next.js, usually has the SEO edge.',
    'For logged-in dashboards and internal tools, a plain React single-page app is often simpler and perfectly adequate.',
    'The choice affects hosting, complexity and hiring, but both share the same core skills and ecosystem.',
    'Pick based on the type of product, SEO needs and your team, not on trends.',
  ],
  blocks: [
    h2('How React and Next.js relate'),
    p(
      'React is a JavaScript library created for building interactive user interfaces from reusable components. On its own, it handles what appears on screen and how it updates. It does **not** decide how pages are routed, how data is loaded on the server, how pages are rendered for search engines, or how a project is bundled and deployed. Teams traditionally add other tools to cover these needs.',
    ),
    p(
      'Next.js packages many of those decisions into a framework. It provides file-based routing, multiple rendering strategies, data loading patterns, image and font optimisation, API routes and a production build pipeline, all while letting you write React components. So the question is rarely “React or Next.js?” in the abstract. It is “do we want to assemble our own setup around React, or use a framework that already provides the structure?”',
    ),
    table(
      'What each one gives you',
      ['Capability', 'React alone', 'Next.js'],
      [
        ['Component-based UI', 'Yes', 'Yes (it uses React)'],
        ['Routing between pages', 'Add a router library', 'Built in'],
        ['Server-side rendering or static generation', 'Needs extra setup or tools', 'Built in'],
        ['Image and font optimisation', 'Add separately', 'Built in helpers'],
        ['Back-end API endpoints', 'Separate server', 'Can include API routes'],
        ['Project structure and conventions', 'Up to you', 'Opinionated and consistent'],
        ['Learning curve', 'Lower for basics', 'Higher: more concepts to learn'],
      ],
      'Capabilities change between versions; check current documentation for details.',
    ),

    h2('Rendering: why it matters for SEO and speed'),
    p(
      'How and where a page’s HTML is created is the biggest practical difference for business sites. There are three common models, and the names are worth knowing.',
    ),
    ul(
      '**Client-side rendering (CSR):** the browser downloads JavaScript, which then builds the page. This is typical of a basic React app. It can feel app-like but sends crawlers and slow phones more work.',
      '**Server-side rendering (SSR):** the server builds the HTML for each request, so visitors and crawlers receive a finished page quickly.',
      '**Static generation (SSG):** pages are pre-built at deploy time and served instantly from a content delivery network. Excellent for content that changes occasionally.',
    ),
    p(
      'Search engines can process JavaScript, but delivering meaningful HTML up front is more reliable and usually faster to index, and it tends to improve metrics such as Largest Contentful Paint, which we explain in [Core Web Vitals](/blog/core-web-vitals-explained). That is why public marketing sites, blogs, e-commerce catalogues and landing pages often favour server or static rendering. Next.js makes these options part of the standard toolkit. It is also possible to achieve the same outcome with a plain React setup plus build-time pre-rendering, as this very website does, but that requires deliberate engineering.',
    ),
    callout(
      'note',
      'SEO is not only about the framework',
      'Next.js does not rank a website by itself. Content quality, internal links, page speed, structured data and technical hygiene decide results. See our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites). The framework simply makes some of the technical parts easier.',
    ),

    h2('When plain React is enough'),
    p(
      'Not everything needs server rendering. If your product lives behind a login, search engines will not see it anyway, and the speed of a well-built single-page application is excellent once loaded. Plain React with a modern build tool is a good fit for:',
    ),
    ul(
      'Admin panels, back-office tools and internal dashboards.',
      'Logged-in SaaS application screens (while the marketing site is separate).',
      'Embedded widgets and interactive components inside other pages.',
      'Prototypes and proof-of-concept products.',
      'Apps that need very custom control over the build and architecture.',
    ),
    p(
      'This is closely related to the question of whether you need a website or a full application, discussed in [web app vs. website](/blog/web-app-vs-website-which-do-you-need).',
    ),

    h2('When Next.js is the better choice'),
    ul(
      '**Public, search-driven sites:** blogs, service sites, directories and e-commerce storefronts where organic traffic matters.',
      '**Content-heavy projects:** many pages that benefit from pre-rendering and caching.',
      '**Products with a marketing site and app together,** where sharing components and tooling simplifies maintenance.',
      '**Teams that want conventions:** an opinionated structure reduces debate and onboarding time.',
      '**Performance-sensitive pages:** built-in optimisation helpers cover images, fonts and code splitting.',
    ),
    compare(
      'A quick comparison of fit',
      {
        title: 'Plain React SPA',
        points: [
          'Simple hosting: static files',
          'Ideal for logged-in apps and tools',
          'More setup for SEO-critical pages',
          'Maximum freedom, more decisions',
        ],
      },
      {
        title: 'Next.js',
        points: [
          'Server and static rendering built in',
          'Strong for public, SEO-driven sites',
          'More concepts and hosting considerations',
          'Consistent structure and conventions',
        ],
      },
    ),

    h2('Cost, hosting and complexity'),
    p(
      'Both choices use the same underlying skills, so developer availability is excellent for either. Differences show up in hosting and complexity. A static React app can be hosted almost anywhere cheaply. Next.js can export static sites too, but features such as server-side rendering and API routes need a runtime environment, which is available on several managed platforms or a server you manage. That can slightly increase hosting cost and operational concerns, particularly on shared hosting. Framework versions also move quickly, so budget time for upgrades, as with any actively developed tool. See website maintenance plans for how ongoing care is typically priced.',
    ),

    h2('How to decide'),
    steps(
      'A simple decision path',
      [
        { title: 'Who needs to find it?', text: 'If the public and search engines must find the pages, lean towards Next.js or pre-rendering.' },
        { title: 'Is it behind a login?', text: 'If so, a plain React app is usually fine.' },
        { title: 'How much content?', text: 'Hundreds of content pages favour static or server rendering.' },
        { title: 'What does the team know?', text: 'Choose what your developers can ship and maintain well.' },
        { title: 'Where will it be hosted?', text: 'Confirm your hosting supports the rendering model chosen.' },
      ],
    ),
    checklist(
      'Questions to ask your developer',
      [
        'How will search engines receive our page content?',
        'Which pages are static, server-rendered or client-rendered, and why?',
        'What will hosting require and cost?',
        'How will we handle framework upgrades?',
        'What is the plan for performance and Core Web Vitals?',
        'How easily could another team take this over?',
      ],
    ),

    h2('Can you migrate later?'),
    p(
      'Yes. Because both use React components, much of a plain React app can be moved into Next.js if SEO needs grow, though routing, data loading and rendering need rework. Planning for modular components and keeping business logic separate from the interface makes any future migration far smoother. If you are rebuilding an existing site, follow a careful process such as the [website redesign SEO checklist](/blog/website-redesign-seo-checklist) so you do not lose rankings.',
    ),

    h2('Common mistakes'),
    ul(
      '**Choosing by trend:** the best framework is the one that fits the product and team.',
      '**Using a client-rendered app for an SEO-critical site** and then wondering why pages index slowly.',
      '**Over-engineering a simple brochure site** with a heavy framework when a static site would do.',
      '**Ignoring performance budgets:** large JavaScript bundles hurt on mobile, whichever tool you use.',
      '**Skipping upgrades,** which accumulates security and compatibility problems.',
    ),
    h2('A practical example'),
    p(
      'Imagine two businesses. The first, a regional accountancy firm, wants a ten-page marketing site and a blog that attracts local clients from search. Its content changes weekly and it has no in-house developers. Pre-rendered pages, whether through Next.js or another static approach, give it speed and search visibility, and a simple content workflow lets staff publish without a developer. The second, a logistics company, needs a customer dashboard behind a login where clients track shipments. Search engines never see those screens, so a single-page React application is simpler to build and host, with a separate marketing site alongside it. Same underlying skills, different shapes of solution, which is exactly why the right answer depends on the product and not the logo.',
    ),
    p(
      'Whichever route you choose, insist on measurable targets: page load times on mid-range phones, Core Web Vitals scores in the field, and an indexing check in Search Console after launch. These numbers will tell you whether the architecture is doing its job far better than any opinion about frameworks.',
    ),
    cta(
      'Not sure which approach suits your site or app? We build fast, search-friendly React and Next.js projects and will recommend the simplest option that meets your goals.',
      '/contact',
      'Plan your web project',
    ),
  ],
  faqs: [
    {
      question: 'Is Next.js better for SEO than React?',
      answer:
        'Next.js makes it easier to deliver fully rendered HTML through server-side or static rendering, which generally helps indexing and speed on public sites. A plain React app can also rank when pre-rendered correctly, but it needs deliberate setup.',
    },
    {
      question: 'Do I need Next.js for a business website?',
      answer:
        'Not always. A simple brochure site can use static pages or a CMS without a heavy framework. Next.js is a strong option when you need many SEO-driven pages, dynamic content or a combined website and web app.',
    },
    {
      question: 'Can I migrate a React app to Next.js?',
      answer:
        'Yes. Components are largely reusable, but routing, data loading and rendering need to be adapted. Planning your code in modular components makes migration easier.',
    },
    {
      question: 'Is Next.js more expensive than React?',
      answer:
        'The development skills are the same, so build cost is similar. Hosting and operations may be slightly more involved when you use server-side features, and both need ongoing upgrades and maintenance.',
    },
    {
      question: 'Is React a framework or a library?',
      answer:
        'React is a library focused on building user interfaces. Frameworks like Next.js build on it, adding routing, rendering strategies and tools for production applications.',
    },
  ],
}
