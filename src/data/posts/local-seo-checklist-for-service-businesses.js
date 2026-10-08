import { callout, checklist, compare, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'local-seo-checklist-for-service-businesses',
  title: 'Local SEO for Service Businesses: The Complete Checklist',
  shortTitle: 'Local SEO checklist',
  description:
    'A complete local SEO checklist for service businesses: Google Business Profile, citations, reviews, location pages, on-page signals, links and tracking.',
  date: '2026-11-24',
  updated: '2026-11-24',
  category: 'Web Development',
  keywords:
    'local seo checklist, local seo for service businesses, google business profile optimization, rank in local pack, local citations, get more google reviews, location pages seo',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['technical-seo-checklist-for-business-websites', 'core-web-vitals-explained', 'website-accessibility-basics', 'website-maintenance-plans-and-costs'],
  intro:
    'When someone searches “plumber near me”, “accountant in Leeds” or “emergency electrician open now”, the businesses that appear in the map results and local listings win a disproportionate share of the calls. For service businesses that serve a defined area, local SEO is often the most profitable form of marketing: the searcher is ready to hire, the intent is obvious, and the competition is limited to a handful of nearby rivals. The factors involved are well understood and mostly within your control. This checklist walks through them in order of impact: your Google Business Profile, reviews, website, location pages, citations, links and measurement, with practical steps you can complete over a few weeks.',
  takeaways: [
    'Local rankings rest on relevance, distance and prominence; you can influence relevance and prominence, but not distance.',
    'A complete, accurate, active Google Business Profile is the single most important local asset.',
    'Reviews, with consistent, genuine collection and replies, strongly influence both rankings and conversion.',
    'Your website must clearly state services and service areas, load fast on phones and use consistent business details.',
    'Consistency of name, address and phone number across the web, plus quality local links, builds prominence.',
  ],
  blocks: [
    h2('How local search works'),
    p(
      'Google has described three main factors for local results: **relevance** (how well your profile matches what the person searched), **distance** (how far you are from the searcher or the location they named) and **prominence** (how well known and trusted you appear, based on reviews, links, citations and general web presence). You cannot change where a searcher is standing, so effort goes into relevance and prominence.',
    ),
    p(
      'Local results appear in several places: the map pack with its three highlighted listings, the broader local finder, ordinary organic results and, increasingly, AI-generated summaries. Being strong in all of them requires both a good business profile and a good website.',
    ),
    table(
      'The local SEO levers',
      ['Lever', 'What it influences', 'Effort', 'Impact'],
      [
        ['Google Business Profile', 'Map pack, local finder, branded searches', 'Low to medium', 'Very high'],
        ['Reviews', 'Rankings and click-through', 'Ongoing', 'Very high'],
        ['Website content and pages', 'Relevance for services and areas', 'Medium', 'High'],
        ['Citations and consistency', 'Trust and prominence', 'Medium', 'Medium'],
        ['Local links and mentions', 'Prominence and authority', 'Ongoing', 'Medium to high'],
        ['Technical and mobile performance', 'Usability and indexing', 'Medium', 'Medium'],
      ],
    ),

    h2('1. Claim and complete your Google Business Profile'),
    p(
      'Your Google Business Profile (GBP) is your shop window in local search. Claim and verify it, then complete every field accurately.',
    ),
    checklist(
      'GBP essentials',
      [
        'Business name exactly as it is used in real life (no keyword stuffing, which breaches Google’s guidelines)',
        'Correct primary category, plus relevant secondary categories',
        'Accurate address or service area, phone number and website link',
        'Opening hours, including special and holiday hours',
        'A clear description of what you do, in natural language',
        'Services list with short descriptions, and prices where sensible',
        'High-quality photos of your team, vehicles, work and premises',
        'Messaging, booking or appointment links if you offer them',
        'Regular posts and updates showing the business is active',
      ],
    ),
    callout(
      'warn',
      'Follow the guidelines',
      'Fake addresses, virtual offices, keyword-stuffed names and fake reviews can get a profile suspended. Read Google’s current business profile guidelines before making changes.',
    ),

    h2('2. Win on reviews'),
    p(
      'Reviews influence rankings and, perhaps more importantly, decide whether searchers pick you over the competitor next to you. Quantity, quality, recency and your replies all matter. Build a routine rather than hoping customers remember.',
    ),
    steps(
      'A review system that works',
      [
        { title: 'Ask at the right moment', text: 'Right after a successful job, while satisfaction is high.' },
        { title: 'Make it effortless', text: 'Send your direct review link by text or email.' },
        { title: 'Ask everyone', text: 'Do not cherry-pick; follow Google’s rules and never offer rewards for reviews.' },
        { title: 'Reply to all reviews', text: 'Thank positive ones; respond calmly and helpfully to negative ones.' },
        { title: 'Learn from feedback', text: 'Fix recurring issues and mention improvements.' },
      ],
    ),
    ul(
      'Respond within a couple of days, using your customer’s name and the specific service.',
      'Do not argue publicly; offer to resolve it offline.',
      'Display reviews on your website, with the permission and guidelines in mind.',
    ),

    h2('3. Make your website say clearly what you do and where'),
    p(
      'Your site provides the relevance signals that your profile cannot. Each core service deserves its own page, written for people first: what it is, who it is for, how you work, typical costs or timelines, and proof such as photos and case studies. Include your service area in a natural way, with real details like neighbourhoods, landmarks and local projects, not lists of town names.',
    ),
    h3('On-page elements to check'),
    checklist(
      'Local on-page checklist',
      [
        'Unique title tag and heading on each service page with the service and location where natural',
        'Your name, address and phone number (NAP) in the footer and on the contact page, matching your profile exactly',
        'A tappable phone number and clear call-to-action on mobile',
        'Embedded map and directions where you have a physical location',
        'Local business structured data on key pages, covered in our guide to schema markup',
        'Testimonials and recent work with real details',
        'An FAQ answering the questions locals ask before calling',
      ],
    ),
    p(
      'Speed and mobile experience matter because most local searches happen on phones; see [Core Web Vitals explained](/blog/core-web-vitals-explained) and the [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites). Accessibility, covered in [website accessibility basics](/blog/website-accessibility-basics), also widens your potential customer base.',
    ),

    h2('4. Build useful location pages'),
    p(
      'If you serve several towns or districts, location pages can help, but only when they are genuinely useful. A good page for “boiler repair in Northfield” includes real information: where you work, typical problems in local housing, example jobs, reviews from that area, local contact details and travel or response times. A bad one is a copy of your main page with the town name swapped, which adds nothing and can be treated as thin or doorway content.',
    ),
    compare(
      'Location pages: good vs. bad',
      {
        title: 'Good location page',
        points: [
          'Unique, specific local detail',
          'Real examples, photos and reviews from the area',
          'Clear service list and call to action',
          'Linked naturally from relevant pages',
        ],
      },
      {
        title: 'Weak location page',
        tone: 'bad',
        points: [
          'Template text with swapped place names',
          'No evidence you actually serve the area',
          'Dozens of near-identical pages',
          'Hidden or orphaned from the site structure',
        ],
      },
    ),

    h2('5. Citations and consistency'),
    p(
      'Citations are mentions of your business name, address and phone number on other sites: directories, industry bodies, chambers of commerce, map providers and social platforms. They help confirm that your details are real and consistent. Start with the major data aggregators and platforms, then add the directories relevant to your trade and area. Inconsistent details, such as old addresses or different phone numbers, create doubt, so audit and correct them.',
    ),
    ul(
      '**Make a master record** of your exact business name, address, phone, website and description.',
      '**Search for old or duplicate listings** and merge or remove them.',
      '**Prioritise quality** over quantity: relevant, reputable listings beat hundreds of junk directories.',
    ),

    h2('6. Local links and community presence'),
    p(
      'Links from local organisations, suppliers, partners, charities, schools, local news and trade associations signal prominence. Sponsor a local team, offer an expert comment to a local publication, publish a genuinely useful guide to something locals care about, or join a business association with a member directory. These activities build both links and real-world reputation.',
    ),

    h2('7. Track what matters'),
    p(
      'Measure results by business outcomes rather than rankings alone. Use your Business Profile insights for calls, direction requests and website clicks, Google Search Console for queries and pages, analytics for form submissions and call tracking where appropriate, and a simple log of where each new customer heard about you. Check your visibility from different nearby locations, because local results vary with the searcher’s position.',
    ),
    checklist(
      'Monthly local SEO routine',
      [
        'Respond to all new reviews and ask recent customers for more',
        'Post an update or offer on your Business Profile',
        'Add new photos of recent work',
        'Check Search Console for local queries and fix errors',
        'Review calls and enquiries against last month',
        'Look for new local link and mention opportunities',
        'Keep hours and service details current, especially around holidays',
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Ignoring the profile once it is set up:** inactive profiles look abandoned.',
      '**Chasing fake reviews or fake locations:** a short-term gain with a high risk of suspension.',
      '**One generic services page:** you lose relevance for specific searches.',
      '**Different NAP details everywhere:** creates doubt about which is correct.',
      '**A slow, hard-to-use mobile site:** callers will leave and phone the next result.',
    ),
    cta(
      'Want more local enquiries without more ad spend? We build fast, local-search-ready websites and help service businesses set up the profile, content and tracking that win the map pack.',
      '/contact',
      'Improve your local visibility',
    ),
  ],
  faqs: [
    {
      question: 'How do I rank in the Google local pack?',
      answer:
        'Complete and verify your Google Business Profile, choose accurate categories, collect genuine reviews, keep your name, address and phone consistent across the web, and publish a fast, clear website with pages for each service and area. Relevance, distance and prominence decide the ranking.',
    },
    {
      question: 'Do Google Business Profile posts help rankings?',
      answer:
        'Posts mainly help engagement and show that your profile is active. They are not a guaranteed ranking factor, but fresh photos, offers and updates can improve conversion from your listing.',
    },
    {
      question: 'How many reviews do I need?',
      answer:
        'There is no fixed number. Aim for a steady stream of genuine, recent reviews and compare against the top competitors in your area. Consistency and reply quality matter as much as the total count.',
    },
    {
      question: 'What is NAP consistency?',
      answer:
        'NAP stands for name, address and phone number. Keeping them identical across your website, Business Profile and directories helps search engines confirm that your business details are accurate.',
    },
    {
      question: 'Do I need a separate page for every town I serve?',
      answer:
        'Only if you can make each page genuinely useful with unique local detail. Near-duplicate pages with swapped place names add little value and can look like thin content.',
    },
  ],
}
