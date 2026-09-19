import { cn } from '@/lib/cn'

// The one place page width and horizontal gutters are defined.
export default function Container({ as: Tag = 'div', className, ...props }) {
  return <Tag className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />
}
