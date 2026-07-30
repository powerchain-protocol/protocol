
# Installing Powerchain packages

## Workspace installation

```bash
corepack enable
corepack prepare pnpm@11.0.0 --activate
pnpm install
```

## Private npm packages

Create a project-level `.npmrc` without committing the token:

```ini
@powerchain:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
always-auth=true
```

Then install:

```bash
pnpm add @powerchain/sdk
```

Private organization packages require npm organization access. CI should use a short-lived or trusted-publishing workflow instead of a long-lived developer token.

## Release channels

```bash
pnpm add @powerchain/sdk@beta
pnpm add @powerchain/sdk@stable
```

## Package verification

```bash
pnpm package:pack --filter @powerchain/sdk
pnpm package:test --filter @powerchain/sdk
```
