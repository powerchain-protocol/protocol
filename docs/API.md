
# Powerchain API

## Production services

| Service | URL |
|---|---|
| Public website | `https://powerchain.energy` |
| API | `https://api.powerchain.energy` |
| Dashboard | `https://dashboard.powerchain.energy` |
| Checkout | `https://checkout.powerchain.energy` |
| Documentation | `https://docs.powerchain.energy` |

## API resources

- API v1: `https://api.powerchain.energy/api/v1`
- Interactive Swagger UI: `https://api.powerchain.energy/api-docs`
- OpenAPI JSON: `https://api.powerchain.energy/openapi.json`
- Swagger YAML: `https://api.powerchain.energy/swagger.yaml`
- Health: `https://api.powerchain.energy/healthz`
- Readiness: `https://api.powerchain.energy/readyz`

## Authentication

Protected endpoints use a bearer token:

```http
Authorization: Bearer <access-token>
```

Wallet-authorized operations may additionally use:

```http
x-wallet-signature: <signature>
```

## Request identity

The API accepts an optional `x-request-id` header. If omitted, the server generates one and returns it in the response.

## Versioning

Stable public APIs are namespaced under `/api/v1`. Breaking changes require a new API version.
