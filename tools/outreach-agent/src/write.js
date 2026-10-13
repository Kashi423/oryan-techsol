import Anthropic from '@anthropic-ai/sdk'
import { config } from './config.js'
import { templateDraft } from './template.js'

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
export async function draftEmail(lead, { step = 0, previous = null, client, variant = 'A' } = {}) {
  // No AI key configured: use the built-in templates so the app works with zero setup.
  if (!client && !aiProvider()) return templateDraft(lead, { step, previous, variant })
  try {
    return await draftWithAi(lead, { step, previous, client, variant })
  } catch (e) {
    // The AI is unavailable (no credit, outage...): keep going with the built-in template.
    if (client) throw e
    return { ...templateDraft(lead, { step, previous, variant }), fallbackReason: e.message }
  }
}

async function draftWithAi(lead, { step, previous, client, variant }) {
  const c = client ?? getClient()
  const task =
    step === 0
      ? 'Write the first outreach email.'
      : `Write follow-up #${step}. It is a brief, friendly bump on this earlier email (do not repeat it, add no new claims):\n\nSubject: ${previous?.subject}\n\n${previous?.body}`
  const res = await c.messages.create({
    model: aiProvider() === 'openai' && !client ? config.openaiModel : config.model,
    max_tokens: 600,
    system: systemPrompt(),
    messages: [{ role: 'user', content: `${task}${step === 0 ? '\n' + (STYLE[variant] ?? STYLE.A) : ''}\n\nFacts:\n${facts(lead)}` }],
  })
  const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('')
  return parseDraft(text)
}

/** Footer is appended in code, never by the model, so the opt-out + address can't be dropped. */
export function withFooter(body) {
  return `${body}\n\n--\n${config.fromName} | ${config.website}\n${config.postalAddress}\nNot relevant? Just reply "no thanks" and I won't email you again.`
}
