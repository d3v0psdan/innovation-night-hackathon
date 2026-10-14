---
name: write-tests
description: Write Pest feature, unit and browser tests for what was just built. Use after a feature is done, before demo prep, or when Daniel says "test this".
---

# Write tests

Three layers, keep each small
1. **Unit** routing rules with a dataset in `tests/Unit/`
2. **Feature** each onboarding endpoint saves, validates, redirects, in `tests/Feature/`
3. **Browser** one happy path per user type in `tests/Browser/`, using Pest browser testing (`visit()`, `click()`, `fill()`, `assertSee()`)

Also do
- `assertNoJavaScriptErrors()` on every browser test
- `assertNoAccessibilityIssues()` on the main screens if the installed Pest version has it
- A 375px viewport run for the main flow

Then run `php artisan test` and fix until green. If a test is flaky, fix the cause, don't add sleeps.

For quick visual checks mid-build, use the Playwright MCP to open the page and screenshot it.
