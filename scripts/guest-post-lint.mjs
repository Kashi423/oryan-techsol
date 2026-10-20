// Mechanical quality gate for a guest-post draft. Usage:
//   node scripts/guest-post-lint.mjs docs/guest-posts/<site>/article.md [--offline]
//
// Exit code: 0 = no errors (warnings and to-dos may remain), 1 = at least one ERROR, 2 = could not read.
// ERROR = must be fixed before sending. WARN = fix unless you have a reason. TODO = needs a human fact.
//
// The article format (front matter, then the article, then "## About the author", then the checklist):
//   ---
//   target: example.com
//   title: ...
//   meta_description: ... (<= 155 chars)
//   link_url: https://oryantechsol.com/...      (the one contextual link in the body)
//   link_anchor: ...
//   word_range: 1200-1800                       (optional)
//   ---

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const file = process.argv[2]
const offline = process.argv.includes('--offline')
if (!file || !fs.existsSync(file)) {
  console.error('Usage: node scripts/guest-post-lint.mjs <article.md> [--offline]')
  process.exit(2)
}

const raw = fs.readFileSync(file, 'utf8')
const issues = []
const add = (level, msg) => issues.push({ level, msg })

// --- front matter -------------------------------------------------------------------------------
const fm = {}
let text = raw
const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
if (m) {
  for (const line of m[1].split(/\r?\n/)) {
    const k = line.match(/^([a-z_]+):\s*(.*)$/i)
    if (k) fm[k[1]] = k[2].trim()
  }
  text = raw.slice(m[0].length)
} else add('ERROR', 'Missing front matter (--- target/title/meta_description/link_url/link_anchor ---).')
for (const key of ['target', 'title', 'meta_description', 'link_url', 'link_anchor']) if (!fm[key]) add('ERROR', `Front matter is missing "${key}".`)

// --- split sections -----------------------------------------------------------------------------
const checklistAt = text.search(/^##\s+Pre-send checklist/im)
if (checklistAt >= 0) text = text.slice(0, checklistAt)
const bioAt = text.search(/^##\s+About the author/im)
if (bioAt < 0) add('ERROR', 'Missing the "## About the author" section.')
const body = bioAt >= 0 ? text.slice(0, bioAt) : text
const bio = bioAt >= 0 ? text.slice(bioAt) : ''

const strip = (s) =>
  s
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>|]/g, ' ')
const words = strip(body).split(/\s+/).filter(Boolean).length

// --- length -------------------------------------------------------------------------------------
const [lo, hi] = (fm.word_range || '1100-2200').split('-').map(Number)
if (words < lo) add('ERROR', `Too short: ${words} words (target ${lo}-${hi}).`)
else if (words > hi) add('WARN', `Long: ${words} words (target ${lo}-${hi}). Check the site's maximum.`)
if (fm.meta_description && fm.meta_description.length > 155) add('ERROR', `meta_description is ${fm.meta_description.length} chars (max 155).`)
if (fm.title && (fm.title.length < 25 || fm.title.length > 75)) add('WARN', `Title is ${fm.title.length} chars; 25-75 reads best.`)

