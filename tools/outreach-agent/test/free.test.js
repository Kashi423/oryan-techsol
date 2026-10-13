import test from 'node:test'
import assert from 'node:assert/strict'
import { openDb } from '../src/db.js'
import { config } from '../src/config.js'
import { tagsFor, buildQuery, parseElements, searchOsm } from '../src/osm.js'
import { templateDraft } from '../src/template.js'
import { findLeads, enrichLeads, draftLeads } from '../src/pipeline.js'

test('OSM: business types map to tags, unknown types fall back to a name search', () => {
  assert.deepEqual(tagsFor('Dentists'), [['amenity', 'dentist'], ['healthcare', 'dentist']])
  assert.deepEqual(tagsFor('Plumbers'), [['craft', 'plumber']])
  assert.deepEqual(tagsFor('llama farms'), [])
  const q = buildQuery('llama farms', [1, 2, 3, 4])
  assert.match(q, /nwr\["name"~"llama farm",i\]\(1,2,3,4\)/)
  assert.match(buildQuery('dentists', [1, 2, 3, 4]), /nwr\["amenity"="dentist"\]\["name"\]\(1,2,3,4\)/)
})

test('OSM: parses listings, keeps only usable ones, puts listings with an email first', () => {
  const out = parseElements([
    { type: 'node', id: 1, tags: { name: 'No Contact Dental', amenity: 'dentist' } },
    { type: 'node', id: 2, tags: { name: 'Site Only', amenity: 'dentist', website: 'siteonly.test' } },
    { type: 'way', id: 3, tags: { name: 'Has Email', amenity: 'dentist', 'contact:email': 'Hi@HasEmail.test;other@x.test', phone: '123' } },
    { type: 'node', id: 4, tags: { amenity: 'dentist', website: 'https://noname.test' } },
  ], 'Austin')
  assert.deepEqual(out.map((p) => p.name), ['Has Email', 'Site Only'])
  assert.equal(out[0].email, 'hi@hasemail.test')
  assert.equal(out[1].website, 'https://siteonly.test')
})

