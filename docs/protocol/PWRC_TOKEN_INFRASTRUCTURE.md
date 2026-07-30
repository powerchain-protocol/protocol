# PWRC Token Infrastructure

PWRC is specified as a fixed-supply Solana Token-2022 asset. This repository contains protocol constants, deterministic accounting helpers, validation, tests, and a deployment manifest. It does **not** claim that a mainnet mint has been deployed; production addresses remain `null` until independently verified.

## Token specification

| Parameter | Value |
|---|---|
| Name | PowerChain |
| Symbol | PWRC |
| Network | Solana |
| Standard | Token-2022 |
| Decimals | 9 |
| Maximum supply | 18,446,000,000 PWRC |
| Supply model | Fixed |
| Initial reference price | $0.000001 |

Enabled extension design: `TransferFeeConfig`, `MetadataPointer`, `TokenMetadata`, `PermanentDelegate`, and `MintCloseAuthority`.

## Fee architecture

A transfer fee of 2% is calculated in integer base units and remains subject to the Token-2022 maximum-fee setting. Collected fees are accounted for as 70% treasury and 30% staking rewards. Rounding remainder is assigned to staking so the accounting sum always equals the collected fee.

## Treasury

Protocol revenue flows into a treasury vault and is allocated to ecosystem, development, and rewards buckets. Allocation settings must total exactly 10,000 basis points and are governance-controlled.

## Staking

The SDK validates positive stake positions, lock periods, and pro-rata rewards. A production staking program must additionally use PDA-owned vaults, checked token transfers, safe reward indexes, and explicit close/withdraw rules.

## Governance (PIP)

Lifecycle: proposal → technical review → community discussion → PWRC voting → quorum validation → timelock → execution.

Governance controls upgrades, treasury parameters, fees, bridge parameters, and security policy. Defaults require strict-majority approval, a quorum, and an execution timelock.

## Quarterly burn

The burn target is 2% of circulating supply, capped by the burnable treasury balance. Execution requires governance approval and the configured multisig threshold. Burning cannot exceed existing burnable tokens and cannot mint or otherwise increase supply.

## Solana ↔ Sui bridge

PWRC is locked in Solana escrow before wrapped PWRC is minted on Sui. Bridge helpers enforce non-negative accounting, deterministic replay keys, and `minted wPWRC <= locked PWRC`. A production bridge also requires validator attestations, domain-separated signatures, finalized source-chain observations, rate limits, and emergency pause controls.

## Security controls

- Multisig protocol and emergency authorization
- Timelocked upgrades
- Emergency pause with separately scoped authority
- PDA seed and ownership validation
- Fixed-supply invariant checks
- Replay-resistant bridge identifiers
- Structured events and monitoring
- Least-privilege access control

See `programs/contracts/pwrc-token-2022.json` for the deployment manifest and `packages/web3/src/pwrc` for executable protocol rules.
