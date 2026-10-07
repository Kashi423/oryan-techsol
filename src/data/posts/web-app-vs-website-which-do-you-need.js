import { callout, checklist, compare, cta, h2, p, table, ul } from './helpers.js'

export default {
  slug: 'web-app-vs-website-which-do-you-need',
  title: 'Web App vs. Website: What’s the Difference and Which Do You Need?',
  shortTitle: 'Web app vs. website',
  description:
    'Web app or website? Learn the differences in purpose, features, cost and complexity, with examples and a simple checklist to decide which your business needs.',
  date: '2026-10-26',
  updated: '2026-10-26',
  category: 'Web Development',
  keywords:
    'web app vs website, difference between website and web application, do I need a web app, web application development, custom web application cost, website or web portal',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['how-much-does-a-business-website-cost', 'custom-software-vs-off-the-shelf', 'what-is-api-integration'],
  intro:
    'People use “website” and “web app” interchangeably, but they are different things with very different costs and timelines. A website mainly tells people about you; a web app lets people *do* something — log in, manage data, place orders, collaborate. Deciding which you need before you brief a developer avoids two expensive mistakes: paying for application-level engineering when a good website would do, or launching a brochure site when your customers really need a tool. This guide explains the difference with examples and gives you a quick way to decide.',
  takeaways: [
    'A website presents information; a web application provides interactive functionality, usually behind a login.',
    'Many projects need both: a marketing website plus an app or portal for customers or staff.',
    'Web apps cost more because they involve accounts, data, business logic, security and testing.',
    'Start by listing what users must be able to do, not what pages you want.',
    'You can often launch a website first and add application features in phases.',
  ],
  blocks: [
    h2('The core difference'),
    p(
      'A **website** is primarily content: pages visitors read, watch or contact you from. A **web application** is software delivered through a browser: users sign in, create and change data, and the system responds with logic specific to them — their orders, their dashboard, their documents. The line blurs (a store has both), but the question to ask is simple: *is the visitor consuming information, or operating a system?*',
    ),
    table(
      'Website vs. web application',
      ['', 'Website', 'Web application'],
      [
        ['Main purpose', 'Inform, persuade, generate enquiries', 'Let users perform tasks and manage data'],
        ['Typical features', 'Pages, blog, contact form, galleries', 'Accounts, dashboards, workflows, payments, reports'],
        ['Users', 'Anyone, usually anonymous', 'Registered users with roles and permissions'],
        ['Data', 'Mostly static content', 'Dynamic, user-specific, stored securely'],
        ['Examples', 'Company site, portfolio, blog', 'Booking system, customer portal, CRM, online banking'],
        ['Cost and timeline', 'Lower and shorter', 'Higher and longer'],
      ],
    ),

    h2('Examples that make it concrete'),
    ul(
      '**Website:** a law firm’s site describing services, with a contact form.',
      '**Web app:** the same firm’s client portal, where clients log in to upload documents, track their case and pay invoices.',
      '**Website:** a restaurant’s menu and opening hours.',
      '**Web app:** an ordering system with a kitchen dashboard and real-time order status.',
      '**Both:** an online store — a marketing website on the front and an application behind it for inventory, orders and customer accounts.',
    ),
    callout(
      'note',
      'Where the cost comes from',
      'Web apps are costlier because of what sits behind the screens: authentication, databases, business rules, permissions, integrations with other systems and much more testing. See our [business website cost guide](/blog/how-much-does-a-business-website-cost) for ranges, and [what API integration is](/blog/what-is-api-integration) for the connective work.',
    ),

    h2('Which do you need? A quick checklist'),
    checklist(
      'You probably need a web application if you answer “yes” to several of these',
      [
        'Users need to log in and see their own information',
        'People create, edit or manage data (bookings, orders, documents)',
        'Different roles need different permissions (customer, staff, admin)',
        'The system must apply business rules (pricing, approvals, workflows)',
        'It needs to connect to payment, CRM, accounting or other systems',
        'You are replacing spreadsheets or manual processes',
      ],
    ),
    compare(
      'A decision lens',
      {
        title: 'A website is probably enough if…',
        points: [
          'The goal is credibility and enquiries',
          'Content changes occasionally, not per user',
          'No one needs to log in',
          'A contact or booking form meets your needs',
        ],
      },
      {
        title: 'Plan a web app if…',
        points: [
          'Customers or staff need a tool, not just information',
          'Process efficiency or self-service is the goal',
          'Data must be stored and processed per user',
          'You would otherwise be copying data between systems by hand',
        ],
      },
    ),

    h2('Do not forget the hybrid'),
    p(
      'Most growing businesses end up with both: a fast, SEO-friendly marketing website that brings people in, and an application — a client portal, booking engine or internal tool — that serves them once they are customers. Plan them together so branding, accounts and data feel consistent. If you are weighing whether to build such tools or buy them, our guide to [custom software vs. off-the-shelf](/blog/custom-software-vs-off-the-shelf) applies directly.',
    ),

    h2('How to scope it sensibly'),
    ul(
      '**List what users must be able to do** (verbs, not pages): register, book, pay, download, approve.',
      '**Start with the smallest valuable version** and add features in phases.',
      '**Separate the marketing site from the app** so each can evolve and be maintained appropriately.',
      '**Budget for ongoing care:** apps need security updates, monitoring and improvements.',
    ),
    cta(
      'Not sure whether you need a website, a web app or both? Tell us what you want users to be able to do and we will recommend the leanest approach.',
      '/contact',
      'Get scoping advice',
    ),
  ],
  faqs: [
    {
      question: 'What is the difference between a website and a web app?',
      answer:
        'A website mainly presents information, while a web application lets users perform tasks and manage data through a browser, typically with accounts, dashboards and business logic.',
    },
    {
      question: 'Do I need a web app or a website?',
      answer:
        'If visitors just need information and a way to contact you, a website is enough. If users must log in, manage data, pay or follow workflows, you need a web application — often alongside a marketing site.',
    },
    {
      question: 'Is a web app more expensive than a website?',
      answer:
        'Generally yes, because accounts, data, security, business rules and integrations require substantially more engineering and testing.',
    },
    {
      question: 'Can I start with a website and add a web app later?',
      answer:
        'Yes. Many businesses launch a marketing site first and add application features in phases, provided the original build allows for growth.',
    },
    {
      question: 'Is an online store a website or a web app?',
      answer:
        'Both: a marketing and catalogue front end plus application functionality for carts, accounts, orders and inventory.',
    },
  ],
}
