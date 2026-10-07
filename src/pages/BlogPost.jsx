import { ArrowRight, CalendarDays, Clock, FileText, Lightbulb } from 'lucide-react'
import { Link, useParams } from 'react-router'
import ArticleBody from '@/components/blog/ArticleBody'
import PostCard from '@/components/blog/PostCard'
import ReadingProgress from '@/components/blog/ReadingProgress'
import RichText from '@/components/blog/RichText'
import ShareRow from '@/components/blog/ShareRow'
import TableOfContents from '@/components/blog/TableOfContents'
import PageHero from '@/components/layout/PageHero'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import JsonLd from '@/components/seo/JsonLd'
import Seo from '@/components/seo/Seo'
import { Accordion, Button, Reveal, Section } from '@/components/ui'
import { primaryCta, siteConfig } from '@/config/site'
import { getPostBySlug, getRelatedPosts } from '@/data/posts'
import { usePosts } from '@/lib/cms/store'
import { tocFromBlocks } from '@/lib/article'
import { formatDate } from '@/lib/format'
import NotFound from './NotFound'

// /blog/:slug — long-form article. Everything an article needs for search lives here:
// one h1 (the hero), a real h2 outline with a jump-link table of contents, BlogPosting +
// FAQPage + Breadcrumb structured data, visible dates, internal links to related guides and
// the matching service page, and a share row.
export default function BlogPost() {
  const { slug } = useParams()
  const posts = usePosts()
  const post = getPostBySlug(slug, posts)

  if (!post) return <NotFound />

  const toc = tocFromBlocks(post.blocks)
  const related = getRelatedPosts(post, posts)
  const path = `/blog/${post.slug}`
  const url = new URL(path, siteConfig.url).href
  const image = post.image || `/og/${post.slug}.jpg`

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        keywords={post.keywords}
        image={image}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.updated}
        section={post.category}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.shortTitle, path },
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          image: new URL(image, siteConfig.url).href,
          datePublished: post.date,
          dateModified: post.updated,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          articleSection: post.category,
          keywords: post.keywords,
          wordCount: post.wordCount,
          inLanguage: 'en-US',
          author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
          publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <FaqSchema faqs={post.faqs} />
      <ReadingProgress targetId="article-content" />

      <PageHero
        size="md"
        eyebrow={post.category}
        icon={FileText}
        title={post.title}
        description={post.description}
        crumbs={[{ name: 'Blog', to: '/blog' }, { name: post.shortTitle }]}
        meta={[
          { icon: CalendarDays, label: `Updated ${formatDate(post.updated)}` },
          { icon: Clock, label: `${post.readMinutes} min read` },
          { icon: FileText, label: `${post.wordCount.toLocaleString('en-US')} words` },
        ]}
      />

      <Section tone="default" spacing="default" className="pt-12 sm:pt-14 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] xl:grid-cols-[minmax(0,1fr)_19rem]">
          <article id="article-content" className="min-w-0 max-w-3xl">
            <p className="text-lg leading-relaxed font-medium text-fg sm:text-xl">
              <RichText text={post.intro} />
            </p>

            <aside
              aria-labelledby="takeaways-title"
              className="mt-8 rounded-3xl border border-highlight/30 bg-highlight/5 p-6 sm:p-8"
            >
              <p
                id="takeaways-title"
                className="flex items-center gap-2 font-display text-xs font-bold tracking-[0.2em] text-highlight uppercase"
              >
                <Lightbulb className="size-4" aria-hidden="true" />
                Key takeaways
              </p>
              <ul className="mt-4 space-y-3">
                {post.takeaways.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-relaxed text-fg">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-highlight" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <TableOfContents items={toc} variant="inline" />

            <div className="mt-10">
              <ArticleBody blocks={post.blocks} />
            </div>

            <section aria-labelledby="faq-title" className="mt-16">
              <h2 id="faq-title" className="text-2xl normal-case sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6">
                <Accordion items={post.faqs} />
              </div>
            </section>

            <div className="mt-14 border-t border-line pt-6">
              <ShareRow path={path} title={post.title} />
            </div>

            <div
              data-tone="inverse"
              className="relative mt-10 overflow-hidden rounded-3xl border border-line-strong bg-surface p-7 text-fg sm:p-9"
            >
              <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative">
                <h2 className="text-2xl normal-case">Ready to talk it through?</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-fg-muted">
                  Tell us what you’re planning and we’ll give you an honest recommendation — no pressure, no jargon.
                  You can also explore our{' '}
                  <Link to={post.service.to} className="font-semibold text-highlight underline underline-offset-2">
                    {post.service.label.toLowerCase()}
                  </Link>
                  .
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button to={primaryCta.to} size="lg">
                    {primaryCta.label}
                    <ArrowRight aria-hidden="true" />
                  </Button>
                  <Button to={post.service.to} variant="secondary" size="lg">
                    {post.service.label}
                  </Button>
                </div>
              </div>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <TableOfContents items={toc} />
              <div className="rounded-2xl border border-line bg-surface-raised p-5 shadow-card">
                <p className="font-display text-sm font-bold text-fg">Need help with this?</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  Get a straight answer from the team that builds this for a living.
                </p>
                <Button to={primaryCta.to} className="mt-4 w-full">
                  {primaryCta.label}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="muted" aria-labelledby="related-title">
          <Reveal>
            <h2 id="related-title" className="text-2xl normal-case sm:text-3xl">
              Keep reading
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05} className="h-full">
                <PostCard post={item} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
