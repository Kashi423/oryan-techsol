// Reply handling: store inbound replies, label them, suggest a response (you approve it), alert on hot leads.
import { config } from './config.js'
import { aiProvider, getClient, withFooter } from './write.js'
import { isSuppressed } from './db.js'
import { renderEmailHtml } from './html.js'
import { allSenders, findSender } from './senders.js'
import { makeTransport } from './sender.js'

export const LABELS = ['interested', 'question', 'not_interested', 'out_of_office', 'other']

export function recordReply(db, leadId, parsed, kind) {
  const body = String(parsed.text ?? '').split(/\n>|\nOn .* wrote:|\n-{2,}\s*Original/i)[0].trim().slice(0, 4000)
  const optout = kind === 'optout'
  return db.prepare(
    'INSERT INTO replies (lead_id, from_email, subject, body, message_id, label, status) VALUES (?,?,?,?,?,?,?)',
  ).run(
    leadId, parsed.from?.value?.[0]?.address ?? '', String(parsed.subject ?? '').slice(0, 300), body,
    parsed.messageId ?? null, optout ? 'not_interested' : '', optout ? 'handled' : 'new',
  ).lastInsertRowid
}

const sign = () => config.signOffName || config.fromName

export function heuristicLabel(text) {
  const t = String(text)
  let label = 'other'
  if (/out of (the )?office|auto.?reply|automatic reply|on vacation|away from (my )?(desk|office)/i.test(t)) label = 'out_of_office'
  else if (/\b(no thanks|no thank you|not interested|unsubscribe|remove me|stop (emailing|contacting)|don'?t (email|contact))\b/i.test(t)) label = 'not_interested'
  else if (/\b(interested|sounds (good|great|interesting)|let'?s (talk|chat|speak|schedule)|call me|give me a call|send (me )?(more|details|info|a quote)|how much|pricing|price|quote|cost|meeting|available)\b/i.test(t)) label = 'interested'
  else if (t.includes('?')) label = 'question'
  const suggested = {
    interested: `Thanks for getting back to me! I'd be glad to chat. Would a 15-minute call tomorrow or the day after work? Tell me what time suits you and I'll confirm.\n\n${sign()}`,
    question: `Thanks for your reply, happy to help. [Add your answer here]\n\nWould a short call be easier to go through it? Let me know a time that suits you.\n\n${sign()}`,
    other: `Thanks for getting back to me! Is there anything specific I can help you with or answer?\n\n${sign()}`,
    not_interested: '',
    out_of_office: '',
  }[label]
  return { label, summary: '', suggested }
}

const TRIAGE_SYSTEM = () => `You triage replies to a cold outreach email sent by Oryan Techsol (custom websites, apps, AI chatbots, automation for local businesses).
Return ONLY JSON: {"label": one of ["interested","question","not_interested","out_of_office","other"], "summary": "max 15 words", "suggested_reply": "plain text, max 70 words, friendly, signed '${sign()}'; empty string for not_interested or out_of_office"}
Rules: never promise prices, dates or deliverables you were not given; if the sender asks something you cannot know, leave a [bracketed placeholder] for the owner to fill in; no hype.`

export async function triage(reply, { original, client } = {}) {
  if (!client && !aiProvider()) return heuristicLabel(reply.body)
  try {
    const c = client ?? getClient()
    const res = await c.messages.create({
      model: config.model, max_tokens: 700, system: TRIAGE_SYSTEM(),
      messages: [{ role: 'user', content: `Our email:\nSubject: ${original?.subject ?? ''}\n${original?.body ?? ''}\n\nTheir reply:\n${reply.body}` }],
    })
    const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('')
    const j = JSON.parse(text.match(/\{[\s\S]*\}/)[0])
    if (!LABELS.includes(j.label)) throw new Error('bad label')
    return { label: j.label, summary: String(j.summary ?? '').slice(0, 200), suggested: String(j.suggested_reply ?? '').slice(0, 1500) }
  } catch {
    return heuristicLabel(reply.body) // AI unavailable or malformed: fall back to the rules
  }
}

export async function labelPending(db, { client, log = () => {} } = {}) {
  const rows = db.prepare("SELECT * FROM replies WHERE label='' AND status='new'").all()
  for (const r of rows) {
    const original = db.prepare("SELECT subject, body FROM messages WHERE lead_id=? AND status='sent' ORDER BY step DESC LIMIT 1").get(r.lead_id)
    const t = await triage(r, { original, client })
    db.prepare('UPDATE replies SET label=?, summary=?, suggested=? WHERE id=?').run(t.label, t.summary, t.suggested, r.id)
    if (t.label === 'not_interested') {
      db.prepare("UPDATE replies SET status='handled' WHERE id=?").run(r.id)
    }
    log(`Reply from ${r.from_email}: ${t.label}`)
  }
  return rows.length
}

/** Emails the owner about newly arrived "interested" replies, once each. */
export async function notifyHot(db, { transport, from, log = () => {} } = {}) {
  const fromAddr = from || allSenders()[0]?.email || config.gmailUser
  const to = config.replyTo || fromAddr
  if (!transport || !to) return 0
  const rows = db.prepare(
    "SELECT r.*, l.name FROM replies r JOIN leads l ON l.id=r.lead_id WHERE r.label='interested' AND r.notified=0",
  ).all()
  for (const r of rows) {
    await transport.sendMail({
      from: `"${config.fromName}" <${fromAddr}>`, to,
      subject: `Hot lead: ${r.name} replied`,
      text: `${r.name} (${r.from_email}) replied:\n\n${r.body}\n\n---\nSuggested response (open the app > Replies to send it):\n${r.suggested}`,
    })
    db.prepare('UPDATE replies SET notified=1 WHERE id=?').run(r.id)
    log(`Alert sent: ${r.name} is interested`)
  }
  return rows.length
}

/** Sends your (edited) response to a reply, threaded. Only after you click send. */
export async function sendReply(db, id, { body, transport }) {
  const r = db.prepare('SELECT r.*, l.email AS lead_email, l.sender AS lead_sender FROM replies r JOIN leads l ON l.id=r.lead_id WHERE r.id=?').get(id)
  if (!r) throw new Error('Reply not found')
  const to = r.from_email || r.lead_email
  if (isSuppressed(db, to)) throw new Error('This address opted out. Not sending.')
  const text = String(body ?? '').trim()
  if (!text) throw new Error('Write a response first')
  const headers = {}
  if (r.message_id) { headers['In-Reply-To'] = r.message_id; headers.References = r.message_id }
  // Answer from the same mailbox the conversation is in, so the thread and the persona stay consistent.
  const sender = findSender(r.lead_sender) ?? allSenders()[0] ?? { email: config.gmailUser, name: config.fromName, signOff: config.signOffName }
  await (transport ?? makeTransport(sender)).sendMail({
    from: `"${sender.name || config.fromName}" <${sender.email}>`, to,
    subject: /^re:/i.test(r.subject || '') ? r.subject : `Re: ${r.subject || ''}`.trim(),
    text: withFooter(text),
    ...(config.emailStyle === 'plain' ? {} : { html: renderEmailHtml({ subject: r.subject || '', body: text, replyTo: sender.email, signOff: sender.signOff }) }),
    headers,
  })
  db.prepare("UPDATE replies SET status='answered', answered_at=CURRENT_TIMESTAMP WHERE id=?").run(id)
  return { ok: true }
}
