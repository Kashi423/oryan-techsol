import { cn } from '@/lib/cn'

// Small pill for eyebrows, tech tags and status labels.
export default function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-raised px-3 py-1 font-display text-xs font-semibold text-fg-muted',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
