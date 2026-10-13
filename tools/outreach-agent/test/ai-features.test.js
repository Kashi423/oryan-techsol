import test from 'node:test'
import assert from 'node:assert/strict'
import { openDb } from '../src/db.js'
import { config } from '../src/config.js'
import { renderEmailHtml } from '../src/html.js'
import { recommendOffer } from '../src/offer.js'
import { localReview, aiReview } from '../src/quality.js'
import { suggestTargets, FALLBACK_IDEAS } from '../src/ideas.js'
import { templateDraft } from '../src/template.js'
import { draftEmail } from '../src/write.js'
import { sendApproved } from '../src/sender.js'
import { createApp } from '../src/server.js'

config.anthropicKey = ''; config.openaiKey = ''
config.sendWindow = '0-24'; config.minDelaySec = config.maxDelaySec = 0; config.warmup = false; config.dailyCap = 50

test('html email: branded, safe, light and complete', () => {
  Object.assign(config, { signOffName: 'Rai', logoUrl: '', replyTo: 'sales@o.test', emailStyle: 'html' })
  const html = renderEmailHtml({ subject: 'Hi <b>Acme</b>', body: 'Hello <script>alert(1)</script>\n\nHere is what I saw:\n- First thing\n- Second & third\n\nWorth a quick call?\n\nRai' })
  assert.ok(!/<script/i.test(html) && html.includes('&lt;script&gt;'), 'escapes injected markup')
  assert.match(html, /<ul[^>]*>[\s\S]*First thing[\s\S]*Second &amp; third[\s\S]*<\/ul>/)
  assert.match(html, /ORYAN/)
  assert.match(html, /#051c4e/i, 'brand navy')
  assert.match(html, /unsubscribe/i)
  assert.match(html, new RegExp(config.postalAddress.slice(0, 12)))
  assert.ok(!/<img/i.test(html), 'no images by default')
  assert.ok(!/tracking|pixel|1x1/i.test(html))
  assert.equal((html.match(/Rai/g) ?? []).length >= 1, true)
  assert.ok(html.length < 9000, 'stays light')
  config.logoUrl = 'https://oryantechsol.com/logo.png'
  assert.match(renderEmailHtml({ subject: 's', body: 'b' }), /<img src="https:\/\/oryantechsol\.com\/logo\.png"/)
  config.logoUrl = ''
})

test('send: HTML + text parts by default, text only when style is plain', async () => {
  const mk = () => { const s = []; return { s, sendMail: async (m) => { s.push(m); return { messageId: '<x@y>' } } } }
  const run = async (style) => {
    config.emailStyle = style
    const db = openDb(':memory:')
    const l = Number(db.prepare("INSERT INTO leads (place_id,name,email,domain,status) VALUES ('p','Acme','a@a.test','a.test','approved')").run().lastInsertRowid)
    db.prepare("INSERT INTO messages (lead_id,step,subject,body,status) VALUES (?,0,'S','Hello there. Worth a chat?','approved')").run(l)
    const t = mk()
    await sendApproved(db, { live: true, transport: t, log: () => {}, wait: async () => {} })
    return t.s[0]
  }
  const html = await run('html'); const plain = await run('plain')
  assert.ok(html.html && html.text, 'multipart: both parts')
  assert.match(html.text, /no thanks/i)
  assert.ok(plain.text && !plain.html)
  config.emailStyle = 'html'
})

test('offer: leads with the single most relevant thing', () => {
  assert.match(recommendOffer({ website: '' }, null).service, /website/)
  assert.match(recommendOffer({ website: 'x' }, { checks: [{ id: 'booking', ok: false }, { id: 'mobile', ok: false }] }).service, /booking/)
  assert.match(recommendOffer({ website: 'x' }, { checks: [{ id: 'mobile', ok: false }] }).service, /mobile/)
  assert.match(recommendOffer({ website: 'x' }, { checks: [] }).service, /AI assistant|automation/)
})

test('quality gate: flags spam wording, invented numbers and claims; passes a clean email', () => {
  const lead = { name: 'Smile Dental', observations: '[]', audit: JSON.stringify({ bullets: ['no booking'] }) }
  const clean = localReview({ subject: 'Online booking for Smile Dental', body: "Hi,\n\nI couldn't spot an online booking option on the Smile Dental homepage. We build simple booking pages for clinics. Would a 15-minute call this week be worth your time?\n\nRai" }, lead)
  assert.equal(clean.level, 'good'); assert.deepEqual(clean.issues, [])
  const bad = localReview({ subject: 'FREE GUARANTEED RESULTS!!!', body: "I'm a local developer here in Austin. We will increase your bookings by 300% in 30 days, guaranteed, act now. Visit https://a.test and https://b.test" }, lead)
  assert.equal(bad.level, 'review')
  const text = bad.issues.join(' | ')
  for (const word of ['Spam-trigger', 'Unsupported claim', 'numbers', 'More than one link', 'question']) assert.match(text, new RegExp(word), word)
})

test('quality gate: AI fact-check adds issues, and falls back quietly when AI fails', async () => {
  const lead = { name: 'Smile Dental', observations: '[]' }
  const draft = { subject: 'Hi Smile Dental', body: 'Hello. Worth a chat?' }
  const ai = { messages: { create: async () => ({ content: [{ type: 'text', text: '{"issues":["Claims a partnership that is not in the facts"]}' }] }) } }
  const r = await aiReview(draft, lead, { client: ai })
  assert.equal(r.ai, true); assert.ok(r.issues.some((i) => /AI check: Claims a partnership/.test(i)))
  const broken = { messages: { create: async () => { throw new Error('down') } } }
  const f = await aiReview(draft, lead, { client: broken })
  assert.equal(f.ai, false)
  assert.equal((await aiReview(draft, lead)).ai, false, 'no AI configured: local only')
})

test('target ideas: AI when available, built-in list otherwise or on bad output', async () => {
  const good = { messages: { create: async () => ({ content: [{ type: 'text', text: JSON.stringify({ ideas: [{ type: 'dentists', why: 'phone-first' }, { type: 'plumbers', why: 'no sites' }, { type: 'gyms', why: 'bookings' }] }) }] }) } }
  const r = await suggestTargets({ client: good })
  assert.equal(r.ai, true); assert.equal(r.ideas[0].type, 'dentists')
  const bad = { messages: { create: async () => ({ content: [{ type: 'text', text: 'nope' }] }) } }
  assert.deepEqual((await suggestTargets({ client: bad })).ideas, FALLBACK_IDEAS)
  assert.equal((await suggestTargets({})).ai, false)
})

test('follow-ups get different jobs; tone changes the template; offer shapes the pitch', async () => {
  const seen = []
  const client = { messages: { create: async ({ messages }) => { seen.push(messages[0].content); return { content: [{ type: 'text', text: '{"subject":"Re: x","body":"Hi, quick tip. Worth a chat?"}' }] } } } }
  const lead = { id: 1, name: 'Acme', website: 'https://a.test', observations: '[]', offer: 'online booking or enquiry system' }
  await draftEmail(lead, { step: 1, previous: { subject: 'S', body: 'B' }, client })
  await draftEmail(lead, { step: 2, previous: { subject: 'S', body: 'B' }, client })
  assert.match(seen[0], /ONE genuinely useful, specific tip/)
  assert.match(seen[1], /last one/)
  assert.match(seen[0], /Lead with this one thing: online booking/)
  const short = templateDraft(lead, { tone: 'short' }), full = templateDraft(lead)
  assert.ok(short.body.length < full.body.length)
  assert.match(full.body, /online booking or enquiry system/)
})

test('web: preview, regenerate by tone, AI check and ideas endpoints work', async () => {
  const db = openDb(':memory:')
  const l = Number(db.prepare("INSERT INTO leads (place_id,name,email,domain,status,website,observations,offer) VALUES ('p','Smile Dental','a@a.test','a.test','drafted','https://a.test','[]','online booking')").run().lastInsertRowid)
  const m = Number(db.prepare("INSERT INTO messages (lead_id,step,subject,body,status,variant) VALUES (?,0,'Old','Old body. Worth a chat?','draft','A')").run(l).lastInsertRowid)
  const server = createApp(db)
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const base = `http://127.0.0.1:${server.address().port}`
  const post = async (p, b) => { const r = await fetch(base + p, { method: 'POST', body: JSON.stringify(b) }); return { status: r.status, body: await r.json() } }
  try {
    const pv = await post('/api/preview', { id: m })
    assert.equal(pv.status, 200); assert.match(pv.body.html, /Old body/)
    const rg = await post('/api/regenerate', { id: m, tone: 'short' })
    assert.equal(rg.status, 200)
    const row = db.prepare('SELECT subject, body, quality FROM messages WHERE id=?').get(m)
    assert.match(row.subject, /Smile Dental/); assert.ok(JSON.parse(row.quality).score >= 0)
    assert.equal((await post('/api/review', { id: m })).status, 200)
    const ideas = await post('/api/ideas', { area: 'Austin' })
    assert.ok(ideas.body.ideas.length >= 3)
    assert.equal((await post('/api/settings', { emailStyle: 'blink' })).status, 400)
    assert.equal((await post('/api/settings', { logoUrl: 'http://insecure' })).status, 400)
    const st = await (await fetch(base + '/api/state')).json()
    assert.ok(st.tones.includes('friendly') && st.emailStyle)
    assert.equal(st.drafts[0].offer, 'online booking')
    assert.ok(st.drafts[0].quality)
  } finally { server.close() }
})
