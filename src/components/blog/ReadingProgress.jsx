import { useEffect, useRef } from 'react'

// Thin brand-gradient bar under the header that fills as the article is read. Updates a CSS
// transform directly (no React state per scroll event).
export default function ReadingProgress({ targetId }) {
  const barRef = useRef(null)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return undefined
    let ticking = false
    const update = () => {
      const rect = target.getBoundingClientRect()
      const total = rect.height - window.innerHeight * 0.5
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.25 - rect.top) / total))
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [targetId])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-16 z-40 h-1 lg:top-20">
      <div
        ref={barRef}
        className="h-full origin-left bg-linear-to-r from-brand-500 to-accent-400"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
