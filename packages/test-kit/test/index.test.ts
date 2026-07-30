
import test from "node:test";
import assert from "node:assert/strict";
import { createTestUser } from "../src/index.ts";

test("creates overridable test users", () => {
  assert.equal(createTestUser({ role: "ADMIN" }).role, "ADMIN");
});
