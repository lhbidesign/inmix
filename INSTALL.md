# INMIX Redesign — Installation Guide

Guide for integrating the INMIX design into the client's project.

---

## Tech stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Build tool | Vite | 8.x |
| UI framework | React | 19.x |
| Types | TypeScript | 6.x |
| Styles | Tailwind CSS | 4.x |
| UI components | Radix UI + CVA (shadcn/ui pattern) | — |
| Router | React Router | 7.x |
| Icons | Heroicons | 2.x |
| Deploy | Vercel | — |

> **Important:** This project does **not** use DaisyUI. The component system follows the **shadcn/ui pattern**: Radix UI primitives + `class-variance-authority` (CVA) for variants + Tailwind for styles.

---

## 1. Prerequisites

- Node.js ≥ 20
- npm ≥ 10 (or pnpm / yarn equivalent)
- An [fonts.adobe.com](https://fonts.adobe.com) account with access to kit `dcc5mne` (Neue Haas Grotesk Display Pro)

---

## 2. Clone and install

```bash
git clone https://github.com/lhbidesign/inmix.git
cd inmix-redesign
npm install
npm run dev        # → http://localhost:5174
```

---

## 3. Environment variables

The project requires no environment variables to run locally. If a backend is connected later, create `.env.local`:

```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 4. Typography — Adobe Fonts

The typeface **Neue Haas Grotesk Display Pro** loads from Adobe Fonts.

1. Go to [fonts.adobe.com](https://fonts.adobe.com) → Web Projects
2. Open or create kit **`dcc5mne`**
3. Activate weights: **45 Light**, **55 Roman**, **65 Medium**
4. Paste the generated `<link>` in `index.html` before `</head>`:

```html
<link rel="stylesheet" href="https://use.typekit.net/dcc5mne.css">
```

Without this step the font falls back to `Helvetica Neue / Arial`.

---

## 5. Design tokens

All tokens live in **`src/index.css`** under Tailwind v4's `@theme` directive:

```css
@theme {
  --font-sans: "neue-haas-grotesk-display", ...;

  --color-primary: #73ABBF;           /* teal — secondary UI */
  --color-input:   #1D1C22;           /* input backgrounds and waveforms */
  --color-accent:  oklch(25% 0.02 275); /* tab group backgrounds */

  --gradient-bg:      linear-gradient(160deg, #000000 0%, #1D1C22 100%);
  --gradient-sidebar: linear-gradient(180deg, #0D1258 0%, #050722 100%);
  --gradient-card:    linear-gradient(145deg, #0a0a0a 0%, #1a191f 100%);
}
```

**Brand color (Electric Blue):** `#0011FF`  
Applied directly as `style={{ accentColor: '#0011FF' }}` or `style={{ background: '#0011FF' }}` — not a CSS variable.

---

## 6. File structure

```
inmix-redesign/
├── public/
│   ├── logo.svg                  # INMIX SVG logo
│   └── images/                   # Image assets
├── src/
│   ├── components/
│   │   ├── AppSidebar.tsx        # Global sidebar (collapse/expand)
│   │   └── ui/
│   │       ├── button.tsx        # Button with CVA (variants + sizes)
│   │       ├── card.tsx          # Card + CardContent
│   │       ├── input.tsx         # Base input
│   │       ├── badge.tsx         # Badge / chip
│   │       ├── tab-group.tsx     # Generic TabGroup<T>
│   │       ├── separator.tsx     # Radix Separator
│   │       └── label.tsx         # Radix Label
│   ├── pages/
│   │   ├── Dashboard.tsx         # Stats dashboard and project table
│   │   ├── Projects.tsx          # Project list
│   │   ├── ProjectDetail.tsx     # Mix / Arrange editor (main page)
│   │   ├── Presets.tsx           # Preset library
│   │   ├── Settings.tsx          # Account settings
│   │   ├── Auth.tsx              # Login / Register
│   │   ├── Landing.tsx           # Marketing landing page
│   │   └── DesignSystem.tsx      # Design System documentation
│   ├── lib/
│   │   └── utils.ts              # cn() helper (clsx + tailwind-merge)
│   ├── App.tsx                   # Main router
│   ├── main.tsx                  # Entry point
│   └── index.css                 # @theme tokens + base styles
├── .claude/
│   └── launch.json               # Dev server config for Claude Code
├── vercel.json                   # SPA redirect config
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. Component conventions

### Icon usage

```tsx
import { SparklesIcon, BoltIcon } from '@heroicons/react/24/outline'

// Always define S = 1 at the top of each file
const S = 1

// Always pass strokeWidth={S} — never omit it
<SparklesIcon className="w-4 h-4" strokeWidth={S} />
<BoltIcon     className="w-3.5 h-3.5" strokeWidth={S} />
```

Only `PlayIcon`, `PauseIcon`, `StopIcon` use the solid set (`@heroicons/react/24/solid`) — transport bar only.

### Buttons

```tsx
// Filled white — primary CTA (Save, Publish)
<button className="rounded-full px-4 py-1.5 text-xs font-medium hover:opacity-80"
  style={{ background: '#ffffff', color: '#000' }}>
  Save
</button>

// Electric Blue — AI actions
<button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium"
  style={{ background: 'rgba(0,17,255,0.1)', border: '1px solid rgba(0,17,255,0.4)', color: '#6680ff' }}>
  AI MIX
</button>

// Outline — secondary actions (Export)
<button className="rounded-full px-3 py-1.5 text-xs font-medium"
  style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}>
  Export WAV
</button>

// Ghost — nav actions (Preview, Refresh, Share)
<button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs hover:text-white"
  style={{ color: 'var(--color-muted-foreground)' }}>
  Preview
</button>
```

### Hover states with inline styles

```tsx
// Tailwind hover: classes do NOT override inline styles.
// Use onMouseEnter / onMouseLeave for state changes.

onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
```

---

## 8. Live Design System

After running the dev server, open:

```
http://localhost:5174/design-system
```

Also available in production:

```
https://inmix-redesign.vercel.app/design-system
```

Covers: colors, typography, spacing, icons catalog, all components with copyable code and interactive previews.

---

## 9. Build and deploy

```bash
# Production build
npm run build          # → dist/

# Preview the build
npm run preview

# Deploy to Vercel (requires Vercel CLI and login)
npx vercel --prod
```

`vercel.json` is already configured to redirect all routes to `index.html` (SPA):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 10. Integrating into the client's project

To bring the INMIX design into an existing project:

1. **Copy tokens** → paste the `@theme { ... }` block from `src/index.css` into the client's global CSS.
2. **Copy utilities** → `src/lib/utils.ts` (requires `clsx` and `tailwind-merge`).
3. **Install UI dependencies:**
   ```bash
   npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
   npm install @heroicons/react
   ```
4. **Copy UI components** → `src/components/ui/` into the client's project.
5. **Tailwind v4** → ensure the client project uses Tailwind 4.x (not 3.x) — the `@theme` directive is v4 only.
6. **Activate the font** → see section 4 (Adobe Fonts).
7. **Reference the pages** → each `src/pages/*.tsx` file is a ready-to-adapt implementation reference.

---

## Contact

Project developed for INMIX.  
Design + Frontend: David Suarez  
Repository: [github.com/lhbidesign/inmix](https://github.com/lhbidesign/inmix)
