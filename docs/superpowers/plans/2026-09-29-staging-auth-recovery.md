# Staging Authentication and Recovery Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify real Firebase sign-in and family authorization on an isolated SkillSprout staging stack, then restore a synthetic staging backup into a separate database and rerun the core smoke checks.

**Architecture:** Keep the existing frontend, FastAPI backend, Firebase, and PostgreSQL boundaries. Add read-only backend staging preflight/smoke tooling and a separate Playwright config for an explicitly allowlisted remote staging target; use an operator-controlled runbook for provider backup/restore. Do not connect staging tests to production.

**Tech Stack:** Frontend: React/Next.js via Vinext, TypeScript, Node >=22.13.0, pnpm 11.25.0, Playwright. Backend: Python >=3.12,<3.13, FastAPI, async SQLAlchemy, Alembic, Firebase Admin, PostgreSQL 16.

**Spec:** `docs/superpowers/specs/2026-09-29-staging-auth-recovery-design.md`

## Global Constraints

- Use synthetic adult test accounts and synthetic learner/family rows only; never use real child data or production-derived data.
- Use a separate frontend origin, API service, PostgreSQL database, and Firebase project for staging; verify each identity before testing.
- Backend runtime configuration must set `APP_ENV=staging`, and the staging database host/name, frontend origin, and Firebase project must match the operator-confirmed allowlist.
- Before any Firebase or API request, the backend smoke command must require `STAGING_API_ORIGIN` to exactly match the separately supplied operator-confirmed `STAGING_EXPECTED_API_ORIGIN`; reject mismatches.
- Frontend tokens remain memory-only; reload signs out. Do not add persistent sign-in in this milestone.
- Do not log, commit, or report passwords, service credentials, access/refresh tokens, full database URLs, or other secret values.
- Backend project requirement is Python `>=3.12,<3.13`; PostgreSQL CI service is 16. Frontend Node floor is `>=22.13.0`; package manager is pnpm `11.25.0`.
- Do not change production configuration, access production databases, run production migrations, restore production backups, merge, or deploy.
- Do not alter the existing frontend PR #1 or #2, backend PR #2 or #3, their branches, or metadata. New code and runbook work goes on new feature branches and draft PRs.
- Any staging resource creation, configuration mutation, or deployment requires a separate execution approval. If staging or authorized provider access is missing, stop and report BLOCKED.
- Backend PR #2's migration downgrade drops publication-review and completion-provenance data. Never use that downgrade for recovery; this plan does not run that draft migration unless separately reviewed and added to scope.

## Review Focus

- Blank or wrong frontend API/Firebase configuration could silently select sample mode or point at the wrong service; Task 2 must assert exact staging origins and fail before sign-in.
- Invalid, expired, revoked, disabled-account, or wrong-project Firebase tokens must not open protected routes; Tasks 1, 2, and 5 verify expected 401/403/503 outcomes without exposing tokens.
- A known learner ID from guardian A must remain unreadable and unwritable by guardian B; Task 1's real-token smoke command checks server responses.
- A production or unexpected database target must be rejected before any database or API request; Task 1 unit tests exercise missing and mismatched allowlist values.
- A missing, stale, or wrong-schema backup must not overwrite the source database or be called a successful restore; Task 6 validates backup identity, target identity, schema revision, and synthetic records before post-restore smoke.

---

## File Map

Backend feature branch `codex/staging-auth-api-smoke`:

- Create `app/staging_target.py`: parse the configured database identity, compare it with explicit expected staging values, and produce a redacted target summary.
- Create `scripts/staging_preflight.py`: refuse non-staging/mismatched targets; perform only `SELECT` checks for database identity and `alembic_version`.
- Create `scripts/staging_smoke.py`: sign in synthetic guardians through Firebase Identity Toolkit in memory, then call `/api/v1/ready`, `/api/v1/me`, and `/api/v1/students/{student_id}`; as guardian B, also send a deliberate PATCH denial probe to guardian A's disposable synthetic learner.
- Create `tests/test_staging_target.py`: unit tests for target validation, fail-closed behavior, and secret-free summaries.
- Create `tests/test_staging_smoke.py`: mock-based tests for status handling and credential/token redaction.
- Modify `.github/workflows/ci.yml`: lint the new `scripts` directory as well as `app` and `tests`; do not add provider secrets or run the remote staging suite in regular CI.

