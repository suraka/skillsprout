# SkillSprout Agent Operating Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add consistent repository instructions and a release-evidence workflow for SkillSprout's on-demand specialist roles.

**Architecture:** Keep the existing frontend and backend repositories. The frontend repository will hold the canonical shared operating model and release gates; each repository will have a concise root `AGENTS.md`. The frontend documentation change will build on the current PR #1 branch so it can update the roadmap already present there without changing PR #1's own branch or status.

**Tech Stack:** Markdown documentation; GitHub branches and draft pull requests; existing frontend CI and backend CI for regression checks.

**Spec:** [`docs/superpowers/specs/2026-09-29-autonomous-development-architecture-design.md`](../specs/2026-09-29-autonomous-development-architecture-design.md)

## Global Constraints

- The current product authority is `SkillSprout-2.3.md` (v2.3, 2026-09-22); resolve any conflict with the owner.
- The frontend is TypeScript/React and requires Node `>=22.13.0`; the backend uses Python `>=3.12,<3.13`.
- Keep shared project policy canonical in `suraka/skillsprout`; keep backend implementation and backend-specific instructions in `suraka/skillsprout-backend`.
- Use feature branches. Do not write to either repository's `main` branch.
- Keep frontend PR #1 and backend PR #2 open, draft, and unmerged. Do not mark either ready, edit their source branches, or change their metadata.
- Production deployment, live environment changes, and production database migrations are outside this documentation plan.
- No production deployment without separate approval for an exact release candidate.
- Do not place secrets, private child information, or real learner records in repository content, issues, logs, or tests.
- Agent roles are session-based assignments, not permanent bots or unattended services.
- Missing staging, authentication, production-provenance, backup, or restore evidence must remain marked `BLOCKED` or `NOT VERIFIED`.

## Review Focus

1. **Broken canonical links:** frontend instructions must point to files created in the frontend repo; backend instructions must point to the canonical frontend policy. Validate each target path and URL.
2. **Role authority creep:** a specialist must not receive permission to merge, alter production configuration, migrate production data, or deploy production. Assert these limits appear in both repository instructions.
3. **False autonomy claims:** instructions must not imply that agents run continuously, work after the session, or possess standing production access. Search for and remove such claims.
4. **Evidence reported as success:** missing staging/authentication/backup/recovery evidence must not be described as passed. Assert the release-gate file spells out the blocked states and evidence required.
5. **PR and branch damage:** PR #1 and PR #2 must retain their current draft/unmerged state and branch refs. Capture their state before work and verify it again after the documentation PRs are prepared.

---

## File structure

### Frontend repository: `suraka/skillsprout`

- Create `AGENTS.md`: short entry point for contributors and coding agents; links to the shared operating model and release gates.
- Create `docs/development/agent-operating-model.md`: roles, role boundaries, task workflow, skill selection, repository ownership, and continuity rules.
- Create `docs/development/release-gates.md`: staging, recovery, and production evidence requirements and owner approval boundaries.
- Modify `docs/ROADMAP_AND_FEATURE_STATUS.md`: add links to the operating model and release gates without changing existing requirement status or evidence.

### Backend repository: `suraka/skillsprout-backend`

- Create `AGENTS.md`: backend-specific implementation boundaries, Python/test commands, data and migration safeguards, and links to the canonical shared frontend guidance.

No application source, tests, migrations, deployment configuration, secrets, or database data are changed.

## Branch and pull request handling

- Capture the current PR #1 and PR #2 state and head branch SHAs before work.
- The frontend roadmap currently exists on PR #1's source branch rather than `main`. Create a new frontend implementation branch from the current PR #1 source branch head. Do not push commits to PR #1's source branch. Open a separate draft PR targeting that source branch so the diff contains only the new operating documentation. Keep PR #1 itself open and draft.
- Create an independent backend implementation branch from backend `main`. Open a draft PR against backend `main`.
- Do not merge either documentation PR. If PR #1 is later merged by the owner, the frontend documentation PR can be retargeted to `main`; until then it remains stacked on PR #1's branch.
- Backend guidance links to the canonical frontend file path on `main`, which becomes live after the frontend documentation is merged. During review, verify the target file exists on the frontend documentation branch.
- Preserve exact branch names, PR head SHAs, and draft states in the final report.

