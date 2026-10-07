/* oxlint-disable react/only-export-components -- shared admin helpers live beside their components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CheckCircle2, ChevronLeft, ChevronRight, Info, X, XCircle } from 'lucide-react'
import { api } from '@/lib/cms/api'
import { cn } from '@/lib/cn'

// ---- data loading ---------------------------------------------------------------------------

/** GET a path and keep {data, error, loading}; `reload()` refetches. `path = null` skips. */
export function useApi(path) {
  const [state, setState] = useState({ data: null, error: null, loading: Boolean(path) })
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!path) return undefined
    let cancelled = false
    // eslint-disable-next-line
    setState((s) => ({ ...s, loading: true, error: null })) // oxlint-disable-line react/set-state-in-effect
    api(path)
      .then((data) => !cancelled && setState({ data, error: null, loading: false }))
      .catch((error) => !cancelled && setState({ data: null, error, loading: false }))
    return () => {
      cancelled = true
    }
  }, [path, tick])
  const reload = useCallback(() => setTick((n) => n + 1), [])
  return { ...state, reload }
}

export const formatDateTime = (value) => {
  if (!value) return '—'
  const date = new Date(`${String(value).replace(' ', 'T')}Z`)
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export const formatDay = (value) => {
  if (!value) return '—'
  const date = new Date(`${String(value).replace(' ', 'T')}Z`)
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ---- toasts ---------------------------------------------------------------------------------

const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)
  const push = useCallback((message, tone = 'success') => {
    const id = ++counter.current
    setToasts((list) => [...list, { id, message, tone }])
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), tone === 'error' ? 7000 : 3500)
  }, [])
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div aria-live="polite" className="fixed right-4 bottom-4 z-[80] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={cn(
              'flex items-start gap-3 rounded-xl border bg-surface-raised px-4 py-3 text-sm text-fg shadow-card',
              t.tone === 'error' ? 'border-danger/50' : 'border-line-strong',
            )}
          >
            {t.tone === 'error' ? (
              <XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// ---- layout bits ------------------------------------------------------------------------------

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl normal-case sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Panel({ title, actions, children, className, padded = true }) {
  return (
    <section className={cn('rounded-2xl border border-line bg-surface-raised shadow-card', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          {title && <h2 className="font-display text-sm font-bold text-fg normal-case">{title}</h2>}
          {actions}
        </div>
      )}
      <div className={padded ? 'p-5' : ''}>{children}</div>
    </section>
  )
}

const pillTones = {
  new: 'bg-highlight/15 text-highlight',
  contacted: 'bg-brand-500/15 text-brand-700',
  qualified: 'bg-brand-800/15 text-brand-800',
  won: 'bg-success/15 text-success',
  lost: 'bg-ink-200 text-ink-600',
  spam: 'bg-danger/15 text-danger',
  published: 'bg-success/15 text-success',
  draft: 'bg-ink-200 text-ink-600',
  neutral: 'bg-ink-100 text-ink-600',
}

export function Pill({ tone = 'neutral', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-display text-xs font-bold capitalize',
        pillTones[tone] ?? pillTones.neutral,
      )}
    >
      {children}
    </span>
  )
}

export function Loading({ label = 'Loading…' }) {
  return <p className="py-10 text-center text-sm text-fg-subtle">{label}</p>
}

export function ErrorNote({ error, onRetry }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-fg">
      <XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
      <div>
        <p>{error?.message ?? 'Something went wrong.'}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="mt-2 font-semibold text-highlight hover:underline">
            Try again
          </button>
        )}
      </div>
    </div>
  )
}

export function EmptyState({ title, children }) {
  return (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <Info className="size-6 text-fg-subtle" aria-hidden="true" />
      <p className="font-display text-sm font-bold text-fg normal-case">{title}</p>
      {children && <p className="max-w-sm text-sm text-fg-muted">{children}</p>}
    </div>
  )
}

export function Pagination({ page, perPage, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / perPage))
  if (pages <= 1) return null
  const button =
    'inline-flex size-9 items-center justify-center rounded-lg border border-line-strong bg-surface-raised text-fg transition-colors hover:bg-surface-overlay disabled:opacity-40'
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-fg-muted">
      <span>
        Page {page} of {pages} · {total} total
      </span>
      <div className="flex gap-2">
        <button type="button" className={button} disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page">
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <button type="button" className={button} disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Next page">
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-brand-950/60 p-4 backdrop-blur-sm sm:p-8"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- native <dialog> brings default browser chrome we don't want
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn('my-auto w-full rounded-2xl border border-line bg-surface-raised shadow-card', wide ? 'max-w-3xl' : 'max-w-xl')}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h2 className="font-display text-base font-bold text-fg normal-case">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-8 items-center justify-center rounded-lg text-fg-subtle hover:bg-surface-overlay hover:text-fg"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export const confirmAction = (message) => window.confirm(message)

// Shared button styles for the admin (kept separate from the public site's <Button>).
export const btn = {
  primary:
    'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 font-display text-sm font-bold text-primary-fg shadow-button transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50',
  secondary:
    'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-raised px-4 font-display text-sm font-bold text-fg transition-colors hover:bg-surface-overlay disabled:pointer-events-none disabled:opacity-50',
  danger:
    'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-danger/50 bg-danger/10 px-4 font-display text-sm font-bold text-danger transition-colors hover:bg-danger/20 disabled:pointer-events-none disabled:opacity-50',
  small:
    'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-surface-raised px-3 font-display text-xs font-bold text-fg transition-colors hover:bg-surface-overlay disabled:pointer-events-none disabled:opacity-40',
}

export const inputClass =
  'w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2 text-base text-fg placeholder:text-fg-subtle transition-colors focus-visible:border-highlight sm:text-sm'

export function Labeled({ label, hint, children, className }) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      <span className="font-display text-xs font-bold text-fg">{label}</span>
      {children}
      {hint && <span className="text-xs text-fg-subtle">{hint}</span>}
    </label>
  )
}
