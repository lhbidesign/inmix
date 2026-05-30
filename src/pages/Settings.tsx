import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Squares2X2Icon, FolderOpenIcon, Cog6ToothIcon,
  XMarkIcon, Bars3Icon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightOnRectangleIcon,
  DocumentDuplicateIcon, PlayCircleIcon, UsersIcon,
  UserCircleIcon, AdjustmentsHorizontalIcon,
  ExclamationTriangleIcon, TrashIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const S = 1

const navItems = [
  { icon: Squares2X2Icon,       label: 'Dashboard',     href: '/dashboard' },
  { icon: FolderOpenIcon,       label: 'Projects',      href: '/projects'  },
  { icon: DocumentDuplicateIcon, label: 'Presets',       href: '/presets'   },
  { icon: PlayCircleIcon,       label: 'Listen',        href: '/dashboard' },
  { icon: UsersIcon,            label: 'Collaborators', href: '/dashboard' },
]

export default function Settings() {
  const [sidebarOpen, setSidebarOpen]       = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function isNavActive(label: string) {
    if (label === 'Dashboard') return location.pathname === '/dashboard'
    if (label === 'Projects')  return location.pathname.startsWith('/projects')
    if (label === 'Presets')   return location.pathname === '/presets'
    return false
  }
  const [activeTab, setActiveTab]       = useState<'profile' | 'audio'>('profile')

  // Profile
  const [displayName, setDisplayName]   = useState('')
  const [bio, setBio]                   = useState('')

  // Audio
  const [defaultGenre, setDefaultGenre] = useState('')
  const [defaultBpm, setDefaultBpm]     = useState(120)
  const [defaultVolume, setDefaultVolume] = useState(80)
  const [defaultPan, setDefaultPan]     = useState(0)
  const [eqLow, setEqLow]               = useState(0)
  const [eqMid, setEqMid]               = useState(0)
  const [eqHigh, setEqHigh]             = useState(0)
  const [reverb, setReverb]             = useState(0)
  const [delay, setDelay]               = useState(0)
  const [compression, setCompression]   = useState(0)

  const panLabel = defaultPan === 0 ? 'C' : defaultPan > 0 ? `R${defaultPan}` : `L${Math.abs(defaultPan)}`

  const inputStyle = {
    background: 'var(--color-input)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--color-foreground)',
  }

  function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = 'var(--color-primary)'
  }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
  }

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
              <button
                className="hidden lg:flex p-1 rounded-md transition-colors hover:text-[var(--color-primary)]"
                style={{ color: 'var(--color-muted-foreground)' }}
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
                sidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5 text-left'
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
              <div className="flex justify-center p-2.5 rounded-lg" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)' }}>
                <Cog6ToothIcon className="w-[18px] h-[18px]" strokeWidth={S} />
              </div>
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
              <div
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                style={{ background: 'var(--color-accent)', color: 'var(--color-primary)' }}
              >
                <Cog6ToothIcon className="w-[18px] h-[18px]" strokeWidth={S} />
                Settings
              </div>
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

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-10">

            {/* Page title */}
            <div className="mb-8">
              <h1 style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-primary)', lineHeight: 1.2 }}>
                Settings
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                Your studio, your rules. Dial it in.
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-1 p-1 rounded-xl mb-8" style={{ background: 'var(--color-input)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {([
                { id: 'profile', label: 'Profile',           icon: UserCircleIcon },
                { id: 'audio',   label: 'Audio Preferences', icon: AdjustmentsHorizontalIcon },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={activeTab === id
                    ? { background: 'var(--color-accent)', color: 'var(--color-primary)', border: '1px solid rgba(255,255,255,0.08)' }
                    : { color: 'var(--color-muted-foreground)', border: '1px solid transparent' }
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={S} />
                  {label}
                </button>
              ))}
            </div>

            {/* ── Profile tab ── */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="rounded-xl border p-6" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--gradient-card)' }}>
                  <div className="mb-5">
                    <h2 className="text-base font-medium">Profile Information</h2>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>Update your display name and bio</p>
                  </div>

                  <div className="space-y-5">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        disabled
                        defaultValue="david@inmix.studio"
                        className="w-full px-4 py-2.5 rounded-lg text-sm"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--color-muted-foreground)', cursor: 'not-allowed', outline: 'none' }}
                      />
                      <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted-foreground)' }}>
                        Email is locked to your account. Contact support to change it.
                      </p>
                    </div>

                    {/* Display Name */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Display Name</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                        style={inputStyle}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        placeholder="Producer, beatmaker, sound designer… what's your story?"
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors resize-none"
                        style={inputStyle}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </div>
                  </div>

                  <button
                    className="mt-6 rounded-full px-6 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ background: '#A8A8A8', color: '#000' }}
                  >
                    Save Profile
                  </button>
                </div>

                <DangerZone />
              </div>
            )}

            {/* ── Audio Preferences tab ── */}
            {activeTab === 'audio' && (
              <div className="space-y-5">
                <div className="rounded-xl border p-6" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--gradient-card)' }}>
                  <div className="mb-6">
                    <h2 className="text-base font-medium">Default Audio Settings</h2>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>Set default values for new tracks in your projects</p>
                  </div>

                  <div className="space-y-7">
                    {/* Genre + BPM */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Default Genre</label>
                        <div className="relative">
                          <select
                            value={defaultGenre}
                            onChange={e => setDefaultGenre(e.target.value)}
                            className="w-full px-4 py-2.5 pr-9 rounded-lg text-sm outline-none appearance-none cursor-pointer transition-colors"
                            style={{ ...inputStyle, color: defaultGenre ? 'var(--color-foreground)' : 'var(--color-muted-foreground)', colorScheme: 'dark' }}
                            onFocus={focusBorder}
                            onBlur={blurBorder}
                          >
                            <option value="">Select genre</option>
                            {['Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Electronic', 'R&B', 'Classical', 'Folk'].map(g => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Default BPM</label>
                        <input
                          type="number"
                          min={40} max={240}
                          value={defaultBpm}
                          onChange={e => setDefaultBpm(Number(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                          style={{ ...inputStyle, colorScheme: 'dark' }}
                          onFocus={focusBorder}
                          onBlur={blurBorder}
                        />
                      </div>
                    </div>

                    {/* Volume & Pan */}
                    <div>
                      <SectionTitle>Volume & Pan</SectionTitle>
                      <div className="grid grid-cols-2 gap-6 mt-4">
                        <SliderField label="Default Volume" value={defaultVolume} display={`${defaultVolume}%`}
                          min={0} max={100} onChange={setDefaultVolume} />
                        <SliderField label="Default Pan" value={defaultPan} display={panLabel}
                          min={-100} max={100} onChange={setDefaultPan} />
                      </div>
                    </div>

                    {/* EQ Defaults */}
                    <div>
                      <SectionTitle>EQ Defaults</SectionTitle>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <SliderField label="Low" value={eqLow} display={`${eqLow > 0 ? '+' : ''}${eqLow} dB`}
                          min={-12} max={12} onChange={setEqLow} />
                        <SliderField label="Mid" value={eqMid} display={`${eqMid > 0 ? '+' : ''}${eqMid} dB`}
                          min={-12} max={12} onChange={setEqMid} />
                        <SliderField label="High" value={eqHigh} display={`${eqHigh > 0 ? '+' : ''}${eqHigh} dB`}
                          min={-12} max={12} onChange={setEqHigh} />
                      </div>
                    </div>

                    {/* Effects Defaults */}
                    <div>
                      <SectionTitle>Effects Defaults</SectionTitle>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <SliderField label="Reverb"      value={reverb}      display={`${reverb}%`}      min={0} max={100} onChange={setReverb} />
                        <SliderField label="Delay"       value={delay}       display={`${delay}%`}       min={0} max={100} onChange={setDelay} />
                        <SliderField label="Compression" value={compression} display={`${compression}%`} min={0} max={100} onChange={setCompression} />
                      </div>
                    </div>
                  </div>

                  <button
                    className="mt-7 rounded-full px-6 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ background: '#A8A8A8', color: '#000' }}
                  >
                    Save Audio Settings
                  </button>
                </div>

                <DangerZone />
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-primary)', letterSpacing: '0.08em' }}>
      {children}
    </h3>
  )
}

function SliderField({
  label, value, display, min, max, onChange,
}: {
  label: string; value: number; display: string; min: number; max: number; onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{label}</span>
        <span className="font-mono text-xs tabular-nums" style={{ color: 'var(--color-primary)' }}>{display}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer"
        style={{ accentColor: 'var(--color-primary)' }}
      />
    </div>
  )
}

function DangerZone() {
  return (
    <div className="rounded-xl border p-5" style={{ borderColor: 'rgba(239,68,68,0.22)', background: 'rgba(239,68,68,0.04)' }}>
      <div className="flex items-center gap-2 mb-2">
        <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" strokeWidth={1} style={{ color: '#ef4444' }} />
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#ef4444', letterSpacing: '0.08em' }}>
          Danger Zone
        </span>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
        Permanently delete your account and all associated projects, tracks, and exports. This cannot be undone.
      </p>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
        style={{ borderColor: 'rgba(239,68,68,0.35)', color: '#f87171', background: 'transparent' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <TrashIcon className="w-4 h-4" strokeWidth={1} />
        Delete My Account
      </button>
    </div>
  )
}
