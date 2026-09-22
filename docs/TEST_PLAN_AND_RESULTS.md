# Verification record — 22 September 2026

Baseline: frontend typecheck/build passed; backend 4 SQLite tests with mocked Firebase and ruff passed. Existing main PostgreSQL CI and public live health/catalog evidence are linked in ROADMAP_AND_FEATURE_STATUS.md.

Before workspace maintenance: 10 new runtime tests, TypeScript, targeted ESLint and production build passed. Local browser checks were BLOCKED by invalid/truncated Chromium download archives. A later retry also encountered a stale dev lock. No browser screenshot, complete interaction verification, real-device or family study was produced. Those results apply to the earlier local copy; restored-code results will be recorded below after rerunning.

## Reproduce

`pnpm install --frozen-lockfile`; `pnpm test:runtime`; `pnpm exec tsc --noEmit`; `pnpm build`.
Browser test command and dependency are recorded alongside the restored test suite. No browser test is passed merely because it exists.
Backend: `uv sync --frozen --group dev`; `uv run pytest -q`; `uv run ruff check app tests`. Never use production TEST_DATABASE_URL: fixtures DROP ALL TABLES. Mock identity tests do not prove real Firebase login.

## Release gates

M1 is a rules simulator preview, not trained AI, a reviewed course or saved learning. Real keyboard/touch/screen-reader, actual contrast/reflow, slow-network/device and consenting-family tests remain NOT TESTED until evidence is recorded. Firebase staging, deployed revision/backups/restore remain unverified. No production changes or deployment claimed.

## Restored-code verification (rerun)

- `pnpm test:runtime`: PASS, all 10 SG-R01…10 tests.
- `pnpm exec tsc --noEmit`: PASS.
- Targeted ESLint for new runtime/editor/route: PASS; later includes browser tests/config.
- `pnpm build`: PASS; `/demo/sorting-garden` and original routes included.
- Backend: 4 pytest tests PASS; ruff PASS; application source unchanged.
- First restored remote checkpoint f0ed7af6f03b9de2ff3879a7a4ab662181c683d4: [GitHub CI 35787547554](https://github.com/suraka/skillsprout/actions/runs/35787547554) passed existing typecheck/build workflow. This run predates the added browser CI gate and does NOT prove browser behavior.
- Browser SG-B01…05 and REG-B01: six tests restored for counterexample/repair/history, error/recovery, keyboard/pause/step, network/storage/reset, offline/mobile and legacy catalog/enrollment/completion. Local execution remains BLOCKED by browser installation; final CI status must be checked on the latest commit.

Browser reproduction: `pnpm exec playwright install --with-deps chromium`, then `pnpm test:browser`. Config starts localhost:5173 with synthetic sample mode; no real accounts. Playwright 1.63.0 is pinned as a dev dependency. Existing unrelated transitive version retained.
