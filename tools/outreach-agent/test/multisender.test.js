import test from 'node:test'
import assert from 'node:assert/strict'
import { openDb } from '../src/db.js'
import { config } from '../src/config.js'
import { useMemorySenders, addSender, removeSender, setPaused, allSenders, activeSenders, publicSender, MAX_SENDERS } from '../src/senders.js'
import { sendApproved, pickSender, effectiveCap, senderStats, sentToday } from '../src/sender.js'
import { draftLeads } from '../src/pipeline.js'
import { classify } from '../src/inbox.js'
import { sendReply } from '../src/replies.js'
import { createApp } from '../src/server.js'

Object.assign(config, { sendWindow: '0-24', minDelaySec: 0, maxDelaySec: 0, warmup: false, dailyCap: 50, totalDailyCap: 500, gmailUser: 'main@o.test', emailStyle: 'auto', replyTo: 'sales@o.test' })
config.anthropicKey = ''; config.openaiKey = ''

const PW = 'abcd efgh ijkl mnop'
const box = (n, extra = {}) => ({ id: `id-${n}`, email: `${n}@o.test`, password: PW, signOff: n[0].toUpperCase() + n.slice(1), name: n, cap: null, paused: false, ...extra })
const transport = () => { const sent = []; return { sent, sendMail: async (m) => { sent.push(m); return { messageId: `<m${sent.length}@t>` } } } }
const mkLead = (db, i, o = {}) => Number(db.prepare("INSERT INTO leads (place_id,name,email,domain,status,score,website,address,sender) VALUES (?,?,?,?,?,?,?,?,?)")
  .run(`p${i}`, `Biz ${i}`, `b${i}@biz${i}.test`, `biz${i}.test`, o.status ?? 'approved', o.score ?? 50, 'https://x.test', 'Austin, TX', o.sender ?? null).lastInsertRowid)
const mkMsg = (db, leadId, o = {}) => db.prepare("INSERT INTO messages (lead_id,step,subject,body,status,variant,sent_at,sender) VALUES (?,?,?,?,?,'A',?,?)")
  .run(leadId, o.step ?? 0, 'Subj', 'Body. Want the fixes?', o.status ?? 'approved', o.sentAt ?? null, o.sender ?? null)

test('mailboxes: validated, capped at 10, no duplicates, passwords never exposed', () => {
  useMemorySenders([])
  const added = addSender({ email: 'Rai@O.test', password: PW, name: 'Rai', cap: '' })
  assert.equal(added.email, 'rai@o.test'); assert.equal(added.password, undefined)
  assert.equal(added.hasPassword, true); assert.equal(added.cap, null)
  assert.throws(() => addSender({ email: 'rai@o.test', password: PW }), /already added/)
  assert.throws(() => addSender({ email: 'nope', password: PW }), /valid email/)
  assert.throws(() => addSender({ email: 'x@o.test', password: 'short' }), /16 letters/)
  assert.throws(() => addSender({ email: 'x@o.test', password: PW, cap: '500' }), /1 to 100/)
  for (let i = 2; i <= MAX_SENDERS; i++) addSender({ email: `m${i}@o.test`, password: PW })
  assert.equal(allSenders().length, MAX_SENDERS)
  assert.throws(() => addSender({ email: 'eleven@o.test', password: PW }), /up to 10/)
  assert.ok(allSenders().every((s) => s.password), 'stored internally')
  assert.ok(allSenders().map(publicSender).every((s) => !('password' in s)))
  const id = allSenders()[1].id
  setPaused(id, true)
  assert.equal(activeSenders().length, MAX_SENDERS - 1)
  removeSender(id)
  assert.equal(allSenders().length, MAX_SENDERS - 1)
  assert.throws(() => removeSender('nope'), /not found/)
})

