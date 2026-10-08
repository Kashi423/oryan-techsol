import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'backup-and-disaster-recovery-for-small-business',
  title: 'Data Backup and Disaster Recovery for Small Businesses',
  shortTitle: 'Backup and disaster recovery',
  description:
    'Backup and disaster recovery for small business: the 3-2-1 rule, RTO and RPO, what to back up, ransomware protection, testing restores and a practical plan.',
  date: '2026-12-22',
  updated: '2026-12-22',
  category: 'Custom Software',
  keywords:
    'small business data backup, disaster recovery plan, 3-2-1 backup rule, rto and rpo explained, ransomware backup protection, how often should i back up, test backup restore, website backup',
  service: { label: 'Custom software development', to: '/custom-software' },
  related: ['cloud-hosting-costs-for-small-business', 'devops-and-ci-cd-for-small-teams', 'website-maintenance-plans-and-costs', 'ai-privacy-and-security-for-small-business'],
  intro:
    'Most small businesses do not think about backups until the day they desperately need one: a failed server, an accidental deletion, a hacked website, ransomware that locks every file or a cloud account that disappears. On that day the question is brutally simple: can you get your data and your systems back, and how long will it take? Backup is the copy of your data; disaster recovery is the plan for getting the business running again. Together they decide whether an incident is an irritating morning or the end of the company. This guide gives small businesses a practical approach: what to protect, the 3-2-1 backup rule, how to think about recovery time and data loss, how to defend backups against ransomware, why untested backups are not backups and how to put a realistic plan in place without an enterprise budget.',
  takeaways: [
    'Back up everything that would hurt to lose: customer data, financial records, websites, databases, email, documents and configurations.',
    'Follow the 3-2-1 idea: three copies, on two kinds of media, with one stored offsite or offline.',
    'Decide how much data loss (RPO) and downtime (RTO) your business can tolerate, and design backups to meet it.',
    'Protect backups from ransomware with immutability, separate credentials and offline copies.',
    'Test restores regularly and write a simple recovery plan with named responsibilities.',
  ],
  blocks: [
    h2('Backup vs. disaster recovery'),
    p(
      'A **backup** is a copy of data stored somewhere else so it can be restored if the original is lost or damaged. **Disaster recovery (DR)** is the broader plan and set of procedures for restoring systems, applications and operations after something serious goes wrong: hardware failure, human error, cyberattack, fire, flood or provider outage. You can have backups without a recovery plan, and many businesses do, but then recovery becomes improvisation under stress. The goal is to restore the business, not merely to possess files.',
    ),
    table(
      'Common causes of data loss',
      ['Cause', 'Example', 'What helps'],
      [
        ['Human error', 'Deleting a database table or overwriting a file', 'Versioned backups, restricted permissions'],
        ['Hardware or service failure', 'Disk failure, hosting provider outage', 'Offsite copies, redundancy'],
        ['Cyberattack', 'Ransomware encrypting files and backups', 'Immutable and offline backups, security hygiene'],
        ['Software bugs and bad updates', 'A release corrupting data', 'Point-in-time recovery, staging tests'],
        ['Account loss or lock-out', 'Cloud account suspended or credentials lost', 'Independent copies and documented access'],
        ['Physical disaster', 'Fire, theft or flood at the office', 'Offsite or cloud backups'],
      ],
    ),

    h2('What to back up'),
    p(
      'Make an inventory. Ask: if this vanished tomorrow, what would we lose, and how hard would it be to recreate? Typical items include:',
    ),
    checklist(
      'Backup inventory',
      [
        'Customer, order and financial data in databases and accounting systems',
        'Website files, content and databases, including uploaded media',
        'Business documents and shared drives',
        'Email and calendars, including cloud-hosted mailboxes (providers do not always guarantee recovery)',
        'Source code and configuration, including infrastructure definitions',
        'Software-as-a-service data such as CRM, project tools and e-commerce platforms, which often need separate backup arrangements',
        'Staff laptops and phones holding unique data',
        'Encryption keys, passwords and recovery codes, stored securely',
      ],
    ),
    callout(
      'note',
      'Cloud services are not automatically backed up for you',
      'Many software providers protect their own infrastructure, but you may be responsible for protecting your data from deletion, corruption and account compromise. Read the terms and consider independent backups for critical SaaS data.',
    ),

    h2('The 3-2-1 rule'),
    p(
      'A simple, long-standing guideline is the **3-2-1 rule**: keep at least **three** copies of your data (the original plus two backups), on **two** different types of storage, with **one** copy stored offsite. Many security teams now extend this to **3-2-1-1-0**: add one copy that is offline or immutable, and zero errors verified by testing. The idea is to avoid a single point of failure: if one copy is lost, corrupted or encrypted, another survives.',
    ),
    steps(
      'Applying 3-2-1 in practice',
      [
        { title: 'Primary data', text: 'Your live systems and databases.' },
        { title: 'Local or fast backup', text: 'A second copy, such as a snapshot or backup server, for quick restores.' },
        { title: 'Offsite backup', text: 'A copy in a separate location or cloud account, protected from the same failure.' },
        { title: 'Offline or immutable copy', text: 'A version that cannot be altered or deleted, even by an attacker with admin access.' },
        { title: 'Verified', text: 'Regular test restores confirm everything works.' },
      ],
    ),

    h2('RPO and RTO: how much can you afford to lose?'),
    p(
      'Two numbers shape your whole plan. **Recovery point objective (RPO)** is how much data you can afford to lose, measured in time. If your RPO is four hours, you need backups at least every four hours. **Recovery time objective (RTO)** is how long you can afford to be down. If your RTO is two hours, you need a recovery method that can bring services back in that window. Different systems have different needs: an online shop’s order database may need minute-level protection and rapid recovery, while an archive of old marketing files can wait a day.',
    ),
    table(
      'Example targets by system',
      ['System', 'Importance', 'Example RPO', 'Example RTO'],
      [
        ['Order and payment database', 'Critical', 'Minutes', 'An hour or two'],
        ['Customer portal or web app', 'High', 'Hours', 'A few hours'],
        ['Company website and blog', 'Medium', 'A day', 'Same day'],
        ['Internal documents', 'Medium', 'A day', '1 to 2 days'],
        ['Archives', 'Low', 'A week', 'Several days'],
      ],
      'Illustrative targets only. Set your own based on business impact.',
    ),
    p(
      'Ask the practical question: what does an hour of downtime or a lost day of data cost us? The answer tells you how much to invest in faster, more frequent protection.',
    ),

    h2('Protecting backups from ransomware'),
    p(
      'Modern ransomware attackers deliberately seek out and destroy backups before encrypting your data, because backups remove their leverage. A backup connected to your network with the same admin credentials is a target. Defences include:',
    ),
    ul(
      '**Immutable storage:** backups that cannot be modified or deleted for a set period, even by administrators.',
      '**Offline or air-gapped copies:** disconnected media or separate accounts that attackers cannot reach.',
      '**Separate credentials:** backup systems should not share logins with your main environment, and should require multi-factor authentication.',
      '**Least privilege:** only a few trusted people and processes can change or delete backups.',
      '**Monitoring and alerts:** unusual deletion or encryption activity should trigger alarms.',
      '**Patching and good security hygiene:** reducing the chance of intrusion in the first place; see the practices in [AI privacy and security](/blog/ai-privacy-and-security-for-small-business).',
    ),

    h2('Test your restores'),
    callout(
      'warn',
      'An untested backup is a hope, not a plan',
      'Backups fail silently: jobs stop running, files are incomplete, credentials expire or the restore process turns out to be slower or more complicated than imagined. The only way to know is to restore.',
    ),
    checklist(
      'A restore-testing routine',
      [
        'Schedule restore tests at least quarterly for critical systems, and after major changes',
        'Restore into a separate environment and verify data integrity and application function',
        'Time the restore and compare with your RTO',
        'Document the exact steps, including where credentials and keys are kept',
        'Fix any problems discovered and retest',
        'Record the date and result of each test',
      ],
    ),

    h2('Build a simple disaster recovery plan'),
    p(
      'Your plan does not need to be a hundred-page document. For a small business, a clear, concise guide that people can follow under pressure is far more valuable.',
    ),
    steps(
      'What the plan should cover',
      [
        { title: 'Contacts and roles', text: 'Who declares an incident, who restores systems and who talks to customers?' },
        { title: 'System inventory', text: 'What exists, where it runs and how important it is.' },
        { title: 'Backup details', text: 'What is backed up, how often, where it is stored and how to access it.' },
        { title: 'Recovery steps', text: 'Ordered instructions for restoring each critical system.' },
        { title: 'Communication', text: 'How you will inform staff, customers and, if required, regulators.' },
        { title: 'Review and rehearse', text: 'Practise with a tabletop exercise and update after each test or change.' },
      ],
    ),
    p(
      'Keep a copy of the plan somewhere you can reach even if your main systems are down, such as printed or on an independent service. Personal data breaches may carry notification duties under laws like GDPR, so include a legal and communications checklist.',
    ),

    h2('Special considerations for websites and apps'),
    ul(
      '**Databases need consistent backups:** use database-aware tools or snapshots, and consider point-in-time recovery for busy systems.',
      '**Backup uploads and configuration,** not just code.',
      '**Keep code and infrastructure in version control,** and automate deployment so rebuilding is quick; see [DevOps for small teams](/blog/devops-and-ci-cd-for-small-teams).',
      '**Understand your host’s backup offering** and its limits, then supplement it where needed; see [cloud hosting costs](/blog/cloud-hosting-costs-for-small-business).',
      '**Include backups in your maintenance routine,** as described in [website maintenance plans](/blog/website-maintenance-plans-and-costs).',
    ),
    compare(
      'Backup storage options',
      {
        title: 'Cloud backup',
        points: [
          'Offsite by default and easy to automate',
          'Scales as data grows',
          'Ongoing subscription and bandwidth considerations',
          'Needs strong access control',
        ],
      },
      {
        title: 'Local or physical backup',
        points: [
          'Fast restores for large data',
          'One-off hardware cost and full control',
          'Vulnerable to the same disaster as the originals unless stored offsite',
          'Requires manual management',
        ],
      },
    ),

    h2('Common mistakes'),
    ul(
      '**No offsite or offline copy,** so one incident destroys everything.',
      '**Never testing restores.**',
      '**Backups reachable with the same admin accounts** attackers will compromise.',
      '**Backing up only files,** not databases, configurations and keys.',
      '**Assuming your cloud or SaaS provider handles it** without checking.',
      '**No written plan,** leading to confusion during an incident.',
      '**Keeping backups forever without retention policy,** which creates cost and privacy risk.',
    ),
    cta(
      'Want to know whether you could actually recover from a failure or attack? We review your systems, set up automated, protected backups and test the recovery process with you.',
      '/contact',
      'Review your backup plan',
    ),
  ],
  faqs: [
    {
      question: 'What is the 3-2-1 backup rule?',
      answer:
        'Keep three copies of your data on two different types of storage, with one copy offsite. Many teams add an offline or immutable copy and regular restore testing to protect against ransomware and failures.',
    },
    {
      question: 'How often should I back up?',
      answer:
        'It depends on how much data you can afford to lose. Critical systems such as order databases may need continuous or minute-level protection, while documents may be fine daily. Set your recovery point objective and back up accordingly.',
    },
    {
      question: 'How do I test restores?',
      answer:
        'Regularly restore data into a separate environment, check that it is complete and the application works, time the process against your recovery goals and document the steps. Repeat after major changes.',
    },
    {
      question: 'What are RTO and RPO?',
      answer:
        'Recovery time objective is how long you can be down; recovery point objective is how much data loss, measured in time, you can accept. Together they determine your backup frequency and recovery method.',
    },
    {
      question: 'Will backups protect me from ransomware?',
      answer:
        'Only if they cannot be altered or deleted by the attacker. Use immutable or offline copies, separate credentials with multi-factor authentication and monitoring, and test that you can restore.',
    },
  ],
}
