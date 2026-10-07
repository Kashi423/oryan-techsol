import { callout, checklist, cta, h2, h3, p, steps, table, timeline, ul } from './helpers.js'

export default {
  slug: 'mobile-app-development-process',
  title: 'The Mobile App Development Process: 7 Stages From Idea to App Store',
  shortTitle: 'Mobile app development process',
  description:
    'A clear walk-through of the mobile app development process — discovery, design, build, testing, launch and support — with what happens at each stage.',
  date: '2026-10-09',
  updated: '2026-10-09',
  category: 'App Development',
  keywords:
    'mobile app development process, app development lifecycle, how apps are built, app development stages, app development timeline, software development life cycle for mobile',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['how-much-does-a-mobile-app-cost', 'react-native-vs-flutter-vs-native', 'how-to-choose-a-software-development-company'],
  intro:
    'Most people see an app as a finished product: icons, screens, a download button. Behind it sits a repeatable process that turns a rough idea into software people trust with their time and data. Knowing that process helps you budget realistically, ask better questions of any development team and avoid the surprises that derail first-time projects. This guide walks through the seven stages of the mobile app development process and what should happen — and be produced — at each one.',
  takeaways: [
    'A professional app project has seven stages: discovery, UX design, UI design, development, testing, launch and ongoing support.',
    'The earliest stages are the cheapest place to fix mistakes — a wrong assumption costs a conversation in discovery and rework after the build.',
    'Work is delivered in small increments you can review, not as one reveal at the end.',
    'Testing on real devices and a proper store-submission plan are not optional extras.',
    'Launch is the start of the product’s life: budget for monitoring, fixes and the first improvements.',
  ],
  blocks: [
    h2('The seven stages at a glance'),
    p(
      'Whether the team calls it a “lifecycle”, a “sprint plan” or simply “how we work”, the same seven stages appear in almost every well-run mobile project. Smaller apps move through them quickly; complex products revisit them several times as features are added.',
    ),
    steps(
      'The mobile app development process',
      [
        { title: 'Discovery', text: 'Goals, users, features, risks and the smallest useful first version.' },
        { title: 'UX design', text: 'User flows and wireframes that show how the app works.' },
        { title: 'UI design', text: 'Visual design, a design system and a clickable prototype.' },
        { title: 'Development', text: 'The app, back-end and integrations, built in reviewable increments.' },
        { title: 'Testing', text: 'Devices, performance, security and real-user feedback.' },
        { title: 'Launch', text: 'Store submission, release and monitoring.' },
        { title: 'Support', text: 'Fixes, updates and the next release, driven by real usage.' },
      ],
    ),

    h2('Stage 1: Discovery — decide what to build (and what not to)'),
    p(
      'Discovery is a short, focused phase that replaces assumptions with decisions. The team interviews stakeholders, studies the people who will use the app, reviews competitors and agrees the problem the app must solve. The most valuable output is not a long document but a **ranked feature list** and a clear definition of version one.',
    ),
    ul(
      '**Users and jobs-to-be-done:** who is this for and what are they trying to achieve?',
      '**Scope:** must-have, should-have and later features, prioritised.',
      '**Technical approach:** native or cross-platform, back-end needs, integrations (see [React Native vs. Flutter vs. native](/blog/react-native-vs-flutter-vs-native)).',
      '**Risks and unknowns:** what could derail the project, and how to test it early.',
      '**Estimate and plan:** a phased budget and timeline you can compare with the figures in our [app cost guide](/blog/how-much-does-a-mobile-app-cost).',
    ),

    h2('Stages 2 and 3: UX and UI design'),
    p(
      'Design happens in two layers. **UX design** is about how the app works: the screens, the paths between them and the number of taps to get something done. It starts with sketches and low-fidelity wireframes. **UI design** is how it looks: colours, typography, spacing, icons and a consistent set of reusable components.',
    ),
    table(
      'UX vs. UI: what each stage produces',
      ['', 'UX design', 'UI design'],
      [
        ['Question answered', 'How does it work?', 'How does it look and feel?'],
        ['Typical outputs', 'User flows, wireframes, navigation map', 'Style guide, components, screen designs'],
        ['Tested with users?', 'Yes — early, with simple prototypes', 'Yes — with the clickable high-fidelity prototype'],
        ['Cost of a change', 'Low', 'Low to moderate'],
      ],
    ),
    callout(
      'tip',
      'Test the prototype before anyone writes code',
      'A clickable prototype lets real users try the app in an afternoon. Changing a button’s position in a prototype costs minutes; changing it in finished code costs days.',
    ),

    h2('Stage 4: Development — building in increments'),
    p(
      'Development covers the app itself, the back-end (database, accounts, business rules, admin tools) and integrations with services such as payments or your CRM — the connective work we explain in [what API integration is](/blog/what-is-api-integration). Good teams ship in short cycles (often two weeks), demonstrating working software at the end of each one so you can steer.',
    ),
    h3('What you should see during development'),
    ul(
      'A demo of working features every one to two weeks — not just status reports.',
      'A shared task board showing what is done, in progress and next.',
      'A staging version you can install on your own phone.',
      'Code kept in a repository that you own or can access.',
    ),

    h2('Stage 5: Testing — before real users find the bugs'),
    p(
      'Testing runs alongside development and intensifies before launch. It covers whether features work, how the app behaves on different phones and OS versions, how fast it is on a weak connection, and whether it handles errors gracefully. Security checks belong here too — we list them in our later guide on mobile app security.',
    ),
    checklist(
      'Pre-launch testing checklist',
      [
        'Core user journeys work end to end on iOS and Android',
        'Tested on real devices, including an older, slower phone',
        'Poor-connection and offline behaviour checked',
        'Permissions requests are clear and only ask for what is needed',
        'Crash and error reporting is switched on',
        'Analytics events are firing correctly',
        'Privacy policy, data handling and store listings are ready',
      ],
    ),

    h2('Stages 6 and 7: Launch and ongoing support'),
    p(
      'Launch means preparing store listings (title, screenshots, description, privacy details), submitting the build for review, and rolling out carefully — often to a small group first. Reviews can take from hours to a few days and may request changes, so plan buffer time.',
    ),
    timeline(
      'A typical launch window',
      [
        { label: 'Week −2', title: 'Store assets and listing', text: 'Screenshots, description, privacy answers and support contact.' },
        { label: 'Week −1', title: 'Beta test', text: 'Real users on a pre-release build via TestFlight or Google Play testing tracks.' },
        { label: 'Launch', title: 'Submit and release', text: 'Submit for review, then release gradually while watching crash and usage data.' },
        { label: 'Weeks 1–4', title: 'Stabilise and learn', text: 'Fix issues quickly, read reviews and plan the first update from real usage.' },
      ],
    ),
    p(
      'After launch the work shifts to support: monitoring, bug fixes, new OS versions and the improvements your users ask for. Budget for it from day one — see our guide to [what mobile apps cost](/blog/how-much-does-a-mobile-app-cost), including the recurring costs people forget.',
    ),
    cta(
      'Want a development team that works this way — small increments, regular demos, no surprises? Tell us about your app and we will map the stages for your project.',
      '/contact',
      'Plan your app with us',
    ),

    h2('How long does each stage take?'),
    p(
      'It depends on scope, but as a rough guide for a mid-complexity app, discovery takes one to two weeks, design two to four, development two to four months and testing and launch several weeks, overlapping with the end of development. Teams that rush discovery and design usually lose the time back — with interest — during development. If you are comparing partners, our guide to [choosing a software development company](/blog/how-to-choose-a-software-development-company) explains what to look for.',
    ),
  ],
  faqs: [
    {
      question: 'What are the stages of mobile app development?',
      answer:
        'A typical process has seven stages: discovery, UX design, UI design, development, testing, launch and ongoing support. Smaller apps move through them quickly; larger products revisit them with each release.',
    },
    {
      question: 'How long does it take to build a mobile app?',
      answer:
        'A simple app can take two to three months and a mid-complexity product three to six months. Timelines depend on scope, how quickly decisions are made, and the number of integrations.',
    },
    {
      question: 'Which stage is the most important?',
      answer:
        'Discovery. Decisions made there — who the app is for and what version one contains — shape everything that follows and are by far the cheapest to change.',
    },
    {
      question: 'Do I need to be involved during development?',
      answer:
        'Yes, lightly but regularly. Reviewing a demo every one to two weeks and answering questions promptly keeps the project on track and avoids expensive rework late on.',
    },
    {
      question: 'What happens after the app launches?',
      answer:
        'Monitoring, bug fixes, updates for new iOS and Android versions, and the next round of features based on real usage. Plan and budget for ongoing support rather than treating launch as the finish line.',
    },
  ],
}
