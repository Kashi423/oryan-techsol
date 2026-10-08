// Cover photos for blog articles, from Pixabay (free for commercial use, no attribution needed —
// https://pixabay.com/service/license-summary/). Two stages so every photo is looked at by a
// human (or by Claude) before it ships:
//
//   node scripts/fetch-covers.mjs candidates <out.json>     search Pixabay for every topic in `topics`
//   node scripts/fetch-covers.mjs sheets <candidates.json> <outDir>   contact sheets to review
//   node scripts/fetch-covers.mjs download <candidates.json> <picks.json>
//        picks.json = { "<slug>": <candidate index> }; downloads, crops to 16:9, writes
//        public/blog/covers/<slug>.webp and src/data/posts/covers.js
//
// Files are self-hosted (fast, no third-party requests for visitors).

import puppeteer from 'puppeteer'
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const run = promisify(execFile)
// Pixabay serves browsers and curl but rejects Node's own fetch (TLS fingerprint), so shell out to curl.
const curl = async (url, extra = []) =>
  (await run('curl', ['-sL', '--max-time', '45', '-A', UA, ...extra, url], { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 })).stdout

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// slug -> Pixabay search words (what a photo of this article's subject would be tagged with).
export const topics = {
  'how-much-does-a-mobile-app-cost': 'smartphone app',
  'react-native-vs-flutter-vs-native': 'smartphone coding',
  'how-to-choose-a-software-development-company': 'business handshake',
  'ai-agents-for-business-explained': 'artificial intelligence robot',
  'ai-chatbot-vs-live-chat-for-small-business': 'chatbot',
  'custom-software-vs-off-the-shelf': 'software developer computer',
  'what-is-api-integration': 'network connection technology',
  'business-process-automation-where-to-start': 'business automation',
  'mobile-app-development-process': 'app design wireframe',
  'how-to-validate-an-app-idea': 'startup idea brainstorming',
  'mvp-development-guide-for-startups': 'startup team laptop',
  'app-store-optimization-basics': 'app store smartphone',
  'mobile-app-security-checklist': 'mobile security lock',
  'pwa-vs-native-app': 'smartphone tablet devices',
  'how-to-write-an-app-requirements-document': 'planning notebook sketch',
  'mobile-app-maintenance-what-to-budget': 'software maintenance developer',
  'train-a-chatbot-on-your-business-data': 'artificial intelligence brain',
  'ai-customer-support-automation-guide': 'customer service headset',
  'whatsapp-business-chatbot-guide': 'messaging smartphone chat',
  'ai-lead-qualification-for-sales-teams': 'sales funnel',
  'ai-privacy-and-security-for-small-business': 'data privacy security',
  'zapier-make-or-custom-automation': 'workflow automation',
  'invoice-and-payment-automation-guide': 'invoice accounting calculator',
  'crm-automation-ideas-for-small-business': 'customer relationship',
  'how-much-does-a-business-website-cost': 'web design laptop',
  'website-redesign-seo-checklist': 'website design layout',
  'core-web-vitals-explained': 'website speed performance',
  'technical-seo-checklist-for-business-websites': 'search engine optimization',
  'shopify-vs-woocommerce-vs-custom-store': 'online shopping ecommerce',
  'how-to-reduce-cart-abandonment': 'shopping cart online',
  'web-app-vs-website-which-do-you-need': 'web development code',
  'website-accessibility-basics': 'accessibility computer',
  'how-to-build-a-saas-product': 'cloud software',
  'saas-pricing-models-explained': 'pricing subscription',
  'agile-vs-waterfall-for-software-projects': 'agile sticky notes',
  'rest-vs-graphql-vs-webhooks': 'server data center',
  'legacy-software-modernization-guide': 'server room',
  'customer-portal-development-guide': 'dashboard analytics',
}

const BAD = /(vector|icon|illustration|clipart|clip-art|logo|cartoon|silhouette|symbol|graphic|banner|template|background-vector)/

async function search(query) {
  const url = `https://pixabay.com/images/search/${encodeURIComponent(query)}/`
  const html = (await curl(url)).toString('utf8')
  const seen = new Set()
  const out = []
  for (const match of html.matchAll(/href="\/photos\/([a-z0-9-]+)-(\d+)\/"/g)) {
    const [, tags, id] = match
    if (seen.has(id) || BAD.test(tags)) continue
    seen.add(id)
    const cdn = html.match(new RegExp(`https://cdn\\.pixabay\\.com/photo/[0-9/]+/[a-z0-9-]*-${id}_(?:1280|640)\\.jpg`))
    if (!cdn) continue
    out.push({ id, tags, url: cdn[0].replace(/_640\.jpg$/, '_1280.jpg') })
    if (out.length >= 8) break
  }
  return out
}

