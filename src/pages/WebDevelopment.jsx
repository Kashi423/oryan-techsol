import {
  AppWindow,
  ArrowRight,
  Building2,
  Code2,
  Gauge,
  Globe,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  Monitor,
  Plug2,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Tablet,
  Users,
  CheckCircle2,
} from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import Seo from '@/components/seo/Seo'
import {
  Accordion,
  Badge,
  Button,
  CaseStudyCard,
  Card,
  FeatureCard,
  Reveal,
  Section,
  SectionHeading,
} from '@/components/ui'
import { primaryCta } from '@/config/site'
import { caseStudies } from '@/data/caseStudies'

const pageDescription =
  'Custom business websites, web applications and customer portals built around your requirements — not a page-builder template.'

const buildTypes = [
  { icon: Globe, title: 'Business websites', description: 'Marketing sites built around how you actually sell and operate.' },
  { icon: Building2, title: 'Corporate websites', description: 'Larger, multi-section sites for established, multi-department businesses.' },
  { icon: LayoutGrid, title: 'SaaS websites', description: 'Marketing and product sites for software companies, built to convert.' },
  { icon: AppWindow, title: 'Web applications', description: 'Interactive tools your customers or team use, not just read.' },
  { icon: ShoppingCart, title: 'E-commerce websites', description: 'Online stores built around your catalogue and checkout flow.' },
  { icon: Users, title: 'Customer portals', description: 'Logged-in spaces where customers manage their account or orders.' },
  { icon: LayoutDashboard, title: 'Dashboards', description: 'Internal or customer-facing views of live data.' },
  { icon: Plug2, title: 'API-connected websites', description: 'Sites wired up to the other systems your business runs on.' },
]

const whyPoints = [
  'Built around your actual workflow, not a generic template',
  'No unnecessary plugins or bloat slowing the site down',
  'Structured to scale as your business changes',
  'You own the code and the architecture — no platform lock-in',
]

const processSteps = [
  { number: '01', title: 'Discover', description: 'Understand your business, audience and what the site actually needs to do.' },
  { number: '02', title: 'Plan', description: 'Map the structure, content and technical approach before any code is written.' },
  { number: '03', title: 'Build', description: 'Develop the site around that plan — not a theme customised after the fact.' },
  { number: '04', title: 'Integrate', description: 'Connect the systems the site genuinely needs, scoped to your setup.' },
  { number: '05', title: 'Launch & Improve', description: 'Deploy, monitor real usage and refine the site over time.' },
]

const architectureLayers = [
  { icon: Code2, title: 'Frontend', description: 'A modern, component-based interface chosen for the project — not a fixed template engine.' },
  { icon: Plug2, title: 'API & backend', description: 'The application logic and integrations the site actually needs, and nothing more.' },
  { icon: LayoutDashboard, title: 'Data', description: 'A data layer sized to the project — from a simple content store to a full database.' },
  { icon: Globe, title: 'Hosting & deployment', description: 'Modern hosting chosen for reliability and speed, matched to the project.' },
]

const responsiveTargets = [
  { icon: Monitor, label: 'Desktop' },
  { icon: Tablet, label: 'Tablet' },
  { icon: Smartphone, label: 'Mobile' },
]

const securityPoints = [
  { icon: Lock, title: 'HTTPS by default', description: 'Every site is served securely — no exceptions.' },
  { icon: Shield, title: 'Sensible access control', description: 'Logged-in areas and admin tools are locked down appropriately for the project.' },
  { icon: ShieldCheck, title: 'Responsible data handling', description: 'Customer and business data is handled deliberately, not as an afterthought.' },
]

