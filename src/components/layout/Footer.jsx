import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'
import Logo from '@/components/brand/Logo'
import { Button, Container } from '@/components/ui'
import { contactInfo, footerNav, primaryCta, siteConfig, socialLinks } from '@/config/site'

// lucide-react ships no brand/social marks, so these are hand-drawn (same approach as the
// wordmark in Logo.jsx) rather than adding an icon-pack dependency for four small glyphs.
const socialPaths = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z',
  facebook:
    'M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z',
  instagram:
    'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.248.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.637.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428A4.9 4.9 0 0 1 3.678 3.678 4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.467.182-.8.399-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.858-.05 1.054-.059 1.37-.059 4.04s.01 2.986.059 4.04c.045.976.207 1.505.344 1.858.182.467.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.858.344 1.054.05 1.37.059 4.04.059s2.986-.01 4.04-.059c.976-.045 1.505-.207 1.858-.344.467-.182.8-.399 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.858.05-1.054.059-1.37.059-4.04s-.01-2.986-.059-4.04c-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.858-.344-1.054-.05-1.37-.059-4.04-.059zm0 4.595a5.603 5.603 0 1 1 0 11.206 5.603 5.603 0 0 1 0-11.206zm0 1.802a3.801 3.801 0 1 0 0 7.602 3.801 3.801 0 0 0 0-7.602zm5.883-1.997a1.31 1.31 0 1 1-2.62 0 1.31 1.31 0 0 1 2.62 0z',
  youtube:
    'M23.498 6.186a2.99 2.99 0 0 0-2.104-2.117C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.394.569A2.99 2.99 0 0 0 .502 6.186 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .502 5.814 2.99 2.99 0 0 0 2.104 2.117C4.495 20.5 12 20.5 12 20.5s7.505 0 9.394-.569a2.99 2.99 0 0 0 2.104-2.117A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z',
}

function SocialIcon({ icon, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={socialPaths[icon]} />
    </svg>
  )
}

// No real profile exists behind any of these yet — rendered as inert, dimmed placeholders
// (not a real <a href>, which would be a broken or misleading link) until socialLinks in
// site.js gets real URLs.
function SocialRow() {
  return (
    <div className="mt-6 flex items-center gap-3">
      {socialLinks.map((social) => (
        <span
          key={social.name}
          title={`${social.name} — coming soon`}
          aria-label={`${social.name} — coming soon`}
          className="flex size-9 cursor-default items-center justify-center rounded-full border border-line text-fg-subtle"
        >
          <SocialIcon icon={social.icon} className="size-4" />
        </span>
      ))}
    </div>
  )
}

// A contactInfo value is a literal "[bracketed placeholder]" until the real detail is
// added — render it as plain text rather than a mailto:/tel: link to a fake address.
function ContactLine({ icon: Icon, value, href }) {
  const isPlaceholder = value.startsWith('[')
  return (
    <li className="flex items-start gap-2.5 text-sm text-fg-muted">
      <Icon className="mt-0.5 size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
      {isPlaceholder ? (
        <span className="italic">{value}</span>
      ) : (
        <a href={href} className="transition-colors hover:text-fg">
          {value}
        </a>
      )}
    </li>
  )
}

export default function Footer() {
  return (
    <footer data-tone="inverse" className="bg-surface text-fg">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-16">
          <div>
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
            <SocialRow />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
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

            <div>
              <h2 className="text-xs tracking-[0.2em] text-fg">Contact</h2>
              <ul className="mt-4 space-y-3">
                <ContactLine icon={Mail} value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
                <ContactLine icon={Phone} value={contactInfo.phone} href={`tel:${contactInfo.phoneHref}`} />
                <ContactLine icon={MapPin} value={contactInfo.location} />
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-sm text-fg-subtle">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
