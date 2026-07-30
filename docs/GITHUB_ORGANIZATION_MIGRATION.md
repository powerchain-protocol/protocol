# GitHub organization migration

Canonical organization: `powerchain-protocol`

Canonical repository: `https://github.com/powerchain-protocol/powerchain`

## Supported automation

1. Copy `.github/github-migration.example.json` to `.github/github-migration.json`.
2. Review repositories, teams, checks, variables, webhooks, and secret names.
3. Export each secret value into the local shell. GitHub does not expose stored secret values, so they cannot be copied automatically.
4. Authenticate `gh` with an organization-owner token that can administer repositories, Actions secrets, variables, webhooks, teams, and branch protection.
5. Preview with `pnpm github:migration:plan`.
6. Apply with `pnpm github:migration:apply`.
7. Run `pnpm github:references:check`.

## GitHub Apps

GitHub App installations cannot be transferred from one organization to another through the repository API. Install each app in `powerchain-protocol`, select the intended repositories, update callback and webhook configuration, rotate private keys and webhook secrets, validate delivery, then revoke the old installation.

## Deployment webhooks

Webhook targets are recreated only when listed explicitly in `.github/github-migration.json`. Put webhook secrets in environment variables and reference them through `secretEnv`; never commit secret values. Verify recent deliveries and signatures after migration.

## Branch protection and rulesets

The migration script configures branch protection for the configured default branch. Organization-level rulesets, required workflows, bypass actors, environments, and deployment protection rules must also be reviewed in the target organization because actor and team IDs differ between organizations.

## CI/CD validation

Validate pull-request checks, package publishing, deployments, preview environments, production environment approvals, OIDC trust policies, container registries, Vercel projects, cloud service accounts, and GitHub deployment statuses before removing access from `powerchain-energy`.
