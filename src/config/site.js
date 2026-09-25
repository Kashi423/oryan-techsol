// Single source of truth for site-wide content. Pages, header, footer and SEO
// all read from here — edit once, updates everywhere.

export const siteConfig = {
  name: 'Oryan Techsol',
  // Brand tagline from the logo: "Innovate - Integrate - Elevate."
  pillars: ['Innovate', 'Integrate', 'Elevate'],
  // No trailing slash. Set via VITE_SITE_URL in .env.
  url: (import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173').replace(/\/$/, ''),
  defaultTitle: 'Oryan Techsol | App, Software, Web & AI Development',
  description:
    'Oryan Techsol builds custom mobile apps, software, websites, AI business bots and automation systems for growing companies — technology built around how your business actually works.',
}

export const primaryCta = { label: 'Book a Free Consultation', to: '/contact' }

export const contactInfo = {
  email: 'hello@oryantechsol.com',
  phone: '+1 (917) 217-0535',
  // Digits-only form for `tel:` hrefs — the formatted `phone` above is what's displayed.
  phoneHref: '+19172170535',
  location: '1938 West 7th Street, Brooklyn, NY',
}

// href "#" and no real profile behind it yet — swap in the real URL once each account
// exists. Rendered dimmed/non-interactive in the footer until then (see Footer.jsx).
export const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'YouTube', href: '#', icon: 'youtube' },
]

// Proposed information architecture — pages are built in later phases. Services nest
// under /services/* so the header's dropdown, the footer and SEO siloing stay in sync
// as more services are added (new entry here + one page, nothing else to touch).
export const navItems = [
  {
    label: 'Services',
    items: [
      {
        label: 'App Development',
        description: 'iOS, Android & cross-platform apps',
        to: '/app-development',
        icon: 'smartphone',
      },
      {
        label: 'AI Bots & Automation',
        description: 'Chat & voice bots, AI agents',
        to: '/ai-bots',
        icon: 'bot',
      },
      {
        label: 'Web Development',
        description: 'Marketing sites, e-commerce, web apps',
        to: '/web-development',
        icon: 'code',
      },
      {
        label: 'Software Solutions',
        description: 'Custom software & internal tools',
        to: '/custom-software',
        icon: 'layers',
      },
      {
        label: 'Automation',
        description: 'Workflow & business process automation',
        to: '/business-automation',
        icon: 'workflow',
      },
      {
        label: 'E-commerce Solutions',
        description: 'Online stores & custom storefronts',
        to: '/ecommerce',
        icon: 'shoppingCart',
      },
      {
        label: 'SaaS & Web Applications',
        description: 'Product builds, from MVP to scale',
        to: '/saas-development',
        icon: 'layoutGrid',
      },
      {
        label: 'API & System Integrations',
        description: 'Connect your CRM, payments & other systems',
        to: '/api-integrations',
        icon: 'plug',
      },
    ],
  },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// Routes whose hero sits on a dark/inverse section, so the header can start transparent
// and overlay it, then solidify on scroll. Add a path here when a new page's hero uses
// <Section tone="inverse">; every other route keeps the always-solid header.
export const transparentHeaderRoutes = [
  '/',
  '/app-development',
  '/ai-bots',
  '/web-development',
  '/custom-software',
  '/business-automation',
  '/ecommerce',
  '/saas-development',
  '/api-integrations',
  '/about',
  '/faq',
  '/contact',
]

export const footerNav = [
  {
    title: 'Services',
    links: [
      { label: 'App Development', to: '/app-development' },
      { label: 'AI Bots & Automation', to: '/ai-bots' },
      { label: 'Custom Web Development', to: '/web-development' },
      { label: 'Custom Software', to: '/custom-software' },
      { label: 'Business Automation', to: '/business-automation' },
      { label: 'E-commerce Solutions', to: '/ecommerce' },
      { label: 'API Integrations', to: '/api-integrations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
  },
]
