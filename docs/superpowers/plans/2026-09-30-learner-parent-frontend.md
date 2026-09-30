# SkillSprout Learner and Parent Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Redesign the learner and parent experience around the approved navigation while preserving sign-in, course, progress, and guest flows.

**Architecture:** Keep the existing React/TypeScript App Router and Vinext/Cloudflare build. Extend the current shell/provider patterns, reuse current assets and API data, and add pages only for working destinations. Admin APIs and billing are covered in companion plans.

**Tech Stack:** React 19, TypeScript, Next App Router via Vinext, CSS, Playwright.

**Spec:** docs/superpowers/specs/2026-09-30-store-admin-navigation-design.md

## Global Constraints

- Keep Node >=22.13.0 and pnpm@11.25.0.
- Preserve the current app architecture, Cloudflare build, Firebase auth, learning/progress flows, parent/child boundaries, guest demos, and offline behavior.
- Primary navigation labels are exactly Home, AI, Store, Library, Search.
- Use SkillSprout-owned logo, colors, and art. No Apple marks, Apple TV wording, show art, or screenshot copy.
- Never show a nonworking purchase action.
- Respect prefers-reduced-motion; mobile navigation must stay accessible and not obscure content.

## Review Focus

- Signed-out visitors retain guest demos and free catalog access: cover current guest routes in browser tests.
- A parent can switch only between that parent's linked learners: test two parents with different linked profiles.
- Slow or failed catalog requests leave navigation usable and expose retry: test delayed and rejected requests.
- Bottom navigation does not cover page actions on a narrow viewport: test mobile layout and safe-area padding.
- Reduced-motion disables nonessential movement: test Playwright reduced-motion emulation.

---

### Task 1: Pin route and navigation behavior

**Files:**
- Create: tests/browser/navigation-redesign.spec.ts
- Inspect: playwright config, current browser specs, app/page.tsx, components/skillsprout/site.tsx

**Interfaces:**
- Consumes: current routes and provider state.
- Produces: expectations for five primary labels, account actions, route compatibility.

- [ ] Add browser tests for Home, AI, Store, Library, Search; parent account labels; and absence of Apple TV copy.
- [ ] Cover /learning, /parents, course/lesson routes, and guest demos.
- [ ] Run pnpm test:browser -- tests/browser/navigation-redesign.spec.ts. Expected: failures only for missing redesigned destinations/actions; existing guest behavior remains green.

### Task 2: Implement shell, account menu, and profile switching

**Files:**
- Modify: components/skillsprout/site.tsx
- Modify: components/skillsprout/provider.tsx
- Modify: app/globals.css
- Inspect: app/layout.tsx and existing assets in public/

**Interfaces:**
- Consumes: authenticated parent, linked learners, existing route helpers.
- Produces: five-item navigation; Profile, Switch profile, Settings, Log out; active learner selection available to library/course views.

- [ ] Implement desktop navigation and labeled, safe-area-aware mobile bottom navigation with keyboard and focus support.
- [ ] Map Profile to current parent/family view. Switch profile may select only a linked learner. Settings must be a functioning existing or local preference control and must not imply unsupported account editing.
- [ ] Preserve sign-in/logout and admin entry points; keep parent controls out of learner lesson UI.
- [ ] Run focused browser tests. Expected: route actions work and guest demos remain usable.

### Task 3: Implement the five destinations

**Files:**
- Modify: app/page.tsx
- Create: app/ai/page.tsx, app/store/page.tsx, app/library/page.tsx, app/search/page.tsx
- Modify: components/skillsprout/site.tsx and provider.tsx as needed

**Interfaces:**
- Consumes: current catalog, learner, enrollment, progress data.
- Produces: reusable hero, shelf, course/project card, progress, search/filter, and empty-state patterns.

- [ ] Add browser assertions for Home shelves, curated AI content, Store listings, Library progress, Search results/filters, and empty states.
- [ ] Render only supported data and existing actions; do not invent courses or imply an open chatbot.
- [ ] Show checkout only when backend reports a configured offer; otherwise retain browsing and explain availability.
- [ ] Alias/redirect /learning to /library and retain /parents for family/profile.
- [ ] Run focused browser tests. Expected: each tab reaches working content and actions.

### Task 4: Add loading, error, motion, and responsive behavior

**Files:**
- Create: components/skillsprout/loading-state.tsx
- Modify: provider.tsx, app/globals.css, and relevant route loading/error files

**Interfaces:**
- Consumes: provider readiness/errors and real logo assets.
- Produces: nonblocking branded loading status, skeletons, retryable errors, useful empty states.

- [ ] Test delayed/failed catalog requests, accessible loading status, retry action, and navigation usability during load.
- [ ] Implement brief logo/wordmark loading with skeletons; no artificial delay or blocking splash.
- [ ] Add short interaction transitions, clear focus/press feedback, subtle hover movement, and reduced-motion overrides.
- [ ] Verify mobile, tablet, desktop, keyboard, safe area, and reduced-motion behavior.

### Task 5: Run frontend verification

**Files:** None unless a concrete failure requires changes.

- [ ] Run pnpm exec tsc --noEmit, pnpm lint, pnpm test:runtime, pnpm test:browser, pnpm test:staging-config, and pnpm build.
- [ ] Record actual browser viewport sizes and evidence; do not claim unrun checks.
- [ ] Confirm lesson, sign-in, guest, progress, and offline paths still work.
- [ ] Commit on an isolated feature branch and prepare a draft PR after checks; do not merge/deploy.
