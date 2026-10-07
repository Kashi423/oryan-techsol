// Writes public/api/seed/content.json — the site's current code-defined content (blog articles,
// team, portfolio projects) in the shape the admin backend imports. Run `npm run seed` after
// changing any of those source files, then commit the JSON. The installer (api/install.php) and
// the admin's "Import starter content" button load it into the database once.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { staticPosts } from '../src/data/posts.js'
import { teamLead, teamMembers } from '../src/data/team.js'
import { caseStudies } from '../src/data/caseStudies.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'public/api/seed/content.json')

// Drop the computed fields (the site recomputes them); everything else is stored as written.
const posts = staticPosts.map((post) => {
  const { wordCount: _words, readMinutes: _minutes, ...rest } = post
  return rest
})
const seed = { posts, team: { lead: teamLead, members: teamMembers }, projects: caseStudies }

await fs.mkdir(path.dirname(out), { recursive: true })
await fs.writeFile(out, JSON.stringify(seed, null, 1))
console.log(`Wrote ${path.relative(root, out)}: ${posts.length} posts, ${teamMembers.length + 1} team, ${caseStudies.length} projects`)
