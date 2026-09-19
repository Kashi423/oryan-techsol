import { cn } from '@/lib/cn'
import maskUrl from '@/assets/brand/logo-mark.webp'

// The Oryan network-ring mark, taken from the official artwork. logo-mark.webp is the artwork's
// ink coverage (alpha only); the colour comes from the tone's --mark-* gradient (see index.css),
// so it re-tints automatically inside tone="inverse". Decorative — pair it with text.
//
// `boost` stacks the mask to thicken hairlines for small sizes (header/footer use 3): each extra
// layer raises weak alpha (0.3 → 0.51 → 0.66) without another download. Use 1 for large display.
export default function LogoMark({ boost = 1, className, style, ...props }) {
  const mask = Array.from({ length: boost }, () => `url(${maskUrl})`).join(', ')

  return (
    <span
      aria-hidden="true"
      className={cn('logo-mark shrink-0', className)}
      style={{ WebkitMaskImage: mask, maskImage: mask, ...style }}
      {...props}
    />
  )
}
