import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { siteConfig } from '@/config/site'

// Per-page <head> metadata. Render once near the top of every page component.
// React 19 hoists <title>, <meta> and <link> rendered anywhere into <head>, so no
// helmet library is needed.
export default function Seo({ title, description = siteConfig.description, image, noindex = false }) {
  const { pathname } = useLocation()

  // index.html ships static defaults (tagged data-seo-default) for crawlers and link
  // scrapers that don't run JS. Once a page provides its own tags, drop the defaults
  // so <head> never holds two titles or conflicting descriptions.
  useEffect(() => {
    document.head.querySelectorAll('[data-seo-default]').forEach((el) => el.remove())
  }, [])

  const url = new URL(pathname, siteConfig.url).href
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle
  const imageUrl = image ? new URL(image, siteConfig.url).href : undefined

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </>
  )
}
