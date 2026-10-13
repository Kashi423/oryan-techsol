import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { config } from './config.js'

// Lead status: found -> (no_email | ready) -> drafted -> approved -> sent -> replied | unsubscribed | bounced | done
export function openDb(file = config.dbPath) {
  if (file !== ':memory:') mkdirSync(path.dirname(file), { recursive: true })
  const db = new DatabaseSync(file)
  db.exec('PRAGMA busy_timeout = 5000') // the app and the daily runner may touch the file at the same time
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
    CREATE TABLE IF NOT EXISTS replies (
      id INTEGER PRIMARY KEY,
      lead_id INTEGER NOT NULL REFERENCES leads(id),
      from_email TEXT, subject TEXT, body TEXT, message_id TEXT,
      label TEXT DEFAULT '',        -- interested | question | not_interested | out_of_office | other
      summary TEXT DEFAULT '',
      suggested TEXT DEFAULT '',    -- suggested reply, for you to approve
      status TEXT DEFAULT 'new',    -- new | handled | answered
      notified INTEGER DEFAULT 0,
      received_at TEXT DEFAULT CURRENT_TIMESTAMP,
      answered_at TEXT
    );
  `)
  // Columns added after the first release: add them to existing databases too.
  const ensure = (table, col, ddl) => {
    if (!db.prepare(`PRAGMA table_info(${table})`).all().some((c) => c.name === col)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${ddl}`)
  }
  ensure('leads', 'score', 'INTEGER DEFAULT 0')
  ensure('leads', 'audit', 'TEXT')        // JSON: checks + bullets
  ensure('leads', 'stage', "TEXT DEFAULT ''") // manual pipeline stage: meeting | won | lost
  ensure('leads', 'notes', "TEXT DEFAULT ''")
  ensure('messages', 'variant', "TEXT DEFAULT ''")
  ensure('messages', 'quality', 'TEXT') // JSON {score, issues}
  ensure('leads', 'sender', 'TEXT')   // mailbox this lead is emailed from, for the whole sequence
  ensure('messages', 'sender', 'TEXT') // mailbox that actually sent this message
  ensure('leads', 'offer', "TEXT DEFAULT ''") // recommended service to lead with
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