const faqs = [
  {
    question: 'Do you build on WordPress or a page builder?',
    answer:
      "No — every site is custom-built rather than assembled from a template or page builder, so the architecture actually matches your requirements instead of working around a platform's limits.",
  },
  {
    question: 'How long does a website project take?',
    answer:
      "It depends on scope — a focused marketing site moves faster than a web application or customer portal. We'll give you a realistic timeline after discovery, not before.",
  },
  {
    question: 'Will my site work well on mobile?',
    answer: 'Yes. Every site is designed and tested across desktop, tablet and mobile as standard, not as an add-on.',
  },
  {
    question: 'Can you connect the website to our other tools?',
    answer:
      "Where that's a genuine requirement, yes. The specific systems depend on what your business already uses and are scoped during discovery, not promised in advance.",
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes — a site is monitored and maintained after launch rather than handed off as a one-off build.',
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

// The hero visual: an abstract browser-window mockup (nav bar, hero block, card grid) built
// from tokens — a diagram of "a website", not a stock photo or a specific real design.
function BrowserMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card backdrop-blur-xl">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-overlay px-4 py-3">
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="ml-3 h-5 flex-1 rounded-md bg-surface" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 rounded-full bg-highlight/40" />
          <div className="flex gap-2">
            <div className="h-2.5 w-10 rounded-full bg-fg-subtle/30" />
            <div className="h-2.5 w-10 rounded-full bg-fg-subtle/30" />
            <div className="h-2.5 w-10 rounded-full bg-fg-subtle/30" />
          </div>
        </div>
        <div className="space-y-2 rounded-xl bg-surface-overlay p-4">
          <div className="h-3 w-3/4 rounded-full bg-fg/30" />
          <div className="h-2.5 w-1/2 rounded-full bg-fg-subtle/30" />
          <div className="mt-3 h-8 w-28 rounded-lg bg-primary/80" />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((card) => (
            <div key={card} className="space-y-2 rounded-lg bg-surface-overlay p-3">
              <div className="size-5 rounded-md bg-highlight/40" />
              <div className="h-2 w-full rounded-full bg-fg-subtle/30" />
              <div className="h-2 w-2/3 rounded-full bg-fg-subtle/30" />
            </div>
          ))}
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
              <Code2 className="size-3.5 text-highlight" aria-hidden="true" />
              Custom Web Development
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Websites designed around <span className="text-gradient">how you actually work</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              We design and build business websites, web applications and customer portals
              shaped around how your business actually operates — not squeezed into a
              page-builder template.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button to={primaryCta.to} size="lg">
                {primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button href="#what-we-build-title" variant="secondary" size="lg">
                See what we build
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <BrowserMockup />
        </Reveal>
      </div>
    </Section>
  )
}

