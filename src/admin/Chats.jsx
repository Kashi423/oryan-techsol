import { useState } from 'react'
import { ArrowLeft, CheckCheck, Search, Trash2 } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router'
import { api } from '@/lib/cms/api'
import { cn } from '@/lib/cn'
import {
  btn, confirmAction, EmptyState, ErrorNote, formatDateTime, inputClass, Loading, PageHeader, Pagination, Panel, Pill, useApi, useToast,
} from './ui'

export function ChatsList() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const unreviewed = params.get('unreviewed') === '1'
  const contact = params.get('contact') === '1'
  const page = Number(params.get('page') ?? 1)
  const [search, setSearch] = useState(q)

  const query = new URLSearchParams({ page: String(page), ...(q && { q }), ...(unreviewed && { unreviewed: '1' }), ...(contact && { contact: '1' }) }).toString()
  const { data, error, loading, reload } = useApi(`/admin/chats?${query}`)

  const update = (next) => {
    const merged = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (value) merged.set(key, value)
      else merged.delete(key)
    }
    if (!('page' in next)) merged.delete('page')
    setParams(merged)
  }

  const toggle = 'inline-flex items-center gap-2 text-sm font-semibold text-fg-muted'

  return (
    <>
      <PageHeader title="Chats" description="Conversations visitors had with the AI consultation chat. Read them to spot questions and follow up with people who left contact details." />
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            update({ q: search.trim() })
          }}
          className="flex min-w-0 flex-1 gap-2"
        >
          <div className="relative min-w-0 flex-1 sm:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inside conversations…" className={`${inputClass} pl-9`} aria-label="Search chats" />
          </div>
          <button type="submit" className={btn.secondary}>Search</button>
        </form>
        <label className={toggle}>
          <input type="checkbox" checked={unreviewed} onChange={(e) => update({ unreviewed: e.target.checked ? '1' : '' })} className="size-4 accent-[var(--color-highlight)]" />
          Unreviewed only
        </label>
        <label className={toggle}>
          <input type="checkbox" checked={contact} onChange={(e) => update({ contact: e.target.checked ? '1' : '' })} className="size-4 accent-[var(--color-highlight)]" />
          Shared contact details
        </label>
      </div>

      <Panel padded={false}>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="p-5"><ErrorNote error={error} onRetry={reload} /></div>
        ) : data.items.length === 0 ? (
          <EmptyState title="No conversations found">Chats appear here after visitors use the AI chat on the website.</EmptyState>
        ) : (
          <ul className="divide-y divide-line">
            {data.items.map((chat) => (
              <li key={chat.id}>
                <Link to={`/admin/chats/${chat.id}`} className="flex items-start justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-surface-muted">
                  <div className="min-w-0">
                    <p className={cn('truncate text-sm text-fg', !chat.reviewed && 'font-bold')}>{chat.firstMessage || '(no message)'}</p>
                    <p className="mt-0.5 text-xs text-fg-subtle">
                      {chat.messages} messages · started on {chat.page || 'the site'}
                      {chat.contactEmail ? ` · ${chat.contactEmail}` : ''}
                      {chat.contactPhone ? ` · ${chat.contactPhone}` : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {!chat.reviewed && <Pill tone="new">New</Pill>}
                    <span className="text-[11px] whitespace-nowrap text-fg-subtle">{formatDateTime(chat.lastAt)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      {data && <Pagination page={data.page} perPage={data.perPage} total={data.total} onPage={(p) => update({ page: String(p) })} />}
    </>
  )
}

export function ChatDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { data: chat, error, loading, reload } = useApi(`/admin/chats/${id}`)

  if (loading) return <Loading />
  if (error) return <ErrorNote error={error} onRetry={reload} />

  async function setReviewed(reviewed) {
    try {
      await api(`/admin/chats/${id}`, { method: 'PATCH', body: { reviewed } })
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function remove() {
    if (!confirmAction('Delete this conversation? This can\'t be undone.')) return
    try {
      await api(`/admin/chats/${id}`, { method: 'DELETE' })
      toast('Conversation deleted.')
      navigate('/admin/chats')
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <>
      <Link to="/admin/chats" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-fg">
        <ArrowLeft className="size-4" aria-hidden="true" />
        All chats
      </Link>
      <PageHeader
        title="Conversation"
        description={`${chat.messages} messages · ${formatDateTime(chat.startedAt)} · started on ${chat.page || 'the site'}`}
        actions={
          <>
            <button type="button" className={btn.secondary} onClick={() => setReviewed(!chat.reviewed)}>
              <CheckCheck className="size-4" aria-hidden="true" />
              {chat.reviewed ? 'Mark as unreviewed' : 'Mark as reviewed'}
            </button>
            <button type="button" className={btn.danger} onClick={remove}>
              <Trash2 className="size-4" aria-hidden="true" />
              Delete
            </button>
          </>
        }
      />

      {(chat.contactEmail || chat.contactPhone) && (
        <div className="mb-6 rounded-2xl border border-highlight/40 bg-highlight/10 p-4 text-sm text-fg">
          <b>Contact details shared in this chat:</b>{' '}
          {chat.contactEmail && <a href={`mailto:${chat.contactEmail}`} className="text-highlight hover:underline">{chat.contactEmail}</a>}
          {chat.contactEmail && chat.contactPhone && ' · '}
          {chat.contactPhone}
        </div>
      )}

      <Panel>
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {chat.transcript.map((message, index) => (
            <div key={index} className={cn('max-w-[85%]', message.role === 'user' ? 'ml-auto' : '')}>
              <div
                className={cn(
                  'rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line',
                  message.role === 'user' ? 'rounded-tr-sm bg-primary text-primary-fg' : 'rounded-tl-sm bg-surface-overlay text-fg',
                )}
              >
                {message.content}
              </div>
              <p className={cn('mt-1 text-[11px] text-fg-subtle', message.role === 'user' && 'text-right')}>
                {message.role === 'user' ? 'Visitor' : 'AI'} · {formatDateTime(message.at)}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}
