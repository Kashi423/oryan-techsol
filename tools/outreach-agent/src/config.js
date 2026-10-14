import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const envFile = path.join(ROOT, '.env')
// Tests must never pick up your private keys and settings, so the test runner skips .env.
if (existsSync(envFile) && !process.env.NODE_TEST_CONTEXT) process.loadEnvFile(envFile)

const num = (v, d) => (v === undefined || v === '' || Number.isNaN(Number(v)) ? d : Number(v))

export const config = {
  // Sender identity (the Gmail account used for sending + reading replies)
  gmailUser: process.env.GMAIL_USER ?? '',
  gmailAppPassword: (process.env.GMAIL_APP_PASSWORD ?? '').replace(/\s+/g, ''),
  fromName: process.env.FROM_NAME ?? 'Oryan Techsol',
  // First name the emails are signed with; keep it the same person who owns the sending mailbox.
  signOffName: process.env.SIGN_OFF_NAME ?? '',
  replyTo: process.env.REPLY_TO ?? '',

  // Keys
  anthropicKey: process.env.ANTHROPIC_API_KEY ?? '',
  placesKey: process.env.GOOGLE_PLACES_API_KEY ?? '',
  // Optional alternative writer: an OpenAI API key (not a ChatGPT subscription login).
  openaiKey: process.env.OPENAI_API_KEY ?? '',
  openaiModel: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
  aiTimeoutMs: num(process.env.AI_TIMEOUT_SEC, 30) * 1000, // per attempt
  // Tried in order if the main model is overloaded.
  openaiFallbackModels: (process.env.OPENAI_FALLBACK_MODELS ?? '').split(',').map((s) => s.trim()).filter(Boolean),
  // Any OpenAI-compatible service works here (Gemini, Groq, OpenRouter, local Ollama...).
  openaiBaseUrl: (process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/+$/, ''),
  model: process.env.OUTREACH_MODEL ?? 'claude-sonnet-5-5',

  // Legal footer (CAN-SPAM needs a real postal address + a working opt-out)
  postalAddress: process.env.POSTAL_ADDRESS ?? '1938 West 7th Street, Brooklyn, NY',
  website: 'https://oryantechsol.com',
  phone: process.env.PHONE ?? '+1 (917) 217-0535',
  // auto = plain text for cold emails and follow-ups, branded HTML for replies to people who answered;
  // html = branded layout for everything; plain = text only
  emailStyle: (process.env.EMAIL_STYLE ?? 'auto').toLowerCase(),
  logoUrl: process.env.EMAIL_LOGO_URL ?? '', // optional; blank = text wordmark, no images

  // Guardrails
  dailyCap: num(process.env.DAILY_CAP, 15), // brand-new Gmail: start low, raise slowly
  minDelaySec: num(process.env.MIN_DELAY_SEC, 90),
  maxDelaySec: num(process.env.MAX_DELAY_SEC, 240),
  // Research-backed defaults: mid-week mornings in the RECIPIENT's local time.
  sendWindow: process.env.SEND_WINDOW ?? '8-11', // hours, recipient local time ("0-24" = any time)
  sendDays: (process.env.SEND_DAYS ?? 'tue,wed,thu').split(',').map((d) => d.trim().toLowerCase().slice(0, 3)),
  defaultTz: process.env.SEND_TZ ?? 'America/New_York', // used when the address has no US state
  // 3 follow-ups (4 touches total) spaced 3, 7 and 14 days after the first email.
  followUpDays: (process.env.FOLLOWUP_DAYS ?? '3,7,14').split(',').map(Number),
  // Across ALL mailboxes: they share one domain, so the domain-wide total is what mailbox providers see.
  totalDailyCap: num(process.env.TOTAL_DAILY_CAP, 40),
  // Prices are NOT quoted in emails unless you switch this on (QUOTE_PRICES=1). Offer a free consultation instead.
  quotePrices: process.env.QUOTE_PRICES === '1',
  warmup: process.env.WARMUP !== '0', // ramp the daily limit up gradually on a new sender
  warmupStart: num(process.env.WARMUP_START, 5), // emails per mailbox on its first day
  // Emails added per mailbox per day. Unset = the gentler default of +4 a week.
  warmupStepPerDay: process.env.WARMUP_STEP_PER_DAY === undefined || process.env.WARMUP_STEP_PER_DAY === '' ? null : num(process.env.WARMUP_STEP_PER_DAY, 0),
  bounceLimit: num(process.env.BOUNCE_LIMIT, 3), // auto-pause after N bounces in the last 25 sends

  dbPath: path.join(ROOT, 'data', 'outreach.db'),
  pauseFile: path.join(ROOT, 'PAUSE'),
}

export function requireKeys(...names) {
  const map = {
    gmail: ['GMAIL_USER', config.gmailUser, 'GMAIL_APP_PASSWORD', config.gmailAppPassword],
    anthropic: ['ANTHROPIC_API_KEY', config.anthropicKey],
    places: ['GOOGLE_PLACES_API_KEY', config.placesKey],
  }
  const missing = []
  for (const n of names) {
    const m = map[n]
    for (let i = 0; i < m.length; i += 2) if (!m[i + 1]) missing.push(m[i])
  }
  if (missing.length) throw new Error(`Missing in .env: ${missing.join(', ')} (see .env.example)`)
}
