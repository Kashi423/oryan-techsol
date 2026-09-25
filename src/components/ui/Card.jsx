import { cn } from '@/lib/cn'

const paddings = {
  md: 'p-6 sm:p-8',
  none: '',
}

const surfaces = {
  // The normal card surface — a step up from the page background, so it fills correctly
  // whether the page is light or (via <Section tone="inverse">) already dark.
  raised: 'bg-surface-raised',
  // For a card that sets data-tone="inverse" itself while its surroundings stay light
  // (e.g. one featured card in an otherwise light grid): --color-surface-raised is a
  // near-transparent overlay meant to sit on an already-dark backdrop, so it reads as
  // washed-out here. bg-surface is the solid navy instead.
  solid: 'bg-surface',
}

// Base surface for grouped content. `interactive` adds the hover/focus treatment
// for cards that are (or contain) a link. `padding="none"` for cards that manage their
// own internal spacing (e.g. an image bleeding to the card's edge) — set it instead of
// fighting the default padding with className, since classes don't override, they stack.
export default function Card({
  as: Tag = 'div',
  interactive = false,
  padding = 'md',
  surface = 'raised',
  className,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'relative rounded-2xl border border-line shadow-card',
        surfaces[surface],
        paddings[padding],
        interactive &&
          'transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-highlight/50 has-[:focus-visible]:border-highlight',
        className,
      )}
      {...props}
    />
  )
}
