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

type RichSegment = { text: string; bold?: boolean; italic?: boolean }
type FaqItem = {
  q: string
  a?: string
  aBold?: string        // bold prefix before normal text (e.g. "No. " + rest)
  aBoldSuffix?: string  // the non-bold part after aBold
  aRich?: RichSegment[] // mixed bold/normal inline text
  bullets?: string[]
  note?: { bold: string; normal: string }
  table?: { headers: string[]; rows: string[][] }
}
type FaqCategory = { category: string; items: FaqItem[] }

const faqCategories: FaqCategory[] = [
  {
    category: 'General',
    items: [
      {
        q: 'What is INMIX?',
        a: "Think of us as a professional audio mixing and mastering studio, minus the soul-crushing price tags and the cables you constantly trip over. It's an entire pro-studio suite packed neatly inside your browser.",
      },
      {
        q: 'What is this going to cost me?',
        a: 'We keep it simple, transparent, and significantly cheaper than renting a studio for an hour. Pick the tier that matches your monthly output:',
        table: {
          headers: ['Monthly Plan', 'Tracks Included', 'The Price'],
          rows: [
            ['The Starter',    '3 tracks / mo',  '$10'],
            ['The Producer',   '10 tracks / mo', '$30'],
            ['The Studio Pro', '25 tracks / mo', '$60'],
          ],
        },
        note: {
          bold: 'In a creative groove?',
          normal: " If you blow past your monthly limit because inspiration struck hard, don't sweat it. You can unlock additional tracks for just $5 per track.",
        },
      },
      {
        q: 'Do I need to install anything? (Please say no.)',
        aBold: 'No.',
        aBoldSuffix: ' Your hard drive can breathe a sigh of relief. INMIX runs entirely in your browser. No sketchy plugins, no heavy DAWs, and absolutely zero installation progress bars to stare at.',
      },
    ],
  },
  {
    category: 'Uploads & File Formats',
    items: [
      {
        q: 'What file formats can I throw at this thing?',
        a: 'We accept WAV, MP3, and FLAC stem files. Everything is processed at a pristine 48 kHz with absolutely zero quality loss. If you upload garbage, we\'ll make it pristine garbage, but the quality stays intact.',
      },
      {
        q: 'What are "stems," anyway?',
        a: 'Stems are the individual ingredients of your musical soup, vocals, drums, bass, synths. Exporting these separate tracks from your DAW and feeding them to INMIX gives our engine the best possible chance to make you sound like a genius.',
      },
      {
        q: 'Is there a limit on file size or stem count?',
        a: '',
        bullets: [
          'The Size: Each stem can be up to 100MB, which is more than enough for full-length WAVs unless your song is a 45-minute avant-garde space opera.',
          'The Count: Go nuts. There is no cap on how many stems you can add to a project.',
          'The Exception: Our live homepage demo has a smaller limit just so your browser doesn\'t melt before you even make an account.',
        ],
      },
    ],
  },
  {
    category: 'Mixing & Mastering',
    items: [
      {
        q: 'How does the Auto-Mix work? Is it magic?',
        aRich: [
          { text: "Close, it's algorithms. INMIX analyzes your stems and applies genre-aware processing (frequency balancing, dynamics, stereo imaging, and EQ) in " },
          { text: 'under a minute', bold: true },
          { text: ". It's like having a legendary audio engineer living inside your laptop, minus the ego." },
        ],
      },
      {
        q: 'Can I actually adjust the mix manually, or am I powerless?',
        aRich: [
          { text: 'Oh, you have full control. The ' },
          { text: 'Pro Console', bold: true },
          { text: ' gives you a 5-band parametric EQ, glue compression, convolution reverb, and sidechain delay. Go ahead, get surgical.' },
        ],
      },
      {
        q: "What's happening in the mastering chain?",
        aRich: [
          { text: 'We pump your track through a dedicated mastering panel designed to hit broadcast-ready loudness (' },
          { text: '-11 LUFS', bold: true },
          { text: '). Armed with multi-band processing and a precise LUFS meter, it ensures your track won\'t sound like a whisper next to a major-label release.' },
        ],
      },
    ],
  },
  {
    category: 'Export',
    items: [
      {
        q: 'What quality are the final exports?',
        aRich: [
          { text: 'You get ' },
          { text: '24-bit / 48 kHz WAV', bold: true },
          { text: ' files. That is the gold standard for streaming platforms, sync licensing, or showing off to your audiophile friends.' },
        ],
      },
      {
        q: 'Can I export both a mix and a master?',
        a: 'Why choose? INMIX hands you both the mix and the master in a single, seamless export flow.',
      },
      {
        q: 'Will the output play nice with Spotify, Apple Music, etc.?',
        aRich: [
          { text: 'Yes. Because we master to ' },
          { text: '-11 LUFS', bold: true },
          { text: ', your tracks will perfectly match the loudness normalization targets of major streaming platforms. No getting squashed by the Spotify algorithm here.' },
        ],
      },
    ],
  },
  {
    category: 'Account & Privacy',
    items: [
      {
        q: 'Do I really need to make an account?',
        a: "If you want to save your work and actually see your dashboard, yes. Don't worry—sign-up is completely free and takes about as long as it does to press 'Play.'",
      },
      {
        q: 'Are my audio files kept private? Or are you selling them to a loop library?',
        aRich: [
          { text: 'Your music is ' },
          { text: 'your', italic: true },
          { text: " music. Your stems and mixes are stored securely and are locked away from everyone except you (and whoever you share the project link with). We don't train AI on your tracks, we don't advertise with them, and we don't peek. If you delete your project or account, it's gone forever. Promise." },
        ],
      },
    ],
  },
]

