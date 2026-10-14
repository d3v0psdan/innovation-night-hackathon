@AGENTS.md

# Innovation Night project rules

## Stack
- Laravel 13, Inertia, React 19, TypeScript, Tailwind 4, SQLite, Pest 4
- UI components come from Origin UI, installed through the shadcn CLI
- Icons are Phosphor only (`@phosphor-icons/react`), always `weight="bold"`. Never lucide
- Styling uses tokens from `resources/css/laravel-cloud.css` and `resources/css/scaleupmap.css` (`sm-` utilities). Read them before styling anything. No hardcoded hex
- Sponsor facts, real onboarding answer keys and the goal to destination table come from `/scaleupmap`

## Commands
- Dev server `composer run dev`
- Tests `php artisan test`
- Browser tests `php artisan test --testsuite=Browser`
- Fresh demo data `php artisan migrate:fresh --seed`

## How we work tonight
- 3 hours total. Smallest thing that works, then polish
- Always start with `/context`. When unsure what to do next, run it again
- Follow the flow `/context` then `/scaleupmap` then `/plan-feature` then `/design-screen` then `/onboarding-step` and `/routing-rule` then `/write-tests` then `/demo-seed` then `/pitch-prep`
- Every feature gets one Pest test. Every screen gets one browser test
- Don't add packages without asking
- Accessible by default. Labels on inputs, keyboard works, visible focus
