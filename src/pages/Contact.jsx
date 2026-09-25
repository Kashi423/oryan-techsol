import { useId, useState } from 'react'
import { Lock, Mail, MapPin, Phone, Send } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Seo from '@/components/seo/Seo'
import { Badge, Button, Card, Field, Input, Reveal, Section, Select, Textarea } from '@/components/ui'
import { contactInfo } from '@/config/site'

const projectTypes = [
  'App Development',
  'Custom Software',
  'Website',
  'AI Bot',
  'Business Automation',
  'E-commerce',
  'SaaS',
  'API Integration',
  'Other',
]

const budgetRanges = ['Under $2,000', '$2,000–$5,000', '$5,000–$15,000', '$15,000+', 'Not sure yet']

const timelines = ['ASAP', 'Within 1 month', '1–3 months', 'Flexible / not sure']

// Order + labels used both for the visible form and for the plain-text email body built on
// submit, so the two never drift apart.
const fieldOrder = [
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Business / Company' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone / WhatsApp' },
  { key: 'website', label: 'Website' },
  { key: 'need', label: 'What do you need?' },
  { key: 'projectType', label: 'Project type' },
  { key: 'challenge', label: 'Current challenge' },
  { key: 'budget', label: 'Budget range' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'additional', label: 'Additional information' },
]

function HeroBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0" />
      <div className="bg-glow absolute top-0 left-1/2 h-[36rem] w-[60rem] max-w-none -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}

function HeroSection() {
  return (
    <Section tone="inverse" spacing="hero" background={<HeroBackground />} aria-labelledby="hero-title">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Badge className="mx-auto">
            <Mail className="size-3.5 text-highlight" aria-hidden="true" />
            Get in touch
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Let's build something that <span className="text-gradient">works for your business</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            Tell us about your project below — we read every inquiry ourselves and reply
            personally, not with an automated sales sequence.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

// contactInfo values are literal "[bracketed placeholders]" until real details are added —
// render as plain text rather than a fake mailto:/tel: link, same rule as the footer.
function ContactMethod({ icon: Icon, value, href }) {
  const isPlaceholder = value.startsWith('[')
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
      {isPlaceholder ? (
        <span className="text-sm text-fg-muted italic">{value}</span>
      ) : (
        <a href={href} className="text-sm text-fg-muted transition-colors hover:text-fg">
          {value}
        </a>
      )}
    </li>
  )
}

function InquiryForm() {
  const idBase = useId()
  const [submitted, setSubmitted] = useState(false)
  const id = (key) => `${idBase}-${key}`

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const data = new FormData(form)
    const bodyLines = fieldOrder.map(({ key, label }) => `${label}: ${data.get(key) || '—'}`)
    const subject = `New project inquiry — ${data.get('projectType') || 'General'}`
    const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`

    window.location.href = mailto
    setSubmitted(true)
  }

  return (
    <Card as="form" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field htmlFor={id('name')} label="Name" required>
          <Input id={id('name')} name="name" autoComplete="name" required />
        </Field>
        <Field htmlFor={id('company')} label="Business / Company" required>
          <Input id={id('company')} name="company" autoComplete="organization" required />
        </Field>
        <Field htmlFor={id('email')} label="Email" required>
          <Input id={id('email')} name="email" type="email" autoComplete="email" required />
        </Field>
        <Field htmlFor={id('phone')} label="Phone / WhatsApp">
          <Input id={id('phone')} name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field htmlFor={id('website')} label="Website" className="sm:col-span-2">
          <Input id={id('website')} name="website" type="url" placeholder="https://" />
        </Field>
        <Field htmlFor={id('need')} label="What do you need?" className="sm:col-span-2" required>
          <Input
            id={id('need')}
            name="need"
            placeholder="e.g. A website redesign, an AI support bot, an internal dashboard…"
            required
          />
        </Field>
        <Field htmlFor={id('projectType')} label="Project type" required>
          <Select id={id('projectType')} name="projectType" defaultValue="" required>
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Field>
        <Field htmlFor={id('budget')} label="Budget range">
          <Select id={id('budget')} name="budget" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </Select>
        </Field>
        <Field htmlFor={id('timeline')} label="Timeline">
          <Select id={id('timeline')} name="timeline" defaultValue="">
            <option value="" disabled>
              Select a timeline
            </option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </Select>
        </Field>
        <div className="hidden sm:block" aria-hidden="true" />
        <Field
          htmlFor={id('challenge')}
          label="Current challenge"
          hint="What's not working right now that made you reach out?"
          className="sm:col-span-2"
          required
        >
          <Textarea id={id('challenge')} name="challenge" rows={4} required />
        </Field>
        <Field htmlFor={id('additional')} label="Additional information" className="sm:col-span-2">
          <Textarea id={id('additional')} name="additional" rows={4} />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto">
        Send Project Inquiry
        <Send aria-hidden="true" />
      </Button>

      {submitted && (
        <output className="mt-4 block text-sm text-fg-muted">
          Your email client should now be open with the message ready to send — just hit
          send from there.
        </output>
      )}
    </Card>
  )
}

function Sidebar() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <h2 className="font-display text-sm font-bold text-fg">Other ways to reach us</h2>
        <ul className="mt-4 space-y-3">
          <ContactMethod icon={Mail} value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
          <ContactMethod icon={Phone} value={contactInfo.phone} href={`tel:${contactInfo.phoneHref}`} />
          <ContactMethod icon={MapPin} value={contactInfo.location} />
        </ul>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
          <div>
            <h2 className="font-display text-sm font-bold text-fg">Your privacy</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              What you share here is used only to respond to your inquiry — never sold,
              shared, or added to a marketing list. We read every message ourselves and
              treat it as confidential.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function FormSection() {
  return (
    <Section aria-labelledby="form-title">
      <h2 id="form-title" className="sr-only">
        Project inquiry form
      </h2>
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <Reveal>
          <InquiryForm />
        </Reveal>
        <Reveal delay={0.08}>
          <Sidebar />
        </Reveal>
      </div>
    </Section>
  )
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Tell us about your project — custom web, software, AI bots or automation — and we'll get back to you."
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
      <HeroSection />
      <FormSection />
    </>
  )
}
