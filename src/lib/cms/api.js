// Tiny fetch helper for the PHP backend at /api. Public calls fail soft (the site works fully
// without the backend); the admin uses the same helper with a CSRF token.

export const API_BASE = '/api'

let csrfToken = null
export const setCsrf = (token) => {
  csrfToken = token
}
export const getCsrf = () => csrfToken

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.status = status
    this.data = data
  }
}

/** JSON request to /api. Throws ApiError (with .status/.data) on any non-2xx or non-JSON reply. */
export async function api(path, { method = 'GET', body, form, signal, revalidate = false } = {}) {
  const headers = { Accept: 'application/json' }
  let payload
  if (form) {
    payload = form
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }
  if (method !== 'GET' && csrfToken) headers['X-CSRF-Token'] = csrfToken

  let response
  try {
    response = await fetch(API_BASE + path, { method, headers, body: payload, credentials: 'same-origin', signal, ...(revalidate && { cache: 'no-cache' }) })
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0)
  }
  const type = response.headers.get('content-type') ?? ''
  if (!type.includes('json')) throw new ApiError('The admin service is not available on this server yet.', response.status)
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new ApiError(data?.message ?? `Request failed (${response.status})`, response.status, data)
  return data
}

/** True when the PHP backend answers (used to decide between API and mailto fallbacks). */
export async function backendAvailable() {
  try {
    const data = await api('/health')
    return Boolean(data?.installed)
  } catch {
    return false
  }
}
