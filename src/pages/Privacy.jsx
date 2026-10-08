import { CalendarDays, Globe, Mail, Shield } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Seo from '@/components/seo/Seo'
import { Card, Reveal, Section } from '@/components/ui'
import { contactInfo, siteConfig } from '@/config/site'

const pageDescription = 'How Oryan Techsol collects, uses and protects information from visitors to this website.'

// "Last updated" is a real, meaningful date only once this page reflects the actual
// business's practices — update it whenever the content below changes.
const lastUpdated = 'October 2026'

// Everything below reflects what this website actually does today: the contact form is saved by
// our own backend (public/api → database, plus an email alert), the AI chat transcript is saved
// there too and replies come from a third-party AI provider via a Cloudflare Worker (worker/),
// and the only visitor cookies are the optional Google Analytics ones, loaded after consent (see
// src/lib/consent.js). If any of that changes, this page must be updated to match — don't let it go stale.
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
    <PageHero
      align="center"
      eyebrow="Legal"
      icon={Shield}
      title="Privacy"
      accent="Policy"
      description={pageDescription}
      crumbs={[{ name: 'Privacy Policy' }]}
      meta={[
        { icon: CalendarDays, label: `Last updated: ${lastUpdated}` },
        { icon: Globe, label: 'Applies to oryantechsol.com' },
        { icon: Mail, label: contactInfo.email },
      ]}
    />
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
              — through the contact form, the AI consultation chat, or a direct email/call.
              Depending on which you use, that may include:
            </Paragraph>
            <ul className="space-y-2.5">
              <ListItem>Your name and the name of your business</ListItem>
              <ListItem>Your email address and phone/WhatsApp number, if provided</ListItem>
              <ListItem>Details about your project — what you're building, budget and timeline</ListItem>
              <ListItem>
                The messages you type into the AI consultation chat (and any contact details you
                choose to share in it)
              </ListItem>
            </ul>
            <Paragraph>
              To limit spam and abuse we also keep a short-lived, non-reversible token derived from
              your IP address (not the address itself) and your browser's user-agent text alongside
              a contact-form submission. We do not use advertising cookies or tracking pixels, and we do
              not collect device fingerprints or location data. If you choose "Accept analytics" in
              the cookie banner, we use Google Analytics 4 (with IP anonymisation) to see which
              pages are visited; it sets cookies only after you accept, and you can withdraw consent
              at any time through "Cookie settings" in the footer. (Our staff sign in to a private admin area using a strictly
              necessary session cookie; visitors never receive one.)
            </Paragraph>
          </PolicySection>
        </Reveal>

        <Reveal delay={0.08}>
          <PolicySection id="how-the-contact-form-works" title="Contact form and AI chat">
            <Paragraph>
              When you submit the contact form, your details are sent to our own server, which
              saves them in our database on our hosting account and emails an alert to our team so
              we can reply. Only our authorised staff can view them. If our server cannot be reached
              or is unavailable, the form falls back to opening a pre-filled email in your own email
              application instead.
            </Paragraph>
            <Paragraph>
              If you subscribe to our guides by email, we save your email address and the page you
              signed up from in the same database, and use it only to send you those guides. You can
              ask us to remove it at any time.
            </Paragraph>
            <Paragraph>
              The AI consultation chat sends your messages to our chat service, which uses a
              third-party AI model provider to generate replies. We may save the conversation so a
              member of our team can review it and follow up. Please don't share passwords,
              payment details or other sensitive personal information in the chat.
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
              We keep inquiries, chat conversations and related emails for as long as reasonably
              needed to respond to you and, if we work together, for the duration of the engagement
              and a reasonable period afterward for our own records. You can ask us to delete correspondence at any time (see
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
              or analyse. The AI chat uses Cloudflare (to run our chat service) and an AI model
              provider (to generate replies), which process the messages you send in the chat for
              that purpose. We do not embed third-party advertising, social widgets or analytics
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
              analytics in the future — we'll update this page and its "Last updated" date
              accordingly.
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
