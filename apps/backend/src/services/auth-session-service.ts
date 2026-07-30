import crypto from "node:crypto";
import { prisma } from "../database/prisma.js";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
export function hashSessionToken(token:string){ return crypto.createHash("sha256").update(token).digest("hex"); }
export async function readSession(token:string){
  const session=await prisma.userSession.findFirst({where:{tokenHash:hashSessionToken(token),revokedAt:null,expiresAt:{gt:new Date()}},include:{user:{include:{memberships:{include:{organization:true}}}}}});
  if(!session) return null;
  await prisma.userSession.update({where:{id:session.id},data:{lastActiveAt:new Date()}});
  return {user:{id:session.user.id,email:session.user.email,name:session.user.name,avatarUrl:session.user.avatarUrl},memberships:session.user.memberships.map(m=>({organizationId:m.organizationId,organizationName:m.organization.name,role:m.role})),expiresAt:session.expiresAt.toISOString()};
}
export async function revokeSession(token:string){ await prisma.userSession.updateMany({where:{tokenHash:hashSessionToken(token),revokedAt:null},data:{revokedAt:new Date()}}); }
export async function createSession(userId:string, meta?:{ipAddress?:string;userAgent?:string}){ const token=crypto.randomBytes(48).toString("base64url"); const expiresAt=new Date(Date.now()+SESSION_TTL_MS); await prisma.userSession.create({data:{userId,tokenHash:hashSessionToken(token),expiresAt,ipAddress:meta?.ipAddress,userAgent:meta?.userAgent}}); return {token,expiresAt}; }
