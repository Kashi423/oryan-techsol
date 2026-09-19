import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import Card from './Card'

// Icon + title + description. With `to`, the whole card becomes clickable through a
// stretched link on the title (one focus stop, correct accessible name).
export default function FeatureCard({
  icon: Icon,
  title,
  description,
  to,
  linkLabel = 'Learn more',
  className,
}) {
  return (
    <Card interactive={Boolean(to)} className={cn('group flex h-full flex-col', className)}>
      <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-highlight/10 text-highlight ring-1 ring-highlight/20">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-lg">
        {to ? (
          <Link to={to} className="after:absolute after:inset-0 after:rounded-2xl">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="mt-2 leading-relaxed text-fg-muted">{description}</p>
      {to && (
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1 pt-5 font-display text-sm font-semibold text-highlight"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      )}
    </Card>
  )
}
