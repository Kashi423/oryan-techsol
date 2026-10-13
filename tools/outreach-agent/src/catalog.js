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

export function saveCatalog(input) {
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
  if (memory) { memory = prices; return prices }
  mkdirSync(path.dirname(file()), { recursive: true })
  writeFileSync(file(), JSON.stringify(prices, null, 2))
  return prices
}

export const serviceByKey = (key) => getCatalog().find((s) => s.key === key) ?? null

/** The starting price you set for the service this lead would be offered, or null. */
export function startingPrice(lead) {
  const key = lead?.offer ? OFFERS[lead.offer] : null
  return key ? serviceByKey(key)?.from ?? null : null
}
export const money = (n) => `$${Number(n).toLocaleString('en-US')}`

/** One line listing everything you offer, for signatures and footers. */
export const servicesLine = () => SERVICES.map((s) => s.short).join(' · ')
