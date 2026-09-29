# Staging Authentication and Recovery Operator Runbook

**Status:** Preparation template. No staging resources, credentials, backup artifact, or operator-confirmed recovery targets are recorded here. Treat every unknown required value as **BLOCKED** until the authorized owner verifies it.

This runbook is for a staging-only rehearsal using synthetic adult accounts and synthetic family data. It does not authorize provider resource creation or configuration, deployment, production access, production database changes, merge, or release. Keep credentials in protected provider settings; never paste them into this file, chat, tickets, shell transcripts, or evidence.

## 1. Handoff and readiness

Assign these roles before starting. Record names/handles and date; do not share credentials through the handoff.

| Role | Owner | Responsibility |
| --- | --- | --- |
| Staging environment owner | **BLOCKED — operator to identify** | Confirms resource identities, separation from production, origins, CORS, Firebase domains, and code revisions. |
| Firebase operator | **BLOCKED — operator to identify** | Creates or confirms synthetic guardian accounts in staging; performs approved revocation checks if scheduled. |
| Database/recovery operator | **BLOCKED — operator to identify** | Confirms backup policy and permissions; selects a staging backup and restores it into a new isolated database. |
| Test operator | **BLOCKED — operator to identify** | Runs reviewed browser/API checks with synthetic accounts; records redacted evidence. |
| Independent reviewer | **BLOCKED — operator to identify** | Reviews isolation, restore validation, evidence, and gate labels. |

**Entry gate:** If the owner, authorized access, staging identities, or synthetic-only data cannot be confirmed, stop and mark the affected gate **BLOCKED**. Do not substitute production or infer values from repository files.

## 2. Staging inventory

Fill this from authorized provider consoles or an authorized owner. Record identifiers and origins only, never secret values or full connection URLs. Mark unresolved entries **BLOCKED**.

| Identity | Operator-verified value | Verification source / time | Status |
| --- | --- | --- | --- |
| Staging frontend HTTPS origin | **BLOCKED** |  | BLOCKED |
| Frontend hosting provider / project / service IDs | **BLOCKED** |  | BLOCKED |
| Staging API HTTPS origin | **BLOCKED** |  | BLOCKED |
| API hosting provider / project / service IDs | **BLOCKED** |  | BLOCKED |
| Staging Firebase project ID | **BLOCKED** |  | BLOCKED |
| Firebase authorized domains (exact list) | **BLOCKED** |  | BLOCKED |
| PostgreSQL provider / project / service IDs | **BLOCKED** |  | BLOCKED |
| PostgreSQL host (hostname only) | **BLOCKED** |  | BLOCKED |
| PostgreSQL database name | **BLOCKED** |  | BLOCKED |
| Backend CORS allowed origins (exact list) | **BLOCKED** |  | BLOCKED |
| Backend configured frontend origin | **BLOCKED** |  | BLOCKED |
| Backend runtime environment, APP_ENV | **BLOCKED** |  | BLOCKED |
| Frontend candidate Git SHA | **BLOCKED** |  | BLOCKED |
| Backend candidate Git SHA | **BLOCKED** |  | BLOCKED |
| Current staging Alembic revision | **BLOCKED** |  | BLOCKED |
| Staging owner and recovery contact | **BLOCKED** |  | BLOCKED |

Confirm frontend/API origins use HTTPS and match the approved staging values. Backend and browser configuration must identify the same staging Firebase project as the synthetic test accounts. The public Firebase web key must belong to staging; do not record it here. Record only whether runtime configuration matched the staging API origin and Firebase project.

## 3. Isolation checklist — all items required

Do not continue to sign-in, API smoke, or restore work until each item is checked and reviewed.

