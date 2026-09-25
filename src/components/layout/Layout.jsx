import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { transparentHeaderRoutes } from '@/config/site'
import { cn } from '@/lib/cn'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

// App shell shared by every page. Header/Footer stay mounted while a page chunk loads.
//
// Header is fixed (out of document flow) so it can overlay a dark hero and stay pinned
// while scrolling. That means every other page needs top padding equal to its height to
// avoid content starting underneath it — except the hero routes it's designed to overlay,
// which intentionally start at y=0. Keep this h-16/lg:h-20 in sync with Header's own.
export default function Layout() {
  const { pathname } = useLocation()
  const overlaysHero = transparentHeaderRoutes.includes(pathname)

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-primary-fg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className={cn('flex-1', !overlaysHero && 'pt-16 lg:pt-20')}>
        {/* Reserve height while a lazy page loads so the footer doesn't jump. */}
        <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
