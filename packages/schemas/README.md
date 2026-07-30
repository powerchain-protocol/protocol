# @powerchain/schemas

Canonical Zod schemas shared by the backend, website, SDK and generated OpenAPI clients. Keep validation here instead of duplicating request and response contracts across applications.

## Authentication schemas

`src/auth.ts` is the canonical contract for application roles, wallet authentication requests and session response payloads shared by the backend and web clients.
