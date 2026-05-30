import { useState } from 'react'
import {
  Bars3Icon, ChevronDownIcon,
  UserCircleIcon, AdjustmentsHorizontalIcon,
  ExclamationTriangleIcon, TrashIcon,
} from '@heroicons/react/24/outline'
import { AppSidebar } from '@/components/AppSidebar'
import { TabGroup } from '@/components/ui/tab-group'

const S = 1

export default function Settings() {
  const [sidebarOpen, setSidebarOpen]   = useState(false)
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

      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

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
              <h1 style={{ fontSize: '36px', fontWeight: 300, color: '#ffffff', lineHeight: 1.2 }}>
                Settings
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                Your studio, your rules. Dial it in.
              </p>
            </div>

            {/* Tab switcher */}
            <div className="mb-8">
              <TabGroup
                tabs={[
                  { id: 'profile', label: 'Profile',           icon: UserCircleIcon },
                  { id: 'audio',   label: 'Audio Preferences', icon: AdjustmentsHorizontalIcon },
                ]}
                active={activeTab}
                onChange={setActiveTab}
                size="md"
              />
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
                    style={{ background: '#ffffff', color: '#000' }}
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
                    style={{ background: '#ffffff', color: '#000' }}
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
        style={{ accentColor: '#0011FF' }}
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
