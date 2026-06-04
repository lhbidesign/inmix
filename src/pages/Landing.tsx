import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

const vibeTabs = [
  { id: 'original', label: 'ORIGINAL',        sub: 'One subtle, note-perfect mix',              color: 'rgba(255,255,255,0.7)', bg: '/images/player1.png' },
  { id: 'street',   label: 'STREET HEAT MIX', sub: 'Urban grit — 808s pushed, vocals upfront',  color: '#f97316',               bg: '/images/player2.png' },
  { id: 'sparks',   label: 'SPARKS MIX',       sub: 'Billboard Pop — bright, wide, radio sheen', color: '#818cf8',               bg: '/images/player3.png' },
  { id: 'smiles',   label: 'SMILES MIX',       sub: 'SoCal Reggae — sun-soaked, warm bass',      color: '#34d399',               bg: '/images/player4.png' },
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
    image: '/images/smart.png',
    right: true,
  },
  {
    title: 'Pro console',
    desc: '5-band parametric EQ, glue compressor, convolution reverb, brickwall limiter — surgical control.',
    link: 'Learn more',
    image: '/images/proconsole.png',
    right: false,
  },
  {
    title: 'Studio Export',
    desc: '24-bit / 48 kHz WAV. Mix and master delivered at 11 LUFS, ready for streaming or your next session.',
    link: 'Find out',
    image: '/images/studioexport.png',
    right: true,
  },
]

