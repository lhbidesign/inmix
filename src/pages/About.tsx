import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#07070b', color: 'var(--color-foreground)', fontFamily: 'inherit' }}>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(7,7,11,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <Link to="/">
          <img src="/logo.svg" alt="inmix" style={{ height: '22px', width: 'auto' }} />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>Features</a>
          <Link to="/about" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>How It Works</Link>
          <Link to="/pricing" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm px-4 py-1.5 rounded-full transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.7)' }}>Sign in</Link>
          <Link to="/register"
                className="text-sm px-5 py-2 rounded-full font-medium transition-all hover:opacity-90"
                style={{ background: '#ffffff', color: '#000000' }}>
            <span className="sm:hidden">Join for Free</span>
            <span className="hidden sm:inline">Join InMix for free</span>
          </Link>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-24 px-6 text-center overflow-hidden"
        style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}
      >
        <img src="/images/heroabout.png" alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        {/* Gradient overlay top → bottom */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'linear-gradient(180deg, rgba(7,7,11,0.45) 0%, rgba(7,7,11,0.2) 50%, rgba(7,7,11,0.90) 100%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <h1 className="mb-8 text-[65px] sm:text-[120px]"
              style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
            Built for Artists,<br />
            <span style={{ background: '#0011FF', borderRadius: '12px', padding: '4px 16px', display: 'inline-block' }}>
              by Artists.
            </span>
          </h1>

          {/* Pill label */}
          <div className="inline-flex items-center px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-8"
               style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}>
            InMix was built around one single belief
          </div>

          <p className="mx-auto" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', color: '#ffffff', maxWidth: '560px' }}>
            Artists shouldn't need expensive equipment, studio access, or technical knowledge to bring their ideas to life, or to the world.
          </p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-24 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-2xl overflow-hidden">
            <img src="/images/about1.png" alt="Artists collaborating" className="w-full h-auto block" />
          </div>

          {/* Text */}
          <div>
            <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: '150%', color: 'rgba(255,255,255,0.85)' }}>
              Too many great songs go unfinished because the process can feel overwhelming, complicated, or financially out of reach.
            </p>
            <p className="mt-6" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '150%', color: 'rgba(255,255,255,0.85)' }}>
              InMix exists to help remove those barriers and make professional sound more accessible to creators everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <h2 className="mb-8 text-[40px] sm:text-[72px]"
                style={{ fontWeight: 300, lineHeight: '95%', color: '#ffffff' }}>
              Technology That Supports Creativity
            </h2>
            <p className="mb-5" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '150%', color: 'rgba(255,255,255,0.85)' }}>
              We believe technology should help artists create more freely, not complicate the process.
            </p>
            <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: '150%', color: 'rgba(255,255,255,0.85)' }}>
              InMix gives musicians a faster, more approachable way to polish their sound so they can spend less time fighting technical hurdles, paying for expensive mixes or being unhappy with the final product. InMix fixes all of this.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <img src="/images/computer.png" alt="InMix app on laptop" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden"
               style={{ background: 'linear-gradient(180deg, #07070b 0%, #0a1628 45%, #07070b 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(60,120,200,0.18) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Signal icon */}
          <div className="flex justify-center mb-8">
            <img src="/images/sound.svg" alt="" style={{ width: '72px', height: 'auto' }} />
          </div>

          <h2 className="mb-8 text-[40px] sm:text-[80px]"
              style={{ fontWeight: 300, lineHeight: '95%', color: '#ffffff' }}>
            Your Music Deserves to Be Heard
          </h2>
          <p className="mb-5" style={{ fontSize: '20px', fontWeight: 400, lineHeight: '150%', color: 'rgba(255,255,255,0.65)' }}>
            Some of the best songs are sitting unfinished on hard drives.
          </p>
          <p style={{ fontSize: '20px', fontWeight: 400, lineHeight: '150%', color: 'rgba(255,255,255,0.65)' }}>
            Our goal is simple: help artists get their music out into the world.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 px-8 text-center">
        <img src="/images/start.png" alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'linear-gradient(180deg, rgba(7,7,11,0.5) 0%, rgba(7,7,11,0.2) 50%, rgba(7,7,11,0.85) 100%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-8"
               style={{ background: '#0011FF', color: '#ffffff' }}>
            The Studio Is In Session
          </div>

          <h2 className="mb-6 text-[48px] sm:text-[90px]"
              style={{ fontWeight: 300, lineHeight: '95%', color: '#ffffff' }}>
            Start inMixing your music today
          </h2>
          <p className="mb-12 mx-auto" style={{ fontSize: '20px', fontWeight: 400, lineHeight: '140%', color: 'rgba(255,255,255,0.75)', maxWidth: '480px' }}>
            No studio, no engineer, no problem.<br />
            Upload your stems. Hit Mix. Walk away with a release-ready mix.
          </p>

          {/* Upload Zone */}
          <div
            className="relative max-w-md mx-auto rounded-2xl p-10 cursor-pointer transition-all duration-200"
            style={{ border: '1.5px dashed rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.015)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(115,171,191,0.45)'; e.currentTarget.style.background = 'rgba(115,171,191,0.03)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.015)' }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center mb-2">
                <img src="/images/logofavicon.png" alt="inmix" style={{ width: '75px', height: '48px', objectFit: 'contain' }} />
              </div>
              <Link to="/register"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
                    style={{ background: 'rgba(10,10,15,0.85)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}>
                Upload Your Track
              </Link>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Accepted formats: WAV, AIFF, MP3, MP4, OGG, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-16 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'linear-gradient(to bottom, #000000, #1D1C22)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="sm:col-span-2 md:col-span-1">
              <img src="/logo.svg" alt="inmix" style={{ height: '22px', width: 'auto' }} className="mb-4" />
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                AI-powered online mixing and mastering that gives your music a polished, professional sound in minutes.
              </p>
            </div>

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
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>© 2026 INMIX, LLC. All rights reserved.</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>Privacy Policy</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
