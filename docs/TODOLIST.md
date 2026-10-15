# TODOLIST (Innovation Night, 14 Oct 2026)

Hard stop 8:30 PM. Pitch is 3 minutes. Each task below runs in its own fresh Claude session. Open the session with the line under **Open with**, do only that task, run the exit check, commit, close.

Both challenges, one demo path: landing page promise, sign-up restates it, 3 questions, land on the right tool with the reason, Mark done, email for the stalled founder. Judges score Problem 25, Solution 25, Technical 20, Innovation 15, Pitch 15. Working code beats mockups. Tiebreak is the working demo.

## Decisions already made (do not reopen)

- Stack and rules in `CLAUDE.md`. Tokens from `resources/css/laravel-cloud.css` plus `resources/css/scaleupmap.css` (`sm-` utilities for ScaleupMap navy). No hardcoded hex. Phosphor `weight="bold"` only.
- Fonts stay Inter and Geist Mono from the tokens. The teardown's Instrument Sans swap is skipped, no time. Geist Mono only on the score number and the 3 step numbers.
- Landing page is `resources/js/pages/welcome.tsx` on route `/`. Public, no auth.
- No `?role=founder` plumbing. This app has no role picker. Landing CTA goes straight to `/register`. Pitch says the real site should carry the role so `/welcome` is skipped.
- Hero product shot is a rendered HTML score card, never an image. That is the answer to "screenshots go stale".
- No new packages. No Figma. Ask the user before adding anything.
- Challenge 2 is already built and committed (survey, profile, rule table, landing with reason, Mark done, checklist, re-engage email). Do not rebuild it.
- Source of truth for what is broken: `docs/Current-ScaleupMap_Landing_Page_Teardown.md`. Section 10 is the fix list, section 8 the design direction, section 9 the craft floor.

## Schedule

| # | Task | Minutes | Done by |
|---|---|---|---|
| 0 | Commit current work | 5 | 6:30 |
| 1 | Landing page | 45 | 7:15 |
| 2 | Sign-up and step 1 restate the promise | 15 | 7:30 |
| 3 | Track whether routing worked | 20 | 7:50 |
| 4 | Tests and UX pass on the landing page | 15 | 8:05 |
| 5 | Pitch, screenshots, flowchart | 20 | 8:25 |
| 6 | Dry run | 5 | 8:30 |

If behind at 7:50, cut task 3. If behind at 8:05, cut the UX pass in task 4 and keep the tests. Never cut task 5.

---

## 0. Commit current work

**Open with:** "Read docs/TODOLIST.md task 0 and do it."

Working tree has uncommitted friendly validation messages, shorter goal labels matching the real ScaleupMap copy, step and destination UI tweaks, and a stop hook fingerprint. Plus a temp debug test.

- [ ] Delete `tests/Browser/DebugStepsTmpTest.php` (temp, not a real test)
- [ ] Run `php.bat artisan test --compact --testsuite=Unit,Feature`. All green or fix only what the diff broke
- [ ] `git add -A` except `tests/Browser/Screenshots/` (add that folder to `.gitignore`)
- [ ] Commit: `Friendly validation messages, goal labels match ScaleupMap copy, step and tool page polish, stop hook skips unchanged code`

**Exit:** `git status` clean except ignored screenshots. Feature suite green.

---

## 1. Landing page

**Open with:** "Read docs/TODOLIST.md task 1, then /design-screen for welcome.tsx."

Rebuild `resources/js/pages/welcome.tsx` from the teardown's fix list. Six screens, left aligned, one column, 1px rules between sections, no card grids, no eyebrows, no gradients, no shadows. Max width 1280px with a visible 1px rule at each edge.

Read first: `docs/Current-ScaleupMap_Landing_Page_Teardown.md` sections 8, 9 and 10. `resources/css/laravel-cloud.css` and `resources/css/scaleupmap.css` for tokens.

Screens, in order:

- [ ] **Nav.** Logo (`public/scaleupmap-icon.png`, copied from the package), 3 links (How it works, For investors, Sign in), one CTA "Score my startup free" to `/register`. Logged-in user sees "Dashboard" instead. Nothing else
- [ ] **Hero.** h1 "See your startup the way investors do. In 2 minutes." One sentence under it naming the founder. One primary button "Score my startup free". Right side: rendered score card in HTML. Venture name, score number in Geist Mono that counts up once on load, three gap chips, "Re-scored 2 days ago". Pure markup and tokens, no image
- [ ] **Proof bar.** The four facts from the live site as 16px dark text with bold Phosphor icons in a bordered row of equal cells
- [ ] **Problem.** "90% of startups fail. Most never find out why before they pitch." Two sentences max
- [ ] **How it works.** 3 numbered steps down the left in Geist Mono: 1 Answer three questions, 2 Get your score and gaps, 3 Work the gaps tool by tool. This mirrors the actual onboarding the judges will click through next
- [ ] **What you get.** Single column, heading plus one sentence each, separated by rules: Score, Gaps named, Investment memo. No cards
- [ ] **One quote.** One founder quote, 30 words max, upright, about a founder outcome
- [ ] **Final CTA.** Same headline promise, same button. Footer: trademark line once, Privacy, Terms, Contact

Rules from the craft floor: one primary action per screen, no group over 4 items, 6 type sizes max, `focus-visible` ring and `::selection` from tokens, `tabular-nums` on the score, buttons say what happens. Mobile at 390px: headline visible on first paint, CTA in thumb reach.

