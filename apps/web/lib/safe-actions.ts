import { z, type ZodType } from "zod";

export type ActionSuccess<T> = { ok: true; data: T };
export type ActionFailure = { ok: false; error: { code: string; message: string; fields?: Record<string, string[]> } };
export type ActionResult<T> = ActionSuccess<T> | ActionFailure;

type ActionContext = { requestId: string };

export function createSafeAction<TInput, TOutput>(
  schema: ZodType<TInput>,
  handler: (input: TInput, context: ActionContext) => Promise<TOutput>,
) {
  return async (input: unknown): Promise<ActionResult<TOutput>> => {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "The submitted data is invalid.",
          fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        },
      };
    }

    const requestId = crypto.randomUUID();
    try {
      return { ok: true, data: await handler(parsed.data, { requestId }) };
    } catch (error) {
      console.error("safe-action-failed", { requestId, error });
      return {
        ok: false,
        error: { code: "ACTION_FAILED", message: "The operation could not be completed." },
      };
    }
  };
}
