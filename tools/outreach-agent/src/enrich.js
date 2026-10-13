// Reads a business's own public website (homepage + contact page) to find a public
// contact email and a few *factual* observations the email can reference.

const UA = 'OryanTechsolOutreach/1.0 (+https://oryantechsol.com)'
const JUNK_LOCAL = /^(no-?reply|donotreply|do-not-reply|mailer-daemon|postmaster|abuse|privacy|webmaster|sentry)/i
const JUNK_DOMAIN = /(sentry|wixpress|example\.|domain\.com|yourdomain|email\.com|godaddy|squarespace|wordpress|schema\.|w3\.org|cloudflare)/i
const FILE_EXT = /\.(png|jpe?g|gif|svg|webp|css|js|woff2?|ico)$/i
const PREFERRED = /^(info|contact|hello|enquiries|enquiry|sales|office|admin|owner|team|support|mail|bookings?)@/i

export function extractEmails(html) {
  const found = new Set()
  const decoded = html.replace(/&#64;|&commat;|\[at\]|\(at\)/gi, '@').replace(/%40/g, '@')
  for (const m of decoded.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g)) {
    const e = m[0].toLowerCase().replace(/^[.%+-]+/, '')
    if (FILE_EXT.test(e) || JUNK_LOCAL.test(e) || JUNK_DOMAIN.test(e.split('@')[1])) continue
    found.add(e)
  }
  return [...found]
}

export function pickBestEmail(emails, siteHost) {
  const host = (siteHost || '').replace(/^www\./, '')
  const score = (e) =>
    (host && e.endsWith('@' + host) ? 4 : 0) + (host && e.split('@')[1].endsWith(host) ? 1 : 0) + (PREFERRED.test(e) ? 2 : 0)
  return [...emails].sort((a, b) => score(b) - score(a))[0] ?? null
}

export function observe(html, url) {
  const obs = []
  const lower = html.toLowerCase()
  if (url.startsWith('http://')) obs.push('The site loads over plain http (no https padlock).')
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) obs.push("The homepage has no mobile viewport setting, so it likely doesn't display well on phones.")
  const years = [...html.matchAll(/(?:©|&copy;|copyright)[^0-9]{0,20}((?:19|20)\d{2})/gi)].map((m) => Number(m[1]))
  const latest = years.length ? Math.max(...years) : null
  if (latest && latest <= new Date().getFullYear() - 3) obs.push(`The footer still says © ${latest}.`)
  if (/wix\.com|wixstatic/.test(lower)) obs.push('Built on Wix.')
  else if (/squarespace/.test(lower)) obs.push('Built on Squarespace.')
  else if (/weebly/.test(lower)) obs.push('Built on Weebly.')
  if (!/(book|booking|appointment|order online|schedule|reserve|add to cart|checkout)/i.test(html)) {
    obs.push('No online booking, ordering or checkout was visible on the homepage.')
  }
  if (!/<form[\s>]/i.test(html)) obs.push('No contact or enquiry form was visible on the homepage.')
  return obs
}

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

import { buildAudit } from './audit.js'

async function get(url, fetchImpl) {
  const res = await fetchImpl(url, {
    headers: { 'User-Agent': UA, Accept: 'text/html' },
    redirect: 'follow',
    signal: AbortSignal.timeout(12000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  if (!(res.headers.get('content-type') ?? '').includes('html')) throw new Error('not html')
  return { html: (await res.text()).slice(0, 600_000), url: res.url }
}

export async function enrichSite(website, fetchImpl = fetch) {
  if (!website) return { email: null, observations: [], summary: '', audit: null }
  let home
  const started = Date.now()
  try {
    home = await get(website, fetchImpl)
  } catch (e) {
    return { email: null, observations: [], summary: '', audit: null, error: e.message }
  }
  const elapsed = Date.now() - started
  const host = new URL(home.url).hostname
  let emails = extractEmails(home.html)
  const links = [...home.html.matchAll(/href=["']([^"'#]+)["']/gi)]
    .map((m) => m[1])
    .filter((h) => /contact|about|reach|get-in-touch/i.test(h))
  const pages = [
    ...new Set(
      links
        .map((l) => {
          try { return new URL(l, home.url).href } catch { return null }
        })
        .filter((u) => u && new URL(u).hostname === host),
    ),
  ].slice(0, 2)
  for (const p of pages) {
    try {
      emails = [...new Set([...emails, ...extractEmails((await get(p, fetchImpl)).html)])]
    } catch { /* skip page */ }
  }
  const title = (home.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').replace(/\s+/g, ' ').trim()
  const desc = home.html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1] ?? ''
  return {
    email: pickBestEmail(emails, host),
    observations: observe(home.html, home.url),
    audit: buildAudit(home.html, home.url, elapsed),
    summary: [title, desc, textOf(home.html).slice(0, 400)].filter(Boolean).join(' | ').slice(0, 700),
  }
}
