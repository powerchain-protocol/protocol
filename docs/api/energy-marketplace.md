# Energy marketplace API

Base URL: `/api/v1`

- `GET /energy/offers` — filter verified offers by source or region.
- `POST /energy/offers` — create a smart-meter-backed P2P offer.
- `POST /energy/quotes` — calculate quantity, protocol fee and avoided emissions.
- `GET /energy/map` — query local offers by latitude, longitude and radius.
- `POST /energy/wayfinder` — match demand to least-cost nearby supply.
- `GET /funding/projects` — list renewable donation and crowdfunding projects.
- `POST /funding/contributions` — create a contribution payment intent.
- `POST /donations` — create a renewable donation payment intent.

All write requests are validated with canonical schemas from `@powerchain/schemas`. Production settlement must additionally verify identity, meter provenance, wallet signatures, sanctions rules and local energy-market permissions.
