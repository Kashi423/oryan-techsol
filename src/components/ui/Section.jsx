import { cn } from '@/lib/cn'
import Container from './Container'

const spacings = {
  default: 'py-16 sm:py-20 lg:py-28',
  hero: 'pt-20 pb-20 sm:pt-28 lg:pt-36 lg:pb-32',
}

const tones = {
  default: '',
  muted: 'border-y border-line bg-surface-muted',
  // Deep-navy band. Everything inside re-tints automatically via the semantic tokens.
  inverse: 'bg-surface text-fg',
}

// Page section with consistent vertical rhythm. Wraps children in <Container>.
// `tone` sets the surface (default light, muted alternate, inverse navy).
// `background` renders decorative layers behind the content (glows, grids, the mark).
export default function Section({
  tone = 'default',
  spacing = 'default',
  background,
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <section
      data-tone={tone === 'inverse' ? 'inverse' : undefined}
      className={cn('relative isolate', spacings[spacing], tones[tone], className)}
      {...props}
    >
      {background && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {background}
        </div>
      )}
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
