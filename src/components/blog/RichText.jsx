import { Link } from 'react-router'

// Renders the two bits of inline markup used in article copy:
//   [anchor text](/internal-path)   → client-side <Link> (or a plain <a> for http(s) URLs)
//   **bold**                        → <strong>
// Everything else is plain text. Internal links are what tie the articles to each other and
// to the service pages, so they are deliberately first-class here.
const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g

export default function RichText({ text }) {
  const parts = String(text).split(pattern).filter(Boolean)
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      const className =
        'font-semibold text-highlight underline decoration-highlight/40 underline-offset-2 transition-colors hover:decoration-highlight'
      // Article copy can come from the admin: only ever render internal paths or http(s)/mailto/tel
      // links, never javascript:, data: and the like.
      if (!/^(\/(?!\/)|https?:\/\/|mailto:|tel:|#)/i.test(href)) return label
      return href.startsWith('/') ? (
        <Link key={index} to={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      )
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/)
    if (bold) {
      return (
        <strong key={index} className="font-semibold text-fg">
          {bold[1]}
        </strong>
      )
    }
    return part
  })
}
