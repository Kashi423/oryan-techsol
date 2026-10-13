import test from 'node:test'
import assert from 'node:assert/strict'
import { openDb } from '../src/db.js'
import { config } from '../src/config.js'
import { timezoneFor, localParts } from '../src/tz.js'
import { inSendWindow, sendApproved, dueFollowUps } from '../src/sender.js'
import { useMemoryCatalog, saveProof, proofPoints, saveCatalog } from '../src/catalog.js'
import { draftEmail } from '../src/write.js'
import { templateDraft } from '../src/template.js'
import { localReview } from '../src/quality.js'

config.anthropicKey = ''; config.openaiKey = ''
config.minDelaySec = config.maxDelaySec = 0; config.warmup = false; config.dailyCap = 50

test('time zones: US state from the address, full state names, safe default otherwise', () => {
  assert.equal(timezoneFor({ address: '100 Main St, Austin, TX 78701' }), 'America/Chicago')
  assert.equal(timezoneFor({ address: '5 Pine Rd, Los Angeles, CA' }), 'America/Los_Angeles')
  assert.equal(timezoneFor({ address: '', area: 'Denver, Colorado' }), 'America/Denver')
  assert.equal(timezoneFor({ address: '1 St, Charleston, West Virginia' }), 'America/New_York')
  assert.equal(timezoneFor({ address: '12 Mall Rd, Lahore, Pakistan' }), 'America/New_York', 'default zone')
  assert.equal(timezoneFor({ address: 'Phoenix, AZ' }), 'America/Phoenix')
  assert.equal(timezoneFor({ address: 'Some place, IN the city' }), 'America/New_York', 'lowercase words are not states')
})

test('send window: Tue-Thu 8-11 in the RECIPIENT time, not the sender time', () => {
  const saved = { w: config.sendWindow, d: config.sendDays }
  config.sendWindow = '8-11'; config.sendDays = ['tue', 'wed', 'thu']
  try {
    // Wednesday 14:00 UTC = 09:00 in New York, 08:00 in Chicago, 06:00 in Los Angeles
    const wed = new Date('2026-10-14T14:00:00Z')
    assert.equal(localParts(wed, 'America/New_York').day, 'wed')
    assert.equal(inSendWindow(wed, '8-11', 'America/New_York', config.sendDays), true)
    assert.equal(inSendWindow(wed, '8-11', 'America/Chicago', config.sendDays), true)
    assert.equal(inSendWindow(wed, '8-11', 'America/Los_Angeles', config.sendDays), false, 'only 6am there')
    // 09:00 in Lahore (PKT) is 00:00 New York: must NOT be a send time even on a Wednesday
    const lahoreMorning = new Date('2026-10-14T04:00:00Z')
    assert.equal(inSendWindow(lahoreMorning, '8-11', 'America/New_York', config.sendDays), false)
    // Monday and Friday are outside the days
    assert.equal(inSendWindow(new Date('2026-10-12T14:00:00Z'), '8-11', 'America/New_York', config.sendDays), false)
    assert.equal(inSendWindow(new Date('2026-10-16T14:00:00Z'), '8-11', 'America/New_York', config.sendDays), false)
    assert.equal(inSendWindow(new Date('2026-10-17T03:00:00Z'), '0-24', 'America/New_York', config.sendDays), true, '0-24 = anytime')
  } finally { config.sendWindow = saved.w; config.sendDays = saved.d }
})

test('send: a closed window skips only that recipient, other time zones still go out', async () => {
  const saved = { w: config.sendWindow, d: config.sendDays }
  config.sendWindow = '0-1'; config.sendDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] // open only 00:00-01:00 local
  try {
    const db = openDb(':memory:')
    const mk = (name, address, email) => {
      const l = Number(db.prepare("INSERT INTO leads (place_id,name,email,domain,status,address) VALUES (?,?,?,?,'approved',?)").run(name, name, email, email.split('@')[1], address).lastInsertRowid)
      db.prepare("INSERT INTO messages (lead_id,step,subject,body,status) VALUES (?,0,'S','B','approved')").run(l)
    }
    // Pick the two zones so that exactly one of them is inside 00:00-01:00 right now.
    const now = new Date()
    const zones = [['New York, NY', 'America/New_York'], ['Los Angeles, CA', 'America/Los_Angeles'], ['Chicago, IL', 'America/Chicago'], ['Denver, CO', 'America/Denver'], ['Honolulu, HI', 'Pacific/Honolulu'], ['Anchorage, AK', 'America/Anchorage']]
    const open = zones.find(([, tz]) => localParts(now, tz).hour === 0)
    const shut = zones.find(([, tz]) => localParts(now, tz).hour !== 0)
    if (!open) return // no US zone is at midnight right now; the window logic itself is covered above
    mk('Open Biz', open[0], 'a@open.test'); mk('Shut Biz', shut[0], 'b@shut.test')
    const sent = []
    await sendApproved(db, { live: true, transport: { sendMail: async (m) => { sent.push(m.to); return { messageId: '<x>' } } }, log: () => {}, wait: async () => {} })
    assert.deepEqual(sent, ['a@open.test'])
  } finally { config.sendWindow = saved.w; config.sendDays = saved.d }
})

