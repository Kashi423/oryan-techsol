// Headless daily cycle. Run by Windows Task Scheduler (see install-daily-task.bat); no window needed.
// It never finds or approves anything new on its own: first emails still wait for you to approve them.
import { appendFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { config, ROOT } from './config.js'
import { openDb } from './db.js'
import { checkReplies } from './inbox.js'
import { labelPending, notifyHot } from './replies.js'
import { queueFollowUps } from './pipeline.js'
import { sendApproved, makeTransport, effectiveCap, sentToday } from './sender.js'
import { activeSenders } from './senders.js'

export async function dailyCycle(db, { log = console.log, transport, readInbox = checkReplies } = {}) {
  const out = { replies: null, followUps: 0, sent: 0 }
  const boxes = activeSenders()
  if (!boxes.length && !transport) {
    log('No sending mailbox is set up yet. Open the app and add one in Setup.')
    return out
  }
  // Every mailbox's inbox is read, so a reply to any of them stops that lead's follow-ups.
  try { out.replies = await readInbox(db, { log }) } catch (e) { log(`Inbox check failed: ${e.message}`) }
  try {
    await labelPending(db, { log })
    await notifyHot(db, { transport: transport ?? makeTransport(boxes[0]), from: boxes[0]?.email, log })
  } catch (e) { log(`Reply handling failed: ${e.message}`) }
  try { out.followUps = (await queueFollowUps(db, { log })).queued } catch (e) { log(`Follow-ups failed: ${e.message}`) }
  log(`Sending: ${sentToday(db)}/${config.totalDailyCap} used today across ${boxes.length || 1} mailbox(es)`)
  for (const s of boxes) log(`  ${s.email}: ${sentToday(db, s.email)}/${effectiveCap(db, s).cap}`)
  out.sent = await sendApproved(db, { live: true, log, transport })
  return out
}

if (process.argv[1] && /daily\.js$/.test(process.argv[1])) {
  mkdirSync(path.join(ROOT, 'data'), { recursive: true })
  const file = path.join(ROOT, 'data', 'daily.log')
  const log = (m) => { const line = `${new Date().toISOString()}  ${m}`; console.log(line); appendFileSync(file, line + '\n') }
  dailyCycle(openDb(), { log })
    .then((r) => { log(`Cycle finished: ${r.sent} sent, ${r.followUps} follow-ups queued`); process.exit(0) })
    .catch((e) => { log(`Cycle failed: ${e.message}`); process.exit(1) })
}
