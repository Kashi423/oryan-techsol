// Post-build step: snapshots each public route's fully-rendered HTML into dist/<route>/index.html,
// using a real headless browser against the actual compiled bundle (not a Node SSR render) — so
// framer-motion, IntersectionObserver and other browser-only code used throughout the site work
// exactly as they do for a real visitor, with zero changes to any component.
//
// Why this exists: this is a client-rendered SPA (Vite + react-router), so the raw HTML response
// for every route is identical and empty until JS runs — verified by diffing curl output across
// routes. Google/Bing render JS during indexing, but non-JS crawlers and social-preview bots
// (Facebook, X, LinkedIn, Slack, WhatsApp) do not, so they only ever see the generic homepage
// meta tags. This script gives every route its own real, crawlable <title>/<meta>/<h1>/content/
// canonical/structured-data in the initial HTML, while the client bundle still hydrates over it
// normally for full interactivity.
//
// Apache serves a prerendered dist/<route>/index.html automatically via DirectoryIndex — no
// .htaccess change needed, since its rewrite rule already exempts real files/directories.

import { preview } from 'vite'
import puppeteer from 'puppeteer'
import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { posts } from '../src/data/posts.js'

const rootDir = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const distDir = path.join(rootDir, 'dist')

// Every public, indexable route. Placeholder case studies are intentionally excluded (see
// caseStudies.js / sitemap.xml) — only add a case-study path here once it ships for real.
const routes = [
  '/',
  '/app-development',
  '/ai-bots',
  '/web-development',
  '/custom-software',
  '/business-automation',
  '/ecommerce',
  '/saas-development',
  '/api-integrations',
  '/portfolio',
  '/portfolio/aurex7',
  '/about',
  '/faq',
  '/blog',
  ...posts.map((post) => `/blog/${post.slug}`),
  '/contact',
  '/privacy',
  '/terms',
]

// The homepage is rendered LAST: it overwrites dist/index.html, which vite preview serves as the
// SPA shell for every route. Rendering it first would make every later route start from the
// homepage's finished tags (duplicate og:*/robots/twitter:* in every page's head).
const renderOrder = [...routes.filter((route) => route !== '/'), '/']

async function main() {
  // The pristine build's own static <head> defaults (before any route overwrites dist/index.html)
  // — the ground truth for "this is the sitewide fallback value", used below to identify and
  // remove it when a page's real tag exists alongside it, without relying on DOM position (React
  // 19's head-tag hoisting doesn't consistently prepend or append its own tag relative to a
  // pre-existing native one — confirmed by inspecting real output: <title> order and <link>/<meta>
  // order disagreed on which element was "first").
  // Raw HTML entities (&amp; etc.) need decoding to compare against the browser's decoded
  // textContent/attribute values later — a naive string match against the raw "&amp;" silently
  // matched nothing and looked like the dedup logic was broken when it was really this.
  const decodeEntities = (text) =>
    text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")

  const pristineHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8')
  const defaultTitle = decodeEntities(pristineHtml.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '')
  const defaultDescription = decodeEntities(pristineHtml.match(/name="description"\s+content="([^"]*)"/)?.[1] ?? '')
  if (!defaultTitle || !defaultDescription) {
    throw new Error('Could not read default title/description from dist/index.html — check index.html structure')
  }

  const server = await preview({ root: rootDir, preview: { port: 4321, strictPort: false } })
  const base = server.resolvedUrls.local[0]
  // Puppeteer's page.content() snapshots the LIVE DOM, which includes <link rel="modulepreload">
  // hints that the browser/React resolve to absolute URLs against this local preview server's own
  // origin (e.g. http://localhost:4321/assets/...) — that origin has no meaning once this file
  // ships to production, so it's stripped below, turning those hrefs back into the same
  // root-relative form (/assets/...) the rest of the build already uses.
  const previewOrigin = new URL(base).origin

  // --no-sandbox is required in most CI containers (GitHub Actions' runner user can't use
  // Chrome's setuid sandbox) — harmless locally, necessary there.
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })

  for (const route of renderOrder) {
    // A fresh page per route rather than reusing one tab across all 16 — framer-motion's
    // continuous animations and scroll listeners accumulate across navigations in a single
    // long-lived tab and previously crashed Chrome mid-run ("Navigating frame was detached").
    const page = await browser.newPage()
    await page.goto(new URL(route, base).href, { waitUntil: 'networkidle0' })
    // Let Seo's cleanup effect and Reveal's entrance animations settle.
    await new Promise((resolve) => setTimeout(resolve, 600))

    // React 19 hoists <title>/<meta>/<link> into <head>, but during the commit that replaces the
    // static default it can leave both present in the same document.content() snapshot — observed
    // directly (0 elements carry the data-seo-default marker, yet 2 <title> tags exist). Remove
    // whichever element matches the known static default value, but only when a real, different
    // one also exists (on the homepage both are legitimately identical — leave that one alone).
    await page.evaluate(
      (defaultTitle, defaultDescription, routePath) => {
        const dedupeByDefaultValue = (nodes, getValue, defaultValue) => {
          if (nodes.length < 2) return
          const real = nodes.filter((node) => getValue(node) !== defaultValue)
          if (real.length === 0) {
            nodes.slice(1).forEach((node) => node.remove())
          } else {
            nodes.filter((node) => getValue(node) === defaultValue).forEach((node) => node.remove())
          }
        }
        const text = (node) => node.textContent
        const content = (node) => node.getAttribute('content')

        dedupeByDefaultValue([...document.querySelectorAll('title')], text, defaultTitle)
        dedupeByDefaultValue([...document.querySelectorAll('meta[name="description"]')], content, defaultDescription)
        dedupeByDefaultValue([...document.querySelectorAll('meta[property="og:title"]')], content, defaultTitle)
        dedupeByDefaultValue(
          [...document.querySelectorAll('meta[property="og:description"]')],
          content,
          defaultDescription,
        )
        dedupeByDefaultValue([...document.querySelectorAll('meta[name="twitter:title"]')], content, defaultTitle)
        dedupeByDefaultValue(
          [...document.querySelectorAll('meta[name="twitter:description"]')],
          content,
          defaultDescription,
        )

        // Canonical and og:url have no static default (confirmed: raw pre-JS HTML has neither) —
        // both copies are React-rendered with the production domain (siteConfig.url), which
        // differs from this local preview server's own host, so compare by pathname only, against
        // the route actually being prerendered, not against document.location.
        const dedupeByRoutePath = (nodes, getUrl) => {
          if (nodes.length < 2) return
          const matching = nodes.filter((node) => new URL(getUrl(node)).pathname === routePath)
          if (matching.length > 0) {
            nodes.filter((node) => !matching.includes(node)).forEach((node) => node.remove())
            matching.slice(1).forEach((node) => node.remove())
          } else {
            nodes.slice(1).forEach((node) => node.remove())
          }
        }

        dedupeByRoutePath([...document.querySelectorAll('link[rel="canonical"]')], (node) => node.href)
        dedupeByRoutePath([...document.querySelectorAll('meta[property="og:url"]')], content)
      },
      defaultTitle,
      defaultDescription,
      route,
    )

    const counts = await page.evaluate(() => {
      // Every one of these must appear exactly once in the final head.
      const selectors = {
        title: 'title',
        description: 'meta[name="description"]',
        canonical: 'link[rel="canonical"]',
        robots: 'meta[name="robots"]',
        ogUrl: 'meta[property="og:url"]',
        ogTitle: 'meta[property="og:title"]',
        ogType: 'meta[property="og:type"]',
        ogImage: 'meta[property="og:image"]',
        ogSiteName: 'meta[property="og:site_name"]',
        ogLocale: 'meta[property="og:locale"]',
        twitterCard: 'meta[name="twitter:card"]',
        twitterImage: 'meta[name="twitter:image"]',
      }
      return Object.fromEntries(Object.entries(selectors).map(([key, selector]) => [key, document.querySelectorAll(selector).length]))
    })
    // robots / og:image / twitter:image are only emitted by <Seo />, so they may legitimately be 0
    // on a page that opts out — but never more than 1.
    const bad = Object.entries(counts).filter(([key, n]) => n > 1 || (['title', 'canonical', 'ogUrl'].includes(key) && n !== 1))
    if (bad.length > 0) {
      throw new Error(`${route}: head tags duplicated or missing after dedup (${JSON.stringify(Object.fromEntries(bad))})`)
    }

    const html = (await page.content()).replaceAll(previewOrigin, '')
    const outPath =
      route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html')
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, html)
    console.log(`Prerendered ${route} -> ${path.relative(rootDir, outPath)}`)
    await page.close()
  }

  await browser.close()
  await server.close()
  await writeSitemap()
}

