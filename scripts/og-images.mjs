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

const template = ({ kicker, title, footer, cover }) => `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  @font-face { font-family: 'SG'; src: url('${fontUrl}'); font-weight: 300 700; }
  @font-face { font-family: 'Inter'; src: url('${interUrl}'); font-weight: 100 900; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative; font-family: 'Inter', sans-serif; color: #fff;
    background: radial-gradient(900px 500px at 15% 0%, rgba(11,177,199,.28), transparent 60%), radial-gradient(700px 500px at 100% 100%, rgba(16,161,198,.25), transparent 60%), linear-gradient(135deg, #030f2d, #051c4e); }
  .photo { position: absolute; inset: 0; background: url('${cover ?? ''}') center / cover no-repeat; }
  .shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(3,15,45,.96) 0%, rgba(3,15,45,.88) 45%, rgba(3,15,45,.55) 100%); }
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
  ${cover ? '<div class="photo"></div><div class="shade"></div>' : ''}
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

// Vertical 2:3 Pinterest pin (public/pins/<slug>.jpg): cover photo on top, title panel below.
const pinTemplate = ({ kicker, title, cover }) => `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  @font-face { font-family: 'SG'; src: url('${fontUrl}'); font-weight: 300 700; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1000px; height: 1500px; overflow: hidden; position: relative; font-family: 'SG', sans-serif; color: #fff; background: #030f2d; }
  .photo { position: absolute; left: 0; right: 0; top: 0; height: 720px; background: url('${cover ?? ''}') center / cover no-repeat; }
  .fade { position: absolute; left: 0; right: 0; top: 520px; height: 200px; background: linear-gradient(to bottom, transparent, #030f2d); }
  .panel { position: absolute; left: 0; right: 0; top: 720px; bottom: 0; padding: 44px 72px 56px; display: flex; flex-direction: column; justify-content: space-between;
    background: radial-gradient(700px 400px at 100% 100%, rgba(16,161,198,.25), transparent 60%), #030f2d; }
  .kicker { align-self: flex-start; background: #0fd1e8; color: #030f2d; font: 700 26px 'SG'; letter-spacing: .12em; text-transform: uppercase; padding: 12px 22px; border-radius: 10px; }
  h1 { font: 700 76px/1.1 'SG'; letter-spacing: -0.02em; }
  .foot { display: flex; align-items: center; gap: 16px; }
  .mark { width: 60px; height: 60px; background: linear-gradient(75deg, #3a7bd5, #1b8fd0 35%, #17a8d8 65%, #4ee3f8);
    -webkit-mask: url('${markUrl}') center / contain no-repeat; mask: url('${markUrl}') center / contain no-repeat; }
  .brand { font: 700 28px 'SG'; letter-spacing: .06em; }
  .url { margin-left: auto; font: 600 26px 'SG'; color: #6cd0e7; }
</style></head>
<body>
  <div class="photo"></div><div class="fade"></div>
  <div class="panel">
    <div class="kicker">${escapeHtml(kicker)}</div>
    <h1 id="t">${escapeHtml(title)}</h1>
    <div class="foot"><div class="mark"></div><div class="brand">ORYAN TECHSOL</div><div class="url">oryantechsol.com</div></div>
  </div>
  <script>
    const h = document.getElementById('t'); let s = 76; h.style.fontSize = s + 'px';
    while (h.getBoundingClientRect().height > 430 && s > 40) { s -= 2; h.style.fontSize = s + 'px'; }
  </script>
</body></html>`

// Extra pin designs per article (Pinterest rewards several different pins for the same URL):
//   -list: light "What's inside" checklist built from the article's own section headings
//   -tip:  dark "Key takeaway" pin built from the article's own takeaway text
const pinBase = `@font-face { font-family: 'SG'; src: url('${fontUrl}'); font-weight: 300 700; } * { box-sizing: border-box; margin: 0; }
  body { width: 1000px; height: 1500px; overflow: hidden; position: relative; font-family: 'SG', sans-serif; }
  .foot { position: absolute; left: 72px; right: 72px; bottom: 56px; display: flex; align-items: center; gap: 16px; }
  .mark { width: 60px; height: 60px; background: linear-gradient(75deg, #3a7bd5, #1b8fd0 35%, #17a8d8 65%, #4ee3f8);
    -webkit-mask: url('${markUrl}') center / contain no-repeat; mask: url('${markUrl}') center / contain no-repeat; }
  .brand { font: 700 28px 'SG'; letter-spacing: .06em; } .url { margin-left: auto; font: 600 26px 'SG'; }`

const listPinTemplate = ({ kicker, title, items }) => `<!doctype html><html><head><meta charset="utf-8" /><style>${pinBase}
  body { background: #f3f9fd; color: #051c4e; }
  .band { position: absolute; left: 0; right: 0; top: 0; height: 12px; background: linear-gradient(90deg, #3a7bd5, #0fd1e8); }
  .wrap { position: absolute; left: 72px; right: 72px; top: 90px; bottom: 150px; display: flex; flex-direction: column; }
  .kicker { align-self: flex-start; background: #051c4e; color: #fff; font: 700 26px 'SG'; letter-spacing: .12em; text-transform: uppercase; padding: 12px 22px; border-radius: 10px; }
  h1 { font: 700 64px/1.12 'SG'; letter-spacing: -0.02em; margin: 36px 0 28px; }
  .label { font: 700 30px 'SG'; color: #1b8fd0; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 16px; }
  ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 20px; }
  li { display: flex; gap: 20px; align-items: flex-start; font: 600 40px/1.22 'SG'; background: #fff; border-radius: 20px; padding: 30px 32px; box-shadow: 0 4px 18px rgba(5,28,78,.08); }
  li b { flex: none; width: 56px; height: 56px; border-radius: 50%; background: #0fd1e8; color: #051c4e; display: grid; place-items: center; font: 700 30px 'SG'; }
  .url { color: #1b8fd0; }
</style></head><body><div class="band"></div>
  <div class="wrap"><div class="kicker">${escapeHtml(kicker)}</div><h1 id="t">${escapeHtml(title)}</h1><div class="label">What's inside</div>
  <ul>${items.map((item, i) => `<li><b>${i + 1}</b><span>${escapeHtml(item)}</span></li>`).join('')}</ul></div>
  <div class="foot"><div class="mark"></div><div class="brand">ORYAN TECHSOL</div><div class="url">Read the full guide · oryantechsol.com</div></div>
  <script>const h = document.getElementById('t'); let s = 64; while (h.getBoundingClientRect().height > 230 && s > 40) { s -= 2; h.style.fontSize = s + 'px'; }</script>
</body></html>`

const tipPinTemplate = ({ kicker, title, tip }) => `<!doctype html><html><head><meta charset="utf-8" /><style>${pinBase}
  body { color: #fff; background: radial-gradient(900px 700px at 0% 0%, rgba(11,177,199,.35), transparent 60%), radial-gradient(800px 700px at 100% 100%, rgba(16,161,198,.3), transparent 60%), linear-gradient(160deg, #030f2d, #051c4e); }
  .wrap { position: absolute; left: 72px; right: 72px; top: 110px; bottom: 150px; display: flex; flex-direction: column; justify-content: center; }
  .kicker { align-self: flex-start; background: #0fd1e8; color: #030f2d; font: 700 26px 'SG'; letter-spacing: .12em; text-transform: uppercase; padding: 12px 22px; border-radius: 10px; }
  .q { font: 700 150px/1 'SG'; color: #0fd1e8; margin: 40px 0 0; height: 110px; }
  p { font: 700 60px/1.18 'SG'; letter-spacing: -0.01em; margin-top: 10px; }
  .src { margin-top: 48px; font: 600 32px/1.3 'SG'; color: #9fdcee; border-left: 6px solid #0fd1e8; padding-left: 24px; }
  .url { color: #6cd0e7; }
</style></head><body>
  <div class="wrap"><div class="kicker">${escapeHtml(kicker)}</div><div class="q">&ldquo;</div><p id="t">${escapeHtml(tip)}</p><div class="src">From: ${escapeHtml(title)}</div></div>
  <div class="foot"><div class="mark"></div><div class="brand">ORYAN TECHSOL</div><div class="url">oryantechsol.com</div></div>
  <script>const h = document.getElementById('t'); let s = 60; while (h.getBoundingClientRect().height > 640 && s > 34) { s -= 2; h.style.fontSize = s + 'px'; }</script>
</body></html>`

const cards = [
  { file: 'default.jpg', kicker: 'Apps · Software · AI', title: 'Custom software, apps, websites and AI automation for growing companies.', footer: 'oryantechsol.com' },
  ...posts.map((post) => ({
    file: `${post.slug}.jpg`,
    kicker: post.category,
    title: post.title,
    footer: 'oryantechsol.com/blog',
    // Only self-hosted covers shipped in /public can be read at build time.
    cover: post.cover?.src?.startsWith('/blog/') ? pathToFileURL(path.join(rootDir, 'public', post.cover.src)).href : null,
  })),
]

const pinDir = path.join(rootDir, 'public', 'pins')
await fs.mkdir(outDir, { recursive: true })
await fs.mkdir(pinDir, { recursive: true })
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
for (const card of cards.filter((c) => c.file !== 'default.jpg')) {
  await fs.writeFile(tmpFile, pinTemplate(card))
  const page = await browser.newPage()
  await page.setViewport({ width: 1000, height: 1500 })
  await page.goto(pathToFileURL(tmpFile).href, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  await new Promise((resolve) => setTimeout(resolve, 150))
  await page.screenshot({ path: path.join(pinDir, card.file), type: 'jpeg', quality: 88 })
  await page.close()
  console.log('wrote public/pins/' + card.file)
}
for (const post of posts) {
  const items = post.blocks.filter((b) => b.type === 'h2').map((b) => b.text.replace(/[*_]/g, '')).slice(0, 5)
  const tip = [...(post.takeaways ?? [])].sort((a, b) => a.length - b.length).find((t) => t.length >= 60 && t.length <= 230)
  const variants = []
  if (items.length >= 3) variants.push(['list', listPinTemplate({ kicker: post.category, title: post.title, items })])
  if (tip) variants.push(['tip', tipPinTemplate({ kicker: post.category, title: post.shortTitle ?? post.title, tip })])
  for (const [name, html] of variants) {
    await fs.writeFile(tmpFile, html)
    const page = await browser.newPage()
    await page.setViewport({ width: 1000, height: 1500 })
    await page.goto(pathToFileURL(tmpFile).href, { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((resolve) => setTimeout(resolve, 150))
    await page.screenshot({ path: path.join(pinDir, `${post.slug}-${name}.jpg`), type: 'jpeg', quality: 88 })
    await page.close()
    console.log(`wrote public/pins/${post.slug}-${name}.jpg`)
  }
}
await browser.close()
