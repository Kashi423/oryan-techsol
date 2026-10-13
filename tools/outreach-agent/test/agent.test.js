import test from 'node:test'
import assert from 'node:assert/strict'
import { openDb } from '../src/db.js'
import { extractEmails, pickBestEmail, observe, enrichSite } from '../src/enrich.js'
import { parseDraft, draftEmail, withFooter } from '../src/write.js'
import { searchPlaces } from '../src/places.js'
import { sendApproved, dueFollowUps, optOut, bounceBreaker, blockers } from '../src/sender.js'
import { classify, applyInbound } from '../src/inbox.js'
import { config } from '../src/config.js'

process.env.GOOGLE_PLACES_API_KEY ??= 'test'
config.placesKey ||= 'test'
config.sendWindow = '0-24'
config.dailyCap = 3
config.minDelaySec = config.maxDelaySec = 0

const fakeTransport = () => {
  const sent = []
  return { sent, sendMail: async (m) => { sent.push(m); return { messageId: `<id${sent.length}@x>` } } }
}
const addLead = (db, o = {}) =>
  db.prepare("INSERT INTO leads (place_id,name,email,domain,status) VALUES (?,?,?,?,?)")
    .run(o.pid ?? Math.random().toString(), o.name ?? 'Acme Dental', o.email ?? 'info@acme.com', 'acme.com', o.status ?? 'approved').lastInsertRowid
const addMsg = (db, lead, o = {}) =>
  db.prepare("INSERT INTO messages (lead_id,step,subject,body,status) VALUES (?,?,?,?,?)")
    .run(lead, o.step ?? 0, 'Hi', 'Body', o.status ?? 'approved').lastInsertRowid

test('email extraction ignores junk and prefers same-domain info@', () => {
  const html = '<a href="mailto:Info@Acme.com">x</a> sentry@o1.ingest.sentry.io logo@2x.png noreply@acme.com owner@gmail.com'
  const e = extractEmails(html)
  assert.deepEqual(e.sort(), ['info@acme.com', 'owner@gmail.com'])
  assert.equal(pickBestEmail(e, 'www.acme.com'), 'info@acme.com')
})

test('observations are factual and conditional', () => {
  const o = observe('<html><body>Welcome © 2016</body></html>', 'http://acme.com')
  assert.ok(o.some((x) => /plain http/.test(x)))
  assert.ok(o.some((x) => /viewport/.test(x)))
  assert.ok(o.some((x) => /2016/.test(x)))
  const clean = observe('<meta name="viewport" content="x"><form></form> book now', 'https://a.com')
  assert.equal(clean.length, 0)
})

test('enrichSite follows contact page and returns email', async () => {
  const pages = {
    'https://acme.com/': '<title>Acme</title><a href="/contact">Contact</a>',
    'https://acme.com/contact': 'Write to <a href="mailto:hello@acme.com">us</a>',
  }
  const f = async (u) => ({ ok: true, url: u, headers: { get: () => 'text/html' }, text: async () => pages[u] })
  const r = await enrichSite('https://acme.com/', f)
  assert.equal(r.email, 'hello@acme.com')
})

test('places search maps fields, skips closed businesses, pages', async () => {
  let calls = 0
  const f = async (_u, o) => {
    calls++
    const body = JSON.parse(o.body)
    return { ok: true, json: async () => calls === 1
      ? { places: [{ id: 'a', displayName: { text: 'A' }, websiteUri: 'https://a.com' }, { id: 'b', displayName: { text: 'B' }, businessStatus: 'CLOSED_PERMANENTLY' }], nextPageToken: 't' }
      : { places: [{ id: 'c', displayName: { text: 'C' } }] }, _body: body }
  }
  const r = await searchPlaces('dentists in Austin', 40, f)
  assert.deepEqual(r.map((p) => p.place_id), ['a', 'c'])
  assert.equal(calls, 2)
})

test('draft parsing + footer always has opt-out and address', async () => {
  assert.deepEqual(parseDraft('Here: {"subject":"Hi  there","body":"Hello"}'), { subject: 'Hi there', body: 'Hello' })
  assert.throws(() => parseDraft('nope'))
  const client = { messages: { create: async () => ({ content: [{ type: 'text', text: '{"subject":"S","body":"B"}' }] }) } }
  const d = await draftEmail({ name: 'A', observations: '[]' }, { client })
  assert.equal(d.subject, 'S')
  const f = withFooter('B')
  assert.match(f, /no thanks/)
  assert.match(f, new RegExp(config.postalAddress.slice(0, 10)))
})

test('only approved mail is sent; headers + footer present; cap enforced', async () => {
  const db = openDb(':memory:')
  const l1 = addLead(db, { email: 'a@a.com' }); addMsg(db, l1)
  const l2 = addLead(db, { email: 'b@b.com', status: 'drafted' }); addMsg(db, l2, { status: 'draft' })
  const l3 = addLead(db, { email: 'c@c.com' }); addMsg(db, l3)
  const l4 = addLead(db, { email: 'd@d.com' }); addMsg(db, l4)
  const l5 = addLead(db, { email: 'e@e.com' }); addMsg(db, l5)
  const t = fakeTransport()
  const n = await sendApproved(db, { live: true, transport: t, log: () => {}, wait: async () => {} })
  assert.equal(n, 3) // cap
  assert.equal(t.sent.length, 3)
  assert.ok(!t.sent.some((m) => m.to === 'b@b.com'))
  assert.match(t.sent[0].text, /no thanks/)
  assert.match(t.sent[0].headers['List-Unsubscribe'], /unsubscribe/)
})

