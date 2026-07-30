
import test from "node:test";
import assert from "node:assert/strict";
import {createRpcConfiguration,redactRpcUrl} from "../src/index.ts";
test("creates public devnet RPC",()=>assert.match(createRpcConfiguration({network:"devnet"}).httpUrl,/devnet/));
test("redacts Helius API key",()=>assert.match(redactRpcUrl("https://mainnet.helius-rpc.com/?api-key=secret"),/api-key=%E2%80%A2/));
