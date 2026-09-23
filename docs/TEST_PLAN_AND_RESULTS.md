# Verification record — 23 September 2026

Baseline: frontend typecheck/build passed; backend 4 SQLite tests with mocked Firebase and ruff passed. Existing main PostgreSQL CI and public live health/catalog evidence are linked in ROADMAP_AND_FEATURE_STATUS.md.

Before workspace maintenance: 10 new runtime tests, TypeScript, targeted ESLint and production build passed. Local browser checks were BLOCKED by invalid/truncated Chromium download archives. A later retry also encountered a stale dev lock. No browser screenshot, complete interaction verification, real-device or family study was produced. Those results apply to the earlier local copy; restored-code results and subsequent CI browser verification are recorded below.

## Reproduce

`pnpm install --frozen-lockfile`; `pnpm test:runtime`; `pnpm exec tsc --noEmit`; `pnpm build`.
Browser test command and dependency are recorded alongside the restored test suite. No browser test is passed merely because it exists.
Backend: `uv sync --frozen --group dev`; `uv run pytest -q`; `uv run ruff check app tests`. Never use production TEST_DATABASE_URL: fixtures DROP ALL TABLES. Mock identity tests do not prove real Firebase login.

## Release gates

M1 is a rules simulator preview, not trained AI, a reviewed course or saved learning. Real keyboard/touch/screen-reader, actual contrast/reflow, slow-network/device and consenting-family tests remain NOT TESTED until evidence is recorded. Firebase staging, deployed revision/backups/restore remain unverified. No production changes or deployment claimed.

## Restored-code verification (rerun)

