# INMIX Redesign — Design Tokens

All tokens live in [`src/index.css`](src/index.css) under Tailwind v4's `@theme` block. This is the source of truth — Tailwind generates utility classes from them (e.g. `--color-primary` → `text-primary`, `bg-primary`).

> **Note on the existing platform:** `inmix-main` already defines its tokens in the classic shadcn HSL format (`--primary: 221 100% 50%`, etc.). Our tokens are in hex/oklch (Tailwind v4 `@theme`). When integrating, map these values into your existing token system — they don't need to replace your format, just match the values.

---

## Typography

| Role | Family | Source |
|------|--------|--------|
| Sans (UI + headings) | **Neue Haas Grotesk Display** | Adobe Fonts kit — slug `neue-haas-grotesk-display` |
| Mono | JetBrains Mono | Google Fonts |

```css
--font-sans: "neue-haas-grotesk-display", "Neue Haas Grotesk Display Pro", "Helvetica Neue", Arial, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

- **Neue Haas is a recommendation, not a requirement.** It needs an Adobe Fonts kit (licensed) pasted into `index.html`. If you prefer, keep your current **Outfit** — the layout works with either; only the look shifts slightly.
- Global letter-spacing is `0.03em` on `body` (see `index.css` `@layer base`). Headings use `letter-spacing: 0%` inline to override it.
- Heading weights used: **300** (light) for big display headings, **400** for section titles.

### Font sizes in use
Display heroes use `text-[80px]` (some pages `text-[120px]` / `text-[110px]` at `sm:`). Section titles `text-[40px]`–`text-[80px]`. Body copy `text-base` / `text-xl` / `20px–24px` inline. Small labels `text-[11px]` (pills) and `text-xs`.

---

## Colors

```css
--color-background: #07070b;          /* near-black, dark-first */
--color-foreground: oklch(98% 0.005 285);
--color-card / --color-popover: oklch(12% 0.008 285);
--color-primary: #73ABBF;             /* teal-blue — secondary/muted accents, focus ring */
--color-muted-foreground: oklch(55% 0.01 285);
--color-border: rgba(255,255,255,0.08);
--color-input: #1D1C22;
--color-ring: #73ABBF;
```

### ⚠️ Brand accent — Electric Blue `#0011FF`
This is the **primary brand color** (pills, AI MIX button, CTAs, the "by Artists." highlight) but it is **NOT a token** — it's used as an inline hex `#0011FF` throughout the pages. If you want it tokenized, add it to `@theme` (e.g. `--color-brand: #0011FF`) and swap the inline usages.

> Your platform's `--primary: 221 100% 50%` (≈ `#0051FF`) is almost the same electric blue. You can likely reuse your existing primary and drop the inline `#0011FF`.

---

## Gradients

```css
--gradient-bg:      linear-gradient(160deg, #000000 0%, #1D1C22 100%);
--gradient-sidebar: linear-gradient(180deg, #0D1258 0%, #050722 100%);
--gradient-card:    linear-gradient(145deg, #0a0a0a 0%, #1a191f 100%);
```

Section image overlays use inline gradients like `linear-gradient(180deg, rgba(7,7,11,0.5) 0%, rgba(7,7,11,0.2) 50%, rgba(7,7,11,0.85) 100%)` for text legibility over photos.

---

## Radius

```css
--radius: 0.5rem;   /* + sm/md/lg/xl derived */
```
Common usage: `rounded-full` (pills/buttons), `rounded-2xl` (cards/upload zones), and the marketing CTA sections use a large `rounded-t-[150px]` on the top corners.

---

## Icons
This redesign uses **Heroicons** (`@heroicons/react`, strokeWidth 1). The existing platform uses **Lucide**. Pick one for consistency — both are already available; Lucide is already in this repo's deps too.
