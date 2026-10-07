// Page-text overrides. The admin can replace any visible text on the site; overrides are stored
// as "original string -> replacement string" pairs and applied here at render time by the custom
// JSX runtime (src/lib/cms-jsx), so they work on every page, in the prerendered HTML, and with
// no per-page changes. This module is plain JS (no React) so the runtime can use it cheaply.

// The state lives on globalThis rather than in module variables: the JSX runtime and the rest of
// the app can end up as two separate module instances in dev (Vite pre-bundles the runtime as a
// dependency), and they must still see the same overrides and the same edit-mode flag.
const shared = (globalThis.__oryanCmsText ??= { overrides: new Map(), editing: false })

export function setTexts(pairs) {
  shared.overrides = new Map((pairs ?? []).filter((pair) => Array.isArray(pair) && typeof pair[0] === 'string'))
}

// The admin area is never translated or wrapped: its labels must always show their real text
// (e.g. the "Page text" list must show the original wording next to its replacement).
const inAdmin = () => {
  const path = globalThis.location?.pathname ?? ''
  return path === '/admin' || path.startsWith('/admin/')
}

export const hasOverrides = () => shared.overrides.size > 0 && !inAdmin()
export const isEditing = () => shared.editing && !inAdmin()

export function setEditing(value) {
  shared.editing = Boolean(value)
}

export function translate(text) {
  const overrides = shared.overrides
  if (overrides.size === 0 || inAdmin()) return text
  const exact = overrides.get(text)
  if (exact !== undefined) return exact
  // JSX text often carries leading/trailing spaces ("Common " + <span>…</span>) — allow an
  // override saved against the trimmed text and keep the original spacing around it.
  const core = text.trim()
  if (core !== text && core !== '') {
    const replaced = overrides.get(core)
    if (replaced !== undefined) {
      const start = text.indexOf(core)
      return text.slice(0, start) + replaced + text.slice(start + core.length)
    }
  }
  return text
}
