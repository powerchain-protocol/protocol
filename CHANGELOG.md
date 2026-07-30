
## Architecture and data workspace upgrade

- Added the `/dashboard/architectures` documentation experience.
- Added architecture diagrams to `apps/web/public/architectures/`.
- Added typed metrics, renewables, energy, pools, smart-meter, DePIN, IoT, device and product datasets.
- Added a canonical `contracts/solana` workspace with program, resource, test and target organization.
- Added architecture and Solana workspace documentation.
## [1.0.0-beta.38] - 2026-07-30

## 1.0.0-beta.1 — Merchant energy platform upgrade

### Added
- Smart-meter, LoRaWAN, DePIN and IoT product/device workflows.
- Renewable hardware catalogue and P2P energy trading dashboard.
- Carbon-credit listing and retirement utilities.
- CRM and ERP dashboard entry points.
- `@powerchain/energy-iot` package and merchant APIs.


### Added
- Enterprise `@powerchain/sdk` facade and shared common, context, hooks, data, and utility surfaces.
- Unified Solana, Sui, Cetus, and Pyth provider clients with timeouts, typed errors, failover, simulation, and health methods.
- `PowerChainClient` entry point for multi-chain application integration.
- Protocol `zk-snark` proof envelope and verifier contracts, plus a deprecated `znark` compatibility export.
- SDK surface validation script.

### Changed
- Renamed the core Web3 package to `@powerchain/web3.js` and expanded package exports.
- Replaced the outdated root README with current installation, architecture, packages, security, compatibility, and development guidance.
- Updated workspace package versions to `1.0.0-beta.38`.

### Fixed
- Removed stale beta version claims from the root README.
- Aligned documented Node.js, pnpm, and TypeScript requirements with workspace configuration.
- Preserved changelog content in `CHANGELOG.md` rather than duplicating release history in the README.

# Changelog

### Build policy

- Added PNPM build-script approvals for Prisma, esbuild, Sharp, bigint-buffer, bufferutil, and utf-8-validate.
- Added `pnpm approve-builds` helper scripts and non-frozen install command.
- Centralized peer and dependency-build policy in `pnpm-workspace.yaml`.

## 1.0.0-beta.37

- Added browser-native Solana keypair generation with AES-GCM encryption and PBKDF2 key derivation.
- Added encrypted local vault management, backup, copy, faucet, and rewards links.
- Added generator website and dashboard routes.
- Added encrypted-vault server storage endpoint and protected runtime storage layout.
- Added Anchor public-key registration program scaffold and generator SDK helpers.

## [1.0.0-beta.36] - 2026-07-30

### Added
- Shared health, faucet-policy, donation-validation, and filesystem utilities in `@powerchain/core`.
- React hooks for faucet claims, donations, and health polling.
- Dotenv-aware script environment loading.
- Solana program doctor, build, and test scripts.
- Standard `tests/` and ignored `target/` directories for Solana programs.

### Changed
- Health endpoint now reports aggregate service and Solana RPC readiness.
- Faucet UI now uses a reusable hook with cooldown state.
- Workspace and contract package versions upgraded to beta.36.


## [1.0.0-beta.34] - 2026-07-30

### Added
- Shared `@powerchain/protocol` package with exact basis-point fee calculations, network configuration, operation quotes, and environment-based program IDs.
- Website pages and API v1 handlers for swap, bridge, checkout, payments, escrow, and crowdfunding.
- Solana Anchor instruction modules, program errors, state definitions, faucet guard, and IDL constants.
- Protocol dashboard view, deployment manifest, environment templates, and program-ID validation script.

### Changed
- Upgraded workspace package versions and protocol documentation for beta.34.

### Security
- Production program IDs remain unset until deployed and verified; bridge operations include nonce validation and all fee arithmetic uses checked integer math.

## [1.0.0-beta.33] - 2026-07-30

### Added
- Solana devnet PWRC faucet page, layout, components, wallet and cluster validation.
- Server-side Token-2022 faucet claim route with cooldown and checked transfers.
- Guarded devnet deployment script that creates and permanently fixes a 1,000,000,000 PWRC test supply.
- Shared faucet types and Next.js token faucet helper.

### Security
- Refuses faucet deployment and claims outside Solana devnet.
- Faucet signing key remains server-only and mint authority is revoked after initial supply creation.

## [1.0.0-beta.32] - 2026-07-30

### Added

