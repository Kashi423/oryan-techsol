import { siteConfig } from '@/config/site'

// Pinterest "Save" link for an article: opens Pinterest's own pin-creation dialog with the
// vertical pin image (public/pins/<slug>.jpg, made by scripts/og-images.mjs), so no third-party
// script runs on our pages.
export function pinterestSaveHref({ slug, title, path }) {
  const url = new URL(path, siteConfig.url).href
  const media = new URL(`/pins/${slug}.jpg`, siteConfig.url).href
  return `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(title)}`
}