Frontend feature branch `codex/staging-auth-browser`:

- Create `scripts/staging-test-config.mjs`: read and validate required remote test settings without printing credentials.
- Create `tests/staging/config.test.mjs`: unit tests for the staging URL/config guard.
- Create `playwright.staging.config.ts`: run only against the explicit HTTPS staging URL and do not start the local dev server.
- Create `tests/staging/auth.spec.ts`: browser tests for sign-in, runtime config, refresh, refresh failure, logout/reload, and private-screen behavior.
- Modify `package.json`: add `test:staging-config` and `test:staging` scripts.

Documentation feature branch `codex/staging-auth-recovery-runbook`:

- Create `docs/operations/staging-auth-recovery-runbook.md`: provider inventory, isolation checklist, synthetic-account setup, backup/restore steps, operator handoffs, and evidence template.
- Modify `docs/TEST_PLAN_AND_RESULTS.md` only after a real staging or restore test has run, recording exact results and gaps.

## Task 1: Backend Staging Target Guard and Read-Only Smoke Command

**Files:**
- Create: `suraka/skillsprout-backend/app/staging_target.py`
- Create: `suraka/skillsprout-backend/scripts/staging_preflight.py`
- Create: `suraka/skillsprout-backend/scripts/staging_smoke.py`
- Create: `suraka/skillsprout-backend/tests/test_staging_target.py`
- Modify: `suraka/skillsprout-backend/.github/workflows/ci.yml`

**Interfaces:**
- `ExpectedStagingTarget` is an immutable dataclass with `database_host: str`, `database_name: str`, `frontend_url: str`, and `firebase_project_id: str`.
- `validate_staging_target(settings: Settings, expected: ExpectedStagingTarget) -> dict[str, str]` returns only safe identity values; it raises a clear error unless `APP_ENV` is `staging` and all configured values match.
- `staging_preflight.py` reads expected values from `STAGING_EXPECTED_DB_HOST`, `STAGING_EXPECTED_DB_NAME`, `STAGING_EXPECTED_FRONTEND_URL`, and `STAGING_EXPECTED_FIREBASE_PROJECT_ID`; missing values fail before connecting. It then runs read-only SQL for `current_database()` and `alembic_version` and emits a redacted JSON summary.
- `staging_smoke.py` consumes `STAGING_API_ORIGIN`, `STAGING_EXPECTED_API_ORIGIN`, `STAGING_FIREBASE_WEB_API_KEY`, `STAGING_PARENT_A_EMAIL`, `STAGING_PARENT_A_PASSWORD`, `STAGING_PARENT_B_EMAIL`, `STAGING_PARENT_B_PASSWORD`, and `STAGING_PARENT_A_STUDENT_ID`. It requires both API values to be HTTPS origins and to match exactly before making any API or Firebase request. Project-mismatch mode additionally reads `STAGING_MISMATCH_FIREBASE_WEB_API_KEY`, `STAGING_MISMATCH_PARENT_EMAIL`, and `STAGING_MISMATCH_PARENT_PASSWORD`. Tokens stay in process memory and are never printed. The default smoke makes read requests plus one deliberate PATCH denial probe against the disposable synthetic learner; no successful mutation is expected. Optional `--verify-revocation`, `--verify-expiry`, and `--verify-project-mismatch` modes verify expected denial without displaying tokens. The project-mismatch mode uses a second non-production Firebase test project and synthetic account; if unavailable, that case stays NOT TESTED.

