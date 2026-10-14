---
name: demo-seed
description: Seed demo users and data for the pitch. Use when preparing the demo or when Daniel says "seed" or "demo data".
---

# Demo seed

In `database/seeders/DemoSeeder.php`, called from `DatabaseSeeder`
- One user per user type from `PLAN.md`, emails like `newbie@demo.test`, password `password`
- One fresh user with no onboarding, so we can show the flow live
- Realistic names and content. No lorem ipsum

Then
1. Run `php artisan migrate:fresh --seed`
2. Log in as each user and confirm they land somewhere different
3. Write the logins at the bottom of `PLAN.md` under **Demo logins**