---

### Task 1: Add the canonical frontend operating model and release gates

**Files:**
- Create: `suraka/skillsprout/AGENTS.md`
- Create: `suraka/skillsprout/docs/development/agent-operating-model.md`
- Create: `suraka/skillsprout/docs/development/release-gates.md`
- Modify: `suraka/skillsprout/docs/ROADMAP_AND_FEATURE_STATUS.md`

**Interfaces:**
- Consumes: approved design at `docs/superpowers/specs/2026-09-29-autonomous-development-architecture-design.md`; existing v2.3 roadmap and evidence on the current PR #1 source branch.
- Produces: shared policy at `docs/development/agent-operating-model.md`; gate checklist at `docs/development/release-gates.md); root-level entry links in `AGENTS.md`; roadmap links that do not alter existing status.

- [ ] **Step 1: Capture the frontend baseline**

Fetch the current PR #1 metadata, head ref, head SHA, draft state, and the current roadmap and test-evidence files from that exact ref. Confirm PR #1 is open and draft. Record the exact head SHA in the implementation report.

- [ ] **Step 2: Create an isolated frontend branch**

Create `codex/agent-control-frontend` from the captured PR #1 head SHA using an isolated worktree. Keep PR #1's head branch untouched.

- [ ] **Step 3: Write `AGENTS.md` and the shared operating model**

In `AGENTS.md`, state the blueprint and workflow entry points, require inspection before edits, require a feature branch, preserve functionality/data, and link to the operating model and release gates.

In `docs/development/agent-operating-model.md`, define the controller, the seven on-demand specialist roles, responsibilities, skill selection, frontend/backend ownership, continuity reporting, and limits on independent specialist actions. State plainly that roles are session-based and do not run in the background.

- [ ] **Step 4: Write the release-gate checklist**

In `docs/development/release-gates.md`, specify exact evidence fields for CI, review, staging, auth/authorization, migrations, backups, isolated restore, deployment SHAs, smoke checks, limitations, and rollback. Mark the currently unknown staging and recovery items as `NOT VERIFIED`; never imply this documentation creates the missing environment or evidence.

- [ ] **Step 5: Add navigation links to the roadmap**

Append a short section to `docs/ROADMAP_AND_FEATURE_STATUS.md` linking to both shared documents. Preserve existing requirement IDs, statuses, test results, and open items byte-for-byte outside the added section.

- [ ] **Step 6: Validate the frontend documents**

Run from the frontend repository root:

```bash
python3 - <<'PY'
from pathlib import Path

required = {
    "AGENTS.md": ["docs/development/agent-operating-model.md", "docs/development/release-gates.md"],
    "docs/development/agent-operating-model.md": [
        "Controller", "Product and learning", "UX and accessibility",
        "Frontend engineer", "Backend and data engineer",
        "Payments and platform", "QA, safety, and security",
        "Release and operations", "do not run in the background",
    ],
    "docs/development/release-gates.md": [
        "NOT VERIFIED", "isolated", "production", "owner approval",
    ],
    "docs/ROADMAP_AND_FEATURE_STATUS.md": [
        "docs/development/agent-operating-model.md",
        "docs/development/release-gates.md",
    ],
}
for name, phrases in required.items():
    text = Path(name).read_text()
    for phrase in phrases:
        assert phrase in text, f"{name}: missing {phrase!r}"