- [ ] **Step 1: Write tests for the target guard.** Add `test_rejects_non_staging_app_env`, `test_rejects_database_host_or_name_mismatch`, `test_requires_all_expected_target_values`, and `test_safe_summary_excludes_database_password` in `tests/test_staging_target.py`.
- [ ] **Step 2: Run the focused tests and confirm they fail for the missing module/behavior.** Run: `uv run pytest tests/test_staging_target.py -q`. Expected: tests fail because the validator is not implemented.
- [ ] **Step 3: Implement `ExpectedStagingTarget` and `validate_staging_target`.** Parse `DATABASE_URL` with `urllib.parse`; never include its username, password, query string, or full value in an exception or summary.
- [ ] **Step 4: Implement `scripts/staging_preflight.py`.** Abort before connecting if `APP_ENV` or any expected identifier is missing/mismatched. When matched, use only `SELECT current_database()` and `SELECT version_num FROM alembic_version`; fail if no single migration revision is present.
- [ ] **Step 5: Implement `scripts/staging_smoke.py`.** Use `httpx` to call Firebase sign-in and the staging API. Assert both accounts can read `/me`; guardian A can read the supplied synthetic learner; guardian B receives only 403 or 404 for both GET and PATCH on that known ID. Never print response bodies for authentication errors, passwords, ID tokens, refresh tokens, or authorization headers.
- [ ] **Step 6: Test the smoke command without staging secrets.** Add tests in `tests/test_staging_smoke.py` proving an authentication failure is reported without printing the supplied password/token and that a failed cross-family status fails the command. Run `uv run pytest tests/test_staging_target.py tests/test_staging_smoke.py -q` and confirm the new cases fail before implementation.
- [ ] **Step 7: Run focused and repository checks.** Run `uv run pytest tests/test_staging_target.py tests/test_staging_smoke.py -q`, `uv run pytest -q`, and `uv run ruff check app scripts tests`. Expected: all tests and lint pass; existing CI commands remain green.
- [ ] **Step 8: Update the backend CI lint command and open a draft PR from `codex/staging-auth-api-smoke` to backend `main`.** The normal workflow checks `app`, `scripts`, and `tests`, but never runs the remote staging command or receives staging secrets.

## Task 2: Frontend Remote Staging Browser Suite

**Files:**
- Create: `suraka/skillsprout/scripts/staging-test-config.mjs`
- Create: `suraka/skillsprout/tests/staging/config.test.mjs`
- Create: `suraka/skillsprout/playwright.staging.config.ts`
- Create: `suraka/skillsprout/tests/staging/auth.spec.ts`
- Modify: `suraka/skillsprout/package.json`

**Interfaces:**
- `loadStagingConfig(env)` in the JavaScript module, documented with JSDoc as taking `NodeJS.ProcessEnv` and returning `StagingTestConfig`, requires `STAGING_FRONTEND_URL`, `STAGING_API_ORIGIN`, `STAGING_EXPECTED_API_ORIGIN`, `STAGING_FIREBASE_WEB_API_KEY`, `STAGING_PARENT_A_EMAIL`, and `STAGING_PARENT_A_PASSWORD`; it rejects non-HTTPS origins, URL credentials/path/query/fragment where an origin is expected, missing credentials, and any API-origin mismatch before sign-in.
- `playwright.staging.config.ts` uses the returned `baseURL`, contains no `webServer`, and fails with a clear configuration error if the staging settings are missing.
- `pnpm test:staging-config` runs only local config-unit tests. `pnpm test:staging` runs the remote suite and is not added to the ordinary PR workflow.

- [ ] **Step 1: Write config guard tests.** Add tests for missing values, non-HTTPS frontend URL, path/query in an origin, and error output that never includes the supplied password.
- [ ] **Step 2: Run the config tests and confirm they fail before implementation.** Run: `node --test tests/staging/config.test.mjs`. Expected: failures for the missing `loadStagingConfig` function.
- [ ] **Step 3: Implement `loadStagingConfig(env)` with JSDoc input/return types.** Check exact frontend/API origins and required values; never log or serialize passwords.
- [ ] **Step 4: Create `playwright.staging.config.ts` and add package scripts.** It must use the remote `STAGING_FRONTEND_URL`, omit `webServer`, and fail rather than skip if the remote test settings are absent.
- [ ] **Step 5: Add browser cases.** Add tests named `staging runtime config matches allowlist`, `guardian signs in and loads account`, `invalid credentials stay signed out`, `token refresh succeeds before API request`, `refresh rejection clears private state`, and `logout and reload clear family state`. Use accessible role/label selectors from the existing parent sign-in UI; do not log credentials, Firebase responses, or auth headers.
- [ ] **Step 6: Run local checks.** Run `node --test tests/staging/config.test.mjs`, `pnpm exec tsc --noEmit`, `pnpm test:runtime`, `pnpm test:browser`, and `pnpm build`. Expected: all existing guest tests remain green; remote staging tests are not executed without a staging target and credentials.
- [ ] **Step 7: Open a draft frontend PR from `codex/staging-auth-browser` to `main`.** Keep staging credentials out of GitHub workflow config and repository files.

