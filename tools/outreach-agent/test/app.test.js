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
    for (const bad of ['0', '-5', '1.5', '999', 'abc']) {
      const r = await fetch(base + '/api/settings', { method: 'POST', body: JSON.stringify({ dailyCap: bad }) })
      assert.equal(r.status, 400, `dailyCap ${bad} should be rejected`)
    }
    const none = await (await fetch(base + '/api/approve', { method: 'POST', body: JSON.stringify({ ids: [999] }) })).json()
    assert.equal(none.changed, 0)
  } finally {
    server.close()
  }
})

test('OpenAI writer works through the same draft path and is chosen when only that key is set', async () => {
  const { draftEmail, aiProvider } = await import('../src/write.js')
  const saved = { a: config.anthropicKey, o: config.openaiKey, u: config.openaiBaseUrl, m: config.openaiModel, f: config.openaiFallbackModels }
  const realFetch = globalThis.fetch
  config.openaiBaseUrl = 'https://api.openai.com/v1'; config.openaiModel = 'gpt-4o-mini'; config.openaiFallbackModels = []
  let seen
  globalThis.fetch = async (url, opts) => {
    seen = { url, body: JSON.parse(opts.body), auth: opts.headers.Authorization }
    return { ok: true, json: async () => ({ choices: [{ message: { content: '{"subject":"Hi from GPT","body":"Hello"}' } }] }) }
  }
  try {
    config.anthropicKey = ''; config.openaiKey = 'sk-test'
    assert.equal(aiProvider(), 'openai')
    const d = await draftEmail({ name: 'Acme', observations: '[]' })
    assert.equal(d.subject, 'Hi from GPT')
    assert.equal(seen.url, 'https://api.openai.com/v1/chat/completions')
    assert.equal(seen.auth, 'Bearer sk-test')
    assert.equal(seen.body.messages[0].role, 'system')
    config.openaiKey = ''
    assert.equal(aiProvider(), null)
    // no key at all: falls back to the built-in templates instead of failing
    const t = await draftEmail({ name: 'Acme', observations: '[]', website: 'https://acme.test' })
    assert.match(t.subject, /Acme/)
    assert.match(t.body, /15-minute call/)
  } finally {
    globalThis.fetch = realFetch
    Object.assign(config, { anthropicKey: saved.a, openaiKey: saved.o, openaiBaseUrl: saved.u, openaiModel: saved.m, openaiFallbackModels: saved.f })
  }
})

test('free OpenAI-compatible services (Gemini/Groq) use their own base URL and max_tokens', async () => {
  const { draftEmail } = await import('../src/write.js')
  const saved = { a: config.anthropicKey, o: config.openaiKey, u: config.openaiBaseUrl, m: config.openaiModel }
  const realFetch = globalThis.fetch
  let seen
  globalThis.fetch = async (url, opts) => {
    seen = { url, body: JSON.parse(opts.body) }
    return { ok: true, json: async () => ({ choices: [{ message: { content: '{"subject":"Hi","body":"Hello"}' } }] }) }
  }
  try {
    config.anthropicKey = ''; config.openaiKey = 'free-key'
    config.openaiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta/openai'; config.openaiModel = 'gemini-3.1-flash-lite'
    await draftEmail({ name: 'Acme', observations: '[]' })
    assert.equal(seen.url, 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions')
    assert.equal(seen.body.model, 'gemini-3.1-flash-lite')
    assert.ok('max_tokens' in seen.body && !('max_completion_tokens' in seen.body))
  } finally {
    globalThis.fetch = realFetch
    Object.assign(config, { anthropicKey: saved.a, openaiKey: saved.o, openaiBaseUrl: saved.u, openaiModel: saved.m })
  }
})
