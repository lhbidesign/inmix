import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import {
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  BoltIcon,
  EllipsisHorizontalIcon,
  PlayIcon,
  ArrowDownTrayIcon,
  ChevronRightIcon,
  SpeakerWaveIcon,
  PlusCircleIcon,
  PresentationChartLineIcon,
  Bars3Icon,
  FolderOpenIcon,
  DocumentDuplicateIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppSidebar } from '@/components/AppSidebar'
import { TabGroup } from '@/components/ui/tab-group'

const S = 1 // strokeWidth global para todos los heroicons

const stats = [
  { label: 'Active Projects', value: '12',   delta: '+2 this week',   icon: FolderOpenIcon,       color: 'text-violet-400' },
  { label: 'Mixes Created',   value: '48',   delta: '+8 this month',  icon: SpeakerWaveIcon,      color: 'text-sky-400' },
  { label: 'Hours Mixed',     value: '134h', delta: '+22h this week', icon: ClockIcon,            color: 'text-emerald-400' },
  { label: 'AI Suggestions',  value: '319',  delta: 'Used this month',icon: BoltIcon,             color: 'text-amber-400' },
]

const projects = [
  { id: 1, name: 'Fools Gold',    artist: 'The Stone Roses', status: 'mixing',    stems: 8,  updated: '2h ago',  starred: true  },
  { id: 2, name: 'Electric Feel', artist: 'MGMT',            status: 'mastering', stems: 6,  updated: '5h ago',  starred: false },
  { id: 3, name: 'Midnight City', artist: 'M83',             status: 'review',    stems: 12, updated: '1d ago',  starred: true  },
  { id: 4, name: 'Dissolve Me',   artist: 'Alt-J',           status: 'mixing',    stems: 9,  updated: '2d ago',  starred: false },
  { id: 5, name: 'Northern Soul', artist: 'Various',         status: 'complete',  stems: 5,  updated: '3d ago',  starred: false },
]

const activity = [
  { action: 'Stem exported',  project: 'Fools Gold',    time: '10 min ago' },
  { action: 'AI mix applied', project: 'Electric Feel', time: '1h ago'     },
  { action: 'Comment added',  project: 'Midnight City', time: '3h ago'     },
  { action: 'Stems uploaded', project: 'Dissolve Me',   time: '6h ago'     },
  { action: 'Project shared', project: 'Northern Soul', time: '1d ago'     },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'outline' }> = {
  mixing:    { label: 'Mixing',    variant: 'default'   },
  mastering: { label: 'Mastering', variant: 'warning'   },
  review:    { label: 'Review',    variant: 'secondary' },
  complete:  { label: 'Complete',  variant: 'success'   },
}

const quickActions = [
  { icon: PlusCircleIcon,         label: 'New Project',   desc: 'Start from scratch'    },
  { icon: DocumentDuplicateIcon,  label: 'Use Template',  desc: 'Pre-built workflows'   },
  { icon: BoltIcon,               label: 'AI Mix',        desc: 'Auto-balance stems'    },
  { icon: PresentationChartLineIcon, label: 'Analytics',  desc: 'View your stats'       },
]

