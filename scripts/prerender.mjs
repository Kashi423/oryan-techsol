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
  '/contact',
  '/privacy',
  '/terms',
]

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

  const browser = await puppeteer.launch({ headless: true })

  for (const route of routes) {
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

        // Canonical has no static default (confirmed: raw pre-JS HTML has none at all) — both
        // copies are React-rendered with the production domain (siteConfig.url), which differs
        // from this local preview server's own host, so compare by pathname only, against the
        // route actually being prerendered, not against document.location.
        const canonicals = [...document.querySelectorAll('link[rel="canonical"]')]
        if (canonicals.length > 1) {
          const matching = canonicals.filter((node) => new URL(node.href).pathname === routePath)
          if (matching.length > 0) {
            canonicals.filter((node) => !matching.includes(node)).forEach((node) => node.remove())
            matching.slice(1).forEach((node) => node.remove())
          } else {
            canonicals.slice(1).forEach((node) => node.remove())
          }
        }
      },
      defaultTitle,
      defaultDescription,
      route,
    )

    const counts = await page.evaluate(() => ({
      title: document.querySelectorAll('title').length,
      canonical: document.querySelectorAll('link[rel="canonical"]').length,
    }))
    if (counts.title !== 1 || counts.canonical !== 1) {
      throw new Error(`${route}: head tags still duplicated after dedup (${JSON.stringify(counts)})`)
    }

    const html = await page.content()
    const outPath =
      route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html')
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, html)
    console.log(`Prerendered ${route} -> ${path.relative(rootDir, outPath)}`)
    await page.close()
  }

  await browser.close()
  await server.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
