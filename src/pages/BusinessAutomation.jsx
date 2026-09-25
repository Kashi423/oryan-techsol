import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CalendarCheck,
  CircleCheck,
  Database,
  FileText,
  Globe,
  Headset,
  ListChecks,
  Mail,
  MessageSquare,
  RefreshCw,
  Send,
  Ticket,
  UserPlus,
  Workflow,
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
  Card,
  CaseStudyCard,
  PulseRing,
  Reveal,
  Section,
  SectionHeading,
  TypeCard,
} from '@/components/ui'
import { primaryCta } from '@/config/site'
import { caseStudies } from '@/data/caseStudies'

const pageDescription =
  'Automation for lead capture, customer support, CRM updates, document processing and more — designed around your existing workflow.'

const processes = [
  { icon: UserPlus, title: 'Lead capture', description: 'Catching interest the moment it happens, instead of it sitting in an inbox.' },
  { icon: ListChecks, title: 'Lead qualification', description: 'Sorting real prospects from browsing before your team spends time on either.' },
  { icon: Headset, title: 'Customer support', description: 'Handling common questions automatically, escalating what needs a person.' },
  { icon: CalendarCheck, title: 'Appointment scheduling', description: 'Booking, confirming and rescheduling without back-and-forth emails.' },
  { icon: Mail, title: 'Email workflows', description: 'Sending the right message at the right point in a process, automatically.' },
  { icon: RefreshCw, title: 'CRM updates', description: 'Keeping customer records current without manual re-entry.' },
  { icon: Database, title: 'Data processing', description: 'Moving and reshaping data between systems without a spreadsheet in between.' },
  { icon: FileText, title: 'Document processing', description: 'Extracting and routing information from documents automatically.' },
  { icon: Bell, title: 'Notifications', description: 'Alerting the right person the moment something needs attention.' },
  { icon: BarChart3, title: 'Reporting', description: 'Generating up-to-date reports from real data, not a manual export.' },
  { icon: Workflow, title: 'Internal workflows', description: 'Moving work between steps and people without anyone having to chase it.' },
]

const workflowDiagrams = [
  {
    title: 'Website lead to a followed-up sale',
    steps: [
      { icon: Globe, label: 'Website Lead' },
      { icon: Bot, label: 'AI Qualification' },
      { icon: Database, label: 'CRM' },
      { icon: Bell, label: 'Sales Notification' },
      { icon: Send, label: 'Follow-up' },
      { icon: BarChart3, label: 'Reporting' },
    ],
  },
  {
    title: 'A customer message to a resolved request',
    steps: [
      { icon: MessageSquare, label: 'Customer Message' },
      { icon: Bot, label: 'AI Triage' },
      { icon: Ticket, label: 'Answered or Ticketed' },
      { icon: RefreshCw, label: 'CRM Updated' },
      { icon: Bell, label: 'Team Notified' },
    ],
  },
  {
    title: 'A document to an updated system',
    steps: [
      { icon: FileText, label: 'Document Received' },
      { icon: Database, label: 'Data Extracted' },
      { icon: ListChecks, label: 'Validated' },
      { icon: RefreshCw, label: 'System Updated' },
      { icon: Bell, label: 'Notification Sent' },
    ],
  },
]

