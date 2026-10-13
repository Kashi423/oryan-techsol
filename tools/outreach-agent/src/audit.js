// A small, honest website audit built from what we could actually see on the homepage.
// Every bullet is phrased as an observation, never as a certainty about the business.

/** html: homepage markup, url: final URL, ms: response time in milliseconds. */
export function buildAudit(html, url, ms = 0) {
  const h = html || ''
  const lower = h.toLowerCase()
  const checks = [
    { id: 'https', ok: url.startsWith('https://'), weight: 15, bullet: "The site loads without the secure padlock (it's served over plain http)." },
    { id: 'mobile', ok: /<meta[^>]+name=["']viewport["']/i.test(h), weight: 25, bullet: "I couldn't see a mobile viewport setting, so the homepage may not display well on phones." },
    { id: 'title', ok: /<title[^>]*>\s*[^<\s][^<]{8,}/i.test(h), weight: 8, bullet: "The page title looks missing or very short, which makes it harder to find on Google." },
    { id: 'description', ok: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{30,}/i.test(h), weight: 8, bullet: "I couldn't find a search description for the homepage." },
    { id: 'heading', ok: /<h1[\s>]/i.test(h), weight: 4, bullet: "The homepage doesn't seem to have a main heading." },
    { id: 'booking', ok: /(book|booking|appointment|order online|schedule|reserve|add to cart|checkout)/i.test(h), weight: 15, bullet: "I couldn't spot an online booking or ordering option on the homepage." },
    { id: 'form', ok: /<form[\s>]/i.test(h), weight: 8, bullet: "I couldn't see a contact or enquiry form on the homepage." },
    { id: 'speed', ok: !(ms > 3000), weight: 10, bullet: `The homepage took about ${(ms / 1000).toFixed(1)} seconds to respond, which is on the slow side.` },
  ]
  const years = [...h.matchAll(/(?:©|&copy;|copyright)[^0-9]{0,20}((?:19|20)\d{2})/gi)].map((m) => Number(m[1]))
  const latest = years.length ? Math.max(...years) : null
  if (latest && latest <= new Date().getFullYear() - 3) {
    checks.push({ id: 'dated', ok: false, weight: 10, bullet: `The footer still says © ${latest}.` })
  }
  if (/wix\.com|wixstatic/.test(lower)) checks.push({ id: 'builder', ok: false, weight: 3, bullet: 'The site appears to be built on Wix.' })
  const failed = checks.filter((c) => !c.ok).sort((a, b) => b.weight - a.weight)
  return {
    checks: checks.map(({ id, ok, weight }) => ({ id, ok, weight })),
    bullets: failed.map((c) => c.bullet),
    items: failed.map((c) => ({ id: c.id, bullet: c.bullet })),
    issueWeight: failed.reduce((s, c) => s + c.weight, 0),
  }
}
