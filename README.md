# SkillSprout frontend

A playful, responsive digital-skills academy for children and their parents, built with TypeScript, React and the Next.js App Router API. The Sites deployment uses the bundled Vinext adapter to run on Cloudflare Workers. This is the **frontend repository**; the Python/FastAPI service is in the separate SkillSprout backend repository.

## Included

- Searchable course library with topic and age filters.
- Six original sample courses with 18 practical lessons.
- Parent sign-in and account creation using Firebase email/password authentication.
- Parent dashboard, multiple learner profiles, enrollment and course progress.
- Lesson reader, activities, completion and next-lesson navigation.
- Administrator studio for courses, modules, lesson editing and publication.
- Accessible dialog/select/progress primitives, responsive layouts, custom favicon and sprout artwork.
- Optional read-only WebMCP course search, with unsupported-browser fallback.

## Preview versus connected mode

With `SKILLSPROUT_API_URL` empty, the site visibly labels itself **Preview mode**. Sample learners, enrollments and progress live in React memory only and disappear on reload. Use made-up names. This is not a replacement for the PostgreSQL backend.

With an API URL configured, the catalog and all learner/progress operations use FastAPI. Backend failures are shown as errors; the site does not silently save real learner data into demo storage. Firebase tokens are held in memory and refreshed during the visit. Reloading requires sign-in again. No password or token is written to localStorage.

The backend enforces authorization. Hiding the administrator navigation is only a convenience.

## Development

Node 22.13+ and the pnpm version declared in `package.json` are required.

```bash
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

The portable development server uses port 5173. Configure the backend `FRONTEND_URL` to match your actual frontend origin. In ChatGPT Work, the Sites preview service manages the development server.

Set:

```env
SKILLSPROUT_API_URL=https://YOUR-API-HOST
FIREBASE_WEB_API_KEY=YOUR-FIREBASE-PUBLIC-WEB-API-KEY
```

The API URL must be the origin, without `/api/v1`. Firebase and FastAPI must refer to the same Firebase project. Enable Email/Password sign-in in Firebase. Never copy service-account credentials into this repository or expose them through `/api/config`.

`/api/config` returns only the API origin and public web API key. All API requests send the Firebase ID token using the Authorization header. Backend instructions cover database migrations, initial catalog seeding and administrator promotion.

## Build and checks

```bash
pnpm exec tsc --noEmit
pnpm build
```

The preserved Sites build pipeline emits the Worker entry and public assets. The committed `.openai/hosting.json` identifies this specific SkillSprout Site; do not reuse its project ID for a different website. The pipeline uses `build/`, `scripts/`, and the existing lockfile. Backend source is deliberately separate.

## First release scope

This follows the supplied V0.1 milestone: parents, learners, courses, lessons, enrollment, progress and administrator publishing. Subscriptions, Stripe checkout, AI tutors, generation agents, quizzes and certificates are later milestones. There is no fake checkout or live AI feature in this release.

## Activation still required

The private Sites preview can be published without external secrets. Real accounts and durable progress require the backend hosted with PostgreSQL and Firebase credentials, followed by the two frontend environment values above. Connecting `skillsprout.academy` requires separate domain/hosting configuration; its DNS is not changed by this code.

## Verification

TypeScript compilation, production build, catalog filtering, sample enrollment, lesson completion and parent-dashboard progress are checked during delivery. Real Firebase end-to-end authentication is pending your Firebase configuration. The backend repository contains API integration tests and PostgreSQL CI.

The preview browser does not expose `document.modelContext`, so live WebMCP validation was unavailable; course search continues through the normal interface.

## v2.3 implementation branch

See [the authoritative blueprint](docs/MASTER_BLUEPRINT.md), [audit and implementation checklist](docs/ROADMAP_AND_FEATURE_STATUS.md), and [actual test results](docs/TEST_PLAN_AND_RESULTS.md).

`/demo/sorting-garden` adds an explicitly labeled guest rules simulator preview with executable blocks, stage, trace and repair challenge. It does not train AI, save projects, assess mastery or call the learning backend. Human content/family/device review remains pending. Existing accounts and courses remain intact.

Run `pnpm test:runtime`; install Chromium with `pnpm exec playwright install --with-deps chromium` then `pnpm test:browser`. The presence of a test does not mean it passed; consult the evidence file.


`/little-explorers` is a guest hub with one playable Rainbow Habitat activity. The other three cards are clearly marked “Coming soon.” Matching, adult-chosen sensory/choice settings, pause, Home, finish and the offline Grownup Playbook run locally for this visit only. No account or saved learner data is used. Phase 1B browser CI and early-years review status are recorded in `docs/TEST_PLAN_AND_RESULTS.md`; this is an original matching activity, not AI or a developmental assessment.
