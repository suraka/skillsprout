# Number Garden — early mathematics draft

**Status: DRAFT / NOT APPROVED FOR PUBLICATION**  
**Activity:** `math-number-garden-001`, version 18
**Language:** English; the currency example is specifically labeled for Ghana (`en-GH`), not offered as a universal currency lesson.
**Evidence:** guest practice held only in the current page visit; never treated as mastery

## Scope

This draft keeps the original three MATH-01 lessons and optional MATH-02 through MATH-06 previews. MATH-05 includes shape and screen-unit length, solids and unit-cube volume, exact-hour time, balance mass comparison, reviewed-source Ghana cedi prompts, and a further unit-cube volume comparison. MATH-06 now has a draft sequence: read a made-up table, build a bar chart from it, check a claim against the data, extend a repeating shape pattern, and choose its symbolic rule. The user reports reviewing the source prompts for the Ghana-currency and further MATH-05 lessons. The new MATH-06 chart, claim, and rule wording needs review. This is not the complete MATH-05 or MATH-06 curriculum; all activity content stays a draft.

| Draft step | Intended practice | Fixed interaction |
|---|---|---|
| Count | Touch each distinct illustrated seed once, then choose the numeral for the set. | Five stable objects; repeat taps do not increase the count; wrong numeral can be retried. |
| Zero | Match an empty garden to zero. | Empty set with explicit zero choice and fixed distractors. |
| Number order | Select the numeral after three. | Visible zero-to-five number path; choose the next numeral with retry feedback. |
| Compare | Identify which visible group has more. | Groups of three and four; fixed correct answer with count-again recovery. |
| Compose | Join groups of two and three. | Count both fixed groups or count on; choose the total with retry feedback. |
| Decompose | Split five into two groups. | Accepts both 1+4 and 2+3; rejects a pair that does not total five. |
| 3D solid and volume | Identify a sphere and count unit cubes in two layers of a box. | Fixed cube/sphere/cylinder drawings and two labeled 2×2 cube layers with retry. |
| Volume comparison | Compare 2×2×1 and 2×2×2 unit-cube models. | Drawn box models labeled by dimensions; retry feedback. |
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
| Ghana cedi values | Match GH¢2 to 200 pesewas and add GH¢1 plus 50 pesewas. | Text-only labels; totals are represented in integer pesewas; no price or purchase. |
| Data chart and claim | Build bars for three invented counts, then check which bed has the most. | Fixed data, text-labelled keyboard controls and semantic table; no real-world inference. |
| Pattern rule | Extend the alternating circle/triangle pattern and choose its repeating rule. | Fixed sequence and bounded choices with retry. |
| Add one | Observe the change from two objects to three. | One explicit Add button changes the visible set; choose the resulting amount. |
| Take one away | Observe the change from four objects to three. | One explicit Take Away button changes the visible set; choose the amount left. |

Every answer key and quantity is deterministic. Adult read-aloud is optional; no audio, timer, score, streak, account, learner identifier, or persistence is used. The user reports reviewing the source prompts for the Ghana-currency and further MATH-05 lessons. Version 18 implements two text-only Ghana cedi activities and another drawn unit-cube comparison. No child is asked to handle cash or buy anything. The new MATH-06 chart-building, claim-checking, and rule-choice wording is not recorded as user-reviewed. The page remains a draft.

## Guest privacy and function

The activity uses local React page state only. It makes no feature-specific API calls and writes no cookie, local storage or session storage. Pause, Home, Restart and Finish work within the loaded route. Finish clears the visit state. The optional offline prompt asks an adult and learner to count safe nearby objects; it does not ask them to upload a result.

This guest-only scope needs no Firebase authentication, backend endpoint or database migration. A later saved-learning version would need an authorized guardian relationship, reviewed consent and retention rules, server-verified activity version and evidence contract, and family-isolation tests before any learner evidence is written.

## Review gates before publication

- Qualified early-mathematics reviewer checks the objectives, quantity language, progression, recovery prompts and age/ability fit.
- Reviewer selects the locale and checks number words/numeral labels. If narration is later added, every spoken prompt and label must be checked against the exact written content.
- Accessibility reviewer checks semantic labels, keyboard and touch task completion, zoom/reflow, color-independent meaning and screen-reader feedback.
- Safety and asset reviewer approves the offline prompt and original illustrations.
- Test with consenting adults/families and real devices; record browser, device and observed results. Automated tests are not human review.
- Complete remaining MATH-05 geometry and transformation, calibrated measurement, time and mass outcomes, and the suitable MATH-06 chance, ratio and algebra outcomes as separate reviewed slices. This draft does not complete EDU-M2.
- Complete local browser verification when a Playwright Chromium executable is available. This workspace run could not start any browser tests because the required executable was missing; GitHub CI is the browser verification gate.

