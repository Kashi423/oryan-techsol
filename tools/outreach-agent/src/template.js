// Writes the email without any AI service. Used automatically when no AI key is configured,
// and as the fallback when the AI is unavailable or keeps making a claim we cannot support.
// Shape: greeting, one-line introduction, one specific true observation, what we would do about
// it, and an offer of a free consultation. No price is quoted unless QUOTE_PRICES=1.
import { config } from './config.js'
import { startingPrice, money, proofFor } from './catalog.js'
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
  const pick = set[h % set.length]
  if (pick.length <= 40) return pick
  return set.find((s) => s.length <= 40) ?? `Idea for ${n}`.slice(0, 40)
}

// One-line introduction, rotated so a batch never reads as one copied message.
const INTROS = [
  (who) => `I'm ${who} from Oryan Techsol. We build websites, mobile apps, AI chatbots and automation for local businesses.`,
  (who) => `${who} here from Oryan Techsol, where we build websites, mobile apps, AI chatbots and automation for local businesses.`,
  (who) => `I'm ${who} at Oryan Techsol, a software company that builds websites, mobile apps, AI chatbots and automation for local businesses.`,
]

// The offer: a free consultation, asked as an easy question.
const CONSULTS = [
  (n) => `I'd be glad to offer you a free consultation to go through ${n > 1 ? 'the fixes' : 'the fix'} I noted. Would that be useful?`,
  (n) => `We offer a free consultation, and I'd be happy to walk you through ${n > 1 ? 'what I noted' : 'the fix I noted'}. Would that help?`,
  (n) => `Would a free consultation to go through ${n > 1 ? 'the fixes' : 'the fix'} I noted be useful?`,
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
  const greeting = `Hi ${shortName(name)} team,`
  const close = `Best regards,\n${sign}`

  if (step > 0) {
    const reSubject = previous?.subject ? `Re: ${previous.subject.replace(/^Re:\s*/i, '')}` : `Following up: ${shortName(name)}`
    const proof = proofFor(lead)
    const bodies = {
      1: bullets[0]
        ? `${greeting}\n\nOne quick thing I'd fix first on your site: ${lowerFirst(stripDot(bullets[0]).replace(/^I couldn't (spot|see|find)/i, "it wasn't easy to spot"))}. It's usually a small change.\n\nHappy to go through the rest in a free consultation if that's useful.\n\n${close}`
        : `${greeting}\n\nOne quick tip: make your phone number and enquiry button visible without scrolling on a phone. It's a small change that tends to help.\n\nHappy to go through more in a free consultation if that's useful.\n\n${close}`,
      2: proof
        ? `${greeting}\n\n${stripDot(proof)}. I'd like to help you get something similar.\n\nWould a free consultation be useful?\n\n${close}`
        : bullets[1]
          ? `${greeting}\n\nAnother small thing I noticed on your site: ${lowerFirst(stripDot(bullets[1]))}. Easy to fix.\n\nWould you like to go through it in a free consultation?\n\n${close}`
          : `${greeting}\n\nI put together a few small ideas for your website. Would you like to go through them in a free consultation?\n\n${close}`,
      3: `${greeting}\n\nI'll stop here so I don't clutter your inbox. If improving your website comes up later, just reply and we'll set up a free consultation.\n\n${close}`,
    }
    return { subject: reSubject, body: bodies[step] ?? bodies[3] }
  }

  const obs = pickObservation(JSON.parse(lead.observations || '[]'))
  const hasSite = !!lead.website
  // Paragraph 2: one specific, true observation about them (the one behind the offer).
  const leadIns = ['I took a quick look at your site.', 'I was looking through your website earlier.', 'I spent a minute on your website.', 'I came across your site today.']
  const leadIn = leadIns[(h >>> 3) % leadIns.length]
  const finding = bullets.length ? `${stripDot(bullets[0])}.` : obs ? `${stripDot(obs)}.` : ''
  let first
  if (finding) first = hasSite ? `${leadIn} ${finding}` : finding
  else if (hasSite) first = `${leadIn} I have a couple of small ideas.`
  else first = `I couldn't find a website for ${shortName(name)} online.`
  // Paragraph 3: the one thing we would do about it (price only if QUOTE_PRICES=1 and you set one).
  const price = startingPrice(lead)
  const offer = PHRASES[lead.offer] || 'simple, fast websites, booking tools and small apps'
  const from = price ? `, with packages from ${money(price)}` : ''
  const fixes = [
    `We build ${offer} for local businesses${from}.`,
    `This is what we do: ${offer} for local businesses${from}.`,
    `We help local businesses with exactly this, building ${offer}${from}.`,
  ]
  const fix = finding ? fixes[(h >>> 5) % fixes.length] : fixes[0]
  // One true, relevant proof sentence when you have one for this kind of business (never invented).
  const proofLine = proofFor(lead)
  // Paragraph 4: the free consultation.
  const consult = CONSULTS[h % CONSULTS.length](Math.max(1, bullets.length))
  // If the sign-off is the company name itself, introduce the company rather than "X from X".
  const intro = /oryan/i.test(sign)
    ? "We're Oryan Techsol, a software company that builds websites, mobile apps, AI chatbots and automation for local businesses."
    : INTROS[(h >>> 7) % INTROS.length](sign)
  const subject = subjectFor(lead, variant, h)
  const body = tone === 'short'
    ? `${greeting}\n\n${finding || first} ${consult}\n\n${close}`
    : `${greeting}\n\n${intro}\n\n${first}\n\n${fix}${proofLine ? ` ${stripDot(proofLine)}.` : ''}\n\n${consult}\n\n${close}`
  return { subject, body }
}
