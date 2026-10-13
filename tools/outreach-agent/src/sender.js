import { existsSync } from 'node:fs'
import nodemailer from 'nodemailer'
import { config, requireKeys } from './config.js'
import { isSuppressed, suppress } from './db.js'
import { withFooter } from './write.js'

export function makeTransport() {
  requireKeys('gmail')
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: config.gmailUser, pass: config.gmailAppPassword },
  })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const roleLike = /^(noreply|no-reply|abuse|postmaster|mailer-daemon)@/i

export function inSendWindow(now = new Date(), window = config.sendWindow) {
  const [from, to] = window.split('-').map(Number)
  const day = now.getDay()
  return day >= 1 && day <= 5 && now.getHours() >= from && now.getHours() < to
}

export function sentToday(db) {
  return db.prepare("SELECT COUNT(*) c FROM messages WHERE status='sent' AND date(sent_at,'localtime') = date('now','localtime')").get().c
}

/**
 * Today's real sending limit. Your configured limit is the ceiling; with warm-up on, a new sender
 * starts at 5 a day and gains 4 a day each week. Two or more recent bounces hold it at 5.
 */
export function effectiveCap(db, now = new Date()) {
  const ceiling = config.dailyCap
  if (!config.warmup) return { cap: ceiling, ceiling, week: null, held: false }
  const first = db.prepare("SELECT MIN(sent_at) t FROM messages WHERE status='sent'").get().t
  const days = first ? Math.max(0, Math.floor((now - new Date(first.replace(' ', 'T') + 'Z')) / 86_400_000)) : 0
  const week = Math.floor(days / 7)
  const bounces = db.prepare(
    "SELECT COUNT(*) c FROM (SELECT l.status FROM messages m JOIN leads l ON l.id = m.lead_id WHERE m.status='sent' ORDER BY m.sent_at DESC, m.id DESC LIMIT 25) WHERE status='bounced'",
  ).get().c
  const held = bounces >= 2
  const ramp = held ? 5 : 5 + week * 4
  return { cap: Math.max(1, Math.min(ceiling, ramp)), ceiling, week: week + 1, held }
}

/** True when the last 25 sends include `bounceLimit` or more bounces: stop and let a human look. */
export function bounceBreaker(db) {
  const recent = db.prepare(
    "SELECT l.status FROM messages m JOIN leads l ON l.id = m.lead_id WHERE m.status='sent' ORDER BY m.sent_at DESC, m.id DESC LIMIT 25",
  ).all()
  return recent.filter((r) => r.status === 'bounced').length >= config.bounceLimit
}

/** Every reason a message may NOT go out right now (empty array = clear to send). */
export function blockers(db, msg, lead, { force = false } = {}) {
  const why = []
  if (existsSync(config.pauseFile)) why.push('PAUSE file present')
  if (!force && !inSendWindow()) why.push(`outside send window ${config.sendWindow} Mon-Fri`)
  const { cap } = effectiveCap(db)
  if (sentToday(db) >= cap) why.push(`daily cap ${cap} reached`)
  if (bounceBreaker(db)) why.push('bounce breaker tripped')
  if (!lead.email) why.push('no email')
  else {
    if (roleLike.test(lead.email)) why.push('role/no-reply address')
    if (isSuppressed(db, lead.email)) why.push('suppressed / opted out')
  }
  if (['replied', 'unsubscribed', 'bounced', 'done'].includes(lead.status)) why.push(`lead is ${lead.status}`)
  if (msg.status !== 'approved') why.push(`message is ${msg.status}, not approved`)
  return why
}

