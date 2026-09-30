# Staging Authentication and Recovery Verification

**Status:** Proposed design, approved in conversation on 2026-09-29. This document defines a verification milestone; it is not a deployment authorization, a production change request, or the implementation plan.

## Goal

Prove, on an isolated SkillSprout staging environment using synthetic adult test accounts and synthetic family data, that real Firebase authentication reaches the intended FastAPI/PostgreSQL environment and that a staging database backup can be restored to a separate isolated database without losing expected records. Record evidence against exact code revisions and mark each gate VERIFIED, PARTIAL, NOT TESTED, or BLOCKED.

## Current evidence and limits

- Frontend main is at 0048e13092e1e2d78809c2194c7fe469143c975d. Frontend PR #1 is open and draft at d03498b475884b65b7483b815366a4ed1b5d3f15; its roadmap checkpoint dated 2026-09-24 says a separate Railway/PostgreSQL/Firebase staging stack and real Firebase sign-in are not verified.
- Backend main is at 1c6e8339ba9973c1da3b559ef5bd66cb4e892159. The backend README describes a runnable API but says live PostgreSQL/Firebase integration is not verified. Backend PR #2 remains a separate draft at edac0556e3f738a8bea272811ed84d25e766c66f.
- Frontend guest-preview and CI evidence validates guest behavior, not real Firebase sign-in or an integrated staging deployment. Frontend runtime configuration comes from the API config route; a blank API URL selects sample mode. Staging checks must prove that the configured API and Firebase project are the intended staging services and cannot silently fall back to sample or production services.
- Backend tests replace the verified Firebase identity and database dependencies with synthetic test identities and an isolated test database. They test application authorization logic but do not verify Firebase token signatures, project/issuer matching, expiration/revocation, deployed CORS, or browser-to-API integration.
- Backend CI runs PostgreSQL migration/seed/consistency checks, but its API test fixture drops and recreates tables from ORM metadata after migration. Therefore those tests alone do not prove API behavior against the Alembic-migrated schema.
- Provider account access, staging URLs and service identities, Firebase staging project, backup schedule/retention, latest backup artifact, restore permissions, and acceptable recovery point/time targets are unknown. Do not infer these from repository configuration.
- The existing backend PR #2 has an additive migration for publication-review and completion-provenance records. Its downgrade drops the new records. This milestone must not use that downgrade as a recovery strategy; any test of that candidate is separate and must use a disposable synthetic staging database and restore to a new isolated target.
- The four existing PRs—frontend #1 and #2, backend #2 and #3—remain open, draft, and unmerged at their reviewed heads. This milestone does not alter their branches or metadata.

## Chosen approach

Use a real, isolated staging path for the completion evidence. Local mocks or emulators may help diagnose a test, but they cannot satisfy the staging authentication or provider backup/restore gates. Split the work into gates so missing provider access stops the work safely and visibly.

## Scope

- Identify and verify distinct staging frontend, API, PostgreSQL, and Firebase resources, their owner, and the exact candidate frontend/backend revisions.
- Verify real Firebase sign-in and server-side authorization using synthetic adult accounts and synthetic learner/family records only.
- Inspect staging backup policy and the latest successful staging backup; restore it into a separate isolated staging database, validate it, and rerun health, authentication, and API smoke checks.
- Capture exact revisions, non-secret service/project identifiers, database migration revision, backup reference, test results, timestamps, restore duration, and limitations.
- Keep code or test automation changes on new feature branches and draft PRs. Leave all existing PRs unchanged.

## Out of scope

- Any production configuration change, production database access or migration, production backup/restore, production deployment, merge, or learner-data change.
- Using real children, real learner records, production-derived data, credentials, tokens, or secret values in test data, screenshots, logs, or reports.
- Enabling persistent browser sign-in. The existing frontend behavior keeps Firebase tokens in memory and signs out on reload; this milestone verifies that current behavior.
- Treating CI, a guest preview, mocked identities, an emulator, or a local dump as proof of a provider-backed staging restore.

## Design and sequence

### Gate 0 — Read-only inventory and isolation decision

An authorized operator identifies the provider accounts/projects and names the staging resources. Record the staging frontend origin, API origin, Firebase project identifier (not a key), PostgreSQL service/database identity, current Alembic revision, and exact frontend/backend candidate SHAs. Verify CORS and Firebase authorized domains match only the staging origins. Verify staging has no production database URL or route. Never paste secret values into chat or reports.

If a separate environment or authorized provider access is unavailable, stop with BLOCKED and list exactly what is missing. Do not use production as a substitute.

### Gate 1 — Staging configuration and candidate

Use the same reviewed code revisions throughout each test run. Confirm the frontend's runtime API URL and public Firebase web configuration identify staging; the public web key is not a secret, but it must belong to the staging Firebase project. Confirm backend Firebase project ID, service credentials, database URL, and CORS settings are supplied through the staging provider's protected settings. Keep credentials in the provider; never commit them or include them in evidence.

Do not deploy as part of this design or approval. Any staging resource creation, configuration mutation, or staging deployment must be presented as a separate execution step. Production stays out of scope.

### Gate 2 — Real authentication and family authorization

Use at least two synthetic adult guardian accounts and disposable synthetic family records. Through a real browser sign-in against staging, verify:

