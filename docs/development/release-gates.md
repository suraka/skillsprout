# SkillSprout release gates

This is an evidence checklist for a proposed change, not a staging configuration or proof that any missing control exists. Apply it per exact frontend and backend commit. Record the reviewer, date, environment, artifacts, result, and limitations; leave unsupported items NOT VERIFIED or BLOCKED. See the [operating model](agent-operating-model.md), [roadmap](../ROADMAP_AND_FEATURE_STATUS.md), and [test record](../TEST_PLAN_AND_RESULTS.md).

| Gate | Evidence required before a release decision |
|---|---|
| Scope and CI | Exact branch, base, changed files and commit SHA; frozen install, TypeScript/lint, runtime/browser tests, and production build as applicable, with run URL, job result, and known gaps. Backend pytest/lint/PostgreSQL migration checks where relevant. A previous run does not verify a new SHA. |
| Independent review | Another reviewer examines the exact diff, acceptance criteria, regressions, child safety/privacy, accessibility, and migration/rollback effects; record approval or open findings. Qualified learning and family/device review is separate where required. |
| Isolated staging | Separate frontend, backend, PostgreSQL, and Firebase resources with synthetic/test accounts, verified environment routing, no production database connection, and deploy IDs tied to exact candidate SHAs. A guest Cloudflare preview is not this integrated stack. |
| Real auth and authorization | On staging, exercise actual Firebase sign-in, refresh, logout, revoked/expired token behavior, guardian/learner roles, cross-family denial, and server-side resource authorization. Record test identities and outcomes without secrets or child data. Mocked identity and guest flows do not satisfy this gate. |
| Migrations and data | Record current deployed Alembic revision, candidate revision, migration plan, additive/backward compatibility, staging migration result, and treatment of existing learner rows and evidence provenance. Never run destructive fixtures on production. |
| Backups and recovery | Identify provider backup policy, schedule, retention, newest successful backup artifact and restore permissions. Restore a copy into an isolated PostgreSQL database; validate revision, schema, catalog and representative synthetic data, and document timing and integrity. Do not overwrite live data; plan reconciliation of learner writes after the snapshot. |
| Deployment provenance and smoke | Record exact frontend Worker and backend Railway deployment IDs and source SHAs, database revision, environment, operator and time before and after release. Smoke-test health/readiness, catalog, real authenticated family boundaries, and affected user flows; monitor logs/errors without exposing personal data. |
| Limitations and rollback | Name untested devices, assistive technology, human reviews and integrations. Record last known-good deployment IDs and provider-specific redeploy steps; roll application code back while preserving the live database and later learner writes. A database downgrade or live restore needs a separate reviewed recovery decision. |

## Current evidence checkpoint

The 24 September 2026 roadmap and test record report GitHub frontend CI and an exact-commit Cloudflare guest/sample preview for PR #1. That preview uses synthetic data and does not prove an integrated release. Backend PostgreSQL CI is also recorded there for the separate draft PR. Re-check exact run/SHA evidence for any later candidate.

- Isolated Railway/PostgreSQL/Firebase staging configuration and integrated smoke: **NOT VERIFIED**.
- Real Firebase sign-in, token lifecycle, and cross-family authorization on that stack: **NOT VERIFIED**.
- Production frontend/backend deployment IDs and source SHAs, plus live migration revision: **NOT VERIFIED**.
- Backup availability, schedule, retention, latest artifact, and isolated restore result: **NOT VERIFIED**.
- Provider rollback controls and an executed recovery rehearsal: **NOT VERIFIED**.
- Screen-reader operation, measured contrast, physical-device/family and qualified content reviews for affected drafts: **NOT VERIFIED** unless a version-specific record is attached.

These gaps remain BLOCKED for a production release that depends on them. This document does not configure staging, inspect provider accounts, create a backup, perform a restore, authorize a merge, or deploy. Release and rollback require a separate owner or designated maintainer decision after the evidence is reviewed.
