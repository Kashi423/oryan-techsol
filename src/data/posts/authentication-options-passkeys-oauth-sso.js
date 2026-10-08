import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'authentication-options-passkeys-oauth-sso',
  title: 'Authentication Options: Passwords, OAuth, Passkeys and SSO',
  shortTitle: 'Authentication options',
  description:
    'Authentication options explained: passwords, MFA, social login, OAuth, passkeys and SSO. Compare security and experience, and decide whether to build or buy.',
  date: '2026-12-21',
  updated: '2026-12-21',
  category: 'Custom Software',
  keywords:
    'authentication options, what are passkeys, oauth vs sso, should i build login myself, multi factor authentication, social login pros and cons, passwordless authentication, authentication as a service',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['api-design-best-practices', 'mobile-app-security-checklist', 'how-to-build-a-saas-product', 'cloud-hosting-costs-for-small-business'],
  intro:
    'Logging in is the front door to your application, and few features cause more security incidents, support tickets and abandoned sign-ups. Passwords are weak and annoying, yet nearly universal; social logins are convenient but add dependencies; single sign-on is essential for business customers but complicated to build; and passkeys promise to replace passwords altogether. For founders and product owners, the question is not which technology is trendiest but which combination protects users, fits your audience and does not consume your budget. This guide explains the main authentication options in plain language, compares their security and user experience, covers multi-factor authentication and account recovery, and answers the question every team faces: should we build login ourselves, or buy it?',
  takeaways: [
    'Authentication proves who a user is; authorisation decides what they can do. Both must be designed carefully.',
    'Passwords alone are the weakest option; add multi-factor authentication and consider passwordless methods such as passkeys.',
    'Social login reduces friction but creates dependence on third-party providers.',
    'B2B customers often require single sign-on (SSO), so plan for it if you sell to organisations.',
    'Use proven standards and a specialist service or library rather than building authentication from scratch.',
  ],
  blocks: [
    h2('Authentication, authorisation and why both matter'),
    p(
      '**Authentication** answers “who are you?”, and **authorisation** answers “what are you allowed to do?”. Users see only the first step, signing in, but a system that authenticates perfectly and authorises poorly still leaks data. A customer who logs in correctly should see only their own records; an admin should have powers a normal user lacks. Both need design and testing, as we emphasise in [API design best practices](/blog/api-design-best-practices) and the [mobile app security checklist](/blog/mobile-app-security-checklist).',
    ),

    h2('The main authentication methods'),
    table(
      'Options compared',
      ['Method', 'How it works', 'Pros', 'Cons'],
      [
        ['Username and password', 'User creates and remembers a secret', 'Familiar and universal', 'Reused, weak and phished passwords; recovery burden'],
        ['Password plus MFA', 'Adds a second factor such as an app code, security key or text', 'Much stronger than passwords alone', 'Extra friction; SMS codes are weaker than app or hardware factors'],
        ['Magic links or email codes', 'A one-time link or code sent to email or phone', 'No password to remember', 'Depends on email security; delays'],
        ['Social login', 'Sign in with an existing account from a major provider', 'Fast sign-up; fewer passwords', 'Dependence on providers; privacy concerns; not everyone has or wants them'],
        ['Passkeys', 'Cryptographic credentials stored on a device or password manager, unlocked by biometrics or PIN', 'Phishing-resistant and convenient', 'Adoption and recovery flows still maturing'],
        ['Single sign-on (SSO)', 'Sign in via the organisation’s identity provider', 'Centralised control for companies; no new passwords', 'Complex to implement and support'],
      ],
    ),

    h2('Passwords: still common, still risky'),
    p(
      'Despite decades of warnings, many people reuse weak passwords across sites, and attackers exploit this with credential-stuffing attacks that try leaked passwords against other services. If you support passwords, follow current best practice: store them only as salted hashes using a strong, slow algorithm designed for passwords, never in plain text; allow long passphrases and password managers; check new passwords against known-breached lists; apply rate limiting and lockouts to slow guessing; and never impose arbitrary composition rules that encourage predictable patterns. Standards bodies such as NIST publish detailed guidance that is worth reading.',
    ),
    callout(
      'warn',
      'Never build password storage yourself unless you must',
      'Mistakes in hashing, reset flows and session handling are common and costly. A reputable identity service or well-maintained library implements these details correctly.',
    ),

    h2('Multi-factor authentication (MFA)'),
    p(
      'MFA requires a second proof beyond the password, which blocks the vast majority of account-takeover attempts. The factors differ in strength.',
    ),
    ul(
      '**Authenticator apps (time-based codes):** a strong, widely supported option.',
      '**Hardware security keys:** the strongest consumer option, resistant to phishing.',
      '**Push approvals:** convenient, but guard against “prompt bombing” where users approve by mistake.',
      '**SMS or voice codes:** better than nothing but vulnerable to SIM-swap and interception; use as a fallback rather than the primary factor for high-risk accounts.',
      '**Biometrics:** typically unlock a device-held credential rather than being sent to your server.',
    ),
    p(
      'Make MFA easy to adopt, with clear prompts and backup codes, and require it for administrators and sensitive actions at minimum.',
    ),

    h2('Social login and OAuth'),
    p(
      'Social login lets users sign in with an account they already have. Behind the scenes it uses standards: **OAuth 2.0**, a framework for delegated authorisation, and **OpenID Connect**, a layer on top that provides identity. The result is fewer passwords for users to manage and a faster sign-up. Downsides include dependence on external providers (if a provider changes terms or the user loses access, they may lose access to your app), privacy concerns about data sharing and the fact that some audiences simply prefer email and password. Offering social login alongside email options is a common compromise. Mobile platforms also have rules about offering equivalent sign-in options, so check the current store guidelines.',
    ),
    compare(
      'Social login: pros and cons',
      {
        title: 'Benefits',
        points: [
          'Higher sign-up conversion for many consumer apps',
          'No password storage for those users',
          'Verified email addresses in many cases',
          'Lower support load for resets',
        ],
      },
      {
        title: 'Drawbacks',
        points: [
          'Dependence on third-party providers',
          'Account recovery complexity when users lose access',
          'Privacy and data-minimisation considerations',
          'Not suitable for all audiences, especially business users',
        ],
      },
    ),

    h2('Passkeys: the passwordless future'),
    p(
      'Passkeys are a modern credential based on public-key cryptography and the WebAuthn standard. Instead of a shared secret, your device holds a private key and your service stores the matching public key. The user proves possession with a fingerprint, face scan or device PIN. Because there is no secret to type or steal from a server, passkeys resist phishing and credential-stuffing, and they are quick to use, especially when synced across a user’s devices through their platform or password manager. Support across browsers and operating systems has grown quickly, though user understanding and account-recovery experiences are still evolving. A good strategy today is to offer passkeys as an option, or primary method, alongside fallback methods, and to design recovery carefully.',
    ),
    checklist(
      'Preparing for passkeys',
      [
        'Check that your chosen identity provider or library supports WebAuthn and passkeys',
        'Offer passkey enrolment after a successful login, with clear explanations',
        'Keep at least one secure fallback and a robust recovery process',
        'Test across the browsers, devices and password managers your users have',
        'Update your support documentation and help content',
      ],
    ),

    h2('Single sign-on for business customers'),
    p(
      'If you sell software to organisations, they will ask for SSO: letting employees sign in using the company’s own identity provider, such as Microsoft Entra ID, Google Workspace or Okta. It centralises access control, lets IT enforce MFA and policies and instantly removes access when someone leaves. Technically it uses standards such as SAML or OpenID Connect, and often **SCIM** for automatic user provisioning. SSO is notoriously fiddly to implement and support, with each customer’s setup differing slightly. Many B2B products treat it as a premium plan feature, and use an identity platform that handles the heavy lifting. If you are building a SaaS product, plan for it early; see [how to build a SaaS product](/blog/how-to-build-a-saas-product).',
    ),

    h2('Sessions, tokens and recovery'),
    p(
      'Signing in creates a session, and how it is managed matters as much as the login itself. Use secure, short-lived tokens with safe refresh handling, protect cookies with the right flags, expire sessions sensibly and let users see and revoke active sessions. Account recovery is the weak point attackers love: a reset flow that is easier to abuse than the login defeats strong authentication. Verify users carefully before changing credentials, notify them by email of security changes and consider extra checks for high-risk recoveries.',
    ),
    ul(
      '**Rate limit and monitor** login and reset endpoints for abuse.',
      '**Detect unusual logins:** new devices, impossible travel and repeated failures.',
      '**Log security events** and alert on suspicious activity.',
      '**Offer logout everywhere** and session management.',
    ),

    h2('Build, buy or use a library?'),
    table(
      'Approaches to implementing authentication',
      ['Approach', 'Description', 'Best for'],
      [
        ['Identity platform (authentication as a service)', 'A specialist service handles login, MFA, social login, SSO and user management', 'Most startups and small teams; fastest and safest'],
        ['Framework library', 'A well-maintained library inside your application', 'Teams wanting control with proven code'],
        ['Cloud provider identity', 'Identity services from your cloud platform', 'Teams already deep in that ecosystem'],
        ['Fully custom', 'Everything built in-house', 'Rare cases with unusual requirements and strong security expertise'],
      ],
    ),
    p(
      'For most products, the right answer is to **buy or adopt a proven solution** and spend your engineering effort on what makes your product unique. Compare vendors on security track record, supported standards, pricing at your scale (many charge per active user), data location, branding flexibility and ease of migrating away. The general build-or-buy thinking in [custom software vs. off-the-shelf](/blog/custom-software-vs-off-the-shelf) applies here too.',
    ),

    h2('Choosing the right mix'),
    steps(
      'A practical recommendation process',
      [
        { title: 'Know your users', text: 'Consumers, employees or business customers: each expects different options.' },
        { title: 'Assess risk', text: 'What data and actions does the login protect? Higher risk demands stronger methods.' },
        { title: 'Pick a base method', text: 'Passkeys or email-based login for convenience, with passwords as a fallback if needed.' },
        { title: 'Add MFA and recovery', text: 'Require it for sensitive roles and actions; design a safe recovery path.' },
        { title: 'Plan for SSO', text: 'If you serve organisations, choose a platform that supports it.' },
        { title: 'Test and monitor', text: 'Include security testing and ongoing monitoring.' },
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Rolling your own authentication** and getting subtle details wrong.',
      '**Storing passwords insecurely** or emailing them in plain text.',
      '**Weak password recovery** that undermines strong login.',
      '**Forcing MFA with no explanation or backup options.**',
      '**Ignoring authorisation:** authenticated users accessing other users’ data.',
      '**Leaving SSO to the last minute** when a big customer asks.',
      '**No rate limiting or monitoring** on login endpoints.',
    ),
    cta(
      'Need secure, user-friendly login for your web or mobile app, including MFA, passkeys or SSO? We integrate proven identity solutions and design recovery and permission flows that hold up.',
      '/contact',
      'Secure your app’s login',
    ),
  ],
  faqs: [
    {
      question: 'What are passkeys and should I use them?',
      answer:
        'Passkeys are passwordless credentials based on public-key cryptography, unlocked with a device biometric or PIN. They resist phishing and are convenient. Offering them alongside a fallback method is a sensible approach as support continues to grow.',
    },
    {
      question: 'Should I build login myself?',
      answer:
        'Usually not. Authentication has many subtle security pitfalls. Using a proven identity platform or well-maintained library is safer and cheaper than building from scratch for most products.',
    },
    {
      question: 'What is single sign-on?',
      answer:
        'SSO lets users sign in to your app with their organisation’s existing identity provider, so IT can control access centrally. It is a common requirement for B2B software and usually uses SAML or OpenID Connect.',
    },
    {
      question: 'Is SMS two-factor authentication secure?',
      answer:
        'It is better than a password alone but weaker than authenticator apps or hardware keys because of risks like SIM swapping and interception. Use stronger factors for sensitive accounts and keep SMS as a fallback.',
    },
    {
      question: 'What is the difference between OAuth and OpenID Connect?',
      answer:
        'OAuth 2.0 is a framework for delegating authorisation, letting an app access resources on a user’s behalf. OpenID Connect builds on OAuth to provide authentication, letting an app verify who the user is.',
    },
  ],
}
