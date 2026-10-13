import { exec } from 'node:child_process'
import { openDb } from './db.js'
import { createApp } from './server.js'

const demo = process.env.OUTREACH_DEMO === '1'
const port = Number(process.env.PORT ?? (demo ? 4478 : 4477))
const url = `http://localhost:${port}`
// Demo uses a throwaway in-memory database, so it never mixes with real leads.
createApp(openDb(demo ? ':memory:' : undefined), { demo })
  .once('error', (e) => {
    if (e.code === 'EADDRINUSE') { console.log(`\n  Already running. Open ${url}\n`); exec(`start "" ${url}`) } else throw e
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`\n  Oryan outreach agent ${demo ? '(DEMO: nothing is really sent) ' : ''}is running.\n  Open  ${url}\n  Leave this window open. Close it to stop.\n`)
    if (process.platform === 'win32') exec(`start "" ${url}`)
  })
