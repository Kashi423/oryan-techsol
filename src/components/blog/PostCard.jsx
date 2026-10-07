import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router'
import { Card } from '@/components/ui'
import { formatDate } from '@/lib/format'

// Article teaser card — used on the blog index and in "Keep reading" lists. The whole card
// is one link (heading text is the anchor text), with a category-coloured top accent.
export default function PostCard({ post, featured = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight">
      <Card interactive padding="none" className="flex h-full flex-col overflow-hidden">
        {post.cover ? (
          <div className={`relative overflow-hidden bg-brand-950 ${featured ? 'aspect-[16/9] sm:aspect-[21/8]' : 'aspect-[16/9]'}`}>
            <img
              src={post.cover.src}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-4 rounded-md bg-accent-400 px-2.5 py-1 font-display text-[11px] font-bold tracking-wide text-brand-950 uppercase">
              {post.category}
            </span>
          </div>
        ) : (
        <div
          aria-hidden="true"
          className="relative h-28 overflow-hidden bg-linear-to-br from-brand-950 via-brand-900 to-brand-700"
        >
          <div className="bg-grid absolute inset-0 opacity-60" data-tone="inverse" />
          <svg viewBox="0 0 100 100" className="absolute -right-6 -bottom-8 size-36 text-accent-400" fill="none">
            <polygon points="50,2 96,26 96,74 50,98 4,74 4,26" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
            <polygon
              points="50,2 96,26 96,74 50,98 4,74 4,26"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1"
              transform="translate(50 50) scale(0.62) translate(-50 -50)"
            />
          </svg>
          <span className="absolute bottom-4 left-5 rounded-md bg-accent-400 px-2.5 py-1 font-display text-[11px] font-bold tracking-wide text-brand-950 uppercase">
            {post.category}
          </span>
        </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <h2 className={featured ? 'text-xl normal-case sm:text-2xl' : 'text-lg normal-case'}>
            <span className="transition-colors group-hover:text-highlight">{post.title}</span>
          </h2>
          <p className="mt-3 flex-1 leading-relaxed text-fg-muted">{post.description}</p>
          <div className="mt-5 flex items-center justify-between text-sm text-fg-subtle">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              <time dateTime={post.updated ?? post.date}>{formatDate(post.updated ?? post.date)}</time> · {post.readMinutes} min read
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </Card>
    </Link>
  )
}

