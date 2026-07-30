
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  organization: z.string().min(2),
  method: z.string().min(2),
  reference: z.string().min(2),
  amount: z.number().positive(),
  currency: z.literal("GBP")
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: { code: "INVALID_CHECKOUT", issues: parsed.error.issues } }, { status: 400 });
  }

  return Response.json({
    data: {
      id: crypto.randomUUID(),
      status: "requires_wallet_approval",
      ...parsed.data
    }
  });
}
