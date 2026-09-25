import {
  AppWindow,
  ArrowRight,
  Building2,
  Code2,
  Compass,
  Gauge,
  Globe,
  Hammer,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  Monitor,
  Plug2,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Tablet,
  Users,
  CheckCircle2,
} from 'lucide-react'
import LogoMark from '@/components/brand/LogoMark'
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
  ProcessStepIcon,
  Reveal,
  Section,
  SectionHeading,
  TypeCard,
} from '@/components/ui'
import { primaryCta } from '@/config/site'
import { caseStudies } from '@/data/caseStudies'
import { cn } from '@/lib/cn'

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
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description: 'Understand your business, audience and what the site actually needs to do.',
  },
  {
    number: '02',
    icon: Compass,
    title: 'Plan',
    description: 'Map the structure, content and technical approach before any code is written.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Build',
    description: 'Develop the site around that plan — not a theme customised after the fact.',
  },
  {
    number: '04',
    icon: Plug2,
    title: 'Integrate',
    description: 'Connect the systems the site genuinely needs, scoped to your setup.',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch & Improve',
    description: 'Deploy, monitor real usage and refine the site over time.',
  },
]

const architectureLayers = [
  { icon: Code2, title: 'Frontend', description: 'A modern, component-based interface chosen for the project — not a fixed template engine.' },
  { icon: Plug2, title: 'API & backend', description: 'The application logic and integrations the site actually needs, and nothing more.' },
  { icon: LayoutDashboard, title: 'Data', description: 'A data layer sized to the project — from a simple content store to a full database.' },
  { icon: Globe, title: 'Hosting & deployment', description: 'Modern hosting chosen for reliability and speed, matched to the project.' },
]

const previewServiceCards = [
  { icon: Globe, label: 'Business sites' },
  { icon: ShoppingCart, label: 'E-commerce' },
  { icon: LayoutDashboard, label: 'Dashboards' },
]

const previewStats = [
  ['150+', 'Projects'],
  ['98%', 'Satisfaction'],
  ['24/7', 'Support'],
]