- Added `@powerchain/solana` with stable entry points for classic SPL Token and Token-2022.
- Added `packages/solana/src/tokens/spl` transaction helpers using idempotent associated-token-account creation.
- Added `packages/solana/src/token-2022/solana/extensions` for PWRC transfer fees, metadata validation, and extension manifests.
- Added exact `bigint` fee calculations with Token-2022 ceiling rounding and maximum-fee caps.
- Added a Solana package manifest and tests for fee rounding, caps, and net transfer amounts.

### Changed

- Upgraded workspace package and program versions to `1.0.0-beta.32`.
- Kept production mint and authority addresses explicitly unverified rather than publishing placeholders.

## [1.0.0-beta.31] - 2026-07-30

### Added

- Added exact decimal parsing and formatting backed exclusively by `bigint`; no protocol amount calculation uses JavaScript floating point.
- Added checked basis-point arithmetic, PWRC transaction quoting, payment line-item calculations, checkout quoting, quorum evaluation, Squads multisig policy validation, and linear cliff vesting.
- Added a reusable `useVesting` hook, accessible vesting component, and web protocol export for Squads.

### Fixed

- Corrected Token-2022 fee rounding to round fractional base-unit fees upward before applying the maximum-fee cap.
- Preserved every fee base unit in the 70/30 treasury and staking split.
- Hardened quarterly burns with timelock, pause, multisig, prior-quarter-burn, and quarterly-cap validation.
- Added validation for negative values, excessive precision, invalid checkout expiry, duplicated multisig members, over-counted votes, and release amounts above vesting totals.

## [1.0.0-beta.29] - 2026-07-30

### Added

- Added the PWRC Token-2022 protocol specification, fixed-supply constants, extension manifest, and production-address safety placeholders.
- Added deterministic transfer-fee accounting with a 70% treasury and 30% staking split.
- Added treasury allocation, staking reward, PIP governance, quarterly burn, bridge collateralization, replay protection, and security-policy helpers.
- Added PWRC protocol tests and architecture documentation.

### Changed

- Aligned canonical PWRC metadata with Solana Token-2022, 9 decimals, a maximum supply of 18,446,000,000 PWRC, and the user-specified $0.000001 initial reference price.
- Marked all undeployed mint, vault, metadata, and authority addresses as null until verified.

## [1.0.0-beta.28] - 2026-07-30

### Added

- Added canonical PWRC, wrapped PWRC, and Carbon Credit Token artwork to `packages/web3/public`.
- Added reusable token, currency, and asset registries with safe lookup and Finnish-locale amount formatting.
- Added package exports for `@powerchain/web3/assets`, `@powerchain/web3/currencies`, and public assets.
- Added Web3 package documentation and registry tests.

### Changed

- Upgraded `@powerchain/web3` metadata so unverified mainnet addresses remain explicitly undefined rather than being invented.
- Copied Powerchain token and currency assets into the web application's public asset tree.

## 1.0.0-beta.26

- Added secure exchange aggregation, provider fallbacks, quote routing, simulations, fee estimates, unsigned swap transaction creation, validation, idempotency, and OpenAPI documentation.



## [1.0.0-beta.27] - 2026-07-30

### Fixed

- Reworked web dependency detection to resolve Next.js through the pnpm workspace instead of assuming a hoisted `.bin/next` path.
- Added automatic dependency repair before `dev:web`, including frozen-lockfile installation when dependencies are absent.
- Added Corepack fallback so repository scripts work when `pnpm` is not globally installed.
- Made development scripts resolve the repository root reliably, including launches from nested directories and debugger sessions.
- Expanded cleanup to remove stale workspace-level modules and build caches.

### Changed

- Added shared package-manager runtime utilities and improved dependency diagnostics.
- Added `bootstrap` and `doctor` aliases.
- Added a project security policy in `SECURITY.md`.

## 1.0.0-beta.14

- Added hosted checkout SDK packages and emulator
- Added standalone checkout and merchant applications
- Added signed checkout callbacks
- Added checkout API routes and migration
- Added docs architecture and checkout quick start
- Redesigned homepage and About page
- Added USD default currency and localisation controls

## 1.0.0-beta.17

- Added marketplace, renewables, and blockchain packages
- Upgraded wallet, Solana transaction, crowdfunding, payment, AI, IoT, DePIN, and hardware services
- Added matching backend APIs, migrations, public routes, and dashboard experiences

