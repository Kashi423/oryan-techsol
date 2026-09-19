import { Link } from 'react-router'
import Logo from '@/components/brand/Logo'
import { Button, Container } from '@/components/ui'
import { footerNav, primaryCta, siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <footer data-tone="inverse" className="bg-surface text-fg">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" aria-label={`${siteConfig.name} — home`} className="inline-block rounded-md">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              Custom software, web solutions and AI automation for companies that want to move
              faster and spend less time on manual work.
            </p>
            <p className="mt-4 font-display text-xs font-semibold tracking-[0.2em] text-fg-subtle uppercase">
              {siteConfig.pillars.join(' · ')}
            </p>
            <Button to={primaryCta.to} variant="secondary" className="mt-6">
              {primaryCta.label}
            </Button>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xs tracking-[0.2em] text-fg">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="rounded-sm text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 border-t border-line pt-6 text-sm text-fg-subtle">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
