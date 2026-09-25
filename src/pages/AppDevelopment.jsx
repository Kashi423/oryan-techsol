import {
  ArrowRight,
  Bell,
  Bot,
  Boxes,
  Brain,
  Building2,
  CalendarClock,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  CreditCard,
  Database,
  Fingerprint,
  Gauge,
  Layers,
  LayoutGrid,
  Map,
  MessageCircle,
  PenTool,
  Plug2,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  UserCog,
  Users,
  Workflow,
} from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import Seo from '@/components/seo/Seo'
import {
  Accordion,
  Badge,
  Button,
  CapabilityTile,
  ProcessStepIcon,
  Reveal,
  Section,
  SectionHeading,
  ServiceCard,
  Tag,
  TypeCard,
} from '@/components/ui'
import { primaryCta } from '@/config/site'
import { cn } from '@/lib/cn'

const pageDescription =
  'Custom mobile app development for iOS, Android and cross-platform — business apps, customer apps and on-demand platforms, connected to the backend, APIs and AI your business needs.'

// Why a custom app over an off-the-shelf builder — the business case, not a feature list.
const whyCustomApps = [
  {
    icon: UserCog,
    title: 'Built around your workflow',
    description: 'An app shaped around how your business actually operates, not a template forcing you to adapt.',
  },
  {
    icon: Boxes,
    title: 'Full ownership',
    description: 'Your app, your data, your codebase — not locked into a third-party builder or platform.',
  },
  {
    icon: Plug2,
    title: 'Connects to your systems',
    description: 'A mobile front end for the backend, database and business tools you already rely on.',
  },
  {
    icon: Sparkles,
    title: 'Room for AI and automation',
    description: 'Built so AI features and automated workflows can be added when they genuinely help.',
  },
]

const appTypes = [
  { icon: Building2, title: 'Business Apps', description: 'Internal tools your team uses to run day-to-day operations from a phone.' },
  { icon: Users, title: 'Customer Apps', description: 'A branded app your customers use to browse, book or buy directly from you.' },
  { icon: ShoppingBag, title: 'E-commerce Apps', description: 'Mobile storefronts with product browsing, cart and checkout built in.' },
  { icon: CalendarClock, title: 'Booking & Appointment Apps', description: 'Scheduling, reminders and confirmations handled in one place.' },
  { icon: Truck, title: 'Delivery Apps', description: 'Order tracking and dispatch for delivery and logistics-driven businesses.' },
  { icon: Store, title: 'Marketplace Apps', description: 'Multi-vendor platforms connecting buyers and sellers in one app.' },
  { icon: Map, title: 'On-Demand Service Apps', description: 'Request, match and fulfil a service in real time, on demand.' },
  { icon: LayoutGrid, title: 'CRM / Business Management Apps', description: 'Manage customers, leads and operations from a mobile dashboard.' },
  { icon: Brain, title: 'AI-Powered Mobile Apps', description: 'Apps with AI assistants, smart search or recommendations built in.' },
]

// What sits behind the screen — the part that makes an app an actual business system
// rather than a static interface. Grouped as capability tiles, same pattern as AiBots.jsx.
const platformCapabilities = [
  { icon: Database, label: 'Backend & databases' },
  { icon: Plug2, label: 'API integrations' },
  { icon: Brain, label: 'AI features' },
  { icon: Workflow, label: 'Automated workflows' },
  { icon: LayoutGrid, label: 'Admin panels' },
  { icon: Fingerprint, label: 'Secure authentication' },
  { icon: CreditCard, label: 'Payments' },
  { icon: Bell, label: 'Push notifications' },
  { icon: Cloud, label: 'Cloud infrastructure' },
  { icon: Gauge, label: 'Analytics & reporting' },
]

const securityPoints = [
  {
    icon: ShieldCheck,
    title: 'Secure by design',
    description: 'Authentication, data handling and API access built to standard security practices from the start.',
  },
  {
    icon: Boxes,
    title: 'Built to scale',
    description: 'An architecture that can grow from a first release to a much larger user base without a rebuild.',
  },
  {
    icon: MessageCircle,
    title: 'Cross-platform reach',
    description: 'iOS and Android from a single codebase where it fits, or fully native when the project calls for it.',
  },
]

const processSteps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description: 'Understand the business, users and what the app actually needs to do.',
  },
  {
    number: '02',
    icon: Compass,
    title: 'Plan',
    description: 'Map the features, screens and technical architecture before writing code.',
  },
  { number: '03', icon: PenTool, title: 'Design', description: 'UI/UX designed around real user flows, not generic templates.' },
  { number: '04', icon: Code2, title: 'Develop', description: 'Build the app, backend, APIs and admin tools in parallel.' },
  {
    number: '05',
    icon: ShieldCheck,
    title: 'Test',
    description: 'Verify functionality, performance and security before release.',
  },
  {
    number: '06',
    icon: Rocket,
    title: 'Launch & Support',
    description: 'Publish to the app stores, then monitor and improve after launch.',
  },
]

