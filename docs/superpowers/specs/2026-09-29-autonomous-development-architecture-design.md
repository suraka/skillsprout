# SkillSprout Autonomous Development Architecture

**Date:** 2026-09-29  
**Status:** Design proposal for owner review; no implementation changes authorized by this document alone  
**Scope:** Operating model and repository guidance for developing SkillSprout across its existing frontend and backend repositories

## 1. Purpose

Give the SkillSprout owner one clear way to request project work while a controller coordinates the installed planning, engineering, design, safety, and release practices. The process should preserve working functionality, keep requirements traceable to the authoritative product blueprint, and stop a release when evidence is missing.

This design uses one controller and specialist roles invoked when a task needs them. It does not create eight persistent bots, promise unattended background work, or grant agents standing access to production. Specialist roles are task assignments for the current work session. Parallel delegation is used only when the work is independent and the environment permits it.

## 2. Owner intent and current constraints

The owner approved Option A: one controller with on-demand specialist roles.

The following are project constraints:

- **Product authority:** Library file `SkillSprout-2.3.md` is the current product specification. In the repositories, `MASTER_BLUEPRINT.md` is documented as its preserved copy. If these disagree, pause and resolve the discrepancy with the owner.
- **Repository boundaries:** `suraka/skillsprout` owns frontend code and canonical shared project/development documentation. `suraka/skillsprout-backend` owns FastAPI, database, migrations, backend deployment configuration, and backend tests.
- **Preserve the existing system:** Inspect both repositories, relevant deployment state, and existing tests before code changes. Do not replace working features or alter production data to simplify a task.
- **Existing reviews:** Frontend PR #1 and the backend review-gate PR #2 are recorded as draft and unmerged. This architecture does not modify, ready, or merge those PRs.
- **Honest status:** Distinguish implemented, tested, staging-verified, production-verified, blocked, and unverified states. A passing preview or CI run does not prove live authentication, real learner-data persistence, production provenance, backup availability, or recovery.
- **Human release control:** Production deployment requires a separate owner approval for the exact proposed release. General project authority and approval of this architecture are not release approvals.
- **No secret handling in agent prompts:** Agents must not request, print, commit, or copy credentials, private child information, or real learner records into source control, logs, test output, or public issue content.

### Current evidence recorded during discovery

On 2026-09-29, the connected GitHub account could read and write both existing repositories. Their default branch is `main`. The frontend README describes a React/TypeScript application using a Vinext/Cloudflare Workers deployment, Firebase email/password sign-in, and an optional FastAPI connection. The backend README describes Python 3.12, FastAPI, PostgreSQL, Firebase token verification, and Alembic migrations.

The frontend v2.3 roadmap on the sorting-garden branch records the following operational gaps: real Firebase sign-in in a separate staging environment is unverified; production source SHA and live database revision are unverified; backup schedule, artifact, and isolated restore evidence are unknown. It also records learning-slice human, accessibility, device, and family review requirements. These are discovery notes, not a fresh production audit; update them when evidence is gathered.

## 3. Options considered

### A. One controller with on-demand specialists — selected

Keep the current two repositories and the existing product-owner relationship. The controller owns context, sequencing, and status. Specialist roles contribute bounded work or review when useful.

**Benefits:** Low setup burden, keeps the current architecture, reuses installed skills, and avoids maintaining unused services or credentials.

**Trade-off:** This is session-based coordination, not a continuously running software company. Work resumes when the owner or controller starts a session.

### B. Persistent external agent service

Run separate long-lived agents on cloud infrastructure with stored credentials and scheduled work.

**Trade-off:** Adds infrastructure, cost, credential security, and monitoring requirements. It is unnecessary for the current project and is outside this design.

### C. Written rules without specialist roles

Use a checklist and a single coding role.

**Trade-off:** Easier to operate, but loses focused product, design, security, and release review when a task benefits from them.

## 4. Operating architecture

### 4.1 Controller

