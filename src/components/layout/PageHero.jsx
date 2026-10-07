import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router'
import { Badge, Reveal, Section } from '@/components/ui'
import { cn } from '@/lib/cn'

const hexPoints = '50,2 96,26 96,74 50,98 4,74 4,26'

// Brand-echo backdrop: the engineering grid + glow used on the main heroes, plus a pair of
// outlined hexagons (the same shape as the team portraits) bleeding off the right edge.
function HeroBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0" />
      <div className="bg-glow absolute top-0 left-1/4 h-[30rem] w-[52rem] max-w-none -translate-x-1/2 -translate-y-1/3" />
      <div className="bg-glow absolute right-0 bottom-0 h-[26rem] w-[36rem] max-w-none translate-x-1/3 translate-y-1/3 opacity-70" />
      <svg
        viewBox="0 0 100 100"
        className="absolute top-1/2 -right-24 hidden size-[34rem] -translate-y-1/2 text-highlight lg:block"
        fill="none"
        aria-hidden="true"
      >
        <polygon points={hexPoints} stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.4" />
        <polygon
          points={hexPoints}
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="0.4"
          transform="translate(50 50) scale(0.74) translate(-50 -50)"
        />
        <polygon
          points={hexPoints}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="0.4"
          transform="translate(50 50) scale(0.48) translate(-50 -50)"
        />
      </svg>
    </>
  )
}

// Visible breadcrumb trail (also mirrored by BreadcrumbSchema on each page) — gives crawlers
// and visitors the same site-hierarchy signal.
function Breadcrumbs({ crumbs, centered }) {
  return (
    <nav aria-label="Breadcrumb" className={cn(centered && 'flex justify-center')}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-fg-subtle">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="inline-flex items-center gap-1 transition-colors hover:text-fg">
            <Home className="size-3.5" aria-hidden="true" />
            Home
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1
          return (
            <li key={crumb.name} className="flex min-w-0 items-center gap-1.5">
              <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
              {last || !crumb.to ? (
                <span aria-current={last ? 'page' : undefined} className="truncate text-fg-muted">
                  {crumb.name}
                </span>
              ) : (
                <Link to={crumb.to} className="transition-colors hover:text-fg">
                  {crumb.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Shared hero for content pages (blog, article, FAQ, legal). Dark brand surface, breadcrumb
// trail, eyebrow badge, an h1 with one gradient phrase, an intro, meta chips and an optional
// right-hand visual. `align="center"` for short pages; `size="md"` for long article titles.
export default function PageHero({
  eyebrow,
  icon: Icon,
  title,
  accent,
  description,
  crumbs = [],
  meta = [],
  actions,
  aside,
  align = 'left',
  size = 'lg',
  titleId = 'hero-title',
}) {
  const centered = align === 'center'
  const sizeClass =
    size === 'md' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-6xl'

  return (
    <Section tone="inverse" spacing="page" background={<HeroBackground />} aria-labelledby={titleId}>
      <div className={cn(aside && 'grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]')}>
        <div className={cn(centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')}>
          {crumbs.length > 0 && (
            <Reveal>
              <Breadcrumbs crumbs={crumbs} centered={centered} />
            </Reveal>
          )}
          {eyebrow && (
            <Reveal delay={0.03}>
              <Badge className={cn('mt-6', centered && 'mx-auto')}>
                {Icon && <Icon className="size-3.5 text-highlight" aria-hidden="true" />}
                {eyebrow}
              </Badge>
            </Reveal>
          )}
          <Reveal delay={0.06}>
            <h1 id={titleId} className={cn('mt-5', sizeClass)}>
              {title}
              {accent && (
                <>
                  {' '}
                  <span className="text-gradient">{accent}</span>
                </>
              )}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.1}>
              <p
                className={cn(
                  'mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted',
                  centered && 'mx-auto',
                )}
              >
                {description}
              </p>
            </Reveal>
          )}
          {meta.length > 0 && (
            <Reveal delay={0.14}>
              <ul className={cn('mt-6 flex flex-wrap gap-2', centered && 'justify-center')}>
                {meta.map(({ icon: MetaIcon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-raised px-3 py-1.5 text-xs font-semibold text-fg-muted"
                  >
                    {MetaIcon && <MetaIcon className="size-3.5 text-highlight" aria-hidden="true" />}
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.18}>
              <div className={cn('mt-8 flex flex-wrap gap-3', centered && 'justify-center')}>{actions}</div>
            </Reveal>
          )}
        </div>
        {aside && <Reveal delay={0.12}>{aside}</Reveal>}
      </div>
    </Section>
  )
}
