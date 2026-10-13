// Writes the email without any AI service. Used automatically when no AI key is configured,
// and as the fallback when the AI is unavailable or keeps making a claim we cannot support.
// Shape follows the research: a specific true observation, one fix, one easy interest question.
import { config } from './config.js'
import { startingPrice, money, proofPoints } from './catalog.js'
import { PHRASES } from './offer.js'
import { auditBullets, shortName } from './findings.js'

const hash = (s) => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

// The subject's topic follows the offer, so the subject and the body always agree.
const TOPIC = {
  'a simple, mobile-friendly website': 'website',
  'online booking or enquiry system': 'online booking',
  'a modern, mobile-friendly website refresh': 'mobile website',
  'a lead-capture form with an AI chatbot': 'new enquiries',
  'a faster, cleaner website': 'website speed',
  'a website refresh': 'website idea',
  'small automations and an AI assistant for enquiries': 'saving time',
}

// Variant A: plain and specific. Variant B: a short question. Kept under ~40 characters.
export function subjectFor(lead, variant, h) {
  const n = shortName(lead.name)
  const topic = TOPIC[lead.offer] ?? 'website idea'
  const sets = {
    A: [`${n} ${topic}`, `Quick idea, ${n}`, `${topic[0].toUpperCase()}${topic.slice(1)} for ${n}`],
    B: [`${n}: ${topic}?`, `Question about ${n}`, `${n} and ${topic}?`],
  }
  const set = sets[variant] ?? sets.A
  // Prefer the first style that fits; a long name falls back to a shorter wording.
  const pick = set[h % set.length]
  if (pick.length <= 40) return pick
  return set.find((s) => s.length <= 40) ?? `Idea for ${n}`.slice(0, 40)
}

// Interest-based asks. No call or meeting request in the first email.
const ASKS = [
  (n) => (n > 1 ? 'Want me to send over the quick fixes I noted?' : 'Want me to send over the quick fix I noted?'),
  (n) => (n > 1 ? 'Would a short list of fixes be useful?' : 'Would it help if I sent over the fix?'),
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

const stripDot = (s) => String(s).replace(/\.$/, '')
// "The footer..." -> "the footer...", but keep "I couldn't..." as is.
const lowerFirst = (s) => (/^I[ '’]/.test(s) ? s : s.replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase()))

export function templateDraft(lead, { step = 0, previous = null, variant = 'A', tone = '', signOff = '' } = {}) {
  const name = lead.name
  const sign = signOff || config.signOffName || config.fromName
  const h = hash(lead.id ?? lead.place_id ?? name)
  const bullets = auditBullets(lead)

  if (step > 0) {
    const reSubject = previous?.subject ? `Re: ${previous.subject.replace(/^Re:\s*/i, '')}` : `Following up: ${shortName(name)}`
    const proof = proofPoints()[0]
    const bodies = {
      1: bullets[0]
        ? `Hi,\n\nOne quick thing I'd fix first on your site: ${lowerFirst(stripDot(bullets[0]).replace(/^I couldn't (spot|see|find)/i, "it wasn't easy to spot"))}. It's usually a small change.\n\nHappy to send the short list if it's useful.\n\n${sign}`
        : `Hi,\n\nOne quick tip: make your phone number and enquiry button visible without scrolling on a phone. It's a small change that tends to help.\n\nHappy to send the short list of fixes if it's useful.\n\n${sign}`,
      2: proof
        ? `Hi,\n\n${stripDot(proof)}. I'd like to help you get something similar.\n\nWorth me sending the details?\n\n${sign}`
        : bullets[1]
          ? `Hi,\n\nAnother small thing I noticed on your site: ${lowerFirst(stripDot(bullets[1]))}. Easy to fix.\n\nWant me to outline how?\n\n${sign}`
          : `Hi,\n\nI put together a few small ideas for your website. Want me to send them over?\n\n${sign}`,
      3: `Hi,\n\nI'll stop here so I don't clutter your inbox. If improving your website comes up later, just reply and I'll send the short list of fixes.\n\n${sign}`,
    }
    return { subject: reSubject, body: bodies[step] ?? bodies[3] }
  }

  const obs = pickObservation(JSON.parse(lead.observations || '[]'))
  const hasSite = !!lead.website
  // Paragraph 1: one specific, true observation about them (the one behind the offer).
  // Several equivalent wordings are rotated, so a batch never reads as one copied message.
  const leadIns = ['I took a quick look at your site.', 'I was looking through your website earlier.', 'I spent a minute on your website.', 'I came across your site today.']
  const leadIn = leadIns[(h >>> 3) % leadIns.length]
  const finding = bullets.length ? `${stripDot(bullets[0])}.` : obs ? `${stripDot(obs)}.` : ''
  let first
  if (finding) first = hasSite ? `${leadIn} ${finding}` : finding
  else if (hasSite) first = `${leadIn} I have a couple of small ideas.`
  else first = `I couldn't find a website for ${shortName(name)} online.`
  // Paragraph 2: the one thing we would fix (price only if you have set one).
  const price = startingPrice(lead)
  const offer = PHRASES[lead.offer] || 'simple, fast websites, booking tools and small apps'
  const from = price ? `, with packages from ${money(price)}` : ''
  const fixes = [
    `We build ${offer} for local businesses${from}.`,
    `This is what we do: ${offer} for local businesses${from}.`,
    `We help local businesses with exactly this, building ${offer}${from}.`,
  ]
  // "That is something we do" only makes sense right after a finding; otherwise use the plain wording.
  const fix = finding ? fixes[(h >>> 5) % fixes.length] : fixes[0]
  // Paragraph 3: one easy interest-based question.
  const ask = ASKS[h % ASKS.length](Math.max(1, bullets.length))
  const subject = subjectFor(lead, variant, h)
  const body = tone === 'short'
    ? `Hi,\n\n${finding || first} ${ask}\n\n${sign}`
    : `Hi,\n\n${first}\n\n${fix} ${ask}\n\n${sign}`
  return { subject, body }
}
