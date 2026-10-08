// Cookie consent + Google Analytics 4. Analytics loads only after the visitor accepts, and only
// when siteConfig.analyticsId is set (VITE_GA_ID). The choice is stored in localStorage.
import { useSyncExternalStore } from 'react'
import { siteConfig } from '@/config/site'

const KEY = 'oryan-consent'
const listeners = new Set()

const read = () => {
  try {
    return localStorage.getItem(KEY) // 'granted' | 'denied' | null
  } catch {
    return null
  }
}

let loaded = false
function loadAnalytics() {
  const id = siteConfig.analyticsId
  if (!id || loaded || typeof document === 'undefined') return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* private mode: the choice just won't persist */
  }
  if (value === 'granted') loadAnalytics()
  listeners.forEach((fn) => fn())
}

export function resetConsent() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn())
}

export function initAnalytics() {
  if (read() === 'granted') loadAnalytics()
}

export function useConsent() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    read,
    () => 'denied', // server / prerender: never show the banner in static HTML
  )
}
