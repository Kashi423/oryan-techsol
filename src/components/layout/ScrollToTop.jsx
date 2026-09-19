import { useEffect } from 'react'
import { useLocation } from 'react-router'

// Client-side navigation keeps the previous scroll position; reset it on route change.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
