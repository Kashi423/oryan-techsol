// Demo mode: fake businesses, fake websites, fake drafts and a fake mail server,
// so the whole app can be clicked through with no keys and without sending anything.
import { optOut } from './sender.js'
import { recordReply } from './replies.js'

const NAMES = ['Bright', 'Lakeside', 'Downtown', 'Premier', 'Sunrise', 'Heritage', 'Summit', 'Maple']
const cap = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase())
const slugOf = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

export function demoKit() {
  const sentLog = []

  const placesFetch = async (_url, opts) => {
    const q = JSON.parse(opts.body).textQuery
    const [kind, area = 'Your City'] = q.split(' in ')
    const places = NAMES.map((n, i) => {
      const name = `${n} ${cap(kind)}`
      return {
        id: `demo-${slugOf(kind)}-${slugOf(area)}-${i}`,
        displayName: { text: name },
        formattedAddress: `${100 + i * 7} Main St, ${area}`,
        // #6 has no website so you can see it being skipped
        websiteUri: i === 5 ? undefined : `https://${slugOf(name)}.demo.test`,
        nationalPhoneNumber: `(555) 010-0${i}0${i}`,
        rating: 4 + (i % 10) / 10,
        primaryTypeDisplayName: { text: cap(kind) },
        businessStatus: 'OPERATIONAL',
      }
    })
    return { ok: true, json: async () => ({ places }) }
  }

  const siteFetch = async (url) => {
    const host = new URL(url).hostname
    const h = [...host].reduce((a, c) => a + c.charCodeAt(0), 0)
    const name = host.replace('.demo.test', '')
    const parts = ['<html><head><title>' + name + '</title>']
    if (h % 3 !== 0) parts.push('<meta name="viewport" content="width=device-width">')
    parts.push('</head><body>')
    parts.push(h % 2 === 0 ? 'Copyright 2017 ' + name : '(c) ' + new Date().getFullYear())
    if (h % 4 !== 1) parts.push(`<p>Contact: <a href="mailto:info@${host}">info@${host}</a></p>`) // some have no public email
    parts.push('</body></html>')
    return { ok: true, url, headers: { get: () => 'text/html' }, text: async () => parts.join('') }
  }

  const client = {
    messages: {
      create: async ({ messages }) => {
        const c = messages[0].content
        const name = c.match(/Business: (.+)/)?.[1] ?? 'your business'
        const obs = c.match(/Observations about their site:\n- (.+)/)?.[1]
        const follow = c.match(/follow-up #(\d)/)?.[1]
        if (follow) {
          return { content: [{ type: 'text', text: JSON.stringify({ subject: `Re: quick idea for ${name}`, body: `Hi,\n\nJust bumping my note from earlier in case it got buried. Happy to share a quick example for ${name} if useful.\n\nRai` }) }] }
        }
        const body = `Hi,\n\nI came across ${name} while looking at local businesses.${obs ? ' ' + obs.replace(/\.$/, '') + ', which is a fairly quick fix.' : ''}\n\nWe build simple websites and booking tools for local businesses. Would a short 15-minute call this week be worth your time?\n\nRai`
        return { content: [{ type: 'text', text: JSON.stringify({ subject: `A quick idea for ${name}`, body }) }] }
      },
    },
  }

  const transport = {
    sendMail: async (m) => {
      sentLog.push(m)
      return { messageId: `<demo-${sentLog.length}@oryan.demo>` }
    },
  }

  // Pretend the mailbox received a reply from one lead and an opt-out from another.
  const checkReplies = async (db, { log = () => {} } = {}) => {
    const sent = db.prepare("SELECT * FROM leads WHERE status='sent' ORDER BY id").all()
    const counts = { reply: 0, optout: 0, bounce: 0, ignored: 0 }
    if (sent[0]) {
      db.prepare("UPDATE leads SET status='replied' WHERE id=?").run(sent[0].id)
      db.prepare("UPDATE messages SET status='rejected' WHERE status IN ('draft','approved') AND lead_id=?").run(sent[0].id)
      recordReply(db, sent[0].id, { from: { value: [{ address: sent[0].email }] }, subject: 'Re: A quick idea', text: 'Hi, this sounds interesting. How much would a booking page cost and could we talk on Tuesday?', messageId: '<demo-reply-1@oryan.demo>' }, 'reply')
      counts.reply++; log(`(demo) reply received from ${sent[0].email}: "Sounds interesting, call me Tuesday"`)
    }
    if (sent[1]) {
      recordReply(db, sent[1].id, { from: { value: [{ address: sent[1].email }] }, subject: 'Re: A quick idea', text: 'No thanks, please remove me from your list.', messageId: '<demo-reply-2@oryan.demo>' }, 'optout')
      optOut(db, sent[1].email, 'demo opt-out')
      counts.optout++; log(`(demo) ${sent[1].email} replied "no thanks": added to the do-not-contact list`)
    }
    if (!sent.length) log('(demo) no new replies')
    return counts
  }

  return { placesFetch, siteFetch, client, transport, checkReplies, sentLog }
}