The SkillSprout Controller is the single point of coordination. It:

1. Reads the product blueprint, canonical roadmap, repository instructions, and prior evidence relevant to the requested milestone.
2. Checks the current repository branches, open PRs, CI status, and known staging/production boundaries before proposing work.
3. Frames the request as a milestone with acceptance criteria and explicit dependencies.
4. Selects applicable skills and specialist roles. It does not invoke every role for every small change.
5. Keeps frontend and backend changes aligned through an agreed API/data contract when a milestone crosses both repositories.
6. Reports verified evidence, blockers, and the next actionable step in plain language.
7. Stops at required owner approval gates.

The controller is not a standing cloud service and must not claim it is working in the background after the session ends.

### 4.2 Specialist roles

Specialists are invoked only when relevant. They report findings or changes to the controller and do not independently expand scope.

| Role | Responsibility | Typical checks |
|---|---|---|
| Product and learning | Turn the blueprint into age-appropriate outcomes, activities, and acceptance criteria. | Human review needs, lesson evidence, age/ability fit, curriculum versioning. |
| UX and accessibility | Design usable child and parent flows that fit the existing visual system. | Keyboard and touch paths, contrast, assistive labels, responsive layouts, child-safe interaction. |
| Frontend engineer | Implement React/Vinext UI and client behavior. | Existing flows preserved, API error handling, browser tests, build and lint. |
| Backend and data engineer | Implement FastAPI, PostgreSQL, authorization, and migrations. | Family isolation, input validation, additive migrations, rollback and data integrity. |
| Payments and platform | Work on billing or provider configuration only when the milestone requires it. | Adult-only purchase flow, webhook idempotency, test/live mode separation. |
| QA, safety, and security | Review acceptance criteria, child privacy, authorization, accessibility, and failures. | Regression tests, permission boundaries, dependency/security concerns, unresolved risks. |
| Release and operations | Prepare staging, backups, recovery evidence, deployment provenance, and smoke checks. | Exact SHAs, environment separation, restore evidence, release and rollback record. |

A specialist may not independently merge changes, publish a release, change production configuration, migrate production data, or bypass a failed gate.

### 4.3 Repository documentation

The frontend repository is the canonical home for shared project operating guidance, matching the current roadmap's convention. The implementation plan will add:

- Root `AGENTS.md`: concise repository-wide instructions and links to the canonical workflow.
- `docs/development/agent-operating-model.md`: controller and specialist roles, work boundaries, and continuity rules.
- `docs/development/release-gates.md`: evidence required for staging, recovery, and production readiness.
- A link from `ROADMAP_AND_FEATURE_STATUS.md` to these rules and the active design/plan.

The backend repository will receive a root `AGENTS.md` with backend-specific safety and test commands, plus a link to the frontend repository's canonical shared workflow. It will not maintain a competing copy of the whole project policy. Both repositories should record compatible requirement IDs and exact cross-repository PR/commit references when a milestone touches both.

The implementation is limited to documentation and safe workflow setup. It does not alter application behavior, provision infrastructure, create credentials, or merge existing PRs.

## 5. Development workflow and gates

For each milestone, the controller applies the following sequence, scaling the detail to the size and risk of the work:

