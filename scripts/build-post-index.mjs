// Writes src/data/posts-index.json: every article (scheduled ones included — the browser filters by
// date) WITHOUT its body. The main bundle imports this small file for the blog index, cards and
// "related guides"; the full text (src/data/posts.js) is a separate chunk loaded on /blog/<slug> only.
// It also writes one body file per article to src/data/post-bodies/<slug>.json, which the browser loads
// on demand (a visitor reading one article downloads only that article's ~10 KiB of text).
// Runs as the first step of `npm run build`, after CI has refreshed src/data/cms-posts.js.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { allPosts } from '../src/data/posts.js'
import { lightPost } from '../src/data/posts-light.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const index = allPosts.map(lightPost)
await fs.writeFile(path.join(root, 'src/data/posts-index.json'), JSON.stringify(index))

const bodiesDir = path.join(root, 'src/data/post-bodies')
await fs.rm(bodiesDir, { recursive: true, force: true })
await fs.mkdir(bodiesDir, { recursive: true })
for (const { slug, intro, takeaways, blocks, faqs } of allPosts) {
  await fs.writeFile(path.join(bodiesDir, `${slug}.json`), JSON.stringify({ intro, takeaways, blocks, faqs }))
}
console.log(`Post index + bodies: ${index.length} articles (${(JSON.stringify(index).length / 1024).toFixed(0)} KiB)`)
