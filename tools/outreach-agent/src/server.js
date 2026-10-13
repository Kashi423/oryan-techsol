// Local web app: http://localhost:4477 . Binds to 127.0.0.1 only; secrets never leave this machine.
import http from 'node:http'
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import { config, ROOT } from './config.js'
import { findLeads, enrichLeads, draftLeads, queueFollowUps, setDraftStatus } from './pipeline.js'
import { sendApproved, sentToday, makeTransport, inSendWindow, optOut } from './sender.js'
import { checkReplies } from './inbox.js'
import { searchPlaces } from './places.js'
import { withFooter, getClient, aiProvider } from './write.js'
import { demoKit } from './demo.js'
import os from 'node:os'

const ENV_FILE = path.join(ROOT, '.env')
const KEY_MAP = {
  gmailUser: ['GMAIL_USER', 'gmailUser'],
  gmailAppPassword: ['GMAIL_APP_PASSWORD', 'gmailAppPassword'],
  anthropicKey: ['ANTHROPIC_API_KEY', 'anthropicKey'],
  openaiKey: ['OPENAI_API_KEY', 'openaiKey'],
  placesKey: ['GOOGLE_PLACES_API_KEY', 'placesKey'],
  fromName: ['FROM_NAME', 'fromName'],
  signOffName: ['SIGN_OFF_NAME', 'signOffName'],
  replyTo: ['REPLY_TO', 'replyTo'],
  dailyCap: ['DAILY_CAP', 'dailyCap'],
}

export function saveSettings(updates) {
  const lines = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, 'utf8').split(/\r?\n/) : []
  for (const [k, raw] of Object.entries(updates)) {
    if (!KEY_MAP[k] || raw === undefined || raw === null) continue
    const value = String(raw).trim()
    if (value === '') continue // blank means "leave as is"
    const [envName, cfgName] = KEY_MAP[k]
    const clean = k === 'gmailAppPassword' ? value.replace(/\s+/g, '') : value
    const idx = lines.findIndex((l) => l.startsWith(envName + '='))
    const line = `${envName}=${clean}`
    if (idx >= 0) lines[idx] = line
    else lines.push(line)
    config[cfgName] = k === 'dailyCap' ? Number(clean) : clean
    process.env[envName] = clean
  }
  writeFileSync(ENV_FILE, lines.join('\n').replace(/\n*$/, '\n'))
}

