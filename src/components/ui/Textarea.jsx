import { cn } from '@/lib/cn'

// text-base (16px), sm:text-sm — below 16px, iOS Safari auto-zooms the viewport on focus.
const base =
  'w-full resize-y rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-base sm:text-sm text-fg placeholder:text-fg-subtle transition-colors duration-200 focus-visible:border-highlight disabled:cursor-not-allowed disabled:opacity-50'

// Bare control — pair with <Field> for the label/hint/error chrome.
export default function Textarea({ className, invalid, rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(base, invalid && 'border-danger', className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}
