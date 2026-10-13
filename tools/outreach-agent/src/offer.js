// Picks the single most relevant thing to lead with for a business, from what we could actually see.
// Deterministic and explainable; the writer is told to lead with this instead of listing everything.

export function recommendOffer(lead, audit) {
  if (!lead.website) return { service: 'a simple, mobile-friendly website', why: 'no website was found online' }
  const failed = new Set((audit?.checks ?? []).filter((c) => !c.ok).map((c) => c.id))
  if (failed.has('booking')) return { service: 'online booking or enquiry system', why: 'no online booking or ordering was visible' }
  if (failed.has('mobile') || failed.has('https')) return { service: 'a modern, mobile-friendly website refresh', why: 'the site may not display well on phones or is not secure' }
  if (failed.has('form')) return { service: 'a lead-capture form with an AI chatbot', why: 'no contact or enquiry form was visible' }
  if (failed.has('speed')) return { service: 'a faster, cleaner website', why: 'the homepage responded slowly' }
  if (failed.has('dated')) return { service: 'a website refresh', why: 'the site looks out of date' }
  return { service: 'small automations and an AI assistant for enquiries', why: 'the site looks fine, so lead with saving them time' }
}
