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

export async function dailyCycle(db, { log = console.log, transport, readInbox = checkReplies } = {}) {
  const out = { replies: null, followUps: 0, sent: 0 }
  if (!config.gmailUser || !config.gmailAppPassword) {
    log('Gmail is not set up yet. Open the app and finish Setup.')
    return out
  }
  try { out.replies = await readInbox(db, { log }) } catch (e) { log(`Inbox check failed: ${e.message}`) }
  try {
    await labelPending(db, { log })
    await notifyHot(db, { transport: transport ?? makeTransport(), log })
  } catch (e) { log(`Reply handling failed: ${e.message}`) }
  try { out.followUps = (await queueFollowUps(db, { log })).queued } catch (e) { log(`Follow-ups failed: ${e.message}`) }
  const { cap } = effectiveCap(db)
  log(`Sending: ${sentToday(db)}/${cap} used today`)
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