- [ ] Frontend hosting service/project is a distinct staging resource.
- [ ] API hosting service/project is a distinct staging resource.
- [ ] PostgreSQL service and database are distinct staging resources, isolated from production.
- [ ] Firebase project is distinct; synthetic test accounts exist only there.
- [ ] Backend runtime reports APP_ENV=staging; configured frontend origin, Firebase project ID, PostgreSQL host, and database name match the inventory.
- [ ] Frontend runtime points only to the inventoried staging API and Firebase project; blank/mismatched configuration is a stop condition, not staging evidence.
- [ ] Backend CORS list contains only exact approved staging frontend origin(s) required for this test. No wildcard origins.
- [ ] Firebase authorized domains contain only exact approved staging frontend domain(s) and any explicitly required provider domain. No wildcard entries.
- [ ] No production DATABASE_URL, production API route, production Firebase project, or production-origin routing is configured or used by staging.
- [ ] No production database, account, backup, or production-derived data is accessed, copied, restored, or changed.
- [ ] Selected backup is known to contain synthetic staging data only. If contents or provenance are unknown, stop.
- [ ] Restore destination is a new isolated staging database with a distinct identity; source database and artifact remain unchanged.

**Stop conditions:** Any mismatch or unknown identity; any production route or identifier; wildcard CORS/domain configuration; real or production-derived family data; a restore that would overwrite the source; or inability to preserve the source artifact. Stop and hand back to the relevant owner with non-secret diagnostic facts only.

## 4. Synthetic account and data setup

Account creation is performed only by the authorized Firebase operator in the staging project. Do not place passwords, tokens, recovery codes, or private account details in evidence.

1. Create or confirm two synthetic adult guardian accounts, labeled Guardian A and Guardian B, in the inventoried staging Firebase project. Use operator-controlled test mailboxes and unique synthetic credentials. Do not use real child or family identities.
2. Through the approved staging setup flow, create one disposable synthetic learner linked to Guardian A. Use a fictional name and synthetic enrollment/progress data only.
3. Record synthetic guardian labels and the learner’s stable database ID in the restricted test evidence record. Do not record the learner’s display name, email, birth date, or other personal-like details.
4. Confirm Guardian B has no relationship to that learner. Confirm the learner and associated enrollment/progress/completion rows are disposable staging data.
5. Record initial synthetic row identifiers and counts needed for restore comparison.
6. Identify a disposable staging restore target or request an approved new isolated staging database from the recovery operator. This runbook does not authorize provisioning or deployment.

## 5. Authentication and target preflight

Run only after Sections 1–4 pass and reviewed candidate SHAs are fixed. Supply credentials through protected operator settings; do not paste secret values into shell history or logs. Never save environment dumps.

1. Verify browser-test configuration with the approved staging frontend/API origins. It must fail closed on missing settings or mismatch and must not silently use sample/preview mode.
2. For backend smoke, set STAGING_API_ORIGIN and STAGING_EXPECTED_API_ORIGIN to the same independently verified staging API origin. STAGING_EXPECTED_DB_HOST, STAGING_EXPECTED_DB_NAME, STAGING_EXPECTED_FRONTEND_URL, and STAGING_EXPECTED_FIREBASE_PROJECT_ID must match the inventory. Supply synthetic credentials through protected settings only.
3. Run the read-only backend target preflight from the reviewed backend candidate: uv run python -m scripts.staging_preflight. Expected: redacted success summary naming the verified staging identity and exactly one Alembic revision. It uses read-only database identity/revision queries. On failure or unexpected identity, stop.
4. Run pnpm test:staging-config. This is a local guard test and does not access staging.
3. Run the read-only backend target preflight from the reviewed backend candidate: uv run python -m scripts.staging_preflight. Expected: redacted success summary naming the verified staging identity and exactly one Alembic revision. It uses read-only database identity/revision queries. On failure or unexpected identity, stop.
4. Run pnpm test:staging-config. This is a local guard test and does not access staging.
5. Only after origin/target checks pass, run the real browser suite with pnpm test:staging and backend authentication/authorization smoke with uv run python scripts/staging_smoke.py. These commands request the explicitly allowlisted staging services; never run with an unverified target.

**Mutation boundary:** The target preflight above is read-only. The authentication smoke command is not wholly read-only: GET /api/v1/me may create User and ParentProfile rows for a newly seen Firebase UID. Use synthetic staging guardian accounts only. The command may create only the corresponding synthetic guardian account/profile rows when they do not already exist; it must not create or modify real-user or learner data. Record the resulting synthetic account/profile IDs and row counts in the restricted evidence record, including whether those rows existed before the run.
6. Record exit status, exact candidate SHA, run time, and redacted summary. Never retain passwords, API keys, Firebase ID/refresh tokens, authorization headers, complete database URLs, or private response bodies.

