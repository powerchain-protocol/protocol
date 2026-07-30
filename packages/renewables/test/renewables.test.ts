
import test from "node:test";
import assert from "node:assert/strict";
import { summarizeRenewables } from "../src/index.ts";
test("summarizes renewable assets", () => {
  const summary=summarizeRenewables([{id:"a",name:"A",type:"solar",country:"FI",capacityMw:10,currentOutputMw:7,annualGenerationMwh:15000,avoidedCarbonTonnes:4000,status:"operational"}]);
  assert.equal(summary.operationalAssets,1);
  assert.equal(summary.capacityMw,10);
});
