import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'

// Home is bundled with the app shell (it is the landing page — no extra round trip).
// Every other page is code-split and loaded on navigation.
const NotFound = lazy(() => import('@/pages/NotFound'))
// Dev-only component reference; excluded from production builds.
const Styleguide = import.meta.env.DEV ? lazy(() => import('@/pages/Styleguide')) : null

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {Styleguide && <Route path="styleguide" element={<Styleguide />} />}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
