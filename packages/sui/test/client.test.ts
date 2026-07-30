import assert from "node:assert/strict";
import test from "node:test";
import { createPowerChainSuiClient } from "../src/client.js";
test("creates a devnet client", () => assert.ok(createPowerChainSuiClient("devnet")));
