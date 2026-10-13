// Free business search with no API key: OpenStreetMap (Nominatim for the area, Overpass for the businesses).
const UA = 'OryanTechsolOutreach/1.0 (+https://oryantechsol.com)'
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

// Plain-English business type -> OpenStreetMap tags. Anything not listed falls back to a name search.
const TYPE_TAGS = [
  [/dent/, [['amenity', 'dentist'], ['healthcare', 'dentist']]],
  [/restaurant|diner|eatery/, [['amenity', 'restaurant']]],
  [/cafe|coffee/, [['amenity', 'cafe']]],
  [/gym|fitness/, [['leisure', 'fitness_centre']]],
  [/salon|hair|barber/, [['shop', 'hairdresser'], ['shop', 'beauty']]],
  [/plumb/, [['craft', 'plumber']]],
  [/electric/, [['craft', 'electrician']]],
  [/clinic|doctor|medical/, [['amenity', 'clinic'], ['amenity', 'doctors']]],
  [/pharm/, [['amenity', 'pharmacy']]],
  [/lawyer|attorney|law firm/, [['office', 'lawyer']]],
  [/account/, [['office', 'accountant']]],
  [/real estate|realtor|estate agent/, [['office', 'estate_agent']]],
  [/hotel|motel|guest ?house/, [['tourism', 'hotel'], ['tourism', 'guest_house']]],
  [/school|academy|tutor/, [['amenity', 'school'], ['amenity', 'language_school']]],
  [/car repair|mechanic|garage|auto/, [['shop', 'car_repair'], ['shop', 'car']]],
  [/bakery/, [['shop', 'bakery']]],
  [/florist|flower/, [['shop', 'florist']]],
  [/vet|pet/, [['amenity', 'veterinary'], ['shop', 'pet']]],
  [/photograph/, [['craft', 'photographer'], ['shop', 'photo']]],
  [/cloth|boutique|fashion/, [['shop', 'clothes']]],
  [/spa|massage/, [['leisure', 'spa'], ['shop', 'massage']]],
  [/optic|eye/, [['shop', 'optician']]],
  [/construct|builder|contractor/, [['craft', 'builder'], ['office', 'construction_company']]],
]

export function tagsFor(query) {
  const q = query.toLowerCase()
  for (const [re, tags] of TYPE_TAGS) if (re.test(q)) return tags
  return []
}

export function buildQuery(query, [s, w, n, e], tags = tagsFor(query)) {
  const box = `(${s},${w},${n},${e})`
  const parts = tags.map(([k, v]) => `nwr["${k}"="${v}"]["name"]${box};`)
  const safe = query.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/s$/i, '')
  if (!parts.length && safe) parts.push(`nwr["name"~"${safe}",i]${box};`)
  return `[out:json][timeout:30];(${parts.join('')});out center tags 250;`
}

export function parseElements(elements, area) {
  const out = []
  for (const el of elements ?? []) {
    const t = el.tags ?? {}
    if (!t.name) continue
    const website = t.website || t['contact:website'] || ''
    const email = t.email || t['contact:email'] || ''
    if (!website && !email) continue // nothing we can use
    const street = [t['addr:housenumber'], t['addr:street']].filter(Boolean).join(' ')
    out.push({
      place_id: `osm-${el.type}-${el.id}`,
      name: t.name,
      address: [street, t['addr:city'] || area].filter(Boolean).join(', '),
      phone: t.phone || t['contact:phone'] || '',
      website: /^https?:\/\//i.test(website) ? website : website ? `https://${website}` : '',
      email: email.split(/[;,]/)[0].trim().toLowerCase(),
      category: t.amenity || t.shop || t.craft || t.office || t.leisure || t.tourism || '',
      rating: null,
    })
  }
  // Listings that already publish an email come first.
  return out.sort((a, b) => Number(!!b.email) - Number(!!a.email))
}

export async function searchOsm({ query, area, max = 40, fetchImpl = fetch }) {
  const geo = await fetchImpl(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(area)}`, { headers: { 'User-Agent': UA } })
  if (!geo.ok) throw new Error(`Map lookup failed (${geo.status}). Try again in a minute.`)
  const hit = (await geo.json())[0]
  if (!hit) throw new Error(`Couldn't find "${area}" on the map. Try "City, State" or "City, Country".`)
  const [s, n, w, e] = hit.boundingbox.map(Number)
  const body = 'data=' + encodeURIComponent(buildQuery(query, [s, w, n, e]))
  // The public Overpass servers are often busy; try each mirror before giving up.
  let lastStatus = 0
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetchImpl(endpoint, {
        method: 'POST',
        headers: { 'User-Agent': UA, 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        signal: AbortSignal.timeout(45000),
      })
      lastStatus = res.status
      if (!res.ok) continue
      const json = await res.json()
      return parseElements(json.elements, area).slice(0, max)
    } catch {
      /* timeout or bad response: next mirror */
    }
  }
  throw new Error(`Business search is busy right now${lastStatus ? ` (${lastStatus})` : ''}. Try again in a minute.`)
}
