export interface RpcRequestOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

export class ProviderError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly provider: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ProviderError";
  }
}

export async function fetchJson<T>(
  provider: string,
  url: string,
  init: RequestInit = {},
  options: RpcRequestOptions = {},
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 15_000);
  const onAbort = () => controller.abort();
  options.signal?.addEventListener("abort", onAbort, { once: true });

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    if (!response.ok) {
      throw new ProviderError(`${provider} returned HTTP ${response.status}`, "HTTP_ERROR", provider);
    }
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ProviderError) throw error;
    const code = controller.signal.aborted ? "TIMEOUT" : "NETWORK_ERROR";
    throw new ProviderError(`${provider} request failed`, code, provider, error);
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", onAbort);
  }
}

export async function jsonRpc<T>(
  provider: string,
  endpoint: string,
  method: string,
  params: unknown[] = [],
  options: RpcRequestOptions = {},
): Promise<T> {
  const body = await fetchJson<{ result?: T; error?: { message?: string; code?: number } }>(
    provider,
    endpoint,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
    },
    options,
  );
  if (body.error) {
    throw new ProviderError(body.error.message ?? `${provider} RPC error`, String(body.error.code ?? "RPC_ERROR"), provider);
  }
  if (body.result === undefined) throw new ProviderError(`${provider} returned no result`, "EMPTY_RESULT", provider);
  return body.result;
}
