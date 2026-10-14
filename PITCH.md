# Pitch (under 3 minutes)

1. **Problem**: founders get dropped on a dashboard with a dozen tools and don't know where to start.
2. **What we built**: a three question onboarding that learns the founder's stage, goal and team, then sends them straight to the one ScaleupMap tool they need first, with the reason on screen.
3. **Live demo**
   - Log in as `fresh@demo.test` / `password`. Dashboard redirects to Step 1 of 3.
   - Pick "Raising a first round", Continue. Pick "Raising feels overwhelming", Continue. Pick "2 to 5 people", Continue.
   - Land on Investment memo: "Because you said raising feels overwhelming."
   - Log out. Log in as `sam@demo.test` / `password`. Dashboard goes to Journey map: "Because you said you are unsure about direction."
4. **Why it's smarter**: routing is an ordered rule table in `app/Onboarding/OnboardingRouter.php`, first match wins, every rule proven by a dataset test. The landing page says why, so the founder trusts the pick.
5. **What's next**: use journey stage as a tiebreak inside each goal, and let the founder change answers from the landing page.
6. **Backup**: if the demo dies, show `pitch/01-step1-mobile.png` to `pitch/07-landing-journey-map-desktop.png` in order.

## Demo logins (password is `password` for all)
| email | lands on |
|---|---|
| fresh@demo.test | Step 1 of onboarding |
| maya@demo.test | /dashboard/memo Investment memo |
| sam@demo.test | /coach Journey map |
| priya@demo.test | /dashboard/score ScaleupMap Score |
| jonas@demo.test | /entities Investor directory |
| aisha@demo.test | /coach/north-star-sprint North Star Sprint |
