export type HealthStatus = "ok" | "degraded" | "down";

export interface HealthCheck {
  name: string;
  status: HealthStatus;
  latencyMs?: number;
  message?: string;
  checkedAt: string;
}

export interface HealthReport {
  status: HealthStatus;
  checks: HealthCheck[];
  version: string;
  uptimeSeconds: number;
  checkedAt: string;
}

export function aggregateHealth(checks: readonly HealthCheck[], version = "unknown", uptimeSeconds = 0): HealthReport {
  const status: HealthStatus = checks.some((check) => check.status === "down")
    ? "down"
    : checks.some((check) => check.status === "degraded")
      ? "degraded"
      : "ok";
  return { status, checks: [...checks], version, uptimeSeconds, checkedAt: new Date().toISOString() };
}

export async function timedHealthCheck(name: string, check: () => Promise<boolean>, timeoutMs = 5_000): Promise<HealthCheck> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const available = await Promise.race([
      check(),
      new Promise<boolean>((_, reject) => controller.signal.addEventListener("abort", () => reject(new Error("Health check timed out")), { once: true }))
    ]);
    return { name, status: available ? "ok" : "down", latencyMs: Date.now() - started, checkedAt: new Date().toISOString() };
  } catch (error) {
    return { name, status: "down", latencyMs: Date.now() - started, message: error instanceof Error ? error.message : "Unknown health-check error", checkedAt: new Date().toISOString() };
  } finally {
    clearTimeout(timer);
  }
}
