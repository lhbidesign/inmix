import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import {
  Squares2X2Icon, FolderOpenIcon, Cog6ToothIcon,
  XMarkIcon, Bars3Icon, ChevronLeftIcon, ChevronRightIcon,
  ArrowRightOnRectangleIcon, MagnifyingGlassIcon,
  DocumentDuplicateIcon, PlayCircleIcon, UsersIcon,
  ClockIcon, PlusIcon, SpeakerWaveIcon,
  PencilIcon, TrashIcon, DocumentDuplicateIcon as CopyIcon,
  ArrowDownTrayIcon, EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const S = 1

const navItems = [
  { icon: Squares2X2Icon,        label: 'Dashboard',    href: '/dashboard' },
  { icon: FolderOpenIcon,        label: 'Projects',      href: '/projects'  },
  { icon: DocumentDuplicateIcon, label: 'Presets',       href: '/presets'   },
  { icon: PlayCircleIcon,        label: 'Listen',        href: '/dashboard' },
  { icon: UsersIcon,             label: 'Collaborators', href: '/dashboard' },
]

// ── Waveform (same technique as ProjectDetail transport bar) ──────────────────

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

const seeds = [0.3, 1.2, 2.1, 0.8, 1.7]
const cardWaves = seeds.map(seed => ({
  main: buildSmoothPath(Array.from({ length: 52 }, (_, i): [number, number] => [
    i * 20,
    28 + Math.sin(i * 0.48 + seed) * 11 + Math.sin(i * 1.15 + seed * 1.4) * 5 + Math.sin(i * 2.6 + seed) * 2.5,
  ])),
  faint: buildSmoothPath(Array.from({ length: 52 }, (_, i): [number, number] => [
    i * 20,
    28 + Math.sin(i * 0.6 + seed * 0.7) * 7 + Math.sin(i * 1.4 + seed) * 3.5 + Math.sin(i * 3.1 + seed * 1.2) * 1.5,
  ])),
}))

// ── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  { id: 1, name: 'Fools Gold',    artist: 'The Stone Roses', genre: 'Pop',        status: 'mixing',    stems: 8,  updated: '2h ago',  starred: true  },
  { id: 2, name: 'Electric Feel', artist: 'MGMT',            genre: 'Electronic', status: 'mastering', stems: 6,  updated: '5h ago',  starred: false },
  { id: 3, name: 'Midnight City', artist: 'M83',             genre: 'Synthpop',   status: 'review',    stems: 12, updated: '1d ago',  starred: true  },
  { id: 4, name: 'Dissolve Me',   artist: 'Alt-J',           genre: 'Alt-Rock',   status: 'mixing',    stems: 9,  updated: '2d ago',  starred: false },
  { id: 5, name: 'Northern Soul', artist: 'Various',         genre: 'Soul',       status: 'complete',  stems: 5,  updated: '3d ago',  starred: false },
]

const exports = [
  { name: 'Fools Gold - Master',    format: 'WAV 24bit',      size: '148 MB', date: '2h ago',  status: 'ready'      },
  { name: 'Electric Feel - Stems',  format: 'ZIP · 6 tracks', size: '320 MB', date: '5h ago',  status: 'ready'      },
  { name: 'Midnight City - Mix',    format: 'MP3 320k',       size: '12 MB',  date: '1d ago',  status: 'processing' },
  { name: 'Dissolve Me - Stems',    format: 'ZIP · 9 tracks', size: '410 MB', date: '2d ago',  status: 'ready'      },
  { name: 'Northern Soul - Master', format: 'WAV 16bit',      size: '98 MB',  date: '3d ago',  status: 'ready'      },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'outline' }> = {
  mixing:    { label: 'Mixing',    variant: 'default'   },
  mastering: { label: 'Mastering', variant: 'warning'   },
  review:    { label: 'Review',    variant: 'secondary' },
  complete:  { label: 'Complete',  variant: 'success'   },
}

