# Plan

**Users**
- Fundraiser: raising a first round, goal `raise_funding` or `find_funding`
- Builder: building an MVP or pivoting, goal `validate_direction` or `execution_focus`
- Scorer: early traction, goal `investor_blind_spots` or `win_customers`

**Questions** (fixed options, real ScaleupMap value keys from `/scaleupmap`)
1. `journey_stage`: looking_for_idea, building_mvp, early_traction, raising_first_round, scaling_post_seed, pivoting
2. `goal`: validate_direction, win_customers, raise_funding, find_funding, investor_blind_spots, execution_focus
3. `team_size`: solo, 2_5, 6_10, 11_plus

**Routing** (first match wins)
- goal find_funding -> /entities#static-investors (Investor directory)
- goal raise_funding -> /dashboard/memo (Investment memo)
- goal investor_blind_spots -> /dashboard/score (ScaleupMap Score)
- goal validate_direction -> /coach?view=map (Journey map)
- goal execution_focus or win_customers -> /coach/north-star-sprint (North Star Sprint)
- fallback -> /dashboard

**Screens**
- /onboarding/{step}: one question per screen, progress "Step 1 of 3"
- Destination stubs: score, memo, investors, journey map, north star sprint, dashboard. Each says "Because you said ..."

**Cut list**: free text answers, AI interpretation, pitch deck upload, real ScaleupMap API, investor and provider roles.

**Demo story**: Maya is a fresh user. She answers "raising a first round", "raising feels overwhelming", "2 to 5 people" and lands on the Investment memo with the reason on screen. Then we log in as Sam, a seeded builder who already answered "unsure about direction", and he lands on the Journey map instead.
