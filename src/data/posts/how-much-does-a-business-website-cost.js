import { callout, checklist, compare, cta, h2, h3, p, table, ul, bars } from './helpers.js'

export default {
  slug: 'how-much-does-a-business-website-cost',
  title: 'How Much Does a Business Website Cost in 2026? Price Ranges and What Drives Them',
  shortTitle: 'Business website cost',
  description:
    'What a business website really costs in 2026: price ranges by type, what drives the budget, ongoing costs, and how to get a fair quote without surprises.',
  date: '2026-10-10',
  updated: '2026-10-10',
  category: 'Web Development',
  keywords:
    'how much does a business website cost, website development cost, custom website cost, website design pricing, small business website cost 2026, website maintenance cost',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['custom-software-vs-off-the-shelf', 'how-to-choose-a-software-development-company', 'what-is-api-integration'],
  intro:
    'A business website can cost less than a dinner or more than a car, and both prices can be fair. The difference is what you are buying: a template with your logo, a custom-designed site built around your services and customers, or a full web application with accounts, payments and integrations. This guide explains the realistic price ranges for each, what actually drives the cost, what you will pay after launch, and how to compare quotes so you are judging like with like.',
  takeaways: [
    'Illustrative ranges: a template or builder site is typically the cheapest, a custom-designed marketing site sits in the middle, and a web application costs several times more.',
    'Cost is driven by scope — number of page types, custom design, content, integrations and functionality — not by page count alone.',
    'Budget for the first year after launch: hosting, domain, security updates, content changes and SEO.',
    'A fixed price is only meaningful if the scope, assumptions and exclusions are written down.',
    'Cheap sites are often expensive later; cost per year of use is a better measure than the first invoice.',
  ],
  blocks: [
    h2('Website cost by type: illustrative ranges'),
    p(
      'Prices vary hugely by country, team and quality bar, so treat the figures below as **illustrative planning ranges** typical of professional agencies in the US market — not quotations. They help you sanity-check a budget and see which tier your needs sit in.',
    ),
    table(
      'Illustrative cost ranges by website type',
      ['Website type', 'What you get', 'Planning range (USD)', 'Typical timeline'],
      [
        ['Template / website builder', 'Pre-made design, your content, limited customisation', '$500 – $3,000', '1 – 3 weeks'],
        ['Custom marketing site', 'Bespoke design, 5–15 pages, SEO foundations, CMS or editable text', '$4,000 – $20,000', '4 – 10 weeks'],
        ['Advanced / content-heavy site', 'Custom design, blog, multilingual, integrations, performance work', '$15,000 – $50,000', '2 – 4 months'],
        ['Web application / portal', 'Accounts, dashboards, payments, workflows, API integrations', '$40,000 – $150,000+', '3 – 9+ months'],
      ],
      'Planning ranges only. Not a quote — your project may fall outside them.',
    ),
    callout(
      'note',
      'Is a website the same as a web app?',
      'Not quite. A website mainly presents information; a web application lets users do things (log in, order, book, manage data). We explain the difference — and which you need — in a later guide, and our [web development service](/web-development) covers both.',
    ),

    h2('What drives the cost of a website'),
    bars(
      'How much each factor typically moves the budget',
      [
        { label: 'Functionality & integrations', value: 90, display: 'Largest', note: 'Booking, payments, member areas and CRM connections add real engineering.' },
        { label: 'Custom design & branding', value: 70, display: 'High', note: 'Bespoke layouts, illustration and motion take design time.' },
        { label: 'Content: writing, photography', value: 60, display: 'Often underestimated', note: 'Good copy and imagery can rival the build cost.' },
        { label: 'Number of unique page types', value: 55, display: 'Medium', note: 'Templates (service, blog post, case study) cost more than repeats of them.' },
        { label: 'SEO & performance work', value: 45, display: 'Medium', note: 'Technical foundations are cheaper built in than retrofitted.' },
      ],
      'Illustrative relative effort, not measured data.',
    ),
    h3('Pages vs. page types'),
    p(
      'A site with 40 service pages built from one template costs far less than a site with 8 completely different layouts. Ask any agency to quote by **page types and functionality** rather than raw page count.',
    ),
    h3('Content is a hidden line item'),
    p(
      'The website is a container; what makes it sell is the writing, photography and proof inside it. If you do not have these, either budget for them or plan time to produce them — a beautiful site with placeholder text converts nothing.',
    ),

    h2('Template, builder or custom: which is right?'),
    compare(
      'Builder/template vs. custom-built',
      {
        title: 'Website builder or template',
        points: [
          'Fast and inexpensive to launch',
          'Fine for a simple brochure site',
          'Design and functionality limited to what the platform offers',
          'Monthly platform fees continue indefinitely',
        ],
      },
      {
        title: 'Custom-built site',
        points: [
          'Designed around your customers and sales process',
          'Fast, clean code and full control of SEO',
          'Integrates with the systems you actually use',
          'Higher upfront cost, no platform lock-in',
        ],
      },
    ),
    p(
      'The same build-or-buy logic applies to software generally — we cover it in [custom software vs. off-the-shelf](/blog/custom-software-vs-off-the-shelf).',
    ),

    h2('The costs after launch'),
    checklist(
      'Ongoing website costs to plan for',
      [
        'Domain name renewal (yearly)',
        'Hosting — shared, managed or cloud, depending on traffic',
        'SSL certificate and security updates',
        'Backups and uptime monitoring',
        'Content updates and new pages',
        'SEO work: tracking, fixes, new content',
        'Performance and accessibility improvements',
        'Small development changes and bug fixes',
      ],
    ),
    p(
      'A common planning rule is to set aside roughly 10–20% of the build cost per year for maintenance and improvement, adjusted to how often the site changes. Treat it as a starting assumption, not a rule.',
    ),

    h2('How to get a quote you can compare'),
    ul(
      '**Share a short brief:** goals, audience, the pages you think you need, examples you like and any must-have functions.',
      '**Ask for a breakdown by phase:** discovery, design, build, content, testing, launch.',
      '**Get exclusions in writing:** copywriting, photography, migration, third-party licences.',
      '**Ask who owns what:** design files, code and the domain should be yours.',
      '**Check what happens after launch:** support terms, hosting and the cost of changes.',
    ),
    p(
      'If you are comparing several companies, our [checklist for choosing a software development company](/blog/how-to-choose-a-software-development-company) applies to web projects too.',
    ),
    cta(
      'Tell us what you want your website to do and we will give you an honest range, a recommended scope — and what to leave out until later.',
      '/contact',
      'Get a website estimate',
    ),
  ],
  faqs: [
    {
      question: 'How much does a small business website cost?',
      answer:
        'As an illustrative range, a template or builder site can cost from a few hundred to a few thousand dollars, while a professionally designed custom marketing site commonly runs from several thousand to around twenty thousand. Scope, design depth and content decide where you land.',
    },
    {
      question: 'Why do website quotes differ so much?',
      answer:
        'Quotes differ because teams assume different scope, design depth, functionality and quality, and include different items (copywriting, photography, hosting, support). Compare quotes broken down by phase with exclusions written down.',
    },
    {
      question: 'What ongoing costs does a website have?',
      answer:
        'Domain renewal, hosting, security updates, backups, content changes, SEO work and occasional development. A planning rule of thumb is 10–20% of the build cost per year, adjusted to how often the site changes.',
    },
    {
      question: 'Is a custom website worth it compared with a template?',
      answer:
        'If the site is a simple brochure, a template can be enough. A custom site pays off when design, performance, SEO and integrations with your business systems directly influence sales or efficiency.',
    },
    {
      question: 'How long does it take to build a business website?',
      answer:
        'Template sites can launch in a few weeks; custom marketing sites typically take four to ten weeks; web applications take several months. Content readiness is the most common cause of delay.',
    },
  ],
}
