import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'payment-gateways-compared',
  title: 'Payment Gateways Compared: Stripe, PayPal and Local Options',
  shortTitle: 'Payment gateways compared',
  description:
    'Payment gateways compared for small business: how they work, fees, Stripe vs PayPal vs local options, security and PCI, checkout design and how to choose.',
  date: '2026-12-25',
  updated: '2026-12-25',
  category: 'Web Development',
  keywords:
    'payment gateway comparison, stripe vs paypal, best payment gateway for small business, payment gateway fees, how to add stripe to website, pci compliance, accept payments online',
  service: { label: 'E-commerce solutions', to: '/ecommerce' },
  related: ['shopify-vs-woocommerce-vs-custom-store', 'how-to-reduce-cart-abandonment', 'invoice-and-payment-automation-guide', 'website-security-basics-for-small-business'],
  intro:
    'Taking payments online sounds simple until you start comparing providers. Each promises easy setup, low fees and global reach, but the details differ: which countries and currencies they support, how much they charge per transaction, how quickly you receive your money, how they handle disputes and fraud, and how well they fit the platform you use. Choose badly and you may face surprise fees, frozen funds or a checkout that loses customers. This guide explains how online payments work, the difference between gateways, processors and payment service providers, how to compare fees honestly, how Stripe, PayPal and regional options typically differ, what security obligations you carry and how to design a checkout that converts. Provider terms change often, so use this as a framework and verify current details before deciding.',
  takeaways: [
    'A payment gateway securely transmits card data; many providers bundle gateway, processor and merchant account in one service.',
    'Compare total cost, not just the headline rate: fixed fees, currency conversion, chargebacks, refunds, payout schedules and monthly charges.',
    'Offer the payment methods your customers actually use, including local ones, wallets and bank transfers.',
    'Use hosted or tokenised checkout so card data never touches your server, reducing security and compliance burden.',
    'Check regional availability, account-holding and risk policies before you build; switching later is painful.',
  ],
  blocks: [
    h2('How online payments work'),
    p(
      'When a customer pays by card, several parties are involved. The **customer** enters card details, the **payment gateway** encrypts and transmits them, the **acquirer or processor** talks to the card networks, the customer’s **issuing bank** approves or declines, and the **funds** are settled to your **merchant account** minus fees. Historically, merchants needed a separate merchant account, a gateway and a processor. Today, most small businesses use a **payment service provider (PSP)** that bundles these into one account and one integration.',
    ),
    steps(
      'The journey of a card payment',
      [
        { title: 'Checkout', text: 'The customer enters payment details on your site or the provider’s hosted page.' },
        { title: 'Authorisation', text: 'The gateway sends the request to the bank for approval.' },
        { title: 'Confirmation', text: 'You receive success or failure and fulfil the order.' },
        { title: 'Settlement', text: 'Funds are paid to you, typically after a short delay.' },
        { title: 'Reconciliation', text: 'Fees, refunds and payouts are matched to orders in your records.' },
      ],
    ),
    table(
      'Key terms',
      ['Term', 'Meaning'],
      [
        ['Payment gateway', 'The technology that securely passes payment data between your site and the processor'],
        ['Processor / acquirer', 'The financial institution that handles authorisation and settlement with card networks'],
        ['Payment service provider (PSP)', 'A provider that bundles gateway, processing and merchant account into one service'],
        ['Merchant account', 'The account that receives the money from card payments'],
        ['Chargeback', 'A dispute where the customer’s bank reverses a payment'],
        ['PCI DSS', 'Security standard for businesses handling card data'],
      ],
    ),

    h2('The main types of provider'),
    compare(
      'All-in-one vs. separate gateway',
      {
        title: 'All-in-one payment service providers',
        points: [
          'Fast signup; one contract and dashboard',
          'Simple pricing and developer-friendly tools',
          'Can freeze or reserve funds if risk rules are triggered',
          'Best for most small and growing businesses',
        ],
      },
      {
        title: 'Separate merchant account and gateway',
        points: [
          'More control and negotiable rates at high volume',
          'More complex setup and underwriting',
          'Better suited to large or high-volume merchants',
          'More parties to manage',
        ],
      },
    ),

    h2('Stripe, PayPal and local options'),
    p(
      'We avoid quoting specific prices, which differ by country and change regularly, but we can describe the typical character of each kind of provider. Always check current pricing and availability on the provider’s site.',
    ),
    table(
      'Typical strengths and trade-offs',
      ['Provider type', 'Strengths', 'Watch out for'],
      [
        ['Stripe-style developer-first PSP', 'Excellent APIs and documentation, wide payment-method support, subscriptions, marketplaces, global coverage in supported countries', 'Availability varies by country; account reviews and holds if risk rules trigger; fees per transaction plus extras'],
        ['PayPal', 'Highly recognised, many customers hold balances, buyer trust and quick checkout', 'Fee structure varies by region and product; dispute and account-limitation policies; some customers dislike redirects'],
        ['Wallets (Apple Pay, Google Pay)', 'One-tap checkout and strong mobile conversion; secure tokenisation', 'Not a standalone processor: used through your PSP'],
        ['Regional and local providers', 'Local methods, bank transfers, cash-based and mobile-money options, local support and currency', 'Integration quality varies; check reliability, API quality and settlement terms'],
        ['Buy now, pay later providers', 'Can lift conversion and basket size for some products', 'Merchant fees are often higher; credit rules apply'],
        ['Bank transfers and direct debits', 'Lower fees, good for recurring or large payments', 'Slower confirmation; different failure and dispute handling'],
      ],
    ),
    callout(
      'tip',
      'Check country coverage before anything else',
      'A provider that is perfect in one market may not support businesses in yours, or may not support your customers’ preferred methods. Verify business-country support, supported currencies and payout currency options first.',
    ),
    p(
      'In many regions, customers strongly prefer local methods such as bank transfers, mobile wallets or specific local cards. Offering them can raise conversion substantially, and some businesses use more than one provider to cover them.',
    ),

    h2('Comparing fees honestly'),
    p(
      'The headline “percentage plus fixed fee” is only part of the cost. Build a spreadsheet of total costs for your expected volume and average order value.',
    ),
    checklist(
      'Fees and terms to compare',
      [
        'Per-transaction percentage and fixed fee, and whether they differ by card type or region',
        'Extra fees for international cards and currency conversion',
        'Monthly, setup, gateway or PCI compliance fees',
        'Chargeback and dispute fees',
        'Refund policy: whether fees are returned',
        'Payout schedule, payout fees and minimum balances',
        'Rolling reserves or holds, and the conditions that trigger them',
        'Fees for additional features such as subscriptions, invoicing or fraud tools',
        'Volume discounts and custom pricing thresholds',
      ],
    ),
    p(
      'A lower headline rate can cost more once currency conversion, chargebacks and payout delays are included, especially for international sales.',
    ),

    h2('Security and compliance'),
    p(
      'Card data is sensitive, and the industry standard, PCI DSS, applies to anyone who stores, processes or transmits it. The simplest and safest approach for small businesses is to **never touch card data yourself**. Use a provider’s hosted checkout page, embedded secure fields or tokenisation so card details go directly to the provider, and you receive only a token. This dramatically reduces your PCI scope and your risk. Complement this with the broader protections in [website security basics](/blog/website-security-basics-for-small-business): HTTPS, updated software and restricted admin access.',
    ),
    ul(
      '**Strong Customer Authentication (SCA) and 3-D Secure:** in some regions, regulations require extra authentication for online card payments; your provider typically handles this flow.',
      '**Fraud tools:** look for built-in risk scoring, address and CVC checks and rules you can tune.',
      '**Chargeback management:** keep order, delivery and communication records to contest unjustified disputes.',
      '**Webhooks and verification:** confirm payment events from the provider rather than trusting the browser; see [webhooks vs. polling](/blog/webhooks-vs-polling) for how to build this reliably.',
    ),

    h2('Checkout experience: where conversions are won or lost'),
    p(
      'The gateway you choose affects your checkout, and the checkout affects your revenue. Reducing friction is as important as fees; see our guide to [reducing cart abandonment](/blog/how-to-reduce-cart-abandonment).',
    ),
    ul(
      '**Offer popular methods:** cards, wallets, local methods and, where relevant, bank transfer or buy-now-pay-later.',
      '**Keep it short:** few fields, guest checkout, autofill and address lookup.',
      '**Be transparent:** show total cost, taxes, shipping and currency before the last step.',
      '**Optimise for mobile:** wallets and large buttons matter.',
      '**Show trust cues:** secure payment badges, clear returns policy and support contact.',
      '**Handle failures gracefully:** clear error messages and a way to try another method.',
    ),

    h2('Subscriptions, invoices and automation'),
    p(
      'If you charge recurring fees or send invoices, check how well the provider supports subscriptions, retries for failed payments, proration, tax handling and customer self-service portals. Connecting payments to your accounting and CRM saves hours; our article on [invoice and payment automation](/blog/invoice-and-payment-automation-guide) shows how, and the platform comparison in [Shopify vs. WooCommerce vs. a custom store](/blog/shopify-vs-woocommerce-vs-custom-store) explains how platform choice influences available gateways.',
    ),

    h2('How to choose'),
    steps(
      'A practical selection process',
      [
        { title: 'Confirm eligibility', text: 'Check supported countries, business types and prohibited categories.' },
        { title: 'List needed methods', text: 'Cards, wallets, local methods and currencies your customers use.' },
        { title: 'Check platform compatibility', text: 'Ensure your shop platform or custom code integrates well.' },
        { title: 'Model total cost', text: 'Use your volume, average order value and mix of countries.' },
        { title: 'Review risk and payout terms', text: 'Understand holds, reserves, disputes and settlement timing.' },
        { title: 'Test the checkout', text: 'Run test payments, refunds and failures before launch.' },
        { title: 'Plan a backup', text: 'Consider a second provider so an account freeze does not stop sales.' },
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Choosing by headline rate alone.**',
      '**Not checking country support or payout currencies** until after building.',
      '**Handling card data directly** instead of using hosted or tokenised fields.',
      '**Having a single provider with no backup** in case of an account hold.',
      '**Ignoring local payment methods** that customers prefer.',
      '**Skipping test mode scenarios,** such as declines and 3-D Secure flows.',
      '**Poor reconciliation:** not matching payouts, fees and refunds to orders.',
    ),
    cta(
      'Need to take payments online or switch providers? We integrate payment gateways, subscriptions and checkout flows securely into custom sites, apps and stores.',
      '/contact',
      'Set up online payments',
    ),
  ],
  faqs: [
    {
      question: 'Which payment gateway has the lowest fees?',
      answer:
        'It depends on your country, volume, average order value and mix of card types and currencies. Compare total cost including fixed fees, currency conversion, chargebacks and payout terms rather than relying on the headline rate.',
    },
    {
      question: 'Can I accept payments in my country if Stripe or PayPal is unavailable?',
      answer:
        'Often yes, through regional payment providers, local banks or aggregators that support your market and customers’ preferred methods. Check coverage, reliability and API quality, and consider a second provider.',
    },
    {
      question: 'How do I add Stripe to my site?',
      answer:
        'Use the provider’s hosted checkout or embedded secure fields via its API or a plugin for your platform, handle payment confirmation through webhooks and test thoroughly in test mode before going live.',
    },
    {
      question: 'Do I need PCI compliance?',
      answer:
        'If you take card payments you must comply with PCI DSS at some level. Using a hosted checkout or tokenised fields from a compliant provider greatly reduces your obligations.',
    },
    {
      question: 'Should I use more than one payment provider?',
      answer:
        'Many businesses do, to offer more methods and to avoid a single point of failure if an account is held or limited. It adds some complexity, so weigh it against your volume and risk.',
    },
  ],
}
