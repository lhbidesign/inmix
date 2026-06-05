import { useEffect, useRef, useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface Step {
  title: string
  body: string
  target: string
}

const STEPS: Step[] = [
  { title: 'Upload Your Stems',            body: 'Drag & drop or click Add to upload your audio stems — vocals, drums, bass, keys, anything. Supports WAV, MP3, FLAC and more.',                                                                                         target: 'upload'      },
  { title: 'Pick Your Genre',              body: "The AI tunes every mixing decision to your genre's conventions — hip-hop mixes very differently from jazz or pop. Always set this first.",                                                                              target: 'genre'       },
  { title: 'Run the AI Mix',               body: 'One click. The engine analyzes every stem and sets EQ, compression, panning, reverb, and dynamics — like a Grammy engineer in 8 seconds.',                                                                             target: 'ai-mix'      },
  { title: 'Transport Controls',           body: 'Play, pause, stop and scrub your mix. Hit Space anywhere to play/pause. The loop button repeats your selection endlessly.',                                                                                             target: 'play'        },
  { title: 'Loop Mode',                    body: 'Toggle loop to repeat your mix continuously — great for A/B testing EQ changes or dialling in compression while listening in context.',                                                                                 target: 'loop'        },
  { title: 'BPM & Tempo',                  body: 'Set the project BPM manually, tap the TAP button in rhythm, or hit AUTO to detect tempo from your audio. Delay times sync to the BPM automatically.',                                                                 target: 'bpm'         },
  { title: 'Master Volume',                body: 'Set overall output level — keep it around 80%. The LUFS meter targets -14 LUFS for streaming platforms. The GR meter shows how hard the bus compressor is working.',                                                   target: 'volume'      },
  { title: 'LUFS & Gain Reduction Meters', body: 'The LUFS meter shows integrated loudness — aim for -14 LUFS for Spotify/Apple Music, -16 for podcasts. The GR meter shows bus compressor activity in real time.',                                                     target: 'lufs'        },
  { title: 'Before / After Compare',       body: 'After running an AI Mix, toggle between BEFORE (dry original) and AFTER (AI mix) to hear exactly what changed. The switch is instant — no dropouts.',                                                                  target: 'compare'     },
  { title: 'Master Bus Presets',           body: 'One-click mix bus shaping. Warm adds low-end body, Punch tightens transients, Wide expands stereo image, Loud maximises for clubs. Each preset also sets bus routing FX automatically.',                               target: 'bus-presets' },
  { title: 'Bus Sends & Routing',          body: 'Control the level of each sub-group bus — DRUMS, VOCALS, INSTR, FX. Click the FX button on any bus to add insert effects: compression, reverb, delay, and distortion per bus.',                                       target: 'bus-sends'   },
  { title: 'Track Strip',                  body: 'Each stem has a volume fader, pan knob, colour-coded waveform, and a live level meter. Drag the volume slider to balance your mix by ear.',                                                                             target: 'track-strip' },
  { title: 'Mute & Solo',                  body: 'M mutes that stem completely. S solos it — all other stems are silenced so you can focus on a single element. Solo is exclusive: only one track solos at a time.',                                                     target: 'mute-solo'   },
  { title: 'Full Effects Chain',           body: 'Click the ↓ chevron on any track to open the full FX chain: 5-band EQ, compressor with 4 types, reverb, delay, pitch correction, harmonic exciter, stereo width and more.',                                           target: 'track-strip' },
  { title: 'Route to Bus',                 body: "Inside each track's FX panel, the Route to Bus buttons let you send that stem to DRUMS, VOCALS, INSTR, or FX sub-group — giving you full mixing console-style routing.",                                               target: 'track-strip' },
  { title: 'Mastering Chain',              body: 'Enable the mastering chain for professional loudness processing — 5-band EQ, multi-band compression, harmonic saturation, stereo imaging, and a true-peak brick-wall limiter.',                                         target: 'mastering'   },
  { title: 'Arrangement View',             body: 'Switch to Arrange view to see stems on a timeline. Drag to reorder regions, zoom in for precision edits, set in/out points, and build your full song structure.',                                                      target: 'arrange'     },
  { title: 'Export Your Mix',              body: 'Export as WAV 24-bit, WAV 16-bit, or MP3 320kbps. Enable the mastering chain before export for a release-ready master with loudness normalisation and true-peak limiting.',                                             target: 'export'      },
  { title: 'Mix History & Snapshots',      body: 'Every AI mix is saved as a snapshot. Click the history icon in the toolbar to compare previous versions and restore any earlier mix state — nothing is ever lost.',                                                     target: 'history'     },
  { title: "You're Ready to Mix!",         body: "Upload your stems, pick a genre, and hit AI Mix. From there tweak any parameter in real time — every control is live and affects the audio instantly. Let's make something great.",                                    target: 'ai-mix'      },
]

const CARD_W = 360
const CARD_H = 260
const GAP    = 14

type CardStyle = { top?: number; bottom?: number; left?: number; right?: number }

function calcCardStyle(el: Element): CardStyle {
  const r   = el.getBoundingClientRect()
  const vw  = window.innerWidth
  const vh  = window.innerHeight
  const cx  = r.left + r.width  / 2
  const cy  = r.top  + r.height / 2

  const clampX = (x: number) => Math.max(16, Math.min(x, vw - CARD_W - 16))
  const clampY = (y: number) => Math.max(16, Math.min(y, vh - CARD_H - 16))

  // Below
  if (r.bottom + CARD_H + GAP < vh)
    return { top: r.bottom + GAP, left: clampX(cx - CARD_W / 2) }
  // Above
  if (r.top - CARD_H - GAP > 0)
    return { top: clampY(r.top - CARD_H - GAP), left: clampX(cx - CARD_W / 2) }
  // Right
  if (r.right + CARD_W + GAP < vw)
    return { top: clampY(cy - CARD_H / 2), left: r.right + GAP }
  // Left
  return { top: clampY(cy - CARD_H / 2), left: clampX(r.left - CARD_W - GAP) }
}

interface Props {
  step: number
  onNext: () => void
  onBack: () => void
  onSkip: () => void
  onClose: () => void
}

export function WizardTour({ step, onNext, onBack, onSkip, onClose }: Props) {
  const total   = STEPS.length
  const current = STEPS[step]
  const isLast  = step === total - 1
  const progress = ((step + 1) / total) * 100

  const prevTargetRef = useRef<string | null>(null)
  const [cardStyle, setCardStyle] = useState<CardStyle>({ bottom: 32, left: 32 })

  useEffect(() => {
    // Remove glow from previous
    if (prevTargetRef.current) {
      const prev = document.querySelector(`[data-wizard="${prevTargetRef.current}"]`)
      prev?.classList.remove('wz-hl')
    }

    // Add glow to current + calculate card position
    const el = document.querySelector(`[data-wizard="${current.target}"]`)
    if (el) {
      el.classList.add('wz-hl')
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

      // Wait for scroll to settle then measure
      setTimeout(() => {
        const fresh = document.querySelector(`[data-wizard="${current.target}"]`)
        if (fresh) setCardStyle(calcCardStyle(fresh))
      }, 120)
    } else {
      // Fallback: center
      setCardStyle({ top: window.innerHeight / 2 - CARD_H / 2, left: window.innerWidth / 2 - CARD_W / 2 })
    }

    prevTargetRef.current = current.target

    return () => {
      const el = document.querySelector(`[data-wizard="${current.target}"]`)
      el?.classList.remove('wz-hl')
    }
  }, [step, current.target])

  return (
    <>
      <style>{`
        /* Spotlight: everything dims, highlighted element glows */
        .wz-hl {
          position: relative !important;
          z-index: 55 !important;
          border-radius: 10px !important;
          outline: 2px solid rgba(0,17,255,0.9) !important;
          outline-offset: 4px !important;
          /* Giant box-shadow acts as the dark overlay around the element */
          box-shadow:
            0 0 0 9999px rgba(0, 0, 0, 0.72),
            0 0 0 6px rgba(0, 17, 255, 0.25),
            0 0 32px rgba(0, 17, 255, 0.6) !important;
        }
      `}</style>

      {/* Wizard card — positioned near the highlighted element */}
      <div
        className="fixed z-[60] w-[360px] rounded-2xl overflow-hidden select-none"
        style={{
          ...cardStyle,
          border: '1px solid rgba(0,17,255,0.5)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
          pointerEvents: 'auto',
        }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4"
             style={{ background: 'linear-gradient(135deg, #0d1535 0%, #091c2e 100%)' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 0L9.18 5.07L14.49 5.07L10.15 8.19L11.83 13.26L7.5 10.14L3.17 13.26L4.85 8.19L0.51 5.07L5.82 5.07Z" fill="#0011FF"/>
              </svg>
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: '#4466ff' }}>
                Step {step + 1} of {total}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <h3 className="font-bold text-base leading-snug" style={{ color: '#ffffff' }}>
            {current.title}
          </h3>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(0,17,255,0.35)' }} />

        {/* Body */}
        <div className="px-5 py-4" style={{ background: '#07080f' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
            {current.body}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 py-3" style={{ background: '#07080f' }}>
          {/* Skip all */}
          <button
            onClick={onSkip}
            className="text-[11px] font-medium flex-shrink-0 transition-colors hover:text-white underline underline-offset-2"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Skip tour
          </button>

          {/* Progress bar */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <div className="relative flex-1 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, background: '#0011FF' }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white transition-all duration-300"
                style={{ left: `calc(${progress}% - 5px)`, background: '#0011FF' }}
              />
            </div>
            <span className="text-[10px] tabular-nums flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {step + 1}/{total}
            </span>
          </div>

          {/* Back */}
          {step > 0 && (
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide flex-shrink-0 transition-colors hover:bg-white/10"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              Back
            </button>
          )}

          {/* Next / Got It */}
          <button
            onClick={isLast ? onClose : onNext}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide flex-shrink-0 transition-opacity hover:opacity-85"
            style={{ background: '#0011FF', color: '#ffffff' }}
          >
            {isLast ? 'Got It' : 'Next'}
            {!isLast && <ArrowRightIcon className="w-3 h-3" strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </>
  )
}
