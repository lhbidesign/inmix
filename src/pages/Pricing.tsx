import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    id: 'starter',
    name: 'The Starter',
    sub: '3 tracks / month',
    price: { monthly: 10, annual: 10 },
    highlight: false,
    badge: null,
    featuresLabel: 'What\'s included:',
    features: [
      'Auto-Mix (genre-aware AI)',
      'Pro Console — 5-band EQ, compression, reverb',
      '24-bit / 48 kHz WAV export',
      'Mix + Master in one export',
      'Browser-based, no install',
      '$5 per extra track if you go over',
    ],
  },
  {
    id: 'pro',
    name: 'The Producer',
    sub: '10 tracks / month',
    price: { monthly: 30, annual: 30 },
    highlight: true,
    badge: 'Most Popular Plan',
    featuresLabel: 'Everything in Starter, plus:',
    features: [
      '10 tracks per month',
      'Sidechain delay & advanced dynamics',
      'Priority processing queue',
      'Project history & stem storage',
      '$5 per extra track if you go over',
    ],
  },
  {
    id: 'elite',
    name: 'The Studio Pro',
    sub: '25 tracks / month',
    price: { monthly: 60, annual: 60 },
    highlight: false,
    badge: null,
    featuresLabel: 'Everything in Producer, plus:',
    features: [
      '25 tracks per month',
      'Mastering panel with LUFS meter',
      'Broadcast-ready loudness (-11 LUFS)',
      'Streaming-optimized for Spotify, Apple Music',
      '$5 per extra track if you go over',
    ],
  },
]

const faqs = [
  {
    q: 'What is INMIX?',
    a: 'Think of us as a professional audio mixing and mastering studio, minus the soul-crushing price tags and the cables you constantly trip over. It\'s an entire pro-studio suite packed neatly inside your browser.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. Your hard drive can breathe a sigh of relief. INMIX runs entirely in your browser. No sketchy plugins, no heavy DAWs, and absolutely zero installation progress bars to stare at.',
  },
  {
    q: 'What file formats can I upload?',
    a: 'We accept WAV, MP3, and FLAC stem files. Everything is processed at a pristine 48 kHz with absolutely zero quality loss.',
  },
  {
    q: 'How does the Auto-Mix work?',
    a: 'Close to magic — it\'s algorithms. INMIX analyzes your stems and applies genre-aware processing (frequency balancing, dynamics, stereo imaging, and EQ) in under a minute. It\'s like having a legendary audio engineer living inside your laptop, minus the ego.',
  },
  {
    q: 'Can I adjust the mix manually?',
    a: 'Oh, you have full control. The Pro Console gives you a 5-band parametric EQ, glue compression, convolution reverb, and sidechain delay. Go ahead, get surgical.',
  },
  {
    q: 'What quality are the final exports?',
    a: 'You get 24-bit / 48 kHz WAV files — the gold standard for streaming platforms, sync licensing, or showing off to your audiophile friends. INMIX hands you both the mix and the master in a single, seamless export flow.',
  },
  {
    q: 'Are my audio files kept private?',
    a: 'Your music is your music. Your stems and mixes are stored securely and are locked away from everyone except you. We don\'t train AI on your tracks, we don\'t advertise with them, and we don\'t peek. If you delete your project or account, it\'s gone forever. Promise.',
  },
]

export default function Pricing() {
  const [scrolled, setScrolled] = useState(false)
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(1)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-screen" style={{ color: 'var(--color-foreground)', fontFamily: 'inherit' }}>
      {/* Page-wide background */}
      <img src="/images/pricing.png" alt="" className="fixed inset-0 w-full h-full object-cover object-top pointer-events-none" style={{ zIndex: 0 }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(7,7,11,0.55) 0%, rgba(7,7,11,0.82) 40%, rgba(7,7,11,0.97) 75%)', zIndex: 1 }} />

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
      <section className="relative pt-40 pb-20 px-6 text-center" style={{ zIndex: 2 }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-8"
               style={{ background: '#0011FF', color: '#ffffff' }}>
            The Producers Studio
          </div>

          <h1 className="mb-6 text-[65px] sm:text-[110px]"
              style={{ fontWeight: 300, lineHeight: '95%', color: '#ffffff' }}>
            Plans &amp; Pricing
          </h1>

          <p className="mx-auto" style={{ fontSize: '20px', fontWeight: 400, lineHeight: '140%', color: 'rgba(255,255,255,0.75)', maxWidth: '520px' }}>
            Choose the plan that fits your needs. All plans include essential features to get you started, with options to scale as you grow. No hidden fees and the flexibility to change anytime.
          </p>
        </div>
      </section>

      {/* ── PRICING CARDS ────────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-28 px-6" style={{ zIndex: 2 }}>
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Toggle */}
          <div className="flex flex-col items-center gap-2 mb-12">
            <div className="flex items-center rounded-full p-1"
                 style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}>
              {(['monthly', 'annual'] as const).map(b => (
                <button key={b} onClick={() => setBilling(b)}
                        className="px-6 py-2 rounded-full text-sm font-medium transition-all capitalize"
                        style={{
                          background: billing === b ? '#ffffff' : 'transparent',
                          color: billing === b ? '#000000' : 'rgba(255,255,255,0.6)',
                        }}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {plans.map(plan => (
              <div key={plan.id} className="relative rounded-2xl flex flex-col"
                   style={{
                     background: plan.highlight ? '#0011FF' : 'rgba(255,255,255,0.04)',
                     border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.09)',
                     padding: plan.highlight ? '44px 28px 28px' : '28px',
                   }}>

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap"
                       style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {plan.badge}
                  </div>
                )}

                <p className="text-lg font-medium mb-1" style={{ color: '#ffffff' }}>{plan.name}</p>
                <p className="text-xs mb-6" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)' }}>
                  {plan.sub}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[48px] font-light leading-none" style={{ color: '#ffffff' }}>
                    ${billing === 'monthly' ? plan.price.monthly : plan.price.annual}
                  </span>
                  <span className="text-sm" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)' }}>/month</span>
                </div>

                {/* Features */}
                <p className="text-xs font-semibold mb-4" style={{ color: plan.highlight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)' }}>
                  {plan.featuresLabel}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: plan.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(0,17,255,0.25)' }}>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke={plan.highlight ? '#fff' : '#0011FF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="text-sm" style={{ color: plan.highlight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="w-full py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                        style={{
                          background: plan.highlight ? '#ffffff' : 'transparent',
                          color: plan.highlight ? '#0011FF' : '#ffffff',
                          border: plan.highlight ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
                        }}>
                  Select plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ zIndex: 2, position: 'relative' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase"
                 style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', background: 'transparent' }}>
              What's on your mind?
            </div>
          </div>

          <h2 className="text-center mb-12 text-[40px] sm:text-[72px]"
              style={{ fontWeight: 300, lineHeight: '95%', color: '#ffffff' }}>
            Frequently asked questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all duration-200"
                   style={{
                     background: openFaq === i ? '#0011FF' : 'rgba(255,255,255,0.04)',
                     border: openFaq === i ? 'none' : '1px solid rgba(255,255,255,0.08)',
                   }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="text-sm font-medium" style={{ color: '#ffffff' }}>{faq.q}</span>
                  <span className="flex-shrink-0" style={{ color: '#ffffff' }}>
                    {openFaq === i
                      ? <MinusIcon className="w-4 h-4" />
                      : <PlusIcon className="w-4 h-4" />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-16 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'linear-gradient(to bottom, #000000, #1D1C22)', position: 'relative', zIndex: 2 }}>
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
