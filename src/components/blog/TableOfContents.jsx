import { useEffect, useState } from 'react'
import { ListTree } from 'lucide-react'
import { cn } from '@/lib/cn'

// "In this article" — a sticky desktop sidebar list that highlights the section being read,
// and a collapsed <details> on small screens. Anchors are real #fragments, so they work
// without JS and are eligible for Google's "jump to" sitelinks.
export default function TableOfContents({ items, variant = 'sidebar' }) {
  const [activeId, setActiveId] = useState(items[0]?.id)

  useEffect(() => {
    if (variant !== 'sidebar') return undefined
    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (headings.length === 0) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -65% 0px' },
    )
    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items, variant])

  const list = (
    <ol className="space-y-1">
      {items.map((item, index) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={cn(
              'flex gap-2.5 rounded-lg px-2.5 py-1.5 text-sm leading-snug transition-colors',
              activeId === item.id && variant === 'sidebar'
                ? 'bg-highlight/10 font-semibold text-highlight'
                : 'text-fg-muted hover:bg-surface-overlay hover:text-fg',
            )}
          >
            <span className="font-display text-xs font-bold text-fg-subtle tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item.text}</span>
          </a>
        </li>
      ))}
    </ol>
  )

  if (variant === 'inline') {
    return (
      <details className="group mt-8 rounded-2xl border border-line bg-surface-raised p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-display text-sm font-bold text-fg">
          <ListTree className="size-4 text-highlight" aria-hidden="true" />
          In this article
        </summary>
        <nav aria-label="Table of contents" className="mt-3">
          {list}
        </nav>
      </details>
    )
  }

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
      <p className="mb-2 flex items-center gap-2 px-2.5 font-display text-xs font-bold tracking-[0.18em] text-fg-subtle uppercase">
        <ListTree className="size-3.5 text-highlight" aria-hidden="true" />
        In this article
      </p>
      {list}
    </nav>
  )
}
