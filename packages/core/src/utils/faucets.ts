export interface FaucetPolicy {
  amountBaseUnits: bigint;
  cooldownMs: number;
  maxClaimsPerWindow: number;
  windowMs: number;
}

export interface FaucetClaimState {
  lastClaimAt?: number;
  claimsInWindow: number;
  windowStartedAt: number;
}

export interface FaucetEligibility {
  eligible: boolean;
  retryAfterMs: number;
  reason?: "cooldown" | "window-limit";
}

export function evaluateFaucetEligibility(policy: FaucetPolicy, state: FaucetClaimState, now = Date.now()): FaucetEligibility {
  if (!Number.isSafeInteger(now) || now < 0) throw new RangeError("now must be a positive safe integer");
  if (state.lastClaimAt !== undefined) {
    const retryAfterMs = Math.max(0, state.lastClaimAt + policy.cooldownMs - now);
    if (retryAfterMs > 0) return { eligible: false, retryAfterMs, reason: "cooldown" };
  }
  const inCurrentWindow = now - state.windowStartedAt < policy.windowMs;
  if (inCurrentWindow && state.claimsInWindow >= policy.maxClaimsPerWindow) {
    return { eligible: false, retryAfterMs: Math.max(0, state.windowStartedAt + policy.windowMs - now), reason: "window-limit" };
  }
  return { eligible: true, retryAfterMs: 0 };
}

export function nextFaucetState(policy: FaucetPolicy, state: FaucetClaimState, now = Date.now()): FaucetClaimState {
  const resetWindow = now - state.windowStartedAt >= policy.windowMs;
  return { lastClaimAt: now, windowStartedAt: resetWindow ? now : state.windowStartedAt, claimsInWindow: resetWindow ? 1 : state.claimsInWindow + 1 };
}
