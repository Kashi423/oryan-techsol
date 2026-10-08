import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'spf-dkim-dmarc-explained',
  title: 'Email Deliverability Basics: SPF, DKIM and DMARC Explained',
  shortTitle: 'SPF, DKIM and DMARC explained',
  description:
    'SPF, DKIM and DMARC explained simply: why business email goes to spam, how to set up email authentication, check it and fix common deliverability problems.',
  date: '2027-01-18',
  updated: '2027-01-18',
  category: 'Web Development',
  keywords:
    'spf dkim dmarc explained, why are my emails going to spam, email authentication setup, dmarc policy, improve email deliverability, business email setup, spf record example',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['website-security-basics-for-small-business', 'marketing-automation-for-small-business', 'gdpr-cookie-consent-for-websites', 'website-maintenance-plans-and-costs'],
  intro:
    'You send an important quote or invoice, and it lands in the customer’s spam folder, or never arrives at all. Your website contact form sends enquiries to your inbox, then silently stops. Or worse, someone sends scam emails that appear to come from your domain. These are symptoms of the same underlying issue: the email system cannot easily tell whether a message claiming to be from you really is. Three DNS-based standards, SPF, DKIM and DMARC, exist to solve exactly that. They are now effectively required by major mailbox providers for senders of any volume, and without them your emails are increasingly likely to be filtered or rejected. This guide explains in plain language what each one does, how they work together, how to set them up and check them, the common mistakes that break delivery and the other factors that influence whether your messages reach the inbox.',
  takeaways: [
    'SPF lists which servers may send email for your domain; DKIM adds a cryptographic signature; DMARC tells receivers what to do when checks fail and sends you reports.',
    'Without proper authentication, legitimate email is more likely to land in spam, and criminals can more easily spoof your domain.',
    'Set up all three, start DMARC in monitoring mode, then tighten the policy as you confirm legitimate senders are covered.',
    'Every service that sends email for you, such as your mail provider, website forms and marketing tools, must be included.',
    'Authentication is necessary but not sufficient: content, list quality, engagement and reputation also affect deliverability.',
  ],
  blocks: [
    h2('The problem: email was built on trust'),
    p(
      'The original email system lets anyone claim to send from any address, much like writing any return address on a paper envelope. That openness enabled spam and phishing at enormous scale. To restore trust, mailbox providers introduced authentication standards. When a receiving server gets a message that says it is from your domain, it can check DNS records you publish to verify that the sending server is authorised and that the message has not been altered. Messages that fail checks can be flagged, sent to spam or rejected.',
    ),
    p(
      'Major providers have tightened requirements for bulk senders in recent years, and even smaller senders benefit from correct setup. It is also a security measure: DMARC in particular lets you prevent criminals from impersonating your brand. Email authentication is part of basic website and business hygiene, alongside the practices in [website security basics](/blog/website-security-basics-for-small-business).',
    ),

    h2('SPF: who is allowed to send'),
    p(
      '**Sender Policy Framework (SPF)** is a DNS record that lists the servers and services permitted to send email on behalf of your domain. When a message arrives, the receiving server checks the sending server’s address against your SPF record. If it is listed, the check passes.',
    ),
    ul(
      '**What it looks like:** a TXT record on your domain that begins with a version tag and lists authorised sources, such as your mail provider and your marketing platform, ending with a policy for everything else.',
      '**Common mistake:** having more than one SPF record. A domain must have exactly one; combine all sources into a single record.',
      '**Common mistake:** exceeding the limit of ten DNS lookups, which causes SPF to fail. Too many included services can break it.',
      '**Policy ending:** a soft-fail or hard-fail instruction tells receivers how to treat unlisted senders; many start with softer settings while testing.',
    ),

    h2('DKIM: proving the message is genuine'),
    p(
      '**DomainKeys Identified Mail (DKIM)** adds a digital signature to each outgoing message. The sending service signs the message with a private key, and you publish the matching public key in DNS. The receiving server uses the public key to verify that the message really came from an authorised source and that its content was not changed in transit. Unlike SPF, DKIM survives forwarding, because the signature travels with the message.',
    ),
    ul(
      '**Setup:** your email provider or sending service generates keys and gives you DNS records, usually CNAME or TXT entries, to add to your domain.',
      '**Each sender needs its own DKIM:** your mailbox provider, your newsletter tool, your CRM and your website’s form service may each sign separately.',
      '**Key hygiene:** use sufficiently strong keys and rotate them periodically, as your provider recommends.',
    ),

    h2('DMARC: the policy and the reports'),
    p(
      '**Domain-based Message Authentication, Reporting and Conformance (DMARC)** ties SPF and DKIM together and adds two things: a policy that tells receivers what to do with messages that fail authentication, and reporting that tells you who is sending email using your domain. For DMARC to pass, a message must pass SPF or DKIM **and** the authenticated domain must align with the visible “From” domain.',
    ),
    table(
      'DMARC policies',
      ['Policy', 'Meaning', 'When to use it'],
      [
        ['none (monitor)', 'Take no action; just send reports', 'Starting point: learn who sends as your domain'],
        ['quarantine', 'Treat failing messages as suspicious, typically sending them to spam', 'After you have fixed legitimate senders'],
        ['reject', 'Instruct receivers to reject failing messages', 'Once you are confident everything legitimate is aligned; strongest protection'],
      ],
    ),
    p(
      'Reports, usually sent as XML files to an address you specify, can be difficult to read raw, so many people use a DMARC reporting service to summarise them. They reveal forgotten systems that send on your behalf, such as an old invoicing tool, and attempts by others to spoof you.',
    ),
    callout(
      'tip',
      'Go slowly to avoid blocking your own email',
      'Start with a monitoring policy, review reports for a few weeks, fix every legitimate sender and only then move towards quarantine and reject. Jumping straight to reject can block real messages from services you forgot about.',
    ),
    compare(
      'How the three fit together',
      {
        title: 'SPF and DKIM',
        points: [
          'Technical checks on who sent the message and whether it was altered',
          'Each can pass or fail on its own',
          'Set up per sending service',
          'Necessary but incomplete without policy',
        ],
      },
      {
        title: 'DMARC',
        points: [
          'Requires alignment with the visible From domain',
          'Tells receivers what to do on failure',
          'Provides reports on all email using your domain',
          'Protects against spoofing and phishing',
        ],
      },
    ),

    h2('How to set it up'),
    steps(
      'A practical setup path',
      [
        { title: 'List every sender', text: 'Your mailbox provider, website forms, marketing and automation tools, CRM, invoicing, support and any server that sends email.' },
        { title: 'Publish SPF', text: 'Create a single TXT record that includes all legitimate senders and stays within the lookup limit.' },
        { title: 'Enable DKIM for each sender', text: 'Generate keys in each service and add the DNS records they give you.' },
        { title: 'Publish DMARC in monitoring mode', text: 'Add a record with policy none and a reporting address.' },
        { title: 'Test', text: 'Send test messages to major providers and check headers or use an online checker.' },
        { title: 'Review reports', text: 'Fix unauthorised or failing legitimate sources over several weeks.' },
        { title: 'Tighten the policy', text: 'Move to quarantine, then reject when the reports are clean.' },
      ],
    ),
    p(
      'DNS records are changed where your domain’s DNS is managed, such as your registrar, host or a separate DNS provider. Because mistakes can disrupt email, change records carefully and keep a note of what existed before. If you are unsure, involve whoever maintains your website and email; this is a typical item in a [website maintenance plan](/blog/website-maintenance-plans-and-costs).',
    ),

    h2('Common problems and fixes'),
    table(
      'Troubleshooting',
      ['Symptom', 'Likely cause', 'Fix'],
      [
        ['Website contact form emails go to spam or disappear', 'The site sends mail directly from the web server with no authentication', 'Send through an authenticated mail service or SMTP provider with SPF and DKIM'],
        ['SPF “too many lookups” error', 'Too many included services', 'Flatten or consolidate the record; remove unused services'],
        ['Two SPF records', 'Added separately by different tools', 'Merge into a single record'],
        ['DKIM fails for a service', 'Record missing or mistyped', 'Re-add the exact DNS record the service provides and wait for propagation'],
        ['DMARC fails despite SPF pass', 'Domain alignment: the authenticated domain differs from the From domain', 'Configure the sender to use your domain for authentication, such as custom return-path and DKIM domain'],
        ['Forwarded mail fails SPF', 'Forwarding changes the sending server', 'Rely on DKIM, which survives forwarding'],
        ['Emails still land in spam', 'Reputation, content or list quality issues', 'See below'],
      ],
    ),

    h2('Beyond authentication: deliverability factors'),
    p(
      'Passing authentication gets you into the room; it does not guarantee the inbox. Mailbox providers also evaluate reputation, engagement, content and sending behaviour.',
    ),
    checklist(
      'Deliverability best practices',
      [
        'Send only to people who have asked to hear from you; follow consent rules, as described in [marketing automation for small business](/blog/marketing-automation-for-small-business)',
        'Keep lists clean: remove bounces and long-inactive contacts',
        'Make unsubscribing easy and honour requests immediately',
        'Avoid sudden spikes in volume from a new domain; warm up gradually',
        'Use a consistent From name and address',
        'Write clear subject lines and content; avoid spammy tricks, excessive images and misleading claims',
        'Include a physical address and unsubscribe link in marketing emails where required',
        'Monitor complaint rates, bounces and engagement, and act on problems',
        'Use separate subdomains for marketing and transactional mail where sensible, to protect reputation',
        'Keep your domain and mail servers off blocklists, and check regularly',
      ],
    ),
    ul(
      '**Business mailboxes vs. bulk mail:** a day-to-day mailbox and a marketing platform have different reputations; authenticate both correctly.',
      '**Free email addresses as the sender** for a business domain’s mail can cause authentication problems; use your own domain.',
      '**Privacy:** email lists contain personal data; see [GDPR and cookie consent for websites](/blog/gdpr-cookie-consent-for-websites) for the broader obligations.',
    ),

    h2('Testing and monitoring'),
    p(
      'After setup, check that authentication passes by sending a test message to a major provider and viewing the original message headers, where results for SPF, DKIM and DMARC are shown. Online checkers can inspect your DNS records and flag errors. Keep monitoring through DMARC reports, bounce messages and your email platform’s deliverability dashboards. Re-check whenever you add a new service that sends email, change providers or modify DNS, because it is easy to break authentication by accident.',
    ),

    h2('Common mistakes'),
    ul(
      '**Adding a new email tool without updating SPF and DKIM.**',
      '**Publishing multiple SPF records.**',
      '**Moving DMARC to reject too quickly,** blocking legitimate mail.',
      '**Never reading DMARC reports.**',
      '**Sending website form emails straight from the web server.**',
      '**Assuming authentication alone fixes spam placement.**',
      '**Forgetting subdomains** that send email.',
    ),
    cta(
      'Are your emails landing in spam, or is your domain being spoofed? We set up SPF, DKIM and DMARC, fix form and system email delivery and monitor your domain’s reputation.',
      '/contact',
      'Fix your email deliverability',
    ),
  ],
  faqs: [
    {
      question: 'Why are my emails going to spam?',
      answer:
        'Common reasons include missing or failing SPF, DKIM or DMARC authentication, a poor sender reputation, sending to unengaged or purchased lists, spammy content and sudden volume spikes. Fix authentication first, then review list quality and content.',
    },
    {
      question: 'What is DMARC?',
      answer:
        'DMARC is a DNS-based policy that tells receiving mail servers what to do with messages that fail SPF or DKIM alignment checks for your domain, and sends you reports about who is sending email using it.',
    },
    {
      question: 'How do I set up business email authentication?',
      answer:
        'List all services that send email for your domain, publish a single SPF record, enable DKIM for each sender, add a DMARC record in monitoring mode, test, review reports and tighten the policy gradually.',
    },
    {
      question: 'Do small businesses really need SPF, DKIM and DMARC?',
      answer:
        'Yes. Mailbox providers increasingly expect authentication, and without it legitimate emails are more likely to be filtered while criminals can more easily impersonate your domain.',
    },
    {
      question: 'Why do my website contact form emails not arrive?',
      answer:
        'The site probably sends mail directly from the web server without proper authentication. Route form emails through an authenticated SMTP or email service with correct SPF and DKIM records.',
    },
  ],
}
