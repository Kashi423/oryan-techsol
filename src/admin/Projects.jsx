import { useState } from 'react'
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react'
import { api } from '@/lib/cms/api'
import {
  btn, confirmAction, EmptyState, ErrorNote, inputClass, Labeled, Loading, Modal, PageHeader, Panel, Pill, useApi, useToast,
} from './ui'

const CATEGORIES = [
  { value: 'ai', label: 'AI' },
  { value: 'web', label: 'Web' },
  { value: 'software', label: 'Software' },
  { value: 'automation', label: 'Automation' },
]

const blank = {
  title: '', slug: '', category: 'web', industry: '', solutionType: '', problem: '', solution: '', technology: '', result: '',
  placeholder: false, status: 'published', platform: '', features: '', backend: '', aiIntegration: '', automation: '',
}

const toForm = (p) => ({
  ...blank, ...p,
  technology: (p.technology ?? []).join(', '), platform: (p.platform ?? []).join(', '), features: (p.features ?? []).join('\n'),
  result: p.result ?? '', backend: p.backend ?? '', aiIntegration: p.aiIntegration ?? '', automation: p.automation ?? '',
})

const split = (text, sep) => String(text ?? '').split(sep).map((s) => s.trim()).filter(Boolean)

const toPayload = (f) => ({
  ...f, technology: split(f.technology, ','), platform: split(f.platform, ','), features: split(f.features, '\n'),
})

export default function Projects() {
  const { data, error, loading, reload } = useApi('/admin/projects')
  const toast = useToast()
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)
  const items = data?.items ?? []
  const set = (patch) => setEditing((e) => ({ ...e, ...patch }))

  async function save() {
    setBusy(true)
    try {
      const body = toPayload(editing)
      if (editing.id) await api(`/admin/projects/${editing.id}`, { method: 'PUT', body })
      else await api('/admin/projects', { method: 'POST', body })
      toast('Project saved.')
      setEditing(null)
      reload()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  async function remove(project) {
    if (!confirmAction(`Delete "${project.title}"?`)) return
    try {
      await api(`/admin/projects/${project.id}`, { method: 'DELETE' })
      toast('Project deleted.')
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function move(index, delta) {
    const ids = items.map((p) => p.id)
    const target = index + delta
    if (target < 0 || target >= ids.length) return
    ;[ids[index], ids[target]] = [ids[target], ids[index]]
    try {
      await api('/admin/projects/reorder', { method: 'POST', body: { ids } })
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Case studies shown on the Portfolio page, the homepage and the service pages. Tick “Sample project” for illustrative entries so visitors are told they aren't real clients."
        actions={
          <button type="button" className={btn.primary} onClick={() => setEditing({ ...blank })}>
            <Plus className="size-4" aria-hidden="true" />
            Add project
          </button>
        }
      />
      <Panel padded={false}>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="p-5"><ErrorNote error={error} onRetry={reload} /></div>
        ) : items.length === 0 ? (
          <EmptyState title="No projects yet">Add a case study, or import the starter content from the dashboard.</EmptyState>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((project, index) => (
              <li key={project.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-display text-sm font-bold text-fg normal-case">
                    {project.title}
                    {project.placeholder && <Pill>Sample</Pill>}
                    {project.status === 'draft' && <Pill tone="draft">Draft</Pill>}
                  </p>
                  <p className="truncate text-xs text-fg-muted">{project.category} · {project.industry} · /portfolio/{project.slug}</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button type="button" className={btn.small} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up"><ArrowUp className="size-3.5" /></button>
                  <button type="button" className={btn.small} onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down"><ArrowDown className="size-3.5" /></button>
                  <button type="button" className={btn.small} onClick={() => setEditing(toForm(project))}><Pencil className="size-3.5" />Edit</button>
                  <button type="button" className={btn.small} onClick={() => remove(project)} aria-label={`Delete ${project.title}`}><Trash2 className="size-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing?.id ? 'Edit project' : 'Add project'} wide>
        {editing && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              save()
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Labeled label="Title" className="sm:col-span-2"><input type="text" required value={editing.title} onChange={(e) => set({ title: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="Category">
                <select value={editing.category} onChange={(e) => set({ category: e.target.value })} className={inputClass}>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Labeled>
              <Labeled label="Industry"><input type="text" value={editing.industry} onChange={(e) => set({ industry: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="Solution type" className="sm:col-span-2"><input type="text" value={editing.solutionType} onChange={(e) => set({ solutionType: e.target.value })} placeholder="Custom Software Development" className={inputClass} /></Labeled>
              <Labeled label="The problem" className="sm:col-span-2"><textarea rows={3} value={editing.problem} onChange={(e) => set({ problem: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="The solution" className="sm:col-span-2"><textarea rows={3} value={editing.solution} onChange={(e) => set({ solution: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="Technology" hint="Comma-separated." className="sm:col-span-2"><input type="text" value={editing.technology} onChange={(e) => set({ technology: e.target.value })} placeholder="React, Node.js, PostgreSQL" className={inputClass} /></Labeled>
              <Labeled label="Result" hint="Only add a real, documented outcome." className="sm:col-span-2"><textarea rows={2} value={editing.result} onChange={(e) => set({ result: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="Platforms (optional)" hint="Comma-separated, e.g. iOS, Android"><input type="text" value={editing.platform} onChange={(e) => set({ platform: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="Back-end (optional)"><input type="text" value={editing.backend} onChange={(e) => set({ backend: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="Features (optional)" hint="One per line — only real, shipped features." className="sm:col-span-2"><textarea rows={3} value={editing.features} onChange={(e) => set({ features: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="AI feature (optional)"><input type="text" value={editing.aiIntegration} onChange={(e) => set({ aiIntegration: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="Automation (optional)"><input type="text" value={editing.automation} onChange={(e) => set({ automation: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="URL slug" hint="Leave empty to generate from the title."><input type="text" value={editing.slug} onChange={(e) => set({ slug: e.target.value.toLowerCase() })} className={inputClass} /></Labeled>
              <Labeled label="Visibility">
                <select value={editing.status} onChange={(e) => set({ status: e.target.value })} className={inputClass}>
                  <option value="published">Published</option>
                  <option value="draft">Draft (hidden)</option>
                </select>
              </Labeled>
            </div>
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              <input type="checkbox" checked={editing.placeholder} onChange={(e) => set({ placeholder: e.target.checked })} className="size-4 accent-[var(--color-highlight)]" />
              Sample project (illustrative, not a real client) — visitors see a “Sample project” notice
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className={btn.secondary} onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className={btn.primary} disabled={busy}>{busy ? 'Saving…' : 'Save project'}</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}
