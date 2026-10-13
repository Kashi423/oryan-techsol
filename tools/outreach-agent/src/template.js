// Writes the email without any AI service. Used automatically when no AI key is configured,
// and as the fallback when the AI is unavailable or keeps making a claim we cannot support.
// Shape follows the research: a specific true observation, one fix, one easy interest question.
import { config } from './config.js'
import { startingPrice, money, proofPoints } from './catalog.js'
import { PHRASES } from './offer.js'

const hash = (s) => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

// Variant A: plain and specific. Variant B: a short question. Short, with the business name.
const SUBJECTS = {
  A: [(n) => `${n} online booking`, (n) => `${n} website idea`, (n) => `Quick idea, ${n}`],
  B: [(n) => `${n}: online booking?`, (n) => `Question about ${n}`, (n) => `${n} and new enquiries?`],
}

// Interest-based asks. No call or meeting request in the first email.
const ASKS = [
  (n) => `Want me to send over the ${n > 1 ? 'quick fixes' : 'quick fix'} I noted?`,
  (n) => `Would a short list of ${n > 1 ? 'fixes' : 'the fix'} be useful?`,
  () => 'Worth me sending the details?',
]

// Fallback when no audit data exists: one factual observation from the site.
const PRIORITY = [/viewport|phones/, /plain http|https/, /footer/, /booking|ordering|checkout/, /contact or enquiry form/, /Built on/]
function pickObservation(list) {
  for (const re of PRIORITY) {
    const hit = list.find((o) => re.test(o))
    if (hit) return hit
  }
  return null
}

function auditBullets(lead) {
  try { return (JSON.parse(lead.audit || 'null')?.bullets ?? []).slice(0, 3) } catch { return [] }
}

const stripDot = (s) => String(s).replace(/\.$/, '')
// "The footer..." -> "the footer...", but keep "I couldn't..." as is.
const lowerFirst = (s) => (/^I[ '’]/.test(s) ? s : s.replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase()))

export function templateDraft(lead, { step = 0, previous = null, variant = 'A', tone = '' } = {}) {
  const name = lead.name
  const sign = config.signOffName || config.fromName
  const h = hash(lead.id ?? lead.place_id ?? name)
  const bullets = auditBullets(lead)

  if (step > 0) {
    const reSubject = previous?.subject ? `Re: ${previous.subject.replace(/^Re:\s*/i, '')}` : `Following up: ${name}`
    const proof = proofPoints()[0]
    const bodies = {
      1: bullets[0]
        ? `Hi,\n\nOne quick thing I'd fix first on ${name}'s site: ${lowerFirst(stripDot(bullets[0]).replace(/^I couldn't (spot|see|find)/i, "it wasn't easy to spot"))}. It's usually a small change.\n\nHappy to send the short list if it's useful.\n\n${sign}`
        : `Hi,\n\nOne quick tip for ${name}: make your phone number and enquiry button visible without scrolling on a phone. It's a small change that tends to help.\n\nHappy to send the short list of fixes if it's useful.\n\n${sign}`,
      2: proof
        ? `Hi,\n\n${stripDot(proof)}. I'd like to help ${name} get something similar.\n\nWorth me sending the details?\n\n${sign}`
        : bullets[1]
          ? `Hi,\n\nAnother small thing I noticed on ${name}'s site: ${lowerFirst(stripDot(bullets[1]))}. Easy to fix.\n\nWant me to outline how?\n\n${sign}`
          : `Hi,\n\nI put together a few small ideas for ${name}'s website. Want me to send them over?\n\n${sign}`,
      3: `Hi,\n\nI'll stop here so I don't clutter your inbox. If improving ${name}'s website comes up later, just reply and I'll send the short list of fixes.\n\n${sign}`,
    }
    return { subject: reSubject, body: bodies[step] ?? bodies[3] }
  }

  const obs = pickObservation(JSON.parse(lead.observations || '[]'))
  const hasSite = !!lead.website
  // Paragraph 1: one specific, true observation about them.
  const finding = bullets.length ? `${stripDot(bullets[0])}.` : obs ? `${stripDot(obs)}.` : ''
  let first
  if (finding) first = hasSite ? `I took a quick look at ${name}'s site. ${finding}` : finding
  else if (hasSite) first = `I took a quick look at ${name}'s site and have a couple of small ideas.`
  else first = `I couldn't find a website for ${name} online.`
  // Paragraph 2: the one thing we would fix (price only if you have set one).
  const price = startingPrice(lead)
  const offer = PHRASES[lead.offer] || 'simple, fast websites, booking tools and small apps'
  const fix = `We build ${offer} for local businesses${price ? `, with packages from ${money(price)}` : ''}.`
  // Paragraph 3: one easy interest-based question.
  const ask = ASKS[h % ASKS.length](Math.max(1, bullets.length))
  const set = SUBJECTS[variant] ?? SUBJECTS.A
  const subject = set[h % set.length](name)
  const body = tone === 'short'
    ? `Hi,\n\n${finding || first} ${ask}\n\n${sign}`
    : `Hi,\n\n${first}\n\n${fix} ${ask}\n\n${sign}`
  return { subject, body }
}
