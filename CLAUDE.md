# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A collection of ~50 small, single-purpose front-end/data-structure TypeScript packages, each published to npm under the `@drozdik.m` scope. The design style is OOP-heavy: most packages program against interfaces from `common-interfaces` (the `I*` files) and use the `comparator-handler` / `default-comparator` pattern for ordering.

## Repository layout

There is **no root build, no workspace/monorepo tooling, and no root `package.json`** (no lerna, no npm workspaces). Each package is fully self-contained and built/tested on its own.

- `src/ReleasedPackages/<name>/` — published, stable packages.
- `src/PrereleasePackages/<name>/` — not yet released.
- `src/InDevelopmentPackages/@drozdik.m/<name>/` — early work.

Every package directory has the same shape:
- `src/` — TypeScript source (tracked in git).
- `tests/` — TypeScript test files (tracked in git).
- `dist/` — `tsc` output, mirrors `src/` and `tests/` (**gitignored**).
- `node_modules/`, `package-lock.json`, `tsconfig.json`, `README.md`, `package.json`.

Only `.ts` source, configs, and READMEs are committed; `dist/` and `node_modules/` are not.

## Per-package commands

All commands run **from inside a package directory**, not the repo root.

- Build: `npm run build` — runs `npm update && npm update -D && tsc`. Note this pulls the **latest published versions** of `@drozdik.m/*` dependencies from npm before compiling.
- Test: `npm test` — runs `npm run build`, then executes each compiled test with `node dist/tests/<Name>.test.js`. There is no test runner; each test file is a standalone executable script, and each one is listed explicitly in the `test` script. **To run a single test**, run its compiled file directly, e.g. `node dist/tests/AVLTree.test.js` (build first if `dist/` is stale).
- Clean: `npm run clear` — uses Windows `rmdir /S /Q "dist"` (Windows-only; the repo is developed on Windows).

When adding a new test file, add a corresponding `node dist/tests/<Name>.test.js` invocation to the package's `test` script, or it won't run.

## Cross-package dependencies (important)

Packages depend on each other through **published npm versions**, not local path/workspace links. Because `npm run build` runs `npm update`, building a package fetches its `@drozdik.m/*` dependencies from npm. Consequences:

- A change to a base package (e.g. `common-interfaces`, `comparator-handler`) is **not** seen by dependents until it is published and the dependent's version range allows it.
- To test a base-package change against a dependent before publishing, use `npm link` (or temporarily point the dependency at a local path) — a plain `npm run build` in the dependent will instead pull the last published version.

## Testing framework

Tests use the repo's own frameworks, not Jest/Mocha:

- `@drozdik.m/unit-test` — `UnitTest` (create instance, `AddTestCase(name, fn)`) plus static `Assert` helpers: `AreEqual`, `AreNotEqual`, `AreSame`, `IsNull`, `IsTrue`, `Fail`, etc. Tests run as plain Node scripts and report to the terminal.
- `@drozdik.m/web-unit-test` — for DOM/browser tests; it launches a browser, runs the test, and closes down. Its own build uses `sass` and `browserify` and expects them installed globally (`npm install -g sass browserify`); browser assets live in the package's `browser/` dir.

## TypeScript config

Each package has its own `tsconfig.json`, typically: CommonJS modules, `outDir: dist/`, `declaration: true`, `noImplicitAny: true`. `package.json` `main`/`typings` point into `dist/src/`.
