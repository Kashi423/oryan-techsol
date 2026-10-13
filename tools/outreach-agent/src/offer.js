// Picks the single most relevant thing to lead with for a business, from what we could actually see.
// Deterministic and explainable; the writer is told to lead with this instead of listing everything.
// `key` links to the service catalog so a starting price can be quoted when you have set one.

export const OFFERS = {
  'a simple, mobile-friendly website': 'web',
  'online booking or enquiry system': 'web',
  'a modern, mobile-friendly website refresh': 'web',
  'a lead-capture form with an AI chatbot': 'ai',
  'a faster, cleaner website': 'web',
  'a website refresh': 'web',
  'small automations and an AI assistant for enquiries': 'automation',
}

/** How each offer reads after "We build ...". */
export const PHRASES = {
  'a simple, mobile-friendly website': 'simple, mobile-friendly websites',
  'online booking or enquiry system': 'online booking and enquiry systems',
  'a modern, mobile-friendly website refresh': 'modern, mobile-friendly websites',
  'a lead-capture form with an AI chatbot': 'AI chatbots that capture enquiries',
  'a faster, cleaner website': 'fast, clean websites',
  'a website refresh': 'modern websites',
  'small automations and an AI assistant for enquiries': 'small automations and AI assistants for enquiries',
}

export function recommendOffer(lead, audit) {
  const out = (service, why) => ({ service, why, key: OFFERS[service] })
  if (!lead.website) return out('a simple, mobile-friendly website', 'no website was found online')
  const failed = new Set((audit?.checks ?? []).filter((c) => !c.ok).map((c) => c.id))
  if (failed.has('booking')) return out('online booking or enquiry system', 'no online booking or ordering was visible')
  if (failed.has('mobile') || failed.has('https')) return out('a modern, mobile-friendly website refresh', 'the site may not display well on phones or is not secure')
  if (failed.has('form')) return out('a lead-capture form with an AI chatbot', 'no contact or enquiry form was visible')
  if (failed.has('speed')) return out('a faster, cleaner website', 'the homepage responded slowly')
  if (failed.has('dated')) return out('a website refresh', 'the site looks out of date')
  return out('small automations and an AI assistant for enquiries', 'the site looks fine, so lead with saving them time')
}