print("frontend agent-document checks passed")
PY
```

Expected: `frontend agent-document checks passed`. Also run the repository's existing frontend CI checks and confirm no application source or configuration file changed.

- [ ] **Step 7: Commit and open a draft documentation PR**

Commit the four documentation changes on `codex/agent-control-frontend`. Open a draft PR whose base is the captured PR #1 source branch. Verify the new PR's changed-file list contains only the four planned documentation files and PR #1 remains open, draft, unmerged, with its original head SHA.

### Task 2: Add backend-specific agent instructions

**Files:**
- Create: `suraka/skillsprout-backend/AGENTS.md`

**Interfaces:**
- Consumes: canonical shared frontend docs from Task 1; existing backend `README.md`, `pyproject.toml`, workflows, and tests.
- Produces: backend-only instructions that link to the canonical shared policy and accurately state repository test commands.

- [ ] **Step 1: Capture the backend baseline**

Fetch PR #2 metadata and backend `main` SHA. Confirm PR #2 is open and draft. Inspect `README.md`, `pyproject.toml`, and CI workflow files to copy actual test/lint commands rather than guessing.

- [ ] **Step 2: Create an isolated backend branch**

Create `codex/agent-control-backend` from backend `main` in an isolated worktree.

- [ ] **Step 3: Write backend `AGENTS.md`**

Include Python `>=3.12,<3.13`, actual backend validation commands, Firebase token/authorization expectations, family-data isolation, additive migration safeguards, synthetic test data, and the canonical shared-policy links. State that production environment changes, migrations, and deployments require a separately approved release.

- [ ] **Step 4: Validate the backend instructions**

Run from the backend repository root:

```bash
python3 - <<'PY'
from pathlib import Path

text = Path("AGENTS.md").read_text()
required = [
    "3.12", "family", "migration", "synthetic",
    "docs/development/agent-operating-model.md",
    "docs/development/release-gates.md",
    "production", "approval",
]
for phrase in required:
    assert phrase in text, f"AGENTS.md: missing {phrase!r}"
print("backend agent-document checks passed")
PY
```

Expected: `backend agent-document checks passed`. Run the actual backend CI commands discovered in Step 1 and verify no application or migration file changed.

- [ ] **Step 5: Commit and open a draft backend PR**

Commit `AGENTS.md` on `codex/agent-control-backend`. Open a draft PR against backend `main`. Verify only `AGENTS.md` changed, PR #2 remains open, draft, and unmerged, and the backend PR diff does not include the existing review-gate PR's changes.

### Task 3: Cross-repository review and handoff

**Files:**
- Review: frontend `AGENTS.md`, `docs/development/agent-operating-model.md`, `docs/development/release-gates.md`, `docs/ROADMAP_AND_FEATURE_STATUS.md`
- Review: backend `AGENTS.md`

**Interfaces:**
- Consumes: Task 1 frontend draft PR and Task 2 backend draft PR.
- Produces: a verified, cross-linked documentation proposal and a concise implementation report.

- [ ] **Step 1: Check cross-repository consistency**

Confirm role names, approval rules, repository ownership, skill workflow, and evidence states agree. Verify the backend's canonical link targets exist in the frontend draft PR.

- [ ] **Step 2: Review for unsafe or misleading instructions**

Search all five files for claims that agents are persistent, have standing production access, can bypass missing evidence, or may merge/deploy without the specified approval. Resolve every match in context.

- [ ] **Step 3: Recheck remote state**

Verify PR #1 and PR #2 are still open, draft, and unmerged and their source head SHAs match the captured baseline. Verify both documentation PRs are draft and list only their planned files.

- [ ] **Step 4: Report evidence and limitations**

Report exact PR links, source and target branches, changed paths, CI checks run, current staging/recovery gaps, and any blocked cross-repo link behavior. Do not describe this documentation setup as staging validation or production readiness.

---

## Handoff

This documentation-only plan spans two repositories and the frontend work is stacked on PR #1's source branch. Follow the execution method the owner selects:

- **Subagent-driven:** use a fresh implementer for each task and a fresh reviewer before moving to the next task, followed by a cross-repository review.
- **Native:** implement the tasks sequentially in this session, then use one fresh independent reviewer for the whole branch.

Keep both resulting PRs in draft until the owner reviews them. The owner must separately authorize any merge, environment change, migration, or production action.
