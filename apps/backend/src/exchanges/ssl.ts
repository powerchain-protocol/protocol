import { env } from "../config/env.js";

export function assertSecureExchangeUrl(value: string): URL {
  const url = new URL(value);
  const localDevelopment = env.NODE_ENV !== "production" && ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  if (url.protocol !== "https:" && !(localDevelopment && url.protocol === "http:")) {
    throw new Error(`Exchange endpoint must use HTTPS: ${url.origin}`);
  }
  if (url.username || url.password) throw new Error("Exchange endpoint URL must not contain credentials");
  return url;
}

export async function secureFetch(url: URL, init: RequestInit = {}, timeoutMs = env.EXCHANGE_TIMEOUT_MS): Promise<Response> {
  assertSecureExchangeUrl(url.toString());
  const timeout = AbortSignal.timeout(timeoutMs);
  const signal = init.signal ? AbortSignal.any([init.signal, timeout]) : timeout;
  return fetch(url, {
    ...init,
    signal,
    redirect: "error",
    headers: { accept: "application/json", "user-agent": "powerchain-exchange-service/1.0", ...init.headers }
  });
}
