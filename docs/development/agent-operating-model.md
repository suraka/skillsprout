# SkillSprout agent operating model

## Authority and control

The owner-provided SkillSprout-2.3.md, preserved at [../MASTER_BLUEPRINT.md](../MASTER_BLUEPRINT.md), is the v2.3 product specification. The [roadmap and feature status](../ROADMAP_AND_FEATURE_STATUS.md) tracks implementation and evidence. If these or a task request conflict on product direction, record the exact conflict and ask the owner to resolve it before implementing that decision. Do not convert a proposed feature into an implemented or approved one by editing documentation.

One controller coordinates scoped work, checks current repository and status evidence, assigns on-demand roles, integrates findings, and reports to the owner. The seven roles are:

| Role | Responsibility |
|---|---|
| Product and learning | Scope, age/ability fit, outcome IDs, curriculum and qualified human review requirements. |
| UX and accessibility | Child and adult journeys, keyboard/touch/screen-reader behavior, contrast, motion and device review. |
| Frontend engineer | React/TypeScript UI, guest/runtime behavior, frontend tests and build. |
| Backend and data engineer | FastAPI/PostgreSQL APIs, migrations, server authorization, evidence provenance and data boundaries. |
| Payments and platform | Adult billing, provider/webhook boundaries, infrastructure and environment configuration. |
| QA, safety, and security | Independent challenge, regression evidence, privacy and safety checks, access control and secret handling. |
| Release and operations | CI, staging and deployment provenance, backups, recovery, smoke checks and rollback records. |

Roles are session-based assignments for bounded tasks. They do not run in the background, monitor systems unattended, or receive standing production access. The controller remains accountable for synthesis; role output is evidence to review, not automatic approval.

## Repository ownership and working flow

The frontend source, shared product documents, roadmap, and frontend test record live in suraka/skillsprout. The backend application, database migrations, backend tests, and backend operational configuration live in suraka/skillsprout-backend. Coordinate cross-repository contracts and record both exact commit SHAs. Do not edit a backend migration or claim backend readiness from a frontend PR. Inspect branch/base, relevant source and existing tests, current roadmap/status, and applicable CI and deployment evidence before proposing changes.

1. Plan a bounded outcome and acceptance evidence against v2.3. Mark dependencies, privacy impact, and any owner decision. Keep requirement IDs and prior status history intact.
2. Implement on an isolated feature branch in the owning repository. Preserve current working behavior, identifiers, learner rows, and migration history; use synthetic data. Update contracts and tests for affected behavior.
3. Run relevant checks and record exact commands, commit SHAs, failures, and limits. A successful build or preview proves only its tested scope.
4. Obtain independent review of the diff and sensitive flows. Qualified curriculum, accessibility, safety, and family reviews remain distinct from code review and automated tests.
5. Open a draft PR with scope, evidence, gaps, and rollback implications. The controller reconciles review findings and updates truthful status before requesting a decision.

## Child data and status boundaries

Never place real learner or child data, credentials, or production secrets in prompts, branches, test fixtures, logs, screenshots, or reports. Use isolated synthetic accounts and datasets for staging. A child-facing guest preview must not be described as saved learning or verified mastery; client-claimed completion and legacy rows retain their original provenance. Saved learner work requires guardian/learner identity and consent decisions, server-side ownership checks on each resource, retention and rights workflows, and migration/recovery review. Payment and AI features require their own adult, vendor, safety, and privacy gates.

Use explicit statuses such as BUILT, VERIFIED (with exact scope), PARTIAL, NOT TESTED, BLOCKED, and NOT VERIFIED. Separate user-reported review from an attached reviewer decision; do not claim real authentication, staging, production source, backup, restore, deployment, or educational approval without direct evidence. Failed and blocked checks remain visible.

## Authorization

Only the owner or an explicitly designated authorized maintainer may authorize a merge or release action after reviewing the [release gates](release-gates.md). Agents and role assignments cannot grant themselves this authority. A staging decision does not authorize production. Keep draft PRs unmerged until the responsible human makes the separate decision; do not mark ready, enable auto-merge, deploy, migrate production, or alter live learner data on the strength of this document.
