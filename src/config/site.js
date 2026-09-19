// Single source of truth for site-wide content. Pages, header, footer and SEO
// all read from here — edit once, updates everywhere.

export const siteConfig = {
  name: 'Oryan Techsol',
  // Brand tagline from the logo: "Innovate - Integrate - Elevate."
  pillars: ['Innovate', 'Integrate', 'Elevate'],
  // No trailing slash. Set via VITE_SITE_URL in .env.
  url: (import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173').replace(/\/$/, ''),
  defaultTitle: 'Oryan Techsol | Custom Software, Web & AI Automation',
  description:
    'Oryan Techsol builds custom software, high-performance websites, AI bots and business automation that help growing companies save time and scale.',
}

export const primaryCta = { label: 'Book a consultation', to: '/contact' }

// Proposed information architecture — pages are built in later phases.
export const navItems = [
  { label: 'Services', to: '/services' },
  { label: 'AI & Automation', to: '/ai-automation' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
]

export const footerNav = [
  {
    title: 'Solutions',
    links: [
      { label: 'Custom Software & Web', to: '/services' },
      { label: 'AI Bots & Automation', to: '/ai-automation' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Work', to: '/work' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]
