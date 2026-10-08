import { callout, checklist, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'publish-an-app-on-the-app-store-and-google-play',
  title: 'How to Publish an App on the App Store and Google Play',
  shortTitle: 'Publish an app on the App Store and Google Play',
  description:
    'How to publish an app on the Apple App Store and Google Play: accounts, requirements, review process, common rejections, listing assets and a launch checklist.',
  date: '2026-12-12',
  updated: '2026-12-12',
  category: 'App Development',
  keywords:
    'publish app on app store, publish app on google play, app store review process, why was my app rejected, apple developer account cost, google play console requirements, app store submission checklist',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['app-store-optimization-basics', 'mobile-app-security-checklist', 'mobile-app-development-process', 'mobile-app-maintenance-what-to-budget'],
  intro:
    'Finishing the code is not the end of an app project. To reach users, your app has to pass through the gates of the Apple App Store and Google Play, each with its own accounts, requirements, review processes and rules. First-time publishers regularly lose weeks to preventable problems: missing privacy information, unclear permissions, incomplete test accounts, wrong screenshots or a feature that breaks store policy. This guide walks through the process for both stores in order: setting up developer accounts, preparing the app and listing, testing, submitting, handling review and rejection and planning updates. Requirements change often, so treat it as a practical roadmap and check Apple’s and Google’s official documentation for the latest details.',
  takeaways: [
    'Set up developer accounts early; verification and organisation checks can take days or weeks.',
    'Prepare the listing assets, privacy disclosures and a working test account before you submit.',
    'Test with the stores’ beta tools (TestFlight and Google Play testing tracks) on real devices.',
    'Most rejections come from crashes, incomplete information, privacy issues or policy violations; all are avoidable.',
    'Publishing is ongoing: plan for updates, reviews, ratings and compatibility with new OS releases.',
  ],
  blocks: [
    h2('The big picture'),
    p(
      'Publishing involves four threads that run in parallel: **accounts** (who you are as a publisher), **the app build** (a signed, tested release), **the store listing** (text, graphics and disclosures) and **review** (the store checking that your app meets its rules). Start the slowest threads first. Developer account verification, especially for organisations, can take time, so create accounts well before your target launch date.',
    ),
    table(
      'Apple vs. Google at a glance',
      ['Aspect', 'Apple App Store', 'Google Play'],
      [
        ['Account', 'Apple Developer Program (annual fee)', 'Google Play Console (one-time registration fee)'],
        ['Build format', 'Archive built in Xcode and uploaded via App Store Connect', 'Android App Bundle uploaded to Play Console'],
        ['Beta testing', 'TestFlight', 'Internal, closed and open testing tracks'],
        ['Review', 'Human and automated review for every submission', 'Automated and manual checks; timing varies'],
        ['Typical review time', 'Often within a day or two, but varies', 'Can be quick or take days, especially for new accounts'],
        ['Privacy info', 'App Privacy details and privacy policy required', 'Data safety form and privacy policy required'],
      ],
      'Fees, formats and timings change; confirm the current details on each store’s official site.',
    ),

    h2('Step 1: Create developer accounts'),
    ul(
      '**Apple:** enrol in the Apple Developer Program as an individual or organisation. Organisations typically need a legal entity and a D-U-N-S number, and verification can take time.',
      '**Google:** register a Google Play Console account. Newer personal accounts may have extra testing requirements before production release, such as a minimum number of testers over a set period, so check the current policy and plan for it.',
      '**Use a business-owned account:** register in your company’s name, not a freelancer’s, so you own the app and can change developers later.',
      '**Secure the accounts:** use strong passwords, two-factor authentication and shared roles instead of shared logins.',
    ),
    callout(
      'warn',
      'Own your accounts',
      'If an agency publishes under its own developer account, moving the app later can be painful or impossible without losing reviews. Insist that the app is published under your account, with your agency invited as a team member.',
    ),

    h2('Step 2: Prepare the app'),
    checklist(
      'Technical readiness',
      [
        'A stable release build with no crashes on current devices and OS versions',
        'Correct app name, bundle or package identifier, version and build numbers',
        'Proper signing and certificates or app signing configured',
        'Permissions requested only when needed, with clear usage descriptions',
        'No placeholder content, test data or broken links',
        'Working login for reviewers: provide a demo account if the app requires sign-in',
        'Backend ready for real traffic, with monitoring in place',
        'Compliance with the stores’ current target SDK or OS version requirements',
      ],
    ),
    p(
      'Security and privacy matter at review and after launch; follow the guidance in our [mobile app security checklist](/blog/mobile-app-security-checklist).',
    ),

    h2('Step 3: Build the store listing'),
    p(
      'The listing is your shop window and the basis for discovery, so invest in it. Our guide to [App Store Optimization basics](/blog/app-store-optimization-basics) covers keywords and conversion in depth. At minimum you will need:',
    ),
    table(
      'Listing assets and information',
      ['Item', 'Notes'],
      [
        ['App name and subtitle or short description', 'Clear, accurate and within character limits'],
        ['Full description', 'Benefit-led, honest and well structured'],
        ['Icon', 'High resolution, simple and distinct'],
        ['Screenshots', 'Required sizes for each device class; show real app screens with captions'],
        ['Preview video (optional)', 'Short demonstration of core value'],
        ['Category and age rating', 'Answer the rating questionnaire truthfully'],
        ['Privacy policy URL', 'A public page describing data collection and use'],
        ['Privacy details or data safety form', 'Must accurately reflect what the app and its SDKs collect'],
        ['Support URL and contact email', 'Real and monitored'],
        ['Release notes', 'What is in this version'],
      ],
    ),
    callout(
      'tip',
      'Audit your SDKs for privacy declarations',
      'Analytics, ads, crash and social login libraries collect data. Make sure your privacy declarations account for everything they do, since mismatches are a common cause of rejection.',
    ),

    h2('Step 4: Test with real devices and real testers'),
    steps(
      'Pre-release testing',
      [
        { title: 'Internal testing', text: 'Your team installs the build through TestFlight or the internal track.' },
        { title: 'Closed beta', text: 'A small group of external users tries the app and reports issues.' },
        { title: 'Fix and retest', text: 'Resolve crashes, usability problems and compatibility issues.' },
        { title: 'Final release candidate', text: 'Freeze the build and verify the complete user journey.' },
      ],
    ),
    ul(
      'Test on a range of devices, including older and low-end phones.',
      'Test poor connectivity, interruptions, permissions refusal and upgrades from a previous version.',
      'Verify purchases and subscriptions in the stores’ sandbox environments if you sell anything.',
    ),

    h2('Step 5: Submit and navigate review'),
    p(
      'Upload your build, complete the listing, answer compliance questions and submit. Reviewers check that the app works, matches its description, respects the platform’s guidelines and handles data responsibly. Provide clear notes for the reviewer: how to access features, test credentials and explanations of anything unusual, such as why you need a particular permission. Plan your launch date with buffer for review time and any resubmission.',
    ),
    h3('Common reasons for rejection'),
    ul(
      '**Crashes or bugs:** the app does not work or is incomplete.',
      '**Missing or inaccurate privacy information:** declarations or policy do not match behaviour.',
      '**Unexplained permissions:** requesting access without a clear user benefit.',
      '**Misleading metadata:** screenshots or descriptions that do not reflect the real app.',
      '**Payment rule violations:** selling digital goods outside permitted billing methods; see [mobile app monetization models](/blog/mobile-app-monetization-models).',
      '**Minimum functionality:** the app is too limited, or is little more than a website wrapper.',
      '**Content and conduct issues:** user-generated content without moderation, or prohibited material.',
      '**No reviewer access:** login is required but no demo account is supplied.',
    ),
    p(
      'If you are rejected, read the message carefully, fix the specific issue, respond politely in the review resolution channel if you disagree and resubmit. Most rejections are resolved within a cycle or two.',
    ),

    h2('Launch day and beyond'),
    checklist(
      'Launch checklist',
      [
        'Decide whether to release manually or automatically after approval',
        'Consider a phased or staged rollout to limit risk',
        'Prepare support channels and monitor crashes and reviews in real time',
        'Have your waiting list, beta users and website ready to promote the launch',
        'Set up analytics and alerts so you can see what happens straight away',
        'Plan the first update within weeks to fix issues quickly',
      ],
    ),
    p(
      'After launch, keep publishing: respond to reviews, ship fixes, update for new OS versions and refresh your listing. Budget for this ongoing work, as explained in [mobile app maintenance costs](/blog/mobile-app-maintenance-what-to-budget). For the wider journey from idea to release, read the [mobile app development process](/blog/mobile-app-development-process).',
    ),

    h2('Common mistakes'),
    ul(
      '**Leaving publishing to the last week:** accounts, assets and review all take time.',
      '**Publishing under someone else’s account.**',
      '**Treating the listing as an afterthought,** hurting discovery and conversion.',
      '**Ignoring review feedback and ratings** after launch.',
      '**Skipping staged rollouts** for major updates.',
      '**Neglecting updates,** which can lead to compatibility problems or removal.',
    ),
    h2('Preparing your reviewer notes'),
    p(
      'A short, clear note to the review team often prevents a rejection. Explain what the app does in two or three sentences, list demo credentials that work and are not tied to a personal phone or email, describe any feature that depends on hardware, location or a specific account, and say why you request each sensitive permission. If your app involves payments, subscriptions or user-generated content, summarise how it complies with the relevant guidelines, for instance by describing your moderation and reporting tools. Keep the tone factual and polite. Reviewers handle many submissions, and a well-prepared note shows professionalism and speeds up approval.',
    ),
    checklist(
      'Reviewer note checklist',
      [
        'Plain-language summary of the app’s purpose',
        'Working test account and instructions to reach every main feature',
        'Explanation of permissions, background modes and unusual capabilities',
        'Notes on payments, subscriptions, trials and how to test them',
        'Links to the privacy policy, terms and support page',
        'A contact route so reviewers can reach you quickly if they have questions',
      ],
    ),
    cta(
      'Want a smooth launch on both stores? We handle builds, store accounts, listings, compliance and release so your app is approved and ready to be found.',
      '/contact',
      'Get your app published',
    ),
  ],
  faqs: [
    {
      question: 'How long does Apple app review take?',
      answer:
        'Many reviews finish within a day or two, but timing varies, especially for first submissions or complex apps. Submit early, leave buffer time and avoid tying a hard launch date to the approval.',
    },
    {
      question: 'Why was my app rejected?',
      answer:
        'Common reasons are crashes, incomplete or inaccurate privacy information, unexplained permissions, misleading screenshots or descriptions, payment rule violations and no demo account for reviewers. The rejection message identifies the specific guideline to fix.',
    },
    {
      question: 'How much do developer accounts cost?',
      answer:
        'Apple charges an annual developer program fee, while Google charges a one-time registration fee. Amounts and terms can change, so check each store’s current pricing and requirements.',
    },
    {
      question: 'Do I need a privacy policy to publish an app?',
      answer:
        'Yes, both stores require a link to a privacy policy, and you must complete privacy disclosure forms that accurately describe what data your app and its SDKs collect.',
    },
    {
      question: 'Can I publish the app under my agency’s account?',
      answer:
        'It is risky. Publish under your own business account and invite your developers as team members so you keep ownership, reviews and the ability to change providers.',
    },
  ],
}
