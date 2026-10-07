// Tiny constructors so post files read like prose instead of nested objects. Plain ESM with no
// aliases — scripts/prerender.mjs imports the post data directly under Node.
//
// Inline markup inside any text: [anchor](/internal-path) and **bold**.

export const p = (text) => ({ type: 'p', text })
export const h2 = (text) => ({ type: 'h2', text })
export const h3 = (text) => ({ type: 'h3', text })
export const ul = (...items) => ({ type: 'ul', items })
export const ol = (...items) => ({ type: 'ol', items })
export const callout = (tone, title, text) => ({ type: 'callout', tone, title, text })
export const cta = (text, to, label) => ({ type: 'cta', text, to, label })

// Infographics — all render as real HTML text (see components/blog/Infographics.jsx).
export const stats = (title, items, caption) => ({ type: 'stats', title, items, caption })
export const steps = (title, items, caption) => ({ type: 'steps', title, items, caption })
export const bars = (title, items, caption) => ({ type: 'bars', title, items, caption })
export const compare = (title, left, right, caption) => ({ type: 'compare', title, left, right, caption })
export const table = (title, columns, rows, caption) => ({ type: 'table', title, columns, rows, caption })
export const checklist = (title, items, caption) => ({ type: 'checklist', title, items, caption })
export const timeline = (title, items, caption) => ({ type: 'timeline', title, items, caption })
