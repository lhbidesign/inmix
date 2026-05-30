import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Squares2X2Icon, FolderOpenIcon, DocumentDuplicateIcon, PlayCircleIcon,
  UsersIcon, Cog6ToothIcon, ChevronLeftIcon, ChevronRightIcon,
  XMarkIcon, ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const S = 1

const navItems = [
  { icon: Squares2X2Icon,        label: 'Dashboard',     href: '/dashboard' },
  { icon: FolderOpenIcon,        label: 'Projects',       href: '/projects'  },
  { icon: DocumentDuplicateIcon, label: 'Presets',        href: '/presets'   },
  { icon: PlayCircleIcon,        label: 'Listen',         href: '/dashboard' },
  { icon: UsersIcon,             label: 'Collaborators',  href: '/dashboard' },
]

interface AppSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppSidebar({ open, onOpenChange }: AppSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  function isActive(label: string) {
    if (label === 'Dashboard') return location.pathname === '/dashboard'
    if (label === 'Projects')  return location.pathname.startsWith('/projects')
    if (label === 'Presets')   return location.pathname === '/presets'
    return false
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          'w-[90vw] flex-shrink-0 flex-col border-r transition-all duration-300 overflow-hidden',
          open ? 'flex fixed inset-y-0 left-0 z-50' : 'hidden lg:flex',
          collapsed ? 'lg:w-14' : 'lg:w-60'
        )}
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--gradient-sidebar)' }}
      >
        {/* Header */}
        {collapsed ? (
          <div className="flex items-center justify-center px-2 py-[18px] flex-shrink-0">
            <button
              className="hidden lg:flex p-1 rounded-md transition-colors hover:opacity-70"
              style={{ color: '#ffffff' }}
              onClick={() => setCollapsed(false)}
              title="Expand sidebar"
            >
              <ChevronRightIcon className="w-4 h-4" strokeWidth={S} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 py-5 flex-shrink-0">
            <Link to="/dashboard">
              <img src="/logo.svg" alt="INMIX" style={{ height: '22px', width: 'auto' }} />
            </Link>
            <div className="flex items-center gap-1">
              <button
                className="hidden lg:flex p-1 rounded-md transition-colors hover:opacity-70"
                style={{ color: '#ffffff' }}
                onClick={() => setCollapsed(true)}
                title="Collapse sidebar"
              >
                <ChevronLeftIcon className="w-4 h-4" strokeWidth={S} />
              </button>
              <button
                className="lg:hidden p-1 rounded-md transition-colors hover:opacity-70"
                style={{ color: '#ffffff' }}
                onClick={() => onOpenChange(false)}
              >
                <XMarkIcon className="w-5 h-5" strokeWidth={S} />
              </button>
            </div>
          </div>
        )}

        <Separator />

        {/* Nav */}
        <nav className={cn('flex-1 py-4 space-y-0.5', collapsed ? 'px-2' : 'px-3')}>
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              to={href}
              className={cn(
                'w-full flex items-center rounded-lg text-sm font-medium transition-colors',
                collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
              )}
              style={isActive(label)
                ? { background: 'rgba(255,255,255,0.18)', color: '#ffffff' }
                : { color: 'var(--color-primary)' }
              }
              title={collapsed ? label : undefined}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={S} />
              {!collapsed && label}
            </Link>
          ))}
        </nav>

        <Separator />

        {/* Bottom */}
        <div className={cn('py-4 space-y-0.5', collapsed ? 'px-2' : 'px-3')}>
          {collapsed ? (
            <>
              <Link
                to="/settings"
                className="w-full flex justify-center p-2.5 rounded-lg transition-colors hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
                title="Settings"
              >
                <Cog6ToothIcon className="w-[18px] h-[18px]" strokeWidth={S} />
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center p-2.5 rounded-lg transition-colors"
                style={{ color: 'rgba(239,68,68,0.7)' }}
                title="Log out"
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.7)')}
              >
                <ArrowRightOnRectangleIcon className="w-[18px] h-[18px]" strokeWidth={S} />
              </button>
              <div className="flex justify-center py-1">
                <img src="/images/IMG_3993-min.jpg" alt="David Suarez" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
              </div>
            </>
          ) : (
            <>
              <Link
                to="/settings"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
              >
                <Cog6ToothIcon className="w-[18px] h-[18px]" strokeWidth={S} />
                Settings
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
                style={{ color: 'rgba(239,68,68,0.7)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.7)')}
              >
                <ArrowRightOnRectangleIcon className="w-[18px] h-[18px]" strokeWidth={S} />
                Log out
              </button>
              <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
                <img src="/images/IMG_3993-min.jpg" alt="David Suarez" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--color-primary)' }}>David Suarez</p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-muted-foreground)' }}>Pro Plan</p>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  )
}
