import Seo from '@/components/seo/Seo'
import { Badge, Button, Card, Reveal, Section, SectionHeading } from '@/components/ui'
import { primaryCta } from '@/config/site'

// Shared shell for a page whose real content genuinely needs the site owner's input
// (legal text, editorial content) rather than something that can be written or inferred —
// honest "not published yet" rather than inventing content to fill the space.
// Always noindex: there's nothing here worth a search engine finding yet.
export default function PlaceholderPage({ icon: Icon, eyebrow, title, notice, badgeLabel = 'Coming soon' }) {
  return (
    <>
      <Seo title={title} noindex />
      <Section spacing="hero">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge className="mx-auto">
              {Icon && <Icon className="size-3.5 text-highlight" aria-hidden="true" />}
              {badgeLabel}
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading as="h1" eyebrow={eyebrow} title={title} align="center" className="mx-auto mt-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-10 text-left">
              <p className="leading-relaxed text-fg-muted">{notice}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.15}>
            <Button to={primaryCta.to} size="lg" className="mt-8">
              Contact us
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
