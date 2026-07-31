# PowerChain™

> **Developer onboarding:** Start with [`DEVELOPMENT.md`](./DEVELOPMENT.md), the canonical guide for setup, environment configuration, verification, and releases.


> **Programmable infrastructure for renewable energy, digital assets, and enterprise applications.**

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./docs/assets/logos/powerchain-logo-white.png">
    <img src="./docs/assets/logos/powerchain-logo-dark.png" width="220" alt="PowerChain">
  </picture>
</p>

<p align="center">
  <a href="./VERSION"><img alt="Version" src="https://img.shields.io/badge/version-1.0.0--beta.1-0F5A46?style=for-the-badge"></a>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/license-Apache--2.0-lightgrey?style=for-the-badge"></a>
  <a href="./docs/architecture/README.md"><img alt="Runtime" src="https://img.shields.io/badge/runtime-PVM-0F5A46?style=for-the-badge"></a>
  <a href="./programs"><img alt="Execution" src="https://img.shields.io/badge/execution-Solana%20SVM-9945FF?style=for-the-badge"></a>
  <a href="./SECURITY.md"><img alt="Security" src="https://img.shields.io/badge/security-policy-2E8B57?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="#quick-start">Quick start</a> ·
  <a href="./docs/README.md">Documentation</a> ·
  <a href="./docs/protocols/ENERGY.md">Energy Protocol</a> ·
  <a href="./docs/governance/GOVERNANCE.md">Governance</a> ·
  <a href="./CONTRIBUTING.md">Contributing</a>
</p>

---

## Overview

PowerChain is an open-source, multi-service platform for building renewable-energy infrastructure, enterprise software, programmable digital assets, and blockchain-integrated applications.

This monorepo brings together the PowerChain web platform, backend services, shared schemas, SDKs, Solana programs, Anza Pinocchio/SVM implementations, Sui contracts, developer tools, AI skills, and protocol documentation.

PowerChain is currently a **beta platform**. Some components are production-oriented foundations, while others remain experimental or roadmap work. Documentation identifies implementation status where practical; performance figures are targets unless backed by published benchmarks.

## Platform capabilities

| Domain | Capabilities |
|---|---|
| Renewable energy | Energy assets, telemetry, Proof of Generation concepts, certificates, settlement, trading, funding, carbon workflows |
| Blockchain | Solana SVM, Anchor, Pinocchio, SPL Token, Token-2022, Sui Move, cross-chain architecture |
| Enterprise | SaaS workspaces, identity, RBAC, audit-ready services, CRM/ERP foundations, billing and administration |
| Financial infrastructure | Wallets, payments, checkout, treasury, escrow, exchange, portfolio and marketplace primitives |
| Developer platform | TypeScript SDKs, Rust programs, REST APIs, schemas, examples, validation scripts and local tooling |
| Applications | Next.js dashboard, documentation portal, merchant energy platform, faucet portal and operational interfaces |

## Architecture

```text
Users, operators, developers, and enterprises
                     │
                     ▼
       Web applications and developer portals
                     │
                     ▼
        SDKs • REST APIs • RPC • WebSocket
                     │
                     ▼
 Energy • Identity • Treasury • Carbon • SaaS
                     │
                     ▼
     PVM architecture • Solana SVM • Sui Move
                     │
                     ▼
 Programs • Oracles • Validators • Data services
```

See the [architecture documentation](./docs/architecture/README.md) for detailed diagrams and subsystem boundaries.

## Repository structure

```text
apps/       Web, backend, dashboard, docs, checkout and portal applications
contracts/  Sui and chain-specific smart-contract sources
packages/   SDKs, shared libraries, integrations, schemas and UI modules
programs/   Anchor, Solana SVM, Pinocchio and token program workspaces
skills/     Versioned PowerChain AI and operational skills
scripts/    Build, validation, release, migration and workspace automation
docs/       Architecture, protocols, governance, API and developer documentation
config/     Shared version and platform configuration
```

## Quick start

### Prerequisites

