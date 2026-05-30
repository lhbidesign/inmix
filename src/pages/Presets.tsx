import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Squares2X2Icon, FolderOpenIcon, Cog6ToothIcon,
  XMarkIcon, Bars3Icon, ChevronLeftIcon, ChevronRightIcon,
  ArrowRightOnRectangleIcon, MagnifyingGlassIcon,
  ChevronDownIcon, DocumentDuplicateIcon, PlayCircleIcon,
  UsersIcon, ArrowUpTrayIcon, CheckIcon, SparklesIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const S = 1

const navItems = [
  { icon: Squares2X2Icon,        label: 'Dashboard',     href: '/dashboard' },
  { icon: FolderOpenIcon,        label: 'Projects',       href: '/dashboard' },
  { icon: DocumentDuplicateIcon, label: 'Presets',        href: '/presets'   },
  { icon: PlayCircleIcon,        label: 'Listen',         href: '/dashboard' },
  { icon: UsersIcon,             label: 'Collaborators',  href: '/dashboard' },
]

// ── Data ─────────────────────────────────────────────────────────────────────

const genreColor: Record<string, { text: string; bg: string }> = {
  'HIP-HOP':  { text: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  'R&B':      { text: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
  'EDM':      { text: '#4ade80', bg: 'rgba(74,222,128,0.12)'  },
  'POP':      { text: '#f472b6', bg: 'rgba(244,114,182,0.12)' },
  'LO-FI':    { text: '#22d3ee', bg: 'rgba(34,211,238,0.12)'  },
  'ACOUSTIC': { text: '#2dd4bf', bg: 'rgba(45,212,191,0.12)'  },
  'JAZZ':     { text: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  'ROCK':     { text: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

const typeStyle = {
  official:  { text: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.25)'  },
  community: { text: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)' },
}

interface Preset {
  id: number
  name: string
  desc: string
  genre: string
  type: 'official' | 'community'
  installs: number
  low: number
  mid: number
  high: number
  comp: number
  reverb: number
}

const allPresets: Preset[] = [
  { id: 1, name: 'Hip-Hop Banger',   desc: 'Punchy low-end with tight compression',    genre: 'HIP-HOP',  type: 'official',  installs: 201, low:  3, mid:  0, high: -2, comp: 0.7, reverb: 0.2 },
  { id: 2, name: 'Late Night R&B',   desc: 'Warm mids, smooth reverb tail',             genre: 'R&B',      type: 'official',  installs: 124, low:  2, mid: -1, high:  1, comp: 0.6, reverb: 0.4 },
  { id: 3, name: 'Festival EDM',     desc: 'Wide stereo, heavy sidechain',              genre: 'EDM',      type: 'official',  installs:  89, low:  4, mid:  0, high:  2, comp: 0.8, reverb: 0.5 },
  { id: 4, name: 'Warm Vocal Chain', desc: 'Bright presence with light airy reverb',   genre: 'POP',      type: 'community', installs:  45, low:  1, mid:  2, high:  3, comp: 0.4, reverb: 0.6 },
  { id: 5, name: 'Chill Lo-Fi',      desc: 'Dusty lows, rolled-off highs',             genre: 'LO-FI',    type: 'community', installs:  23, low:  1, mid: -1, high: -2, comp: 0.3, reverb: 0.7 },
  { id: 6, name: 'Acoustic Folk',    desc: 'Natural EQ with warm room reverb',         genre: 'ACOUSTIC', type: 'community', installs:  12, low: -1, mid:  1, high:  2, comp: 0.2, reverb: 0.3 },
  { id: 7, name: 'Jazz Club',        desc: 'Smooth highs with soft room ambiance',     genre: 'JAZZ',     type: 'official',  installs:  67, low: -1, mid:  1, high:  1, comp: 0.3, reverb: 0.6 },
  { id: 8, name: 'Rock Arena',       desc: 'Loud mids, driven guitars, punchy kick',   genre: 'ROCK',     type: 'community', installs:  38, low:  2, mid:  3, high:  1, comp: 0.9, reverb: 0.2 },
  { id: 9, name: 'Dream Pop',        desc: 'Airy reverb, gentle highs, floaty feel',  genre: 'POP',      type: 'community', installs:  19, low: -1, mid:  0, high:  2, comp: 0.2, reverb: 0.8 },
]

const genres = ['All Genres', 'HIP-HOP', 'R&B', 'EDM', 'POP', 'LO-FI', 'ACOUSTIC', 'JAZZ', 'ROCK']

// ── Component ─────────────────────────────────────────────────────────────────

export default function Presets() {
  const [sidebarOpen, setSidebarOpen]           = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab]               = useState<'official' | 'community' | 'mine'>('official')
  const [search, setSearch]                     = useState('')
  const [genre, setGenre]                       = useState('All Genres')
  const [showGenreMenu, setShowGenreMenu]       = useState(false)
  const [installed, setInstalled]               = useState<Set<number>>(new Set())

  const location = useLocation()
  const navigate = useNavigate()

  function isNavActive(label: string) {
    if (label === 'Dashboard') return location.pathname === '/dashboard'
    if (label === 'Projects')  return location.pathname.startsWith('/projects')
    if (label === 'Presets')   return location.pathname === '/presets'
    return false
  }

  const filtered = allPresets.filter(p => {
    const matchTab    = activeTab === 'official' ? p.type === 'official' : activeTab === 'community' ? p.type === 'community' : installed.has(p.id)
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    const matchGenre  = genre === 'All Genres' || p.genre === genre
    return matchTab && matchSearch && matchGenre
  })

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          'w-[90vw] flex-shrink-0 flex-col border-r transition-all duration-300 overflow-hidden',
          sidebarOpen ? 'flex fixed inset-y-0 left-0 z-50' : 'hidden lg:flex',
          sidebarCollapsed ? 'lg:w-14' : 'lg:w-60'
        )}
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--gradient-sidebar)' }}
      >
        {sidebarCollapsed ? (
          <div className="flex items-center justify-center px-2 py-[18px] flex-shrink-0">
            <button
              className="hidden lg:flex p-1 rounded-md transition-colors hover:opacity-70"
              style={{ color: '#ffffff' }}
              onClick={() => setSidebarCollapsed(false)}
              title="Expand sidebar"
            >
              <ChevronRightIcon className="w-4 h-4" strokeWidth={S} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 py-5 flex-shrink-0">
            <Link to="/dashboard"><img src="/logo.svg" alt="INMIX" style={{ height: '22px', width: 'auto' }} /></Link>
            <div className="flex items-center gap-1">
              <button
                className="hidden lg:flex p-1 rounded-md transition-colors hover:opacity-70"
                style={{ color: '#ffffff' }}
                onClick={() => setSidebarCollapsed(true)}
                title="Collapse sidebar"
              >
                <ChevronLeftIcon className="w-4 h-4" strokeWidth={S} />
              </button>
              <button className="lg:hidden p-1 rounded-md" style={{ color: 'var(--color-muted-foreground)' }} onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="w-5 h-5" strokeWidth={S} />
              </button>
            </div>
          </div>
        )}

        <Separator />

        <nav className={cn('flex-1 py-4 space-y-0.5', sidebarCollapsed ? 'px-2' : 'px-3')}>
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              to={href}
              className={cn(
                'w-full flex items-center rounded-lg text-sm font-medium transition-colors hover:text-[var(--color-primary)]',
                sidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
              )}
              style={isNavActive(label)
                ? { background: 'rgba(255,255,255,0.18)', color: '#ffffff' }
                : { color: 'var(--color-primary)' }
              }
              title={sidebarCollapsed ? label : undefined}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={S} />
              {!sidebarCollapsed && label}
            </Link>
          ))}
        </nav>

        <Separator />

        <div className={cn('py-4 space-y-0.5', sidebarCollapsed ? 'px-2' : 'px-3')}>
          {sidebarCollapsed ? (
            <>
              <Link
                to="/settings"
                className="w-full flex justify-center p-2.5 rounded-lg transition-colors hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
                title="Settings"
              >
                <Cog6ToothIcon className="w-[18px] h-[18px]" strokeWidth={S} />
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center p-2.5 rounded-lg transition-colors"
                style={{ color: 'rgba(239,68,68,0.7)' }}
                title="Log out"
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.7)')}
              >
                <ArrowRightOnRectangleIcon className="w-[18px] h-[18px]" strokeWidth={S} />
              </button>
              <div className="flex justify-center py-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                  DS
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/settings"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
              >
                <Cog6ToothIcon className="w-[18px] h-[18px]" strokeWidth={S} />
                Settings
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
                style={{ color: 'rgba(239,68,68,0.7)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.7)')}
              >
                <ArrowRightOnRectangleIcon className="w-[18px] h-[18px]" strokeWidth={S} />
                Log out
              </button>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                  DS
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--color-primary)' }}>David Suarez</p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-muted-foreground)' }}>Pro Plan</p>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        <div className="flex items-center lg:hidden px-5 py-3 border-b flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button className="p-1.5 rounded-lg" style={{ color: 'var(--color-muted-foreground)' }} onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="w-5 h-5" strokeWidth={S} />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto px-6 py-8">

          {/* Page header */}
          <div className="flex items-start justify-between mb-7 gap-4">
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-primary)', lineHeight: 1.2 }}>
                Mix Presets
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                Browse, install, and share mix presets
              </p>
            </div>
            <button
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
              style={{ background: '#A8A8A8', color: '#000' }}
            >
              <ArrowUpTrayIcon className="w-4 h-4" strokeWidth={S} />
              Publish Preset
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: 'var(--color-input)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {([
              { id: 'official',  label: 'Official'   },
              { id: 'community', label: 'Community'  },
              { id: 'mine',      label: 'My Presets' },
            ] as const).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
                style={activeTab === id
                  ? { background: 'var(--color-accent)', color: 'var(--color-primary)', border: '1px solid rgba(255,255,255,0.08)' }
                  : { color: 'var(--color-muted-foreground)', border: '1px solid transparent' }
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
              <input
                type="text"
                placeholder="Search presets..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-colors"
                style={{ background: 'var(--color-input)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-foreground)' }}
              />
            </div>

            {/* Genre dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowGenreMenu(v => !v)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors"
                style={{ background: 'var(--color-input)', border: '1px solid rgba(255,255,255,0.08)', color: genre === 'All Genres' ? 'var(--color-muted-foreground)' : 'var(--color-foreground)' }}
              >
                {genre}
                <ChevronDownIcon className="w-3.5 h-3.5" strokeWidth={S} />
              </button>
              {showGenreMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowGenreMenu(false)} />
                  <div className="absolute left-0 top-full mt-1 z-20 rounded-lg overflow-hidden py-1 min-w-[140px]"
                    style={{ background: 'var(--color-popover)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                    {genres.map(g => (
                      <button
                        key={g}
                        onClick={() => { setGenre(g); setShowGenreMenu(false) }}
                        className="w-full text-left px-4 py-2 text-sm transition-colors hover:text-[var(--color-primary)]"
                        style={{ color: g === genre ? 'var(--color-primary)' : 'var(--color-muted-foreground)', background: g === genre ? 'var(--color-accent)' : 'transparent' }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <SparklesIcon className="w-10 h-10" strokeWidth={0.8} style={{ color: 'var(--color-muted-foreground)' }} />
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                {activeTab === 'mine' ? 'No installed presets yet. Browse Official or Community.' : 'No presets match your search.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(p => (
                <PresetCard
                  key={p.id}
                  preset={p}
                  installed={installed.has(p.id)}
                  onInstall={() => setInstalled(prev => {
                    const next = new Set(prev)
                    next.has(p.id) ? next.delete(p.id) : next.add(p.id)
                    return next
                  })}
                />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

// ── PresetCard ────────────────────────────────────────────────────────────────

function PresetCard({ preset, installed, onInstall }: {
  preset: Preset
  installed: boolean
  onInstall: () => void
}) {
  const gc  = genreColor[preset.genre] ?? { text: '#a0a0a0', bg: 'rgba(160,160,160,0.1)' }
  const tc  = typeStyle[preset.type]

  const params = [
    { label: 'Low',   value: preset.low   },
    { label: 'Mid',   value: preset.mid   },
    { label: 'High',  value: preset.high  },
    { label: 'Comp',  value: preset.comp  },
    { label: 'Reverb',value: preset.reverb },
  ]

  return (
    <div
      className="flex flex-col rounded-xl border overflow-hidden transition-all"
      style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--gradient-card)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
    >
      <div className="p-4 flex-1">
        {/* Top row: tags + installs */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: gc.text, background: gc.bg }}
          >
            {preset.genre}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: tc.text, background: tc.bg, border: `1px solid ${tc.border}` }}
          >
            {preset.type}
          </span>
          <span className="ml-auto text-xs tabular-nums" style={{ color: 'var(--color-muted-foreground)' }}>
            {preset.installs.toLocaleString()} installs
          </span>
        </div>

        {/* Title + desc */}
        <h3 className="text-base font-medium mb-1">{preset.name}</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--color-muted-foreground)' }}>{preset.desc}</p>

        {/* Params */}
        <div className="flex gap-1.5">
          {params.map(({ label, value }) => (
            <div
              key={label}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-xs font-medium tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(1) : value}
              </span>
              <span className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Install button */}
      <button
        onClick={onInstall}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.07)',
          color: installed ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
          background: installed ? 'rgba(115,171,191,0.08)' : 'transparent',
        }}
        onMouseEnter={e => { if (!installed) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        onMouseLeave={e => { if (!installed) e.currentTarget.style.background = 'transparent' }}
      >
        {installed
          ? <><CheckIcon className="w-3.5 h-3.5" strokeWidth={2} /> Installed</>
          : 'Install to My Presets'
        }
      </button>
    </div>
  )
}
