import { ArrowRight, Bot } from 'lucide-react'
import LogoMark from '@/components/brand/LogoMark'
import Seo from '@/components/seo/Seo'
import { Badge, Button, Reveal, Section } from '@/components/ui'
import { primaryCta } from '@/config/site'

function HeroBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0" />
      <div className="bg-glow absolute top-0 left-1/2 h-[36rem] w-[60rem] max-w-none -translate-x-1/2 -translate-y-1/2" />
      <LogoMark className="absolute top-1/2 left-1/2 size-[44rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.14] lg:left-[92%] lg:opacity-40" />
    </>
  )
}

// Phase 1 landing: hero only. The remaining home sections are built in the pages phase.
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
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Badge>
              <Bot className="size-3.5 text-highlight" aria-hidden="true" />
              AI bots · Business automation · Custom software
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Building intelligent <span className="text-gradient">digital solutions</span> that drive
              growth.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
              We design, develop and deliver custom software, web platforms, AI bots and business
              automation that help you streamline operations, enhance user experiences and scale with
              confidence.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to={primaryCta.to} size="lg">
                {primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button to="/ai-automation" variant="secondary" size="lg">
                Explore AI &amp; automation
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