async function candidates(outFile) {
  const result = {}
  // TOPICS_JSON='{"slug":"new query"}' re-searches just those topics.
  const only = process.env.TOPICS_JSON ? JSON.parse(process.env.TOPICS_JSON) : topics
  for (const [slug, query] of Object.entries(only)) {
    try {
      result[slug] = { query, items: await search(query) }
      console.log(slug.padEnd(52), result[slug].items.length, 'candidates')
    } catch (error) {
      console.log(slug, 'FAILED', error.message)
      result[slug] = { query, items: [] }
    }
    await sleep(1200)
  }
  await fs.writeFile(outFile, JSON.stringify(result, null, 1))
}

async function sheets(file, outDir) {
  const data = JSON.parse(await fs.readFile(file, 'utf8'))
  await fs.mkdir(outDir, { recursive: true })
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const entries = Object.entries(data)
  const per = 8
  for (let s = 0; s * per < entries.length; s++) {
    const chunk = entries.slice(s * per, (s + 1) * per)
    const html = `<body style="margin:8px;background:#111;color:#fff;font:12px sans-serif">${chunk
      .map(
        ([slug, { items }]) =>
          `<div style="margin-bottom:10px"><b>${slug}</b><div style="display:flex;gap:6px">${items
            .slice(0, 8)
            .map((item, i) => `<div style="width:150px"><img src="${item.url.replace('_1280', '_640')}" style="width:150px;height:100px;object-fit:cover"><div>#${i} ${item.tags.slice(0, 26)}</div></div>`)
            .join('')}</div></div>`,
      )
      .join('')}</body>`
    const page = await browser.newPage()
    await page.setViewport({ width: 1260, height: 100 })
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 90000 })
    await page.screenshot({ path: path.join(outDir, `sheet-${s + 1}.jpg`), type: 'jpeg', quality: 80, fullPage: true })
    await page.close()
    console.log('sheet', s + 1)
  }
  await browser.close()
}

async function download(file, picksFile) {
  const data = JSON.parse(await fs.readFile(file, 'utf8'))
  const picks = JSON.parse(await fs.readFile(picksFile, 'utf8'))
  const outDir = path.join(root, 'public/blog/covers')
  await fs.mkdir(outDir, { recursive: true })
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto('about:blank')
  // Merge with the covers already shipped so adding a batch never drops earlier ones.
  const covers = (await import(pathToFileURL(path.join(root, 'src/data/posts/covers.js')).href + '?t=' + Date.now())).default
  for (const [slug, index] of Object.entries(picks)) {
    const item = data[slug]?.items?.[index]
    if (!item) {
      console.log('no candidate for', slug)
      continue
    }
    const bytes = await curl(item.url, ['-e', 'https://pixabay.com/'])
    const dataUrl = await page.evaluate(async (b64) => {
      const img = new Image()
      img.src = `data:image/jpeg;base64,${b64}`
      await img.decode()
      // Centre-crop to 16:9 and scale to 1200x675.
      const targetRatio = 16 / 9
      let sw = img.width
      let sh = Math.round(sw / targetRatio)
      if (sh > img.height) {
        sh = img.height
        sw = Math.round(sh * targetRatio)
      }
      const sx = Math.round((img.width - sw) / 2)
      const sy = Math.round((img.height - sh) / 2)
      const canvas = document.createElement('canvas')
      canvas.width = 1200
      canvas.height = 675
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 1200, 675)
      return { url: canvas.toDataURL('image/webp', 0.8), w: img.width, h: img.height }
    }, bytes.toString('base64'))
    await fs.writeFile(path.join(outDir, `${slug}.webp`), Buffer.from(dataUrl.url.split(',')[1], 'base64'))
    const words = item.tags.split('-').filter((w) => !/^\d+$/.test(w)).slice(0, 5).join(' ')
    covers[slug] = { src: `/blog/covers/${slug}.webp`, alt: `${words.charAt(0).toUpperCase()}${words.slice(1)} — cover photo`, source: 'Pixabay', sourceId: item.id, width: 1200, height: 675 }
    console.log(slug.padEnd(52), `${dataUrl.w}x${dataUrl.h} ->`, (await fs.stat(path.join(outDir, `${slug}.webp`))).size, 'bytes')
  }
  await browser.close()
  const header = '// GENERATED by scripts/fetch-covers.mjs — cover photos (Pixabay, free for commercial use; no attribution required) self-hosted in public/blog/covers/. Edit alt text here if you like.\n'
  await fs.writeFile(path.join(root, 'src/data/posts/covers.js'), `${header}export default ${JSON.stringify(covers, null, 1)}
`)
}

const [mode, a, b] = process.argv.slice(2)
if (mode === 'candidates') await candidates(a)
else if (mode === 'sheets') await sheets(a, b)
else if (mode === 'download') await download(a, b)
else console.log('usage: fetch-covers.mjs candidates <out.json> | sheets <in.json> <outDir> | download <in.json> <picks.json>')