export default function Landing() {
  const [activeVibe, setActiveVibe] = useState('original')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#08080d', color: 'var(--color-foreground)', fontFamily: 'inherit' }}>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(8,8,13,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <img src="/logo.svg" alt="inmix" style={{ height: '22px', width: 'auto' }} />
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Pricing'].map(item => (
            <a key={item} href="#" className="text-sm transition-colors hover:text-white"
               style={{ color: 'rgba(255,255,255,0.7)' }}>{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm px-4 py-1.5 rounded-full transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.7)' }}>Sign in</Link>
          <Link to="/register"
                className="text-sm px-5 py-2 rounded-full font-medium transition-all hover:opacity-90"
                style={{ background: '#ffffff', color: '#000000' }}>
            Join InMix for free
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
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-8"
               style={{ background: '#0011FF', color: '#ffffff' }}>
            The Producer Studio
          </div>

          <h1 className="mb-6 text-[65px] sm:text-[130px]" style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
            Your track mixed in minutes
          </h1>
          <p className="mx-auto mb-14" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0%', color: '#ffffff', maxWidth: '560px' }}>
            Drop your stems in and get back a mix that's balanced, clean, and ready for release.
          </p>

          {/* Upload Zone */}
          <div
            className="relative max-w-lg mx-auto mb-16 rounded-2xl p-10 cursor-pointer transition-all duration-200"
            style={{ border: '1.5px dashed rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.015)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(115,171,191,0.45)'; e.currentTarget.style.background = 'rgba(115,171,191,0.03)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.015)' }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center mb-2">
                <img src="/images/logofavicon.png" alt="inmix" style={{ width: '75px', height: '48px', objectFit: 'contain' }} />
              </div>
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(10,10,15,0.85)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Upload Your Track
              </button>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Accepted formats: WAV, AIFF, MP3, MP4, OGG, and more
              </p>
            </div>
          </div>

          {/* Stat strip */}
          {/* Mobile: 2x2 grid | Desktop: single row */}
          <div className="hidden sm:flex items-center justify-center w-full">
            {[
              { src: '/images/1_Icon — Genre-Aware.svg',   label: 'Music-Ready Mastering'    },
              { src: '/images/2_Icon — Radio-Ready.svg',   label: 'Studio-Grade Processing'  },
              { src: '/images/3_Icon — Intelligent.svg',   label: 'Intelligent Balancing'    },
              { src: '/images/4_Icon — 24-Bit.svg',        label: '24-bit Lossless Exports'  },
            ].map(({ src, label }, i) => (
              <div key={label} className="flex items-end">
                {i > 0 && <div className="w-px mx-6 self-stretch" style={{ background: 'rgba(255,255,255,0.1)' }} />}
                <div className="flex flex-col items-center gap-2 px-2">
                  <div className="flex items-center justify-center" style={{ height: '64px' }}>
                    <img src={src} alt={label} style={{ width: i === 0 ? '86px' : '48px', height: 'auto' }} />
                  </div>
                  <p className="uppercase text-center" style={{ fontSize: '12px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0.3em', color: '#ffffff' }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile 2x2 */}
          <div className="grid grid-cols-2 gap-x-0 gap-y-8 sm:hidden w-full">
            {[
              { src: '/images/1_Icon — Genre-Aware.svg',   label: 'Music-Ready Mastering'    },
              { src: '/images/2_Icon — Radio-Ready.svg',   label: 'Studio-Grade Processing'  },
              { src: '/images/3_Icon — Intelligent.svg',   label: 'Intelligent Balancing'    },
              { src: '/images/4_Icon — 24-Bit.svg',        label: '24-bit Lossless Exports'  },
            ].map(({ src, label }, i) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center" style={{ height: '64px' }}>
                  <img src={src} alt={label} style={{ width: i === 0 ? '86px' : '48px', height: 'auto' }} />
                </div>
                <p className="uppercase text-center" style={{ fontSize: '12px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0.3em', color: '#ffffff' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAME TRACK ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center px-5 py-2 rounded-full mb-5 text-[11px] font-semibold tracking-widest uppercase"
                 style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}>
              Hear It In Action
            </div>
            <h2 className="text-[40px] sm:text-[80px]" style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
              Your track.<br />inMixed your way.
            </h2>
          </div>

          {/* Waveform demo */}
          <img
            src="/images/hereaction.png"
            alt="Waveform demo"
            className="w-full rounded-2xl mb-3 object-cover aspect-[289/89] sm:aspect-auto"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          />

          {/* Vibe tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {vibeTabs.map(tab => {
              const active = activeVibe === tab.id
              return (
                <button key={tab.id} onClick={() => setActiveVibe(tab.id)}
                  className="flex items-center justify-between px-4 rounded-xl text-left transition-all relative overflow-hidden w-full"
                  style={{
                    backgroundImage: `url(${tab.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    aspectRatio: '289 / 89',
                    border: active ? `1px solid ${tab.color}55` : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="absolute inset-0" style={{ background: active ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.55)' }} />
                  <p className="relative z-10 text-[12px] sm:text-[13px]" style={{ fontWeight: 700, lineHeight: '130%', letterSpacing: '0.2em', color: '#FFFFFF' }}>{tab.label}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── THREE STEPS ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase"
                 style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}>
              The Workflow
            </div>
          </div>
          <h2 className="text-center mb-20 text-[40px] sm:text-[80px]" style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
            Your track<br />ready for release
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
                    <p className="mb-1.5" style={{ fontSize: '48px', fontWeight: 400, lineHeight: 1.1 }}>{step.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — image placeholder + caption */}
            <div className="flex flex-col gap-5">
              <img src="/images/drums.png" alt="App Screenshot" className="w-full rounded-2xl" style={{ aspectRatio: '800 / 312', objectFit: 'cover' }} />
              <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0%', color: '#ffffff' }}>
                Vocals, drums, bass, synths — WAV, MP3, FLAC. Our engine runs them at 48 kHz with zero quality loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRO-GRADE TOOLS ──────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase"
                 style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}>
              The Tools
            </div>
          </div>
          <h2 className="text-center mb-24 text-[40px] sm:text-[80px]" style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
            Pro-Grade tools.<br />Zero learning Curve.
          </h2>

          <div className="space-y-28">
            {features.map(({ title, desc, link, image, right }) => (
              <div key={title} className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Text side */}
                <div className={right ? 'order-1' : 'order-1 lg:order-2'}>
                  <h3 className="mb-5" style={{ fontSize: '55px', fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#FFFFFF' }}>{title}</h3>
                  <p className="mb-6" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0%', color: '#FFFFFF' }}>{desc}</p>
                  <a href="#" className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-white"
                     style={{ color: 'var(--color-primary)' }}>
                    {link} <ChevronRightIcon className="w-3.5 h-3.5" strokeWidth={2} />
                  </a>
                </div>

                {/* Image */}
                <div className={`rounded-2xl overflow-hidden ${right ? 'order-2' : 'order-2 lg:order-1'}`}
                     style={{ background: image ? 'none' : 'rgba(255,255,255,0.04)', border: image ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
                  {image
                    ? <img src={image} alt={title} className="w-full h-auto block" />
                    : <div className="flex items-center justify-center" style={{ minHeight: '280px' }}>
                        <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>Feature Screenshot</p>
                      </div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 px-8 text-center">
            {/* Background image */}
            <img src="/images/studiosession.png" alt=""
                 className="absolute inset-0 w-full h-full object-cover" />
            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-8"
                   style={{ background: '#0011FF', color: '#ffffff' }}>
                The Studio Is In Session
              </div>
              <h2 className="font-light leading-none mb-6" style={{ fontSize: 'clamp(56px, 10vw, 100px)' }}>
                Start mixing<br />your music today
              </h2>
              <p className="text-xl lg:text-2xl mb-12 mx-auto" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '780px' }}>
                Upload your stems. Hit Mix. Walk away with a broadcast-ready mix.<br />No plugins, no DAW, no guesswork.
              </p>
              {/* Upload zone */}
              <div className="max-w-2xl mx-auto rounded-2xl py-10 px-8 flex flex-col items-center gap-4"
                   style={{ border: '1.5px dashed rgba(115,171,191,0.45)' }}>
                <button
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all"
                  style={{ background: 'rgba(10,10,15,0.85)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,30,40,0.95)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,15,0.85)' }}
                >
                  Upload Your Track
                </button>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Accepted file formats: &nbsp;MP3, M4A, WAV, AAC, OGG, AIFF
                </p>
              </div>
            </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/images/check.svg" alt="" style={{ width: '72px', height: 'auto' }} />
          </div>
          <h2 className="text-center mb-3" style={{ fontSize: '60px', fontWeight: 300, lineHeight: '100%', letterSpacing: '0%', color: '#ffffff' }}>Trusted by the industry</h2>
          <p className="text-center mb-16 max-w-2xl mx-auto" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0%', color: '#ffffff' }}>
            From label executives and A&Rs to emerging artists, InMix helps talent bring music to market faster.
          </p>

          {/* Testimonial card */}
          <div className="rounded-2xl overflow-hidden mb-6 grid sm:[grid-template-columns:1fr_2fr]"
               style={{ border: '1px solid rgba(0,17,255,0.5)', background: '#0a0a0f' }}>
            {/* Image — hidden on mobile */}
            <img src="/images/testimonial.png" alt="Andrew Packer"
                 className="hidden sm:block w-full h-full object-cover object-top" style={{ minHeight: '360px' }} />
            {/* Content */}
            <div className="flex flex-col justify-center p-10 gap-5">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5" style={{ color: '#0011FF' }} />
                ))}
              </div>
              <h3 style={{ fontSize: '36px', fontWeight: 300, lineHeight: '100%', color: '#ffffff' }}>
                Hand's down the best.
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '150%', color: 'rgba(255,255,255,0.7)' }}>
                "InMix helps us move faster without sacrificing quality. The mixes came back polished, balanced, and release ready in a fraction of the time."
              </p>
              <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
              <div>
                <p style={{ fontSize: '16px', fontWeight: 400, color: '#ffffff' }}>Andrew Packer, A&R</p>
                <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)' }}>
                  WARNER MUSIC GROUP
                </p>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 mb-16">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-full transition-all"
                   style={{
                     width: '12px', height: '12px',
                     background: i === 0 ? '#0011FF' : 'transparent',
                     border: i === 0 ? 'none' : '1.5px solid rgba(255,255,255,0.45)',
                   }} />
            ))}
          </div>

          {/* Brand logos — marquee */}
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track { animation: marquee 30s linear infinite; }
          `}</style>
          <div className="overflow-hidden py-6"
               style={{ background: 'linear-gradient(90deg, #010101 10%, #004BD7 50%, #010101 90%)', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
            <div className="marquee-track flex items-center" style={{ width: 'max-content', gap: '96px' }}>
              {[...Array(2)].map((_, set) =>
                [
                  { n: 1, w: 264, h: 38 },
                  { n: 5, w: 128, h: 98 },
                  { n: 2, w: 148, h: 58 },
                  { n: 4, w: 120, h: 105 },
                  { n: 3, w: 134, h: 94 },
                ].map(({ n, w, h }) => (
                  <img key={`${set}-${n}`} src={`/images/logo${n}.png`} alt={`logo ${n}`}
                       style={{ width: `${w}px`, height: `${h}px`, objectFit: 'contain', flexShrink: 0 }} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MID CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center relative overflow-hidden"
               style={{ background: 'linear-gradient(180deg, #08080d 0%, #0a1628 45%, #08080d 100%)' }}>
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(60,120,200,0.18) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">
          <img src="/logo.svg" alt="inmix"
               style={{ height: '60px', width: 'auto', filter: 'brightness(10) saturate(0)' }} />
          <p className="text-xl lg:text-2xl font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            giving you the power ...
          </p>
          <Link to="/register"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90"
                style={{ background: '#ffffff', color: '#000000' }}>
            Get INMIX for free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-16 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'linear-gradient(to bottom, #000000, #1D1C22)' }}>
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
              { title: 'Product',  links: ['Features', 'How It Works', 'Pricing'] },
              { title: 'Company',  links: ['About Us', 'Contact Us'] },
              { title: 'Help',     links: ['FAQs', 'License', 'Privacy Policy', 'Terms of Use'] },
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
