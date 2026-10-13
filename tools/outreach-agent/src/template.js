// Writes the email without any AI service. Used automatically when no AI key is configured.
import { config } from './config.js'

const hash = (s) => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

const SUBJECTS = [
  (n) => `A quick idea for ${n}`,
  (n) => `${n}: a small website improvement`,
  (n) => `Quick question about ${n}'s website`,
]

const OPENERS = [
  (n) => `I came across ${n} while looking at local businesses in your area.`,
  (n) => `I was looking at ${n} online and wanted to reach out.`,
  (n) => `I noticed ${n} while researching local businesses nearby.`,
]

// Observations are factual notes collected from the business's own site; we use at most one.
const PRIORITY = [/viewport|phones/, /plain http|https/, /footer/, /booking|ordering|checkout/, /contact or enquiry form/, /Built on/]

function pickObservation(list) {
  for (const re of PRIORITY) {
    const hit = list.find((o) => re.test(o))
    if (hit) return hit
  }
  return null
}

export function templateDraft(lead, { step = 0, previous = null } = {}) {
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
  const obs = pickObservation(JSON.parse(lead.observations || '[]'))
  const hasSite = !!lead.website
  const middle = obs
    ? `${obs.replace(/\.$/, '')}, which is usually a quick fix.`
    : hasSite
      ? `A few small changes to a local business website can make it noticeably easier for customers to find you and get in touch.`
      : `I couldn't find a website for ${name} online, and many customers now check for one before they call.`
  const body = `Hi,\n\n${OPENERS[h % OPENERS.length](name)} ${middle}\n\nWe build simple, fast websites, booking tools and small apps for local businesses. Would a short 15-minute call this week be worth your time?\n\n${sign}`
  return { subject: SUBJECTS[h % SUBJECTS.length](name), body }
}
