import { Braces, Cpu, Database, GitBranch, SquareTerminal, Code2 } from 'lucide-react'
import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

// Scattered near the edges of every hero (rendered by <Section spacing="hero">) so they never
// compete with centered or two-column content in the middle. Generic lucide icons — not real
// product logos — to keep this decorative rather than implying a specific tech stack.
//
// sm and up only: on a narrow phone viewport, hero copy fills nearly the full width with
// little safe margin at the edges, so anything pinned by percentage risks landing on top of
// the text — verified visually (a braces icon overlapped the hero paragraph on mobile).
const icons = [
  { Icon: Code2, className: 'top-[10%] left-[6%]', delay: 0 },
  { Icon: Braces, className: 'top-[16%] right-[6%]', delay: 0.5 },
  { Icon: GitBranch, className: 'bottom-[22%] left-[8%]', delay: 1 },
  { Icon: Database, className: 'bottom-[14%] right-[9%]', delay: 1.5 },
  { Icon: SquareTerminal, className: 'top-[46%] left-[3%] hidden lg:block', delay: 2 },
  { Icon: Cpu, className: 'top-[52%] right-[4%] hidden lg:block', delay: 2.5 },
]

function FloatingIcon({ Icon, className, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-10% 0px', once: false })

  return (
    <m.div
      ref={ref}
      className={cnAbsolute(className)}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: [0, -10, 0] } : { opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 6, delay: delay + 0.6, repeat: inView ? Infinity : 0, ease: 'easeInOut' },
      }}
    >
      <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface-raised/70 text-fg-subtle shadow-card backdrop-blur-xl sm:size-12">
        <Icon className="size-5 sm:size-5.5" aria-hidden="true" />
      </span>
    </m.div>
  )
}

// Small helper so the className list above stays readable as plain position utilities.
function cnAbsolute(positionClasses) {
  return `absolute ${positionClasses}`
}

// aria-hidden at the wrapper level: these are decorative, not content.
export default function FloatingTechIcons() {
  return (
    <div aria-hidden="true" className="absolute inset-0 hidden opacity-80 sm:block">
      {icons.map(({ Icon, className, delay }) => (
        <FloatingIcon key={className} Icon={Icon} className={className} delay={delay} />
      ))}
    </div>
  )
}