Backend smoke checks readiness and both synthetic accounts, then confirms Guardian A can read the synthetic learner while Guardian B receives HTTP 403 or 404 for both read and a deliberate denied update. Verify the denied update made no change. Browser checks cover runtime config, sign-in, refresh/failure behavior, and logout/reload according to the reviewed suite. Mark unavailable cases NOT TESTED; mocks or CI are not staging evidence.

For expiry, revocation, wrong-project, disabled-account, or admin-role checks, use only the reviewed procedure and authorized Firebase operator. A second non-production Firebase project is required for a wrong-project probe. If a prerequisite is unavailable, record NOT TESTED. Do not copy or display tokens.

## 6. Native provider backup and restore rehearsal

Provider, backup product, schedule, retention, recovery permissions, and artifact are unknown until inspected by the authorized recovery operator. Do not assume snapshot, PITR, or restore capabilities. The recovery owner must choose acceptable RPO/RTO before judging the rehearsal; this runbook supplies no target values.

### Before selecting a backup

- [ ] Recovery operator confirms the backup mechanism and whether the selected artifact is a native provider snapshot/PITR artifact.
- [ ] Record documented backup policy, schedule, retention period, restore permissions, recovery owner, and latest successful staging backup reference/time.
- [ ] Confirm backup source is the inventoried staging PostgreSQL database and contains synthetic staging data only.
- [ ] Record source host/database identity, source Alembic revision, and baseline synthetic learner/enrollment/progress/completion IDs and row counts.
- [ ] Record operator-selected RPO and RTO targets and how each will be measured.
- [ ] Confirm source database and selected backup artifact will remain preserved and unchanged.
- [ ] Confirm a new isolated staging destination whose service/project and database name differ from source; verify it has no production route or data.

If any item is unresolved, stop before restore. Do not use Alembic downgrade as a recovery method.

### Restore and validate

1. The authorized recovery operator selects the verified staging artifact and starts provider-native restore into the new isolated staging database. Follow provider procedures approved by that operator; provider-specific steps are intentionally not guessed here.
2. Record the non-secret artifact reference, source and target identities, operator, restore start/end timestamps with timezone, and elapsed time. Keep source and artifact unchanged.
3. Confirm restored database identity is exactly the new target. Confirm expected Alembic revision and record it; investigate any revision difference before continuing.
4. Compare expected synthetic IDs and row counts for required tables, learner, enrollment, progress, and completion provenance (where present). Verify stable learner ID and expected state. Do not export unrelated records.
5. Configure only the authorized staging API candidate to use the restored staging database through protected provider settings if a separate restore-validation API is available. This provider configuration action requires separate authorization by the environment owner. Never change production settings or overwrite the source.
6. Run read-only backend preflight against the restored target, using independently verified restored host/name as expected values. Then rerun backend smoke and browser suite against the restored target only after exact origin/target guards pass.
7. Record outcomes and gaps. A restore without schema, synthetic-row, API, and authentication checks is incomplete. Failed/skipped checks remain FAILED, NOT TESTED, or BLOCKED.

### Recovery target measurement

- RPO target: **BLOCKED — recovery owner to choose before rehearsal**
- RTO target: **BLOCKED — recovery owner to choose before rehearsal**
- Define observed recovery point as the timestamp represented by the selected backup and compare it with the chosen RPO.
- Define RTO start/end events before the run; record duration and compare with chosen RTO. Do not backfill targets after observing results.

## 7. Alternative: logical dump/restore (distinct evidence)

If native provider restore is unavailable, an authorized operator may propose a logical dump/restore into a new isolated staging database, subject to the same synthetic-only, isolation, source-preservation, and target-verification gates. Do not put credentials or production targets in commands or reports.

Label the result **LOGICAL DUMP/RESTORE ONLY — NOT PROVIDER-NATIVE SNAPSHOT OR PITR EVIDENCE**. Record dump method/tool and version, source identity, dump artifact reference, integrity checks, target identity, timestamps, Alembic revision, synthetic IDs/counts, and post-restore smoke outcomes. This does not prove provider snapshots, retention, point-in-time recovery, or provider restore controls. Native-backup gate remains NOT VERIFIED unless a native provider restore is completed and evidenced.

