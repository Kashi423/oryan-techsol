// Search landing pages: one per kind of system we have really built. Each page is written only
// from the real project it points at (src/data/caseStudies.js): no prices, no results, no
// invented client names. Add a page by adding one object here; the route, sitemap entry and
// prerender pick it up automatically.
//
// Fields: slug, title (h1), seoTitle, description, eyebrow, intro, project (a case-study slug),
// modules [{ title, text }], audience [string], faqs [{ question, answer }].

export const solutions = [
  {
    slug: 'pharmacy-pos-software',
    title: 'Pharmacy POS software, built around how your pharmacy runs',
    seoTitle: 'Pharmacy POS Software Development',
    description:
      'Custom pharmacy point-of-sale software: counter billing, stock and expiry tracking, suppliers and purchasing, and sales and profit reports. Web and desktop. Free consultation.',
    eyebrow: 'Pharmacy POS software',
    intro:
      'Off-the-shelf POS tools rarely fit the way a pharmacy actually works. We build a custom system that covers the counter, the shelves and the back office, in one place.',
    project: 'pharmacy-pos-system',
    modules: [
      { title: 'Billing at the counter', text: 'Fast, simple billing for walk-in customers, so the queue keeps moving.' },
      { title: 'Stock and expiry tracking', text: 'Know what is on the shelf and what is about to expire before it becomes a loss.' },
      { title: 'Suppliers and purchasing', text: 'Keep supplier details and purchasing together with the stock they replenish.' },
      { title: 'Sales and profit reports', text: 'See what sells and what it earns, without exporting to a spreadsheet.' },
    ],
    audience: [
      'Independent pharmacies and small chains replacing paper or spreadsheets',
      'Pharmacies whose current software does not match their workflow',
      'Owners who want web and desktop access to the same data',
    ],
    faqs: [
      {
        question: 'Does it run on the web or on a desktop computer?',
        answer:
          'The pharmacy system we built runs on both web and desktop, so the counter machine and the owner can work from the same system.',
      },
      {
        question: 'Can it be adapted to our pharmacy?',
        answer:
          'Yes. It is custom software, so the modules and workflow are shaped around how your pharmacy operates. We start with a free consultation to understand it.',
      },
      {
        question: 'How do we get started?',
        answer:
          'Book a free consultation. We talk through how your pharmacy runs today, and then outline what a custom system would cover.',
      },
    ],
  },
  {
    slug: 'school-management-software',
    title: 'School management software and parent app, built for your school',
    seoTitle: 'School Management Software Development',
    description:
      'Custom school management and CRM portal: student and parent records, fees, attendance and results, staff salaries, biometric staff attendance and a homework mobile app. Free consultation.',
    eyebrow: 'School management software',
    intro:
      'Running a school means students, families, fees, staff and communication all at once. We build one portal that keeps them together, with a mobile app for parents.',
    project: 'school-crm-portal',
    modules: [
      { title: 'Student and parent records', text: 'One record per student and family, instead of scattered files.' },
      { title: 'Fee collection and invoices', text: 'Issue invoices and track fees without manual registers.' },
      { title: 'Attendance and results', text: 'Daily attendance and exam results in the same system.' },
      { title: 'Admissions and parent messaging', text: 'Handle admissions and reach parents directly.' },
      { title: 'Staff salaries and inventory', text: 'Payroll and school inventory alongside everything else.' },
      { title: 'Biometric staff attendance', text: 'Staff attendance captured through biometric devices.' },
      { title: 'Homework mobile app', text: 'Parents see homework on their phone.' },
      { title: 'Absence and other alerts', text: 'Notifications for absences and other events, sent automatically.' },
    ],
    audience: [
      'Private schools and academies moving off paper and spreadsheets',
      'Schools that want parents informed through a mobile app',
      'Administrators who want fees, attendance and staff in one place',
    ],
    faqs: [
      {
        question: 'Is there a mobile app for parents?',
        answer:
          'Yes. The school portal we built includes a mobile app for homework, along with notifications such as absence alerts.',
      },
      {
        question: 'Can it handle staff attendance and salaries?',
        answer: 'Yes. Staff salaries, inventory and biometric staff attendance are part of the portal we built.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. We learn how your school runs and outline which modules fit.',
      },
    ],
  },
  {
    slug: 'clinic-management-software',
    title: 'Clinic management software with an AI receptionist',
    seoTitle: 'Clinic Management Software Development',
    description:
      'Custom clinic portal: appointment scheduling, patient records and history, prescriptions and billing, reminders and reports, with an AI receptionist to handle appointments. Free consultation.',
    eyebrow: 'Clinic management software',
    intro:
      'Clinics lose time to phone calls, paper records and missed appointments. We build a portal for booking and records, and an AI receptionist that handles appointments for you.',
    project: 'clinic-appointment-records-portal',
    modules: [
      { title: 'Appointment scheduling', text: 'Book and manage appointments in one calendar.' },
      { title: 'Patient records and history', text: 'Each patient’s history in one place, ready when they arrive.' },
      { title: 'Prescriptions and billing', text: 'Prescriptions and billing handled together with the visit.' },
      { title: 'Reminders and reports', text: 'Appointment reminders and clinic reports without manual work.' },
      { title: 'AI receptionist', text: 'An AI receptionist to handle appointments.' },
    ],
    audience: [
      'Dental, medical and specialist clinics booking by phone or paper',
      'Clinics that want appointment reminders and fewer no-shows to chase',
      'Practices that want a simple, custom system rather than a generic suite',
    ],
    faqs: [
      {
        question: 'What does the AI receptionist do?',
        answer: 'It handles appointments, so patients can be booked without someone answering every call or message.',
      },
      {
        question: 'Can it replace our paper records?',
        answer: 'The portal keeps patient records and history, prescriptions and billing digitally in one place.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. We talk through how your clinic works and outline what to build first.',
      },
    ],
  },
  {
    slug: 'hotel-booking-website',
    title: 'Hotel and travel booking websites that feel premium',
    seoTitle: 'Hotel Booking Website Development',
    description:
      'Booking websites for hotels and travel brands: search by destination, dates, guests and rooms, curated member lists, destination pages and VIP membership accounts. Free consultation.',
    eyebrow: 'Hotel booking website',
    intro:
      'A booking brand lives or dies by how easy it is to search and book. We build premium booking experiences with membership perks for returning guests.',
    project: 'skylark',
    modules: [
      { title: 'Search by destination, dates, guests and rooms', text: 'A clear search that gets visitors to the right stays quickly.' },
      { title: 'Curated member list', text: 'A hand-picked list of hotels with member benefits.' },
      { title: 'Destination pages', text: 'Pages that inspire and help visitors plan a trip.' },
      { title: 'Membership accounts', text: 'VIP perks tied to member accounts.' },
    ],
    audience: [
      'Hotels and boutique stays that want direct bookings',
      'Travel brands building a members-only experience',
      'Businesses that need a premium booking website, not a template',
    ],
    faqs: [
      {
        question: 'Can you build booking with member perks?',
        answer:
          'Yes. Skylark, a luxury hotel booking platform we built, includes a curated Members’ List and membership accounts for VIP perks.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. We talk through your guests and bookings, and outline what to build.',
      },
    ],
  },
]

export const getSolution = (slug) => solutions.find((s) => s.slug === slug)
