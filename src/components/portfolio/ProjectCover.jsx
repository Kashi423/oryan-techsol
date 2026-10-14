// Cover artwork for each portfolio project. These are designed illustrations built from the
// project's real modules (no screenshots of private client systems, and no invented numbers):
// abstract bars/lines stand in for data, labels are the real feature names.
//
// Add a cover for a new project by adding a function to COVERS keyed by its slug; projects
// without one get a clean category-based fallback, so nothing breaks.

const W = 640
const H = 400

function Base({ children, id }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-hidden="true" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#051c4e" />
          <stop offset="0.55" stopColor="#0a3a86" />
          <stop offset="1" stopColor="#10a1c6" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="0.8" cy="0.1" r="0.7">
          <stop offset="0" stopColor="#5be4f4" stopOpacity="0.45" />
          <stop offset="1" stopColor="#5be4f4" stopOpacity="0" />
        </radialGradient>
        <pattern id={`grid-${id}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#ffffff" strokeOpacity="0.07" />
        </pattern>
        <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#020b24" floodOpacity="0.45" />
        </filter>
      </defs>
      <rect width={W} height={H} fill={`url(#bg-${id})`} />
      <rect width={W} height={H} fill={`url(#grid-${id})`} />
      <rect width={W} height={H} fill={`url(#glow-${id})`} />
      {children}
    </svg>
  )
}

// A browser-like window frame used by the web cover variants.
function Window({ x, y, w, h, id, title = '', children }) {
  return (
    <g filter={`url(#shadow-${id})`}>
      <rect x={x} y={y} width={w} height={h} rx="14" fill="#f8fafc" />
      <path d={`M${x} ${y + 14}a14 14 0 0 1 14-14h${w - 28}a14 14 0 0 1 14 14v18H${x}z`} fill="#e2e8f0" />
      <circle cx={x + 18} cy={y + 16} r="4" fill="#f87171" />
      <circle cx={x + 32} cy={y + 16} r="4" fill="#fbbf24" />
      <circle cx={x + 46} cy={y + 16} r="4" fill="#34d399" />
      {title && (
        <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="Inter, Arial, sans-serif">
          {title}
        </text>
      )}
      {children}
    </g>
  )
}

const Phone = ({ x, y, id, children }) => (
  <g filter={`url(#shadow-${id})`}>
    <rect x={x} y={y} width="104" height="208" rx="18" fill="#0b1220" />
    <rect x={x + 6} y={y + 8} width="92" height="192" rx="13" fill="#f8fafc" />
    <rect x={x + 38} y={y + 12} width="28" height="5" rx="2.5" fill="#0b1220" />
    {children}
  </g>
)

const T = (props) => <text fontFamily="Inter, Arial, sans-serif" {...props} />

function Aurex7({ id }) {
  const candles = [38, 52, 44, 66, 58, 74, 62, 84, 78, 96, 88, 108]
  return (
    <Base id={id}>
      <Window x={60} y={58} w={380} h={274} id={id} title="Trade">
        <rect x="76" y="94" width="230" height="150" rx="8" fill="#0b1b3f" />
        {candles.map((c, i) => {
          const x = 90 + i * 17
          const up = i % 3 !== 1
          return (
            <g key={i}>
              <line x1={x + 4} y1={236 - c - 14} x2={x + 4} y2={236 - c + 18} stroke={up ? '#34d399' : '#f87171'} strokeWidth="1.5" />
              <rect x={x} y={236 - c} width="8" height="22" rx="1.5" fill={up ? '#34d399' : '#f87171'} />
            </g>
          )
        })}
        <path d="M90 214 C130 190 150 206 190 168 S260 150 296 120" fill="none" stroke="#5be4f4" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="320" y="94" width="104" height="150" rx="8" fill="#eef2f7" />
        <T x="332" y="114" fontSize="9" fontWeight="700" fill="#051c4e">Order book</T>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x="332" y={124 + i * 18} width={50 - i * 4} height="6" rx="3" fill={i < 3 ? '#fca5a5' : '#86efac'} />
            <rect x={392} y={124 + i * 18} width="24" height="6" rx="3" fill="#cbd5e1" />
          </g>
        ))}
        <rect x="76" y="256" width="110" height="30" rx="8" fill="#10b981" />
        <T x="131" y="275" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">Buy</T>
        <rect x="196" y="256" width="110" height="30" rx="8" fill="#ef4444" />
        <T x="251" y="275" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">Sell</T>
        <rect x="320" y="256" width="104" height="30" rx="8" fill="#051c4e" />
        <T x="372" y="275" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">Earn</T>
      </Window>
      <Phone x={470} y={104} id={id}>
        <T x="490" y="140" fontSize="9" fontWeight="700" fill="#051c4e">Mining</T>
        <circle cx="522" cy="196" r="30" fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle cx="522" cy="196" r="30" fill="none" stroke="#10a1c6" strokeWidth="8" strokeDasharray="120 200" strokeLinecap="round" transform="rotate(-90 522 196)" />
        <rect x="486" y="248" width="72" height="22" rx="8" fill="#051c4e" />
        <T x="522" y="263" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Claim</T>
        <rect x="486" y="278" width="72" height="8" rx="4" fill="#e2e8f0" />
      </Phone>
    </Base>
  )
}

