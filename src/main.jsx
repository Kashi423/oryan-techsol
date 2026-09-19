import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { LazyMotion, MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

const loadMotionFeatures = () => import('./lib/motionFeatures.js').then((mod) => mod.default)

createRoot(document.getElementById('root')).render(
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
)
