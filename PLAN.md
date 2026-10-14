# Plan (ScaleupMap challenge 2)

**Users**
- Fundraiser: raising a first round, goals raise_funding and find_funding
- Builder: building an MVP or pivoting, goals validate_direction and execution_focus
- Scorer: early traction, goals investor_blind_spots and win_customers

**Questions** (real ScaleupMap keys, fixed options)
1. `journey_stage`, single pick
2. `goal`, multi pick (the real survey is multi-select), at least one
3. `team_size`, single pick

**Routing**
- Every matching rule counts. First match is the landing tool, the rest are "Next up" in rule order
- Stage rules first: looking_for_idea and pivoting go to the Journey map whatever the goals
- Goal rules: find_funding -> investors, raise_funding -> memo, investor_blind_spots -> score, validate_direction -> map, execution_focus and win_customers -> sprint
- Fallback: dashboard

**Screens**
- /onboarding/{step}: radio cards for single pick, checkbox cards for multi pick, Step x of 3
- Destination page = tutorial step: why you are here, what the tool does, the first action, "Mark done" moves to the next recommended tool, "Next up" list
- Dashboard: checklist of recommended tools with done state (Could)

**Cut list**: free text, AI interpretation, pitch deck upload, real ScaleupMap API, investor and provider roles, real email sending (log mailer only).

**Demo story**: Maya is new. She picks "Raising a first round", then both "Raising feels overwhelming" and "Finding investors and funding", then "2 to 5 people". She lands on the Investment memo with "Next up: Investor directory". She marks the memo done and the app moves her to the directory. Then we log in as Sam, who picked "unsure about direction", and he lands on the Journey map instead.
