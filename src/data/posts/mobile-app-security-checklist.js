import { callout, checklist, cta, h2, h3, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'mobile-app-security-checklist',
  title: 'Mobile App Security Checklist: 20 Essentials Before You Launch',
  shortTitle: 'Mobile app security checklist',
  description:
    'A practical mobile app security checklist: authentication, data storage, network and API security, third-party code, privacy and testing.',
  date: '2026-10-29',
  updated: '2026-10-29',
  category: 'App Development',
  keywords:
    'mobile app security checklist, mobile app security best practices, secure mobile app development, OWASP MASVS, app data encryption, API security for mobile apps, app privacy compliance',
  service: { label: 'Mobile app development services', to: '/app-development' },
  related: ['mobile-app-development-process', 'what-is-api-integration'],
  intro:
    'People hand their phones the most personal information they own: contacts, location, messages, payments, health data. An app that mishandles any of it damages users and the business behind it — through breaches, regulatory trouble and lost trust. The good news is that most mobile security problems come from a short list of avoidable mistakes. This checklist covers the essentials across authentication, data storage, networking, APIs, third-party code and privacy, so you can build security in rather than patch it on after launch.',
  takeaways: [
    'Security is a design requirement from the first stage, not a final-week task.',
    'Never trust the device: validate everything on the server and keep secrets out of the app.',
    'Encrypt data in transit and sensitive data at rest; collect and store as little as possible.',
    'Secure the APIs behind the app — they are the real attack surface.',
    'Test before launch, monitor after it, and update dependencies regularly.',
  ],
  blocks: [
    h2('Think like an attacker: where apps are weak'),
    p(
      'Industry guidance such as the OWASP Mobile Application Security project groups common weaknesses: insecure data storage, weak authentication, unprotected network traffic, insecure APIs, poor handling of third-party libraries and insufficient testing. The checklist below follows that pattern. Use it during design, again before launch and at each major release.',
    ),
    steps(
      'Where security fits in the app lifecycle',
      [
        { title: 'Requirements', text: 'Decide what data you collect and why; define threats.' },
        { title: 'Design', text: 'Plan authentication, permissions and data flows.' },
        { title: 'Build', text: 'Follow secure coding practices; review code.' },
        { title: 'Test', text: 'Security testing alongside functional testing.' },
        { title: 'Release & monitor', text: 'Watch for incidents; patch quickly.' },
      ],
    ),
    p(
      'This slots into the wider [mobile app development process](/blog/mobile-app-development-process); the earlier you decide on data handling, the cheaper it is to get right.',
    ),

    h2('1. Authentication and sessions'),
    checklist(
      'Authentication essentials',
      [
        'Use a proven authentication service or standard (such as OAuth/OpenID Connect) rather than inventing your own',
        'Support strong passwords or passwordless options, plus multi-factor authentication for sensitive actions',
        'Offer biometric unlock through the operating system’s secure APIs',
        'Use short-lived access tokens and secure refresh handling',
        'Lock out or rate-limit repeated failed attempts',
        'Make logout and session expiry actually invalidate tokens on the server',
      ],
    ),

    h2('2. Data storage on the device'),
    checklist(
      'Local data checklist',
      [
        'Store as little sensitive data on the device as possible',
        'Keep secrets, tokens and keys in the platform’s secure storage (Keychain on iOS, Keystore on Android) — never in plain files or preferences',
        'Encrypt sensitive local databases and files',
        'Clear sensitive data on logout and avoid it in logs, screenshots and backups',
        'Never hard-code API keys or credentials in the app — assume anyone can extract them',
      ],
    ),
    callout(
      'warn',
      'Assume the app can be reverse-engineered',
      'Anything shipped inside the app can be inspected. Real secrets and business rules belong on the server, where you control access.',
    ),

    h2('3. Network and API security'),
    p(
      'The app is only the front door; the API behind it holds your data. Many mobile breaches are really API failures — the same integration surface we discuss in [what API integration is](/blog/what-is-api-integration).',
    ),
    checklist(
      'Network and API checklist',
      [
        'All traffic over HTTPS/TLS with modern settings; no fallback to plain HTTP',
        'Consider certificate pinning for high-risk apps, with a plan for rotation',
        'Authenticate and authorise every API request on the server, per user and per object',
        'Validate and sanitise all input on the server; never trust client-side checks',
        'Rate-limit and monitor the API for abuse',
        'Return minimal data and generic error messages',
        'Keep admin and internal endpoints separate and protected',
      ],
    ),

    h2('4. Privacy and permissions'),
    ul(
      '**Data minimisation:** collect only what you need; delete what you no longer need.',
      '**Ask for permissions in context,** explain why, and let the app work without optional ones.',
      '**Be transparent:** an accurate privacy policy and truthful store privacy declarations.',
      '**Respect regulations** relevant to your users (for example GDPR or CCPA) and support access and deletion requests.',
      '**Handle analytics and ad SDKs carefully:** know what each third-party library collects.',
    ),

    h2('5. Third-party code and dependencies'),
    table(
      'Managing the supply chain',
      ['Practice', 'Why it matters'],
      [
        ['Keep a list of libraries and SDKs', 'You cannot patch what you do not know you use'],
        ['Update dependencies regularly', 'Known vulnerabilities are fixed in newer versions'],
        ['Choose well-maintained, reputable libraries', 'Abandoned packages become security liabilities'],
        ['Scan for known vulnerabilities in the build', 'Catches problems automatically'],
        ['Limit what each SDK can access', 'Reduces data exposure'],
      ],
    ),

    h2('6. Testing, release and response'),
    checklist(
      'Before and after launch',
      [
        'Security review of design and code, including authentication and storage',
        'Penetration or vulnerability testing for apps handling sensitive data',
        'Release builds with debugging disabled and code obfuscation where appropriate',
        'Crash and security monitoring switched on',
        'A documented process for handling a security incident and notifying users if required',
        'A schedule for regular updates for OS changes and dependencies',
      ],
    ),
    h3('Make security part of the brief'),
    p(
      'List your security and privacy requirements in the project brief and ask any development partner how they handle them. Security should show up in the estimate, the plan and the testing, not as an afterthought.',
    ),
    cta(
      'Building an app that handles personal, financial or health data? We will review your design against this checklist and flag gaps early, when they are cheap to fix.',
      '/contact',
      'Request a security review',
    ),
  ],
  faqs: [
    {
      question: 'What is the most important mobile app security practice?',
      answer:
        'Keep secrets and business rules on the server and secure the API behind the app. The device and anything shipped inside the app should be treated as untrusted.',
    },
    {
      question: 'How should a mobile app store sensitive data?',
      answer:
        'Minimise what you store, and keep tokens, keys and sensitive data in the platform’s secure storage (Keychain on iOS, Keystore on Android) with encryption — never in plain files or hard-coded in the app.',
    },
    {
      question: 'Do I need penetration testing?',
      answer:
        'It is strongly advisable for apps handling sensitive, financial or health data, and good practice before launching any app that stores personal information.',
    },
    {
      question: 'What is OWASP MASVS?',
      answer:
        'The OWASP Mobile Application Security Verification Standard is a widely used set of security requirements and testing guidance for mobile apps.',
    },
    {
      question: 'How often should I update my app for security?',
      answer:
        'Regularly — update dependencies, respond to new iOS and Android versions, and patch known vulnerabilities promptly. Plan this as ongoing maintenance.',
    },
  ],
}
