# Oryan Techsol website

Marketing site for Oryan Techsol — custom software, web development, AI bots and business automation.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · React Router 7 · Framer Motion · Lucide icons ·
Manrope + Lato (self-hosted via Fontsource)

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint
```

Requires Node 20.19+ (developed on Node 22).

Dev-only design-system reference: <http://localhost:5173/styleguide> (not included in production builds).

## Structure

```
index.html                 SEO defaults, JSON-LD, mount point
public/                    favicon, robots.txt, sitemap.xml
src/
  index.css                DESIGN TOKENS (colours, fonts, effects) + base styles
  main.jsx                 providers: router, lazy framer-motion, reduced-motion
  App.jsx                  route table (Home eager, other pages lazy)
  config/site.js           site name/URL/description, nav, footer links, primary CTA
  lib/cn.js                class-name joiner
  components/
    ui/                    design-system primitives (Button, Card, Section, …)
    layout/                Header, Footer, Layout shell, ScrollToTop
    brand/                 Logo (horizontal lockup), LogoMark (network ring), markGeometry
    seo/Seo.jsx            per-page <title>/meta/canonical/Open Graph
  pages/                   one file per route
```

## Conventions

- **Branding lives in `src/index.css` (`@theme`).** Components use semantic tokens
  (`bg-surface`, `text-fg`, `border-line`, `bg-primary`, `text-highlight`) — never raw palette
  values. The default Tailwind palette is disabled so off-brand colours can't slip in.
- **Two tones.** The site is light (navy text on white). Wrap any section in
  `<Section tone="inverse">` for a deep-navy band — the tokens swap, so buttons, cards, badges and
  the logo re-tint with no extra classes. The footer uses it too. `tone="muted"` gives the
  alternating light-grey band.
- **The logo lives in `components/brand/`** and is used only through `<Logo />` / `<LogoMark />`.
  - The **mark** is the official network ring: `src/assets/brand/logo-mark.webp` is its ink coverage
    (alpha only, derived from the flat logo PNG by reading the red channel, posterised to 10 levels
    → 34 KB), filled at runtime with the tone's `--mark-*` gradient. One asset serves light and navy.
    It is 552 px square — crisp to roughly that size; use a vector master for anything larger (print,
    social image).
  - The **wordmark** ("ORYAN" + "— TECHSOL —") is clean SVG rebuilt from measurements of the supplied
    SVG. The supplied SVG itself was not shipped: it is a pixel trace with stair-stepped edges, a
    broken "R" and most of the mesh lines missing.
  - `public/favicon.svg` is a simplified 16-node version of the ring for tab sizes.
- **Colours** `brand-900` (#051C4E), `brand-500` (#10A1C6) and `accent-400` (#0FD1E8) are sampled
  from the logo artwork; other steps are derived. Contrast was checked to WCAG AA for every
  text/background pair.
- **Headings** (h1/h2) are bold uppercase Manrope, matching the brand collateral. Keep them short;
  the rule lives in `src/index.css` (`text-transform`) if that ever needs to change.
- **Typography:** Manrope (headings and UI labels — h1–h4 and `font-display`) and Lato (body copy).
- **Every page** renders `<Seo title="…" description="…" />` and wraps content in `<Section>`.
- **Reuse before creating.** Check `src/components/ui/` first; add new primitives there and
  export them from `ui/index.js`.
- **Navigation, footer links and the header CTA** come from `src/config/site.js`.
- **New page:** create `src/pages/X.jsx`, add a lazy route in `App.jsx`, add it to `navItems` and
  `public/sitemap.xml`.
- **Motion:** use `m.*` (not `motion.*`) and the `<Reveal>` wrapper; reduced-motion is handled globally.
- `Button` `className` is for layout only (margins, width) — see the comment in `Button.jsx`.

## Configuration

`.env` → `VITE_SITE_URL` sets canonical URLs, Open Graph and structured data. `public/robots.txt`
and `public/sitemap.xml` are static files and must be updated with the same domain.
