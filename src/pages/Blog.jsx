import { useState } from 'react'
import { BookOpen, Clock, Layers } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import JsonLd from '@/components/seo/JsonLd'
import Seo from '@/components/seo/Seo'
import PostCard from '@/components/blog/PostCard'
import { Button, Reveal, Section } from '@/components/ui'
import { primaryCta, siteConfig } from '@/config/site'
import { usePosts } from '@/lib/cms/store'
import { cn } from '@/lib/cn'

export default function Blog() {
  const posts = usePosts()
  const categories = ['All', ...new Set(posts.map((post) => post.category).filter(Boolean))]
  const totalMinutes = posts.reduce((sum, post) => sum + post.readMinutes, 0)
  const [category, setCategory] = useState('All')
  const visible = category === 'All' ? posts : posts.filter((post) => post.category === category)
  const [featured, ...rest] = visible

  return (
    <>
      <Seo
        title="Blog — Guides on Apps, AI, Software & Automation"
        description="In-depth, practical guides on mobile app development, AI bots and agents, custom software, API integrations and business automation from the Oryan Techsol team."
        keywords="app development blog, AI chatbot guide, custom software guide, API integration guide, business automation blog"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteConfig.name} Blog`,
          url: new URL('/blog', siteConfig.url).href,
          description: 'Practical guides on app development, AI, custom software, integrations and automation.',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts.map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: new URL(`/blog/${post.slug}`, siteConfig.url).href,
              name: post.title,
            })),
          },
        }}
      />

      <PageHero
        eyebrow="Blog & guides"
        icon={BookOpen}
        title="Practical guides for building with"
        accent="technology."
        description="In-depth, plain-English advice on apps, software, AI and automation — written for business owners who are making real decisions, not chasing buzzwords."
        crumbs={[{ name: 'Blog' }]}
        meta={[
          { icon: BookOpen, label: `${posts.length} in-depth guides` },
          { icon: Layers, label: `${categories.length - 1} topics` },
          { icon: Clock, label: `${totalMinutes} min of reading` },
        ]}
        actions={
          <Button href="#articles" size="lg">
            Browse the guides
          </Button>
        }
      />

      <Section id="articles" tone="muted" aria-labelledby="articles-title">
        <h2 id="articles-title" className="sr-only">
          All articles
        </h2>

        <fieldset className="m-0 flex min-w-0 flex-wrap justify-center gap-2 border-0 p-0">
          <legend className="sr-only">Filter articles by topic</legend>
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className={cn(
                'rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors',
                category === name
                  ? 'border-primary bg-primary text-primary-fg shadow-button'
                  : 'border-line-strong bg-surface-raised text-fg-muted hover:text-fg',
              )}
            >
              {name}
            </button>
          ))}
        </fieldset>

        {featured && (
          <Reveal className="mt-10">
            <PostCard post={featured} featured />
          </Reveal>
        )}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.04} className="h-full">
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="inverse" aria-labelledby="blog-cta-title">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="blog-cta-title" className="text-2xl sm:text-3xl">
              Have a question we haven’t covered?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fg-muted">
              Tell us what you’re trying to build or fix — we’ll answer honestly, and your question might become our next guide.
            </p>
            <Button to={primaryCta.to} size="lg" className="mt-8">
              {primaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
