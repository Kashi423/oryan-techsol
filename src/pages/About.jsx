import { Blocks, Layers, Network, Sparkles, Target, Users } from 'lucide-react'
import Seo from '@/components/seo/Seo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { Badge, Button, FeatureCard, Reveal, Section, SectionHeading } from '@/components/ui'
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

function HeroSection() {
  return (
    <Section tone="inverse" spacing="hero" background={<HeroBackground />} aria-labelledby="hero-title">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Badge className="mx-auto">About {siteConfig.name}</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Technology built around <span className="text-gradient">how you work</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            {siteConfig.description}
          </p>
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
