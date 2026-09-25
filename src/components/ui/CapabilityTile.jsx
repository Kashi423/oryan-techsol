import { cn } from '@/lib/cn'
import Card from './Card'

// Small icon + label chip for a dense capability grid (AI capabilities, app platform
// features, integration categories). Distinct from ServiceCard/FeatureCard's hover: these sit
// tightly packed in a grid, so a lift would look jittery — a background tint and icon pulse
// read as "alive" without disturbing the grid's layout.
export default function CapabilityTile({ icon: Icon, label, className }) {
  return (
    <Card
      padding="none"
      className={cn(
        'group flex h-full items-center gap-2.5 px-4 py-3 transition-colors duration-200 hover:bg-highlight/5 hover:border-highlight/40',
        className,
      )}
    >
      <Icon
        className="size-4 shrink-0 text-highlight transition-transform duration-200 group-hover:scale-125"
        aria-hidden="true"
      />
      <span className="font-display text-sm font-semibold text-fg">{label}</span>
    </Card>
  )
}
