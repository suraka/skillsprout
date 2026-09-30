# SkillSprout Store and Admin Redesign — Design Spec

**Status:** Draft for user review  
**Date:** 2026-09-30  
**Scope:** Product and interaction design for the approved redesign; no application code, API, billing configuration, or data has been changed.

## Goals

Redesign SkillSprout around a polished, welcoming learning home while keeping its own logo, palette, illustrations, and child-friendly character. Support younger learners and older children, keep parent areas calm and clear, and add real Store and admin operations without pretending that unavailable capabilities already exist.

The supplied Apple TV screenshots are layout references only: a featured item, browsable content rows, clear progress/action details, and compact mobile navigation. Do not reuse Apple marks, Apple TV naming, show artwork, or screenshot copy.

## Navigation and route map

The five learner-facing destinations are always the primary navigation:

| Label | Proposed route | Behavior |
|---|---|---|
| Home | / | Featured learning experience, resume card, and curated learning shelves |
| AI | /ai | Curated AI-related courses, projects, and guided learning activities; not an unsupervised chatbot |
| Store | /store | Published courses and family plans with clear prices and purchase actions when billing is configured |
| Library | /library | Existing enrollments, courses, progress, and continue-learning actions |
| Search | /search | Search the published catalog with age/skill filters |

The account menu is separate from these five items. For a signed-in parent it contains **Profile**, **Switch profile**, **Settings**, and **Log out**. “Switch profile” selects among that parent’s linked learner profiles; learners do not get a separate sign-in or access to parent controls. Profile/settings routes should preserve the existing parent and account flows where possible.

For an admin, /admin opens an admin dashboard behind server-verified admin authorization. Its admin-only section navigation is **Dashboard**, **Users**, **Subscriptions**, **Learning history**, **Studio**, and **Settings**, with **Log out** in the account menu. /admin/studio keeps the existing course authoring experience. Admin screens must not be reachable by hiding links alone; every data API must enforce admin access.

Existing routes remain compatible: /learning redirects or aliases to /library; /parents remains the family/profile area; current course and lesson routes, including guest demos, remain in place. Existing /admin Studio links should be updated to /admin/studio without losing access to the editor. There is no Apple TV menu entry in the current main branch; the implementation should ensure it is absent throughout navigation and copy.

## Home and content layout

- Start with a prominent, owned-asset featured learning experience and a single clear action.
- Follow with horizontal shelves such as **Continue learning**, **Explore by age or skill**, **Featured courses**, **Projects**, and **Recently viewed**. Render only shelves supported by real data; omit or show a useful empty state otherwise.
- Course/project cards show readable titles, age or skill context where available, concise descriptions, and a useful action or honest progress state.
- Keep the hero compact on small screens. Shelves support keyboard and touch scrolling and remain discoverable without relying on gestures.
- The AI destination presents supervised, bounded educational activities/content. Do not imply a free-form chatbot or generated features unless they are separately built and safety-reviewed.
- Search, Store, and Library use shared card, filter, progress, and empty-state patterns. No dead tabs or invented destinations.

## Visual system and reusable parts

Retain the current SkillSprout logo/wordmark, colors, illustration language, and existing typography wherever they fit. Use generous spacing, calm surfaces, clear hierarchy, rounded cards, and a deliberate balance of playful learning visuals with readable, mature parent/admin screens. Use age-appropriate imagery and language without dividing the product into stereotyped “little kid” and “big kid” themes.

Proposed reusable UI: responsive app shell; labeled primary navigation; account/profile menu; admin section navigation; featured hero; course/project card; horizontal shelf; filter/search controls; progress summary; loading skeleton; branded short loading state; empty-state panel; and retryable error panel.

Loading should use the existing SkillSprout mark with wordmark in a brief, non-blocking status treatment while the main catalog/account data resolves. Use the real logo/mark already in the repository, not a replacement. Keep shell navigation and any already-available content usable during longer requests. Prefer skeletons for content regions; provide an accessible status announcement and a retryable error state. Do not insert an artificial delay or hold the page behind a splash.

## Store, subscriptions, and data boundaries

The current backend supports free courses and rejects paid enrollment; it has no subscription system or Stripe integration. Store purchases and subscription status therefore require backend work before those controls can be presented as live functionality.

Proposed purchase path: server-owned product/price catalog, parent-initiated hosted Checkout Session, signed and idempotently processed billing webhooks, persisted subscription/entitlement state, and hosted customer self-service portal. A checkout success URL is not proof of payment. Use Stripe test/sandbox resources for implementation and verification only. Do not create live products/customers, change billing settings, or deploy. Do not choose prices, currencies, billing intervals, taxes, or cancellation policy in this spec; those decisions need product input before purchase is enabled.

