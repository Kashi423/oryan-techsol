import { Calculator, Clock, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import PageHero from '@/components/layout/PageHero'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FaqSchema from '@/components/seo/FaqSchema'
import Seo from '@/components/seo/Seo'
import { Accordion, Button, Reveal, Section } from '@/components/ui'
import { cn } from '@/lib/cn'

// A free planning tool, deliberately honest: ranges are rough, the method is shown and nothing is
// collected. The base ranges match the figures in our cost guides (blog) so the numbers agree.
const projectTypes = [
  { id: 'website', label: 'Business website', hint: 'Marketing site, blog, CMS' },
  { id: 'store', label: 'Online store', hint: 'E-commerce with payments' },
  { id: 'webapp', label: 'Web app or portal', hint: 'Accounts, dashboards, workflows' },
  { id: 'mobile', label: 'Mobile app', hint: 'iOS and/or Android' },
  { id: 'ai', label: 'AI chatbot or agent', hint: 'Support, leads, internal help' },
  { id: 'automation', label: 'Automation & integrations', hint: 'Connect and automate your tools' },
]

const complexities = [
  { id: 0, label: 'Simple', hint: 'Few screens, standard features' },
  { id: 1, label: 'Standard', hint: 'Typical business needs' },
  { id: 2, label: 'Advanced', hint: 'Complex logic, scale or compliance' },
]

// [low, high] in USD by type and complexity index.
const base = {
  website: [[3000, 8000], [8000, 20000], [20000, 50000]],
  store: [[6000, 15000], [15000, 40000], [40000, 100000]],
  webapp: [[25000, 50000], [50000, 100000], [100000, 200000]],
  mobile: [[15000, 40000], [40000, 120000], [120000, 300000]],
  ai: [[3000, 10000], [10000, 30000], [30000, 80000]],
  automation: [[2000, 8000], [8000, 25000], [25000, 70000]],
}

// Base duration in weeks [low, high] by complexity index.
const weeks = [[3, 8], [8, 16], [16, 36]]

const addOns = [
  { id: 'accounts', label: 'User accounts & roles', pct: 0.08 },
  { id: 'payments', label: 'Online payments', pct: 0.1 },
  { id: 'admin', label: 'Admin dashboard', pct: 0.1 },
  { id: 'integrations', label: 'Third-party integrations (CRM, ERP, APIs)', pct: 0.12 },
  { id: 'ai', label: 'AI features', pct: 0.15 },
  { id: 'realtime', label: 'Real-time features (chat, maps, live updates)', pct: 0.1 },
  { id: 'multilang', label: 'Multiple languages', pct: 0.06 },
]

const platforms = [
  { id: 'cross', label: 'iOS + Android (one cross-platform codebase)', mult: 1 },
  { id: 'single', label: 'One platform only', mult: 0.7 },
  { id: 'native', label: 'Separate native iOS and Android apps', mult: 1.5 },
]

const money = (n) => "$" + (Math.round(n / 500) * 500).toLocaleString("en-US")

const faqs = [
  {
    question: 'How accurate is this estimate?',
    answer:
      'It is a rough planning range based on typical projects, not a quote. Real cost depends on your exact scope, design depth, integrations, team location and compliance needs. A short discovery phase turns the range into a firm plan.',
  },
  {
    question: 'Do you store the information I enter?',
    answer:
      'No. The calculator runs entirely in your browser and nothing you choose is sent to us or saved.',
  },
  {
    question: 'Why is the range so wide?',
    answer:
      'Software projects vary enormously. Two apps that sound alike can differ many times in effort because of design depth, integrations, security and how much needs to be custom. A wide range is the honest answer before scope is defined.',
  },
  {
    question: 'What is not included in the estimate?',
    answer:
      'Ongoing costs after launch such as hosting, third-party service fees, app store fees and maintenance. A common planning guide is to budget roughly 15–25% of the build cost per year for maintenance and improvements.',
  },
]

function Choice({ active, onClick, title, hint }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-xl border p-4 text-left transition-colors',
        active ? 'border-primary bg-primary/10 ring-2 ring-primary/30' : 'border-line-strong bg-surface-raised hover:border-highlight/50',
      )}
    >
      <span className="block font-display text-sm font-bold text-fg">{title}</span>
      {hint && <span className="mt-1 block text-xs text-fg-muted">{hint}</span>}
    </button>
  )
}

