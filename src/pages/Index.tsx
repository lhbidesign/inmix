import { Link } from 'react-router-dom'
import {
  Squares2X2Icon, FolderOpenIcon, DocumentDuplicateIcon,
  Cog6ToothIcon, MagnifyingGlassCircleIcon, ArrowRightIcon,
  SparklesIcon, SwatchIcon, GlobeAltIcon, UserGroupIcon,
  TagIcon, DocumentTextIcon, ShieldCheckIcon, ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'

const groups = [
  {
    title: 'Public pages',
    pages: [
      { label: 'Landing',        route: '/',         desc: 'Hero, workflow, pro tools, testimonials, FAQ',   icon: GlobeAltIcon,                  color: '#73ABBF', bg: 'rgba(115,171,191,0.1)' },
      { label: 'About',          route: '/about',    desc: 'Built for Artists — mission, technology, story', icon: UserGroupIcon,                 color: '#f472b6', bg: 'rgba(244,114,182,0.1)' },
      { label: 'Pricing',        route: '/pricing',  desc: 'Plans with monthly / annual toggle (−20%)',      icon: TagIcon,                       color: '#34d399', bg: 'rgba(52,211,153,0.1)'  },
      { label: 'Sign in / Up',   route: '/login',    desc: 'Auth — login and register flows',                icon: ArrowRightEndOnRectangleIcon,  color: '#818cf8', bg: 'rgba(129,140,248,0.1)' },
      { label: 'Terms',          route: '/terms',    desc: 'Terms & Conditions — INMIX AI LLC',              icon: DocumentTextIcon,              color: '#fbbf24', bg: 'rgba(251,191,36,0.1)'  },
      { label: 'Privacy',        route: '/privacy',  desc: 'Privacy Policy — data and audio handling',       icon: ShieldCheckIcon,               color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
    ],
  },
  {
    title: 'App',
    pages: [
      { label: 'Dashboard',      route: '/dashboard',    desc: 'Stats, projects, activity — New Project modal', icon: Squares2X2Icon,            color: '#818cf8', bg: 'rgba(129,140,248,0.1)' },
      { label: 'Projects',       route: '/projects',     desc: 'All projects list with cards and waveforms',    icon: FolderOpenIcon,            color: '#34d399', bg: 'rgba(52,211,153,0.1)'  },
      { label: 'Project Detail', route: '/projects/1',   desc: 'Mix view: stems, EQ, AI Mix, expandable FX',   icon: MagnifyingGlassCircleIcon, color: '#f97316', bg: 'rgba(249,115,22,0.1)'  },
      { label: 'Onboarding Tour',route: '/projects/1?wizard=true', desc: '20-step interactive wizard with spotlight', icon: SparklesIcon,       color: '#0011FF', bg: 'rgba(0,17,255,0.1)'   },
      { label: 'Presets',        route: '/presets',      desc: 'Presets marketplace with genre filters',        icon: DocumentDuplicateIcon,     color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
      { label: 'Settings',       route: '/settings',     desc: 'Account, notifications and audio settings',    icon: Cog6ToothIcon,             color: '#fbbf24', bg: 'rgba(251,191,36,0.1)'  },
    ],
  },
  {
    title: 'Design & Install',
    pages: [
      { label: 'Design System',  route: '/design-system', desc: 'Tokens, components, typography, colors, icons', icon: SwatchIcon,                color: '#73ABBF', bg: 'rgba(115,171,191,0.1)' },
    ],
  },
]

export default function Index() {
  return (
    <div className="min-h-screen px-6 py-12" style={{ background: '#07070b', color: '#fff' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <img src="/logo.svg" alt="inmix" style={{ height: '22px', marginBottom: '20px' }} />
          <h1 className="text-2xl font-light mb-1">Design Preview</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            All pages and flows — click to open.
          </p>
        </div>

        {/* Grouped page list */}
        <div className="space-y-8">
          {groups.map(group => (
            <div key={group.title}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3"
                 style={{ color: 'rgba(255,255,255,0.3)' }}>
                {group.title}
              </p>
              <div className="flex flex-col gap-2">
                {group.pages.map(({ label, route, desc, icon: Icon, color, bg }) => (
                  <Link
                    key={route}
                    to={route}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = `${color}44` }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                      <Icon className="w-4.5 h-4.5" strokeWidth={1.5} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm" style={{ color: '#fff' }}>{label}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.38)' }}>{desc}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <code className="text-[10px] px-2 py-0.5 rounded hidden sm:block"
                            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}>
                        {route}
                      </code>
                      <ArrowRightIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-center mt-12" style={{ color: 'rgba(255,255,255,0.18)' }}>
          INMIX — Design Preview · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
