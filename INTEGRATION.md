# INMIX Redesign — Integration Guide

This repo is the **frontend redesign** of INMIX, built to be merged into your existing platform (`inmix-main`). It is a self-contained Vite + React app you can run, inspect, and copy from. This guide is for a **developer** integrating it into the live platform.

Live reference: **https://inmix-redesign.vercel.app** *(behind a temporary password — see "Remove the PasswordGate" below).*

---

## 1. Stack — same as your platform ✅

| | This redesign | `inmix-main` |
|---|---|---|
| Build | Vite + React 19 + TypeScript | Vite + React ✅ |
| UI primitives | Radix UI (shadcn pattern) + CVA | Radix (shadcn) ✅ |
| Styling | Tailwind v4 (`@theme` tokens) | Tailwind ✅ |
| Routing | React Router v7 | — |
| Animation | (none required) | Framer Motion |
| Data | **mock / local state** | **Supabase** |
| Icons | Heroicons | Lucide |
| Fonts | Neue Haas (Adobe) | Outfit (Google) |

Because the stack matches, integration is a **reskin**, not a rewrite. No framework migration.

---

## 2. Run it locally

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # production build (tsc -b && vite build)
```

---

## 3. Two layers of work

### Layer A — Marketing pages (easy, additive)
`Landing (/)`, `About (/about)`, `Pricing (/pricing)`, `Terms (/terms)`, `Privacy (/privacy)`.
These are **new** and have **no backend** — pure presentational React + Tailwind. Copy the page, its assets (`public/images/...`), and the shared components. Nothing to wire up.

### Layer B — App pages (reskin over Supabase)
`Dashboard`, `Projects`, `ProjectDetail`, `Settings`, `Presets`, `Auth`.
These mirror screens you already have, but here they render **mock data / local state**. Your job: take the new JSX + styling and **replace the mock data with your existing Supabase hooks/queries**. The UI is the deliverable; the data layer stays yours.

---

## 4. Route / page inventory

| Route | Component | Layer | Notes |
|-------|-----------|-------|-------|
| `/` | `Landing` | Marketing | Hero, How It Works, Features, testimonials, FAQ, CTA |
| `/about` | `About` | Marketing | Has a background `aboutvideo.mp4` in the hero |
| `/pricing` | `Pricing` | Marketing | Monthly/Annual toggle (annual = ×12), FAQ (`#faq`) |
| `/terms`, `/privacy` | `Terms`, `Privacy` | Marketing | Legal copy |
| `/dashboard` | `Dashboard` | App | mock data |
| `/projects`, `/projects/:id` | `Projects`, `ProjectDetail` | App | mock data |
| `/settings`, `/presets` | `Settings`, `Presets` | App | mock data |
| `/login`, `/register` | `Auth` | App | UI only — wire to your Supabase auth |
| `/index` | `Index` | — | **Internal design hub** (links to every page). Don't ship. |
| `/design-system` | `DesignSystem` | — | Internal reference. Don't ship. |

---

## 5. Integration steps

1. **Remove the PasswordGate.** Marketing routes are wrapped in `<PasswordGate>` (`src/components/PasswordGate.tsx`) — preview-only protection (password `3ug3n3`). Unwrap them for production and delete the component.
2. **Fonts.** Either paste the Adobe Fonts kit for Neue Haas into `index.html`, or keep your Outfit and update `--font-sans` in `index.css`. See [DESIGN_TOKENS.md](DESIGN_TOKENS.md).
3. **Tokens.** Reconcile `src/index.css` `@theme` values with your existing shadcn HSL tokens. The brand accent `#0011FF` is used **inline** (not a token) — see DESIGN_TOKENS.md; your existing `--primary` is nearly identical.
4. **Marketing pages** → copy pages + `public/images/*` + shared components. Done.
5. **App pages** → swap mock data for your Supabase hooks, screen by screen.
6. **Icons** → decide Heroicons vs Lucide (both available) and unify.
7. Drop the internal `/index` and `/design-system` routes.

---

## 6. Shared components (already extracted — don't duplicate)

- `src/components/SiteNav.tsx` — public navbar. Mobile = hamburger + logo; desktop = centered links. Handles its own scrolled state + smooth-scroll to `#workflow` / `#tools`.
- `src/components/SiteFooter.tsx` — public footer with working links.
- `src/components/AppSidebar.tsx` — the app (dashboard) sidebar with collapse/expand + mobile overlay.
- `src/components/ui/tab-group.tsx` — generic `TabGroup<T>`.

---

## 7. Gotchas / notes

- **Dashed upload borders** use an inline SVG data-URI. They were written **without `calc()`** on purpose (`calc()` in SVG geometry attrs breaks in Firefox/Safari). Keep `width='100%' height='100%'` — don't reintroduce `calc()`.
- **Scroll restoration**: `ScrollToTop` in `App.tsx` resets scroll on route change and smooth-scrolls to hash anchors. Keep or adapt to your router setup.
- **Responsive images**: marketing heroes use `<picture>` with a `m_*` mobile source (`max-width: 767px`) and a desktop source. Background videos (`aboutvideo.mp4`, `waves.mp4`) are compressed; posters fall back to the JPG.
- **`vercel.json`** has a SPA rewrite (`/(.*) → /index.html`); adapt to your hosting/router.

---

## 8. What is NOT in scope here
Integration, QA, and publishing are handled by your team. This repo + guide is the design handoff. Questions about the **design intent** can be answered from the live reference site; questions about your **Supabase data layer** are yours.
