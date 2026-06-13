import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const S = 1

const navLinks = [
  { to: '/#workflow', label: 'How It Works', anchor: 'workflow' },
  { to: '/#tools',    label: 'Features',     anchor: 'tools'    },
  { to: '/about',     label: 'About Us'     },
  { to: '/pricing',   label: 'Pricing'      },
]

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  const handleLink = (anchor?: string) => (e: React.MouseEvent) => {
    if (anchor && pathname === '/') {
      e.preventDefault()
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid ? 'rgba(7,7,11,0.92)' : 'transparent',
        backdropFilter: solid ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${solid ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
      }}
    >
      <div className="relative flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1 cursor-pointer"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open
              ? <XMarkIcon className="w-6 h-6" strokeWidth={S} style={{ color: '#ffffff' }} />
              : <Bars3Icon className="w-6 h-6" strokeWidth={S} style={{ color: '#ffffff' }} />}
          </button>
          <Link to="/" onClick={() => setOpen(false)}>
            <img src="/logo.svg" alt="inmix" style={{ height: '22px', width: 'auto' }} />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map(({ to, label, anchor }) => (
            <Link key={label} to={to}
              className="text-sm transition-colors cursor-pointer"
              style={{ color: '#ffffff' }}
              onClick={handleLink(anchor)}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}>
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login"
                className="hidden md:inline text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                style={{ color: '#ffffff' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}>Sign in</Link>
          <Link to="/register"
                className="text-xs px-3.5 py-1.5 md:text-sm md:px-5 md:py-2 rounded-full font-medium transition-all hover:opacity-90"
                style={{ background: '#ffffff', color: '#000000' }}>
            <span className="md:hidden">Join for Free</span>
            <span className="hidden md:inline">Join InMix for free</span>
          </Link>
        </div>
      </div>
      {open && (
        <div className="md:hidden flex flex-col px-5 pb-5 pt-1">
          {navLinks.map(({ to, label, anchor }) => (
            <Link key={label} to={to}
              className="py-2.5 text-base"
              style={{ color: '#ffffff' }}
              onClick={handleLink(anchor)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