- Node.js 22 or newer
- Corepack
- pnpm 11
- Rust and Cargo for Rust programs
- Solana CLI and Anchor CLI for Anchor workflows

### Install

```bash
corepack enable
corepack prepare pnpm@11.0.0 --activate
pnpm install:workspace
pnpm install:check
```

Copy environment defaults before starting local services:

```bash
cp .env.example .env
pnpm env:check
```

### Run the web platform

```bash
pnpm dev:web
```

### Run the backend

```bash
pnpm db:generate
pnpm dev:backend
```

### Build and verify

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm docs:check
pnpm platform:verify
pnpm build
```

### Solana and SVM programs

```bash
pnpm programs:doctor
pnpm anchor:build
pnpm anchor:test
pnpm svm:build
pnpm svm:test
```

Program IDs and network configuration must be reviewed before deployment. Placeholder IDs are for local compilation only.

## Core workspaces

| Workspace | Purpose |
|---|---|
| `apps/web` | Primary Next.js platform and dashboard |
| `apps/backend` | Fastify API, Prisma data access and backend services |
| `packages/schemas` | Shared runtime validation and API contracts |
| `packages/energy-iot` | Energy, telemetry, marketplace and RWA utilities |
| `packages/saas` | SaaS plans, roles, limits and subscription logic |
| `packages/solana` | Solana and Token-2022 integration utilities |
| `packages/sui` | Sui client and contract integration |
| `programs/powerchain` | Anchor-based PowerChain program |
| `programs/svm` | Native SVM and Pinocchio implementations |
| `skills` | Versioned domain skills for PowerChain workflows |

## Documentation

| Topic | Document |
|---|---|
| Documentation index | [docs/README.md](./docs/README.md) |
| Introduction | [docs/INTRODUCTION.md](./docs/INTRODUCTION.md) |
| Architecture | [docs/architecture/README.md](./docs/architecture/README.md) |
| Energy Protocol | [docs/protocols/ENERGY.md](./docs/protocols/ENERGY.md) |
| Governance | [docs/governance/GOVERNANCE.md](./docs/governance/GOVERNANCE.md) |
| Improvement proposals | [docs/governance/pips/README.md](./docs/governance/pips/README.md) |
| API | [docs/API.md](./docs/API.md) |
| Developer guides | [docs/developers/README.md](./docs/developers/README.md) |
| Roadmap | [docs/ROADMAP.md](./docs/ROADMAP.md) |
| Work tracking | [docs/TODO.md](./docs/TODO.md) |
| Glossary | [docs/GLOSSARY.md](./docs/GLOSSARY.md) |

## Development standards

PowerChain uses:

- Semantic Versioning and Changesets
- Conventional Commits
- TypeScript strictness and shared schema validation
- Rust formatting and Clippy guidance
- Pull-request review and CODEOWNERS
- Security review for protocol, authentication and asset-handling changes
- Documentation updates for public API and protocol changes

Read [CONTRIBUTING.md](./CONTRIBUTING.md), [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md), and [SECURITY.md](./SECURITY.md) before contributing.

## Security

Do not report vulnerabilities in public issues. Follow the private disclosure process in [SECURITY.md](./SECURITY.md).

Never commit seed phrases, private keys, validator identities, API tokens, database credentials, or production secrets. Faucet signing and wallet authentication must remain server-side and non-custodial.

## Governance

Significant protocol changes should follow the PowerChain Improvement Proposal process. Start with the [PIP guide](./docs/governance/pips/README.md) and [proposal template](./docs/governance/pips/TEMPLATE.md).

## Release status

Current workspace version: **1.0.0-beta.1**

Beta releases may contain breaking changes. Review [CHANGELOG.md](./CHANGELOG.md), Changesets, migration files, and deployment notes before upgrading.

## Support

For usage questions and responsible support channels, see [SUPPORT.md](./SUPPORT.md). For implementation work, include the affected package, reproduction steps, runtime versions, and relevant logs without secrets.

## License

Licensed under the [Apache License 2.0](./LICENSE).

Copyright © 2026 PowerChain Foundation. All rights reserved.