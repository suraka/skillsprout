# SkillSprout Store and Subscription Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Add a truthful Store catalog and a secure, test-mode-ready subscription flow while keeping checkout disabled until product settings are approved and configured.

**Architecture:** Extend FastAPI and SQLAlchemy/Alembic patterns with subscription state, server-owned plan/price mapping, hosted Stripe Checkout and Customer Portal sessions, and signed idempotent webhook processing. Webhooks update billing state; browser redirects never grant access. Product price/tax/cancellation choices remain open.

**Tech Stack:** Python 3.12, FastAPI, SQLAlchemy async, PostgreSQL, Alembic, Stripe Python SDK, pytest.

**Spec:** docs/superpowers/specs/2026-09-30-store-admin-navigation-design.md

## Global Constraints

- Keep Python >=3.12,<3.13 and the current backend architecture.
- Only verified parent/guardian accounts may initiate checkout or portal sessions.
- Use Stripe test mode only; do not create live products/customers, transact, alter live settings, deploy, or merge.
- Verify webhook signatures and process events idempotently; redirects never prove payment.
- Disable purchase controls unless approved plans and valid provider configuration exist.
- Never expose card data, secrets, Firebase credentials, or Stripe secret keys.
- Do not guess prices, currency, billing periods, trial, tax, refund, or cancellation terms.

## Review Focus

- Missing/partial billing configuration keeps browse working and checkout disabled: test both.
- Student or ineligible account cannot start checkout: test role checks.
- Bad webhook signature is rejected before persistence: test missing/altered signature.
- Duplicate/out-of-order events cannot duplicate or wrongly restore entitlements: test replay and event order.
- Checkout success redirect does not grant access before webhook: test unchanged entitlement.

---

### Task 1: Define billing contracts and tests

**Files:**
- Create: tests/test_billing_api.py
- Inspect: app/models.py, app/routes.py, app/schemas.py, app/security.py, app/db.py, Alembic versions

**Interfaces:**
- Produces: plan listing, checkout, portal, subscription-state, webhook, entitlement contracts.

- [ ] Add failing tests for parent-only checkout, safe plan listing, missing config, signature validation, event replay, and success redirect without webhook.
- [ ] Define safe public fields (display name, configured amount/currency/interval, availability) and parent subscription fields (status, period/cancel dates).
- [ ] Run uv run pytest tests/test_billing_api.py -q. Expected: feature tests fail before implementation.

### Task 2: Persist subscriptions and processed webhook IDs

**Files:**
- Modify: app/models.py, app/repositories.py
- Create: Alembic migration under alembic/versions/
- Test: tests/test_billing_api.py

**Interfaces:**
- Produces: subscription state keyed by provider subscription ID and processed event rows keyed uniquely by provider event ID; plan-to-price mapping stays server-side.

- [ ] Add subscription/entitlement and event-deduplication tables with unique provider identifiers and timestamps.
- [ ] Add a migration that preserves existing users, courses, enrollments, and progress.
- [ ] Test upgrade and duplicate-event uniqueness against the supported test DB.

### Task 3: Implement parent sessions and signed webhook processing

**Files:**
- Modify: pyproject.toml, app/routes.py, app/services.py
- Create or modify: app/billing.py
- Test: tests/test_billing_api.py

**Interfaces:**
- Produces: GET /api/v1/billing/plans, POST /api/v1/billing/checkout-session, POST /api/v1/billing/customer-portal, POST /api/v1/billing/webhook. Parent routes use parent_user; webhook verifies raw request body and provider signature.

- [ ] Add Stripe SDK/config validation and fail closed when secrets, approved price mappings, or return URLs are missing.
- [ ] Create hosted sessions server-side without storing card data.
- [ ] Process lifecycle events transactionally and idempotently; update entitlements only from verified events.
- [ ] Test signature failure, replay/order, missing config, guardian-only access, and no redirect fulfillment.

### Task 4: Connect Store offerings and entitlements

**Files:**
- Modify: app/services.py and catalog schemas only if access state is required; frontend Store/provider per companion frontend plan
- Test: tests/test_billing_api.py and frontend browser Store cases

**Interfaces:**
- Produces: configured offers and access decisions derived from server-side subscription state.

- [ ] Show only approved offers; never fabricate amounts or status.
- [ ] Ensure active entitlements grant configured access; canceled/expired subscriptions end access as configured.
- [ ] Keep Store browsing available without billing setup but disable checkout with clear availability.
- [ ] Add admin-only GET /api/v1/admin/subscriptions with bounded pagination, returning plan/status/period/cancellation fields only; test non-admin denial and ensure no payment credentials are returned.

### Task 5: Verify isolated billing behavior

**Files:** No live billing configuration or external production changes.

- [ ] Run uv run pytest, uv run ruff check ., and migrations against isolated test DB/config.
- [ ] Use Stripe fixtures or test mode only and document tested session/webhook paths.
- [ ] Confirm no live resource, transaction, deployment, or merge occurred.
- [ ] Commit to isolated backend branch; create a draft PR only after frontend/backend contract checks.
