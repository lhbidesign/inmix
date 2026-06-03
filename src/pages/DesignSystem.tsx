/**
 * INMIX Design System — Entrega al cliente
 * Ruta: /design-system
 *
 * Documenta: tokens de diseño, componentes, tipografía, colores y espaciado.
 * Stack: Vite · React 19 · TypeScript · Tailwind v4 · Radix UI · CVA · Heroicons
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'
const S = 1

// ── Copy to clipboard helper ──────────────────────────────────────────────────
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
      title="Copiar"
    >
      {done ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" strokeWidth={S} /> : <ClipboardIcon className="w-3.5 h-3.5" strokeWidth={S} />}
    </button>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
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

function Token({ label, value, swatch }: { label: string; value: string; swatch?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="flex items-center gap-3">
        {swatch && (
          <div className="w-8 h-8 rounded-lg border flex-shrink-0"
            style={{ background: swatch, borderColor: 'rgba(255,255,255,0.12)' }} />
        )}
        <span className="text-sm font-mono" style={{ color: 'var(--color-foreground)' }}>{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>{value}</span>
        <CopyBtn value={value} label={label} />
      </div>
    </div>
  )
}

// ── Component preview card ────────────────────────────────────────────────────
function Preview({ title, code, children }: { title: string; code: string; children: React.ReactNode }) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  return (
    <div className="rounded-xl border overflow-hidden mb-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{title}</span>
        <div className="flex gap-1 p-0.5 rounded-md" style={{ background: 'var(--color-accent)' }}>
          {(['preview', 'code'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-2.5 py-1 rounded text-xs capitalize transition-all"
              style={tab === t
                ? { background: '#000', color: '#fff' }
                : { color: 'var(--color-muted-foreground)' }
              }>
              {t}
            </button>
          ))}
        </div>
      </div>
      {/* Body */}
      {tab === 'preview' ? (
        <div className="p-6 flex flex-wrap items-center gap-4" style={{ background: '#0a0a0f' }}>
          {children}
        </div>
      ) : (
        <div className="relative">
          <pre className="p-4 text-xs overflow-x-auto leading-relaxed"
            style={{ background: '#08080e', color: '#a8b4d8', fontFamily: 'var(--font-mono)' }}>
            {code}
          </pre>
          <CopyBtn value={code} label={title + '-code'} />
        </div>
      )}
    </div>
  )
}

