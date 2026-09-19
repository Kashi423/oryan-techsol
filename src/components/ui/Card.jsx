import { cn } from '@/lib/cn'

// Base surface for grouped content. `interactive` adds the hover/focus treatment
// for cards that are (or contain) a link.
export default function Card({ as: Tag = 'div', interactive = false, className, ...props }) {
  return (
    <Tag
      className={cn(
        'relative rounded-2xl border border-line bg-surface-raised p-6 shadow-card sm:p-8',
        interactive &&
          'transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-highlight/50 has-[:focus-visible]:border-highlight',
        className,
      )}
      {...props}
    />
  )
}
