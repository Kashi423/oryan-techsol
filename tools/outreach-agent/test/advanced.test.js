import test from 'node:test'
import assert from 'node:assert/strict'
import { openDb } from '../src/db.js'
import { config } from '../src/config.js'
import { buildAudit } from '../src/audit.js'
import { scoreLead } from '../src/score.js'
import { nextVariant, draftLeads } from '../src/pipeline.js'
import { templateDraft } from '../src/template.js'
import { effectiveCap, sendApproved } from '../src/sender.js'
import { recordReply, heuristicLabel, labelPending, notifyHot, sendReply, triage } from '../src/replies.js'
import { applyInbound } from '../src/inbox.js'
import { dailyCycle } from '../src/daily.js'
import { createApp } from '../src/server.js'

config.warmup = true
config.sendWindow = '0-24'
config.minDelaySec = config.maxDelaySec = 0
config.anthropicKey = ''; config.openaiKey = ''

const transport = () => { const sent = []; return { sent, sendMail: async (m) => { sent.push(m); return { messageId: `<m${sent.length}@t>` } } } }
const lead = (db, o = {}) => Number(db.prepare('INSERT INTO leads (place_id,name,email,domain,status,website,score) VALUES (?,?,?,?,?,?,?)')
  .run(o.pid ?? Math.random().toString(), o.name ?? 'Acme', o.email ?? 'info@acme.test', 'acme.test', o.status ?? 'sent', o.website ?? 'https://acme.test', o.score ?? 0).lastInsertRowid)
const sentMsg = (db, leadId, o = {}) => db.prepare("INSERT INTO messages (lead_id,step,subject,body,status,sent_at,variant) VALUES (?,?,?,?,'sent',datetime('now',?),?)")
  .run(leadId, o.step ?? 0, 'Subj', 'Body', o.ago ?? '0 days', o.variant ?? 'A')

test('audit: finds real issues, stays quiet on a healthy page', () => {
  const bad = buildAudit('<html><title>Hi</title><body>Copyright 2015</body></html>', 'http://x.test', 4200)
  const ids = bad.checks.filter((c) => !c.ok).map((c) => c.id)
  for (const id of ['https', 'mobile', 'title', 'booking', 'form', 'speed', 'dated']) assert.ok(ids.includes(id), id)
  assert.ok(bad.bullets.length >= 5 && bad.issueWeight > 50)
  const good = buildAudit('<title>Great Dental Clinic Austin</title><meta name="viewport" content="x"><meta name="description" content="A friendly dental clinic in Austin offering family care and whitening."><h1>Hi</h1><form></form> book now', 'https://x.test', 400)
  assert.deepEqual(good.bullets, [])
})

test('score: no website and bad sites outrank healthy ones; always 0-100', () => {
  const none = scoreLead({ website: '', email: 'a@b.test', rating: 4.6 }, null).score
  const bad = scoreLead({ website: 'x', rating: 4.0 }, { issueWeight: 80, bullets: ['a', 'b'] }).score
  const good = scoreLead({ website: 'x', rating: 4.0 }, { issueWeight: 0, bullets: [] }).score
  assert.ok(none > good && bad > good)
  for (const s of [none, bad, good]) assert.ok(s >= 0 && s <= 100)
})

test('drafts: best-scoring leads are written first and subject variants alternate', async () => {
  const db = openDb(':memory:')
  const a = lead(db, { name: 'Low', status: 'ready', score: 10, email: 'a@a.test' })
  const b = lead(db, { name: 'High', status: 'ready', score: 90, email: 'b@b.test' })
  const c = lead(db, { name: 'Mid', status: 'ready', score: 50, email: 'c@c.test' })
  const d = lead(db, { name: 'Mid2', status: 'ready', score: 40, email: 'd@d.test' })
  const r = await draftLeads(db, { limit: 3 })
  assert.equal(r.drafted, 3)
  const rows = db.prepare('SELECT l.name, m.variant FROM messages m JOIN leads l ON l.id=m.lead_id ORDER BY m.id').all()
  assert.deepEqual(rows.map((x) => x.name), ['High', 'Mid', 'Mid2'])
  assert.deepEqual(rows.map((x) => x.variant), ['A', 'B', 'A'])
  assert.equal(nextVariant(db), 'B')
  assert.notEqual(a, d)
})

