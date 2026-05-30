import { cn } from '@/lib/utils'

interface Tab<T extends string> {
  id: T
  label: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement> & { strokeWidth?: number }>
}

interface TabGroupProps<T extends string> {
  tabs: Tab<T>[]
  active: T
  onChange: (id: T) => void
  size?: 'sm' | 'md'
  fullWidthOnMobile?: boolean
}

const S = 1

export function TabGroup<T extends string>({
  tabs,
  active,
  onChange,
  size = 'md',
  fullWidthOnMobile = false,
}: TabGroupProps<T>) {
  return (
    <div
      className={cn(
        'flex gap-1 p-1 rounded-lg',
        fullWidthOnMobile ? 'w-full sm:w-fit' : 'w-fit'
      )}
      style={{ background: 'var(--color-accent)' }}
    >
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            'rounded-md transition-all hover:text-white',
            size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
            fullWidthOnMobile ? 'flex-1 sm:flex-none' : '',
            Icon ? 'flex items-center justify-center gap-2' : ''
          )}
          style={
            active === id
              ? { background: '#000', color: '#ffffff', fontWeight: 400 }
              : { color: 'var(--color-muted-foreground)' }
          }
        >
          {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5 flex-shrink-0' : 'w-4 h-4 flex-shrink-0'} strokeWidth={S} />}
          {label}
        </button>
      ))}
    </div>
  )
}
