import { useState } from 'react'
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react'
import { navItems } from '@/config/site'
import { api } from '@/lib/cms/api'
import { btn, confirmAction, EmptyState, ErrorNote, inputClass, Labeled, Loading, Modal, PageHeader, Panel, Pill, useApi, useToast } from './ui'

const blank = { label: '', url: '', newTab: false, style: 'link', active: true }

export default function Menu() {
  const { data, error, loading, reload } = useApi('/admin/nav')
  const toast = useToast()
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)
  const items = data?.items ?? []
  const set = (patch) => setEditing((e) => ({ ...e, ...patch }))

  async function save() {
    setBusy(true)
    try {
      const body = { label: editing.label, url: editing.url, newTab: editing.newTab, style: editing.style, active: editing.active }
      if (editing.id) await api(`/admin/nav/${editing.id}`, { method: 'PUT', body })
      else await api('/admin/nav', { method: 'POST', body })
      toast('Menu item saved.')
      setEditing(null)
      reload()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  async function remove(item) {
    if (!confirmAction(`Remove “${item.label}” from the menu?`)) return
    try {
      await api(`/admin/nav/${item.id}`, { method: 'DELETE' })
      toast('Menu item removed.')
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function move(index, delta) {
    const ids = items.map((n) => n.id)
    const target = index + delta
    if (target < 0 || target >= ids.length) return
    ;[ids[index], ids[target]] = [ids[target], ids[index]]
    try {
      await api('/admin/nav/reorder', { method: 'POST', body: { ids } })
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <>
      <PageHeader
        title="Menu"
        description="Add your own buttons and links to the top menu. They appear after the built-in items (Services, Portfolio, About, Contact)."
        actions={
          <button type="button" className={btn.primary} onClick={() => setEditing({ ...blank })}>
            <Plus className="size-4" aria-hidden="true" />
            Add menu item
          </button>
        }
      />

      <Panel title="Built-in items" className="mb-6">
        <p className="text-sm text-fg-muted">{navItems.map((item) => item.label).join(' · ')} — and the “Book a Free Consultation” button.</p>
      </Panel>

      <Panel title="Your menu items" padded={false}>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="p-5"><ErrorNote error={error} onRetry={reload} /></div>
        ) : items.length === 0 ? (
          <EmptyState title="No custom menu items">Add a link such as “Pricing” (/pricing) or a button to an external page.</EmptyState>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((item, index) => (
              <li key={item.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-display text-sm font-bold text-fg normal-case">
                    {item.label}
                    <Pill tone={item.style === 'button' ? 'published' : 'neutral'}>{item.style === 'button' ? 'Button' : 'Link'}</Pill>
                    {item.newTab && <Pill>New tab</Pill>}
                    {!item.active && <Pill tone="draft">Hidden</Pill>}
                  </p>
                  <p className="truncate text-xs text-fg-muted">{item.url}</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button type="button" className={btn.small} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move earlier"><ArrowUp className="size-3.5" /></button>
                  <button type="button" className={btn.small} onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move later"><ArrowDown className="size-3.5" /></button>
                  <button type="button" className={btn.small} onClick={() => setEditing({ ...item })}><Pencil className="size-3.5" />Edit</button>
                  <button type="button" className={btn.small} onClick={() => remove(item)} aria-label={`Remove ${item.label}`}><Trash2 className="size-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing?.id ? 'Edit menu item' : 'Add menu item'}>
        {editing && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              save()
            }}
            className="space-y-4"
          >
            <Labeled label="Label"><input type="text" required maxLength={80} value={editing.label} onChange={(e) => set({ label: e.target.value })} className={inputClass} placeholder="Pricing" /></Labeled>
            <Labeled label="Link" hint="A page on this site (starts with /) or a full address (https://…).">
              <input type="text" required value={editing.url} onChange={(e) => set({ url: e.target.value })} className={inputClass} placeholder="/pricing" />
            </Labeled>
            <Labeled label="Appearance">
              <select value={editing.style} onChange={(e) => set({ style: e.target.value })} className={inputClass}>
                <option value="link">Link — inside the menu bar</option>
                <option value="button">Button — next to “Book a Free Consultation”</option>
              </select>
            </Labeled>
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              <input type="checkbox" checked={editing.newTab} onChange={(e) => set({ newTab: e.target.checked })} className="size-4 accent-[var(--color-highlight)]" />
              Open in a new tab
            </label>
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              <input type="checkbox" checked={editing.active} onChange={(e) => set({ active: e.target.checked })} className="size-4 accent-[var(--color-highlight)]" />
              Visible on the website
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className={btn.secondary} onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className={btn.primary} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}