## Task 3: Staging and Recovery Operator Runbook

**Files:**
- Create: `suraka/skillsprout/docs/operations/staging-auth-recovery-runbook.md`

- [ ] **Step 1: Write the staging inventory template.** Include frontend/API origins, provider project/service IDs, Firebase project ID, PostgreSQL database identity, exact code SHAs, owner, CORS origins, and Firebase authorized domains; mark unknown values BLOCKED rather than guessing.
- [ ] **Step 2: Write the provider isolation checklist.** Require separate staging services/database/project, synthetic accounts only, no production DATABASE_URL or routing, and no wildcard CORS/domain entries.
- [ ] **Step 3: Write the account and data setup steps.** Define two synthetic adult guardians and one synthetic learner linked to guardian A; record its ID, not personal details. Use a disposable staging target that can be restored or discarded after testing.
- [ ] **Step 4: Write native backup and restore steps.** Record backup policy, retention, latest successful artifact, source DB identity, target DB identity, start/end times, schema/Alembic revision, and verified synthetic row IDs. Restore only into a new isolated database, never over the source.
- [ ] **Step 5: Document alternative recovery evidence.** If only logical dump/restore is available, label it separately and do not claim provider snapshot or point-in-time recovery verification.
- [ ] **Step 6: Self-check the runbook.** Confirm no secret values, production-derived data, guessed RPO/RTO values, or destructive production commands appear. Open it in a new draft documentation PR; do not change existing PRs.

## Task 4: Staging Access and Target Preflight

**Files:**
- Read-only provider checks; no source changes beyond Tasks 1–3.

- [ ] **Step 1: Have the authorized operator identify the staging resources.** Record non-secret provider/service/project IDs, URLs, current revisions, and the person responsible for Firebase and database access.
- [ ] **Step 2: Confirm separate staging Firebase, API, frontend, and PostgreSQL resources.** Verify the backend's exact `APP_ENV`, `FRONTEND_URL`, Firebase project ID, and database host/name against the operator-approved expected values.
- [ ] **Step 3: Run the backend preflight on the candidate staging service.** Run: `uv run python scripts/staging_preflight.py`. Expected: redacted output naming the intended staging target and one Alembic revision; any mismatch exits nonzero before further checks.
- [ ] **Step 4: Verify the frontend public config from the staging origin.** Run the `test:staging-config` guard and confirm `/api/config` returns the expected API origin and the staging Firebase public key is present. Set `STAGING_EXPECTED_API_ORIGIN` to the operator-verified API service origin. If config is blank or mismatched, stop; do not sign in or use sample mode as staging evidence.
- [ ] **Step 5: Stop at BLOCKED if resources, owner access, or non-secret allowlist values are missing.** Do not create or mutate provider resources, or deploy, under this plan without separate execution approval.

## Task 5: Real Staging Authentication and Authorization

**Files:**
- Run: `suraka/skillsprout-backend/scripts/staging_smoke.py`
- Run: `suraka/skillsprout/tests/staging/auth.spec.ts`
- Record: `suraka/skillsprout/docs/TEST_PLAN_AND_RESULTS.md` only after results exist.

- [ ] **Step 1: Confirm the synthetic test accounts and learner exist only in the designated staging Firebase/database.** Use no child-identifying details; if accounts are not available, stop and request the authorized operator to create them.
- [ ] **Step 2: Run the backend real-token smoke.** Run: `uv run python scripts/staging_smoke.py`. Expected: valid Firebase ID tokens accepted; `/ready`, `/me`, and guardian A's learner read succeed; guardian B receives 403/404 for both GET and PATCH on guardian A's learner.
- [ ] **Step 3: Run the remote browser suite against the exact staging origins.** Run: `pnpm test:staging`. Expected: runtime config matches the allowlist; valid sign-in loads the account; invalid sign-in stays signed out; refresh succeeds; simulated refresh rejection clears private state; logout and reload clear family state.
- [ ] **Step 4: Verify revoked/expired token behavior with the authorized Firebase operator.** For revocation, run `uv run python scripts/staging_smoke.py --verify-revocation`; the command holds the synthetic account's ID token in memory while the operator revokes that account's sessions in the Firebase staging console, then verifies the old token is denied. For expiry, run `uv run python scripts/staging_smoke.py --verify-expiry`; it waits until the token's returned expiry plus a short buffer, then verifies denial. Re-enable or sign in the synthetic account after revocation and record the outcomes. Never display or copy the token; do not test with a real user.
- [ ] **Step 5: Verify wrong-project token denial.** Run `uv run python scripts/staging_smoke.py --verify-project-mismatch` using a synthetic account from a second non-production Firebase project; the staging API must reject that project's token with 401 and return no private data. If a second approved test project/account is unavailable, record this case NOT TESTED and do not mark the milestone VERIFIED.
- [ ] **Step 6: Record exact SHAs, origins, project/database identifiers, test outcomes, run artifacts, and limitations.** Do not record credentials or tokens. Leave unrun provider cases NOT TESTED or BLOCKED.

