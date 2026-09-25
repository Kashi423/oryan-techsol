import { Bot, Code2, Workflow } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import LogoMark from '@/components/brand/LogoMark'
import Seo from '@/components/seo/Seo'
import {
  Badge,
  Button,
  Card,
  CaseStudyCard,
  FeatureCard,
  Field,
  Input,
  Section,
  SectionHeading,
  Select,
  ServiceCard,
  Skeleton,
  Spinner,
  Tag,
  TestimonialCard,
  Textarea,
  Reveal,
} from '@/components/ui'

// DEV-ONLY (route is not registered in production builds). Living reference for the
// design system: tokens and every shared component in one place. Class names are
// written out in full so Tailwind can detect them.
const palettes = {
  brand: [
    'bg-brand-50', 'bg-brand-100', 'bg-brand-200', 'bg-brand-300', 'bg-brand-400', 'bg-brand-500',
    'bg-brand-600', 'bg-brand-700', 'bg-brand-800', 'bg-brand-900', 'bg-brand-950',
  ],
  accent: ['bg-accent-300', 'bg-accent-400', 'bg-accent-500', 'bg-accent-600'],
  ink: [
    'bg-ink-50', 'bg-ink-100', 'bg-ink-200', 'bg-ink-300', 'bg-ink-400', 'bg-ink-500',
    'bg-ink-600', 'bg-ink-700', 'bg-ink-800', 'bg-ink-900', 'bg-ink-950',
  ],
  semantic: [
    'bg-surface', 'bg-surface-muted', 'bg-surface-raised', 'bg-surface-overlay', 'bg-line',
    'bg-line-strong', 'bg-fg', 'bg-fg-muted', 'bg-fg-subtle', 'bg-primary', 'bg-primary-hover',
    'bg-highlight', 'bg-success', 'bg-danger',
  ],
}

