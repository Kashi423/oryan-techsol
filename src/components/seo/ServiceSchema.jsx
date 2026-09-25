import { siteConfig } from '@/config/site'
import JsonLd from './JsonLd'

// Service structured data for a service page. `path` is the page's own route (e.g.
// "/ai-bots"); kept deliberately minimal — name, description, provider — rather than
// adding fields (price, area served, ratings…) that aren't actually backed by real data.
export default function ServiceSchema({ name, description, path }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url: new URL(path, siteConfig.url).href,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
      }}
    />
  )
}
