import { ArrowRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import Seo from '@/components/seo/Seo'
import ServiceSchema from '@/components/seo/ServiceSchema'
import ProjectCover from '@/components/portfolio/ProjectCover'
import { Accordion, Button, Card, Reveal, Section, SectionHeading } from '@/components/ui'
import { primaryCta } from '@/config/site'
import { getSolution, solutions } from '@/data/solutions'
import NotFound from './NotFound'

// /solutions/:slug: a search landing page for one kind of system we have really built.
// Content lives in src/data/solutions.js.
export default function Solution() {
  const { slug } = useParams()
  const page = getSolution(slug)
  if (!page) return <NotFound />
  const others = solutions.filter((s) => s.slug !== page.slug)
  const path = `/solutions/${page.slug}`

  return (
    <>
      <Seo title={page.seoTitle} description={page.description} />
      <ServiceSchema name={page.seoTitle} description={page.description} path={path} />
      <FaqSchema faqs={page.faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: page.seoTitle, path }]} />

      <Section tone="inverse" spacing="hero" aria-labelledby="solution-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="font-display text-xs font-bold tracking-[0.2em] text-highlight uppercase">{page.eyebrow}</p>
              <h1 id="solution-title" className="mt-4 text-4xl sm:text-5xl">
                {page.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted">{page.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to={primaryCta.to} size="lg">
                  {primaryCta.label}
                  <ArrowRight aria-hidden="true" />
                </Button>
                <Button to={`/portfolio/${page.project}`} variant="secondary" size="lg">
                  See the project we built
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-card">
              <ProjectCover slug={page.project} title={page.eyebrow} className="aspect-16/10 w-full" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="modules-title">
        <SectionHeading
          align="center"
          eyebrow="What it covers"
          title="Built around the work you do every day"
          id="modules-title"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
          {page.modules.map((mod, i) => (
            <Reveal key={mod.title} delay={Math.min(i, 4) * 0.04}>
              <Card className="h-full">
                <h3 className="font-display text-lg font-bold text-fg">{mod.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{mod.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted" aria-labelledby="audience-title">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 id="audience-title" className="text-2xl sm:text-3xl">
              Who it is for
            </h2>
          </Reveal>
          <ul className="mt-6 space-y-3">
            {page.audience.map((item) => (
              <li key={item} className="flex items-start gap-3 text-fg-muted">
                <Check className="mt-1 size-5 shrink-0 text-highlight" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-fg-muted">
            This page is based on a system we have built:{' '}
            <Link to={`/portfolio/${page.project}`} className="font-semibold text-highlight hover:underline">
              read the case study
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 id="faq-title" className="text-2xl sm:text-3xl">
              Questions
            </h2>
          </Reveal>
          <div className="mt-8">
            <Accordion items={page.faqs} />
          </div>
        </div>
      </Section>

      <Section tone="inverse">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 className="text-2xl sm:text-3xl">Talk to us about your {page.eyebrow.toLowerCase()}</h2>
            <p className="text-fg-muted">The first conversation is a free consultation.</p>
            <Button to={primaryCta.to} size="lg">
              {primaryCta.label}
            </Button>
            <p className="text-sm text-fg-subtle">
              Also see:{' '}
              {others.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 && ' · '}
                  <Link to={`/solutions/${o.slug}`} className="hover:text-fg">
                    {o.eyebrow}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