## 1.0.0-beta.18

- Added SaaS pricing and purchase flows
- Added demo user, wallet, dashboard mode, and badge
- Added electricity and settlement rates with calculator
- Added standalone modular documentation application

## 1.0.0-beta.19

- Added Jupiter Swap API v2, SPL Token, Metaplex metadata, and Helius integrations
- Added website and dashboard network/RPC selectors
- Added public, Helius, local, and custom RPC configuration

## 1.0.0-beta.21

- Changed initial PWRC reference price to $0.000002
- Added Birdeye and Jupiter-backed price orchestration
- Added truthful mock, devnet, and mainnet availability states
- Added ecosystem, services, disclaimer documentation, and UI refinements

## 1.0.0-beta.22

- Added professional payment, checkout, transaction, portfolio, AI chat, analytics, and protocol infrastructure
- Added Globe, Coin, Animated Credit Card, Cart, skills, actions, and migrations

## 1.0.0-beta.25

- Hardened Vercel deployment headers, API caching and function limits.
- Added API v2 wallet balance endpoints with truthful RPC fallback behaviour.
- Added Zod validation schemas for wallets, pagination, idempotency and webhooks.
- Added replay-protected wallet signature challenges and Solana Ed25519 verification.
- Added signed incoming webhooks, subscription creation and duplicate-event protection.
- Added wallet, webhook delivery and signature challenge database models and migration.
- Upgraded Swagger/OpenAPI YAML, rate limiting and production security headers.

## [1.0.0-beta.31] - 2026-07-30

### Added
- Versioned explorer endpoints under `/api/v1/explorer` for network, address, and transaction discovery.
- Shared Next.js cache helpers, typed safe server actions, and hardened upload utilities.
- Dedicated backend rate-limit plugin and upload service with MIME validation, SHA-256 integrity metadata, and generated object keys.
- Powerchain contract deployment policy in `contracts/powerchain/Powerchain.toml`.
- API doctor and backend route-manifest scripts.

### Changed
- Expanded `.gitignore` for Anchor, Rust, Next.js, Vercel, Cloudflare, generated routes, uploads, and local secrets.
- Updated workspace, application, package, and Rust crate versions to `1.0.0-beta.31`.
- Centralized backend rate limiting and improved structured rate-limit errors.

## [1.0.0-beta.35] - 2026-07-30

### Added
- Shared `@powerchain/core` logging, RPC failover, health checks, and reconnecting WebSocket utilities.
- Interactive developer terminal with command history, network inspection, wallet status, and RPC diagnostics.
- Reusable `@powerchain/sdk-ui` entry points for faucets, swap, bridge, checkout, explorer, payments, crowdfunding, and donations.
- Website routes for `/terminal`, `/explorer`, and `/donate`.

### Changed
- Web application now consumes shared core infrastructure and SDK UI packages.
- Workspace package and contract versions advanced to `1.0.0-beta.35`.

### Security
- RPC requests use bounded timeouts and endpoint failover.
- WebSocket clients use bounded exponential reconnection and explicit shutdown.
## 1.0.0-beta.1 (workspace reset)

- Unified all package manifests on `1.0.0-beta.1`.
- Added centralized version configuration and synchronization scripts.
- Fixed dependency bootstrap for archives that do not contain a lockfile.
- Made Prisma post-install generation non-destructive to installation.
- Added docs path aliases and explicit React/Next type declarations.


### SDK and routing integration

- Moved the canonical keypair generator SDK surface to `packages/sdk/src/generator/keypairs`.
- Added `@powerchain/sdk/generator/keypairs` package exports and retained the root `sdk/` compatibility path.
- Merged the standalone merchant application into the website at `/merchant`.
- Added the missing `/rewards` route used by generated-wallet reward links.
- Added web-route validation and updated repository scripts.

## Dashboard routing upgrade

- Added an internal `/dashboard` operations hub and shared dashboard shell.
- Integrated AI chat under `/dashboard/ai`.
- Added a reusable skills catalog at `/dashboard/skills`.
- Added dashboard routes for keypair generation, merchant operations, faucet access, and rewards.
- Added centralized web route constants and compatibility redirects for legacy AI, chat, skills, generator, merchant, faucet, and rewards URLs.
- Removed the external dashboard redirect so the monorepo dashboard is served by the web application.

## 1.0.0-beta.1 — Installation and build reliability update

