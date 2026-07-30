# PowerChain architecture

The architecture library is published in two forms:

1. A dashboard page at `/dashboard/architectures`.
2. Version-controlled assets under `apps/web/public/architectures/`.

## Diagrams

- `system-overview.svg`: clients, APIs, services, indexing and chains.
- `solana-architecture.svg`: Anchor, SPL Token, RWA, certificates and Helius/Metaplex.
- `sui-architecture.svg`: Move coin and shared-object architecture.
- `energy-marketplace.svg`: renewable discovery, P2P matching and settlement.
- `depin-iot.svg`: smart meters, LoRaWAN, IoT ingestion and verification.
- `data-analytics.svg`: typed data, streaming, storage and presentation.
- `powerchain-platform-architecture.png`: consolidated documentation overview.

## Data model examples

Typed sample datasets live under `apps/web/data/`:

- `metrics.ts`
- `renewables.ts`
- `energy.ts`
- `pools.ts`
- `smart-meters.ts`
- `depin.ts`
- `iot.ts`
- `devices.ts`
- `products.ts`

These fixtures are deterministic and safe for UI development. Production pages should replace them with authenticated API and WebSocket data while preserving the exported types.
