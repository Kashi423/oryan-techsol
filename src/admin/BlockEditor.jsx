/* oxlint-disable react/only-export-components -- shared admin helpers live beside their components */
import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from 'lucide-react'
import { btn, inputClass, Labeled } from './ui'

// Block editor for article bodies. Each block is a form-friendly object (`toForm`) so lists and
// tables can be typed as simple lines ("A | B | C"); `fromForm` turns them back into the shape
// the website renders (the server re-validates everything on save).

export const BLOCK_TYPES = [
  { type: 'p', label: 'Paragraph' },
  { type: 'h2', label: 'Heading (H2)' },
  { type: 'h3', label: 'Sub-heading (H3)' },
  { type: 'ul', label: 'Bullet list' },
  { type: 'ol', label: 'Numbered list' },
  { type: 'callout', label: 'Callout box' },
  { type: 'cta', label: 'Call-to-action' },
  { type: 'stats', label: 'Infographic: stat cards' },
  { type: 'steps', label: 'Infographic: process steps' },
  { type: 'bars', label: 'Infographic: bar chart' },
  { type: 'compare', label: 'Infographic: side by side' },
  { type: 'table', label: 'Table' },
  { type: 'checklist', label: 'Infographic: checklist' },
  { type: 'timeline', label: 'Infographic: timeline' },
]

const label = (type) => BLOCK_TYPES.find((b) => b.type === type)?.label ?? type
const lines = (text) => String(text ?? '').split('\n').map((l) => l.trim()).filter(Boolean)
const cells = (line) => line.split('|').map((c) => c.trim())
const join = (rows) => rows.join('\n')
let uid = 0
const key = () => `b${++uid}`

export function toForm(block) {
  const b = { _k: key(), type: block.type, title: block.title ?? '', caption: block.caption ?? '' }
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return { ...b, text: block.text ?? '' }
    case 'ul':
    case 'ol':
    case 'checklist':
      return { ...b, items: join(block.items ?? []) }
    case 'callout':
      return { ...b, tone: block.tone ?? 'note', text: block.text ?? '' }
    case 'cta':
      return { ...b, text: block.text ?? '', label: block.label ?? '', to: block.to ?? '' }
    case 'stats':
      return { ...b, rows: join((block.items ?? []).map((i) => [i.value, i.label, i.note].join(' | '))) }
    case 'steps':
      return { ...b, rows: join((block.items ?? []).map((i) => [i.title, i.text].join(' | '))) }
    case 'timeline':
      return { ...b, rows: join((block.items ?? []).map((i) => [i.label, i.title, i.text].join(' | '))) }
    case 'bars':
      return { ...b, rows: join((block.items ?? []).map((i) => [i.label, i.value, i.display, i.note].join(' | '))) }
    case 'compare':
      return {
        ...b,
        leftTitle: block.left?.title ?? '', leftPoints: join(block.left?.points ?? []), leftTone: block.left?.tone ?? 'good',
        rightTitle: block.right?.title ?? '', rightPoints: join(block.right?.points ?? []), rightTone: block.right?.tone ?? 'good',
      }
    case 'table':
      return { ...b, columns: (block.columns ?? []).join(' | '), rows: join((block.rows ?? []).map((r) => r.join(' | '))) }
    default:
      return b
  }
}

export const newBlock = (type) =>
  toForm({
    type,
    tone: 'note',
    left: { tone: 'good' },
    right: { tone: 'good' },
  })

