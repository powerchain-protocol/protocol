
import type {FastifyRequest} from "fastify";
export function readEnvironment(request:FastifyRequest):"mock"|"devnet"|"mainnet"{
 const value=(request.headers["x-powerchain-environment"]??(request.query as any)?.environment??"mock");
 return value==="mainnet"||value==="devnet"?value:"mock";
}
export function pagination(query:any){const page=Math.max(1,Number(query?.page??1));const limit=Math.min(100,Math.max(1,Number(query?.limit??25)));return {page,limit,offset:(page-1)*limit}}
export function requestMeta(request:FastifyRequest){return {requestId:request.id,generatedAt:new Date().toISOString()}}
