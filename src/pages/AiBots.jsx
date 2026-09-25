import {
  ArrowRight,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Brain,
  Building2,
  CalendarCheck,
  Compass,
  Database,
  FileText,
  Globe,
  Hammer,
  Headset,
  HelpCircle,
  ListChecks,
  MessageCircle,
  Plug2,
  RefreshCw,
  Rocket,
  Search,
  Ticket,
  TrendingUp,
  UserPlus,
  User,
  Workflow,
  Zap,
} from 'lucide-react'
import { Fragment } from 'react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import Seo from '@/components/seo/Seo'
import {
  Accordion,
  Badge,
  Button,
  CapabilityTile,
  Card,
  ProcessStepIcon,
  PulseRing,
  Reveal,
  Section,
  SectionHeading,
  ServiceCard,
  TypeCard,
} from '@/components/ui'
import { primaryCta } from '@/config/site'

const pageDescription =
  'Custom AI assistants and agents built around your business — for customer support, lead generation, appointments, internal knowledge and more.'

const capabilities = [
  { icon: HelpCircle, label: 'Answer questions' },
  { icon: UserPlus, label: 'Capture leads' },
  { icon: ListChecks, label: 'Qualify prospects' },
  { icon: CalendarCheck, label: 'Book appointments' },
  { icon: Search, label: 'Search business knowledge' },
  { icon: Ticket, label: 'Create tickets' },
  { icon: Bell, label: 'Send notifications' },
  { icon: RefreshCw, label: 'Update CRM' },
  { icon: FileText, label: 'Process documents' },
  { icon: Workflow, label: 'Automate repetitive tasks' },
]

const botTypes = [
  {
    icon: Headset,
    title: 'Customer Support AI',
    description: 'Handles common questions, tickets and requests instantly, escalating anything that needs a human.',
  },
  {
    icon: TrendingUp,
    title: 'Lead Generation AI',
    description: 'Engages visitors, captures details and qualifies interest before a lead reaches your sales team.',
  },
  {
    icon: Briefcase,
    title: 'Sales Assistant',
    description: 'Answers product questions, guides prospects and helps move conversations toward a decision.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Assistant',
    description: 'Books, reschedules and confirms appointments directly inside the conversation.',
  },
  {
    icon: BookOpen,
    title: 'Internal Knowledge Bot',
    description: "Gives your team instant answers from internal docs, policies and processes.",
  },
  {
    icon: Globe,
    title: 'Website AI Assistant',
    description: 'Lives on your site to answer visitor questions and guide them to the right page or action.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp AI Assistant',
    description: 'The same assistant, available on the channel your customers already use.',
  },
  {
    icon: FileText,
    title: 'Document AI',
    description: "Reads, extracts and processes information from documents so your team doesn't have to.",
  },
  {
    icon: Workflow,
    title: 'AI Workflow Agent',
    description: 'Goes beyond conversation to actually trigger actions across your other systems.',
  },
]

const flowSteps = [
  { icon: User, label: 'Customer' },
  { icon: Bot, label: 'AI Assistant' },
  { icon: Brain, label: 'Understands Request' },
  { icon: Database, label: 'Retrieves Information' },
  { icon: Zap, label: 'Takes Action' },
  { icon: Building2, label: 'Business System' },
]

// Categories of systems an AI bot CAN connect to — deliberately not naming specific
// third-party products as "supported", since no integration is implemented until it's
// actually scoped and built for a real engagement.
const integrationCategories = [
  { icon: UserPlus, label: 'Customer data (CRM)' },
  { icon: CalendarCheck, label: 'Calendars & scheduling' },
  { icon: Ticket, label: 'Support & ticketing tools' },
  { icon: Database, label: 'Databases & internal tools' },
  { icon: MessageCircle, label: 'Messaging channels' },
]

const useCases = [
  {
    icon: Headset,
    title: 'A growing e-commerce store',
    description: 'An AI assistant answers order-status questions instantly and flags anything unusual for a human.',
  },
  {
    icon: TrendingUp,
    title: 'A real estate agency',
    description: 'An AI agent qualifies property enquiries, books viewings, and can log the details straight into a CRM.',
  },
  {
    icon: BookOpen,
    title: 'A professional services firm',
    description: "An internal knowledge bot answers policy and process questions so the team doesn't interrupt each other.",
  },
  {
    icon: MessageCircle,
    title: 'A local service business',
    description: 'A WhatsApp assistant handles booking requests around the clock, even outside business hours.',
  },
]

