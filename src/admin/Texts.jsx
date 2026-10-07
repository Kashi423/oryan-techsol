import { useState } from 'react'
import { ExternalLink, PenLine, Trash2 } from 'lucide-react'
import { api } from '@/lib/cms/api'
import { setAdminFlag } from './auth'
import { btn, confirmAction, EmptyState, ErrorNote, formatDateTime, inputClass, Loading, PageHeader, Panel, useApi, useToast } from './ui'

export default function Texts() {
  const { data, error, loading, reload } = useApi('/admin/texts')
  const toast = useToast()
  const [draft, setDraft] = useState({})

  function startEditing() {
    setAdminFlag(true)
    window.location.href = '/?cms-edit=1'
  }

  async function saveRow(item) {
    const replacement = draft[item.id]
    if (replacement === undefined || replacement === item.replacement) return
    try {
      await api('/admin/texts', { method: 'PUT', body: { items: [{ original: item.original, replacement, page: item.page }] } })
      toast('Text updated.')
      setDraft((d) => {
        const next = { ...d }
        delete next[item.id]
        return next
      })
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function revert(item) {
    if (!confirmAction('Restore the original text everywhere it appears?')) return
    try {
      await api(`/admin/texts/${item.id}`, { method: 'DELETE' })
      toast('Original text restored.')
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <>
      <PageHeader
        title="Page text"
        description="Change the wording on any page — headings, paragraphs, buttons — without touching code."
        actions={
          <button type="button" className={btn.primary} onClick={startEditing}>
            <PenLine className="size-4" aria-hidden="true" />
            Edit text on the website
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </button>
        }
      />

      <Panel title="How it works" className="mb-6">
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-fg-muted">
          <li>Click <b>Edit text on the website</b>. You'll see your site with an editing bar at the bottom.</li>
          <li>Turn on <b>Edit text</b>, then click any text on any page. Type the new wording and press <b>Apply</b>.</li>
          <li>When you're happy, press <b>Save changes</b>. Visitors see the new text straight away.</li>
        </ol>
        <p className="mt-3 text-xs text-fg-subtle">
          A change applies to every place that exact wording appears (for example, a button label used on several pages).
          Edited texts are listed below, where you can adjust or restore them.
        </p>
      </Panel>

      <Panel title={`Edited texts${data ? ` (${data.items.length})` : ''}`} padded={false}>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="p-5"><ErrorNote error={error} onRetry={reload} /></div>
        ) : data.items.length === 0 ? (
          <EmptyState title="No text changes yet">Texts you edit on the website will be listed here.</EmptyState>
        ) : (
          <ul className="divide-y divide-line">
            {data.items.map((item) => {
              const value = draft[item.id] ?? item.replacement
              return (
                <li key={item.id} className="grid gap-3 px-5 py-4 lg:grid-cols-[1fr_1fr_auto] lg:items-start">
                  <div>
                    <p className="font-display text-[11px] font-bold tracking-wide text-fg-subtle uppercase">Original</p>
                    <p className="mt-1 text-sm whitespace-pre-line text-fg-muted">{item.original}</p>
                    <p className="mt-1 text-[11px] text-fg-subtle">{item.page ? `Edited on ${item.page} · ` : ''}{formatDateTime(item.updatedAt)}{item.updatedBy ? ` · ${item.updatedBy}` : ''}</p>
                  </div>
                  <div>
                    <p className="font-display text-[11px] font-bold tracking-wide text-highlight uppercase">Now shows</p>
                    <textarea
                      rows={Math.min(5, Math.max(2, Math.ceil(value.length / 50)))}
                      value={value}
                      onChange={(e) => setDraft((d) => ({ ...d, [item.id]: e.target.value }))}
                      className={`${inputClass} mt-1`}
                      aria-label="Replacement text"
                    />
                  </div>
                  <div className="flex gap-2 lg:flex-col">
                    <button type="button" className={btn.small} disabled={value === item.replacement} onClick={() => saveRow(item)}>Save</button>
                    <button type="button" className={btn.small} onClick={() => revert(item)}><Trash2 className="size-3.5" />Restore</button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Panel>
    </>
  )
}
