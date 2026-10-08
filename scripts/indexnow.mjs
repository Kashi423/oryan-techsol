// Tells Bing, Yandex and other IndexNow engines about fresh URLs right after a deploy, so the
// day's new article is crawled quickly. The key file lives at public/5e5fb10168cb1f7ffe2d2d4f9ad50606.txt (served at
// /5e5fb10168cb1f7ffe2d2d4f9ad50606.txt, which is how engines verify ownership). Soft-fails: never blocks a deploy.
import { posts } from '../src/data/posts.js'

const host = 'oryantechsol.com'
const key = '5e5fb10168cb1f7ffe2d2d4f9ad50606'
const origin = `https://${host}`
const today = process.env.SITE_TODAY || new Date().toISOString().slice(0, 10)
const since = new Date(new Date(today).getTime() - 2 * 86400000).toISOString().slice(0, 10)

const urls = [
  `${origin}/`,
  `${origin}/blog`,
  ...posts.filter((post) => post.date >= since || (post.updated ?? '') >= since).map((post) => `${origin}/blog/${post.slug}`),
]

try {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation: `${origin}/${key}.txt`, urlList: [...new Set(urls)] }),
  })
  console.log(`IndexNow: submitted ${new Set(urls).size} URLs -> HTTP ${response.status}`)
} catch (error) {
  console.log('IndexNow skipped:', error.message)
}
