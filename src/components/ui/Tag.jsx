import { cn } from '@/lib/cn'

// Small solid label for categorising content (service, industry, tech stack). For an
// outlined pill instead — status, eyebrows, tech chips — use <Badge>.
export default function Tag({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-highlight/10 px-2.5 py-1 font-display text-xs font-bold tracking-wide text-highlight uppercase transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-highlight/20',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
