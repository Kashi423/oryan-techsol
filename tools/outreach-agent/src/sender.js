import { existsSync } from 'node:fs'
import nodemailer from 'nodemailer'
import { config } from './config.js'
import { isSuppressed, suppress } from './db.js'
import { withFooter } from './write.js'
import { renderEmailHtml } from './html.js'
import { timezoneFor, localParts } from './tz.js'
import { allSenders, activeSenders, findSender } from './senders.js'

/** SMTP connection for one mailbox (defaults to the first configured sender). */
export function makeTransport(sender = allSenders()[0]) {
  if (!sender?.email || !sender?.password) throw new Error('Add a sending mailbox and its App Password in Setup first')
  return nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true,
    auth: { user: sender.email, pass: sender.password },
  })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const roleLike = /^(noreply|no-reply|abuse|postmaster|mailer-daemon)@/i
const lc = (s) => String(s ?? '').toLowerCase()

/**
 * Is it a good time to email this recipient? Evaluated in THEIR time zone (research: mid-week
 * mornings in the recipient's local time work best). "0-24" means any time, any day.
 */
export function inSendWindow(now = new Date(), window = config.sendWindow, tz = config.defaultTz, days = config.sendDays) {
  const [from, to] = window.split('-').map(Number)
  if (from === 0 && to === 24) return true
  const { day, hour } = localParts(now, tz)
  return days.includes(day) && hour >= from && hour < to
}

/** One-line summary of the schedule for the screen. */
export function windowText() {
  const days = config.sendDays.map((d) => d[0].toUpperCase() + d.slice(1)).join('/')
  return `${days}, ${config.sendWindow.replace('-', ':00 to ')}:00 in each recipient's own time zone`
}

// Messages sent before multi-mailbox support have no sender recorded; they belong to the .env mailbox.
const SENDER_OF = "lower(COALESCE(m.sender, ?))"

/** Emails sent today. Pass a mailbox address for that mailbox only, or nothing for all of them. */
export function sentToday(db, email) {
  const day = "date(m.sent_at,'localtime') = date('now','localtime')"
  if (!email) return db.prepare(`SELECT COUNT(*) c FROM messages m WHERE m.status='sent' AND ${day}`).get().c
  return db.prepare(`SELECT COUNT(*) c FROM messages m WHERE m.status='sent' AND ${day} AND ${SENDER_OF} = ?`).get(config.gmailUser, lc(email)).c
}

/**
 * Today's real sending limit for one mailbox (or overall when none is given). Your limit is the
 * ceiling; with warm-up on, a mailbox starts at 5 a day and gains 4 a day each week, counted from
 * ITS first send. Two or more recent bounces on that mailbox hold it at 5.
 */
export function effectiveCap(db, sender = null, now = new Date()) {
  if (sender instanceof Date) { now = sender; sender = null }
  const ceiling = sender?.cap || config.dailyCap
  if (!config.warmup) return { cap: ceiling, ceiling, week: null, held: false }
  const where = sender ? `AND ${SENDER_OF} = ?` : ''
  const args = sender ? [config.gmailUser, lc(sender.email)] : []
  const first = db.prepare(`SELECT MIN(m.sent_at) t FROM messages m WHERE m.status='sent' ${where}`).get(...args).t
  const days = first ? Math.max(0, Math.floor((now - new Date(first.replace(' ', 'T') + 'Z')) / 86_400_000)) : 0
  const week = Math.floor(days / 7)
  const bounces = db.prepare(
    `SELECT COUNT(*) c FROM (SELECT l.status FROM messages m JOIN leads l ON l.id = m.lead_id WHERE m.status='sent' ${where} ORDER BY m.sent_at DESC, m.id DESC LIMIT 25) WHERE status='bounced'`,
  ).get(...args).c
  // Brakes: 2+ bounces, or 4+ opt-outs in the last 25 sends, hold this mailbox at a low number.
  const optouts = db.prepare(
    `SELECT COUNT(*) c FROM (SELECT l.status FROM messages m JOIN leads l ON l.id = m.lead_id WHERE m.status='sent' ${where} ORDER BY m.sent_at DESC, m.id DESC LIMIT 25) WHERE status='unsubscribed'`,
  ).get(...args).c
  const held = bounces >= 2 || optouts >= 4
  const start = config.warmupStart
  const grown = config.warmupStepPerDay === null
    ? start + week * 4 // default: +4 a week
    : start + Math.floor(days * config.warmupStepPerDay) // your own daily step
  const ramp = held ? Math.min(start, 5) : grown
  return { cap: Math.max(1, Math.min(ceiling, ramp)), ceiling, week: week + 1, day: days + 1, held }
}

