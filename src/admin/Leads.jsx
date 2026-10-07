import { useState } from 'react'
import { ArrowLeft, Download, Mail, Phone, Search, Trash2 } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router'
import { api } from '@/lib/cms/api'
import {
  btn, confirmAction, EmptyState, ErrorNote, formatDateTime, inputClass, Labeled, Loading, PageHeader, Pagination, Panel, Pill, useApi, useToast,
} from './ui'

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam']

export function LeadsList() {
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? ''
  const q = params.get('q') ?? ''
  const page = Number(params.get('page') ?? 1)
  const [search, setSearch] = useState(q)

  const query = new URLSearchParams({ page: String(page), ...(status && { status }), ...(q && { q }) }).toString()
  const { data, error, loading, reload } = useApi(`/admin/leads?${query}`)

  const update = (next) => {
    const merged = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (value) merged.set(key, value)
      else merged.delete(key)
    }
    if (!('page' in next)) merged.delete('page')
    setParams(merged)
  }

  return (
    <>
      <PageHeader
        title="Leads"
        description="Every inquiry sent through the website's contact form."
        actions={
          <a href="/api/admin/leads/export" className={btn.secondary}>
            <Download className="size-4" aria-hidden="true" />
            Export CSV
          </a>
        }
      />

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            update({ q: search.trim() })
          }}
          className="flex min-w-0 flex-1 gap-2"
        >
          <div className="relative min-w-0 flex-1 sm:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, company…" className={`${inputClass} pl-9`} aria-label="Search leads" />
          </div>
          <button type="submit" className={btn.secondary}>Search</button>
        </form>
        <select value={status} onChange={(e) => update({ status: e.target.value })} aria-label="Filter by status" className={`${inputClass} !w-auto`}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <Panel padded={false}>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="p-5"><ErrorNote error={error} onRetry={reload} /></div>
        ) : data.items.length === 0 ? (
          <EmptyState title="No leads found">{q || status ? 'Try clearing the filters.' : 'New inquiries from the contact form will appear here.'}</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="border-b border-line bg-surface-muted text-xs text-fg-subtle uppercase">
                <tr>
                  <th className="px-5 py-3 font-bold">Name</th>
                  <th className="px-3 py-3 font-bold">Project</th>
                  <th className="px-3 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.items.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-surface-muted">
                    <td className="px-5 py-3">
                      <Link to={`/admin/leads/${lead.id}`} className="font-display font-bold text-fg hover:text-highlight">{lead.name}</Link>
                      <p className="text-xs text-fg-muted">{lead.company ? `${lead.company} · ` : ''}{lead.email}</p>
                    </td>
                    <td className="px-3 py-3 text-fg-muted">{lead.projectType || '—'}</td>
                    <td className="px-3 py-3"><Pill tone={lead.status}>{lead.status}</Pill></td>
                    <td className="px-5 py-3 whitespace-nowrap text-fg-muted">{formatDateTime(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
      {data && <Pagination page={data.page} perPage={data.perPage} total={data.total} onPage={(p) => update({ page: String(p) })} />}
    </>
  )
}

function Row({ label, children }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="font-display text-xs font-bold text-fg-subtle uppercase">{label}</dt>
      <dd className="text-sm leading-relaxed whitespace-pre-line text-fg">{children || <span className="text-fg-subtle">—</span>}</dd>
    </div>
  )
}

export function LeadDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { data: lead, error, loading, reload } = useApi(`/admin/leads/${id}`)
  const [status, setStatus] = useState(null)
  const [notes, setNotes] = useState(null)
  const [busy, setBusy] = useState(false)

  if (loading) return <Loading />
  if (error) return <ErrorNote error={error} onRetry={reload} />

  const currentStatus = status ?? lead.status
  const currentNotes = notes ?? lead.notes ?? ''
  const dirty = currentStatus !== lead.status || currentNotes !== (lead.notes ?? '')

  async function save() {
    setBusy(true)
    try {
      await api(`/admin/leads/${id}`, { method: 'PATCH', body: { status: currentStatus, notes: currentNotes } })
      toast('Lead updated.')
      setStatus(null)
      setNotes(null)
      reload()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!confirmAction(`Delete the inquiry from ${lead.name}? This can't be undone.`)) return
    try {
      await api(`/admin/leads/${id}`, { method: 'DELETE' })
      toast('Lead deleted.')
      navigate('/admin/leads')
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <>
      <Link to="/admin/leads" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-fg">
        <ArrowLeft className="size-4" aria-hidden="true" />
        All leads
      </Link>
      <PageHeader
        title={lead.name}
        description={`${lead.company || 'No company given'} · received ${formatDateTime(lead.createdAt)}`}
        actions={
          <>
            <a href={`mailto:${lead.email}?subject=${encodeURIComponent('Re: your project inquiry')}`} className={btn.primary}>
              <Mail className="size-4" aria-hidden="true" />
              Reply by email
            </a>
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className={btn.secondary}>
                <Phone className="size-4" aria-hidden="true" />
                Call
              </a>
            )}
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Inquiry">
          <dl className="divide-y divide-line">
            <Row label="Email"><a href={`mailto:${lead.email}`} className="text-highlight hover:underline">{lead.email}</a></Row>
            <Row label="Phone">{lead.phone}</Row>
            <Row label="Website">{lead.website && <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline">{lead.website}</a>}</Row>
            <Row label="Project type">{lead.projectType}</Row>
            <Row label="Budget">{lead.budget}</Row>
            <Row label="Timeline">{lead.timeline}</Row>
            <Row label="What they need">{lead.need}</Row>
            <Row label="Current challenge">{lead.challenge}</Row>
            <Row label="Additional info">{lead.additional}</Row>
            <Row label="Sent from">{lead.source}</Row>
          </dl>
        </Panel>

        <div className="space-y-6">
          <Panel title="Follow-up">
            <div className="space-y-4">
              <Labeled label="Status">
                <select value={currentStatus} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </Labeled>
              <Labeled label="Internal notes" hint="Only visible to admins.">
                <textarea rows={6} value={currentNotes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
              </Labeled>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" className={btn.primary} disabled={!dirty || busy} onClick={save}>
                  {busy ? 'Saving…' : 'Save changes'}
                </button>
                <button type="button" className={btn.danger} onClick={remove}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete
                </button>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}