Only a parent/guardian account can purchase. Protect child profile data and do not show payment controls in learner mode. Never expose card data, billing secrets, Firebase tokens, or internal authentication identifiers in the client.

## Admin dashboard and learning history

The dashboard should present operationally useful, role-protected information:

- **Users:** parent account display name/email, account status and creation date, plus linked learner profile names, age bands, and status as needed for support.
- **Subscriptions:** plan, status, billing period dates, cancellation state, and safe provider reference/status. Do not expose payment credentials.
- **Learning history:** enrollments and current lesson progress with the timestamps already stored; useful filters and pagination.
- **Studio:** existing course creation and editing.
- **Settings:** safe application-level preferences only; never environment variables or secrets.

“Learning history” must be described accurately. Existing records include enrollment dates and current lesson progress/status timestamps, not a complete event timeline. Historical clicks or lesson events cannot be reconstructed. If a chronological event history is required, add minimal privacy-conscious event recording prospectively and define retention/access rules before collecting it. Any user detail screen must remain admin-only, use least-privilege fields, and avoid unnecessary child personal information. No learner impersonation.

## Motion and accessibility

Use short transitions (roughly 120–220 ms) for navigation, menus, pressed states, and card feedback. Use subtle hover/focus elevation or small hero/card movement only when it helps communicate interaction. No autoplay carousel, parallax, looping decoration, or reward animation that competes with lesson content. Honor prefers-reduced-motion by removing nonessential movement and reducing transitions.

Provide semantic headings/landmarks, visible keyboard focus, adequate color contrast, labeled icons, keyboard-operable menus and shelves, touch targets around 44–48 px, and reduced-motion support. Mobile bottom navigation must have text labels, safe-area padding, clear active state, and must not cover page actions or lesson content. Keep parent/admin data tables usable at narrow widths through responsive summaries or contained horizontal scrolling.

## Loading, empty, and error behavior

- **Loading:** branded, brief logo status and content skeletons; preserve shell access and avoid a blocking splash.
- **Empty:** explain the next useful action (for example, no courses in Library yet) with a working route/action.
- **Error:** plain-language message, retry action, and graceful offline/guest fallback where currently supported.
- **Store unavailable:** if billing is not configured, do not show a purchase button that cannot work; explain availability without fabricating a checkout.
- **Admin data unavailable:** distinguish an empty result from failed/unauthorized access; never silently fall back to sample data for real admin views.

## Likely implementation areas

Frontend: components/skillsprout/site.tsx, components/skillsprout/provider.tsx, app/globals.css, route handlers/pages under app/, and existing assets in public/. Add route aliases/pages and small reusable components only where supported by the current app architecture. Keep the React/TypeScript and Cloudflare-compatible build path.

Backend/API work: current identity/role security, route/service/repository/model layers, and migrations for subscriptions/entitlements and any prospective learning events. Add typed, paginated admin endpoints and billing endpoints with server-side authorization. Preserve Firebase authentication and current free course, lesson, progress, guest/offline, and parent/child flows.

The precise repository split and API contracts should be confirmed during implementation planning after the user accepts this spec. Do not replace the app architecture or change unrelated APIs.

## Verification plan

- Frontend: existing TypeScript, lint, runtime, browser, staging-config, and Cloudflare build checks; test guest and signed-in paths, route aliases, loading/empty/error states, and course/lesson/progress regressions.
- Browser layout: inspect and exercise Home, Search, Store, Library, parent menu/switch profile, and admin dashboard/Studio at mobile, tablet, and desktop widths. Check keyboard/focus and reduced-motion behavior.
- Backend: test parent/admin authorization, parent-child data isolation, pagination, subscription entitlement transitions, webhook signature validation/idempotent retries/out-of-order events, and migrations against existing data.
- Billing: use Stripe test mode only; no live configuration or transactions.
- Keep all changes on an isolated feature branch and prepare draft pull request(s) only after implementation and checks. Do not deploy or merge.

## Decisions required before Store checkout is enabled

1. Plans, prices, currency, billing periods, free-trial policy, and tax handling.
2. Cancellation, refund, and failed-payment behavior to display.
3. Whether “all user information” means only the operational fields listed here; this spec excludes credentials and unnecessary child personal data.
4. Retention period and exact events for any new prospective learning-history timeline.
5. Confirm whether AI is a curated learning hub (assumed here), rather than a generative assistant feature.

These decisions do not block designing the navigation or implementing the existing free-learning flows. Any unresolved commerce or history behavior must remain visibly unavailable rather than being guessed.
