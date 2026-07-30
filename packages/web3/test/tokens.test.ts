import { describe, expect, it } from "vitest";
import { formatPowerchainAmount, getToken, requireToken } from "../src/index";

describe("Powerchain token registry", () => {
  it("finds symbols case-insensitively", () => {
    expect(getToken("pwrc")?.symbol).toBe("PWRC");
    expect(getToken("wpwrc")?.displaySymbol).toBe("wPWRC");
  });

  it("rejects unknown tokens", () => {
    expect(() => requireToken("UNKNOWN")).toThrow(RangeError);
  });

  it("formats amounts with the default Finnish locale", () => {
    expect(formatPowerchainAmount(1250.5, "PWRC")).toContain("PWRC");
  });
});