function WhyCustomSection() {
  return (
    <Section aria-labelledby="why-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            as="h2"
            id="why-title"
            eyebrow="Why custom development"
            title="A template starts with someone else's structure."
            description="Page builders and themes are built to fit a generic business. Custom development starts with how yours actually works, then builds the site around that — not the other way round."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Card>
            <ul className="space-y-4">
              {whyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
                  <span className="text-fg-muted">{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

function WhatWeBuildSection() {
  return (
    <Section tone="muted" aria-labelledby="what-we-build-title">
      <SectionHeading
        as="h2"
        id="what-we-build-title"
        eyebrow="What we build"
        align="center"
        title="Whatever your business actually needs on the web."
        className="mx-auto"
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {buildTypes.map((type, index) => (
          <li key={type.title}>
            <Reveal delay={index * 0.03}>
              <FeatureCard icon={type.icon} title={type.title} description={type.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function ProcessSection() {
  const lineInset = `${100 / (2 * processSteps.length)}%`
  return (
    <Section aria-labelledby="process-title">
      <SectionHeading
        as="h2"
        id="process-title"
        eyebrow="Development process"
        align="center"
        title="The same five steps, applied to the web."
        className="mx-auto"
      />
      <ol className="relative mt-16 flex flex-col gap-10 sm:flex-row sm:gap-0" style={{ '--line-inset': lineInset }}>
        <div
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-6 w-px bg-line-strong sm:bottom-auto sm:h-px sm:w-auto sm:inset-x-[var(--line-inset)]"
        />
        {processSteps.map((step, index) => (
          <li key={step.number} className="relative sm:flex-1">
            <Reveal delay={index * 0.08}>
              <div className="flex gap-5 sm:flex-col sm:items-center sm:gap-4 sm:text-center">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-highlight bg-surface font-display text-sm font-extrabold text-highlight">
                  {step.number}
                </span>
                <div className="pb-1 sm:px-4">
                  <h3 className="font-display text-lg font-bold text-fg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{step.description}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function ArchitectureSection() {
  return (
    <Section tone="muted" aria-labelledby="architecture-title">
      <SectionHeading
        as="h2"
        id="architecture-title"
        eyebrow="Technology architecture"
        align="center"
        title="The right technology for the project — not a fixed stack."
        description="We choose the frontend, backend and hosting each project actually needs, rather than forcing every client into the same template stack."
        className="mx-auto"
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {architectureLayers.map((layer, index) => (
          <li key={layer.title}>
            <Reveal delay={index * 0.05}>
              <FeatureCard icon={layer.icon} title={layer.title} description={layer.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function PerformanceSection() {
  return (
    <Section aria-labelledby="performance-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            as="h2"
            id="performance-title"
            eyebrow="Performance"
            title="Fast because it's built lean, not bolted on."
            description="A site loaded with plugins and page-builder overhead is slow by default. Custom-built sites ship only what the page actually needs — lean assets, minimal JavaScript, and no unnecessary dependencies."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="flex flex-col items-center gap-4 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-highlight/10 text-highlight ring-1 ring-highlight/20">
              <Gauge className="size-7" aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-fg-muted">
              Every page is built with only the code that page needs — no template
              framework running in the background to justify.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

function ResponsiveSection() {
  return (
    <Section tone="muted" aria-labelledby="responsive-title">
      <SectionHeading
        as="h2"
        id="responsive-title"
        eyebrow="Responsive design"
        align="center"
        title="Designed for every screen, not just adapted to it."
        description="Layouts are designed for desktop, tablet and mobile from the start — not a desktop site squeezed to fit a smaller screen."
        className="mx-auto"
      />
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
        {responsiveTargets.map((target) => (
          <Card key={target.label} className="flex flex-col items-center gap-3 px-8 py-6">
            <target.icon className="size-8 text-highlight" aria-hidden="true" />
            <span className="font-display text-sm font-semibold text-fg">{target.label}</span>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function SeoSection() {
  return (
    <Section aria-labelledby="seo-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            as="h2"
            id="seo-title"
            eyebrow="SEO-friendly architecture"
            title="Built to be findable, from the structure up."
            description="Clean semantic markup, proper page titles and descriptions, fast load times and a sitemap-friendly structure — the fundamentals search engines actually look at, built in from the start rather than patched in with a plugin."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="flex flex-col items-center gap-4 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-highlight/10 text-highlight ring-1 ring-highlight/20">
              <Search className="size-7" aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-fg-muted">
              Every page ships with its own title, description and canonical URL — not a
              generic template applied site-wide.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

function SecuritySection() {
  return (
    <Section tone="muted" aria-labelledby="security-title">
      <SectionHeading
        as="h2"
        id="security-title"
        eyebrow="Security considerations"
        align="center"
        title="Handled deliberately, not as an afterthought."
        className="mx-auto"
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {securityPoints.map((point, index) => (
          <li key={point.title}>
            <Reveal delay={index * 0.06}>
              <FeatureCard icon={point.icon} title={point.title} description={point.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function PortfolioSection() {
  const webProjects = caseStudies.filter((project) => project.category === 'web')
  return (
    <Section aria-labelledby="portfolio-title">
      <SectionHeading
        as="h2"
        id="portfolio-title"
        eyebrow="Portfolio"
        align="center"
        title="Examples of what we build."
        description="Real projects are added here as they ship. The example below is a clearly marked placeholder."
        className="mx-auto"
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {webProjects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 0.05}>
              <CaseStudyCard
                title={project.title}
                industry={project.industry}
                solutionType={project.solutionType}
                description={project.problem}
                tags={project.technology}
                result={project.result}
                placeholder={project.placeholder}
                to={`/portfolio/${project.slug}`}
              />
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal delay={0.1}>
        <div className="mt-10 text-center">
          <Button to="/portfolio" variant="secondary">
            View full portfolio
          </Button>
        </div>
      </Reveal>
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

function FinalCtaBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div className="bg-glow absolute top-1/2 left-1/2 h-[34rem] w-[34rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60" />
    </>
  )
}

function FinalCtaSection() {
  return (
    <Section tone="inverse" background={<FinalCtaBackground />} aria-labelledby="final-cta-title">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-title" className="text-3xl sm:text-4xl lg:text-5xl">
            Let's build a website that actually <span className="text-gradient">fits your business</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell us what you're trying to build — we'll figure out the right approach before
            we write any code.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={primaryCta.to} size="lg">
              {primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Tell us about your project
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default function WebDevelopment() {
  return (
    <>
      <Seo title="Custom Web Development" description={pageDescription} />
      <ServiceSchema name="Custom Web Development" description={pageDescription} path="/web-development" />
      <BreadcrumbSchema
        items={[{ name: 'Home', path: '/' }, { name: 'Custom Web Development', path: '/web-development' }]}
      />
      <FaqSchema faqs={faqs} />
      <HeroSection />
      <WhyCustomSection />
      <WhatWeBuildSection />
      <ProcessSection />
      <ArchitectureSection />
      <PerformanceSection />
      <ResponsiveSection />
      <SeoSection />
      <SecuritySection />
      <PortfolioSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
