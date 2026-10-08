import { callout, checklist, cta, h2, h3, p, steps, table, timeline, ul } from './helpers.js'

export default {
  slug: 'how-long-does-it-take-to-build-a-website',
  title: 'How Long Does It Take to Build a Website? A Realistic Timeline',
  shortTitle: 'How long a website takes to build',
  description:
    'How long does it take to build a website? Realistic timelines for brochure sites, shops and web apps, what slows projects down and how to launch faster.',
  date: '2026-11-22',
  updated: '2026-11-22',
  category: 'Web Development',
  keywords:
    'how long does it take to build a website, website development timeline, website project phases, how long to build a 5 page website, ecommerce website timeline, speed up website project, website launch checklist',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['how-much-does-a-business-website-cost', 'wordpress-vs-custom-website', 'website-redesign-seo-checklist', 'how-to-write-an-app-requirements-document'],
  intro:
    'It is the second question every client asks after “how much?”, and the answer is rarely a single number. A simple five-page brochure site can be live in a few weeks. A custom online shop or web application can take several months. The calendar is driven less by how fast developers type than by decisions, content, feedback rounds and integrations, and the most common reason projects run late is waiting for the things only the client can provide. This guide gives realistic timelines by project type, explains each phase and what takes the time, shows what typically causes delays, and gives you concrete ways to launch sooner without cutting corners.',
  takeaways: [
    'A simple brochure site typically takes about four to eight weeks; larger or custom builds take months.',
    'Content, approvals and integrations cause more delay than design and coding.',
    'Phases overlap: content can be written while design is underway, which shortens the timeline.',
    'Clear scope, one decision-maker and fast feedback are the strongest levers for launching sooner.',
    'Launching a focused first version and improving it later is quicker and lower risk than waiting for perfection.',
  ],
  blocks: [
    h2('Typical timelines by project type'),
    p(
      'These ranges describe elapsed calendar time from a signed brief to launch, assuming a competent team and reasonably responsive client. They are guides, not promises, and real projects vary with scope, complexity and how quickly decisions are made.',
    ),
    table(
      'Website timeline estimates',
      ['Project type', 'Typical duration', 'What drives the time'],
      [
        ['Landing page', '1 to 2 weeks', 'Copy, one design, forms and tracking'],
        ['Small brochure site (5 to 10 pages)', '4 to 8 weeks', 'Content, design rounds, SEO setup'],
        ['Larger business site (15 to 40 pages)', '8 to 14 weeks', 'Content volume, templates, migration'],
        ['Online store (small catalogue)', '8 to 16 weeks', 'Product data, payments, shipping, testing'],
        ['Custom e-commerce or marketplace', '4 to 8 months', 'Custom features, integrations, security'],
        ['Web application or portal', '3 to 9 months', 'Requirements, workflows, integrations, testing'],
        ['Redesign with migration', '8 to 16 weeks', 'Redirects, content audit, SEO protection'],
      ],
      'Indicative ranges. Actual timelines depend on scope, team size, decision speed and complexity.',
    ),
    callout(
      'note',
      'Faster is possible, but it costs something',
      'Teams can compress timelines with templates, parallel work and more people. What you trade is flexibility, polish or budget. The best way to go quicker is to reduce scope and decision delays, not to rush quality.',
    ),

    h2('The phases of a website project'),
    timeline(
      'From brief to launch',
      [
        { label: 'Week 1', title: 'Discovery and planning', text: 'Goals, audience, sitemap, features and a written scope.' },
        { label: 'Weeks 1 to 3', title: 'Design', text: 'Wireframes, visual design, feedback and approval.' },
        { label: 'Weeks 2 to 6', title: 'Content', text: 'Copy, images, product data; often the slowest part.' },
        { label: 'Weeks 3 to 8', title: 'Development', text: 'Building templates, features and integrations.' },
        { label: 'Weeks 7 to 9', title: 'Testing and fixes', text: 'Devices, browsers, speed, accessibility and forms.' },
        { label: 'Week 9 onward', title: 'Launch and aftercare', text: 'Go live, redirects, analytics, monitoring.' },
      ],
      'Illustrative timeline for a mid-sized brochure site. Phases overlap.',
    ),
    h3('Discovery and planning'),
    p(
      'This stage defines what you are building and why. It includes goals, target audience, competitor review, sitemap and page list, required features and integrations, and a written scope. It is short, often a week or two, but it prevents the most expensive delays: changing direction after design and development have started. A clear written brief, like the one described in [how to write an app requirements document](/blog/how-to-write-an-app-requirements-document), saves weeks later.',
    ),
    h3('Design'),
    p(
      'Designers produce layouts for key pages, usually in one or two rounds of feedback. Delays come from too many opinions, unclear brand guidelines and late changes to the sitemap. Agreeing a single decision-maker for approvals is one of the most effective ways to stay on schedule.',
    ),
    h3('Content'),
    p(
      'Text, photography, product details, testimonials and case studies are where many projects stall, because they require effort from people with other jobs. Content can be written in parallel with design and development if you start early. Use real copy rather than placeholder text, since actual content changes how pages are laid out.',
    ),
    h3('Development'),
    p(
      'Developers turn approved designs into working pages, build functionality, connect services such as forms, payments and analytics, and set up the content management system. Timelines vary widely with complexity: a template-based WordPress site is faster than a custom application with unique workflows and [API integrations](/blog/what-is-api-integration).',
    ),
    h3('Testing, launch and aftercare'),
    p(
      'Before launch, the site is tested on real devices and browsers, checked for speed, accessibility, security and search readiness, and corrected. At launch, redirects, analytics and sitemaps are verified, and the team monitors for problems. If you are replacing an existing site, follow the steps in our [website redesign SEO checklist](/blog/website-redesign-seo-checklist) to protect your rankings.',
    ),

    h2('What causes delays'),
    p(
      'Looking across projects, the same culprits appear again and again, and most are in the client’s hands to prevent.',
    ),
    ul(
      '**Late or missing content:** the single biggest cause of slipped launch dates.',
      '**Slow or conflicting feedback:** multiple reviewers with different opinions, or approvals that take a week each.',
      '**Scope creep:** “can we just add…” mid-build pushes everything back.',
      '**Unclear requirements:** discovering needs during development instead of before.',
      '**Third-party dependencies:** payment accounts, domain access, API credentials and supplier data arriving late.',
      '**Complex integrations:** connecting CRMs, ERPs and legacy systems often reveals surprises.',
      '**Unplanned approvals:** legal review, brand sign-off or board decisions at the end.',
    ),

    h2('How to launch sooner'),
    steps(
      'Practical ways to shorten the timeline',
      [
        { title: 'Narrow the scope', text: 'Launch the essential pages and features first; add the rest in phase two.' },
        { title: 'Prepare content early', text: 'Start writing and collecting images before design is finished.' },
        { title: 'Name one decision-maker', text: 'One person approves, gathering internal feedback in a single round.' },
        { title: 'Set feedback deadlines', text: 'Agree turnaround times, such as two working days per review.' },
        { title: 'Use proven building blocks', text: 'Templates, design systems and standard integrations save weeks.' },
        { title: 'Prepare accounts and access', text: 'Domain, hosting, payment and analytics access ready at kickoff.' },
      ],
    ),
    checklist(
      'Client readiness checklist',
      [
        'A written brief with goals, audience and must-have features',
        'Brand assets: logo, colours, fonts and any style guide',
        'Draft copy for core pages and approved images or a photo plan',
        'Product or service data in a clean spreadsheet, where relevant',
        'Access to domain registrar, hosting and existing analytics',
        'A named approver and a calendar of availability for reviews',
        'Legal pages and policies drafted or ready for review',
      ],
    ),

    h2('Launch fast, then improve'),
    p(
      'A website is never finished. Search engines favour sites that grow and improve, and real visitors teach you more than any planning meeting. Launching a solid, focused first version in six weeks and improving it over the next six months usually beats waiting nine months for a perfect, sprawling site. The same principle underlies the [MVP approach](/blog/mvp-development-guide-for-startups) in software. Keep a prioritised backlog of improvements, review analytics monthly and release changes in small steps.',
    ),
    p(
      'Finally, make sure your timeline includes the quiet tasks that cause trouble when forgotten: setting up analytics and Search Console, 301 redirects from old URLs, a backup routine and a maintenance plan, as described in website maintenance plans and costs. Budget questions are covered in [how much a business website costs](/blog/how-much-does-a-business-website-cost).',
    ),
    h2('What a realistic schedule looks like in practice'),
    p(
      'Consider a typical eight-page business website. In the first week, the team agrees the sitemap, the goals and the structure, while you begin gathering photos and writing copy. Weeks two and three produce the visual design of the home page and two or three key templates, with one round of feedback. While design is approved, content is edited and loaded. Weeks four to six build the templates, forms, tracking and SEO foundations. Week seven is testing across devices, speed checks and corrections, and week eight is launch, redirects and monitoring. Every step has a client task attached, such as supplying content or approving a design, and if those slip by a week, the launch slips by a week.',
    ),
    ul(
      '**Agree milestones in writing:** with dates for deliverables from both sides.',
      '**Build a buffer:** add ten to twenty percent for the unexpected.',
      '**Hold weekly check-ins:** short, with a visible list of what is blocking progress.',
      '**Do not skip testing:** a rushed launch with broken forms or slow pages costs more than a delay.',
    ),
    p(
      'Treat the timeline as a shared plan rather than the agency’s promise alone. When both sides keep their commitments, launching on time is the normal outcome rather than the exception.',
    ),
    cta(
      'Need a website live by a specific date? Tell us your deadline and goals and we will propose a phased plan that gets the essentials launched first.',
      '/contact',
      'Plan your website timeline',
    ),
  ],
  faqs: [
    {
      question: 'How long does a 5-page website take?',
      answer:
        'Usually about three to six weeks, depending on how quickly content is supplied and feedback is given. Simple template-based sites can be faster; sites with custom features take longer.',
    },
    {
      question: 'Why do websites take longer than quoted?',
      answer:
        'The most common reasons are late content, slow or conflicting feedback, scope changes during the build and delays with third-party access such as domains, payment accounts or integrations.',
    },
    {
      question: 'What can I do to speed up my website project?',
      answer:
        'Narrow the scope for launch, prepare content early, name a single decision-maker, agree feedback deadlines, have accounts and assets ready at kickoff and use proven templates or components where possible.',
    },
    {
      question: 'How long does an e-commerce website take to build?',
      answer:
        'A small online store on an existing platform often takes eight to sixteen weeks including product data, payments and testing. Custom e-commerce or marketplaces can take several months.',
    },
    {
      question: 'Can a website be built in a week?',
      answer:
        'A simple landing page or very small site can be launched in a week with ready content and a template. Larger sites need more time for design, content, testing and SEO setup.',
    },
  ],
}