1. **Orient:** Read the authoritative blueprint, current roadmap, repository instructions, current branch/PR state, and relevant deployment evidence.
2. **Discover:** Inspect existing implementation and tests. For new or architectural behavior, clarify the user intent and agree on a design before implementation.
3. **Plan:** Write acceptance criteria, dependencies, files/repositories affected, test strategy, and risk controls. Use an isolated branch/worktree and do not work directly on `main`.
4. **Implement:** Use test-first work for behavior changes. Prefer complete vertical slices and additive database changes. Use synthetic learner data in development and staging.
5. **Review:** Run applicable type checks, lint, unit/integration/browser tests, and an independent code/security review. Address findings and rerun affected checks.
6. **Prepare staging:** Deploy only to an isolated staging environment. A Cloudflare preview with sample data is useful for UI checks, but it does not replace real staging checks for Firebase, FastAPI, PostgreSQL, permissions, or persistence.
7. **Verify recovery:** Before a database-affecting release, establish backup schedule/retention, capture a known backup, and demonstrate restore to an isolated database. Never test a restore against production.
8. **Prepare release:** Record exact frontend/backend commit SHAs, migration revision, CI results, staging evidence, backup/restore evidence, known limitations, and rollback instructions.
9. **Owner release approval:** Present the exact release and its evidence. Wait for a separate explicit approval before production deployment.
10. **Production verification:** After an approved deployment, verify the intended SHAs, health and key user flows, and monitor the release. Record results and recommend rollback if a release fails. Do not perform a production rollback or data restore unless the owner's release authorization explicitly covers that action or the owner separately authorizes it.

A failed or unavailable gate is reported as **BLOCKED** or **NOT VERIFIED**. The controller does not infer success from code completion, screenshots, a local build, a preview, or an unrelated CI run.

## 6. Approval boundaries

Approval of this architecture means the design may be written and reviewed. It does not authorize product code changes, account-level infrastructure changes, production deployment, merging PR #1 or PR #2, or a database migration.

For future milestones:

- The owner approves product/design decisions when the blueprint leaves an open choice.
- Each implementation plan states what work will be done and in which repository.
- Changes are proposed through reviewable branches and PRs. The controller must not mark a draft PR ready or merge it without explicit authorization for that action.
- Staging setup that requires account credentials or production-adjacent configuration is presented as a concrete, reviewable change and uses separate staging resources.
- Production deployment requires approval tied to a specific release candidate and its evidence.

## 7. Failure and interruption handling

- If repository, provider, or deployment access is unavailable, continue independent read-only analysis and local/CI validation where useful. Name the exact missing evidence.
- If tests fail, use the systematic debugging workflow before proposing a fix. Do not silently weaken or delete a test to make a gate pass.
- If a reviewer raises a material issue, assess it against requirements and evidence, then resolve or explicitly document it before release.
- If a task spans both repositories, identify ordering and contract dependencies in the plan. Keep each repository's changes reviewable.
- Update the roadmap after a milestone with requirement IDs, files/PRs, migrations, tests and results, verified deployment facts, limitations, and next unblocked work.
- Do not include secrets, real child data, or personal learner information in project artifacts.

## 8. Definition of success

The architecture is ready to implement when:

- The owner approves this written design.
- A written implementation plan identifies the exact documentation changes and verification steps.
- Both repositories contain concise, consistent instructions with one canonical shared policy.
- The workflow explains how to select the installed skills and role specialists without implying persistent bots.
- Every development milestone has a reviewable branch, acceptance criteria, and truthful test evidence.
- Staging, recovery, and production approval gates are explicit and cannot be described as passed without recorded evidence.
- Existing PRs and production data remain unchanged unless separately authorized.

## 9. Non-goals

This design does not:

- Create permanent autonomous agents or unattended scheduled coding.
- Replace the existing frontend/backend architecture or split the project into a third repository.
- Enable direct pushes to `main`, automatic merges, or automatic production deployment.
- Claim the current staging, authentication, backup, or recovery gaps are resolved.
- Authorize changes to live Firebase, Railway, Cloudflare, Stripe, or PostgreSQL accounts.
- Treat generated curriculum as human-reviewed or simulated learning as real model training.

## 10. Source references

- Library product authority: `SkillSprout-2.3.md`, version 2.3, dated 2026-09-22.
- Frontend repository: `suraka/skillsprout`.
- Backend repository: `suraka/skillsprout-backend`.
- Canonical roadmap and current evidence: `docs/ROADMAP_AND_FEATURE_STATUS.md` in the frontend repository.
- Existing review context: frontend PR #1 and backend PR #2, both recorded as draft and unmerged.
