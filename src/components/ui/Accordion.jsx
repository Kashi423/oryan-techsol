import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import Card from './Card'

// Single-open disclosure list (e.g. an FAQ). `items` is [{ question, answer }]. Built on
// plain <button>/aria-expanded rather than a full ARIA "accordion" role — that pattern adds
// no keyboard behaviour beyond what a native button already gives you for free.
export default function Accordion({ items, className }) {
  const [openIndex, setOpenIndex] = useState(0)
  // Scoped per instance — a page rendering several <Accordion>s (e.g. /faq's grouped
  // sections) would otherwise all emit "accordion-panel-0", "-1"… and collide on id.
  const instanceId = useId()

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, index) => {
        const open = index === openIndex
        const panelId = `${instanceId}-panel-${index}`
        return (
          <Card key={item.question} padding="none" className="overflow-hidden">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="font-display text-base font-bold text-fg">{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'size-5 shrink-0 text-fg-subtle transition-transform duration-200',
                  open && 'rotate-180',
                )}
              />
            </button>
            {open && (
              <div id={panelId} className="px-5 pb-5 sm:px-6">
                <p className="leading-relaxed text-fg-muted">{item.answer}</p>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