// Natural next steps for a visitor reading about apps — not every service, just the ones
// an app project most often connects to.
const relatedServices = [
  {
    icon: Bot,
    title: 'AI Bots & Automation',
    description: 'Add an AI assistant or automated workflow inside your app.',
    to: '/ai-bots',
  },
  {
    icon: Layers,
    title: 'Custom Software Development',
    description: 'The backend, admin tools and internal systems behind the app.',
    to: '/custom-software',
  },
  {
    icon: Plug2,
    title: 'API & System Integrations',
    description: 'Connect your app to the CRM, payments or other tools you already use.',
    to: '/api-integrations',
  },
]

const faqs = [
  {
    question: 'Do you build for iOS, Android, or both?',
    answer:
      "Both — usually from a single cross-platform codebase, which is faster and more cost-effective for most business apps. We'll recommend fully native only when a project genuinely needs it.",
  },
  {
    question: 'Can the app connect to our existing systems?',
    answer:
      'Yes — connecting to your CRM, database, payment provider or other tools is part of the build, scoped to what your business already uses.',
  },
  {
    question: 'Can AI be added to our app?',
    answer:
      'Where it genuinely helps — an AI assistant, smart search or recommendations, for example. This is scoped during discovery rather than added by default.',
  },
  {
    question: 'Do you handle publishing to the App Store and Google Play?',
    answer: 'Yes, publishing and the store listing are part of the launch step.',
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes — an app is monitored and improved after launch rather than treated as a one-off delivery.',
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

const phoneStats = [
  { icon: Users, label: 'Members', value: '1.2k' },
  { icon: CreditCard, label: 'Revenue', value: '$8,420' },
]

const phoneTasks = [
  { label: 'Push notification sent', done: true },
  { label: 'New booking confirmed', done: true },
  { label: 'Sync with backend API', done: false },
]

// A phone-frame mockup built from tokens (no image asset): a real chassis (notch, side keys)
// wrapping a real app screen — named stats, a checklist and a labelled CTA — matching the
// fidelity of the ChatMockup used on the AI bots page rather than a plain block silhouette.
function PhoneMockup() {
  return (
    <div data-tone="default" className="relative mx-auto w-full max-w-[19rem]">
      <div className="relative rounded-[2.5rem] border border-line bg-fg p-2.5 shadow-card">
        <span aria-hidden="true" className="absolute top-16 -left-px h-8 w-1 rounded-full bg-fg/60" />
        <span aria-hidden="true" className="absolute top-28 -left-px h-12 w-1 rounded-full bg-fg/60" />
        <span aria-hidden="true" className="absolute top-24 -right-px h-14 w-1 rounded-full bg-fg/60" />
        <div className="relative overflow-hidden rounded-[2rem] bg-surface-overlay">
          <div
            aria-hidden="true"
            className="absolute top-2 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-fg"
          />
          <div className="flex items-center justify-between px-5 pt-7 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-xl bg-highlight/10 text-highlight">
                <Smartphone className="size-4" aria-hidden="true" />
              </span>
              <span className="font-display text-sm font-bold text-fg">TaskFlow</span>
            </div>
            <span className="relative flex size-8 items-center justify-center rounded-full bg-surface-raised text-fg-subtle">
              <Bell className="size-4" aria-hidden="true" />
              <span aria-hidden="true" className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-highlight" />
            </span>
          </div>
          <div className="space-y-3 px-5 pb-6">
            <div className="rounded-2xl bg-primary/90 p-4">
              <p className="text-xs font-medium text-primary-fg/70">Good morning</p>
              <p className="mt-0.5 font-display text-sm font-bold text-primary-fg">3 tasks need your review</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {phoneStats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="space-y-1.5 rounded-xl bg-surface-raised p-3">
                  <Icon className="size-4 text-highlight" aria-hidden="true" />
                  <p className="font-display text-sm font-extrabold text-fg">{value}</p>
                  <p className="text-[10px] text-fg-subtle">{label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-1 rounded-xl bg-surface-raised p-2">
              {phoneTasks.map(({ label, done }) => (
                <div key={label} className="flex items-center gap-2.5 px-2 py-1.5">
                  <span
                    className={cn(
                      'flex size-4 shrink-0 items-center justify-center rounded-full',
                      done ? 'bg-success/15 text-success' : 'border border-line-strong',
                    )}
                  >
                    {done && <CheckCircle2 className="size-3" aria-hidden="true" />}
                  </span>
                  <p className={cn('flex-1 text-xs font-medium', done ? 'text-fg-subtle line-through' : 'text-fg')}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex h-11 items-center justify-center rounded-full bg-highlight/90 text-sm font-bold text-fg">
              New Task
            </div>
          </div>
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
              <Smartphone className="size-3.5 text-highlight" aria-hidden="true" />
              App Development
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Mobile apps that <span className="text-gradient">move your business forward</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              We design and build custom mobile apps — iOS, Android and cross-platform — with the
              backend, APIs, admin tools and AI features to make them real business systems, not
              just screens.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button to={primaryCta.to} size="lg">
                Build Your App
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button href="#app-types" variant="secondary" size="lg">
                See what we build
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <PhoneMockup />
        </Reveal>
      </div>
    </Section>
  )
}

function WhySection() {
  return (
    <Section aria-labelledby="why-title">
      <SectionHeading
        as="h2"
        id="why-title"
        eyebrow="Why a custom app"
        align="center"
        title="Why custom apps."
        description="A generic app builder gets you a template. A custom app gets you a system built around how your business actually works."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyCustomApps.map((item, index) => (
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

function AppTypesSection() {
  return (
    <Section id="app-types" tone="muted" aria-labelledby="types-title">
      <SectionHeading
        as="h2"
        id="types-title"
        eyebrow="Types of apps"
        align="center"
        title="Built for a specific job, not a generic template."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {appTypes.map((type, index) => (
          <li key={type.title}>
            <Reveal className="h-full" delay={index * 0.04}>
              <TypeCard icon={type.icon} title={type.title} description={type.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// The AI + automation differentiator: same "system, not just screens" message as the rest
// of the site's AI positioning, made concrete as a capability list under the app.
function PlatformSection() {
  return (
    <Section aria-labelledby="platform-title">
      <SectionHeading
        as="h2"
        id="platform-title"
        eyebrow="Backend, APIs & AI"
        align="center"
        title="What's behind the screen matters as much as the screen."
        description="A mobile app connected to a real backend, database, APIs, AI and automation — everything a business app needs to actually run something, not just display information."
        className="mx-auto"
      />
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {platformCapabilities.map((capability, index) => (
          <li key={capability.label}>
            <Reveal delay={index * 0.03}>
              <CapabilityTile icon={capability.icon} label={capability.label} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function SecuritySection() {
  return (
    <Section tone="muted" aria-labelledby="security-title">
      <SectionHeading
        as="h2"
        id="security-title"
        eyebrow="Security & scalability"
        align="center"
        title="Built to be trusted and built to grow."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-3">
        {securityPoints.map((item, index) => (
          <li key={item.title}>
            <Reveal className="h-full" delay={index * 0.06}>
              <TypeCard icon={item.icon} title={item.title} description={item.description} />
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
        eyebrow="App development process"
        align="center"
        title="The same disciplined process, applied to mobile."
        className="mx-auto"
      />
      <ol className="relative mt-16 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:gap-0" style={{ '--line-inset': lineInset }}>
        <div
          aria-hidden="true"
          className="absolute top-7 bottom-7 left-7 hidden w-px bg-linear-to-b from-highlight/40 via-line-strong to-line-strong sm:bottom-auto sm:h-px sm:w-auto sm:inset-x-[var(--line-inset)] sm:bg-linear-to-r lg:block"
        />
        {processSteps.map((step, index) => (
          <li key={step.number} className="group relative lg:flex-1">
            <Reveal delay={index * 0.06}>
              <div className="flex flex-col items-center gap-4 text-center">
                <ProcessStepIcon icon={step.icon} number={step.number} index={index} total={processSteps.length} />
                <div className="pb-1 lg:px-4">
                  <h3 className="font-display text-base font-bold text-fg">{step.title}</h3>
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
        title="What usually goes alongside an app."
        className="mx-auto"
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {relatedServices.map((service, index) => (
          <li key={service.to}>
            <Reveal delay={index * 0.05} className="h-full">
              <ServiceCard icon={service.icon} title={service.title} description={service.description} to={service.to} />
            </Reveal>
          </li>
        ))}
      </ul>
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
            Ready to build an app <span className="text-gradient">around your business</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell us what you're trying to build — we'll figure out the right platform, features
            and approach together.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={primaryCta.to} size="lg">
              Discuss Your Project
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button to="/portfolio" variant="secondary" size="lg">
              View our work
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['iOS', 'Android', 'Cross-Platform', 'Backend & APIs', 'AI-Ready'].map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

export default function AppDevelopment() {
  return (
    <>
      <Seo title="App Development" description={pageDescription} />
      <ServiceSchema name="App Development" description={pageDescription} path="/app-development" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'App Development', path: '/app-development' }]} />
      <FaqSchema faqs={faqs} />
      <HeroSection />
      <WhySection />
      <AppTypesSection />
      <PlatformSection />
      <SecuritySection />
      <ProcessSection />
      <FaqSection />
      <RelatedServicesSection />
      <FinalCtaSection />
    </>
  )
}
