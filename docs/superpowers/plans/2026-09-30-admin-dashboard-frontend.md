# SkillSprout Admin Dashboard Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Turn the existing admin Studio entry into a role-protected dashboard for users, subscriptions, learning history, course creation, and settings.

**Architecture:** Keep the existing React/TypeScript App Router and API client. Make /admin the dashboard, move the existing editor route to /admin/studio, and add responsive admin sections that consume server-authorized APIs from the admin-data and billing plans. Client role checks improve navigation only; APIs remain the security boundary.

**Tech Stack:** React 19, TypeScript, Next App Router via Vinext, CSS, Playwright.

**Spec:** docs/superpowers/specs/2026-09-30-store-admin-navigation-design.md

## Global Constraints

- Keep Node >=22.13.0 and pnpm@11.25.0.
- Preserve React/TypeScript, Cloudflare build, Firebase auth, and existing Studio behavior.
- Every page handles unauthorized/error/empty states distinctly; never show sample records as real admin data.
- Display only operational fields; do not expose credentials, tokens, payment details, or unnecessary child personal data.
- At narrow widths, tables must become summaries or scroll within their own region.
- Keep Settings limited to safe application-level preferences; never expose environment configuration or secrets.

## Review Focus

- A non-admin visiting /admin is redirected or shown an access-denied view without fetching/displaying admin data: test parent and student sessions.
- An API failure is not presented as an empty user/subscription list: test 401/403/5xx responses.
- Empty admin datasets provide clear empty states and no fake values: test each section with empty fixtures.
- Learner profile records show only approved limited fields: test response rendering and omit birth year/Firebase UID.
- Mobile lists remain readable and operable: test narrow viewport, keyboard focus, and pagination.

---

### Task 1: Add admin route and authorization browser tests

**Files:**
- Create: tests/browser/admin-dashboard.spec.ts
- Inspect: app/admin/page.tsx, current Studio navigation, provider.tsx, Playwright fixtures

**Interfaces:**
- Consumes: admin and non-admin auth fixture/session, APIs from companion backend plans.
- Produces: expected admin route map and accessible loading/empty/error/unauthorized states.

- [ ] Test /admin, /admin/users, /admin/subscriptions, /admin/learning-history, /admin/studio, and /admin/settings.
- [ ] Test parent/student access denial; verify no admin data is rendered.
- [ ] Test empty and failed API responses separately.
- [ ] Run pnpm test:browser -- tests/browser/admin-dashboard.spec.ts. Expected: missing routes and states fail.

### Task 2: Preserve Studio and create shared admin shell

**Files:**
- Modify: app/admin/page.tsx
- Create: app/admin/studio/page.tsx
- Create: components/skillsprout/admin-shell.tsx
- Modify: components/skillsprout/site.tsx and app/globals.css as needed

**Interfaces:**
- Consumes: verified admin identity and existing Studio page/component.
- Produces: /admin dashboard route, /admin/studio existing editor, admin section navigation for Dashboard, Users, Subscriptions, Learning history, Studio, Settings.

- [ ] Move/reuse existing course authoring UI at /admin/studio without changing its behavior.
- [ ] Make /admin the dashboard and add an admin-only navigation shell; retain Log out in account menu.
- [ ] Guard page rendering for non-admin sessions and rely on API authorization for data.
- [ ] Run browser tests for admin and non-admin identities; expected: Studio still creates/edits courses and non-admin sees no data.

### Task 3: Build operational admin sections

**Files:**
- Create: app/admin/users/page.tsx, app/admin/subscriptions/page.tsx, app/admin/learning-history/page.tsx, app/admin/settings/page.tsx
- Create or modify: components/skillsprout/admin-data.tsx
- Modify: components/skillsprout/provider.tsx only if shared API client needs typed methods

**Interfaces:**
- Consumes: GET /api/v1/admin/summary, GET /api/v1/admin/users, GET /api/v1/admin/users/{user_id}, GET /api/v1/admin/users/{user_id}/learning-history, GET /api/v1/admin/subscriptions from companion backend plans.
- Produces: paginated Users and Subscriptions lists, per-account learning history, and safe settings page.

- [ ] Render users and linked learner profile names/age bands/status only; use server pagination and search.
- [ ] Render subscriptions using plan/status/period/cancellation fields; never expose provider secrets or payment data.
- [ ] Render only current stored enrollment/progress facts with clear timestamps; do not imply a complete historical event log.
- [ ] Add error, retry, empty, loading, and unauthorized states for every section; never use mock data in live admin pages.
- [ ] Restrict settings to safe operational preferences and make every displayed control functional.
- [ ] Run browser tests; expected: fields, pagination, and states match the API contracts.

### Task 4: Verify responsive admin behavior

**Files:** No additional implementation files unless a concrete issue requires one.

- [ ] Verify desktop, tablet, and mobile admin layouts, including focus, keyboard access, and long names/status labels.
- [ ] Verify direct route loads do not bypass authentication and reload retains correct access behavior.
- [ ] Run pnpm exec tsc --noEmit, pnpm lint, pnpm test:browser, and pnpm build.
- [ ] Commit on an isolated frontend feature branch and prepare a draft PR after backend contract checks; do not merge or deploy.
