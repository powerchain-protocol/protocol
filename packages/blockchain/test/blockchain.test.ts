
import test from "node:test";
import assert from "node:assert/strict";
import { solanaExplorerUrl } from "../src/index.ts";
test("creates explorer URL",()=>assert.match(solanaExplorerUrl("abc","devnet"),/abc.*devnet/));
