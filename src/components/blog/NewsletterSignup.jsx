import { useState } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui'
import { contactInfo } from '@/config/site'
import { api, ApiError } from '@/lib/cms/api'

// One-field signup. It posts to the existing contact endpoint, so a signup shows up in the admin
// Leads inbox tagged "Newsletter" (project type) with the page it came from. No extra backend.
export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [message, setMessage] = useState('')
  const [renderedAt] = useState(() => Date.now())

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setStatus('sending')
    setMessage('')
    try {
      await api('/public/contact', {
        method: 'POST',
        body: {
          name: 'Newsletter subscriber',
          email,
          need: 'Newsletter signup (monthly guides)',
          projectType: 'Newsletter',
          source: window.location.pathname,
          hp: new FormData(form).get('hp') ?? '',
          ts: renderedAt,
        },
      })
      setStatus('sent')
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof ApiError && error.status === 422
          ? 'Please enter a valid email address.'
          : `We couldn’t sign you up just now. Email ${contactInfo.email} and we’ll add you by hand.`,
      )
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-10 flex items-start gap-3 rounded-3xl border border-highlight/30 bg-highlight/5 p-6 sm:p-8">
        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-success" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-bold text-fg">You’re on the list.</p>
          <p className="mt-1 text-fg-muted">We’ll send you the next practical guide when it’s published.</p>
        </div>
      </div>
    )
  }

  return (
    <section aria-labelledby="newsletter-title" className="mt-10 rounded-3xl border border-line bg-surface-raised p-6 sm:p-8">
      <div className="flex items-center gap-2 text-highlight">
        <Mail className="size-5" aria-hidden="true" />
        <span className="font-display text-xs font-bold tracking-wide uppercase">Practical guides, by email</span>
      </div>
      <h2 id="newsletter-title" className="mt-2 text-2xl normal-case">
        Get the next guide in your inbox
      </h2>
      <p className="mt-2 max-w-xl leading-relaxed text-fg-muted">
        One useful article on apps, software, AI and automation when we publish. No spam, unsubscribe any time.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        {/* Honeypot: hidden from people, filled by bots. */}
        <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-w-0 flex-1 rounded-full border border-line-strong bg-surface px-5 py-3 text-fg placeholder:text-fg-subtle focus:border-highlight focus:outline-none"
        />
        <Button type="submit" size="lg" pill loading={status === 'sending'}>
          Subscribe
        </Button>
      </form>
      {message && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {message}
        </p>
      )}
      <p className="mt-3 text-xs text-fg-subtle">
        We use your email only to send these guides. See our{' '}
        <Link to="/privacy" className="underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </section>
  )
}
