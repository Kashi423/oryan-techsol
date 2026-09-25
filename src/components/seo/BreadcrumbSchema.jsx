import { siteConfig } from '@/config/site'
import JsonLd from './JsonLd'

// BreadcrumbList structured data. `items` is [{ name, path }] in order from Home; Home
// itself should be included as the first entry.
export default function BreadcrumbSchema({ items }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: new URL(item.path, siteConfig.url).href,
        })),
      }}
    />
  )
}
