import {
  ArrowRight,
  Blocks,
  Bot,
  Code2,
  Compass,
  Hammer,
  Layers,
  LifeBuoy,
  Network,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react'
import LogoMark from '@/components/brand/LogoMark'
import Seo from '@/components/seo/Seo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { Badge, Button, Reveal, Section, SectionHeading, TypeCard } from '@/components/ui'
import { primaryCta, siteConfig } from '@/config/site'

const pageDescription =
  'Oryan Techsol builds technology around how your business actually works — apps, software, websites, AI bots and automation, not one-size-fits-all templates.'

// Same six differentiators as the homepage's "Why OryanTechsol" section — kept in sync by
// hand rather than a shared module, since this file is the only other place they appear.
const differentiators = [
  { icon: Blocks, title: 'Custom-Built', description: 'Solutions designed around your business.' },
  { icon: Sparkles, title: 'AI-First Thinking', description: 'Use AI where it genuinely improves the workflow.' },
  { icon: Target, title: 'Business-Focused', description: 'Technology designed around practical business needs.' },
  { icon: Layers, title: 'Scalable Architecture', description: 'Solutions built with future growth in mind.' },
  { icon: Network, title: 'Connected Systems', description: 'Integrate websites, software, APIs and business tools.' },
  { icon: Users, title: 'Human Collaboration', description: 'Work closely with clients from discovery through deployment.' },
]

function HeroBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0" />
      <div className="bg-glow absolute top-0 left-1/2 h-[36rem] w-[60rem] max-w-none -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}

// What we build, shown in the hero's profile card — the same six services as the header's
// Services menu.
const profileServices = [
  { icon: Smartphone, label: 'Mobile apps' },
  { icon: Bot, label: 'AI bots' },
  { icon: Code2, label: 'Websites' },
  { icon: Layers, label: 'Software' },
  { icon: Workflow, label: 'Automation' },
  { icon: ShoppingCart, label: 'E-commerce' },
]

const profileApproach = [
  { icon: Compass, label: 'Discover' },
  { icon: Hammer, label: 'Build' },
  { icon: LifeBuoy, label: 'Support' },
]

// The hero visual: a company profile card — the real mark, the brand pillars from the logo,
// what we build and how we work — built from tokens, in the same family as the browser,
// phone, chat and dashboard mockups on the service pages. No invented stats or client counts.
function ProfileMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface-raised p-5 shadow-card backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-overlay">
          <LogoMark boost={3} className="size-8" />
        </span>
        <div>
          <p className="font-display text-sm font-extrabold tracking-wide text-fg">ORYAN TECHSOL</p>
          <p className="text-[11px] font-semibold tracking-wide text-highlight">{siteConfig.pillars.join(' · ')}</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-surface-overlay p-3">
        <p className="px-1 text-[11px] font-semibold text-fg">What we build</p>
        <ul className="mt-2.5 grid grid-cols-3 gap-2">
          {profileServices.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-1.5 rounded-lg bg-surface-raised px-1 py-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-[10px] font-semibold text-fg">{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-overlay px-3 py-2.5">
        <p className="text-[11px] font-semibold text-fg">How we work</p>
        <ol className="flex items-center gap-1.5">
          {profileApproach.map(({ icon: Icon, label }, index) => (
            <li key={label} className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-full bg-highlight/10 px-2 py-1 text-[10px] font-semibold text-highlight">
                <Icon className="size-3" aria-hidden="true" />
                {label}
              </span>
              {index < profileApproach.length - 1 && <ArrowRight className="size-3 text-fg-subtle" aria-hidden="true" />}
            </li>
          ))}
        </ol>
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
              <Users className="size-3.5 text-highlight" aria-hidden="true" />
              About {siteConfig.name}
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Technology built around <span className="text-gradient">how you work</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              {siteConfig.description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button to={primaryCta.to} size="lg">
                {primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button href="#why-title" variant="secondary" size="lg">
                What sets us apart
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ProfileMockup />
        </Reveal>
      </div>
    </Section>
  )
}

function ApproachSection() {
  return (
    <Section aria-labelledby="approach-title">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          as="h2"
          id="approach-title"
          eyebrow="Our approach"
          title="Custom-built, not off the shelf."
          description="We don't sell templates or fixed packages. Every project starts with understanding how a business actually operates, then designing and building the specific website, software, AI system or automation that fits — not a generic version of it."
          align="center"
          className="mx-auto"
        />
      </div>
    </Section>
  )
}

function DifferentiatorsSection() {
  return (
    <Section tone="muted" aria-labelledby="why-title">
      <SectionHeading
        as="h2"
        id="why-title"
        eyebrow="What we stand for"
        align="center"
        title="What actually sets us apart."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item, index) => (
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

function FinalCtaSection() {
  return (
    <Section tone="inverse" aria-labelledby="final-cta-title">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-title" className="text-2xl sm:text-3xl">
            Want to work with us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Tell us about your project — we'll take it from there.
          </p>
          <Button to={primaryCta.to} size="lg" className="mt-8">
            {primaryCta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

export default function About() {
  return (
    <>
      <Seo title="About" description={pageDescription} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
      <HeroSection />
      <ApproachSection />
      <DifferentiatorsSection />
      <FinalCtaSection />
    </>
  )
}