function Skylark({ id }) {
  const tiles = [
    ['#0e7490', '#67e8f9'],
    ['#7c3aed', '#c4b5fd'],
    ['#b45309', '#fcd34d'],
  ]
  return (
    <Base id={id}>
      <Window x={70} y={52} w={500} h={288} id={id} title="Stays">
        <rect x="90" y="92" width="460" height="46" rx="23" fill="#fff" stroke="#cbd5e1" />
        {['Destination', 'Dates', 'Guests', 'Rooms'].map((l, i) => (
          <g key={l}>
            <T x={116 + i * 108} y="112" fontSize="8" fontWeight="700" fill="#10a1c6">{l.toUpperCase()}</T>
            <rect x={116 + i * 108} y="119" width="56" height="5" rx="2.5" fill="#cbd5e1" />
          </g>
        ))}
        <rect x="488" y="99" width="54" height="32" rx="16" fill="#051c4e" />
        {tiles.map(([a, b], i) => (
          <g key={i}>
            <rect x={90 + i * 156} y="156" width="148" height="104" rx="12" fill={a} />
            <circle cx={90 + i * 156 + 112} cy="188" r="16" fill={b} opacity="0.9" />
            <path d={`M${90 + i * 156} 260 L${90 + i * 156 + 52} 206 L${90 + i * 156 + 92} 240 L${90 + i * 156 + 120} 218 L${90 + i * 156 + 148} 250 V260 Z`} fill="#fff" opacity="0.22" />
            <rect x={96 + i * 156} y="272" width="86" height="7" rx="3.5" fill="#94a3b8" />
            <rect x={96 + i * 156} y="287" width="56" height="6" rx="3" fill="#cbd5e1" />
            <rect x={96 + i * 156 + 92} y="268" width="48" height="20" rx="10" fill="#fef3c7" />
            <T x={96 + i * 156 + 116} y="282" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">VIP</T>
          </g>
        ))}
        <rect x="90" y="306" width="150" height="22" rx="11" fill="#051c4e" />
        <T x="165" y="321" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Members’ List</T>
      </Window>
    </Base>
  )
}

