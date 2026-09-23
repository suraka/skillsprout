# Number Garden — early mathematics draft

**Status: DRAFT / NOT APPROVED FOR PUBLICATION**  
**Activity:** `math-number-garden-001`, version 1  
**Language:** English text; exact locale and number narration are pending qualified review  
**Evidence:** guest practice held only in the current page visit; never treated as mastery

## Scope

This first slice covers a short progression from one-to-one counting to comparing two visible amounts, then adding one and taking one away. It uses fixed quantities from zero to five. It is a working guest preview, not the three reviewed units required for EDU-M2.

| Draft step | Intended practice | Fixed interaction |
|---|---|---|
| Count | Touch each distinct illustrated seed once, then choose the numeral for the set. | Five stable objects; repeat taps do not increase the count; wrong numeral can be retried. |
| Compare | Identify which visible group has more. | Groups of three and four; fixed correct answer with count-again recovery. |
| Add one | Observe the change from two objects to three. | One explicit Add button changes the visible set; choose the resulting amount. |
| Take one away | Observe the change from four objects to three. | One explicit Take Away button changes the visible set; choose the amount left. |

Every answer key and quantity is deterministic. The adult may read the exact on-screen question and numeral labels aloud. No supplied recording, built-in speech, external media, generated exercises, timer, score, streak, account or learner identifier is used. The fixed text and visuals are not yet checked for a particular English locale.

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

No qualified mathematics, language, accessibility, safety or family reviewer has approved this version. The recap says only that a learner practiced during this visit; it does not infer durable number knowledge.
