import {
  ArrowDown,
  ArrowRight,
  Bell,
  Blocks,
  Bot,
  Brain,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ClipboardList,
  Code2,
  Database,
  FileSearch,
  FileText,
  Globe,
  Headset,
  HelpCircle,
  Layers,
  LayoutGrid,
  ListChecks,
  Minus,
  Network,
  Plug2,
  RefreshCw,
  Repeat,
  Search,
  ShoppingCart,
  Shuffle,
  Smartphone,
  Sparkles,
  Target,
  Ticket,
  TrendingDown,
  Unplug,
  User,
  UserPlus,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import { AnimatePresence, m, useInView } from 'framer-motion'
import { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router'
import LogoMark from '@/components/brand/LogoMark'
import Seo from '@/components/seo/Seo'
import {
  Badge,
  Button,
  Card,
  CaseStudyCard,
  FeatureCard,
  PulseRing,
  Reveal,
  Section,
  SectionHeading,
  ServiceCard,
  Tag,
  TestimonialCard,
} from '@/components/ui'
import { primaryCta } from '@/config/site'
import { caseStudies, categories } from '@/data/caseStudies'
import { testimonials } from '@/data/testimonials'
import { cn } from '@/lib/cn'

const trustIndicators = ['Custom Apps & Software', 'AI-Powered Automation', 'Scalable Technology']

const problems = [
  { icon: Headset, label: 'Manual customer support' },
  { icon: ClipboardList, label: 'Repetitive data entry' },
  { icon: Clock, label: 'Slow lead responses' },
  { icon: Shuffle, label: 'Scattered business systems' },
  { icon: FileText, label: 'Manual reporting' },
  { icon: Repeat, label: 'Inefficient workflows' },
  { icon: Globe, label: 'Outdated websites' },
  { icon: Unplug, label: 'Disconnected software' },
  { icon: TrendingDown, label: 'Missed opportunities' },
]

const before = [
  { label: 'Manual', description: "Repetitive tasks like data entry and follow-ups eat up your team's time." },
  { label: 'Slow', description: 'Leads and customers wait hours, sometimes days, for a response.' },
  { label: 'Disconnected', description: "Data is scattered across tools that don't talk to each other." },
]

const after = [
  { label: 'Automated', description: 'AI bots and workflows handle the repetitive work around the clock.' },
  { label: 'Intelligent', description: 'Systems that route, prioritise and respond based on real data.' },
  { label: 'Connected', description: 'One integrated stack — a single source of truth for your business.' },
]

// AI Bots & AI Agents is a distinct specialty, not one card in a generic list — real
// examples of what gets built, not a "we do chatbots" one-liner.
const aiExamples = [
  'Customer support bots',
  'Lead qualification bots',
  'Sales assistants',
  'Appointment booking bots',
  'FAQ bots',
  'Internal knowledge assistants',
  'WhatsApp / website AI assistants',
  'AI workflow agents',
  'Document processing automation',
]

const services = [
  {
    icon: Smartphone,
    title: 'App Development',
    description:
      'Custom iOS, Android and cross-platform apps — connected to the backend, APIs and AI your business needs.',
    to: '/app-development',
  },
  {
    icon: Layers,
    title: 'Custom Software Development',
    description:
      'Bespoke internal tools and platforms shaped around your exact processes, not the other way around.',
    to: '/custom-software',
  },
  {
    icon: Code2,
    title: 'Custom Web Development',
    description:
      'Fast, modern websites and web platforms built around how your business actually sells and operates.',
    to: '/web-development',
  },
  {
    icon: Workflow,
    title: 'Business Automation',
    description:
      'We connect the tools you already use and automate the manual steps between them — approvals, data sync, reporting and more.',
    to: '/business-automation',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description:
      'Custom storefronts, payments and order management — plus the automation connecting your store to the rest of your business.',
    to: '/ecommerce',
  },
  {
    icon: Plug2,
    title: 'API & System Integrations',
    description:
      'We connect your CRM, payments, ERP and other systems so data moves automatically instead of living in silos.',
    to: '/api-integrations',
  },
  {
    icon: LayoutGrid,
    title: 'SaaS & Web Applications',
    description:
      'Full product builds — from first version to scale — for teams launching their own SaaS or customer-facing app.',
    to: '/saas-development',
  },
]

// The example flow requested: Customer → AI Assistant → Understands Request → Retrieves
// Information → Takes Action → Business System.
const aiFlowSteps = [
  { icon: User, label: 'Customer' },
  { icon: Bot, label: 'AI Assistant' },
  { icon: Brain, label: 'Understands Request' },
  { icon: Database, label: 'Retrieves Information' },
  { icon: Zap, label: 'Takes Action' },
  { icon: Building2, label: 'Business System' },
]

const aiCapabilities = [
  { icon: HelpCircle, label: 'Answer questions' },
  { icon: UserPlus, label: 'Capture leads' },
  { icon: ListChecks, label: 'Qualify prospects' },
  { icon: CalendarCheck, label: 'Book appointments' },
  { icon: Search, label: 'Search business knowledge' },
  { icon: Ticket, label: 'Create tickets' },
  { icon: Bell, label: 'Send notifications' },
  { icon: RefreshCw, label: 'Update CRM' },
  { icon: FileSearch, label: 'Process documents' },
  { icon: Repeat, label: 'Automate repetitive tasks' },
]

const processSteps = [
  { number: '01', title: 'Discover', description: 'Understand the business, goals and workflow.' },
  { number: '02', title: 'Plan', description: 'Design the technical architecture and solution.' },
  { number: '03', title: 'Build', description: 'Develop the website, software, AI system or automation.' },
  {
    number: '04',
    title: 'Integrate',
    description: 'Connect APIs, databases, CRM, communication tools and other systems where required.',
  },
  { number: '05', title: 'Launch & Improve', description: 'Deploy, monitor and continuously improve the solution.' },
]

// Not a claim of certified expertise in each field — the same custom web, software and AI
// building blocks, shaped around how each type of business actually operates. Examples,
// not fixed packages.
const industries = [
  {
    name: 'E-commerce',
    solutions: ['Customer support AI', 'Order-status assistant', 'Product recommendation', 'Marketing automation'],
  },
  {
    name: 'Real Estate',
    solutions: ['AI lead qualification', 'Property inquiry bot', 'Appointment scheduling', 'CRM automation'],
  },
  {
    name: 'Healthcare',
    solutions: [
      'Appointment booking assistant',
      'Patient FAQ bot',
      'Intake form automation',
      'Reminder & follow-up automation',
    ],
  },
  {
    name: 'Education',
    solutions: [
      'Admissions inquiry bot',
      'Course FAQ assistant',
      'Enrollment automation',
      'Student support ticketing',
    ],
  },
  {
    name: 'Hospitality',
    solutions: [
      'Booking & reservations bot',
      'Guest inquiry assistant',
      'Review & feedback automation',
      'Concierge-style FAQ bot',
    ],
  },
  {
    name: 'Professional Services',
    solutions: ['Client intake bot', 'Appointment scheduling', 'Document automation', 'CRM & follow-up automation'],
  },
  {
    name: 'Finance',
    solutions: [
      'Lead qualification bot',
      'Client FAQ assistant',
      'Document processing automation',
      'Internal reporting automation',
    ],
  },
  {
    name: 'Logistics',
    solutions: [
      'Shipment status assistant',
      'Customer inquiry bot',
      'Order tracking automation',
      'Dispatch notification automation',
    ],
  },
  {
    name: 'Agencies',
    solutions: [
      'Client onboarding bot',
      'Project status assistant',
      'Internal workflow automation',
      'Reporting automation',
    ],
  },
  {
    name: 'Startups',
    solutions: ['MVP web & app development', 'Lead capture bot', 'Internal tooling automation', 'Customer support assistant'],
  },
  {
    name: 'Small & Medium Businesses',
    solutions: ['Customer support bot', 'Appointment booking', 'Internal process automation', 'Simple CRM setup'],
  },
]

const differentiators = [
  {
    icon: Blocks,
    title: 'Custom-Built',
    description: 'Solutions designed around your business.',
  },
  {
    icon: Sparkles,
    title: 'AI-First Thinking',
    description: 'Use AI where it genuinely improves the workflow.',
  },
  {
    icon: Target,
    title: 'Business-Focused',
    description: 'Technology designed around practical business needs.',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    description: 'Solutions built with future growth in mind.',
  },
  {
    icon: Network,
    title: 'Connected Systems',
    description: 'Integrate websites, software, APIs and business tools.',
  },
  {
    icon: Users,
    title: 'Human Collaboration',
    description: 'Work closely with clients from discovery through deployment.',
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

// A small frosted "glass" panel that floats near the network mark — the AI-bot/workflow
// proof points made visual instead of another stock-photo hero. Entrance fade uses Reveal's
// easing; the continuous float is its own transition so it can loop independently.
// MotionConfig (main.jsx) strips the transform for prefers-reduced-motion users automatically.
// Gated by useInView so the float stops costing anything once scrolled past the hero.
function FloatingChip({ className, delay = 0, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-10% 0px', once: false })

  return (
    <m.div
      ref={ref}
      className={cn(
        'absolute flex items-center gap-2.5 rounded-2xl border border-line bg-surface-raised px-4 py-3 shadow-card backdrop-blur-xl',
        className,
      )}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: [0, -8, 0] } : { opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 5, delay: delay + 0.6, repeat: inView ? Infinity : 0, ease: 'easeInOut' },
      }}
    >
      {children}
    </m.div>
  )
}

// The right-column focal visual: the brand's own network-of-nodes mark (already an abstract
// "AI nodes" graphic, not a stock photo) at display size, with floating glass panels standing
// in for a live chatbot reply, a triggered workflow and a result stat.
function HeroVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center lg:max-w-none">
      <div
        aria-hidden="true"
        className="bg-glow absolute inset-0 scale-125 opacity-80"
      />
      <LogoMark className="relative size-64 opacity-95 sm:size-80 lg:size-[26rem]" />

      <FloatingChip className="top-4 left-0 sm:top-8 sm:-left-4" delay={0.4}>
        <span className="relative flex size-2.5 shrink-0">
          <span className="motion-safe:absolute motion-safe:inline-flex motion-safe:size-full motion-safe:animate-ping motion-safe:rounded-full motion-safe:bg-success/60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-success" />
        </span>
        <span className="font-display text-sm font-semibold text-fg">AI bot · replying instantly</span>
      </FloatingChip>

      <FloatingChip className="right-0 bottom-10 sm:-right-6 sm:bottom-16" delay={0.6}>
        <Workflow className="size-4 text-highlight" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-fg">Workflow automated</span>
        <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
      </FloatingChip>

      <FloatingChip className="hidden bottom-0 left-2 sm:flex sm:left-6" delay={0.8}>
        <TrendingDown className="size-4 text-highlight" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-fg">Faster response times</span>
      </FloatingChip>
    </div>
  )
}

