import test from 'node:test'
import assert from 'node:assert/strict'
import { openDb } from '../src/db.js'
import { config } from '../src/config.js'
import { createApp } from '../src/server.js'

test('demo mode: full flow with no keys and nothing really sent', async () => {
  config.dailyCap = 50
  config.gmailAppPassword = ''
  config.anthropicKey = ''
  const server = createApp(openDb(':memory:'), { demo: true })
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const base = `http://127.0.0.1:${server.address().port}`
  const get = async () => (await fetch(base + '/api/state')).json()
  const post = async (p, b = {}) => {
    const r = await fetch(base + p, { method: 'POST', body: JSON.stringify(b) })
    return { status: r.status, body: await r.json() }
  }
  const idle = async () => {
    for (let i = 0; i < 200; i++) { const s = await get(); if (!s.job.running) return s; await new Promise((r) => setTimeout(r, 25)) }
    throw new Error('job never finished')
  }
  try {
    let s = await get()
    assert.equal(s.demo, true)
    assert.deepEqual(s.configured, { gmail: true, anthropic: true, places: true })

    assert.equal((await post('/api/find', { query: 'dentists', area: 'Austin, TX', max: 8 })).status, 200)
    s = await idle()
    assert.equal(s.job.error, null)
    assert.ok(s.drafts.length >= 3, `expected drafts, got ${s.drafts.length}`)
    assert.ok(s.drafts.every((d) => d.status === 'draft' && d.step === 0))
    assert.ok(!s.counts.found, 'every lead was processed')
    assert.ok(s.counts.no_email >= 1, 'some leads skipped (no website / no email)')

    // nothing is sent until approved
    assert.equal((await post('/api/send')).status, 200)
    s = await idle()
    assert.equal(s.sent.length, 0)

    const n = s.drafts.length
    assert.equal((await post('/api/approve', { ids: 'all' })).body.changed, n)
    assert.equal((await post('/api/send')).status, 200)
    s = await idle()
    assert.equal(s.sent.length, n)
    assert.ok(s.sent.every((m) => m.step === 0))

    // inbox: one reply, one opt-out
    await post('/api/check-replies'); s = await idle()
    assert.equal(s.counts.replied, 1)
    assert.equal(s.counts.unsubscribed, 1)

    // follow-ups only after the wait, and never to the replied / opted-out leads
    await post('/api/followups'); s = await idle()
    assert.equal(s.drafts.length, 0)
    await post('/api/demo/advance')
    await post('/api/followups'); s = await idle()
    assert.equal(s.drafts.filter((d) => d.step === 1).length, n - 2)
    await post('/api/send'); s = await idle()
    assert.equal(s.sent.filter((m) => m.step === 1).length, n - 2)
    assert.ok(s.sent.every((m) => m.lead_status !== 'unsubscribed' || m.step === 0))

    // daily cap is enforced
    assert.equal((await post('/api/settings', { dailyCap: 3 })).status, 200)
    s = await get()
    assert.equal(s.settings.dailyCap, 3)
  } finally {
    server.close()
  }
})
