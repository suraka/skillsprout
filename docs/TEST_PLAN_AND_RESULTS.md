# Verification record — 22 September 2026

Baseline: frontend typecheck/build passed; backend 4 SQLite tests with mocked Firebase and ruff passed. Existing main PostgreSQL CI and public live health/catalog evidence are linked in ROADMAP_AND_FEATURE_STATUS.md.

Before workspace maintenance: 10 new runtime tests, TypeScript, targeted ESLint and production build passed. Local browser checks were BLOCKED by invalid/truncated Chromium download archives. A later retry also encountered a stale dev lock. No browser screenshot, complete interaction verification, real-device or family study was produced. Those results apply to the earlier local copy; restored-code results will be recorded below after rerunning.

## Reproduce

`pnpm install --frozen-lockfile`; `pnpm test:runtime`; `pnpm exec tsc --noEmit`; `pnpm build`.
Browser test command and dependency are recorded alongside the restored test suite. No browser test is passed merely because it exists.
Backend: `uv sync --frozen --group dev`; `uv run pytest -q`; `uv run ruff check app tests`. Never use production TEST_DATABASE_URL: fixtures DROP ALL TABLES. Mock identity tests do not prove real Firebase login.

## Release gates

M1 is a rules simulator preview, not trained AI, a reviewed course or saved learning. Real keyboard/touch/screen-reader, actual contrast/reflow, slow-network/device and consenting-family tests remain NOT TESTED until evidence is recorded. Firebase staging, deployed revision/backups/restore remain unverified. No production changes or deployment claimed.
