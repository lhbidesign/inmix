import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Squares2X2Icon, FolderOpenIcon, MusicalNoteIcon, Cog6ToothIcon,
  MagnifyingGlassIcon, XMarkIcon, Bars3Icon, ChevronLeftIcon, ChevronRightIcon,
  EllipsisHorizontalIcon, EllipsisVerticalIcon, PlayIcon, PauseIcon, BackwardIcon, ForwardIcon,
  ArrowPathIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, ArrowUpTrayIcon, ArrowRightOnRectangleIcon,
  SpeakerWaveIcon, AdjustmentsHorizontalIcon, TrashIcon,
  DocumentDuplicateIcon, PlayCircleIcon, UsersIcon, BoltIcon, ClockIcon,
  SparklesIcon, SunIcon, ChevronDownIcon, ArrowsPointingOutIcon,
  FilmIcon, CloudIcon, StarIcon, ArrowDownTrayIcon, ShareIcon,
  MapPinIcon, TrophyIcon, GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const S = 1

// ── Data ──────────────────────────────────────────────────────────────────────

const navItems = [
  { icon: Squares2X2Icon,       label: 'Dashboard',    href: '/dashboard' },
  { icon: FolderOpenIcon,       label: 'Projects',      href: '/projects'  },
  { icon: DocumentDuplicateIcon, label: 'Presets',      href: '/presets'   },
  { icon: PlayCircleIcon,       label: 'Listen',        href: '/dashboard' },
  { icon: UsersIcon,            label: 'Collaborators', href: '/dashboard' },
]

const masterPresets = [
  { name: 'Clean',     desc: 'Transparent, flat response',       icon: SparklesIcon           },
  { name: 'Warmth',    desc: 'Low-end body, rolled-off highs',    icon: SunIcon                },
  { name: 'Punch',     desc: 'Fast glue comp, boosted mids',      icon: BoltIcon               },
  { name: 'Bright',    desc: 'Air shelf boost, presence forward', icon: StarIcon               },
  { name: 'Wide',      desc: 'Mid scoop, big stereo image',       icon: ArrowsPointingOutIcon  },
  { name: 'Loud',      desc: 'Aggressive glue, maximized',        icon: SpeakerWaveIcon        },
  { name: 'Vintage',   desc: 'Tape warmth, thick lows, classic',  icon: ClockIcon              },
  { name: 'Cinematic', desc: 'Wide dynamic range, air + sub',     icon: FilmIcon               },
  { name: 'HD',        desc: 'High-definition clarity, ultra',    icon: MagnifyingGlassIcon    },
  { name: 'Glue',      desc: 'Subtle bus compression that locks', icon: AdjustmentsHorizontalIcon },
  { name: 'Open Air',  desc: 'Airy, breathable mix — lifted',     icon: CloudIcon              },
  { name: 'Deep Bass', desc: 'Sub-boosted, bass-forward sound',   icon: BoltIcon               },
]

const initialBusSends = [
  { label: 'MASTER', value: 100 },
  { label: 'DRUMS',  value: 100 },
  { label: 'VOCALS', value: 100 },
  { label: 'INSTR',  value: 100 },
  { label: 'FX',     value: 100 },
]

