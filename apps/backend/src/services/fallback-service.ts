export type ProviderAttempt<T> = { provider: string; execute: () => Promise<T> };
export type FallbackResult<T> = { data: T | null; provider: string | null; available: boolean; attempts: string[]; errors: string[] };

export async function withFallback<T>(providers: ProviderAttempt<T>[]): Promise<FallbackResult<T>> {
  const attempts: string[] = [];
  const errors: string[] = [];
  for (const provider of providers) {
    attempts.push(provider.provider);
    try {
      const data = await provider.execute();
      return { data, provider: provider.provider, available: true, attempts, errors };
    } catch (error) {
      errors.push(`${provider.provider}: ${error instanceof Error ? error.message : "unknown error"}`);
    }
  }
  return { data: null, provider: null, available: false, attempts, errors };
}
