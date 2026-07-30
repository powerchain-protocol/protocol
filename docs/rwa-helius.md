# RWA, energy certificates and Helius

The web application uses Helius DAS RPC through a server-only client. Set `HELIUS_API_KEY` or `HELIUS_RPC_URL`; never expose the API key through a `NEXT_PUBLIC_` variable.

## Endpoints

- `GET /api/helius/assets?owner=<wallet>` returns DAS assets, including fungible and non-fungible holdings.
- `GET /api/rwa/portfolio?owner=<wallet>` filters and normalizes renewable projects, energy certificates, carbon credits, smart meters and infrastructure assets.

RWA metadata should include `attributes.kind`, `attributes.status`, `attributes.valuationUsd`, and certificate-specific fields such as `meterId`, `energyMwh`, `periodStart`, `periodEnd`, and `source`.

Metaplex helpers live in `apps/web/lib/solana/metaplex.ts`. Signing, mint authority and retirement authority must remain server-side or wallet-signed. Helius is an indexing/RPC layer, not the source of legal ownership or certificate validity.