test('templates: variant B is a question; audit bullets appear (max two) and stay factual', () => {
  const audit = JSON.stringify({ bullets: ["I couldn't spot an online booking option on the homepage.", 'The footer still says © 2015.', 'Third finding.'] })
  const l = { id: 7, name: 'Acme Dental', website: 'https://a.test', observations: '[]', audit }
  const a = templateDraft(l, { variant: 'A' }), b = templateDraft(l, { variant: 'B' })
  assert.match(b.subject, /\?|Question|question/)
  assert.notEqual(a.subject, b.subject)
  assert.match(a.body, /- I couldn't spot an online booking option/)
  assert.ok(!/Third finding/.test(a.body))
})

test('warm-up: starts at 5, gains 4 per week, never above your limit, holds on bounces', () => {
  config.dailyCap = 30
  const db = openDb(':memory:')
  assert.deepEqual([effectiveCap(db).cap, effectiveCap(db).week], [5, 1])
  const l = lead(db)
  sentMsg(db, l, { ago: '-8 days' })
  assert.equal(effectiveCap(db).cap, 9)
  db.prepare("UPDATE messages SET sent_at=datetime('now','-100 days')").run()
  assert.equal(effectiveCap(db).cap, 30)
  config.dailyCap = 12
  assert.equal(effectiveCap(db).cap, 12)
  const b1 = lead(db, { status: 'bounced' }), b2 = lead(db, { status: 'bounced' })
  sentMsg(db, b1); sentMsg(db, b2)
  const held = effectiveCap(db)
  assert.equal(held.held, true)
  assert.equal(held.cap, 5)
  config.warmup = false
  assert.equal(effectiveCap(db).cap, 12)
  config.warmup = true
})

test('safety: the same approved message cannot be sent twice by two runners', async () => {
  config.dailyCap = 50
  const db = openDb(':memory:')
  const l = lead(db, { status: 'approved' })
  db.prepare("INSERT INTO messages (lead_id,step,subject,body,status) VALUES (?,0,'S','B','approved')").run(l)
  const t1 = transport(), t2 = transport()
  const [x, y] = await Promise.all([
    sendApproved(db, { live: true, transport: t1, log: () => {}, wait: async () => {} }),
    sendApproved(db, { live: true, transport: t2, log: () => {}, wait: async () => {} }),
  ])
  assert.equal(t1.sent.length + t2.sent.length, 1)
  assert.equal(x + y, 1)
})

test('replies: recorded, labelled by rules, suggestion editable, send is threaded, opt-outs refused', async () => {
  const db = openDb(':memory:')
  const l = lead(db, { email: 'owner@acme.test' })
  sentMsg(db, l)
  const parsed = { from: { value: [{ address: 'owner@acme.test' }] }, subject: 'Re: Subj', text: 'Sounds interesting! How much would it cost?\n\nOn Mon, Rai wrote:\n> quoted', messageId: '<their-1@acme.test>' }
  const r = applyInbound(db, parsed)
  assert.equal(r.kind, 'reply')
  const row = db.prepare('SELECT * FROM replies').get()
  assert.equal(row.body, 'Sounds interesting! How much would it cost?')
  assert.equal(heuristicLabel('Not interested, thanks').label, 'not_interested')
  assert.equal(heuristicLabel('I am out of office until Monday').label, 'out_of_office')
  assert.equal(heuristicLabel('Can you tell me more?').label, 'question')
  await labelPending(db)
  const labelled = db.prepare('SELECT * FROM replies').get()
  assert.equal(labelled.label, 'interested')
  assert.ok(labelled.suggested.length > 20)

  const t = transport()
  assert.equal(await notifyHot(db, { transport: t }), 1)
  assert.equal(await notifyHot(db, { transport: t }), 0, 'alerts once')
  assert.match(t.sent[0].subject, /Hot lead/)

  await sendReply(db, row.id, { body: 'Great, how about Tuesday?', transport: t })
  const out = t.sent.at(-1)
  assert.equal(out['headers']['In-Reply-To'], '<their-1@acme.test>')
  assert.match(out.text, /Tuesday/)
  assert.match(out.text, /no thanks/i, 'footer with opt-out is always present')
  assert.equal(db.prepare('SELECT status FROM replies').get().status, 'answered')

  db.prepare("INSERT INTO suppression (value) VALUES ('owner@acme.test')").run()
  await assert.rejects(() => sendReply(db, row.id, { body: 'again', transport: t }), /opted out/)
})

test('replies: AI triage is used when available, and falls back to rules on bad output', async () => {
  const good = { messages: { create: async () => ({ content: [{ type: 'text', text: '{"label":"question","summary":"Asks about pricing","suggested_reply":"Happy to explain.\\n\\nRai"}' }] }) } }
  const bad = { messages: { create: async () => ({ content: [{ type: 'text', text: 'sorry, no json' }] }) } }
  const a = await triage({ body: 'what does it cost' }, { client: good })
  assert.equal(a.label, 'question'); assert.equal(a.summary, 'Asks about pricing')
  const b = await triage({ body: 'Not interested' }, { client: bad })
  assert.equal(b.label, 'not_interested')
})

test('daily runner: reads inbox, queues follow-ups, sends approved within limits, nothing new without approval', async () => {
  config.dailyCap = 50; config.gmailUser = 'me@o.test'; config.gmailAppPassword = 'x'
  const db = openDb(':memory:')
  const first = lead(db, { email: 'a@a.test', status: 'sent' })
  sentMsg(db, first, { ago: '-5 days' }) // follow-up due
  const fresh = lead(db, { email: 'b@b.test', status: 'approved' })
  db.prepare("INSERT INTO messages (lead_id,step,subject,body,status) VALUES (?,0,'S','B','approved')").run(fresh)
  const draftOnly = lead(db, { email: 'c@c.test', status: 'drafted' })
  db.prepare("INSERT INTO messages (lead_id,step,subject,body,status) VALUES (?,0,'S','B','draft')").run(draftOnly)
  const t = transport(); let inboxRead = 0
  const r = await dailyCycle(db, { log: () => {}, transport: t, readInbox: async () => { inboxRead++ } })
  assert.equal(inboxRead, 1)
  assert.equal(r.followUps, 1)
  assert.equal(r.sent, 2, 'the approved first email and the auto follow-up')
  assert.ok(!t.sent.some((m) => m.to === 'c@c.test'), 'unapproved drafts are never sent')
})

test('pipeline: stage, note and CSV export work; bad stages are refused', async () => {
  const db = openDb(':memory:')
  const l = lead(db, { name: 'Smile, Inc', status: 'replied', score: 77 })
  const server = createApp(db, { demo: false })
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const base = `http://127.0.0.1:${server.address().port}`
  const post = (p, b) => fetch(base + p, { method: 'POST', body: JSON.stringify(b) })
  try {
    assert.equal((await post('/api/stage', { leadId: l, stage: 'meeting' })).status, 200)
    assert.equal((await post('/api/stage', { leadId: l, stage: 'hacked' })).status, 400)
    await post('/api/note', { leadId: l, note: 'Call Tuesday "after lunch"' })
    const st = await (await fetch(base + '/api/state')).json()
    const p = st.pipeline.find((x) => x.id === l)
    assert.equal(p.column, 'meeting'); assert.equal(p.notes, 'Call Tuesday "after lunch"')
    const csv = await (await fetch(base + '/api/export.csv')).text()
    assert.match(csv.split('\r\n')[0], /^name,email,/)
    assert.match(csv, /"Smile, Inc"/)
    assert.match(csv, /""after lunch""/, 'quotes are escaped')
    assert.ok(st.todo && 'followUpsDue' in st.todo && st.cap.cap >= 1)
  } finally { server.close() }
})
