import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { config } from './config.js'

// Lead status: found -> (no_email | ready) -> drafted -> approved -> sent -> replied | unsubscribed | bounced | done
export function openDb(file = config.dbPath) {
  if (file !== ':memory:') mkdirSync(path.dirname(file), { recursive: true })
  const db = new DatabaseSync(file)
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY,
      place_id TEXT UNIQUE,
      name TEXT NOT NULL,
      address TEXT, phone TEXT, website TEXT, category TEXT, rating REAL, area TEXT,
      email TEXT, domain TEXT,
      observations TEXT,
      site_summary TEXT,
      status TEXT NOT NULL DEFAULT 'found',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      lead_id INTEGER NOT NULL REFERENCES leads(id),
      step INTEGER NOT NULL,
      subject TEXT, body TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      message_id TEXT,
      sent_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS suppression (
      value TEXT PRIMARY KEY,
      reason TEXT, added_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS seen (uid TEXT PRIMARY KEY);
  `)
  return db
}

export const domainOf = (email) => String(email).split('@')[1]?.toLowerCase() ?? ''

export function suppress(db, value, reason) {
  db.prepare('INSERT OR IGNORE INTO suppression (value, reason) VALUES (?, ?)').run(value.toLowerCase(), reason)
}

export function isSuppressed(db, email) {
  const e = email.toLowerCase()
  return !!db.prepare('SELECT 1 FROM suppression WHERE value IN (?, ?)').get(e, domainOf(e))
}
