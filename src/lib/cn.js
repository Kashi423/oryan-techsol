// Joins class names, skipping falsy values: cn('a', cond && 'b', ['c']) → 'a b c'.
// Components are written so variants never conflict, so no tailwind-merge needed.
export function cn(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(' ')
}
