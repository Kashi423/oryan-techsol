import { ArrowRight, Database, Plug2, RefreshCw, Lock, Webhook, Zap } from 'lucide-react'
import Seo from '@/components/seo/Seo'
import ServiceSchema from '@/components/seo/ServiceSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import { Accordion, Badge, Button, FeatureCard, Reveal, Section, SectionHeading } from '@/components/ui'
import { primaryCta } from '@/config/site'

const pageDescription =
  'API and system integrations that connect your CRM, payments and other business tools so data moves automatically.'

const capabilities = [
  { icon: Plug2, title: 'Connecting existing systems', description: 'Your CRM, payments, calendar or helpdesk, wired together instead of living apart.' },
  { icon: RefreshCw, title: 'Keeping data in sync', description: 'Records updated in one place instead of re-entered by hand in three.' },
  { icon: Webhook, title: 'Real-time triggers', description: 'An event in one system automatically kicks off the right action in another.' },
  { icon: Database, title: 'Custom API development', description: 'A purpose-built API when your own systems need to talk to something new.' },
  { icon: Zap, title: 'Automated workflows', description: 'The manual handoff between two tools replaced with one connected process.' },
  { icon: Lock, title: 'Secure by default', description: 'Credentials and data handled deliberately, not bolted on after the fact.' },
]

const faqs = [
  {
    question: 'What systems can you integrate with?',
    answer: 'Whatever your business already uses — the specific systems are scoped during discovery, not promised in advance.',
  },
  {
    question: "What if a system doesn't have an API?",
    answer:
      'Some systems still need a workaround rather than a clean API — we assess this during discovery and tell you honestly if something is not feasible.',
  },
  {
    question: 'Is our data safe during an integration?',
    answer: 'Yes — credentials and data are handled deliberately, using the access each connection actually needs and nothing more.',
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes — integrations are monitored after launch rather than left to quietly break when a system changes.',
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
            <Plug2 className="size-3.5 text-highlight" aria-hidden="true" />
            API & System Integrations
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Your systems, <span className="text-gradient">finally connected</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            We connect your CRM, payments and other business tools so data moves
            automatically instead of being copied by hand between them.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={primaryCta.to} size="lg">
              {primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Tell us what needs connecting
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
        title="What a connected stack looks like."
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
            Ready to connect your systems?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Tell us what needs to talk to what — we'll take it from there.
          </p>
          <Button to={primaryCta.to} size="lg" className="mt-8">
            {primaryCta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

export default function ApiIntegrations() {
  return (
    <>
      <Seo title="API & System Integrations" description={pageDescription} />
      <ServiceSchema name="API & System Integrations" description={pageDescription} path="/api-integrations" />
      <BreadcrumbSchema
        items={[{ name: 'Home', path: '/' }, { name: 'API & System Integrations', path: '/api-integrations' }]}
      />
      <FaqSchema faqs={faqs} />
      <HeroSection />
      <CapabilitiesSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
