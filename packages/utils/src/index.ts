export * from "./helpers";
export * from "./errors";
export async function retry<T>(operation: () => Promise<T>, attempts = 3, baseDelayMs = 200): Promise<T> {
  let lastError: unknown;
  for (let attempt=0; attempt<attempts; attempt+=1) {
    try { return await operation(); } catch (error) { lastError=error; if (attempt+1<attempts) await new Promise((resolve)=>setTimeout(resolve, baseDelayMs * 2 ** attempt)); }
  }
  throw lastError;
}
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([promise, new Promise<T>((_, reject)=>setTimeout(()=>reject(new Error(`Timed out after ${timeoutMs} ms`)), timeoutMs))]);
}
