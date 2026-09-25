import { cn } from '@/lib/cn'

// text-base (16px), sm:text-sm — below 16px, iOS Safari auto-zooms the viewport on focus,
// a well-known mobile-Safari-only quirk; 16px avoids it while keeping the original 14px
// on larger screens where it doesn't apply.
const base =
  'w-full rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-base sm:text-sm text-fg placeholder:text-fg-subtle transition-colors duration-200 focus-visible:border-highlight disabled:cursor-not-allowed disabled:opacity-50'

// Bare control — pair with <Field> for the label/hint/error chrome. The site's global
// :focus-visible outline (index.css) already gives this an accessible focus ring; this
// only adds the border-colour change on top.
export default function Input({ className, invalid, ...props }) {
  return (
    <input
      className={cn(base, invalid && 'border-danger', className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}
