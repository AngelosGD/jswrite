# lyno

npm workspaces monorepo: `apps/*`, `packages/*`. The root has only a stub `test` script — run every command from the workspace's own directory. Root `.gitignore` lists only `node_modules`; the real ignores are per-app `.gitignore` files.

## apps/web — Next.js 16 + React 19 + Tailwind v4

- **`npm run dev`** (port 3000), **`npm run build`**, **`npm run lint`** (bare `eslint`, flat config `eslint.config.mjs`).
- No tests and no typecheck script: the only full verification is `npm run build` (Next type-checks during build) or `npm run lint`.
- App Router. Components live in `app/components/` (there is no top-level `components/`), filenames are lowercase camelCase (`noteEditor.tsx`; `Footer.tsx` is the lone exception), and every page/component is `"use client"`. Import with `@/app/components/...` and `@/lib/...`; `@/*` resolves to the web root, so prefer it over long relative paths.
- Tailwind v4 via `@tailwindcss/postcss`; there is no `tailwind.config`. Theme lives in `app/globals.css` (`@import "tailwindcss"`).
- Next 16 breaks from training data. Read `apps/web/AGENTS.md` plus `node_modules/next/dist/docs/` before writing framework code; `apps/web/CLAUDE.md` is just a pointer to it.
- Editor is TipTap (`app/components/noteEditor.tsx`) and `Note.content` is HTML. `lib/export-note.ts` (`exportTxt`/`exportMd`/`exportPdf`/`exportDocx`/`copyToClipboard`) converts HTML via a regex `stripHtml` that only understands h1–h3, strong/b, em/i, u, s/del, li, p and br. Templates in `lib/templates.ts` must use only those tags or exports break.
- Persistence is client-side only; the API is not wired in. `lib/notebooks.ts` is the single data layer over `localStorage` (notebooks key `lyno.notebooks`, quick notes key `lyno.quickNotes`). Components must go through `useNotebooks` / `useQuickNotes` and the `create*` / `update*` / `save*` / `add*` / `delete*` helpers — never `localStorage` directly.
- Note helpers: `createNoteTitle`, `addNote`, `deleteNote`, and the misspelled **`updaetNote`** (not `updateNote`; grep for the typo). Quick-note helpers: `addQuickNote`, `deleteQuickNote`, `moveQuickNoteToNotebook`, `saveQuickNotes`. Tag helpers: `getNoteTags`, `createTag`, `addTagToNote`, `removeTagFromNote`.
- Comments and UI copy are Spanish. `PLANNED-FEATURES.md` is the Spanish feature checklist.
- Motion imports use `motion/react` (some code also uses `framer-motion`) but there is no motion dep in `apps/web/package.json` — it resolves from the root `motion` dep via workspace hoisting. Add new deps in `apps/*`, not at the root.

## apps/api — NestJS 11 + Express

- Stock Nest scaffold: a single `GET /` returning "Hello World!"; nothing is connected to the web app.
- **`npm run start:dev`** — `nest start --watch` (port **3001**, from `process.env.PORT ?? 3001`).
- **`npm run build`** — `nest build` (output `./dist`, `deleteOutDir: true`).
- **`npm run test`** — jest, `rootDir: src`, colocated `*.spec.ts`. Single test: `npm test -- app.controller.spec`.
- **`npm run test:e2e`** — jest config `./test/jest-e2e.json` (`*.e2e-spec.ts`).
- **`npm run lint`** — eslint **with `--fix`** (auto-modifies files; prettier plugin, `endOfLine: "auto"`). Type-aware (`recommendedTypeChecked` + `projectService`), so type errors fail lint. `no-explicit-any` is off; `no-floating-promises` / `no-unsafe-argument` are warnings.
- **`npm run format`** — prettier (`singleQuote`, `trailingComma: "all"`, config `apps/api/.prettierrc`). API code uses single quotes; web code uses double quotes.
- Decorators are enabled (`experimentalDecorators`, `emitDecoratorMetadata`), `module: nodenext`.

## packages/shared (`@lyno/shared`)

Placeholder: only `package.json`, no source code.

## General

- No CI workflows, no root typecheck script, no root prettier config.
- Dependencies belong in the workspace that uses them; the root `motion` dep is a stray exception.
