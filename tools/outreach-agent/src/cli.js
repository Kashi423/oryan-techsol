#!/usr/bin/env node
import { writeFileSync, unlinkSync, existsSync } from 'node:fs'
import { config, requireKeys } from './config.js'
import { openDb, domainOf } from './db.js'
import { searchPlaces } from './places.js'
import { enrichSite } from './enrich.js'
import { draftEmail, withFooter } from './write.js'
import { sendApproved, dueFollowUps, optOut, sentToday, makeTransport, inSendWindow } from './sender.js'
import { checkReplies } from './inbox.js'

const [cmd, ...rest] = process.argv.slice(2)
const flags = {}
const pos = []
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith('--')) {
    const k = rest[i].slice(2)
    const next = rest[i + 1]
    if (next === undefined || next.startsWith('--')) flags[k] = true
    else { flags[k] = next; i++ }
  } else pos.push(rest[i])
}
const limit = flags.limit ? Number(flags.limit) : Infinity

const HELP = `Oryan outreach agent

  find "<business type>" --in "<area>" [--max 40]   search Google Places, save leads
  enrich [--limit N]                                visit their sites, find a public email + facts
  draft  [--limit N]                                Claude writes first emails for ready leads
  list [drafts|leads|sent]                          see what's queued
  show <id>                                         read one draft with its footer
  approve <id...|all>   /   reject <id...>          you approve first emails (follow-ups auto-approve)
  followups                                         draft follow-ups for leads that haven't replied
  replies                                           read the inbox: mark replies, opt-outs, bounces
  send [--live] [--limit N] [--force]               send approved mail (dry-run unless --live)
  run [--live]                                      replies -> followups -> send  (schedule this)
  status                                            counts, today's sends, pause state
  unsub <email|domain>                              add to the do-not-contact list
  pause / resume                                    kill switch
  test-email                                        send a sample to yourself via Gmail
`

const db = openDb()
const log = (...a) => console.log(...a)

async function find() {
  const q = pos[0]
  if (!q || !flags.in) throw new Error('Usage: find "<business type>" --in "<area>"')
  const places = await searchPlaces(`${q} in ${flags.in}`, Number(flags.max ?? 40))
  const ins = db.prepare('INSERT OR IGNORE INTO leads (place_id,name,address,phone,website,category,rating,area) VALUES (?,?,?,?,?,?,?,?)')
  let added = 0
  for (const p of places) added += ins.run(p.place_id, p.name, p.address, p.phone, p.website, p.category, p.rating, String(flags.in)).changes
  const noSite = places.filter((p) => !p.website).length
  log(`Found ${places.length} businesses, ${added} new. ${noSite} have no website (call/visit those manually).`)
}

async function enrich() {
  const rows = db.prepare("SELECT * FROM leads WHERE status='found'").all().slice(0, limit)
  for (const l of rows) {
    if (!l.website) { db.prepare("UPDATE leads SET status='no_email' WHERE id=?").run(l.id); continue }
    const r = await enrichSite(l.website)
    const email = r.email
    const dup = email && db.prepare("SELECT 1 FROM leads WHERE domain=? AND id<>?").get(domainOf(email), l.id)
    const status = email && !dup ? 'ready' : 'no_email'
    db.prepare('UPDATE leads SET email=?, domain=?, observations=?, site_summary=?, status=? WHERE id=?')
      .run(email, email ? domainOf(email) : null, JSON.stringify(r.observations), r.summary, status, l.id)
    log(`${status === 'ready' ? 'ok  ' : 'skip'} ${l.name} -> ${email ?? r.error ?? 'no public email'}${dup ? ' (domain already a lead)' : ''}`)
  }
}

async function draft() {
  requireKeys('anthropic')
  const rows = db.prepare("SELECT * FROM leads WHERE status='ready'").all().slice(0, limit)
  for (const l of rows) {
    try {
      const d = await draftEmail(l)
      db.prepare("INSERT INTO messages (lead_id, step, subject, body) VALUES (?,0,?,?)").run(l.id, d.subject, d.body)
      db.prepare("UPDATE leads SET status='drafted' WHERE id=?").run(l.id)
      log(`drafted for ${l.name}: ${d.subject}`)
    } catch (e) { log(`draft failed for ${l.name}: ${e.message}`) }
  }
}