### Added
- Direct `axios`, `bs58`, `uuid`, and `zod` dependencies for the web application and enterprise SDK.
- `install:workspace`, `deps:sync`, `ci:install`, and `install:check` commands.
- A workspace installer that repairs outdated lockfiles locally while preserving frozen-lockfile enforcement in CI.

### Changed
- `clean:install` now always uses `--no-frozen-lockfile` as a local recovery operation.
- Automatic dependency repair before `dev:web` now refreshes stale lockfile metadata.

### Fixed
- Repeated `ERR_PNPM_OUTDATED_LOCKFILE` failures after adding workspace dependencies such as `@powerchain/sdk`.
- Install loops where the suggested `clean:install` command repeated the same frozen-lockfile failure.

## [1.0.0-beta.1] - RWA energy trading upgrade

### Added
- Reusable `components/assets/rwa` cards, badges and market filters.
- Tokenized renewable, P2P energy, carbon-credit and connected-hardware asset models.
- Merchant RWA exchange at `/dashboard/merchant/trade`.
- `@powerchain/sdk/rwa` client facade and deterministic trade quotes.

### Changed
- Renewable, P2P energy and carbon dashboard pages now use shared RWA components.

## Energy marketplace and Wayfinder

- Organized the merchant renewable-energy dashboard around marketplace, local maps, Wayfinder, P2P trading, donations and crowdfunding.
- Added typed market/project models, shared constants, hooks, actions, services and quote/route utilities.
- Added cached energy market/project APIs and validated Wayfinder routing API.
- Added community project funding interfaces and production settlement safeguards documentation.

## Schema, backend and API upgrade

- Added `@powerchain/schemas` as the canonical Zod contract package.
- Added typed renewable-energy marketplace, quote, local map and Wayfinder APIs.
- Added donation and crowdfunding intent APIs.
- Added Prisma models and migration for energy offers and funding contributions.
- Expanded Swagger tags and API documentation.

## Sui contracts and SDK upgrade

- Added an organized `contracts/sui` Move workspace for PWRC, P2P renewable-energy settlement, donations and crowdfunding.
- Added devnet and mainnet configuration templates and publish commands.
- Added `@powerchain/sui` typed client, token-mint transaction and energy-settlement helpers.
- Added structural chain validation with `pnpm chains:check`.

## RWA and Helius integration
- Added typed Helius DAS RPC clients, NFT/fungible token types, RWA portfolio services, energy certificates, Metaplex helpers, API routes, UI components, and Solana RWA program records.

## Faucet workspace upgrade

- Moved the legacy Next.js faucet transfer helper from `programs/token/nextjs/faucets.ts` into the canonical `programs/foucets/src` workspace.
- Added reusable Token-2022 and SPL Token transfer functions, devnet verification, amount conversion, environment validation, and explorer-link helpers.
- Added a server-only Next.js example package under `packages/examples/foucets/nextjs`.
- Upgraded the web faucet portal with local transaction history, reusable transaction components, dark-mode styles, and a compatibility redirect for `/foucets`.
- Refactored the faucet API to use the shared program package and keep signing credentials server-only.
## 1.0.0-beta.1 — SaaS, docs, configuration and build compatibility

- Added the shared SaaS package, SaaS web console, documentation, and backend APIs.
- Added reusable markdown, marker, and code-disclosure documentation components.
- Rebuilt the docs sidebar with organized categories and internal routes.
- Pinned TypeScript 6.0.2 and enabled the supported Next.js TypeScript CLI path.
- Aligned Next.js and Vercel rewrites, redirects, security headers, and cache policy.
- Corrected the placeholder Solana program ID length and Anchor `Result` type conflict.


## Dashboard authentication and Turbopack workspace upgrade

- Fixed Next.js monorepo root inference with an explicit `turbopack.root` and `outputFileTracingRoot`.
- Added reusable modal, wallet-connect and authentication components.
- Added session-aware dashboard controls and same-origin auth route handlers.
- Added canonical auth schemas, backend session APIs and Prisma authentication indexes.

## Documentation governance upgrade

- Added a project-wide Code of Conduct.
- Reorganized documentation around architecture, protocols, governance, developers, and enterprise domains.
- Added the Energy Protocol specification with explicit implementation status and security requirements.
- Added governance and PIP process documentation with a reusable proposal template.
- Added roadmap, TODO tracker, glossary, and documentation validation.
