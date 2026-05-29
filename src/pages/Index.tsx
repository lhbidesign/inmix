import { Link } from 'react-router-dom'
import {
  GlobeAltIcon, Squares2X2Icon, FolderOpenIcon, DocumentDuplicateIcon,
  Cog6ToothIcon, MagnifyingGlassCircleIcon, ArrowRightIcon, UserIcon,
} from '@heroicons/react/24/outline'

const pages = [
  {
    label: 'Landing Page',
    route: '/',
    desc: 'Página principal pública del producto',
    icon: GlobeAltIcon,
    color: '#73ABBF',
    bg: 'rgba(115,171,191,0.1)',
  },
  {
    label: 'Dashboard',
    route: '/dashboard',
    desc: 'Panel principal con proyectos, stats y actividad reciente',
    icon: Squares2X2Icon,
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.1)',
  },
  {
    label: 'Projects',
    route: '/projects',
    desc: 'Listado de todos los proyectos con cards y waveforms',
    icon: FolderOpenIcon,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
  },
  {
    label: 'Project Detail',
    route: '/projects/1',
    desc: 'Vista de mezcla: stems, transport bar, EQ, AI Mix Console',
    icon: MagnifyingGlassCircleIcon,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
  },
  {
    label: 'Presets',
    route: '/presets',
    desc: 'Marketplace de presets con filtros de género y tabs',
    icon: DocumentDuplicateIcon,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
  },
  {
    label: 'Settings',
    route: '/settings',
    desc: 'Configuración de cuenta, notificaciones y audio',
    icon: Cog6ToothIcon,
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.1)',
  },
  {
    label: 'Login / Register',
    route: '/login',
    desc: 'Pantallas de autenticación',
    icon: UserIcon,
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.1)',
  },
]

export default function Index() {
  return (
    <div className="min-h-screen px-6 py-12" style={{ background: '#08080d', color: '#fff' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <img src="/logo.svg" alt="inmix" style={{ height: '24px', marginBottom: '24px' }} />
          <h1 className="text-3xl font-semibold mb-2">Vistas del proyecto</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px' }}>
            Selecciona una pantalla para previsualizarla.
          </p>
        </div>

        {/* Page list */}
        <div className="flex flex-col gap-3">
          {pages.map(({ label, route, desc, icon: Icon, color, bg }) => (
            <Link
              key={route}
              to={route}
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all group"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = bg
                e.currentTarget.style.borderColor = `${color}44`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm" style={{ color: '#fff' }}>{label}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <code className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
                  {route}
                </code>
                <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-xs text-center mt-10" style={{ color: 'rgba(255,255,255,0.2)' }}>
          INMIX — Design Preview · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
