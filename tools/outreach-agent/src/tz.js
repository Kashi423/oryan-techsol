// Works out a business's local time zone from its address, so emails land in THEIR morning,
// not in the middle of their night. US states are mapped; anything else uses the default zone.
const E = 'America/New_York', C = 'America/Chicago', M = 'America/Denver', P = 'America/Los_Angeles'

const STATES = {
  AL: ['Alabama', C], AK: ['Alaska', 'America/Anchorage'], AZ: ['Arizona', 'America/Phoenix'], AR: ['Arkansas', C],
  CA: ['California', P], CO: ['Colorado', M], CT: ['Connecticut', E], DE: ['Delaware', E], DC: ['District of Columbia', E],
  FL: ['Florida', E], GA: ['Georgia', E], HI: ['Hawaii', 'Pacific/Honolulu'], ID: ['Idaho', M], IL: ['Illinois', C],
  IN: ['Indiana', E], IA: ['Iowa', C], KS: ['Kansas', C], KY: ['Kentucky', E], LA: ['Louisiana', C], ME: ['Maine', E],
  MD: ['Maryland', E], MA: ['Massachusetts', E], MI: ['Michigan', E], MN: ['Minnesota', C], MS: ['Mississippi', C],
  MO: ['Missouri', C], MT: ['Montana', M], NE: ['Nebraska', C], NV: ['Nevada', P], NH: ['New Hampshire', E],
  NJ: ['New Jersey', E], NM: ['New Mexico', M], NY: ['New York', E], NC: ['North Carolina', E], ND: ['North Dakota', C],
  OH: ['Ohio', E], OK: ['Oklahoma', C], OR: ['Oregon', P], PA: ['Pennsylvania', E], RI: ['Rhode Island', E],
  SC: ['South Carolina', E], SD: ['South Dakota', C], TN: ['Tennessee', C], TX: ['Texas', C], UT: ['Utah', M],
  VT: ['Vermont', E], VA: ['Virginia', E], WA: ['Washington', P], WV: ['West Virginia', E], WI: ['Wisconsin', C], WY: ['Wyoming', M],
}
const BY_NAME = Object.entries(STATES)
  .map(([abbr, [name, tz]]) => [name.toLowerCase(), tz])
  .sort((a, b) => b[0].length - a[0].length) // "west virginia" before "virginia"

export function timezoneFor(lead, fallback = 'America/New_York') {
  const text = `${lead?.address ?? ''} , ${lead?.area ?? ''}`
  // "Austin, TX 78701" or "Austin, TX"
  for (const m of text.matchAll(/,\s*([A-Z]{2})\b/g)) if (STATES[m[1]]) return STATES[m[1]][1]
  const low = text.toLowerCase()
  for (const [name, tz] of BY_NAME) {
    if (new RegExp(`\\b${name}\\b`).test(low)) return tz
  }
  return fallback
}

/** Weekday ('mon'..'sun') and hour (0-23) in the given time zone. */
export function localParts(date, tz) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', hour: 'numeric', hourCycle: 'h23' }).formatToParts(date)
  const get = (t) => parts.find((p) => p.type === t)?.value ?? ''
  return { day: get('weekday').slice(0, 3).toLowerCase(), hour: Number(get('hour')) }
}