const processSteps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description: 'Understand your workflow, customers and where an AI bot would actually help.',
  },
  {
    number: '02',
    icon: Compass,
    title: 'Plan',
    description: "Design the conversation flow, capabilities and what the bot should (and shouldn't) do.",
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Build',
    description: 'Develop and train the assistant around your real content and processes.',
  },
  {
    number: '04',
    icon: Plug2,
    title: 'Integrate',
    description: 'Connect it to the channels and systems it needs — scoped to what your business actually uses.',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch & Improve',
    description: 'Deploy, monitor real conversations and refine the bot over time.',
  },
]

const faqs = [
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
  {
    question: 'What does the bot use to answer questions?',
    answer:
      "It's trained on your own content — docs, FAQs, policies and whatever source material is relevant — not generic, ungrounded internet knowledge.",
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes. A bot is monitored and refined after launch rather than treated as a one-off build.',
  },
]

function HeroBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0" />
      <div className="bg-glow absolute top-0 left-1/2 h-[36rem] w-[60rem] max-w-none -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}

// The hero visual: an actual conversation UI mockup, not a robot illustration — exactly
// what "AI bots" means in practice. Built from plain divs/tokens, so it re-tints correctly
// inside the inverse hero and needs no image asset.
function ChatMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-line bg-surface-overlay px-4 py-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-highlight/10 text-highlight">
          <Bot className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-sm font-bold text-fg">AI Assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
            Online
          </p>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-overlay px-3.5 py-2.5 text-sm text-fg">
          Hi! Can I check my order status?
        </div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm text-primary-fg">
          Sure — could you share your order number?
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-overlay px-3.5 py-2.5 text-sm text-fg">
          #48213
        </div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm text-primary-fg">
          Found it — it shipped yesterday and should arrive Thursday. Anything else?
        </div>
        <div className="flex items-center gap-1 px-1" aria-hidden="true">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="motion-safe:animate-pulse size-1.5 rounded-full bg-fg-subtle"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-3">
        <div className="h-9 flex-1 rounded-full bg-surface-overlay" />
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
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
              <Bot className="size-3.5 text-highlight" aria-hidden="true" />
              AI Bots & Agents
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              AI bots built around <span className="text-gradient">your business</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              We design and build custom AI assistants and agents that can communicate with
              customers, understand information and connect with your business workflows.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button to={primaryCta.to} size="lg">
                {primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button href="#use-cases-title" variant="secondary" size="lg">
                See example use cases
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ChatMockup />
        </Reveal>
      </div>
    </Section>
  )
}

