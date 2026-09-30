# SkillSprout Admin User and Learning Data API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Add server-authorized admin views of accounts, linked learner profiles, subscriptions, and learning records that actually exist.

**Architecture:** Extend FastAPI router, schema, repository, and service patterns. Admin APIs use Firebase-verified identity and existing admin_user authorization. Subscription data is built by the companion billing plan.

**Tech Stack:** Python 3.12, FastAPI, SQLAlchemy async, PostgreSQL, Alembic, pytest.

**Spec:** docs/superpowers/specs/2026-09-30-store-admin-navigation-design.md

## Global Constraints

- Keep Python >=3.12,<3.13.
- Preserve Firebase auth and existing route contracts; add backward-compatible endpoints.
- Every admin endpoint enforces admin authorization on the server.
- Expose only support-necessary fields; never Firebase UIDs/tokens, secrets, payment credentials, or unnecessary child details.
- Existing learning records are enrollments and current progress/status timestamps, not a complete past event timeline.
- Use pagination and distinguish empty results from errors.

## Review Focus

- Parent calling an admin endpoint gets 403: test each new route as parent/admin.
- Student/unauthenticated access fails safely: test 401/403.
- Linked learner information cannot cross parent boundaries: test two parent accounts.
- Pagination/filter ordering is deterministic for empty and larger datasets: test bounds and stable ordering.
- Optional names, emails, and timestamps serialize safely: test null values.

---

### Task 1: Define response contracts and authorization tests

**Files:**
- Create: tests/test_admin_api.py
- Inspect: app/routes.py, app/security.py, app/schemas.py, existing fixtures

**Interfaces:**
- Consumes: current admin_user/current_user dependencies and test fixtures.
- Produces: admin summary, user list/detail, and user learning-history response shapes.

- [ ] Add failing tests for anonymous, parent, student, and admin calls.
- [ ] Define necessary fields: parent display name/email/role/status/created time; linked learner preferred/first name, age band/status; enrollment and current progress status/timestamps.
- [ ] Test pagination, filters, null optional values, and cross-parent isolation.
- [ ] Run uv run pytest tests/test_admin_api.py -q. Expected: route tests fail before endpoint implementation.

### Task 2: Implement admin repository queries and schemas

**Files:**
- Modify: app/repositories.py, app/services.py, app/schemas.py
- Test: tests/test_admin_api.py

**Interfaces:**
- Produces: typed paginated schemas and query/service functions accepting bounded limit/offset and optional search/status filters.

- [ ] Add stable-order queries for parent accounts, linked learner profiles, enrollments, courses, and current lesson progress.
- [ ] Exclude birth_year and other unnecessary child details.
- [ ] Run tests for stable pagination, null data, and isolation. Expected: all repository/service cases pass.

### Task 3: Add admin-only API routes

**Files:**
- Modify: app/routes.py and app/schemas.py
- Test: tests/test_admin_api.py

**Interfaces:**
- Produces: GET /api/v1/admin/summary, /users, /users/{user_id}, /users/{user_id}/learning-history.

- [ ] Add Depends(admin_user), validated UUIDs, bounded pagination, and 404 for missing account.
- [ ] Test that results state only stored enrollment/progress facts and do not imply an unrecoverable event timeline.
- [ ] Run uv run pytest tests/test_admin_api.py -q. Expected: all authorization, pagination, and serialization tests pass.

### Task 4: Verify backend regression

**Files:** None unless concrete failures require a change.

- [ ] Run uv run pytest and uv run ruff check .
- [ ] Confirm parent/student/course/progress APIs and schema are unchanged.
- [ ] Record results and commit on an isolated backend feature branch; do not deploy or merge.
