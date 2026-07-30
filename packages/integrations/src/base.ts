
export type HttpClientOptions = {
  baseUrl: string;
  apiKey?: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
};

export class IntegrationClient {
  constructor(protected readonly options: HttpClientOptions) {}

  protected async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.options.timeoutMs ?? 12_000);

    try {
      const response = await fetch(`${this.options.baseUrl}${path}`, {
        ...init,
        signal: controller.signal,
        headers: {
          accept: "application/json",
          ...(this.options.apiKey ? { authorization: `Bearer ${this.options.apiKey}` } : {}),
          ...this.options.headers,
          ...init.headers
        }
      });

      if (!response.ok) {
        throw new Error(`Integration request failed: ${response.status}`);
      }

      return await response.json() as T;
    } finally {
      clearTimeout(timeout);
    }
  }
}
