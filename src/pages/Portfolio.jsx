import { useState } from 'react'
import { m } from 'framer-motion'
import { ArrowRight, Bot, Code2, FolderKanban, Layers, Workflow } from 'lucide-react'
import Seo from '@/components/seo/Seo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { Badge, Button, CaseStudyCard, Reveal, Section } from '@/components/ui'
import { primaryCta } from '@/config/site'
import { caseStudies, categories } from '@/data/caseStudies'
import { cn } from '@/lib/cn'

function HeroBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0" />
      <div className="bg-glow absolute top-0 left-1/2 h-[36rem] w-[60rem] max-w-none -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}

const categoryIcons = { ai: Bot, web: Code2, software: Layers, automation: Workflow }

// The hero visual: a project library built from the real case-study entries (first three),
// including their "Sample" flag — so the hero never shows a project the grid below doesn't.
// Same family as the browser, phone, chat and dashboard mockups on the service pages.
function ProjectLibraryMockup() {
  const featured = caseStudies.slice(0, 3)
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface-raised p-5 shadow-card backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-sm font-bold text-fg">Project library</p>
        <div className="flex gap-1">
          {categories.slice(0, 4).map((category, index) => (
            <span
              key={category.value}
              className={
                index === 0
                  ? 'rounded-full bg-highlight/15 px-2 py-0.5 text-[10px] font-semibold text-highlight'
                  : 'rounded-full px-2 py-0.5 text-[10px] font-medium text-fg-subtle'
              }
            >
              {category.label}
            </span>
          ))}
        </div>
      </div>
      <ul className="mt-4 space-y-2.5">
        {featured.map((study) => {
          const Icon = categoryIcons[study.category] ?? Layers
          return (
            <li key={study.slug} className="flex items-start gap-3 rounded-xl bg-surface-overlay p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-semibold text-fg">{study.title}</p>
                  {study.placeholder && (
                    <span className="shrink-0 rounded bg-surface-raised px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-fg-subtle uppercase">
                      Sample
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[10px] text-fg-subtle">
                  {study.industry} · {study.solutionType}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {study.technology.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-md bg-highlight/10 px-1.5 py-0.5 text-[9px] font-semibold text-highlight">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 rounded-xl bg-surface-overlay px-3 py-2.5 text-[11px] text-fg-muted">
        {caseStudies.length} case studies · real projects added as they ship
      </p>
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
              <FolderKanban className="size-3.5 text-highlight" aria-hidden="true" />
              Portfolio
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Examples of what we <span className="text-gradient">build</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              Real projects are added here as they ship. Until then, these sample case
              studies — clearly marked — show the shape of what we build and how we write it up.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button href="#grid-title" size="lg">
                Browse projects
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button to={primaryCta.to} variant="secondary" size="lg">
                {primaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ProjectLibraryMockup />
        </Reveal>
      </div>
    </Section>
  )
}

// Same filterable-grid pattern as the homepage preview, over the same data source, so a
// project is written once (src/data/caseStudies.js) and appears in both places identically.
function GridSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const visible =
    activeCategory === 'all' ? caseStudies : caseStudies.filter((project) => project.category === activeCategory)

  return (
    <Section aria-labelledby="grid-title">
      <h2 id="grid-title" className="sr-only">
        All case studies
      </h2>

      <Reveal>
        <div className="flex flex-wrap justify-center gap-2">
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
                  : 'border-line-strong bg-surface-raised text-fg-muted hover:border-highlight/50 hover:text-fg',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </Reveal>

      <m.ul
        key={activeCategory}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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

      {visible.length === 0 && (
        <p className="mt-10 text-center text-fg-subtle">No projects in this category yet.</p>
      )}
    </Section>
  )
}

export default function Portfolio() {
  return (
    <>
      <Seo
        title="Portfolio"
        description="Case studies across AI bots, web development, custom software and business automation."
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }]} />
      <HeroSection />
      <GridSection />
    </>
  )
}
