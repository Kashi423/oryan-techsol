import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'build-a-marketplace-app-or-website',
  title: 'How to Build a Marketplace App or Website: Models, Features and Costs',
  shortTitle: 'Build a marketplace app or website',
  description:
    'How to build an online marketplace: business models, the chicken-and-egg problem, must-have features, payments and trust, tech choices, costs and a launch plan.',
  date: '2026-12-04',
  updated: '2026-12-04',
  category: 'App Development',
  keywords:
    'build a marketplace app, how to build an online marketplace, marketplace website development, two sided marketplace, marketplace commission model, marketplace features, marketplace mvp',
  service: { label: 'SaaS & web application development', to: '/saas-development' },
  related: ['mvp-development-guide-for-startups', 'how-to-build-a-saas-product', 'build-an-app-like-uber', 'shopify-vs-woocommerce-vs-custom-store'],
  intro:
    'Marketplaces connect buyers and sellers, and some of the world’s largest companies are built on the idea. They are also among the hardest businesses to start. Unlike a normal website or shop, a marketplace needs two groups to show up at once, and neither wants to join an empty platform. Technically, it adds complexity beyond a standard e-commerce store: multiple sellers, listings, split payments, reviews, disputes and trust. This guide explains how marketplaces work, how to choose a model and niche, which features you truly need at launch, how to handle payments and trust, whether to build or use a platform, and how to approach the chicken-and-egg problem without burning your budget.',
  takeaways: [
    'A marketplace is a two-sided business: solving supply and demand together matters more than any feature.',
    'Pick a narrow niche and geography; focused marketplaces are easier to seed and to trust.',
    'The core loop is search, listing, communication, payment, fulfilment and review; build that first.',
    'Payments, trust and safety are central: use regulated providers and clear policies.',
    'Prove demand manually before heavy engineering, then build a lean MVP and expand from data.',
  ],
  blocks: [
    h2('What makes a marketplace different'),
    p(
      'A conventional online shop sells its own products. A marketplace sells **other people’s** products or services and earns a share of the transactions. That single difference changes everything. You need to recruit and manage sellers, show many listings from different suppliers, handle payments between parties, build trust between strangers and referee disputes. Your product is not an inventory; it is a network, and its value grows with the number of participants on both sides.',
    ),
    table(
      'Common marketplace types',
      ['Type', 'Examples of what is traded', 'How it earns'],
      [
        ['Product marketplace', 'Goods from many sellers', 'Commission, listing fees, advertising'],
        ['Service marketplace', 'Freelancers, tradespeople, tutors, consultants', 'Commission or fees on bookings'],
        ['Rental and booking marketplace', 'Accommodation, equipment, spaces', 'Booking fees, host or guest fees'],
        ['B2B marketplace', 'Wholesale, industrial supplies, software', 'Commission, subscriptions, lead fees'],
        ['Classifieds', 'Jobs, property, vehicles', 'Paid listings, featured placement'],
        ['On-demand marketplace', 'Immediate local services such as delivery and rides', 'Commission per job; see [building an app like Uber](/blog/build-an-app-like-uber)'],
      ],
    ),

    h2('The chicken-and-egg problem'),
    p(
      'Buyers will not come if there are no sellers, and sellers will not come without buyers. Most marketplaces that succeed solve it deliberately rather than waiting for network effects to appear. The usual tactics are to start narrow, seed supply first and make the first transactions happen by hand.',
    ),
    ul(
      '**Pick a tight niche or location:** density in one small area beats thin coverage everywhere.',
      '**Seed the supply side:** recruit the first sellers personally, offer low or zero fees, and help them create excellent listings.',
      '**Create supply yourself if needed:** some marketplaces begin by listing inventory scraped or curated with permission, or operating as a service, before opening up.',
      '**Concierge the demand side:** personally match early buyers to sellers and learn why deals fail.',
      '**Give one side a reason to come alone:** a tool or service that is valuable without the network, such as software for sellers.',
    ),
    callout(
      'tip',
      'Test it before you build it',
      'You can often prove a marketplace with a simple website, a spreadsheet and manual matching. If you cannot make ten real transactions happen by hand, software will not fix the problem. Our [guide to validating an idea](/blog/how-to-validate-an-app-idea) covers practical tests.',
    ),

    h2('Core features for a first release'),
    p(
      'A marketplace MVP needs fewer features than most founders expect, but each must work well. Focus on the core loop.',
    ),
    steps(
      'The marketplace loop',
      [
        { title: 'List', text: 'Sellers create accurate, attractive listings.' },
        { title: 'Discover', text: 'Buyers search, filter and compare.' },
        { title: 'Communicate', text: 'Questions, offers or bookings between the parties.' },
        { title: 'Pay', text: 'Secure payment held and released correctly.' },
        { title: 'Fulfil', text: 'Delivery or service happens and is confirmed.' },
        { title: 'Review', text: 'Both sides rate the experience, building trust.' },
      ],
    ),
    checklist(
      'MVP feature checklist',
      [
        'Buyer and seller registration with profiles',
        'Listing creation with images, descriptions, prices and availability',
        'Search, categories and filters',
        'Messaging or enquiry flow between buyer and seller',
        'Checkout or booking with split payments and seller payouts',
        'Order or booking management for both sides',
        'Reviews and ratings',
        'Notifications by email and push',
        'Admin dashboard: moderation, users, listings, disputes, payouts and reporting',
        'Basic terms, privacy policy and clear marketplace rules',
      ],
    ),
    p(
      'Leave advanced features for later: recommendation engines, loyalty programmes, subscriptions, advanced analytics and mobile apps if a responsive website will do. This is the lean approach of the [MVP development guide](/blog/mvp-development-guide-for-startups).',
    ),

    h2('Payments, trust and safety'),
    p(
      'Money and trust are where marketplaces succeed or collapse. You need to collect payment from the buyer, hold it, release it to the seller when appropriate, take your commission and handle refunds and chargebacks. Handling funds yourself can bring regulatory obligations, so most marketplaces use a payment provider built for marketplaces that handles seller onboarding, identity checks, split payments and payouts in a compliant way. Compare options in our guide to payment gateways and take legal advice about regulation in your region.',
    ),
    table(
      'Building trust between strangers',
      ['Mechanism', 'What it does'],
      [
        ['Verified profiles', 'Identity and credential checks for sellers (and sometimes buyers)'],
        ['Reviews and ratings', 'Social proof from real transactions only'],
        ['Escrow-style payments', 'Funds released after delivery or completion'],
        ['Clear policies', 'Rules on cancellations, returns, prohibited items and conduct'],
        ['Dispute process', 'A fair way to resolve problems quickly'],
        ['Moderation', 'Review of listings and reports to remove fraud and abuse'],
      ],
    ),
    p(
      'Keep users on your platform. If buyers and sellers can easily take deals offline after first contact, you lose revenue and the trust mechanisms. Good design gives them reasons to stay: payment protection, scheduling, reviews, insurance and tools.',
    ),

    h2('Build, buy or assemble?'),
    compare(
      'Options for building a marketplace',
      {
        title: 'Ready-made platforms and plugins',
        points: [
          'Fast and cheap to launch and test',
          'Good for simple marketplaces and validation',
          'Limited customisation and branding',
          'May not scale to unique workflows',
        ],
      },
      {
        title: 'Custom-built marketplace',
        points: [
          'Fits your workflows, pricing and trust model',
          'Full control of data, features and growth',
          'Higher upfront cost and longer build',
          'Best once demand is proven or needs are unusual',
        ],
      },
    ),
    p(
      'A sensible path for many founders is to validate with a simple platform or manual process, then invest in custom development when you know what really matters. If your marketplace is mainly a catalogue with a single operator, compare approaches in [Shopify vs. WooCommerce vs. a custom store](/blog/shopify-vs-woocommerce-vs-custom-store). Marketplaces sold as subscriptions share much with [building a SaaS product](/blog/how-to-build-a-saas-product).',
    ),

    h2('How much will it cost?'),
    p(
      'Cost depends on features, platforms, custom logic, integrations and the standard of design, security and testing. A lean web-based MVP is far cheaper than a polished multi-platform product with advanced search, messaging and analytics. The big variable factors are the payment and payout setup, search and filtering sophistication, the admin tooling and verification flows, and whether you build native mobile apps. Do not forget running costs: hosting, payment fees, email and messaging, moderation, support and ongoing development. Our [mobile app cost guide](/blog/how-much-does-a-mobile-app-cost) outlines how to think about drivers and ranges.',
    ),

    h2('Revenue models'),
    ul(
      '**Commission:** a percentage of each transaction, the most common and aligned with seller success.',
      '**Subscription:** sellers pay monthly for access, tools or higher visibility.',
      '**Listing fees:** pay to publish or renew listings.',
      '**Advertising and promotion:** featured placements and sponsored listings.',
      '**Lead generation:** charge for qualified enquiries rather than completed sales.',
    ),
    p(
      'Choose a model that fits how value is created. If most deals happen off-platform, commission is hard to collect and a subscription or lead fee may suit better.',
    ),

    h2('Common mistakes'),
    ul(
      '**Building before validating:** engineering will not create supply or demand.',
      '**Too broad a focus:** trying to be “the marketplace for everything”.',
      '**Weak onboarding for sellers:** poor listings make the whole platform look bad.',
      '**Ignoring trust and safety:** fraud and bad experiences destroy early reputation.',
      '**Neglecting operations:** support, moderation and disputes need people and processes.',
      '**Charging too early or too much:** early fees can stop liquidity forming.',
    ),
    h2('A worked example: a niche services marketplace'),
    p(
      'Suppose you want to connect homeowners with vetted restoration carpenters in one city. Instead of building a full platform, you begin with a simple landing page, a short request form and a spreadsheet. You recruit ten carpenters by phone, promise them leads with no fees for the first quarter, and personally match each incoming request. After thirty jobs, you know typical prices, what customers ask, which carpenters respond quickly and why some deals fail. You then build a lean platform: request forms, carpenter profiles with portfolios, quotes, secure deposit payments and reviews. Because you learned the process by hand, the software encodes what actually works rather than what you imagined. That sequence, manual first and software second, is why many successful marketplaces started as scrappy services.',
    ),
    cta(
      'Planning a marketplace? We help founders validate the model, scope a lean MVP and build secure, scalable marketplace platforms with payments, trust features and admin tools.',
      '/contact',
      'Start your marketplace project',
    ),
  ],
  faqs: [
    {
      question: 'How do marketplaces solve the chicken and egg problem?',
      answer:
        'They start narrow, seed one side first (usually supply), make early transactions happen manually, offer low or no fees initially and focus on a small niche or location until there is enough activity on both sides.',
    },
    {
      question: 'What commission should a marketplace charge?',
      answer:
        'It varies by category and value delivered. Start lower to attract sellers, then adjust as you add value such as payments, protection and customers. Test, compare with alternatives and make sure unit economics work.',
    },
    {
      question: 'Which payment system works for marketplaces?',
      answer:
        'Use a provider designed for marketplaces that supports seller onboarding, split payments, payouts and compliance. Compare features, fees and regional availability, and take advice on regulation.',
    },
    {
      question: 'How much does it cost to build a marketplace?',
      answer:
        'Costs range widely with scope. A lean web-based MVP costs much less than a multi-platform product with advanced features. Define a focused first release and budget for ongoing operations and maintenance.',
    },
    {
      question: 'Should I build a marketplace on a ready-made platform?',
      answer:
        'It is a good way to validate quickly and cheaply. Move to custom development when you outgrow its limits or have proven demand and unique requirements.',
    },
  ],
}
