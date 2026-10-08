import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { pinterestSaveHref } from './pinterest'

// Plain share links (no third-party scripts, no tracking) plus copy-link. Every share is a
// natural way for readers to turn an article into a backlink / social mention.
export default function ShareRow({ path, title, slug }) {
  const [copied, setCopied] = useState(false)
  const url = new URL(path, siteConfig.url).href
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    ...(slug ? [{ name: 'Pinterest', href: pinterestSaveHref({ slug, title, path }) }] : []),
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link', url)
    }
  }

  const pill =
    'inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface-raised px-3.5 py-1.5 font-display text-xs font-bold text-fg-muted transition-colors hover:border-highlight hover:text-highlight'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-wide text-fg-subtle uppercase">
        <Share2 className="size-3.5" aria-hidden="true" />
        Share
      </span>
      {targets.map((target) => (
        <a key={target.name} href={target.href} target="_blank" rel="noopener noreferrer" className={pill}>
          {target.name}
        </a>
      ))}
      <button type="button" onClick={copy} className={pill}>
        {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Link2 className="size-3.5" aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}
