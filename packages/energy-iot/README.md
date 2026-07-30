# @powerchain/energy-iot

Types and deterministic utilities for renewable assets, DePIN/IoT telemetry, LoRaWAN devices, smart meters, P2P energy trading, carbon credits and tokenized real-world assets.

## RWA trading

```ts
import { quoteRwaTrade } from "@powerchain/energy-iot";
const quote = quoteRwaTrade(asset, 100, "buy");
```

Quotes are calculations, not executed trades. Production settlement must verify ownership, metering evidence, asset registry status, signatures and applicable compliance rules.
