import { useEffect } from 'react'
import { Link } from 'react-router'
import { siteConfig } from '@/config/site'
import { initAnalytics, setConsent, useConsent } from '@/lib/consent'

// Shown only when analytics is configured and the visitor hasn't chosen yet. "Reject" is as
// prominent as "Accept" (EU/UK rules); nothing is loaded before consent.
export default function ConsentBanner() {
  const consent = useConsent()
  useEffect(() => {
    initAnalytics()
  }, [])

  if (!siteConfig.analyticsId || consent) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-5 shadow-2xl sm:bottom-5"
    >
      <p className="text-sm leading-relaxed text-fg-muted">
        We use cookies for anonymous analytics so we can see which pages help visitors. Nothing is loaded unless you
        accept. See our <Link to="/privacy" className="font-semibold text-highlight underline">privacy policy</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setConsent('granted')}
          className="rounded-lg bg-primary px-5 py-2.5 font-display text-sm font-bold text-primary-fg"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => setConsent('denied')}
          className="rounded-lg border border-line px-5 py-2.5 font-display text-sm font-bold text-fg"
        >
          Reject
        </button>
      </div>
    </div>
  )
}