test('sequence: three follow-ups on days 3, 7 and 14, then stop', () => {
  assert.deepEqual(config.followUpDays, [3, 7, 14])
  const db = openDb(':memory:')
  const l = Number(db.prepare("INSERT INTO leads (place_id,name,email,domain,status) VALUES ('p','A','a@a.test','a.test','sent')").run().lastInsertRowid)
  const add = (step, ago) => db.prepare("INSERT INTO messages (lead_id,step,subject,body,status,sent_at) VALUES (?,?,'S','B','sent',datetime('now',?))").run(l, step, ago)
  add(0, '-2 days'); assert.equal(dueFollowUps(db).length, 0, 'too early')
  db.prepare("UPDATE messages SET sent_at=datetime('now','-3 days')").run()
  assert.equal(dueFollowUps(db)[0].step, 1)
  add(1, '-0 days'); db.prepare("UPDATE messages SET sent_at=datetime('now','-7 days') WHERE step=0").run()
  assert.equal(dueFollowUps(db)[0].step, 2)
  add(2, '-0 days'); db.prepare("UPDATE messages SET sent_at=datetime('now','-14 days') WHERE step=0").run()
  assert.equal(dueFollowUps(db)[0].step, 3)
  add(3, '-0 days')
  assert.equal(dueFollowUps(db).length, 0, 'sequence finished after the break-up note')
})

test('proof: none is claimed unless YOU supply it; supplied proof is used verbatim and links are refused', async () => {
  useMemoryCatalog({})
  assert.deepEqual(proofPoints(), [])
  const seen = []
  const client = { messages: { create: async ({ messages }) => { seen.push(messages[0].content); return { content: [{ type: 'text', text: '{"subject":"Acme booking","body":"Acme: want the quick fix?"}' }] } } } }
  const lead = { id: 1, name: 'Acme', website: 'https://a.test', observations: '[]' }
  await draftEmail(lead, { client })
  assert.match(seen[0], /No proof points are supplied/)
  saveProof('We built a booking site for a dental clinic.\n\n  We automated invoicing for a small shop  ')
  assert.deepEqual(proofPoints(), ['We built a booking site for a dental clinic.', 'We automated invoicing for a small shop'])
  await draftEmail(lead, { client })
  assert.match(seen[1], /Real proof you may use, verbatim, at most one: "We built a booking site/)
  assert.throws(() => saveProof('See https://x.test for our work'), /cannot contain links/)
  assert.throws(() => saveProof('x'.repeat(200)), /under 160/)
  saveCatalog({ web: 499 })
  assert.equal(proofPoints().length, 2, 'saving prices keeps your proof points')
  // template follow-up 2 uses proof verbatim when present
  const t = templateDraft(lead, { step: 2, previous: { subject: 'S' } })
  assert.match(t.body, /We built a booking site for a dental clinic/)
})

test('first email follows the research shape: short, specific, interest question, no call ask', () => {
  useMemoryCatalog({})
  config.signOffName = 'Rai'
  const lead = { id: 9, name: 'Brightside Dental', website: 'https://b.test', observations: '[]', offer: 'online booking or enquiry system',
    audit: JSON.stringify({ bullets: ["I couldn't spot an online booking or ordering option on the homepage.", 'The footer still says © 2017.'] }) }
  for (const variant of ['A', 'B']) {
    const d = templateDraft(lead, { variant })
    const words = d.body.split(/\s+/).filter(Boolean).length
    assert.ok(words >= 25 && words <= 100, `words: ${words}`)
    assert.ok(d.subject.length <= 40, d.subject)
    assert.match(d.subject, /Brightside Dental/)
    assert.match(d.body, /\?\s+Rai$|\?\s*\n\nRai$/)
    assert.ok(!/minute|call|meeting|schedule/i.test(d.body), 'no call ask in first email')
    assert.ok(!/footer still says/.test(d.body), 'one observation only')
    const q = localReview(d, lead)
    assert.equal(q.level, 'good', q.issues.join(' | '))
  }
})

test('quality gate: generic openers and call-asks in a first email are flagged', () => {
  const lead = { name: 'Smile Dental' }
  const a = localReview({ subject: 'Smile Dental', body: "Hi,\n\nI hope this finds you well, I'm reaching out about Smile Dental. Would a 15-minute call this week work?\n\nRai" }, lead)
  const text = a.issues.join(' | ')
  assert.match(text, /Generic opener/); assert.match(text, /Asks for a call or time/)
  assert.ok(a.score < 90)
})
