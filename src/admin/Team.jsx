import { useState } from 'react'
import { ArrowDown, ArrowUp, Pencil, Plus, Star, Trash2, User } from 'lucide-react'
import { api } from '@/lib/cms/api'
import ImageField from './ImageField'
import {
  btn, confirmAction, EmptyState, ErrorNote, inputClass, Labeled, Loading, Modal, PageHeader, Panel, Pill, useApi, useToast,
} from './ui'

const blank = { name: '', role: '', bio: '', photo: '', isLead: false, active: true }

function Avatar({ src, name }) {
  return src ? (
    <img src={src} alt="" className="size-12 rounded-full border border-line object-cover" />
  ) : (
    <span className="flex size-12 items-center justify-center rounded-full border border-line bg-surface-overlay text-fg-subtle" title={name}>
      <User className="size-5" aria-hidden="true" />
    </span>
  )
}

export default function Team() {
  const { data, error, loading, reload } = useApi('/admin/team')
  const toast = useToast()
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)

  const items = data?.items ?? []

  async function save() {
    setBusy(true)
    try {
      const body = { name: editing.name, role: editing.role, bio: editing.bio, photo: editing.photo, isLead: editing.isLead, active: editing.active }
      if (editing.id) await api(`/admin/team/${editing.id}`, { method: 'PUT', body })
      else await api('/admin/team', { method: 'POST', body })
      toast('Team member saved.')
      setEditing(null)
      reload()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  async function remove(member) {
    if (!confirmAction(`Remove ${member.name} from the team?`)) return
    try {
      await api(`/admin/team/${member.id}`, { method: 'DELETE' })
      toast('Team member removed.')
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function move(index, delta) {
    const ids = items.map((m) => m.id)
    const target = index + delta
    if (target < 0 || target >= ids.length) return
    ;[ids[index], ids[target]] = [ids[target], ids[index]]
    try {
      await api('/admin/team/reorder', { method: 'POST', body: { ids } })
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <>
      <PageHeader
        title="Team"
        description="People shown on the About page. The lead appears in the large card; everyone else is listed beside it in this order."
        actions={
          <button type="button" className={btn.primary} onClick={() => setEditing({ ...blank })}>
            <Plus className="size-4" aria-hidden="true" />
            Add team member
          </button>
        }
      />
      <Panel padded={false}>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="p-5"><ErrorNote error={error} onRetry={reload} /></div>
        ) : items.length === 0 ? (
          <EmptyState title="No team members yet">Add people here, or import the starter content from the dashboard.</EmptyState>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((member, index) => (
              <li key={member.id} className="flex items-center gap-4 px-5 py-3.5">
                <Avatar src={member.photo} name={member.name} />
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-display text-sm font-bold text-fg normal-case">
                    {member.name}
                    {member.isLead && <Pill tone="published"><Star className="mr-1 size-3" aria-hidden="true" />Lead</Pill>}
                    {!member.active && <Pill tone="draft">Hidden</Pill>}
                  </p>
                  <p className="truncate text-xs text-fg-muted">{member.role}</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button type="button" className={btn.small} onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ${member.name} up`}><ArrowUp className="size-3.5" /></button>
                  <button type="button" className={btn.small} onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label={`Move ${member.name} down`}><ArrowDown className="size-3.5" /></button>
                  <button type="button" className={btn.small} onClick={() => setEditing({ ...member, photo: member.photo ?? '' })}><Pencil className="size-3.5" />Edit</button>
                  <button type="button" className={btn.small} onClick={() => remove(member)} aria-label={`Remove ${member.name}`}><Trash2 className="size-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing?.id ? 'Edit team member' : 'Add team member'}>
        {editing && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              save()
            }}
            className="space-y-4"
          >
            <Labeled label="Name"><input type="text" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputClass} /></Labeled>
            <Labeled label="Role / title"><input type="text" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className={inputClass} /></Labeled>
            <Labeled label="Short bio"><textarea rows={4} value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} className={inputClass} /></Labeled>
            <ImageField label="Photo" value={editing.photo} onChange={(photo) => setEditing({ ...editing, photo })} hint="A face-centred photo, roughly square, works best in the hexagon." />
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              <input type="checkbox" checked={editing.isLead} onChange={(e) => setEditing({ ...editing, isLead: e.target.checked })} className="size-4 accent-[var(--color-highlight)]" />
              Show as the lead (large card). Only one person can be the lead.
            </label>
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              <input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="size-4 accent-[var(--color-highlight)]" />
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
