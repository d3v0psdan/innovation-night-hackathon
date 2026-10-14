# Context (real challenge, kicked off 5:32 PM, hard stop 8:30 PM, 3 min pitch)

**The ask**: ScaleupMap challenge 2. Improve the first survey so founders map to the product features they need, drive the onboarding tutorial from those answers, and (bonus) re-engage founders who stall.

**Judges care about** (criteria not stated yet, Discord post pending; inferred from the brief)
- Founders land on the features that fit their answers
- Tutorial flow follows from the survey
- Bonus: email re-engagement for stalled or inactive users
- A clear 3 minute demo

## Steps

### Must (done by 7:30)
- [x] Survey questions with real ScaleupMap keys, routing rules, landing with "Because you said" (already on main)
- [x] Make `goal` multi-select so a founder maps to several features, rank them, land on the top one with the rest as "next up" with `/onboarding-step` and `/routing-rule` (30 min, total 0:30)
- [x] Turn the destination stub into a tutorial step: what the tool does, first action, "mark done" that advances to the next recommended feature with `/design-screen` (30 min, total 1:00)
- [ ] Seed founders at different survey answers and stall states with `/demo-seed` (10 min, total 1:10)
- [ ] Write PITCH.md and backup screenshots with `/pitch-prep` (15 min, total 1:25)

### Should
- [ ] Bonus: `ReEngageStalledFounders` command that emails founders with no `tutorial_completed_at` after N hours, Mailable previewed in the browser, scheduled in `routes/console.php` with `/routing-rule` (30 min)
- [ ] Feature test per endpoint, one browser happy path with `/write-tests` (20 min)
- [ ] ux-reviewer on the tutorial screen, fix top 3 (15 min)

### Could
- [ ] Progress checklist of all recommended features on the dashboard with `/design-screen` (20 min)
- [ ] Journey stage changes the tutorial copy, not just the destination (15 min)
