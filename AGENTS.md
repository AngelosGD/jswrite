# jswrite

npm workspaces monorepo: `apps/*`, `packages/*`. No root scripts beyond the trivial `test` stub. Root `.gitignore` only lists `node_modules` — the real ignores live in each app's `.gitignore`.

## apps/web — Next.js 16.2 + React 19 + Tailwind v4

- **`npm run dev`** — next dev (port 3000)
- **`npm run build`** — next build
- **`npm run lint`** — eslint (flat config, `eslint.config.mjs`)
- App Router (`app/`). Tailwind v4 via `@tailwindcss/postcss` plugin — no `tailwind.config`, CSS-first theming via `@import "tailwindcss"` in `app/globals.css`
- Next.js 16 has breaking API changes — read `node_modules/next/dist/docs/` and the repo-local `apps/web/AGENTS.md` before writing code.

## apps/api — NestJS 11 + Express

- **`npm run start:dev`** — `nest start --watch` (port **3001**, from `process.env.PORT ?? 3001`)
- **`npm run build`** — `nest build` (output `./dist`, `deleteOutDir: true`)
- **`npm run test`** — jest, `rootDir: src` (unit tests colocated as `*.spec.ts`)
- **`npm run test:e2e`** — jest with config `./test/jest-e2e.json` (`*.e2e-spec.ts`)
- **`npm run lint`** — eslint **with `--fix`** (auto-modifies files; flat config via `typescript-eslint` + prettier plugin, `endOfLine: "auto"`). **Type-aware** (`recommendedTypeChecked` + `projectService`) — type errors fail lint. `no-explicit-any` is off; `no-floating-promises` / `no-unsafe-argument` are warnings
- **`npm run format`** — prettier (`singleQuote`, `trailingComma: "all"`, config at `apps/api/.prettierrc`)
- Uses `experimentalDecorators` / `emitDecoratorMetadata`, `module: nodenext`

## packages/shared (`@jswrite/shared`)

Placeholder with no source code yet.

## General

- No CI workflows, no typecheck script, no root prettier config. Per-app `.gitignore` files are the real ignores (`.next/`, `dist/`, etc.).
- Each workspace is self-contained — run commands from its own directory.
