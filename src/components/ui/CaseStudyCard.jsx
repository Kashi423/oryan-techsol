import { ArrowUpRight, FlaskConical } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import Card from './Card'
import Tag from './Tag'

// Thumbnail is a brand-gradient panel — no stock imagery needed until real project shots
// exist; swap in an <img> there once they do.
//
// `placeholder` marks a project with no real client/result yet (see src/data/caseStudies.js):
// it swaps the headline stat for a plain "Sample project" badge instead of dressing up
// placeholder copy as a real metric, and `result` (if given) renders as a small muted line
// rather than the bold stat treatment reserved for verified numbers.
export default function CaseStudyCard({
  title,
  industry,
  solutionType,
  description,
  result,
  tags = [],
  to,
  placeholder = false,
  className,
}) {
  return (
    <Card
      as="article"
      interactive={Boolean(to)}
      padding="none"
      className={cn('group flex h-full flex-col overflow-hidden', className)}
    >
      <div className="flex aspect-4/3 items-end bg-linear-to-br from-brand-900 via-brand-700 to-accent-500 p-6">
        {placeholder ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 font-display text-xs font-semibold text-white backdrop-blur-sm">
            <FlaskConical className="size-3.5" aria-hidden="true" />
            Sample project
          </span>
        ) : (
          result && <p className="font-display text-3xl font-extrabold text-white">{result}</p>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {(industry || solutionType) && (
          <p className="font-display text-xs font-bold tracking-[0.15em] text-highlight uppercase">
            {[industry, solutionType].filter(Boolean).join(' · ')}
          </p>
        )}
        <h3 className="mt-2 text-lg">
          {to ? (
            <Link to={to} className="after:absolute after:inset-0">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {description && <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
        {placeholder && result && <p className="mt-4 text-xs text-fg-subtle italic">{result}</p>}
        {to && (
          <span
            aria-hidden="true"
            className="mt-auto inline-flex items-center gap-1 pt-5 font-display text-sm font-semibold text-highlight"
          >
            View case study
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </Card>
  )
}
