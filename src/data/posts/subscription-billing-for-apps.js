import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'subscription-billing-for-apps',
  title: 'Building Subscriptions and Billing Into Your App',
  shortTitle: 'Subscription billing for apps',
  description:
    'How to build subscription billing into your app: plans, trials, proration, failed payment recovery, taxes, invoices and app store billing rules.',
  date: '2027-01-31',
  updated: '2027-01-31',
  category: 'Custom Software',
  keywords:
    'subscription billing implementation, how to implement subscriptions with stripe, failed payment retries dunning, proration explained, saas billing system, in app subscriptions app store, recurring billing tax',
  service: { label: 'SaaS & web application development', to: '/saas-development' },
  related: ['saas-pricing-models-explained', 'payment-gateways-compared', 'how-to-build-a-saas-product', 'saas-metrics-guide'],
  intro:
    'Subscription billing looks simple from the outside: charge a customer every month. Underneath, it is a surprisingly deep problem. Customers upgrade mid-cycle, downgrade, pause, add seats, use a free trial, change cards, dispute charges, move countries with different tax rules and have payments fail for a dozen reasons. Each case needs defined behaviour, correct accounting and a good customer experience. Get it wrong and you lose revenue quietly through failed payments, annoy customers with surprise charges or create accounting and tax headaches. Because billing touches money, trust and law, it is also one of the areas where building everything yourself is rarely wise. This guide explains how subscription billing works, the concepts and edge cases to design for, whether to build or use a billing provider, how to handle failed payments, taxes and invoices, what changes on mobile app stores and a checklist for building a reliable system.',
  takeaways: [
    'Model plans, prices, subscriptions, invoices and payments as separate concepts; subscriptions are a state machine with many transitions.',
    'Use a specialised billing provider rather than building the core yourself; focus your effort on integration and customer experience.',
    'Failed payments are a major source of involuntary churn; build smart retries, notifications and card-update flows.',
    'Plan for proration, trials, upgrades, downgrades, cancellation, refunds and taxes before launch.',
    'Mobile app stores have their own billing rules for digital goods, which affect how you structure subscriptions.',
  ],
  blocks: [
    h2('The building blocks of subscription billing'),
    p(
      'Before writing code, understand the concepts, which every billing system shares in some form.',
    ),
    table(
      'Core billing concepts',
      ['Concept', 'What it is'],
      [
        ['Product and plan', 'What you sell and the pricing terms: monthly or annual, per seat, usage-based or flat'],
        ['Price', 'The amount, currency and billing interval attached to a plan'],
        ['Customer', 'The paying entity, with payment methods, billing address and tax details'],
        ['Subscription', 'The ongoing agreement linking a customer to plan(s), with a status and a billing cycle'],
        ['Invoice', 'A document that records what is owed for a period, including taxes and credits'],
        ['Payment and payment method', 'The charge attempt and the card, bank account or wallet used'],
        ['Entitlements', 'What the customer may use in your product, as determined by their plan and status'],
        ['Coupons and credits', 'Discounts, trials and account credit applied to invoices'],
      ],
    ),
    p(
      'A subscription typically moves through states such as trialing, active, past due, paused, canceled and expired. Your application should treat the billing provider as the source of truth for these states and update entitlements, what the customer can do, accordingly. The design of plans and prices themselves is covered in [SaaS pricing models explained](/blog/saas-pricing-models-explained).',
    ),

    h2('Build or buy the billing engine?'),
    compare(
      'Custom billing vs. a billing platform',
      {
        title: 'Use a billing provider',
        points: [
          'Handles recurring charges, invoices, taxes, proration and retries',
          'Security and compliance of payment handling are managed',
          'Faster to launch and fewer money bugs',
          'Fees per transaction or subscription; some constraints',
        ],
      },
      {
        title: 'Build your own billing logic',
        tone: 'bad',
        points: [
          'Full control, but a huge surface of edge cases',
          'You own accuracy, auditing and compliance',
          'Time diverted from your actual product',
          'Rarely justified outside very unusual models',
        ],
      },
    ),
    p(
      'Most products should use a provider’s subscription and invoicing features on top of a payment gateway; see [payment gateways compared](/blog/payment-gateways-compared) for how to evaluate options, including regional availability. Your code then handles integration: creating customers and subscriptions, reacting to events and mapping billing state to product access. The hardest part, correctness across edge cases, is largely delegated.',
    ),

    h2('Designing the integration'),
    steps(
      'A typical integration flow',
      [
        { title: 'Create the customer', text: 'When a user or organisation signs up, create a matching customer record at the provider.' },
        { title: 'Collect payment details securely', text: 'Use the provider’s hosted checkout or embedded fields so card data never touches your servers.' },
        { title: 'Create the subscription', text: 'Attach the chosen plan, trial and coupons.' },
        { title: 'Listen for events', text: 'Receive webhooks for payments, failures, upgrades and cancellations; see [webhooks vs. polling](/blog/webhooks-vs-polling).' },
        { title: 'Update entitlements', text: 'Grant or restrict features based on subscription status.' },
        { title: 'Provide self-service', text: 'A customer portal to change plans, update cards, view invoices and cancel.' },
        { title: 'Reconcile', text: 'Regularly compare provider data with your own records.' },
      ],
    ),
    ul(
      '**Make webhook handling idempotent and verified:** events can arrive late, twice or out of order.',
      '**Store the provider’s IDs** alongside your customer and subscription records.',
      '**Keep entitlement logic in one place,** so access rules do not scatter across the code.',
      '**Use test mode and sandbox clocks** to simulate renewals, failures and trials.',
    ),

    h2('Trials, upgrades, downgrades and proration'),
    h3('Free trials'),
    p(
      'Decide whether trials require a card upfront (higher conversion to paid per trial but fewer trial starts) or not (more signups, lower conversion). Define what happens at the end: automatic conversion, expiry to a free tier or a request for payment. Send reminders before conversion; surprise charges breed refunds and complaints, and in some regions, rules require clear notice.',
    ),
    h3('Upgrades and downgrades'),
    p(
      '**Proration** adjusts charges when a customer changes plans mid-cycle: crediting unused time on the old plan and charging for the new one. Decide the policy: immediate upgrade with prorated charge, downgrade at the end of the period, or immediate downgrade with credit. Be consistent and explain it clearly in the interface. Seat-based plans need rules for adding and removing users during the term.',
    ),
    h3('Cancellation, pausing and refunds'),
    p(
      'Make cancellation easy; hiding it harms trust and may violate consumer rules in some places. Decide whether cancellation takes effect immediately or at period end, whether you offer pauses or downgrades as alternatives and how refunds work. Capture a reason for cancelling, which is valuable product feedback; see [SaaS metrics guide](/blog/saas-metrics-guide).',
    ),
    h3('Annual plans and discounts'),
    p(
      'Annual billing improves cash flow and retention, usually with a discount. Handle renewal reminders, price changes for existing customers and refund policies for mid-term cancellations.',
    ),

    h2('Failed payments and involuntary churn'),
    p(
      'A significant share of churn in subscription businesses is involuntary: the customer wanted to continue but the payment failed because of an expired card, insufficient funds, a bank decline or a changed card number. Recovering these payments is among the highest-return improvements you can make. The process is often called **dunning**.',
    ),
    checklist(
      'A strong failed-payment strategy',
      [
        'Automatic retries on a sensible schedule, since many failures are temporary',
        'Pre-expiry reminders asking customers to update cards before they fail',
        'Clear, friendly emails and in-app prompts when a payment fails, with a direct link to update payment details',
        'A grace period before restricting access, so a minor failure does not lock out a loyal customer',
        'Use of card account updater services offered by networks and providers where available',
        'Support for alternative payment methods such as bank debits and wallets',
        'Monitoring of failure reasons and recovery rates',
        'A defined final step: suspend, downgrade or cancel after the grace period, with data retention rules',
      ],
    ),
    callout(
      'tip',
      'Measure recovery',
      'Track how many failed payments are recovered and how quickly. Small improvements to retry timing and messaging can add meaningful revenue with no new customers.',
    ),

    h2('Taxes, invoices and compliance'),
    p(
      'Selling subscriptions across borders brings tax obligations: value added tax, goods and services tax and sales tax rules vary by country and region, and digital services are often taxed where the customer is located. You may need to collect tax IDs from business customers, apply reverse-charge rules, register in jurisdictions and file returns. Billing providers and dedicated tax services can calculate and collect tax and generate compliant invoices, but you remain responsible for compliance; take advice from a qualified accountant. Invoices should include the required details for the customer’s location, and receipts and invoice history should be accessible in the customer portal.',
    ),
    ul(
      '**Collect accurate billing addresses and tax IDs.**',
      '**Store invoices and records** for the legally required period.',
      '**Support multiple currencies** if you sell internationally, and be clear about which currency customers are charged in.',
      '**Comply with consumer rules** on renewals, trials, price changes and cancellation in the markets you serve.',
      '**Handle data protection:** billing data is personal data; see [GDPR and cookie consent for websites](/blog/gdpr-cookie-consent-for-websites) for the principles.',
    ),

    h2('Usage-based and hybrid billing'),
    p(
      'Some products charge by usage: messages sent, gigabytes stored, API calls, active users. Usage-based billing requires reliably metering consumption, aggregating it per billing period, handling late events and presenting clear usage to customers before the bill arrives. Hybrid models combine a base subscription with usage overages. They align price with value but add engineering complexity and make revenue less predictable, so be sure the metering is accurate and auditable.',
    ),
    table(
      'Billing models and their implementation demands',
      ['Model', 'Implementation notes'],
      [
        ['Flat monthly or annual', 'Simplest; focus on renewals, upgrades and failed payments'],
        ['Per seat', 'Seat counting, mid-term additions and proration, and admin controls'],
        ['Tiered plans with limits', 'Entitlement enforcement and upgrade prompts'],
        ['Usage-based', 'Reliable metering, aggregation, caps, alerts and transparent usage reporting'],
        ['Hybrid base plus overage', 'Both of the above, plus clear invoices explaining each component'],
      ],
    ),

    h2('Mobile apps: store billing rules'),
    p(
      'If you sell digital subscriptions inside iOS and Android apps, the platform stores have their own in-app purchase and billing systems, fees and policies. In many cases, digital goods consumed in the app must use the store’s billing, which changes how you integrate: purchases are verified through store receipts or server notifications, and renewals and cancellations are managed through the store. Policies and regional exceptions have been changing, so check current developer terms. Many businesses support both store-based subscriptions and web-based billing for customers who sign up on the website, then reconcile entitlements across channels. Our overview of [mobile app monetization models](/blog/mobile-app-monetization-models) and the review notes in [publishing an app on the App Store and Google Play](/blog/publish-an-app-on-the-app-store-and-google-play) explain the context.',
    ),

    h2('Testing and operating billing'),
    ul(
      '**Test the whole lifecycle:** signup, trial, conversion, renewal, failure, recovery, upgrade, downgrade, cancellation, refund.',
      '**Use test clocks or simulated time** to verify renewals and trial endings.',
      '**Test with different currencies, tax scenarios and edge cases** such as leap days and month ends.',
      '**Monitor key signals:** failed webhook deliveries, mismatched states between systems, spikes in failures and refunds.',
      '**Reconcile regularly** between your billing provider, your database and your accounting system; see [accounting and bookkeeping automation](/blog/accounting-and-bookkeeping-automation) if you want to automate the books.',
      '**Support staff tools:** the ability to view a customer’s billing history, issue credits and refunds and fix problems without developer help.',
    ),

    h2('Common mistakes'),
    ul(
      '**Building billing from scratch** and underestimating edge cases.',
      '**Treating your database as the source of truth** instead of the billing provider’s state, leading to mismatches.',
      '**No dunning process,** letting involuntary churn drain revenue.',
      '**Surprise charges at trial end,** causing refunds and complaints.',
      '**Hard-to-find cancellation,** damaging trust.',
      '**Ignoring tax obligations** until they become urgent.',
      '**Unverified or non-idempotent webhooks,** causing duplicate or missing state changes.',
      '**Not planning for app store billing** on mobile.',
    ),
    cta(
      'Need reliable subscriptions and billing in your product? We integrate billing providers, build customer portals, handle failed-payment recovery and connect billing to your app’s access rules.',
      '/contact',
      'Build your billing system',
    ),
  ],
  faqs: [
    {
      question: 'How do I implement subscriptions with Stripe?',
      answer:
        'Create products and prices, create customers, use hosted checkout or embedded fields to collect payment details, create subscriptions, handle webhook events to update access, provide a customer portal and test the lifecycle in test mode before going live.',
    },
    {
      question: 'How do I handle failed payments?',
      answer:
        'Use automatic retries, reminders before cards expire, clear notifications with an easy way to update payment details, a grace period before restricting access, and monitor recovery rates.',
    },
    {
      question: 'What is proration?',
      answer:
        'Proration adjusts charges when a customer changes plan or seats mid-cycle, crediting unused time on the old plan and charging for the new one for the remaining period.',
    },
    {
      question: 'Should I build my own billing system?',
      answer:
        'Usually not. Billing has many edge cases involving money, tax and compliance. Use a specialised provider and focus your effort on integration and customer experience.',
    },
    {
      question: 'Do I have to use app store billing in my mobile app?',
      answer:
        'For digital goods consumed in the app, the stores generally require their own billing systems, with exceptions emerging in some regions. Check current policies for each store and your target markets.',
    },
  ],
}
