import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'shopify-vs-woocommerce-vs-custom-store',
  title: 'Shopify vs. WooCommerce vs. a Custom Online Store: How to Choose',
  shortTitle: 'Shopify vs. WooCommerce vs. custom',
  description:
    'Compare Shopify, WooCommerce and a custom-built store on cost, control, scalability, maintenance and integrations — and choose the right e-commerce platform.',
  date: '2026-10-16',
  updated: '2026-10-16',
  category: 'E-commerce',
  keywords:
    'Shopify vs WooCommerce, custom ecommerce store, best ecommerce platform, ecommerce platform comparison, headless commerce, build vs buy online store',
  service: { label: 'E-commerce solutions', to: '/ecommerce' },
  related: ['custom-software-vs-off-the-shelf', 'what-is-api-integration', 'how-much-does-a-business-website-cost'],
  intro:
    'Choosing an e-commerce platform feels like a technical decision but is really a business one: how fast do you need to launch, how unusual is the way you sell, how much do you want to own, and how much will it cost as you grow? Shopify, WooCommerce and a custom-built store each win for different businesses. This guide compares them on the factors that matter, so you can pick based on your products, team and plans rather than on whichever name you hear most.',
  takeaways: [
    'Shopify is a hosted all-in-one platform: fastest to launch and low maintenance, with monthly fees and some limits on customisation.',
    'WooCommerce is a WordPress plugin: flexible and widely supported, but you manage hosting, security and updates.',
    'A custom store suits unusual products, pricing or workflows and deep integrations, at a higher upfront cost.',
    'Compare total cost over two to three years, including apps/plugins, transaction fees and your team’s time.',
    'Whichever you choose, check that you can export your data and products.',
  ],
  blocks: [
    h2('The three options in one table'),
    table(
      'Shopify, WooCommerce and custom compared',
      ['Factor', 'Shopify', 'WooCommerce', 'Custom-built store'],
      [
        ['What it is', 'Hosted platform (SaaS)', 'WordPress plugin you host yourself', 'Software built for your business'],
        ['Time to launch', 'Days to weeks', 'Weeks', 'Weeks to months'],
        ['Upfront cost', 'Low', 'Low to moderate', 'Higher'],
        ['Ongoing costs', 'Subscription, apps and transaction fees', 'Hosting, plugins, maintenance', 'Hosting and maintenance; no platform fee'],
        ['Customisation', 'Themes and apps; limited by platform', 'High, via plugins and code', 'Unlimited'],
        ['Maintenance burden', 'Handled by the platform', 'Yours: updates, security, performance', 'Yours or your development partner’s'],
        ['Integrations', 'App store and APIs', 'Plugins and APIs', 'Anything with an API'],
        ['Data ownership', 'Exportable, platform-dependent', 'You own everything', 'You own everything'],
      ],
      'General characteristics; plans, fees and features change, so check current details.',
    ),

    h2('Shopify: fast, tidy and managed'),
    ul(
      '**Strengths:** quick to launch, reliable hosting and checkout, large app and theme ecosystem, minimal technical upkeep.',
      '**Watch for:** monthly plan fees, app subscriptions that add up, transaction fees if you do not use the platform’s own payments, and limits when you need unusual checkout or product logic.',
      '**Good fit:** a straightforward catalogue, a small team and a priority on speed and simplicity.',
    ),

    h2('WooCommerce: flexible and yours'),
    ul(
      '**Strengths:** very customisable, large plugin ecosystem, you control hosting and data, works naturally with a WordPress content site.',
      '**Watch for:** you are responsible for hosting quality, security, backups and updates; plugin conflicts and slow stores are common without care.',
      '**Good fit:** content-led businesses already on WordPress, or teams with technical help who want control.',
    ),

    h2('A custom store: built around how you sell'),
    p(
      'A custom store is purpose-built software for your business. It shines when selling is complicated: configurable products, complex pricing or quotes, subscriptions with unusual rules, multi-warehouse inventory, B2B portals or deep integrations with your ERP, accounting or logistics — the connective work we explain in [what API integration is](/blog/what-is-api-integration).',
    ),
    compare(
      'When custom wins vs. when it is overkill',
      {
        title: 'Custom is worth considering when…',
        points: [
          'Your pricing, products or checkout do not fit standard platforms',
          'You rely on heavy integrations with internal systems',
          'Platform fees and app subscriptions are growing painfully',
          'You want full control of performance, SEO and data',
        ],
      },
      {
        title: 'Stay with a platform when…',
        points: [
          'You sell a simple catalogue',
          'Speed to market matters most',
          'You have no one to maintain custom software',
          'You are still validating demand',
        ],
      },
    ),
    p(
      'This is the same build-versus-buy reasoning we apply to software in general in [custom software vs. off-the-shelf](/blog/custom-software-vs-off-the-shelf).',
    ),

    h2('Compare the total cost, not the monthly fee'),
    callout(
      'tip',
      'Add up two to three years',
      'For each option include: build or setup, theme/design, apps or plugins, payment and transaction fees, hosting, maintenance, developer time, and the cost of workarounds. Cheap to start can be expensive to scale — and the reverse.',
    ),

    h2('A five-question decision guide'),
    steps(
      'Choosing your platform',
      [
        { title: 'How unusual is your selling?', text: 'Standard catalogue → platform. Complex rules → consider custom.' },
        { title: 'Who will maintain it?', text: 'No technical help → hosted platform.' },
        { title: 'What must it connect to?', text: 'ERP, inventory, accounting, CRM — check integration depth.' },
        { title: 'What is your 3-year volume?', text: 'Fees scale with sales; model them.' },
        { title: 'How fast must you launch?', text: 'Need it now → platform first; migrate later if needed.' },
      ],
    ),
    checklist(
      'Questions to ask before you commit',
      [
        'Can I export my products, customers and orders at any time?',
        'What are all the fees, including payments and apps?',
        'How does it handle SEO: URLs, metadata, structured data, speed?',
        'What happens at peak traffic?',
        'How are security, PCI compliance and backups handled?',
        'How easily can I change platform later?',
      ],
    ),
    cta(
      'Planning an online store and unsure which route fits? Tell us what you sell and how, and we will recommend a platform — or tell you honestly when custom is not worth it.',
      '/contact',
      'Get an e-commerce recommendation',
    ),
  ],
  faqs: [
    {
      question: 'Is Shopify or WooCommerce better?',
      answer:
        'Shopify is better when you want a fast, managed setup with little maintenance. WooCommerce is better when you want maximum flexibility and control, and you can manage hosting and updates. The right choice depends on your products, team and plans.',
    },
    {
      question: 'When should I build a custom online store?',
      answer:
        'When your products, pricing or checkout do not fit standard platforms, you need deep integrations with internal systems, or platform fees and workarounds are costing more than a tailored build.',
    },
    {
      question: 'Which platform is cheapest?',
      answer:
        'It depends on the time horizon. Platforms are cheapest to start; costs then grow with apps, fees and sales. WooCommerce shifts costs to hosting and maintenance, and custom stores have higher upfront cost but no platform fees.',
    },
    {
      question: 'Can I move platforms later?',
      answer:
        'Usually yes, but migrations take effort — especially to keep URLs and SEO intact. Choose a platform that lets you export your data, and plan redirects if you ever switch.',
    },
  ],
}
