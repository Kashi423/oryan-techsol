import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'
import { config, requireKeys } from './config.js'
import { optOut } from './sender.js'

const STOP = /\b(unsubscribe|remove me|stop (emailing|sending|contacting)|no thanks|no thank you|not interested|take me off|do not (contact|email)|don'?t (contact|email)|opt.?out)\b/i

/** Classify one parsed inbound message. Pure function so it can be unit-tested. */
export function classify(parsed) {
  const from = (parsed.from?.value?.[0]?.address ?? '').toLowerCase()
  const subject = parsed.subject ?? ''
  const text = (parsed.text ?? '').slice(0, 2000)
  if (/^(mailer-daemon|postmaster)@/.test(from) || /delivery status|undeliverable|failure notice|returned mail/i.test(subject)) {
    const failed = [...text.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)]
      .map((m) => m[0].toLowerCase())
      .filter((e) => e !== config.gmailUser.toLowerCase() && !/mailer-daemon|postmaster|google\.com$/.test(e))
    return { kind: 'bounce', recipients: [...new Set(failed)] }
  }
  // Only look at what the person actually wrote, not the quoted original (which contains our own footer).
  const fresh = text.split(/\n>|\nOn .* wrote:|\n-{2,}\s*Original/i)[0]
  if (STOP.test(fresh)) return { kind: 'optout', from }
  return { kind: 'reply', from }
}

export function applyInbound(db, parsed) {
  const c = classify(parsed)
  const find = db.prepare('SELECT id FROM leads WHERE lower(email)=lower(?)')
  if (c.kind === 'bounce') {
    let n = 0
    for (const r of c.recipients) {
      const lead = find.get(r)
      if (lead) {
        db.prepare("UPDATE leads SET status='bounced' WHERE id=?").run(lead.id)
        db.prepare("UPDATE messages SET status='rejected' WHERE status IN ('draft','approved') AND lead_id=?").run(lead.id)
        n++
      }
    }
    return { ...c, matched: n }
  }
  const lead = find.get(c.from)
  if (!lead) return { ...c, matched: 0 }
  if (c.kind === 'optout') optOut(db, c.from, 'replied with opt-out')
  else {
    db.prepare("UPDATE leads SET status='replied' WHERE id=?").run(lead.id)
    db.prepare("UPDATE messages SET status='rejected' WHERE status IN ('draft','approved') AND lead_id=?").run(lead.id)
  }
  return { ...c, matched: 1 }
}

export async function checkReplies(db, { days = 14, log = console.log } = {}) {
  requireKeys('gmail')
  const client = new ImapFlow({
    host: 'imap.gmail.com', port: 993, secure: true,
    auth: { user: config.gmailUser, pass: config.gmailAppPassword },
    logger: false,
  })
  await client.connect()
  const counts = { reply: 0, optout: 0, bounce: 0, ignored: 0 }
  try {
    const lock = await client.getMailboxLock('INBOX')
    try {
      const since = new Date(Date.now() - days * 86_400_000)
      for await (const msg of client.fetch({ since }, { uid: true, source: true })) {
        const key = `${config.gmailUser}:${msg.uid}`
        if (db.prepare('SELECT 1 FROM seen WHERE uid=?').get(key)) continue
        db.prepare('INSERT OR IGNORE INTO seen (uid) VALUES (?)').run(key)
        const res = applyInbound(db, await simpleParser(msg.source))
        if (res.matched) { counts[res.kind]++; log(`${res.kind}: ${res.from ?? res.recipients?.join(',')}`) } else counts.ignored++
      }
    } finally { lock.release() }
  } finally { await client.logout() }
  return counts
}
