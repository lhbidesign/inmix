import { useState } from 'react'
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightIcon,
  BoltIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const S = 1

type AuthMode = 'login' | 'register'

const features = [
  { icon: BoltIcon,         text: 'AI-powered stem separation & mixing' },
  { icon: ShieldCheckIcon,  text: 'Secure cloud storage for all your projects' },
  { icon: UsersIcon,        text: 'Real-time collaboration with your team' },
]

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [signInHover, setSignInHover] = useState(false)

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--gradient-bg)', color: 'var(--color-foreground)' }}>

      {/* Left panel — brand */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 p-12 relative overflow-hidden"
        style={{ background: 'var(--gradient-sidebar)', borderRight: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'var(--color-primary)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--color-primary)' }} />

        {/* Logo */}
        <div className="flex items-center relative z-10">
          <img src="/logo.svg" alt="INMIX" style={{ height: '22px', width: 'auto' }} />
        </div>

        {/* Headline */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h1 className="text-[3.825rem] font-normal tracking-tight" style={{ lineHeight: '0.9' }}>
              Your studio,<br />
              <span style={{ color: 'var(--color-primary)' }}>reimagined.</span>
            </h1>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
              Professional audio mixing with the power of AI. Create, collaborate, and deliver exceptional sound — from anywhere.
            </p>
          </div>
          <div className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-accent)' }}>
                  <Icon className="w-[18px] h-[18px]" strokeWidth={S} style={{ color: 'var(--color-primary)' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 p-5 rounded-xl border" style={{ background: 'var(--color-accent)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-sm italic leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
            "INMIX transformed how I deliver mixes to clients. What used to take days now takes hours."
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
              JR
            </div>
            <div>
              <p className="text-xs font-medium">James Rivera</p>
              <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Music Producer · LA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-[400px] space-y-8">

          {/* Mobile logo */}
          <div className="flex items-center lg:hidden">
            <img src="/logo.svg" alt="INMIX" style={{ height: '20px', width: 'auto' }} />
          </div>

          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-normal tracking-tight">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
              {mode === 'login' ? 'Sign in to continue to your studio' : 'Start your free trial — no credit card required'}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {mode === 'register' && (
              <div className="space-y-1.5">
                <Label>Full name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                  <Input type="text" placeholder="James Rivera" className="pl-9" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label>Email address</Label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                <Input type="email" placeholder="you@studio.com" className="pl-9" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                {mode === 'login' && (
                  <button type="button" className="text-xs hover:underline" style={{ color: 'var(--color-primary)' }}>
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-9 pr-10" />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted-foreground)' }}>
                  {showPassword
                    ? <EyeSlashIcon className="w-4 h-4" strokeWidth={S} />
                    : <EyeIcon className="w-4 h-4" strokeWidth={S} />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-1.5">
                <Label>Confirm password</Label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={S} style={{ color: 'var(--color-muted-foreground)' }} />
                  <Input type={showConfirm ? 'text' : 'password'} placeholder="••••••••" className="pl-9 pr-10" />
                  <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted-foreground)' }}>
                    {showConfirm
                      ? <EyeSlashIcon className="w-4 h-4" strokeWidth={S} />
                      : <EyeIcon className="w-4 h-4" strokeWidth={S} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                By creating an account you agree to our{' '}
                <span className="underline cursor-pointer" style={{ color: 'var(--color-primary)' }}>Terms</span>
                {' '}and{' '}
                <span className="underline cursor-pointer" style={{ color: 'var(--color-primary)' }}>Privacy Policy</span>.
              </p>
            )}

            <Button type="submit" variant="outline" className="w-full gap-2 mt-2 rounded-full font-medium transition-all duration-200" size="lg" onMouseEnter={() => setSignInHover(true)} onMouseLeave={() => setSignInHover(false)} style={signInHover ? { background: '#A8A8A8', borderColor: '#A8A8A8', color: '#000', borderWidth: '1px' } : { borderColor: 'rgba(255,255,255,0.3)', color: '#A8A8A8', borderWidth: '1px' }}>
              {mode === 'login' ? 'Sign in' : 'Create account'}
              <ArrowRightIcon className="w-4 h-4" strokeWidth={S} />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Google SSO */}
          <Button variant="outline" className="w-full gap-2 rounded-full font-medium" size="lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#A8A8A8', borderWidth: '1px' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          {/* Switch mode */}
          <p className="text-center text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}
