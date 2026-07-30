
import type {FastifyReply,FastifyRequest} from "fastify";
export function ok<T>(reply:FastifyReply,data:T,meta:Record<string,unknown>={}){return reply.send({data,meta:{requestId:reply.request.id,generatedAt:new Date().toISOString(),...meta}})}
export function created<T>(reply:FastifyReply,data:T){return reply.code(201).send({data,meta:{requestId:reply.request.id,generatedAt:new Date().toISOString()}})}
export function noContent(reply:FastifyReply){return reply.code(204).send()}
export function list<T>(request:FastifyRequest,reply:FastifyReply,data:T[],total=data.length){return reply.send({data,meta:{requestId:request.id,total,generatedAt:new Date().toISOString()}})}
