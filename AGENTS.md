# AGENTS.md

## Repository status

This repo is an early-stage skeleton for the "Drop Race" web app. There is **no application code, package manifest, build system, test runner, or CI yet**. Do not assume a stack or run guessed commands like `npm install`, `pnpm test`, or `make` — verify a manifest/config exists first.

## Layout

- `docs/adr/` — architecture decision records.
- `docs/tasks/` — task breakdowns / implementation planning.
- `docs/acceptance/` — acceptance criteria and verification notes.

Directories are intentionally empty (`.gitkeep`). Put planning/decision artifacts in these folders rather than at the repo root.

## Conventions

- `.gitignore` is the generic GitHub Node template. It mentions Next.js, Vite, SvelteKit, Astro, pnpm, yarn, and Turbo, but this does **not** mean any of them are in use. Confirm before relying on it.
- No instruction files other than this one; keep `README.md` and this file in sync when the project takes shape.

## When tooling is added

Once a manifest and scripts exist, replace the "Repository status" section with the real install/build/test/lint commands, including how to run a single test and any required command order. Remove this note then.