/** Sends approved messages (first emails you approved + auto-approved follow-ups) within guardrails. */
export async function sendApproved(db, { live = false, limit = Infinity, force = false, transport, log = console.log, wait = sleep } = {}) {
  const rows = db.prepare(
    `SELECT m.*, l.email, l.name, l.status AS lead_status FROM messages m JOIN leads l ON l.id = m.lead_id
     WHERE m.status='approved' ORDER BY m.step ASC, m.id ASC`,
  ).all()
  const t = live ? transport ?? makeTransport() : null
  let sent = 0
  for (const m of rows) {
    if (sent >= limit) break
    const lead = db.prepare('SELECT * FROM leads WHERE id=?').get(m.lead_id)
    const why = blockers(db, m, lead, { force })
    if (why.length) {
      log(`skip #${m.id} ${lead.name}: ${why.join('; ')}`)
      // Hard stops end the run; per-lead blockers just skip that message.
      if (why.some((w) => /cap|PAUSE|breaker|window/.test(w))) break
      continue
    }
    if (!live) { log(`[dry-run] would send #${m.id} (step ${m.step}) to ${lead.email}: ${m.subject}`); sent++; continue }

    // Claim the message first, so the app and the background runner can never both send it.
    if (Number(db.prepare("UPDATE messages SET status='sending' WHERE id=? AND status='approved'").run(m.id).changes) !== 1) continue

    const headers = {
      'List-Unsubscribe': `<mailto:${config.replyTo || config.gmailUser}?subject=unsubscribe>`,
    }
    if (m.step > 0) {
      const prev = db.prepare("SELECT message_id FROM messages WHERE lead_id=? AND step=0 AND status='sent'").get(m.lead_id)
      if (prev?.message_id) { headers['In-Reply-To'] = prev.message_id; headers.References = prev.message_id }
    }
    try {
      const info = await t.sendMail({
        from: `"${config.fromName}" <${config.gmailUser}>`,
        to: lead.email,
        replyTo: config.replyTo || undefined,
        subject: m.subject,
        text: withFooter(m.body),
        headers,
      })
      db.prepare("UPDATE messages SET status='sent', message_id=?, sent_at=CURRENT_TIMESTAMP WHERE id=?").run(info.messageId, m.id)
      db.prepare("UPDATE leads SET status='sent' WHERE id=? AND status IN ('approved','drafted','ready')").run(lead.id)
      log(`sent #${m.id} (step ${m.step}) to ${lead.email}`)
      sent++
    } catch (e) {
      db.prepare("UPDATE messages SET status='failed' WHERE id=?").run(m.id)
      log(`FAILED #${m.id} to ${lead.email}: ${e.message}`)
      if (/auth|535|quota|rate|limit|suspend/i.test(e.message)) { log('Stopping: account-level error'); break }
    }
    if (sent < limit) await wait((config.minDelaySec + Math.random() * (config.maxDelaySec - config.minDelaySec)) * 1000)
  }
  return sent
}

/** Create follow-up drafts (auto-approved) for leads whose last email got no reply in time. */
export function dueFollowUps(db, now = new Date()) {
  const due = []
  const leads = db.prepare("SELECT * FROM leads WHERE status='sent'").all()
  for (const lead of leads) {
    const last = db.prepare("SELECT * FROM messages WHERE lead_id=? AND status='sent' ORDER BY step DESC LIMIT 1").get(lead.id)
    if (!last) continue
    const pending = db.prepare("SELECT 1 FROM messages WHERE lead_id=? AND status IN ('draft','approved')").get(lead.id)
    if (pending) continue
    const nextStep = last.step + 1
    const waitDays = config.followUpDays[nextStep - 1]
    if (waitDays === undefined) continue // sequence finished
    const first = db.prepare("SELECT sent_at FROM messages WHERE lead_id=? AND step=0 AND status='sent'").get(lead.id)
    const ageDays = (now - new Date(first.sent_at.replace(' ', 'T') + 'Z')) / 86_400_000
    if (ageDays >= waitDays) due.push({ lead, previous: last, step: nextStep })
  }
  return due
}

export function optOut(db, email, reason = 'opted out') {
  suppress(db, email, reason)
  db.prepare("UPDATE leads SET status='unsubscribed' WHERE lower(email)=lower(?)").run(email)
  db.prepare("UPDATE messages SET status='rejected' WHERE status IN ('draft','approved') AND lead_id IN (SELECT id FROM leads WHERE lower(email)=lower(?))").run(email)
}