export function fromForm(f) {
  const base = { type: f.type }
  const extras = { title: f.title, caption: f.caption }
  switch (f.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return { ...base, text: f.text }
    case 'ul':
    case 'ol':
      return { ...base, items: lines(f.items) }
    case 'checklist':
      return { ...base, ...extras, items: lines(f.items) }
    case 'callout':
      return { ...base, tone: f.tone, title: f.title, text: f.text }
    case 'cta':
      return { ...base, text: f.text, label: f.label, to: f.to }
    case 'stats':
      return { ...base, ...extras, items: lines(f.rows).map((l) => { const [value, lab, note] = cells(l); return { value, label: lab ?? '', note: note ?? '' } }) }
    case 'steps':
      return { ...base, ...extras, items: lines(f.rows).map((l) => { const [title, text] = cells(l); return { title, text: text ?? '' } }) }
    case 'timeline':
      return { ...base, ...extras, items: lines(f.rows).map((l) => { const [lab, title, text] = cells(l); return { label: lab, title: title ?? '', text: text ?? '' } }) }
    case 'bars':
      return { ...base, ...extras, items: lines(f.rows).map((l) => { const [lab, value, display, note] = cells(l); return { label: lab, value: Number(value) || 0, display: display ?? '', note: note ?? '' } }) }
    case 'compare':
      return {
        ...base, ...extras,
        left: { title: f.leftTitle, points: lines(f.leftPoints), tone: f.leftTone },
        right: { title: f.rightTitle, points: lines(f.rightPoints), tone: f.rightTone },
      }
    case 'table':
      return { ...base, ...extras, columns: cells(f.columns), rows: lines(f.rows).map(cells) }
    default:
      return base
  }
}

const hints = {
  items: 'One item per line.',
  stats: 'One card per line:  Value | Label | Note',
  steps: 'One step per line:  Title | Description',
  timeline: 'One entry per line:  When | Title | Description',
  bars: 'One bar per line:  Label | 0-100 | Display text | Note',
  table: 'Rows, one per line, cells separated by |',
}

function Text({ value, onChange, rows = 3, placeholder }) {
  return <textarea rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
}

function Line({ value, onChange, placeholder }) {
  return <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
}

function BlockFields({ block, set }) {
  const infographic = ['stats', 'steps', 'bars', 'compare', 'table', 'checklist', 'timeline'].includes(block.type)
  const common = infographic && (
    <div className="grid gap-3 sm:grid-cols-2">
      <Labeled label="Title"><Line value={block.title} onChange={(v) => set({ title: v })} /></Labeled>
      <Labeled label="Caption / note (optional)"><Line value={block.caption} onChange={(v) => set({ caption: v })} /></Labeled>
    </div>
  )
  switch (block.type) {
    case 'p':
      return <Labeled label="Text" hint="Links: [anchor text](/blog/some-post) · bold: **text**"><Text rows={5} value={block.text} onChange={(v) => set({ text: v })} /></Labeled>
    case 'h2':
    case 'h3':
      return <Labeled label="Heading text"><Line value={block.text} onChange={(v) => set({ text: v })} /></Labeled>
    case 'ul':
    case 'ol':
      return <Labeled label="Items" hint={hints.items}><Text rows={5} value={block.items} onChange={(v) => set({ items: v })} /></Labeled>
    case 'checklist':
      return <div className="space-y-3">{common}<Labeled label="Items" hint={hints.items}><Text rows={5} value={block.items} onChange={(v) => set({ items: v })} /></Labeled></div>
    case 'callout':
      return (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
            <Labeled label="Style">
              <select value={block.tone} onChange={(e) => set({ tone: e.target.value })} className={inputClass}>
                <option value="note">Good to know</option>
                <option value="tip">Tip</option>
                <option value="warn">Warning</option>
              </select>
            </Labeled>
            <Labeled label="Title (optional)"><Line value={block.title} onChange={(v) => set({ title: v })} /></Labeled>
          </div>
          <Labeled label="Text"><Text rows={3} value={block.text} onChange={(v) => set({ text: v })} /></Labeled>
        </div>
      )
    case 'cta':
      return (
        <div className="space-y-3">
          <Labeled label="Message"><Text rows={2} value={block.text} onChange={(v) => set({ text: v })} /></Labeled>
          <div className="grid gap-3 sm:grid-cols-2">
            <Labeled label="Button label"><Line value={block.label} onChange={(v) => set({ label: v })} placeholder="Book a free consultation" /></Labeled>
            <Labeled label="Button link"><Line value={block.to} onChange={(v) => set({ to: v })} placeholder="/contact" /></Labeled>
          </div>
        </div>
      )
    case 'stats':
    case 'steps':
    case 'timeline':
    case 'bars':
      return <div className="space-y-3">{common}<Labeled label="Rows" hint={hints[block.type]}><Text rows={6} value={block.rows} onChange={(v) => set({ rows: v })} /></Labeled></div>
    case 'compare':
      return (
        <div className="space-y-3">
          {common}
          <div className="grid gap-4 md:grid-cols-2">
            {['left', 'right'].map((side) => (
              <div key={side} className="space-y-3 rounded-xl border border-line p-3">
                <Labeled label={side === 'left' ? 'Left column title' : 'Right column title'}><Line value={block[`${side}Title`]} onChange={(v) => set({ [`${side}Title`]: v })} /></Labeled>
                <Labeled label="Points" hint={hints.items}><Text rows={4} value={block[`${side}Points`]} onChange={(v) => set({ [`${side}Points`]: v })} /></Labeled>
                <Labeled label="Icons">
                  <select value={block[`${side}Tone`]} onChange={(e) => set({ [`${side}Tone`]: e.target.value })} className={inputClass}>
                    <option value="good">Ticks (positives)</option>
                    <option value="bad">Crosses (negatives)</option>
                  </select>
                </Labeled>
              </div>
            ))}
          </div>
        </div>
      )
    case 'table':
      return (
        <div className="space-y-3">
          {common}
          <Labeled label="Column headings" hint="Separate with |"><Line value={block.columns} onChange={(v) => set({ columns: v })} placeholder="Option | Pros | Cons" /></Labeled>
          <Labeled label="Rows" hint={hints.table}><Text rows={6} value={block.rows} onChange={(v) => set({ rows: v })} /></Labeled>
        </div>
      )
    default:
      return null
  }
}

