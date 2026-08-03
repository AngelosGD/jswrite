# jswrite

npm workspaces monorepo: `apps/*`, `packages/*`. No root scripts beyond the trivial `test` stub. Root `.gitignore` only lists `node_modules` — the real ignores live in each app's `.gitignore`.

## apps/web — Next.js 16.2 + React 19 + Tailwind v4

- **`npm run dev`** — next dev (port 3000)
- **`npm run build`** — next build
- **`npm run lint`** — eslint (flat config, `eslint.config.mjs`)
- App Router (`app/`). Tailwind v4 via `@tailwindcss/postcss` plugin — no `tailwind.config`, CSS-first theming via `@import "tailwindcss"` in `app/globals.css`
- Imports use the `@/*` path alias → `./` (web root), e.g. `@/lib/notebooks`. Use it, not relative paths.
- Next.js 16 has breaking API changes — read `node_modules/next/dist/docs/` and the repo-local `apps/web/AGENTS.md` (and `apps/web/CLAUDE.md`, a one-line pointer to it) before writing code.
- No test suite or typecheck script in this app; the only full verification is `npm run build` (Next.js type-checks during build) or `npm run lint`.
- Notebooks persist client-side only: `lib/notebooks.ts` reads/writes `window.localStorage` — the API app is not wired in yet. Don't build features assuming server persistence.

## apps/api — NestJS 11 + Express

- **`npm run start:dev`** — `nest start --watch` (port **3001**, from `process.env.PORT ?? 3001`)
- **`npm run build`** — `nest build` (output `./dist`, `deleteOutDir: true`)
- **`npm run test`** — jest, `rootDir: src` (unit tests colocated as `*.spec.ts`); run a single test with `npm test -- <name>` (e.g. `npm test -- app.controller.spec`)
- **`npm run test:e2e`** — jest with config `./test/jest-e2e.json` (`*.e2e-spec.ts`)
- **`npm run lint`** — eslint **with `--fix`** (auto-modifies files; flat config via `typescript-eslint` + prettier plugin, `endOfLine: "auto"`). **Type-aware** (`recommendedTypeChecked` + `projectService`) — type errors fail lint. `no-explicit-any` is off; `no-floating-promises` / `no-unsafe-argument` are warnings
- **`npm run format`** — prettier (`singleQuote`, `trailingComma: "all"`, config at `apps/api/.prettierrc`)
- Uses `experimentalDecorators` / `emitDecoratorMetadata`, `module: nodenext`

## packages/shared (`@jswrite/shared`)

Placeholder with no source code yet.

## General

- No CI workflows, no typecheck script, no root prettier config. Per-app `.gitignore` files are the real ignores (`.next/`, `dist/`, etc.).
- Dependencies belong in the workspace that uses them (npm workspaces hoists into root `node_modules`). Root `package.json` currently holds a stray `motion` dep — add new deps in `apps/*`, not at root.
- Each workspace is self-contained — run commands from its own directory.
