import {
  ArrowUpRight,
  Bot,
  Building2,
  CalendarCheck,
  GraduationCap,
  Hotel,
  LayoutTemplate,
  Pill,
  Rocket,
  Scissors,
  ShoppingCart,
  Smartphone,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router'
import { Reveal, Section } from '@/components/ui'
import { solutions } from '@/data/solutions'

// One icon per solution page (keyed by slug); pages without one fall back to a generic mark.
const solutionIcons = {
  'pharmacy-pos-software': Pill,
  'school-management-software': GraduationCap,
  'clinic-management-software': Stethoscope,
  'hotel-booking-website': Hotel,
  'ecommerce-store-development': ShoppingCart,
  'ai-chatbot-for-business': Bot,
  'business-automation-services': Workflow,
  'mobile-app-development-for-business': Smartphone,
  'appointment-booking-system': CalendarCheck,
  'restaurant-ordering-website': UtensilsCrossed,
  'salon-spa-booking-website': Scissors,
  'real-estate-website-development': Building2,
  'retail-pos-and-inventory-software': Store,
  'saas-mvp-development': Rocket,
  'website-redesign-for-small-business': LayoutTemplate,
}

// A compact grid of every solution page: two columns of small tiles on a phone, more as the
// screen widens. Reads from src/data/solutions.js, so a new page shows up here automatically.
export default function SolutionsShowcase() {
  return (
    <Section tone="inverse" aria-labelledby="solutions-title">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-bold tracking-[0.2em] text-highlight uppercase">Solutions</p>
          <h2 id="solutions-title" className="mt-3 text-2xl sm:text-3xl">
            Systems and sites we build, by industry
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {solutions.map((solution) => {
            const Icon = solutionIcons[solution.slug] ?? LayoutTemplate
            return (
              <li key={solution.slug}>
                <Link
                  to={`/solutions/${solution.slug}`}
                  className="group relative flex h-full flex-col items-center gap-2 rounded-xl border border-line bg-surface-raised p-3 text-center transition-colors duration-200 hover:border-highlight/50 hover:bg-highlight/5 sm:p-4"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] text-white sm:size-11">
                    <Icon className="size-[18px] sm:size-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs leading-snug font-semibold text-fg sm:text-sm">{solution.eyebrow}</span>
                  <ArrowUpRight
                    className="absolute top-2 right-2 size-3.5 text-fg-subtle transition-colors duration-200 group-hover:text-highlight"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
