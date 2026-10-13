import { exec } from 'node:child_process'
import { openDb } from './db.js'
import { createApp } from './server.js'

const port = Number(process.env.PORT ?? 4477)
const url = `http://localhost:${port}`
createApp(openDb())
  .once('error', (e) => {
    if (e.code === 'EADDRINUSE') { console.log(`\n  Already running. Open ${url}\n`); exec(`start "" ${url}`) } else throw e
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`\n  Oryan outreach agent is running.\n  Open  ${url}\n  Leave this window open. Close it to stop.\n`)
    if (process.platform === 'win32') exec(`start "" ${url}`)
  })
