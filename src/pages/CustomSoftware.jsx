import {
  AlertTriangle,
  AppWindow,
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Code2,
  Layers,
  LayoutDashboard,
  ListChecks,
  Plug2,
  Repeat,
  Rocket,
  Table2,
  TrendingUp,
  Unplug,
  UserRound,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { Fragment } from 'react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import Seo from '@/components/seo/Seo'
import {
  Accordion,
  Badge,
  Button,
  Card,
  CaseStudyCard,
  PulseRing,
  Reveal,
  Section,
  SectionHeading,
  TypeCard,
} from '@/components/ui'
import { primaryCta } from '@/config/site'
import { caseStudies } from '@/data/caseStudies'

const pageDescription =
  'Custom CRMs, dashboards, portals and internal tools that replace spreadsheets, disconnected apps and repetitive manual work.'

const buildTypes = [
  { icon: Users, title: 'CRM systems', description: 'Track customers, deals and communication in one place built for your process.' },
  { icon: LayoutDashboard, title: 'Admin dashboards', description: 'A single view of the data your team checks every day.' },
  { icon: Building2, title: 'Internal business portals', description: 'A shared home for the tools and information your team needs.' },
  { icon: Boxes, title: 'Inventory systems', description: 'Track stock levels and movement without a spreadsheet falling out of sync.' },
  { icon: CalendarCheck, title: 'Booking systems', description: 'Scheduling built around how your business actually takes bookings.' },
  { icon: ListChecks, title: 'Management systems', description: 'Purpose-built tools for managing projects, staff or operations.' },
  { icon: BarChart3, title: 'Reporting dashboards', description: 'Live reporting from your real data, not a manually updated deck.' },
  { icon: Workflow, title: 'Workflow platforms', description: 'Software that moves work through your process automatically.' },
  { icon: UserRound, title: 'Customer portals', description: 'A logged-in space where customers manage their account or orders.' },
  { icon: AppWindow, title: 'Business-specific applications', description: "Anything that doesn't fit an off-the-shelf tool, built to fit yours." },
]

const replacements = [
  {
    icon: Table2,
    title: 'Spreadsheets',
    description: 'that need manual updates and break when someone edits the wrong cell.',
  },
  {
    icon: Unplug,
    title: 'Disconnected tools',
    description: "that don't talk to each other, so the same data gets entered twice.",
  },
  {
    icon: Repeat,
    title: 'Repetitive manual processes',
    description: 'that take up time your team could spend on real work.',
  },
]

const flowSteps = [
  { icon: AlertTriangle, label: 'Business Problem' },
  { icon: ClipboardList, label: 'Requirements' },
  { icon: Layers, label: 'Software Architecture' },
  { icon: Code2, label: 'Development' },
  { icon: Plug2, label: 'Integration' },
  { icon: Rocket, label: 'Deployment' },
]

const faqs = [
  {
    question: 'Do you build on an existing platform or from scratch?',
    answer:
      "Whichever actually fits the project — sometimes a well-chosen foundation is the right call, sometimes it isn't. That decision is made during planning, not assumed up front.",
  },
  {
    question: 'How long does a custom software project take?',
    answer:
      "It depends on scope — a focused internal tool moves faster than a full multi-user platform. We'll give you a realistic timeline after discovery, not before.",
  },
  {
    question: 'Can the software replace our spreadsheets entirely?',
    answer: 'In most cases, yes — including migrating the data you already have. The exact scope is confirmed during discovery.',
  },
  {
    question: 'Will you connect it to our other systems?',
    answer:
      'Where that’s a genuine requirement, yes. The specific systems depend on what your business already uses and are scoped during discovery, not promised in advance.',
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes — software is monitored and maintained after launch rather than handed off as a one-off build.',
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

const dashboardStats = [
  { icon: TrendingUp, label: 'Revenue', value: '$48.2k' },
  { icon: Users, label: 'Active users', value: '1,284' },
  { icon: Zap, label: 'Automated', value: '312' },
]

const dashboardActivity = [
  { icon: CheckCircle2, label: 'New order received', meta: 'Just now' },
  { icon: ClipboardList, label: 'Invoice generated', meta: '2m ago' },
  { icon: Users, label: 'Customer record synced', meta: '5m ago' },
  { icon: Plug2, label: 'CRM integration ran', meta: '12m ago' },
]

// The hero visual: a real-looking internal dashboard — named stat tiles with icons and
// values, a live-status indicator and a labelled activity feed — a diagram of "an internal
// tool" built from tokens (no stock photo), distinct from the browser-chrome mockup used on
// the web-development page.
function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface-raised p-5 shadow-card backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-fg">Operations Dashboard</p>
        <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
          <span className="relative flex size-1.5">
            <span className="motion-safe:absolute motion-safe:inline-flex motion-safe:size-full motion-safe:animate-ping motion-safe:rounded-full motion-safe:bg-success/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          Live
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {dashboardStats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="space-y-2 rounded-lg bg-surface-overlay p-3">
            <Icon className="size-4 text-highlight" aria-hidden="true" />
            <div>
              <p className="font-display text-sm font-extrabold text-fg">{value}</p>
              <p className="text-[10px] leading-tight text-fg-subtle">{label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1 rounded-xl bg-surface-overlay p-3">
        {dashboardActivity.map(({ icon: Icon, label, meta }) => (
          <div key={label} className="flex items-center gap-3 rounded-lg px-1 py-1.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-highlight/10 text-highlight">
              <Icon className="size-3.5" aria-hidden="true" />
            </span>
            <p className="flex-1 truncate text-xs font-medium text-fg">{label}</p>
            <p className="shrink-0 text-[10px] text-fg-subtle">{meta}</p>
          </div>
        ))}
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
              <Layers className="size-3.5 text-highlight" aria-hidden="true" />
              Custom Software Development
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Software built for <span className="text-gradient">how your business actually runs</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              We design and build the CRMs, dashboards, portals and internal tools that
              replace spreadsheets, disconnected apps and repetitive manual work — shaped
              around how your business actually operates.
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
          <DashboardMockup />
        </Reveal>
      </div>
    </Section>
  )
}

// Danger-tinted "problem" card — reuses Home's <ProblemTile> grammar (muted danger icon,
// coloured left edge, no lift/hover-highlight since this names a pain point rather than
// something to click) rather than a plain bordered box, so what's being replaced reads as
// the problem half of the page's problem→solution structure, not just another feature card.
// A small crossed-out mark in the corner reinforces "this goes away" at a glance.
function ReplaceCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Card padding="none" className="group relative h-full overflow-hidden py-6 pr-6 pl-7 transition-colors duration-200 hover:bg-surface-muted">
        <span aria-hidden="true" className="absolute inset-y-4 left-0 w-1 rounded-full bg-danger/25" />
        <span aria-hidden="true" className="absolute top-4 right-4 text-danger/30">
          <X className="size-4" />
        </span>
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-danger/8 text-danger/70 transition-transform duration-200 group-hover:scale-110">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-5 font-display text-lg font-bold text-fg">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
      </Card>
    </Reveal>
  )
}

function ReplaceSection() {
  return (
    <Section aria-labelledby="replace-title">
      <SectionHeading
        as="h2"
        id="replace-title"
        eyebrow="Why custom software"
        align="center"
        title="Replace the manual work with a system built for it."
        description="Most businesses aren't short on effort — they're held back by the tools they're using. Custom software replaces the workarounds with something built for how you actually operate."
        className="mx-auto"
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {replacements.map((item, index) => (
          <li key={item.title}>
            <ReplaceCard icon={item.icon} title={item.title} description={item.description} delay={index * 0.06} />
          </li>
        ))}
      </ul>
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
        title="Whatever your business actually needs to run on."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {buildTypes.map((type, index) => (
          <li key={type.title}>
            <Reveal className="h-full" delay={index * 0.03}>
              <TypeCard icon={type.icon} title={type.title} description={type.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

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

function FlowSection() {
  return (
    <Section aria-labelledby="flow-title">
      <SectionHeading
        as="h2"
        id="flow-title"
        eyebrow="How a project comes together"
        align="center"
        title="From the problem to a deployed system."
        className="mx-auto"
      />
      <Reveal delay={0.05}>
        <div className="mt-16 flex flex-col items-stretch gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
          {flowSteps.map((step, index) => (
            <Fragment key={step.label}>
              <FlowStep icon={step.icon} label={step.label} index={index} total={flowSteps.length} />
              {index < flowSteps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="flex h-8 shrink-0 items-center justify-center text-fg-subtle sm:h-auto sm:w-12"
                >
                  <ArrowRight className="hidden size-5 sm:block" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

function PortfolioSection() {
  const softwareProjects = caseStudies.filter((project) => project.category === 'software')
  return (
    <Section tone="muted" aria-labelledby="portfolio-title">
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
        {softwareProjects.map((project, index) => (
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
    <Section aria-labelledby="faq-title">
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
            Let's replace the manual work with <span className="text-gradient">something built for you</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell us what's slowing your team down — we'll figure out whether custom software
            is the right fix before we build anything.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/contact" size="lg">
              Discuss your software project
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button to={primaryCta.to} variant="secondary" size="lg">
              {primaryCta.label}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default function CustomSoftware() {
  return (
    <>
      <Seo title="Custom Software Development" description={pageDescription} />
      <ServiceSchema name="Custom Software Development" description={pageDescription} path="/custom-software" />
      <BreadcrumbSchema
        items={[{ name: 'Home', path: '/' }, { name: 'Custom Software Development', path: '/custom-software' }]}
      />
      <FaqSchema faqs={faqs} />
      <HeroSection />
      <ReplaceSection />
      <WhatWeBuildSection />
      <FlowSection />
      <PortfolioSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
