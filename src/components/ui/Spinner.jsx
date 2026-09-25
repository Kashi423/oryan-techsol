import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

// Inline loading indicator, colour follows currentColor so it fits inside a button.
// Pass `label` for screen readers when it's the only feedback on screen; omit it when
// adjacent text already announces the state (e.g. "Submitting…").
export default function Spinner({ className, label, size = 'size-5' }) {
  return (
    <output className="inline-flex items-center">
      <Loader2 className={cn(size, 'animate-spin text-current', className)} aria-hidden="true" />
      {label && <span className="sr-only">{label}</span>}
    </output>
  )
}
