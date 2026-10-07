import { useId, useState } from 'react'
import { ArrowRight, CalendarCheck, CheckCircle2, FileText, Lock, Mail, MapPin, Phone, Send } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Seo from '@/components/seo/Seo'
import { Badge, Button, Card, Field, Input, Reveal, Section, Select, Textarea } from '@/components/ui'
import { contactInfo } from '@/config/site'
import { api, ApiError } from '@/lib/cms/api'

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

// What happens after an inquiry — no response-time promise, since none is published anywhere
// else on the site.
const nextSteps = [
  { icon: Send, title: 'You send your inquiry', detail: 'A few details about the project and what it needs to do.' },
  { icon: Mail, title: 'We reply personally', detail: 'Read by the team, not routed into an automated sequence.' },
  { icon: CalendarCheck, title: 'Free consultation call', detail: 'We walk through your workflow and what would actually help.' },
  { icon: FileText, title: 'A tailored proposal', detail: 'Scope, approach and timeline built around your business.' },
]

// The hero visual: the path from inquiry to proposal as a step card, built from tokens — the
// same family as the browser, phone, chat and dashboard mockups on the service pages.
function NextStepsMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface-raised p-5 shadow-card backdrop-blur-xl">
      <p className="font-display text-sm font-bold text-fg">What happens after you reach out</p>
      <ol className="mt-4">
        {nextSteps.map(({ icon: Icon, title, detail }, index) => (
          <li key={title} className="relative flex gap-3 pb-4 last:pb-0">
            {index < nextSteps.length - 1 && (
              <span aria-hidden="true" className="absolute top-10 bottom-1 left-[1.1rem] w-px bg-highlight/30" />
            )}
            <span
              className={
                index === 0
                  ? 'flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white'
                  : 'flex size-9 shrink-0 items-center justify-center rounded-xl bg-highlight/10 text-highlight'
              }
            >
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <div className="pt-0.5">
              <p className="text-xs font-semibold text-fg">{title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-fg-muted">{detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface-overlay px-3 py-2.5 text-[11px] text-fg-muted">
        <Lock className="size-3.5 shrink-0 text-highlight" aria-hidden="true" />
        Your details are used only to respond to your inquiry.
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <Section tone="inverse" spacing="hero" background={<HeroBackground />} aria-labelledby="hero-title">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <Reveal>
            <Badge className="lg:mx-0">
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
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              Tell us about your project below — we read every inquiry ourselves and reply
              personally, not with an automated sales sequence.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button href="#form-title" size="lg">
                Start your inquiry
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button href={`mailto:${contactInfo.email}`} variant="secondary" size="lg">
                Email us directly
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <NextStepsMockup />
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
  // idle → sending → sent (saved by the backend) | mailto (backend unavailable: email fallback)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [renderedAt] = useState(() => Date.now())
  const id = (key) => `${idBase}-${key}`

  function openEmailClient(data) {
    const bodyLines = fieldOrder.map(({ key, label }) => `${label}: ${data.get(key) || '—'}`)
    const subject = `New project inquiry — ${data.get('projectType') || 'General'}`
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity() || status === 'sending') return

    const data = new FormData(form)
    setStatus('sending')
    setMessage('')
    setFieldErrors({})
    try {
      await api('/public/contact', {
        method: 'POST',
        body: { ...Object.fromEntries(data.entries()), source: window.location.pathname, ts: renderedAt },
      })
      setStatus('sent')
      form.reset()
    } catch (error) {
      if (error instanceof ApiError && (error.status === 422 || error.status === 429)) {
        setStatus('idle')
        setFieldErrors(error.data?.fields ?? {})
        setMessage(error.message)
        return
      }
      // Backend not reachable / not installed yet: fall back to the visitor's email app so an
      // inquiry is never lost.
      openEmailClient(data)
      setStatus('mailto')
    }
  }

  if (status === 'sent') {
    return (
      <Card>
        <div className="flex items-start gap-4">
          <CheckCircle2 className="mt-1 size-7 shrink-0 text-success" aria-hidden="true" />
          <div>
            <h3 className="font-display text-xl font-bold text-fg">Thank you — we've got your inquiry.</h3>
            <p className="mt-2 leading-relaxed text-fg-muted">
              A member of the team will read it and reply personally, usually by email. If it's urgent, you can also
              reach us at{' '}
              <a href={`mailto:${contactInfo.email}`} className="font-semibold text-highlight hover:underline">
                {contactInfo.email}
              </a>
              .
            </p>
            <Button type="button" variant="secondary" className="mt-5" onClick={() => setStatus('idle')}>
              Send another inquiry
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card as="form" onSubmit={handleSubmit} noValidate={false}>
      {/* Honeypot: hidden from people, irresistible to form-filling bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input name="hp" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
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

      {message && (
        <p role="alert" className="mt-6 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg">
          {message}
          {Object.values(fieldErrors).length > 0 && (
            <span className="mt-1 block text-fg-muted">{Object.values(fieldErrors).join(' ')}</span>
          )}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" loading={status === 'sending'}>
        Send Project Inquiry
        <Send aria-hidden="true" />
      </Button>

      {status === 'mailto' && (
        <output className="mt-4 block text-sm text-fg-muted">
          Your email app should now be open with the message ready to send — just hit send from there.
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
