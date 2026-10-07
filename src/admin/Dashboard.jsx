import { useState } from 'react'
import { ArrowRight, FileText, Inbox, MessageSquare, Rocket, Users } from 'lucide-react'
import { Link } from 'react-router'
import { api } from '@/lib/cms/api'
import { useAuth } from './auth'
import { btn, ErrorNote, formatDateTime, Loading, PageHeader, Panel, Pill, useApi, useToast } from './ui'

function Stat({ icon: Icon, label, value, note, to }) {
  return (
    <Link to={to} className="group rounded-2xl border border-line bg-surface-raised p-5 shadow-card transition-colors hover:border-highlight/50">
      <div className="flex items-center justify-between">
        <span className="flex size-9 items-center justify-center rounded-lg bg-highlight/10 text-highlight">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <ArrowRight className="size-4 text-fg-subtle transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-fg">{value}</p>
      <p className="font-display text-sm font-semibold text-fg normal-case">{label}</p>
      {note && <p className="mt-0.5 text-xs text-fg-subtle">{note}</p>}
    </Link>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const { data, error, loading, reload } = useApi('/admin/dashboard')
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  async function importStarter() {
    setBusy(true)
    try {
      const result = await api('/admin/seed', { method: 'POST', body: {} })
      toast(`Loaded ${result.imported.posts} articles, ${result.imported.team} team members and ${result.imported.projects} projects.`)
      reload()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorNote error={error} onRetry={reload} />

  return (
    <>
      <PageHeader title={`Welcome back, ${user.name.split(' ')[0]}`} description="Here's what's happening on your website." />

      {!data.seedImported && user.role === 'admin' && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-highlight/40 bg-highlight/10 p-5">
          <div>
            <p className="font-display text-sm font-bold text-fg normal-case">Load the website's current content</p>
            <p className="mt-1 max-w-xl text-sm text-fg-muted">
              Import the blog articles, team and portfolio that are in the website code, so you can edit them here.
            </p>
          </div>
          <button type="button" className={btn.primary} disabled={busy} onClick={importStarter}>
            {busy ? 'Importing…' : 'Import starter content'}
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Inbox} label="New leads" value={data.leads.new} note={`${data.leads.thisWeek} this week · ${data.leads.total} total`} to="/admin/leads" />
        <Stat icon={MessageSquare} label="Chats to review" value={data.chats.unreviewed} note={`${data.chats.withContact} shared contact details`} to="/admin/chats" />
        <Stat icon={FileText} label="Published articles" value={data.posts.published} note={`${data.posts.drafts} drafts`} to="/admin/posts" />
        <Stat icon={Users} label="Team members" value={data.team} note={`${data.projects} portfolio projects`} to="/admin/team" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Latest leads" actions={<Link to="/admin/leads" className="text-xs font-bold text-highlight hover:underline">View all</Link>} padded={false}>
          {data.recentLeads.length === 0 ? (
            <p className="p-5 text-sm text-fg-muted">No inquiries yet. They'll appear here the moment someone uses the contact form.</p>
          ) : (
            <ul className="divide-y divide-line">
              {data.recentLeads.map((lead) => (
                <li key={lead.id}>
                  <Link to={`/admin/leads/${lead.id}`} className="flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-surface-muted">
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-bold text-fg normal-case">{lead.name}</p>
                      <p className="truncate text-xs text-fg-muted">
                        {lead.projectType || 'General'} · {lead.company || lead.email}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Pill tone={lead.status}>{lead.status}</Pill>
                      <span className="text-[11px] text-fg-subtle">{formatDateTime(lead.createdAt)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Recent chats" actions={<Link to="/admin/chats" className="text-xs font-bold text-highlight hover:underline">View all</Link>} padded={false}>
            {data.recentChats.length === 0 ? (
              <p className="p-5 text-sm text-fg-muted">No chat conversations yet.</p>
            ) : (
              <ul className="divide-y divide-line">
                {data.recentChats.map((chat) => (
                  <li key={chat.id}>
                    <Link to={`/admin/chats/${chat.id}`} className="block px-5 py-3 transition-colors hover:bg-surface-muted">
                      <p className="truncate text-sm font-semibold text-fg">{chat.firstMessage || '(no message)'}</p>
                      <p className="text-xs text-fg-subtle">
                        {chat.messages} messages · {formatDateTime(chat.lastAt)}
                        {chat.contactEmail ? ` · ${chat.contactEmail}` : ''}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Publish">
            <p className="text-sm leading-relaxed text-fg-muted">
              Changes show on the live site straight away for visitors. Use <b>Publish site</b> (Settings) to refresh the
              search-engine snapshot after bigger edits.
            </p>
            <p className="mt-3 flex items-center gap-2 text-xs text-fg-subtle">
              <Rocket className="size-3.5" aria-hidden="true" />
              {data.publish.lastAt ? `Last publish: ${formatDateTime(data.publish.lastAt)} (${data.publish.lastStatus})` : 'Not published from here yet.'}
            </p>
          </Panel>
        </div>
      </div>
    </>
  )
}