// Muted (not alarmist) problem tile — grey ink tones, no hover treatment, since these
// describe the visitor's current state rather than something to click or celebrate.
function ProblemTile({ icon: Icon, label, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Card className="flex h-full items-center gap-4 py-5">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-fg-subtle">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <p className="font-display text-sm font-semibold text-fg-muted">{label}</p>
      </Card>
    </Reveal>
  )
}

// One row of the before/after comparison. `variant` swaps the icon and its colour so the
// same layout reads as "current state" on the left and "outcome" on the right.
function ComparisonRow({ label, description, variant }) {
  const Icon = variant === 'after' ? CheckCircle2 : Minus
  return (
    <li className="flex items-start gap-3 py-4">
      <Icon
        className={cn('mt-0.5 size-5 shrink-0', variant === 'after' ? 'text-success' : 'text-fg-subtle')}
        aria-hidden="true"
      />
      <div>
        <p className="font-display text-sm font-bold text-fg">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-fg-muted">{description}</p>
      </div>
    </li>
  )
}

// Problem/solution section: the visitor's current pain (a muted grid of 9 common issues),
// a plain-language transition line, then a before/after comparison. Deliberately no stats
// or superlatives here — those belong in the proof sections (case studies), not the pitch.
function ProblemsSection() {
  return (
    <Section aria-labelledby="problems-title">
      <SectionHeading
        as="h2"
        id="problems-title"
        eyebrow="The problem"
        align="center"
        title="Your business shouldn't run on repetitive work."
        description="Most growing teams lose hours every week to tasks that technology could already be handling."
        className="mx-auto"
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem, index) => (
          <li key={problem.label}>
            <ProblemTile icon={problem.icon} label={problem.label} delay={index * 0.03} />
          </li>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-16 max-w-2xl text-center font-display text-2xl font-bold text-fg sm:text-3xl">
          OryanTechsol turns these processes into intelligent digital systems.
        </p>
      </Reveal>

      <div className="mt-12 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <Reveal>
          <Card as="section" aria-labelledby="before-title" className="h-full">
            <p id="before-title" className="font-display text-xs font-bold tracking-[0.2em] text-fg-subtle uppercase">
              Before
            </p>
            <p className="mt-1 font-display text-sm font-semibold text-fg-muted">
              Manual · Slow · Disconnected
            </p>
            <ul className="mt-2 divide-y divide-line">
              {before.map((row) => (
                <ComparisonRow key={row.label} variant="before" {...row} />
              ))}
            </ul>
          </Card>
        </Reveal>

        <div
          aria-hidden="true"
          className="mx-auto flex size-11 rotate-90 items-center justify-center rounded-full border border-line-strong bg-surface-raised text-highlight md:rotate-0"
        >
          <ArrowRight className="size-5" />
        </div>

        <Reveal delay={0.08}>
          <Card as="section" aria-labelledby="after-title" className="h-full border-highlight/40 ring-1 ring-highlight/15">
            <p id="after-title" className="font-display text-xs font-bold tracking-[0.2em] text-highlight uppercase">
              After
            </p>
            <p className="mt-1 font-display text-sm font-semibold text-fg">
              Automated · Intelligent · Connected
            </p>
            <ul className="mt-2 divide-y divide-line">
              {after.map((row) => (
                <ComparisonRow key={row.label} variant="after" {...row} />
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

// The featured AI Bots & AI Agents card — deliberately larger and on the inverse (navy)
// tone, so it reads as the specialty rather than one entry in a generic service list.
// The example list is what makes the "not a generic chatbot" positioning concrete.
function FeaturedAiCard() {
  return (
    <Reveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
      <Card data-tone="inverse" surface="solid" interactive className="group flex h-full flex-col overflow-hidden">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
        <div aria-hidden="true" className="bg-glow absolute -top-16 -right-16 h-72 w-72" />

        <div className="relative flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-highlight/10 text-highlight ring-1 ring-highlight/20">
              <Bot className="size-6" aria-hidden="true" />
            </span>
            <Badge>
              <Sparkles className="size-3.5 text-highlight" aria-hidden="true" />
              Our specialty
            </Badge>
          </div>

          <h3 className="mt-6 text-2xl sm:text-3xl">AI Bots & AI Agents</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-fg-muted">
            We design and build custom AI bots and agents around your actual workflows — not a
            generic script bolted onto your website. Faster responses, fewer repetitive tickets,
            and a team freed up for the work that actually needs a human.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {aiExamples.map((example) => (
              <li key={example}>
                <Tag>{example}</Tag>
              </li>
            ))}
          </ul>

          <Link
            to="/ai-bots"
            className="mt-8 inline-flex items-center gap-1 font-display text-sm font-semibold text-highlight after:absolute after:inset-0"
          >
            Learn more
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Card>
    </Reveal>
  )
}

// Six core services in a bento grid: AI Bots & AI Agents gets the large featured cell
// (the differentiator), the rest sit in standard ServiceCards around it.
function ServicesSection() {
  return (
    <Section tone="muted" aria-labelledby="services-title">
      <SectionHeading
        as="h2"
        id="services-title"
        eyebrow="What we do"
        align="center"
        title="Custom systems, mapped to how you work."
        description="From your website to your back office, we design and build the systems that run your business — with AI bots and automation at the core."
        className="mx-auto"
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeaturedAiCard />
        {services.map((service, index) => (
          <Reveal key={service.to} delay={0.05 * (index + 1)}>
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              to={service.to}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function AiSectionBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="bg-glow absolute top-1/2 left-1/2 h-[40rem] w-[70rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70" />
    </>
  )
}

// One node of the workflow diagram. Rather than a literal animated line (fragile to keep
// in sync across the row↔column layout switch), the ring around each icon pulses in
// sequence — index-staggered with a shared cycle length — so the diagram itself shows
// data moving left-to-right (top-to-bottom on mobile) through the pipeline.
function FlowStep({ icon: Icon, label, index, total }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3 text-center">
      <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-highlight/10 text-highlight ring-1 ring-highlight/20 sm:size-16">
        <Icon className="size-6 sm:size-7" aria-hidden="true" />
        <PulseRing index={index} total={total} />
      </span>
      <p className="max-w-28 font-display text-xs font-semibold text-fg sm:text-sm">{label}</p>
    </div>
  )
}

function FlowConnector() {
  return (
    <div className="flex h-8 shrink-0 items-center justify-center text-fg-subtle sm:h-auto sm:w-12" aria-hidden="true">
      <ArrowRight className="hidden size-5 sm:block" />
      <ArrowDown className="size-5 sm:hidden" />
    </div>
  )
}

// The strongest AI section on the homepage: the example request→action flow made visual,
// the concrete capability list (so "AI bots" reads as real business systems, not a generic
// chatbot pitch), and a dedicated CTA.
function AiSection() {
  return (
    <Section tone="inverse" background={<AiSectionBackground />} aria-labelledby="ai-title">
      <SectionHeading
        as="h2"
        id="ai-title"
        eyebrow="AI bots & agents"
        align="center"
        title={
          <>
            AI that actually <span className="text-gradient">works</span> for your business.
          </>
        }
        description="We build custom AI assistants and agents connected to your business processes, data and tools — so a conversation can actually get something done, not just answer a question."
        className="mx-auto"
      />

      <Reveal delay={0.05}>
        <div className="mt-16 flex flex-col items-stretch gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
          {aiFlowSteps.map((step, index) => (
            <Fragment key={step.label}>
              <FlowStep icon={step.icon} label={step.label} index={index} total={aiFlowSteps.length} />
              {index < aiFlowSteps.length - 1 && <FlowConnector />}
            </Fragment>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {aiCapabilities.map((capability) => (
            <li key={capability.label}>
              <Card padding="none" className="flex h-full items-center gap-2.5 px-4 py-3">
                <capability.icon className="size-4 shrink-0 text-highlight" aria-hidden="true" />
                <span className="font-display text-sm font-semibold text-fg">{capability.label}</span>
              </Card>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-14 flex justify-center">
          <Button to={primaryCta.to} size="lg">
            Build My AI Solution
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

// Five-step process, horizontal on desktop / vertical timeline on mobile. Same DOM either
// way — only the connecting line's axis and each step's internal layout change by
// breakpoint. The line's desktop inset is 1/(2 × step count) so it passes exactly through
// the centre of every circle, since each step is an equal-width flex-1 column.
function ProcessSection() {
  const lineInset = `${100 / (2 * processSteps.length)}%`

  return (
    <Section aria-labelledby="process-title">
      <SectionHeading
        as="h2"
        id="process-title"
        eyebrow="How we work"
        align="center"
        title="Built around your business, not a template."
        description="We don't sell one-size-fits-all software. Every engagement starts with how your business actually works, and the solution reflects your specific goals, workflow and tools."
        className="mx-auto"
      />

      {/* No sm:gap on the row — a gap would shift the flex-1 columns' true centres away
          from the plain 1/(2n) math above, throwing off the line's alignment to the
          circles. Spacing between steps comes from each step's own padding instead. */}
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

// Interactive, not decorative: picking an industry swaps in real example solutions rather
// than just listing names. Plain toggle buttons (not an ARIA tablist) — this is a filter,
// not tabbed content, so native button semantics already give correct keyboard support.
function IndustriesSection() {
  const [active, setActive] = useState(0)
  const industry = industries[active]

  return (
    <Section tone="muted" aria-labelledby="industries-title">
      <SectionHeading
        as="h2"
        id="industries-title"
        eyebrow="Industries"
        align="center"
        title="Built to fit how you work."
        description="We're not certified specialists in every field — but custom software and AI adapt to how any business actually operates. Pick an industry to see what that can look like."
        className="mx-auto"
      />

      <Reveal delay={0.05}>
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {industries.map((ind, index) => (
            <button
              key={ind.name}
              type="button"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              className={cn(
                'rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors duration-200',
                index === active
                  ? 'border-primary bg-primary text-primary-fg'
                  : 'border-line-strong bg-surface-raised text-fg-muted hover:text-fg',
              )}
            >
              {ind.name}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-8 max-w-2xl" aria-live="polite">
          <AnimatePresence mode="wait">
            <m.div
              key={industry.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <p className="font-display text-xs font-bold tracking-[0.2em] text-highlight uppercase">
                  {industry.name}
                </p>
                <p className="mt-2 text-sm text-fg-muted">
                  Examples of what this can look like — not a fixed package, shaped around how
                  your business actually works.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {industry.solutions.map((solution) => (
                    <li key={solution}>
                      <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-muted px-4 py-3">
                        <CheckCircle2 className="size-4 shrink-0 text-highlight" aria-hidden="true" />
                        <span className="text-sm font-semibold text-fg">{solution}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </m.div>
          </AnimatePresence>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-8 text-center text-sm text-fg-subtle">
          Don't see your exact industry?{' '}
          <Link to="/contact" className="font-semibold text-highlight hover:underline">
            Let's talk about your specific workflow
          </Link>
          .
        </p>
      </Reveal>
    </Section>
  )
}

// Homepage preview of the portfolio: filterable grid over the shared caseStudies data
// (src/data/caseStudies.js), so a full /portfolio page can read the exact same source
// later without duplicating content. Every entry today is a clearly labelled placeholder —
// see that file's header comment for how to replace one with a real project.
function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const visible =
    activeCategory === 'all' ? caseStudies : caseStudies.filter((project) => project.category === activeCategory)

  return (
    <Section aria-labelledby="portfolio-title">
      <SectionHeading
        as="h2"
        id="portfolio-title"
        eyebrow="Portfolio"
        align="center"
        title="Examples of what we build."
        description="Real projects are added here as they ship. Until then, these sample case studies — clearly marked — show the shape of what we build and how we write it up."
        className="mx-auto"
      />

      <Reveal delay={0.05}>
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              aria-pressed={category.value === activeCategory}
              onClick={() => setActiveCategory(category.value)}
              className={cn(
                'rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors duration-200',
                category.value === activeCategory
                  ? 'border-primary bg-primary text-primary-fg'
                  : 'border-line-strong bg-surface-raised text-fg-muted hover:text-fg',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Keying the whole grid by category makes filtering remount-and-fade cleanly — a
          per-card AnimatePresence exit inside a CSS grid is a known-fragile combination
          (grid track sizing and popLayout's absolute-position exit trick don't mix well). */}
      <m.ul
        key={activeCategory}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project) => (
          <li key={project.slug}>
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
          </li>
        ))}
      </m.ul>
    </Section>
  )
}

// Six factual differentiators — no superlatives, no unverified claims. FeatureCard (not
// ServiceCard) is the right weight here: these aren't clickable service pages, just points
// worth making, so no <to>/"Learn more" affordance.
function WhySection() {
  return (
    <Section tone="muted" aria-labelledby="why-title">
      <SectionHeading
        as="h2"
        id="why-title"
        eyebrow="Why OryanTechsol"
        align="center"
        title="What actually sets us apart."
        className="mx-auto"
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item, index) => (
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

// All three entries are placeholders today (src/data/testimonials.js) — TestimonialCard's
// `placeholder` styling makes that honest rather than dressing bracketed copy up as real
// quotes. Replace an entry there once a real testimonial exists; this section doesn't change.
function TestimonialsSection() {
  return (
    <Section aria-labelledby="testimonials-title">
      <SectionHeading
        as="h2"
        id="testimonials-title"
        eyebrow="Client feedback"
        align="center"
        title="What clients say."
        description="A few words from teams we've worked with."
        className="mx-auto"
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li key={testimonial.id}>
            <Reveal delay={index * 0.06}>
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                jobTitle={testimonial.jobTitle}
                company={testimonial.company}
                logo={testimonial.logo}
                projectType={testimonial.projectType}
                placeholder={testimonial.placeholder}
              />
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
      <LogoMark className="absolute top-1/2 left-1/2 size-[36rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />
    </>
  )
}

// Closing conversion moment. Inverse tone + the same network mark as the hero (subtle, not
// competing with the copy) makes it visually distinct from the light sections above it
// while staying on the same brand language rather than introducing a new visual idea.
function FinalCtaSection() {
  return (
    <Section tone="inverse" background={<FinalCtaBackground />} aria-labelledby="final-cta-title">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-title" className="text-3xl sm:text-4xl lg:text-5xl">
            Have a business problem worth <span className="text-gradient">automating</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell us what you're trying to improve. We'll explore whether a custom website,
            software solution, AI bot or automation system is the right fit.
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

// Remaining home sections (services, proof, industries…) are built in later phases.
export default function Home() {
  return (
    <>
      <Seo />
      <Section
        tone="inverse"
        spacing="hero"
        background={<HeroBackground />}
        aria-labelledby="hero-title"
      >
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <Reveal>
              <Badge className="lg:mx-0">
                <Smartphone className="size-3.5 text-highlight" aria-hidden="true" />
                Apps · AI bots · Custom software
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
                Build smarter. <span className="text-gradient">Automate more.</span> Grow faster.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
                We design and build custom apps, software, websites and AI-powered solutions —
                with AI bots and automation at the core — for growing businesses ready to cut
                manual work and move faster. Every system is shaped around how your team
                actually operates.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Button to={primaryCta.to} size="lg">
                  {primaryCta.label}
                  <ArrowRight aria-hidden="true" />
                </Button>
                <Button href="#services-title" variant="secondary" size="lg">
                  Explore our solutions
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
                {trustIndicators.map((indicator) => (
                  <li key={indicator} className="flex items-center gap-2 text-sm text-fg-muted">
                    <CheckCircle2 className="size-4 shrink-0 text-highlight" aria-hidden="true" />
                    {indicator}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:pl-4">
            <HeroVisual />
          </Reveal>
        </div>
      </Section>

      <ProblemsSection />
      <ServicesSection />
      <AiSection />
      <ProcessSection />
      <IndustriesSection />
      <PortfolioSection />
      <WhySection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  )
}