- `pnpm test:runtime`: PASS, all 10 SG-R01…10 tests.
- `pnpm exec tsc --noEmit`: PASS.
- Targeted ESLint for new runtime/editor/route: PASS; later includes browser tests/config.
- `pnpm build`: PASS; `/demo/sorting-garden` and original routes included.
- Backend: 4 pytest tests PASS; ruff PASS; application source unchanged.
- First restored remote checkpoint f0ed7af6f03b9de2ff3879a7a4ab662181c683d4: [GitHub CI 35787547554](https://github.com/suraka/skillsprout/actions/runs/35787547554) passed existing typecheck/build workflow. This run predates the added browser CI gate and does NOT prove browser behavior.
- Browser SG-B01…06 and REG-B01: PASS in Chromium CI after the fix described below. Coverage: counterexample/repair/history, error/recovery, keyboard/pause/step, network/storage/reset, offline/mobile, first interaction after slow loading, and legacy catalog/enrollment/completion. Local browser installation remains blocked; CI provided the actual execution evidence.

Browser reproduction: `pnpm exec playwright install --with-deps chromium`, then `pnpm test:browser`. Config starts localhost:5173 with synthetic sample mode; no real accounts. Playwright 1.63.0 is pinned as a dev dependency. Existing unrelated transitive version retained.

## Browser failure investigation — 23 September

The first actual Chromium run [35788156044](https://github.com/suraka/skillsprout/actions/runs/35788156044), at `eaecada2a70608189daf4295eb76555947097973`, failed all five guest tests; REG-B01 passed. Browser installation itself succeeded in CI. The diagnostic run [35824632342](https://github.com/suraka/skillsprout/actions/runs/35824632342) reproduced the failures and captured page state: the first click had no effect, while early sample/reorder edits were lost and subsequent runs used the unchanged starter. No runtime exception explained those four cases. Going offline before hydration also interrupted page initialization.

Fix `78845d0d7a948ea4bf6ae0a0e8961f2d3f8332ae` keeps all program buttons, selects and dragging disabled until React is ready to handle events. The page announces loading and includes a no-JavaScript alternative. SG-B06 holds JavaScript requests, checks disabled controls, releases loading, then verifies the first sample edit and Run. Keyboard and offline tests wait for enabled controls rather than treating server-rendered HTML as a ready application. No arbitrary sleep or retries were added to hide failures. CI retains failure traces for seven days; tests use only synthetic local state.

Verified result: [CI 35824919320](https://github.com/suraka/skillsprout/actions/runs/35824919320), fix commit `78845d0d7a948ea4bf6ae0a0e8961f2d3f8332ae`, completed successfully. TypeScript, all 10 runtime tests, all 7 browser tests (39.7 seconds including server startup), and production build passed. Inspected job `107064458052` logs contain no captured browser exceptions. Browser tests run against the local development server; production output is build-checked, not a deployed-browser verification. Targeted lint and TypeScript also passed locally after the fix.

Backend PostgreSQL [CI 35787871190](https://github.com/suraka/skillsprout-backend/actions/runs/35787871190) passed at the unchanged documentation-only backend head `79a4987e700a4cf8afa68338b9512a3e7754b78a`.

## Remaining release review checklist

These are separate from automated Chromium emulation and are NOT complete:

- [ ] Physical touch device and lower-end-device check: edit/reorder without dragging, run/pause/step, recover from invalid order, and finish; record device, browser, viewport and observed latency.
- [ ] Screen-reader and keyboard review: named controls, logical focus order, stage announcements, errors and the end-of-session screen; record assistive technology and defects.
- [ ] Visual review at narrow viewport and increased text/zoom, including text/focus contrast and controls; preserve screenshots and actual measurements.
- [ ] Qualified educator review of the counterexample, age framing, simulation disclosure and offline prompt; record reviewer, version and decision.
- [ ] Consenting adult-assisted family usability session using synthetic cards only; verify understanding of the rule, repair and privacy/finish controls. Do not collect raw child interactions or claim mastery.
- [ ] Before saved family features: real Firebase staging sign-in/refresh/logout and authorization, deployment/migration provenance, backup/restore, consent and retention decisions.

Until these gates are satisfied, M1 remains a guest preview under review. Phase 1B follows verified Phase 1; Phase 1C requires a reviewed content outline. Never mark these reviews complete from automated tests.


## Phase 1B — Rainbow Habitat (23 September)

Implementation is on the frontend draft branch at `suraka/skillsprout`. The first code-only CI run [35826492509](https://github.com/suraka/skillsprout/actions/runs/35826492509) found that some controls could be activated before React hydration. The second run [35826900642](https://github.com/suraka/skillsprout/actions/runs/35826900642) verified the readiness guard; 10 of 11 browser tests passed, while the mobile/offline test exposed that Pause also hid Home. Run [35827327223](https://github.com/suraka/skillsprout/actions/runs/35827327223) confirmed that Home must work offline inside the loaded experience instead of depending on a route request; it still found a control-layout defect: Pause hid Home. Fix commit `5d04ecf79589ce678ca83789a1ac662b9dc11fb1` keeps Resume, Home and grownup navigation visible while paused. The resulting [CI 35827629569](https://github.com/suraka/skillsprout/actions/runs/35827629569) passed all steps; all 11 Chromium browser tests passed (40.1 seconds).

Four runtime tests (LE-RH01…04) cover uniqueness of the correct answer across 2/3/4 choices and optional color, deterministic rounds and rejected invalid settings. Four browser tests (LE-B01…04) cover the truthful one-live-card hub, matching/retry/keyboard/finish, adult settings, transient state, mobile/reduced-motion and navigating Home to the playbook and back while offline. Existing Sorting Garden and lesson regression tests continue in the same browser suite. The first two CI runs showed the intended test sensitivity: hydration and navigation defects caused failures, which were corrected rather than weakening expectations.

The app shows original inline SVG shapes/patterns, large semantic buttons with text labels, text prompt replay, color-independent matching by default, optional color matching, adult controls for choice count/sound/motion/high contrast, a three-turn finite activity, pause/resume/Home/finish, and an offline household-object discussion. Sound defaults off; when selected it uses a brief synthesized tone following a correct tap. There is no spoken narration. The hub has one playable card and three noninteractive “Coming soon” cards. There is no score, timer, tracking, storage, learner profile, network API, database, authentication or third-party asset fetch in the guest activity. Therefore no backend or schema work applies to this Phase 1B slice.

Verified on `5d04ecf79589ce678ca83789a1ac662b9dc11fb1`: [CI 35827629569](https://github.com/suraka/skillsprout/actions/runs/35827629569) passed TypeScript, all 14 runtime tests, all 11 browser tests and production build. The local build also passed after the Pause/Home adjustment; targeted ESLint passed before that final JSX-only adjustment. Local Chromium installation is unavailable; CI is the browser execution environment.

Still NOT TESTED: physical toddler-targeted touch, device performance, assistive technology/screen readers, actual contrast measurements, qualified early-years scope/usability, and consenting adult-assisted family use. Automated semantic/keyboard checks do not replace these reviews. Guest ages 2–4 are an adult-assisted proposal, not an approved suitability claim.

## Phase 1C — Foundational literacy draft

The English-language guest preview at /learning/letters-and-sounds contains three sequenced activities: identify a shared initial sound (LIT-01), connect the first sound in moon/apple/top to m/a/t (LIT-02/03), and arrange those taught letters to build mat (LIT-04). The outcome graph and the draft activity manifest publication gate are in lib/literacy/foundation.ts. An optional local device voice is used only when the browser reports an installed local English voice; otherwise an adult can say the words. The voice is not a reviewed recording. Original inline SVG choices have text labels.

Guest practice state and the grown-up recap exist only in page memory and clear on exit/reset. The activity makes no API request and writes no cookies, localStorage or sessionStorage. No lesson content, child identity or evidence is sent to the backend. Therefore this no-account preview needs no auth, backend endpoint or database migration; those become necessary only for a later authorized saved-learning feature.

New tests: EDU-L01…07 runtime tests check unique deterministic answers, fixed grapheme keys, exact decoding, prerequisite ordering, transient non-mastery evidence, graph validity and draft publication blockers. EDU-B00…05 browser tests cover the Explore link, no API/storage from the activity, retry/recovery, all three lessons, word construction, pause/Home, keyboard and narrow/offline use.

Local verification on the literacy draft worktree:

- pnpm install --frozen-lockfile: PASS; lockfile was unchanged.
- pnpm test:runtime: PASS, 21 tests total (10 Sorting Garden, 4 Rainbow Habitat, 7 literacy).
- pnpm exec tsc --noEmit: PASS.
- Targeted ESLint for literacy UI, route, runtime and browser tests: PASS.
- pnpm build: PASS; route /learning/letters-and-sounds is present in production build output.
- pnpm test:browser: BLOCKED before application assertions because this workspace does not have Playwright's Chromium executable. Trace error reports missing chromium_headless_shell; this does not count as a browser-test failure or pass. The current CI run must execute EDU-B00…05.

First GitHub Actions execution: [CI 35831757105](https://github.com/suraka/skillsprout/actions/runs/35831757105) on draft commit de661db4f7964dadfecefa45899eec927f747e48 passed frozen install, TypeScript and all 21 runtime tests. Chromium installed successfully; 16 of 17 browser tests passed. EDU-B05 tried to focus and press Enter before its start button became enabled, so the test remained on the overview. The failure was in test readiness; the route and remaining interaction cases passed. The test now waits for the button to be enabled before keyboard input.

Verified rerun: [CI 35832187899](https://github.com/suraka/skillsprout/actions/runs/35832187899), PR #1, completed successfully for commit `41c6acdb625b8fe54b6c439c95560f135b70a891`. Frozen install, TypeScript, all 21 runtime tests, all 17 Chromium browser tests, and production build passed. The build includes `/learning/letters-and-sounds`. This is automated browser evidence only; manual human review remains pending.

Release status remains PARTIAL / BLOCKED FOR RELEASE. No qualified literacy, locale/pronunciation, asset, accessibility, safety or family reviewer has approved these exact content versions. Native-speaker pronunciation, physical-device operation, screen-reader review, real contrast/zoom, low-end-device performance and consenting-family usability are NOT TESTED. Current task answer records are activity practice, not verified proficiency or durable learning.

## EDU-M2 first mathematics draft — Number Garden

Implementation adds `/learning/number-garden` as a guest-only draft. Version 10 retains user-reviewed MATH-02, MATH-03 and MATH-04 prompts, including decimals, percent and fraction number-line comparison. It adds an initial MATH-05 2D-shape and on-screen length-comparison preview; these new prompts remain draft pending review. No database, feature API, Firebase, cookie, localStorage or sessionStorage writes are added.

Local verification after the change:

- `pnpm test:runtime`: PASS, 26 total runtime tests including five Number Garden cases for one-to-one duplicate prevention, fixed count, comparison key, bounded changes and draft review blockers.
- `pnpm exec tsc --noEmit`: PASS.
- Focused ESLint for the new route, component, runtime and tests: PASS. Existing whole-site lint findings in the legacy Explore page are outside this focused result.
- `pnpm build`: PASS; production route list includes `/learning/number-garden`.
- Local `pnpm exec playwright test --grep EDU-MB`: BLOCKED before browser assertions because this workspace lacks Playwright's Chromium executable. GitHub CI provides the browser execution evidence below.

CI follow-up: the first full run exposed two real gaps. The server-rendered start button could receive a click before hydration attached its handler, and the root family provider made an unnecessary `/api/config` request on this guest route. The start control now remains disabled until client hydration is ready, and the route bypasses the account/catalog provider. CI also caught a duplicate Resume control in the paused state, which was removed. Follow-up CI passed all 20 browser tests. Version 2 adds zero and number-order challenges with deterministic retry checks.

Verified version 2: [Frontend checks 35844395876](https://github.com/suraka/skillsprout/actions/runs/35844395876), commit `0936a51aacc62c35b8efe78a2f142996670d0255`, passed frozen install, TypeScript, all 27 runtime tests, all 20 Chromium browser tests, and production build. The expanded browser test follows counting/cardinality through zero, number order, comparison, addition and subtraction, including wrong-answer recovery. Guest-only network and storage assertions still pass. All content remains explicitly draft pending qualified review.

Verified final rerun: [Frontend checks 35841877262](https://github.com/suraka/skillsprout/actions/runs/35841877262), commit `56c5722000659e7c4d71fe44da1e0e4a25f8adc5`, passed frozen install, TypeScript, all 26 runtime tests, all 20 Chromium browser tests, and production build. Browser assertions confirmed the full activity/recovery flow, offline pause/resume, no API or external requests, no browser-storage writes, and mobile-width fit. Earlier failed runs exposed the issues above; they are resolved by this verified head.

The user reports reviewing and approving the MATH-02 prompts. Newly added MATH-03 prompts need review. The PR remains draft as instructed. Reviewer identities, findings and formal sign-off records were not provided for the repository.

Verified version 3 grouping: [Frontend checks 35849147816](https://github.com/suraka/skillsprout/actions/runs/35849147816), commit `8f6065b0f13f1db1329e3dbaa03b01a113a923bd`, passed frozen install, TypeScript, all 27 runtime tests, all 20 Chromium browser tests, and production build. Browser coverage checked the three-lesson completion boundary, optional number-change practice, wrong-answer recovery, offline pause/resume, no API/external requests, no storage writes and mobile-width fit. EDU-M2 remains partial, not a reviewed three-unit course.

Verified version 5 MATH-02 draft: [Frontend checks 35866977777](https://github.com/suraka/skillsprout/actions/runs/35866977777), commit `655b1a678bfd2655e80e8cb344b262d384d7566d`, passed frozen install, TypeScript, all 28 runtime tests, all 20 Chromium browser tests and production build. Browser coverage tested compose answer recovery, a valid split of five, existing add/take practice and guest privacy checks. Runtime coverage confirms both 1+4 and 2+3 are accepted and an invalid sum is rejected. The new MATH-02 prompts remain draft pending review.

The user approved MATH-02 and reports reviewing MATH-03 and MATH-04 prompts, including fraction number-line comparison. New version 10 MATH-05 shape and screen-measure prompts remain draft until reviewed. This repository does not contain formal review records. EDU-M2 is PARTIAL; this activity is not the complete sequence required by the blueprint. No proficiency claim or migration was made.


Verified version 6 MATH-03 draft: [Frontend checks 35871683522](https://github.com/suraka/skillsprout/actions/runs/35871683522), commit `7a60b53fab05ef3cab7c85376942c17b5bad3dbb`, passed frozen install, TypeScript, all 30 runtime tests, all 21 Chromium browser tests, and production build. Browser EDU-MB03 tested wrong-answer recovery and successful completion for equal groups, the 2×3 array, and sharing six seeds between two beds.

Verified version 7 MATH-04 draft: [Frontend checks 35874071554](https://github.com/suraka/skillsprout/actions/runs/35874071554), commit `c114416345c796177a7bf09d3350f69bc897ded3`, passed TypeScript, all 32 runtime tests, all 22 Chromium browser tests, and production build. The place-value example forms 14 from one ten and four ones; the fraction visual is divided into four equal-size parts and accepts both 2/4 and 1/2. This is a partial MATH-04 preview; decimals and percent are outside this slice.

Verified version 8 MATH-04 decimal/percent extension: [Frontend checks 35884632920](https://github.com/suraka/skillsprout/actions/runs/35884632920), commit `c4c0f33afebddd89bbc8510597d488b24483adbb`, passed TypeScript, all 34 runtime tests, all 23 Chromium browser tests, and production build. The ten equal cells model five tenths; the number line marks 0.5 midway between zero and one; a second prompt connects five of ten parts to 50%. An earlier browser run failed because its test selected 40%, which was not one of the fixed answer choices; the test now uses the offered 20% wrong answer and passed.

Verified version 9 MATH-04 number-line comparison: [Frontend checks 35886656831](https://github.com/suraka/skillsprout/actions/runs/35886656831), commit `b4f1f7d5ee95476d462789c6101816ddc106280f`, passed TypeScript, all 35 runtime tests, all 24 Chromium browser tests, and production build. The learner compares 1/4 and 3/4 on an equally spaced 0-to-1 line and retries after a wrong selection.

Verified version 10 MATH-05 preview: results will be recorded after GitHub CI completes. Coverage identifies a triangle by three straight sides and compares fixed 3-unit/5-unit bars; the UI labels these as screen units and says they are not a calibrated ruler. This is a small slice only; 3D geometry and mass, volume, time and money measures remain unimplemented.
