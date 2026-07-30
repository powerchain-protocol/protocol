
import {z} from "zod";const schema=z.object({id:z.string(),name:z.string().min(1),properties:z.record(z.string(),z.unknown()),occurredAt:z.string()});
export async function POST(request:Request){const event=schema.parse(await request.json());return Response.json({data:{accepted:true,eventId:event.id}},{status:202})}
