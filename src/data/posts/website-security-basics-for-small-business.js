import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'website-security-basics-for-small-business',
  title: 'Cybersecurity Basics for Small Business Websites',
  shortTitle: 'Website security basics',
  description:
    'Website security basics for small business: common attacks, updates, passwords and MFA, HTTPS, firewalls, backups, signs of a hack and what to do if hacked.',
  date: '2026-12-23',
  updated: '2026-12-23',
  category: 'Web Development',
  keywords:
    'website security basics, small business website security, how to know if website is hacked, protect website from hackers, waf web application firewall, https ssl, website malware removal',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['website-maintenance-plans-and-costs', 'backup-and-disaster-recovery-for-small-business', 'wordpress-vs-custom-website', 'authentication-options-passkeys-oauth-sso'],
  intro:
    'Many small business owners believe their website is too small or unimportant to be a target. Attackers disagree, and they rarely choose targets by name. Automated tools scan the internet continuously for outdated software, weak passwords and misconfigured servers, and every site that matches becomes a victim: used to host spam, steal customer data, redirect visitors to scams, mine cryptocurrency or send phishing emails. The damage ranges from embarrassing to ruinous: lost customers, search engine warnings, legal exposure and days of clean-up. The reassuring part is that most compromises exploit a short list of basic weaknesses, and a handful of good habits closes most of them. This guide explains the common threats in plain language and gives you a practical, prioritised security checklist you can follow, plus what to do if the worst happens.',
  takeaways: [
    'Most website compromises come from outdated software, weak or reused passwords and vulnerable plugins, all preventable.',
    'Keep everything updated, use strong unique passwords with multi-factor authentication, and limit who has access.',
    'Use HTTPS, a web application firewall and secure hosting, and keep regular, tested, offsite backups.',
    'Monitor for signs of compromise and have a simple incident plan before you need it.',
    'Security is ongoing maintenance, not a one-time setup; build it into your routine.',
  ],
  blocks: [
    h2('Why small sites get attacked'),
    p(
      'Attackers go after volume. They run scripts that probe thousands of websites for known weaknesses, and a small business site on an unpatched platform is as good a target as any. What they want from you varies: your server’s computing power and bandwidth, your domain’s reputation for sending spam, your visitors’ browsers for malware, stolen customer data or access to other systems you use. They often act automatically, and you may not notice for weeks.',
    ),
    table(
      'Common website threats',
      ['Threat', 'What it is', 'How it usually happens'],
      [
        ['Outdated software exploits', 'Attackers use known flaws in your CMS, plugins or server', 'Updates not applied'],
        ['Credential attacks', 'Guessing or reusing passwords; brute force and credential stuffing', 'Weak or reused passwords; no MFA'],
        ['Malware and defacement', 'Malicious code injected into your site', 'Compromised plugins, themes or accounts'],
        ['SQL injection and cross-site scripting', 'Malicious input exploits poorly written code', 'Unvalidated input in custom code or plugins'],
        ['Phishing and social engineering', 'Tricking you or staff into revealing access', 'Convincing emails and fake login pages'],
        ['DDoS attacks', 'Overwhelming your site with traffic', 'Botnets; often used to disrupt or extort'],
        ['Supply-chain compromises', 'A trusted plugin, theme or script is itself compromised', 'Abandoned or hijacked third-party code'],
      ],
    ),

    h2('Priority 1: Keep software updated'),
    p(
      'Outdated software is the most common entry point. Platform, theme and plugin updates frequently include security fixes, and attackers study those fixes to attack sites that have not applied them. Turn on automatic updates where safe, or schedule regular update sessions, test on a staging copy for important sites and remove plugins and themes you no longer use, as unused code is still attack surface. Choose well-maintained, reputable extensions, and replace abandoned ones. This is a core part of any [website maintenance plan](/blog/website-maintenance-plans-and-costs).',
    ),
    callout(
      'warn',
      'Popular platforms need diligence',
      'Widely used platforms are well tested but heavily targeted, so unpatched installations are found quickly. The platform choice matters less than the discipline of keeping it updated; see [WordPress vs. a custom website](/blog/wordpress-vs-custom-website) for how upkeep differs by approach.',
    ),

    h2('Priority 2: Passwords, access and multi-factor authentication'),
    checklist(
      'Access control checklist',
      [
        'Use long, unique passwords for every account, stored in a reputable password manager',
        'Enable multi-factor authentication on hosting, domain registrar, CMS admin, email and any service connected to your site',
        'Never share logins; create separate accounts with the minimum permissions each person needs',
        'Remove access immediately when staff or contractors leave',
        'Rename or disable default admin usernames, and limit login attempts',
        'Restrict admin areas by IP or additional authentication where practical',
        'Protect your domain registrar account especially well; losing the domain means losing everything',
      ],
    ),
    p(
      'We discuss the range of login technologies, including passkeys, in [authentication options](/blog/authentication-options-passkeys-oauth-sso). The principles apply to your own staff logins as much as to customers’.',
    ),

    h2('Priority 3: HTTPS, hosting and basic hardening'),
    ul(
      '**HTTPS everywhere:** an SSL/TLS certificate encrypts traffic between visitors and your site and is expected by browsers and search engines. Make sure it renews automatically and that all pages and resources load over HTTPS.',
      '**Quality hosting:** choose a provider with isolation between accounts, timely server patching, malware scanning and good support. Cheap, neglected hosting is a common weak link.',
      '**Current server software:** keep PHP, databases and other runtimes on supported versions.',
      '**Secure configuration:** disable directory listing and unused services, and set strong file permissions.',
      '**Security headers:** modern headers such as Content-Security-Policy, X-Content-Type-Options and Strict-Transport-Security reduce several classes of attack.',
      '**Protect sensitive files:** configuration files, backups and logs should never be publicly accessible.',
    ),

    h2('Priority 4: Firewalls and monitoring'),
    p(
      'A **web application firewall (WAF)** sits in front of your site and filters malicious requests, blocking many common attacks before they reach your code. Many hosting providers and content delivery networks offer one. Pair it with malware scanning, file-integrity monitoring that alerts you to unexpected changes and uptime monitoring so you know quickly if the site goes down or behaves strangely. Rate limiting on login and form endpoints slows automated guessing and spam.',
    ),
    compare(
      'Reactive vs. proactive security',
      {
        title: 'Reactive (risky)',
        tone: 'bad',
        points: [
          'Updates when something breaks',
          'No monitoring; customers report problems',
          'Shared admin passwords',
          'Backups untested',
        ],
      },
      {
        title: 'Proactive (resilient)',
        points: [
          'Scheduled updates and reviews',
          'Alerts for downtime and file changes',
          'Individual accounts with MFA',
          'Regular, tested, offsite backups',
        ],
      },
    ),

    h2('Priority 5: Secure forms, code and third-party scripts'),
    p(
      'Anywhere your site accepts input, forms, search boxes, comments and uploads, is a potential attack route. If you use custom code, validate and sanitise all input on the server, use parameterised database queries and escape output. Restrict file upload types and scan uploads. Be selective about third-party scripts such as analytics, chat widgets and tag managers; each one runs with considerable power on your pages, and a compromised script can steal data from your visitors. Load only what you need, from trusted providers, and review them periodically. Payment pages deserve special care: use your payment provider’s hosted fields or checkout so card data never touches your server.',
    ),

    h2('Priority 6: Backups'),
    p(
      'No set of defences is perfect, so backups are your safety net. Keep regular automatic backups of files and databases, store copies away from the web server, protect them with separate credentials and test restoring them. A clean, recent backup can turn a compromise from a disaster into an afternoon’s work. Our full guide to [backup and disaster recovery](/blog/backup-and-disaster-recovery-for-small-business) covers the 3-2-1 rule, ransomware protection and restore testing.',
    ),

    h2('Signs your site may have been hacked'),
    checklist(
      'Warning signs',
      [
        'Browser or search engine warnings that your site is dangerous or deceptive',
        'Unexpected redirects, pop-ups or ads appearing on your pages',
        'New admin users, files or pages that you did not create',
        'Spam content or strange links, often hidden, on your site or in search results',
        'Sudden drops in traffic or odd search results mentioning pharmacy or gambling terms',
        'Your host suspends the account or warns of malicious activity',
        'Visitors or customers report phishing emails that seem to come from you',
        'Site becomes slow or unavailable without a clear reason',
      ],
    ),

    h2('What to do if you are hacked'),
    steps(
      'An incident response outline',
      [
        { title: 'Stay calm and contain', text: 'Take the site offline or into maintenance mode if needed to protect visitors.' },
        { title: 'Change credentials', text: 'Reset passwords and keys for hosting, CMS, database, email and connected services, and enable MFA.' },
        { title: 'Assess the damage', text: 'Identify what was changed or accessed; check logs; scan for malware.' },
        { title: 'Restore or clean', text: 'Restore from a known-clean backup or have the malware professionally removed, then close the entry point.' },
        { title: 'Update and harden', text: 'Patch everything and apply the protections above.' },
        { title: 'Notify as required', text: 'If personal data was exposed, you may have legal duties to inform authorities and customers; seek advice.' },
        { title: 'Request review and learn', text: 'If search engines flagged the site, request a review after cleaning, and record lessons learned.' },
      ],
    ),
    p(
      'Do not simply delete the visible spam: attackers usually leave backdoors that let them return. Professional help is worthwhile if you are unsure.',
    ),

    h2('Privacy, compliance and customer trust'),
    p(
      'If your site collects personal data, security is also a legal and trust matter. Data protection laws expect appropriate technical and organisational measures to protect personal information, and breaches can trigger notification duties and penalties. Collect only the data you need, store it securely and make your privacy policy accurate. Visible trust signals such as HTTPS, clear policies and secure checkout reassure customers. If you use AI tools with customer data, review the guidance in [AI privacy and security for small business](/blog/ai-privacy-and-security-for-small-business).',
    ),

    h2('A simple monthly routine'),
    checklist(
      'Security routine',
      [
        'Apply updates to the platform, themes, plugins and server software',
        'Review user accounts and remove those no longer needed',
        'Check that backups ran and test a restore periodically',
        'Review security scan and uptime alerts',
        'Check SSL certificate validity and expiry dates',
        'Review third-party scripts and plugins; remove unused ones',
        'Look at Search Console security messages',
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**“We are too small to be targeted.”** Automated attacks do not care.',
      '**Using the same password** on the site, email and other services.',
      '**Ignoring updates** because the site “works fine”.',
      '**Installing too many plugins** or abandoned themes.',
      '**Skipping backups** or never testing them.',
      '**Giving everyone admin access.**',
      '**Having no plan** for what to do when something goes wrong.',
    ),
    cta(
      'Want your website hardened, monitored and backed up properly? We build secure sites and provide maintenance and security reviews for sites built by us or others.',
      '/contact',
      'Get a website security review',
    ),
  ],
  faqs: [
    {
      question: 'How do I know if my website has been hacked?',
      answer:
        'Look for browser or search warnings, unexpected redirects or pop-ups, unknown admin users or files, spam content, sudden traffic changes or host notifications. A malware scan and a review of server logs can confirm it.',
    },
    {
      question: 'Do small sites get attacked?',
      answer:
        'Yes. Attacks are largely automated and target vulnerable software regardless of the site’s size, so small business websites are regularly compromised.',
    },
    {
      question: 'What is a WAF?',
      answer:
        'A web application firewall filters incoming traffic to block malicious requests such as common injection attacks and bots before they reach your site. Many hosts and content delivery networks provide one.',
    },
    {
      question: 'What is the single most important security step?',
      answer:
        'Keeping software updated, combined with strong unique passwords and multi-factor authentication. These prevent the majority of common compromises.',
    },
    {
      question: 'Do I need to tell customers if my site is hacked?',
      answer:
        'If personal data was exposed, laws such as GDPR and others may require notifying authorities and affected individuals within set timeframes. Seek legal advice promptly.',
    },
  ],
}
