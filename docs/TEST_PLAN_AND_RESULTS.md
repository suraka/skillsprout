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
