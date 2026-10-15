# ScaleupMap brand kit

One page. Read it before styling any screen. Source files: `resources/css/scaleupmap.css` (tokens and utilities), `resources/css/laravel-cloud.css` (structure tokens, shadcn mapping), `resources/js/components/brand-logo.tsx` (logo). Reference material in this folder: the Laravel Cloud stylesheet teardown and the landing page audit.

The system is Laravel Cloud's grid and type with ScaleupMap navy as the single accent. One sans, one mono, two text colours, hairline rules instead of cards, the product rendered in HTML instead of screenshots.

## Logo

| Use | How |
| --- | --- |
| Any React page | `import { BrandLogo } from '@/components/brand-logo'` then `<BrandLogo className="h-8" />` |
| Icon only (nav on mobile, favicon-like spots) | `<BrandLogo mark className="size-8" />` |
| On a dark or tinted surface | `<BrandLogo mono className="text-foreground" />`. Colour logo also flips to `currentColor` under `.dark` on its own |
| Email, external, static | `public/brand/scaleupmap-logo.svg`, `public/brand/scaleupmap-icon.svg` |

Rules: never recolour the colour logo, never stretch, never put it on navy. Clear space equals the height of the mark on every side. The sky blue `#4FBBEA` exists only inside the logo. Do not use it for anything else.

## Colour

Everything is a token. No hex in components. Tailwind class names are listed in the last column.

| Role | Light | Dark | Class |
| --- | --- | --- | --- |
| Accent (links, score, step labels, focus ring, icons in proof rows) | `#3160AE` | `#8AABDD` | `text-brand`, `bg-brand`, `border-brand` |
| Accent hover | `#284F90` | `#A9C3E9` | `hover:text-brand-hover` |
| Ink (primary button fill) | `#111113` | `#EDEEF0` | `bg-ink` via `btn-ink` |
| Heading and body strong | `#1C2024` | `#EDEEF0` | `text-foreground` |
| Body, meta, secondary | `#60646C` | `#B0B4BA` | `text-muted-foreground` |
| Page | `#FFFFFF` | `#111113` | `bg-background` |
| Recessed panel (onboarding canvas) | `#FCFCFD` | `#18191B` | `bg-sheet` |
| Hover and selected fill | `#F0F0F3` | `#272A2D` | `bg-subtle` |
| Grid rule (marketing pages, 1px) | `#F0F0F3` | `#2E3135` | `border-rule`, `divide-rule` |
| Component border (forms, cards, 3:1 contrast) | `#E0E1E6` | `#2E3135` | `border-border` |
| Navy tints, chips and tracks | `#EAF1FB` to `#0E2347` | inverted | `bg-navy-3` to `bg-navy-8`, `text-navy-12` |
| Text selection | `#D8E5F7` | `#1D3D73` | automatic |

Where navy is allowed on a page: links, the score number, the three step labels, the focus ring, icons in proof rows, selected chips. Nowhere else. Buttons are ink, not navy. No gradients, no tinted bands, no second blue.

## Type

| Role | Face | Weight | Size |
| --- | --- | --- | --- |
| Everything | Instrument Sans (`font-sans`) | 400 body, 500 headings, buttons, leads, nav | h1 60px desktop, 48 tablet, 36 mobile. h2 40px. Lead 18px. Body 16px. Nav 15px. Buttons 14px |
| Numbers, timestamps, step strips | Geist Mono (`font-mono`) | 500, 600 for strip labels | 12px meta. Score 72px |

Tracking: h1 `-0.05em`, h2 and leads `-0.02em`, body 0. Line height: h1 1, h2 1.3, body 1.5. `text-wrap: pretty` is on every h1, h2, h3. Nothing is bold. Nothing is italic. No serif anywhere (DM Serif Display is gone).

Fonts load from Bunny Fonts through `vite.config.ts`. The fallback is system sans.

## Spacing, grid, shape

- Base unit 4px. Use 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 120.
- Marketing pages: `max-w-7xl` container with `border-x border-rule`. Sections stack with `border-t border-rule`. No background bands.
- Section padding 80px top and bottom (`py-20`). Hero 120px top on desktop (`sm:pt-30`).
- Heading to paragraph 20 to 24px. Paragraph to button 32px.
- Radius: buttons and inputs 6px (`rounded-md`), cards and widgets 8px (`rounded-lg`). No pills.
- Cards do not exist on marketing pages. Use cells divided by rules. In-app cards use `border-border` with no shadow.

## Components

| Utility | What it is |
| --- | --- |
| `btn-ink h-10` | Primary action. Ink fill, 6px radius, arrow icon optional. `h-8` inside a nav |
| `btn-outline h-10` | Secondary action. White fill, 16% navy edge |
| `score text-7xl` | The score number. Mono, tabular, navy |
| `strip-number` plus `strip-label` | Section strip: grey mono number, navy mono caps label. Only where order is the information |
| `enter enter-1` to `enter-4` | One entrance on page load. 32px rise, 4px blur, 600ms, staggered. Use on the hero only |
| `bg-dot-grid` | 9.5px dot paper behind a rendered widget |

Icons: Phosphor, `weight="bold"`, `size-4` in buttons, `size-5` in rows. Never lucide.

## Motion and browser surfaces

One authored moment per page (the hero entrance and the score count-up on the landing page). Everything else is a 100ms colour change on `cubic-bezier(0, 0, 0.2, 1)`. Reduced motion turns the entrance off.

Focus ring is a 2px navy outline with 2px offset, set globally. Selection is a navy tint. Score and timestamps use tabular numerals.

## Voice

Outcome first, founder named, present tense. "See your startup the way investors do." Buttons say what happens: "Score my startup free", "Mark done". No trademark symbols in body copy, one trademark line in the footer. No "operating system", "institutional grade", "venture intelligence".

## Do and do not

Do: one primary action per screen. Left-aligned sections after one centred hero. Rules, not cards. Navy as data, not decoration. Rendered HTML instead of product screenshots.

Do not: eyebrow text above headings. Gradient text or panels. Card grids of icon plus heading plus text. Sky blue outside the logo. Shadows on marketing surfaces. Pills. Bold.

## Where it applies

The onboarding step, tool page, dashboard and auth screens inherit fonts, navy, radii and borders through the shared tokens (`sm-primary`, `sm-canvas`, `font-sm-body` all point at the kit now). Theme every new screen with the classes above and nothing hand-picked.
