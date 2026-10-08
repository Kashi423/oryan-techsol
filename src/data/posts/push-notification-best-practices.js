import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'push-notification-best-practices',
  title: 'Push Notification Best Practices for Mobile Apps',
  shortTitle: 'Push notification best practices',
  description:
    'Push notification best practices: permission timing, personalisation, frequency, timing, content, segmentation, testing and the metrics that show what works.',
  date: '2026-12-09',
  updated: '2026-12-09',
  category: 'App Development',
  keywords:
    'push notification best practices, mobile app push notifications, increase opt in rate, how many push notifications, push notification timing, personalized notifications, notification permission ios android',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['get-your-first-100-app-users', 'app-store-optimization-basics', 'mobile-app-security-checklist', 'mvp-development-guide-for-startups'],
  intro:
    'Push notifications are one of the few channels that can put a message on a customer’s screen within seconds of something relevant happening. Used well, they bring people back to an app, confirm important events and make a product feel alive. Used badly, they are the fastest route to muted alerts, revoked permissions and uninstalls. The difference rarely lies in the technology; it lies in respect for the user’s attention. This guide covers the practices that separate helpful notifications from annoying ones: when and how to ask for permission, which messages deserve to be sent, how often and when to send them, how to write content that gets read, how to personalise and segment, and how to test and measure the results.',
  takeaways: [
    'Earn the right to send: ask for permission in context, after the user has seen value, and explain the benefit.',
    'Send fewer, more relevant messages; relevance and timing beat volume every time.',
    'Separate transactional, informational and promotional messages, and give users control over each.',
    'Write short, specific, actionable copy and link directly to the relevant screen.',
    'Test, segment and measure opt-in, open, conversion and opt-out rates, and respect privacy rules.',
  ],
  blocks: [
    h2('Why notifications work, and why they fail'),
    p(
      'A push notification interrupts. That is its power and its risk. When the interruption is welcome, such as a delivery arriving, a message from a friend or a reminder of an appointment, users appreciate it. When it is irrelevant, repetitive or badly timed, users learn to ignore the app or switch notifications off, and once permission is gone it is hard to win back. Treat every send as a withdrawal from a limited account of user goodwill.',
    ),
    table(
      'Three kinds of notifications',
      ['Type', 'Examples', 'User expectation'],
      [
        ['Transactional', 'Order confirmation, delivery update, payment receipt, security alert', 'Essential and expected; rarely resented'],
        ['Informational', 'Appointment reminders, account activity, new message', 'Useful and time-sensitive'],
        ['Promotional or engagement', 'Offers, new features, content recommendations', 'Optional; must be relevant and infrequent'],
      ],
    ),
    p(
      'Keep these categories distinct in your app and, ideally, in your settings, so users can mute promotions without losing critical alerts.',
    ),

    h2('Permission: when and how to ask'),
    p(
      'On iOS, apps must request permission before sending notifications, and on recent versions of Android a runtime permission is also required. Because a refusal is hard to reverse, how and when you ask matters enormously. Asking the moment the app opens, before the user knows what the app does, is the classic mistake and typically produces low opt-in rates.',
    ),
    steps(
      'A better permission flow',
      [
        { title: 'Let users experience value first', text: 'Wait until they have completed a meaningful action.' },
        { title: 'Show a pre-permission screen', text: 'In your own interface, explain what they will get and why it helps.' },
        { title: 'Ask at the right moment', text: 'For instance, right after booking: “Want a reminder before your appointment?”' },
        { title: 'Respect “not now”', text: 'Do not trigger the system prompt if they decline your own screen; ask again later in context.' },
        { title: 'Make settings easy', text: 'Provide in-app controls and links to system settings.' },
      ],
    ),
    callout(
      'note',
      'Platform rules change',
      'Permission models and notification features differ between iOS and Android and evolve with each OS release. Check Apple and Google’s current documentation and test on real devices when you implement.',
    ),

    h2('Decide what deserves a notification'),
    p(
      'Before sending anything, ask three questions: Is it relevant to this person right now? Is it timely, or would it be just as useful in an email? Does it give them a clear next action? If the answer to any is no, do not send it. Good candidates include confirmations and receipts, status changes the user is waiting for, reminders of commitments, messages from other people and personally relevant alerts, such as a price drop on an item they saved. Weak candidates include generic “we miss you” blasts, daily nudges with no content and announcements most users will not care about.',
    ),
    checklist(
      'A pre-send test',
      [
        'Would the recipient thank us for this message?',
        'Is the information accurate and current at delivery time?',
        'Does it make sense on a lock screen, without context?',
        'Does tapping it open exactly the relevant screen?',
        'Is it appropriate for the time of day in the user’s time zone?',
        'Can the user easily control this type of message?',
      ],
    ),

    h2('Frequency and timing'),
    p(
      'There is no universal number of “right” notifications per week; it depends on the product and the user. A messaging app may send many, and a utility app may send a few a month. What matters is that frequency matches the value. Start conservatively, measure opt-outs and engagement, and let users set their own preferences.',
    ),
    ul(
      '**Time zones:** send according to the recipient’s local time and avoid late-night or very early alerts unless truly urgent.',
      '**Behaviour-based timing:** use when users typically open the app, rather than a fixed global schedule.',
      '**Quiet hours:** respect do-not-disturb and let users set preferences.',
      '**Caps and spacing:** limit promotional sends per week, and avoid stacking several messages in a short window.',
      '**Triggers over broadcasts:** event-based messages tied to what a user did usually outperform blasts to everyone.',
    ),

    h2('Write content that gets read'),
    p(
      'A notification has a few words of space and seconds of attention. Lead with the most useful information, be specific and make the next step obvious.',
    ),
    compare(
      'Notification copy examples',
      {
        title: 'Better',
        points: [
          '“Your order is 5 minutes away. Driver: Sam.”',
          '“Reminder: appointment tomorrow at 10:30. Tap to reschedule.”',
          '“Price drop: the trainers you saved are now 20% off.”',
          'Specific, timely, useful',
        ],
      },
      {
        title: 'Worse',
        tone: 'bad',
        points: [
          '“You have a new notification!”',
          '“Check this out!!! Amazing offers inside”',
          '“We miss you. Come back”',
          'Vague, pushy, generic',
        ],
      },
    ),
    ul(
      'Use plain language and a sensible length, keeping key words in the first line.',
      'Use rich notifications (images, action buttons) when they genuinely help, such as “Reschedule” or “Reply”.',
      'Deep-link straight to the relevant content, never to the generic home screen.',
      'Keep sensitive details off the lock screen: avoid private, financial or health information in notification text. See our [mobile app security checklist](/blog/mobile-app-security-checklist).',
    ),

    h2('Personalise and segment'),
    p(
      'Relevance rises dramatically when messages reflect what each user does. Segment by behaviour (new, active, lapsed), preferences, location, lifecycle stage and past purchases. A new user needs onboarding nudges that lead to their first success; a lapsed user might appreciate a useful reminder of what changed; a loyal customer wants early access, not discounts. Avoid creepy personalisation that shows you know more than the user expects, and always be transparent about the data you use.',
    ),
    table(
      'Lifecycle messaging ideas',
      ['Stage', 'Goal', 'Example message'],
      [
        ['New user', 'Reach the first valuable action', '“Finish setting up your profile to see matches.”'],
        ['Active user', 'Deliver ongoing value', '“Your weekly summary is ready.”'],
        ['At risk', 'Re-engage with something relevant', '“New items added in the categories you follow.”'],
        ['Lapsed', 'Win back respectfully', 'A single, useful message, not a barrage'],
        ['Transactional', 'Inform and reassure', 'Order, delivery, payment, account and security updates'],
      ],
    ),

    h2('Test and measure'),
    p(
      'Treat notifications as an ongoing experiment. Test one variable at a time, such as copy, send time, or audience, and compare against a control group.',
    ),
    checklist(
      'Metrics to track',
      [
        'Permission opt-in rate, by prompt design and timing',
        'Delivery and open rates by message type',
        'Conversion to the target action, not just opens',
        'Opt-out and uninstall rates after sends',
        'Impact on retention: do recipients return more than a control group?',
        'Complaint or support feedback about notifications',
      ],
    ),
    p(
      'If a campaign increases opens but also uninstalls, it is a bad trade. Our guides on [getting your first app users](/blog/get-your-first-100-app-users) and [App Store Optimization](/blog/app-store-optimization-basics) discuss why retention and ratings matter more than short-term spikes.',
    ),

    h2('Privacy, consent and compliance'),
    ul(
      'Be transparent about what you send and why, and honour user choices immediately.',
      'Follow marketing consent rules where you operate; promotional messages may require explicit opt-in under laws such as GDPR or ePrivacy rules.',
      'Do not misuse notifications for deceptive or intrusive purposes, which can breach store policies.',
      'Secure your notification infrastructure and tokens, and avoid sending sensitive data.',
    ),

    h2('Common mistakes'),
    ul(
      '**Asking for permission on first launch** with no context.',
      '**One-size-fits-all blasts** to the entire user base.',
      '**Too frequent promotions,** which train users to mute you.',
      '**Sending in the wrong time zone** at 3 a.m.',
      '**No settings** for users to choose what they receive.',
      '**Measuring clicks only,** ignoring opt-outs and uninstalls.',
    ),
    cta(
      'Want notifications that bring users back without annoying them? We design and implement push strategies, segmentation and analytics as part of every app we build.',
      '/contact',
      'Improve your app engagement',
    ),
  ],
  faqs: [
    {
      question: 'How many push notifications are too many?',
      answer:
        'It depends on your app and users. If opt-outs, uninstalls or complaints rise after sends, you are sending too many or irrelevant ones. Start low, segment, let users set preferences and optimise using data.',
    },
    {
      question: 'How do I increase opt-in rates?',
      answer:
        'Ask after users have experienced value, use a pre-permission screen that explains the benefit, ask in context, and avoid prompting on the first launch. Offer clear settings so users feel in control.',
    },
    {
      question: 'What time is best to send notifications?',
      answer:
        'There is no universal best time. Use the user’s local time, respect quiet hours and test send times based on when your users are typically active. Time-sensitive alerts should be sent immediately.',
    },
    {
      question: 'Can I send marketing notifications without consent?',
      answer:
        'It depends on the regulations that apply to you and the platform rules. Many regions require clear consent for promotional messages. Seek legal advice and offer separate controls for promotional notifications.',
    },
    {
      question: 'What should never go in a notification?',
      answer:
        'Sensitive personal, financial or health details, since they may appear on lock screens, and misleading or manipulative wording. Keep messages minimal and link into the secure app for detail.',
    },
  ],
}
