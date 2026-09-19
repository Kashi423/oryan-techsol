import { Link } from 'react-router'
import { cn } from '@/lib/cn'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-display font-bold whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0'

const variants = {
  primary: 'bg-primary text-primary-fg shadow-button hover:bg-primary-hover',
  secondary: 'border border-line-strong bg-surface-raised text-fg hover:bg-surface-overlay',
  ghost: 'text-fg-muted hover:bg-surface-raised hover:text-fg',
}

const sizes = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
}

// Renders the right element for the job:
//   `to`   → client-side router <Link>   (internal pages)
//   `href` → plain <a>                   (external, mailto:, tel:, files)
//   neither → <button>                   (actions; defaults to type="button")
//
// `className` is for layout only (margin, width). Don't override display, padding or
// colours with it — there is no tailwind-merge, so conflicting utilities are resolved by
// stylesheet order, not by the order you wrote them. Use `variant`/`size`, or wrap the
// button in an element that handles visibility.
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    const rel = props.target === '_blank' ? 'noopener noreferrer' : undefined
    return (
      <a href={href} rel={rel} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