test('assignment: drafted leads are spread evenly across mailboxes and signed by that persona', async () => {
  useMemorySenders(['rai', 'sara', 'omar'].map((n) => box(n)))
  const db = openDb(':memory:')
  for (let i = 1; i <= 6; i++) mkLead(db, i, { status: 'ready' })
  await draftLeads(db)
  const rows = db.prepare("SELECT l.sender, m.body FROM leads l JOIN messages m ON m.lead_id=l.id ORDER BY l.id").all()
  const per = rows.reduce((a, r) => { a[r.sender] = (a[r.sender] || 0) + 1; return a }, {})
  assert.deepEqual(per, { 'rai@o.test': 2, 'sara@o.test': 2, 'omar@o.test': 2 })
  for (const r of rows) {
    const persona = allSenders().find((s) => s.email === r.sender).signOff
    assert.match(r.body, new RegExp(`${persona}$`), `signed by ${persona}`)
  }
})

test('sending: rotates mailboxes, honours each mailbox limit and the total limit, one mailbox per lead', async () => {
  useMemorySenders([box('rai', { cap: 2 }), box('sara', { cap: 2 }), box('omar', { cap: 2 })])
  const db = openDb(':memory:')
  const t = transport()
  for (let i = 1; i <= 8; i++) { const l = mkLead(db, i); mkMsg(db, l) }
  const n = await sendApproved(db, { live: true, transport: t, log: () => {}, wait: async () => {} })
  assert.equal(n, 6, '3 mailboxes x limit 2')
  const bySender = t.sent.reduce((a, m) => { const k = m.from.match(/<(.+)>/)[1]; a[k] = (a[k] || 0) + 1; return a }, {})
  assert.deepEqual(bySender, { 'rai@o.test': 2, 'sara@o.test': 2, 'omar@o.test': 2 })
  assert.equal(sentToday(db, 'rai@o.test'), 2)
  assert.equal(sentToday(db), 6)
  // each mail: from its own mailbox, no Reply-To, unsubscribe goes to that mailbox
  for (const m of t.sent) {
    const own = m.from.match(/<(.+)>/)[1]
    assert.equal(m.replyTo, undefined, 'replies must come back to the sending mailbox')
    assert.match(m.headers['List-Unsubscribe'], new RegExp(own.replace('.', '\\.')))
  }
  // total cap across mailboxes
  config.totalDailyCap = 7
  useMemorySenders([box('rai', { cap: 50 }), box('sara', { cap: 50 })])
  const db2 = openDb(':memory:'); const t2 = transport()
  for (let i = 1; i <= 12; i++) mkMsg(db2, mkLead(db2, i))
  assert.equal(await sendApproved(db2, { live: true, transport: t2, log: () => {}, wait: async () => {} }), 7)
  config.totalDailyCap = 500
})

test('sequence stays on one mailbox; if that mailbox is paused the lead moves to another', async () => {
  useMemorySenders([box('rai'), box('sara')])
  const db = openDb(':memory:')
  const l = mkLead(db, 1, { status: 'sent', sender: 'sara@o.test' })
  mkMsg(db, l, { status: 'sent', sentAt: '2026-10-01 10:00:00', sender: 'sara@o.test' })
  db.prepare("UPDATE messages SET message_id='<first@t>' WHERE lead_id=?").run(l)
  mkMsg(db, l, { step: 1 })
  let t = transport()
  await sendApproved(db, { live: true, transport: t, log: () => {}, wait: async () => {} })
  assert.match(t.sent[0].from, /sara@o\.test/)
  assert.equal(t.sent[0].headers['In-Reply-To'], '<first@t>', 'threaded to the first email')

  const l2 = mkLead(db, 2, { status: 'sent', sender: 'sara@o.test' })
  mkMsg(db, l2, { status: 'sent', sentAt: '2026-10-01 10:00:00', sender: 'sara@o.test' })
  mkMsg(db, l2, { step: 1 })
  setPaused(allSenders().find((s) => s.email === 'sara@o.test').id, true)
  t = transport()
  await sendApproved(db, { live: true, transport: t, log: () => {}, wait: async () => {} })
  assert.match(t.sent[0].from, /rai@o\.test/)
  assert.equal(db.prepare('SELECT sender FROM leads WHERE id=?').get(l2).sender, 'rai@o.test')
})