export default function BlockEditor({ blocks, onChange }) {
  const set = (index, patch) => onChange(blocks.map((b, i) => (i === index ? { ...b, ...patch } : b)))
  const move = (index, delta) => {
    const next = [...blocks]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }
  const remove = (index) => onChange(blocks.filter((_, i) => i !== index))
  const duplicate = (index) => onChange([...blocks.slice(0, index + 1), { ...blocks[index], _k: key() }, ...blocks.slice(index + 1)])

  return (
    <div className="space-y-4">
      {blocks.length === 0 && <p className="rounded-xl border border-dashed border-line-strong p-6 text-center text-sm text-fg-muted">No content yet. Add a paragraph or heading below.</p>}
      {blocks.map((block, index) => (
        <div key={block._k} className="rounded-xl border border-line bg-surface p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="font-display text-xs font-bold tracking-wide text-highlight uppercase">{index + 1}. {label(block.type)}</span>
            <div className="flex gap-1.5">
              <button type="button" className={btn.small} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up"><ArrowUp className="size-3.5" /></button>
              <button type="button" className={btn.small} onClick={() => move(index, 1)} disabled={index === blocks.length - 1} aria-label="Move down"><ArrowDown className="size-3.5" /></button>
              <button type="button" className={btn.small} onClick={() => duplicate(index)} aria-label="Duplicate"><Copy className="size-3.5" /></button>
              <button type="button" className={btn.small} onClick={() => remove(index)} aria-label="Delete block"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
          <BlockFields block={block} set={(patch) => set(index, patch)} />
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-line-strong p-3">
        <Plus className="size-4 text-fg-subtle" aria-hidden="true" />
        <span className="text-sm font-semibold text-fg-muted">Add:</span>
        <select
          value=""
          onChange={(e) => e.target.value && onChange([...blocks, newBlock(e.target.value)])}
          aria-label="Add a block"
          className={`${inputClass} !w-auto`}
        >
          <option value="">Choose a block…</option>
          {BLOCK_TYPES.map((b) => (
            <option key={b.type} value={b.type}>{b.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
