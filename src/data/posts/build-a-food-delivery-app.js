import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'build-a-food-delivery-app',
  title: 'How to Build a Food Delivery App: A Practical Plan',
  shortTitle: 'Build a food delivery app',
  description:
    'How to build a food delivery app: business models, features for customers, restaurants and couriers, costs, tech choices, launch plan and common pitfalls.',
  date: '2026-12-03',
  updated: '2026-12-03',
  category: 'App Development',
  keywords:
    'food delivery app development, build a food delivery app, food delivery app cost, restaurant ordering app features, delivery app business model, white label food delivery, courier app',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['build-an-app-like-uber', 'how-much-does-a-mobile-app-cost', 'mvp-development-guide-for-startups', 'mobile-app-security-checklist'],
  intro:
    'Food delivery has become part of daily life, and not only for the giant platforms. Independent restaurants want their own ordering apps to avoid high commissions, cities and niche communities want local alternatives, and entrepreneurs see opportunities in specialised delivery such as healthy meals, groceries or catering. But a food delivery app is more than a menu and a pay button. It is a three-sided system that connects customers, restaurants and couriers, with real-time orders, payments, tracking and operations that must run smoothly at peak lunchtimes. This guide explains how to plan one: which model suits you, what each user type needs, the technology and cost drivers, and how to launch lean without trying to compete with the global giants on day one.',
  takeaways: [
    'Choose your model first: a single-restaurant ordering app, a multi-restaurant marketplace or a delivery-only service.',
    'You need a customer app, a restaurant or vendor tool, a courier solution and an admin dashboard, or integrations that cover them.',
    'Operations decide success: restaurant onboarding, courier supply, delivery times and food quality.',
    'Build a lean MVP for one area, then use real data on orders and delays to prioritise features.',
    'Unit economics are tight; model commissions, delivery costs, payment fees and incentives before you build.',
  ],
  blocks: [
    h2('Pick the right business model'),
    p(
      'Before features, decide which problem you are solving and for whom. The three most common models are very different projects with very different costs.',
    ),
    table(
      'Food delivery models compared',
      ['Model', 'What it is', 'Complexity', 'Best for'],
      [
        ['Single-restaurant app', 'One brand’s own ordering app, with pickup or its own drivers', 'Lower', 'Restaurants and chains avoiding marketplace commissions'],
        ['Multi-vendor marketplace', 'Many restaurants on one platform with shared couriers', 'High', 'Local aggregators and niche platforms'],
        ['Delivery-only or logistics', 'Couriers deliver for restaurants that run their own ordering', 'Medium to high', 'Delivery operators and fleets'],
        ['Meal prep or subscription', 'Scheduled recurring orders from a central kitchen', 'Medium', 'Healthy-meal and subscription businesses'],
      ],
    ),
    p(
      'If you are a restaurant owner, a single-restaurant app is usually the safest start. If you are building a marketplace, the principles in [how to build an app like Uber](/blog/build-an-app-like-uber) apply directly: two-sided supply and demand, real-time matching and operations as important as software.',
    ),

    h2('Who uses the system and what they need'),
    h3('Customers'),
    ul(
      'Sign-up or guest checkout, and saved addresses and payment methods.',
      'Browse restaurants or menus with search, filters, photos and dietary information.',
      'Customise items, add notes and see accurate prices, taxes and fees.',
      'Payments by card, wallet or cash on delivery where appropriate.',
      'Live order tracking with status updates and estimated arrival.',
      'Order history, reordering, ratings and support.',
      'Offers, loyalty rewards and referral codes.',
    ),
    h3('Restaurants or vendors'),
    ul(
      'A tablet app or dashboard to receive and accept orders, with a loud alert.',
      'Menu management: items, prices, availability, modifiers and opening hours.',
      'Preparation time settings and the ability to pause orders when busy.',
      'Order history, earnings reports and payout details.',
      'Integration with existing point-of-sale or kitchen systems where possible.',
    ),
    h3('Couriers'),
    ul(
      'Onboarding, document verification and availability toggle.',
      'Order requests or batches with pickup and drop-off details.',
      'Navigation and proof-of-delivery such as a photo or code.',
      'Earnings, tips and payout tracking.',
    ),
    h3('Admin team'),
    ul(
      'Restaurant and courier management, approvals and suspensions.',
      'Live operations view of orders, delays and courier locations.',
      'Delivery zones, fees, commissions, promotions and surge rules.',
      'Refunds, disputes, reporting and analytics.',
    ),

    h2('The order flow'),
    steps(
      'From craving to doorstep',
      [
        { title: 'Order', text: 'The customer builds a basket and pays.' },
        { title: 'Accept', text: 'The restaurant confirms and sets a preparation time.' },
        { title: 'Dispatch', text: 'A courier is assigned, timed to arrive as food is ready.' },
        { title: 'Pick up and deliver', text: 'Live tracking from kitchen to customer.' },
        { title: 'Complete', text: 'Confirmation, ratings, receipt and settlement.' },
      ],
    ),
    callout(
      'tip',
      'Timing is the product',
      'Customers judge a delivery by how hot and on time the food arrives. Good estimates, courier assignment that matches kitchen preparation, and honest status updates matter more than flashy features.',
    ),

    h2('Technology you will need'),
    table(
      'Core building blocks',
      ['Capability', 'Why it matters'],
      [
        ['Real-time orders and notifications', 'Restaurants must see orders instantly; customers need live status'],
        ['Maps, geocoding and routing', 'Delivery zones, distance fees, courier navigation and estimates'],
        ['Payments with split or payout support', 'Collect from customers, pay restaurants and couriers, handle refunds'],
        ['Menu and inventory management', 'Prices, modifiers, availability and tax rules'],
        ['Dispatch logic', 'Assign and batch orders efficiently'],
        ['Admin and analytics', 'Operate, support and improve the service'],
        ['Security and privacy', 'Protect payment, address and personal data; see our [mobile app security checklist](/blog/mobile-app-security-checklist)'],
      ],
    ),
    p(
      'A cross-platform mobile framework can reduce cost for customer and courier apps, while the restaurant side often works well as a web dashboard or tablet app. If you are weighing options for your build, our guide to [React Native vs. Flutter vs. native](/blog/react-native-vs-flutter-vs-native) explains the trade-offs. Many founders also consider a white-label or ready-made platform to launch sooner, which is cheaper upfront but limits customisation, as discussed in [custom software vs. off-the-shelf](/blog/custom-software-vs-off-the-shelf).',
    ),

    h2('Costs and what drives them'),
    p(
      'Costs depend on scope: the number of apps (customer, courier, restaurant, admin), platforms (iOS, Android, web), the level of real-time and dispatch sophistication, the number of integrations (payments, maps, POS, SMS) and the standard of design and testing. A single-restaurant ordering app costs far less than a full marketplace with courier management. Remember running costs: map and messaging fees, payment processing, hosting, support, and maintenance. Our [mobile app cost guide](/blog/how-much-does-a-mobile-app-cost) breaks down these drivers in detail.',
    ),
    compare(
      'Launch lean or go big?',
      {
        title: 'Lean MVP',
        points: [
          'One area, a small group of restaurants',
          'Simple dispatch, maybe even manual assignment at first',
          'Core ordering, payment and tracking',
          'Quick to build and learn from',
        ],
      },
      {
        title: 'Full platform from day one',
        tone: 'bad',
        points: [
          'Many features before proving demand',
          'High cost and long time to market',
          'Hard to change when real behaviour differs',
          'Operations overwhelmed by complexity',
        ],
      },
    ),

    h2('How food delivery apps make money'),
    ul(
      '**Commission** on each order from restaurants, the standard marketplace model.',
      '**Delivery and service fees** charged to customers.',
      '**Subscriptions** that give customers free or reduced delivery.',
      '**Advertising and promoted listings** for restaurants.',
      '**Direct ordering for a single brand,** replacing third-party commissions with your own channel.',
    ),
    p(
      'Margins are thin, and delivery costs, courier pay, refunds and incentives can erase them. Model unit economics per order before you launch, and test pricing in your first area.',
    ),

    h2('Operations: the part that decides success'),
    checklist(
      'What to plan beyond the software',
      [
        'Restaurant onboarding: contracts, menus, photos and training',
        'Courier recruitment, vetting, insurance and payment',
        'Food safety, packaging standards and handling complaints',
        'Customer support for late, missing or wrong orders',
        'Local regulations, licensing and tax for food and delivery',
        'A launch area small enough to serve well',
        'Marketing to both restaurants and customers',
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Starting a marketplace without supply:** launch with enough restaurants and couriers in one tight area.',
      '**Ignoring unit economics:** growth that loses money on every order is not a business.',
      '**Overbuilding features:** loyalty programmes and AI recommendations can wait.',
      '**Weak restaurant tools:** if restaurants find the order tablet frustrating, they will leave.',
      '**Underestimating support:** late and wrong orders are part of the business and need a process.',
    ),
    p(
      'Define your first release carefully using a written brief; the guidance in [how to write an app requirements document](/blog/how-to-write-an-app-requirements-document) and the [MVP development guide](/blog/mvp-development-guide-for-startups) will keep it focused.',
    ),
    h2('A realistic first launch'),
    p(
      'Imagine a neighbourhood restaurant group with three locations that currently pays heavy commissions on a global platform. Their first release might be a branded ordering app and website for just those three kitchens, with menu management, card payments, pickup and delivery within a small radius, and a tablet that rings when an order arrives. Deliveries are handled by their own drivers, assigned manually from a simple dashboard. After two months, the data shows which dishes sell, which hours are busiest and where delays happen. Only then do they add courier tracking, loyalty rewards and perhaps invite nearby restaurants onto the platform. The software grows in step with the operation, instead of racing ahead of it.',
    ),
    p(
      'The lesson applies to marketplaces too: prove that orders flow smoothly in a small area, then expand. Every new restaurant, courier and neighbourhood adds operational load, and the product should earn that growth with reliable service.',
    ),
    cta(
      'Planning a food delivery or online ordering app? We help restaurants and founders choose the right model, scope a lean MVP and build the apps and admin tools to run it.',
      '/contact',
      'Plan your delivery app',
    ),
  ],
  faqs: [
    {
      question: 'How much does a food delivery app cost?',
      answer:
        'It depends on the model and scope. A single-restaurant ordering app is much cheaper than a multi-vendor marketplace with courier apps and dispatch. Costs are driven by the number of apps, platforms, integrations and the sophistication of real-time features.',
    },
    {
      question: 'What features does a delivery app need?',
      answer:
        'Customers need browsing, ordering, payment and tracking; restaurants need order management and menu control; couriers need job handling and navigation; and admins need operations, pricing, payouts and analytics tools.',
    },
    {
      question: 'How do I get restaurants on my app?',
      answer:
        'Start in one small area, offer clear value such as lower commission or marketing support, make onboarding easy with menu help and give them reliable, simple order tools. Personal relationships matter more than ads at the start.',
    },
    {
      question: 'Should I build a custom app or use a white-label platform?',
      answer:
        'White-label solutions launch faster and cost less upfront but limit customisation. Custom builds suit unique features, branding and integrations. Many start with a lean custom MVP or white-label test, then invest as demand is proven.',
    },
    {
      question: 'Can restaurants avoid marketplace commissions with their own app?',
      answer:
        'Yes, a branded ordering app or website lets restaurants take orders directly, though they must handle marketing, delivery and customer acquisition themselves.',
    },
  ],
}
