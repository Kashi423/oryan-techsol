// "Who should I target?" suggestions: AI when available, a sensible built-in list otherwise.
import { config } from './config.js'
import { aiProvider, getClient } from './write.js'

export const FALLBACK_IDEAS = [
  { type: 'dentists', why: 'Often have dated sites and no online booking' },
  { type: 'physiotherapists', why: 'Appointment-driven, many rely on phone-only booking' },
  { type: 'plumbers', why: 'Local trades are frequently missing a proper website' },
  { type: 'electricians', why: 'Same: strong demand, weak web presence' },
  { type: 'hair salons', why: 'Bookings and galleries are a natural website win' },
  { type: 'restaurants', why: 'Menus and online ordering are often outdated PDFs' },
  { type: 'gyms', why: 'Memberships and class booking can be automated' },
  { type: 'real estate agents', why: 'Listings and lead capture drive their business' },
  { type: 'law firms', why: 'Trust-building sites and enquiry forms matter a lot' },
  { type: 'auto repair shops', why: 'Few have online quotes or booking' },
  { type: 'driving schools', why: 'Lesson booking and payments are often manual' },
  { type: 'photographers', why: 'Portfolio sites and enquiry flows' },
]

/** past: [{category, sent, replied}] from your own results, so suggestions learn from what works. */
export async function suggestTargets({ area = '', past = [], client } = {}) {
  if (!client && !aiProvider()) return { ideas: FALLBACK_IDEAS, ai: false }
  try {
    const c = client ?? getClient()
    const res = await c.messages.create({
      model: aiProvider() === 'openai' && !client ? config.openaiModel : config.model, max_tokens: 700,
      system: 'You suggest local business types that most likely need a new website, online booking, an AI chatbot or automation. Return ONLY JSON: {"ideas":[{"type":"plural business type","why":"max 12 words"}]} with 10 items, most promising first. Prefer types with a phone-first customer journey. Do not invent statistics.',
      messages: [{ role: 'user', content: `Area: ${area || 'not specified'}\nOur results so far (category, sent, replied): ${JSON.stringify(past)}\nAvoid repeating categories that got 0 replies after 20+ sends.` }],
    })
    const j = JSON.parse(res.content.filter((b) => b.type === 'text').map((b) => b.text).join('').match(/\{[\s\S]*\}/)[0])
    const ideas = (j.ideas ?? []).filter((i) => i?.type).slice(0, 12).map((i) => ({ type: String(i.type).slice(0, 40), why: String(i.why ?? '').slice(0, 120) }))
    if (ideas.length >= 3) return { ideas, ai: true }
  } catch { /* fall through */ }
  return { ideas: FALLBACK_IDEAS, ai: false }
}