function CapabilitiesSection() {
  return (
    <Section aria-labelledby="capabilities-title">
      <SectionHeading
        as="h2"
        id="capabilities-title"
        eyebrow="What AI bots can do"
        align="center"
        title="Real, practical capabilities."
        description="Not a generic chatbot script — an assistant that can actually do the parts of a conversation that used to need a person."
        className="mx-auto"
      />
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {capabilities.map((capability, index) => (
          <li key={capability.label}>
            <Reveal delay={index * 0.03}>
              <CapabilityTile icon={capability.icon} label={capability.label} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function BotTypesSection() {
  return (
    <Section tone="muted" aria-labelledby="types-title">
      <SectionHeading
        as="h2"
        id="types-title"
        eyebrow="Types of AI bots"
        align="center"
        title="Built for a specific job, not a generic script."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {botTypes.map((type, index) => (
          <li key={type.title}>
            <Reveal className="h-full" delay={index * 0.04}>
              <TypeCard icon={type.icon} title={type.title} description={type.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function FlowStep({ icon: Icon, label, index, total }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3 text-center">
      <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-highlight/10 text-highlight ring-1 ring-highlight/20 sm:size-16">
        <Icon className="size-6 sm:size-7" aria-hidden="true" />
        <PulseRing index={index} total={total} />
      </span>
      <p className="max-w-28 font-display text-xs font-semibold text-fg sm:text-sm">{label}</p>
    </div>
  )
}

function HowItWorksSection() {
  return (
    <Section aria-labelledby="how-title">
      <SectionHeading
        as="h2"
        id="how-title"
        eyebrow="How AI bots work"
        align="center"
        title="From a message to a completed action."
        description="The same underlying pipeline behind every bot type above — what changes is what it's connected to and trained on."
        className="mx-auto"
      />
      <Reveal delay={0.05}>
        <div className="mt-16 flex flex-col items-stretch gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
          {flowSteps.map((step, index) => (
            <Fragment key={step.label}>
              <FlowStep icon={step.icon} label={step.label} index={index} total={flowSteps.length} />
              {index < flowSteps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="flex h-8 shrink-0 items-center justify-center text-fg-subtle sm:h-auto sm:w-12"
                >
                  <ArrowRight className="hidden size-5 sm:block" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

function IntegrationSection() {
  return (
    <Section tone="muted" aria-labelledby="integration-title">
      <SectionHeading
        as="h2"
        id="integration-title"
        eyebrow="Business workflow integration"
        align="center"
        title="A bot is only useful if it can act, not just chat."
        description="The categories of systems a bot can connect to — the exact tools depend on what your business already uses, and are scoped during discovery, not promised in advance."
        className="mx-auto"
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {integrationCategories.map((category, index) => (
          <li key={category.label}>
            <Reveal delay={index * 0.04}>
              <Card className="flex h-full flex-col items-center gap-3 text-center">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-highlight/10 text-highlight ring-1 ring-highlight/20">
                  <category.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-semibold text-fg">{category.label}</span>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function UseCasesSection() {
  return (
    <Section aria-labelledby="use-cases-title">
      <SectionHeading
        as="h2"
        id="use-cases-title"
        eyebrow="Example use cases"
        align="center"
        title="Illustrative examples of what's possible."
        description="These are illustrative scenarios, not real client results — the exact scope for your business is worked out during discovery."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2">
        {useCases.map((useCase, index) => (
          <li key={useCase.title}>
            <Reveal className="h-full" delay={index * 0.05}>
              <TypeCard icon={useCase.icon} title={useCase.title} description={useCase.description} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function ProcessSection() {
  const lineInset = `${100 / (2 * processSteps.length)}%`
  return (
    <Section tone="muted" aria-labelledby="process-title">
      <SectionHeading
        as="h2"
        id="process-title"
        eyebrow="AI bot development process"
        align="center"
        title="The same five steps, applied to AI."
        className="mx-auto"
      />
      <ol className="relative mt-16 flex flex-col gap-10 sm:flex-row sm:gap-0" style={{ '--line-inset': lineInset }}>
        <div
          aria-hidden="true"
          className="absolute top-7 bottom-7 left-7 w-px bg-linear-to-b from-highlight/40 via-line-strong to-line-strong sm:bottom-auto sm:h-px sm:w-auto sm:inset-x-[var(--line-inset)] sm:bg-linear-to-r"
        />
        {processSteps.map((step, index) => (
          <li key={step.number} className="group relative sm:flex-1">
            <Reveal delay={index * 0.08}>
              <div className="flex gap-5 sm:flex-col sm:items-center sm:gap-4 sm:text-center">
                <ProcessStepIcon icon={step.icon} number={step.number} index={index} total={processSteps.length} />
                <div className="pb-1 sm:px-4">
                  <h3 className="font-display text-lg font-bold text-fg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{step.description}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function FaqSection() {
  return (
    <Section aria-labelledby="faq-title">
      <SectionHeading as="h2" id="faq-title" eyebrow="FAQ" align="center" title="Common questions." className="mx-auto" />
      <div className="mx-auto mt-12 max-w-2xl">
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  )
}

function RelatedServicesSection() {
  return (
    <Section tone="muted" aria-labelledby="related-title">
      <SectionHeading
        as="h2"
        id="related-title"
        eyebrow="Often paired with"
        align="center"
        title="Beyond the conversation."
        className="mx-auto"
      />
      <ul className="mx-auto mt-12 grid max-w-md gap-6">
        <li>
          <Reveal>
            <ServiceCard
              icon={Workflow}
              title="Business Automation"
              description="Connect what the bot does to the rest of your workflow — CRM updates, notifications, approvals and more."
              to="/business-automation"
            />
          </Reveal>
        </li>
      </ul>
    </Section>
  )
}

function FinalCtaBackground() {
  return (
    <>
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div className="bg-glow absolute top-1/2 left-1/2 h-[34rem] w-[34rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60" />
    </>
  )
}

function FinalCtaSection() {
  return (
    <Section tone="inverse" background={<FinalCtaBackground />} aria-labelledby="final-cta-title">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-title" className="text-3xl sm:text-4xl lg:text-5xl">
            Ready for an AI bot built around <span className="text-gradient">your business</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell us what you're trying to improve — we'll explore whether an AI bot is the
            right fit before we build anything.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={primaryCta.to} size="lg">
              {primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Tell us about your project
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default function AiBots() {
  return (
    <>
      <Seo title="AI Bots & Agents" description={pageDescription} />
      <ServiceSchema name="AI Bots & Agents" description={pageDescription} path="/ai-bots" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'AI Bots & Agents', path: '/ai-bots' }]} />
      <FaqSchema faqs={faqs} />
      <HeroSection />
      <CapabilitiesSection />
      <BotTypesSection />
      <HowItWorksSection />
      <IntegrationSection />
      <UseCasesSection />
      <ProcessSection />
      <FaqSection />
      <RelatedServicesSection />
      <FinalCtaSection />
    </>
  )
}
