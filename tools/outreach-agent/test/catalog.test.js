import test from 'node:test'
import assert from 'node:assert/strict'
import { config } from '../src/config.js'
import { getCatalog, saveCatalog, useMemoryCatalog, startingPrice, servicesLine, SERVICES } from '../src/catalog.js'
import { draftEmail, withFooter, unsupportedClaim } from '../src/write.js'
import { templateDraft } from '../src/template.js'
import { renderEmailHtml } from '../src/html.js'
import { localReview } from '../src/quality.js'
import { openDb } from '../src/db.js'
import { createApp } from '../src/server.js'

config.anthropicKey = ''; config.openaiKey = ''
const lead = { id: 5, name: 'Acme Dental', website: 'https://a.test', observations: '[]', offer: 'online booking or enquiry system' }

test('catalog: eight services, no prices until you set them, validated when you do', () => {
  useMemoryCatalog({})
  assert.equal(getCatalog().length, SERVICES.length)
  assert.ok(getCatalog().every((s) => s.from === null))
  assert.equal(startingPrice(lead), null)
  saveCatalog({ web: '$ 499', ai: '1,200', app: '' })
  const c = Object.fromEntries(getCatalog().map((s) => [s.key, s.from]))
  assert.equal(c.web, 499); assert.equal(c.ai, 1200); assert.equal(c.app, null)
  for (const bad of ['-5', 'abc', '499 USD', '1e3', '0']) assert.throws(() => saveCatalog({ web: bad }), /Price for Websites/, bad)
  assert.throws(() => saveCatalog({ web: '99999999' }), /at most 1,000,000/)
  assert.equal(getCatalog().find((s) => s.key === 'web').from, 499, 'a rejected save changes nothing')
})

test('price shows in template only when set, and only for the service being offered', () => {
  useMemoryCatalog({})
  assert.ok(!/\$\d/.test(templateDraft(lead).body), 'no price when none set')
  saveCatalog({ web: 499, ai: 1200 })
  assert.match(templateDraft(lead).body, /Packages for this start from \$499\./)
  const chatbotLead = { ...lead, offer: 'a lead-capture form with an AI chatbot' }
  assert.match(templateDraft(chatbotLead).body, /from \$1,200\./)
  const autoLead = { ...lead, offer: 'small automations and an AI assistant for enquiries' }
  assert.ok(!/\$\d/.test(templateDraft(autoLead).body), 'no price set for automation')
})

test('AI prompt: supplies the exact price, or says not to mention any', async () => {
  const seen = []
  const client = { messages: { create: async ({ messages }) => { seen.push(messages[0].content); return { content: [{ type: 'text', text: '{"subject":"Hi Acme Dental","body":"Hello Acme Dental. Worth a chat?"}' }] } } } }
  useMemoryCatalog({})
  await draftEmail(lead, { client })
  assert.match(seen[0], /No price is supplied: do not mention any price/)
  saveCatalog({ web: 499 })
  await draftEmail(lead, { client })
  assert.match(seen[1], /"from \$499"/)
})

test('comparative price claims are blocked ("cheapest", "below market"...)', async () => {
  for (const bad of ['We are the cheapest in town', 'Our prices are below market', 'cheaper than other agencies', 'the best price you will find', 'Unbeatable value']) {
    assert.equal(unsupportedClaim(bad), 'made a price comparison', bad)
  }
  assert.equal(unsupportedClaim('Packages start from $499.'), null)
  assert.match(localReview({ subject: 'Acme Dental', body: 'We are the cheapest and offer below market rates. Worth a chat?' }, { name: 'Acme Dental' }).issues.join(' '), /Unsupported claim: made a price comparison/)
  const client = { messages: { create: async () => ({ content: [{ type: 'text', text: '{"subject":"Hi","body":"We are cheaper than other agencies. Worth a chat?"}' }] }) } }
  await assert.rejects(() => draftEmail(lead, { client }), /unsupported claim/)
})

test('every email lists all services, in the text footer and the HTML signature', () => {
  const line = servicesLine()
  for (const s of ['Websites', 'Mobile apps', 'AI chatbots', 'Automation', 'E-commerce', 'Custom software', 'SaaS', 'Integrations']) assert.match(line, new RegExp(s))
  assert.match(withFooter('Hello'), /Websites .* Integrations/)
  assert.match(renderEmailHtml({ subject: 's', body: 'b' }), /Websites .* Integrations/)
})

test('web: prices are saved through the app and appear in state', async () => {
  useMemoryCatalog({})
  const server = createApp(openDb(':memory:'), { demo: true })
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const base = `http://127.0.0.1:${server.address().port}`
  const post = (p, b) => fetch(base + p, { method: 'POST', body: JSON.stringify(b) })
  try {
    assert.equal((await post('/api/catalog', { prices: { web: '750' } })).status, 200)
    const st = await (await fetch(base + '/api/state')).json()
    assert.equal(st.catalog.find((s) => s.key === 'web').from, 750)
    assert.equal((await post('/api/catalog', { prices: { web: 'abc0' } })).status, 400)
    assert.equal((await post('/api/catalog', { prices: { web: '-1' } })).status, 400)
    const after = await (await fetch(base + '/api/state')).json()
    assert.equal(after.catalog.find((s) => s.key === 'web').from, 750, 'bad input did not overwrite the saved price')
  } finally { server.close() }
})
