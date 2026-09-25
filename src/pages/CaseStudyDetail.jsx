import { FlaskConical } from 'lucide-react'
import { useParams } from 'react-router'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Seo from '@/components/seo/Seo'
import { Button, Card, Reveal, Section, SectionHeading, Tag } from '@/components/ui'
import { categories, getCaseStudyBySlug } from '@/data/caseStudies'
import { primaryCta } from '@/config/site'
import NotFound from './NotFound'

// A real heading (not a styled paragraph) — these are genuine sub-sections of the page
// (Problem/Solution/Technology/Result), so they belong in the h1→h2 outline, not just
// styled to look like one.
function Label({ children }) {
  return (
    <h2 className="font-display text-xs font-bold tracking-[0.2em] text-highlight uppercase">{children}</h2>
  )
}

// /portfolio/:slug — looks the project up in the shared caseStudies data (the same source
// the homepage preview grid reads), so a project only has to be written once.
export default function CaseStudyDetail() {
  const { slug } = useParams()
  const project = getCaseStudyBySlug(slug)

  if (!project) return <NotFound />

  const categoryLabel = categories.find((category) => category.value === project.category)?.label ?? project.category

  return (
    <>
      <Seo
        title={project.title}
        description={`${project.solutionType} for ${project.industry}: ${project.problem}`}
        noindex={project.placeholder}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ]}
      />

      <Section spacing="hero">
        {project.placeholder && (
          <Reveal>
            <div className="mx-auto mb-10 flex max-w-2xl items-start gap-3 rounded-2xl border border-line-strong bg-surface-muted p-4">
              <FlaskConical className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-fg-muted">
                <strong className="font-display font-bold text-fg">Sample project.</strong> This case study is a
                placeholder showing the kind of work we do — not a real client or result. It will be replaced with
                a verified project write-up.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <SectionHeading
            as="h1"
            align="center"
            eyebrow={`${categoryLabel} · ${project.industry}`}
            title={project.title}
            description={project.solutionType}
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            aria-hidden="true"
            className="mx-auto mt-10 aspect-video max-w-4xl rounded-2xl bg-linear-to-br from-brand-900 via-brand-700 to-accent-500"
          />
        </Reveal>
      </Section>

      <Section tone="muted">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <Label>Problem</Label>
              <p className="mt-3 leading-relaxed text-fg-muted">{project.problem}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="h-full">
              <Label>Solution</Label>
              <p className="mt-3 leading-relaxed text-fg-muted">{project.solution}</p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <Label>Technology</Label>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technology.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 border-t border-line pt-10">
              <Label>Result</Label>
              <p
                className={
                  project.placeholder
                    ? 'mt-3 text-sm text-fg-subtle italic'
                    : 'mt-3 font-display text-2xl font-bold text-fg'
                }
              >
                {project.result}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="inverse">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 className="text-2xl sm:text-3xl">
              Have a project like this in mind?
            </h2>
            <Button to={primaryCta.to} size="lg">
              {primaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
