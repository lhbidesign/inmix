import { useState } from 'react'
import {
  Bars3Icon, MagnifyingGlassIcon,
  ChevronDownIcon, ArrowUpTrayIcon, CheckIcon, SparklesIcon,
} from '@heroicons/react/24/outline'
import { AppSidebar } from '@/components/AppSidebar'
import { TabGroup } from '@/components/ui/tab-group'

const S = 1

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
  const [activeTab, setActiveTab]               = useState<'official' | 'community' | 'mine'>('official')
  const [search, setSearch]                     = useState('')
  const [genre, setGenre]                       = useState('All Genres')
  const [showGenreMenu, setShowGenreMenu]       = useState(false)
  const [installed, setInstalled]               = useState<Set<number>>(new Set())

  const filtered = allPresets.filter(p => {
    const matchTab    = activeTab === 'official' ? p.type === 'official' : activeTab === 'community' ? p.type === 'community' : installed.has(p.id)
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    const matchGenre  = genre === 'All Genres' || p.genre === genre
    return matchTab && matchSearch && matchGenre
  })

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

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
              <h1 style={{ fontSize: '36px', fontWeight: 300, color: '#ffffff', lineHeight: 1.2 }}>
                Mix Presets
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                Browse, install, and share mix presets
              </p>
            </div>
            <button
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
              style={{ background: '#A8A8A8', color: '#000' }}
            >
              <ArrowUpTrayIcon className="w-4 h-4" strokeWidth={S} />
              Publish Preset
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-5">
            <TabGroup
              tabs={[
                { id: 'official',  label: 'Official'   },
                { id: 'community', label: 'Community'  },
                { id: 'mine',      label: 'My Presets' },
              ]}
              active={activeTab}
              onChange={setActiveTab}
              size="md"
            />
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
                        className="w-full text-left px-4 py-2 text-sm transition-colors hover:text-white"
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
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>
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
