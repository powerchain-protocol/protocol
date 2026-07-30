
import {z} from "zod";
const schema=z.object({tierId:z.enum(["developer","starter","growth","enterprise"]),billingCycle:z.enum(["monthly","yearly"]),companyId:z.string().optional(),returnUrl:z.string().url().optional()});
export async function POST(request:Request){
  const input=schema.parse(await request.json());
  const reference=`sub_${crypto.randomUUID().slice(0,8)}`;
  const base=process.env.NEXT_PUBLIC_CHECKOUT_URL??"https://checkout.powerchain.energy";
  const checkoutUrl=input.tierId==="enterprise"
    ? "https://powerchain.energy/contact"
    : `${base}/saas?plan=${input.tierId}&billing=${input.billingCycle}&reference=${reference}`;
  return Response.json({data:{checkoutUrl,reference}},{status:201});
}
