// Posts today's new blog article(s) to the Oryan Techsol Facebook Page via the Graph API.
// Runs in the deploy workflow after the site is live (so the link preview can be scraped), and
// skips quietly when FACEBOOK_PAGE_TOKEN / FACEBOOK_PAGE_ID are not set.
//
// Env:
//   FACEBOOK_PAGE_ID, FACEBOOK_PAGE_TOKEN  required to post (a long-lived Page access token)
//   FACEBOOK_POST_SLUG                      post this article instead of today's (manual backfill)
//   FACEBOOK_DRY_RUN=1                      print the posts, send nothing
//   FACEBOOK_GRAPH_VERSION                  default v23.0
//
// Safe to run many times a day: an article whose link is already on the Page is skipped.

import { posts, todayUtc } from '../src/data/posts.js'

const pageId = process.env.FACEBOOK_PAGE_ID
const token = process.env.FACEBOOK_PAGE_TOKEN
const version = process.env.FACEBOOK_GRAPH_VERSION || 'v23.0'
const dryRun = process.env.FACEBOOK_DRY_RUN === '1'
const origin = 'https://oryantechsol.com'
const maxPerRun = 3

if (!dryRun && (!pageId || !token)) {
  console.log('Facebook: FACEBOOK_PAGE_ID / FACEBOOK_PAGE_TOKEN not set — skipping.')
  process.exit(0)
}

const only = process.env.FACEBOOK_POST_SLUG?.trim()
const today = todayUtc()
const due = (only ? posts.filter((post) => post.slug === only) : posts.filter((post) => post.date === today)).slice(0, maxPerRun)
if (due.length === 0) {
  console.log(only ? `Facebook: no published article with slug "${only}".` : `Facebook: no article is dated ${today} — nothing to post.`)
  process.exit(0)
}

const hashtag = (text) => '#' + text.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join('')
const messageFor = (post) =>
  [post.title, '', post.description, '', `${hashtag(post.category)} #OryanTechsol #BusinessTech`].join('\n')

const graph = async (path, { method = 'GET', params = {} } = {}) => {
  const url = new URL(`https://graph.facebook.com/${version}/${path}`)
  const body = new URLSearchParams({ ...params, access_token: token })
  const response = method === 'GET' ? await fetch(`${url}?${body}`) : await fetch(url, { method, body })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || data.error) {
    const error = data.error ?? { message: `HTTP ${response.status}` }
    throw new Error(`Graph API ${path}: ${error.message}${error.code ? ` (code ${error.code})` : ''}`)
  }
  return data
}

let alreadyPosted = new Set()
if (!dryRun) {
  const feed = await graph(`${pageId}/feed`, { params: { fields: 'link,message', limit: '100' } })
  alreadyPosted = new Set(
    (feed.data ?? []).flatMap((item) => [item.link, item.message].filter(Boolean)).join('\n').match(/https:\/\/oryantechsol\.com\/blog\/[a-z0-9-]+/g) ?? [],
  )
}

let failed = false
for (const post of due) {
  const link = `${origin}/blog/${post.slug}`
  if (alreadyPosted.has(link)) {
    console.log(`Facebook: ${post.slug} is already on the Page — skipping.`)
    continue
  }
  const message = messageFor(post)
  if (dryRun) {
    console.log(`--- would post ---\n${message}\n${link}\n`)
    continue
  }
  try {
    const result = await graph(`${pageId}/feed`, { method: 'POST', params: { message, link } })
    console.log(`Facebook: posted ${post.slug} (post id ${result.id})`)
  } catch (error) {
    failed = true
    console.error(`Facebook: could not post ${post.slug} — ${error.message}`)
  }
}
process.exit(failed ? 1 : 0)
