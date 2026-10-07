import { useState } from 'react'
import { Rocket, Trash2, UserPlus } from 'lucide-react'
import { api } from '@/lib/cms/api'
import { useAuth } from './auth'
import {
  btn, confirmAction, ErrorNote, formatDateTime, inputClass, Labeled, Loading, Modal, PageHeader, Panel, Pill, useApi, useToast,
} from './ui'

const FIELDS = [
  { key: 'notify_email', label: 'Send new-lead alerts to', type: 'email', hint: 'Every contact-form inquiry is emailed here.' },
  { key: 'contact_email', label: 'Public contact email', type: 'email', hint: 'Shown on the Contact page and in the footer. Leave empty to keep the default.' },
  { key: 'contact_phone', label: 'Public phone number', type: 'text', hint: 'Leave empty to keep the default.' },
  { key: 'contact_location', label: 'Public address', type: 'text', hint: 'Leave empty to keep the default.' },
  { key: 'social_linkedin', label: 'LinkedIn page', type: 'url', hint: 'Full https:// address. Shown as an icon in the footer.' },
  { key: 'social_facebook', label: 'Facebook page', type: 'url' },
  { key: 'social_instagram', label: 'Instagram profile', type: 'url' },
  { key: 'social_youtube', label: 'YouTube channel', type: 'url' },
]

function SiteSettings({ isAdmin }) {
  const { data, error, loading, reload } = useApi('/admin/settings')
  const toast = useToast()
  const [draft, setDraft] = useState({})
  const [busy, setBusy] = useState(false)

  if (loading) return <Loading />
  if (error) return <ErrorNote error={error} onRetry={reload} />
  const values = { ...data.settings, ...draft }

  async function save(event) {
    event.preventDefault()
    setBusy(true)
    try {
      await api('/admin/settings', { method: 'PUT', body: values })
      toast('Settings saved.')
      setDraft({})
      reload()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel title="Website settings">
      <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <Labeled key={field.key} label={field.label} hint={field.hint} className={field.hint ? '' : ''}>
            <input
              type={field.type}
              value={values[field.key] ?? ''}
              disabled={!isAdmin}
              onChange={(e) => setDraft((d) => ({ ...d, [field.key]: e.target.value }))}
              className={inputClass}
            />
          </Labeled>
        ))}
        <div className="sm:col-span-2">
          {isAdmin ? (
            <button type="submit" className={btn.primary} disabled={busy || Object.keys(draft).length === 0}>
              {busy ? 'Saving…' : 'Save settings'}
            </button>
          ) : (
            <p className="text-sm text-fg-muted">Only administrators can change these settings.</p>
          )}
        </div>
      </form>
    </Panel>
  )
}

function PasswordCard() {
  const toast = useToast()
  const [form, setForm] = useState({ current: '', next: '', again: '' })
  const [busy, setBusy] = useState(false)

  async function submit(event) {
    event.preventDefault()
    if (form.next !== form.again) {
      toast('The new passwords do not match.', 'error')
      return
    }
    setBusy(true)
    try {
      await api('/admin/password', { method: 'POST', body: { current: form.current, new: form.next } })
      toast('Password changed.')
      setForm({ current: '', next: '', again: '' })
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel title="Change my password">
      <form onSubmit={submit} className="space-y-4">
        <Labeled label="Current password"><input type="password" required autoComplete="current-password" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} className={inputClass} /></Labeled>
        <Labeled label="New password" hint="At least 10 characters."><input type="password" required minLength={10} autoComplete="new-password" value={form.next} onChange={(e) => setForm({ ...form, next: e.target.value })} className={inputClass} /></Labeled>
        <Labeled label="Repeat new password"><input type="password" required minLength={10} autoComplete="new-password" value={form.again} onChange={(e) => setForm({ ...form, again: e.target.value })} className={inputClass} /></Labeled>
        <button type="submit" className={btn.primary} disabled={busy}>{busy ? 'Saving…' : 'Change password'}</button>
      </form>
    </Panel>
  )
}

