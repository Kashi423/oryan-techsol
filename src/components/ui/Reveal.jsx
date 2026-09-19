import { m } from 'framer-motion'

// Fade-and-rise on scroll, once. Reduced-motion users get a plain fade
// (MotionConfig in main.jsx disables the transform). Use `delay` to stagger siblings.
export default function Reveal({ delay = 0, y = 16, className, children }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