function list() {
  const what = pos[0] ?? 'drafts'
  const q = {
    drafts: "SELECT m.id, l.name, l.email, m.step, m.subject, m.status FROM messages m JOIN leads l ON l.id=m.lead_id WHERE m.status IN ('draft','approved') ORDER BY m.id",
    sent: "SELECT m.id, l.name, l.email, m.step, m.subject, m.sent_at FROM messages m JOIN leads l ON l.id=m.lead_id WHERE m.status='sent' ORDER BY m.sent_at DESC",
    leads: 'SELECT id, name, email, status, area FROM leads ORDER BY id',
  }[what]
  if (!q) throw new Error('list drafts|sent|leads')
  console.table(db.prepare(q).all())
}

function show() {
  const m = db.prepare('SELECT m.*, l.name, l.email FROM messages m JOIN leads l ON l.id=m.lead_id WHERE m.id=?').get(Number(pos[0]))
  if (!m) throw new Error('No such message')
  log(`To: ${m.name} <${m.email}>   [step ${m.step}, ${m.status}]\nSubject: ${m.subject}\n\n${withFooter(m.body)}`)
}

function setStatus(to, from) {
  const ids = pos[0] === 'all'
    ? db.prepare(`SELECT id FROM messages WHERE status='${from}' AND step=0`).all().map((r) => r.id)
    : pos.map(Number)
  for (const id of ids) {
    const m = db.prepare('SELECT * FROM messages WHERE id=?').get(id)
    if (!m) continue
    db.prepare('UPDATE messages SET status=? WHERE id=?').run(to, id)
    db.prepare('UPDATE leads SET status=? WHERE id=?').run(to === 'approved' ? 'approved' : 'skipped', m.lead_id)
  }
  log(`${to}: ${ids.length} message(s)`)
}

async function followups() {
  requireKeys('anthropic')
  for (const { lead, previous, step } of dueFollowUps(db)) {
    try {
      const d = await draftEmail(lead, { step, previous })
      // Follow-ups to a lead you already approved are auto-approved: this is the "auto-send" part.
      db.prepare("INSERT INTO messages (lead_id, step, subject, body, status) VALUES (?,?,?,?, 'approved')").run(lead.id, step, d.subject, d.body)
      log(`follow-up ${step} queued for ${lead.name}`)
    } catch (e) { log(`follow-up failed for ${lead.name}: ${e.message}`) }
  }
}

function status() {
  const by = db.prepare('SELECT status, COUNT(*) n FROM leads GROUP BY status').all()
  console.table(by)
  log(`Sent today: ${sentToday(db)} / ${config.dailyCap}`)
  log(`Send window ${config.sendWindow} Mon-Fri, open now: ${inSendWindow()}`)
  log(`Paused: ${existsSync(config.pauseFile)}`)
}

try {
  switch (cmd) {
    case 'find': await find(); break
    case 'enrich': await enrich(); break
    case 'draft': await draft(); break
    case 'list': list(); break
    case 'show': show(); break
    case 'approve': setStatus('approved', 'draft'); break
    case 'reject': setStatus('rejected', 'draft'); break
    case 'followups': await followups(); break
    case 'replies': log(await checkReplies(db)); break
    case 'send': log(`${await sendApproved(db, { live: !!flags.live, limit, force: !!flags.force })} message(s) ${flags.live ? 'sent' : 'would be sent (dry-run, add --live)'}`); break
    case 'run':
      if (flags.live) log(await checkReplies(db))
      await followups()
      log(`${await sendApproved(db, { live: !!flags.live })} message(s) ${flags.live ? 'sent' : 'dry-run'}`)
      break
    case 'status': status(); break
    case 'unsub': optOut(db, pos[0], 'manual'); log(`Suppressed ${pos[0]}`); break
    case 'pause': writeFileSync(config.pauseFile, 'paused'); log('Paused.'); break
    case 'resume': if (existsSync(config.pauseFile)) unlinkSync(config.pauseFile); log('Resumed.'); break
    case 'test-email': {
      const info = await makeTransport().sendMail({
        from: `"${config.fromName}" <${config.gmailUser}>`, to: config.gmailUser,
        subject: 'Oryan outreach agent: test', text: withFooter('This is a test email from the outreach agent.'),
      })
      log('Sent test to', config.gmailUser, info.messageId)
      break
    }
    default: log(HELP)
  }
} catch (e) {
  console.error('Error:', e.message)
  process.exitCode = 1
}
