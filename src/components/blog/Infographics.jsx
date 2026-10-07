import { AlertTriangle, ArrowRight, Check, Info, Lightbulb, X } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import RichText from './RichText'

// ---------------------------------------------------------------------------------------------
// Article infographics. Every one of these is real, indexable HTML text (not an image), styled
// as a navy "figure" card — so they look like designed graphics but crawlers, screen readers
// and copy/paste all get the actual content. Values shown in bar/stat graphics are always
// labelled as illustrative where they are not measured data.
// ---------------------------------------------------------------------------------------------

function Frame({ title, caption, kicker = 'Infographic', children }) {
  return (
    <figure
      data-tone="inverse"
      className="relative my-10 overflow-hidden rounded-3xl border border-line-strong bg-surface p-6 text-fg sm:p-8"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="bg-glow pointer-events-none absolute -top-24 -right-24 size-80 max-w-none opacity-70"
      />
      <div className="relative">
        {title && (
          <figcaption className="mb-7">
            <span className="font-display text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
              {kicker}
            </span>
            <span className="mt-1.5 block font-display text-xl font-bold text-fg sm:text-2xl">{title}</span>
          </figcaption>
        )}
        {children}
        {caption && (
          <p className="mt-6 text-xs leading-relaxed text-fg-subtle">
            <RichText text={caption} />
          </p>
        )}
      </div>
    </figure>
  )
}

export function Stats({ title, caption, items }) {
  return (
    <Frame title={title} caption={caption} kicker="At a glance">
      <ul className={cn('grid gap-4', items.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3')}>
        {items.map((item) => (
          <li key={item.label} className="rounded-2xl border border-line bg-surface-raised p-5">
            <p className="text-gradient font-display text-3xl font-bold sm:text-4xl">{item.value}</p>
            <p className="mt-2 font-display text-sm font-bold text-fg">{item.label}</p>
            {item.note && <p className="mt-1 text-xs leading-relaxed text-fg-muted">{item.note}</p>}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

export function Steps({ title, caption, items }) {
  return (
    <Frame title={title} caption={caption} kicker="Process">
      <ol
        className={cn(
          'grid gap-6',
          items.length >= 5 ? 'md:grid-cols-5' : items.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3',
        )}
      >
        {items.map((item, index) => (
          <li key={item.title} className="relative flex gap-4 md:flex-col md:gap-3">
            {index < items.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-12 bottom-[-1.5rem] left-5 w-px bg-linear-to-b from-highlight/60 to-transparent md:top-5 md:right-[-1.5rem] md:bottom-auto md:left-12 md:h-px md:w-auto md:bg-linear-to-r"
              />
            )}
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] font-display text-sm font-bold text-brand-950">
              {index + 1}
            </span>
            <div>
              <p className="font-display text-base font-bold text-fg">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                <RichText text={item.text} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  )
}

export function Bars({ title, caption, items }) {
  return (
    <Frame title={title} caption={caption} kicker="Comparison">
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.label}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-sm font-bold text-fg">{item.label}</p>
              {item.display && <p className="font-display text-sm font-bold text-highlight">{item.display}</p>}
            </div>
            <div
              aria-hidden="true"
              className="mt-2 h-3 overflow-hidden rounded-full border border-line bg-surface-raised"
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]"
                style={{ width: `${item.value}%` }}
              />
            </div>
            {item.note && <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">{item.note}</p>}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

function PointList({ points, tone }) {
  const Icon = tone === 'good' ? Check : X
  return (
    <ul className="mt-4 space-y-2.5">
      {points.map((point) => (
        <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted">
          <span
            className={cn(
              'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
              tone === 'good' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger',
            )}
          >
            <Icon className="size-3" aria-hidden="true" />
          </span>
          <span>
            <RichText text={point} />
          </span>
        </li>
      ))}
    </ul>
  )
}

export function Compare({ title, caption, left, right }) {
  return (
    <Frame title={title} caption={caption} kicker="Side by side">
      <div className="grid gap-4 md:grid-cols-2">
        {[left, right].map((side) => (
          <div key={side.title} className="rounded-2xl border border-line bg-surface-raised p-5">
            <p className="font-display text-base font-bold text-fg">{side.title}</p>
            <PointList points={side.points} tone={side.tone ?? 'good'} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function Table({ title, caption, columns, rows }) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card">
      {title && (
        <figcaption className="border-b border-line bg-surface-muted px-5 py-3 font-display text-sm font-bold text-fg">
          {title}
        </figcaption>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-primary text-primary-fg">
              {columns.map((column) => (
                <th key={column} scope="col" className="px-5 py-3 font-display font-bold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row[0]} className={cn('border-t border-line', rowIndex % 2 === 1 && 'bg-surface-muted/60')}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      'px-5 py-3 align-top leading-relaxed',
                      cellIndex === 0 ? 'font-display font-bold text-fg' : 'text-fg-muted',
                    )}
                  >
                    <RichText text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-fg-subtle">
          <RichText text={caption} />
        </p>
      )}
    </figure>
  )
}

export function Checklist({ title, caption, items }) {
  return (
    <Frame title={title} caption={caption} kicker="Checklist">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-surface-raised p-4">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-brand-950">
              <Check className="size-3" aria-hidden="true" />
            </span>
            <span className="text-sm leading-relaxed text-fg">
              <RichText text={item} />
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

export function Timeline({ title, caption, items }) {
  return (
    <Frame title={title} caption={caption} kicker="Timeline">
      <ol className="relative space-y-6 border-l border-line-strong pl-7">
        {items.map((item) => (
          <li key={item.label} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1 -left-[2.15rem] size-3.5 rounded-full border-2 border-highlight bg-surface"
            />
            <p className="font-display text-xs font-bold tracking-[0.18em] text-highlight uppercase">{item.label}</p>
            {item.title && <p className="mt-1 font-display text-base font-bold text-fg">{item.title}</p>}
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">
              <RichText text={item.text} />
            </p>
          </li>
        ))}
      </ol>
    </Frame>
  )
}

const calloutStyles = {
  tip: { icon: Lightbulb, label: 'Tip', classes: 'border-highlight/40 bg-highlight/10' },
  note: { icon: Info, label: 'Good to know', classes: 'border-line-strong bg-surface-muted' },
  warn: { icon: AlertTriangle, label: 'Watch out', classes: 'border-danger/40 bg-danger/10' },
}

export function Callout({ tone = 'note', title, text }) {
  const style = calloutStyles[tone]
  const Icon = style.icon
  return (
    <aside className={cn('my-8 flex gap-4 rounded-2xl border p-5 sm:p-6', style.classes)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-raised text-highlight shadow-card">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-sm font-bold text-fg">{title ?? style.label}</p>
        <p className="mt-1.5 leading-relaxed text-fg-muted">
          <RichText text={text} />
        </p>
      </div>
    </aside>
  )
}

export function InlineCta({ text, to, label }) {
  return (
    <aside className="my-8 flex flex-col gap-4 rounded-2xl border border-line-strong bg-surface-muted p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <p className="max-w-md leading-relaxed text-fg-muted">
        <RichText text={text} />
      </p>
      <Link
        to={to}
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 font-display text-sm font-bold text-primary-fg shadow-button transition-colors hover:bg-primary-hover"
      >
        {label}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </aside>
  )
}
