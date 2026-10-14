---
name: scaleupmap
description: ScaleupMap sponsor facts, brand tokens, real founder onboarding answers and the goal to destination table. Use when the challenge mentions ScaleupMap or founders, before /plan-feature, and whenever routing, questions or styling need the real product data.
---

# ScaleupMap

Source of truth is `brand/scaleupmap-platform-reference.md`. Read it once per session, then use this summary.

## Brand
- Tokens live in `resources/css/scaleupmap.css` as `sm-` utilities: `bg-sm-primary`, `hover:bg-sm-primary-hover`, `text-sm-title`, `text-sm-meta`, `bg-sm-canvas`, `font-sm-display`, `font-sm-body`
- Logo `public/scaleup-icon.png`
- Primary CTA is `rounded-full bg-sm-primary text-white`. Cards are `rounded-2xl bg-sm-card border border-sm-primary/12`
- Eyebrow text is `text-sm-primary uppercase tracking-widest text-[11px]`. The brand accent `#4FBBEA` fails WCAG contrast on white (2.18:1), so use `sm-accent` only for borders, focus rings and gradients, never for text
- Fonts are DM Sans (body) and DM Serif Display (titles). Add the Google Fonts link from the reference to `resources/views/app.blade.php` on the first screen

## Founder onboarding answers (use these exact value keys)
- `journey_stage`: `looking_for_idea`, `building_mvp`, `early_traction`, `raising_first_round`, `scaling_post_seed`, `pivoting`
- `goal`: `validate_direction`, `win_customers`, `raise_funding`, `find_funding`, `investor_blind_spots`, `execution_focus`
- `team_size`: `solo`, `2_5`, `6_10`, `11_plus`

## Goal to destination (first match wins, main dashboard is the fallback)

| goal | destination | because you said |
|------|-------------|------------------|
| `find_funding` | `/entities#static-investors` | you want to find investors and funding |
| `raise_funding` | `/dashboard/memo` | raising feels overwhelming |
| `investor_blind_spots` | `/dashboard/score` | you want to know what investors will see |
| `validate_direction` | `/coach?view=map` | you are unsure about direction |
| `execution_focus` | `/coach/north-star-sprint` | you need weekly focus |
| `win_customers` | `/coach/north-star-sprint` | you want traction and customers |
| fallback | `/dashboard` | |

Build each destination as a stub Inertia page in our app at the same path, titled after the ScaleupMap feature, so the demo mirrors production.
