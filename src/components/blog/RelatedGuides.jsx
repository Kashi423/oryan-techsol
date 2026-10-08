import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import PostCard from '@/components/blog/PostCard'
import { Reveal, Section, SectionHeading } from '@/components/ui'
import { usePosts } from '@/lib/cms/store'

// "Guides" strip for a service page: the newest published articles tagged with this service, so
// every service page links to its supporting articles (and they link back via the article CTA).
// Renders nothing when no article has been tagged for the page yet.
export default function RelatedGuides({ path }) {
  const guides = usePosts()
    .filter((post) => post.service?.to === path)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
  if (guides.length === 0) return null

  return (
    <Section tone="default" spacing="default" aria-labelledby="guides-title">
      <SectionHeading
        as="h2"
        id="guides-title"
        eyebrow="Guides"
        align="center"
        title="Read before you build."
        description="Plain-English guides from our team on choosing, planning and budgeting this kind of project."
      />
      <Reveal delay={0.05}>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link to="/blog" className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-highlight hover:underline">
            See all guides
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </Reveal>
    </Section>
  )
}
