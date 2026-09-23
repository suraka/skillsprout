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

Implementation adds `/learning/number-garden` as a guest-only draft with four fixed steps: count five stable seed objects once each, compare groups of three and four, add one to two, and take one away from four. Wrong answers give count-again/recovery prompts. Its local manifest explicitly blocks publication pending qualified review. No database, feature API, Firebase, cookie, localStorage or sessionStorage writes are added.

Local verification after the change:

- `pnpm test:runtime`: PASS, 26 total runtime tests including five Number Garden cases for one-to-one duplicate prevention, fixed count, comparison key, bounded changes and draft review blockers.
- `pnpm exec tsc --noEmit`: PASS.
- Focused ESLint for the new route, component, runtime and tests: PASS. Existing whole-site lint findings in the legacy Explore page are outside this focused result.
- `pnpm build`: PASS; production route list includes `/learning/number-garden`.
- `pnpm exec playwright test --grep EDU-MB`: BLOCKED before browser assertions; local Chromium executable is missing. Three cases `EDU-MB00…02` are authored, but this local run is not evidence they pass. Run them in GitHub Chromium CI before claiming browser behavior verified.

Human review is NOT TESTED: qualified early-math content reviewer, English locale/numeral narration decision, safety/assets, accessibility/screen-reader, real-device and consenting family checks remain open. EDU-M2 is PARTIAL; this one draft is not the three reviewed units required by the blueprint. No proficiency claim or migration was made.
