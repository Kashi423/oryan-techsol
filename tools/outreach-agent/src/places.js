import { config, requireKeys } from './config.js'

const FIELDS = [
  'places.id', 'places.displayName', 'places.formattedAddress', 'places.websiteUri',
  'places.nationalPhoneNumber', 'places.rating', 'places.primaryTypeDisplayName',
  'places.businessStatus', 'nextPageToken',
].join(',')

/** Official Google Places API (New) text search. Returns up to `max` operational businesses. */
export async function searchPlaces(query, max = 40, fetchImpl = fetch) {
  requireKeys('places')
  const out = []
  let pageToken
  do {
    const res = await fetchImpl('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': config.placesKey,
        'X-Goog-FieldMask': FIELDS,
      },
      body: JSON.stringify({ textQuery: query, pageSize: 20, ...(pageToken ? { pageToken } : {}) }),
    })
    if (!res.ok) throw new Error(`Places API ${res.status}: ${(await res.text()).slice(0, 300)}`)
    const json = await res.json()
    for (const p of json.places ?? []) {
      if (p.businessStatus && p.businessStatus !== 'OPERATIONAL') continue
      out.push({
        place_id: p.id,
        name: p.displayName?.text ?? '',
        address: p.formattedAddress ?? '',
        phone: p.nationalPhoneNumber ?? '',
        website: p.websiteUri ?? '',
        category: p.primaryTypeDisplayName?.text ?? '',
        rating: p.rating ?? null,
      })
    }
    pageToken = json.nextPageToken
  } while (pageToken && out.length < max)
  return out.slice(0, max)
}