test('a failing mailbox is stopped for the run, its message is kept for retry, others continue', async () => {
  useMemorySenders([box('rai'), box('sara')])
  const db = openDb(':memory:')
  for (let i = 1; i <= 4; i++) mkMsg(db, mkLead(db, i))
  const sent = []
  const t = { sendMail: async (m) => {
    if (m.from.includes('rai@o.test')) throw new Error('535 Authentication failed')
    sent.push(m.to); return { messageId: '<x@t>' }
  } }
  await sendApproved(db, { live: true, transport: t, log: () => {}, wait: async () => {} })
  assert.ok(sent.length >= 2, 'sara kept sending')
  const stuck = db.prepare("SELECT COUNT(*) c FROM messages WHERE status IN ('sending','failed')").get().c
  assert.equal(stuck, 0, 'nothing left in limbo')
  assert.ok(db.prepare("SELECT COUNT(*) c FROM messages WHERE status='approved'").get().c >= 1, 'failed message can be retried')
})

test('warm-up and health are tracked per mailbox, not shared', () => {
  config.warmup = true; config.dailyCap = 30
  useMemorySenders([box('old'), box('new')])
  const db = openDb(':memory:')
  const l = mkLead(db, 1, { status: 'sent' })
  mkMsg(db, l, { status: 'sent', sentAt: '2026-01-01 10:00:00', sender: 'old@o.test' })
  const [oldBox, newBox] = allSenders()
  assert.equal(effectiveCap(db, oldBox).cap, 30, 'old mailbox is fully warmed')
  assert.equal(effectiveCap(db, newBox).cap, 5, 'new mailbox starts at 5')
  assert.equal(senderStats(db, newBox).totalSent, 0)
  assert.equal(senderStats(db, oldBox).totalSent, 1)
  // bounces on one mailbox hold only that mailbox
  for (let i = 0; i < 2; i++) mkMsg(db, mkLead(db, 10 + i, { status: 'bounced' }), { status: 'sent', sentAt: '2026-10-10 10:00:00', sender: 'old@o.test' })
  assert.equal(effectiveCap(db, oldBox).held, true)
  assert.equal(effectiveCap(db, newBox).held, false)
  assert.equal(pickSender(db, [oldBox, newBox]).email, 'new@o.test', 'a healthy mailbox is preferred')
  config.warmup = false
})

test('replies are answered from the mailbox of that conversation; own mailboxes never count as bounced', async () => {
  useMemorySenders([box('rai'), box('sara')])
  const db = openDb(':memory:')
  const l = mkLead(db, 1, { status: 'replied', sender: 'sara@o.test' })
  db.prepare("INSERT INTO replies (lead_id, from_email, subject, body, message_id, label, status) VALUES (?, 'b1@biz1.test', 'Re: hi', 'Interested', '<theirs@x>', 'interested', 'new')").run(l)
  const t = transport()
  await sendReply(db, 1, { body: 'Great, Tuesday?', transport: t })
  assert.match(t.sent[0].from, /sara@o\.test/)
  assert.equal(t.sent[0].replyTo, undefined)
  assert.match(t.sent[0].text, /Tuesday/)

  const c = classify({ from: { value: [{ address: 'mailer-daemon@googlemail.com' }] }, subject: 'Delivery Status Notification (Failure)', text: 'Message from rai@o.test to ghost@biz1.test failed. sara@o.test' })
  assert.deepEqual(c.recipients, ['ghost@biz1.test'])
})

test('web: add, test, pause and remove mailboxes; state never contains a password', async () => {
  useMemorySenders([])
  const server = createApp(openDb(':memory:'))
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const base = `http://127.0.0.1:${server.address().port}`
  const post = async (p, b) => { const r = await fetch(base + p, { method: 'POST', body: JSON.stringify(b) }); return { status: r.status, body: await r.json() } }
  try {
    const add = await post('/api/sender/add', { email: 'rai@o.test', password: PW, signOff: 'Rai', cap: '5' })
    assert.equal(add.status, 200); assert.equal(add.body.sender.password, undefined)
    assert.equal((await post('/api/sender/add', { email: 'bad', password: PW })).status, 400)
    const st = await (await fetch(base + '/api/state')).json()
    assert.equal(st.senders.length, 1); assert.equal(st.maxSenders, 10)
    assert.ok(!JSON.stringify(st).includes('abcdefghijklmnop'), 'password not in state')
    assert.equal(st.senders[0].cap, 5); assert.equal(st.configured.gmail, true)
    const id = st.senders[0].id
    assert.equal((await post('/api/sender/pause', { id, paused: true })).status, 200)
    assert.equal((await (await fetch(base + '/api/state')).json()).senders[0].paused, true)
    assert.equal((await post('/api/settings', { totalDailyCap: '0' })).status, 400)
    assert.equal((await post('/api/sender/remove', { id })).status, 200)
    assert.equal((await (await fetch(base + '/api/state')).json()).senders.filter((s) => s.id === id).length, 0)
  } finally { server.close() }
})

