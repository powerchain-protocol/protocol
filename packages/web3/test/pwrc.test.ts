import { describe, expect, it } from "vitest";
import {
  PWRC_MAX_SUPPLY_BASE_UNITS,
  allocateTreasuryRevenue,
  assertBridgeCollateralized,
  calculateQuarterlyBurn,
  distributeTransferFee,
  replayKey,
} from "../src/pwrc/index.js";

describe("PWRC protocol rules", () => {
  it("enforces the fixed supply in base units", () => {
    expect(PWRC_MAX_SUPPLY_BASE_UNITS).toBe(18_446_000_000_000_000_000n);
  });

  it("splits the 2% transfer fee 70/30", () => {
    expect(distributeTransferFee(1_000_000n)).toEqual({
      grossAmount: 1_000_000n,
      protocolFee: 20_000n,
      treasuryAmount: 14_000n,
      stakingAmount: 6_000n,
      netAmount: 980_000n,
    });
  });

  it("preserves all treasury revenue despite integer rounding", () => {
    const result = allocateTreasuryRevenue(101n);
    expect(result.ecosystem + result.development + result.rewards).toBe(101n);
  });

  it("rejects an undercollateralized bridge", () => {
    expect(() => assertBridgeCollateralized({ lockedPwrc: 99n, mintedWrappedPwrc: 100n })).toThrow();
  });

  it("creates a deterministic replay key", () => {
    expect(replayKey({ sourceChain: "solana", sourceTransaction: "abc", nonce: 7n }))
      .toBe("solana:abc:7");
  });

  it("caps the quarterly burn at the burnable treasury balance", () => {
    expect(calculateQuarterlyBurn({
      circulatingSupplyBaseUnits: 1_000_000n,
      treasuryBurnableBalanceBaseUnits: 10_000n,
      approvedByGovernance: true,
      multisigApprovals: 3,
      requiredMultisigApprovals: 3,
    })).toBe(10_000n);
  });
});

import {
  calculateTransferFee,
  calculateVesting,
  evaluateQuorum,
  formatDecimalAmount,
  parseDecimalAmount,
  quoteCheckout,
} from "../src/pwrc/index.js";

describe("PWRC exact amount and governance calculations", () => {
  it("parses and formats nine-decimal PWRC values without floating point", () => {
    const amount = parseDecimalAmount("1.000000001", 9);
    expect(amount).toBe(1_000_000_001n);
    expect(formatDecimalAmount(amount, 9)).toBe("1.000000001");
  });

  it("rounds Token-2022 transfer fees upward to a whole base unit", () => {
    expect(calculateTransferFee(1n)).toBe(1n);
  });

  it("evaluates quorum and approval independently", () => {
    expect(evaluateQuorum({
      eligibleVotingPower: 1_000n,
      participatingVotingPower: 250n,
      votesFor: 151n,
      votesAgainst: 99n,
      quorumBasisPoints: 2_000,
      approvalBasisPoints: 5_001,
    }).passed).toBe(true);
  });

  it("calculates cliffed linear vesting", () => {
    expect(calculateVesting({
      totalAmountBaseUnits: 1_000n,
      startTimestampSeconds: 0n,
      cliffTimestampSeconds: 100n,
      endTimestampSeconds: 1_000n,
      releasedAmountBaseUnits: 100n,
    }, 500n).releasableAmountBaseUnits).toBe(400n);
  });

  it("quotes checkout totals in integer base units", () => {
    const quote = quoteCheckout({
      id: "checkout-1",
      merchant: "merchant-1",
      items: [{ id: "energy", unitAmountBaseUnits: 100n, quantity: 3n }],
      expiresAt: new Date("2030-01-01T00:00:00.000Z"),
      now: new Date("2029-01-01T00:00:00.000Z"),
    });
    expect(quote.subtotalBaseUnits).toBe(300n);
    expect(quote.transferFeeBaseUnits).toBe(6n);
  });
});
