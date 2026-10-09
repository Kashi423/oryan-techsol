// The light half of the blog data: helpers that need no article text. The browser's main bundle uses
// this plus the generated posts-index.json (title, description, date, cover… of every article), while
// the full article bodies (./posts.js) load only on /blog/<slug>. Node scripts may import either.

import { countWords, readMinutes } from '../lib/article.js'
import covers from './posts/covers.js'

// A post's cover: the self-hosted stock photo from covers.js, or — for articles created in the admin —
// the image chosen there.
const enrich = (post) => ({
  ...post,
  cover: covers[post.slug] ? { ...covers[post.slug], alt: `Cover image for ${post.shortTitle ?? post.title}` } : (post.image ? { src: post.image, alt: post.title, width: 1200, height: 675 } : null),
  wordCount: countWords(post),
  readMinutes: readMinutes(post),
})

export const enrichPosts = (list) => list.map(enrich)

// Scheduled publishing: an article's `date` is its publish day (UTC). Until that day it is
// hidden everywhere — blog index, its own URL, sitemap, feed. A daily GitHub Actions run rebuilds
// the site just after midnight UTC (see .github/workflows/deploy.yml) so the prerendered HTML and
// sitemap pick up the day's new article; browsers also re-check the date themselves.
// SITE_TODAY lets a Node script preview a future date (e.g. to test scheduled posts).
export const todayUtc = () =>
  (typeof process !== 'undefined' && process.env?.SITE_TODAY) || new Date().toISOString().slice(0, 10)
export const isPublished = (post, today = todayUtc()) => post.date <= today
export const publishedOnly = (list, today = todayUtc()) => list.filter((post) => isPublished(post, today))

export const getPostBySlug = (slug, list) => list.find((post) => post.slug === slug)

export const getRelatedPosts = (post, list) =>
  (post.related ?? []).map((slug) => getPostBySlug(slug, list)).filter(Boolean)

// What the list pages need from an article — everything except the body (intro, takeaways, blocks, faqs).
export const lightPost = ({ intro, takeaways, blocks, faqs, ...rest }) => rest
