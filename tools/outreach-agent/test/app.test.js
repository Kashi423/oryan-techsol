import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { openDb } from '../src/db.js'
import { config } from '../src/config.js'
import { findLeads, enrichLeads, draftLeads, setDraftStatus } from '../src/pipeline.js'
import { createApp } from '../src/server.js'

config.placesKey ||= 'test'

const jsonRes = (o) => ({ ok: true, json: async () => o })
const client = { messages: { create: async () => ({ content: [{ type: 'text', text: '{"subject":"Quick idea","body":"Hello there"}' }] }) } }

test('find -> enrich -> draft -> approve pipeline', async () => {
  const db = openDb(':memory:')
  const places = jsonRes({ places: [
    { id: 'p1', displayName: { text: 'Smile Dental' }, websiteUri: 'https://smile.example', formattedAddress: 'Austin' },
    { id: 'p2', displayName: { text: 'No Site Cafe' } },
  ] })
  const f = await findLeads(db, { query: 'dentists', area: 'Austin', fetchImpl: async () => places })
  assert.deepEqual(f, { found: 2, added: 2, noWebsite: 1 })

  const site = async () => ({ ok: true, url: 'https://smile.example/', headers: { get: () => 'text/html' }, text: async () => '<title>Smile</title><a href="mailto:info@smile.example">m</a>' })
  const e = await enrichLeads(db, { fetchImpl: site })
  assert.equal(e.ready, 1)
  assert.equal(db.prepare("SELECT status FROM leads WHERE name='No Site Cafe'").get().status, 'no_email')

  const d = await draftLeads(db, { client })
  assert.equal(d.drafted, 1)
  assert.equal(setDraftStatus(db, 'all', 'approved'), 1)
  assert.equal(db.prepare("SELECT status FROM messages").get().status, 'approved')
  assert.equal(db.prepare("SELECT status FROM leads WHERE name='Smile Dental'").get().status, 'approved')
})

test('web app serves UI and state, blocks foreign hosts', async () => {
  const db = openDb(':memory:')
  const server = createApp(db)
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const base = `http://127.0.0.1:${server.address().port}`
  try {
    const html = await (await fetch(base + '/')).text()
    assert.match(html, /Oryan Outreach/)
    const st = await (await fetch(base + '/api/state')).json()
    assert.equal(typeof st.sentToday, 'number')
    assert.ok('configured' in st && 'drafts' in st)
    // secrets are never returned
    assert.ok(!JSON.stringify(st).includes(config.gmailAppPassword || '\u0000\u0000'))
    const badStatus = await new Promise((resolve, reject) => {
      const rq = http.request({ host: '127.0.0.1', port: server.address().port, path: '/api/state', headers: { Host: 'evil.example' } }, (r) => { r.resume(); resolve(r.statusCode) })
      rq.on('error', reject); rq.end()
    })
    assert.equal(badStatus, 403)
    const cross = await fetch(base + '/api/approve', { method: 'POST', headers: { Origin: 'https://evil.example' }, body: '{}' })
    assert.equal(cross.status, 403)
    const none = await (await fetch(base + '/api/approve', { method: 'POST', body: JSON.stringify({ ids: [999] }) })).json()
    assert.equal(none.changed, 0)
  } finally {
    server.close()
  }
})
