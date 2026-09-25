import { cn } from '@/lib/cn'

// Small solid label for categorising content (service, industry, tech stack). For an
// outlined pill instead — status, eyebrows, tech chips — use <Badge>.
export default function Tag({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-highlight/10 px-2.5 py-1 font-display text-xs font-bold tracking-wide text-highlight uppercase',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
