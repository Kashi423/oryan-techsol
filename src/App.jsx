import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import { useCms, useCmsSync } from '@/lib/cms/store'

// Code-split page. `page()` behaves like React.lazy, with one difference: once the chunk has been
// preloaded (see preloadRoute, called before the first render in main.jsx) it renders synchronously.
// The site ships pre-rendered HTML that the client replaces on load; without this the swap went
// through an empty Suspense placeholder, which blanked the page and moved the footer (CLS ~0.4).
const loadedPages = new Map()
const pageLoaders = new Map()
function page(name, loader) {
  const load = () => loader().then((mod) => (loadedPages.set(name, mod.default), mod))
  pageLoaders.set(name, load)
  const Lazy = lazy(load)
  return function Page(props) {
    const Loaded = loadedPages.get(name)
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />
  }
}

const routePages = {
  '/app-development': 'AppDevelopment',
  '/ai-bots': 'AiBots',
  '/web-development': 'WebDevelopment',
  '/custom-software': 'CustomSoftware',
  '/business-automation': 'BusinessAutomation',
  '/ecommerce': 'Ecommerce',
  '/saas-development': 'SaasDevelopment',
  '/api-integrations': 'ApiIntegrations',
  '/portfolio': 'Portfolio',
  '/about': 'About',
  '/faq': 'Faq',
  '/blog': 'Blog',
  '/privacy': 'Privacy',
  '/terms': 'Terms',
  '/contact': 'Contact',
}

/** Starts loading (and resolves when ready) the code for the page at `pathname`. Never rejects. */
export function preloadRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/' || path.startsWith('/admin')) return Promise.resolve()
  const name = routePages[path] ?? (/^\/blog\/[^/]+$/.test(path) ? 'BlogPost' : /^\/portfolio\/[^/]+$/.test(path) ? 'CaseStudyDetail' : 'NotFound')
  return pageLoaders.get(name)().catch(() => {})
}

// Home is bundled with the app shell (it is the landing page — no extra round trip).
// Every other page is code-split and loaded on navigation.
const NotFound = page('NotFound', () => import('@/pages/NotFound'))
const CaseStudyDetail = page('CaseStudyDetail', () => import('@/pages/CaseStudyDetail'))
const AppDevelopment = page('AppDevelopment', () => import('@/pages/AppDevelopment'))
const AiBots = page('AiBots', () => import('@/pages/AiBots'))
const WebDevelopment = page('WebDevelopment', () => import('@/pages/WebDevelopment'))
const CustomSoftware = page('CustomSoftware', () => import('@/pages/CustomSoftware'))
const BusinessAutomation = page('BusinessAutomation', () => import('@/pages/BusinessAutomation'))
const Ecommerce = page('Ecommerce', () => import('@/pages/Ecommerce'))
const SaasDevelopment = page('SaasDevelopment', () => import('@/pages/SaasDevelopment'))
const ApiIntegrations = page('ApiIntegrations', () => import('@/pages/ApiIntegrations'))
const Portfolio = page('Portfolio', () => import('@/pages/Portfolio'))
const About = page('About', () => import('@/pages/About'))
const Faq = page('Faq', () => import('@/pages/Faq'))
const Blog = page('Blog', () => import('@/pages/Blog'))
const BlogPost = page('BlogPost', () => import('@/pages/BlogPost'))
const Privacy = page('Privacy', () => import('@/pages/Privacy'))
const Terms = page('Terms', () => import('@/pages/Terms'))
const Contact = page('Contact', () => import('@/pages/Contact'))

// Private admin area (leads, blog editor, …) — a separate lazy chunk that normal visitors never download.
const AdminApp = lazy(() => import('@/admin/AdminApp'))
// The on-site text editor for signed-in admins (src/admin/EditToolbar.jsx). Separate lazy chunk,
// loaded only in browsers carrying the "admin signed in" marker, so visitors never download it and
// the prerendered HTML never contains it. It lives OUTSIDE <Routes key=…> on purpose: editing text
// remounts the route tree, and the toolbar must survive that.
const EditToolbar = lazy(() => import('@/admin/EditToolbar'))

function AdminBarLoader() {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  useEffect(() => {
    try {
      // oxlint-disable-next-line react/set-state-in-effect -- reads browser-only state once on mount
      if (window.localStorage.getItem('oryan_cms_admin') === '1' || new URLSearchParams(window.location.search).has('cms-edit')) setShow(true)
    } catch {
      // Storage blocked: no admin bar, nothing else changes.
    }
  }, [])
  if (!show || pathname.startsWith('/admin')) return null
  return (
    <Suspense fallback={null}>
      <EditToolbar />
    </Suspense>
  )
}

// Dev-only component reference; excluded from production builds.
const Styleguide = import.meta.env.DEV ? lazy(() => import('@/pages/Styleguide')) : null

export default function App() {
  const { pathname } = useLocation()
  // Remounts the route tree when live admin content (text edits, menu, settings) arrives.
  const remountKey = useCms((state) => state.remountKey)
  useCmsSync(!pathname.startsWith('/admin'))

  return (
    <>
      <AdminBarLoader />
        <Routes key={remountKey}>
        <Route
          path="admin/*"
          element={
            <Suspense fallback={<div className="min-h-dvh bg-surface-muted" aria-hidden="true" />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="app-development" element={<AppDevelopment />} />
          <Route path="ai-bots" element={<AiBots />} />
          <Route path="web-development" element={<WebDevelopment />} />
          <Route path="custom-software" element={<CustomSoftware />} />
          <Route path="business-automation" element={<BusinessAutomation />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="saas-development" element={<SaasDevelopment />} />
          <Route path="api-integrations" element={<ApiIntegrations />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<Faq />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          {/* Superseded by the flat routes above — kept so any link still pointing at the
              old nested path (bookmarks, external references) lands on the real page. */}
          <Route path="services/ai-bots-automation" element={<Navigate to="/ai-bots" replace />} />
          <Route path="services/web-development" element={<Navigate to="/web-development" replace />} />
          <Route path="services/custom-software" element={<Navigate to="/custom-software" replace />} />
          <Route path="services/business-automation" element={<Navigate to="/business-automation" replace />} />
          <Route path="services/saas-web-applications" element={<Navigate to="/saas-development" replace />} />
          <Route path="services/api-integrations" element={<Navigate to="/api-integrations" replace />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<CaseStudyDetail />} />
          {Styleguide && <Route path="styleguide" element={<Styleguide />} />}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
