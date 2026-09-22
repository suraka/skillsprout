# SkillSprout v2.3 implementation roadmap and continuity checklist

Updated 2026-09-22. Authority: attached SkillSprout-2.3.md, preserved at MASTER_BLUEPRINT.md.
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
| LE-01…10 Little Explorers | MISSING | no early-years runtime | One Rainbow Habitat and Grownup Playbook after Phase 1. |
| EDU-M0 curriculum foundation | MISSING | no reviewed locale/outcome graph | Qualified reviewer, stable outcomes and scope/sequence. |
| EDU-M1 / LIT-01…07 | MISSING | no sound/letter/word runtimes | Three reviewed literacy lessons first; accessible media and evidence. |
| EDU-M2 / MATH-01…06 | MISSING | no numerical manipulatives | Counting/comparison/add-remove slice, deterministic checks. |
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
2. **M1 Phase 1 Sorting Garden (BUILT; release PARTIAL):** original ordered colored blocks, synthetic cards, bounded rules interpreter, actual stage/trace, wrong-rule repair, Run/Pause/Step, undo/redo, clear/reset/finish, accessible non-drag controls. Browser-local guest only. No auth/API/DB changes apply per §§10/12/15. Human/device/browser verification gates remain explicit.
3. **M1B Phase 1B (PLANNED):** one Rainbow Habitat, adult controls/playbook/offline companion; all LE release checks and early-years review.
4. **M1C / EDU-M0/M1 (BLOCKED on human content review):** choose qualified reviewer/locale, three sound→letter→word lessons, original reviewed media, deterministic evidence and accessible alternatives.
5. **M2 saved family learning (PLANNED):** reviewed consent/retention/account boundaries; additive project/revision/evidence schema; API + authenticated UI + authorization + conflict/idempotency tests; complete reviewed first course and private parent Invention Cards. Preserve legacy self-reported completion provenance.
6. **M3 actual AI loop (PLANNED):** local tiny classifier, held-out tests, counterexamples/retraining, honest uncertainty, capstone and lower-end benchmark.
7. **M3B / EDU-M2…4 (PLANNED):** reviewed number and science slices; versioned curriculum graph; existing lesson references; explainable next step and authorized placement.
8. **M4 (PLANNED):** second full course, classroom pilot, reusable licensed assets and supported code bridge.
9. **M5 (PLANNED):** approved bounded generative AI, adult commerce, authoring/support/monitoring/backups; do not defer privacy foundations to this phase.
10. **M6 / EDU-M5…6 (PLANNED):** broader subjects/languages/variants after individual review and runtime validation. No decorative catalogs or unmoderated sharing.

## Checklist and continuation

- [x] Read authoritative specification and audit both existing repositories.
- [x] Record baseline references, public deployment checks and evidence-based gaps.
- [x] Produce roadmap before implementation; preserve production data and main branches.
- [x] Implement guest demo runtime/editor and regression/browser test definitions.
- [ ] Execute restored-version checks and record exact results in TEST_PLAN_AND_RESULTS.md.
- [ ] Verify remote branch/PR contents and record exact references.
- [ ] Browser/device/screen-reader/family review and real Firebase staging verification.

Continue by reading this checklist, MASTER_BLUEPRINT.md and TEST_PLAN_AND_RESULTS.md. Fetch current development branches/PRs; preserve user edits. Next unblocked work is completing M1 browser/accessibility validation, then the reviewed next slice. Do not jump to generic subject pages. No lesson/outcome IDs were published; no migration was run.

Recovery note: workspace maintenance removed the first local implementation before terminal push could authenticate. Original local-only commits cfbf875/7f50b70 were NOT pushed and are not delivery references. This restored version is being checked again and saved through the connected GitHub app. Never claim the first tests certify changed restored code without rerunning.
