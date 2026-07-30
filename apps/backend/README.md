
# Powerchain Backend

Fastify API for tokens, renewable assets and pools, solar rentals, swaps, bridges, payments, portfolios, AI, analytics and enterprise operations.

## Development

```bash
pnpm --filter @powerchain/backend dev
```

Swagger UI is available at `/docs/api`; OpenAPI JSON is available at `/openapi.json`.

## Data environments

- `mock`: synthetic development data
- `devnet`: test-network data
- `mainnet`: live data only; unavailable states are never replaced with mock values

## Error envelope

```json
{"error":{"code":"UPSTREAM_UNAVAILABLE","message":"No executable route is currently available.","requestId":"..."}}
```

## Exchange aggregation (API v2)

The `/api/v2/exchanges` module provides provider discovery, HTTPS health checks, ranked quotes, route fallbacks, economic simulation, fee metadata, and idempotent unsigned swap transaction creation. It never signs or broadcasts transactions. Production provider endpoints must use HTTPS; optional Raydium, Orca, Cetus, and Aftermath adapters stay disabled until their endpoint variables are configured.

## Canonical schemas and energy APIs

Request contracts are maintained in `@powerchain/schemas` and imported by backend routes. The renewable marketplace API now includes offer discovery, smart-meter-backed offer creation, quote generation, local map search, Wayfinder matching, crowdfunding contributions and donation intents. Interactive Swagger documentation is available at `/docs/api` when `ENABLE_SWAGGER=true`.

## SaaS platform

The platform now includes a shared `@powerchain/saas` package, a `/saas` web console, and typed backend routes under `/api/v1/saas`. Build validation is available through `pnpm saas:check`; production builds use `pnpm build:platform`.

TypeScript is pinned to 6.0.2 for compatibility with Next.js 16.2.12. The web config also enables `experimental.useTypeScriptCli` so the compiler can be invoked through the supported CLI path.


## Authentication API

`GET /api/v1/auth/session` validates an opaque bearer session against the Prisma `UserSession` store. `POST /api/v1/auth/logout` revokes it. Tokens are stored only as SHA-256 hashes; expired or revoked sessions are rejected.
