# INMIX — Frontend Redesign

Redesigned frontend for INMIX (AI audio mixing & mastering studio), built to be integrated into the existing platform. This is a standalone Vite + React app that doubles as the design source of truth.

**Live reference:** https://inmix-redesign.vercel.app *(temporary password-gated — see [INTEGRATION.md](INTEGRATION.md)).*

## Stack
Vite 8 · React 19 · TypeScript · Tailwind v4 · Radix UI (shadcn pattern) · React Router v7 · Heroicons

## Getting started
```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # tsc -b && vite build
npm run preview  # serve the production build
npm run lint
```

## Project structure
```
src/
  pages/         Landing, About, Pricing, Terms, Privacy   (marketing — no backend)
                 Dashboard, Projects, ProjectDetail,
                 Settings, Presets, Auth                   (app — mock data, reskin over Supabase)
                 Index, DesignSystem                       (internal — do not ship)
  components/    SiteNav, SiteFooter, AppSidebar, PasswordGate, ui/
  index.css      Tailwind v4 @theme — design tokens (source of truth)
public/images/   images, videos, icons
```

## For integrators
Two docs cover the handoff:
- **[INTEGRATION.md](INTEGRATION.md)** — how to merge this into the existing platform, page by page.
- **[DESIGN_TOKENS.md](DESIGN_TOKENS.md)** — colors, fonts, gradients, radii.

> Integration, QA, and publishing are handled by the client's team. This repo is the design deliverable.