The user reports reviewing Number Garden prompts through version 17 and the source prompts for Ghana-currency and further MATH-05 lessons. Version 18 implements those MATH-05 areas as text-only coin-value exercises and a unit-cube volume comparison. The user has not separately reviewed the version 18 presentation in this repository. Reviewer identities, findings, and formal sign-off records are not attached; the manifest remains draft. Version 18 MATH-06 chart, claim-check, and rule-choice prompts need review.

Version 14 MATH-05 adds a fixed 2-point plus 1-point make-believe token example. It is explicitly not real money, prices or local currency. This is a simple value-total exercise, not a complete money curriculum.

Version 15 adds two accessible pretend purses. One contains 2+1 points and the other 1+1 points; the learner chooses the purse with more. The example uses fixed make-believe points, not money, prices or local currency. The user reports reviewing this comparison.

Version 15 passed TypeScript, 43 runtime tests, 30 Chromium browser tests and production build in GitHub CI run 35909835744. This automated verification does not count as a content review; the user reports reviewing this prompt.

Version 16 adds a small MATH-06 Data Detective preview using made-up counts (bean bed 4, sunflower bed 2, basil bed 3). Learners use a semantic table to identify the largest value. It makes no claim about real plant growth. The user reports reviewing this prompt. The reported review of future real-currency/further MATH-05 material does not mean that content has been implemented in this guest activity.

Version 16 passed TypeScript, 44 runtime tests, 31 Chromium browser tests and production build in GitHub CI run 35911395609.


Version 17 adds one bounded MATH-06 pattern prompt: circle, triangle, circle, triangle, circle, then choose the next shape. Semantic text labels accompany each shape; square is a distractor. The user reports reviewing this prompt. GitHub CI [Frontend CI 35920333504](https://github.com/suraka/skillsprout/actions/runs/35920333504) passed frozen install, TypeScript, all 45 runtime tests, all 32 Chromium browser tests, and production build. The Cloudflare bot still reports an older build for commit fb9b6cc0; no production deployment for version 17 is verified.

## Version 18 additions

MATH-05 Ghana cedi: identify that a GH¢2 coin represents 200 pesewas, then add GH¢1 and 50 pesewas to make GH¢1.50. Coin values are integer pesewas in the evaluator to avoid decimal rounding. The screen uses text labels only, makes no price or exchange-rate claim, and does not ask a learner to handle cash. The Bank of Ghana states that one cedi is divided into 100 pesewas and its 2026 public notice identifies GH¢1, GH¢2, and pesewa coins as issued currency. See [Bank of Ghana Act, section 37](https://www.bog.gov.gh/wp-content/uploads/2019/09/banking-and-financial-laws-of-ghana-1998-2006.pdf) and [Bank of Ghana notice on Ghana cedi coins](https://www.bog.gov.gh/wp-content/uploads/2026/07/Notice-No.23-BOG-SEC-GOV-2026-REJECTION-OF-GHANA-CEDI-COINS.pdf).

MATH-05 volume comparison: compare drawn boxes sized 2×2×1 and 2×2×2 unit cubes. The labels explicitly describe a model, not a real container measurement.

MATH-06 sequence: after reading the made-up sprout table, set each bar to 4, 2, and 3; decide whether the claim “sunflower bed has the most sprouts” is supported; extend the circle/triangle sequence; and choose the rule “circle, triangle, repeat.” The bar controls have text alternatives and keyboard operation. The data remain invented. The MATH-06 additions in this version need content review. This completes the current Data Detective/Pattern Lab draft path, not every advanced MATH-06 outcome such as chance, ratios, or algebra.

GitHub CI [Frontend checks 35924065190](https://github.com/suraka/skillsprout/actions/runs/35924065190), commit `6131a8fa3093b860fae1ead7593ef416e49be71c`, passed frozen install, TypeScript, all 50 runtime tests, all 35 Chromium browser tests, and production build. The first v18 CI attempt exposed two browser-test assertion/locator issues; those were corrected and the follow-up run passed. The local browser suite remains unavailable because this workspace lacks its Playwright Chromium executable.