const genreColor: Record<string, string> = {
  Pop:        '#a78bfa',
  Electronic: '#60a5fa',
  Synthpop:   '#22d3ee',
  'Alt-Rock': '#f87171',
  Soul:       '#fb923c',
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [sidebarOpen, setSidebarOpen]           = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab]               = useState<'projects' | 'exports'>('projects')
  const [search, setSearch]                     = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  function isNavActive(label: string) {
    if (label === 'Dashboard') return location.pathname === '/dashboard'
    if (label === 'Projects')  return location.pathname === '/projects' || location.pathname.startsWith('/projects/')
    if (label === 'Presets')   return location.pathname === '/presets'
    return false
  }

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.artist.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

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
              <Link to="/settings" className="w-full flex justify-center p-2.5 rounded-lg transition-colors hover:opacity-80" style={{ color: 'var(--color-primary)' }} title="Settings">
                <Cog6ToothIcon className="w-[18px] h-[18px]" strokeWidth={S} />
              </Link>
              <button onClick={() => navigate('/login')} className="w-full flex justify-center p-2.5 rounded-lg transition-colors" style={{ color: 'rgba(239,68,68,0.7)' }} title="Log out"
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.7)')}>
                <ArrowRightOnRectangleIcon className="w-[18px] h-[18px]" strokeWidth={S} />
              </button>
              <div className="flex justify-center py-1">
                <img src="/images/IMG_3993-min.jpg" alt="David Suarez" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
              </div>
            </>
          ) : (
            <>
              <Link to="/settings" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left hover:opacity-80" style={{ color: 'var(--color-primary)' }}>
                <Cog6ToothIcon className="w-[18px] h-[18px]" strokeWidth={S} />
                Settings
              </Link>
              <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left" style={{ color: 'rgba(239,68,68,0.7)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.7)')}>
                <ArrowRightOnRectangleIcon className="w-[18px] h-[18px]" strokeWidth={S} />
                Log out
              </button>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <img src="/images/IMG_3993-min.jpg" alt="David Suarez" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
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

        {/* Mobile bar */}
        <div className="flex items-center lg:hidden px-5 py-3 border-b flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button className="p-1.5 rounded-lg" style={{ color: 'var(--color-muted-foreground)' }} onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="w-5 h-5" strokeWidth={S} />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto px-6 py-8">

          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-7 flex-wrap">
            <h1 className="font-light" style={{ fontSize: '36px', lineHeight: 1.15, color: '#ffffff' }}>Your Projects</h1>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-opacity hover:opacity-80"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#ffffff', borderWidth: '1px' }}
              >
                <SpeakerWaveIcon className="w-4 h-4" strokeWidth={S} />
                Demo Mix
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: '#ffffff', color: '#000' }}
              >
                <PlusIcon className="w-4 h-4" strokeWidth={2} />
                New Project
              </button>
            </div>
          </div>

          {/* Tabs + Search */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex gap-1 p-1 rounded-lg w-fit" style={{ background: 'var(--color-accent)' }}>
              {([
                { id: 'projects', label: 'Projects', icon: FolderOpenIcon },
                { id: 'exports',  label: 'Exports',  icon: ArrowDownTrayIcon },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm transition-all"
                  style={activeTab === id
                    ? { background: '#000', color: '#ffffff', fontWeight: 400 }
                    : { color: 'var(--color-muted-foreground)' }
                  }
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={S} />
                  {label}
                </button>
              ))}
            </div>

            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-colors w-48"
                style={{ background: 'var(--color-input)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-foreground)' }}
              />
            </div>
          </div>

          {/* Projects grid */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  wave={cardWaves[i % cardWaves.length]}
                  onOpen={() => navigate(`/projects/${p.id}`)}
                />
              ))}
            </div>
          )}

          {/* Exports table */}
          {activeTab === 'exports' && (
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--gradient-card)' }}>
              <table className="w-full">
                <thead>
                  <tr className="border-b text-xs" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-muted-foreground)' }}>
                    <th className="text-left px-6 py-3 font-medium">File</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Format</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Size</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Date</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {exports.map(ex => (
                    <tr
                      key={ex.name}
                      className="border-b transition-colors"
                      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                      onMouseLeave={e => (e.currentTarget.style.background = '')}
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-secondary)' }}>
                            <ArrowDownTrayIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
                          </div>
                          <p className="text-sm font-medium">{ex.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell"><span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{ex.format}</span></td>
                      <td className="px-4 py-3.5 hidden md:table-cell"><span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{ex.size}</span></td>
                      <td className="px-4 py-3.5 hidden lg:table-cell"><span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{ex.date}</span></td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 justify-end">
                          <Badge variant={ex.status === 'ready' ? 'success' : 'warning'}>
                            {ex.status === 'ready' ? 'Ready' : 'Processing'}
                          </Badge>
                          <button className="p-1.5 rounded-md transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
                            <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                          </button>
                          <button className="p-1.5 rounded-md transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }}>
                            <EllipsisHorizontalIcon className="w-3.5 h-3.5" strokeWidth={S} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

// ── ProjectCard ───────────────────────────────────────────────────────────────

function ProjectCard({ project, wave, onOpen }: {
  project: typeof projects[0]
  wave: { main: string; faint: string }
  onOpen: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const { label, variant } = statusConfig[project.status]
  const gc = genreColor[project.genre] ?? 'var(--color-primary)'

  return (
    <div
      className="rounded-xl border overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        borderColor: hovered ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
        background: 'var(--gradient-card)',
        boxShadow: hovered ? '0 0 0 1px var(--color-primary), 0 4px 24px rgba(115,171,191,0.1)' : 'none',
      }}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 min-w-0">
          <SpeakerWaveIcon className="w-4 h-4 flex-shrink-0" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
          <h3
            className="text-sm font-medium truncate transition-colors"
            style={{ color: hovered ? 'var(--color-primary)' : 'var(--color-foreground)' }}
          >
            {project.name}
          </h3>
          {project.starred && <StarSolidIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
        </div>

        {/* Action icons — visible on hover */}
        <div
          className="flex items-center gap-1 flex-shrink-0 transition-opacity"
          style={{ opacity: hovered ? 1 : 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="p-1 rounded-md transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }} title="Duplicate">
            <CopyIcon className="w-3.5 h-3.5" strokeWidth={S} />
          </button>
          <button className="p-1 rounded-md transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-muted-foreground)' }} title="Rename">
            <PencilIcon className="w-3.5 h-3.5" strokeWidth={S} />
          </button>
          <button className="p-1 rounded-md transition-colors" style={{ color: 'rgba(239,68,68,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.6)')}
            title="Delete"
          >
            <TrashIcon className="w-3.5 h-3.5" strokeWidth={S} />
          </button>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 px-4 pb-3">
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ color: gc, background: `${gc}18` }}
        >
          {project.genre}
        </span>
        <Badge variant={variant} className="text-[10px]">{label}</Badge>
        <div className="flex items-center gap-1 ml-auto" style={{ color: 'var(--color-muted-foreground)' }}>
          <ClockIcon className="w-3 h-3" strokeWidth={S} />
          <span className="text-xs">{project.updated}</span>
        </div>
      </div>

      {/* Waveform */}
      <div className="mx-3 mb-3 rounded-lg overflow-hidden" style={{ height: '72px', background: '#1d1c2296', border: '1px solid rgba(255,255,255,0.06)' }}>
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1040 56">
          <path d={wave.main}  fill="none" stroke="rgba(115,171,191,0.35)" strokeWidth="1.5" />
          <path d={wave.faint} fill="none" stroke="rgba(115,171,191,0.14)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}
