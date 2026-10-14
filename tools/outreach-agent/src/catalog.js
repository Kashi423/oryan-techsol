// Services you sell and the starting price for each. Prices are YOURS to fill in; none are invented.
// Emails may quote a starting price only when you have entered one.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { config } from './config.js'
import { OFFERS } from './offer.js'

export const SERVICES = [
  { key: 'web', name: 'Websites', short: 'Websites', blurb: 'Marketing sites, booking pages and web apps' },
  { key: 'app', name: 'Mobile apps', short: 'Mobile apps', blurb: 'iOS, Android and cross-platform apps' },
  { key: 'ai', name: 'AI chatbots', short: 'AI chatbots', blurb: 'Chat and voice bots that answer enquiries' },
  { key: 'automation', name: 'Business automation', short: 'Automation', blurb: 'Workflow and process automation' },
  { key: 'ecommerce', name: 'E-commerce', short: 'E-commerce', blurb: 'Online stores and custom storefronts' },
  { key: 'software', name: 'Custom software', short: 'Custom software', blurb: 'Internal tools and custom systems' },
  { key: 'saas', name: 'SaaS development', short: 'SaaS', blurb: 'Product builds from MVP to scale' },
  { key: 'integrations', name: 'API integrations', short: 'Integrations', blurb: 'Connect your CRM, payments and other systems' },
]

const file = () => path.join(path.dirname(config.dbPath), 'catalog.json')
let memory = null // demo/test override

function readPrices() {
  if (memory) return memory
  try { return JSON.parse(readFileSync(file(), 'utf8')) } catch { return {} }
}

export function useMemoryCatalog(initial = {}) { memory = { ...initial } }

export function getCatalog() {
  const prices = readPrices()
  return SERVICES.map((s) => ({ ...s, from: prices[s.key] ? Number(prices[s.key]) : null }))
}

/** Real, true statements about work you have done. Empty until YOU add some; nothing is invented. */
export function proofPoints() {
  const p = readPrices().proof
  return Array.isArray(p) ? p.filter((x) => typeof x === 'string' && x.trim()).slice(0, 5) : []
}

// Which kind of business a proof point speaks to: [what the lead looks like, what the proof says].
const INDUSTRIES = [
  [/clinic|dental|dentist|orthodont|doctor|medical|physio|health|surgeon|hospital|wellness|optic|chiropract/i, /clinic|patient|dental|medical/i],
  [/pharmac|chemist|drug ?store/i, /pharmac/i],
  [/school|academy|college|tutor|education|institute|kindergarten|montessori|training/i, /school|student|education/i],
  [/hotel|resort|motel|lodg|travel|hostel|villa|guest ?house/i, /hotel|travel|stays?\b/i],
]
const ALL_PROOF_TOPICS = new RegExp(INDUSTRIES.map(([, p]) => p.source).join('|'), 'i')

/**
 * The one real proof point that fits this business, or null.
 * An industry-specific proof is used only for that industry (a school portal is not shown to a
 * plumber). A proof that names no industry at all counts as general and may be used for anyone.
 */
export function proofFor(lead) {
  const proofs = proofPoints()
  if (!proofs.length) return null
  const hay = `${lead?.category ?? ''} ${lead?.name ?? ''}`
  for (const [leadRe, proofRe] of INDUSTRIES) {
    if (leadRe.test(hay)) {
      const hit = proofs.find((p) => proofRe.test(p))
      if (hit) return hit
    }
  }
  return proofs.find((p) => !ALL_PROOF_TOPICS.test(p)) ?? null
}

export function saveProof(lines) {
  const proof = String(Array.isArray(lines) ? lines.join('\n') : lines ?? '')
    .split('\n').map((l) => l.trim().replace(/\s+/g, ' ')).filter(Boolean).slice(0, 5)
  for (const l of proof) {
    if (l.length > 160) throw new Error('Each proof point must be under 160 characters')
    if (/https?:\/\//i.test(l)) throw new Error('Proof points cannot contain links')
  }
  const prices = { ...readPrices(), proof }
  if (memory) { memory = prices; return proof }
  mkdirSync(path.dirname(file()), { recursive: true })
  writeFileSync(file(), JSON.stringify(prices, null, 2))
  return proof
}

export function saveCatalog(input) {
  const keepProof = readPrices().proof
  const prices = {}
  for (const s of SERVICES) {
    const given = String(input?.[s.key] ?? '').trim()
    if (given === '') continue
    // Accept "499", "$499", "1,200" or "499.50". Anything else (minus signs, letters) is refused, not guessed at.
    if (!/^[$€£]?\s*\d[\d,]*(\.\d{1,2})?$/.test(given)) throw new Error(`Price for ${s.name} must be a plain number such as 499`)
    const n = Number(given.replace(/[^0-9.]/g, ''))
    if (!Number.isFinite(n) || n <= 0 || n > 1_000_000) throw new Error(`Price for ${s.name} must be above 0 and at most 1,000,000`)
    prices[s.key] = Math.round(n)
  }
  if (keepProof) prices.proof = keepProof // saving prices must not wipe your proof points
  if (memory) { memory = prices; return prices }
  mkdirSync(path.dirname(file()), { recursive: true })
  writeFileSync(file(), JSON.stringify(prices, null, 2))
  return prices
}

export const serviceByKey = (key) => getCatalog().find((s) => s.key === key) ?? null

/** The starting price you set for the service this lead would be offered, or null. */
export function startingPrice(lead) {
  if (!config.quotePrices) return null // default: no price in emails, offer a free consultation
  const key = lead?.offer ? OFFERS[lead.offer] : null
  return key ? serviceByKey(key)?.from ?? null : null
}
export const money = (n) => `$${Number(n).toLocaleString('en-US')}`

/** One line listing everything you offer, for signatures and footers. */
export const servicesLine = () => SERVICES.map((s) => s.short).join(' · ')
