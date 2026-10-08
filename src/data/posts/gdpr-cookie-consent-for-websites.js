import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'gdpr-cookie-consent-for-websites',
  title: 'GDPR and Cookie Consent for Websites: A Practical Guide',
  shortTitle: 'GDPR and cookie consent',
  description:
    'GDPR and cookie consent for websites: what the rules require, cookie types, compliant banners, privacy policies, analytics and a practical checklist.',
  date: '2026-12-24',
  updated: '2026-12-24',
  category: 'Web Development',
  keywords:
    'gdpr cookie consent website, do i need a cookie banner, cookie consent requirements, gdpr website checklist, privacy policy requirements, analytics and gdpr, eprivacy cookies',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['website-security-basics-for-small-business', 'ai-privacy-and-security-for-small-business', 'website-accessibility-basics', 'technical-seo-checklist-for-business-websites'],
  intro:
    'Cookie banners are everywhere, and so is confusion about them. Business owners ask whether they really need one, what has to be in it, whether analytics counts, and what happens if they get it wrong. The rules come mainly from the EU and UK, through the General Data Protection Regulation (GDPR) and the ePrivacy rules on cookies, but they reach any business with visitors in those regions, and similar laws exist across the world. This guide explains in plain language what these rules generally require of a website: what counts as personal data and a cookie, when consent is needed, what a compliant banner looks like, what your privacy policy must say, how to handle analytics, forms and marketing tools, and a practical checklist. It is general information, not legal advice; requirements vary and you should consult a qualified adviser for your situation.',
  takeaways: [
    'Under EU and UK rules, non-essential cookies and similar technologies generally need prior, informed, freely given consent.',
    'Strictly necessary cookies, such as those for security or basic site function, usually do not need consent but should be disclosed.',
    'A compliant banner offers a real choice: reject as easy as accept, no pre-ticked boxes and no tracking before consent.',
    'Your privacy policy must clearly state what personal data you collect, why, on what legal basis, who receives it and users’ rights.',
    'Compliance is more than a banner: audit the scripts you load, the data you collect and how you respond to requests.',
  ],
  blocks: [
    h2('The rules in plain English'),
    p(
      'Two legal frameworks matter most for websites reaching people in Europe. The **GDPR** governs how organisations collect and use personal data, requiring a lawful basis, transparency, security and respect for individuals’ rights. The **ePrivacy rules** (in the UK, the Privacy and Electronic Communications Regulations) specifically cover storing or accessing information on a user’s device, which includes cookies, tracking pixels, local storage and similar technologies, and require consent for non-essential uses. Other jurisdictions, including US states, Canada, Brazil and many others, have their own privacy laws with different mechanics, often focused on notice and opt-out rather than prior consent. If you have international visitors, check which laws apply to you.',
    ),
    callout(
      'note',
      'Not legal advice',
      'Laws and regulators’ guidance change, and enforcement differs by country. Use this article to understand the concepts and then confirm your obligations with a qualified privacy professional.',
    ),

    h2('What counts as personal data and a cookie'),
    ul(
      '**Personal data:** any information relating to an identifiable person: names, emails, IP addresses, device identifiers and online identifiers can all qualify.',
      '**Cookies:** small files stored in a browser. The legal rules also cover similar technologies such as local storage, fingerprinting and tracking pixels.',
      '**First-party vs. third-party:** first-party cookies are set by your site; third-party cookies are set by other domains, such as advertising or analytics providers embedded on your pages.',
      '**Session vs. persistent:** session cookies disappear when the browser closes; persistent ones remain for a set time.',
    ),
    table(
      'Types of cookies and consent',
      ['Category', 'Purpose', 'Consent usually needed?'],
      [
        ['Strictly necessary', 'Security, load balancing, shopping cart, remembering consent choice', 'No, but disclose them'],
        ['Functional or preference', 'Language, region, saved settings that the user requested', 'Often yes, unless strictly necessary for a requested feature'],
        ['Analytics or performance', 'Measuring visits and behaviour', 'Generally yes under ePrivacy rules, though some regulators allow limited exemptions for privacy-friendly analytics'],
        ['Marketing and advertising', 'Tracking across sites, remarketing, personalised ads', 'Yes'],
        ['Social media embeds', 'Share buttons and embedded content that set cookies', 'Usually yes'],
      ],
      'Interpretations differ between regulators. Check the guidance of the authority relevant to your audience.',
    ),

    h2('What valid consent looks like'),
    p(
      'Consent under GDPR standards must be freely given, specific, informed and unambiguous, expressed by a clear affirmative action. In practice, regulators have made these expectations concrete.',
    ),
    checklist(
      'A compliant cookie banner',
      [
        'No non-essential cookies or trackers load before the user consents',
        'Clear, plain-language explanation of what each category does',
        'An easy “Reject all” option, as prominent as “Accept all”',
        'Granular choices by category, with no pre-ticked boxes',
        'No “cookie walls” blocking access unless a genuine alternative is provided, and no manipulative design that nudges towards accepting',
        'A link to your cookie and privacy policies',
        'Records of consent given, with date and version, to demonstrate compliance',
        'Consent as easy to withdraw as to give, via a persistent link or icon',
        'Re-asking at sensible intervals or when purposes change',
      ],
    ),
    compare(
      'Good vs. non-compliant banners',
      {
        title: 'Compliant approach',
        points: [
          'Trackers blocked until consent',
          'Accept and reject equally easy',
          'Clear category descriptions',
          'Choice stored and respected',
        ],
      },
      {
        title: 'Common non-compliant patterns',
        tone: 'bad',
        points: [
          'Scripts fire before the user chooses',
          'Large “Accept” button, hidden or multi-step “Reject”',
          '“By continuing you agree” with no real choice',
          'Pre-ticked marketing boxes',
        ],
      },
    ),

    h2('Do you need a banner at all?'),
    p(
      'If your site uses only strictly necessary cookies, you may not need a consent banner, though you should still explain cookies in your policy. Many businesses avoid banners by choosing privacy-friendly analytics that do not use cookies or personal identifiers, and by avoiding advertising and social tracking scripts, but you must confirm that the tools you use genuinely fall within exemptions recognised by your regulator. In practice, most sites that use standard analytics, advertising pixels, embedded videos or social widgets will need a consent mechanism for visitors in the EU and UK. Audit what your site actually loads rather than guessing.',
    ),

    h2('Audit your site first'),
    steps(
      'A practical cookie and tracker audit',
      [
        { title: 'Scan your site', text: 'Use a cookie scanner and your browser’s developer tools to list cookies, scripts and trackers.' },
        { title: 'Categorise', text: 'Classify each as necessary, functional, analytics, marketing or social.' },
        { title: 'Identify the provider and purpose', text: 'Document who sets it, what it does and how long it lasts.' },
        { title: 'Remove what you do not need', text: 'Less tracking means less risk and a faster site; see [Core Web Vitals explained](/blog/core-web-vitals-explained).' },
        { title: 'Gate the rest behind consent', text: 'Configure your tag manager or consent tool so scripts load only after permission.' },
        { title: 'Re-audit regularly', text: 'New plugins and marketing tools add trackers over time.' },
      ],
    ),

    h2('Your privacy policy: what it must say'),
    p(
      'Transparency is a core GDPR principle. Your privacy policy should be easy to find, written in clear language and accurate. It generally needs to cover:',
    ),
    ul(
      'Who you are and how to contact you, including a data protection contact where required.',
      'What personal data you collect, from whom and through which channels: forms, cookies, analytics, accounts, payments, email marketing.',
      'Why you use it and the lawful basis for each purpose, such as consent, contract, legal obligation or legitimate interests.',
      'Who you share it with: processors, payment providers, analytics and marketing platforms, and whether data is transferred outside the UK or EU.',
      'How long you keep it.',
      'Individuals’ rights: access, correction, deletion, restriction, portability, objection and withdrawal of consent, and how to exercise them.',
      'Your cookie practices, or a link to a dedicated cookie policy.',
      'The right to complain to the relevant supervisory authority.',
    ),
    p(
      'Do not copy a policy from another site; yours must describe your actual practices. Update it when your tools or processes change.',
    ),

    h2('Forms, email and marketing'),
    ul(
      '**Contact and enquiry forms:** collect only what you need, explain how you will use it and link to your privacy policy.',
      '**Newsletter sign-ups:** use clear, unbundled opt-in consent, record it and include an easy unsubscribe.',
      '**Marketing emails and SMS:** separate rules often apply; consent or a valid soft opt-in exception, with clear opt-out.',
      '**Accounts and checkout:** explain data use and keep only what is needed for orders and legal obligations.',
      '**Third-party tools:** CRMs, chat and automation platforms are processors of personal data; use data-processing agreements and review where they store data.',
    ),

    h2('Analytics and tracking'),
    p(
      'Analytics tools are often the biggest compliance question. Some set cookies and collect identifiers that need consent; some regulators have taken action against particular analytics setups, particularly around international data transfers. Options include configuring your tool in a privacy-preserving way (anonymising IPs, disabling advertising features, shortening retention), using cookie-less analytics that your regulator accepts as exempt or low-risk, and gating standard analytics behind consent. Whichever you choose, be clear in your policy and keep your configuration under review. Note that consent-based analytics will not see visitors who decline, so plan to interpret the data accordingly.',
    ),

    h2('Handling individuals’ rights requests'),
    p(
      'People can ask what data you hold about them, request correction or deletion and object to certain processing. You generally must respond within a set period, often one month. Prepare in advance: know where personal data lives across your website, email, CRM and other tools, designate who handles requests, verify identities and keep a record of requests and outcomes. This ties into good security and data-handling practice, as explained in [website security basics](/blog/website-security-basics-for-small-business).',
    ),

    h2('AI tools, chatbots and new data flows'),
    p(
      'Adding chatbots, AI assistants and automation to a site creates new data flows that should appear in your privacy documentation. Explain what is collected in conversations, who processes it and how long it is kept, disclose that users are interacting with an automated system and consider whether additional consent is needed. Our guide to [AI privacy and security for small business](/blog/ai-privacy-and-security-for-small-business) covers vendor questions and policy basics.',
    ),

    h2('A compliance checklist'),
    checklist(
      'Website privacy checklist',
      [
        'Audit all cookies, scripts and third-party services on the site',
        'Remove unnecessary trackers and embeds',
        'Implement a consent mechanism that blocks non-essential tracking until consent',
        'Make rejecting as easy as accepting, with a way to change choices later',
        'Publish an accurate privacy policy and cookie policy',
        'Document your lawful bases and keep a record of processing activities where required',
        'Put data-processing agreements in place with providers that handle personal data',
        'Secure the site and data appropriately, with breach procedures',
        'Prepare to handle access, deletion and other rights requests',
        'Review the setup whenever you add tools or change purposes',
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Banner theatre:** a banner that does not actually block scripts.',
      '**Hiding the reject option** or using manipulative design.',
      '**Copying a generic policy** that does not match your practices.',
      '**Forgetting embedded content,** such as videos and maps, which set third-party cookies.',
      '**Ignoring tag managers,** which can load trackers outside your control.',
      '**Treating compliance as one-off:** sites change constantly.',
      '**Assuming only EU businesses are affected;** the rules follow your visitors.',
    ),
    cta(
      'Want a website that respects privacy, loads fast and keeps consent working correctly? We implement consent management, clean up trackers and build privacy-conscious sites.',
      '/contact',
      'Make your website privacy-ready',
    ),
  ],
  faqs: [
    {
      question: 'Do I need a cookie banner?',
      answer:
        'If your site uses non-essential cookies or similar trackers, such as analytics, advertising or social embeds, and has visitors in the EU or UK, you generally need to obtain consent first. Sites using only strictly necessary cookies may not. Audit what your site loads and check your obligations.',
    },
    {
      question: 'What does GDPR require on a website?',
      answer:
        'A lawful basis for processing personal data, transparent privacy information, appropriate security, respect for individuals’ rights, data-processing agreements with providers and, for non-essential cookies, valid consent under the ePrivacy rules.',
    },
    {
      question: 'How do I handle analytics under GDPR?',
      answer:
        'Either gate standard analytics behind consent, or use a privacy-friendly configuration or cookie-less tool that your regulator considers low risk. Document your choice, disclose it in your policy and review it as guidance changes.',
    },
    {
      question: 'Can I use “by continuing to browse you accept cookies”?',
      answer:
        'Generally no for non-essential cookies in the EU and UK. Consent must be a clear affirmative action, so implied consent through continued browsing is not considered valid.',
    },
    {
      question: 'What happens if my site is not compliant?',
      answer:
        'Regulators can investigate and impose fines and orders, and complaints from individuals can trigger action. Beyond penalties, non-compliance harms trust. Seek professional advice to assess your risk.',
    },
  ],
}
