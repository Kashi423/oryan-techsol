// Generates the 1200×630 social-share (Open Graph) images: public/og/default.jpg plus one per
// blog post. Run with `npm run og` whenever a post is added or its title changes, then commit
// the PNGs. Not part of `npm run build` on purpose — it keeps CI fast and the images stable.
//
// Rendered with the same headless Chrome the prerender step uses, from an HTML template that
// uses the brand fonts and the real logo mark, so the cards match the site.

import puppeteer from 'puppeteer'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { posts } from '../src/data/posts.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(rootDir, 'public', 'og')
const fontUrl = pathToFileURL(
  path.join(rootDir, 'node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'),
).href
const interUrl = pathToFileURL(
  path.join(rootDir, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
).href
const markUrl = pathToFileURL(path.join(rootDir, 'src/assets/brand/logo-mark.webp')).href

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const template = ({ kicker, title, footer }) => `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  @font-face { font-family: 'SG'; src: url('${fontUrl}'); font-weight: 300 700; }
  @font-face { font-family: 'Inter'; src: url('${interUrl}'); font-weight: 100 900; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative; font-family: 'Inter', sans-serif; color: #fff;
    background: radial-gradient(900px 500px at 15% 0%, rgba(11,177,199,.28), transparent 60%), radial-gradient(700px 500px at 100% 100%, rgba(16,161,198,.25), transparent 60%), linear-gradient(135deg, #030f2d, #051c4e); }
  .grid { position: absolute; inset: 0; opacity: .5;
    background-image: linear-gradient(to right, rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.07) 1px, transparent 1px);
    background-size: 56px 56px; -webkit-mask-image: radial-gradient(ellipse at 30% 40%, black 20%, transparent 75%); }
  svg.hex { position: absolute; right: -150px; top: 50%; transform: translateY(-50%); width: 640px; height: 640px; color: #0fd1e8; }
  .wrap { position: relative; height: 100%; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; }
  .kicker { align-self: flex-start; background: #0fd1e8; color: #030f2d; font: 700 20px 'SG'; letter-spacing: .12em; text-transform: uppercase; padding: 10px 18px; border-radius: 8px; }
  h1 { font: 700 ${'${size}'}px/1.08 'SG'; letter-spacing: -0.02em; max-width: 800px; }
  .foot { display: flex; align-items: center; gap: 16px; }
  .mark { width: 52px; height: 52px; background: linear-gradient(75deg, #3a7bd5, #1b8fd0 35%, #17a8d8 65%, #4ee3f8);
    -webkit-mask: url('${markUrl}') center / contain no-repeat; mask: url('${markUrl}') center / contain no-repeat; }
  .brand { font: 700 24px 'SG'; letter-spacing: .06em; }
  .url { margin-left: auto; font: 600 22px 'SG'; color: #6cd0e7; }
</style></head>
<body>
  <div class="grid"></div>
  <svg class="hex" viewBox="0 0 100 100" fill="none">
    <polygon points="50,2 96,26 96,74 50,98 4,74 4,26" stroke="currentColor" stroke-opacity=".35" stroke-width=".5"/>
    <polygon points="50,2 96,26 96,74 50,98 4,74 4,26" stroke="currentColor" stroke-opacity=".22" stroke-width=".5" transform="translate(50 50) scale(.74) translate(-50 -50)"/>
    <polygon points="50,2 96,26 96,74 50,98 4,74 4,26" stroke="currentColor" stroke-opacity=".14" stroke-width=".5" transform="translate(50 50) scale(.48) translate(-50 -50)"/>
  </svg>
  <div class="wrap">
    <div class="kicker">${escapeHtml(kicker)}</div>
    <h1 id="t">${escapeHtml(title)}</h1>
    <div class="foot"><div class="mark"></div><div class="brand">ORYAN TECHSOL</div><div class="url">${escapeHtml(footer)}</div></div>
  </div>
  <script>
    // Shrink long titles until they fit the card.
    const h = document.getElementById('t'); let s = 64; h.style.fontSize = s + 'px';
    while (h.getBoundingClientRect().height > 300 && s > 36) { s -= 2; h.style.fontSize = s + 'px'; }
  </script>
</body></html>`.replace('${size}', '64')

const cards = [
  { file: 'default.jpg', kicker: 'Apps · Software · AI', title: 'Custom software, apps, websites and AI automation for growing companies.', footer: 'oryantechsol.com' },
  ...posts.map((post) => ({ file: `${post.slug}.jpg`, kicker: post.category, title: post.title, footer: 'oryantechsol.com/blog' })),
]

await fs.mkdir(outDir, { recursive: true })
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--allow-file-access-from-files'] })
const tmpFile = path.join(os.tmpdir(), 'oryan-og.html')

for (const card of cards) {
  await fs.writeFile(tmpFile, template(card))
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })
  await page.goto(pathToFileURL(tmpFile).href, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  await new Promise((resolve) => setTimeout(resolve, 150))
  await page.screenshot({ path: path.join(outDir, card.file), type: 'jpeg', quality: 90 })
  await page.close()
  console.log('wrote public/og/' + card.file)
}
await browser.close()
