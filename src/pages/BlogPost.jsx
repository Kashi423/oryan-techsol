import { Link, useParams } from 'react-router'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import JsonLd from '@/components/seo/JsonLd'
import Seo from '@/components/seo/Seo'
import { Button, Reveal, Section, SectionHeading } from '@/components/ui'
import { primaryCta, siteConfig } from '@/config/site'
import { getPostBySlug, posts } from '@/data/posts'
import NotFound from './NotFound'

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

// /blog/:slug — reads from the shared posts data (src/data/posts.js).
export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <NotFound />

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Seo title={post.title} description={post.description} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          mainEntityOfPage: new URL(`/blog/${post.slug}`, siteConfig.url).href,
          author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
          publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        }}
      />

      <Section spacing="hero">
        <Reveal>
          <SectionHeading
            as="h1"
            align="center"
            eyebrow={`${post.category} · ${formatDate(post.date)} · ${post.readMinutes} min read`}
            title={post.title}
            className="mx-auto"
          />
        </Reveal>
      </Section>

      <Section tone="muted">
        <article className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-fg">{post.intro}</p>

          {post.sections.map((section) => (
            <div key={section.heading} className="mt-10">
              <h2 className="font-display text-2xl font-bold text-fg">{section.heading}</h2>
              {section.paragraphs?.map((text) => (
                <p key={text} className="mt-4 leading-relaxed text-fg-muted">
                  {text}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-fg-muted marker:text-highlight">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-12 rounded-2xl border border-line-strong bg-surface p-6">
            <h2 className="font-display text-lg font-bold text-fg">Need help with this?</h2>
            <p className="mt-2 leading-relaxed text-fg-muted">
              Learn about our{' '}
              <Link to={post.related.to} className="font-semibold text-highlight underline">
                {post.related.label}
              </Link>
              , or tell us what you are planning and we will give you an honest recommendation.
            </p>
            <div className="mt-4">
              <Button to={primaryCta.to}>{primaryCta.label}</Button>
            </div>
          </div>
        </article>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-xl font-bold text-fg">More from the blog</h2>
          <ul className="mt-4 space-y-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="text-fg-muted underline hover:text-fg">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
