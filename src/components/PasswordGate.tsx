import { useState, type ReactNode } from 'react'

const PASSWORD = '3ug3n3'
const SESSION_KEY = 'inmix_preview_auth'

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#07070b' }}>
      <form onSubmit={submit} className="flex flex-col items-center gap-5 w-full max-w-[320px] px-6">
        <img src="/logo.svg" alt="inmix" style={{ height: '20px', marginBottom: '8px' }} />
        <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Esta página es privada.<br />Ingresa la contraseña para continuar.
        </p>
        <input
          autoFocus
          type="password"
          value={value}
          onChange={e => { setValue(e.target.value); setError(false) }}
          placeholder="Contraseña"
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${error ? '#f87171' : 'rgba(255,255,255,0.1)'}`,
            color: '#fff',
          }}
        />
        {error && <p className="text-xs" style={{ color: '#f87171', marginTop: '-12px' }}>Contraseña incorrecta</p>}
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: '#0011FF', color: '#fff' }}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
