
# Powerchain environment configuration

The repository keeps examples in `env/` and app-specific copies in each application.

Recommended workflow:

```bash
cp env/web.env.example apps/web/.env.local
cp env/backend.env.example apps/backend/.env
cp env/dashboard.env.example apps/dashboard/.env.local
pnpm env:check
```

Never commit real secrets, private keys, seed phrases, OAuth secrets, database credentials, treasury signer keys, or API tokens.