## Task 6: Staging Backup and Isolated Restore Rehearsal

**Files:**
- Follow: `suraka/skillsprout/docs/operations/staging-auth-recovery-runbook.md`
- Record results in: `suraka/skillsprout/docs/TEST_PLAN_AND_RESULTS.md`

- [ ] **Step 1: Ask the authorized operator to confirm backup settings and choose RPO/RTO targets.** Record schedule, retention, latest successful backup reference/time, restore permissions, recovery owner, and chosen targets. Do not invent targets.
- [ ] **Step 2: Confirm the source database contains only synthetic staging data and record its identity and Alembic revision.** If production-derived or unknown data may be present, stop.
- [ ] **Step 3: Restore the selected staging backup into a new isolated PostgreSQL database.** Preserve the source database and backup unchanged; record the restore target and elapsed time.
- [ ] **Step 4: Verify schema and data.** Check the expected Alembic revision, catalog health, row counts, stable synthetic learner IDs, enrollments, progress values, and completion provenance. Do not use `alembic downgrade` or restore over the source.
- [ ] **Step 5: Run backend preflight and auth smoke against the restored database.** Supply the authorized restored-database host/name as the expected target, then run `uv run python scripts/staging_preflight.py` and `uv run python scripts/staging_smoke.py`. Expected: target identity is the restored database and API/family checks pass.
- [ ] **Step 6: Rerun the staging browser smoke after restore.** Run `pnpm test:staging`. Expected: sign-in, refresh, logout/reload, and account isolation still pass against the restored target.
- [ ] **Step 7: Label recovery scope precisely.** A logical dump/restore is not provider-native snapshot/PITR evidence. If a native restore is unavailable, record the limitation and leave that gate NOT VERIFIED.

## Task 7: Evidence Update, Independent Review, and Draft PRs

**Files:**
- Modify: `suraka/skillsprout/docs/ROADMAP_AND_FEATURE_STATUS.md` on a new documentation branch, after results exist.
- Modify: `suraka/skillsprout/docs/TEST_PLAN_AND_RESULTS.md` on the same new branch.

- [ ] **Step 1: Update only the relevant staging/auth/recovery checklist.** Include exact SHAs, environment identities, run links, reviewer/operator, backup reference, restore target, migration revision, timings, RPO/RTO, and explicit unverified gaps.
- [ ] **Step 2: Review the evidence against each acceptance criterion.** A missing account, backup artifact, permission, test result, or exact SHA remains BLOCKED/NOT VERIFIED; do not convert documentation into evidence.
- [ ] **Step 3: Request independent QA/security/recovery review of the exact frontend/backend/test evidence.** Fix any findings on the feature branches; retain current existing PR states.
- [ ] **Step 4: Open or update only new draft PRs for the staging test tooling and evidence.** Keep frontend PR #1/#2 and backend PR #2/#3 open, draft, unmerged, and unchanged.
- [ ] **Step 5: Final go/no-go report.** Mark this milestone VERIFIED only if every spec acceptance criterion passes. Otherwise report PARTIAL/BLOCKED with the exact remaining operator or evidence requirement. Do not merge, deploy, or change production.

## Handoff

This plan creates test tooling and evidence paths only. Provider access, staging resource creation/configuration, and staging deployment are separate operator actions that require approval before execution. No implementation, provider mutation, or deployment is authorized by this plan alone.