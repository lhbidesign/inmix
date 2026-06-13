import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

const vibeTabs = [
  { id: 'original', label: 'ORIGINAL',        sub: 'One subtle, note-perfect mix',              color: '#ffffff', bg: '/images/player1.png' },
  { id: 'street',   label: 'STREET HEAT MIX', sub: 'Urban grit — 808s pushed, vocals upfront',  color: '#f97316',               bg: '/images/player2.png' },
  { id: 'sparks',   label: 'SPARKS MIX',       sub: 'Billboard Pop — bright, wide, radio sheen', color: '#818cf8',               bg: '/images/player3.png' },
  { id: 'smiles',   label: 'SMILES MIX',       sub: 'SoCal Reggae — sun-soaked, warm bass',      color: '#34d399',               bg: '/images/player4.png' },
]

const steps: { num: string; title: string; desc: string; img?: string; video?: string }[] = [
  {
    num: '01',
    title: 'Drop your stems',
    desc: 'Vocals, drums, bass, synths — WAV, MP3, FLAC. Our engine runs them at 48 kHz with zero quality loss.',
    img: '/images/drums.png',
  },
  {
    num: '02',
    title: 'Let the engine cook',
    desc: 'After uploading, let InMix do the heavy lifting. Professional enhancements applied in seconds with a few clicks.',
    video: '/images/waves.mp4',
  },
  {
    num: '03',
    title: 'Export & release',
    desc: 'Your mix, polished and ready to go. Export high-quality files in seconds for streaming or wherever your music lives.',
    img: '/images/export.png',
  },
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
    link: 'Get control',
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
  const [activeStep, setActiveStep] = useState('01')
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      stars: 5,
      quote: 'Hand\'s down the best.',
      body: '"InMix changed the game for me. I can be at the beach with my laptop, turning ideas into radio-ready hits. InMix gives me the power to create from start to finish, on my own terms."',
      name: 'Casey Smiles',
      company: 'Artist, digital marketing creative',
      image: '/images/Casey.jpg',
    },
    {
      stars: 5,
      quote: 'Major sound, finally.',
      body: '"One of the most asked questions I hear from artists is how can I get my music mixed? But what they really mean is, how can I get it mixed with major quality for cheap? The answer is now inMix!"',
      name: 'Clinton Sparks',
      company: 'Grammy nominated, multi-platinum producer, songwriter',
      image: '/images/Clinton.jpg',
    },
    {
      stars: 4,
      quote: 'Create from anywhere.',
      body: '"With InMix, inspiration isn\'t tied to a studio desk. I can transform concepts into polished, radio-ready tracks right from my laptop at the beach. It gives creators the ultimate freedom to produce from start to finish."',
      name: 'Nick Ditri',
      company: 'Producer, music executive',
      image: '/images/nick.png',
    },
  ]

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 7000)
    return () => clearInterval(id)
  }, [testimonials.length])

  return (
    <div className="min-h-screen" style={{ background: '#08080d', color: 'var(--color-foreground)', fontFamily: 'inherit' }}>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-[300px] pb-24 px-6 text-center overflow-hidden bg-[url('/images/m_herobkg.jpg')] md:bg-[url('/images/herobkg.jpg')]"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(8,8,13,0.55) 0%, rgba(8,8,13,0.35) 50%, rgba(8,8,13,0.85) 100%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Pill label */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-normal tracking-[0.3em] uppercase mb-8"
               style={{ background: '#0011FF', color: '#ffffff' }}>
            The Producer's Studio
          </div>

          <h1 className="mb-6 text-[80px]" style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
            Your track<br />mixed in minutes
          </h1>
          <p className="mx-auto mb-14" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0%', color: '#ffffff', maxWidth: '560px' }}>
            Drop your stems in and get back a mix that's balanced, clean, and ready for release.
          </p>

          {/* Upload Zone */}
          <div
            className="relative max-w-lg mx-auto mb-16 rounded-2xl p-10 cursor-pointer transition-all duration-200"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='0' y='0' width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%2373ABBF' stroke-opacity='0.85' stroke-width='2' stroke-dasharray='20 14'/%3e%3c/svg%3e")`, backgroundColor: 'rgba(255,255,255,0.015)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(115,171,191,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.015)' }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center mb-2">
                <img src="/images/logofavicon.png" alt="inmix" style={{ width: '75px', height: '48px', objectFit: 'contain' }} />
              </div>
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(10,10,15,0.85)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Upload Your Track or Stems
              </button>
              <p className="text-xs" style={{ color: '#ffffff' }}>
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
            <div className="inline-flex items-center px-5 py-2 rounded-full mb-5 text-[11px] font-normal tracking-[0.3em] uppercase"
                 style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}>
              Hear It In Action
            </div>
            <h2 className="text-[40px] sm:text-[80px]" style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
              Your track<br />inMixed your way.
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
      <section id="workflow" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center px-5 py-2 rounded-full text-[11px] font-normal tracking-[0.3em] uppercase"
                 style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}>
              How It Works
            </div>
          </div>
          <h2 className="text-center mb-20 text-[40px] sm:text-[80px]" style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
            Your track<br />ready for release
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Steps — interactive */}
            <div className="flex flex-col">
              {steps.map((step, i) => {
                const active = activeStep === step.num
                return (
                  <div key={step.num}>
                  {i > 0 && <div className="w-full h-px my-8" style={{ background: 'var(--color-primary)' }} />}
                  <div className="flex items-start gap-5 cursor-pointer"
                       onClick={() => setActiveStep(step.num)}>
                    <span className="text-xs font-bold tracking-widest flex-shrink-0 mt-0.5"
                          style={{ color: 'var(--color-primary)' }}>
                      {step.num}
                    </span>
                    <p className="mb-1.5 transition-colors duration-200 text-[34px] sm:text-[48px]"
                       style={{ fontWeight: 400, lineHeight: 1.1, color: active ? 'var(--color-primary)' : '#ffffff' }}>
                      {step.title}
                    </p>
                  </div>
                  </div>
                )
              })}
            </div>

            {/* Right — changes with active step */}
            {(() => {
              const step = steps.find(s => s.num === activeStep)!
              return (
                <div className="flex flex-col gap-5">
                  {step.video
                    ? <video src={step.video} autoPlay muted loop playsInline className="w-full object-cover" style={{ aspectRatio: '800 / 312', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)' }} />
                    : <img src={step.img} alt={step.title} className="w-full rounded-2xl" style={{ aspectRatio: '800 / 312', border: '1px solid rgba(255,255,255,0.07)' }} />}
                  <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', color: '#ffffff' }}>
                    {step.desc}
                  </p>
                </div>
              )
            })()}
          </div>
        </div>
      </section>

      {/* ── PRO-GRADE TOOLS ──────────────────────────────────────────────── */}
      <section id="tools" className="relative py-24 px-6 overflow-hidden scroll-mt-24" style={{ backgroundImage: 'url(/images/wave.png)', backgroundSize: '100% auto', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center px-5 py-2 rounded-full text-[11px] font-normal tracking-[0.3em] uppercase"
                 style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}>
              Features
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
                <div className={`overflow-hidden ${right ? 'order-2' : 'order-2 lg:order-1'}`}
                     style={{ background: image ? 'none' : 'rgba(255,255,255,0.04)', border: image ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
                  {image
                    ? <img src={image} alt={title} className="w-full h-auto block" />
                    : <div className="flex items-center justify-center" style={{ minHeight: '280px' }}>
                        <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: '#ffffff' }}>Feature Screenshot</p>
                      </div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-t-[150px] py-32 px-8 text-center">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/m_studiosession.jpg" />
          <img src="/images/studiosession.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
        </picture>
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'linear-gradient(180deg, rgba(7,7,11,0.5) 0%, rgba(7,7,11,0.2) 50%, rgba(7,7,11,0.85) 100%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto mt-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-normal tracking-[0.3em] uppercase mb-8"
               style={{ background: '#0011FF', color: '#ffffff' }}>
            The Studio Is In Session
          </div>

          <h2 className="mb-6 text-[80px]"
              style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
            Start inMixing <br /> your music today
          </h2>
          <p className="mb-12 mx-auto" style={{ fontSize: '20px', fontWeight: 400, lineHeight: '130%', color: '#ffffff', maxWidth: '480px' }}>
            No studio, no engineer, no problem.<br />
            Upload your stems. Hit Mix. Walk away with a release-ready mix.
          </p>

          {/* Upload Zone */}
          <div
            className="relative max-w-md mx-auto rounded-2xl p-10 cursor-pointer transition-all duration-200"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='0' y='0' width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%2373ABBF' stroke-opacity='0.85' stroke-width='2' stroke-dasharray='20 14'/%3e%3c/svg%3e")`, backgroundColor: 'rgba(255,255,255,0.015)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(115,171,191,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.015)' }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center mb-2">
                <img src="/images/logofavicon.png" alt="inmix" style={{ width: '75px', height: '48px', objectFit: 'contain' }} />
              </div>
              <Link to="/register"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
                    style={{ background: 'rgba(10,10,15,0.85)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}>
                Upload Your Track or Stems
              </Link>
              <p className="text-xs" style={{ color: '#ffffff' }}>
                Accepted formats: WAV, AIFF, MP3, MP4, OGG, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/images/check.svg" alt="" style={{ width: '72px', height: 'auto' }} />
          </div>
          <h2 className="text-center mb-3" style={{ fontSize: '60px', fontWeight: 300, lineHeight: '100%', letterSpacing: '0%', color: '#ffffff' }}>Trusted by the best</h2>
          <p className="text-center mb-16 max-w-2xl mx-auto" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0%', color: '#ffffff' }}>
            From label executives and A&Rs to emerging artists, InMix helps talent bring music to market faster.
          </p>

          {/* Testimonial card */}
          <div className="rounded-2xl overflow-hidden mb-6 grid sm:[grid-template-columns:1fr_2fr]"
               style={{ border: '1px solid rgba(0,17,255,0.5)', background: '#0a0a0f', minHeight: '470px' }}>
            <img src={testimonials[activeTestimonial].image} alt={testimonials[activeTestimonial].name}
                 className="hidden sm:block w-full h-full object-cover object-top" style={{ minHeight: '360px' }} />
            <div className="flex flex-col justify-center p-10 gap-5">
              <div className="flex gap-1">
                {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5" style={{ color: '#0011FF' }} />
                ))}
              </div>
              <h3 style={{ fontSize: '36px', fontWeight: 300, lineHeight: '100%', color: '#ffffff' }}>
                {testimonials[activeTestimonial].quote}
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '130%', color: '#ffffff' }}>
                {testimonials[activeTestimonial].body}
              </p>
              <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
              <div>
                <p style={{ fontSize: '16px', fontWeight: 400, color: '#ffffff' }}>{testimonials[activeTestimonial].name}</p>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#ffffff' }}>
                  {testimonials[activeTestimonial].company}
                </p>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 mb-16">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                      className="rounded-full transition-all cursor-pointer"
                      style={{
                        width: '12px', height: '12px',
                        background: i === activeTestimonial ? '#0011FF' : 'transparent',
                        border: i === activeTestimonial ? 'none' : '1.5px solid rgba(255,255,255,0.45)',
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
                  { n: 6, w: 100, h: 95 },
                  { n: 7, w: 130, h: 72 },
                  { n: 8, w: 95, h: 95, ext: 'webp' },
                ].map(({ n, w, h, ext }) => (
                  <img key={`${set}-${n}`} src={`/images/logo${n}.${ext ?? 'png'}`} alt={`logo ${n}`}
                       style={{ width: `${w}px`, height: `${h}px`, objectFit: 'contain', flexShrink: 0 }} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MID CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center relative overflow-hidden"
               style={{ backgroundImage: 'url(/images/wavespricing.png)', backgroundSize: 'contain', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">
          <img src="/logo.svg" alt="inmix"
               style={{ width: '500px', height: 'auto', filter: 'brightness(10) saturate(0)' }} />
          <p className="text-xl lg:text-2xl font-light leading-[1.3]" style={{ color: '#ffffff' }}>
            Giving you the power to release more music.
          </p>
          <Link to="/register"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90"
                style={{ background: '#ffffff', color: '#000000' }}>
            Join InMix for free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <SiteFooter />
    </div>
  )
}
