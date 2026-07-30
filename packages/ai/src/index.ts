
import {z} from "zod";
export const aiRequestSchema=z.object({model:z.string(),messages:z.array(z.object({role:z.enum(["system","user","assistant","tool"]),content:z.string()})),temperature:z.number().min(0).max(1).default(.2),maxOutputTokens:z.number().int().positive().max(8192).default(2048)});
export type AiRequest=z.infer<typeof aiRequestSchema>; export type AiResponse={id:string;model:string;content:string;usage?:{inputTokens:number;outputTokens:number}};
export interface AiProvider{name:string;complete(request:AiRequest,signal?:AbortSignal):Promise<AiResponse>}
export function requiresConfirmation(action:string){return["treasury.transfer","energy.order","contract.upgrade","role.change"].includes(action)}
