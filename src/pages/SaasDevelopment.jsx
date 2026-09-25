import { ArrowRight, BarChart3, CreditCard, LayoutGrid, Rocket, ShieldCheck, Users } from 'lucide-react'
import Seo from '@/components/seo/Seo'
import ServiceSchema from '@/components/seo/ServiceSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import { Accordion, Badge, Button, FeatureCard, Reveal, Section, SectionHeading } from '@/components/ui'
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

function HeroSection() {
  return (
    <Section tone="inverse" spacing="hero" background={<HeroBackground />} aria-labelledby="hero-title">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Badge className="mx-auto">
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
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            We design and build SaaS products and web applications — accounts, billing,
            dashboards and the architecture to support real users, not just a demo.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.05}>
              <FeatureCard icon={item.icon} title={item.title} description={item.description} />
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
