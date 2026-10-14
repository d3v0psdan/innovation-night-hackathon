---
name: design-screen
description: Build a polished Inertia React page using Origin UI components, Phosphor icons and laravel-cloud.css tokens. Use for any new screen, page, layout or UI polish.
---

# Design a screen

Before writing JSX

1. Read `resources/css/laravel-cloud.css` and `resources/css/scaleupmap.css` (whichever exist) and use their variables and classes. No hardcoded hex.
2. Check `resources/js/components/ui/` for components already installed. Reuse first.
3. Need a new one? Origin UI now lives at coss.com/ui. Find the item name there (for example `p-radio-group-4`, `radio-group`) and install it with `npx shadcn@latest add @originui/<name> --yes`. Never hand-copy component code. Delete the generated example file in `resources/js/components/` after you have used it.

Building
- Pages go in `resources/js/pages/`, one file per screen
- The starter wraps every page in the sidebar `AppLayout` from `resources/js/app.tsx`. Onboarding and landing screens must be standalone: add their names to the `return null` case in that `layout` switch
- Icons from `@phosphor-icons/react` with `weight="bold"`
- Mobile first. Check it works at 375px wide
- One clear primary action per screen
- Show progress on multi-step flows (step 2 of 4)
- Every input has a label, every button has text or an aria-label
- Empty, loading and error states for anything that fetches data

When done, ask the ux-reviewer agent to look at it.