export default function Pricing() {
  const [scrolled, setScrolled] = useState(false)
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-screen" style={{ color: 'var(--color-foreground)', fontFamily: 'inherit' }}>
      {/* Page-wide background */}
      <img src="/images/pricing.png" alt="" className="absolute top-0 left-0 w-full object-cover object-top pointer-events-none" style={{ zIndex: 0, height: '100vh' }} />
      <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(7,7,11,0.55) 0%, rgba(7,7,11,0.82) 40%, rgba(7,7,11,0.97) 75%)', zIndex: 1, height: '100vh' }} />

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
          {[
            { to: '/',        label: 'Features'    },
            { to: '/about',   label: 'How It Works'},
            { to: '/pricing', label: 'Pricing'     },
          ].map(({ to, label }) => (
            <Link key={label} to={to}
              className="text-sm transition-colors cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login"
                className="text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.7)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Sign in</Link>
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
      <section className="relative pt-10 pb-28 px-6" style={{ zIndex: 2, backgroundImage: 'url(/images/wavespricing.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
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
          <div className="grid md:grid-cols-3 gap-5 items-end">
            {plans.map(plan => (
              <div key={plan.id} className="flex flex-col">

                {/* "Most Popular Plan" label — only for highlighted, sits above card */}
                <div className="h-8 flex items-center justify-center mb-2">
                  {plan.badge && (
                    <p className="text-[11px] font-semibold tracking-widest uppercase"
                       style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {plan.badge}
                    </p>
                  )}
                </div>

                <div className="rounded-2xl flex flex-col"
                     style={{
                       background: plan.highlight ? '#0011FF' : 'rgba(255,255,255,0.04)',
                       border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.09)',
                       padding: '32px 28px',
                     }}>

                  <p className="text-xl font-bold mb-1" style={{ color: '#ffffff' }}>{plan.name}</p>
                  <p className="text-sm mb-8" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)' }}>
                    {plan.sub}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-[56px] font-bold leading-none" style={{ color: '#ffffff' }}>
                      ${billing === 'monthly' ? plan.price.monthly : plan.price.annual}
                    </span>
                    <span className="text-base" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)' }}>/month</span>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                          style={{
                            background: plan.highlight ? '#000000' : '#ffffff',
                            color: plan.highlight ? '#ffffff' : '#000000',
                            border: 'none',
                          }}>
                    Select plan
                  </button>
                </div>
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
            {faqCategories.map((cat, i) => (
              <div key={i} className="overflow-hidden transition-all duration-200"
                   style={{
                     borderRadius: '8px',
                     background: openFaq === i ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                     border: '1px solid rgba(255,255,255,0.08)',
                   }}>
                {/* Category header */}
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="text-base font-medium" style={{ color: '#ffffff' }}>{cat.category}</span>
                  <span className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {openFaq === i ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                  </span>
                </button>

                {/* Q&A items inside category */}
                {openFaq === i && cat.items.length > 0 && (
                  <div className="px-6 pb-6 space-y-6"
                       style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
                    {cat.items.map((item, j) => (
                      <div key={j}>
                        <h3 className="text-sm font-semibold mb-2" style={{ color: '#ffffff' }}>{item.q}</h3>

                        {/* Normal answer */}
                        {item.a && (
                          <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.a}</p>
                        )}

                        {/* Rich inline text (mixed bold/normal) */}
                        {item.aRich && (
                          <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                            {item.aRich.map((seg, k) =>
                              seg.bold
                                ? <strong key={k} style={{ color: '#ffffff' }}>{seg.text}</strong>
                                : seg.italic
                                  ? <em key={k}>{seg.text}</em>
                                  : <span key={k}>{seg.text}</span>
                            )}
                          </p>
                        )}

                        {/* Bold prefix + normal text */}
                        {item.aBold && (
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                            <strong style={{ color: '#ffffff' }}>{item.aBold}</strong>{item.aBoldSuffix}
                          </p>
                        )}

                        {/* Table */}
                        {item.table && (
                          <div className="mb-3 overflow-hidden" style={{ borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)' }}>
                            <table className="w-full text-sm">
                              <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                                  {item.table.headers.map((h, k) => (
                                    <th key={k} className="text-left px-4 py-3 font-semibold" style={{ color: '#ffffff' }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {item.table.rows.map((row, k) => (
                                  <tr key={k} style={{ borderBottom: k < item.table!.rows.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                                    {row.map((cell, l) => (
                                      <td key={l} className="px-4 py-3" style={{ color: l === 0 ? '#ffffff' : 'rgba(255,255,255,0.65)', fontWeight: l === 0 ? 600 : 400 }}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Inline note: bold + normal */}
                        {item.note && (
                          <p className="text-sm leading-relaxed mt-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
                            <strong style={{ color: '#ffffff' }}>{item.note.bold}</strong>{item.note.normal}
                          </p>
                        )}

                        {/* Bullet list */}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="mt-2 space-y-1.5 list-disc list-inside">
                            {item.bullets.map((b, k) => (
                              <li key={k} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
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