function Swatches({ title, classes }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-fg-muted">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {classes.map((cls) => (
          <li key={cls} className="w-24">
            <div className={`${cls} h-12 rounded-lg border border-line-strong`} />
            <p className="mt-1 truncate text-xs text-fg-subtle">{cls.replace('bg-', '')}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CardRow() {
  return (
    <ul className="mt-10 grid gap-6 md:grid-cols-3">
      <li>
        <Reveal>
          <FeatureCard
            icon={Code2}
            title="Custom software"
            description="Purpose-built platforms and internal tools shaped around how your team works."
            to="/services"
          />
        </Reveal>
      </li>
      <li>
        <Reveal delay={0.08}>
          <FeatureCard
            icon={Bot}
            title="AI bots"
            description="Chat and voice assistants that handle enquiries, support and lead capture."
            to="/ai-automation"
          />
        </Reveal>
      </li>
      <li>
        <Reveal delay={0.16}>
          <FeatureCard
            icon={Workflow}
            title="Non-linked card"
            description="Without a destination, the card renders as a static surface."
          />
        </Reveal>
      </li>
    </ul>
  )
}

export default function Styleguide() {
  return (
    <>
      <Seo title="Styleguide" noindex />

      <Section>
        <SectionHeading
          as="h1"
          eyebrow="Design system"
          title={
            <>
              Oryan Techsol <span className="text-gradient">styleguide</span>
            </>
          }
          description="Dev-only reference for brand tokens and shared components. Not included in production builds."
        />
      </Section>

      <Section tone="muted" aria-labelledby="sg-logo">
        <SectionHeading
          id="sg-logo"
          title="Logo"
          description="Mark from the official artwork (alpha mask + tone gradient); wordmark rebuilt as clean vectors from its measurements."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="flex items-center justify-center py-12">
            <Logo />
          </Card>
          <div data-tone="inverse" className="flex items-center justify-center rounded-2xl bg-surface py-12">
            <Logo />
          </div>
          <Card className="flex items-center justify-center py-8">
            <LogoMark className="size-72" />
          </Card>
          <div data-tone="inverse" className="flex items-center justify-center rounded-2xl bg-surface py-8">
            <LogoMark className="size-72" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-8">
          {['size-8', 'size-12', 'size-16'].map((size) => (
            <LogoMark key={size} boost={3} className={size} />
          ))}
        </div>
      </Section>

      <Section aria-labelledby="sg-colors">
        <SectionHeading
          id="sg-colors"
          title="Colour tokens"
          description="brand-900, brand-500 and accent-400 are sampled from the logo artwork; the other steps are derived."
        />
        <div className="mt-10 space-y-8">
          {Object.entries(palettes).map(([name, classes]) => (
            <Swatches key={name} title={name} classes={classes} />
          ))}
        </div>
      </Section>

      <Section tone="muted" aria-labelledby="sg-type">
        <SectionHeading id="sg-type" eyebrow="Typography" title="Manrope headings, Lato body" />
        <div className="mt-10 space-y-6">
          <p className="font-display text-5xl font-extrabold uppercase">Display heading 5xl</p>
          <h3 className="text-3xl">Heading 3xl — Manrope bold, sentence case</h3>
          <p className="text-lg text-fg-muted">
            Body large — Lato. Custom software, web platforms, AI bots and business automation.
          </p>
          <p className="text-base text-fg-muted">Body base — the default paragraph size across the site.</p>
          <p className="text-sm text-fg-subtle">Small / caption — metadata and supporting text.</p>
        </div>
      </Section>

      <Section aria-labelledby="sg-buttons">
        <SectionHeading id="sg-buttons" title="Buttons & badges" />
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="lg">Large primary</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>React</Badge>
          <Badge>Node.js</Badge>
          <Badge>
            <Bot className="size-3.5 text-highlight" aria-hidden="true" />
            AI bots
          </Badge>
        </div>
      </Section>

      <Section tone="muted" aria-labelledby="sg-cards">
        <SectionHeading id="sg-cards" eyebrow="Default tone" title="Cards" align="center" />
        <CardRow />
        <Card className="mt-6">Plain Card — a base surface for any grouped content.</Card>
      </Section>

      <Section tone="inverse" aria-labelledby="sg-inverse">
        <SectionHeading
          id="sg-inverse"
          eyebrow="Inverse tone"
          title={
            <>
              Everything re-tints <span className="text-gradient">automatically</span>
            </>
          }
          description="Sections with tone=&quot;inverse&quot; swap the semantic tokens, so buttons, cards, badges and headings need no extra classes."
        />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
        </div>
        <CardRow />
      </Section>

      <Section aria-labelledby="sg-service-cards">
        <SectionHeading
          id="sg-service-cards"
          eyebrow="Service, testimonial & case-study cards"
          title="Content-specific cards"
          description="Built on the same <Card>, so tone/interactive/padding behaviour stays consistent everywhere."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          <li>
            <Reveal>
              <ServiceCard
                icon={Bot}
                title="AI Bots & Automation"
                description="Chat and voice assistants, workflow automation and API integrations."
                features={['Custom chat & voice bots', 'Workflow automation', 'API integrations']}
                to="/ai-bots"
              />
            </Reveal>
          </li>
          <li>
            <Reveal delay={0.08}>
              <TestimonialCard
                quote="OryanTechsol automated our support triage and cut first-response time by more than half."
                name="Sara Khan"
                jobTitle="Operations Lead"
                company="Northline Retail"
                projectType="AI Bot & Automation"
              />
            </Reveal>
          </li>
          <li>
            <Reveal delay={0.12}>
              <TestimonialCard
                quote="[Client testimonial will be added here]"
                name="[Client Name]"
                jobTitle="[Position]"
                company="[Company]"
                projectType="Custom Web Development"
                placeholder
              />
            </Reveal>
          </li>
          <li>
            <Reveal delay={0.16}>
              <CaseStudyCard
                title="AI Customer Support Assistant"
                industry="E-commerce"
                solutionType="AI Bot & Automation"
                description="A custom AI assistant that answers common questions instantly and routes the rest to a human."
                tags={['React', 'Node.js', 'OpenAI API']}
                placeholder
                result="Placeholder — the real result will be added once this project ships."
                to="/portfolio/ai-support-assistant"
              />
            </Reveal>
          </li>
        </ul>
      </Section>

      <Section tone="muted" aria-labelledby="sg-forms">
        <SectionHeading id="sg-forms" title="Form inputs & tags" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Field htmlFor="sg-name" label="Full name" required>
            <Input id="sg-name" name="name" placeholder="Jane Cooper" required />
          </Field>
          <Field htmlFor="sg-service" label="Service" hint="Which service are you enquiring about?">
            <Select id="sg-service" name="service" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option value="ai-bots-automation">AI Bots & Automation</option>
              <option value="web-development">Custom Web Development</option>
            </Select>
          </Field>
          <Field htmlFor="sg-email" label="Email" error="Enter a valid email address">
            <Input id="sg-email" name="email" type="email" invalid placeholder="jane@company.com" />
          </Field>
          <Field htmlFor="sg-message" label="Message">
            <Textarea id="sg-message" name="message" placeholder="Tell us about your project…" />
          </Field>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Tag>AI Bots</Tag>
          <Tag>Automation</Tag>
          <Tag>Web Development</Tag>
        </div>
      </Section>

      <Section aria-labelledby="sg-loading">
        <SectionHeading id="sg-loading" title="Loading states" />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button loading>Submitting</Button>
          <Spinner label="Loading" />
          <Skeleton className="h-11 w-40" />
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </Section>
    </>
  )
}
