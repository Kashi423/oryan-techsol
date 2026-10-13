// Writes the email without any AI service. Used automatically when no AI key is configured.
import { config } from './config.js'

const hash = (s) => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

// Variant A: plain and specific. Variant B: a short question. Used for A/B comparison.
const SUBJECTS = {
  A: [(n) => `A quick idea for ${n}`, (n) => `${n}: a small website improvement`, (n) => `Online booking for ${n}`],
  B: [(n) => `Quick question about ${n}'s website`, (n) => `Is ${n}'s website working for you?`, (n) => `Can I help ${n} get more enquiries?`],
}

const OPENERS = [
  (n) => `I came across ${n} while looking at local businesses in your area.`,
  (n) => `I was looking at ${n} online and wanted to reach out.`,
  (n) => `I noticed ${n} while researching local businesses nearby.`,
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

export function templateDraft(lead, { step = 0, previous = null, variant = 'A', tone = '' } = {}) {
  const name = lead.name
  const sign = config.signOffName || config.fromName
  const h = hash(lead.id ?? lead.place_id ?? name)
  if (step > 0) {
    const bodies = [
      `Hi,\n\nJust bumping my note from earlier in case it got buried. Happy to share a quick example for ${name} if it would be useful.\n\n${sign}`,
      `Hi,\n\nFollowing up on my earlier email. If improving ${name}'s website isn't a priority right now, no problem at all; just let me know and I won't write again.\n\n${sign}`,
    ]
    return { subject: previous?.subject ? `Re: ${previous.subject.replace(/^Re:\s*/i, '')}` : `Following up: ${name}`, body: bodies[(step - 1) % bodies.length] }
  }
  const bullets = auditBullets(lead)
  const obs = pickObservation(JSON.parse(lead.observations || '[]'))
  const hasSite = !!lead.website
  let middle
  if (bullets.length) {
    middle = `Here is what I could see on the homepage:\n${bullets.slice(0, 2).map((b) => `- ${b}`).join('\n')}\nNone of this is hard to fix.`
  } else if (obs) {
    middle = `${obs.replace(/\.$/, '')}, which is usually a quick fix.`
  } else if (hasSite) {
    middle = 'A few small changes to a local business website can make it noticeably easier for customers to find you and get in touch.'
  } else {
    middle = `I couldn't find a website for ${name} online, and many customers now check for one before they call.`
  }
  const set = SUBJECTS[variant] ?? SUBJECTS.A
  const pitch = lead.offer
    ? `We build ${lead.offer} for local businesses, and that looks like the most useful place to start for ${name}.`
    : 'We build simple, fast websites, booking tools and small apps for local businesses.'
  const ask = 'Would a short 15-minute call this week be worth your time?'
  const body = tone === 'short'
    ? `Hi,\n\n${middle} ${ask}\n\n${sign}`
    : `Hi,\n\n${OPENERS[h % OPENERS.length](name)} ${middle}\n\n${pitch} ${ask}\n\n${sign}`
  return { subject: set[h % set.length](name), body }
}
