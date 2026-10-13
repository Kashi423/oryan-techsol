// 0-100 "how much could this business use our help?" score. Deterministic and explainable.
// Higher = better prospect. Used to rank who gets emailed first.

export function scoreLead(lead, audit) {
  const reasons = []
  let score = 0
  if (!lead.website) {
    score += 55
    reasons.push('No website listed (strong need)')
  } else if (audit) {
    const w = Math.min(audit.issueWeight ?? 0, 70)
    score += w
    if (audit.bullets?.length) reasons.push(`${audit.bullets.length} issue(s) found on the site`)
  }
  if (lead.rating && lead.rating >= 4.2) { score += 12; reasons.push('Well reviewed (cares about reputation)') }
  else if (lead.rating && lead.rating >= 3.5) score += 6
  if (lead.email) { score += 10; reasons.push('Has a public email') }
  if (lead.phone) score += 3
  return { score: Math.max(0, Math.min(100, Math.round(score))), reasons }
}
