
# Powerchain repository instructions

## Creating a workspace package

Use the package generator from the repository root:

```bash
pnpm package:create --name telemetry --description "Powerchain telemetry utilities"
```

The generator creates:

```text
packages/telemetry/
├── package.json
├── README.md
├── tsconfig.json
├── src/index.ts
└── test/index.test.ts
```

Every new package must:

1. Use the `@powerchain/` scope.
2. Include a description, exports, files allowlist, types, and side-effect declaration.
3. Keep secrets, generated files, build output, and local environment files out of the package.
4. Include tests and a Changeset.
5. Use `workspace:*` for internal dependencies.
6. Pass `pnpm package:test` before release.

## Release channels

Powerchain uses three npm distribution tags:

- `beta` for prerelease validation.
- `stable` for production releases.
- `latest` points to the currently supported stable release.

Publish through the release scripts rather than running `npm publish` manually.

```bash
pnpm package:publish:beta --filter @powerchain/sdk
pnpm package:publish:stable --filter @powerchain/sdk
```

Private organization-scoped packages must be explicitly marked with:

```json
{
  "publishConfig": {
    "access": "restricted"
  }
}
```

Public SDK packages must use `"access": "public"`.

## Account and access changes

Account, membership, company-role, billing-access, and security-policy changes require:

- Server-side authorization.
- Audit-log creation.
- Organization scoping.
- Validation with Zod or an equivalent schema.
- A database migration when persistence changes.
- Tests covering denied and allowed access.

## Security

Never commit credentials, private keys, signing seeds, Supabase service-role keys, npm tokens, or Cloudflare API tokens.

Auth cookies must be `HttpOnly`, `Secure` in production, `SameSite=Lax` or stricter, and never cached by a shared CDN.
