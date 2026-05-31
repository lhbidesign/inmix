import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpTrayIcon, PlayIcon, ChevronRightIcon,
  MusicalNoteIcon, AdjustmentsHorizontalIcon, BoltIcon, ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

const S = 1.5

const vibeTabs = [
  { id: 'original', label: 'ORIGINAL',        sub: 'One subtle, note-perfect mix',              color: 'rgba(255,255,255,0.7)' },
  { id: 'street',   label: 'STREET HEAT MIX', sub: 'Urban grit — 808s pushed, vocals upfront',  color: '#f97316' },
  { id: 'sparks',   label: 'SPARKS MIX',       sub: 'Billboard Pop — bright, wide, radio sheen', color: '#818cf8' },
  { id: 'smiles',   label: 'SMILES MIX',       sub: 'SoCal Reggae — sun-soaked, warm bass',      color: '#34d399' },
]

const steps = [
  { num: '01', title: 'Drop your stems',    desc: 'Drag your individual tracks straight into the engine.' },
  { num: '02', title: 'Let the engine cook', desc: 'AI analysis detects genre, dynamics, and frequency balance.' },
  { num: '03', title: 'Export & release',   desc: 'Download your polished mix, ready for distribution.' },
]

const features = [
  {
    title: 'Smart auto-mix',
    desc: 'One click. Genre-aware analysis applies professional balancing across every track, instantly.',
    link: 'Get started',
    imageColor: 'rgba(255,255,255,0.04)',
    right: true,
  },
  {
    title: 'Pro console',
    desc: '5-band parametric EQ, glue compressor, convolution reverb, brickwall limiter — surgical control.',
    link: 'Learn more',
    imageColor: 'rgba(255,255,255,0.04)',
    right: false,
  },
  {
    title: 'Studio Export',
    desc: '24-bit / 48 kHz WAV. Mix and master delivered at 11 LUFS, ready for streaming or your next session.',
    link: 'Find out',
    imageColor: 'rgba(255,255,255,0.04)',
    right: true,
  },
]

