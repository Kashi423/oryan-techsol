// Shared steps used by both the CLI and the local web app.
import { searchPlaces } from './places.js'
import { enrichSite } from './enrich.js'
import { draftEmail } from './write.js'
import { domainOf } from './db.js'
import { dueFollowUps } from './sender.js'

/** `search` is ({query, area, max, fetchImpl}) => places[]. Defaults to Google Places (needs a key). */
export async function findLeads(db, { query, area, max = 40, fetchImpl, search }) {
  const places = search
    ? await search({ query, area, max, fetchImpl })
    : await searchPlaces(`${query} in ${area}`, max, fetchImpl)
  const ins = db.prepare('INSERT OR IGNORE INTO leads (place_id,name,address,phone,website,email,domain,category,rating,area) VALUES (?,?,?,?,?,?,?,?,?,?)')
  let added = 0
  for (const p of places) {
    const email = p.email || null
    added += Number(ins.run(p.place_id, p.name, p.address, p.phone, p.website, email, email ? domainOf(email) : null, p.category, p.rating, area).changes)
  }
  return { found: places.length, added, noWebsite: places.filter((p) => !p.website).length }
}

export async function enrichLeads(db, { limit = Infinity, log = () => {}, fetchImpl } = {}) {
  const rows = db.prepare("SELECT * FROM leads WHERE status='found'").all().slice(0, limit)
  let ready = 0
  for (const l of rows) {
    // A listing may already carry its own public email (e.g. from the map data).
    const r = l.website ? await enrichSite(l.website, fetchImpl) : { email: null, observations: [], summary: '' }
    const email = r.email || l.email || null
    const dup = email && db.prepare('SELECT 1 FROM leads WHERE domain=? AND id<>? AND status<>\'found\'').get(domainOf(email), l.id)
    const status = email && !dup ? 'ready' : 'no_email'
    db.prepare('UPDATE leads SET email=?, domain=?, observations=?, site_summary=?, status=? WHERE id=?')
      .run(email, email ? domainOf(email) : null, JSON.stringify(r.observations), r.summary, status, l.id)
    if (status === 'ready') ready++
    log(`${status === 'ready' ? 'Found email' : 'No email'}: ${l.name}${email ? ' (' + email + ')' : ''}`)
  }
  return { checked: rows.length, ready }
}

export async function draftLeads(db, { limit = Infinity, log = () => {}, client } = {}) {
  const rows = db.prepare("SELECT * FROM leads WHERE status='ready'").all().slice(0, limit)
  let drafted = 0
  for (const l of rows) {
    try {
      const d = await draftEmail(l, { client })
      db.prepare('INSERT INTO messages (lead_id, step, subject, body) VALUES (?,0,?,?)').run(l.id, d.subject, d.body)
      db.prepare("UPDATE leads SET status='drafted' WHERE id=?").run(l.id)
      drafted++
      log(`Drafted email for ${l.name}`)
    } catch (e) {
      log(`Could not draft for ${l.name}: ${e.message}`)
    }
  }
  return { drafted }
}

/** Follow-ups to a lead whose first email you approved are auto-approved. */
export async function queueFollowUps(db, { log = () => {}, client } = {}) {
  let queued = 0
  for (const { lead, previous, step } of dueFollowUps(db)) {
    try {
      const d = await draftEmail(lead, { step, previous, client })
      db.prepare("INSERT INTO messages (lead_id, step, subject, body, status) VALUES (?,?,?,?, 'approved')").run(lead.id, step, d.subject, d.body)
      queued++
      log(`Follow-up ${step} queued for ${lead.name}`)
    } catch (e) {
      log(`Follow-up failed for ${lead.name}: ${e.message}`)
    }
  }
  return { queued }
}

/** ids: array of message ids, or 'all' for every first-email draft. */
export function setDraftStatus(db, ids, to) {
  const list = ids === 'all' ? db.prepare("SELECT id FROM messages WHERE status='draft' AND step=0").all().map((r) => r.id) : ids.map(Number)
  let n = 0
  for (const id of list) {
    const m = db.prepare("SELECT * FROM messages WHERE id=? AND status='draft'").get(id)
    if (!m) continue
    db.prepare('UPDATE messages SET status=? WHERE id=?').run(to, id)
    db.prepare('UPDATE leads SET status=? WHERE id=?').run(to === 'approved' ? 'approved' : 'skipped', m.lead_id)
    n++
  }
  return n
}
