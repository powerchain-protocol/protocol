
import { z } from "zod";

const schema = z.object({
  signature: z.string().min(32),
  network: z.enum(["solana", "sui", "evm"]),
  type: z.enum(["payment", "swap", "bridge", "stake"]),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: { code: "INVALID_TRANSACTION", issues: parsed.error.issues } }, { status: 400 });
  }

  return Response.json({
    data: {
      id: crypto.randomUUID(),
      status: "submitted",
      createdAt: new Date().toISOString(),
      ...parsed.data
    }
  });
}
