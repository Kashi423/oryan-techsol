import { slugify } from '@/lib/article'
import { Bars, Callout, Checklist, Compare, InlineCta, Stats, Steps, Table, Timeline } from './Infographics'
import RichText from './RichText'

// Renders a post's `blocks` array. Heading levels are fixed by block type (h2 → h3), so the
// outline stays valid: the page's single h1 is the hero title.
export default function ArticleBody({ blocks }) {
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={index} id={slugify(block.text)} className="mt-14 scroll-mt-28 text-2xl normal-case first:mt-0 sm:text-3xl">
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={index} className="mt-9 text-lg font-bold text-fg normal-case sm:text-xl">
                {block.text}
              </h3>
            )
          case 'p':
            return (
              <p key={index} className="mt-5 text-[1.0625rem] leading-[1.8] text-fg-muted">
                <RichText text={block.text} />
              </p>
            )
          case 'ul':
            return (
              <ul key={index} className="mt-5 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.75] text-fg-muted">
                    <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-highlight" />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={index} className="mt-5 space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.75] text-fg-muted">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-highlight/10 font-display text-xs font-bold text-highlight">
                      {itemIndex + 1}
                    </span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            )
          case 'callout':
            return <Callout key={index} {...block} />
          case 'stats':
            return <Stats key={index} {...block} />
          case 'steps':
            return <Steps key={index} {...block} />
          case 'bars':
            return <Bars key={index} {...block} />
          case 'compare':
            return <Compare key={index} {...block} />
          case 'table':
            return <Table key={index} {...block} />
          case 'checklist':
            return <Checklist key={index} {...block} />
          case 'timeline':
            return <Timeline key={index} {...block} />
          case 'cta':
            return <InlineCta key={index} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