/**
 * What the ramp will look like with your settings, for the screen: per mailbox and in total,
 * with the per-mailbox ceiling and the all-mailboxes total limit applied. Pure arithmetic.
 */
export function rampPlan({ mailboxes = 1, start = config.warmupStart, stepPerDay = config.warmupStepPerDay, ceiling = config.dailyCap, totalCap = config.totalDailyCap, days = [1, 7, 14, 21, 30] } = {}) {
  return days.map((day) => {
    const perBox = Math.min(ceiling, stepPerDay === null ? start + Math.floor((day - 1) / 7) * 4 : start + Math.floor((day - 1) * stepPerDay))
    const raw = perBox * mailboxes
    return { day, perMailbox: perBox, total: Math.min(raw, totalCap), cappedByTotal: raw > totalCap }
  })
}

/** True when the last 25 sends (of one mailbox, or all) include `bounceLimit` or more bounces. */
export function bounceBreaker(db, email) {
  const where = email ? `AND ${SENDER_OF} = ?` : ''
  const args = email ? [config.gmailUser, lc(email)] : []
  const recent = db.prepare(
    `SELECT l.status FROM messages m JOIN leads l ON l.id = m.lead_id WHERE m.status='sent' ${where} ORDER BY m.sent_at DESC, m.id DESC LIMIT 25`,
  ).all(...args)
  return recent.filter((r) => r.status === 'bounced').length >= config.bounceLimit
}

/** Health numbers for one mailbox, for the screen. */
export function senderStats(db, sender, now = new Date()) {
  const cap = effectiveCap(db, sender, now)
  const total = db.prepare(`SELECT COUNT(*) c FROM messages m WHERE m.status='sent' AND ${SENDER_OF} = ?`).get(config.gmailUser, lc(sender.email)).c
  const queued = db.prepare("SELECT COUNT(*) c FROM leads WHERE lower(sender) = ? AND status IN ('drafted','approved')").get(lc(sender.email)).c
  return { sentToday: sentToday(db, sender.email), cap: cap.cap, ceiling: cap.ceiling, week: cap.week, held: cap.held, totalSent: total, queued, paused: !!sender.paused, tripped: bounceBreaker(db, sender.email) }
}

/** The mailbox with the most unused room today (sent + already queued for it), so load spreads evenly. */
export function pickSender(db, pool = activeSenders()) {
  if (!pool.length) return null
  const scored = pool.map((s) => {
    const st = senderStats(db, s)
    return { s, free: st.cap - st.sentToday - st.queued, tripped: st.tripped }
  })
  scored.sort((a, b) => Number(a.tripped) - Number(b.tripped) || b.free - a.free || a.s.email.localeCompare(b.s.email))
  return scored[0].s
}

/** Every reason a message may NOT go out right now (empty array = clear to send). */
export function blockers(db, msg, lead, { force = false, sender = null } = {}) {
  const why = []
  if (existsSync(config.pauseFile)) why.push('PAUSE file present')
  const tz = timezoneFor(lead, config.defaultTz)
  if (!force && !inSendWindow(new Date(), config.sendWindow, tz)) why.push(`outside send window for ${tz}`)
  const { cap } = effectiveCap(db, sender)
  if (sentToday(db, sender?.email) >= cap) why.push(`daily cap ${cap} reached${sender ? ` for ${sender.email}` : ''}`)
  if (sentToday(db) >= config.totalDailyCap) why.push(`total daily cap ${config.totalDailyCap} reached`)
  if (bounceBreaker(db)) why.push('bounce breaker tripped')
  if (sender && bounceBreaker(db, sender.email)) why.push(`bounce breaker tripped for ${sender.email}`)
  if (!lead.email) why.push('no email')
  else {
    if (roleLike.test(lead.email)) why.push('role/no-reply address')
    if (isSuppressed(db, lead.email)) why.push('suppressed / opted out')
  }
  if (['replied', 'unsubscribed', 'bounced', 'done'].includes(lead.status)) why.push(`lead is ${lead.status}`)
  if (msg.status !== 'approved') why.push(`message is ${msg.status}, not approved`)
  return why
}

/**
 * Sends approved messages (first emails you approved + auto-approved follow-ups) within guardrails.
 * Each lead keeps ONE mailbox for its whole sequence so follow-ups arrive in the same thread.
 */