test('dry run sends nothing', async () => {
  const db = openDb(':memory:')
  const l = addLead(db); addMsg(db, l)
  const t = fakeTransport()
  await sendApproved(db, { live: false, transport: t, log: () => {} })
  assert.equal(t.sent.length, 0)
  assert.equal(db.prepare("SELECT status FROM messages").get().status, 'approved')
})

test('suppressed addresses and domains are blocked', () => {
  const db = openDb(':memory:')
  const l = addLead(db, { email: 'x@blocked.com' }); const m = addMsg(db, l)
  db.prepare("INSERT INTO suppression (value) VALUES ('blocked.com')").run()
  const why = blockers(db, db.prepare('SELECT * FROM messages WHERE id=?').get(m), db.prepare('SELECT * FROM leads WHERE id=?').get(l))
  assert.ok(why.some((w) => /suppressed/.test(w)))
})

test('follow-ups are due after N days, stop on reply, max two', () => {
  const db = openDb(':memory:')
  const l = addLead(db, { status: 'sent' })
  db.prepare("INSERT INTO messages (lead_id,step,subject,body,status,sent_at) VALUES (?,0,'s','b','sent',datetime('now','-5 days'))").run(l)
  assert.equal(dueFollowUps(db).length, 1)
  assert.equal(dueFollowUps(db)[0].step, 1)
  // after follow-up 1 sent 6 days later only the 10-day follow-up is next
  db.prepare("INSERT INTO messages (lead_id,step,subject,body,status,sent_at) VALUES (?,1,'s','b','sent',datetime('now','-1 days'))").run(l)
  assert.equal(dueFollowUps(db).length, 0) // 5 days old < 10
  db.prepare("UPDATE messages SET sent_at=datetime('now','-11 days') WHERE step=0").run()
  assert.equal(dueFollowUps(db)[0].step, 2)
  db.prepare("INSERT INTO messages (lead_id,step,subject,body,status,sent_at) VALUES (?,2,'s','b','sent',datetime('now'))").run(l)
  assert.equal(dueFollowUps(db).length, 0) // sequence finished
  db.prepare("UPDATE leads SET status='replied'").run()
  assert.equal(dueFollowUps(db).length, 0)
})

test('classify + apply: reply, opt-out, bounce', () => {
  const db = openDb(':memory:')
  const a = addLead(db, { email: 'a@a.com', status: 'sent' }); addMsg(db, a, { status: 'approved', step: 1 })
  const b = addLead(db, { email: 'b@b.com', status: 'sent' })
  const c = addLead(db, { email: 'c@c.com', status: 'sent' })
  assert.equal(applyInbound(db, { from: { value: [{ address: 'a@a.com' }] }, subject: 'Re: hi', text: 'Sure, call me Tuesday' }).kind, 'reply')
  assert.equal(db.prepare('SELECT status FROM leads WHERE id=?').get(a).status, 'replied')
  assert.equal(db.prepare("SELECT status FROM messages WHERE lead_id=?").get(a).status, 'rejected') // pending follow-up cancelled
  assert.equal(applyInbound(db, { from: { value: [{ address: 'b@b.com' }] }, subject: 'Re', text: 'No thanks\n\nOn Mon wrote:\n> Not relevant? reply no thanks' }).kind, 'optout')
  assert.equal(db.prepare('SELECT status FROM leads WHERE id=?').get(b).status, 'unsubscribed')
  assert.ok(db.prepare("SELECT 1 FROM suppression WHERE value='b@b.com'").get())
  applyInbound(db, { from: { value: [{ address: 'mailer-daemon@googlemail.com' }] }, subject: 'Delivery Status Notification (Failure)', text: 'Address not found: c@c.com' })
  assert.equal(db.prepare('SELECT status FROM leads WHERE id=?').get(c).status, 'bounced')
  // quoted footer alone must not count as an opt-out
  assert.equal(classify({ from: { value: [{ address: 'z@z.com' }] }, subject: 'Re', text: 'Interested!\n\n> Not relevant? Just reply "no thanks"' }).kind, 'reply')
})

test('bounce breaker pauses sending', () => {
  const db = openDb(':memory:')
  for (let i = 0; i < 3; i++) {
    const l = addLead(db, { email: `x${i}@x.com`, status: 'bounced' })
    db.prepare("INSERT INTO messages (lead_id,step,subject,body,status,sent_at) VALUES (?,0,'s','b','sent',datetime('now'))").run(l)
  }
  assert.equal(bounceBreaker(db), true)
})

test('optOut cancels pending drafts', () => {
  const db = openDb(':memory:')
  const l = addLead(db, { email: 'q@q.com' }); addMsg(db, l)
  optOut(db, 'q@q.com')
  assert.equal(db.prepare('SELECT status FROM messages').get().status, 'rejected')
})
