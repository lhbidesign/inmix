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
  PlayIcon as PlaySolid,
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
]

// ─────────────────────────────────────────────────────────────────────────────

export default function DesignSystem() {
  const [tabActive, setTabActive] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showGenre, setShowGenre]       = useState(false)
  const [genre, setGenre]               = useState('Pop')
  const [exportFmt, setExportFmt]       = useState('WAV')

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
