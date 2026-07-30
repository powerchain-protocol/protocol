
import { z } from "zod";
import { buildCctpTransfer } from "@/lib/cctp/circle";

const schema = z.object({
  sourceDomain: z.number().int().nonnegative(),
  destinationDomain: z.number().int().nonnegative(),
  amountBaseUnits: z.string().regex(/^\d+$/),
  mintRecipient: z.string().min(16)
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: { code: "INVALID_CCTP_QUOTE", issues: parsed.error.issues } }, { status: 400 });
  }

  const transfer = buildCctpTransfer({
    ...parsed.data,
    amountBaseUnits: BigInt(parsed.data.amountBaseUnits)
  });

  return Response.json({ data: transfer });
}
