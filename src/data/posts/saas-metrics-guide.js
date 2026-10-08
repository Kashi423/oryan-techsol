import { callout, checklist, cta, h2, p, stats, steps, table, ul } from './helpers.js'

export default {
  slug: 'saas-metrics-guide',
  title: 'SaaS Metrics Founders Should Track: MRR, Churn, CAC and LTV',
  shortTitle: 'SaaS metrics guide',
  description:
    'SaaS metrics explained for founders: MRR, ARR, churn, net revenue retention, CAC, LTV and payback, with how to calculate and use them without fooling yourself.',
  date: '2027-01-29',
  updated: '2027-01-29',
  category: 'Custom Software',
  keywords:
    'saas metrics, mrr and arr explained, what is a good churn rate, how to calculate ltv, cac payback period, net revenue retention, saas unit economics',
  service: { label: 'SaaS & web application development', to: '/saas-development' },
  related: ['saas-pricing-models-explained', 'how-to-build-a-saas-product', 'mobile-app-analytics-metrics', 'mvp-development-guide-for-startups'],
  intro:
    'Software-as-a-service businesses are built on recurring revenue, and recurring revenue has its own arithmetic. A founder who understands it can see problems months before they appear in the bank account, decide how much to spend on growth and tell investors a credible story. One who does not may celebrate a growing customer count while a leaky bucket drains the business. The vocabulary can be intimidating: MRR, ARR, churn, expansion, NRR, CAC, LTV, payback. Yet each metric answers a simple question about the health of the business, and together they form a compact dashboard. This guide explains the essential SaaS metrics in plain language, shows how to calculate them, gives rules of thumb with appropriate caution, explains how they connect and warns about the ways founders accidentally mislead themselves.',
  takeaways: [
    'MRR and ARR measure recurring revenue; growth is only healthy if retention and unit economics are sound.',
    'Churn, both customer and revenue, is the leak in the bucket; net revenue retention shows whether existing customers grow or shrink in value.',
    'CAC and LTV tell you how much you can spend to acquire customers; payback period shows how quickly you recover it.',
    'Metrics should be defined consistently, segmented by cohort and plan, and interpreted with context.',
    'Track a small set of metrics reliably rather than a wall of vanity numbers.',
  ],
  blocks: [
    h2('Why SaaS metrics are different'),
    p(
      'In a traditional business, you sell something and collect the money once. In SaaS, the customer pays repeatedly, and the value of a customer builds over time, provided they stay. That changes what you must measure. Revenue today matters less than the predictability and durability of revenue. Acquisition costs are paid upfront while returns arrive over months or years. Small differences in monthly churn compound into huge differences in lifetime value. These dynamics make a handful of metrics central to running and funding a subscription business, and they connect to how you price your product; see [SaaS pricing models explained](/blog/saas-pricing-models-explained).',
    ),

    h2('Revenue metrics: MRR and ARR'),
    p(
      '**Monthly recurring revenue (MRR)** is the predictable revenue you expect to receive each month from active subscriptions, normalised to a monthly amount. A customer on an annual plan of 1,200 contributes 100 to MRR. **Annual recurring revenue (ARR)** is MRR multiplied by twelve, a common headline for larger SaaS firms. They exclude one-off fees such as setup charges and non-recurring services.',
    ),
    table(
      'Breaking down MRR movement',
      ['Component', 'Meaning', 'Effect'],
      [
        ['New MRR', 'Revenue from newly acquired customers', 'Increases MRR'],
        ['Expansion MRR', 'Extra revenue from existing customers through upgrades, seats or usage', 'Increases MRR'],
        ['Contraction MRR', 'Revenue lost when customers downgrade', 'Decreases MRR'],
        ['Churned MRR', 'Revenue lost when customers cancel', 'Decreases MRR'],
        ['Reactivation MRR', 'Revenue from returning former customers', 'Increases MRR'],
        ['Net new MRR', 'New + expansion + reactivation − contraction − churned', 'The real growth number'],
      ],
    ),
    p(
      'Looking at the components, rather than just the total, shows where growth comes from and where it leaks. A business adding new customers quickly but losing nearly as many is running on a treadmill.',
    ),
    stats(
      'A simple MRR example (illustrative numbers)',
      [
        { value: '10,000', label: 'Opening MRR', note: 'Start of the month' },
        { value: '+1,800', label: 'New MRR', note: 'New customers' },
        { value: '+400', label: 'Expansion MRR', note: 'Upgrades and extra seats' },
        { value: '−700', label: 'Churned and contracted MRR', note: 'Cancellations and downgrades' },
        { value: '11,500', label: 'Closing MRR', note: 'Net new MRR of 1,500' },
      ],
      'Numbers are invented to illustrate the calculation.',
    ),

    h2('Churn: the leak in the bucket'),
    p(
      '**Customer churn rate** is the share of customers who cancel in a period: customers lost divided by customers at the start. **Revenue churn** (or gross MRR churn) is the share of MRR lost to cancellations and downgrades. They differ because customers vary in size: losing many small customers may matter less than losing one large one. Churn is usually tracked monthly, but remember that a seemingly small monthly figure compounds: a three percent monthly churn means losing roughly a third of customers over a year.',
    ),
    ul(
      '**Logo churn vs. revenue churn:** track both, and segment by plan, size and acquisition channel.',
      '**Voluntary vs. involuntary churn:** involuntary churn, from failed payments and expired cards, is often fixable with better billing recovery; see subscription billing for apps.',
      '**Cohort churn:** follow each signup month over time; early-life churn often differs sharply from later churn.',
      '**Benchmarks vary widely:** acceptable churn depends on customer type: monthly consumer plans typically churn more than annual business contracts. Compare against similar companies and your own improvement.',
    ),
    callout(
      'tip',
      'Fix churn before pouring in growth',
      'If customers leave quickly, acquiring more only increases the leak. Improve onboarding, product value and billing recovery first; the same marketing spend then produces far more durable growth.',
    ),

    h2('Net revenue retention: do customers grow?'),
    p(
      '**Net revenue retention (NRR)** measures the revenue from a group of customers today as a percentage of what they paid a year earlier, including expansion, contraction and churn but excluding new customers. An NRR above 100 percent means existing customers are collectively spending more over time, which can fuel growth even without new sales. Below 100 percent means the base is shrinking. **Gross revenue retention (GRR)** excludes expansion and shows how much revenue you keep before upsells, capped at 100 percent. NRR is especially important in B2B SaaS with seat or usage-based expansion.',
    ),
    table(
      'Retention metrics compared',
      ['Metric', 'Includes expansion?', 'What it tells you'],
      [
        ['Customer retention', 'No', 'Share of customers who stay'],
        ['Gross revenue retention (GRR)', 'No', 'How much existing revenue you keep'],
        ['Net revenue retention (NRR)', 'Yes', 'Whether existing customers are growing or shrinking in value'],
      ],
    ),

    h2('Customer acquisition cost (CAC)'),
    p(
      '**CAC** is the total cost of sales and marketing needed to win a new customer: advertising, salaries and commissions of sales and marketing staff, tools, content and agency fees, divided by the number of new customers acquired in the period. Be honest about including all relevant costs; understating CAC makes everything look better than it is. Calculate **blended CAC** across all customers and **paid CAC** for specific channels, and watch whether it rises as you exhaust easy channels. Content, search and referral channels, discussed in [B2B content marketing](/blog/b2b-content-marketing-for-tech-companies), often have lower long-term CAC but take time to build.',
    ),

    h2('Lifetime value (LTV)'),
    p(
      '**Customer lifetime value** estimates the total gross profit you earn from a customer over their relationship with you. A simple formula is average revenue per account per month, multiplied by gross margin, divided by monthly churn rate. If a customer pays 100 a month, your gross margin is 80 percent and monthly churn is four percent, LTV is 100 × 0.8 ÷ 0.04, or 2,000. The formula is crude and sensitive to churn, which is itself unstable early on, so treat LTV as an estimate and prefer cohort-based calculations as data accumulates. Use gross margin, not revenue, so hosting, support and payment costs are reflected.',
    ),
    callout(
      'warn',
      'LTV is easily overestimated',
      'Early-stage companies often have little data and optimistic churn assumptions, producing impressive but unreliable LTV numbers. Use conservative estimates and update as cohorts mature.',
    ),

    h2('Putting CAC and LTV together'),
    ul(
      '**LTV to CAC ratio:** compares lifetime value with acquisition cost. A commonly quoted rule of thumb is around three to one, but it varies by business and growth strategy. Much lower suggests acquisition is too costly relative to value; far higher may mean you are underinvesting in growth.',
      '**CAC payback period:** the months of gross profit needed to recover CAC. Shorter payback means faster reinvestment. Many SaaS businesses aim for payback within roughly a year, with variations by segment and funding.',
      '**Magic number and efficiency metrics:** investors use measures relating net new revenue to sales and marketing spend, to judge go-to-market efficiency.',
    ),
    steps(
      'A basic unit-economics check',
      [
        { title: 'Calculate gross margin', text: 'Revenue minus cost of serving customers, as a percentage.' },
        { title: 'Estimate average revenue per account', text: 'By plan and segment.' },
        { title: 'Measure churn', text: 'Monthly, by cohort and segment.' },
        { title: 'Compute LTV', text: 'ARPA × gross margin ÷ churn, conservatively.' },
        { title: 'Compute CAC and payback', text: 'Fully loaded costs per new customer, and months to recover it.' },
        { title: 'Decide', text: 'Invest more where payback is fast and LTV:CAC is healthy; fix or cut where it is not.' },
      ],
    ),

    h2('Product and engagement metrics that predict revenue'),
    p(
      'Revenue metrics lag behaviour. Leading indicators help you act earlier.',
    ),
    table(
      'Leading indicators',
      ['Metric', 'Why it matters'],
      [
        ['Activation rate', 'Share of signups reaching the key first value moment'],
        ['Trial-to-paid conversion', 'Efficiency of converting interested users to customers'],
        ['Product usage and feature adoption', 'Customers who use the product deeply tend to stay'],
        ['Time to value', 'How quickly new customers get a first result'],
        ['Net promoter or satisfaction scores', 'Early signal of loyalty and risk'],
        ['Support volume and issues', 'Friction that can lead to churn'],
        ['Seat or usage growth', 'Early signs of expansion revenue'],
      ],
    ),
    p(
      'For engagement and retention analysis methods, see [mobile app analytics metrics](/blog/mobile-app-analytics-metrics); the principles of cohorts and funnels apply equally to web SaaS.',
    ),

    h2('How to track and avoid fooling yourself'),
    checklist(
      'Good metric hygiene',
      [
        'Define each metric in writing and apply it consistently',
        'Normalise annual and other plans to monthly values for MRR',
        'Exclude one-off fees and non-recurring revenue from MRR',
        'Segment by plan, customer size, channel and cohort',
        'Use gross margin, not revenue, for LTV',
        'Include all sales and marketing costs in CAC',
        'Reconcile billing data with your accounting system',
        'Watch trends over time, not single-month spikes',
        'Report a small, stable set of metrics, with context and actions',
      ],
    ),
    ul(
      '**Beware vanity metrics:** total signups, downloads and page views say little about revenue health.',
      '**Beware averages:** a few large accounts can hide widespread churn.',
      '**Beware small samples:** early data is noisy.',
      '**Beware changing definitions,** which make trends meaningless.',
    ),
    p(
      'Build reliable billing and reporting into your product from the start; our guide to [how to build a SaaS product](/blog/how-to-build-a-saas-product) covers the foundations, and subscription billing for apps explains the billing side.',
    ),

    h2('Common mistakes'),
    ul(
      '**Celebrating growth while ignoring churn.**',
      '**Calculating LTV with optimistic assumptions.**',
      '**Understating CAC** by leaving out salaries and overhead.',
      '**Mixing recurring and one-off revenue** in MRR.',
      '**Tracking too many metrics** and acting on none.',
      '**Ignoring cohorts,** so improvements and problems stay hidden.',
      '**Not linking metrics to decisions** such as pricing, onboarding and channel spend.',
    ),
    cta(
      'Building a SaaS product and want metrics, billing and analytics designed in from day one? We build subscription platforms with the reporting founders and investors rely on.',
      '/contact',
      'Plan your SaaS product',
    ),
  ],
  faqs: [
    {
      question: 'What is a good churn rate?',
      answer:
        'It depends on your market and customer type. Consumer monthly plans usually churn more than annual business contracts. Compare against similar companies and your own cohorts, and aim to improve steadily, since small churn differences compound over time.',
    },
    {
      question: 'How do I calculate LTV?',
      answer:
        'A simple estimate is average revenue per account per month, multiplied by gross margin, divided by monthly churn rate. Use conservative assumptions and refine with cohort data as it accumulates.',
    },
    {
      question: 'What is a healthy LTV:CAC ratio?',
      answer:
        'Many SaaS businesses target around three to one, but the right level depends on your growth strategy, payback period and funding. Very low ratios signal costly acquisition; very high ones may mean you could invest more in growth.',
    },
    {
      question: 'What is net revenue retention?',
      answer:
        'NRR shows revenue from a group of customers today compared with a year ago, including upgrades, downgrades and cancellations but excluding new customers. Above 100 percent means existing customers are growing in value.',
    },
    {
      question: 'Which SaaS metrics should I track first?',
      answer:
        'Start with MRR and its components, customer and revenue churn, activation and conversion, then CAC, LTV and payback as you gather enough data, plus net revenue retention for B2B products.',
    },
  ],
}
