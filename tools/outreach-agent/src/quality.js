// Quality gate for drafts: cheap local checks always, optional AI fact-check on demand.
import { config } from './config.js'
import { aiProvider, getClient, unsupportedClaim } from './write.js'

const SPAM = [
  [/\bfree\b/i, '"free"'], [/guarantee/i, '"guarantee"'], [/act now|buy now|order now/i, 'pushy call to action'],
  [/limited time|urgent|last chance|hurry/i, 'fake urgency'], [/click here/i, '"click here"'], [/risk[- ]free|no obligation/i, '"risk free"'],
  [/100%|\$\$+|!{2,}/, 'hype punctuation'], [/\bwinner\b|congratulations/i, 'prize language'],
]

export function localReview(draft, lead = {}) {
  const issues = []
  let score = 100
  const body = String(draft.body ?? '')
  const subject = String(draft.subject ?? '')
  const text = `${subject}\n${body}`
  const words = body.trim().split(/\s+/).filter(Boolean).length
  const hit = (penalty, msg) => { score -= penalty; issues.push(msg) }

  if (words > 150) hit(15, `Long (${words} words). Cold emails work best under 120.`)
  else if (words < 30) hit(10, `Very short (${words} words).`)
  for (const [re, label] of SPAM) if (re.test(text)) hit(10, `Spam-trigger wording: ${label}.`)
  const caps = (text.match(/\b[A-Z]{4,}\b/g) ?? []).filter((w) => !['HTTP', 'HTTPS', 'HTML', 'CSS', 'SEO', 'OSM'].includes(w))
  if (caps.length >= 1) hit(8, `ALL-CAPS words: ${caps.slice(0, 3).join(', ')}.`)
  if ((body.match(/https?:\/\//g) ?? []).length > 1) hit(10, 'More than one link.')
  if (!/\?/.test(body)) hit(10, 'No clear question or call to action.')
  const claim = unsupportedClaim(text)
  if (claim) hit(30, `Unsupported claim: ${claim}.`)
  if (subject.length > 65) hit(5, 'Subject is long (over 65 characters).')
  if (/[A-Z]{4,}|!/.test(subject)) hit(5, 'Subject has caps or exclamation marks.')
  if (lead.name && !text.toLowerCase().includes(String(lead.name).toLowerCase().split(/\s+/)[0])) hit(5, 'Does not mention the business by name.')

  // Numbers in the email should come from the facts we collected (15-minute chat is allowed).
  const known = JSON.stringify([lead.name, lead.address, lead.rating, lead.observations, lead.audit, lead.site_summary, lead.category])
  const stray = [...new Set(body.match(/\$?\d[\d,.]*%?/g) ?? [])].filter((n) => n !== '15' && !known.includes(n.replace(/[$%]/g, '')))
  if (stray.length) hit(15, `Mentions numbers that are not in the facts: ${stray.slice(0, 3).join(', ')}.`)

  score = Math.max(0, Math.min(100, score))
  return { score, level: score >= 80 ? 'good' : score >= 60 ? 'ok' : 'review', issues }
}

/** On-demand AI fact-check of one draft against the facts we collected. Falls back to the local review. */
export async function aiReview(draft, lead, { client } = {}) {
  const base = localReview(draft, lead)
  if (!client && !aiProvider()) return { ...base, ai: false }
  try {
    const c = client ?? getClient()
    const facts = JSON.stringify({ name: lead.name, category: lead.category, address: lead.address, website: lead.website, rating: lead.rating, observations: lead.observations, audit: lead.audit })
    const res = await c.messages.create({
      model: aiProvider() === 'openai' && !client ? config.openaiModel : config.model, max_tokens: 500,
      system: 'You fact-check cold outreach emails. Return ONLY JSON: {"issues": ["short issue", ...]}. List claims that are NOT supported by the facts, anything misleading, rude or likely to read as spam. Return {"issues": []} if the email is fine. Max 4 issues.',
      messages: [{ role: 'user', content: `Facts:\n${facts}\n\nEmail:\nSubject: ${draft.subject}\n\n${draft.body}` }],
    })
    const j = JSON.parse(res.content.filter((b) => b.type === 'text').map((b) => b.text).join('').match(/\{[\s\S]*\}/)[0])
    const extra = (Array.isArray(j.issues) ? j.issues : []).map(String).slice(0, 4)
    const score = Math.max(0, base.score - extra.length * 12)
    return { score, level: score >= 80 ? 'good' : score >= 60 ? 'ok' : 'review', issues: [...base.issues, ...extra.map((x) => `AI check: ${x}`)], ai: true }
  } catch {
    return { ...base, ai: false }
  }
}
