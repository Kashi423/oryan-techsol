import { ArrowRight, BarChart3, CreditCard, LayoutGrid, Rocket, Settings, ShieldCheck, Users } from 'lucide-react'
import Seo from '@/components/seo/Seo'
import ServiceSchema from '@/components/seo/ServiceSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import { Accordion, Badge, Button, Reveal, Section, SectionHeading, TypeCard } from '@/components/ui'
import { primaryCta } from '@/config/site'

const pageDescription =
  'Full SaaS product builds — from first version to scale — for teams launching their own software product.'

const capabilities = [
  { icon: Rocket, title: 'MVP to first launch', description: 'A focused first version built to test the real product, not every possible feature.' },
  { icon: Users, title: 'Accounts & multi-tenancy', description: 'Sign-up, login and per-customer data handled correctly from day one.' },
  { icon: CreditCard, title: 'Billing & subscriptions', description: 'Plans, upgrades and billing wired up so the product can actually charge for itself.' },
  { icon: LayoutGrid, title: 'Admin & customer dashboards', description: 'The internal view your team needs and the product view your customers use.' },
  { icon: BarChart3, title: 'Usage & product analytics', description: 'Visibility into how the product is actually being used, not just that it launched.' },
  { icon: ShieldCheck, title: 'Built to scale', description: 'An architecture that can grow with real usage instead of being rebuilt at the first spike.' },
]

const faqs = [
  {
    question: 'Do you build the whole product or just parts of it?',
    answer: 'Either — a full build from scratch, or specific parts of an existing product, scoped to what you actually need.',
  },
  {
    question: 'Can you help even if we only have an idea, not a spec?',
    answer:
      "Yes. Discovery is where a rough idea turns into an actual plan — we don't need a finished spec to start the conversation.",
  },
  {
    question: 'Do you use a specific tech stack for every SaaS build?',
    answer: 'No — the stack is chosen per project based on what it actually needs, not a template applied to every client.',
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes — a product is monitored and improved after launch rather than handed off as a one-off build.',
  },
]

function HeroBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0" />
      <div className="bg-glow absolute top-0 left-1/2 h-[36rem] w-[60rem] max-w-none -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}

const heroNavItems = [
  { icon: LayoutGrid, label: 'Overview', active: true },
  { icon: Users, label: 'Customers' },
  { icon: CreditCard, label: 'Billing' },
  { icon: Settings, label: 'Settings' },
]

// Relative bar heights (percent) for the usage chart — illustrative, not a real metric.
const heroUsageBars = [38, 52, 45, 63, 58, 74, 69, 86, 80, 94]

const heroTeam = ['AK', 'MS', 'JR']

// The hero visual: a real-looking SaaS workspace — sidebar navigation, plan badge, a usage
// chart and the team with access — built from tokens (no stock photo), in the same family as
// the browser, phone, chat and dashboard mockups on the other service pages.
function ProductMockup() {
  return (
    <div className="relative mx-auto flex w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card backdrop-blur-xl">
      <aside className="hidden w-32 shrink-0 flex-col gap-1 border-r border-line bg-surface-overlay p-3 sm:flex">
        <div className="mb-3 flex items-center gap-1.5 px-1">
          <span className="flex size-5 items-center justify-center rounded-md bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
            <Rocket className="size-3" aria-hidden="true" />
          </span>
          <span className="font-display text-[11px] font-bold text-fg">Launchpad</span>
        </div>
        {heroNavItems.map(({ icon: Icon, label, active }) => (
          <span
            key={label}
            className={
              active
                ? 'flex items-center gap-2 rounded-md bg-highlight/15 px-2 py-1.5 text-[11px] font-semibold text-highlight'
                : 'flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium text-fg-muted'
            }
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {label}
          </span>
        ))}
      </aside>
      <div className="min-w-0 flex-1 space-y-4 p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-sm font-bold text-fg">Overview</p>
          <span className="rounded-full bg-highlight/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-highlight uppercase">
            Pro plan
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-lg bg-surface-overlay p-3">
            <p className="text-[10px] text-fg-subtle">Active workspaces</p>
            <p className="font-display text-base font-extrabold text-fg">248</p>
          </div>
          <div className="rounded-lg bg-surface-overlay p-3">
            <p className="text-[10px] text-fg-subtle">Uptime</p>
            <p className="font-display text-base font-extrabold text-fg">99.9%</p>
          </div>
        </div>
        <div className="rounded-xl bg-surface-overlay p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-fg">Weekly usage</p>
            <BarChart3 className="size-3.5 text-highlight" aria-hidden="true" />
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5" aria-hidden="true">
            {heroUsageBars.map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-sm bg-linear-to-t from-[var(--gradient-from)] to-[var(--gradient-to)]"
                style={{ height: `${height}%`, opacity: 0.45 + index * 0.055 }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {heroTeam.map((initials) => (
              <span
                key={initials}
                className="flex size-7 items-center justify-center rounded-full border-2 border-surface-raised bg-surface-overlay font-display text-[9px] font-bold text-fg"
              >
                {initials}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-success">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Secure sign-in
          </span>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <Section tone="inverse" spacing="hero" background={<HeroBackground />} aria-labelledby="hero-title">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <Reveal>
            <Badge className="lg:mx-0">
              <LayoutGrid className="size-3.5 text-highlight" aria-hidden="true" />
              SaaS & Web Applications
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              From idea to <span className="text-gradient">a real product</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              We design and build SaaS products and web applications — accounts, billing,
              dashboards and the architecture to support real users, not just a demo.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button to={primaryCta.to} size="lg">
                {primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Tell us about your product
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ProductMockup />
        </Reveal>
      </div>
    </Section>
  )
}

function CapabilitiesSection() {
  return (
    <Section aria-labelledby="capabilities-title">
      <SectionHeading
        as="h2"
        id="capabilities-title"
        eyebrow="What we build"
        align="center"
        title="What a real SaaS product needs."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, index) => (
          <li key={item.title}>
            <Reveal className="h-full" delay={index * 0.05}>
              <TypeCard icon={item.icon} title={item.title} description={item.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function FaqSection() {
  return (
    <Section tone="muted" aria-labelledby="faq-title">
      <SectionHeading as="h2" id="faq-title" eyebrow="FAQ" align="center" title="Common questions." className="mx-auto" />
      <div className="mx-auto mt-12 max-w-2xl">
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  )
}

function FinalCtaSection() {
  return (
    <Section tone="inverse" aria-labelledby="final-cta-title">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-title" className="text-2xl sm:text-3xl">
            Ready to build your product?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Tell us what you're building — we'll figure out the right approach together.
          </p>
          <Button to={primaryCta.to} size="lg" className="mt-8">
            {primaryCta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

export default function SaasDevelopment() {
  return (
    <>
      <Seo title="SaaS & Web Applications" description={pageDescription} />
      <ServiceSchema name="SaaS & Web Applications" description={pageDescription} path="/saas-development" />
      <BreadcrumbSchema
        items={[{ name: 'Home', path: '/' }, { name: 'SaaS & Web Applications', path: '/saas-development' }]}
      />
      <FaqSchema faqs={faqs} />
      <HeroSection />
      <CapabilitiesSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
