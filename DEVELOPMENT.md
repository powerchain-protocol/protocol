# PowerChain Development

This is the canonical onboarding and verification guide for the monorepo. Package READMEs document package-specific APIs only.

## Prerequisites

- Node.js 22 or newer
- Corepack
- pnpm 11.18.0
- PostgreSQL and Redis for backend development
- Rust, Solana CLI and Anchor for Solana programs
- Sui CLI for Move contracts

## Bootstrap

```bash
corepack enable
corepack use pnpm@11.18.0
pnpm bootstrap
```

`pnpm bootstrap` installs the workspace, creates `.env` when absent, validates configuration, and generates Prisma, SDK, contract and route artifacts.

## Development

```bash
pnpm dev:web
pnpm dev:backend
pnpm dev:docs
```

## Verification pipeline

```text
bootstrap → generate → typecheck → lint → test → build → package
```

Run the merge gate with:

```bash
pnpm verify
```

Run the complete release gate with:

```bash
pnpm release:verify
```

## Environment

`.env.example` is the safe template. `.env.schema` documents required values and constraints. Never commit `.env` or credentials.

## Security

```bash
pnpm security:secrets
pnpm security:dependencies
```

## Chain workspaces

Use `pnpm programs:doctor`, `pnpm anchor:build`, `pnpm anchor:test`, `pnpm sui:build`, and `pnpm sui:test` when the respective toolchains are installed.
