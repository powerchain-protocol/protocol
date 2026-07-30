
import { z } from "zod";

const schema=z.object({
  tier:z.enum(["starter","professional","enterprise"]),
  interval:z.enum(["monthly","annual"])
});

export async function POST(request:Request){
  const input=schema.parse(await request.json());
  const base=process.env.NEXT_PUBLIC_CHECKOUT_URL??"https://checkout.powerchain.energy";
  return Response.json({data:{checkoutUrl:`${base}/saas?plan=${input.tier}&billing=${input.interval}`}},{status:201});
}
