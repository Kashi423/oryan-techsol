import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'how-to-reduce-cart-abandonment',
  title: 'How to Reduce Cart Abandonment: 15 Fixes for Your Online Store',
  shortTitle: 'Reduce cart abandonment',
  description:
    'Why shoppers abandon carts and how to win them back: transparent pricing, faster checkout, trust signals, payment options and recovery emails that work.',
  date: '2026-10-24',
  updated: '2026-10-24',
  category: 'E-commerce',
  keywords:
    'reduce cart abandonment, abandoned cart recovery, ecommerce checkout optimization, improve checkout conversion, cart abandonment emails, checkout friction',
  service: { label: 'E-commerce solutions', to: '/ecommerce' },
  related: ['shopify-vs-woocommerce-vs-custom-store', 'core-web-vitals-explained', 'what-is-api-integration'],
  intro:
    'Most people who add something to an online cart do not buy it — and that is normal. Some are comparing prices or saving items for later; others hit a wall: an unexpected shipping fee, a forced account, a slow page, a confusing form. The second group is where store owners can win. Fixing checkout friction is among the highest-return improvements in e-commerce, because these shoppers have already chosen your product. This guide covers why carts are abandoned and fifteen practical fixes, from checkout design to recovery emails.',
  takeaways: [
    'Abandonment is normal; the goal is to remove avoidable friction and recover the recoverable.',
    'Common causes: surprise costs, forced account creation, long or confusing checkout, lack of trust, slow pages and limited payment options.',
    'Show total cost early, offer guest checkout, minimise form fields and support popular payment methods.',
    'Speed and mobile usability matter enormously — most shopping now happens on phones.',
    'Well-timed, helpful recovery emails and messages can win back a share of lost carts; respect consent rules.',
  ],
  blocks: [
    h2('Why shoppers abandon their carts'),
    p(
      'Different surveys rank the reasons differently, but the themes are consistent. Treat the list below as a diagnostic: find which apply to your store by watching real sessions and checking analytics for where people drop out.',
    ),
    table(
      'Common abandonment causes and the fix direction',
      ['Cause', 'What the shopper experiences', 'Fix direction'],
      [
        ['Unexpected costs', 'Shipping, tax or fees appear at the last step', 'Show full cost early; be transparent'],
        ['Forced account creation', '“Create an account to continue”', 'Offer guest checkout'],
        ['Long or complex checkout', 'Too many steps or fields', 'Streamline; autofill; fewer fields'],
        ['Trust concerns', 'Unsure about security or returns', 'Trust signals; clear policies; secure payments'],
        ['Slow or buggy pages', 'Lag, errors, layout jumps', 'Performance and testing, especially on mobile'],
        ['Limited payment options', 'Preferred method not offered', 'Add popular wallets and local methods'],
        ['Just browsing', 'Comparing or saving for later', 'Save-for-later, reminders, wish lists'],
      ],
    ),

    h2('Fixes for the cart and checkout'),
    h3('1–5: Be clear and quick'),
    ul(
      '**Show shipping and total cost early,** ideally on the product or cart page with a shipping estimator.',
      '**Offer guest checkout** and let people create an account after buying.',
      '**Reduce form fields:** ask only for what you need; use address lookup and autofill.',
      '**Show a progress indicator** so people know how many steps remain.',
      '**Let shoppers edit the cart in checkout** without losing their place.',
    ),
    h3('6–10: Build trust'),
    ul(
      '**Display security cues** near payment fields and use a reputable payment provider.',
      '**Make returns and delivery policies visible** and easy to understand.',
      '**Show real reviews and ratings** near the add-to-cart area.',
      '**Offer clear contact options** — a visible email, phone or chat.',
      '**Keep the checkout design consistent** with the rest of the site; abrupt changes feel suspicious.',
    ),
    h3('11–15: Remove technical friction'),
    ul(
      '**Optimise for mobile first:** large tap targets, correct keyboards for number and email fields, minimal typing.',
      '**Speed up pages:** slow checkouts leak revenue — see [Core Web Vitals explained](/blog/core-web-vitals-explained).',
      '**Support the payment methods your customers prefer,** including digital wallets and local options.',
      '**Handle errors helpfully:** clear inline messages, and never wipe the form on an error.',
      '**Test the whole flow regularly** on real devices and browsers.',
    ),

    callout(
      'tip',
      'Find your leak before you fix it',
      'Use analytics funnels to see which step loses the most people (cart → shipping → payment → confirmation), then watch session recordings or run usability tests on that step. Fixing the biggest leak first beats polishing everything.',
    ),

    h2('Recovering abandoned carts'),
    p(
      'Recovery messages remind people of what they left behind. Done thoughtfully, they win back a meaningful share of carts; done badly, they annoy. The rules: get consent where required, be helpful rather than pushy, and make it effortless to resume.',
    ),
    steps(
      'A simple recovery sequence',
      [
        { title: 'Within an hour', text: 'Friendly reminder with the cart contents and a one-click return link.' },
        { title: 'After a day', text: 'Address likely objections: reviews, returns policy, delivery times.' },
        { title: 'After a few days', text: 'A last nudge; consider a small incentive only if margins allow.' },
      ],
    ),
    checklist(
      'Recovery email best practice',
      [
        'Only email people who gave consent, following the rules for your region',
        'Show the actual items with images and the cart total',
        'Use a clear, single call to action that restores the cart',
        'Include support and policy information',
        'Limit the number of reminders and make unsubscribing easy',
        'Avoid discounting by default — it trains customers to abandon',
      ],
    ),

    h2('Platform and integration considerations'),
    p(
      'What you can change depends on your platform. Hosted platforms offer settings and apps; open-source and custom stores give full control of the checkout flow. Recovery also depends on connecting your store with your email or messaging tools — the connective work described in [what API integration is](/blog/what-is-api-integration). If you are weighing platforms, read [Shopify vs. WooCommerce vs. a custom store](/blog/shopify-vs-woocommerce-vs-custom-store).',
    ),
    compare(
      'Quick wins vs. deeper projects',
      {
        title: 'Quick wins (days)',
        points: [
          'Show total cost earlier',
          'Enable guest checkout',
          'Add trust signals and policy links',
          'Set up a basic recovery email',
        ],
      },
      {
        title: 'Deeper projects (weeks)',
        points: [
          'Redesign a multi-step checkout',
          'Add wallets and local payment methods',
          'Performance rebuild for mobile',
          'Personalised recovery across email and messaging',
        ],
      },
    ),
    cta(
      'Want help finding where your checkout leaks and fixing it? We will review your funnel and propose a prioritised list of improvements.',
      '/contact',
      'Improve my checkout',
    ),
  ],
  faqs: [
    {
      question: 'What is cart abandonment?',
      answer:
        'Cart abandonment is when a shopper adds products to an online cart but leaves without completing the purchase. A large share of carts are abandoned for reasons ranging from browsing to checkout friction.',
    },
    {
      question: 'What are the main reasons people abandon carts?',
      answer:
        'Unexpected extra costs, forced account creation, long or confusing checkouts, trust concerns, slow or buggy pages, limited payment options and simply browsing or comparing.',
    },
    {
      question: 'How can I reduce cart abandonment quickly?',
      answer:
        'Show total costs early, offer guest checkout, cut form fields, add trust signals, make sure checkout is fast and mobile-friendly, and set up a helpful recovery email.',
    },
    {
      question: 'Do abandoned cart emails work?',
      answer:
        'They often recover a meaningful share of carts when they are timely, helpful and sent with consent. Avoid pushy messaging and unnecessary discounts.',
    },
    {
      question: 'How do I find where customers drop out?',
      answer:
        'Set up funnel tracking in your analytics from cart to confirmation, find the step with the biggest drop, and review session recordings or run usability tests on it.',
    },
  ],
}