## 8. Outcome and evidence record

Create one record per run. Retain only redacted summaries, non-secret resource identities, synthetic IDs/counts, and approved artifact references.

### Run identity

- Run date/time and timezone: **BLOCKED**
- Operator / recovery operator / independent reviewer: **BLOCKED**
- Frontend SHA / backend SHA: **BLOCKED**
- Staging frontend/API origins: **BLOCKED**
- Provider project/service IDs: **BLOCKED**
- Firebase project ID: **BLOCKED**
- PostgreSQL source host/database name: **BLOCKED**
- Verified CORS origins / Firebase authorized domains: **BLOCKED**
- Isolation checklist reviewer/result: **BLOCKED**

### Authentication and authorization

| Check | Result (PASS / FAIL / NOT TESTED / BLOCKED) | Run reference / redacted evidence |
| --- | --- | --- |
| Frontend/API/Firebase runtime config matches staging allowlist | BLOCKED |  |
| Backend preflight identity and Alembic revision | BLOCKED |  |
| Guardian A sign-in and /me | BLOCKED |  |
| Guardian B sign-in and /me | BLOCKED |  |
| Guardian A reads synthetic learner | BLOCKED |  |
| Guardian B denied learner read/update (403/404) | BLOCKED |  |
| Invalid credentials remain signed out | BLOCKED |  |
| Token refresh succeeds; rejected refresh clears private state | BLOCKED |  |
| Logout and reload clear family state | BLOCKED |  |
| Expired/revoked/wrong-project/disabled-account/admin cases, if in scope | BLOCKED |  |

### Backup and restore

- Recovery method: **BLOCKED** (NATIVE PROVIDER RESTORE or LOGICAL DUMP/RESTORE ONLY)
- Backup policy/schedule/retention: **BLOCKED**
- Latest successful backup time and non-secret artifact reference: **BLOCKED**
- Backup/source database identity: **BLOCKED**
- New restore target service/project/host/database identity: **BLOCKED**
- Source-preserved confirmation and reviewer: **BLOCKED**
- Restore operator and start/end timestamps with timezone: **BLOCKED**
- Source and target Alembic revisions: **BLOCKED**
- Expected synthetic learner ID and baseline row counts: **BLOCKED**
- Restored synthetic learner ID and row counts: **BLOCKED**
- Expected enrollment/progress/completion-provenance IDs and results: **BLOCKED**
- Operator-chosen RPO / observed recovery point / result: **BLOCKED**
- Operator-chosen RTO / measured duration / result: **BLOCKED**
- Post-restore preflight, API smoke, and browser smoke: **BLOCKED**
- Limitations and untested gates: **BLOCKED**

### Final gate labels

For each gate, select exactly one state: **VERIFIED**, **PARTIAL**, **NOT TESTED**, or **BLOCKED**. Keep the current default until evidence supports changing it, and record the evidence or blocker beside each label.

- Environment isolation: **BLOCKED**
- Real staging authentication and authorization: **BLOCKED**
- Native provider backup/restore: **BLOCKED**
- Logical dump/restore (if separately run): **NOT TESTED**
- Overall milestone: **BLOCKED**

Mark the milestone VERIFIED only when every approved-design acceptance criterion has exact-SHA evidence. Missing access, targets, backup artifacts, synthetic data, or results remain BLOCKED or NOT TESTED. CI, local tests, mocks, preview mode, or logical dump do not replace provider-backed staging or native-restore evidence.

## 9. Safety closeout

- [ ] No production configuration, database, backup, route, account, or data was used or changed.
- [ ] No deployment, merge, or production action occurred.
- [ ] Source staging database and selected backup artifact remain preserved.
- [ ] Evidence contains no credentials, keys, tokens, full connection strings, real learner data, or production-derived records.
- [ ] Independent reviewer verified exact SHAs, resource identities, target separation, and gate labels.
- [ ] Remaining blockers have an assigned operator and next handoff without sharing credentials.
