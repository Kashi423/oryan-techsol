import Anthropic from '@anthropic-ai/sdk'
import { config } from './config.js'
import { templateDraft } from './template.js'
import { startingPrice, money, servicesLine, proofPoints } from './catalog.js'
import { auditBullets } from './findings.js'

const systemPrompt = (signOff) => `You write cold outreach emails for Oryan Techsol, a small software company that builds custom websites, mobile apps, AI business chatbots and automation for local businesses. Every email must read like a short note from one person who really looked at THEIR business, not a template.

Structure of a FIRST email (50-95 words in total, three short paragraphs at most):
1. One specific, true observation about them, taken only from the supplied facts (their site, listing or reviews). Start with it. No flattery, no introduction of yourself or the company, no "I'm reaching out", no "my name is".
2. One sentence on the single thing we would fix and what it does for them. If a starting price is supplied you may add it once as "from $X".
3. One easy, interest-based question. Do NOT ask for a call, meeting or time in the first email. Offer something free and small instead, for example: "Want me to send over the two or three quick fixes I noted?"

Rules:
- Plain text only. Follow-ups: 25-70 words.
- Write as one human, sign off as "${signOff || config.signOffName || config.fromName}" with no title lines (a footer is appended automatically).
- Use ONLY the facts supplied about the business. Never invent numbers, awards, competitors, traffic, revenue or things you "noticed" that are not in the facts.
- Mention at most two of the supplied findings, phrased kindly and as something that could be improved, not as an insult. Never add findings that are not supplied.
- Describe observations only as what you could see ("I couldn't spot an online booking option on your homepage"), never as a certainty about their business ("patients cannot book online").
- No hype, no emojis, no ALL CAPS, no "I hope this email finds you well", no fake urgency, no "Re:" or "Fwd:" subjects, no links.
- Do not claim a prior relationship, past clients, projects, case studies or results unless a proof point is supplied below, used verbatim.
- Do not claim that they contacted us.
- Never state a number, year, date, percentage or price that is not in the supplied facts. Do not suggest changing anything to a specific year.
- Never claim to be cheaper, the cheapest, "below market" or better value than other agencies. Only quote a starting price if one is supplied below, exactly as written.
- Never say or imply you are local to them, based near them, or "here in <their city>". Do not state where Oryan Techsol is located. Do not call yourself a "local developer".
- Subject: 2 to 5 words, under 40 characters, containing the business name or one specific topic, no clickbait, no all caps. If a subject style is given, follow it.
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

export { auditBullets }

const STYLE = {
  A: 'Subject style A: plain and specific, 2-4 words, e.g. "<Business> online booking".',
  B: 'Subject style B: a short question, 3-5 words, e.g. "<Business>: online booking?".',
}

function facts(lead) {
  const obs = JSON.parse(lead.observations || '[]')
  const audit = auditBullets(lead)
  return [
    `Business: ${lead.name}`,
    lead.category && `Type: ${lead.category}`,
    lead.address && `Location: ${lead.address}`,
    lead.rating && `Google rating: ${lead.rating}`,
    lead.website ? `Website: ${lead.website}` : 'Website: none listed',
    lead.site_summary && `Homepage text: ${lead.site_summary}`,
    obs.length && `Observations about their site:\n- ${obs.join('\n- ')}`,
    audit.length && `Audit findings (what could be seen on the homepage):\n- ${audit.join('\n- ')}`,
  ].filter(Boolean).join('\n')
}

/** Adapter that exposes OpenAI chat completions through the same `messages.create` shape. */
function openaiClient() {
  return {
    messages: {
      create: async ({ system, messages, max_tokens }) => {
        const isOpenAI = config.openaiBaseUrl === 'https://api.openai.com/v1'
        // "Thinking" models spend part of the budget on reasoning, so leave generous headroom.
        const budget = Math.max(max_tokens, 2048)
        let lastErr
        // Main model first (2 tries), then each fallback model if the service is overloaded.
        for (const model of [config.openaiModel, ...config.openaiFallbackModels]) {
          for (let attempt = 0; attempt < 2; attempt++) {
            if (attempt) await new Promise((r) => setTimeout(r, 2500))
            let res
            try {
              res = await fetch(`${config.openaiBaseUrl}/chat/completions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.openaiKey}` },
                body: JSON.stringify({
                  model,
                  // api.openai.com wants the newer field name; compatible services still use max_tokens.
                  [isOpenAI ? 'max_completion_tokens' : 'max_tokens']: budget,
                  messages: [{ role: 'system', content: system }, ...messages],
                }),
                // A stalled request must never freeze a whole batch: give up and try the next model.
                signal: AbortSignal.timeout(config.aiTimeoutMs),
              })
            } catch (e) {
              lastErr = new Error(`AI service did not answer in time (${model}): ${e.message}`)
              continue
            }
            if (!res.ok) {
              const detail = (await res.text()).slice(0, 300)
              lastErr = new Error(`AI service ${res.status}: ${detail}`)
              if (/insufficient_quota|no credits|billing/i.test(detail)) {
                lastErr = new Error('The AI account has no credits left. Add credit at platform.openai.com/settings/organization/billing, or switch service in Setup.')
                throw lastErr // retrying cannot help
              }
              if ([429, 500, 502, 503, 504].includes(res.status)) continue // busy: retry, then next model
              if (res.status === 404 || /model/i.test(detail)) break // this model is gone or not allowed: next model
              throw lastErr
            }
            const text = (await res.json()).choices?.[0]?.message?.content ?? ''
            if (!text.trim()) { lastErr = new Error('AI service returned an empty reply'); continue }
            return { content: [{ type: 'text', text }] }
          }
        }
        throw lastErr
      },
    },
  }
}

/** Which writer is configured: a Claude key wins, then an OpenAI key. */
export function aiProvider() {
  return config.anthropicKey ? 'claude' : config.openaiKey ? 'openai' : null
}

export function getClient() {
  const p = aiProvider()
  if (p === 'claude') return new Anthropic({ apiKey: config.anthropicKey })
  if (p === 'openai') return openaiClient()
  throw new Error('Add a Claude key or an OpenAI key in Setup so the agent can write emails')
}

/** `client` is injectable for tests; defaults to whichever provider has a key. */
const TONES = {
  friendly: 'Tone: warm and conversational, like a helpful neighbour in the industry.',
  direct: 'Tone: direct and confident. Two or three short sentences, no filler.',
  short: 'Tone: very brief. Under 60 words in total.',
  formal: 'Tone: professional and polished, suited to a law firm or clinic.',
}
export const TONE_NAMES = Object.keys(TONES)

export async function draftEmail(lead, { step = 0, previous = null, client, variant = 'A', tone = '', signOff = '' } = {}) {
  // No AI key configured: use the built-in templates so the app works with zero setup.
  if (!client && !aiProvider()) return templateDraft(lead, { step, previous, variant, tone, signOff })
  try {
    return await draftWithAi(lead, { step, previous, client, variant, tone, signOff })
  } catch (e) {
    // The AI is unavailable (no credit, outage...): keep going with the built-in template.
    if (client) throw e
    return { ...templateDraft(lead, { step, previous, variant, tone, signOff }), fallbackReason: e.message }
  }
}

// Each follow-up has a different job, so the sequence does not feel like nagging.
const FOLLOW_UP = {
  1: 'Write follow-up #1 (30-60 words, sent 3 days later). Give ONE genuinely useful, specific tip from the supplied findings so it is valuable even if they never reply. No new claims, no pricing. End with a light interest question.',
  2: 'Write follow-up #2 (30-60 words, sent a week after the first email). Use a DIFFERENT angle from the first two emails: if a proof point is supplied, use it verbatim in one sentence; otherwise raise a second supplied finding. End with a light interest question. Do not just "check in".',
  3: 'Write follow-up #3, the final one (20-40 words, sent two weeks after the first email). A graceful break-up: say this is the last note so you do not clutter their inbox, and that they can reply any time and you will send the short list of fixes. No guilt, no pressure.',
}

/** Pins which finding each follow-up uses, so the sequence really has different angles. */
function angleHint(lead, step) {
  const b = auditBullets(lead)
  if (step === 1 && b[0]) return ` Base the tip on this finding: "${b[0]}"`
  if (step === 2 && b[1]) return ` Use this DIFFERENT finding and do not repeat the one used earlier: "${b[1]}"`
  return ''
}

async function draftWithAi(lead, { step, previous, client, variant, tone, signOff }) {
  const c = client ?? getClient()
  const task =
    step === 0
      ? 'Write the first outreach email.'
      : `${FOLLOW_UP[step] ?? FOLLOW_UP[3]}${angleHint(lead, step)} It follows this earlier email (do not repeat it):\n\nSubject: ${previous?.subject}\n\n${previous?.body}`
  const price = startingPrice(lead)
  const priceLine = price
    ? `\nStarting price you may quote, exactly as written: "from ${money(price)}". Do not round it, discount it, or compare it with others.`
    : '\nNo price is supplied: do not mention any price, cost or how affordable we are.'
  const proof = proofPoints()
  const proofLine = proof.length
    ? `\nReal proof you may use, verbatim, at most one: ${proof.map((p) => `"${p}"`).join(' | ')}`
    : '\nNo proof points are supplied: do not mention past clients, projects or results.'
  const offer = (lead.offer ? `\nLead with this one thing: ${lead.offer}. Do not list other services.` : '') + priceLine + proofLine
  const base = `${task}${step === 0 ? '\n' + (STYLE[variant] ?? STYLE.A) : ''}${TONES[tone] ? '\n' + TONES[tone] : ''}${offer}\n\nFacts:\n${facts(lead)}`
  let problem = null
  // One retry if the draft makes a claim we cannot back up; otherwise the caller falls back to the template.
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await c.messages.create({
      model: aiProvider() === 'openai' && !client ? config.openaiModel : config.model,
      max_tokens: 600,
      system: systemPrompt(signOff),
      messages: [{ role: 'user', content: attempt ? `${base}\n\nIMPORTANT: your last draft ${problem}. Rewrite it without that.` : base }],
    })
    const draft = parseDraft(res.content.filter((b) => b.type === 'text').map((b) => b.text).join(''))
    const all = `${draft.subject}\n${draft.body}`
    const stray = strayNumbers(all, lead)
    problem = unsupportedClaim(all) || (stray.length ? `used a number that is not in the facts (${stray.slice(0, 3).join(', ')})` : null)
    if (!problem) {
      // The signature is guaranteed in code, whatever the model did.
      const who = signOff || config.signOffName || config.fromName
      if (who && !endsWithName(draft.body, who)) draft.body = `${draft.body.trim()}\n\n${who}`
      // Follow-ups reply in the same thread, so keep the original subject (with "Re:") for clean threading.
      if (step > 0 && previous?.subject) draft.subject = `Re: ${previous.subject.replace(/^Re:\s*/i, '')}`
      return draft
    }
  }
  throw new Error(`Draft kept making an unsupported claim (${problem})`)
}

/** Claims the model must never make: being local to them, or inventing where we are. Returns a reason or null. */
/** Numbers in a draft that are not in the facts we collected (or the price you supplied). */
export function strayNumbers(text, lead = {}) {
  const price = startingPrice(lead)
  const known = JSON.stringify([lead.name, lead.address, lead.rating, lead.observations, lead.audit, lead.site_summary, lead.category, lead.phone]) + (price ? ` ${price} ${money(price)}` : '')
  const found = String(text).match(/\$?\d[\d,]*(?:\.\d+)?%?/g) ?? []
  return [...new Set(found.map((n) => n.replace(/[$%,]/g, '')))].filter((n) => n && !known.replace(/,/g, '').includes(n))
}

/** True when the last non-empty line of the body is just the sign-off name. */
export function endsWithName(body, name) {
  const last = String(body).trim().split('\n').filter((l) => l.trim()).pop() ?? ''
  return last.trim().toLowerCase().replace(/[,.!]+$/, '') === String(name).trim().toLowerCase()
}

export function unsupportedClaim(text) {
  if (/\b(ensures?|guarantee[ds]?|never miss|always (get|have|be)|you('| wi)ll (get|see|gain|win|double)|will (increase|double|boost|grow|triple|transform|skyrocket)|(double|triple) your|guaranteed|(get|bring|drive|secure|generate|win|attract)s?(ing)? (you |your \w+ )?(more|extra|new) )/i.test(text)) return 'promised a result'
  if (/\bwho (prefer|want|expect|like|tend to)\b/i.test(text)) return 'made a general claim that is not in the facts'
  if (/\b(does ?n[o']t|do ?n[o']t|does not|do not) (currently )?(feature|offer|include|show|provide|list)\b/i.test(text)) return 'stated a certainty instead of what was seen'
  if (/\b(most|many|majority of|studies show|research shows|statistics show|according to|everyone|nobody|people (prefer|expect|want)|customers (prefer|expect|want|now))\b[^.?!]{0,50}\b(patients|visitors|customers|people|clients|users|consumers|businesses|buyers)\b/i.test(text)
      && /\b(prefer|expect|want|check|choose|search|book|leave|abandon|trust|look for|rather|bounce|visit|use)\b/i.test(text)) return 'made a general claim that is not in the facts'
  if (/\b(there (is|are) no|there isn'?t|there'?s no|you (lack|don'?t have|do not have|have no|are missing|'?re missing)|(does ?n[o']t|do ?n[o']t|does not|do not) have|(your|the) (site|website|homepage) (lacks|is missing)|lacks (an?|any))\b/i.test(text)) return 'stated a certainty instead of what was seen'
  if (/\b(cheapest|lowest (price|cost)|best price|cheaper than|unbeatable (price|value)|below[- ]market|market rate|most affordable|undercut)\b/i.test(text)) return 'made a price comparison'
  if (/\b(i am|i'm|we are|we're|as) (a |an )?(local|neighbo(u)?r|nearby)\b/i.test(text)) return 'claimed to be local'
  if (/\bhere in\b/i.test(text)) return 'said "here in <city>"'
  if (/\b(based|located|headquartered) in\b/i.test(text)) return 'stated a location'
  if (/\bmy (team|company|clients)\b.*\bwho (have )?(worked|used)\b/i.test(text)) return 'invented a client reference'
  return null
}

/** Footer is appended in code, never by the model, so the opt-out + address can't be dropped. */
export function withFooter(body) {
  return `${body}\n\n--\n${config.fromName} | ${config.website}\n${servicesLine()}\n${config.postalAddress}\nNot relevant? Just reply "no thanks" and I won't email you again.`
}
