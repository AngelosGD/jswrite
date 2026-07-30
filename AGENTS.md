# jswrite

npm workspaces monorepo: `apps/*`, `packages/*`. No root scripts beyond the trivial `test` stub.

## apps/web — Next.js 16.2 + React 19 + Tailwind v4

- **`npm run dev`** — next dev (port 3000)
- **`npm run build`** — next build
- **`npm run lint`** — eslint (flat config, `eslint.config.mjs`)
- Tailwind v4 via `@tailwindcss/postcss` plugin (not classic `tailwindcss` config)
- Next.js 16 may have breaking API changes — read `node_modules/next/dist/docs/` before writing code.

## apps/api — NestJS 11 + Express

- **`npm run start:dev`** — `nest start --watch` (port **3001**, from `process.env.PORT ?? 3001`)
- **`npm run build`** — `nest build` (output `./dist`, `deleteOutDir: true`)
- **`npm run test`** — jest (unit tests, `*.spec.ts`)
- **`npm run test:e2e`** — jest with config `./test/jest-e2e.json` (`*.e2e-spec.ts`)
- **`npm run lint`** — eslint
- **`npm run format`** — prettier (`singleQuote`, `trailingComma: "all"`)
- Uses `experimentalDecorators` / `emitDecoratorMetadata`, `module: nodenext`

## packages/shared (`@jswrite/shared`)

Placeholder with no source code yet.

## General

- No CI workflows, no typecheck script, no root prettier config.
- Each workspace is self-contained — run commands from its own directory.
