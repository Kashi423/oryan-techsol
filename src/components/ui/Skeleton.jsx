import { cn } from '@/lib/cn'

// Pulsing placeholder for content that loads in (async cards, images). Give it the
// dimensions of the real content via className so layout doesn't shift once it resolves.
export default function Skeleton({ className, ...props }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-lg bg-surface-overlay', className)} {...props} />
}