// Smooth waveform via quadratic bezier through midpoints (catmull-rom style)
function buildSmoothPath(pts: [number, number][]): string {
  let d = `M${pts[0][0]},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const mx = ((pts[i][0] + pts[i + 1][0]) / 2).toFixed(1)
    const my = ((pts[i][1] + pts[i + 1][1]) / 2).toFixed(1)
    d += ` Q${pts[i][0]},${pts[i][1].toFixed(1)} ${mx},${my}`
  }
  const last = pts[pts.length - 1]
  return d + ` L${last[0]},${last[1].toFixed(1)}`
}

const wavePath1 = buildSmoothPath(
  Array.from({ length: 52 }, (_, i): [number, number] => [
    i * 20,
    28 + Math.sin(i * 0.48) * 11 + Math.sin(i * 1.15 + 0.9) * 5 + Math.sin(i * 2.6 + 1.4) * 2.5,
  ])
)

const wavePath2 = buildSmoothPath(
  Array.from({ length: 52 }, (_, i): [number, number] => [
    i * 20,
    28 + Math.sin(i * 0.6 + 1.2) * 7 + Math.sin(i * 1.4 + 0.4) * 3.5 + Math.sin(i * 3.1) * 1.5,
  ])
)

const typeColors: Record<string, string> = {
  DRUMS: 'text-emerald-400',
  VOCAL: 'text-violet-400',
  BASS:  'text-sky-400',
  INSTR: 'text-amber-400',
  KEYS:  'text-pink-400',
}

// Desaturated, premium-feeling waveform colors per type
const stemStrokeColors: Record<string, string> = {
  DRUMS: 'rgba(78, 160, 105, 0.55)',   // muted green
  VOCAL: 'rgba(128,  95, 200, 0.55)',  // muted violet
  BASS:  'rgba(60,  148, 185, 0.55)',  // muted sky (close to primary)
  INSTR: 'rgba(185, 148,  58, 0.55)',  // muted amber
  KEYS:  'rgba(185,  80, 155, 0.55)',  // muted pink
}

const stemAccentColors: Record<string, string> = {
  DRUMS: '#4ea069',
  VOCAL: '#805fc8',
  BASS:  '#3c94b9',
  INSTR: '#b99437',
  KEYS:  '#b9509b',
}

interface StemWave { top: string; bottom: string }

function buildStemWave(seed: number, freq: number, amp: number): StemWave {
  const amps = Array.from({ length: 52 }, (_, i): number =>
    Math.abs(
      Math.sin(i * freq + seed) * 11 * amp +
      Math.sin(i * freq * 2.3 + seed * 1.6) * 5 * amp +
      Math.sin(i * freq * 4.7 + seed * 0.8) * 2 * amp
    ) + 1.5
  )
  return {
    top:    buildSmoothPath(amps.map((a, i): [number, number] => [i * 20, 28 - a])),
    bottom: buildSmoothPath(amps.map((a, i): [number, number] => [i * 20, 28 + a])),
  }
}

const stemWaves: StemWave[] = [
  buildStemWave(0.3,  0.55, 1.1),   // 1 Drums      — fast, high amp
  buildStemWave(1.2,  0.40, 0.65),  // 2 Bkg Vocals — medium
  buildStemWave(2.1,  0.44, 0.80),  // 3 Vocal      — medium-high
  buildStemWave(0.8,  0.28, 1.15),  // 4 Bass       — slow, high amp
  buildStemWave(1.7,  0.38, 0.75),  // 5 Guitar
  buildStemWave(3.0,  0.52, 0.55),  // 6 Keyboard   — faster, lighter
  buildStemWave(0.5,  0.60, 1.0),   // 7 Percussion — fast, high amp
  buildStemWave(2.5,  0.58, 0.50),  // 8 Synth      — fast, light
]

const initialStems = [
  { id: 1, name: 'Drums',          type: 'DRUMS', volume: 80, pan: 0, muted: false, soloed: false },
  { id: 2, name: 'Backing Vocals', type: 'VOCAL', volume: 80, pan: 0, muted: false, soloed: false },
  { id: 3, name: 'Vocal',          type: 'VOCAL', volume: 80, pan: 0, muted: false, soloed: false },
  { id: 4, name: 'Bass',           type: 'BASS',  volume: 80, pan: 0, muted: false, soloed: false },
  { id: 5, name: 'Guitar',         type: 'INSTR', volume: 80, pan: 0, muted: false, soloed: false },
  { id: 6, name: 'Keyboard',       type: 'KEYS',  volume: 80, pan: 0, muted: false, soloed: false },
  { id: 7, name: 'Percussion',     type: 'DRUMS', volume: 80, pan: 0, muted: false, soloed: false },
  { id: 8, name: 'Synth',          type: 'KEYS',  volume: 80, pan: 0, muted: false, soloed: false },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const location = useLocation()
  const navigate = useNavigate()

  function isNavActive(label: string) {
    if (label === 'Dashboard') return location.pathname === '/dashboard'
    if (label === 'Projects')  return location.pathname.startsWith('/projects')
    if (label === 'Presets')   return location.pathname === '/presets'
    return false
  }
  const [sidebarOpen, setSidebarOpen]         = useState(false)
  const [mode, setMode]                       = useState<'mix' | 'arrange'>('mix')
  const [isPlaying, setIsPlaying]             = useState(false)
  const [loop, setLoop]                       = useState(false)
  const [masteringEnabled, setMasteringEnabled] = useState(false)
  const [selectedPreset, setSelectedPreset]   = useState('Clean')
  const [stems, setStems]                     = useState(initialStems)
  const [busSends, setBusSends]               = useState(initialBusSends)
  const [bpm, setBpm]                         = useState(120)
  const [songKey]                              = useState('A min')
  const [genre, setGenre]                     = useState('Pop')
  const [showGenreMenu, setShowGenreMenu]     = useState(false)
  const [showExportMenu, setShowExportMenu]   = useState(false)
  const [exportFormat, setExportFormat]       = useState<'WAV' | 'MP3' | 'FLAC' | 'STEMS'>('WAV')
  const [, setTapTimes]                        = useState<number[]>([])
  const [analyzing, setAnalyzing]             = useState(false)
  const [aiMixActive, setAiMixActive]         = useState(false)
  const [canUndo]                             = useState(false)
  const [canRedo]                             = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed]   = useState(false)
  const [mixConsoleOpen, setMixConsoleOpen]       = useState(false)
  const [mixIntensity, setMixIntensity]           = useState<'subtle' | 'balanced' | 'aggressive'>('balanced')
  const [mixFocus, setMixFocus]                   = useState<Set<string>>(new Set(['Balanced']))

  function handleTap() {
    const now = Date.now()
    setTapTimes(prev => {
      const recent = [...prev, now].filter(t => now - t < 3000)
      if (recent.length >= 2) {
        const intervals = recent.slice(1).map((t, i) => t - recent[i])
        const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length
        setBpm(Math.round(60000 / avg))
      }
      return recent
    })
  }

  function handleAnalyze() {
    setAnalyzing(true)
    setTimeout(() => setAnalyzing(false), 1800)
  }

  function updateStem(id: number, patch: Partial<{ id: number; name: string; type: string; volume: number; pan: number; muted: boolean; soloed: boolean }>) {
    setStems(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))
  }

  function updateBus(idx: number, value: number) {
    setBusSends(prev => prev.map((b, i) => i === idx ? { ...b, value } : b))
  }

  return (
    <>
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={cn(
          'w-[90vw] flex-shrink-0 flex-col border-r transition-all duration-300 overflow-hidden',
          sidebarOpen ? 'flex fixed inset-y-0 left-0 z-50' : 'hidden lg:flex',
          sidebarCollapsed ? 'lg:w-14' : 'lg:w-60'
        )}
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: sidebarCollapsed ? '#49556f57' : 'var(--gradient-sidebar)' }}
      >
        {sidebarCollapsed ? (
          <div className="flex items-center justify-center px-2 py-[18px] flex-shrink-0">
            <button
              className="hidden lg:flex p-1 rounded-md transition-colors hover:text-[var(--color-primary)]"
              style={{ color: 'var(--color-muted-foreground)' }}
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
              {/* Collapse (desktop) */}
              <button
                className="hidden lg:flex p-1 rounded-md transition-colors hover:text-[var(--color-primary)]"
                style={{ color: 'var(--color-muted-foreground)' }}
                onClick={() => setSidebarCollapsed(true)}
                title="Collapse sidebar"
              >
                <ChevronLeftIcon className="w-4 h-4" strokeWidth={S} />
              </button>
              {/* Mobile close */}
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
                'w-full flex items-center rounded-lg text-sm font-medium transition-colors',
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
                className="w-full flex justify-center p-2.5 rounded-lg transition-colors hover:text-[var(--color-primary)]"
                style={{ color: 'var(--color-muted-foreground)' }}
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
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                  DS
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/settings"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left hover:text-[var(--color-primary)]"
                style={{ color: 'var(--color-muted-foreground)' }}
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
                  <p className="text-xs font-medium truncate">David Suarez</p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-muted-foreground)' }}>Pro Plan</p>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header
          className="border-b flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgb(45 46 61 / 50%)', backdropFilter: 'blur(12px)' }}
        >
          {/* ── Row 1 ── */}
          <div className="flex items-center px-5 py-2.5 gap-3">

            {/* Left — mobile hamburger + breadcrumb + genre */}
            <div className="flex items-center gap-2 min-w-0">
              {/* Mobile hamburger */}
              <button className="lg:hidden p-1.5 rounded-lg flex-shrink-0" style={{ color: 'var(--color-muted-foreground)' }} onClick={() => setSidebarOpen(true)}>
                <Bars3Icon className="w-5 h-5" strokeWidth={S} />
              </button>
              <Link to="/projects" className="hidden sm:flex items-center gap-1 text-sm transition-colors hover:text-[var(--color-primary)] flex-shrink-0" style={{ color: 'var(--color-muted-foreground)' }}>
                <ChevronLeftIcon className="w-4 h-4" strokeWidth={S} />
                Projects
              </Link>
              <span className="hidden sm:block flex-shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <span className="text-sm font-medium truncate">Fools Gold</span>

              {/* Genre dropdown */}
              <div className="relative hidden md:block flex-shrink-0">
                <button
                  onClick={() => setShowGenreMenu(v => !v)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs border transition-colors hover:border-[var(--color-primary)]"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--color-muted-foreground)', background: 'var(--color-input)' }}
                >
                  {genre}
                  <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
                </button>
                {showGenreMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowGenreMenu(false)} />
                    <div className="absolute left-0 top-full mt-1 z-50 rounded-lg border overflow-hidden py-1" style={{ background: '#0f0e13', borderColor: 'rgba(255,255,255,0.12)', minWidth: '110px' }}>
                      {['Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Electronic', 'R&B', 'Classical'].map(g => (
                        <button key={g} onClick={() => { setGenre(g); setShowGenreMenu(false) }}
                          className="w-full text-left px-3 py-1.5 text-xs transition-colors hover:text-[var(--color-primary)]"
                          style={{ color: genre === g ? 'var(--color-primary)' : 'var(--color-muted-foreground)', background: genre === g ? 'var(--color-accent)' : 'transparent' }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Center — Mix/Arrange + Undo/Redo */}
            <div className="flex items-center gap-2 flex-shrink-0 mx-auto">
              <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--color-accent)' }}>
                {(['mix', 'arrange'] as const).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className="px-4 py-1.5 rounded-md text-sm transition-all capitalize"
                    style={mode === m
                      ? { background: 'var(--color-primary)', color: '#000', fontWeight: 500 }
                      : { color: 'var(--color-muted-foreground)' }
                    }>
                    {m === 'mix' ? 'Mix' : 'Arrange'}
                  </button>
                ))}
              </div>
              <div className="w-px h-4 hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <Button variant="ghost" size="icon" className="h-7 w-7" disabled={!canUndo}
                style={{ color: canUndo ? 'var(--color-foreground)' : 'rgba(255,255,255,0.2)' }}>
                <ArrowUturnLeftIcon className="w-4 h-4" strokeWidth={S} />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" disabled={!canRedo}
                style={{ color: canRedo ? 'var(--color-foreground)' : 'rgba(255,255,255,0.2)' }}>
                <ArrowUturnRightIcon className="w-4 h-4" strokeWidth={S} />
              </Button>
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto">
              {/* AI MIX */}
              <button
                onClick={() => setMixConsoleOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0"
                style={{
                  background: aiMixActive ? 'rgba(139,92,246,0.22)' : 'rgba(139,92,246,0.1)',
                  border: `1px solid ${aiMixActive ? 'rgba(139,92,246,0.6)' : 'rgba(139,92,246,0.3)'}`,
                  color: '#a78bfa',
                }}
              >
                <BoltIcon className="w-3.5 h-3.5" strokeWidth={S} />
                AI MIX
              </button>

              <div className="w-px h-4 hidden lg:block" style={{ background: 'rgba(255,255,255,0.1)' }} />

              {/* Preview */}
              <Button variant="ghost" size="sm" className="hidden md:flex gap-1.5 text-xs hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
                <PlayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                Preview
              </Button>

              {/* Export + format dropdown */}
              <div className="relative hidden sm:block">
                <div className="flex items-center rounded-full" style={{ border: '1px solid rgba(255,255,255,0.18)' }}>
                  <button className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 text-xs font-medium transition-colors hover:text-[var(--color-primary)]"
                    style={{ color: 'var(--color-muted-foreground)' }}>
                    <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                    Export {exportFormat}
                  </button>
                  <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <button onClick={() => setShowExportMenu(v => !v)}
                    className="px-2 py-1.5 rounded-r-full transition-colors hover:text-[var(--color-primary)]"
                    style={{ color: 'var(--color-muted-foreground)' }}>
                    <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
                  </button>
                </div>
                {showExportMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 z-50 rounded-lg border overflow-hidden py-1" style={{ background: '#0f0e13', borderColor: 'rgba(255,255,255,0.12)', minWidth: '100px' }}>
                      {(['WAV', 'MP3', 'FLAC', 'STEMS'] as const).map(fmt => (
                        <button key={fmt} onClick={() => { setExportFormat(fmt); setShowExportMenu(false) }}
                          className="w-full text-left px-3 py-1.5 text-xs transition-colors hover:text-[var(--color-primary)]"
                          style={{ color: exportFormat === fmt ? 'var(--color-primary)' : 'var(--color-muted-foreground)', background: exportFormat === fmt ? 'var(--color-accent)' : 'transparent' }}>
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Save */}
              <button className="rounded-full px-4 py-1.5 text-xs font-medium flex-shrink-0" style={{ background: '#A8A8A8', color: '#000' }}>
                Save
              </button>

              <div className="w-px h-4 hidden md:block" style={{ background: 'rgba(255,255,255,0.1)' }} />

              {/* Refresh */}
              <Button variant="ghost" size="sm" className="hidden md:flex gap-1.5 text-xs hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
                <ArrowPathIcon className="w-3.5 h-3.5" strokeWidth={S} />
                Refresh
              </Button>

              {/* Versions */}
              <Button variant="ghost" size="sm" className="hidden md:flex gap-1.5 text-xs hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
                <ClockIcon className="w-3.5 h-3.5" strokeWidth={S} />
                Versions
              </Button>

              {/* Share */}
              <Button variant="ghost" size="sm" className="hidden md:flex gap-1.5 text-xs hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
                <ShareIcon className="w-3.5 h-3.5" strokeWidth={S} />
                Share
              </Button>
            </div>
          </div>

          {/* ── Row 2 — metadata bar ── */}
          <div className="flex items-center px-5 py-1.5 gap-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {/* BPM */}
            <ClockIcon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
            <span className="font-mono text-xs font-medium tabular-nums ml-1" style={{ color: 'var(--color-foreground)' }}>{bpm}</span>
            <span className="text-xs mr-1.5" style={{ color: 'var(--color-muted-foreground)' }}>BPM</span>
            <button onClick={handleTap}
              className="px-2 py-0.5 rounded text-xs font-medium transition-colors hover:text-[var(--color-primary)]"
              style={{ color: 'var(--color-muted-foreground)', background: 'var(--color-input)', fontSize: '10px' }}>
              TAP
            </button>
            <button
              className="ml-1 px-2 py-0.5 rounded text-xs font-medium transition-colors hover:text-[var(--color-primary)]"
              style={{ color: 'var(--color-muted-foreground)', background: 'var(--color-input)', fontSize: '10px' }}>
              AUTO
            </button>

            <div className="w-px h-3 mx-3" style={{ background: 'rgba(255,255,255,0.1)' }} />

            {/* KEY */}
            <MusicalNoteIcon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
            <button className="font-mono text-xs font-medium ml-1 transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-foreground)' }}>
              {songKey}
            </button>
            <span className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontSize: '10px' }}>KEY</span>

            <div className="w-px h-3 mx-3" style={{ background: 'rgba(255,255,255,0.1)' }} />

            {/* Analyze */}
            <button onClick={handleAnalyze}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium transition-all"
              style={{
                color: analyzing ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                background: analyzing ? 'var(--color-accent)' : 'transparent',
              }}>
              <SparklesIcon className={cn('w-3.5 h-3.5', analyzing ? 'animate-pulse' : '')} strokeWidth={S} />
              {analyzing ? 'Analyzing…' : 'Analyze'}
            </button>

            {/* Track count — pushed right */}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-xs font-mono tracking-wider" style={{ color: 'var(--color-muted-foreground)', fontSize: '10px' }}>
                {stems.length} TRACKS
              </span>
            </div>
          </div>
        </header>

        {/* Transport bar */}
        <div className="px-5 pt-4 pb-0 flex-shrink-0">
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--gradient-card)' }}
        >
          {/* Top row */}
          <div className="flex items-center px-5 py-3 gap-4">
          {/* Time */}
          <span className="font-mono text-sm tabular-nums flex-shrink-0" style={{ color: 'var(--color-muted-foreground)', minWidth: '72px' }}>
            0:00 <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span> 3:25
          </span>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
              <BackwardIcon className="w-4 h-4" strokeWidth={S} />
            </Button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: '#A8A8A8', color: '#000' }}
            >
              {isPlaying
                ? <PauseIcon className="w-4 h-4" strokeWidth={2} />
                : <PlayIcon  className="w-4 h-4" strokeWidth={2} />
              }
            </button>
            {/* Stop */}
            <Button
              variant="ghost" size="icon"
              className="h-8 w-8 hover:text-[var(--color-primary)]"
              style={{ color: 'var(--color-muted-foreground)' }}
              onClick={() => setIsPlaying(false)}
            >
              <span className="w-3.5 h-3.5 rounded-sm border block" style={{ borderColor: 'currentColor' }} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
              <ForwardIcon className="w-4 h-4" strokeWidth={S} />
            </Button>
            <button
              onClick={() => setLoop(!loop)}
              className="h-8 w-8 flex items-center justify-center rounded-md transition-colors"
              style={{ color: loop ? 'var(--color-primary)' : 'var(--color-muted-foreground)', background: loop ? 'var(--color-accent)' : 'transparent' }}
            >
              <ArrowPathIcon className="w-4 h-4" strokeWidth={S} />
            </button>
          </div>

          {/* Right — volume + Reset + Add — pushed to far right */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden sm:flex items-center gap-1.5">
              <SpeakerWaveIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
              <input
                type="range" min={0} max={100} defaultValue={80}
                className="w-20 h-1 rounded-full cursor-pointer"
                style={{ accentColor: 'var(--color-primary)' }}
              />
            </div>
            <div className="w-px h-4 hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-1.5 text-xs hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
              <ArrowUturnLeftIcon className="w-3.5 h-3.5" strokeWidth={S} />
              Reset
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-1.5 text-xs hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
              <ArrowUpTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
              Add
            </Button>
          </div>
          </div>{/* end top row */}

          {/* Waveform row: SVG on left, meters panel on right */}
          <div className="flex items-stretch mx-1 mb-1 rounded-lg overflow-hidden h-14" style={{ background: 'rgba(0,0,0,0.3)' }}>

            {/* Waveform + scrubber */}
            <div className="relative flex-1 min-w-0">
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 1040 56"
              >
                <path d={wavePath1} fill="none" stroke="rgba(115,171,191,0.3)" strokeWidth="1.5" />
                <path d={wavePath2} fill="none" stroke="rgba(115,171,191,0.14)" strokeWidth="1" />
              </svg>
              {/* Progress line */}
              <div className="absolute top-0 bottom-0 left-3 w-px" style={{ background: 'rgba(255,255,255,0.18)' }} />
              {/* Scrubber dot */}
              <div className="absolute top-1/2 left-3 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2"
                style={{ background: 'var(--color-primary)', borderColor: '#000' }} />
            </div>

            {/* Meters column — separated, never overlapping waveform */}
            <div
              className="flex flex-col justify-center items-end gap-0.5 px-3 flex-shrink-0"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', minWidth: '80px' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono" style={{ color: 'var(--color-muted-foreground)', fontSize: '9px' }}>LUFS</span>
                <span className="font-mono tabular-nums" style={{ color: 'var(--color-primary)', fontSize: '9px' }}>C 0.0</span>
              </div>
              <div className="flex items-center">
                <span className="font-mono tabular-nums" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px' }}>L 0.0</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px' }}>CMP</span>
                <span className="font-mono" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px' }}>LIM</span>
              </div>
            </div>
          </div>

        </div>
        </div>

        {/* ── Scrollable content ──────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto pb-16">

          {/* Master Mixing Bus */}
          <section className="px-5 pt-5 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-4">
              <AdjustmentsHorizontalIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
              <h2 className="text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--color-primary)', letterSpacing: '0.08em' }}>
                Master Mixing Bus
              </h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {masterPresets.map(({ name, desc, icon: Icon }) => {
                const active = selectedPreset === name
                return (
                  <button
                    key={name}
                    onClick={() => setSelectedPreset(name)}
                    className="flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all"
                    style={{
                      borderColor: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
                      background: active ? 'var(--color-accent)' : 'var(--gradient-card)',
                    }}
                    onMouseEnter={e => {
                      if (!active) e.currentTarget.style.borderColor = 'rgba(115,171,191,0.4)'
                    }}
                    onMouseLeave={e => {
                      if (!active) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      strokeWidth={S}
                      style={{ color: active ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }}
                    />
                    <p className="text-xs font-medium leading-tight"
                      style={{ color: active ? 'var(--color-foreground)' : 'var(--color-foreground)' }}>
                      {name}
                    </p>
                    <p className="text-xs leading-tight line-clamp-2 hidden lg:block"
                      style={{ color: 'var(--color-muted-foreground)', fontSize: '10px' }}>
                      {desc}
                    </p>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Bus Sends */}
          <section className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-4">
              <SpeakerWaveIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
              <h2 className="text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--color-primary)', letterSpacing: '0.08em' }}>
                Bus Sends
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-1">
              {busSends.map((bus, idx) => (
                <div key={bus.label} className="flex flex-col gap-2 min-w-[120px] flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>
                      {bus.label}
                    </span>
                    <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--color-primary)' }}>
                      {bus.value}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0} max={100}
                    value={bus.value}
                    onChange={e => updateBus(idx, Number(e.target.value))}
                    className="w-full h-1 rounded-full cursor-pointer"
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <button
                    className="flex items-center gap-1 text-xs transition-colors hover:text-[var(--color-primary)] self-start"
                    style={{ color: 'var(--color-muted-foreground)' }}
                  >
                    FX <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Stem Tracks */}
          <section>
            {stems.map((stem, idx) => {
              const accent = stemAccentColors[stem.type]
              const stroke = stemStrokeColors[stem.type]
              const wave   = stemWaves[idx]
              const panLabel = stem.pan === 0 ? 'C' : stem.pan > 0 ? `R${stem.pan}` : `L${Math.abs(stem.pan)}`
              return (
                <div
                  key={stem.id}
                  className="border-b group"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  {/* Controls row */}
                  <div className="flex items-center gap-2 px-3 py-2">

                    {/* Drag handle */}
                    <span
                      className="cursor-grab flex-shrink-0 opacity-25 group-hover:opacity-50 transition-opacity"
                      style={{ color: 'var(--color-muted-foreground)' }}
                    >
                      <EllipsisVerticalIcon className="w-3.5 h-3.5 inline-block -mr-2.5" strokeWidth={S} />
                      <EllipsisVerticalIcon className="w-3.5 h-3.5 inline-block" strokeWidth={S} />
                    </span>

                    {/* Number */}
                    <span className="font-mono text-xs tabular-nums w-4 text-center flex-shrink-0" style={{ color: 'var(--color-muted-foreground)' }}>
                      {stem.id}
                    </span>

                    {/* Type dot */}
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent, opacity: stem.muted ? 0.3 : 0.8 }} />

                    {/* Name + type label + dropdown */}
                    <button
                      className="flex items-center gap-1.5 text-sm font-medium min-w-0 flex-shrink-0 transition-colors hover:text-[var(--color-primary)]"
                      style={{ opacity: stem.muted ? 0.4 : 1 }}
                    >
                      <span className="truncate max-w-[100px]">{stem.name}</span>
                      <span className={cn('text-xs flex-shrink-0', typeColors[stem.type])} style={{ fontSize: '10px', opacity: 0.75 }}>
                        {stem.type}
                      </span>
                      <ChevronDownIcon className="w-3 h-3 flex-shrink-0" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                    </button>

                    <div className="flex-1" />

                    {/* Volume */}
                    <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                      <SpeakerWaveIcon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)', opacity: stem.muted ? 0.3 : 1 }} />
                      <input
                        type="range" min={0} max={100}
                        value={stem.volume}
                        onChange={e => updateStem(stem.id, { volume: Number(e.target.value) })}
                        className="w-24 h-1 rounded-full cursor-pointer"
                        style={{ accentColor: 'var(--color-primary)', opacity: stem.muted ? 0.3 : 1 }}
                      />
                      <span className="font-mono text-xs tabular-nums w-5 text-right flex-shrink-0" style={{ color: 'var(--color-muted-foreground)', fontSize: '11px', opacity: stem.muted ? 0.4 : 1 }}>
                        {stem.volume}
                      </span>
                    </div>

                    {/* Pan */}
                    <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-muted-foreground)', fontSize: '10px' }}>PAN</span>
                      <input
                        type="range" min={-100} max={100}
                        value={stem.pan}
                        onChange={e => updateStem(stem.id, { pan: Number(e.target.value) })}
                        className="w-16 h-1 rounded-full cursor-pointer"
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <span className="font-mono text-xs tabular-nums w-5 text-right flex-shrink-0" style={{ color: 'var(--color-muted-foreground)', fontSize: '10px' }}>
                        {panLabel}
                      </span>
                    </div>

                    {/* M / S */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => updateStem(stem.id, { muted: !stem.muted })}
                        className="w-6 h-6 rounded text-xs font-bold transition-all"
                        style={{
                          background: stem.muted ? 'rgba(251,191,36,0.18)' : 'var(--color-input)',
                          color: stem.muted ? '#fbbf24' : 'var(--color-muted-foreground)',
                          border: `1px solid ${stem.muted ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`,
                        }}
                      >M</button>
                      <button
                        onClick={() => updateStem(stem.id, { soloed: !stem.soloed })}
                        className="w-6 h-6 rounded text-xs font-bold transition-all"
                        style={{
                          background: stem.soloed ? `${accent}28` : 'var(--color-input)',
                          color: stem.soloed ? accent : 'var(--color-muted-foreground)',
                          border: `1px solid ${stem.soloed ? accent : 'rgba(255,255,255,0.1)'}`,
                        }}
                      >S</button>
                    </div>

                    {/* Options + delete — visible on hover */}
                    <Button
                      variant="ghost" size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-muted-foreground)' }}
                    >
                      <EllipsisHorizontalIcon className="w-4 h-4" strokeWidth={S} />
                    </Button>
                    <Button
                      variant="ghost" size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
                      style={{ color: 'var(--color-muted-foreground)' }}
                    >
                      <TrashIcon className="w-3.5 h-3.5 hover:text-red-400" strokeWidth={S} />
                    </Button>
                  </div>

                  {/* Simulated waveform — color-coded per type */}
                  <div
                    className="relative mx-5 mb-2.5 rounded-lg overflow-hidden"
                    style={{
                      height: '58px',
                      background: '#1d1c2296',
                      border: '1px solid rgba(255,255,255,0.06)',
                      opacity: stem.muted ? 0.2 : 1,
                    }}
                  >
                    <svg
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 1040 56"
                    >
                      <path d={wave.top}    fill="none" stroke={stroke} strokeWidth="1.5" />
                      <path d={wave.bottom} fill="none" stroke={stroke} strokeWidth="1"   opacity={0.65} />
                    </svg>
                    {/* Playhead */}
                    <div className="absolute top-0 bottom-0 left-2 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  </div>
                </div>
              )
            })}
          </section>
        </main>

        {/* ── Mastering bar (fixed bottom) ──────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-3 border-t flex-shrink-0"
          style={{
            borderColor: masteringEnabled ? 'rgba(115,171,191,0.3)' : 'rgba(255,255,255,0.08)',
            background: masteringEnabled ? 'rgba(115,171,191,0.06)' : 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: masteringEnabled ? 'var(--color-accent)' : 'var(--color-input)' }}
            >
              <MusicalNoteIcon
                className="w-4 h-4"
                strokeWidth={S}
                style={{ color: masteringEnabled ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }}
              />
            </div>
            <div>
              <p className="text-sm font-medium">Mastering</p>
              <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                Professional mastering for Pop
              </p>
            </div>
          </div>
          <button
            onClick={() => setMasteringEnabled(!masteringEnabled)}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={masteringEnabled
              ? { background: 'var(--color-primary)', color: '#000' }
              : { border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-muted-foreground)', background: 'transparent' }
            }
          >
            {masteringEnabled ? 'Enabled' : 'Enable'}
          </button>
        </div>

      </div>
    </div>

    {/* ── MIX CONSOLE MODAL ────────────────────────────────────────────── */}

    {mixConsoleOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        onClick={() => setMixConsoleOpen(false)}
      >
        <div
          className="w-full max-w-3xl rounded-2xl border overflow-hidden flex flex-col"
          style={{ background: '#0c0b10', borderColor: 'rgba(255,255,255,0.1)', maxHeight: '90vh' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>Mix Console</span>
            </div>
            <button onClick={() => setMixConsoleOpen(false)} className="p-1.5 rounded-md transition-colors hover:text-white" style={{ color: 'var(--color-muted-foreground)' }}>
              <XMarkIcon className="w-4 h-4" strokeWidth={S} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

            {/* Signature Tailored Mixes */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <SparklesIcon className="w-3.5 h-3.5" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-muted-foreground)' }}>Signature Tailored Mixes</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: MapPinIcon,   color: '#f97316', name: 'STREET HEAT MIX', desc: 'Urban — gritty 808s, vocals upfront, street-ready' },
                  { icon: TrophyIcon,   color: '#a78bfa', name: 'SPARKS MIX',       desc: 'Billboard Pop — bright, wide, radio sheen' },
                  { icon: GlobeAltIcon, color: '#34d399', name: 'SMILES MIX',       desc: 'SoCal Reggae — sun-soaked, warm bass, easy groove' },
                ].map(({ icon: Icon, color, name, desc }) => (
                  <div key={name}
                    className="flex items-start justify-between gap-2 p-3.5 rounded-xl border transition-colors cursor-pointer group"
                    style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${color}22` }}>
                        <Icon className="w-3.5 h-3.5" strokeWidth={S} style={{ color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold tracking-wide leading-none mb-1" style={{ color: 'var(--color-foreground)' }}>{name}</p>
                        <p className="text-[11px] leading-snug" style={{ color: 'var(--color-muted-foreground)' }}>{desc}</p>
                      </div>
                    </div>
                    <button className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    >
                      <PlayIcon className="w-3 h-3 ml-0.5" strokeWidth={S} style={{ color: 'var(--color-foreground)' }} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Genre Presets */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <MusicalNoteIcon className="w-3.5 h-3.5" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-muted-foreground)' }}>Genre Presets</span>
              </div>
              <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                {[
                  { icon: SpeakerWaveIcon,         name: 'R&B SMOOTH',    desc: 'Warm lows, silky vocals, laid-back groove' },
                  { icon: BoltIcon,                name: 'ROCK POWER',    desc: 'Aggressive mids, punchy drums, raw energy'  },
                  { icon: SparklesIcon,            name: 'EDM FESTIVAL',  desc: 'Massive drops, tight lows, festival energy' },
                  { icon: SunIcon,                 name: 'LO-FI CHILL',   desc: 'Vintage warmth, rolled-off highs, tape vibe' },
                  { icon: AdjustmentsHorizontalIcon, name: 'TRAP HARD',   desc: 'Deep 808s, sharp hi-hats, dark energy'      },
                  { icon: FilmIcon,                name: 'CINEMATIC',     desc: 'Lush reverbs, wide stereo, epic dynamics'   },
                ].map(({ icon: Icon, name, desc }) => (
                  <div key={name} className="flex items-start gap-2.5 cursor-pointer group py-1"
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                    <div>
                      <p className="text-xs font-semibold tracking-wide leading-none mb-0.5" style={{ color: 'var(--color-foreground)' }}>{name}</p>
                      <p className="text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Controls row */}
            <div className="grid grid-cols-3 gap-6 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>

              {/* Intensity */}
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-muted-foreground)' }}>Intensity</p>
                <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {(['subtle', 'balanced', 'aggressive'] as const).map(v => (
                    <button key={v} onClick={() => setMixIntensity(v)}
                      className="flex-1 py-1.5 rounded-md text-[11px] font-medium capitalize transition-all"
                      style={mixIntensity === v
                        ? { background: 'var(--color-primary)', color: '#000' }
                        : { color: 'var(--color-muted-foreground)', background: 'transparent' }
                      }
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] mt-2" style={{ color: 'var(--color-muted-foreground)' }}>
                  {mixIntensity === 'subtle' ? 'Light touch, natural sound' : mixIntensity === 'balanced' ? 'Pro-level corrective mix' : 'Bold, heavily processed'}
                </p>
              </div>

              {/* Focus */}
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-muted-foreground)' }}>Focus</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Balanced', 'Vocals up front', 'Drum-driven', 'Low-end heavy', 'Wide stereo'].map(chip => {
                    const active = mixFocus.has(chip)
                    return (
                      <button key={chip}
                        onClick={() => setMixFocus(prev => {
                          const next = new Set(prev)
                          if (next.has(chip)) next.delete(chip); else next.add(chip)
                          return next
                        })}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border"
                        style={active
                          ? { background: 'rgba(115,171,191,0.15)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }
                          : { background: 'transparent', borderColor: 'rgba(255,255,255,0.12)', color: 'var(--color-muted-foreground)' }
                        }
                      >
                        {chip}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Reference Track */}
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-muted-foreground)' }}>Reference Track</p>
                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors text-xs"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-foreground)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                >
                  <ArrowUpTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                  Match a reference
                </button>
                <p className="text-[11px] mt-2 text-center" style={{ color: 'var(--color-muted-foreground)' }}>Optional — match the sound of a song you love</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <button onClick={() => setMixConsoleOpen(false)}
              className="px-5 py-2 rounded-full text-sm transition-colors"
              style={{ color: 'var(--color-muted-foreground)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted-foreground)')}
            >
              Cancel
            </button>
            <button
              onClick={() => { setAiMixActive(true); setMixConsoleOpen(false) }}
              className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: '#fff', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(139,92,246,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.4)')}
            >
              <BoltIcon className="w-4 h-4" strokeWidth={S} />
              RUN MIX
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
