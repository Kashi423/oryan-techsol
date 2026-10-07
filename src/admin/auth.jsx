/* oxlint-disable react/only-export-components -- shared admin helpers live beside their components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api, setCsrf } from '@/lib/cms/api'

// Admin session. The site marks "an admin is signed in on this browser" in localStorage so the
// public pages can show the on-site editing bar without asking the server on every visit.
const FLAG = 'oryan_cms_admin'
export const setAdminFlag = (on) => {
  try {
    if (on) window.localStorage.setItem(FLAG, '1')
    else window.localStorage.removeItem(FLAG)
  } catch {
    // Storage unavailable (private mode): the editing bar simply won't auto-appear.
  }
}

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [state, setState] = useState({ loading: true, user: null, unavailable: false })

  useEffect(() => {
    let cancelled = false
    api('/admin/me')
      .then((data) => {
        if (cancelled) return
        if (data.authenticated) {
          setCsrf(data.csrf)
          setAdminFlag(true)
          setState({ loading: false, user: data.user, unavailable: false })
        } else {
          setAdminFlag(false)
          setState({ loading: false, user: null, unavailable: false })
        }
      })
      .catch(() => !cancelled && setState({ loading: false, user: null, unavailable: true }))
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await api('/admin/login', { method: 'POST', body: { email, password } })
    setCsrf(data.csrf)
    setAdminFlag(true)
    setState({ loading: false, user: data.user, unavailable: false })
  }, [])

  const logout = useCallback(async () => {
    try {
      await api('/admin/logout', { method: 'POST' })
    } finally {
      setCsrf(null)
      setAdminFlag(false)
      setState({ loading: false, user: null, unavailable: false })
    }
  }, [])

  const value = useMemo(() => ({ ...state, login, logout }), [state, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