function Users() {
  const { user: me } = useAuth()
  const { data, error, loading, reload } = useApi('/admin/users')
  const toast = useToast()
  const [adding, setAdding] = useState(null)
  const [busy, setBusy] = useState(false)

  async function create(event) {
    event.preventDefault()
    setBusy(true)
    try {
      await api('/admin/users', { method: 'POST', body: adding })
      toast('User created.')
      setAdding(null)
      reload()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  async function patch(user, body, message) {
    try {
      await api(`/admin/users/${user.id}`, { method: 'PUT', body })
      toast(message)
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function remove(user) {
    if (!confirmAction(`Delete ${user.name}'s account?`)) return
    try {
      await api(`/admin/users/${user.id}`, { method: 'DELETE' })
      toast('User deleted.')
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <Panel
      title="Users"
      actions={<button type="button" className={btn.small} onClick={() => setAdding({ name: '', email: '', password: '', role: 'editor' })}><UserPlus className="size-3.5" />Add user</button>}
      padded={false}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="p-5"><ErrorNote error={error} onRetry={reload} /></div>
      ) : (
        <ul className="divide-y divide-line">
          {data.items.map((user) => (
            <li key={user.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 font-display text-sm font-bold text-fg normal-case">
                  {user.name}
                  <Pill tone={user.role === 'admin' ? 'published' : 'neutral'}>{user.role}</Pill>
                  {!user.active && <Pill tone="draft">Deactivated</Pill>}
                  {user.id === me.id && <Pill>You</Pill>}
                </p>
                <p className="truncate text-xs text-fg-muted">{user.email} · last sign-in {formatDateTime(user.lastLoginAt)}</p>
              </div>
              {user.id !== me.id && (
                <div className="flex gap-1.5">
                  <button type="button" className={btn.small} onClick={() => patch(user, { role: user.role === 'admin' ? 'editor' : 'admin' }, 'Role updated.')}>Make {user.role === 'admin' ? 'editor' : 'admin'}</button>
                  <button type="button" className={btn.small} onClick={() => patch(user, { active: !user.active }, user.active ? 'User deactivated.' : 'User reactivated.')}>{user.active ? 'Deactivate' : 'Reactivate'}</button>
                  <button type="button" className={btn.small} onClick={() => remove(user)} aria-label={`Delete ${user.name}`}><Trash2 className="size-3.5" /></button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <Modal open={Boolean(adding)} onClose={() => setAdding(null)} title="Add user">
        {adding && (
          <form onSubmit={create} className="space-y-4">
            <Labeled label="Name"><input type="text" required value={adding.name} onChange={(e) => setAdding({ ...adding, name: e.target.value })} className={inputClass} /></Labeled>
            <Labeled label="Email (their sign-in)"><input type="email" required value={adding.email} onChange={(e) => setAdding({ ...adding, email: e.target.value })} className={inputClass} /></Labeled>
            <Labeled label="Temporary password" hint="At least 10 characters. They can change it after signing in."><input type="text" required minLength={10} autoComplete="off" value={adding.password} onChange={(e) => setAdding({ ...adding, password: e.target.value })} className={inputClass} /></Labeled>
            <Labeled label="Role" hint="Editors can manage leads, chats and content. Only admins can change settings, users and publish.">
              <select value={adding.role} onChange={(e) => setAdding({ ...adding, role: e.target.value })} className={inputClass}>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </Labeled>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className={btn.secondary} onClick={() => setAdding(null)}>Cancel</button>
              <button type="submit" className={btn.primary} disabled={busy}>{busy ? 'Creating…' : 'Create user'}</button>
            </div>
          </form>
        )}
      </Modal>
    </Panel>
  )
}

function PublishCard() {
  const { data, error, loading, reload } = useApi('/admin/publish')
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  async function publish() {
    setBusy(true)
    try {
      const result = await api('/admin/publish', { method: 'POST' })
      toast(result.message)
      reload()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel title="Publish site">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorNote error={error} onRetry={reload} />
      ) : (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-fg-muted">
            Your changes already appear for visitors straight away. <b>Publish</b> rebuilds the site's static snapshot — what
            Google and social-media previews read — so large edits (new articles, rewritten text) are picked up by search engines.
            It takes a few minutes.
          </p>
          <p className="text-xs text-fg-subtle">
            {data.lastAt ? `Last publish: ${formatDateTime(data.lastAt)} (${data.lastStatus})` : 'Not published from here yet.'}
          </p>
          {data.configured ? (
            <button type="button" className={btn.primary} disabled={busy} onClick={publish}>
              <Rocket className="size-4" aria-hidden="true" />
              {busy ? 'Starting…' : 'Publish site'}
            </button>
          ) : (
            <p className="rounded-lg border border-line-strong bg-surface-muted p-3 text-sm text-fg-muted">
              The Publish button isn't connected yet. Add a GitHub token to <code>api/config.php</code> (see the setup guide), or
              run the “Deploy to Namecheap” workflow from your GitHub repository's Actions tab.
            </p>
          )}
        </div>
      )}
    </Panel>
  )
}

export default function Settings() {
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'
  return (
    <>
      <PageHeader title="Settings" description="Contact details, social links, your account and team access." />
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <SiteSettings isAdmin={isAdmin} />
          {isAdmin && <Users />}
        </div>
        <div className="space-y-6">
          {isAdmin && <PublishCard />}
          <PasswordCard />
        </div>
      </div>
    </>
  )
}
