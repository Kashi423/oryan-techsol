import { useState } from 'react'
import { m } from 'framer-motion'
import Seo from '@/components/seo/Seo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { Badge, CaseStudyCard, Reveal, Section } from '@/components/ui'
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

function HeroSection() {
  return (
    <Section tone="inverse" spacing="hero" background={<HeroBackground />} aria-labelledby="hero-title">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Badge className="mx-auto">Portfolio</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Examples of what we <span className="text-gradient">build</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            Real projects are added here as they ship. Until then, these sample case
            studies — clearly marked — show the shape of what we build and how we write it up.
          </p>
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
                  : 'border-line-strong bg-surface-raised text-fg-muted hover:text-fg',
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
