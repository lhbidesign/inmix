/**
 * INMIX Design System — Client Delivery
 * Route: /design-system
 *
 * Documents: design tokens, components, typography, colors, spacing, icons.
 * Stack: Vite · React 19 · TypeScript · Tailwind v4 · Radix UI · CVA · Heroicons 2
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeftIcon, CheckIcon, ClipboardIcon, ChevronDownIcon,
  SparklesIcon, BoltIcon, SpeakerWaveIcon, ClockIcon, StarIcon,
  ArrowsPointingOutIcon, FilmIcon, CloudIcon, MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon, SunIcon, FolderOpenIcon, Squares2X2Icon,
  DocumentDuplicateIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon,
  PlayIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, ShareIcon,
  ArrowUturnLeftIcon, ArrowPathIcon, LinkIcon, UserPlusIcon,
  TrashIcon, EllipsisHorizontalIcon, MusicalNoteIcon, PlusIcon,
  CursorArrowRaysIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon,
  MapPinIcon, TrophyIcon, GlobeAltIcon, PauseIcon,
} from '@heroicons/react/24/outline'
import {
  PlayIcon as PlaySolid, PauseIcon as PauseSolid, StopIcon as StopSolid,
  BackwardIcon as BackwardSolid, ForwardIcon as ForwardSolid,
} from '@heroicons/react/24/solid'

const S = 1

// ── Clipboard helper ──────────────────────────────────────────────────────────
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1800)
  }
  return { copied, copy }
}

function CopyBtn({ value, label }: { value: string; label: string }) {
  const { copied, copy } = useCopy()
  const done = copied === label
  return (
    <button
      onClick={() => copy(value, label)}
      className="ml-2 p-1 rounded transition-colors hover:text-white"
      style={{ color: 'rgba(255,255,255,0.35)' }}
      title="Copy"
    >
      {done
        ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" strokeWidth={S} />
        : <ClipboardIcon className="w-3.5 h-3.5" strokeWidth={S} />
      }
    </button>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <h2 className="text-xs font-semibold tracking-widest uppercase mb-6 pb-3 border-b"
        style={{ color: 'var(--color-primary)', borderColor: 'rgba(255,255,255,0.08)' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

// ── Token row ─────────────────────────────────────────────────────────────────
function Token({ label, value, swatch }: { label: string; value: string; swatch?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="flex items-center gap-3">
        {swatch && (
          <div className="w-7 h-7 rounded-lg border flex-shrink-0"
            style={{ background: swatch, borderColor: 'rgba(255,255,255,0.12)' }} />
        )}
        <span className="text-sm font-mono" style={{ color: 'var(--color-foreground)' }}>{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>{value}</span>
        <CopyBtn value={value} label={label} />
      </div>
    </div>
  )
}

// ── Preview card ──────────────────────────────────────────────────────────────
function Preview({ title, code, children }: { title: string; code: string; children: React.ReactNode }) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  return (
    <div className="rounded-xl border overflow-hidden mb-5" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{title}</span>
        <div className="flex gap-0.5 p-0.5 rounded-md" style={{ background: 'var(--color-accent)' }}>
          {(['preview', 'code'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-2.5 py-1 rounded text-xs capitalize transition-all"
              style={tab === t ? { background: '#000', color: '#fff' } : { color: 'var(--color-muted-foreground)' }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      {tab === 'preview' ? (
        <div className="p-6 flex flex-wrap items-center gap-4" style={{ background: '#0a0a0f' }}>
          {children}
        </div>
      ) : (
        <div className="relative group">
          <pre className="p-4 text-xs overflow-x-auto leading-relaxed"
            style={{ background: '#08080e', color: '#a8b4d8', fontFamily: 'var(--font-mono)' }}>
            {code}
          </pre>
          <div className="absolute top-3 right-3">
            <CopyBtn value={code} label={title + '-code'} />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Nav links ─────────────────────────────────────────────────────────────────
const navLinks = [
  { id: 'colors',      label: 'Colors'      },
  { id: 'typography',  label: 'Typography'  },
  { id: 'spacing',     label: 'Spacing'     },
  { id: 'icons',       label: 'Icons'       },
  { id: 'buttons',     label: 'Buttons'     },
  { id: 'inputs',      label: 'Inputs'      },
  { id: 'dropdowns',   label: 'Dropdowns'   },
  { id: 'badges',      label: 'Badges'      },
  { id: 'cards',       label: 'Cards'       },
  { id: 'tabs',        label: 'Tabs'        },
  { id: 'modals',      label: 'Modals'      },
  { id: 'components',  label: 'Components'  },
  { id: 'gallery',     label: 'Gallery'     },
]

// ─────────────────────────────────────────────────────────────────────────────

// ── Simple static waveform for demos ─────────────────────────────────────────
const WAVE_TOP = "M0,28 Q52,14 104,24 Q156,34 208,20 Q260,8 312,22 Q364,36 416,18 Q468,4 520,24 Q572,38 624,20 Q676,8 728,26 Q780,38 832,18 Q884,6 936,22 Q988,36 1040,20"
const WAVE_BOT = "M0,28 Q52,42 104,32 Q156,22 208,36 Q260,48 312,34 Q364,20 416,38 Q468,52 520,32 Q572,18 624,36 Q676,48 728,30 Q780,18 832,38 Q884,50 936,34 Q988,22 1040,36"

export default function DesignSystem() {
  const [tabActive, setTabActive]         = useState(0)
  const [showDropdown, setShowDropdown]   = useState(false)
  const [showGenre, setShowGenre]         = useState(false)
  const [genre, setGenre]                 = useState('Pop')
  const [exportFmt, setExportFmt]         = useState('WAV')
  // Gallery state
  const [gPlaying, setGPlaying]           = useState(false)
  const [gLoop, setGLoop]                 = useState(false)
  const [gPreset, setGPreset]             = useState('Clean')
  const [gMuted, setGMuted]               = useState(false)
  const [gSoloed, setGSoloed]             = useState(false)
  const [gMastering, setGMastering]       = useState(false)
  const [gPrivate, setGPrivate]           = useState(true)
  const [gBus, setGBus]                   = useState([100, 100, 100])
  const [gVolume, setGVolume]             = useState(80)
  const [gIntensity, setGIntensity]       = useState<'subtle'|'balanced'|'aggressive'>('balanced')
  const [gFocus, setGFocus]               = useState(new Set(['Balanced']))

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(10,10,15,0.88)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-1.5 text-xs transition-colors hover:text-white"
            style={{ color: 'var(--color-muted-foreground)' }}>
            <ChevronLeftIcon className="w-4 h-4" strokeWidth={S} />
            Dashboard
          </Link>
          <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="text-sm font-medium">INMIX Design System</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-mono"
            style={{ background: 'rgba(115,171,191,0.15)', color: 'var(--color-primary)', border: '1px solid rgba(115,171,191,0.3)' }}>
            v1.0.0
          </span>
        </div>
        <span className="text-xs font-mono hidden md:block" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Radix UI · CVA · Tailwind v4 · Heroicons 2
        </span>
      </header>

      <div className="flex">

        {/* Sidebar */}
        <nav className="hidden lg:flex flex-col gap-0.5 w-48 flex-shrink-0 sticky top-14 h-[calc(100vh-56px)] pt-8 px-3 overflow-y-auto"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          {navLinks.map(({ id, label }) => (
            <a key={id} href={`#${id}`}
              className="px-3 py-2 rounded-lg text-sm transition-all hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              {label}
            </a>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 px-8 py-10 max-w-4xl">

          <div className="mb-12">
            <h1 className="text-[36px] font-light mb-2">Design System</h1>
            <p style={{ color: 'var(--color-muted-foreground)' }}>
              Component library, design tokens and patterns for the INMIX Redesign project.
            </p>
          </div>

          {/* ── COLORS ──────────────────────────────────────────────────── */}
          <Section title="Colors" id="colors">
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Tokens defined in <code className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--color-primary)' }}>src/index.css</code> under{' '}
              <code className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--color-primary)' }}>@theme</code>.
              Non-standard colors (Electric Blue, track colors) are applied via <code className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.08)' }}>inline style</code>.
            </p>

            <p className="text-[10px] uppercase tracking-widest mb-2 mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Brand</p>
            <Token label="Electric Blue (brand CTA)" value="#0011FF"  swatch="#0011FF" />
            <Token label="--color-primary (teal)"    value="#73ABBF"  swatch="#73ABBF" />
            <Token label="--color-input"             value="#1D1C22"  swatch="#1D1C22" />

            <p className="text-[10px] uppercase tracking-widest mb-2 mt-6" style={{ color: 'rgba(255,255,255,0.35)' }}>Arrange track colors</p>
            <Token label="Lead Vocals"    value="#8B5CF6" swatch="#8B5CF6" />
            <Token label="Backing Vocals" value="#22C55E" swatch="#22C55E" />
            <Token label="Drums"          value="#EC4899" swatch="#EC4899" />
            <Token label="Bass"           value="#22D3EE" swatch="#22D3EE" />
            <Token label="Guitar"         value="#FBBF24" swatch="#FBBF24" />
            <Token label="Keyboard"       value="#A78BFA" swatch="#A78BFA" />
            <Token label="Percussion"     value="#F472B6" swatch="#F472B6" />
            <Token label="Synth"          value="#34D399" swatch="#34D399" />

            <p className="text-[10px] uppercase tracking-widest mb-2 mt-6" style={{ color: 'rgba(255,255,255,0.35)' }}>Gradients</p>
            <Token label="--gradient-bg"      value="linear-gradient(160deg, #000000 0%, #1D1C22 100%)" />
            <Token label="--gradient-sidebar" value="linear-gradient(180deg, #0D1258 0%, #050722 100%)" />
            <Token label="--gradient-card"    value="linear-gradient(145deg, #0a0a0a 0%, #1a191f 100%)" />
            <Token label="Transport bar"      value="linear-gradient(180deg, #0D1258 0%, #050722 100%)" />

            <p className="text-[10px] uppercase tracking-widest mb-2 mt-6" style={{ color: 'rgba(255,255,255,0.35)' }}>Semantic CSS variables</p>
            <Token label="--color-background"       value="oklch(9% 0.005 285)" />
            <Token label="--color-foreground"       value="oklch(98% 0.005 285)" />
            <Token label="--color-muted-foreground" value="oklch(55% 0.01 285)" />
            <Token label="--color-accent"           value="oklch(25% 0.02 275)" />
            <Token label="--color-border"           value="rgba(255,255,255,0.08)" />
          </Section>

          {/* ── TYPOGRAPHY ──────────────────────────────────────────────── */}
          <Section title="Typography" id="typography">
            <div className="rounded-xl border p-5 mb-6"
              style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Font family</span>
                <CopyBtn value='"neue-haas-grotesk-display", "Neue Haas Grotesk Display Pro"' label="font-family" />
              </div>
              <p className="text-sm font-mono" style={{ color: '#fff' }}>neue-haas-grotesk-display</p>
              <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Adobe Fonts · Kit ID: <code className="font-mono">dcc5mne</code> · Activate at fonts.adobe.com and paste the &lt;link&gt; in index.html
              </p>
            </div>

            <div className="space-y-1 mb-6">
              {[
                { size: '10px', weight: 300, cls: 'text-[10px]',  sample: 'Smallest — labels, tags, captions, kbd badges' },
                { size: '12px', weight: 400, cls: 'text-xs',      sample: 'Extra small — metadata, mono timestamps, section labels' },
                { size: '14px', weight: 400, cls: 'text-sm',      sample: 'Small — body text, buttons, menu items, nav' },
                { size: '16px', weight: 400, cls: 'text-base',    sample: 'Base — modal body, descriptions' },
                { size: '28px', weight: 300, cls: 'text-[28px]',  sample: 'Medium heading — section titles' },
                { size: '36px', weight: 300, cls: 'text-[36px]',  sample: 'Large heading — page titles' },
              ].map(({ size, weight, cls, sample }) => (
                <div key={size} className="flex items-baseline gap-6 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="w-28 flex-shrink-0">
                    <p className="text-[10px] font-mono" style={{ color: 'var(--color-primary)' }}>{cls}</p>
                    <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>w{weight} / {size}</p>
                  </div>
                  <p style={{ fontSize: size, fontWeight: weight, lineHeight: 1.2 }}>{sample}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border p-5" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-xs mb-3" style={{ color: 'var(--color-muted-foreground)' }}>Available weights</p>
              <div className="flex gap-8">
                {[{ w: 300, n: '45 Light' }, { w: 400, n: '55 Roman' }, { w: 500, n: '65 Medium' }].map(({ w, n }) => (
                  <div key={w}>
                    <p style={{ fontWeight: w, fontSize: '22px', lineHeight: 1 }}>Aa</p>
                    <p className="text-[10px] font-mono mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{n}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ── SPACING ─────────────────────────────────────────────────── */}
          <Section title="Spacing" id="spacing">
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Uses Tailwind's default spacing scale. Most common values in the project:
            </p>
            <div className="space-y-1">
              {[
                { token: 'gap-1 / p-1',    px: '4px',    uso: 'Tightest — icon spacing, tab group padding' },
                { token: 'gap-2 / p-2',    px: '8px',    uso: 'Tight — icon buttons, inner badge padding' },
                { token: 'gap-3 / p-3',    px: '12px',   uso: 'Compact — preset cards, stem rows' },
                { token: 'gap-4 / p-4',    px: '16px',   uso: 'Default — modal sections, toolbar separators' },
                { token: 'px-5 / py-3',    px: '20/12',  uso: 'Header row, section padding' },
                { token: 'p-6',            px: '24px',   uso: 'Spacious — modal header, column padding' },
                { token: 'rounded-lg',     px: '8px',    uso: 'Inputs, dropdown items, toolbar buttons' },
                { token: 'rounded-xl',     px: '12px',   uso: 'Cards, preset cards, modal sections' },
                { token: 'rounded-2xl',    px: '16px',   uso: 'Modals, transport bar, floating cards' },
                { token: 'rounded-full',   px: '9999px', uso: 'Pill buttons (Save, Export, AI MIX), avatars' },
              ].map(({ token, px, uso }) => (
                <div key={token} className="flex items-center gap-4 py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <code className="text-xs font-mono w-32 flex-shrink-0" style={{ color: 'var(--color-primary)' }}>{token}</code>
                  <span className="text-xs font-mono w-14 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }}>{px}</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{uso}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── ICONS ───────────────────────────────────────────────────── */}
          <Section title="Icons" id="icons">
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              All icons use <strong className="text-white">Heroicons v2</strong> — outline set only.
              Import from <code className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--color-primary)' }}>
                @heroicons/react/24/outline
              </code>.
              Solid icons (<code className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.08)' }}>@heroicons/react/24/solid</code>) are used
              only for Play, Pause and Stop in the transport bar.
            </p>

            <div className="rounded-xl border p-4 mb-5" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-xs mb-3 font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Global rule — always use strokeWidth=&#123;1&#125;</p>
              <pre className="text-xs leading-relaxed" style={{ color: '#a8b4d8', fontFamily: 'var(--font-mono)' }}>
{`// Define once at the top of each file
const S = 1

// Always pass strokeWidth={S}
<SparklesIcon className="w-4 h-4" strokeWidth={S} />
<BoltIcon     className="w-3.5 h-3.5" strokeWidth={S} />
<ClockIcon    className="w-5 h-5" strokeWidth={S} />`}
              </pre>
            </div>

            <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>Icon catalog used in the project</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { Icon: SparklesIcon,            name: 'SparklesIcon',            use: 'AI MIX, Mix Console header, Clean preset' },
                { Icon: BoltIcon,                name: 'BoltIcon',                use: 'AI Suggestions stat, Punch preset, RUN MIX' },
                { Icon: SpeakerWaveIcon,         name: 'SpeakerWaveIcon',         use: 'Volume, Bus Sends section, Mixes Created stat' },
                { Icon: ClockIcon,               name: 'ClockIcon',               use: 'BPM, History button, Versions, Vintage preset' },
                { Icon: StarIcon,                name: 'StarIcon',                use: 'Bright preset, Starred projects' },
                { Icon: ArrowsPointingOutIcon,   name: 'ArrowsPointingOutIcon',   use: 'Wide preset, Arrange expand button' },
                { Icon: FilmIcon,                name: 'FilmIcon',                use: 'Cinematic preset, Cinematic genre preset' },
                { Icon: CloudIcon,               name: 'CloudIcon',               use: 'Open Air preset' },
                { Icon: MagnifyingGlassIcon,     name: 'MagnifyingGlassIcon',     use: 'Search inputs, HD preset' },
                { Icon: AdjustmentsHorizontalIcon, name: 'AdjustmentsHorizontalIcon', use: 'Glue preset, Master Mixing Bus section' },
                { Icon: SunIcon,                 name: 'SunIcon',                 use: 'Warmth preset, Lo-Fi Chill genre preset' },
                { Icon: FolderOpenIcon,          name: 'FolderOpenIcon',          use: 'Active Projects stat, sidebar Projects' },
                { Icon: Squares2X2Icon,          name: 'Squares2X2Icon',          use: 'Sidebar Dashboard, Arrange shortcuts trigger' },
                { Icon: DocumentDuplicateIcon,   name: 'DocumentDuplicateIcon',   use: 'Sidebar Presets' },
                { Icon: Cog6ToothIcon,           name: 'Cog6ToothIcon',           use: 'Sidebar Settings' },
                { Icon: ArrowRightOnRectangleIcon, name: 'ArrowRightOnRectangleIcon', use: 'Sidebar Log out' },
                { Icon: PlayIcon,                name: 'PlayIcon',                use: 'Preview button, play action in cards' },
                { Icon: PauseIcon,               name: 'PauseIcon',               use: 'Preview floating card pause state' },
                { Icon: ArrowDownTrayIcon,       name: 'ArrowDownTrayIcon',       use: 'Export WAV button' },
                { Icon: ArrowUpTrayIcon,         name: 'ArrowUpTrayIcon',         use: 'Add track, Publish Preset, Reference Track' },
                { Icon: ShareIcon,               name: 'ShareIcon',               use: 'Share button, Share Project modal' },
                { Icon: ArrowUturnLeftIcon,      name: 'ArrowUturnLeftIcon',      use: 'Undo, Reset button' },
                { Icon: ArrowPathIcon,           name: 'ArrowPathIcon',           use: 'Refresh button, Loop toggle' },
                { Icon: LinkIcon,                name: 'LinkIcon',                use: 'Snap tool, Generate Invite Link, Export & Copy' },
                { Icon: UserPlusIcon,            name: 'UserPlusIcon',            use: 'Invite Collaborator in Share modal' },
                { Icon: TrashIcon,               name: 'TrashIcon',               use: 'Delete stem, dismiss Preview card' },
                { Icon: EllipsisHorizontalIcon,  name: 'EllipsisHorizontalIcon',  use: 'Stem options, mobile overflow menu' },
                { Icon: MusicalNoteIcon,         name: 'MusicalNoteIcon',         use: 'Key signature, Mastering bar, Genre Presets' },
                { Icon: PlusIcon,                name: 'PlusIcon',                use: 'New Project, Arrange Move tool' },
                { Icon: CursorArrowRaysIcon,     name: 'CursorArrowRaysIcon',     use: 'Arrange Select tool' },
                { Icon: MagnifyingGlassMinusIcon, name: 'MagnifyingGlassMinusIcon', use: 'Arrange zoom out' },
                { Icon: MagnifyingGlassPlusIcon, name: 'MagnifyingGlassPlusIcon', use: 'Arrange zoom in' },
                { Icon: MapPinIcon,              name: 'MapPinIcon',              use: 'Street Heat Mix in Signature Mixes' },
                { Icon: TrophyIcon,              name: 'TrophyIcon',              use: 'Sparks Mix in Signature Mixes' },
                { Icon: GlobeAltIcon,            name: 'GlobeAltIcon',            use: 'Smiles Mix in Signature Mixes' },
                { Icon: ChevronDownIcon,         name: 'ChevronDownIcon',         use: 'Dropdowns — Genre, Export format, stem type' },
              ].map(({ Icon, name, use }) => (
                <div key={name} className="flex items-start gap-3 p-3 rounded-lg border"
                  style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                  <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono leading-none mb-1 truncate" style={{ color: '#fff' }}>{name}</p>
                    <p className="text-[10px] leading-snug" style={{ color: 'rgba(255,255,255,0.4)' }}>{use}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── BUTTONS ─────────────────────────────────────────────────── */}
          <Section title="Buttons" id="buttons">
            <Preview title="Filled White — primary CTA (Save, Publish)"
              code={`<button
  className="rounded-full px-4 py-1.5 text-xs font-medium hover:opacity-80"
  style={{ background: '#ffffff', color: '#000' }}
>
  Save
</button>`}>
              <button className="rounded-full px-4 py-1.5 text-xs font-medium hover:opacity-80"
                style={{ background: '#ffffff', color: '#000' }}>Save</button>
              <button className="rounded-full px-4 py-1.5 text-xs font-medium hover:opacity-80"
                style={{ background: '#ffffff', color: '#000' }}>Publish Preset</button>
            </Preview>

            <Preview title="Electric Blue — AI actions (AI MIX)"
              code={`<button
  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium"
  style={{
    background: 'rgba(0,17,255,0.1)',
    border: '1px solid rgba(0,17,255,0.4)',
    color: '#6680ff',
  }}
>
  <BoltIcon className="w-3.5 h-3.5" strokeWidth={S} />
  AI MIX
</button>`}>
              <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(0,17,255,0.1)', border: '1px solid rgba(0,17,255,0.4)', color: '#6680ff' }}>
                <BoltIcon className="w-3.5 h-3.5" strokeWidth={S} />
                AI MIX
              </button>
            </Preview>

            <Preview title="Outline — secondary actions (Export WAV)"
              code={`<button
  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
  style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}
>
  <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
  Export WAV
</button>`}>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}>
                <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                Export WAV
              </button>
            </Preview>

            <Preview title="Ghost — nav actions (Preview, Refresh, Versions, Share)"
              code={`<button
  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors hover:text-white"
  style={{ color: 'var(--color-muted-foreground)' }}
>
  <PlayIcon className="w-3.5 h-3.5" strokeWidth={S} />
  Preview
</button>`}>
              {[
                { Icon: PlayIcon, label: 'Preview' },
                { Icon: ArrowPathIcon, label: 'Refresh' },
                { Icon: ClockIcon, label: 'Versions' },
                { Icon: ShareIcon, label: 'Share' },
              ].map(({ Icon, label }) => (
                <button key={label} className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors hover:text-white"
                  style={{ color: 'var(--color-muted-foreground)' }}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={S} />
                  {label}
                </button>
              ))}
            </Preview>

            <Preview title="Play — transport bar"
              code={`<button
  className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-85"
  style={{ background: '#ffffff', color: '#000' }}
>
  <PlaySolid className="w-4 h-4 ml-0.5" />
</button>`}>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-85"
                style={{ background: '#ffffff', color: '#000' }}>
                <PlaySolid className="w-4 h-4 ml-0.5" />
              </button>
            </Preview>

            <Preview title="Run Mix — modal primary CTA"
              code={`<button
  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold"
  style={{ background: '#0011FF', color: '#fff', boxShadow: '0 0 20px rgba(0,17,255,0.4)' }}
>
  <BoltIcon className="w-4 h-4" strokeWidth={S} />
  RUN MIX
</button>`}>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: '#0011FF', color: '#fff', boxShadow: '0 0 20px rgba(0,17,255,0.4)' }}>
                <BoltIcon className="w-4 h-4" strokeWidth={S} />
                RUN MIX
              </button>
            </Preview>

            <Preview title="M / S — Mute and Solo stem controls"
              code={`// Mute — inactive / active
<button style={{
  background: muted ? 'rgba(251,191,36,0.18)' : 'var(--color-input)',
  color: muted ? '#fbbf24' : 'var(--color-muted-foreground)',
  border: \`1px solid \${muted ? '#fbbf24' : 'rgba(255,255,255,0.1)'}\`,
}} className="w-6 h-6 rounded text-xs font-bold">M</button>

// Solo — inactive / active
<button style={{
  background: soloed ? \`\${accentColor}28\` : 'var(--color-input)',
  color: soloed ? accentColor : 'var(--color-muted-foreground)',
  border: \`1px solid \${soloed ? accentColor : 'rgba(255,255,255,0.1)'}\`,
}} className="w-6 h-6 rounded text-xs font-bold">S</button>`}>
              <button className="w-6 h-6 rounded text-xs font-bold"
                style={{ background: 'var(--color-input)', color: 'var(--color-muted-foreground)', border: '1px solid rgba(255,255,255,0.1)' }}>M</button>
              <button className="w-6 h-6 rounded text-xs font-bold"
                style={{ background: 'rgba(251,191,36,0.18)', color: '#fbbf24', border: '1px solid #fbbf24' }}>M</button>
              <button className="w-6 h-6 rounded text-xs font-bold"
                style={{ background: 'var(--color-input)', color: 'var(--color-muted-foreground)', border: '1px solid rgba(255,255,255,0.1)' }}>S</button>
              <button className="w-6 h-6 rounded text-xs font-bold"
                style={{ background: 'rgba(60,148,185,0.2)', color: '#3c94b9', border: '1px solid #3c94b9' }}>S</button>
            </Preview>
          </Section>

          {/* ── INPUTS ──────────────────────────────────────────────────── */}
          <Section title="Inputs" id="inputs">
            <Preview title="Text input — search"
              code={`<input
  type="text"
  placeholder="Search projects..."
  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
  style={{
    background: 'var(--color-input)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--color-foreground)',
  }}
/>`}>
              <input type="text" placeholder="Search projects..."
                className="px-4 py-2.5 rounded-xl text-sm outline-none w-64"
                style={{ background: 'var(--color-input)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-foreground)' }} />
            </Preview>

            <Preview title="Range slider — volume / bus send"
              code={`<input
  type="range"
  min={0} max={100} defaultValue={80}
  className="w-24 h-1 rounded-full cursor-pointer"
  style={{ accentColor: '#0011FF' }}
/>`}>
              <div className="flex items-center gap-3">
                <SpeakerWaveIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'rgba(255,255,255,0.35)' }} />
                <input type="range" min={0} max={100} defaultValue={80}
                  className="w-32 h-1 rounded-full cursor-pointer"
                  style={{ accentColor: '#0011FF' }} />
                <span className="text-xs font-mono" style={{ color: 'var(--color-muted-foreground)' }}>80</span>
              </div>
            </Preview>
          </Section>

          {/* ── DROPDOWNS ───────────────────────────────────────────────── */}
          <Section title="Dropdowns" id="dropdowns">
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Dropdowns are built as custom controlled components (no Radix DropdownMenu),
              using a relative wrapper, an overlay div to capture outside clicks, and an
              absolute positioned menu panel.
            </p>

            <Preview title="Genre dropdown — header"
              code={`const [open, setOpen] = useState(false)
const [genre, setGenre] = useState('Pop')

<div className="relative">
  <button
    onClick={() => setOpen(v => !v)}
    className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs border"
    style={{
      borderColor: 'rgba(255,255,255,0.12)',
      color: 'var(--color-muted-foreground)',
      background: 'var(--color-input)',
    }}
  >
    {genre}
    <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
  </button>

  {open && (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div className="absolute left-0 top-full mt-1 z-50 rounded-lg border py-1"
        style={{ background: '#0f0e13', borderColor: 'rgba(255,255,255,0.12)', minWidth: '110px' }}
      >
        {['Pop', 'Rock', 'Jazz', 'Hip-Hop'].map(g => (
          <button key={g} onClick={() => { setGenre(g); setOpen(false) }}
            className="w-full text-left px-3 py-1.5 text-xs hover:text-white"
            style={{
              color: genre === g ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
              background: genre === g ? 'var(--color-accent)' : 'transparent',
            }}>
            {g}
          </button>
        ))}
      </div>
    </>
  )}
</div>`}>
              <div className="relative">
                <button
                  onClick={() => setShowGenre(v => !v)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs border transition-colors hover:text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--color-muted-foreground)', background: 'var(--color-input)' }}
                >
                  {genre}
                  <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
                </button>
                {showGenre && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowGenre(false)} />
                    <div className="absolute left-0 top-full mt-1 z-50 rounded-lg border overflow-hidden py-1"
                      style={{ background: '#0f0e13', borderColor: 'rgba(255,255,255,0.12)', minWidth: '110px' }}>
                      {['Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Electronic'].map(g => (
                        <button key={g} onClick={() => { setGenre(g); setShowGenre(false) }}
                          className="w-full text-left px-3 py-1.5 text-xs transition-colors hover:text-white"
                          style={{ color: genre === g ? 'var(--color-primary)' : 'var(--color-muted-foreground)', background: genre === g ? 'var(--color-accent)' : 'transparent' }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Preview>

            <Preview title="Split button with format dropdown — Export WAV"
              code={`<div className="flex items-center rounded-full"
  style={{ border: '1px solid rgba(255,255,255,0.5)' }}>
  <button className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 text-xs font-medium"
    style={{ color: '#ffffff' }}>
    <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
    Export {format}
  </button>
  <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.3)' }} />
  <button onClick={() => setOpen(v => !v)} className="px-2 py-1.5"
    style={{ color: '#ffffff' }}>
    <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
  </button>
</div>`}>
              <div className="relative">
                <div className="flex items-center rounded-full" style={{ border: '1px solid rgba(255,255,255,0.5)' }}>
                  <button className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 text-xs font-medium" style={{ color: '#ffffff' }}>
                    <ArrowDownTrayIcon className="w-3.5 h-3.5" strokeWidth={S} />
                    Export {exportFmt}
                  </button>
                  <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.3)' }} />
                  <button onClick={() => setShowDropdown(v => !v)} className="px-2 py-1.5" style={{ color: '#ffffff' }}>
                    <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
                  </button>
                </div>
                {showDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                    <div className="absolute right-0 top-full mt-1 z-50 rounded-lg border overflow-hidden py-1"
                      style={{ background: '#0f0e13', borderColor: 'rgba(255,255,255,0.12)', minWidth: '90px' }}>
                      {['WAV', 'MP3', 'FLAC', 'STEMS'].map(fmt => (
                        <button key={fmt} onClick={() => { setExportFmt(fmt); setShowDropdown(false) }}
                          className="w-full text-left px-3 py-1.5 text-xs transition-colors hover:text-white"
                          style={{ color: exportFmt === fmt ? 'var(--color-primary)' : 'var(--color-muted-foreground)', background: exportFmt === fmt ? 'var(--color-accent)' : 'transparent' }}>
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Preview>
          </Section>

          {/* ── BADGES ──────────────────────────────────────────────────── */}
          <Section title="Badges" id="badges">
            <Preview title="Status badges"
              code={`<span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
  style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)' }}>
  Mixing
</span>`}>
              {[
                { label: 'Mixing',    bg: 'rgba(59,130,246,0.15)',  color: '#93c5fd',  border: 'rgba(59,130,246,0.3)'  },
                { label: 'Mastering', bg: 'rgba(245,158,11,0.15)', color: '#fcd34d',  border: 'rgba(245,158,11,0.3)' },
                { label: 'Review',   bg: 'rgba(168,85,247,0.15)',  color: '#c084fc',  border: 'rgba(168,85,247,0.3)'  },
                { label: 'Complete', bg: 'rgba(34,197,94,0.15)',   color: '#86efac',  border: 'rgba(34,197,94,0.3)'   },
                { label: 'OFFICIAL', bg: 'rgba(34,197,94,0.15)',   color: '#86efac',  border: 'rgba(34,197,94,0.3)'   },
                { label: 'HIP-HOP',  bg: 'rgba(59,130,246,0.15)',  color: '#93c5fd',  border: 'rgba(59,130,246,0.3)'  },
                { label: 'R&B',      bg: 'rgba(245,158,11,0.15)', color: '#fcd34d',  border: 'rgba(245,158,11,0.3)' },
              ].map(({ label, bg, color, border }) => (
                <span key={label} className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
                  style={{ background: bg, color, border: `1px solid ${border}` }}>
                  {label}
                </span>
              ))}
            </Preview>

            <Preview title="Focus chips — Mix Console"
              code={`<button
  className="px-2.5 py-1 rounded-full text-xs font-medium border"
  style={active
    ? { background: 'rgba(115,171,191,0.15)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }
    : { background: 'transparent', borderColor: 'rgba(255,255,255,0.12)', color: 'var(--color-muted-foreground)' }
  }
>
  Balanced
</button>`}>
              {['Balanced', 'Vocals up front', 'Drum-driven', 'Low-end heavy', 'Wide stereo'].map((chip, i) => (
                <button key={chip} className="px-2.5 py-1 rounded-full text-xs font-medium border"
                  style={i < 2
                    ? { background: 'rgba(115,171,191,0.15)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }
                    : { background: 'transparent', borderColor: 'rgba(255,255,255,0.12)', color: 'var(--color-muted-foreground)' }
                  }>
                  {chip}
                </button>
              ))}
            </Preview>
          </Section>

          {/* ── CARDS ───────────────────────────────────────────────────── */}
          <Section title="Cards" id="cards">
            <Preview title="Stat card — Dashboard"
              code={`<div className="p-5 rounded-xl border"
  style={{ background: 'var(--gradient-card)', borderColor: 'rgba(255,255,255,0.08)' }}>
  <div className="flex items-start justify-between mb-1">
    <p className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)' }}>
      Active Projects
    </p>
    <div className="w-8 h-8 rounded-full flex items-center justify-center"
      style={{ background: '#0011FF' }}>
      <FolderOpenIcon className="w-4 h-4" strokeWidth={S} style={{ color: '#fff' }} />
    </div>
  </div>
  <p className="text-[44px] font-normal tracking-tight leading-none">12</p>
</div>`}>
              <div className="p-5 rounded-xl border w-48"
                style={{ background: 'var(--gradient-card)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)' }}>Active Projects</p>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#0011FF' }}>
                    <FolderOpenIcon className="w-4 h-4" strokeWidth={S} style={{ color: '#fff' }} />
                  </div>
                </div>
                <p className="text-[44px] font-normal tracking-tight leading-none">12</p>
              </div>
            </Preview>

            <Preview title="Preset card — Master Mixing Bus"
              code={`<button
  className="flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all"
  style={{
    borderColor: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
    background: active ? 'var(--color-accent)' : 'var(--gradient-card)',
  }}
>
  <SparklesIcon className="w-4 h-4" strokeWidth={S}
    style={{ color: active ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }} />
  <p className="text-xs font-medium">Clean</p>
  <p className="text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>
    Transparent, flat response
  </p>
</button>`}>
              {[
                { name: 'Clean',   Icon: SparklesIcon, active: true  },
                { name: 'Warmth',  Icon: SunIcon,      active: false },
                { name: 'Punch',   Icon: BoltIcon,     active: false },
              ].map(({ name, Icon, active }) => (
                <div key={name} className="flex flex-col gap-1.5 p-3 rounded-xl border w-28"
                  style={{ borderColor: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)', background: active ? 'var(--color-accent)' : 'var(--gradient-card)' }}>
                  <Icon className="w-4 h-4" strokeWidth={S} style={{ color: active ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }} />
                  <p className="text-xs font-medium">{name}</p>
                  <p className="text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>Preset description</p>
                </div>
              ))}
            </Preview>

            <Preview title="Selectable card — Tailored Mix (selected state)"
              code={`<div
  className="flex items-center justify-between gap-2 p-3.5 rounded-xl border cursor-pointer"
  style={{
    background:  selected ? 'rgba(0,17,255,0.18)' : 'rgba(255,255,255,0.03)',
    borderColor: selected ? 'rgba(0,17,255,0.7)'  : 'rgba(255,255,255,0.06)',
    boxShadow:   selected ? '0 0 0 1px rgba(0,17,255,0.3) inset' : 'none',
  }}
  onClick={() => setSelected(s => s === name ? null : name)}
>
  ...
</div>`}>
              {[
                { name: 'STREET HEAT MIX', Icon: MapPinIcon,   selected: true  },
                { name: 'SPARKS MIX',       Icon: TrophyIcon,   selected: false },
                { name: 'SMILES MIX',       Icon: GlobeAltIcon, selected: false },
              ].map(({ name, Icon, selected }) => (
                <div key={name} className="flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer w-44"
                  style={{ background: selected ? 'rgba(0,17,255,0.18)' : 'rgba(255,255,255,0.03)', borderColor: selected ? 'rgba(0,17,255,0.7)' : 'rgba(255,255,255,0.06)', boxShadow: selected ? '0 0 0 1px rgba(0,17,255,0.3) inset' : 'none' }}>
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#0011FF' }}>
                    <Icon className="w-3.5 h-3.5" strokeWidth={S} style={{ color: '#fff' }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-wide" style={{ color: '#fff' }}>{name}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Tailored mix</p>
                  </div>
                </div>
              ))}
            </Preview>
          </Section>

          {/* ── TABS ────────────────────────────────────────────────────── */}
          <Section title="Tabs" id="tabs">
            <Preview title="Pill tabs — Mix / Arrange"
              code={`<div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--color-accent)' }}>
  {['Mix', 'Arrange'].map(tab => (
    <button key={tab} onClick={() => setMode(tab)}
      className="px-3 py-1 rounded-md text-xs capitalize transition-all"
      style={active === tab
        ? { background: '#000', color: '#fff' }
        : { color: 'var(--color-muted-foreground)' }
      }>
      {tab}
    </button>
  ))}
</div>`}>
              <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--color-accent)' }}>
                {['Mix', 'Arrange'].map((tab, i) => (
                  <button key={tab} onClick={() => setTabActive(i)}
                    className="px-3 py-1 rounded-md text-xs capitalize transition-all"
                    style={tabActive === i ? { background: '#000', color: '#fff' } : { color: 'var(--color-muted-foreground)' }}>
                    {tab}
                  </button>
                ))}
              </div>
            </Preview>

            <Preview title="Rounded tabs — Presets (Official / Community / My Presets)"
              code={`<div className="flex gap-1 p-1 rounded-full" style={{ background: 'var(--color-accent)' }}>
  {tabs.map(tab => (
    <button key={tab}
      className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
      style={active === tab
        ? { background: '#000', color: '#fff' }
        : { color: 'var(--color-muted-foreground)' }
      }>
      {tab}
    </button>
  ))}
</div>`}>
              <div className="flex gap-1 p-1 rounded-full" style={{ background: 'var(--color-accent)' }}>
                {['Official', 'Community', 'My Presets'].map((tab, i) => (
                  <button key={tab} onClick={() => setTabActive(i)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={tabActive === i ? { background: '#000', color: '#fff' } : { color: 'var(--color-muted-foreground)' }}>
                    {tab}
                  </button>
                ))}
              </div>
            </Preview>

            <Preview title="Intensity selector — Mix Console"
              code={`<div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--color-accent)' }}>
  {(['subtle', 'balanced', 'aggressive'] as const).map(v => (
    <button key={v} onClick={() => setIntensity(v)}
      className="flex-1 py-1.5 rounded-md text-xs capitalize transition-all"
      style={intensity === v
        ? { background: '#000', color: '#fff' }
        : { color: 'var(--color-muted-foreground)' }
      }>
      {v.charAt(0).toUpperCase() + v.slice(1)}
    </button>
  ))}
</div>`}>
              <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--color-accent)', width: '220px' }}>
                {['Subtle', 'Balanced', 'Aggressive'].map((v, i) => (
                  <button key={v} onClick={() => setTabActive(i)}
                    className="flex-1 py-1.5 rounded-md text-xs capitalize transition-all"
                    style={tabActive === i ? { background: '#000', color: '#fff' } : { color: 'var(--color-muted-foreground)' }}>
                    {v}
                  </button>
                ))}
              </div>
            </Preview>
          </Section>

          {/* ── MODALS ──────────────────────────────────────────────────── */}
          <Section title="Modals" id="modals">
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              All modals share the same base pattern:
            </p>
            <div className="rounded-xl border p-4 mb-5 text-xs font-mono leading-relaxed"
              style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: '#a8b4d8' }}>
              {`// Overlay
<div className="fixed inset-0 z-50 flex items-center justify-center p-4"
  style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
  onClick={() => setOpen(false)}>

  // Panel
  <div className="w-full max-w-lg rounded-2xl border overflow-hidden"
    style={{ background: '#0e0d14', borderColor: 'rgba(255,255,255,0.1)' }}
    onClick={e => e.stopPropagation()}>
    ...
  </div>
</div>`}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Mix Console',         trigger: 'AI MIX button in header',                desc: 'Signature Tailored Mixes (selectable), Genre Presets (auto intensity/focus), Intensity, Focus chips, Reference Track, RUN MIX CTA' },
                { name: 'Keyboard Shortcuts',  trigger: 'Grid icon in Arrange toolbar',           desc: '2-column layout: Tools / Edit / View / Playback — keyboard badges styled as dark rounded pills' },
                { name: 'Share Project',       trigger: 'Share button in header',                 desc: 'Share Session (Private/Public toggle), Invite Collaborator (Generate Link), Share Export (Copy Link)' },
                { name: 'Preview Float Card',  trigger: 'Preview button in header',               desc: 'Fixed bottom-right card with SparklesIcon, pause/play toggle and trash dismiss. Not a modal overlay.' },
              ].map(({ name, trigger, desc }) => (
                <div key={name} className="rounded-xl border p-4"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#fff' }}>{name}</p>
                  <p className="text-[10px] mb-2" style={{ color: 'var(--color-primary)' }}>Trigger: {trigger}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── COMPONENTS ──────────────────────────────────────────────── */}
          <Section title="Components" id="components">
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Complete inventory of implemented components.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { file: 'src/components/AppSidebar.tsx',   name: 'AppSidebar',          desc: 'Collapsible sidebar with desktop/mobile states, nav links, settings, logout, user profile' },
                { file: 'src/components/ui/button.tsx',    name: 'Button',              desc: 'CVA — variants: default, ghost, outline, icon. Sizes: sm, default, lg, icon' },
                { file: 'src/components/ui/card.tsx',      name: 'Card / CardContent',  desc: 'Card wrapper with standard padding and border' },
                { file: 'src/components/ui/input.tsx',     name: 'Input',               desc: 'Base text input with project styles' },
                { file: 'src/components/ui/badge.tsx',     name: 'Badge',               desc: 'Status badge with color variants' },
                { file: 'src/components/ui/tab-group.tsx', name: 'TabGroup<T>',         desc: 'Generic tab component, sizes sm/md, optional icons' },
                { file: 'src/components/ui/separator.tsx', name: 'Separator',           desc: 'Radix UI horizontal/vertical divider' },
                { file: 'src/components/ui/label.tsx',     name: 'Label',               desc: 'Radix UI Label with typographic styles' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Transport Bar',       desc: 'Play/pause/stop/loop controls, waveform visualizer, scrubber, LUFS meters, volume slider' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Master Mixing Bus',   desc: '12 preset cards with selected state highlight' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Bus Sends',           desc: '5 labeled send sliders with percentage readout' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Stem Track Row',      desc: 'Volume, pan, M/S, waveform, drag handle, hover actions (options, delete)' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Arrange View',        desc: 'Toolbar (Move/Cut/Select, Snap, zoom, BPM) + split layout: track list / timeline ruler + colored waveform regions' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Mastering Bar',       desc: 'Fixed bottom bar with Enable/Enabled toggle' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Mix Console Modal',   desc: 'Signature mixes + genre presets (auto intensity/focus) + RUN MIX' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Shortcuts Modal',     desc: 'Keyboard shortcuts in 2-column grid by category' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Share Modal',         desc: 'Share Session (toggle), Invite Collaborator, Share Export' },
                { file: 'src/pages/ProjectDetail.tsx',     name: 'Preview Float Card',  desc: 'Fixed bottom-right mini player with pause and dismiss' },
              ].map(({ file, name, desc }) => (
                <div key={name} className="rounded-xl border p-4"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#fff' }}>{name}</p>
                  <p className="text-[10px] font-mono mb-2" style={{ color: 'var(--color-primary)' }}>{file}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── GALLERY ─────────────────────────────────────────────────── */}
          <Section title="Gallery — All Components" id="gallery">
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Live visual examples of every component in the project inventory.
            </p>

            {/* 1 · AppSidebar */}
            <Preview title="AppSidebar — collapsed & expanded states" code={`// src/components/AppSidebar.tsx
<AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />`}>
              {/* Mini sidebar — expanded */}
              <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: '180px', background: 'var(--gradient-sidebar)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-4 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-4 w-16 rounded" style={{ background: 'rgba(255,255,255,0.15)' }} />
                </div>
                <nav className="px-2 py-3 space-y-0.5">
                  {[
                    { Icon: Squares2X2Icon, label: 'Dashboard', active: false },
                    { Icon: FolderOpenIcon, label: 'Projects',  active: true  },
                    { Icon: DocumentDuplicateIcon, label: 'Presets', active: false },
                  ].map(({ Icon, label, active }) => (
                    <div key={label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg"
                      style={{ background: active ? 'rgba(255,255,255,0.18)' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                      <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={S} />
                      <span className="text-xs font-medium">{label}</span>
                    </div>
                  ))}
                </nav>
                <div className="border-t px-2 py-3 space-y-0.5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <Cog6ToothIcon className="w-4 h-4" strokeWidth={S} />
                    <span className="text-xs font-medium">Settings</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <ArrowRightOnRectangleIcon className="w-4 h-4" strokeWidth={S} />
                    <span className="text-xs font-medium">Log out</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-2.5">
                    <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }} />
                    <div>
                      <p className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>David Suarez</p>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Pro Plan</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Collapsed */}
              <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: '52px', background: 'var(--gradient-sidebar)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex justify-center py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="w-4 h-4 rounded" style={{ background: 'rgba(255,255,255,0.15)' }} />
                </div>
                <nav className="px-1.5 py-3 space-y-0.5">
                  {[Squares2X2Icon, FolderOpenIcon, DocumentDuplicateIcon].map((Icon, i) => (
                    <div key={i} className="flex justify-center p-2.5 rounded-lg"
                      style={{ background: i === 1 ? 'rgba(255,255,255,0.18)' : 'transparent', color: i === 1 ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                      <Icon className="w-[18px] h-[18px]" strokeWidth={S} />
                    </div>
                  ))}
                </nav>
                <div className="border-t px-1.5 py-3 space-y-0.5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  {[Cog6ToothIcon, ArrowRightOnRectangleIcon].map((Icon, i) => (
                    <div key={i} className="flex justify-center p-2.5 rounded-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      <Icon className="w-[18px] h-[18px]" strokeWidth={S} />
                    </div>
                  ))}
                </div>
              </div>
            </Preview>

            {/* 2 · Separator + Label */}
            <Preview title="Separator & Label — Radix UI primitives" code={`import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'

<Label htmlFor="vol">Volume</Label>
<Separator />          {/* horizontal */}
<Separator orientation="vertical" />   {/* vertical */}`}>
              <div className="flex flex-col gap-4 w-64">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Section title</span>
                </div>
                <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="flex items-center gap-3">
                  <div className="h-8 w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Vertical separator</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Volume</span>
                  <input type="range" min={0} max={100} defaultValue={70} className="w-full h-1 rounded-full cursor-pointer" style={{ accentColor: '#0011FF' }} />
                </div>
              </div>
            </Preview>

            {/* 3 · Transport Bar */}
            <Preview title="Transport Bar — playback controls, waveform, LUFS meters" code={`// Inside ProjectDetail.tsx — always visible above Mix/Arrange content
// Play/pause toggles isPlaying state; loop button toggles loop state`}>
              <div className="w-full rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'linear-gradient(180deg,#0D1258 0%,#050722 100%)' }}>
                {/* Controls row */}
                <div className="flex items-center px-4 py-2.5 gap-4">
                  <div className="flex items-center gap-1">
                    <button className="h-8 w-8 flex items-center justify-center rounded-md" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <BackwardSolid className="w-4 h-4" />
                    </button>
                    <button onClick={() => setGPlaying(v => !v)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#fff', color: '#000' }}>
                      {gPlaying ? <PauseSolid className="w-4 h-4" /> : <PlaySolid className="w-4 h-4 ml-0.5" />}
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-md" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <ForwardSolid className="w-4 h-4" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-md" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <StopSolid className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setGLoop(v => !v)} className="h-8 w-8 flex items-center justify-center rounded-md"
                      style={{ color: gLoop ? 'var(--color-primary)' : 'rgba(255,255,255,0.35)' }}>
                      <ArrowPathIcon className="w-4 h-4" strokeWidth={S} />
                    </button>
                  </div>
                  <span className="font-mono text-sm tabular-nums" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    0:00 <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span> 3:25
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <SpeakerWaveIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'rgba(255,255,255,0.35)' }} />
                    <input type="range" min={0} max={100} defaultValue={80} className="w-20 h-1 rounded-full cursor-pointer" style={{ accentColor: '#0011FF' }} />
                    <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    <button className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <ArrowUturnLeftIcon className="w-3.5 h-3.5" strokeWidth={S} /> Reset
                    </button>
                    <button className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <ArrowUpTrayIcon className="w-3.5 h-3.5" strokeWidth={S} /> Add
                    </button>
                  </div>
                </div>
                {/* Waveform */}
                <div className="flex mx-1 mb-1 rounded-lg overflow-hidden h-12" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <div className="relative flex-1">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1040 56">
                      <path d={WAVE_TOP} fill="none" stroke="rgba(115,171,191,0.3)" strokeWidth="1.5" />
                      <path d={WAVE_BOT} fill="none" stroke="rgba(115,171,191,0.14)" strokeWidth="1" />
                    </svg>
                    <div className="absolute top-0 bottom-0 left-3 w-px" style={{ background: 'rgba(255,255,255,0.18)' }} />
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2"
                      style={{ background: 'var(--color-primary)', borderColor: '#000' }} />
                  </div>
                  <div className="flex flex-col justify-center items-end gap-0.5 px-3 flex-shrink-0"
                    style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', minWidth: '72px' }}>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>LUFS</span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--color-primary)' }}>C 0.0</span>
                    </div>
                    <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>L 0.0</span>
                    <div className="flex gap-2 mt-0.5">
                      <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>CMP</span>
                      <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>LIM</span>
                    </div>
                  </div>
                </div>
              </div>
            </Preview>

            {/* 4 · Master Mixing Bus */}
            <Preview title="Master Mixing Bus — 12 preset cards, one selected at a time" code={`// selectedPreset state controls the active card
<button onClick={() => setSelectedPreset(name)}
  style={{
    borderColor: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
    background:  active ? 'var(--color-accent)'  : 'var(--gradient-card)',
  }}
>`}>
              <div className="w-full">
                <div className="flex items-center gap-2 mb-3">
                  <AdjustmentsHorizontalIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
                  <span className="text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--color-primary)', letterSpacing: '0.08em' }}>Master Mixing Bus</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Clean', Icon: SparklesIcon },{ name: 'Warmth', Icon: SunIcon },
                    { name: 'Punch', Icon: BoltIcon },{ name: 'Bright', Icon: StarIcon },
                    { name: 'Wide', Icon: ArrowsPointingOutIcon },{ name: 'Loud', Icon: SpeakerWaveIcon },
                    { name: 'Vintage', Icon: ClockIcon },{ name: 'Cinematic', Icon: FilmIcon },
                  ].map(({ name, Icon }) => {
                    const active = gPreset === name
                    return (
                      <button key={name} onClick={() => setGPreset(name)}
                        className="flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all"
                        style={{ borderColor: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)', background: active ? 'var(--color-accent)' : 'var(--gradient-card)' }}>
                        <Icon className="w-4 h-4" strokeWidth={S} style={{ color: active ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }} />
                        <p className="text-xs font-medium">{name}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Preview>

            {/* 5 · Bus Sends */}
            <Preview title="Bus Sends — labeled send sliders with percentage readout" code={`{busSends.map((bus, idx) => (
  <div key={bus.label} className="flex flex-col gap-2 min-w-[120px] flex-1">
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium tracking-wider">{bus.label}</span>
      <span className="text-xs font-mono" style={{ color: 'var(--color-primary)' }}>{bus.value}%</span>
    </div>
    <input type="range" value={bus.value} onChange={...}
      className="w-full h-1 rounded-full" style={{ accentColor: '#0011FF' }} />
    <button className="text-xs flex items-center gap-1">
      FX <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
    </button>
  </div>
))}`}>
              <div className="w-full">
                <div className="flex items-center gap-2 mb-4">
                  <SpeakerWaveIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
                  <span className="text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--color-primary)', letterSpacing: '0.08em' }}>Bus Sends</span>
                </div>
                <div className="flex gap-4">
                  {['MASTER','DRUMS','VOCALS'].map((label, i) => (
                    <div key={label} className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>{label}</span>
                        <span className="text-xs font-mono" style={{ color: 'var(--color-primary)' }}>{gBus[i]}%</span>
                      </div>
                      <input type="range" min={0} max={100} value={gBus[i]}
                        onChange={e => setGBus(prev => prev.map((v, j) => j === i ? +e.target.value : v))}
                        className="w-full h-1 rounded-full cursor-pointer" style={{ accentColor: '#0011FF' }} />
                      <button className="flex items-center gap-1 text-xs self-start" style={{ color: 'var(--color-muted-foreground)' }}>
                        FX <ChevronDownIcon className="w-3 h-3" strokeWidth={S} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Preview>

            {/* 6 · Stem Track Row */}
            <Preview title="Stem Track Row — volume, pan, M/S, waveform, hover actions" code={`<div className="border-b group" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
  {/* Controls */}
  <div className="flex items-center gap-2 px-3 py-2">
    {/* drag handle, number, type dot, name, volume slider, M/S, options */}
  </div>
  {/* Waveform SVG */}
  <div className="relative mx-5 mb-2.5 rounded-lg overflow-hidden" style={{ height: '58px' }}>
    <svg viewBox="0 0 1040 56" preserveAspectRatio="none">
      <path d={wave.top} stroke={accentColor} strokeWidth="1.5" />
    </svg>
  </div>
</div>`}>
              <div className="w-full border-b group" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="cursor-grab opacity-25" style={{ color: 'var(--color-muted-foreground)' }}>
                    <EllipsisHorizontalIcon className="w-3.5 h-3.5" strokeWidth={S} />
                  </span>
                  <span className="font-mono text-xs w-4 text-center" style={{ color: 'var(--color-muted-foreground)' }}>1</span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B5CF6', opacity: gMuted ? 0.3 : 0.8 }} />
                  <span className="text-sm font-medium flex items-center gap-1.5" style={{ opacity: gMuted ? 0.4 : 1 }}>
                    Lead Vocals
                    <span className="text-[10px] text-violet-400" style={{ opacity: 0.75 }}>VOCAL</span>
                    <ChevronDownIcon className="w-3 h-3" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                  </span>
                  <div className="flex-1" />
                  <div className="flex items-center gap-1.5">
                    <SpeakerWaveIcon className="w-3.5 h-3.5" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)', opacity: gMuted ? 0.3 : 1 }} />
                    <input type="range" min={0} max={100} value={gVolume} onChange={e => setGVolume(+e.target.value)}
                      className="w-24 h-1 rounded-full cursor-pointer" style={{ accentColor: '#0011FF', opacity: gMuted ? 0.3 : 1 }} />
                    <span className="font-mono text-xs w-5 text-right" style={{ color: 'var(--color-muted-foreground)' }}>{gVolume}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setGMuted(v => !v)} className="w-6 h-6 rounded text-xs font-bold transition-all"
                      style={{ background: gMuted ? 'rgba(251,191,36,0.18)' : 'var(--color-input)', color: gMuted ? '#fbbf24' : 'var(--color-muted-foreground)', border: `1px solid ${gMuted ? '#fbbf24' : 'rgba(255,255,255,0.1)'}` }}>M</button>
                    <button onClick={() => setGSoloed(v => !v)} className="w-6 h-6 rounded text-xs font-bold transition-all"
                      style={{ background: gSoloed ? 'rgba(139,92,246,0.2)' : 'var(--color-input)', color: gSoloed ? '#8B5CF6' : 'var(--color-muted-foreground)', border: `1px solid ${gSoloed ? '#8B5CF6' : 'rgba(255,255,255,0.1)'}` }}>S</button>
                  </div>
                  <button className="h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: 'var(--color-muted-foreground)' }}>
                    <EllipsisHorizontalIcon className="w-4 h-4" strokeWidth={S} />
                  </button>
                  <button className="h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: 'var(--color-muted-foreground)' }}>
                    <TrashIcon className="w-3.5 h-3.5" strokeWidth={S} />
                  </button>
                </div>
                <div className="relative mx-5 mb-2.5 rounded-lg overflow-hidden" style={{ height: '52px', background: '#1d1c2296', border: '1px solid rgba(255,255,255,0.06)', opacity: gMuted ? 0.2 : 1 }}>
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1040 56">
                    <path d={WAVE_TOP} fill="none" stroke="rgba(139,92,246,0.55)" strokeWidth="1.5" />
                    <path d={WAVE_BOT} fill="none" stroke="rgba(139,92,246,0.55)" strokeWidth="1" opacity={0.65} />
                  </svg>
                </div>
              </div>
            </Preview>

            {/* 7 · Arrange View */}
            <Preview title="Arrange View — toolbar, ruler, track list, colored waveform regions" code={`// mode === 'arrange' renders:
// 1. Toolbar: Move/Cut/Select, Snap, zoom controls, BPM info
// 2. Split layout: left track list (148px) + right scrollable timeline
// 3. Each track region: colored label bar + waveform SVG`}>
              <div className="w-full rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {/* Toolbar */}
                <div className="flex items-center gap-1 px-3 border-b" style={{ height: '40px', borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)' }}>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: '#0011FF', color: '#fff' }}>
                    <PlusIcon className="w-3.5 h-3.5" strokeWidth={S} /> Move
                  </button>
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                    <CursorArrowRaysIcon className="w-3.5 h-3.5" strokeWidth={S} /> Select
                  </button>
                  <div className="w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium" style={{ color: '#5577ff', background: 'rgba(0,17,255,0.12)' }}>
                    <LinkIcon className="w-3.5 h-3.5" strokeWidth={S} /> Snap
                  </button>
                  <div className="w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <MagnifyingGlassMinusIcon className="w-3.5 h-3.5" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--color-muted-foreground)' }}>60px/s</span>
                  <MagnifyingGlassPlusIcon className="w-3.5 h-3.5" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                  <div className="flex-1" />
                  <span className="text-xs font-mono" style={{ color: 'var(--color-muted-foreground)' }}>120 BPM · 8 regions</span>
                  <Squares2X2Icon className="w-3.5 h-3.5 ml-2" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                </div>
                {/* Split layout */}
                <div className="flex" style={{ height: '220px' }}>
                  {/* Left */}
                  <div className="flex-shrink-0" style={{ width: '130px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex flex-col justify-center px-3" style={{ height: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>Tracks</p>
                    </div>
                    {[
                      { name: 'Lead Vocals', color: '#8B5CF6' },
                      { name: 'Drums',       color: '#EC4899' },
                      { name: 'Bass',        color: '#22D3EE' },
                      { name: 'Guitar',      color: '#FBBF24' },
                    ].map(({ name, color }) => (
                      <div key={name} className="flex items-center gap-2 px-3" style={{ height: '49px', borderBottom: '1px solid rgba(255,255,255,0.04)', color }}>
                        <span className="text-xs font-medium truncate">{name}</span>
                      </div>
                    ))}
                  </div>
                  {/* Timeline */}
                  <div className="flex-1 overflow-hidden relative">
                    {/* Ruler */}
                    <div className="flex" style={{ height: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#07070e' }}>
                      {[1,2,3,4,5,6].map(n => (
                        <div key={n} className="flex-1 flex items-center px-1.5" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                          <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.28)' }}>{n}</span>
                        </div>
                      ))}
                    </div>
                    {/* Playhead */}
                    <div className="absolute top-0 bottom-0 w-px" style={{ left: '1px', background: '#0011FF', zIndex: 10 }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0011FF', marginLeft: '-4.5px', marginTop: '8px' }} />
                    </div>
                    {/* Track regions */}
                    {[
                      { color: '#8B5CF6', name: 'Lead Vocals' },
                      { color: '#EC4899', name: 'Drums'       },
                      { color: '#22D3EE', name: 'Bass'        },
                      { color: '#FBBF24', name: 'Guitar'      },
                    ].map(({ color, name }) => (
                      <div key={name} className="relative" style={{ height: '49px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <div className="absolute rounded-md overflow-hidden" style={{ top: '4px', bottom: '4px', left: '2px', right: '2px', background: `${color}18`, border: `1px solid ${color}28` }}>
                          <div className="flex items-center px-2" style={{ height: '16px', borderBottom: `1px solid ${color}20` }}>
                            <span className="text-[10px] font-medium" style={{ color }}>{name}</span>
                          </div>
                          <div style={{ position: 'absolute', top: '16px', left: 0, right: 0, bottom: 0 }}>
                            <svg style={{ display: 'block', width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 1040 30">
                              <path d={WAVE_TOP} fill="none" stroke={color} strokeWidth="1.5" opacity="0.55" />
                              <path d={WAVE_BOT} fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Preview>

            {/* 8 · Mastering Bar */}
            <Preview title="Mastering Bar — fixed bottom strip with enable toggle" code={`<div className="flex items-center justify-between px-5 py-3 border-t"
  style={{
    borderColor: enabled ? 'rgba(115,171,191,0.3)' : 'rgba(255,255,255,0.08)',
    background:  enabled ? 'rgba(115,171,191,0.06)' : 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(12px)',
  }}
>
  <div className="flex items-center gap-3">
    <MusicalNoteIcon ... />
    <div>
      <p>Mastering</p>
      <p>Professional mastering for Pop</p>
    </div>
  </div>
  <button onClick={() => setEnabled(v => !v)}>
    {enabled ? 'Enabled' : 'Enable'}
  </button>
</div>`}>
              <div className="w-full rounded-xl border overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3"
                  style={{ borderColor: gMastering ? 'rgba(115,171,191,0.3)' : 'rgba(255,255,255,0.08)', background: gMastering ? 'rgba(115,171,191,0.06)' : 'rgba(0,0,0,0.6)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: gMastering ? 'var(--color-accent)' : 'var(--color-input)' }}>
                      <MusicalNoteIcon className="w-4 h-4" strokeWidth={S} style={{ color: gMastering ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mastering</p>
                      <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Professional mastering for Pop</p>
                    </div>
                  </div>
                  <button onClick={() => setGMastering(v => !v)} className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                    style={gMastering ? { background: 'var(--color-primary)', color: '#000' } : { border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-muted-foreground)' }}>
                    {gMastering ? 'Enabled' : 'Enable'}
                  </button>
                </div>
              </div>
            </Preview>

            {/* 9 · Mix Console Modal */}
            <Preview title="Mix Console Modal — Signature mixes, Genre Presets, Intensity, Focus, RUN MIX" code={`// Opened via: onClick={() => setMixConsoleOpen(true)}
// Pattern: fixed overlay + centered panel (max-w-3xl)
// Signature Tailored Mixes: selectable cards with electric blue highlight
// Genre Presets: each sets mixIntensity + mixFocus on click`}>
              <div className="w-full rounded-2xl border overflow-hidden" style={{ background: '#0c0b10', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>Mix Console</span>
                  </div>
                </div>
                <div className="px-5 py-4 space-y-4">
                  {/* Signature mixes */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Signature Tailored Mixes</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { Icon: MapPinIcon, name: 'STREET HEAT MIX' },
                        { Icon: TrophyIcon, name: 'SPARKS MIX' },
                        { Icon: GlobeAltIcon, name: 'SMILES MIX' },
                      ].map(({ Icon, name }, i) => (
                        <div key={name} className="flex items-center gap-2 p-3 rounded-xl border cursor-pointer"
                          style={{ background: i === 0 ? 'rgba(0,17,255,0.18)' : 'rgba(255,255,255,0.03)', borderColor: i === 0 ? 'rgba(0,17,255,0.7)' : 'rgba(255,255,255,0.06)' }}>
                          <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#0011FF' }}>
                            <Icon className="w-3 h-3" strokeWidth={S} style={{ color: '#fff' }} />
                          </div>
                          <p className="text-[10px] font-semibold leading-tight" style={{ color: '#fff' }}>{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Controls */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Intensity</p>
                      <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--color-accent)' }}>
                        {(['subtle','balanced','aggressive'] as const).map(v => (
                          <button key={v} onClick={() => setGIntensity(v)} className="flex-1 py-1 rounded-md text-xs capitalize transition-all"
                            style={gIntensity === v ? { background: '#000', color: '#fff' } : { color: 'var(--color-muted-foreground)' }}>
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Focus</p>
                      <div className="flex flex-wrap gap-1">
                        {['Balanced','Vocals up front','Drum-driven'].map(chip => {
                          const active = gFocus.has(chip)
                          return (
                            <button key={chip} onClick={() => setGFocus(prev => { const n = new Set(prev); active ? n.delete(chip) : n.add(chip); return n })}
                              className="px-2 py-0.5 rounded-full text-[10px] border"
                              style={active ? { background: 'rgba(115,171,191,0.15)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' } : { borderColor: 'rgba(255,255,255,0.12)', color: 'var(--color-muted-foreground)' }}>
                              {chip}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 px-5 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <button className="px-4 py-2 rounded-full text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Cancel</button>
                  <button className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
                    style={{ background: '#0011FF', color: '#fff', boxShadow: '0 0 20px rgba(0,17,255,0.4)' }}>
                    <BoltIcon className="w-4 h-4" strokeWidth={S} /> RUN MIX
                  </button>
                </div>
              </div>
            </Preview>

            {/* 10 · Keyboard Shortcuts Modal */}
            <Preview title="Keyboard Shortcuts Modal — triggered by grid icon in Arrange toolbar" code={`// Opened via: onClick={() => setShowShortcuts(true)}
// Pattern: fixed overlay + centered panel (max-w-2xl)
// 2-column grid: Tools / View on left, Edit / Playback on right
// Keyboard badges: dark rounded pills with white text`}>
              <div className="w-full rounded-2xl border overflow-hidden" style={{ background: '#0e0d14', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-start justify-between px-6 pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,17,255,0.25)', border: '1px solid rgba(0,17,255,0.4)' }}>
                      <Squares2X2Icon className="w-5 h-5" strokeWidth={S} style={{ color: '#5577ff' }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: '#fff' }}>Keyboard Shortcuts</h3>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Arrangement view controls</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 px-6 pb-5">
                  <div className="space-y-4">
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#5577ff' }}>Tools</p>
                    {[['Move — drag regions','V'],['Cut — click to split','C'],['Select — click regions','S']].map(([label,key]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>{label}</span>
                        <kbd className="flex items-center justify-center min-w-[32px] h-8 px-2 rounded-xl text-xs font-semibold"
                          style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>{key}</kbd>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#22c55e' }}>Playback</p>
                    {[['Play / Pause','Space'],['Seek ±5 s','← →'],['Seek on ruler','Click']].map(([label,key]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>{label}</span>
                        <kbd className="flex items-center justify-center min-w-[32px] h-8 px-2 rounded-xl text-xs font-semibold"
                          style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>{key}</kbd>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Click outside or press <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-xs mx-1"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>Esc</kbd> to close
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Press <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-xs mx-1"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>?</kbd> to reopen
                  </p>
                </div>
              </div>
            </Preview>

            {/* 11 · Share Modal */}
            <Preview title="Share Modal — Share Session, Invite Collaborator, Share Export" code={`// Opened via: onClick={() => setShowShareModal(true)}
// Share Session has a Private/Public toggle (sessionPrivate state)
// Generate Invite Link and Export & Copy Link are action buttons`}>
              <div className="w-full max-w-md rounded-2xl border overflow-hidden" style={{ background: '#0e0d14', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-start justify-between px-5 pt-5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <ShareIcon className="w-5 h-5" strokeWidth={S} style={{ color: '#6677ff' }} />
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: '#fff' }}>Share Project</h3>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Share your session for collaboration or share the exported mix.</p>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 space-y-3">
                  {/* Share Session */}
                  <div className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#fff' }}>Share Session</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Let others listen to your full mix</p>
                    </div>
                    <button onClick={() => setGPrivate(v => !v)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-medium"
                      style={gPrivate ? { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.06)' } : { borderColor: 'rgba(0,17,255,0.6)', color: '#6677ff', background: 'rgba(0,17,255,0.12)' }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round">
                        <rect x="2" y="7" width="20" height="10" rx="5"/>
                        <circle cx={gPrivate ? '7' : '17'} cy="12" r="3" fill="currentColor" stroke="none"/>
                      </svg>
                      {gPrivate ? 'Private' : 'Public'}
                    </button>
                  </div>
                  {/* Invite Collaborator */}
                  <div className="p-4 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <UserPlusIcon className="w-4 h-4" strokeWidth={S} style={{ color: 'rgba(255,255,255,0.7)' }} />
                      <p className="text-sm font-semibold" style={{ color: '#fff' }}>Invite Collaborator</p>
                    </div>
                    <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>Generate a link — anyone who opens it can edit this project live</p>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium"
                      style={{ borderColor: 'rgba(255,255,255,0.12)', color: '#fff', background: 'rgba(255,255,255,0.04)' }}>
                      <LinkIcon className="w-4 h-4" strokeWidth={S} /> Generate Invite Link
                    </button>
                  </div>
                  {/* Share Export */}
                  <div className="p-4 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#fff' }}>Share Export</p>
                    <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>Render and upload the mix, then copy the download link</p>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium"
                      style={{ borderColor: 'rgba(255,255,255,0.12)', color: '#fff', background: 'rgba(255,255,255,0.04)' }}>
                      <LinkIcon className="w-4 h-4" strokeWidth={S} /> Export &amp; Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </Preview>

            {/* 12 · Preview Float Card */}
            <Preview title="Preview Float Card — fixed bottom-right mini player" code={`// Toggled via: onClick={() => setShowPreviewCard(v => !v)}
// Position: fixed bottom-6 right-6 z-50
// Gradient border via boxShadow layering
// Dismiss: trash button sets showPreviewCard(false)`}>
              <div className="relative w-full flex justify-end" style={{ minHeight: '80px' }}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: 'rgba(14,13,20,0.95)', backdropFilter: 'blur(16px)', boxShadow: '0 0 0 1px rgba(139,92,246,0.5), 0 0 0 1px rgba(236,72,153,0.3), 0 8px 32px rgba(0,0,0,0.6)', minWidth: '240px' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#1a0a4a 0%,#0a1a6e 100%)', border: '1px solid rgba(100,80,220,0.4)' }}>
                    <SparklesIcon className="w-5 h-5" strokeWidth={S} style={{ color: '#6677ff' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: '#fff' }}>Mix Preview</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Rendered through full chain</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg"
                      style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.06)' }}>
                      <PauseIcon className="w-4 h-4" strokeWidth={S} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg"
                      style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.06)' }}>
                      <TrashIcon className="w-4 h-4" strokeWidth={S} />
                    </button>
                  </div>
                </div>
              </div>
            </Preview>

          </Section>

          {/* Footer */}
          <div className="border-t pt-8 pb-16" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              INMIX Redesign · Design System v1.0.0 · Vite 8 · React 19 · TypeScript · Tailwind v4 · Radix UI · CVA · Heroicons 2
            </p>
          </div>

        </main>
      </div>
    </div>
  )
}
