import Anthropic from '@anthropic-ai/sdk'
import { config, requireKeys } from './config.js'

const systemPrompt = () => `You write short, honest cold outreach emails for Oryan Techsol, a small software company that builds custom websites, mobile apps, AI business chatbots and automation for local businesses.

Rules:
- Plain text only. First email: 70-110 words. Follow-ups: 35-60 words.
- Write as one human, sign off as "${config.signOffName || config.fromName}" with no title lines (a footer is appended automatically).
- Use ONLY the facts supplied about the business. Never invent numbers, awards, competitors, traffic, revenue or things you "noticed" that are not in the facts.
- At most one specific observation, phrased kindly and as something that could be improved, not as an insult.
- One clear, low-pressure call to action (e.g. "Worth a quick 15-minute chat?").
- No hype, no emojis, no ALL CAPS, no "I hope this email finds you well", no fake urgency, no "Re:" or "Fwd:" subjects.
- Do not claim a prior relationship or that they contacted us.
- Subject: under 8 words, specific, no clickbait.
Respond with ONLY a JSON object: {"subject": "...", "body": "..."}`

export function parseDraft(text) {
  const m = text.match(/\{[\s\S]*\}/)
  if (!m) throw new Error('No JSON in model output')
  const j = JSON.parse(m[0])
  if (typeof j.subject !== 'string' || typeof j.body !== 'string' || !j.subject.trim() || !j.body.trim()) {
    throw new Error('Draft missing subject/body')
  }
  return { subject: j.subject.trim().replace(/\s+/g, ' '), body: j.body.trim() }
}

function facts(lead) {
  const obs = JSON.parse(lead.observations || '[]')
  return [
    `Business: ${lead.name}`,
    lead.category && `Type: ${lead.category}`,
    lead.address && `Location: ${lead.address}`,
    lead.rating && `Google rating: ${lead.rating}`,
    lead.website ? `Website: ${lead.website}` : 'Website: none listed',
    lead.site_summary && `Homepage text: ${lead.site_summary}`,
    obs.length && `Observations about their site:\n- ${obs.join('\n- ')}`,
  ].filter(Boolean).join('\n')
}

/** `client` is injectable for tests; defaults to the real Anthropic SDK. */
export async function draftEmail(lead, { step = 0, previous = null, client } = {}) {
  let c = client
  if (!c) {
    requireKeys('anthropic')
    c = new Anthropic({ apiKey: config.anthropicKey })
  }
  const task =
    step === 0
      ? 'Write the first outreach email.'
      : `Write follow-up #${step}. It is a brief, friendly bump on this earlier email (do not repeat it, add no new claims):\n\nSubject: ${previous?.subject}\n\n${previous?.body}`
  const res = await c.messages.create({
    model: config.model,
    max_tokens: 600,
    system: systemPrompt(),
    messages: [{ role: 'user', content: `${task}\n\nFacts:\n${facts(lead)}` }],
  })
  const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('')
  return parseDraft(text)
}

/** Footer is appended in code, never by the model, so the opt-out + address can't be dropped. */
export function withFooter(body) {
  return `${body}\n\n--\n${config.fromName} | ${config.website}\n${config.postalAddress}\nNot relevant? Just reply "no thanks" and I won't email you again.`
}
