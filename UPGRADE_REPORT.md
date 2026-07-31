# Monorepo upgrade report

## Implemented

- Fixed Tailwind CSS v4 semantic border failure in `apps/web/app/globals.css`.
- Fixed the missing `productMenu` export by deriving menu entries from typed product data.
- Removed the root `development/` folder.
- Removed the untrusted remote schema reference from `vercel.json`.
- Added root `.env.example`, `.env.schema`, and idempotent `pnpm env:init`.
- Standardized build, test, lint, and typecheck scripts across JavaScript workspaces.
- Added canonical `DEVELOPMENT.md`.
- Added bootstrap, generation, verification, packaging, and security scan commands.
- Disabled Next.js telemetry in web development and builds.

## Verification

See the command output used to create the release archive. Toolchain-dependent Anchor and Sui compilation requires those CLIs.

## Build environment note

The source-level checks, environment onboarding, secret scan, workspace lifecycle audit, configuration parsing, and release packaging passed. Full dependency installation and Next.js compilation could not run in this container because registry access was unavailable (`EAI_AGAIN registry.npmjs.org`) and the uploaded archive did not include `node_modules` or a lockfile.
