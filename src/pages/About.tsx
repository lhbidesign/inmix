import { Link } from 'react-router-dom'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: '#07070b', color: 'var(--color-foreground)', fontFamily: 'inherit' }}>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-[300px] pb-24 px-6 text-center overflow-hidden"
        style={{ minHeight: '55vh', display: 'flex', alignItems: 'center' }}
      >
        <video src="/images/aboutvideo.mp4" autoPlay muted loop playsInline
               poster="/images/heroabout.jpg"
               className="absolute inset-0 w-full h-full object-cover object-top" />
        {/* Gradient overlay top → bottom */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'linear-gradient(180deg, rgba(7,7,11,0.45) 0%, rgba(7,7,11,0.2) 50%, rgba(7,7,11,0.90) 100%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto w-full mt-16">
          <h1 className="mb-4 text-[65px] sm:text-[120px]"
              style={{ fontWeight: 300, lineHeight: '95%', letterSpacing: '0%', color: '#ffffff' }}>
            Built for Artists,<br />
            <span style={{ background: '#0011FF', borderRadius: '12px', padding: '4px 16px', display: 'inline-block' }}>
              by Artists.
            </span>
          </h1>

          {/* Pill label */}
          <div className="inline-flex items-center px-5 py-2 rounded-full text-[11px] font-normal tracking-[0.3em] uppercase mb-8"
               style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}>
            InMix was built around one single belief
          </div>

          <p className="mx-auto" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', color: '#ffffff', maxWidth: '490px' }}>
            Artists shouldn't need expensive equipment, studio access, or technical knowledge to bring their ideas to life, or to the world.
          </p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-24 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center rounded-[32px] p-6"
             style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="rounded-2xl overflow-hidden">
            <img src="/images/about1.png" alt="Artists collaborating" className="w-full h-auto block" />
          </div>

          {/* Text */}
          <div>
            <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', color: '#ffffff' }}>
              Too many great songs go unfinished because the process can feel overwhelming, complicated, or financially out of reach.
            </p>
            <p className="mt-6" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', color: '#ffffff' }}>
              InMix exists to help remove those barriers and make professional sound more accessible to creators everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <h2 className="mb-8 text-[40px] sm:text-[72px]"
                style={{ fontWeight: 300, lineHeight: '95%', color: '#ffffff' }}>
              Technology That Supports Creativity
            </h2>
            <p className="mb-5" style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', color: '#ffffff' }}>
              We believe technology should help artists create more freely, not complicate the process.
            </p>
            <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: '130%', color: '#ffffff' }}>
              InMix gives musicians a faster, more approachable way to polish their sound so they can spend less time fighting technical hurdles, paying for expensive mixes or being unhappy with the final product. InMix fixes all of this.
            </p>
          </div>

          <div className="relative">
            <img src="/images/wavesingle.png" alt="" aria-hidden="true"
                 className="absolute pointer-events-none select-none"
                 style={{ top: '50%', right: '-62%', transform: 'translateY(-50%)', width: '185%', zIndex: 0 }} />
            <img src="/images/computer.png" alt="InMix app on laptop" className="relative w-full h-auto block" style={{ zIndex: 1 }} />
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Signal icon */}
          <div className="flex justify-center mb-8">
            <img src="/images/sound.svg" alt="" style={{ width: '72px', height: 'auto' }} />
          </div>

          <h2 className="mb-8 text-[40px] sm:text-[80px]"
              style={{ fontWeight: 300, lineHeight: '95%', color: '#ffffff' }}>
            More Music <br /> Deserves to Be Heard
          </h2>
          <p className="mb-5" style={{ fontSize: '20px', fontWeight: 400, lineHeight: '130%', color: '#ffffff' }}>
            Some of the best songs are sitting unfinished <br />on hard drives.
          </p>
          <p style={{ fontSize: '20px', fontWeight: 400, lineHeight: '130%', color: '#ffffff' }}>
            Our goal is simple: help artists get their music <br />out into the world.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-t-[150px] py-32 px-8 text-center">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/m_start.jpg" />
          <img src="/images/start.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
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

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <SiteFooter />

    </div>
  )
}
