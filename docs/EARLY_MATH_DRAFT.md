# Number Garden — early mathematics draft

**Status: DRAFT / NOT APPROVED FOR PUBLICATION**  
**Activity:** `math-number-garden-001`, version 16
**Language:** English; completion of the English-locale review is reported by the product owner
**Evidence:** guest practice held only in the current page visit; never treated as mastery

## Scope

This draft is organized as three short number-sense lessons: count a group; notice zero and number order; compare groups. It uses fixed quantities from zero to five. Optional MATH-02 practice follows the path: join two groups, split five in more than one valid way, add one, and take one away. Version 5 added compose/decompose interactions, which the user has reviewed and approved. Version 6 added optional MATH-03 equal-groups, array, and equal-sharing previews. Version 7 added a small MATH-04 preview for tens/ones and fractions represented by equal parts; the user reports reviewing and approving the MATH-03 and initial MATH-04 prompts. Version 8 added a ten-part model connecting 5/10, 0.5, and 50%, which the user reports reviewing. Version 9 added a fraction-comparison preview on a 0-to-1 number line, which the user reports reviewing. Version 10 added an initial MATH-05 2D-shape and on-screen-length preview, which the user reports reviewing. Version 11 adds a sphere and a unit-cube volume preview, which the user reports reviewing. Version 12 adds an exact-hour clock-reading prompt, which the user reports reviewing. Version 13 adds a balance comparison using identical unit weights, which the user reports reviewing. Version 14 adds a make-believe token-value addition prompt, which the user reports reviewing. Version 15 adds a comparison of two pretend purses, which the user reports reviewing. The user also reports reviewing planned real-currency and further MATH-05 prompt materials; those lessons are not yet implemented in this code. Version 16 adds a made-up-data table-reading prompt for MATH-06; it needs review. Further mass/time measurement remains unfinished. All work remains a draft and does not complete MATH-06.

| Draft step | Intended practice | Fixed interaction |
|---|---|---|
| Count | Touch each distinct illustrated seed once, then choose the numeral for the set. | Five stable objects; repeat taps do not increase the count; wrong numeral can be retried. |
| Zero | Match an empty garden to zero. | Empty set with explicit zero choice and fixed distractors. |
| Number order | Select the numeral after three. | Visible zero-to-five number path; choose the next numeral with retry feedback. |
| Compare | Identify which visible group has more. | Groups of three and four; fixed correct answer with count-again recovery. |
| Compose | Join groups of two and three. | Count both fixed groups or count on; choose the total with retry feedback. |
| Decompose | Split five into two groups. | Accepts both 1+4 and 2+3; rejects a pair that does not total five. |
| 3D solid and volume | Identify a sphere and count unit cubes in two layers of a box. | Fixed cube/sphere/cylinder drawings and two labeled 2×2 cube layers with retry. |
| 2D shape | Identify a triangle by its three straight sides. | Fixed triangle, square, and circle choices with retry. |
| Length comparison | Compare two strips made of equal screen units. | Aligned bars of 3 and 5 units; explicitly not a real ruler. |
| Fraction comparison | Compare one quarter and three quarters by position on a number line from zero to one. | Fixed quarter marks and retry feedback. |
| Tenths and decimal | Match five shaded tenths to 0.5 and locate it midway from zero to one. | Ten equal cells and labeled number line; retry feedback. |
| Percent | Match the same five of ten parts to 50%. | Reuses the same ten-cell bar; retry feedback. |
| Place value | Build 14 from one ten and four ones. | Fixed bundle and four singles; choose 14 with retry feedback. |
| Fractions | Identify two of four equal parts and accept the equivalent fraction 1/2. | Four equal-size square parts with two shaded; fixed choices and retry feedback. |
| Equal groups | Count three groups of two. | Fixed groups; choose the total with retry feedback. |
| Array | Read a two-row array with three seeds in each row. | Fixed array; choose the total with retry feedback. |
| Equal sharing | Share six seeds equally between two beds. | Fixed whole-number sharing; choose the amount in each bed with retry feedback. |
| Add one | Observe the change from two objects to three. | One explicit Add button changes the visible set; choose the resulting amount. |
| Take one away | Observe the change from four objects to three. | One explicit Take Away button changes the visible set; choose the amount left. |

Every answer key and quantity is deterministic. The adult may read the exact on-screen question and numeral labels aloud. No supplied recording, built-in speech, external media, generated exercises, timer, score, streak, account or learner identifier is used. The compose/decompose prompts were approved by the user. The user reports approval of the MATH-03 and initial MATH-04 tens/ones and fraction prompts. The user reports reviewing MATH-03 and MATH-04 prompts, including the fraction number-line comparison, and MATH-05 prompts through version 15, including the balance, pretend-token, and pretend-purse prompts. The user also reports reviewing planned real-currency and further MATH-05 lesson materials; those lessons still need implementation. The new version 16 data-reading prompt needs review. These optional activities remain draft practice; real-currency recognition and broader measurement topics still need separate implementation.

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

The product owner reports reviewing Number Garden prompts through version 15. The user approved the MATH-02 compose/decompose prompts. The user reports reviewing version 13 mass-comparison. The user reports reviewing the version 14 pretend-token and version 15 pretend-purse prompts, plus planned real-currency and further MATH-05 materials. Version 16 data-reading prompt needs review. Reviewer identities, findings, formal sign-off records, and real-device/family review notes were not provided for this repository, so the manifest remains draft. The recap says only that a learner practiced during this visit; it does not infer durable number knowledge.

Version 14 MATH-05 adds a fixed 2-point plus 1-point make-believe token example. It is explicitly not real money, prices or local currency. This is a simple value-total exercise, not a complete money curriculum.

Version 15 adds two accessible pretend purses. One contains 2+1 points and the other 1+1 points; the learner chooses the purse with more. The example uses fixed make-believe points, not money, prices or local currency. The user reports reviewing this comparison.

Version 15 passed TypeScript, 43 runtime tests, 30 Chromium browser tests and production build in GitHub CI run 35909835744. This automated verification does not count as a content review; the user reports reviewing this prompt.

Version 16 adds a small MATH-06 Data Detective preview using made-up counts (bean bed 4, sunflower bed 2, basil bed 3). Learners use a semantic table to identify the largest value. It makes no claim about real plant growth. The content needs review. The reported review of future real-currency/further MATH-05 material does not mean that content has been implemented in this guest activity.

Version 16 passed TypeScript, 44 runtime tests, 31 Chromium browser tests and production build in GitHub CI run 35911395609. Automated checks do not count as a content review; the MATH-06 prompt still needs review.
