export type AsyncState<T> = { status: "idle" | "loading" | "success" | "error"; data?: T; error?: Error };
export interface Pagination { cursor?: string; limit?: number; }
export interface Page<T> { items: T[]; nextCursor?: string; }
export const assertNever = (value: never): never => { throw new Error(`Unexpected value: ${String(value)}`); };
