# Pitch (under 3 minutes)

1. **Problem**: founders finish ScaleupMap's survey, land on a dashboard with a dozen tools, and do not know where to start. Some never come back.
2. **What we built**: the survey now maps a founder to a ranked list of tools, lands them on the first one with the reason on screen, walks them tool by tool, and emails the ones who stall.
3. **Live demo**
   - Log in as `fresh@demo.test`. Dashboard sends them to Step 1 of 3.
   - Pick "Raising a first round". Continue. Pick both "Raising feels overwhelming" and "Finding investors and funding". Continue. Pick "2 to 5 people". Continue.
   - Land on Investment memo: "Because you said "Raising feels overwhelming"." First action shown. Checklist: memo Now, Investor directory Next.
   - Click Mark done. Land on Investor directory, memo ticked.
   - Sign out. Log in as `sam@demo.test`. Dashboard goes straight to the Journey map, different reason.
   - Open `/mail/re-engage/{stalled user id}` to show the email the stalled founder gets. Run `php artisan onboarding:re-engage` in the terminal: "Wrote to stalled@demo.test".
4. **Why it's smarter**: one rule table, first match lands, every match queues. Every rule is proven by a test. The reason quotes the founder's own words, and the tutorial follows the same list, so landing, tutorial and email never disagree.
5. **What's next**: journey stage changes the tutorial copy, not just the order. Real ScaleupMap routes behind each stub.
6. **Backup**: screenshots in `pitch/`, in order.

## Demo logins (password `password`)
fresh@demo.test, maya@demo.test, sam@demo.test, priya@demo.test, omar@demo.test (all done), stalled@demo.test (re-engage target)
