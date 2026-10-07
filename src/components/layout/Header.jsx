import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Bot, ChevronDown, Code2, Layers, LayoutGrid, Menu, Plug2, ShoppingCart, Smartphone, Workflow, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router'
import Logo from '@/components/brand/Logo'
import { Button, Container } from '@/components/ui'
import {
  navItems,
  primaryCta,
  siteConfig,
  transparentHeaderPrefixes,
  transparentHeaderRoutes,
} from '@/config/site'
import { cn } from '@/lib/cn'

const serviceIcons = {
  smartphone: Smartphone,
  bot: Bot,
  code: Code2,
  layers: Layers,
  workflow: Workflow,
  shoppingCart: ShoppingCart,
  layoutGrid: LayoutGrid,
  plug: Plug2,
}

// Pill-style nav: items sit inside one bordered capsule; the current page is a filled pill.
const pillBase = 'rounded-full px-5 py-2 font-display text-sm font-semibold transition-colors'
const pillActive = 'bg-primary text-primary-fg shadow-button'
const pillIdle = 'text-fg hover:bg-surface-overlay'

const desktopLink = ({ isActive }) => cn(pillBase, isActive ? pillActive : pillIdle)

const mobileLink = ({ isActive }) =>
  cn(
    'rounded-lg px-3 py-3 font-display text-base font-semibold transition-colors hover:bg-surface-raised',
    isActive ? 'text-fg' : 'text-fg-muted',
  )

// Desktop-only disclosure for the Services item. Opens on hover (with a short close delay
// so crossing the gap to the panel doesn't dismiss it) and on click/Enter/Space for
// keyboard and touch users; Escape or a click outside closes it and returns focus.
function ServicesMenu({ item }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const active = item.items.some((sub) => sub.to === pathname)
  const closeTimer = useRef(null)
  const rootRef = useRef(null)
  const triggerId = 'nav-services-trigger'
  const panelId = 'nav-services-panel'

  const openNow = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }
  const closeNow = () => {
    clearTimeout(closeTimer.current)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeNow()
        document.getElementById(triggerId)?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) closeNow()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        id={triggerId}
        type="button"
        className={cn(pillBase, active ? pillActive : pillIdle, 'inline-flex items-center gap-1')}
        aria-expanded={open}
        aria-controls={panelId}
        // Not a toggle: hovering onto this button already opens the panel (onMouseEnter
        // fires before a click's mouseup), so a click here would immediately re-close it.
        // Click always ensures it's open; Escape / outside click / choosing a link close it.
        onClick={openNow}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            data-tone="default"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 z-50 mt-4 w-[22rem] -translate-x-1/2 rounded-3xl border border-line-strong bg-surface p-2 shadow-card"
          >
            <ul>
              {item.items.map((sub) => {
                const Icon = serviceIcons[sub.icon]
                return (
                  <li key={sub.to}>
                    <Link
                      to={sub.to}
                      onClick={closeNow}
                      className="group flex items-center gap-3 rounded-full py-2 pr-4 pl-2 transition-colors hover:bg-surface-overlay"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-highlight/10 text-highlight transition-colors group-hover:bg-primary group-hover:text-primary-fg">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-display text-sm font-semibold text-fg">{sub.label}</span>
                        <span className="mt-0.5 block text-xs text-fg-subtle">{sub.description}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DesktopNav() {
  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-1 rounded-full border border-line-strong bg-surface-raised/60 p-1.5 backdrop-blur-md lg:flex"
    >
      {navItems.map((item) =>
        item.items ? (
          <ServicesMenu key={item.label} item={item} />
        ) : (
          <NavLink key={item.to} to={item.to} className={desktopLink}>
            {item.label}
          </NavLink>
        ),
      )}
    </nav>
  )
}

// Mobile panel: flat links plus an accordion for Services so all four sub-pages stay
// reachable without a second-level nested menu on a small screen.
function MobileNav({ onNavigate }) {
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <Container className="flex flex-col gap-1 py-4">
      {navItems.map((item) =>
        item.items ? (
          <div key={item.label}>
            <button
              type="button"
              className={cn(mobileLink({ isActive: false }), 'flex w-full items-center justify-between')}
              aria-expanded={servicesOpen}
              aria-controls="mobile-services-panel"
              onClick={() => setServicesOpen((current) => !current)}
            >
              {item.label}
              <ChevronDown
                aria-hidden="true"
                className={cn('size-4 transition-transform duration-200', servicesOpen && 'rotate-180')}
              />
            </button>
            <AnimatePresence initial={false}>
              {servicesOpen && (
                <m.div
                  id="mobile-services-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <ul className="ml-3 border-l border-line py-1 pl-3">
                    {item.items.map((sub) => (
                      <li key={sub.to}>
                        <NavLink
                          to={sub.to}
                          onClick={onNavigate}
                          className={({ isActive }) =>
                            cn(
                              'block rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-colors',
                              isActive ? pillActive : 'text-fg-muted hover:bg-surface-raised',
                            )
                          }
                        >
                          {sub.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <NavLink key={item.to} to={item.to} className={mobileLink} onClick={onNavigate}>
            {item.label}
          </NavLink>
        ),
      )}
      <Button to={primaryCta.to} size="lg" className="mt-3" onClick={onNavigate}>
        {primaryCta.label}
      </Button>
    </Container>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  // The mobile menu is "open" only for the route it was opened on, so navigating
  // (links, back/forward) closes it without needing an effect.
  const [openAt, setOpenAt] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const open = openAt === pathname

  const canOverlay =
    transparentHeaderRoutes.includes(pathname) ||
    transparentHeaderPrefixes.some((prefix) => pathname.startsWith(prefix))
  const overlay = canOverlay && !scrolled && !open

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setOpenAt(null)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!canOverlay) return undefined
    let ticking = false
    const evaluate = () => {
      setScrolled(window.scrollY > 8)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(evaluate)
    }
    evaluate()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [canOverlay, pathname])

  return (
    <header
      data-tone={overlay ? 'inverse' : undefined}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        overlay ? 'border-transparent bg-transparent' : 'border-line bg-surface/80 backdrop-blur-lg',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" aria-label={`${siteConfig.name} — home`} className="rounded-md">
          <Logo />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            {/* Tone tokens alone give the right contrast: navy button on the light header,
                bright cyan on the transparent/inverse one — no variant switch needed. */}
            <Button to={primaryCta.to} pill size="lg">
              {primaryCta.label}
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenAt(open ? null : pathname)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Mobile"
            data-tone="default"
            className="border-t border-line bg-surface lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <MobileNav onNavigate={() => setOpenAt(null)} />
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
