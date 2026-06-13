import { Link } from 'react-router-dom'

const linkClass = 'text-sm transition-colors hover:text-[#73ABBF]'

const columns: { title: string; links: { label: string; to?: string; href?: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'How It Works', to: '/#workflow' },
      { label: 'Features',     to: '/#tools'    },
      { label: 'Pricing',      to: '/pricing'   },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',   to: '/about' },
      { label: 'Contact Us', href: 'mailto:support@inmix.ai' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQs',           to: '/pricing#faq' },
      { label: 'Privacy Policy', to: '/privacy'     },
      { label: 'Terms of Use',   to: '/terms'       },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="py-16 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'linear-gradient(to bottom, #000000, #1D1C22)', position: 'relative', zIndex: 2 }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand — 1/3 */}
          <div>
            <img src="/logo.svg" alt="inmix" style={{ width: '300px', maxWidth: 'none', height: 'auto' }} className="mb-4" />
            <p className="text-sm leading-[1.3]" style={{ color: '#ffffff' }}>
              AI-powered online mixing and mastering that gives your music a polished, professional sound in minutes.
            </p>
          </div>

          {/* Link columns — 2/3, split into thirds */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {columns.map(col => (
              <div key={col.title}>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-5"
                   style={{ color: '#ffffff' }}>{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map(({ label, to, href }) => (
                    <li key={label}>
                      {to
                        ? <Link to={to} className={linkClass} style={{ color: '#ffffff' }}>{label}</Link>
                        : <a href={href} className={linkClass} style={{ color: '#ffffff' }}>{label}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t pt-8"
             style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <p className="text-xs" style={{ color: '#ffffff' }}>© 2026 INMIX, LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
