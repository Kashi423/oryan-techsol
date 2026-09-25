import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import Card from './Card'

// Larger card for a primary service grid (4 services on Home/Services): icon, title,
// description, a short capability list, and a link. For smaller/denser grids (e.g. a
// "why us" row), use the lighter <FeatureCard> instead.
export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  to,
  linkLabel = 'Explore',
  className,
}) {
  return (
    <Card interactive={Boolean(to)} className={cn('group flex h-full flex-col', className)}>
      <span className="mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-highlight/10 text-highlight ring-1 ring-highlight/20">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="text-xl">
        {to ? (
          <Link to={to} className="after:absolute after:inset-0 after:rounded-2xl">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="mt-3 leading-relaxed text-fg-muted">{description}</p>
      {features?.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-line pt-5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-fg-muted">
              <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-highlight" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      {to && (
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1 pt-6 font-display text-sm font-semibold text-highlight"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      )}
    </Card>
  )
}
