import { Reveal, Section, SectionHeading } from '@/components/ui'
import { useTeam } from '@/lib/cms/store'
import { cn } from '@/lib/cn'

const hexagon = 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'

// Gradient-ringed hexagon portrait: an outer hexagon filled with the brand gradient, and an
// inner hexagon inset by `ring` px showing the photo (or a placeholder avatar when there is none).
function HexPortrait({ person, className, ring = 5 }) {
  return (
    <div
      aria-hidden={person.photo ? undefined : 'true'}
      className={cn('relative aspect-[0.9] bg-linear-to-br from-brand-700 via-brand-500 to-accent-400', className)}
      style={{ clipPath: hexagon }}
    >
      <div
        className="absolute flex items-center justify-center bg-brand-900"
        style={{ clipPath: hexagon, inset: ring }}
      >
        {person.photo ? (
          <img src={person.photo} alt={person.name} className="size-full object-cover" loading="lazy" />
        ) : (
          <svg viewBox="0 0 100 112" className="size-full text-brand-700" aria-hidden="true">
            <circle cx="50" cy="42" r="19" fill="currentColor" />
            <path d="M12 112c0-26 16-41 38-41s38 15 38 41z" fill="currentColor" />
          </svg>
        )}
      </div>
    </div>
  )
}

function Underline() {
  return <span aria-hidden="true" className="mt-2 block h-1 w-12 rounded-full bg-highlight" />
}

function LeadCard({ teamLead }) {
  return (
    <Reveal className="h-full">
      <div className="flex h-full flex-col gap-6 rounded-3xl border border-line-strong bg-surface-raised p-6 sm:p-8">
        <HexPortrait person={teamLead} ring={8} className="mx-auto w-full max-w-72" />
        <div>
          <h3 className="font-display text-2xl font-bold text-fg">{teamLead.name}</h3>
          <p className="mt-1 font-display text-base font-semibold text-highlight">{teamLead.role}</p>
          <Underline />
          {teamLead.bio && (
            <p className="mt-5 leading-relaxed text-fg-muted">{teamLead.bio}</p>
          )}
        </div>
      </div>
    </Reveal>
  )
}

function MemberCard({ person, index }) {
  return (
    <Reveal className="h-full" delay={index * 0.05}>
      <div className="flex h-full items-center gap-4 rounded-3xl border border-line bg-surface-raised p-5">
        <HexPortrait person={person} ring={4} className="w-24 shrink-0 sm:w-28" />
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold text-fg">{person.name}</h3>
          <p className="font-display text-sm font-semibold text-highlight">{person.role}</p>
          <Underline />
          {person.bio && <p className="mt-3 text-sm leading-relaxed text-fg-muted">{person.bio}</p>}
        </div>
      </div>
    </Reveal>
  )
}

export default function TeamSection() {
  const { lead: teamLead, members: teamMembers } = useTeam()
  return (
    <Section aria-labelledby="team-title">
      <SectionHeading
        as="h2"
        id="team-title"
        eyebrow="Our team"
        align="center"
        title="Meet the team."
        className="mx-auto"
      />
      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <LeadCard teamLead={teamLead} />
        </div>
        <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:col-span-3">
          {teamMembers.map((person, index) => (
            <li key={person.name}>
              <MemberCard person={person} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