// Generated sitemap: every prerendered route, with a real <lastmod> for blog posts (their
// "updated" date). Written to dist/ for production and to public/ so the repo copy never
// drifts from what ships.
async function writeSitemap() {
  const origin = (process.env.VITE_SITE_URL || 'https://oryantechsol.com').replace(/\/$/, '')
  const covers = new Map(posts.filter((post) => post.cover?.src?.startsWith('/')).map((post) => [`/blog/${post.slug}`, `${origin}${post.cover.src}`]))
  // Image sitemap entries: the cover photo of each article, so Google Images can index it.
  const coverByRoute = new Map(
    posts.filter((post) => post.cover?.src?.startsWith('/')).map((post) => [`/blog/${post.slug}`, post.cover.src]),
  )
  const lastmod = new Map(posts.map((post) => [`/blog/${post.slug}`, post.updated ?? post.date]))
  const entries = routes.map((route) => {
    const loc = origin + (route === '/' ? '/' : route)
    const mod = lastmod.get(route)
    const modTag = mod ? `\n    <lastmod>${mod}</lastmod>` : ''
    const cover = coverByRoute.get(route)
    const imgTag = cover ? `\n    <image:image>\n      <image:loc>${origin}${cover}</image:loc>\n    </image:image>` : ''
    return `  <url>\n    <loc>${loc}</loc>${modTag}${imgTag}\n  </url>`
  })
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml)
  await fs.writeFile(path.join(rootDir, 'public', 'sitemap.xml'), xml)
  console.log(`Wrote sitemap.xml (${routes.length} URLs)`)
  await writeFeed(origin)
}

// RSS 2.0 feed of the latest published articles (scheduled ones appear on their day's rebuild).
async function writeFeed(origin) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const items = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30)
    .map((post) => {
      const link = `${origin}/blog/${post.slug}`
      const enclosure = post.cover?.src
        ? `
      <enclosure url="${origin}${post.cover.src}" type="image/${post.cover.src.endsWith('.webp') ? 'webp' : 'jpeg'}" length="0" />`
        : ''
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(post.date + 'T09:00:00Z').toUTCString()}</pubDate>
      <category>${esc(post.category)}</category>
      <description>${esc(post.description)}</description>${enclosure}
    </item>`
    })
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Oryan Techsol Blog</title>',
    `    <link>${origin}/blog</link>`,
    '    <description>Practical guides on apps, websites, custom software, AI bots and automation.</description>',
    '    <language>en-us</language>',
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
  await fs.writeFile(path.join(distDir, 'feed.xml'), xml)
  await fs.writeFile(path.join(rootDir, 'public', 'feed.xml'), xml)
  console.log(`Wrote feed.xml (${items.length} items)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