// Shared mini "site preview" shown inside all three device frames below — a scaled-down but
// genuine likeness of this actual site: real logo mark, real nav labels, the real hero badge/
// headline/dual CTAs, real service icons, a stats strip and a footer — so it reads as a full
// page rendered inside the device, not a two-section wireframe. `compact` drops the nav links,
// hero badge/subhead, second CTA and stats strip for the narrow phone frame, where there isn't
// room to keep real copy legible.
function SitePreviewContent({ compact = false }) {
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex shrink-0 items-center justify-between gap-1 border-b border-line bg-surface/95 px-2 py-1.5">
        <div className="flex items-center gap-1">
          <LogoMark boost={3} className="size-3.5" />
          {!compact && (
            <span className="font-display text-[5.5px] font-extrabold tracking-wide text-fg">ORYAN TECHSOL</span>
          )}
        </div>
        {!compact && (
          <div className="hidden gap-2 sm:flex">
            <span className="text-[5px] font-semibold text-fg-muted">Services</span>
            <span className="text-[5px] font-semibold text-fg-muted">Portfolio</span>
            <span className="text-[5px] font-semibold text-fg-muted">About</span>
          </div>
        )}
        <span className="shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-[4.5px] font-bold text-white">
          Contact
        </span>
      </div>

      <div className="relative space-y-1 overflow-hidden bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] px-3 py-3.5">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15 [background-image:radial-gradient(currentColor_0.5px,transparent_0.5px)] [background-size:5px_5px] [color:white]"
        />
        {!compact && (
          <span className="relative inline-block rounded-full bg-white/15 px-1.5 py-0.5 text-[4.5px] font-bold tracking-wide text-white">
            Custom Web Development
          </span>
        )}
        <p className="relative font-display text-[9px] leading-tight font-extrabold text-white">
          Build smarter. <span className="text-highlight">Automate more.</span>
        </p>
        {!compact && <p className="relative text-[5.5px] text-white/70">Custom software, built around your business.</p>}
        <div className="relative mt-1.5 flex gap-1">
          <span className="inline-block rounded-md bg-highlight px-2 py-1 text-[5px] font-bold text-fg">
            Book a Free Consultation
          </span>
          {!compact && (
            <span className="inline-block rounded-md border border-white/30 px-2 py-1 text-[5px] font-bold text-white">
              See what we build
            </span>
          )}
        </div>
      </div>

      <div className={cn('grid gap-1.5 p-2.5', compact ? 'grid-cols-2' : 'grid-cols-3')}>
        {previewServiceCards.slice(0, compact ? 2 : 3).map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-md border border-line bg-surface-overlay p-1.5 text-center shadow-[0_1px_3px_rgb(3_15_45_/_0.12)]"
          >
            <span className="flex size-4 items-center justify-center rounded-md bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
              <Icon className="size-2.5" aria-hidden="true" />
            </span>
            <span className="text-[4.5px] leading-tight font-semibold text-fg">{label}</span>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="flex shrink-0 items-center justify-around border-y border-line bg-surface-overlay/60 px-2 py-1.5">
          {previewStats.map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-[6.5px] font-extrabold text-fg">{value}</p>
              <p className="text-[4px] text-fg-subtle">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex shrink-0 items-center justify-between border-t border-line px-2 py-1.5">
        <div className="flex items-center gap-1">
          <LogoMark boost={3} className="size-2.5" />
          {!compact && <span className="text-[4px] text-fg-subtle">© Oryan Techsol</span>}
        </div>
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-fg-subtle/30" />
          <span className="size-1.5 rounded-full bg-fg-subtle/30" />
          <span className="size-1.5 rounded-full bg-fg-subtle/30" />
        </div>
      </div>
    </div>
  )
}

// Three device chassis, built from tokens rather than images: a monitor (bezel, camera dot,
// neck and a weighted foot), a tablet (uniform bezel, camera dot, side volume keys) and a
// phone (bezel, pill notch, side power/volume keys, home indicator). `--color-fg` doubles as
// the "device chassis" colour — dark navy reads correctly as aluminium/plastic without
// introducing a new grey just for this. Small protruding "buttons" use negative insets so
// they read as sitting on the edge of the chassis rather than floating beside it.
function DesktopFrame({ children, className }) {
  return (
    <div className={cn('w-full', className)}>
      <div className="rounded-lg bg-fg p-2 shadow-card">
        <span className="mx-auto mb-1.5 block size-1 rounded-full bg-surface/25" aria-hidden="true" />
        <div className="h-40 overflow-hidden rounded-[2px] sm:h-44">{children}</div>
      </div>
      <div className="mx-auto h-5 w-2.5 bg-linear-to-b from-fg to-fg/70" aria-hidden="true" />
      <div className="mx-auto h-2 w-2/5 rounded-full bg-fg/90" aria-hidden="true" />
      <div className="mx-auto mt-1 h-1 w-3/5 rounded-full bg-fg/30 blur-[1px]" aria-hidden="true" />
    </div>
  )
}

function TabletFrame({ children, className }) {
  return (
    <div className={cn('relative rounded-[1.75rem] bg-fg p-2.5 shadow-card', className)}>
      <span className="absolute top-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-surface/30" aria-hidden="true" />
      <span className="absolute top-10 -right-px h-4 w-0.5 rounded-full bg-fg/60" aria-hidden="true" />
      <span className="absolute top-16 -right-px h-6 w-0.5 rounded-full bg-fg/60" aria-hidden="true" />
      <div className="h-52 overflow-hidden rounded-[1.1rem] sm:h-60">{children}</div>
      <span className="mx-auto mt-2 block size-2 rounded-full border border-surface/40" aria-hidden="true" />
    </div>
  )
}

function MobileFrame({ children, className }) {
  return (
    <div className={cn('relative rounded-[2rem] bg-fg p-1.5 shadow-card', className)}>
      <span className="absolute top-14 -left-px h-4 w-0.5 rounded-full bg-fg/70" aria-hidden="true" />
      <span className="absolute top-20 -left-px h-7 w-0.5 rounded-full bg-fg/70" aria-hidden="true" />
      <span className="absolute top-16 -right-px h-9 w-0.5 rounded-full bg-fg/70" aria-hidden="true" />
      <div className="relative h-64 overflow-hidden rounded-[1.6rem] sm:h-72">
        <div
          aria-hidden="true"
          className="absolute top-1.5 left-1/2 z-10 h-2.5 w-11 -translate-x-1/2 rounded-full bg-fg"
        />
        {children}
      </div>
      <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-surface/40" aria-hidden="true" />
    </div>
  )
}

const seoPoints = [
  'Clean, semantic HTML that search engines can actually parse',
  'A unique title, meta description and canonical URL on every page',
  'Fast load times — a core Google ranking signal, not an afterthought',
  'A sitemap-friendly structure instead of a single JavaScript blob',
]

const performancePoints = [
  'Minimal JavaScript — only what the page actually needs to run',
  'Optimised images and fonts, not unoptimised uploads',
  'No page-builder or plugin overhead running in the background',
  'Built for strong Core Web Vitals, not just a fast-looking homepage',
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

// The hero visual: a real-looking browser window — actual logo, nav labels, headline and
// CTA copy, real service icons — built from tokens (no stock photo, no screenshot), matching
// the fidelity of the ChatMockup used on the AI bots page rather than a plain wireframe.
function BrowserMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card backdrop-blur-xl">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-overlay px-4 py-3">
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="ml-3 flex h-5 flex-1 items-center rounded-md bg-surface px-2.5 text-[10px] text-fg-subtle">
          oryantechsol.com
        </span>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <LogoMark boost={3} className="size-4" />
            <span className="font-display text-[10px] font-extrabold tracking-wide text-fg">ORYAN TECHSOL</span>
          </div>
          <div className="hidden gap-3 text-[10px] font-semibold text-fg-muted sm:flex">
            <span>Services</span>
            <span>Portfolio</span>
            <span>About</span>
          </div>
        </div>
        <div className="space-y-2 rounded-xl bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] p-4">
          <p className="font-display text-sm leading-snug font-extrabold text-white">
            Build smarter. <span className="text-highlight">Automate more.</span>
          </p>
          <p className="text-[11px] text-white/70">Custom software, built around your business.</p>
          <span className="mt-2 inline-block rounded-lg bg-highlight px-3 py-1.5 text-[11px] font-bold text-fg">
            Book a Free Consultation
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {previewServiceCards.map(({ icon: Icon, label }) => (
            <div key={label} className="space-y-1.5 rounded-lg bg-surface-overlay p-3">
              <span className="flex size-6 items-center justify-center rounded-md bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              <p className="text-[10px] leading-tight font-semibold text-fg">{label}</p>
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
          className="absolute top-7 bottom-7 left-7 w-px bg-linear-to-b from-highlight/40 via-line-strong to-line-strong sm:bottom-auto sm:h-px sm:w-auto sm:inset-x-[var(--line-inset)] sm:bg-linear-to-r"
        />
        {processSteps.map((step, index) => (
          <li key={step.number} className="group relative sm:flex-1">
            <Reveal delay={index * 0.08}>
              <div className="flex gap-5 sm:flex-col sm:items-center sm:gap-4 sm:text-center">
                <ProcessStepIcon icon={step.icon} number={step.number} index={index} total={processSteps.length} />
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
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {architectureLayers.map((layer, index) => (
          <li key={layer.title}>
            <Reveal className="h-full" delay={index * 0.05}>
              <TypeCard icon={layer.icon} title={layer.title} description={layer.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// A conic-gradient "score ring" reading 98/100 — the same visual language as a Lighthouse
// or PageSpeed report, built from CSS rather than an embedded screenshot of a real report
// (which would date the moment any tool changes its UI).
function ScoreRing({ score = 98, label = 'Performance' }) {
  return (
    <div
      className="relative flex size-28 shrink-0 items-center justify-center rounded-full sm:size-32"
      style={{ background: `conic-gradient(var(--color-highlight) ${score * 3.6}deg, var(--color-line) 0deg)` }}
    >
      <div className="flex size-[88%] items-center justify-center rounded-full bg-surface-raised">
        <div className="text-center">
          <p className="font-display text-3xl font-extrabold text-fg">{score}</p>
          <p className="text-[10px] font-semibold tracking-wide text-fg-subtle uppercase">{label}</p>
        </div>
      </div>
    </div>
  )
}

const performanceMetrics = [
  { label: 'First load', value: '<1.2s' },
  { label: 'JS shipped', value: 'Only what runs' },
]

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
          <ul className="mt-8 space-y-3">
            {performancePoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-fg-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
            <ScoreRing />
            <div className="space-y-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-highlight">
                <Gauge className="size-3.5" aria-hidden="true" />
                Typical result on a lean, custom-built page
              </p>
              <dl className="grid grid-cols-2 gap-4 sm:gap-6">
                {performanceMetrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-[11px] tracking-wide text-fg-subtle uppercase">{metric.label}</dt>
                    <dd className="font-display text-sm font-bold text-fg">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
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
      {/* perspective on the row + a rotate on each frame is what sells the "3D" read — flat
          on hover so a visitor can actually look at whichever one they're pointing at. The
          rotate/hover classes live on a plain div INSIDE Reveal, not on Reveal itself — Reveal
          is a framer-motion m.div that sets `transform` inline for its own entrance animation,
          which would silently overwrite (not combine with) a CSS transform class on that same
          element. */}
      <div className="mt-16 flex flex-wrap items-end justify-center gap-x-6 gap-y-12 perspective-distant sm:gap-x-10">
        <Reveal className="w-56 shrink-0 sm:w-64">
          <div className="rotate-y-12 transition-transform duration-500 ease-out hover:rotate-y-0">
            <DesktopFrame>
              <SitePreviewContent />
            </DesktopFrame>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Monitor className="size-4 text-highlight" aria-hidden="true" />
              <span className="font-display text-sm font-semibold text-fg">Desktop</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="w-36 shrink-0 sm:w-40">
          <TabletFrame>
            <SitePreviewContent />
          </TabletFrame>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Tablet className="size-4 text-highlight" aria-hidden="true" />
            <span className="font-display text-sm font-semibold text-fg">Tablet</span>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="w-28 shrink-0 sm:w-32">
          <div className="-rotate-y-12 transition-transform duration-500 ease-out hover:rotate-y-0">
            <MobileFrame>
              <SitePreviewContent compact />
            </MobileFrame>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Smartphone className="size-4 text-highlight" aria-hidden="true" />
              <span className="font-display text-sm font-semibold text-fg">Mobile</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

// A search-results ("SERP") preview built from tokens — a search bar plus one realistic
// result entry — so "SEO-friendly" is shown as the thing it actually produces (a real,
// well-formed listing), not illustrated with a generic magnifying-glass icon.
function SerpPreviewCard() {
  return (
    <Card surface="solid" data-tone="inverse" className="overflow-hidden p-0">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <Search className="size-3.5 shrink-0 text-fg-subtle" aria-hidden="true" />
        <span className="truncate text-xs text-fg-muted">custom web development company</span>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <Globe className="size-3" aria-hidden="true" />
            oryantechsol.com › web-development
          </p>
          <p className="font-display text-base font-semibold text-highlight">
            Custom Web Development Services | Oryan Techsol
          </p>
          <p className="text-sm leading-relaxed text-fg-muted">
            We design and build business websites, web applications and customer portals
            shaped around how your business actually operates — not a page-builder template.
          </p>
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 pt-4">
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-highlight/15 text-highlight">
            <CheckCircle2 className="size-4" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold text-fg">Earned by clean structure, not tricks</span>
        </div>
      </div>
    </Card>
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
          <ul className="mt-8 space-y-3">
            {seoPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-fg-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <SerpPreviewCard />
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
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-3">
        {securityPoints.map((point, index) => (
          <li key={point.title}>
            <Reveal className="h-full" delay={index * 0.06}>
              <TypeCard icon={point.icon} title={point.title} description={point.description} />
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