// --- structure ----------------------------------------------------------------------------------
const h2 = (body.match(/^##\s+/gm) || []).length
if (h2 < 3) add('ERROR', `Only ${h2} H2 headings; use at least 3 to make it scannable.`)
const paras = body.split(/\n\s*\n/).map((p) => strip(p).trim()).filter(Boolean)
const longParas = paras.filter((p) => p.split(/\s+/).length > 130).length
if (longParas) add('WARN', `${longParas} paragraph(s) over 130 words; break them up.`)
const sentences = strip(body).split(/(?<=[.!?])\s+/).filter((s) => s.split(/\s+/).length > 3)
const avg = sentences.reduce((n, s) => n + s.split(/\s+/).length, 0) / Math.max(1, sentences.length)
if (avg > 24) add('WARN', `Average sentence length ${avg.toFixed(1)} words; aim for under 22.`)

// --- links --------------------------------------------------------------------------------------
const linkRe = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
const grab = (s) => [...s.matchAll(linkRe)].map((x) => ({ anchor: x[1], url: x[2] }))
const isOurs = (u) => /^https?:\/\/(www\.)?oryantechsol\.com/i.test(u)
const bodyLinks = grab(body)
const ours = bodyLinks.filter((l) => isOurs(l.url))
const external = bodyLinks.filter((l) => !isOurs(l.url))
if (ours.length === 0) add('WARN', 'No contextual link to oryantechsol.com in the body (fine only if the site forbids it).')
if (ours.length > 1) add('ERROR', `${ours.length} links to oryantechsol.com in the body; the limit is 1 (the bio link is separate).`)
if (ours[0] && fm.link_url && ours[0].url.replace(/\/$/, '') !== fm.link_url.replace(/\/$/, '')) add('ERROR', `Body link ${ours[0].url} does not match front-matter link_url ${fm.link_url}.`)
if (ours[0] && fm.link_anchor && ours[0].anchor.toLowerCase() !== fm.link_anchor.toLowerCase()) add('WARN', `Body anchor "${ours[0].anchor}" differs from front-matter link_anchor "${fm.link_anchor}".`)
const bioOurs = grab(bio).filter((l) => isOurs(l.url))
if (bioOurs.length !== 1) add('ERROR', `The bio must contain exactly 1 link to oryantechsol.com (found ${bioOurs.length}).`)
if (external.length < 2) add('WARN', `Only ${external.length} external source link(s); cite at least 2 credible sources where claims need them.`)
const moneyAnchor = /\b(best|top|cheap|affordable|hire|buy)\b.*\b(company|companies|agency|developers?|services?|software)\b|\b(software|app|web) development (company|services)\b/i
for (const l of [...ours, ...bioOurs]) if (moneyAnchor.test(l.anchor)) add('ERROR', `Anchor "${l.anchor}" looks like an exact-match commercial keyword. Use the brand or a descriptive title.`)
if ([...body.matchAll(/https?:\/\/(www\.)?oryantechsol\.com\S*/gi)].length > ours.length) add('WARN', 'A bare oryantechsol.com URL appears in the body outside the one contextual link.')

// our own page must be real and already published
try {
  const index = JSON.parse(fs.readFileSync(path.join(root, 'src/data/posts-index.json'), 'utf8'))
  const today = new Date().toISOString().slice(0, 10)
  for (const l of [...ours, ...bioOurs]) {
    const slug = l.url.match(/\/blog\/([a-z0-9-]+)/i)?.[1]
    if (!slug) continue
    const post = index.find((p) => p.slug === slug)
    if (!post) add('ERROR', `Links to /blog/${slug}, which is not in the article index.`)
    else if (post.date > today) add('ERROR', `Links to /blog/${slug}, which is scheduled for ${post.date} and is not live yet.`)
  }
} catch {
  add('WARN', 'Could not read src/data/posts-index.json to verify our article link.')
}

// --- accuracy -----------------------------------------------------------------------------------
// Count placeholders in the article itself, not in the checklist, which only quotes them.
const placeholders = [...raw.split(/^##\s+Pre-send checklist/im)[0].matchAll(/\[(ADD|TODO|FILL|XX)[^\]]*\]/gi)]
if (placeholders.length) add('TODO', `${placeholders.length} placeholder(s) need a real fact from Waqas: ${[...new Set(placeholders.map((p) => p[0]))].slice(0, 4).join(', ')}`)
const claimRe = /(\d[\d,.]*\s?%|\$\s?\d[\d,.]*|\b\d+(\.\d+)?\s?(x|times)\b|\b(19|20)\d\d\b.*\b(study|survey|report)\b)/i
let unsourced = 0
for (const p of body.split(/\n\s*\n/)) {
  if (claimRe.test(p) && !/\]\(https?:/.test(p) && !/(illustrative|for illustration|for example|example:|typical|assume|hypothetical)/i.test(p)) unsourced++
}
if (unsourced) add('WARN', `${unsourced} paragraph(s) state a figure with no source link and no "illustrative/for example" label. Source it, label it, or remove it.`)

const slop = [
  "in today's fast-paced", 'in the ever-evolving', 'game-changer', 'game changer', 'unlock the power', 'unlock the potential',
  'seamless', 'delve', 'tapestry', 'landscape of', 'it is important to note', "it's important to note", 'navigate the complexities',
  'cutting-edge', 'revolutionize', 'take your business to the next level', 'in conclusion,', 'leverage', 'synergy', 'holistic approach',
  'robust solution', 'harness the power', 'at the end of the day', 'look no further',
]
const lower = body.toLowerCase()
const hits = slop.filter((p) => lower.includes(p))
if (hits.length) add(hits.length > 2 ? 'ERROR' : 'WARN', `Filler/AI-sounding phrases: ${hits.join(', ')}. Rewrite them in plain, specific language.`)
if (/\b(contact us|call us|get a free quote|book a (free )?consultation|our (team|company) (offers|provides))\b/i.test(body)) add('ERROR', 'Promotional language in the body (contact us / free quote / our team offers...). Keep sales copy out of the article.')
if (/\b(seo|backlink|link building|link-building)\b/i.test(raw.replace(/^---[\s\S]*?---/, '')) && !/seo/i.test(fm.target || '')) add('WARN', 'The text mentions SEO/backlinks. Fine only if the topic is SEO itself.')

// --- live link check ----------------------------------------------------------------------------
if (!offline) {
  const urls = [...new Set([...grab(body), ...grab(bio)].map((l) => l.url))]
  await Promise.all(
    urls.map(async (u) => {
      try {
        let res = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0 guest-post-lint' } })
        if (res.status === 405 || res.status === 403) res = await fetch(u, { redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0 guest-post-lint' } })
        if (res.status >= 400) add(isOurs(u) ? 'ERROR' : 'WARN', `Link returns HTTP ${res.status}: ${u}`)
      } catch (e) {
        add('WARN', `Could not check link (${e.name}): ${u}`)
      }
    }),
  )
}

// --- report -------------------------------------------------------------------------------------
const order = { ERROR: 0, WARN: 1, TODO: 2 }
issues.sort((a, b) => order[a.level] - order[b.level])
console.log(`\n${path.basename(path.dirname(file))}/${path.basename(file)}  |  ${words} words, ${h2} H2, ${ours.length} body link(s) to us, ${external.length} external`)
if (!issues.length) console.log('PASS: no issues found.')
for (const i of issues) console.log(`  ${i.level.padEnd(5)} ${i.msg}`)
const errors = issues.filter((i) => i.level === 'ERROR').length
console.log(`\nResult: ${errors ? 'FAIL' : 'PASS'} (${errors} error, ${issues.filter((i) => i.level === 'WARN').length} warn, ${issues.filter((i) => i.level === 'TODO').length} to-do)`)
process.exit(errors ? 1 : 0)