// ── NAV links ─────────────────────────────────────────────────────────────────
const navLinks = [
  { id: 'colores',      label: 'Colores'      },
  { id: 'tipografia',   label: 'Tipografía'   },
  { id: 'espaciado',    label: 'Espaciado'    },
  { id: 'botones',      label: 'Botones'      },
  { id: 'inputs',       label: 'Inputs'       },
  { id: 'badges',       label: 'Badges'       },
  { id: 'cards',        label: 'Cards'        },
  { id: 'tabs',         label: 'Tabs'         },
  { id: 'modales',      label: 'Modales'      },
  { id: 'componentes',  label: 'Componentes'  },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function DesignSystem() {
  const [tabActive, setTabActive] = useState(0)

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(12px)' }}>
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
        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Radix UI · CVA · Tailwind v4 · Heroicons
        </span>
      </header>

      <div className="flex">

        {/* Sidebar nav */}
        <nav className="hidden lg:flex flex-col gap-0.5 w-52 flex-shrink-0 sticky top-14 h-[calc(100vh-56px)] pt-8 px-4 overflow-y-auto"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          {navLinks.map(({ id, label }) => (
            <a key={id} href={`#${id}`}
              className="px-3 py-2 rounded-lg text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 px-8 py-10 max-w-4xl">

          {/* Page title */}
          <div className="mb-12">
            <h1 className="text-[36px] font-light mb-2">Design System</h1>
            <p style={{ color: 'var(--color-muted-foreground)' }}>
              Guía de componentes, tokens y patrones del proyecto INMIX Redesign.
            </p>
          </div>

          {/* ── COLORES ─────────────────────────────────────────────────── */}
          <Section title="Colores" id="colores">
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Tokens definidos en <code className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--color-primary)' }}>
                src/index.css
              </code> bajo <code className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--color-primary)' }}>
                @theme
              </code>.
              Los colores custom no-estándar se pasan como <code className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                inline style
              </code>.
            </p>

            <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Brand</h3>
            <Token label="Electric Blue (brand)"   value="#0011FF"  swatch="#0011FF" />
            <Token label="--color-primary (teal)"  value="#73ABBF"  swatch="#73ABBF" />
            <Token label="--color-input"           value="#1D1C22"  swatch="#1D1C22" />

            <h3 className="text-xs uppercase tracking-widest mb-3 mt-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Arrange tracks</h3>
            <Token label="Lead Vocals"    value="#8B5CF6"  swatch="#8B5CF6" />
            <Token label="Backing Vocals" value="#22C55E"  swatch="#22C55E" />
            <Token label="Drums"          value="#EC4899"  swatch="#EC4899" />
            <Token label="Bass"           value="#22D3EE"  swatch="#22D3EE" />
            <Token label="Guitar"         value="#FBBF24"  swatch="#FBBF24" />
            <Token label="Keyboard"       value="#A78BFA"  swatch="#A78BFA" />
            <Token label="Percussion"     value="#F472B6"  swatch="#F472B6" />
            <Token label="Synth"          value="#34D399"  swatch="#34D399" />

            <h3 className="text-xs uppercase tracking-widest mb-3 mt-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Gradientes</h3>
            <Token label="--gradient-bg"      value="linear-gradient(160deg, #000000 0%, #1D1C22 100%)" />
            <Token label="--gradient-sidebar" value="linear-gradient(180deg, #0D1258 0%, #050722 100%)" />
            <Token label="--gradient-card"    value="linear-gradient(145deg, #0a0a0a 0%, #1a191f 100%)" />
            <Token label="Transport bar"      value="linear-gradient(180deg, #0D1258 0%, #050722 100%)" />

            <h3 className="text-xs uppercase tracking-widest mb-3 mt-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Semánticos (CSS vars)</h3>
            <Token label="--color-background"       value="oklch(9% 0.005 285)" />
            <Token label="--color-foreground"       value="oklch(98% 0.005 285)" />
            <Token label="--color-muted-foreground" value="oklch(55% 0.01 285)" />
            <Token label="--color-accent"           value="oklch(25% 0.02 275)" />
            <Token label="--color-border"           value="rgba(255,255,255,0.08)" />
          </Section>

          {/* ── TIPOGRAFÍA ──────────────────────────────────────────────── */}
          <Section title="Tipografía" id="tipografia">
            <div className="rounded-xl border p-5 mb-6" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Font family</span>
                <CopyBtn value='"neue-haas-grotesk-display", "Neue Haas Grotesk Display Pro"' label="font-family" />
              </div>
              <p className="text-sm font-mono" style={{ color: '#fff' }}>neue-haas-grotesk-display</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Adobe Fonts · Kit ID: <code>dcc5mne</code> · Activar en fonts.adobe.com y pegar el &lt;link&gt; en index.html
              </p>
            </div>

            <div className="space-y-4">
              {[
                { size: '10px',  weight: 300, label: 'text-[10px]',  sample: 'Pequeño — etiquetas, tags, captions' },
                { size: '12px',  weight: 400, label: 'text-xs',      sample: 'Extra small — metadata, mono timestamps' },
                { size: '14px',  weight: 400, label: 'text-sm',      sample: 'Small — body, botones, items de menú' },
                { size: '16px',  weight: 400, label: 'text-base',    sample: 'Base — texto principal, modales' },
                { size: '28px',  weight: 300, label: 'text-[28px]',  sample: 'Medium heading — títulos de sección' },
                { size: '36px',  weight: 300, label: 'text-[36px]',  sample: 'Large heading — títulos de página' },
              ].map(({ size, weight, label, sample }) => (
                <div key={size} className="flex items-baseline gap-6 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="w-24 flex-shrink-0">
                    <p className="text-[10px] font-mono" style={{ color: 'var(--color-muted-foreground)' }}>{label}</p>
                    <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>w{weight} / {size}</p>
                  </div>
                  <p style={{ fontSize: size, fontWeight: weight, lineHeight: 1.2 }}>{sample}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border p-5" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-xs mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Pesos disponibles</p>
              <div className="flex gap-6">
                {[{ w: 300, n: '45 Light' }, { w: 400, n: '55 Roman' }, { w: 500, n: '65 Medium' }].map(({ w, n }) => (
                  <div key={w}>
                    <p style={{ fontWeight: w, fontSize: '18px' }}>Aa</p>
                    <p className="text-[10px] font-mono mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{n}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ── ESPACIADO ───────────────────────────────────────────────── */}
          <Section title="Espaciado" id="espaciado">
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Se usa la escala de Tailwind. Los valores más frecuentes en el proyecto:
            </p>
            <div className="space-y-3">
              {[
                { token: 'p-2 / gap-2',     px: '8px',   uso: 'Tight — iconos, badges, inner padding' },
                { token: 'p-3 / gap-3',     px: '12px',  uso: 'Compact — cards pequeñas, filas de stem' },
                { token: 'p-4 / gap-4',     px: '16px',  uso: 'Default — secciones, separadores de header' },
                { token: 'p-5 / gap-5',     px: '20px',  uso: 'Cómodo — padding de páginas, modales' },
                { token: 'p-6 / gap-6',     px: '24px',  uso: 'Spacious — cabeceras de modal, columnas' },
                { token: 'px-5 py-3',       px: '20/12', uso: 'Header row principal' },
                { token: 'px-3 py-2.5',     px: '12/10', uso: 'Sidebar nav items' },
                { token: 'rounded-xl',      px: '12px',  uso: 'Cards, inputs, preset cards' },
                { token: 'rounded-2xl',     px: '16px',  uso: 'Modales, transport bar' },
                { token: 'rounded-full',    px: '9999px',uso: 'Pills, botones CTA, avatares' },
              ].map(({ token, px, uso }) => (
                <div key={token} className="flex items-center gap-4 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <code className="text-xs font-mono w-36 flex-shrink-0"
                    style={{ color: 'var(--color-primary)' }}>{token}</code>
                  <span className="text-xs font-mono w-14 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }}>{px}</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{uso}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── BOTONES ─────────────────────────────────────────────────── */}
          <Section title="Botones" id="botones">
            <Preview
              title="Button — Filled White (CTA principal)"
              code={`<button
  className="rounded-full px-4 py-1.5 text-xs font-medium hover:opacity-80"
  style={{ background: '#ffffff', color: '#000' }}
>
  Save
</button>`}
            >
              <button className="rounded-full px-4 py-1.5 text-xs font-medium hover:opacity-80"
                style={{ background: '#ffffff', color: '#000' }}>
                Save
              </button>
            </Preview>

            <Preview
              title="Button — Electric Blue (AI MIX)"
              code={`<button
  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium"
  style={{
    background: 'rgba(0,17,255,0.1)',
    border: '1px solid rgba(0,17,255,0.4)',
    color: '#6680ff',
  }}
>
  ⚡ AI MIX
</button>`}
            >
              <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(0,17,255,0.1)', border: '1px solid rgba(0,17,255,0.4)', color: '#6680ff' }}>
                ⚡ AI MIX
              </button>
            </Preview>

            <Preview
              title="Button — Outline (Export WAV)"
              code={`<button
  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
  style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}
>
  Export WAV
</button>`}
            >
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}>
                Export WAV
              </button>
            </Preview>

            <Preview
              title="Button — Ghost (Preview, Refresh, Versions, Share)"
              code={`<button
  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors hover:text-white"
  style={{ color: 'var(--color-muted-foreground)' }}
>
  Preview
</button>`}
            >
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors hover:text-white"
                style={{ color: 'var(--color-muted-foreground)' }}>
                Preview
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors hover:text-white"
                style={{ color: 'var(--color-muted-foreground)' }}>
                Refresh
              </button>
            </Preview>

            <Preview
              title="Button — Play (transport)"
              code={`<button
  className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-85"
  style={{ background: '#ffffff', color: '#000' }}
>
  ▶
</button>`}
            >
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold hover:opacity-85"
                style={{ background: '#ffffff', color: '#000' }}>
                ▶
              </button>
            </Preview>

            <Preview
              title="Button — Run Mix (modal CTA)"
              code={`<button
  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold"
  style={{ background: '#0011FF', color: '#fff', boxShadow: '0 0 20px rgba(0,17,255,0.4)' }}
>
  ⚡ RUN MIX
</button>`}
            >
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: '#0011FF', color: '#fff', boxShadow: '0 0 20px rgba(0,17,255,0.4)' }}>
                ⚡ RUN MIX
              </button>
            </Preview>
          </Section>

          {/* ── INPUTS ──────────────────────────────────────────────────── */}
          <Section title="Inputs" id="inputs">
            <Preview
              title="Input — Text"
              code={`<input
  type="text"
  placeholder="Search projects..."
  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
  style={{
    background: 'var(--color-input)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--color-foreground)',
  }}
/>`}
            >
              <input
                type="text"
                placeholder="Search projects..."
                className="px-4 py-2.5 rounded-xl text-sm outline-none w-64"
                style={{ background: 'var(--color-input)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-foreground)' }}
              />
            </Preview>

            <Preview
              title="Input — Range (slider)"
              code={`<input
  type="range"
  min={0} max={100} defaultValue={80}
  className="w-24 h-1 rounded-full cursor-pointer"
  style={{ accentColor: '#0011FF' }}
/>`}
            >
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={100} defaultValue={80}
                  className="w-32 h-1 rounded-full cursor-pointer"
                  style={{ accentColor: '#0011FF' }} />
                <span className="text-xs font-mono" style={{ color: 'var(--color-muted-foreground)' }}>80</span>
              </div>
            </Preview>

            <Preview
              title="M / S buttons (Mute / Solo)"
              code={`<button style={{
  background: muted ? 'rgba(251,191,36,0.18)' : 'var(--color-input)',
  color: muted ? '#fbbf24' : 'var(--color-muted-foreground)',
  border: \`1px solid \${muted ? '#fbbf24' : 'rgba(255,255,255,0.1)'}\`,
}} className="w-6 h-6 rounded text-xs font-bold">M</button>`}
            >
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

          {/* ── BADGES ──────────────────────────────────────────────────── */}
          <Section title="Badges" id="badges">
            <Preview
              title="Status badges"
              code={`// Mixing
<span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
  style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)' }}>
  Mixing
</span>

// Mastering
<span style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.3)' }}>
  Mastering
</span>`}
            >
              {[
                { label: 'Mixing',    bg: 'rgba(59,130,246,0.15)',  color: '#93c5fd',  border: 'rgba(59,130,246,0.3)'  },
                { label: 'Mastering', bg: 'rgba(245,158,11,0.15)', color: '#fcd34d',  border: 'rgba(245,158,11,0.3)' },
                { label: 'Review',   bg: 'rgba(168,85,247,0.15)',  color: '#c084fc',  border: 'rgba(168,85,247,0.3)'  },
                { label: 'Complete', bg: 'rgba(34,197,94,0.15)',   color: '#86efac',  border: 'rgba(34,197,94,0.3)'   },
                { label: 'OFFICIAL', bg: 'rgba(34,197,94,0.15)',   color: '#86efac',  border: 'rgba(34,197,94,0.3)'   },
                { label: 'HIP-HOP',  bg: 'rgba(59,130,246,0.15)',  color: '#93c5fd',  border: 'rgba(59,130,246,0.3)'  },
              ].map(({ label, bg, color, border }) => (
                <span key={label} className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
                  style={{ background: bg, color, border: `1px solid ${border}` }}>
                  {label}
                </span>
              ))}
            </Preview>

            <Preview
              title="Focus chips (Mix Console)"
              code={`<button
  className="px-2.5 py-1 rounded-full text-xs font-medium border"
  style={active
    ? { background: 'rgba(115,171,191,0.15)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }
    : { background: 'transparent', borderColor: 'rgba(255,255,255,0.12)', color: 'var(--color-muted-foreground)' }
  }
>
  Balanced
</button>`}
            >
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
            <Preview
              title="Stat card (Dashboard)"
              code={`<div className="p-5 rounded-xl border"
  style={{ background: 'var(--gradient-card)', borderColor: 'rgba(255,255,255,0.08)' }}
>
  <div className="flex items-start justify-between mb-1">
    <p className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)' }}>
      Active Projects
    </p>
    <div className="w-8 h-8 rounded-full flex items-center justify-center"
      style={{ background: '#0011FF' }}>
      🗂
    </div>
  </div>
  <p className="text-[44px] font-normal tracking-tight leading-none">12</p>
</div>`}
            >
              <div className="p-5 rounded-xl border w-44"
                style={{ background: 'var(--gradient-card)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)' }}>Active Projects</p>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#0011FF' }}>
                    <span className="text-sm">🗂</span>
                  </div>
                </div>
                <p className="text-[44px] font-normal tracking-tight leading-none">12</p>
              </div>
            </Preview>

            <Preview
              title="Preset card (Master Mixing Bus)"
              code={`<button
  className="flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all"
  style={{
    borderColor: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
    background: active ? 'var(--color-accent)' : 'var(--gradient-card)',
  }}
>
  <SparklesIcon className="w-4 h-4" style={{ color: active ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }} />
  <p className="text-xs font-medium">Clean</p>
  <p className="text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>
    Transparent, flat response
  </p>
</button>`}
            >
              {['Clean', 'Warmth', 'Punch'].map((name, i) => (
                <div key={name} className="flex flex-col gap-1.5 p-3 rounded-xl border w-28"
                  style={{
                    borderColor: i === 0 ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
                    background: i === 0 ? 'var(--color-accent)' : 'var(--gradient-card)',
                  }}>
                  <span className="text-sm">✦</span>
                  <p className="text-xs font-medium">{name}</p>
                  <p className="text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>Preset description</p>
                </div>
              ))}
            </Preview>
          </Section>

          {/* ── TABS ────────────────────────────────────────────────────── */}
          <Section title="Tabs" id="tabs">
            <Preview
              title="Tab group (Mix / Arrange)"
              code={`<div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--color-accent)' }}>
  {['Mix', 'Arrange'].map(tab => (
    <button key={tab} onClick={() => setMode(tab)}
      className="px-3 py-1 rounded-md text-xs capitalize"
      style={active === tab
        ? { background: '#000', color: '#fff' }
        : { color: 'var(--color-muted-foreground)' }
      }>
      {tab}
    </button>
  ))}
</div>`}
            >
              <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--color-accent)' }}>
                {['Mix', 'Arrange'].map((tab, i) => (
                  <button key={tab} onClick={() => setTabActive(i)}
                    className="px-3 py-1 rounded-md text-xs capitalize transition-all"
                    style={tabActive === i
                      ? { background: '#000', color: '#fff' }
                      : { color: 'var(--color-muted-foreground)' }
                    }>
                    {tab}
                  </button>
                ))}
              </div>
            </Preview>

            <Preview
              title="Tab group — Presets (Official / Community / My Presets)"
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
</div>`}
            >
              <div className="flex gap-1 p-1 rounded-full" style={{ background: 'var(--color-accent)' }}>
                {['Official', 'Community', 'My Presets'].map((tab, i) => (
                  <button key={tab}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={tabActive === i
                      ? { background: '#000', color: '#fff' }
                      : { color: 'var(--color-muted-foreground)' }
                    }
                    onClick={() => setTabActive(i)}>
                    {tab}
                  </button>
                ))}
              </div>
            </Preview>
          </Section>

          {/* ── MODALES ─────────────────────────────────────────────────── */}
          <Section title="Modales" id="modales">
            <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <p>El proyecto implementa los siguientes modales. Todos usan el patrón:</p>
              <div className="rounded-xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                <ul className="space-y-2 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <li>• Backdrop: <code>rgba(0,0,0,0.72)</code> + <code>backdrop-filter: blur(8px)</code></li>
                  <li>• Container: <code>background: #0e0d14</code> · <code>rounded-2xl</code> · <code>border rgba(255,255,255,0.1)</code></li>
                  <li>• Close: click fuera del modal o botón ×</li>
                </ul>
              </div>
              {[
                { name: 'Mix Console',          trigger: 'Botón AI MIX en el header',              desc: 'Signature Tailored Mixes, Genre Presets, Intensity, Focus, Reference Track → RUN MIX' },
                { name: 'Keyboard Shortcuts',   trigger: 'Ícono grid (⊞) en toolbar de Arrange',   desc: 'Shortcuts por categoría: Tools, Edit, View, Playback' },
                { name: 'Share Project',        trigger: 'Botón Share en el header',                desc: 'Share Session (toggle Private), Invite Collaborator, Share Export' },
                { name: 'Preview Card',         trigger: 'Botón Preview en el header',             desc: 'Floating card bottom-right con mini player (pause/dismiss)' },
              ].map(({ name, trigger, desc }) => (
                <div key={name} className="rounded-xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#fff' }}>{name}</p>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-primary)' }}>Trigger: {trigger}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── COMPONENTES COMPUESTOS ──────────────────────────────────── */}
          <Section title="Componentes" id="componentes">
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Inventario completo de componentes implementados en el proyecto.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { file: 'src/components/AppSidebar.tsx',    name: 'AppSidebar',         desc: 'Sidebar con collapse/expand, mobile overlay, nav items, settings, logout, user info' },
                { file: 'src/components/ui/button.tsx',     name: 'Button',             desc: 'CVA — variantes: default, ghost, outline, icon. Tamaños: sm, md, lg, icon' },
                { file: 'src/components/ui/card.tsx',       name: 'Card / CardContent', desc: 'Wrapper de tarjeta con padding estándar' },
                { file: 'src/components/ui/input.tsx',      name: 'Input',              desc: 'Input de texto base con estilos del sistema' },
                { file: 'src/components/ui/badge.tsx',      name: 'Badge',              desc: 'Badge/chip con variantes de color' },
                { file: 'src/components/ui/tab-group.tsx',  name: 'TabGroup<T>',        desc: 'Tab genérico con tamaños sm/md, íconos opcionales' },
                { file: 'src/components/ui/separator.tsx',  name: 'Separator',          desc: 'Divider horizontal/vertical' },
                { file: 'src/components/ui/label.tsx',      name: 'Label',              desc: 'Radix UI Label con estilos tipográficos' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Transport Bar',      desc: 'Reproductor con play/pause/stop/loop, waveform, scrubber, LUFS meters' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Master Mixing Bus',  desc: 'Grid de 12 presets con estado seleccionado' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Bus Sends',          desc: '5 sliders de send con label y porcentaje' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Stem Track Row',     desc: 'Fila de stem con volumen, pan, M/S, waveform, drag handle' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Arrange View',       desc: 'Toolbar + split layout (track list / timeline con ruler y waveform regions)' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Mastering Bar',      desc: 'Bar inferior fija con toggle Enable/Enabled' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Mix Console Modal',  desc: 'Signature mixes, genre presets con auto-intensity/focus, RUN MIX CTA' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Shortcuts Modal',    desc: 'Keyboard shortcuts en 2 columnas por categoría' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Share Modal',        desc: 'Share Session, Invite Collaborator, Share Export' },
                { file: 'src/pages/ProjectDetail.tsx',      name: 'Preview Float Card', desc: 'Mini player flotante bottom-right con pause y dismiss' },
              ].map(({ file, name, desc }) => (
                <div key={name} className="rounded-xl border p-4"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#fff' }}>{name}</p>
                  <p className="text-[10px] font-mono mb-2" style={{ color: 'var(--color-primary)' }}>{file}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Footer */}
          <div className="border-t pt-8 pb-16" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              INMIX Redesign · Design System v1.0.0 · Stack: Vite 8 + React 19 + TypeScript + Tailwind v4 + Radix UI + CVA + Heroicons 2
            </p>
          </div>

        </main>
      </div>
    </div>
  )
}
