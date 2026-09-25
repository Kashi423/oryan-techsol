import { Mail, Shield } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Seo from '@/components/seo/Seo'
import { Badge, Card, Reveal, Section, SectionHeading } from '@/components/ui'
import { contactInfo, siteConfig } from '@/config/site'

const pageDescription = 'How Oryan Techsol collects, uses and protects information from visitors to this website.'

// "Last updated" is a real, meaningful date only once this page reflects the actual
// business's practices — update it whenever the content below changes.
const lastUpdated = 'September 2026'

// Everything below reflects what this website actually does today, verified against the
// codebase rather than assumed: the contact page (src/pages/Contact.jsx) builds a mailto:
// link client-side and never sends form data to a server, and no analytics, tracking pixel
// or cookie-setting script exists anywhere in this codebase. If either of those changes
// (e.g. a real backend or an analytics tool is added later), this page must be updated to
// match — don't let it go stale.
function Paragraph({ children }) {
  return <p className="leading-relaxed text-fg-muted">{children}</p>
}

function ListItem({ children }) {
  return (
    <li className="flex items-start gap-2.5 text-fg-muted">
      <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-highlight" />
      <span className="leading-relaxed">{children}</span>
    </li>
  )
}

function PolicySection({ id, title, children }) {
  return (
    <Card as="section" aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="font-display text-lg font-bold text-fg">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </Card>
  )
}

function HeroSection() {
  return (
    <Section spacing="hero">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Badge className="mx-auto">
            <Shield className="size-3.5 text-highlight" aria-hidden="true" />
            Legal
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionHeading as="h1" title="Privacy Policy" align="center" className="mx-auto mt-6" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-sm text-fg-subtle">Last updated: {lastUpdated}</p>
        </Reveal>
      </div>
    </Section>
  )
}

function ContentSection() {
  return (
    <Section tone="muted">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Reveal>
          <PolicySection id="overview" title="Overview">
            <Paragraph>
              This policy explains what information {siteConfig.name} collects through this website
              (not through any separate client project we build), why, and what choices you have.
              It applies to oryantechsol.com only.
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.04}>
          <PolicySection id="information-we-collect" title="Information we collect">
            <Paragraph>
              The only information this website collects is what you choose to give us directly
              through the contact form or a direct email/call. Depending on which you use, that may
              include:
            </Paragraph>
            <ul className="space-y-2.5">
              <ListItem>Your name and the name of your business</ListItem>
              <ListItem>Your email address and phone/WhatsApp number, if provided</ListItem>
              <ListItem>Details about your project — what you're building, budget and timeline</ListItem>
            </ul>
            <Paragraph>
              We do not use analytics, tracking pixels or cookies on this website, and we do not
              automatically collect browsing behaviour, device fingerprints or location data.
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.08}>
          <PolicySection id="how-the-contact-form-works" title="How the contact form works">
            <Paragraph>
              The contact form on this site does not submit your details to a server or database
              we operate. Filling it in and submitting it opens a pre-filled email in your own email
              application, addressed to us — you choose whether to actually send it. If you don't
              send it, we never receive or store what you typed.
            </Paragraph>
            <Paragraph>
              If you do send it (or email/call us directly), your message reaches our email inbox
              like any other email, and is handled the same way — see below.
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.12}>
          <PolicySection id="how-we-use-information" title="How we use your information">
            <ul className="space-y-2.5">
              <ListItem>To respond to your inquiry and discuss your project</ListItem>
              <ListItem>To follow up if you've asked us to, or if a conversation is ongoing</ListItem>
              <ListItem>
                To deliver a project you've engaged us for, under the terms agreed separately for
                that work
              </ListItem>
            </ul>
            <Paragraph>
              We do not sell your information, share it with third parties for their own marketing,
              or add you to a mailing list without your separate, explicit consent.
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.16}>
          <PolicySection id="data-retention" title="Data retention">
            <Paragraph>
              We keep inquiry emails for as long as reasonably needed to respond to you and, if we
              work together, for the duration of the engagement and a reasonable period afterward
              for our own records. You can ask us to delete correspondence at any time (see
              "Your rights" below).
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.2}>
          <PolicySection id="third-parties" title="Third parties">
            <Paragraph>
              This website is hosted by a third-party hosting provider, which processes standard
              web server logs (such as IP address and request timestamps) as part of operating the
              server — this is standard for any website and is not something we separately access
              or analyse. We do not embed third-party advertising, social widgets or analytics
              scripts on this site.
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.24}>
          <PolicySection id="your-rights" title="Your rights">
            <Paragraph>
              You can ask us, at any time, what information we hold about you, ask us to correct
              it, or ask us to delete it. Contact us using the details below and we'll act on it
              promptly.
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.28}>
          <PolicySection id="childrens-privacy" title="Children's privacy">
            <Paragraph>
              This website is intended for business use and is not directed at children. We do not
              knowingly collect information from children.
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.32}>
          <PolicySection id="changes" title="Changes to this policy">
            <Paragraph>
              If how this website collects or handles information changes — for example, if we add
              analytics or a server-side contact form in the future — we'll update this page and
              its "Last updated" date accordingly.
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.36}>
          <PolicySection id="contact" title="Contact us">
            <div className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
              <Paragraph>
                Questions about this policy or your information: {contactInfo.email.startsWith('[') ? (
                  <span className="italic">{contactInfo.email}</span>
                ) : (
                  <a href={`mailto:${contactInfo.email}`} className="font-semibold text-highlight hover:underline">
                    {contactInfo.email}
                  </a>
                )}
                .
              </Paragraph>
            </div>
          </PolicySection>
        </Reveal>
      </div>
    </Section>
  )
}

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" description={pageDescription} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }]} />
      <HeroSection />
      <ContentSection />
    </>
  )
}