export default function CostEstimator() {
  const [type, setType] = useState('mobile')
  const [complexity, setComplexity] = useState(1)
  const [selected, setSelected] = useState(['accounts', 'admin'])
  const [platform, setPlatform] = useState('cross')

  const result = useMemo(() => {
    const [low, high] = base[type][complexity]
    const addPct = addOns.filter((a) => selected.includes(a.id)).reduce((sum, a) => sum + a.pct, 0)
    const platformMult = type === 'mobile' ? platforms.find((p) => p.id === platform).mult : 1
    const factor = (1 + addPct) * platformMult
    const [wLow, wHigh] = weeks[complexity]
    const wFactor = 1 + addPct * 0.8 + (type === 'mobile' && platform === 'native' ? 0.3 : 0)
    return {
      low: low * factor,
      high: high * factor,
      wLow: Math.round(wLow * wFactor),
      wHigh: Math.round(wHigh * wFactor),
    }
  }, [type, complexity, selected, platform])

  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <>
      <Seo
        title="Project Cost Estimator"
        description="Free software project cost estimator: get a realistic planning range and timeline for a website, online store, web app, mobile app, AI chatbot or automation project."
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Project Cost Estimator', path: '/tools/project-cost-estimator' },
        ]}
      />
      <FaqSchema faqs={faqs} />

      <PageHero
        size="md"
        align="center"
        eyebrow="Free tool"
        icon={Calculator}
        title="Project cost"
        accent="estimator."
        description="Pick what you want to build and get a realistic planning range and timeline in seconds. It runs in your browser: nothing is stored or sent."
        crumbs={[{ name: 'Project Cost Estimator' }]}
        meta={[
          { icon: ShieldCheck, label: 'Private: nothing is saved' },
          { icon: Clock, label: 'Takes 30 seconds' },
        ]}
      />

      <Section aria-labelledby="estimator-title">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <Reveal>
              <h2 id="estimator-title" className="text-xl normal-case">
                1. What are you building?
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {projectTypes.map((t) => (
                  <Choice key={t.id} active={type === t.id} onClick={() => setType(t.id)} title={t.label} hint={t.hint} />
                ))}
              </div>
            </Reveal>

            <div>
              <h2 className="text-xl normal-case">2. How complex is it?</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {complexities.map((c) => (
                  <Choice key={c.id} active={complexity === c.id} onClick={() => setComplexity(c.id)} title={c.label} hint={c.hint} />
                ))}
              </div>
            </div>

            {type === 'mobile' && (
              <div>
                <h2 className="text-xl normal-case">3. Which platforms?</h2>
                <div className="mt-4 grid gap-3">
                  {platforms.map((p) => (
                    <Choice key={p.id} active={platform === p.id} onClick={() => setPlatform(p.id)} title={p.label} />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl normal-case">{type === 'mobile' ? '4' : '3'}. What does it need?</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {addOns.map((a) => (
                  <Choice key={a.id} active={selected.includes(a.id)} onClick={() => toggle(a.id)} title={a.label} />
                ))}
              </div>
            </div>
          </div>

          <aside aria-live="polite" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-highlight/30 bg-highlight/5 p-6 sm:p-8">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-highlight uppercase">Planning range</p>
              <p className="mt-3 font-display text-3xl font-extrabold text-fg sm:text-4xl">
                {money(result.low)} – {money(result.high)}
              </p>
              <p className="mt-2 text-sm text-fg-muted">
                Typical timeline: <strong className="text-fg">{result.wLow}–{result.wHigh} weeks</strong>
              </p>
              <p className="mt-5 text-sm leading-relaxed text-fg-muted">
                A rough range from typical projects, in US dollars, not a quote. Ongoing hosting, services and maintenance
                are extra: budget roughly 15–25% of the build cost per year.
              </p>
              <Button to="/contact" size="lg" className="mt-6 w-full">
                Get a firm estimate
              </Button>
              <p className="mt-4 text-xs text-fg-subtle">
                Want to understand the numbers? Read{' '}
                <Link to="/blog/how-much-does-a-mobile-app-cost" className="font-semibold text-highlight underline">
                  how much a mobile app costs
                </Link>{' '}
                and{' '}
                <Link to="/blog/how-much-does-a-business-website-cost" className="font-semibold text-highlight underline">
                  what a business website costs
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-title" className="text-2xl normal-case sm:text-3xl">
            Estimator FAQs
          </h2>
          <div className="mt-6">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>
    </>
  )
}
