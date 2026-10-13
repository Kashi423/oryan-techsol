// The mailboxes emails are sent from (up to 10, e.g. the 10 licences of a Workspace trial).
// Stored on this computer only (data/senders.json, gitignored). With none added, the single
// GMAIL_USER / GMAIL_APP_PASSWORD from .env is used as the one sender, exactly as before.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { config } from './config.js'

export const MAX_SENDERS = 10
const file = () => path.join(path.dirname(config.dbPath), 'senders.json')
let memory = null // demo/test override

const read = () => {
  if (memory) return memory
  try { return JSON.parse(readFileSync(file(), 'utf8')).senders ?? [] } catch { return [] }
}
const write = (list) => {
  if (memory) { memory = list; return }
  mkdirSync(path.dirname(file()), { recursive: true })
  writeFileSync(file(), JSON.stringify({ senders: list }, null, 2))
}

export function useMemorySenders(list = []) { memory = list.map((s) => ({ ...s })) }

/** Every configured sender. Falls back to the single mailbox from .env when none are added. */
export function allSenders() {
  const list = read()
  if (list.length) return list
  return [{ id: 'main', email: config.gmailUser, password: config.gmailAppPassword, name: config.fromName, signOff: config.signOffName, cap: null, paused: false, legacy: true }]
}

/** Senders that can actually send right now. */
export function activeSenders() {
  return allSenders().filter((s) => !s.paused && s.email && s.password)
}

export const findSender = (email) => allSenders().find((s) => s.email.toLowerCase() === String(email ?? '').toLowerCase()) ?? null

/** Safe to show on screen: never includes the password. */
export const publicSender = ({ password, ...rest }) => ({ ...rest, hasPassword: !!password })

export function addSender({ email, password, name, signOff, cap }) {
  const e = String(email ?? '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new Error('Enter a valid email address')
  const pw = String(password ?? '').replace(/\s+/g, '')
  if (pw.length !== 16) throw new Error('The App Password is 16 letters (Google shows it in 4 groups of 4)')
  const list = read()
  if (list.length >= MAX_SENDERS) throw new Error(`You can add up to ${MAX_SENDERS} mailboxes`)
  if (list.some((s) => s.email === e)) throw new Error('That mailbox is already added')
  const first = String(name ?? '').trim() || e.split('@')[0]
  const n = cap === '' || cap === undefined || cap === null ? null : Number(cap)
  if (n !== null && (!Number.isInteger(n) || n < 1 || n > 100)) throw new Error('Daily limit must be a whole number from 1 to 100')
  const sender = {
    id: `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
    email: e, password: pw,
    name: `${first} at Oryan Techsol`,
    signOff: String(signOff ?? '').trim() || first,
    cap: n, paused: false,
  }
  write([...list, sender])
  return publicSender(sender)
}

export function removeSender(id) {
  const list = read()
  if (!list.some((s) => s.id === id)) throw new Error('Mailbox not found')
  write(list.filter((s) => s.id !== id))
}

export function setPaused(id, paused) {
  const list = read()
  const s = list.find((x) => x.id === id)
  if (!s) throw new Error('Mailbox not found')
  s.paused = !!paused
  write(list)
}
