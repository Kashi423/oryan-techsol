// Branded HTML email. Deliberately light: one column, inline styles, no tracking, no images by default
// (images and heavy markup hurt cold-email deliverability). A plain-text part is always sent alongside.
import { config } from './config.js'
import { servicesLine } from './catalog.js'

const NAVY = '#051c4e'
const CYAN = '#10a1c6'
const INK = '#1f2937'
const MUTED = '#64748b'

export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Turns plain paragraphs and "- bullet" lines into email-safe HTML blocks. */
function blocks(body, signOff) {
  let text = String(body ?? '').replace(/\r\n/g, '\n').trim()
  // The signature card replaces a trailing sign-off line like "Rai".
  if (signOff) text = text.replace(new RegExp(`\\n+(?:best|regards|thanks|cheers)?,?\\s*${signOff.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i'), '').trim()
  const isBullet = (l) => /^[-*•]\s+/.test(l)
  return text.split(/\n{2,}/).map((blk) => {
    // Within a block, runs of "- item" lines become a list and other lines stay paragraph text.
    const lines = blk.split('\n').map((l) => l.trimEnd())
    const out = []
    for (let i = 0; i < lines.length;) {
      const run = []
      const bullet = isBullet(lines[i])
      while (i < lines.length && isBullet(lines[i]) === bullet) run.push(lines[i++])
      out.push(bullet
        ? `<ul style="margin:0 0 18px 0;padding-left:20px;color:${INK};">${run.map((l) => `<li style="margin:0 0 6px 0;">${esc(l.replace(/^[-*•]\s+/, ''))}</li>`).join('')}</ul>`
        : `<p style="margin:0 0 ${i < lines.length ? 8 : 16}px 0;">${run.map(esc).join('<br>')}</p>`)
    }
    return out.join('')
  }).join('\n')
}

export function renderEmailHtml({ subject = '', body = '', replyTo = '', signOff = '' } = {}) {
  const site = config.website
  const name = signOff || config.signOffName || config.fromName
  const reply = replyTo || config.gmailUser || config.replyTo
  const preheader = String(body).replace(/\s+/g, ' ').trim().slice(0, 110)
  const unsub = `mailto:${reply}?subject=${encodeURIComponent('Unsubscribe')}`
  const cta = `mailto:${reply}?subject=${encodeURIComponent('Re: ' + subject)}`
  const logo = config.logoUrl
    ? `<img src="${esc(config.logoUrl)}" alt="Oryan Techsol" height="32" style="display:block;border:0;height:32px;">`
    : `<span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;letter-spacing:2px;color:#ffffff;">ORYAN</span><span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:300;letter-spacing:2px;color:#5be4f4;"> TECHSOL</span>`
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
    <tr><td style="background:${NAVY};padding:18px 28px;">${logo}</td></tr>
    <tr><td style="height:3px;line-height:3px;font-size:0;background:${CYAN};">&nbsp;</td></tr>
    <tr><td style="padding:28px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${INK};">
${blocks(body, name)}
    </td></tr>
    <tr><td style="padding:4px 28px 24px 28px;">
      <a href="${esc(cta)}" style="display:inline-block;background:${CYAN};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:11px 20px;border-radius:6px;">Reply to book a quick call</a>
    </td></tr>
    <tr><td style="padding:0 28px 26px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${INK};">
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:14px;width:100%;"><tr><td style="padding-top:14px;">
        <div style="font-weight:700;color:${NAVY};">${esc(name)}</div>
        <div style="color:${MUTED};">Oryan Techsol &middot; Innovate &middot; Integrate &middot; Elevate</div>
        <div style="margin-top:6px;font-size:12px;color:${MUTED};">${esc(servicesLine())}</div>
        <div style="margin-top:6px;"><a href="${esc(site)}" style="color:${CYAN};text-decoration:none;">${esc(site.replace(/^https?:\/\//, ''))}</a>${config.phone ? ` &middot; <span style="color:${MUTED};">${esc(config.phone)}</span>` : ''}</div>
      </td></tr></table>
    </td></tr>
    <tr><td style="background:#f8fafc;padding:16px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${MUTED};border-top:1px solid #e2e8f0;">
      ${esc(config.postalAddress)}<br>
      Not relevant? Just reply &ldquo;no thanks&rdquo; or <a href="${esc(unsub)}" style="color:${MUTED};">unsubscribe</a> and I won&rsquo;t email you again.
    </td></tr>
  </table>
</td></tr></table>
</body></html>`
}
