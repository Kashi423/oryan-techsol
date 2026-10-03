import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Seo from '@/components/seo/Seo'
import { Card, Reveal, Section, SectionHeading, Tag } from '@/components/ui'
import { posts } from '@/data/posts'

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog"
        description="Practical guides on app development, AI bots, custom software, API integrations and business automation from the Oryan Techsol team."
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      <Section spacing="hero">
        <Reveal>
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Blog"
            title="Practical guides for building with technology."
            description="Plain-English advice on apps, software, AI and automation — written for business owners making real decisions."
            className="mx-auto"
          />
        </Reveal>
      </Section>

      <Section tone="muted">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col">
                  <Tag>{post.category}</Tag>
                  <h2 className="mt-4 font-display text-xl font-bold text-fg">{post.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-fg-muted">{post.description}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-fg-subtle">
                    <span>
                      {formatDate(post.date)} · {post.readMinutes} min read
                    </span>
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
