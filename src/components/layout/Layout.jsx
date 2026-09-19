import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

// App shell shared by every page. Header/Footer stay mounted while a page chunk loads.
export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-primary-fg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
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
