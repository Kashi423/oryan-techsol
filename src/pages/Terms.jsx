import { FileText, Mail } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Seo from '@/components/seo/Seo'
import { Badge, Card, Reveal, Section, SectionHeading } from '@/components/ui'
import { contactInfo, siteConfig } from '@/config/site'

const pageDescription = 'The terms that apply to using the Oryan Techsol website.'

const lastUpdated = 'September 2026'

// These terms cover use of THIS WEBSITE only — not client project work, which is governed
// by whatever contract/proposal is agreed separately for that engagement. Keep it that way:
// don't fold project-specific terms (pricing, deliverables, IP handover for client work) in
// here, since those genuinely vary per project and shouldn't be presented as fixed site-wide
// terms.
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

function TermsSection({ id, title, children }) {
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
            <FileText className="size-3.5 text-highlight" aria-hidden="true" />
            Legal
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionHeading as="h1" title="Terms & Conditions" align="center" className="mx-auto mt-6" />
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
          <TermsSection id="acceptance" title="Acceptance of these terms">
            <Paragraph>
              These terms apply to your use of oryantechsol.com. By browsing this website or
              submitting the contact form, you agree to them. They do not cover client project
              work — a separate agreement or proposal governs any project we deliver for you.
            </Paragraph>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.04}>
          <TermsSection id="use-of-this-site" title="Use of this website">
            <Paragraph>You agree to use this website only for lawful purposes. You agree not to:</Paragraph>
            <ul className="space-y-2.5">
              <ListItem>Attempt to gain unauthorized access to this site or its infrastructure</ListItem>
              <ListItem>Use automated tools to scrape or overload the site</ListItem>
              <ListItem>Submit false or misleading information through the contact form</ListItem>
              <ListItem>Use the site to distribute malware or harmful code</ListItem>
            </ul>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.08}>
          <TermsSection id="content-and-accuracy" title="Content and accuracy">
            <Paragraph>
              We try to keep this website's content accurate and up to date. Service descriptions,
              example use cases and illustrative scenarios describe the kind of work we do and are
              not a guarantee of specific results for your business — actual scope, timeline and
              outcomes are agreed per project, after discovery. Case studies marked "Sample project"
              are illustrative, not real client work.
            </Paragraph>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.12}>
          <TermsSection id="intellectual-property" title="Intellectual property">
            <Paragraph>
              The content, design, branding and code of this website belong to {siteConfig.name}{' '}
              unless otherwise stated. You may view and share pages of this site for personal,
              non-commercial reference, but may not copy, reproduce or reuse our branding, site
              design or written content for your own commercial purposes without permission.
            </Paragraph>
            <Paragraph>
              Intellectual property in a client project we deliver (code, designs, etc.) is handled
              under that project's own agreement, not by these website terms.
            </Paragraph>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.16}>
          <TermsSection id="no-warranty" title="No warranty">
            <Paragraph>
              This website and its content are provided "as is," without warranties of any kind,
              to the extent permitted by law. We don't guarantee the site will be error-free,
              uninterrupted, or free of viruses, though we take reasonable care to keep it working
              correctly.
            </Paragraph>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.2}>
          <TermsSection id="limitation-of-liability" title="Limitation of liability">
            <Paragraph>
              To the extent permitted by law, {siteConfig.name} is not liable for any indirect,
              incidental or consequential loss arising from your use of this website. This does not
              affect any liability we can't legally exclude, and does not limit liability under a
              separate signed project agreement.
            </Paragraph>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.24}>
          <TermsSection id="external-links" title="External links">
            <Paragraph>
              This site may reference or link to third-party tools and services relevant to a
              project (e.g. a payment provider or CRM). We aren't responsible for the content or
              practices of external sites you visit from a link here.
            </Paragraph>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.28}>
          <TermsSection id="changes" title="Changes to these terms">
            <Paragraph>
              We may update these terms from time to time. The "Last updated" date at the top of
              this page reflects the most recent revision. Continued use of the site after a change
              means you accept the updated terms.
            </Paragraph>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.32}>
          <TermsSection id="governing-law" title="Governing law">
            <Paragraph>
              These terms are governed by the laws of the State of New York, USA, without regard to
              its conflict of law principles.
            </Paragraph>
          </TermsSection>
        </Reveal>

        <Reveal delay={0.36}>
          <TermsSection id="contact" title="Contact us">
            <div className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
              <Paragraph>
                Questions about these terms: {contactInfo.email.startsWith('[') ? (
                  <span className="italic">{contactInfo.email}</span>
                ) : (
                  <a href={`mailto:${contactInfo.email}`} className="font-semibold text-highlight hover:underline">
                    {contactInfo.email}
                  </a>
                )}
                .
              </Paragraph>
            </div>
          </TermsSection>
        </Reveal>
      </div>
    </Section>
  )
}

export default function Terms() {
  return (
    <>
      <Seo title="Terms & Conditions" description={pageDescription} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Terms & Conditions', path: '/terms' }]} />
      <HeroSection />
      <ContentSection />
    </>
  )
}
