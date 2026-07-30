# PowerChain SaaS architecture

The SaaS layer provides multi-tenant workspaces, plans, seats, projects, API usage, entitlement checks, billing quotes, and audit-ready operations.

## APIs

- `GET /api/v1/saas/plans`
- `GET /api/v1/saas/quote?planId=growth&seats=12`
- `GET /api/v1/saas/health`

## Security

Enforce tenant membership and entitlements on the server. UI visibility is not an authorization boundary. Never expose repository contents or signing secrets through public SaaS endpoints.
