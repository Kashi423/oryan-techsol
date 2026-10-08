import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'website-maintenance-plans-and-costs',
  title: 'Website Maintenance Plans: What You Get and What to Pay',
  shortTitle: 'Website maintenance plans and costs',
  description:
    'What website maintenance includes, typical monthly costs, what to look for in a plan, DIY vs agency care and warning signs that your site is being neglected.',
  date: '2026-11-23',
  updated: '2026-11-23',
  category: 'Web Development',
  keywords:
    'website maintenance cost, website maintenance plans, what does website maintenance include, monthly website maintenance price, website care plan, wordpress maintenance, website support agreement',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['how-much-does-a-business-website-cost', 'wordpress-vs-custom-website', 'core-web-vitals-explained', 'technical-seo-checklist-for-business-websites'],
  intro:
    'A website is not a one-off purchase like a brochure. Browsers change, software ages, security threats evolve, content goes stale and plugins break. A site left alone for a year or two tends to get slower, less secure and less visible in search, and the eventual repair bill is usually much larger than a steady maintenance fee would have been. Yet many business owners are unsure what maintenance actually includes, what it should cost, or how to tell a genuine care plan from a vague retainer. This guide explains what is covered, what typical pricing looks like, how to compare plans, and when you can safely handle some of it yourself.',
  takeaways: [
    'Maintenance covers updates, security, backups, monitoring, performance, content changes and support, not just “keeping it online”.',
    'Budget roughly 10 to 20 percent of the build cost per year as a planning guide, more for complex or business-critical sites.',
    'Look for clear scope, response times, backup and restore testing, reporting and who owns the accounts.',
    'Cheap plans that only “keep the server running” often skip the work that prevents hacks and slowdowns.',
    'Neglect is expensive: outdated software is the most common reason sites are compromised.',
  ],
  blocks: [
    h2('Why websites need ongoing care'),
    p(
      'Every website sits on a stack of moving parts: a hosting environment, a content management system or framework, themes, plugins or libraries, third-party services such as payment providers and forms, and the browsers and devices people use to view it. Each part is updated independently. When one changes and the others do not keep pace, things break: forms stop sending, checkout fails, layouts shift, pages slow down. Meanwhile attackers continually scan for known vulnerabilities in outdated software, and search engines reward fast, secure, well-kept sites.',
    ),
    p(
      'Maintenance is the routine work that keeps all of this healthy. Think of it like servicing a car: skipping it saves money until the day something fails, usually at the worst moment.',
    ),

    h2('What website maintenance includes'),
    table(
      'Typical maintenance tasks',
      ['Area', 'What is done', 'Why it matters'],
      [
        ['Software updates', 'Core system, themes, plugins, libraries and server software', 'Closes security holes and fixes bugs'],
        ['Security', 'Malware scanning, firewall rules, access reviews, SSL renewal', 'Prevents hacks and data loss'],
        ['Backups', 'Automatic off-site backups, tested restores', 'Lets you recover from failures or attacks'],
        ['Uptime monitoring', 'Alerts when the site or checkout is down', 'Catches outages before customers do'],
        ['Performance', 'Speed checks, image and database optimisation, caching', 'Protects conversions and rankings'],
        ['SEO health', 'Broken links, crawl errors, redirects, indexing checks', 'Preserves organic traffic'],
        ['Content changes', 'Small edits, new pages, banners, price updates', 'Keeps the site current'],
        ['Compatibility testing', 'Browsers, devices, new OS versions', 'Avoids unexpected layout or feature failures'],
        ['Support and reporting', 'Help requests and a periodic summary', 'Accountability and peace of mind'],
      ],
    ),
    p(
      'For a deeper look at speed and search health, see [Core Web Vitals explained](/blog/core-web-vitals-explained) and our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites).',
    ),

    h2('What does it cost?'),
    p(
      'Pricing varies by region, platform, site complexity and the level of service. As a broad planning guide, many businesses budget around 10 to 20 percent of the original build cost per year for maintenance, and more when the site is complex or revenue-critical. Rather than quote exact figures that go out of date, here is how the tiers typically differ.',
    ),
    table(
      'Common plan levels',
      ['Level', 'Typically includes', 'Best for'],
      [
        ['Basic', 'Updates, backups, uptime monitoring, security scans, minimal support', 'Small brochure sites that rarely change'],
        ['Standard', 'Basic plus monthly performance and SEO checks, a few hours of changes, priority support', 'Active business sites and blogs'],
        ['Advanced', 'Standard plus more hours, staging environment, conversion work and quarterly reviews', 'E-commerce and lead-driven sites'],
        ['Custom or SLA', 'Defined response times, developer retainer, 24/7 monitoring, compliance support', 'Web applications and mission-critical platforms'],
      ],
      'Descriptions of typical structures, not price quotes.',
    ),
    callout(
      'tip',
      'Ask what happens when something breaks',
      'The difference between plans is rarely the checklist of routine tasks. It is how quickly someone fixes a problem, whether emergency work is included or billed separately, and how clearly that is written down.',
    ),

    h2('Factors that move the price'),
    ul(
      '**Platform and complexity:** a simple static site needs less care than a plugin-heavy WordPress shop or a custom application.',
      '**Traffic and criticality:** sites that process orders or leads need faster response and more monitoring.',
      '**Hosting arrangement:** managed hosting may include some tasks; shared hosting often does not.',
      '**Included hours:** content updates and small improvements are usually a block of hours per month.',
      '**Integrations:** payment gateways, CRMs, booking and ERP connections increase testing and risk.',
      '**Compliance needs:** accessibility, privacy and sector rules add work.',
    ),

    h2('Comparing plans: what to look for'),
    checklist(
      'Questions to ask before signing',
      [
        'Exactly which tasks are included, and how often are they done?',
        'Are backups stored off-site, and have restores actually been tested?',
        'What are the response and resolution times for different problem severities?',
        'Are emergency fixes and hack recovery included or extra?',
        'How many hours of changes are included, and what do additional hours cost?',
        'Will I receive regular reports in plain language?',
        'Who owns the hosting, domain and code accounts? (It should be you.)',
        'What is the notice period if I want to leave, and will you hand over everything?',
      ],
    ),
    compare(
      'Good plan vs. poor plan',
      {
        title: 'A good plan',
        points: [
          'Clear written scope and response times',
          'Tested backups and monitoring with alerts',
          'Staging environment for safe updates',
          'Regular reports and named contact',
        ],
      },
      {
        title: 'A poor plan',
        tone: 'bad',
        points: [
          'Vague “maintenance included” wording',
          'No evidence of backups or restores',
          'Updates applied straight to the live site without testing',
          'Accounts held by the provider, with no handover rights',
        ],
      },
    ),

    h2('DIY or hire someone?'),
    p(
      'Plenty of site owners handle simple upkeep themselves, particularly on straightforward platforms. If you do, make a schedule and stick to it.',
    ),
    steps(
      'A basic do-it-yourself routine',
      [
        { title: 'Weekly', text: 'Check the site loads, test the contact form and review security alerts.' },
        { title: 'Monthly', text: 'Back up, update software after reading release notes and check broken links.' },
        { title: 'Quarterly', text: 'Review speed, content accuracy, user accounts and analytics.' },
        { title: 'Yearly', text: 'Renew domain and SSL, review hosting and run a full audit.' },
      ],
    ),
    p(
      'Hire help when your site generates revenue, uses many plugins or custom code, handles personal data, or when nobody on your team has the time or skill to update safely. A mistaken update on a live shop can cost more than months of fees. The platform you chose matters here: see [WordPress vs. a custom website](/blog/wordpress-vs-custom-website) for how upkeep differs.',
    ),

    h2('Warning signs of a neglected site'),
    ul(
      'Pages load more slowly than they used to, or Core Web Vitals have worsened.',
      'Software updates have been pending for months.',
      'Forms, checkout or booking occasionally fail with no alert.',
      'Search traffic has declined, with crawl errors or broken pages piling up.',
      'The site shows security warnings, spam content or strange redirects.',
      'Nobody knows when the last backup was taken or whether it works.',
      'Content, prices, team pages or opening hours are out of date.',
    ),

    h2('Plan maintenance into your budget from day one'),
    p(
      'When you compare quotes for a new site, ask about ongoing costs as well as the build. A cheap build with an expensive, poorly defined upkeep arrangement can cost more over three years than a better-built site with a transparent plan. Our guide to [how much a business website costs](/blog/how-much-does-a-business-website-cost) covers build budgets, and the [website redesign SEO checklist](/blog/website-redesign-seo-checklist) explains how to protect traffic if you rebuild. Remember that maintenance protects the investment you have already made, in the design, the content and the search rankings you have built.',
    ),
    h2('A realistic example'),
    p(
      'Picture a small online shop built on a popular platform, with a dozen plugins for payments, shipping, reviews, email and analytics. Left unattended, one plugin releases a security fix, another stops being compatible with the latest platform version, and the host upgrades its server software. Within a few months the checkout slows, a payment button intermittently fails and a vulnerability is exploited to inject spam links. The owner notices only when sales dip and customers email about errors. With a basic care plan, the same issues would have been caught in routine updates, flagged by uptime and checkout monitoring, and fixed on a staging copy before reaching customers.',
    ),
    p(
      'The lesson is not that disaster is inevitable, but that small, regular work is far cheaper than emergency repair. Agree a simple schedule, keep a record of what was changed and when, and review it with whoever looks after your site at least quarterly.',
    ),
    cta(
      'Want your website kept fast, secure and up to date without the headaches? We offer clear, fixed-scope care plans for the sites we build and for those built elsewhere.',
      '/contact',
      'Ask about website care plans',
    ),
  ],
  faqs: [
    {
      question: 'How much does website maintenance cost per month?',
      answer:
        'It depends on the platform, complexity and service level. Basic plans cover updates, backups and monitoring, while advanced plans add content hours, performance work and fast support. As a planning guide, budget roughly 10 to 20 percent of the build cost per year, and more for complex sites.',
    },
    {
      question: 'What does a maintenance plan include?',
      answer:
        'Typically software updates, security monitoring, off-site backups, uptime checks, performance and SEO health checks, a few hours of small changes and support, plus periodic reports. Check the written scope and response times.',
    },
    {
      question: 'Can I maintain my website myself?',
      answer:
        'Yes, for simple sites, if you follow a routine of backups, updates, security checks and testing. For revenue-critical or complex sites, professional maintenance usually costs less than the damage of a failed update or hack.',
    },
    {
      question: 'What happens if I do not maintain my website?',
      answer:
        'Outdated software becomes vulnerable to attacks, pages slow down, features break, search rankings can decline and content becomes inaccurate. Repair costs are usually far higher than regular upkeep.',
    },
    {
      question: 'Who should own the hosting and domain accounts?',
      answer:
        'You should. Insist that the domain, hosting and code repository are registered in your name, with the provider given access, so you can change providers without losing control.',
    },
  ],
}
