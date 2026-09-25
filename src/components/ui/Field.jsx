import { cn } from '@/lib/cn'

// Label + hint/error chrome for a form control. Pass the same id you gave the control as
// `htmlFor`; when `hint`/`error` are set, also put `${htmlFor}-hint` / `${htmlFor}-error`
// on the control's `aria-describedby` so screen readers announce them.
export default function Field({ label, htmlFor, hint, error, required, className, children }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="font-display text-sm font-semibold text-fg">
        {label}
        {required && (
          <span className="text-highlight" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-xs text-fg-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
