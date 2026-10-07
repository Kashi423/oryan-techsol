import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// @vitejs/plugin-react asks Vite to pre-bundle whichever JSX runtime it is pointed at. Ours is app
// source (it shares state with the rest of the app), so take it back out of that list — otherwise
// dev serves a stale, separately-bundled copy of it.
const cmsJsxStaysSource = {
  name: 'cms-jsx-stays-source',
  enforce: 'post',
  config(config) {
    if (config.optimizeDeps?.include) {
      config.optimizeDeps.include = config.optimizeDeps.include.filter((id) => !id.includes('cms-jsx'))
    }
  },
}

// https://vite.dev/config/
export default defineConfig({
  // A custom JSX runtime (src/lib/cms-jsx) lets the admin override any visible text; see
  // src/lib/cms/translate.js. It is referenced through the '@' alias (not as a bare package name)
  // so Vite treats it as app source — a bare name would be pre-bundled as a dependency in dev,
  // giving the runtime its own private copy of the text-override state.
  plugins: [react({ jsxImportSource: '@/lib/cms-jsx' }), tailwindcss(), cmsJsxStaysSource],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Local admin development: run the PHP API separately and point VITE_API_PROXY at it.
    proxy: process.env.VITE_API_PROXY
      ? {
          '/api': { target: process.env.VITE_API_PROXY, changeOrigin: true },
          '/uploads': { target: process.env.VITE_API_PROXY, changeOrigin: true },
        }
      : undefined,
  },
})
