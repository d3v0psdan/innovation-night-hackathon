@AGENTS.md

# Innovation Night project rules

## Stack
- Laravel 13, Inertia, React 19, TypeScript, Tailwind 4, SQLite, Pest 4
- UI components come from Origin UI, installed through the shadcn CLI
- Icons are Phosphor only (`@phosphor-icons/react`), always `weight="bold"`. Never lucide
- Styling uses tokens from `resources/css/laravel-cloud.css`. For a ScaleupMap challenge also use `resources/css/scaleupmap.css` (`sm-` utilities), for any other sponsor do not. Read them before styling anything. No hardcoded hex
- shadcn installs bring lucide imports. Swap them for Phosphor `weight="bold"` right after installing
- If the challenge is from ScaleupMap, sponsor facts, real onboarding answer keys and the goal to destination table come from `/scaleupmap`. If the sponsor is someone else, skip `/scaleupmap`, keep the plumbing in `app/Onboarding/`, and replace `questions.php`, the router rules and the destination stubs with the real sponsor's

## Commands
- In Git Bash on Windows `php` and `composer` resolve only as `php.bat` and `composer.bat` (Herd). Use those in Bash tool calls
- Dev server `composer run dev`
- Format and lint TS/CSS `npx vp check --fix <files>` (vite-plus, the starter's formatter). Never run it repo-wide, it rewrites 30+ markdown and json files
- Tests `php artisan test`
- Browser tests `php artisan test --testsuite=Browser`
- Fresh demo data `php artisan migrate:fresh --seed`

## How we work tonight
- 3 hours total. Smallest thing that works, then polish
- Always start with `/context`. When unsure what to do next, run it again
- Follow the flow `/context` then `/scaleupmap` (ScaleupMap only) then `/plan-feature` then `/design-screen` then `/onboarding-step` and `/routing-rule` then `/write-tests` then `/demo-seed` then `/pitch-prep`
- Every feature gets one Pest test. Every screen gets one browser test
- Don't add packages without asking
- Accessible by default. Labels on inputs, keyboard works, visible focus
