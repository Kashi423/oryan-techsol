import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { LazyMotion, MotionConfig } from 'framer-motion'
import App, { preloadRoute } from './App.jsx'
import './index.css'

const loadMotionFeatures = () => import('./lib/motionFeatures.js').then((mod) => mod.default)

// Fetch the current page's code first, so the first client render matches the pre-rendered HTML.
preloadRoute(window.location.pathname).then(() => createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* `strict` makes accidental use of the heavier `motion.*` components throw — use `m.*`. */}
      <LazyMotion features={loadMotionFeatures} strict>
        {/* Users with "reduce motion" enabled get no transform animations. */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>,
))
