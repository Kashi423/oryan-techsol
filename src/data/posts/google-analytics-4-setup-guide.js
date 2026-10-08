import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'google-analytics-4-setup-guide',
  title: 'Google Analytics 4 Setup for Business Websites: A Practical Guide',
  shortTitle: 'Google Analytics 4 setup guide',
  description:
    'Google Analytics 4 setup for business websites: create a property, install tracking, set up key events, privacy settings, core reports and common mistakes.',
  date: '2027-01-19',
  updated: '2027-01-19',
  category: 'Web Development',
  keywords:
    'google analytics 4 setup, ga4 setup guide, ga4 conversions, ga4 events, ga4 gdpr compliance, universal analytics replacement, ga4 key reports for small business',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['conversion-rate-optimization-for-service-websites', 'gdpr-cookie-consent-for-websites', 'technical-seo-checklist-for-business-websites', 'landing-page-best-practices'],
  intro:
    'Every website decision, from which pages to improve to where to spend on ads, is better with data. Google Analytics 4 (GA4) is the current version of Google’s free analytics platform and the successor to the older Universal Analytics, which stopped processing new data in 2023. GA4 works differently from what many people remember: it is built around events rather than page views and sessions, its reports are organised differently and many configuration steps that used to be automatic now need deliberate setup. Business owners who install the tracking code and walk away often end up with data that does not answer their questions. This guide takes you through a sensible GA4 setup for a business website: creating the property, installing tracking, configuring events and conversions, handling privacy and consent, filtering out internal traffic, connecting other tools and learning the handful of reports that matter. Interfaces change, so use it as a roadmap and check Google’s current documentation for exact menu names.',
  takeaways: [
    'GA4 measures everything as events; page views, clicks, form submissions and purchases are all events.',
    'Decide your goals first, then configure key events (conversions) that match real business outcomes, such as enquiries and bookings.',
    'Set data retention, internal traffic filters and cross-domain tracking early, and link Search Console and ad accounts.',
    'Privacy matters: obtain consent where required, avoid personal data in analytics and configure settings carefully.',
    'Learn a few core reports and review them regularly; data without a routine is just decoration.',
  ],
  blocks: [
    h2('What changed with GA4'),
    p(
      'Universal Analytics organised data around sessions and page views. GA4 uses a flexible event-based model: every interaction is an event with parameters, and the standard reports are built from them. It also unifies web and app data, offers more machine-learning features and was designed with privacy changes in mind, including modelling for users who decline cookies. The interface is different, with reports under sections such as Acquisition, Engagement, Monetisation and Retention, plus an Explore area for custom analysis. Many metrics changed too: engagement rate replaces bounce rate as a headline measure, for instance. Expect a learning curve, and do not expect numbers to match your old reports exactly.',
    ),
    table(
      'Old thinking vs. GA4',
      ['Concept', 'Universal Analytics', 'GA4'],
      [
        ['Data model', 'Sessions and page views', 'Events and parameters'],
        ['Goals', 'Goals configured in the view', 'Key events (conversions) marked from events'],
        ['Bounce rate', 'Primary engagement metric', 'Engagement rate and engaged sessions'],
        ['Structure', 'Account, property, view', 'Account and property with data streams; no views'],
        ['Platforms', 'Separate tools for web and app', 'One property can combine web and app streams'],
        ['Data retention', 'Configurable up to indefinite', 'Limited retention settings for detailed event data'],
      ],
    ),

    h2('Step 1: Plan before you click'),
    p(
      'Write down what you want the website to achieve and what decisions you will make with the data. For a service business, goals might be enquiry form submissions, calls, booked consultations and downloads. For a shop, they are purchases, add-to-cart and checkout starts. For a content site, they might be newsletter signups and engaged readers. Also decide who needs access and which other tools, such as your CRM, ads platform or Search Console, should connect. This planning feeds directly into the improvement work described in [conversion rate optimisation for service websites](/blog/conversion-rate-optimization-for-service-websites).',
    ),

    h2('Step 2: Create the property and data stream'),
    steps(
      'Setting up in Google Analytics',
      [
        { title: 'Create or choose an account', text: 'Use a Google account that your business owns and controls, not a freelancer’s personal account.' },
        { title: 'Create a GA4 property', text: 'Set the property name, time zone and currency correctly.' },
        { title: 'Create a web data stream', text: 'Enter your website URL; GA4 gives you a measurement ID and tracking instructions.' },
        { title: 'Review enhanced measurement', text: 'This automatically tracks page views, scrolls, outbound clicks, site search, video engagement and file downloads; keep what is useful.' },
        { title: 'Add users with appropriate roles', text: 'Give colleagues and agencies access without sharing your login.' },
      ],
    ),
    callout(
      'warn',
      'Own your analytics account',
      'Create the account under your business’s own login and add agencies as users. If a former developer owns it, you may lose years of data when the relationship ends.',
    ),

    h2('Step 3: Install tracking on your site'),
    p(
      'There are three common ways to add GA4 to a website. The best choice depends on your platform and how much tracking you plan to do.',
    ),
    compare(
      'Installation methods',
      {
        title: 'Google Tag Manager',
        points: [
          'Central place to manage tags without editing code',
          'Flexible for events, conversions and other tools',
          'Needs some learning',
          'Recommended for most business sites',
        ],
      },
      {
        title: 'Direct code or platform plugin',
        points: [
          'Quick for simple setups',
          'Many CMS and e-commerce platforms offer integrations',
          'Harder to manage as tracking grows',
          'Risk of duplicate tags if combined with other methods',
        ],
      },
    ),
    ul(
      'Install the tag once, in a way that loads efficiently without slowing the site; see [how to make your website faster](/blog/how-to-make-your-website-faster).',
      'Avoid duplicate installations, which double-count page views.',
      'Test with GA4’s real-time report and the DebugView tool to confirm data is arriving.',
      'If you use a consent management tool, configure the tag to respect visitors’ choices.',
    ),

    h2('Step 4: Events and key events (conversions)'),
    p(
      'Out of the box, GA4 records page views and several enhanced-measurement events. For business insight you need to track the actions that matter and mark the most important as **key events**, GA4’s term for conversions.',
    ),
    table(
      'Examples for a service business',
      ['Action', 'How to track', 'Mark as key event?'],
      [
        ['Contact or quote form submitted', 'Event triggered on successful submission or thank-you page view', 'Yes'],
        ['Phone number tapped on mobile', 'Click event on telephone links', 'Yes'],
        ['Email address clicked', 'Click event on mailto links', 'Often'],
        ['Booking completed', 'Event from the booking tool or confirmation page', 'Yes'],
        ['Brochure or guide downloaded', 'File download event', 'Sometimes'],
        ['Chat started', 'Event from the chat widget', 'Sometimes'],
        ['Newsletter signup', 'Form submission event', 'Often'],
      ],
    ),
    checklist(
      'Event tracking tips',
      [
        'Track successful completions, not just button clicks, so failed forms are not counted',
        'Use consistent, descriptive event names and document them',
        'Add parameters that help analysis, such as form name, page type or service',
        'Test every event on desktop and mobile',
        'Mark only a few true business outcomes as key events to keep reports meaningful',
        'Verify that conversions in GA4 reconcile roughly with leads in your CRM',
      ],
    ),

    h2('Step 5: Configure important settings'),
    ul(
      '**Data retention:** set event data retention to the longest available option if you want historical exploration.',
      '**Internal traffic:** define your office or team IP addresses and filter them out so staff visits do not distort data.',
      '**Unwanted referrals:** exclude payment gateways and similar domains that incorrectly appear as traffic sources.',
      '**Cross-domain tracking:** if users move between your website and a separate booking or checkout domain, configure it so sessions are not split.',
      '**Google signals and advertising features:** enable only if you understand the privacy implications and have appropriate consent.',
      '**Search Console link:** connect it to see organic search queries alongside behaviour; see [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites).',
      '**Ads and CRM links:** connect advertising accounts so conversions inform campaigns, and pass lead sources into your CRM where possible.',
      '**Custom channel groupings and UTM tagging:** tag campaign links consistently so traffic is attributed correctly.',
    ),

    h2('Privacy, consent and compliance'),
    p(
      'Analytics involves identifiers and sometimes personal data, so privacy law applies, notably in the EU and UK, where consent is generally required for non-essential analytics cookies. GA4 offers consent-related features and models data for non-consenting users, but you remain responsible for configuring consent collection and honouring choices. Never send personal data such as names, email addresses or phone numbers into analytics events or URLs. Update your privacy and cookie policies to describe your analytics use. Some regulators have scrutinised international data transfers connected to analytics, so check guidance applicable to you and consider alternatives where appropriate. Our guide to [GDPR and cookie consent for websites](/blog/gdpr-cookie-consent-for-websites) covers the practicalities.',
    ),
    callout(
      'note',
      'Consent affects your numbers',
      'If visitors decline tracking, you will see fewer users than actually visited. Interpret trends rather than absolute counts, and cross-check with server data, CRM leads and sales.',
    ),

    h2('The reports worth learning first'),
    table(
      'Core reports for business owners',
      ['Report area', 'What it answers', 'Questions to ask'],
      [
        ['Acquisition: traffic acquisition', 'Where visitors come from', 'Which channels bring engaged visitors and conversions?'],
        ['Engagement: pages and screens', 'What content people view', 'Which pages draw traffic, and which hold attention?'],
        ['Engagement: events and conversions', 'What actions people take', 'How many enquiries and bookings, and from which sources?'],
        ['Landing pages', 'Where visits begin', 'Which entry pages convert best and which leak visitors?'],
        ['Tech: devices and browsers', 'How people access the site', 'Do mobile users convert worse, suggesting a problem?'],
        ['Demographics and location', 'Who the audience is', 'Are we reaching the right regions?'],
        ['Explorations', 'Custom funnels and paths', 'Where do people drop out of the enquiry journey?'],
      ],
    ),
    p(
      'Build a short monthly routine: check traffic by channel, top landing pages, conversions by source and device, and one funnel such as landing page to form submission. Note changes, form a hypothesis and act. For turning analysis into improvements, see [landing page best practices](/blog/landing-page-best-practices).',
    ),

    h2('Common mistakes'),
    ul(
      '**Installing the tag and never configuring conversions.**',
      '**Duplicate tags** inflating page views.',
      '**Tracking button clicks instead of successful submissions.**',
      '**Not filtering internal traffic.**',
      '**Ignoring consent and privacy requirements.**',
      '**Sending personal data in events or URLs.**',
      '**Comparing GA4 numbers directly with old Universal Analytics reports.**',
      '**Losing access** because the account is owned by someone else.',
    ),
    cta(
      'Want analytics you can trust, with conversions, consent and reporting set up properly? We implement GA4, tag management and dashboards that show what is driving enquiries and revenue.',
      '/contact',
      'Set up your analytics',
    ),
  ],
  faqs: [
    {
      question: 'What replaced Universal Analytics?',
      answer:
        'Google Analytics 4 replaced Universal Analytics. It uses an event-based data model, different reports and key events instead of goals, so setup and interpretation differ from the older version.',
    },
    {
      question: 'How do I track conversions in GA4?',
      answer:
        'Track the action as an event, such as a form submission or booking confirmation, test it, and mark it as a key event in GA4. Track successful completions rather than button clicks.',
    },
    {
      question: 'Is GA4 GDPR compliant?',
      answer:
        'Compliance depends on how you configure and use it. In the EU and UK you generally need consent for non-essential analytics cookies, must avoid sending personal data and should follow guidance on data transfers. Seek advice for your situation.',
    },
    {
      question: 'Should I use Google Tag Manager?',
      answer:
        'It is recommended for most business sites because it lets you manage tags and events without changing site code each time, though it requires some learning. Simple sites can use direct installation or plugins.',
    },
    {
      question: 'Why do my GA4 numbers differ from other tools?',
      answer:
        'Differences arise from consent choices, ad blockers, different definitions of users and sessions, filters and modelling. Compare trends and reconcile key conversions with your CRM or sales data.',
    },
  ],
}
