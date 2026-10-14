---
name: routing-rule
description: Decide where a user lands after onboarding based on their answers. Use when adding or changing who gets sent where, the "smarter" part of onboarding.
---

# Routing rules

All routing lives in `app/Onboarding/OnboardingRouter.php`
- An ordered array of rules. Each rule is answers to match plus a route name
- First match wins. Last rule is the fallback, always
- Two public methods: `destinationFor(User $user): string` (route name) and `reasonFor(User $user): string` (the "Because you said ..." line the landing page shows)
- Already built on main with the ScaleupMap goal table (replace the rules and the stub routes for another sponsor) and a dataset test in `tests/Unit/OnboardingRouterTest.php`

Adding a rule
1. Add it above the fallback
2. Add a Pest unit test with a dataset, one row per rule, so every journey is proven
3. Update the Routing section in `PLAN.md`

The landing page should say WHY they're there ("Because you said you're new to X, start here"). Judges love seeing the logic.
