import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'get-your-first-100-app-users',
  title: 'How to Get Your First 100 Users for a New App',
  shortTitle: 'Get your first 100 app users',
  description:
    'How to get your first 100 app users without a big budget: launch tactics, communities, outreach, store listing, referrals, feedback loops and what to measure.',
  date: '2026-11-30',
  updated: '2026-11-30',
  category: 'App Development',
  keywords:
    'get first 100 users app, how to get app users, app launch marketing, early adopters app, mobile app growth hacks, user acquisition for startups, beta testers for apps',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['how-to-validate-an-app-idea', 'app-store-optimization-basics', 'mvp-development-guide-for-startups', 'mobile-app-development-process'],
  intro:
    'Launching an app and watching nobody download it is one of the most common and demoralising experiences in startup life. The truth is that apps rarely “get discovered” on their own: the app stores are crowded, advertising is expensive and early users must be won one conversation at a time. The good news is that you do not need thousands of installs to learn whether your idea works. A first hundred real users, who actually use the product and give honest feedback, is a more valuable asset than ten thousand uninterested downloads. This guide lays out a practical, low-budget plan to find those first hundred: define who they are, find them where they already gather, make signing up easy, and turn their feedback into a better product.',
  takeaways: [
    'Your first users come from direct outreach and communities, not from the app store or ads.',
    'Define a narrow target user and a sharp promise before you start looking.',
    'Recruit before you launch: a waiting list and beta group make launch day matter.',
    'Do things that do not scale: personally onboard, talk to users and fix what they report.',
    'Measure activation and retention, not just downloads; engaged users are the point.',
  ],
  blocks: [
    h2('Why the first 100 matter'),
    p(
      'Early users are not just numbers. They are your proof that someone wants the product, your source of feedback, your first reviews and your word-of-mouth. They reveal which features matter, which confuse people and which assumptions were wrong. A hundred engaged users is enough to test whether people come back, whether they would pay and whether the idea deserves more investment, which fits perfectly with the philosophy of the [MVP approach](/blog/mvp-development-guide-for-startups).',
    ),
    p(
      'It is also far easier to give a hundred people a great experience than to try to please everyone at once. Narrow beats broad at the start.',
    ),

    h2('Step 1: Define who you want first'),
    p(
      'Choose a specific group who feel the problem acutely and are easy to reach: “freelance photographers who struggle to invoice clients”, not “small business owners”. A narrow group lets you speak directly to their problem, find the places they gather and tailor onboarding to their needs. If you have validated your idea through interviews, as described in [how to validate an app idea](/blog/how-to-validate-an-app-idea), you probably already know where to look: those interviewees are your first prospects.',
    ),
    checklist(
      'Write your early-user profile',
      [
        'Who exactly are they, and what do they do day to day?',
        'What problem do they feel most strongly?',
        'Where do they spend time online and offline?',
        'What are they doing today instead of using your app?',
        'What would make them try something new?',
        'Who can introduce you to them?',
      ],
    ),

    h2('Step 2: Recruit before you launch'),
    p(
      'Do not wait until the app is in the store. Build a simple landing page that states the promise, shows a screenshot or short demo, and collects email addresses for early access. Share it everywhere your target users are. A pre-launch list gives you a group to invite first, to learn from and to ask for reviews, which makes launch day meaningful instead of silent. Offer something for joining early, such as free access, influence over the roadmap or founding-member pricing.',
    ),
    steps(
      'A pre-launch plan',
      [
        { title: 'Landing page', text: 'One clear promise, a visual and a sign-up form.' },
        { title: 'Outreach', text: 'Personally invite the first 30 to 50 people who match your profile.' },
        { title: 'Beta group', text: 'Give early access through TestFlight or a Google Play test track.' },
        { title: 'Feedback loop', text: 'Weekly calls or surveys; fix what blocks them.' },
        { title: 'Launch', text: 'Invite the waiting list and ask for honest reviews.' },
      ],
    ),

    h2('Step 3: Go where your users already are'),
    p(
      'Rather than hoping users find you, find them. Look for the communities, groups, forums, newsletters and events where your target audience asks questions and swaps tips. Join them as a helpful participant, not a promoter: answer questions, share knowledge and mention your app only when it genuinely solves the problem someone describes and the community rules allow it.',
    ),
    table(
      'Places to find early adopters',
      ['Channel', 'How to use it', 'Tip'],
      [
        ['Online communities and forums', 'Answer questions, offer early access to those with the problem', 'Read the rules; contribute before you pitch'],
        ['Social groups and professional networks', 'Share your journey and invite feedback', 'Post specific problems, not ads'],
        ['Direct messages and email', 'Personal invitations to people who match your profile', 'Short, specific and human'],
        ['Newsletters and niche blogs', 'Offer a story or an exclusive early-access link', 'Pitch the audience’s benefit'],
        ['Events and meetups', 'Demo in person and collect sign-ups', 'Bring a QR code to your landing page'],
        ['Existing networks', 'Friends, colleagues and customers who fit the profile', 'Ask for introductions, not just downloads'],
        ['Product directories and launch platforms', 'A one-time visibility spike', 'Prepare assets and engage on the day'],
      ],
    ),
    callout(
      'note',
      'Direct outreach beats broadcasting',
      'Most founders find that personal messages to well-chosen people convert far better than public posts. Ten honest conversations usually teach more than a thousand impressions.',
    ),

    h2('Step 4: Make the first experience excellent'),
    p(
      'Getting someone to download is only the start. Many people open an app once and never return. The first session should deliver value quickly: ask for the minimum information, explain the benefit and guide them to the key action, such as creating their first project, completing a booking or seeing their first result. Remove friction: social sign-in, short forms and clear permissions requests that explain why. Track where users drop off and fix those points.',
    ),
    ul(
      '**Activation moment:** define the single action that shows a user “got it”, and measure how many reach it.',
      '**Onboarding:** short, skippable, focused on the outcome rather than a tour of features.',
      '**Permissions:** ask in context and explain the benefit.',
      '**Support:** make it very easy to message you from inside the app.',
    ),

    h2('Step 5: Do things that do not scale'),
    p(
      'In the early days, hands-on effort is your advantage. Personally welcome every new user, ask how they found you and what they hoped to do, offer a short call to the first fifty and fix their problems quickly, then tell them you did. Users who feel heard become advocates. You will learn more from these conversations than from any analytics dashboard, and the insights will shape the roadmap far better than guesses.',
    ),
    checklist(
      'Early-user habits',
      [
        'Message every new user personally in the first week',
        'Ask what almost stopped them from signing up',
        'Watch a few people use the app, if possible',
        'Log every piece of feedback and tag recurring themes',
        'Ship small fixes quickly and tell users what changed',
        'Ask satisfied users for a review and an introduction',
      ],
    ),

    h2('Step 6: Use referrals and reviews'),
    p(
      'Happy early users are your best marketing channel. Make it natural to share: invite links, shared items or collaboration features that bring others in. Offer a reasonable incentive if appropriate, within store policy. Ask for ratings at moments of success using the platform’s prompts. Early reviews also matter for store conversion, as covered in [App Store Optimization basics](/blog/app-store-optimization-basics).',
    ),

    h2('What about paid ads?'),
    p(
      'Paid acquisition can work, but it is usually inefficient before you know your product converts and retains. Spending to acquire users who churn is expensive learning. Use small, targeted tests only once your onboarding and retention are healthy, and compare cost per activated user, not cost per install. Until then, effort is better spent on conversations.',
    ),
    compare(
      'Early-stage acquisition',
      {
        title: 'Worth doing first',
        points: [
          'Personal outreach to ideal users',
          'Community participation',
          'Beta testing and waiting list',
          'Referrals from happy users',
        ],
      },
      {
        title: 'Usually too early',
        tone: 'bad',
        points: [
          'Large paid ad campaigns',
          'Press-release blasts',
          'Buying installs or reviews',
          'Scaling before retention is proven',
        ],
      },
    ),

    h2('Measure what matters'),
    table(
      'Early metrics',
      ['Metric', 'Why it matters'],
      [
        ['Sign-ups to activation rate', 'Shows whether the first experience works'],
        ['Day 1, day 7 and day 30 retention', 'Shows whether people come back'],
        ['Core action frequency', 'Shows real usage of the main feature'],
        ['Qualitative feedback themes', 'Shows why people stay or leave'],
        ['Referral or invite rate', 'Shows whether users recommend it'],
      ],
    ),
    p(
      'If users sign up but do not return, focus on the problem, onboarding and value delivered, not on getting more sign-ups. When the first hundred stick, you have earned the right to grow. For the broader journey from idea to launch, see the [mobile app development process](/blog/mobile-app-development-process).',
    ),
    cta(
      'Building an app and want it designed to attract and keep its first users? We help founders validate, build and launch focused MVPs with analytics and feedback built in.',
      '/contact',
      'Plan your app launch',
    ),
  ],
  faqs: [
    {
      question: 'How do I get users with no budget?',
      answer:
        'Define a narrow target user, reach them directly through communities, personal outreach and your network, build a waiting list before launch, personally onboard early users and ask for referrals. Conversations and community help cost time rather than money.',
    },
    {
      question: 'Is it better to launch on iOS or Android first?',
      answer:
        'It depends on where your target users are. Choose the platform your early adopters mainly use, or build cross-platform to reach both. Validate demand first, then expand.',
    },
    {
      question: 'How do I get app reviews?',
      answer:
        'Ask satisfied users at moments of success using the platform’s native rating prompt, respond to feedback, fix recurring complaints and never buy fake reviews, which violate store rules.',
    },
    {
      question: 'How many downloads do I need to validate an app idea?',
      answer:
        'Raw downloads matter less than engagement. A hundred or so active users who return and give feedback can tell you more than thousands of casual installs.',
    },
    {
      question: 'Should I run paid ads for my first users?',
      answer:
        'Usually not at the start. Prove that onboarding and retention work with organic and direct methods first, then test paid channels while measuring cost per activated user.',
    },
  ],
}
