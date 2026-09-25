import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import { cn } from '@/lib/cn'

// The pulsing ring used by every "how it works" flow-diagram step. Gated by useInView so
// the infinite loop only actually runs while the diagram is on screen — otherwise it's
// pure CPU/battery cost for an animation nobody can see (framer-motion's `repeat: Infinity`
// has no built-in visibility awareness; whileInView only affects entrance, not ongoing loops).
export default function PulseRing({ index, total, stepDuration = 0.6, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-10% 0px', once: false })
  const cycle = stepDuration * total

  return (
    <m.span
      ref={ref}
      aria-hidden="true"
      className={cn('absolute inset-0 rounded-2xl ring-2 ring-highlight', className)}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
      transition={{
        duration: stepDuration,
        delay: index * stepDuration,
        repeat: inView ? Infinity : 0,
        repeatDelay: cycle - stepDuration,
        ease: 'easeInOut',
      }}
    />
  )
}
