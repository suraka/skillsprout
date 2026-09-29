# SkillSprout agent instructions

## Authority and evidence

The owner-provided SkillSprout-2.3.md, preserved in this repository as [docs/MASTER_BLUEPRINT.md](docs/MASTER_BLUEPRINT.md), is the v2.3 product authority. If an instruction or implementation conflicts with it, surface the conflict and obtain owner resolution before changing that decision. [docs/ROADMAP_AND_FEATURE_STATUS.md](docs/ROADMAP_AND_FEATURE_STATUS.md) records implementation status and open work; inspect it and [docs/TEST_PLAN_AND_RESULTS.md](docs/TEST_PLAN_AND_RESULTS.md) alongside the relevant repository, CI, migrations, and deployment evidence before edits. Verify current branch, base, and working state before changing files. Never infer deployed behavior or release readiness from source or a preview alone.

## Work boundaries

Work on a feature branch and review through a draft pull request; never write directly to main. Preserve working features, course and learner identifiers, existing data, migration history, and historical evidence provenance. A guest-only activity can remain local and transient; saved family learning requires reviewed consent, server authorization, and an appropriately tested data design. Do not use real child data, production credentials, or production databases for development or QA. Report built, tested, reviewed, staged, and deployed states separately with exact evidence and limitations.

The [agent operating model](docs/development/agent-operating-model.md) defines session roles, repository ownership, and authorization. The [release gates](docs/development/release-gates.md) define evidence required before merge or production release. An agent's presence or draft PR does not grant standing access or release authority.
