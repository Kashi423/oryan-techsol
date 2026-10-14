// Search landing pages: one per kind of system we have really built. Each page is written only
// from the real project it points at (src/data/caseStudies.js): no prices, no results, no
// invented client names. Add a page by adding one object here; the route, sitemap entry and
// prerender pick it up automatically.
//
// Fields: slug, title (h1), seoTitle, description, eyebrow, intro, project (optional case-study slug),
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
  // The pages below describe services we offer. They have no `project`, so they never claim a
  // past build: only the pages above point to a real case study.
  {
    slug: 'ecommerce-store-development',
    title: 'E-commerce store development for businesses that sell online',
    seoTitle: 'E-commerce Store Development',
    description:
      'Custom online stores and storefronts: product catalogue, cart and checkout, payments, order management and admin. Talk to us for a free consultation.',
    eyebrow: 'E-commerce store development',
    intro:
      'Whether you are moving a shop online or replacing a store that has outgrown its platform, we build the storefront, the checkout and the admin behind it.',
    modules: [
      { title: 'Product catalogue', text: 'Products, categories and search that make it easy to find and choose.' },
      { title: 'Cart and checkout', text: 'A short, clear path from basket to paid order.' },
      { title: 'Payments', text: 'Payment options set up for the markets you sell in.' },
      { title: 'Order management', text: 'See and process orders without juggling spreadsheets.' },
      { title: 'Admin panel', text: 'Update products, prices and content yourself.' },
      { title: 'Custom storefront', text: 'A design that matches your brand rather than a stock template.' },
    ],
    audience: [
      'Shops and brands launching their first online store',
      'Businesses outgrowing a template store',
      'Owners who want to manage products and orders themselves',
    ],
    faqs: [
      {
        question: 'Can you build a store from scratch or work on an existing one?',
        answer: 'Both. We can build a custom storefront, or improve an existing store. The first step is a free consultation to understand what you sell and how.',
      },
      {
        question: 'Can I manage products and orders myself?',
        answer: 'Yes. The store comes with an admin where you manage products, prices, content and orders.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. Tell us what you sell, and we outline what a store would involve.',
      },
    ],
  },
  {
    slug: 'ai-chatbot-for-business',
    title: 'AI chatbots that answer customers and capture leads',
    seoTitle: 'AI Chatbot Development for Business',
    description:
      'AI chatbots for your website and messaging: answer common questions, capture leads and hand over to your team. Free consultation.',
    eyebrow: 'AI chatbot development',
    intro:
      'Customers ask the same questions all day, often when nobody is there to answer. We build chatbots that answer them and pass real enquiries to your team.',
    modules: [
      { title: 'Answers common questions', text: 'Trained on your own information, so replies match how you work.' },
      { title: 'Lead capture', text: 'Collects names and contact details and sends them to you.' },
      { title: 'Hand-over to your team', text: 'Passes conversations to a person when a human is needed.' },
      { title: 'Website and messaging', text: 'On your site, and on the channels your customers already use.' },
      { title: 'Appointment handling', text: 'Can handle appointments, as in the AI receptionist we built for a clinic.' },
    ],
    audience: [
      'Businesses that lose enquiries outside office hours',
      'Teams answering the same questions repeatedly',
      'Clinics, shops and service businesses that take bookings',
    ],
    faqs: [
      {
        question: 'Will the chatbot say things that are not true about my business?',
        answer: 'We set it up around your own information and agree what it should and should not answer, so it stays within what you want it to say.',
      },
      {
        question: 'Can it book appointments?',
        answer: 'Yes. We have built an AI receptionist that handles appointments for a clinic portal.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. We look at the questions your customers ask and outline how a chatbot would handle them.',
      },
    ],
  },
  {
    slug: 'business-automation-services',
    title: 'Business automation that removes repeat work',
    seoTitle: 'Business Automation Services',
    description:
      'Automate repetitive work: enquiries, follow-ups, reporting, data entry and system-to-system tasks. Free consultation to find what is worth automating.',
    eyebrow: 'Business automation',
    intro:
      'Most businesses have tasks that people repeat every day. We find the ones worth automating and build the workflow around your existing tools.',
    modules: [
      { title: 'Enquiry and lead handling', text: 'New enquiries logged and routed without manual copying.' },
      { title: 'Follow-ups and reminders', text: 'Messages sent at the right time, automatically.' },
      { title: 'Reporting', text: 'Regular reports assembled for you.' },
      { title: 'System-to-system tasks', text: 'Connect the tools you already use so data moves by itself.' },
      { title: 'Alerts and notifications', text: 'The right person told when something needs attention.' },
    ],
    audience: [
      'Teams copying data between spreadsheets and systems',
      'Owners who want follow-ups to happen without chasing',
      'Businesses ready to save staff time on repeat tasks',
    ],
    faqs: [
      {
        question: 'How do we know what to automate?',
        answer: 'In the free consultation we walk through your week and pick the repetitive tasks that are worth automating first.',
      },
      {
        question: 'Do we have to replace our current tools?',
        answer: 'Not necessarily. We usually connect the tools you already use.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation and describe the task you repeat most.',
      },
    ],
  },
  {
    slug: 'mobile-app-development-for-business',
    title: 'Mobile app development for businesses',
    seoTitle: 'Mobile App Development for Business',
    description:
      'iOS, Android and cross-platform apps for businesses: customer apps, staff apps and companion apps for your existing systems. Free consultation.',
    eyebrow: 'Mobile app development',
    intro:
      'A mobile app can put your service in your customers’ pockets, or give your staff the tools they need in the field. We design, build and release it.',
    modules: [
      { title: 'iOS, Android or both', text: 'Native or cross-platform, chosen to fit your goals.' },
      { title: 'Companion to your system', text: 'An app that works with your website or back office, as the parent homework app does for the school portal we built.' },
      { title: 'Notifications', text: 'Alerts to your users when something matters.' },
      { title: 'Accounts and sign-in', text: 'Users with their own accounts and the right access.' },
      { title: 'Release and support', text: 'Help publishing to the app stores and keeping the app running.' },
    ],
    audience: [
      'Businesses whose customers would use an app',
      'Teams that need a mobile tool for staff',
      'Companies adding a mobile app to an existing platform',
    ],
    faqs: [
      {
        question: 'Do I need both iOS and Android?',
        answer: 'Not always. In the free consultation we talk about your users and recommend where to start.',
      },
      {
        question: 'Can the app connect to our existing system?',
        answer: 'Yes. We build apps that work with an existing website or back office.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation and describe what the app should do.',
      },
    ],
  },
  {
    slug: 'appointment-booking-system',
    title: 'Appointment booking systems for clinics and service businesses',
    seoTitle: 'Appointment Booking System Development',
    description:
      'Custom appointment booking: scheduling, reminders, customer records and an optional AI receptionist. Free consultation.',
    eyebrow: 'Appointment booking system',
    intro:
      'If people book by phone and message, appointments get missed. We build a booking system with reminders and records, and can add an AI receptionist.',
    project: 'clinic-appointment-records-portal',
    modules: [
      { title: 'Scheduling', text: 'One calendar for appointments, in place of notebooks and messages.' },
      { title: 'Reminders', text: 'Appointment reminders sent automatically.' },
      { title: 'Customer records', text: 'History for each customer or patient in one place.' },
      { title: 'Billing', text: 'Billing handled with the appointment.' },
      { title: 'AI receptionist', text: 'An AI receptionist to handle appointments.' },
    ],
    audience: [
      'Clinics, dental practices and specialists',
      'Service businesses that take bookings by phone',
      'Teams that want fewer missed or double-booked appointments',
    ],
    faqs: [
      {
        question: 'Is this only for clinics?',
        answer: 'The system we built is for a clinic. The same approach suits any business that books appointments, and we adapt it to yours.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. We talk through how you take bookings today.',
      },
    ],
  },
  {
    slug: 'restaurant-ordering-website',
    title: 'Restaurant websites with online ordering and reservations',
    seoTitle: 'Restaurant Website and Online Ordering Development',
    description:
      'Websites for restaurants and cafes: menu, online ordering, table reservations and an admin to update it yourself. Free consultation.',
    eyebrow: 'Restaurant website and ordering',
    intro:
      'Hungry customers decide quickly. We build a restaurant website that shows your menu clearly and lets people order or book a table in a few taps.',
    modules: [
      { title: 'Menu that is easy to update', text: 'Change dishes, prices and availability yourself.' },
      { title: 'Online ordering', text: 'Pickup or delivery orders taken directly on your site.' },
      { title: 'Table reservations', text: 'Guests book a table without phoning.' },
      { title: 'Mobile-first design', text: 'Built for the phone most visitors will use.' },
      { title: 'Order notifications', text: 'Your team is told when a new order arrives.' },
    ],
    audience: [
      'Restaurants and cafes relying on phone calls or delivery apps',
      'Owners who want direct orders on their own site',
      'New venues that need a menu site that looks professional',
    ],
    faqs: [
      {
        question: 'Can I update the menu myself?',
        answer: 'Yes. The site comes with an admin where you edit the menu, prices and content.',
      },
      {
        question: 'Can customers order and book from the same site?',
        answer: 'Yes. Online ordering and table reservations can both be part of it.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. Tell us how you take orders today and we outline the site.',
      },
    ],
  },
  {
    slug: 'salon-spa-booking-website',
    title: 'Salon and spa websites with online booking',
    seoTitle: 'Salon and Spa Booking Website Development',
    description:
      'Websites for salons, spas and barbers: services and staff pages, online appointment booking and reminders. Free consultation.',
    eyebrow: 'Salon and spa booking website',
    intro:
      'Clients book when it suits them, often late in the evening. We build a salon website that shows your services and takes bookings around the clock.',
    modules: [
      { title: 'Services and staff', text: 'Show what you offer and who offers it.' },
      { title: 'Online booking', text: 'Clients pick a service and a time themselves.' },
      { title: 'Reminders', text: 'Appointment reminders sent automatically.' },
      { title: 'Photo gallery', text: 'Show your work with a clean gallery.' },
      { title: 'Easy for your team', text: 'Manage bookings and content without technical help.' },
    ],
    audience: [
      'Salons, barbers and spas booking by phone or messages',
      'Independent stylists and therapists',
      'Owners who want fewer no-shows and less admin',
    ],
    faqs: [
      {
        question: 'Can clients book without calling?',
        answer: 'Yes. Online booking lets them choose a service and time themselves.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. We talk through your services and how you take bookings.',
      },
    ],
  },
  {
    slug: 'real-estate-website-development',
    title: 'Real estate websites and property listing portals',
    seoTitle: 'Real Estate Website Development',
    description:
      'Websites and listing portals for agents and agencies: property listings, search and filters, enquiry forms and an admin. Free consultation.',
    eyebrow: 'Real estate website',
    intro:
      'Buyers and renters search before they call. We build property sites that make listings easy to browse and turn visits into enquiries.',
    modules: [
      { title: 'Property listings', text: 'Listings with photos, details and location.' },
      { title: 'Search and filters', text: 'Visitors narrow down by area, type and budget.' },
      { title: 'Enquiry forms', text: 'Interested visitors reach you straight from a listing.' },
      { title: 'Admin for your team', text: 'Add and update properties without developer help.' },
      { title: 'Agent profiles', text: 'Introduce the people behind the listings.' },
    ],
    audience: [
      'Independent agents and small agencies',
      'Developers marketing new projects',
      'Agencies replacing a generic listing template',
    ],
    faqs: [
      {
        question: 'Can my team add listings themselves?',
        answer: 'Yes. An admin lets your team add and edit listings.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. We learn how you list and sell, and outline the site.',
      },
    ],
  },
  {
    slug: 'retail-pos-and-inventory-software',
    title: 'Point-of-sale and inventory software for shops',
    seoTitle: 'Retail POS and Inventory Software Development',
    description:
      'Custom POS and inventory software for shops: counter billing, stock tracking, suppliers and purchasing, and sales reports. Web and desktop. Free consultation.',
    eyebrow: 'Retail POS and inventory',
    intro:
      'Knowing what you sold, what is left and what it earned should not take a spreadsheet. We build a POS and inventory system shaped around how your shop runs.',
    project: 'pharmacy-pos-system',
    modules: [
      { title: 'Billing at the counter', text: 'Quick billing for walk-in customers.' },
      { title: 'Stock tracking', text: 'See what is on the shelf and what needs reordering.' },
      { title: 'Suppliers and purchasing', text: 'Suppliers and purchases together with stock.' },
      { title: 'Sales and profit reports', text: 'Know what sells and what it earns.' },
    ],
    audience: [
      'Independent shops and small chains',
      'Businesses outgrowing paper registers and spreadsheets',
      'Owners who want web and desktop access',
    ],
    faqs: [
      {
        question: 'Have you built a POS before?',
        answer: 'Yes. We built a custom POS for a pharmacy, covering billing, stock and expiry tracking, suppliers and purchasing, and sales and profit reports. It runs on web and desktop.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation. We talk through how your shop runs and outline the system.',
      },
    ],
  },
  {
    slug: 'saas-mvp-development',
    title: 'SaaS MVP development: from idea to first users',
    seoTitle: 'SaaS MVP Development',
    description:
      'Build the first version of your SaaS product: accounts, core features, admin and a path to grow. Free consultation to shape your MVP.',
    eyebrow: 'SaaS MVP development',
    intro:
      'The goal of an MVP is to learn from real users quickly. We help you decide what the first version needs, and build it so it can grow.',
    modules: [
      { title: 'Scoping the first version', text: 'Agree what the MVP must do, and what can wait.' },
      { title: 'Accounts and access', text: 'Sign-up, sign-in and roles from the start.' },
      { title: 'Core features', text: 'The one workflow your users come for, built well.' },
      { title: 'Admin and data', text: 'A back office to see and manage what is happening.' },
      { title: 'Built to grow', text: 'A foundation you can extend after launch.' },
    ],
    audience: [
      'Founders with a product idea and no technical team',
      'Businesses turning an internal tool into a product',
      'Teams that want to validate before investing more',
    ],
    faqs: [
      {
        question: 'Can you help me decide what to build first?',
        answer: 'Yes. The free consultation is the place to shape the idea and agree what the first version should include.',
      },
      {
        question: 'Will it be able to grow after launch?',
        answer: 'We build with growth in mind, so features can be added after you learn from users.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation and describe the problem your product solves.',
      },
    ],
  },
  {
    slug: 'website-redesign-for-small-business',
    title: 'Website redesign for businesses with an outdated site',
    seoTitle: 'Website Redesign for Small Business',
    description:
      'Redesign an outdated website: a clearer layout, faster pages, mobile-friendly design and a way for visitors to enquire or book. Free consultation.',
    eyebrow: 'Website redesign',
    intro:
      'If your site looks dated, loads slowly or hides how to contact you, visitors leave. We redesign it so it is clear, fast and works on a phone.',
    modules: [
      { title: 'Clear structure', text: 'Visitors can see what you do and how to reach you.' },
      { title: 'Faster pages', text: 'Pages that load quickly on phones and laptops.' },
      { title: 'Mobile-friendly', text: 'A layout that works on every screen size.' },
      { title: 'Enquiry or booking', text: 'A visible way for visitors to contact or book you.' },
      { title: 'Easy updates', text: 'Change text and images without a developer.' },
    ],
    audience: [
      'Local businesses with a site from years ago',
      'Owners whose site does not bring enquiries',
      'Businesses that want a contact form or booking on the site',
    ],
    faqs: [
      {
        question: 'Do you review the current website first?',
        answer: 'Yes. We look at your current site in the free consultation and point out what we would improve.',
      },
      {
        question: 'How do we get started?',
        answer: 'Book a free consultation and share your current website address.',
      },
    ],
  },
]

export const getSolution = (slug) => solutions.find((s) => s.slug === slug)