- [ ] Run `npx vp check --fix resources/js/pages/welcome.tsx`
- [ ] Open `/` logged out at 1440 and 390, screenshot both into `pitch/`
- [ ] Commit: `Landing page: one story for founders, rendered score card instead of screenshots, six screens, Laravel Cloud system`

**Exit:** `/` renders with no console errors. Clicking the hero CTA lands on `/register`. Nothing uses lucide, hex, or an image for the product.

---

## 2. Sign-up and step 1 restate the promise

**Open with:** "Read docs/TODOLIST.md task 2."

Close the funnel. Same promise on landing, sign-up, and step 1.

- [ ] `resources/js/pages/auth/register.tsx`: title "Get your score. Takes 2 minutes." Subline "Step 1 of 4. Three questions follow." Keep the form fields as they are
- [ ] Check `resources/js/layouts/auth/*` so the register page shows logo only, no marketing nav, no links except "Already have an account? Sign in"
- [ ] `resources/js/pages/onboarding/step.tsx`: progress reads "Step 2 of 4" through "Step 4 of 4" when the founder just registered (sign-up counts as step 1). Simplest way: show "Step {n+1} of 4" in the step page. Update `tests/Feature/OnboardingTest.php` and `tests/Browser/OnboardingTest.php` strings
- [ ] Run `php.bat artisan test --compact --testsuite=Feature`
- [ ] Commit: `Sign-up restates the landing promise, one step bar from sign-up to the first tool`

**Exit:** Register page says the promise. Step pages show 2 of 4, 3 of 4, 4 of 4. Feature suite green.

---

## 3. Track whether routing worked

**Open with:** "Read docs/TODOLIST.md task 3, then /routing-rule."

Challenge 2 asks "sends them there and tracks whether it worked". Done state exists. Add opened state so the dashboard shows landed, opened, done per founder.

- [ ] Migration: `tutorial_opened` json nullable on users, via `php.bat artisan make:migration --no-interaction`
- [ ] `DestinationController::show` appends the route name to `tutorial_opened` on first visit (array_unique, same pattern as `done`)
- [ ] Dashboard checklist (`resources/js/pages/dashboard.tsx`) shows three states per recommended tool: Recommended, Opened, Done. Phosphor bold icons, tokens only
- [ ] `ReEngageStalledFounders` line 23 filters on `tutorial_done` empty. Change it to `tutorial_opened` empty so the email goes to founders who never opened a tool, not founders who opened one and did not finish. Keep `tests/Feature/ReEngageTest.php` green
- [ ] Seed: `stalled@demo.test` has nothing opened, `maya@demo.test` has memo opened not done. `php.bat artisan migrate:fresh --seed`
- [ ] One Pest test in `tests/Feature/TutorialTest.php`: visiting a tool records it as opened once
- [ ] Commit: `Track whether routing worked: opened state per tool, dashboard shows recommended, opened, done`

**Exit:** Log in as maya, dashboard shows memo Opened. Feature suite green.

---

## 4. Tests and UX pass on the landing page

**Open with:** "Read docs/TODOLIST.md task 4, then /write-tests."

- [ ] Browser test `tests/Browser/LandingTest.php`: visit `/` logged out, see the h1, click "Score my startup free", assert path `/register`, see "Get your score"
- [ ] Feature test: `/` returns 200 and renders `welcome`
- [ ] Run `php.bat artisan test --compact --testsuite=Feature` then `--testsuite=Browser`
- [ ] If time: spawn the `ux-reviewer` agent on `/` and fix only the top 3 findings
- [ ] Commit: `Landing tests, UX fixes`

**Exit:** Both suites green.

---

## 5. Pitch, screenshots, flowchart

**Open with:** "Read docs/TODOLIST.md task 5, then /pitch-prep."

Rewrite `PITCH.md` for both challenges. Under 3 minutes. Open with before and after hero side by side.

- [ ] Before screenshot of scaleupmap.com hero at 1440 into `pitch/before-hero.png` (Playwright or browser). After is the screenshot from task 1
- [ ] Mermaid flowchart of the routing rules in `PITCH.md` (the "decision logic as a flowchart" ask). Pull the order from `app/Onboarding/OnboardingRouter.php`
- [ ] Script, numbered, with the exact clicks:
  1. Problem in two sentences, sponsor's own words ("looks AI coded, no authentic taste", "screenshots go stale")
  2. Before and after hero. Count screens from CTA to first tool: live site 6, ours 4
  3. Click through as `fresh@demo.test`: register copy, 3 questions, land on memo with "Because you said", Mark done, next tool
  4. Sign in as `sam@demo.test`, different landing, different reason. Two users, two results
  5. Dashboard shows recommended, opened, done. Email preview for `stalled@demo.test`, run `php.bat artisan onboarding:re-engage`
  6. Why it works: one rule table, every rule has a test, same words from landing to email
  7. What's next: real routes behind the stubs, stage changes the copy, role carried through sign-up
- [ ] Demo logins table and the fallback (screenshots in `pitch/`, in order)
- [ ] Commit: `Pitch for both challenges, before and after, routing flowchart`

**Exit:** `PITCH.md` reads in under 3 minutes aloud. Every click in the script works on `migrate:fresh --seed` data.

---

## 6. Dry run

No Claude session. `php.bat artisan migrate:fresh --seed`, `composer run dev`, walk the PITCH.md script once with a timer. Fix nothing bigger than copy.
