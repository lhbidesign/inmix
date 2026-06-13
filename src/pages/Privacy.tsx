import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

// ── Privacy Policy content (from INMIX AI LLC legal disclosures) ──────────────
const intro = [
  'Welcome to inmix.ai (the "Website," "Platform," or "Service"), operated by INMIX LLC ("we," "us," or "our"). We are committed to protecting your privacy and ensuring transparency regarding how we handle your personal and audio data.',
  'This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you utilize our automated, artificial intelligence, and template-based audio mixing services.',
]

type Block =
  | { type: 'p'; text: string }
  | { type: 'group'; text: string }
  | { type: 'item'; label: string; text: string }

const sections: { title: string; blocks: Block[] }[] = [
  {
    title: '1.1 Information We Collect',
    blocks: [
      { type: 'p', text: 'To provide our automated AI mixing services, we collect two primary categories of information:' },
      { type: 'group', text: 'A. Account and Contact Data' },
      { type: 'item', label: 'Registration Information', text: 'Your name, email address, username, password, and professional/creative profile details.' },
      { type: 'item', label: 'Billing Information', text: 'If you subscribe to our enterprise or premium tiers, payment processing data (e.g., credit card tokens, billing address) is collected securely by our third-party payment processors (such as Stripe). We do not store raw financial details on our servers.' },
      { type: 'group', text: 'B. Audio Data and Digital Assets (The Core Service Data)' },
      { type: 'item', label: 'Audio Stems and Project Files', text: 'We collect the raw audio tracks, stems, WAV/MP3 files, MIDI data, and DAW session templates that you upload to the Platform for processing.' },
      { type: 'item', label: 'Acoustic Profile Metadata', text: 'Our AI system processes the technical characteristics of your audio files (e.g., frequency spectrum, dynamic range, transient details, amplitude, and phase relationships).' },
    ],
  },
  {
    title: '1.2 How We Use Your Data',
    blocks: [
      { type: 'p', text: 'We use your data strictly to execute, maintain, and optimize your audio workflows. Specifically:' },
      { type: 'item', label: 'To Deliver the AI Mixing Service', text: 'We utilize your uploaded audio stems to execute automated mixing algorithms, apply template-based parameters, and generate your finalized audio record.' },
      { type: 'item', label: 'Transient AI Processing', text: 'Uploaded audio data is processed dynamically. Our automated models analyze acoustic data solely to generate your specific mix outputs.' },
      { type: 'item', label: 'Platform Maintenance', text: 'To manage your account, verify your subscription level, and provide technical troubleshooting or customer support.' },
      { type: 'item', label: 'System Optimization (Aggregated Data)', text: 'We may use anonymized, aggregated, or non-identifiable technical metadata (not your actual creative audio files) to improve the processing speed and accuracy of our mixing engines.' },
      { type: 'item', label: 'Our Commitment to Your Creative Content', text: 'We do not claim ownership of your uploaded audio files, nor do we sell, rent, or distribute your musical data, stems, or finalized mixes to any third parties without your explicit consent.' },
    ],
  },
  {
    title: '1.3 Data Retention and Storage',
    blocks: [
      { type: 'item', label: 'User Assets', text: 'Your uploaded stems and generated mixes are retained on our secure cloud storage infrastructure (e.g., Supabase/AWS) only for as long as necessary to fulfill the mixing request or to maintain your active account dashboard.' },
      { type: 'item', label: 'Temporary Stems', text: 'You may delete your project folders, stems, or mixes from your dashboard at any time. Once deleted, they are permanently purged from our active databases within standard operational cycles.' },
    ],
  },
  {
    title: '1.4 Data Sharing and Third-Party Disclosures',
    blocks: [
      { type: 'p', text: 'We only share data with trusted third parties necessary to run the Platform:' },
      { type: 'item', label: 'Cloud Infrastructure Providers', text: 'Secure database, hosting, and storage platforms (such as Vercel and Supabase).' },
      { type: 'item', label: 'Payment Gateways', text: 'Third-party billing providers to securely manage your automated SaaS subscriptions.' },
      { type: 'item', label: 'Legal Compliance', text: 'If required by law, subpoena, or to protect the safety and intellectual property rights of INMIX LLC, our users, or the public.' },
    ],
  },
  {
    title: '1.5 Your Rights and Controls',
    blocks: [
      { type: 'item', label: 'Access, Correction & Deletion', text: 'Depending on your jurisdiction, you have the right to access, correct, or update your personal account information, as well as request the permanent deletion of your account and all associated project audio files. To exercise these rights, please contact us at support@inmix.ai.' },
    ],
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen" style={{ background: '#07070b', color: 'var(--color-foreground)', fontFamily: 'inherit' }}>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <SiteNav />

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <section className="relative pt-[200px] pb-12 px-6 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-normal tracking-[0.3em] uppercase mb-8"
               style={{ background: '#0011FF', color: '#ffffff' }}>
            Legal
          </div>
          <h1 className="mb-6 text-[48px] sm:text-[80px]"
              style={{ fontWeight: 300, lineHeight: '95%', color: '#ffffff' }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: '#ffffff' }}>
            INMIX AI LLC &nbsp;·&nbsp; Effective Date: June 8, 2026
          </p>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────────────────── */}
      <section className="px-6 pb-28">
        <div className="max-w-3xl mx-auto rounded-[32px] p-8 sm:p-12"
             style={{ border: '1px solid rgba(255,255,255,0.12)' }}>

          {intro.map((p, i) => (
            <p key={i} className="mb-5" style={{ fontSize: '17px', lineHeight: 1.6, color: '#ffffff' }}>{p}</p>
          ))}

          {sections.map(section => (
            <div key={section.title} className="mt-12">
              <h2 className="mb-5 text-[24px]" style={{ fontWeight: 500, color: '#ffffff' }}>
                {section.title}
              </h2>

              {section.blocks.map((block, i) => {
                if (block.type === 'p') {
                  return (
                    <p key={i} className="mb-4" style={{ fontSize: '17px', lineHeight: 1.6, color: '#ffffff' }}>
                      {block.text}
                    </p>
                  )
                }
                if (block.type === 'group') {
                  return (
                    <p key={i} className="mb-3 mt-6 text-sm font-semibold uppercase tracking-[0.15em]"
                       style={{ color: 'var(--color-primary)' }}>
                      {block.text}
                    </p>
                  )
                }
                return (
                  <div key={i} className="flex gap-3 mb-4">
                    <span className="mt-2.5 shrink-0" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                    <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#ffffff' }}>
                      <span style={{ fontWeight: 600 }}>{block.label}:</span> {block.text}
                    </p>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <SiteFooter />
    </div>
  )
}
