import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router'
import Logo from '@/components/brand/Logo'
import { Button, Container } from '@/components/ui'
import { navItems, primaryCta, siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

const desktopLink = ({ isActive }) =>
  cn(
    'rounded-md px-3 py-2 font-display text-sm font-semibold transition-colors',
    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
  )

const mobileLink = ({ isActive }) =>
  cn(
    'rounded-lg px-3 py-3 font-display text-base font-semibold transition-colors hover:bg-surface-raised',
    isActive ? 'text-fg' : 'text-fg-muted',
  )

function NavLinks({ linkClassName, onNavigate }) {
  return navItems.map((item) => (
    <NavLink key={item.to} to={item.to} className={linkClassName} onClick={onNavigate}>
      {item.label}
    </NavLink>
  ))
}

export default function Header() {
  const { pathname } = useLocation()
  // The menu is "open" only for the route it was opened on, so navigating
  // (links, back/forward) closes it without needing an effect.
  const [openAt, setOpenAt] = useState(null)
  const open = openAt === pathname
  const close = () => setOpenAt(null)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setOpenAt(null)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link to="/" aria-label={`${siteConfig.name} — home`} className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLinks linkClassName={desktopLink} />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button to={primaryCta.to}>{primaryCta.label}</Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg md:hidden"
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
            className="border-t border-line md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <Container className="flex flex-col gap-1 py-4">
              <NavLinks linkClassName={mobileLink} onNavigate={close} />
              <Button to={primaryCta.to} size="lg" className="mt-3" onClick={close}>
                {primaryCta.label}
              </Button>
            </Container>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