const exports = [
  { name: 'Fools Gold - Master',    format: 'WAV 24bit',      size: '148 MB', date: '2h ago',  status: 'ready'      },
  { name: 'Electric Feel - Stems',  format: 'ZIP · 6 tracks', size: '320 MB', date: '5h ago',  status: 'ready'      },
  { name: 'Midnight City - Mix',    format: 'MP3 320k',       size: '12 MB',  date: '1d ago',  status: 'processing' },
  { name: 'Dissolve Me - Stems',    format: 'ZIP · 9 tracks', size: '410 MB', date: '2d ago',  status: 'ready'      },
  { name: 'Northern Soul - Master', format: 'WAV 16bit',      size: '98 MB',  date: '3d ago',  status: 'ready'      },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'exports'>('projects')
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />


      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0 lg:hidden"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--color-muted-foreground)' }}
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-5 h-5" strokeWidth={S} />
          </button>
          <Button variant="ghost" size="icon" className="relative hover:text-white">
            <BellIcon className="w-[18px] h-[18px]" strokeWidth={S} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
          </Button>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Header card */}
          <div className="rounded-xl border flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0D1258 0%, #050722 100%)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 py-5 gap-4">
              <div className="flex items-center gap-3">
                <img src="/images/IMG_3993-min.jpg" alt="David Suarez" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <h1 className="font-light text-2xl lg:text-[36px]" style={{ color: '#ffffff' }}>Welcome back, David</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative hover:text-white hidden lg:inline-flex">
                  <BellIcon className="w-[18px] h-[18px]" strokeWidth={S} />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 flex-1 lg:flex-none rounded-full px-5 font-medium"
                  style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#ffffff', borderWidth: '1px' }}
                >
                  <SpeakerWaveIcon className="w-4 h-4" strokeWidth={S} />
                  Demo Mix
                </Button>
                <Button
                  className="gap-2 flex-1 lg:flex-none rounded-full px-5 font-medium"
                  style={{ background: '#ffffff', color: '#000' }}
                >
                  <PlusIcon className="w-4 h-4" strokeWidth={S} />
                  New Project
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(({ label, value, delta, icon: Icon }) => (
              <Card key={label}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)' }}>{label}</p>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#0011FF' }}>
                      <Icon className="w-[16px] h-[16px]" strokeWidth={S} style={{ color: '#ffffff' }} />
                    </div>
                  </div>
                  <p className="text-3xl font-normal tracking-tight">{value}</p>
                  <p className="flex items-center gap-1 text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                    <ArrowTrendingUpIcon className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" strokeWidth={S} />
                    {delta}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Projects + Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Projects / Exports Table */}
            <Card className="xl:col-span-2">
              <CardHeader className="pb-0">
                {/* Tabs row + desktop: search + view all */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
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
                  {/* Desktop: search + view all on same row */}
                  <div className="hidden sm:flex items-center gap-2 ml-auto">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-8 pr-3 h-7 text-xs rounded-lg border outline-none w-44 transition-colors"
                        style={{ background: 'var(--color-input)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-foreground)' }}
                      />
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs gap-1 flex-shrink-0" style={{ color: 'var(--color-primary)' }} onClick={() => navigate('/projects')}>
                      View all <ChevronRightIcon className="w-3.5 h-3.5" strokeWidth={S} />
                    </Button>
                  </div>
                  {/* Mobile: search below tabs */}
                  <div className="relative sm:hidden">
                    <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-8 pr-3 h-9 text-xs rounded-lg border outline-none w-full transition-colors"
                      style={{ background: 'var(--color-input)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-foreground)' }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {activeTab === 'projects' ? (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-muted-foreground)' }}>
                        <th className="text-left px-6 py-2.5 font-medium">Project</th>
                        <th className="text-left px-4 py-2.5 font-medium hidden sm:table-cell">Status</th>
                        <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">Stems</th>
                        <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Updated</th>
                        <th className="px-4 py-2.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.artist.toLowerCase().includes(search.toLowerCase())).map((p) => {
                        const { label, variant } = statusConfig[p.status]
                        return (
                          <tr
                            key={p.name}
                            className="border-b transition-colors cursor-pointer"
                            style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                            onMouseLeave={e => (e.currentTarget.style.background = '')}
                            onClick={() => navigate(`/projects/${p.id}`)}
                          >
                            <td className="px-6 py-3.5">
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-medium">{p.name}</p>
                                {p.starred && <StarSolidIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                              </div>
                              <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{p.artist}</p>
                            </td>
                            <td className="px-4 py-3.5 hidden sm:table-cell">
                              <Badge variant={variant}>{label}</Badge>
                            </td>
                            <td className="px-4 py-3.5 hidden md:table-cell">
                              <div className="flex items-center gap-1.5">
                                <AdjustmentsHorizontalIcon className="w-3.5 h-3.5" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                                <span className="text-sm">{p.stems}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 hidden lg:table-cell">
                              <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{p.updated}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1 justify-end">
                                <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-white">
                                  <PlayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-white">
                                  <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-white">
                                  <EllipsisHorizontalIcon className="w-3.5 h-3.5" strokeWidth={S} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-muted-foreground)' }}>
                        <th className="text-left px-6 py-2.5 font-medium">File</th>
                        <th className="text-left px-4 py-2.5 font-medium hidden sm:table-cell">Format</th>
                        <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">Size</th>
                        <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Date</th>
                        <th className="px-4 py-2.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {exports.map((ex) => (
                        <tr
                          key={ex.name}
                          className="border-b transition-colors cursor-pointer"
                          style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                          onMouseLeave={e => (e.currentTarget.style.background = '')}
                        >
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: 'var(--color-secondary)' }}>
                                <ArrowDownTrayIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
                              </div>
                              <p className="text-sm font-medium">{ex.name}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 hidden sm:table-cell">
                            <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{ex.format}</span>
                          </td>
                          <td className="px-4 py-3.5 hidden md:table-cell">
                            <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{ex.size}</span>
                          </td>
                          <td className="px-4 py-3.5 hidden lg:table-cell">
                            <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{ex.date}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1 justify-end">
                              <Badge variant={ex.status === 'ready' ? 'success' : 'warning'}>
                                {ex.status === 'ready' ? 'Ready' : 'Processing'}
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-white">
                                <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-white">
                                <EllipsisHorizontalIcon className="w-3.5 h-3.5" strokeWidth={S} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CardContent>
              <div className="flex sm:hidden px-4 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <Button variant="ghost" size="sm" className="w-full text-xs gap-1 justify-center" style={{ color: 'var(--color-primary)' }} onClick={() => navigate('/projects')}>
                  View all <ChevronRightIcon className="w-3.5 h-3.5" strokeWidth={S} />
                </Button>
              </div>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-normal" style={{ color: '#ffffff' }}>Activity</CardTitle>
                <CardDescription className="text-xs">Recent actions across all projects</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pb-4">
                {activity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 px-6 py-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--color-primary)' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{item.action}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--color-muted-foreground)' }}>{item.project}</p>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-muted-foreground)' }}>{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map(({ icon: Icon, label, desc }) => (
              <button
                key={label}
                className="flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--gradient-card)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.background = 'var(--color-accent)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'var(--gradient-card)'
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
                  <Icon className="w-[18px] h-[18px]" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{desc}</p>
                </div>
              </button>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}
