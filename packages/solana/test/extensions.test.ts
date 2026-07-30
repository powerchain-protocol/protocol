import assert from "node:assert/strict";
import test from "node:test";
import { calculateTransferFee, calculateNetTransferAmount } from "../src/token-2022/solana/extensions/index";

const policy = {basisPoints: 200, maximumFeeBaseUnits: 1_000_000_000n};

test("rounds Token-2022 transfer fees upward in base units", () => {
  assert.equal(calculateTransferFee(1n, policy), 1n);
  assert.equal(calculateTransferFee(10_000n, policy), 200n);
});

test("caps transfer fees", () => {
  assert.equal(calculateTransferFee(100_000_000_000n, policy), 1_000_000_000n);
  assert.equal(calculateNetTransferAmount(10_000n, policy), 9_800n);
});
