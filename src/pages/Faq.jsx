import { Link } from 'react-router'
import Seo from '@/components/seo/Seo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import { Accordion, Badge, Button, Reveal, Section, SectionHeading } from '@/components/ui'
import { primaryCta } from '@/config/site'

// Same content already written on each service page (single source there would need a
// shared data module to avoid drift — tracked as a follow-up, not urgent since answers
// rarely change independently of their page).
const generalFaqs = [
  {
    question: 'How do I get started?',
    answer:
      "Book a free consultation or send a project inquiry — we'll ask a few questions about your business before recommending anything.",
  },
  {
    question: 'Do you work with businesses outside your local area?',
    answer: "Yes — we work with clients remotely, wherever they're based.",
  },
  {
    question: 'What does a project cost?',
    answer:
      "It depends entirely on scope — we don't sell fixed packages. Tell us about your project and we'll give you a realistic estimate after discovery.",
  },
]

const aiBotsFaqs = [
  {
    question: 'How long does it take to build an AI bot?',
    answer:
      "It depends on scope — a focused, single-purpose assistant moves faster than one that needs deep system integration. We'll give you a realistic timeline after a short discovery call, not before.",
  },
  {
    question: 'Where can the AI bot work — website, WhatsApp, both?',
    answer:
      'Wherever makes sense for your customers. Website and WhatsApp are common starting points; the exact channels are scoped to your business rather than fixed in advance.',
  },
  {
    question: 'Will it replace our support or sales team?',
    answer:
      "No. It's built to handle the repetitive, high-volume parts of a conversation and hand off anything that genuinely needs a person.",
  },
]

const webDevFaqs = [
  {
    question: 'Do you build on WordPress or a page builder?',
    answer:
      "No — every site is custom-built rather than assembled from a template or page builder, so the architecture actually matches your requirements instead of working around a platform's limits.",
  },
  {
    question: 'How long does a website project take?',
    answer:
      "It depends on scope — a focused marketing site moves faster than a web application or customer portal. We'll give you a realistic timeline after discovery, not before.",
  },
  {
    question: 'Will my site work well on mobile?',
    answer: 'Yes. Every site is designed and tested across desktop, tablet and mobile as standard, not as an add-on.',
  },
]

const customSoftwareFaqs = [
  {
    question: 'Do you build on an existing platform or from scratch?',
    answer:
      "Whichever actually fits the project — sometimes a well-chosen foundation is the right call, sometimes it isn't. That decision is made during planning, not assumed up front.",
  },
  {
    question: 'Can the software replace our spreadsheets entirely?',
    answer: 'In most cases, yes — including migrating the data you already have. The exact scope is confirmed during discovery.',
  },
]

const automationFaqs = [
  {
    question: 'Will automation replace our team?',
    answer:
      "No. It's built to handle the repetitive, rules-based parts of a process so your team spends less time on data entry and follow-ups, and more on the work that needs judgement.",
  },
  {
    question: 'How much time or money will this save us?',
    answer:
      "We won't promise a fixed percentage or guaranteed return before we've seen how your business actually works — every process is different. We'll give you a realistic view after discovery, not a number up front.",
  },
]

const groups = [
  { title: 'General', to: null, faqs: generalFaqs },
  { title: 'AI Bots & Agents', to: '/ai-bots', faqs: aiBotsFaqs },
  { title: 'Custom Web Development', to: '/web-development', faqs: webDevFaqs },
  { title: 'Custom Software Development', to: '/custom-software', faqs: customSoftwareFaqs },
  { title: 'Business Automation', to: '/business-automation', faqs: automationFaqs },
]

// Every question on this page, flattened for structured data — the schema must mirror
// exactly what's visibly rendered above, in one FAQPage block for the whole page.
const allFaqs = groups.flatMap((group) => group.faqs)

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
          <Badge className="mx-auto">FAQ</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Common <span className="text-gradient">questions</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            General questions below, plus service-specific ones grouped underneath. Don't
            see yours? Ask us directly.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

function FaqGroups() {
  return (
    <>
      {groups.map((group, index) => (
        <Section key={group.title} tone={index % 2 === 0 ? 'default' : 'muted'} aria-labelledby={`${group.title}-title`}>
          <div className="mx-auto max-w-2xl">
            <SectionHeading as="h2" id={`${group.title}-title`} title={group.title} className="mx-auto" align="center" />
            <Reveal delay={0.05}>
              <div className="mt-10">
                <Accordion items={group.faqs} />
              </div>
            </Reveal>
            {group.to && (
              <Reveal delay={0.1}>
                <p className="mt-6 text-center text-sm text-fg-subtle">
                  More on this — see{' '}
                  <Link to={group.to} className="font-semibold text-highlight hover:underline">
                    {group.title}
                  </Link>
                  .
                </p>
              </Reveal>
            )}
          </div>
        </Section>
      ))}
    </>
  )
}

function FinalCtaSection() {
  return (
    <Section tone="inverse" aria-labelledby="final-cta-title">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-title" className="text-2xl sm:text-3xl">
            Still have a question?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Ask us directly — we read every message ourselves.
          </p>
          <Button to={primaryCta.to} size="lg" className="mt-8">
            {primaryCta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

export default function Faq() {
  return (
    <>
      <Seo
        title="FAQ"
        description="Answers to common questions about working with OryanTechsol — AI bots, web development, custom software and automation."
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]} />
      <FaqSchema faqs={allFaqs} />
      <HeroSection />
      <FaqGroups />
      <FinalCtaSection />
    </>
  )
}
