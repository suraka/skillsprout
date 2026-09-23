# Number Garden — early mathematics draft

**Status: DRAFT / NOT APPROVED FOR PUBLICATION**  
**Activity:** `math-number-garden-001`, version 7
**Language:** English; completion of the English-locale review is reported by the product owner
**Evidence:** guest practice held only in the current page visit; never treated as mastery

## Scope

This draft is organized as three short number-sense lessons: count a group; notice zero and number order; compare groups. It uses fixed quantities from zero to five. Optional MATH-02 practice follows the path: join two groups, split five in more than one valid way, add one, and take one away. Version 5 added compose/decompose interactions, which the user has reviewed and approved. Version 6 added optional MATH-03 equal-groups, array, and equal-sharing previews. Version 7 adds a small MATH-04 preview for tens/ones and fractions represented by equal parts; both MATH-03 and MATH-04 prompts still need review. Decimals, percent, and the wider MATH-04 objectives are not covered. All work remains a draft and does not complete MATH-05…06.

| Draft step | Intended practice | Fixed interaction |
|---|---|---|
| Count | Touch each distinct illustrated seed once, then choose the numeral for the set. | Five stable objects; repeat taps do not increase the count; wrong numeral can be retried. |
| Zero | Match an empty garden to zero. | Empty set with explicit zero choice and fixed distractors. |
| Number order | Select the numeral after three. | Visible zero-to-five number path; choose the next numeral with retry feedback. |
| Compare | Identify which visible group has more. | Groups of three and four; fixed correct answer with count-again recovery. |
| Compose | Join groups of two and three. | Count both fixed groups or count on; choose the total with retry feedback. |
| Decompose | Split five into two groups. | Accepts both 1+4 and 2+3; rejects a pair that does not total five. |
| Place value | Build 14 from one ten and four ones. | Fixed bundle and four singles; choose 14 with retry feedback. |
| Fractions | Identify two of four equal parts and accept the equivalent fraction 1/2. | Four equal-size square parts with two shaded; fixed choices and retry feedback. |
| Equal groups | Count three groups of two. | Fixed groups; choose the total with retry feedback. |
| Array | Read a two-row array with three seeds in each row. | Fixed array; choose the total with retry feedback. |
| Equal sharing | Share six seeds equally between two beds. | Fixed whole-number sharing; choose the amount in each bed with retry feedback. |
| Add one | Observe the change from two objects to three. | One explicit Add button changes the visible set; choose the resulting amount. |
| Take one away | Observe the change from four objects to three. | One explicit Take Away button changes the visible set; choose the amount left. |

Every answer key and quantity is deterministic. The adult may read the exact on-screen question and numeral labels aloud. No supplied recording, built-in speech, external media, generated exercises, timer, score, streak, account or learner identifier is used. The compose/decompose prompts were approved by the user. MATH-03 group, array, and sharing prompts and the new MATH-04 tens/ones and fraction prompts are optional draft practice and still need review.

## Guest privacy and function

The activity uses local React page state only. It makes no feature-specific API calls and writes no cookie, local storage or session storage. Pause, Home, Restart and Finish work within the loaded route. Finish clears the visit state. The optional offline prompt asks an adult and learner to count safe nearby objects; it does not ask them to upload a result.

This guest-only scope needs no Firebase authentication, backend endpoint or database migration. A later saved-learning version would need an authorized guardian relationship, reviewed consent and retention rules, server-verified activity version and evidence contract, and family-isolation tests before any learner evidence is written.

## Review gates before publication

- Qualified early-mathematics reviewer checks the objectives, quantity language, progression, recovery prompts and age/ability fit.
- Reviewer selects the locale and checks number words/numeral labels. If narration is later added, every spoken prompt and label must be checked against the exact written content.
- Accessibility reviewer checks semantic labels, keyboard and touch task completion, zoom/reflow, color-independent meaning and screen-reader feedback.
- Safety and asset reviewer approves the offline prompt and original illustrations.
- Test with consenting adults/families and real devices; record browser, device and observed results. Automated tests are not human review.
- Add the remaining reviewed number-path units for MATH-01 through MATH-06 only as their own usable, tested slices. This draft does not complete EDU-M2.

The product owner reports that all reviews of the prior Number Garden content are complete and satisfactory. The MATH-02 compose/decompose prompts in version 7 were authored after that review and remain draft. Reviewer identities, findings, formal sign-off records, and real-device/family review notes were not provided for this repository, so the manifest remains draft. The recap says only that a learner practiced during this visit; it does not infer durable number knowledge.
