import { cn } from '@/lib/cn'
import LogoMark from './LogoMark'

// "ORYAN" + "— TECHSOL —" as clean vectors, rebuilt from measurements of the official artwork
// (cap height, stem widths, kerning, the A with its solid wedge, hairline rules). Coordinates
// are the artwork's own, so the block's proportions match the master exactly.
// ORYAN uses currentColor; TECHSOL and the rules use the logo-sub token.
function Wordmark({ className }) {
  return (
    <svg
      viewBox="133 712 757 185"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor" fillRule="evenodd">
        {/* O */}
        <path d="M165 713H246A32 32 0 0 1 278 745V792A32 32 0 0 1 246 824H165A32 32 0 0 1 133 792V745A32 32 0 0 1 165 713ZM175 736H236A14 14 0 0 1 250 750V787A14 14 0 0 1 236 801H175A14 14 0 0 1 161 787V750A14 14 0 0 1 175 736Z" />
        {/* R — bowl counter kept closed (the stem is continuous) */}
        <path d="M303 713H406A30 30 0 0 1 436 743V757A29 29 0 0 1 408 786L441 824H407L375 787H330V824H303ZM330 736H393A15 15 0 0 1 408 751A15 15 0 0 1 393 766H330Z" />
        {/* Y */}
        <path d="M443 713H476L518 763L560 713H592L532 785V824H504V785Z" />
        {/* A — legs plus the solid wedge that replaces the crossbar */}
        <path d="M567 824H599L650.5 738L702 824H735L665 713H636Z" />
        <path d="M621 824L650.5 775L680 824Z" />
        {/* N */}
        <path d="M751 824V721Q751 713 759 713H783L862 792V713H890V812Q890 824 878 824H858L778 744V824Z" />
      </g>
      <g className="fill-logo-sub stroke-logo-sub">
        {/* Hairline rules either side of TECHSOL */}
        <rect x="134" y="872" width="129" height="4" stroke="none" />
        <rect x="760" y="872" width="129" height="4" stroke="none" />
        {/* TECHSOL, drawn as stroked squared letterforms */}
        <g fill="none" strokeWidth="9" strokeLinejoin="round">
          <path d="M291 856.5H330M310.5 856.5V896" />
          <path d="M392 856.5H362.5V891.5H392M362.5 874H388" />
          <path d="M462 856.5H433Q423.5 856.5 423.5 866V882Q423.5 891.5 433 891.5H462" />
          <path d="M494.5 852V896M525.5 852V896M494.5 874H525.5" />
          <path d="M592 856.5H568Q563.5 856.5 563.5 861V869.5Q563.5 874 568 874H588Q592.5 874 592.5 878.5V887Q592.5 891.5 588 891.5H560" />
          <rect x="626.5" y="856.5" width="39" height="35" rx="14" />
          <path d="M703.5 852V891.5H732" />
        </g>
      </g>
    </svg>
  )
}

// Horizontal lockup: mark + wordmark block. This is the ONLY place the lockup is defined;
// Header and Footer both render it. The tagline ("Innovate - Integrate - Elevate.") is set as
// live text where needed (see siteConfig.pillars).
export default function Logo({ className, markClassName }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark boost={3} className={cn('size-11', markClassName)} />
      <Wordmark className="h-8 w-auto text-fg" />
      <span className="sr-only">Oryan Techsol</span>
    </span>
  )
}