function School({ id }) {
  return (
    <Base id={id}>
      <Window x={50} y={56} w={400} h={286} id={id} title="School portal">
        <rect x="50" y="88" width="84" height="254" fill="#051c4e" />
        {['Students', 'Fees', 'Attendance', 'Results', 'Staff'].map((l, i) => (
          <g key={l}>
            <rect x="62" y={108 + i * 34} width="60" height="22" rx="6" fill={i === 2 ? '#10a1c6' : 'none'} />
            <T x="70" y={123 + i * 34} fontSize="9" fontWeight="600" fill="#e0f2fe">{l}</T>
          </g>
        ))}
        <rect x="150" y="104" width="86" height="54" rx="10" fill="#fff" stroke="#e2e8f0" />
        <rect x="248" y="104" width="86" height="54" rx="10" fill="#fff" stroke="#e2e8f0" />
        <rect x="346" y="104" width="86" height="54" rx="10" fill="#fff" stroke="#e2e8f0" />
        {[150, 248, 346].map((x, i) => (
          <g key={x}>
            <rect x={x + 10} y="116" width="36" height="6" rx="3" fill="#cbd5e1" />
            <rect x={x + 10} y="130" width={44 + i * 8} height="10" rx="5" fill={['#10a1c6', '#34d399', '#f59e0b'][i]} />
          </g>
        ))}
        <rect x="150" y="172" width="284" height="150" rx="10" fill="#fff" stroke="#e2e8f0" />
        <T x="164" y="192" fontSize="9" fontWeight="700" fill="#051c4e">Attendance</T>
        {[44, 70, 58, 88, 64, 96, 76].map((v, i) => (
          <rect key={i} x={170 + i * 36} y={308 - v} width="20" height={v} rx="4" fill={i === 5 ? '#10a1c6' : '#bae6fd'} />
        ))}
      </Window>
      <Phone x={486} y={96} id={id}>
        <T x="500" y="132" fontSize="9" fontWeight="700" fill="#051c4e">Homework</T>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="498" y={146 + i * 40} width="80" height="32" rx="8" fill="#f1f5f9" />
            <circle cx="512" cy={162 + i * 40} r="6" fill={['#10a1c6', '#f59e0b', '#34d399'][i]} />
            <rect x="524" y={157 + i * 40} width="42" height="5" rx="2.5" fill="#94a3b8" />
            <rect x="524" y={167 + i * 40} width="28" height="4" rx="2" fill="#cbd5e1" />
          </g>
        ))}
        <rect x="498" y="272" width="80" height="18" rx="9" fill="#fee2e2" />
        <T x="538" y="285" fontSize="8" fontWeight="700" fill="#b91c1c" textAnchor="middle">Absent alert</T>
      </Phone>
    </Base>
  )
}

function Pharmacy({ id }) {
  return (
    <Base id={id}>
      <Window x={60} y={56} w={520} h={288} id={id} title="Point of sale">
        <rect x="80" y="92" width="290" height="236" rx="10" fill="#fff" stroke="#e2e8f0" />
        <T x="96" y="114" fontSize="10" fontWeight="700" fill="#051c4e">Billing</T>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="96" y={128 + i * 34} width="258" height="26" rx="7" fill={i % 2 ? '#fff' : '#f8fafc'} />
            <rect x="106" y={137 + i * 34} width={92 - (i % 3) * 14} height="7" rx="3.5" fill="#94a3b8" />
            <rect x="262" y={137 + i * 34} width="30" height="7" rx="3.5" fill="#cbd5e1" />
            <rect x="308" y={137 + i * 34} width="34" height="7" rx="3.5" fill="#10a1c6" />
          </g>
        ))}
        <rect x="388" y="92" width="172" height="104" rx="10" fill="#051c4e" />
        <T x="404" y="116" fontSize="9" fontWeight="600" fill="#7dd3fc">Total</T>
        <rect x="404" y="128" width="96" height="14" rx="7" fill="#fff" opacity="0.9" />
        <rect x="404" y="158" width="140" height="26" rx="9" fill="#10a1c6" />
        <T x="474" y="176" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">Charge</T>
        <rect x="388" y="208" width="172" height="120" rx="10" fill="#fff" stroke="#e2e8f0" />
        <T x="404" y="228" fontSize="9" fontWeight="700" fill="#051c4e">Stock and expiry</T>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="404" y={242 + i * 26} width="100" height="8" rx="4" fill="#e2e8f0" />
            <rect x="404" y={242 + i * 26} width={[76, 52, 28][i]} height="8" rx="4" fill={['#34d399', '#f59e0b', '#ef4444'][i]} />
          </g>
        ))}
      </Window>
    </Base>
  )
}

