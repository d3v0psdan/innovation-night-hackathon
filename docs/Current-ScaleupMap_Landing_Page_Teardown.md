# ScaleupMap Landing Page Teardown

Innovation Night Mini Hackathon, Challenge 1. Audited October 14, 2026 against the live site at 1440px desktop and 390px mobile, both audience tabs, and the sign-up page.

---

## 1. What we're judged on

Half the score (50 of 100) is problem clarity plus a working build. This teardown is the evidence for the first half. The rebuild is the second.

| Criterion | Weight | Scores 5 when | How this teardown helps |
| --- | --- | --- | --- |
| Problem and impact | 25 | Problem is specific, target user is named, value of solving it is evident | Every finding below names the broken thing and who it hurts (a first-time founder) |
| Solution and execution | 25 | Working demo shows the core idea end to end | Build the new landing page as real code, not a Figma. Demo the click from hero to sign-up |
| Technical quality | 20 | Sensible design choices, clean implementation, tools used for a reason | Reuse the brand tokens in the package (DM Sans, DM Serif Display, #3160AE, #4FBBEA) so the page looks like it belongs |
| Innovation and creativity | 15 | Fresh angle beyond the obvious answer | Replace stale screenshots with something that can't go stale (live data, illustrated flows, or an interactive mini demo) |
| Pitch and communication | 15 | Clear story, confident demo, honest answers | Open the pitch with the before and after side by side. Two sentences per problem |

Tiebreaker is solution and execution, then problem and impact. So a working page beats a prettier mockup.

---

## 2. First five seconds

A first-time founder lands, reads the headline, and still can't answer "what is this and is it for me." That is the core failure. Everything else is downstream.

**What the visitor sees above the fold (1440px)**

- A nav with 5 links plus Sign In. One of them is "My Dashboard" shown to a logged-out stranger. Dashboards belong to users, not visitors (Jakob's law, recognition over recall)
- A second row of 3 big audience tabs before any content. The visitor is asked to self-sort before they know what the product is (Hick's law, decision before context)
- Eyebrow text "A COMPLETE FOUNDER OPERATING SYSTEM". Jargon. No founder calls what they need an operating system
- A headline that is a question about a trademark. "Do you know your ScaleupMap Score™?" The visitor has never heard of the score, so the question has no hook. It names the feature, not the problem
- A 3-line paragraph of 38 words doing the job the headline should do ("understand where you stand, what risks to mitigate")
- One CTA, "Score My Startup Free". This is the best element on the page. It is clear, action-first, and says the price
- Four proof bullets under the button in 14px grey. Good content, invisible weight

**Principle check**

| Principle | Status | Evidence |
| --- | --- | --- |
| Who is it for | Fails | "For Founders" tab is the only signal, and it sits in a row with two other audiences |
| What does it do | Fails | Headline names a trademark. Paragraph explains it 3 lines later |
| Why should I care | Partial | "unbiased read is nearly impossible" is a real pain but buried in body text |
| What do I do next | Passes | One clear CTA |
| Proof it works | Partial | Logo strip is below the fold, and it is a cropped carousel so the first logo is cut off |

**The one-line test**

Cover the paragraph and read only the headline. You get "your startup has a score." You do not get "an investor-grade read on your startup in 2 minutes, before you pitch." That second sentence is the product. It is already on the page, split across the eyebrow, the paragraph, and the proof bullets. The rebuild just has to say it once, at the top, in the headline.

---

## 3. Visual design problems

The page is 13,681px tall at desktop width, roughly 15 screens, with 37 clickable elements and no visual system holding it together. It reads as a stack of sections that each won an argument.

**Layout and rhythm**

- 15 screens of scroll for a page whose job is one click. Ideal founder landing pages run 5 to 7 screens (cognitive load, Krug's "don't make me think")
- Every section is a different shape. Full-bleed gradient, then a narrow card, then a wide card, then a bordered card inside a tinted band. No consistent container width, so the eye re-calibrates on every scroll (consistency, Gestalt similarity)
- Section padding is inconsistent. Some sections have 150px of air, the logo strip has almost none, the FAQ card floats inside another card
- The hero has dead vertical space between the proof bullets and the "Trusted by" strip (roughly 150px of nothing, then a decorative three-dot divider)
- Two decorative blobs (a circle bottom left, a tilted square top right of the demo card) float with no purpose. Ornament, not information

**Typography**

- 14 distinct font sizes in use, from 8.4px up to 60px. A tight type scale is 6 to 8 steps. The 8.4px and 10.8px sizes fail readability outright
- Headline colour is inconsistent. The hero is black serif with a blue phrase, the next h2 is all blue serif, the next is black and blue split, then all blue again. Readers learn hierarchy from repetition. Here there is none to learn
- Body text at 20px in the hero drops to 16px, 15px, 14px, 12px in later sections with no rule for which is which
- The trademark line "ScaleupMap Score™ is a trademark of ScaleupMap" appears twice as body copy under headings. That belongs in a footer footnote, not mid-page
- The "Why We Built" section switches to a different sans (looks like system Helvetica) with an underlined bold link. It visibly came from a different template

**Color and contrast**

- Grey proof bullets (#64748b on near-white at 14px) sit right under the primary CTA. The most persuasive four facts on the page are the lowest contrast text in the hero
- Three different blues used as "primary". The navy #3160AE button, the sky #4FBBEA eyebrow, and a mid gradient on the chip buttons. The brand reference allows two, used with intent
- Testimonial and Community sections both use a blue panel. The community one is a heavy saturated gradient while every other section is pastel. It reads as an ad
- Dark grey-to-black gradient overlays on the venture profile carousel and the memo cards. Those are the only dark elements on an otherwise airy page, so they look like loading errors

**Imagery (the stale screenshot problem the brief calls out)**

- 4 product screenshots at 1788px to 1888px wide, shrunk into cards. Text inside them renders at roughly 6px. Unreadable, and they will be wrong the moment the product UI changes
- The venture profile carousel has 10 slides. Nobody clicks through 10 slides of a shareable profile
- The video thumbnail is a grey slide with a Venn diagram and letterboxed black bars top and bottom. It looks like a webinar, not a product
- Two "Interactive Demo" cards are empty grey boxes with a play button until clicked. Empty space promising something is weaker than showing the thing
- The memo and tearsheet "previews" are grey gradient boxes with a faint logo. No preview at all
- Logo carousel in the hero is cropped on both edges (first logo cut to "TES", last to a fragment). Partner logos are the one section that should look flawless
- Logo alt text is "Company 1" through "Company 10". One product screenshot has empty alt. Accessibility fail and a signal of rushed build

**Component consistency**

- 6 different border radii (8, 10, 12, 16, 24, pill). Brand spec says cards rounded-2xl and buttons pill, two values
- Buttons come in navy pill, sky gradient pill, white pill, outlined pill, and the four coloured chips in the profile screenshot (navy, navy, green, teal). Four colours for four actions is a dashboard pattern that leaked onto a marketing page
- Icon tiles are all 48px light blue squares with 1.5px outline icons. On a page this heavy they disappear. Thin icons on thick cards
- Carousel dots appear in three places with three styles (hero divider, testimonial, profile slider)

**Mobile (390px)**

- The three audience tabs stack into a 150px tall block that pushes the headline below the fold. On a phone the visitor sees a nav, three options, and nothing else
- The four proof bullets stack vertically into 4 lines of grey, which is now the tallest text block in the hero
- The testimonial card becomes 14 lines of italic text. Italic at 15px on mobile is the hardest-to-read combination in web type
- Logo carousel still cropped. First visible logo is a lone letter "h"
- Everything is full-width cards with the same padding, so there is no rhythm change between a feature section and a decorative one

---

## 4. Content and story problems

The page has three audiences, four products, two founders, and no narrative. A good landing page is one argument. This one is an inventory.

**No story arc**

- Section order is Hero, Logos, Testimonial, Video, $1.5B stat, Founder OS, Score moves, Profile carousel, How the model works, Demo, CTA, Memos, Why we built, 4 benefit cards, Community, One-pager, Media, Supported by, FAQ, Contact, CTA, Footer. 22 blocks
- The classic arc is Problem, Promise, Proof, How it works, CTA. Here Proof (testimonial) comes before the product is explained, How it works appears twice, and Why we built appears after the second CTA
- "Founder OS" and "Your Score moves" and "See how the model works" and "Investment Memos" are four sections describing the same product from four angles. A new visitor reads them as four products

**Copy problems**

- Headline is feature-first ("Do you know your ScaleupMap Score™?"). Should be outcome-first (what the founder gets)
- "Operating system", "venture intelligence", "institutional grade", "patent-pending model", "dilutive and non-dilutive capital". Investor vocabulary on a page whose selected tab says "For Founders". First-time founders do not know these words
- The trademark symbol appears 9 times in body copy. Every ™ is a speed bump
- The testimonial is 118 words, in italics, from a founder praising how it helps investors. On the founder tab. It argues for the wrong audience
- "$1.5B USD in dilutive and non-dilutive capital accessible through ScaleupMap" is the strongest number on the page and it is buried at screen 3 in a card that looks like a banner ad. Unverifiable as phrased, which hurts trust rather than builds it
- "90% of startups fail. Our mission is to change that." is a strong line sitting under a heading about why they built it, on screen 9. It is a hero line
- The memos section copy "For founders, these memos and tearsheets include risks..." appears unchanged on the Venture Diligence tab. Copy is not swapped per audience, so the tabs are only half real

**Trust and proof placement**

- Logos appear twice (hero carousel of customers, then "Supported by" partners near the bottom). Both are proof. Both should be near the top, once
- Media coverage is two articles about the founder's age and family, not about the product's results. Judges and founders read that as "newsworthy for who built it" not "newsworthy for what it does"
- FAQ has 12 questions, every one about pitch competitions and venture reviews. Zero questions a founder would ask before signing up (what do I need to upload, how long, who sees my data, is the score shared with investors). The FAQ is for a different page
- No numbers that a founder cares about. How many founders scored, average score lift, how many got investor meetings. "Trusted by leading startups" with no count is a claim, not proof

**Audience confusion**

- Nav says Ecosystem Directory, My Dashboard, Founder OS, Pricing, About Us. Only one of five is for a founder who has not signed up
- Three tabs at the top ask the visitor to pick. The URL hash changes but the page keeps the same 22-block layout. The investor tab has a typewriter animation in the hero ("Streamline your: Deal Flow Management|") that the founder tab does not. Different templates, same page

---

## 5. Landing page to onboarding handoff

The landing page promises a score. The sign-up page says "Create Account". The welcome page asks what you are. Three screens, three different framings, and the founder has to hold the thread themselves.

**The actual click path (walked on the live site)**

1. Hero CTA "Score My Startup Free" sends to /signup
2. /signup is a bare card titled "Create Account" with Google or email. No mention of score, startup, founder, or the 2-minute promise. The same nav as the landing page sits on top, so the visitor can wander off to Pricing or Founder OS mid-signup
3. Email path adds first name, last name, password rules, optional photo, then a verification email round-trip before anything useful happens
4. /welcome asks the user to pick Startup, Investor, or Service Provider. The visitor already picked "For Founders" on the landing page. They are asked again (recognition over recall, don't ask twice)
5. /onboarding/founder asks journey stage, goals, team size, how they heard, and a pitch deck upload. Five questions and a file before the score the hero promised
6. /onboarding/founder/complete shows three pillars and asks "where to go first". A fourth decision point

**Where it breaks, by principle**

| Break | Principle | Fix direction |
| --- | --- | --- |
| CTA says "score", next screen says "account" | Message match, scent of information | Sign-up page headline restates the promise. "Get your score. Takes 2 minutes." |
| Full nav on the sign-up page | Enclosed checkout, keep the funnel closed | Strip nav to logo only on /signup and onboarding |
| Role asked twice (landing tab, then /welcome) | Recognition over recall, respect prior input | Carry the landing tab choice through as a URL param or cookie and skip /welcome |
| 5 onboarding questions before any value | Progressive disclosure, time to value | Ask for the deck first, show the score, ask the rest after |
| No progress indicator across signup, verify, welcome, onboarding | Zeigarnik effect, visibility of system status | One step bar from landing CTA to score, 3 steps max |
| Email verification before the score | Friction before value | Let the user see a preview score, verify email to save it |
| "Complete" page asks where to go | Hick's law, paradox of choice | Send them to the one tool their onboarding answers point to (this is Challenge 2's job, the landing rebuild just needs to hand off cleanly) |

**What "one cohesive story" means in practice**

- Same headline promise on the landing page, the sign-up card, and the first onboarding screen
- Same typography and card style across all three (the brand reference already specifies this and the sign-up page already follows it. The landing page is the odd one out)
- The role chosen on the landing page is remembered
- The number of screens between "Score My Startup Free" and seeing a score is the metric. Today it is at least 6. Target 3

---

## 6. Every UI/UX principle it breaks

| Principle | What it says | Where the page breaks it |
| --- | --- | --- |
| Hick's law | More choices, slower decisions | 3 audience tabs, 5 nav links, 37 clickables, 10-slide carousel, "where to go first" page |
| Miller's law | Hold about 7 things in mind | 22 page sections, 14 font sizes, 6 radii |
| Jakob's law | Users expect your site to work like others | "My Dashboard" in a logged-out nav, FAQ about competitions on a founder page |
| Fitts's law | Targets should be big and close | Proof bullets are 14px grey text, carousel arrows are 40px circles at the card edges, profile slider dots are 8px |
| Krug's "don't make me think" | Every screen should be self-evident | Headline requires reading the paragraph to understand it |
| Visual hierarchy | The eye should land on the most important thing first | Hero headline, tabs, and nav compete. Below the fold, every section heading is the same size and weight |
| F-pattern and Z-pattern | Readers scan top-left, across, down | Everything is centre-aligned, so there is no left edge to scan down. 15 screens of centred text |
| Gestalt proximity | Things close together are read as related | Trademark footnotes sit directly under headings, so they read as subtitles |
| Gestalt similarity | Things that look alike are read as the same | Three different "blue panel" treatments, five button styles, three dot styles |
| Consistency and standards | Same thing, same look, everywhere | Font switch in "Why We Built", radius drift, headline colour drift |
| Recognition over recall | Don't make the user remember | Role chosen on landing, asked again on /welcome |
| Progressive disclosure | Show the next thing, not everything | All 4 product surfaces, 2 demos, memos, tearsheets, community, media, FAQ on one page |
| Message match | The click should land where the link promised | "Score My Startup Free" lands on "Create Account" |
| Scent of information | Each step should smell like the goal | Score promise disappears for 4 screens after the CTA |
| Visibility of system status | Show where I am | No step indicator across sign-up, verify, welcome, onboarding |
| Aesthetic-usability effect | Pretty things feel easier | Cropped logos, grey demo boxes, letterboxed video thumbnail all read as broken |
| Cognitive load | Fewer things to process | 118-word italic testimonial, 38-word hero paragraph, 9 trademark symbols |
| Signal to noise | Every element earns its place | Two decorative blobs, three-dot divider, duplicate trademark lines, duplicate logo sections |
| Contrast (WCAG 1.4.3) | Text readable against its background | 14px #64748b proof bullets, 8.4px and 10.8px text in screenshots, white-on-grey carousel captions |
| Accessible names (WCAG 1.1.1) | Images have meaningful alt | "Company 1" through "Company 10", one empty alt |
| Mobile first | Design for the small screen, expand up | Tabs push the headline below the fold on a phone, 4 stacked proof bullets, cropped logos |
| One primary action per screen | A page converts to one thing | Hero CTA competes with Explore Funding, Launch Demo, View Document, View Tearsheet, Join Slack, View One-Pager, Read Article, Watch Video, Contact Us |
| Social proof placement | Proof near the ask | Customer logos below the fold and cropped, partner logos on screen 11, testimonial argues to investors |
| Peak-end rule | People remember the best moment and the last | The last thing before the footer is a 12-question FAQ about pitch competitions |
| Time to value | Show value before asking for effort | Score requires account, verification, role, 5 questions, and a deck upload |
| Stale content risk | Content should not age out | 4 raw product screenshots that break on every UI change (the brief's stated problem) |

---

## 7. What the sponsor actually said

From the Innovation Night kickoff on October 14, 2026 (Granola notes, speaker is the ScaleupMap founder presenting the challenge). These are the words to mirror back in the pitch.

> "our landing page and our overall design, not great in my opinion. It looks pretty like high coded AI kind of thing. There's no authentic taste in the design. The UI needs some work."

> "How about we redesign this landing page to be a little bit more unique, still convey the message of what we're trying to say to the different users. How do we give this a more modern design?"

> "throughout the landing page and the initial onboarding flow of signing up as a founder, how do we make this polished?"

> "there's like screenshots of the product and then AI based symbols of the product, but how do we make maybe symbols that tell a more cohesive design, better designed story than what we kind of have right now."

**What that means for the build, in his language**

- "Authentic taste" is the bar. Not prettier, not more features. Something that looks like a person with opinions designed it. That is the whole reason for borrowing the Laravel Cloud system below rather than inventing one in 3 hours
- "Convey the message to the different users" is the one place he cares about audiences. Founders first, but investors and programs still need a door. A small nav link, not a tab row
- "Polished" covers landing page and the founder sign-up flow as one thing. The handoff section above is in scope, not extra credit
- "Symbols that tell a cohesive story" is his own answer to the stale screenshot problem. He wants a consistent illustration or icon language, not screenshots. That is a direct brief for the imagery choice

Summary notes from the same meeting add that the current design "feels AI-generated, lacks authentic visual identity" and the goal is "modern, polished design that clearly communicates value to different user types." Deliverable can be code, Figma, slides, or recommendations. Key ask is "identify what's broken, then propose a fix with a cohesive design story."

---

## 8. Design direction. Borrow the Laravel Cloud system

Laravel Cloud (cloud.laravel.com) is the reference. One sans, one mono, near-black on white, hairline rules instead of cards, and the product shown as live UI instead of screenshots. Everything below is pulled from their live page on October 14, 2026.

**Fonts**

| Role | Laravel Cloud uses | For ScaleupMap |
| --- | --- | --- |
| Headings and body | Instrument Sans, weight 500 for headings, 400 for body, letter-spacing about -0.02em on h1 | Same. Free on Google Fonts. Drop DM Serif Display entirely |
| Numbers and data | Geist Mono, 12 to 13px | Only for the score number, timestamps, and the three-step sequence. Not for labels. Eyebrows are deleted outright, see section 9 |
| Sizes | h1 60px, h2 40px, body 18px, secondary 16px, labels 12px | Same five sizes plus 14px for meta. Six total, down from fourteen |

**Colour**

| Token | Hex | Use |
| --- | --- | --- |
| Ink | #111113 | Headings, primary button fill, icons |
| Body | #687076 | Paragraphs and secondary text |
| Rule | #E5E7EB | Every border and divider, 1px |
| Surface | #FFFFFF | Page and cards. One background, no tinted bands |
| Accent | #3160AE | ScaleupMap navy, used only for links, the active tab underline, and chart lines. Laravel uses their red the same way, once per screen at most |
| Secondary button | #F1F3F5 fill, ink text | Contact or secondary action |

Two blues become one. The sky #4FBBEA goes away. Gradients go away.

**Spacing (this is the whitespace fix)**

- Base unit 4px. Every margin and padding is a multiple of 8
- Hero padding 128px top, 96px bottom. The headline gets room to breathe
- Section padding 96px top and bottom, separated by a 1px rule, not by background colour changes
- Heading to paragraph 24px. Paragraph to buttons 40px. Buttons to the next element 80px
- Card padding 32px. Grid gap 24px
- Max content width 1280px with a visible 1px vertical rule at each edge, the way Laravel draws its page gutters. That one detail is what makes it feel intentional

**Shape and surfaces**

- Border radius 6px on buttons and inputs, 8px on cards. Two values. No pills
- Buttons are ink fill with white text, 40px tall, 16px text, arrow icon on the primary. Secondary is a 1px rule outline
- Cards are a 1px rule, no shadow, no gradient, no tinted fill
- Logo strip is a bordered row of equal cells, logos in black, with the caption in the first cell ("Teams like these don't manage infrastructure" becomes "Founders at these companies scored first")
- Section numbering in mono down the left ("1 DEPLOY", "2 RUN") is the single most borrowable idea. For ScaleupMap it becomes "1 UPLOAD", "2 SCORE", "3 CLOSE THE GAPS". This passes the impeccable ban on numbered sections only because the order is the information. Use it on the how-it-works block and nowhere else

**How Laravel shows the product without screenshots**

- The hero shows a real rendered dashboard component built in HTML, not a PNG. It can never go stale because it is the same code as the app
- Below that, each feature is a small live widget (a log stream, a metrics chart, a CLI transcript) rendered in the page
- For ScaleupMap the equivalent is one rendered score card in the hero. Venture name, a score number, three gap chips, and a "re-scored" timestamp. Pure HTML and CSS, brand navy on the score only
- This answers the sponsor's "symbols that tell a cohesive story" and the brief's stale screenshot complaint in one move

**What not to copy**

- Laravel's dark footer and dark marketing banner. ScaleupMap stays light end to end
- The 7-second countdown banner at the top. Noise
- The 20-testimonial marquee. One founder quote, 30 words, is enough for a hackathon demo
- Laravel's 6px and 8px radii. Impeccable's floor says cards sit at 12 to 16px and pills are for small controls only. Daniel pinned Laravel, and the skill says the brief wins, so 6 and 8 stay. Just know it is a deliberate call

---

## 9. Craft floor. The impeccable principles the rebuild enforces

Pulled from Paul Bakaus's open source impeccable skill (github.com/pbakaus/impeccable, craft-floor, critique, layout, typeset, onboard, distill references). This is the section to hand a teammate and say "every one of these is a test, not a vibe."

**Mode**

Impeccable classifies every surface by what visitor success looks like. A landing page is Persuade. The visitor decides and acts, so design is the product. The rule for Persuade is that the opening must do three things. Make the offer intelligible and desirable. Expose a clear action in its working form (for ScaleupMap that is the deck upload, not a link to a page with the upload on it). Demonstrate something only this product can prove (the rendered score card).

**Nielsen heuristic score of the current page (0 to 4 each)**

Scored the way the critique command scores. Heuristic 7 is n/a on a landing page, heuristic 9 was not exercised because no account was created, so the maximum is 32.

| # | Heuristic | Score | Key issue on scaleupmap.com |
| --- | --- | --- | --- |
| 1 | Visibility of system status | 2 | Active tab and carousel dots exist. No step indicator across sign-up, verify, welcome, onboarding |
| 2 | Match system and real world | 1 | "Operating system", "dilutive", "institutional grade", "venture intelligence", 9 trademark symbols |
| 3 | User control and freedom | 3 | Nothing traps the visitor. Demos are click-gated, carousels have arrows |
| 4 | Consistency and standards | 1 | 14 font sizes, 6 radii, 5 button styles, a font switch mid-page, headline colour flips |
| 5 | Error prevention | 2 | Password rules are stated on sign-up. Nothing else to prevent |
| 6 | Recognition rather than recall | 1 | Role chosen on landing, asked again on /welcome. "My Dashboard" for a stranger |
| 7 | Flexibility and efficiency | n/a | Persuade surface |
| 8 | Aesthetic and minimalist design | 1 | 22 sections, 37 clickables, two blobs, duplicate logo rows, duplicate trademark lines |
| 9 | Error recovery | n/a | Not exercised |
| 10 | Help and documentation | 1 | FAQ exists but all 12 questions are about pitch competitions |
| | Total | 12/32 | 37%, Poor. Major overhaul band |

**Cognitive load checklist (8 items, the critique command's own list)**

Impeccable uses Cowan's revision of Miller. Working memory holds about 4 items, not 7. Every decision point with more than 4 visible options is a failure.

| Check | Current page | Rebuild rule |
| --- | --- | --- |
| Single focus | Fails. 9 CTAs compete with the hero button | One primary action per screen. Everything else is a text link or lives on another page |
| Chunking, 4 or fewer per group | Fails. 12 FAQ items, 10 carousel slides, 5 nav links | No group over 4. Three steps, three outcomes, one quote |
| Grouping by proximity | Fails. Trademark lines sit under headings and read as subtitles | Proximity before containers. More space above a heading than below it |
| Visual hierarchy | Fails. Every h2 is the same size and weight, all centred | Squint test. Primary, secondary, groups visible with the page blurred |
| One thing at a time | Fails. Nav, tab row, eyebrow, headline, paragraph all at once above the fold | Hero is headline, one sentence, one button, one rendered score card |
| Minimal choices, 4 or fewer | Fails. First decision point offers 5 nav links plus 3 tabs plus a button, 9 options | Nav is 3 links plus the CTA |
| Working memory | Fails. Role is remembered by the user, not the system, between landing and /welcome | Carry role through the URL. Never ask twice |
| Progressive disclosure | Fails. All 4 product surfaces, 2 demos, memos, community, media, FAQ on one page | Reveal the next thing only. Memos and tearsheet appear after the score, inside the product |

Eight of eight failed. Impeccable's scale says 4 or more is critical.

**The craft floor. Checks on the built result**

These are measured on the rendered page, together, in one batched inspection at desktop and mobile. Not intentions.

| Check | Floor | Current page | Rebuild |
| --- | --- | --- | --- |
| Contrast | Body and placeholder 4.5:1, large text 3:1. Secondary text on a coloured surface is tinted from that hue, never grey | 14px #64748b proof bullets, white captions on grey gradients | Ink on white only. Secondary #687076 passes at 16px and up |
| Spacing | Tight groups, generous separation, more space above a heading than below. Read the computed values | 150px of dead air in the hero, then a crammed testimonial card | 8px scale, 96px between sections, 24px heading to body, 48px above every h2 and 16px below |
| Type | Body measure 65 to 75ch, display max 6rem, tracking floor -0.04em (-0.02 to -0.03 reads better), balanced headings, obvious scale steps | 38-word hero paragraph at 20px runs 90ch wide. 14 sizes, no obvious steps | Instrument Sans, 6 sizes, h1 at 60px with -0.02em, body 18px at 65ch max, text-wrap balance on headings |
| Depth | Declare elevation once, border or shadow. A 1px border under a soft shadow is the ghost card | Ghost cards everywhere. Shadows plus borders plus gradients on the same element | 1px rule, no shadow. Cards at Laravel's 8px radius |
| Motion | One authored moment with exponential ease-out from a visible default. Never the same fade-in on every section | Typewriter animation in the investor hero, carousels auto-advancing | One moment. The score number counts up once on load. Nothing else moves |
| States | Hover, disabled, loading, error, empty, keyboard focus | Not themed. Default focus rings | Every button has hover, focus-visible, and disabled styled from the palette |
| Browser surfaces | Selection colour, caret, focus ring, underline offset, tabular numerals all themed. "The cheapest signal a page was built rather than assembled" | Browser defaults throughout | ::selection in navy tint, focus ring in navy, font-variant-numeric tabular-nums on the score |
| Copy | The product's own language. Controls name their action | "Score My Startup Free" is good. "Launch Demo", "View Document", "Learn More About Us" are not | Every button says what happens. "Upload your deck", "See a sample score" |
| Coverage | Every brief requirement present and findable in seconds | Investors and programs have tabs, founders have no clear path to the score | Founder path is the page. Investors and programs are one nav link each |

**Absolute bans (the Refuse list). Where the current site does each one**

Impeccable calls these the category's defaults, reached for when nobody was deciding. The current page hits ten of fourteen.

| Ban | Current site | Rebuild |
| --- | --- | --- |
| Same-size cards of icon plus heading plus text as page structure. Nested cards are always wrong | Three cards under "Score moves", four under "Why we built", the FAQ card inside a card inside a tinted band | No card grids. Outcomes are a single column of heading plus sentence, separated by rules |
| Hero-metric template, big number plus small label plus accent | The "$1.5B USD" gradient tile | Gone. The number can live in a sentence if it is sourced |
| Eyebrow or kicker above a heading. This one is a ban, no brief earns it back | "A COMPLETE FOUNDER OPERATING SYSTEM", "BUILT FOR THE LONG GAME", "INSTITUTIONAL GRADE" | Deleted. Headings carry their own weight. This overrides my earlier Laravel note about mono eyebrows |
| Section numbers unless the sequence itself is information | Not used today | Allowed only on "1 UPLOAD, 2 SCORE, 3 CLOSE THE GAPS" because order is the point |
| Gradient text | "ScaleupMap Score" in the hero headline is a flat blue, not a gradient. Pass | Keep passing |
| Glass and blur as decoration | Backdrop blur on the sticky tab row | Solid white with a 1px rule |
| Coloured side-stripe borders over 1px | Not seen | Keep it that way |
| Hard offset shadows | Not seen | Keep it that way |
| Sparklines, progress rings, rounded rectangles standing in for content | Empty grey "Interactive Demo" boxes, grey gradient memo "previews" | Real rendered score card or nothing |
| Monospace as a costume for "technical" | Not used today | Geist Mono only on the score number, timestamps, and the step sequence. Never on labels |
| System display face as the display voice | "Why We Built" falls back to Helvetica | Self-hosted Instrument Sans with size-adjust fallback so nothing flashes |
| Unicode glyphs or emoji as icons | Not seen. Lucide-style outline icons are used | Keep one icon library, one stroke weight, and make the stroke heavier than 1.5px |
| Geometric masks standing in for photo cut-outs | Not seen | n/a |
| Light or dark picked by category habit | Light, which is right for a founder reading on a laptop in daylight | Stay light. Laravel's dark footer is not borrowed |

**Persona red flags (the three impeccable assigns to landing pages)**

- Jordan, confused first-timer. Hesitates at the three audience tabs because none of them says "startup". Reads "operating system" and assumes it is software to install. Clicks Score My Startup Free, lands on Create Account, and is not sure it is the same product. Abandons at /welcome when asked to pick a role again
- Riley, stress tester. Clicks the investor tab and finds the founder memo copy unchanged. Opens the logo carousel and sees "TES" and a lone "h". Tabs through the page and gets default blue focus rings on navy buttons. Notes that "Interactive Demo" is a static box
- Casey, distracted mobile user. Sees a nav, three stacked tabs, and no headline on first paint. Scrolls past four grey proof bullets. The primary CTA is at the top of the screen, out of the thumb zone, and there is no sticky CTA at the bottom. Leaves mid-scroll and nothing is preserved

**Design specificity verdict (the critique command's first question)**

Could an unrelated product use this page unchanged? Yes. Swap the logo and "ScaleupMap Score" for any B2B SaaS and nothing breaks. Centred headline over subcopy over button, row of equal cards below, gradient CTA panel, logo strip, FAQ accordion. Impeccable names this exact skeleton as "the template whatever world paints it." That is the technical definition of what the sponsor called "no authentic taste."

**Onboarding principles that apply to the handoff**

- Onboarding's job is not to teach the product. It is to get people to the moment that proves the product is worth their time. For ScaleupMap that moment is seeing a score with three named gaps
- Show, don't tell. Real functionality in onboarding, not a tutorial mode. The deck upload is the first screen, not the fifth
- Minimal required information, collect more later. Journey stage, team size, and how they heard can all be asked after the score
- Progress indication, step 1 of 3. Never more than 3
- Never force users through long onboarding before they can use the product. The five-question form before a score is the exact pattern on the never list

**Distill rules for the page cut**

- One primary user goal. Get a score
- One font family, 3 to 4 sizes in practice, 2 to 3 weights
- 1 to 2 colours plus neutrals, not 5 to 7
- Cards are not needed for layout. Use spacing and alignment
- Pick left or centre alignment and stick with it. Laravel is left-aligned. The current site is centred everywhere, which is why nothing has a scan line
- Cut every sentence in half, then do it again
- No headers restating intros, no repeated explanations, say it once. The trademark line and the "how the model works" copy both fail this

---

## 10. Prioritized fix list

In order. Each one is something a judge can see in the demo.

1. **Headline says the outcome, for the founder, in one line.** Something in the shape of "See your startup the way investors do, in 2 minutes." No eyebrow. The audience is named inside the headline or the first sentence
2. **Kill the audience tab row.** Founders are the priority. Investors and programs get a small text link in the nav ("For investors") that goes to their own page. One page, one audience
3. **Nav drops to 3 items plus the CTA.** How it works, Pricing, Sign in. Remove "My Dashboard" and "Ecosystem Directory" for logged-out visitors
4. **Proof bullets become a proof bar.** Same four facts, 16px, dark text, with weighty icons. They are the strongest trust content on the page, so they should look like it
5. **Replace every product screenshot with something that cannot go stale.** Options, in order of effort. A live score widget pulling a demo venture from the API. An animated SVG of the score moving as milestones land. A short illustrated flow of deck in, score out, gaps named. Any of these also scores Innovation points
6. **Cut the page to 6 screens.** Hero and proof bar. Problem (90% fail, investors see what you miss). How it works in 3 numbered steps. What you get (score, gaps, memo) as a single left-aligned column separated by rules, not a card grid. One testimonial from a founder about founder outcomes. Final CTA. Everything else (FAQ, media, community, one-pager, demos) moves to its own page or the footer
7. **One type scale, one radius pair, one accent.** Instrument Sans for everything, Geist Mono for labels, 6 sizes, 6px and 8px radii, ink buttons, navy only for links and the score. Full token table in section 8
8. **Sign-up page restates the promise and closes the funnel.** Headline "Get your score. Takes 2 minutes." Logo only, no nav. Step indicator "1 of 3"
9. **Carry the founder choice through.** The landing CTA links to /signup?role=founder so /welcome is skipped. This is the cheapest cohesion win in the whole flow
10. **Fix the small broken things that read as slop.** Uncropped logo strip, real alt text, trademark line once in the footer, no decorative blobs, testimonial trimmed to 30 words and set upright

**What to show the judges**

- Before and after of the hero side by side, same viewport
- The click from hero CTA to sign-up to first onboarding screen, counting screens out loud
- One slide with the principle table above, with the 10 fixes mapped to the principles they repair

---

Sources. Live site at scaleupmap.com, the /signup page, the hackathon package (platform reference and judging rubric), cloud.laravel.com rendered at 1440px, the Innovation Night kickoff notes in Granola (October 14, 2026), and the impeccable skill source at github.com/pbakaus/impeccable (craft-floor, critique, layout, typeset, onboard, distill, mode-persuade). Measurements taken from the rendered DOM at 1440px.
