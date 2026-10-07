import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Navigate, useLocation } from 'react-router'
import Logo from '@/components/brand/Logo'
import { useAuth } from './auth'
import { btn, inputClass, Labeled } from './ui'

export default function Login() {
  const { user, loading, login, unavailable } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && user) return <Navigate to="/admin" replace />
  const notInstalled = unavailable || location.state?.unavailable

  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div data-tone="inverse" className="flex min-h-dvh items-center justify-center bg-surface p-4 text-fg">
      <div aria-hidden="true" className="bg-grid pointer-events-none fixed inset-0" />
      <div className="relative w-full max-w-sm rounded-2xl border border-line-strong bg-surface-raised p-7 shadow-card backdrop-blur-xl">
        <Logo />
        <h1 className="mt-6 text-2xl normal-case">Admin sign-in</h1>
        <p className="mt-1 text-sm text-fg-muted">Manage leads, chats, the blog, team and page text.</p>

        {notInstalled ? (
          <div role="alert" className="mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm leading-relaxed text-fg">
            The admin service isn't set up on this server yet. Follow the one-time setup guide
            (<code>docs/ADMIN-SETUP.md</code>) and open <code>/api/install.php</code> to finish.
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <Labeled label="Email">
              <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </Labeled>
            <Labeled label="Password">
              <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
            </Labeled>
            {error && (
              <p role="alert" className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-fg">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy} className={`${btn.primary} w-full`}>
              <Lock className="size-4" aria-hidden="true" />
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