function Clinic({ id }) {
  return (
    <Base id={id}>
      <Window x={50} y={56} w={400} h={286} id={id} title="Appointments">
        <T x="70" y="112" fontSize="10" fontWeight="700" fill="#051c4e">This week</T>
        {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
          <T key={i} x={104 + i * 66} y="134" fontSize="9" fontWeight="700" fill="#64748b" textAnchor="middle">{d}</T>
        ))}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4].map((c) => {
            const on = (r * 2 + c * 3) % 5 === 0
            return (
              <rect
                key={`${r}-${c}`}
                x={76 + c * 66}
                y={144 + r * 46}
                width="56"
                height="36"
                rx="8"
                fill={on ? ['#10a1c6', '#34d399', '#f59e0b'][(r + c) % 3] : '#f1f5f9'}
                opacity={on ? 0.95 : 1}
              />
            )
          }),
        )}
      </Window>
      <g filter={`url(#shadow-${id})`}>
        <rect x="446" y="100" width="150" height="212" rx="16" fill="#fff" />
        <circle cx="474" cy="128" r="14" fill="#051c4e" />
        <T x="474" y="132" fontSize="10" fontWeight="700" fill="#5be4f4" textAnchor="middle">AI</T>
        <T x="496" y="126" fontSize="9" fontWeight="700" fill="#051c4e">AI receptionist</T>
        <rect x="496" y="132" width="60" height="5" rx="2.5" fill="#cbd5e1" />
        <rect x="460" y="156" width="112" height="34" rx="10" fill="#f1f5f9" />
        <rect x="470" y="166" width="78" height="5" rx="2.5" fill="#94a3b8" />
        <rect x="470" y="177" width="54" height="5" rx="2.5" fill="#cbd5e1" />
        <rect x="486" y="200" width="96" height="34" rx="10" fill="#10a1c6" />
        <rect x="496" y="210" width="68" height="5" rx="2.5" fill="#fff" />
        <rect x="496" y="221" width="44" height="5" rx="2.5" fill="#bae6fd" />
        <rect x="460" y="246" width="112" height="22" rx="11" fill="#dcfce7" />
        <T x="516" y="261" fontSize="8" fontWeight="700" fill="#15803d" textAnchor="middle">Booked</T>
        <rect x="460" y="278" width="112" height="22" rx="11" fill="#f1f5f9" />
      </g>
    </Base>
  )
}

// Category fallbacks for projects without bespoke artwork.
function Generic({ id, label = '' }) {
  return (
    <Base id={id}>
      <Window x={110} y={62} w={420} h={276} id={id} title={label}>
        <rect x="130" y="98" width="120" height="14" rx="7" fill="#051c4e" />
        <rect x="130" y="124" width="250" height="8" rx="4" fill="#cbd5e1" />
        <rect x="130" y="140" width="200" height="8" rx="4" fill="#e2e8f0" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={130 + i * 130} y="170" width="118" height="140" rx="10" fill="#fff" stroke="#e2e8f0" />
            <rect x={142 + i * 130} y="184" width="30" height="30" rx="8" fill={['#10a1c6', '#34d399', '#f59e0b'][i]} />
            <rect x={142 + i * 130} y="228" width="80" height="7" rx="3.5" fill="#94a3b8" />
            <rect x={142 + i * 130} y="244" width="58" height="6" rx="3" fill="#cbd5e1" />
          </g>
        ))}
      </Window>
    </Base>
  )
}

const COVERS = {
  aurex7: Aurex7,
  skylark: Skylark,
  'school-crm-portal': School,
  'pharmacy-pos-system': Pharmacy,
  'clinic-appointment-records-portal': Clinic,
}

export default function ProjectCover({ slug = '', title = '', className = '' }) {
  const Cover = COVERS[slug] ?? Generic
  // A stable, unique prefix so several covers on one page never share SVG gradient ids.
  const id = (slug || 'project').replace(/[^a-z0-9]/gi, '')
  return (
    <div className={className} role="img" aria-label={title ? `${title} cover illustration` : undefined}>
      <Cover id={id} label={title} />
    </div>
  )
}
