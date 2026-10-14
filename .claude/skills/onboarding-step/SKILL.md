---
name: onboarding-step
description: Add or change a question in the onboarding flow, end to end (migration, validation, controller, page). Use when adding an onboarding question or step.
---

# Add an onboarding step

The model (create it on the first run, reuse after)
- `users.onboarding` json column for answers, `users.onboarded_at` timestamp. Both cast on `User`, and `onboarding` is in the `#[Fillable]` attribute or factories cannot set it
- Questions live in ONE place, `app/Onboarding/questions.php`, returning an array of `key`, `label`, `options`
- `OnboardingController` with `show(step)` and `store(step)`
- `EnsureOnboarded` middleware sends users without `onboarded_at` to step 1

Already built on main: all of the above plus `firstUnansweredBefore()` (a typed URL cannot skip steps) and `answer` prefill so back and "Change my answers" show the saved pick. Check `app/Onboarding/` before creating anything.

Adding a step
1. Add the question to `questions.php`. That's usually the whole backend change.
2. Validate with `Rule::in(array_keys($options))`. Never trust the client.
3. Save into `onboarding->{key}`. On the last step set `onboarded_at` and hand off to `OnboardingRouter`.
4. The React page renders from the question data, so new steps need no new page.
5. Add a Pest feature test that the answer saves and bad answers get rejected.

Keep it boring. No state machine library, no wizard package.
