
import test from "node:test";
import assert from "node:assert/strict";
import { calculateMarketplaceOrder } from "../src/index.ts";
test("calculates marketplace fee", () => {
  assert.deepEqual(calculateMarketplaceOrder({quantity:10,priceUsd:2},200), {subtotalUsd:20,platformFeeUsd:0.4,totalUsd:20.4});
});