export function createApp(db, { demo = false } = {}) {
  const kit = demo ? demoKit() : {}
  if (demo) {
    // Demo must never touch real keys, the real .env or the real pause file.
    config.placesKey = 'demo'
    config.pauseFile = path.join(os.tmpdir(), 'oryan-demo-PAUSE')
    if (existsSync(config.pauseFile)) unlinkSync(config.pauseFile)
  }
  const job = { running: false, name: '', log: [], error: null, finished: null }
  const uiFile = path.join(ROOT, 'src', 'ui.html')
  const autoFile = path.join(ROOT, 'data', 'auto.json')
  let auto = false
  if (!demo) { try { auto = JSON.parse(readFileSync(autoFile, 'utf8')).auto === true } catch { /* default off */ } }
  const log = (m) => { job.log.push(`${new Date().toLocaleTimeString()}  ${m}`); if (job.log.length > 300) job.log.shift() }

  async function runJob(name, fn) {
    if (job.running) throw new Error(`"${job.name}" is still running`)
    Object.assign(job, { running: true, name, log: [], error: null, finished: null })
    fn().then((r) => { log(r ? `Done: ${typeof r === 'string' ? r : JSON.stringify(r)}` : 'Done') })
      .catch((e) => { job.error = e.message; log(`Stopped: ${e.message}`) })
      .finally(() => { job.running = false; job.finished = new Date().toISOString() })
  }

  const liveSend = (limit) => sendApproved(db, demo
    ? { live: true, limit, log, transport: kit.transport, force: true, wait: async () => {} }
    : { live: true, limit, log })
  const readInbox = () => (demo ? kit.checkReplies(db, { log }) : checkReplies(db, { log }))

  async function autoCycle() {
    if (!auto || job.running) return
    runJob('Auto mode', async () => {
      if (demo || config.gmailAppPassword) { try { await readInbox() } catch (e) { log(`Inbox check failed: ${e.message}`) } }
      if (demo || aiProvider()) await queueFollowUps(db, { log, client: kit.client })
      return `sent ${await liveSend(Infinity)}`
    }).catch(() => {})
  }
  const timer = setInterval(autoCycle, 20 * 60 * 1000)
  timer.unref?.()

  const state = () => ({
    demo,
    configured: demo
      ? { gmail: true, anthropic: true, places: true }
      : { gmail: !!(config.gmailUser && config.gmailAppPassword), anthropic: !!aiProvider(), places: !!config.placesKey },
    ai: aiProvider(),
    settings: { gmailUser: config.gmailUser, fromName: config.fromName, signOffName: config.signOffName, replyTo: config.replyTo, dailyCap: config.dailyCap },
    paused: existsSync(config.pauseFile),
    auto,
    sentToday: sentToday(db),
    windowOpen: demo || inSendWindow(),
    sendWindow: config.sendWindow,
    counts: Object.fromEntries(db.prepare('SELECT status, COUNT(*) n FROM leads GROUP BY status').all().map((r) => [r.status, r.n])),
    drafts: db.prepare("SELECT m.id, m.step, m.subject, m.body, m.status, l.name, l.email, l.website, l.category FROM messages m JOIN leads l ON l.id=m.lead_id WHERE m.status IN ('draft','approved') ORDER BY m.status, m.id").all(),
    sent: db.prepare("SELECT m.id, m.step, m.subject, m.sent_at, l.name, l.email, l.status AS lead_status FROM messages m JOIN leads l ON l.id=m.lead_id WHERE m.status='sent' ORDER BY m.sent_at DESC LIMIT 100").all(),
    job: { running: job.running, name: job.name, error: job.error, finished: job.finished, log: job.log.slice(-60) },
  })

  async function route(method, url, body) {
    if (method === 'GET' && url === '/api/state') return state()
    if (method !== 'POST') throw Object.assign(new Error('Not found'), { status: 404 })
    switch (url) {
      case '/api/settings': {
        if (body.dailyCap !== undefined && String(body.dailyCap).trim() !== '') {
          const n = Number(body.dailyCap)
          if (!Number.isInteger(n) || n < 1 || n > 200) throw new Error('Daily limit must be a whole number from 1 to 200')
        }
        if (demo) { if (body.dailyCap) config.dailyCap = Number(body.dailyCap); return { ok: true } }
        saveSettings(body)
        return { ok: true }
      }
      case '/api/demo/advance': {
        if (!demo) throw new Error('Only available in demo mode')
        db.prepare("UPDATE messages SET sent_at = datetime(sent_at, '-5 days') WHERE status='sent'").run()
        return { ok: true }
      }
      case '/api/test': {
        if (demo) return { ok: true, message: 'Demo mode: this would send / test the real connection.' }
        if (body.which === 'gmail') {
          const info = await makeTransport().sendMail({ from: `"${config.fromName}" <${config.gmailUser}>`, to: config.gmailUser, subject: 'Oryan outreach agent: test', text: withFooter('This is a test from the outreach agent.') })
          return { ok: true, message: `Test email sent to ${config.gmailUser}. Check that inbox.`, id: info.messageId }
        }
        if (body.which === 'anthropic') {
          const p = aiProvider()
          if (!p) throw new Error('Paste a Claude key or an OpenAI key first')
          await getClient().messages.create({ model: p === 'openai' ? config.openaiModel : config.model, max_tokens: 16, system: 'Reply with OK', messages: [{ role: 'user', content: 'Say OK' }] })
          return { ok: true, message: `${p === 'openai' ? 'OpenAI' : 'Claude'} key works.` }
        }
        if (body.which === 'places') {
          const r = await searchPlaces('coffee shop in New York', 1)
          return { ok: true, message: `Google Places key works (${r.length} result).` }
        }
        throw new Error('Unknown test')
      }
      case '/api/find': {
        const query = String(body.query ?? '').trim(); const area = String(body.area ?? '').trim()
        if (!query || !area) throw new Error('Enter a business type and an area')
        const max = Math.min(Number(body.max) || 20, 60)
        await runJob(`Finding ${query} in ${area}`, async () => {
          log('Searching Google Maps...')
          const f = await findLeads(db, { query, area, max, fetchImpl: kit.placesFetch })
          log(`${f.found} businesses found, ${f.added} new, ${f.noWebsite} without a website (skipped)`)
          log('Reading their websites for a public email...')
          const e = await enrichLeads(db, { log, fetchImpl: kit.siteFetch })
          log(`${e.ready} have a usable email`)
          if (!demo && !aiProvider()) throw new Error('Add a Claude key or an OpenAI key in Setup to write emails')
          log('Writing personalised emails...')
          return draftLeads(db, { log, client: kit.client })
        })
        return { ok: true }
      }
      case '/api/edit': {
        db.prepare("UPDATE messages SET subject=?, body=? WHERE id=? AND status IN ('draft','approved')").run(String(body.subject).slice(0, 200), String(body.body).slice(0, 5000), Number(body.id))
        return { ok: true }
      }
      case '/api/approve': return { changed: setDraftStatus(db, body.ids === 'all' ? 'all' : body.ids, 'approved') }
      case '/api/reject': return { changed: setDraftStatus(db, body.ids === 'all' ? 'all' : body.ids, 'rejected') }
      case '/api/send': {
        if (!demo && !config.gmailAppPassword) throw new Error('Finish Gmail setup first')
        await runJob('Sending approved emails', async () => `sent ${await liveSend(Number(body.limit) || Infinity)}`)
        return { ok: true }
      }
      case '/api/check-replies': {
        await runJob('Checking replies', async () => readInbox())
        return { ok: true }
      }
      case '/api/followups': {
        await runJob('Writing follow-ups', async () => queueFollowUps(db, { log, client: kit.client }))
        return { ok: true }
      }
      case '/api/auto': {
        auto = !!body.on
        if (!demo) { try { writeFileSync(autoFile, JSON.stringify({ auto })) } catch { /* data dir may not exist yet */ } }
        return { auto }
      }
      case '/api/pause': writeFileSync(config.pauseFile, 'paused'); return { paused: true }
      case '/api/resume': if (existsSync(config.pauseFile)) unlinkSync(config.pauseFile); return { paused: false }
      case '/api/unsub': optOut(db, String(body.email), 'manual'); return { ok: true }
      default: throw Object.assign(new Error('Not found'), { status: 404 })
    }
  }

  return http.createServer(async (req, res) => {
    const send = (code, obj, type = 'application/json') => { res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' }); res.end(type === 'application/json' ? JSON.stringify(obj) : obj) }
    // Only the local machine, and only this app's own origin, may call the API.
    const host = (req.headers.host ?? '').split(':')[0]
    if (host !== 'localhost' && host !== '127.0.0.1') return send(403, { error: 'Forbidden' })
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) return send(200, readFileSync(uiFile, 'utf8'), 'text/html; charset=utf-8')
    if (req.method === 'POST' && req.headers.origin && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(req.headers.origin)) return send(403, { error: 'Forbidden' })
    try {
      let body = {}
      if (req.method === 'POST') {
        const chunks = []
        for await (const c of req) chunks.push(c)
        body = JSON.parse(Buffer.concat(chunks).toString() || '{}')
      }
      send(200, await route(req.method, req.url.split('?')[0], body))
    } catch (e) {
      send(e.status ?? 400, { error: e.message })
    }
  })
}