export default function Landing() {
  const [activeVibe, setActiveVibe] = useState('original')

  return (
    <div className="min-h-screen" style={{ background: '#08080d', color: 'var(--color-foreground)', fontFamily: 'inherit' }}>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(8,8,13,0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <img src="/logo.svg" alt="inmix" style={{ height: '22px', width: 'auto' }} />
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'Pricing', 'Examples'].map(item => (
            <a key={item} href="#" className="text-sm transition-colors hover:text-white"
               style={{ color: 'rgba(255,255,255,0.5)' }}>{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm px-4 py-1.5 rounded-full transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.6)' }}>Sign In</Link>
          <Link to="/register"
                className="text-sm px-5 py-2 rounded-full font-medium transition-all hover:opacity-90"
                style={{ background: 'var(--color-primary)', color: '#000' }}>
            Get INMIX for free
          </Link>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-24 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/Hero1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(8,8,13,0.55) 0%, rgba(8,8,13,0.35) 50%, rgba(8,8,13,0.85) 100%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Pill label */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-8"
               style={{ background: 'rgba(115,171,191,0.12)', color: 'var(--color-primary)', border: '1px solid rgba(115,171,191,0.25)' }}>
            The Producer Studio
          </div>

          <h1 className="text-[64px] sm:text-[80px] lg:text-[96px] font-light leading-none tracking-tight mb-6">
            Mix like a Pro
          </h1>
          <p className="text-lg max-w-md mx-auto mb-14" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Drop your stems in and get back a mix that's balanced, clean, and ready to stream.
          </p>

          {/* Upload Zone */}
          <div
            className="relative max-w-lg mx-auto mb-16 rounded-2xl p-10 cursor-pointer transition-all duration-200"
            style={{ border: '1.5px dashed rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.015)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(115,171,191,0.45)'; e.currentTarget.style.background = 'rgba(115,171,191,0.03)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.015)' }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-2"
                   style={{ background: 'rgba(115,171,191,0.1)' }}>
                <ArrowUpTrayIcon className="w-5 h-5" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
              </div>
              <p className="text-sm font-medium">Upload Your Track</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Accepted formats: WAV, AIFF, MP3, MP4, OGG, and more
              </p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Drop your stems here to upload, or click to browse
              </p>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { icon: MusicalNoteIcon,          label: 'Music-Ready Mastering'    },
              { icon: AdjustmentsHorizontalIcon, label: 'Studio-Grade Processing' },
              { icon: BoltIcon,                 label: 'Intelligent Balancing'    },
              { icon: ArrowDownTrayIcon,        label: '24-bit Lossless Exports'  },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl"
                   style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <Icon className="w-4 h-4" strokeWidth={S} style={{ color: 'rgba(255,255,255,0.35)' }} />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-center leading-tight"
                   style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAME TRACK ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: 'var(--color-primary)' }}>
              What it can do
            </p>
            <h2 className="text-5xl lg:text-6xl leading-tight">
              <span className="font-light">Same track.</span><br />
              <span className="font-semibold">different vibes.</span>
            </h2>
          </div>

          {/* Waveform demo */}
          <img
            src="/images/hereaction.png"
            alt="Waveform demo"
            className="w-full rounded-2xl mb-3 object-cover"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          />

          {/* Vibe tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {vibeTabs.map(tab => {
              const active = activeVibe === tab.id
              return (
                <button key={tab.id} onClick={() => setActiveVibe(tab.id)}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl text-left transition-all"
                  style={active
                    ? { background: `${tab.color}14`, border: `1px solid ${tab.color}55`, color: tab.color }
                    : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }
                  }
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                       style={{ background: active ? `${tab.color}22` : 'rgba(255,255,255,0.06)' }}>
                    <PlayIcon className="w-2.5 h-2.5 ml-0.5" strokeWidth={2}
                               style={{ color: active ? tab.color : 'rgba(255,255,255,0.25)' }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest leading-none mb-1">{tab.label}</p>
                    <p className="text-[10px] leading-snug" style={{ color: active ? `${tab.color}bb` : 'rgba(255,255,255,0.3)' }}>{tab.sub}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── THREE STEPS ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-5 text-center" style={{ color: 'var(--color-primary)' }}>
            The Workflow
          </p>
          <h2 className="text-4xl lg:text-5xl font-light text-center mb-20 leading-tight">
            Three steps between you<br />and a radio-ready mix
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <div className="space-y-10">
              {steps.map(step => (
                <div key={step.num} className="flex items-start gap-5">
                  <span className="text-xs font-bold tracking-widest flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }}>
                    {step.num}
                  </span>
                  <div>
                    <p className="font-semibold text-base mb-1.5">{step.title}</p>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.48)' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — image placeholder + caption */}
            <div className="flex flex-col gap-5">
              <div className="w-full rounded-2xl flex items-center justify-center"
                   style={{ height: '260px', background: 'linear-gradient(135deg, #0f3d1a 0%, #1a4d28 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
                  App Screenshot
                </p>
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Vocals, drums, bass, synths — WAV, MP3, FLAC. Our engine runs them at 48 kHz with zero quality loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRO-GRADE TOOLS ──────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-5 text-center" style={{ color: 'var(--color-primary)' }}>
            The Tools
          </p>
          <h2 className="text-4xl lg:text-5xl font-light text-center mb-24 leading-tight">
            Pro-Grade tools.<br />Zero learning Curve.
          </h2>

          <div className="space-y-28">
            {features.map(({ title, desc, link, imageColor, right }) => (
              <div key={title} className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Text side */}
                <div className={right ? 'order-1' : 'order-1 lg:order-2'}>
                  <h3 className="text-2xl lg:text-3xl font-semibold mb-5">{title}</h3>
                  <p className="text-base mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>{desc}</p>
                  <a href="#" className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-white"
                     style={{ color: 'var(--color-primary)' }}>
                    {link} <ChevronRightIcon className="w-3.5 h-3.5" strokeWidth={2} />
                  </a>
                </div>

                {/* Image placeholder */}
                <div className={`rounded-2xl flex items-center justify-center ${right ? 'order-2' : 'order-2 lg:order-1'}`}
                     style={{ height: '280px', background: imageColor, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>
                    Feature Screenshot
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-3">Trusted by the industry</h2>
          <p className="text-center text-base mb-16 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.48)' }}>
            From solo SoundCloud artists to songwriting machines, INMIX helps talent bring music to market faster
          </p>

          {/* Testimonial card */}
          <div className="max-w-2xl mx-auto rounded-2xl p-7 mb-6"
               style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex gap-5 items-start">
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-xl flex-shrink-0"
                   style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              <div className="min-w-0">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-3.5 h-3.5 text-amber-400" />
                  ))}
                </div>
                <p className="text-base font-semibold mb-2">"Hands down the best."</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.52)' }}>
                  The mix was indistinguishable from something produced at professional level. The way it handled my bass tracks and kept the low-end balanced was just incredible. My listeners noticed it immediately.
                </p>
                <div>
                  <p className="text-sm font-medium">Andres Portaz</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>AR · Independent Artist</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-1.5 mb-16">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-full transition-all"
                   style={{ width: i === 0 ? '20px' : '6px', height: '6px', background: i === 0 ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>

          {/* Brand logos */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[140, 100, 120, 110, 130].map((w, i) => (
              <div key={i} className="rounded-xl flex items-center justify-center"
                   style={{ width: `${w}px`, height: '44px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="rounded" style={{ width: '60%', height: '12px', background: 'rgba(255,255,255,0.12)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID CTA ──────────────────────────────────────────────────────── */}
      <section className="py-36 px-6 text-center relative overflow-hidden"
               style={{ background: 'linear-gradient(180deg, #08080d 0%, #0a1628 45%, #08080d 100%)' }}>
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(60,120,200,0.18) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-xl mx-auto">
          <img src="/logo.svg" alt="inmix" className="mx-auto mb-8"
               style={{ height: '60px', width: 'auto', filter: 'brightness(10) saturate(0)' }} />
          <p className="text-xl lg:text-2xl font-light mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            puts the power back where the magic actually begins: with <strong className="text-white font-semibold">YOU.</strong>
          </p>
          <Link to="/register"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90"
                style={{ background: 'var(--color-primary)', color: '#000' }}>
            Get INMIX for free
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl py-24 px-8 text-center"
               style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-8"
                 style={{ background: 'rgba(115,171,191,0.12)', color: 'var(--color-primary)', border: '1px solid rgba(115,171,191,0.25)' }}>
              The Free &amp; Remixed
            </div>
            <h2 className="text-5xl lg:text-6xl font-light leading-tight mb-6">
              Start mixing<br />your music today
            </h2>
            <p className="text-base mb-10 max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.48)' }}>
              Upload your stems, hit Mix, then download radio-ready music. No plugins. No DAW. No guesswork.
            </p>
            <button
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            >
              <ArrowUpTrayIcon className="w-4 h-4" strokeWidth={S} />
              Upload Your Track
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-16 px-6 mt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <img src="/logo.svg" alt="inmix" style={{ height: '22px', width: 'auto' }} className="mb-4" />
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                AI-powered online mixing and mastering that gives your music a polished, professional sound in minutes.
              </p>
            </div>

            {/* Link columns */}
            {[
              { title: 'Product',  links: ['How it Works', 'Pricing', 'Downloads', 'Changelog'] },
              { title: 'Company',  links: ['About Us', 'Careers', 'Contact Us', 'Blog'] },
              { title: 'Help',     links: ['FAQs', 'Licenses', 'Privacy Policy'] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-5"
                   style={{ color: 'rgba(255,255,255,0.35)' }}>{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm transition-colors hover:text-white"
                         style={{ color: 'rgba(255,255,255,0.52)' }}>{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t pt-8"
               style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>© INMIX. All rights reserved.</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
