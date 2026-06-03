# INMIX Redesign — Guía de Instalación

Guía para integrar el diseño INMIX en el proyecto del cliente.

---

## Stack técnico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Build tool | Vite | 8.x |
| UI framework | React | 19.x |
| Tipado | TypeScript | 6.x |
| Estilos | Tailwind CSS | 4.x |
| Componentes UI | Radix UI + CVA (patrón shadcn/ui) | — |
| Router | React Router | 7.x |
| Íconos | Heroicons | 2.x |
| Deploy | Vercel | — |

> ⚠️ **Nota importante:** No usamos DaisyUI. El sistema de componentes sigue el patrón de **shadcn/ui**: primitivos de Radix UI + `class-variance-authority` (CVA) para variantes + Tailwind para estilos.

---

## 1. Prerequisitos

- Node.js ≥ 20
- npm ≥ 10 (o pnpm / yarn equivalentes)
- Cuenta en [fonts.adobe.com](https://fonts.adobe.com) con acceso al kit `dcc5mne` (Neue Haas Grotesk Display Pro)

---

## 2. Clonar e instalar

```bash
git clone https://github.com/lhbidesign/inmix.git
cd inmix-redesign
npm install
npm run dev        # → http://localhost:5174
```

---

## 3. Variables de entorno

El proyecto no requiere variables de entorno para funcionar. Si en el futuro se conecta un backend, crear un archivo `.env.local`:

```env
VITE_API_URL=https://api.tudominio.com
VITE_ADOBE_FONTS_KIT=dcc5mne
```

---

## 4. Tipografía (Adobe Fonts)

La fuente **Neue Haas Grotesk Display Pro** se carga desde Adobe Fonts.

1. Ir a [fonts.adobe.com](https://fonts.adobe.com) → Web Projects
2. Crear o acceder al kit **`dcc5mne`**
3. Activar los pesos: **45 Light**, **55 Roman**, **65 Medium**
4. Pegar el `<link>` generado en `index.html` **antes** del cierre de `</head>`:

```html
<link rel="stylesheet" href="https://use.typekit.net/dcc5mne.css">
```

Sin este paso la fuente cae al fallback `Helvetica Neue / Arial`.

---

## 5. Tokens de diseño

Todos los tokens están en **`src/index.css`** bajo la directiva `@theme` de Tailwind v4:

```css
@theme {
  --font-sans: "neue-haas-grotesk-display", ...;

  --color-primary: #73ABBF;          /* teal/cyan — secondary UI */
  --color-input:   #1D1C22;          /* fondo de inputs y waveforms */
  --color-accent:  oklch(25% 0.02 275); /* fondo de tab groups */

  --gradient-bg:      linear-gradient(160deg, #000000 0%, #1D1C22 100%);
  --gradient-sidebar: linear-gradient(180deg, #0D1258 0%, #050722 100%);
  --gradient-card:    linear-gradient(145deg, #0a0a0a 0%, #1a191f 100%);
}
```

**Color brand principal (Electric Blue):** `#0011FF`
→ Se aplica directamente como `style={{ accentColor: '#0011FF' }}` o `style={{ background: '#0011FF' }}` ya que Tailwind v4 no lo tiene como variable semántica.

---

## 6. Estructura de archivos

```
inmix-redesign/
├── public/
│   ├── logo.svg                  # Logo INMIX SVG
│   └── images/                   # Assets de imágenes
├── src/
│   ├── components/
│   │   ├── AppSidebar.tsx        # Sidebar global (collapse/expand)
│   │   └── ui/
│   │       ├── button.tsx        # Button con CVA (variantes + tamaños)
│   │       ├── card.tsx          # Card + CardContent
│   │       ├── input.tsx         # Input base
│   │       ├── badge.tsx         # Badge/chip
│   │       ├── tab-group.tsx     # TabGroup<T> genérico
│   │       ├── separator.tsx     # Radix Separator
│   │       └── label.tsx         # Radix Label
│   ├── pages/
│   │   ├── Dashboard.tsx         # Dashboard con stats y tabla de proyectos
│   │   ├── Projects.tsx          # Lista de proyectos
│   │   ├── ProjectDetail.tsx     # Editor Mix/Arrange (página principal)
│   │   ├── Presets.tsx           # Biblioteca de presets
│   │   ├── Settings.tsx          # Configuración de cuenta
│   │   ├── Auth.tsx              # Login / Register
│   │   ├── Landing.tsx           # Landing page (marketing)
│   │   └── DesignSystem.tsx      # 📐 Design System docs
│   ├── lib/
│   │   └── utils.ts              # cn() helper (clsx + tailwind-merge)
│   ├── App.tsx                   # Router principal
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tokens @theme + base styles
├── .claude/
│   └── launch.json               # Config de dev server para Claude Code
├── vercel.json                   # Config de deploy (SPA redirect)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. Convenciones de componentes

### Botones

```tsx
// ✅ Filled white — CTA principal (Save, Publish)
<button className="rounded-full px-4 py-1.5 text-xs font-medium hover:opacity-80"
  style={{ background: '#ffffff', color: '#000' }}>
  Save
</button>

// ✅ Electric Blue — AI actions
<button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium"
  style={{ background: 'rgba(0,17,255,0.1)', border: '1px solid rgba(0,17,255,0.4)', color: '#6680ff' }}>
  ⚡ AI MIX
</button>

// ✅ Outline — acciones secundarias (Export)
<button className="rounded-full px-3 py-1.5 text-xs font-medium"
  style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}>
  Export WAV
</button>

// ✅ Ghost — nav actions (Preview, Refresh, Share)
<button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs hover:text-white"
  style={{ color: 'var(--color-muted-foreground)' }}>
  Preview
</button>
```

### Íconos

```tsx
import { SparklesIcon } from '@heroicons/react/24/outline'

// Siempre usar strokeWidth={1} para el estilo visual del proyecto
const S = 1
<SparklesIcon className="w-4 h-4" strokeWidth={S} />
```

### Hover states

```tsx
// ❌ No usar hover: de Tailwind si hay inline style en el mismo elemento
// Tailwind hover no sobreescribe inline styles

// ✅ Usar onMouseEnter/onMouseLeave para cambios de estado con inline styles
onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
```

---

## 8. Design System en vivo

Una vez levantado el servidor de desarrollo, acceder a:

```
http://localhost:5174/design-system
```

También disponible en producción:

```
https://inmix-redesign.vercel.app/design-system
```

Incluye: colores, tipografía, espaciado, todos los componentes con código copiable.

---

## 9. Build y deploy

```bash
# Build de producción
npm run build          # → dist/

# Preview del build
npm run preview

# Deploy a Vercel (requiere vercel CLI y estar logueado)
npx vercel --prod
```

El archivo `vercel.json` ya está configurado para redirigir todas las rutas a `index.html` (SPA):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 10. Integración con el proyecto del cliente

Para trasladar el diseño INMIX al proyecto existente del cliente:

1. **Copiar tokens** → `src/index.css` → pegar el bloque `@theme {...}` en el CSS global del cliente.
2. **Copiar utilidades** → `src/lib/utils.ts` (requiere `clsx` y `tailwind-merge`).
3. **Instalar dependencias de UI:**
   ```bash
   npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
   npm install @heroicons/react
   ```
4. **Copiar componentes** → `src/components/ui/` → pegar en el proyecto del cliente.
5. **Configurar Tailwind v4** → asegurarse de que el proyecto del cliente usa Tailwind 4.x (no 3.x), ya que la sintaxis `@theme` es exclusiva de v4.
6. **Activar la fuente** → ver sección 4 (Adobe Fonts).
7. **Referenciar las páginas** → cada `src/pages/*.tsx` es una referencia de implementación lista para adaptar.

---

## Contacto

Proyecto desarrollado para INMIX.  
Design + Frontend: David Suarez  
Repositorio: [github.com/lhbidesign/inmix](https://github.com/lhbidesign/inmix)
