import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

// text-base (16px), sm:text-sm — below 16px, iOS Safari auto-zooms the viewport on focus.
const base =
  'w-full appearance-none rounded-lg border border-line-strong bg-surface py-2.5 pr-10 pl-4 text-base sm:text-sm text-fg transition-colors duration-200 focus-visible:border-highlight disabled:cursor-not-allowed disabled:opacity-50'

// Bare control — pair with <Field> for the label/hint/error chrome.
export default function Select({ className, invalid, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(base, invalid && 'border-danger', className)}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-fg-subtle"
      />
    </div>
  )
}
