import Anthropic from '@anthropic-ai/sdk'
import { config } from './config.js'
import { templateDraft } from './template.js'
import { startingPrice, money, servicesLine } from './catalog.js'

const systemPrompt = () => `You write short, honest cold outreach emails for Oryan Techsol, a small software company that builds custom websites, mobile apps, AI business chatbots and automation for local businesses.

Rules:
- Plain text only. First email: 70-110 words. Follow-ups: 35-60 words.
- Write as one human, sign off as "${config.signOffName || config.fromName}" with no title lines (a footer is appended automatically).
- Use ONLY the facts supplied about the business. Never invent numbers, awards, competitors, traffic, revenue or things you "noticed" that are not in the facts.
- You may mention up to two of the supplied findings, phrased kindly and as something that could be improved, not as an insult. Never add findings that are not supplied.
- Describe observations only as what you could see ("I couldn't spot an online booking option on your homepage"), never as a certainty about their business ("patients cannot book online").
- One clear, low-pressure call to action (e.g. "Worth a quick 15-minute chat?").
- No hype, no emojis, no ALL CAPS, no "I hope this email finds you well", no fake urgency, no "Re:" or "Fwd:" subjects.
- Do not claim a prior relationship or that they contacted us.
- Never claim to be cheaper, the cheapest, "below market" or better value than other agencies. Only quote a starting price if one is supplied below, exactly as written.
- Never say or imply you are local to them, based near them, or "here in <their city>". Do not state where Oryan Techsol is located. Do not call yourself a "local developer".
- Subject: under 8 words, specific, no clickbait. If a subject style is given, follow it.
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

export function auditBullets(lead) {
  try { return (JSON.parse(lead.audit || 'null')?.bullets ?? []).slice(0, 3) } catch { return [] }
}

const STYLE = {
  A: 'Subject style A: plain and specific, e.g. "Online booking for <Business>".',
  B: 'Subject style B: a short, friendly question, e.g. "Quick question about <Business>\'s website?".',
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
            const res = await fetch(`${config.openaiBaseUrl}/chat/completions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.openaiKey}` },
              body: JSON.stringify({
                model,
                // api.openai.com wants the newer field name; compatible services still use max_tokens.
                [isOpenAI ? 'max_completion_tokens' : 'max_tokens']: budget,
                messages: [{ role: 'system', content: system }, ...messages],
              }),
            })
            if (!res.ok) {
              const detail = (await res.text()).slice(0, 300)
              lastErr = new Error(`AI service ${res.status}: ${detail}`)
              if (/insufficient_quota|no credits|billing/i.test(detail)) {
                lastErr = new Error('The AI account has no credits left. Add credit at platform.openai.com/settings/organization/billing, or switch service in Setup.')
                throw lastErr // retrying cannot help
              }
              if ([429, 500, 502, 503, 504].includes(res.status)) continue // busy: retry, then next model
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

export async function draftEmail(lead, { step = 0, previous = null, client, variant = 'A', tone = '' } = {}) {
  // No AI key configured: use the built-in templates so the app works with zero setup.
  if (!client && !aiProvider()) return templateDraft(lead, { step, previous, variant, tone })
  try {
    return await draftWithAi(lead, { step, previous, client, variant, tone })
  } catch (e) {
    // The AI is unavailable (no credit, outage...): keep going with the built-in template.
    if (client) throw e
    return { ...templateDraft(lead, { step, previous, variant, tone }), fallbackReason: e.message }
  }
}

// Each follow-up has a different job, so the sequence does not feel like nagging.
const FOLLOW_UP = {
  1: 'Write follow-up #1 (40-70 words). Add ONE genuinely useful, specific tip related to the supplied findings so it gives value even if they never reply. No new claims, no pricing.',
  2: 'Write follow-up #2, the last one (25-45 words). A graceful close: say this is the last note, no pressure, they can reply any time. One sentence offering a short call.',
}

async function draftWithAi(lead, { step, previous, client, variant, tone }) {
  const c = client ?? getClient()
  const task =
    step === 0
      ? 'Write the first outreach email.'
      : `${FOLLOW_UP[step] ?? FOLLOW_UP[2]} It follows this earlier email (do not repeat it):\n\nSubject: ${previous?.subject}\n\n${previous?.body}`
  const price = startingPrice(lead)
  const priceLine = price
    ? `\nStarting price you may quote, exactly as written: "from ${money(price)}". Do not round it, discount it, or compare it with others.`
    : '\nNo price is supplied: do not mention any price, cost or how affordable we are.'
  const offer = (lead.offer ? `\nLead with this one thing: ${lead.offer}. Do not list other services.` : '') + priceLine
  const base = `${task}${step === 0 ? '\n' + (STYLE[variant] ?? STYLE.A) : ''}${TONES[tone] ? '\n' + TONES[tone] : ''}${offer}\n\nFacts:\n${facts(lead)}`
  let problem = null
  // One retry if the draft makes a claim we cannot back up; otherwise the caller falls back to the template.
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await c.messages.create({
      model: aiProvider() === 'openai' && !client ? config.openaiModel : config.model,
      max_tokens: 600,
      system: systemPrompt(),
      messages: [{ role: 'user', content: attempt ? `${base}\n\nIMPORTANT: your last draft ${problem}. Rewrite it without that.` : base }],
    })
    const draft = parseDraft(res.content.filter((b) => b.type === 'text').map((b) => b.text).join(''))
    problem = unsupportedClaim(`${draft.subject}\n${draft.body}`)
    if (!problem) return draft
  }
  throw new Error(`Draft kept making an unsupported claim (${problem})`)
}

/** Claims the model must never make: being local to them, or inventing where we are. Returns a reason or null. */
export function unsupportedClaim(text) {
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
