export interface RuntimeContext { requestId: string; tenantId?: string; userId?: string; traceId?: string; }
export function createRuntimeContext(input: Partial<RuntimeContext> = {}): RuntimeContext {
  return { requestId: input.requestId ?? crypto.randomUUID(), ...input };
}
