# SkillSprout v2.3 implementation roadmap and continuity checklist

Updated 2026-09-23. Authority: attached SkillSprout-2.3.md, preserved at MASTER_BLUEPRINT.md.
Canonical shared docs: suraka/skillsprout. Backend implementation stays in suraka/skillsprout-backend.

## Audit baseline

Frontend main: 0048e13092e1e2d78809c2194c7fe469143c975d.
Backend main: 1c6e8339ba9973c1da3b559ef5bd66cb4e892159.
Both source trees, current migration, configs, UI, services and tests inspected. No AGENTS.md existed in either tree.

Before changes: frontend TypeScript/build passed; backend Python 3.12.14 tests: 4 passed (SQLite, mocked Firebase); ruff passed. Existing frontend CI [35618539302](https://github.com/suraka/skillsprout/actions/runs/35618539302) and backend PostgreSQL CI [35455581581](https://github.com/suraka/skillsprout-backend/actions/runs/35455581581) succeeded at those exact baseline commits.

Live read-only Railway health, readiness and catalog returned HTTP 200: six courses / 18 lessons. Domain home returned 200; curl public config confirmed Railway API origin and configured public Firebase key (no key values recorded). Python config request returned 403. This does not verify real Firebase sign-in. Production source SHA, migration revision, logs, backups/restore and authenticated flows remain UNVERIFIED. No production writes were performed.

## Requirement matrix

Implemented means source functionality exists; verified scope is separately stated. PARTIAL means requirements remain unmet. MISSING means absent from inspected source. NOT TESTED and BLOCKED never mean success.

| Requirements | Baseline status | Evidence / gap | Dependency and safe next step |
|---|---|---|---|
| FND-01 §9 frontend | Implemented; build verified | package.json, vite.config.ts, scripts, hosting identity | Preserve React/Vinext/Cloudflare pipeline. |
| FND-02 §9 backend | Implemented; readiness verified | app/main.py, db.py; FastAPI/SQLAlchemy/PostgreSQL | Preserve Python 3.12 and existing API. |
| FND-03 §10 migrations/operations | PARTIAL | initial 675e3ce72cc5, PostgreSQL CI | Verify deployed revision/backups before additive migrations. |
| AUTH-01 Firebase and roles | PARTIAL | lib/academy.ts; security.py verifies revoked tokens, DB roles | Real sign-in/refresh/logout staging tests needed. |
| AUTH-02 guardian identity/consent | PARTIAL | linked learners and signup checkbox; no consent ledger | Reviewed server consent, retention and shared-device boundaries. |
| AUTH-03 family isolation | Implemented for current routes; mocked-auth tests passed | repositories.py filters parent_student_links | Extend equivalent checks to project/evidence APIs. |
| CAT-01 course catalog/reader | PARTIAL | six sample courses, 18 text/offline activity lessons; live count verified | Preserve IDs. Not the interactive flagship course. |
| LEARN-01 actual learning evidence | PARTIAL; important gap | provider.complete and services.update_progress accept client completed=100 | Preserve historical rows as self-reported; add versioned rubric/evidence checks. |
| PARENT-01 work samples/next steps | PARTIAL | parent screen shows completion counts | Requires actual project artifacts and evidence. |
| ADMIN-01 reviewed publication | PARTIAL | CRUD/text validation exists; no immutable review/runtime gate | Add versioned human review, assets and verifier gate. |
| AI-01 §4/12 guest Sorting Garden | MISSING at baseline | no editor or runtime | First implementation below. |
| AI-02 private projects/revisions | MISSING | no project tables/routes | Complete authorized save/reopen/conflict slice in Phase 2. |
| AI-03 actual local classifier | MISSING | no training/inference runtime | Synthetic training/held-out tests/counterexamples in Phase 3. |
| COURSE-01 Sorting Garden 5–8 lessons/capstone | MISSING | no authored flagship sequence | Human curriculum review + runnable activities/evidence. |
| LE-01…10 Little Explorers | PARTIAL (Phase 1B slice built; reviews pending) | Rainbow Habitat guest game and offline Grownup Playbook; only one live hub card | Complete each additional activity separately; qualified early-years, family, physical-device and accessibility review before release. |
| EDU-M0 curriculum foundation | PARTIAL | English draft scope, stable LIT-01…04 IDs, acyclic prerequisites and draft-gated activity manifests added; locale and expert reviews pending. | Qualified reviewer approves exact English locale, scope/sequence, media and activity versions before publication. |
| EDU-M1 / LIT-01…07 | PARTIAL | Three local-only draft activities now run at /learning/letters-and-sounds, linked from Explore with a draft label; automated checks cover sound choices, letter keys, word construction and transient practice records. | Recordings, qualified review, manual assistive/device/family testing and review approval remain open; never report proficiency. |
| EDU-M2 / MATH-01…06 | PARTIAL | Number Garden prompts through version 11 are user-reported reviewed; version 12 adds a draft exact-hour clock-reading prompt. No saved learner evidence or backend calls. | Review the version 12 time prompt; extend the remaining mass/time/money measurement and 3D geometry, then build MATH-06. Formal review records are not attached. |
| EDU-M3 / SCI-* | MISSING | no reviewed science activity | One safe observation/prediction unit, honest simulation label. |
| EDU-M4 §19 pathways/parent evidence | MISSING | no subject/outcome/prerequisite graph | Reuse existing lesson IDs; immutable versions, DAG checks, authorized placement. |
| EDU-M5 WORLD/ART/LOGIC/DIGITAL/LIFE/LANG | PARTIAL only legacy digital/art text lessons; new scope MISSING | no broad reviewed interactive curricula | Each subject released separately after review/runtime tests. |
| EDU-M6 cross-subject invention | MISSING | no distinct ability-level variants | Depends on verified subject and AI slices. |
| UX §3 age modes/design system | PARTIAL | common responsive green brand, SVG, UI primitives | Distinct ability-aware worlds and measurable accessibility. |
| UX-AGE/ACC/VIS/PERF | NOT TESTED fully | no device/family/assistive-tech evidence | Actual keyboard/touch/contrast/reflow/performance checks. |
| SCHOOL §8 | MISSING | no classrooms/teacher permissions | Separate school authority and assignment/evidence slice. |
| AI-SAFE §11 remote AI | Safely absent; integration MISSING | model name reserved only | Keep disabled pending vendor/privacy/safety/cost reviews. |
| BILL §9/13 | MISSING; paid enrollment safely rejected | services.enroll returns 409 on paid course | Provider eligibility; adult-only checkout + idempotent webhook entitlement. |
| RIGHTS §11 | MISSING | no retention/export/deletion/consent routes | Authorized data-rights workflows before saved-family release. |
| OPS §12/13 | PARTIAL | CI/Docker/Railway readiness and migration config | Verify staging provenance, real auth, recovery and monitoring. |
| DOC §14 | MISSING at baseline | legacy README/spec only | This canonical checklist and exact continuation references. |

## Roadmap, in dependency order

1. **M0 audit (PARTIAL operational evidence):** source/baselines/public endpoints inspected; real auth/deployment provenance/backups still unverified.
2. **M1 Phase 1 Sorting Garden (BUILT; release PARTIAL):** original ordered colored blocks, synthetic cards, bounded rules interpreter, actual stage/trace, wrong-rule repair, Run/Pause/Step, undo/redo, clear/reset/finish, accessible non-drag controls. Browser-local guest only. No auth/API/DB changes apply per §§10/12/15. Seven Chromium browser tests and the production build passed at the fix commit below. Human/physical-device release gates remain open.
3. **M1B Phase 1B (implemented; automated checks passed, human review pending):** one local Rainbow Habitat, adult-selected 2/3/4 choices and sound/motion/contrast options, repeatable text prompt, pause/resume/home, three calm matching turns, finish, transient offline playbook, one live hub card, and three clearly marked coming-soon cards. No storage or backend requests. [CI 35827629569](https://github.com/suraka/skillsprout/actions/runs/35827629569) passed TypeScript, 14 runtime tests, all 11 browser tests and build. Early-years/accessibility/device/family reviews remain separate release gates.
4. **M1C / EDU-M0/M1 (PARTIAL; blocked for release):** English selected for the draft; added an original three-activity sound→letter→word preview, a clearly labeled link from Explore, an acyclic outcome graph, publication-gated manifests, adult/offline guidance and transient grown-up recap. On commit `9c004be8306ed725db6f2138f3287a4df73d19a1`, [CI 35832509706](https://github.com/suraka/skillsprout/actions/runs/35832509706) passed frozen install, TypeScript, all 21 runtime tests, all 17 Chromium browser tests and production build. See FOUNDATIONAL_CURRICULUM.md and TEST_PLAN_AND_RESULTS.md. Qualified literacy/pronunciation/accessibility/safety review, reviewed locale and audio choice, and actual device/screen-reader/family checks remain required before publication. No curriculum outcome is marked approved.
5. **EDU-M2 mathematics (PARTIAL; draft only):** Number Garden's three MATH-01 lessons cover count, zero/order and comparison. Optional MATH-02 practice joins and splits groups and adds/takes one; the user approved its prompts. Version 6 added draft MATH-03 equal groups, arrays, and equal sharing. Version 7 added a small MATH-04 preview for tens/ones and fractions. The user reports reviewing MATH-03 and MATH-04 prompts, including decimal/percent and number-line comparison. Version 10 added the 2D-shape and screen-length preview, which the user reports reviewing. The user also reports reviewing version 11's sphere and unit-cube volume preview. Version 12 adds an exact-hour clock-reading draft prompt that needs review. Mass, money and further 3D outcomes, plus MATH-06, remain outstanding. Keep the whole activity in draft.
6. **M2 saved family learning (PLANNED):** reviewed consent/retention/account boundaries; additive project/revision/evidence schema; API + authenticated UI + authorization + conflict/idempotency tests; complete reviewed first course and private parent Invention Cards. Preserve legacy self-reported completion provenance.
7. **M3 actual AI loop (PLANNED):** local tiny classifier, held-out tests, counterexamples/retraining, honest uncertainty, capstone and lower-end benchmark.
8. **M3B / EDU-M3…4 (PLANNED):** reviewed science slice and versioned pathway graph; existing lesson references; explainable next step and authorized placement.
9. **M4 (PLANNED):** second full course, classroom pilot, reusable licensed assets and supported code bridge.
10. **M5 (PLANNED):** approved bounded generative AI, adult commerce, authoring/support/monitoring/backups; do not defer privacy foundations to this phase.
11. **M6 / EDU-M5…6 (PLANNED):** broader subjects/languages/variants after individual review and runtime validation. No decorative catalogs or unmoderated sharing.

## Checklist and continuation

- [x] Read authoritative specification and audit both existing repositories.
- [x] Record baseline references, public deployment checks and evidence-based gaps.
- [x] Produce roadmap before implementation; preserve production data and main branches.
- [x] Implement guest demo runtime/editor and regression/browser test definitions.
- [x] Execute restored-version runtime/typecheck/build/backend checks and record actual results.
- [x] Execute complete Chromium browser suite in CI: SG-B01…06 and REG-B01 passed (7/7); fix first-interaction hydration loss and add a slow-loading regression.
- [x] Save code/docs via connected GitHub app and create both draft PRs; first checkpoint CI passed.
- [x] Rainbow Habitat code and deterministic runtime/browser tests added; frontend CI [35827629569](https://github.com/suraka/skillsprout/actions/runs/35827629569) passed on `5d04ecf79589ce678ca83789a1ac662b9dc11fb1` (14 runtime cases, 11 browser tests, TypeScript and production build).
- [ ] Qualified early-years, accessibility/screen-reader, physical-device and adult-assisted family reviews for Phase 1B. Real Firebase staging remains unverified.
- [x] Select English as the draft literacy language and record three linked LIT-01…04 outcomes.
- [x] Implement the local-only draft activities, guest privacy assertions, deterministic outcome checks, and temporary grown-up recap.
- [x] Run local runtime tests, TypeScript, focused ESLint, and production build; record the local Chromium blocker.
- [x] Run and record the literacy browser suite in GitHub CI: all 17 Chromium tests passed in run [35832509706](https://github.com/suraka/skillsprout/actions/runs/35832509706), commit `9c004be8306ed725db6f2138f3287a4df73d19a1`.
- [ ] Qualified literacy and pronunciation review, locale choice, reviewed media decision, age/ability/safety review, assistive-technology/device checks and consenting family review for Phase 1C.
- [x] Implement a first local-only Number Garden draft for one-to-one counting, comparing, adding one and taking one away; deterministic answer-key and duplicate-tap tests pass.
- [x] Run the full runtime suite (27 cases), TypeScript, focused ESLint and production build with `/learning/number-garden` included.
- [x] Run EDU-MB00…02 in GitHub Chromium CI: all 20 browser tests passed in run [35841877262](https://github.com/suraka/skillsprout/actions/runs/35841877262), commit `56c5722000659e7c4d71fe44da1e0e4a25f8adc5`.
- [x] Record user report that all Number Garden reviews are complete and satisfactory; retain draft status because reviewer records are not included here and merge/publication needs separate authorization.
- [x] Record the user's report that the Number Garden v2 reviews are complete; review records are not attached and the activity remains draft.
- [x] Add a draft MATH-02 compose/decompose interaction that accepts more than one valid split; verify deterministic answers and recovery.
- [x] Verify MATH-02 draft extension in GitHub CI: [run 35866977777](https://github.com/suraka/skillsprout/actions/runs/35866977777), 28 runtime tests, 20 Chromium browser tests, TypeScript and production build passed on `655b1a678bfd2655e80e8cb344b262d384d7566d`.
- [x] Record user approval of the MATH-02 prompts.
- [x] Add draft MATH-03 equal-groups, array, and equal-sharing previews with runtime and browser coverage.
- [x] Add a small draft MATH-04 preview for place value and equal fractions; runtime and browser coverage added.
- [x] Record the user report that MATH-03 and initial MATH-04 prompts were reviewed.
- [x] Add a draft MATH-04 ten-parts preview connecting 5/10, 0.5, and 50%, with runtime and browser recovery tests.
- [x] Verify version 8 MATH-04 decimal/percent extension in GitHub CI: [run 35884632920](https://github.com/suraka/skillsprout/actions/runs/35884632920), 34 runtime tests, 23 Chromium browser tests, TypeScript and production build passed on `c4c0f33afebddd89bbc8510597d488b24483adbb`.
- [x] Record the user report that the MATH-04 decimal, percent, and fraction-number-line prompts were reviewed.
- [x] Add a draft fraction comparison on a number line with runtime and browser recovery coverage.
- [x] Verify version 9 MATH-04 number-line comparison in GitHub CI: [run 35886656831](https://github.com/suraka/skillsprout/actions/runs/35886656831), 35 runtime tests, 24 Chromium browser tests, TypeScript and production build passed on `b4f1f7d5ee95476d462789c6101816ddc106280f`.
- [x] Record user approval of the MATH-04 fraction number-line prompt.
- [x] Add an initial MATH-05 2D-shape and screen-unit length preview with runtime/browser tests.
- [x] Verify version 10 MATH-05 preview in GitHub CI: [run 35890202123](https://github.com/suraka/skillsprout/actions/runs/35890202123), 37 runtime tests, 25 Chromium browser tests, TypeScript and production build passed on `ca70676adeda23cf9c8758566601b2742adba3cb`.
- [x] Record the user report that the MATH-05 2D-shape and screen-length prompts were reviewed.
- [x] Record the user report that the MATH-05 solid-shape and unit-cube volume prompts were reviewed.
- [x] Add a short draft MATH-05 time-reading prompt with bounded exact-hour choices and wrong-answer recovery.
- [x] Verify version 12 MATH-05 time preview in GitHub CI: [run 35902117313](https://github.com/suraka/skillsprout/actions/runs/35902117313), 40 runtime tests, 27 Chromium browser tests, TypeScript and production build passed.
- [ ] Review the version 12 exact-hour clock prompt.
- [x] Add a draft sphere and unit-cube volume preview with runtime/browser coverage.
- [x] Record the user report that the MATH-05 solid/volume prompts were reviewed.
- [ ] Extend mass/time/money measures and 3D geometry, then build MATH-06 as a separate tested slice.
- [x] Verify version 6 MATH-03 draft in GitHub CI: [run 35871683522](https://github.com/suraka/skillsprout/actions/runs/35871683522), 30 runtime tests, 21 Chromium browser tests, TypeScript and production build passed on `7a60b53fab05ef3cab7c85376942c17b5bad3dbb`.
- [x] Verify version 7 MATH-04 draft in GitHub CI: [run 35874071554](https://github.com/suraka/skillsprout/actions/runs/35874071554), 32 runtime tests, 22 Chromium browser tests, TypeScript and production build passed on `c114416345c796177a7bf09d3350f69bc897ded3`.
- [x] Extend Number Garden with zero and number-order draft challenges and deterministic answer checks; [CI 35844395876](https://github.com/suraka/skillsprout/actions/runs/35844395876) passed all 27 runtime tests, 20 Chromium browser tests, TypeScript and production build on `0936a51aacc62c35b8efe78a2f142996670d0255`.
- [x] Group Number Garden into three number lessons with clearly optional number-change practice; [CI 35849147816](https://github.com/suraka/skillsprout/actions/runs/35849147816) passed all 27 runtime tests, 20 Chromium browser tests, TypeScript and production build on `8f6065b0f13f1db1329e3dbaa03b01a113a923bd`.

Continue by reading this checklist, MASTER_BLUEPRINT.md, FOUNDATIONAL_CURRICULUM.md, EARLY_MATH_DRAFT.md and TEST_PLAN_AND_RESULTS.md. Number Garden content through version 11 is reported reviewed by the product owner; future math prompts need review. Other early-years and literacy slices still have their own review gates. Next math work is the remaining MATH-05 measurement objectives, then MATH-06. Existing lesson evidence remains untouched; no migration was run.

Recovery note: workspace maintenance removed the first local implementation before terminal push could authenticate. Original local-only commits cfbf875/7f50b70 were NOT pushed and are not delivery references. This restored version is being checked again and saved through the connected GitHub app. Never claim the first tests certify changed restored code without rerunning.

## Verified delivery references

- Frontend [draft PR 1](https://github.com/suraka/skillsprout/pull/1), first restored commit `f0ed7af6f03b9de2ff3879a7a4ab662181c683d4`; checkpoint typecheck/build CI passed. Follow-up test/checklist commits are on the same branch.
- Backend [draft PR 1](https://github.com/suraka/skillsprout-backend/pull/1), documentation-only commit `79a4987e700a4cf8afa68338b9512a3e7754b78a`.
- Restored local checks rerun: 10 runtime tests, TypeScript, targeted lint, frontend build; backend 4 tests and lint passed.
- No merges, production deployments, database migrations or published curriculum outcomes.
- Verified frontend implementation: `78845d0d7a948ea4bf6ae0a0e8961f2d3f8332ae`; [CI 35824919320](https://github.com/suraka/skillsprout/actions/runs/35824919320) passed TypeScript, all 10 runtime tests, all 7 Chromium browser tests and the production build. Job logs inspected: no captured browser exceptions. Following commits may update documentation only; check their diffs and CI separately.
- Backend [CI 35787871190](https://github.com/suraka/skillsprout-backend/actions/runs/35787871190) passed at `79a4987e700a4cf8afa68338b9512a3e7754b78a`.
- First browser failures were real: clicks and edits before hydration were lost. Controls now wait for event handlers; slow-script test SG-B06 proves readiness and the first edit/run. Earlier failed runs remain recorded in the test evidence.
- Existing Cloudflare PR bot reports a preview for the older `eaecada2` commit. The current branch preview and its deployed source version have NOT been verified; passing CI is not deployment evidence.
- Phase 1B implementation source is in the same draft PR at `5d04ecf79589ce678ca83789a1ac662b9dc11fb1`; [CI 35827629569](https://github.com/suraka/skillsprout/actions/runs/35827629569) passed TypeScript, 14 runtime cases, 11 browser tests and production build. No frontend API, database migration, authenticated account or backend changes apply to this no-account guest activity. Early-years, physical-device, assistive-technology/family review and real Firebase staging are NOT TESTED.
