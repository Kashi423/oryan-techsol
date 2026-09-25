import { cn } from '@/lib/cn'
import Card from './Card'

// Bolder sibling of FeatureCard for a grid where every item is a peer type/category (e.g.
// "kinds of websites we build") rather than a handful of differentiators. Dark surface (like
// the homepage's featured AI card) instead of another white box, a gradient icon badge and a
// background watermark for presence, and a combined lift + zoom on hover — deliberately more
// tactile than the plain border-highlight treatment used elsewhere, since this grid is the
// visual centrepiece of the page rather than a supporting list.
//
// h-full so the card fills its grid cell: callers put `auto-rows-fr` on the grid (and
// className="h-full" on the Reveal wrapper), which makes every row as tall as the tallest
// card — equal heights across rows, not just within one, without a fixed height that either
// clips longer descriptions in narrow 4-column grids or leaves big empty cards on mobile.
export default function TypeCard({ icon: Icon, title, description, className }) {
  return (
    <Card
      data-tone="inverse"
      surface="solid"
      className={cn(
        // Card's own shadow-card utility reads --shadow-card-value, which this project sets to
        // "none" in the inverse/dark tone (a shadow doesn't read well on a dark surface by
        // default) — so a competing shadow-[...] utility here would lose the cascade to that
        // rule regardless of source order (same property, same specificity, shadow-card's rule
        // comes later in the stylesheet). Overriding the variable itself means shadow-card's
        // own rule produces the shadow we want, instead of fighting it.
        'group relative flex h-full min-h-56 flex-col overflow-hidden [--shadow-card-value:0_20px_45px_-15px_rgb(3_15_45_/_0.5)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:[--shadow-card-value:0_28px_60px_-12px_rgb(3_15_45_/_0.6)]',
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute -top-5 -right-5 size-24 rotate-12 text-highlight/10 transition-transform duration-500 group-hover:rotate-[18deg] group-hover:scale-110"
      />
      <span className="relative mb-5 inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white shadow-button">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="relative text-lg text-fg">{title}</h3>
      <p className="relative mt-2 leading-relaxed text-fg-muted">{description}</p>
    </Card>
  )
}
