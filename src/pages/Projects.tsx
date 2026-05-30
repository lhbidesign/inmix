import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ClockIcon, PlusIcon, SpeakerWaveIcon,
  PencilIcon, TrashIcon, DocumentDuplicateIcon as CopyIcon,
  ArrowDownTrayIcon, EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/badge'
import { AppSidebar } from '@/components/AppSidebar'
import { TabGroup } from '@/components/ui/tab-group'

const S = 1

// ── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  { id: 1,  name: 'Fools Gold',      artist: 'The Stone Roses', genre: 'Pop',        status: 'mixing',    stems: 8,  updated: '2h ago',  starred: true  },
  { id: 2,  name: 'Electric Feel',   artist: 'MGMT',            genre: 'Electronic', status: 'mastering', stems: 6,  updated: '5h ago',  starred: false },
  { id: 3,  name: 'Midnight City',   artist: 'M83',             genre: 'Synthpop',   status: 'review',    stems: 12, updated: '1d ago',  starred: true  },
  { id: 4,  name: 'Dissolve Me',     artist: 'Alt-J',           genre: 'Alt-Rock',   status: 'mixing',    stems: 9,  updated: '2d ago',  starred: false },
  { id: 5,  name: 'Northern Soul',   artist: 'Various',         genre: 'Soul',       status: 'complete',  stems: 5,  updated: '3d ago',  starred: false },
  { id: 6,  name: 'Tame Impala',     artist: 'Kevin Parker',    genre: 'Psychedelic',status: 'mixing',    stems: 14, updated: '4d ago',  starred: true  },
  { id: 7,  name: 'Pink + White',    artist: 'Frank Ocean',     genre: 'R&B',        status: 'complete',  stems: 7,  updated: '5d ago',  starred: false },
  { id: 8,  name: 'Elephant',        artist: 'Tame Impala',     genre: 'Psych-Rock', status: 'mastering', stems: 10, updated: '6d ago',  starred: false },
  { id: 9,  name: 'Motion Picture',  artist: 'Arcade Fire',     genre: 'Indie',      status: 'review',    stems: 11, updated: '1w ago',  starred: true  },
  { id: 10, name: 'Breathe Deeper',  artist: 'Tame Impala',     genre: 'Electronic', status: 'mixing',    stems: 8,  updated: '1w ago',  starred: false },
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


// ── Page ─────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [sidebarOpen, setSidebarOpen]           = useState(false)
  const [activeTab, setActiveTab]               = useState<'projects' | 'exports'>('projects')
  const [search, setSearch]                     = useState('')

  const navigate = useNavigate()

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.artist.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

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

          <div className="mb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }} />

          {/* Tabs + Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
            <TabGroup
              tabs={[
                { id: 'projects', label: 'Projects' },
                { id: 'exports',  label: 'Exports'  },
              ]}
              active={activeTab}
              onChange={setActiveTab}
              size="md"
              fullWidthOnMobile
            />

            <div className="relative w-full lg:w-48">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-colors w-full"
                style={{ background: 'var(--color-input)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-foreground)' }}
              />
            </div>
          </div>

          {/* Projects grid */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
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
                          <button className="p-1.5 rounded-md transition-colors hover:text-white text-[--color-muted-foreground]">
                            <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                          </button>
                          <button className="p-1.5 rounded-md transition-colors hover:text-white text-[--color-muted-foreground]">
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

function ProjectCard({ project, onOpen }: {
  project: typeof projects[0]
  onOpen: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const { label, variant } = statusConfig[project.status]

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
      <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h3
            className="text-[28px] font-light leading-tight truncate transition-colors"
            style={{ color: hovered ? 'var(--color-primary)' : 'var(--color-foreground)' }}
          >
            {project.name}
          </h3>
          {project.starred && <StarSolidIcon className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />}
        </div>
        {/* Action icons — visible on hover */}
        <div
          className="flex items-center gap-1 flex-shrink-0 transition-opacity pt-1"
          style={{ opacity: hovered ? 1 : 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="p-1 rounded-md transition-colors hover:text-white text-[--color-muted-foreground]" title="Duplicate">
            <CopyIcon className="w-3.5 h-3.5" strokeWidth={S} />
          </button>
          <button className="p-1 rounded-md transition-colors hover:text-white text-[--color-muted-foreground]" title="Rename">
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
          style={{ color: 'var(--color-muted-foreground)', background: 'rgba(255,255,255,0.06)' }}
        >
          {project.genre}
        </span>
        <Badge variant={variant} className="text-[10px]">{label}</Badge>
        <div className="flex items-center gap-1 ml-auto" style={{ color: 'var(--color-muted-foreground)' }}>
          <ClockIcon className="w-3 h-3" strokeWidth={S} />
          <span className="text-xs">{project.updated}</span>
        </div>
      </div>

    </div>
  )
}
