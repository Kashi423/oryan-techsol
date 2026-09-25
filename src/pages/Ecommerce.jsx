import { ArrowRight, CreditCard, Package, RefreshCw, Smartphone, ShoppingCart, UserCheck, Workflow } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import Seo from '@/components/seo/Seo'
import { Accordion, Badge, Button, FeatureCard, Reveal, Section, SectionHeading, ServiceCard } from '@/components/ui'
import { primaryCta } from '@/config/site'

// Natural next steps from an online store — a companion app and the automation connecting
// orders/payments to the rest of the business.
const relatedServices = [
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'A mobile app for your store, alongside the web storefront.',
    to: '/app-development',
  },
  {
    icon: Workflow,
    title: 'Business Automation',
    description: 'Connect orders, payments and inventory to the rest of your business automatically.',
    to: '/business-automation',
  },
]

const pageDescription =
  'Custom e-commerce development — online stores, storefronts, payment and order integrations, and automation connecting your store to the rest of your business.'

const capabilities = [
  {
    icon: ShoppingCart,
    title: 'Custom storefronts',
    description: 'A store built around your products and brand, not a rigid theme.',
  },
  {
    icon: Package,
    title: 'Product & inventory management',
    description: 'Catalogue, stock and variants managed from a system built for how you actually sell.',
  },
  {
    icon: CreditCard,
    title: 'Payment integrations',
    description: 'Checkout connected to the payment provider your business already uses.',
  },
  {
    icon: UserCheck,
    title: 'Customer accounts',
    description: 'Order history, saved details and a proper customer experience, not just a checkout form.',
  },
  {
    icon: RefreshCw,
    title: 'Order management',
    description: 'From order placed to fulfilled, tracked in one connected system.',
  },
  {
    icon: Workflow,
    title: 'Automation',
    description: 'Order, payment and inventory events connected to notifications, CRM and fulfillment automatically.',
  },
]

const faqs = [
  {
    question: 'Do you build on an existing platform or fully custom?',
    answer:
      "Whichever fits — a custom-built storefront when the business needs it, or working within an existing platform's ecosystem when that's the better fit. Scoped during discovery, not assumed upfront.",
  },
  {
    question: 'Can the store connect to our existing inventory or business tools?',
    answer:
      'Yes — connecting to your inventory, CRM or fulfillment tools is part of the build, scoped to what your business already uses.',
  },
  {
    question: 'Which payment providers do you support?',
    answer:
      "We integrate the payment provider your business already uses or plans to use — this is confirmed during discovery rather than fixed in advance.",
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes — a store is monitored and improved after launch rather than treated as a one-off build.',
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
            <ShoppingCart className="size-3.5 text-highlight" aria-hidden="true" />
            E-commerce Solutions
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            An online store built to <span className="text-gradient">actually sell</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            We design and build e-commerce systems — storefronts, payments, order management and
            the automation connecting your store to the rest of your business.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={primaryCta.to} size="lg">
              {primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Tell us about your store
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
        title="What a real online store needs."
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

function RelatedServicesSection() {
  return (
    <Section aria-labelledby="related-title">
      <SectionHeading
        as="h2"
        id="related-title"
        eyebrow="Often paired with"
        align="center"
        title="What usually goes alongside a store."
        className="mx-auto"
      />
      <ul className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {relatedServices.map((service, index) => (
          <li key={service.to}>
            <Reveal delay={index * 0.05}>
              <ServiceCard icon={service.icon} title={service.title} description={service.description} to={service.to} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function FinalCtaSection() {
  return (
    <Section tone="inverse" aria-labelledby="final-cta-title">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-title" className="text-2xl sm:text-3xl">
            Ready to build your store?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Tell us what you're selling and how — we'll figure out the right approach together.
          </p>
          <Button to={primaryCta.to} size="lg" className="mt-8">
            {primaryCta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

export default function Ecommerce() {
  return (
    <>
      <Seo title="E-commerce Solutions" description={pageDescription} />
      <ServiceSchema name="E-commerce Solutions" description={pageDescription} path="/ecommerce" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'E-commerce Solutions', path: '/ecommerce' }]} />
      <FaqSchema faqs={faqs} />
      <HeroSection />
      <CapabilitiesSection />
      <FaqSection />
      <RelatedServicesSection />
      <FinalCtaSection />
    </>
  )
}
