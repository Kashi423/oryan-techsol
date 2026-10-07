import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import { useCms, useCmsSync } from '@/lib/cms/store'

// Home is bundled with the app shell (it is the landing page — no extra round trip).
// Every other page is code-split and loaded on navigation.
const NotFound = lazy(() => import('@/pages/NotFound'))
const CaseStudyDetail = lazy(() => import('@/pages/CaseStudyDetail'))
const AppDevelopment = lazy(() => import('@/pages/AppDevelopment'))
const AiBots = lazy(() => import('@/pages/AiBots'))
const WebDevelopment = lazy(() => import('@/pages/WebDevelopment'))
const CustomSoftware = lazy(() => import('@/pages/CustomSoftware'))
const BusinessAutomation = lazy(() => import('@/pages/BusinessAutomation'))
const Ecommerce = lazy(() => import('@/pages/Ecommerce'))
const SaasDevelopment = lazy(() => import('@/pages/SaasDevelopment'))
const ApiIntegrations = lazy(() => import('@/pages/ApiIntegrations'))
const Portfolio = lazy(() => import('@/pages/Portfolio'))
const About = lazy(() => import('@/pages/About'))
const Faq = lazy(() => import('@/pages/Faq'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))
const Contact = lazy(() => import('@/pages/Contact'))
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