- Valid signup/sign-in reaches the staging API and the signed-in account's /me and catalog/profile requests use the staging origin.
- Wrong credentials, missing or invalid configuration, API outage, expired/revoked token, wrong Firebase project, disabled/inactive account, and failed refresh fail closed: no protected screen or stale private family data is shown.
- Token refresh succeeds when needed; a rejected refresh clears the frontend session and returns the user to sign-in.
- Logout clears the account, learner, enrollment, progress, and protected-view state. Reload signs out, matching the current in-memory token design.
- Guardian A cannot read or change Guardian B's learner, enrollment, or progress records, even when supplied a known object ID. Server authorization is checked directly; hiding a frontend screen is not enough.
- Any admin-only test uses a deliberately provisioned synthetic staging account and verifies stored server-side role checks. Do not add role claims in the browser.

Retain only synthetic data and redacted evidence. Record test outcome, browser/environment, exact revisions, and relevant request identifiers without tokens or personal data.

### Gate 3 — Staging backup and isolated restore

An authorized recovery operator inspects the provider's staging backup settings and records policy, schedule, retention, newest successful backup reference and timestamp, restore permissions, and documented recovery point objective (RPO) and recovery time objective (RTO). The owner/operator must set acceptable RPO/RTO; this design does not invent targets.

Take or select a backup of a staging database populated only with synthetic records. Restore it into a new isolated staging database; do not overwrite the source database. Record source and restored database identities, backup reference, restore start/end time, and schema/Alembic revision. Verify expected table/row counts and stable synthetic IDs, enrollment/progress/completion provenance, then run migration-consistency and API smoke checks against the restored, migrated schema. Repeat the real sign-in and family-isolation smoke tests against the restored target.

If the provider cannot restore a native backup, a logical dump/restore may be used as a separate, clearly scoped test. It must not be described as proof of provider snapshots, point-in-time recovery, or the provider's restore control.

If a reviewed candidate includes a schema migration, test it only on the disposable synthetic staging database. Preserve the pre-migration backup and restore to a separate target for recovery validation. Do not use Alembic downgrade to recover publication-review or provenance records.

### Gate 4 — Evidence and decision

Update the roadmap/test record with exact frontend/backend SHAs, CI run links, staging environment identifiers, test account labels (synthetic only), migration revision, backup artifact reference, restore validation, measured duration, RPO/RTO, reviewers/operators, and limitations. Redact secrets and avoid learner data. Label evidence at its actual scope; any unrun or failed requirement remains NOT TESTED, BLOCKED, or NOT VERIFIED.

## Specialist roles

- Controller: confirms scope, exact revisions, dependency order, and evidence consistency.
- Frontend specialist: verifies runtime config and browser account lifecycle, fail-closed behavior, logout/reload, and cross-family UI behavior.
- Backend/security specialist: verifies Firebase token checks, environment pairing, CORS, database isolation, and server-side family authorization.
- Recovery operator/specialist: inspects staging backup policy and performs the restore to a separate isolated target under an authorized operator account.
- Independent QA/release reviewer: checks exact-SHA evidence, restored database results, redaction, and truthful gate labels.

Specialists receive only scoped tasks and synthetic data; no agent receives credentials or standing provider access. Provider account actions are performed by an authorized operator, with any access handoff handled directly by the user in the provider interface.

## Acceptance criteria

Mark this milestone VERIFIED only when every item below has evidence:

- [ ] Authorized owner confirms distinct staging services and isolation from production.
- [ ] Exact candidate SHAs, staging origins, Firebase project identity, database identity, CORS, and non-secret runtime configuration are recorded.
- [ ] Real Firebase sign-in, refresh, logout/reload, invalid/expired/revoked/wrong-project token behavior, and active-account rules pass through the browser and staging API.
- [ ] Two synthetic guardian accounts prove server-side cross-family read/write denial; any admin test proves server-side role checks.
- [ ] Backup policy, retention, newest successful staging artifact, restore operator, RPO, and RTO are recorded.
- [ ] Restore succeeds into a separate isolated database; schema/migration revision and expected synthetic rows/IDs/progress/provenance are checked.
- [ ] Health, API, authentication, and family-isolation smoke checks pass again against the restored database.
- [ ] Exact logs/results are recorded without credentials, tokens, real child data, or production-derived records.
- [ ] No production action or existing PR mutation occurred.

If an account, service, artifact, target, or evidence item is unavailable, record the blocker and leave the milestone incomplete. A CI pass or local mock does not waive a missing gate.

## Risks and decisions reserved

- Staging service and Firebase-project ownership and authorized access must be confirmed before execution.
- Provider-specific backup/restore features, retention, point-in-time recovery, and restore permissions remain unknown until inspected by the authorized operator.
- Owner/operator must choose acceptable RPO/RTO before a recovery rehearsal can be judged successful.
- A failed staging restore must leave both its source backup and source database intact; recovery testing must target a separate database.
- This design and its draft PR do not authorize any staging provider mutation or deployment, production action, merge, or release.

## References reviewed

- Frontend PR #1 and roadmap at its reviewed head: https://github.com/suraka/skillsprout/pull/1 and https://github.com/suraka/skillsprout/blob/codex/sorting-garden-foundation/docs/ROADMAP_AND_FEATURE_STATUS.md
- Frontend release-gate draft: https://github.com/suraka/skillsprout/blob/codex/agent-control-frontend/docs/development/release-gates.md
- Backend README and CI on main: https://github.com/suraka/skillsprout-backend/blob/main/README.md and https://github.com/suraka/skillsprout-backend/blob/main/.github/workflows/ci.yml
- Backend draft PR #2 and agent-boundary PR #3: https://github.com/suraka/skillsprout-backend/pull/2 and https://github.com/suraka/skillsprout-backend/pull/3