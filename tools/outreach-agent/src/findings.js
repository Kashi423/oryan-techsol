// Which website finding to lead with. The finding mentioned in the email must be the one that
// justifies the offer (a slow-site note followed by a chatbot pitch reads as a non sequitur).
import { recommendOffer } from './offer.js'

function parse(lead) {
  try { return JSON.parse(lead?.audit || 'null') } catch { return null }
}

/** Up to 3 audit findings, the one behind the recommended offer first. */
export function auditBullets(lead) {
  const audit = parse(lead)
  if (!audit) return []
  const bullets = [...(audit.bullets ?? [])]
  const id = recommendOffer(lead, audit).checkId
  const primary = audit.items?.find((i) => i.id === id)?.bullet
  const ordered = primary && bullets.includes(primary) ? [primary, ...bullets.filter((b) => b !== primary)] : bullets
  return ordered.slice(0, 3)
}

/** A shorter business name for subject lines (long names make long subjects). */
export function shortName(name, max = 22) {
  const clean = String(name).replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const out = []
  for (const w of clean.split(' ')) {
    if ([...out, w].join(' ').length > max) break
    out.push(w)
  }
  while (out.length > 1 && /^(and|&|of|the|at|for)$/i.test(out[out.length - 1])) out.pop()
  return out.join(' ') || clean.slice(0, max)
}
