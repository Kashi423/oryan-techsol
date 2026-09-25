import PulseRing from './PulseRing'

// The icon badge for a numbered process/timeline step (Discover, Plan, Build...), used on
// every page that has a 5-6 step "how we work" section. Reuses PulseRing — the same
// sequential pulsing-ring motif already used on the site's "how AI bots work" flow diagrams —
// so a bigger, more elaborate badge still feels like part of the same design language rather
// than a one-off effect invented just for this section.
export default function ProcessStepIcon({ icon: Icon, number, index, total }) {
  return (
    <span className="relative z-10 flex size-20 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white shadow-button transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
      <Icon className="size-8" aria-hidden="true" />
      <PulseRing index={index} total={total} />
      <span className="absolute -top-2.5 -right-2.5 flex size-7 items-center justify-center rounded-full border-2 border-surface bg-surface font-display text-xs font-extrabold text-highlight">
        {number}
      </span>
    </span>
  )
}
