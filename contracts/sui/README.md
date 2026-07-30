# PowerChain Sui contracts

Move contracts for PWRC utility assets, wrapped PWRC, renewable-energy certificates, P2P energy settlement, carbon assets, donations and crowdfunding.

## Networks

- `localnet`: local Sui validator
- `devnet`: integration testing and faucet-funded deployments
- `testnet`: release candidate validation
- `mainnet`: production deployments

Never reuse publisher or treasury keys between networks. Deployment object IDs are stored under `config/` and should be reviewed before application releases.

## Commands

```bash
pnpm sui:build
pnpm sui:test
pnpm sui:publish:devnet
pnpm sui:publish:mainnet
```