export async function sendApproved(db, { live = false, limit = Infinity, force = false, transport, log = console.log, wait = sleep } = {}) {
  const rows = db.prepare(
    `SELECT m.*, l.email, l.name, l.status AS lead_status FROM messages m JOIN leads l ON l.id = m.lead_id
     WHERE m.status='approved' ORDER BY m.step ASC, m.id ASC`,
  ).all()
  // An injected transport (tests, demo) stands in for every mailbox and needs no password.
  const pool = transport ? allSenders().filter((s) => !s.paused) : activeSenders()
  const transports = new Map()
  const transportFor = (s) => {
    if (transport) return transport
    if (!transports.has(s.email)) transports.set(s.email, makeTransport(s))
    return transports.get(s.email)
  }
  let sent = 0
  const stopped = new Set() // mailboxes that hit a provider error this run
  for (const m of rows) {
    if (sent >= limit) break
    const lead = db.prepare('SELECT * FROM leads WHERE id=?').get(m.lead_id)

    // Keep the lead on its assigned mailbox; if that one is gone or paused, pick the freest.
    let sender = pool.find((s) => lc(s.email) === lc(lead.sender) && !stopped.has(s.email)) ?? null
    if (!sender) sender = pickSender(db, pool.filter((s) => !stopped.has(s.email)))
    if (!sender) { log('No mailbox available to send from. Add one in Setup.'); break }

    const why = blockers(db, m, lead, { force, sender })
    if (why.length) {
      log(`skip #${m.id} ${lead.name}: ${why.join('; ')}`)
      // A mailbox or global stop ends this lead only if another mailbox could still send it.
      if (why.some((w) => /PAUSE|total daily cap|^bounce breaker tripped$/.test(w))) break
      if (why.some((w) => /daily cap .* reached for|breaker tripped for/.test(w))) {
        const other = pool.find((s) => s.email !== sender.email && !stopped.has(s.email)
          && blockers(db, m, lead, { force, sender: s }).length === 0)
        if (!other) continue
        sender = other
      } else continue
    }
    if (lc(lead.sender) !== lc(sender.email)) db.prepare('UPDATE leads SET sender=? WHERE id=?').run(sender.email, lead.id)
    if (!live) { log(`[dry-run] would send #${m.id} (step ${m.step}) to ${lead.email} from ${sender.email}: ${m.subject}`); sent++; continue }

    // Claim the message first, so the app and the background runner can never both send it.
    if (Number(db.prepare("UPDATE messages SET status='sending' WHERE id=? AND status='approved'").run(m.id).changes) !== 1) continue

    const headers = { 'List-Unsubscribe': `<mailto:${sender.email}?subject=unsubscribe>` }
    if (m.step > 0) {
      const prev = db.prepare("SELECT message_id FROM messages WHERE lead_id=? AND step=0 AND status='sent'").get(m.lead_id)
      if (prev?.message_id) { headers['In-Reply-To'] = prev.message_id; headers.References = prev.message_id }
    }
    try {
      // No Reply-To header on purpose: replies must come back to the mailbox that sent the email,
      // because that is the inbox the agent reads to stop follow-ups and answer hot leads.
      const info = await transportFor(sender).sendMail({
        from: `"${sender.name || config.fromName}" <${sender.email}>`,
        to: lead.email,
        subject: m.subject,
        text: withFooter(m.body),
        ...(config.emailStyle === 'html' ? { html: renderEmailHtml({ subject: m.subject, body: m.body, replyTo: sender.email }) } : {}),
        headers,
      })
      db.prepare("UPDATE messages SET status='sent', message_id=?, sender=?, sent_at=CURRENT_TIMESTAMP WHERE id=?").run(info.messageId, sender.email, m.id)
      db.prepare("UPDATE leads SET status='sent' WHERE id=? AND status IN ('approved','drafted','ready')").run(lead.id)
      log(`sent #${m.id} (step ${m.step}) to ${lead.email} from ${sender.email}`)
      sent++
    } catch (e) {
      db.prepare("UPDATE messages SET status='approved' WHERE id=? AND status='sending'").run(m.id) // retry later, not lost
      log(`FAILED #${m.id} to ${lead.email} via ${sender.email}: ${e.message}`)
      if (/auth|535|quota|rate|limit|suspend|credentials/i.test(e.message)) {
        stopped.add(sender.email)
        log(`Stopping ${sender.email} for this run (account-level error). Other mailboxes continue.`)
        if (!pool.some((s) => !stopped.has(s.email))) break
      }
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
    const pending = db.prepare("SELECT 1 FROM messages WHERE lead_id=? AND status IN ('draft','approved','sending')").get(lead.id)
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

export { findSender }
