import { Quote, UserRound } from 'lucide-react'
import { cn } from '@/lib/cn'
import Card from './Card'
import Tag from './Tag'

// Initials avatar instead of a headshot — keeps every testimonial visually consistent
// without depending on client photos being available.
function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// `placeholder` marks a testimonial with no real client yet (see src/data/testimonials.js):
// the card gets a dashed border, the quote renders muted/italic instead of the bold
// treatment reserved for a verified quote, and the avatar falls back to a generic icon —
// computing "initials" from literal bracket text like "[Client Name]" would look broken.
export default function TestimonialCard({
  quote,
  name,
  jobTitle,
  company,
  logo,
  projectType,
  placeholder = false,
  className,
}) {
  return (
    <Card as="figure" className={cn('group flex h-full flex-col', placeholder && 'border-dashed', className)}>
      <div className="flex items-start justify-between gap-3">
        <Quote
          className={cn(
            'size-8 transition-[color,transform] duration-300 group-hover:scale-110',
            placeholder ? 'text-fg-subtle/50' : 'text-highlight/40 group-hover:text-highlight/70',
          )}
          aria-hidden="true"
        />
        {projectType && <Tag>{projectType}</Tag>}
      </div>

      <blockquote
        className={cn('mt-4 flex-1 text-lg leading-relaxed', placeholder ? 'text-fg-subtle italic' : 'text-fg')}
      >
        “{quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-6">
        {logo ? (
          <img
            src={logo}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="size-10 shrink-0 rounded-full object-contain"
          />
        ) : placeholder ? (
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-dashed border-line-strong text-fg-subtle"
          >
            <UserRound className="size-5" />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-highlight/10 font-display text-sm font-bold text-highlight ring-2 ring-transparent transition-shadow duration-300 group-hover:ring-highlight/30"
          >
            {initials(name)}
          </span>
        )}
        <div>
          <p className={cn('font-display text-sm font-bold', placeholder ? 'text-fg-subtle' : 'text-fg')}>{name}</p>
          <p className="text-xs text-fg-subtle">
            {jobTitle}
            {company && `, ${company}`}
          </p>
        </div>
      </figcaption>
    </Card>
  )
}