test('daily ramp: start 8, add 1 a day, stops at your per-mailbox limit; brakes hold it low', () => {
  Object.assign(config, { warmup: true, warmupStart: 8, warmupStepPerDay: 1, dailyCap: 25 })
  useMemorySenders([box('rai'), box('sara')])
  const db = openDb(':memory:')
  const [rai, sara] = allSenders()
  assert.equal(effectiveCap(db, rai).cap, 8, 'day 1')
  const ago = (d) => new Date(Date.now() - d * 86_400_000).toISOString().replace('T', ' ').slice(0, 19)
  const first = (box_, d) => mkMsg(db, mkLead(db, Math.floor(Math.random() * 1e6), { status: 'sent' }), { status: 'sent', sentAt: ago(d), sender: box_.email })
  first(rai, 5)
  assert.equal(effectiveCap(db, rai).cap, 13, 'day 6 = 8 + 5')
  first(sara, 30)
  assert.equal(effectiveCap(db, sara).cap, 25, 'never above the per-mailbox limit')
  // 4 opt-outs in the last 25 sends hold a mailbox, just like bounces
  for (let i = 0; i < 4; i++) first(rai, 0), db.prepare("UPDATE leads SET status='unsubscribed' WHERE id=(SELECT MAX(id) FROM leads)").run()
  const held = effectiveCap(db, rai)
  assert.equal(held.held, true); assert.equal(held.cap, 5)
  Object.assign(config, { warmupStepPerDay: null, warmupStart: 5 })
})

test('ramp plan: arithmetic matches your settings, with the per-mailbox and total limits applied', async () => {
  const { rampPlan } = await import('../src/sender.js')
  const plan = rampPlan({ mailboxes: 5, start: 8, stepPerDay: 1, ceiling: 25, totalCap: 100, days: [1, 7, 14, 21, 30] })
  assert.deepEqual(plan.map((p) => [p.day, p.perMailbox, p.total]), [[1, 8, 40], [7, 14, 70], [14, 21, 100], [21, 25, 100], [30, 25, 100]])
  assert.equal(plan[2].cappedByTotal, true)   // 21 x 5 = 105 held to 100
  assert.equal(plan[1].cappedByTotal, false)
  const weekly = rampPlan({ mailboxes: 1, start: 5, stepPerDay: null, ceiling: 30, totalCap: 500, days: [1, 8, 15] })
  assert.deepEqual(weekly.map((p) => p.perMailbox), [5, 9, 13])
})

test('web: ramp settings are validated and appear in state with a plan', async () => {
  useMemorySenders([box('rai')])
  const server = createApp(openDb(':memory:'))
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const base = `http://127.0.0.1:${server.address().port}`
  const post = async (b) => (await fetch(base + '/api/settings', { method: 'POST', body: JSON.stringify(b) })).status
  try {
    assert.equal(await post({ warmupStart: '0' }), 400)
    assert.equal(await post({ warmupStart: '51' }), 400)
    assert.equal(await post({ warmupStepPerDay: '9' }), 400)
    assert.equal(await post({ warmupStepPerDay: '1.5' }), 400)
    const st = await (await fetch(base + '/api/state')).json()
    assert.ok(Array.isArray(st.plan) && st.plan.length === 5)
    assert.ok('start' in st.warmup && 'stepPerDay' in st.warmup)
  } finally { server.close() }
})
