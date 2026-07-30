
import {z} from "zod";const schema=z.object({prompt:z.string().min(2).max(4000),settings:z.record(z.string(),z.unknown()).optional()});
export async function POST(request:Request){const {prompt}=schema.parse(await request.json());return Response.json({data:{answer:`I analysed your request: "${prompt.slice(0,180)}". This demo response can be replaced with a configured model provider, portfolio tools, transaction tools, and memory.`,suggestions:["Review portfolio","Check payments","Open analytics"]}})}
