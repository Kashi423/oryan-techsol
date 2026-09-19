import { cn } from '@/lib/cn'

// Eyebrow + title + description block. `title` may contain a <span className="text-gradient">.
// The eyebrow carries the logo's "— TECHSOL —" hairline-rule motif.
// Extra props (e.g. `id`) are forwarded to the heading so sections can use aria-labelledby.
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  className,
  ...props
}) {
  const centered = align === 'center'

  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-4 flex items-center gap-3 font-display text-xs font-bold tracking-[0.24em] text-highlight uppercase',
            centered && 'justify-center',
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-highlight/60" />
          {eyebrow}
          {centered && <span aria-hidden="true" className="h-px w-8 bg-highlight/60" />}
        </p>
      )}
      <Heading className="text-3xl sm:text-4xl lg:text-5xl" {...props}>
        {title}
      </Heading>
      {description && <p className="mt-4 text-lg leading-relaxed text-fg-muted">{description}</p>}
    </div>
  )
}
