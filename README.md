# ScaleupMap smarter onboarding

NAIT Innovation Night, 14 October 2026. Challenge 2 from ScaleupMap: improve the survey that maps founders to product features, drive the onboarding tutorial from the answers, and re-engage founders who stall.

## What it does

1. Three questions with ScaleupMap's real answer keys: journey stage, goals (pick several), team size.
2. An ordered rule table turns the answers into a ranked list of tools. The founder lands on the first one.
3. Every landing page says why ("Because you said "Raising feels overwhelming".") and gives one first action.
4. "Mark done" moves the founder to the next recommended tool. The checklist shows done, now, next.
5. A daily command emails founders who finished the survey, never opened a tool, and have not been written to yet.

Routing lives in `app/Onboarding/OnboardingRouter.php`. Questions in `app/Onboarding/questions.php`. Tools in `app/Onboarding/destinations.php`.

## Run it

```
composer install && npm install
cp .env.example .env && php artisan key:generate
php artisan migrate:fresh --seed
npm run build
composer run dev
```

## Demo logins (password is `password`)

| email | state |
|---|---|
| fresh@demo.test | New, starts at step 1 |
| maya@demo.test | Raising, goals memo + investors, lands on the Investment memo |
| sam@demo.test | Unsure about direction, lands on the Journey map |
| priya@demo.test | Blind spots + customers, lands on the Score |
| omar@demo.test | Finished every tool, sees the dashboard checklist |
| stalled@demo.test | Onboarded 3 days ago, never opened a tool. `php artisan onboarding:re-engage` emails them. Preview at `/mail/re-engage/{id}` |

## Tests

```
php artisan test
php artisan test --testsuite=Browser
```

Stack: Laravel 13, Inertia, React 19, Tailwind 4, Origin UI, Phosphor icons, Pest 4 with browser tests.