const faqs = [
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
  {
    question: 'What tools can this connect to?',
    answer:
      'Whatever your business already uses for the process being automated — the specific systems are scoped during discovery, not promised in advance.',
  },
  {
    question: 'Do you build on a specific automation platform?',
    answer:
      "The platform and approach are chosen per project based on what it actually needs, not a single tool we push regardless of fit.",
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes — automations are monitored and refined after launch rather than left as a one-off build.',
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

const heroWorkflowSteps = [
  { icon: Globe, kind: 'Trigger', label: 'New website enquiry' },
  { icon: Bot, kind: 'AI step', label: 'Qualify and tag the lead' },
  { icon: Database, kind: 'Action', label: 'Create contact in CRM' },
  { icon: Mail, kind: 'Action', label: 'Send tailored follow-up' },
  { icon: Bell, kind: 'Action', label: 'Notify the sales team' },
]

// The hero visual: a real-looking automation builder — a trigger, the steps it runs and the
// last run's result — built from tokens (no stock photo), in the same family as the browser,
// phone, chat and dashboard mockups on the other service pages.
function WorkflowMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface-raised p-5 shadow-card backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
            <Workflow className="size-4" aria-hidden="true" />
          </span>
          <p className="font-display text-sm font-bold text-fg">Lead follow-up</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
          <span className="relative flex size-1.5">
            <span className="motion-safe:absolute motion-safe:inline-flex motion-safe:size-full motion-safe:animate-ping motion-safe:rounded-full motion-safe:bg-success/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          Active
        </span>
      </div>
      <ol className="mt-4 space-y-0">
        {heroWorkflowSteps.map(({ icon: Icon, kind, label }, index) => (
          <li key={label} className="relative flex items-center gap-3 pb-2.5 last:pb-0">
            {index < heroWorkflowSteps.length - 1 && (
              <span aria-hidden="true" className="absolute top-9 bottom-0 left-[1.1rem] w-px bg-highlight/30" />
            )}
            <span
              className={
                index === 0
                  ? 'relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white'
                  : 'relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-highlight/10 text-highlight'
              }
            >
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <div className="flex-1 rounded-lg bg-surface-overlay px-3 py-2">
              <p className="text-[10px] font-semibold tracking-wide text-fg-subtle uppercase">{kind}</p>
              <p className="text-xs font-medium text-fg">{label}</p>
            </div>
            <CircleCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-overlay px-3 py-2.5 text-[11px]">
        <span className="font-medium text-fg-muted">Last run · 2m ago</span>
        <span className="font-semibold text-success">5 of 5 steps succeeded</span>
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
              <Workflow className="size-3.5 text-highlight" aria-hidden="true" />
              Business Automation
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Automation designed around <span className="text-gradient">your workflow</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl lg:mx-0">
              We connect the tools you already use and automate the repetitive steps in
              between — mapped to how your business actually operates, not a generic
              template.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button to={primaryCta.to} size="lg">
                {primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button href="#workflows-title" variant="secondary" size="lg">
                See example workflows
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <WorkflowMockup />
        </Reveal>
      </div>
    </Section>
  )
}

function ProcessesSection() {
  return (
    <Section aria-labelledby="processes-title">
      <SectionHeading
        as="h2"
        id="processes-title"
        eyebrow="What we automate"
        align="center"
        title="The repetitive parts of running a business."
        className="mx-auto"
      />
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {processes.map((process, index) => (
          <li key={process.title}>
            <Reveal className="h-full" delay={index * 0.03}>
              <TypeCard icon={process.icon} title={process.title} description={process.description} />
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
      <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-highlight/10 text-highlight ring-1 ring-highlight/20 sm:size-14">
        <Icon className="size-5 sm:size-6" aria-hidden="true" />
        <PulseRing index={index} total={total} />
      </span>
      <p className="max-w-24 font-display text-xs font-semibold text-fg">{label}</p>
    </div>
  )
}

// One reusable diagram renderer, called for each example workflow — several diagrams,
// one implementation, so a fourth example is just another entry in workflowDiagrams above.
function WorkflowDiagram({ title, steps, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Card>
        <p className="text-center font-display text-sm font-bold text-fg sm:text-left">{title}</p>
        <div className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
          {steps.map((step, index) => (
            <Fragment key={step.label}>
              <FlowStep icon={step.icon} label={step.label} index={index} total={steps.length} />
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="flex h-6 shrink-0 items-center justify-center text-fg-subtle sm:h-auto sm:w-8"
                >
                  <ArrowRight className="hidden size-4 sm:block" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Card>
    </Reveal>
  )
}

function WorkflowsSection() {
  return (
    <Section tone="muted" aria-labelledby="workflows-title">
      <SectionHeading
        as="h2"
        id="workflows-title"
        eyebrow="Example workflows"
        align="center"
        title="What this actually looks like."
        description="A few example flows — the exact steps, tools and triggers are mapped to your existing workflow, not copied from a template."
        className="mx-auto"
      />
      <div className="mt-12 space-y-6">
        {workflowDiagrams.map((diagram, index) => (
          <WorkflowDiagram key={diagram.title} title={diagram.title} steps={diagram.steps} delay={index * 0.06} />
        ))}
      </div>
    </Section>
  )
}

function TailoredSection() {
  return (
    <Section aria-labelledby="tailored-title">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            as="h2"
            id="tailored-title"
            eyebrow="Built around your business"
            title="Not a template — a map of how you already work."
            description="Every workflow above is an example, not a fixed package. We start by understanding your actual process, tools and rules, then automate that — not a generic version of it."
            align="center"
            className="mx-auto"
          />
          <p className="mx-auto mt-6 max-w-2xl text-sm text-fg-subtle italic">
            We won't promise a fixed percentage of time saved or a guaranteed return before
            we've seen how your business actually operates — that's what discovery is for.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

function PortfolioSection() {
  const automationProjects = caseStudies.filter((project) => project.category === 'automation')
  return (
    <Section tone="muted" aria-labelledby="portfolio-title">
      <SectionHeading
        as="h2"
        id="portfolio-title"
        eyebrow="Portfolio"
        align="center"
        title="Examples of what we build."
        description="Real projects are added here as they ship. The example below is a clearly marked placeholder."
        className="mx-auto"
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {automationProjects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 0.05}>
              <CaseStudyCard
                title={project.title}
                industry={project.industry}
                solutionType={project.solutionType}
                description={project.problem}
                tags={project.technology}
                result={project.result}
                placeholder={project.placeholder}
                to={`/portfolio/${project.slug}`}
              />
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal delay={0.1}>
        <div className="mt-10 text-center">
          <Button to="/portfolio" variant="secondary">
            View full portfolio
          </Button>
        </div>
      </Reveal>
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
            Ready to automate the repetitive parts of <span className="text-gradient">your business</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell us which process is taking up too much time — we'll map out whether
            automation is the right fix before we build anything.
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

export default function BusinessAutomation() {
  return (
    <>
      <Seo title="Business Automation" description={pageDescription} />
      <ServiceSchema name="Business Automation" description={pageDescription} path="/business-automation" />
      <BreadcrumbSchema
        items={[{ name: 'Home', path: '/' }, { name: 'Business Automation', path: '/business-automation' }]}
      />
      <FaqSchema faqs={faqs} />
      <HeroSection />
      <ProcessesSection />
      <WorkflowsSection />
      <TailoredSection />
      <PortfolioSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