test('OSM: searchOsm geocodes the area then queries Overpass with its bounding box', async () => {
  const calls = []
  let overpassBody = ''
  const f = async (url, opts = {}) => {
    calls.push(url)
    if (String(url).includes('overpass')) overpassBody = decodeURIComponent(opts.body)
    if (String(url).includes('nominatim')) return { ok: true, json: async () => [{ boundingbox: ['30.1', '30.5', '-97.9', '-97.5'] }] }
    return { ok: true, json: async () => ({ elements: [{ type: 'node', id: 9, tags: { name: 'Smile', amenity: 'dentist', email: 'info@smile.test' } }] }) }
  }
  const r = await searchOsm({ query: 'dentists', area: 'Austin, TX', fetchImpl: f })
  assert.equal(r.length, 1)
  // Nominatim returns [south, north, west, east]; Overpass wants (south,west,north,east)
  assert.match(overpassBody, /\(30\.1,-97\.9,30\.5,-97\.5\)/)
  assert.match(overpassBody, /"amenity"="dentist"/)
  assert.match(calls[0], /nominatim\.openstreetmap\.org.*Austin/)
  const bad = async () => ({ ok: true, json: async () => [] })
  await assert.rejects(() => searchOsm({ query: 'x', area: 'Nowhereville', fetchImpl: bad }), /Couldn't find/)
})

test('templates: factual, varied, follow-ups differ, no-website case is honest', () => {
  config.signOffName = 'Rai'
  const lead = { id: 1, name: 'Smile Dental', website: 'https://s.test', observations: JSON.stringify(['The footer still says © 2016.', 'Built on Wix.']) }
  const d = templateDraft(lead)
  assert.match(d.body, /footer still says/)
  assert.ok(!/Built on Wix/.test(d.body), 'uses at most one observation')
  assert.match(d.body, /Rai$/)
  assert.match(d.subject, /Smile Dental/)
  const none = templateDraft({ id: 2, name: 'Corner Cafe', website: '', observations: '[]' })
  assert.match(none.body, /couldn't find a website/)
  const f1 = templateDraft(lead, { step: 1, previous: d })
  const f2 = templateDraft(lead, { step: 2, previous: d })
  assert.notEqual(f1.body, f2.body)
  assert.match(f1.subject, /^Re: /)
})

test('zero-setup pipeline: OSM listing with its own email -> ready -> template draft, no keys', async () => {
  const saved = { a: config.anthropicKey, o: config.openaiKey }
  config.anthropicKey = ''; config.openaiKey = ''
  try {
    const db = openDb(':memory:')
    const search = async () => [
      { place_id: 'osm-1', name: 'Email Only Bakery', address: 'Austin', phone: '', website: '', email: 'hello@bakery.test', category: 'bakery', rating: null },
      { place_id: 'osm-2', name: 'Twin Bakery', address: 'Austin', phone: '', website: '', email: 'x@bakery.test', category: 'bakery', rating: null },
    ]
    const f = await findLeads(db, { query: 'bakeries', area: 'Austin', search })
    assert.equal(f.added, 2)
    const e = await enrichLeads(db)
    assert.equal(e.ready, 1, 'second lead on the same domain is skipped as a duplicate')
    const d = await draftLeads(db)
    assert.equal(d.drafted, 1)
    const m = db.prepare('SELECT subject, body FROM messages').get()
    assert.match(m.subject, /Email Only Bakery/)
  } finally {
    config.anthropicKey = saved.a; config.openaiKey = saved.o
  }
})

test('OSM: falls back to a mirror when the first Overpass server is busy', async () => {
  const hits = []
  const f = async (url) => {
    hits.push(String(url))
    if (String(url).includes('nominatim')) return { ok: true, json: async () => [{ boundingbox: ['1', '2', '3', '4'] }] }
    if (hits.filter((h) => h.includes('overpass')).length === 1) return { ok: false, status: 504, json: async () => ({}) }
    return { ok: true, status: 200, json: async () => ({ elements: [{ type: 'node', id: 1, tags: { name: 'Mirror Dental', email: 'a@mirror.test' } }] }) }
  }
  const r = await searchOsm({ query: 'dentists', area: 'Anywhere', fetchImpl: f })
  assert.equal(r[0].name, 'Mirror Dental')
  assert.equal(hits.filter((h) => h.includes('overpass')).length, 2)
  const allBusy = async (url) => String(url).includes('nominatim')
    ? { ok: true, json: async () => [{ boundingbox: ['1', '2', '3', '4'] }] }
    : { ok: false, status: 504, json: async () => ({}) }
  await assert.rejects(() => searchOsm({ query: 'dentists', area: 'X', fetchImpl: allBusy }), /busy right now \(504\)/)
})

test('AI out of credit: no retry storm, falls back to the template and says why', async () => {
  const { draftEmail } = await import('../src/write.js')
  const saved = { a: config.anthropicKey, o: config.openaiKey, u: config.openaiBaseUrl, f: config.openaiFallbackModels }
  const realFetch = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => { calls++; return { ok: false, status: 429, text: async () => '{"error":{"type":"insufficient_quota","message":"You have no credits remaining."}}' } }
  try {
    config.anthropicKey = ''; config.openaiKey = 'sk-test'; config.openaiBaseUrl = 'https://api.openai.com/v1'; config.openaiFallbackModels = ['m2', 'm3']
    const d = await draftEmail({ id: 1, name: 'Acme', website: 'https://a.test', observations: '[]' })
    assert.match(d.subject, /Acme/)
    assert.match(d.fallbackReason, /no credits/i)
    assert.equal(calls, 1, 'quota errors are not retried or sent to fallback models')
  } finally {
    globalThis.fetch = realFetch
    Object.assign(config, { anthropicKey: saved.a, openaiKey: saved.o, openaiBaseUrl: saved.u, openaiFallbackModels: saved.f })
  }
})

test('writer guard: drafts claiming to be local are retried once, then fall back to the template', async () => {
  const { draftEmail, unsupportedClaim } = await import('../src/write.js')
  assert.equal(unsupportedClaim("Hi, I'm a local developer here in Austin."), 'claimed to be local')
  assert.equal(unsupportedClaim('We are based in Brooklyn.'), 'stated a location')
  assert.equal(unsupportedClaim("I couldn't spot an online booking option on your homepage."), null)

  const reply = (subject, body) => ({ content: [{ type: 'text', text: JSON.stringify({ subject, body }) }] })
  let n = 0
  const retrying = { messages: { create: async ({ messages }) => {
    n++
    return n === 1 ? reply('Hi', "I'm a local developer here in Austin.") : reply('Hi', 'I could not spot an online booking option on the homepage.')
  } } }
  const ok = await draftEmail({ id: 1, name: 'Acme', observations: '[]' }, { client: retrying })
  assert.equal(n, 2)
  assert.match(ok.body, /could not spot/)

  const stubborn = { messages: { create: async () => reply('Hi', "We're based in Austin and love local shops.") } }
  await assert.rejects(() => draftEmail({ id: 1, name: 'Acme', observations: '[]' }, { client: stubborn }), /unsupported claim/)
})

test('AI timeout: a stalled request moves to the next model and finally to the template', async () => {
  const { draftEmail } = await import('../src/write.js')
  const saved = { a: config.anthropicKey, o: config.openaiKey, u: config.openaiBaseUrl, f: config.openaiFallbackModels, t: config.aiTimeoutMs }
  const realFetch = globalThis.fetch
  const models = []
  const keepAlive = setInterval(() => {}, 20) // AbortSignal.timeout is unref'd; a real socket would keep the loop alive
  globalThis.fetch = (url, opts) => {
    models.push(JSON.parse(opts.body).model)
    return new Promise((_, reject) => opts.signal.addEventListener('abort', () => reject(new Error('aborted'))))
  }
  try {
    config.anthropicKey = ''; config.openaiKey = 'k'; config.openaiBaseUrl = 'https://api.openai.com/v1'
    config.openaiModel = 'main'; config.openaiFallbackModels = ['backup']; config.aiTimeoutMs = 40
    const started = Date.now()
    const d = await draftEmail({ id: 1, name: 'Acme', website: 'https://a.test', observations: '[]' })
    assert.match(d.subject, /Acme/)
    assert.match(d.fallbackReason, /did not answer in time/)
    assert.deepEqual([...new Set(models)], ['main', 'backup'])
    assert.ok(Date.now() - started < 10_000, 'gave up quickly instead of hanging')
  } finally {
    clearInterval(keepAlive)
    globalThis.fetch = realFetch
    Object.assign(config, { anthropicKey: saved.a, openaiKey: saved.o, openaiBaseUrl: saved.u, openaiFallbackModels: saved.f, aiTimeoutMs: saved.t })
  }
})
