import "server-only";
import { cookies } from "next/headers";
import type { AuthSession } from "@/types/auth";

export async function getAuthSession(): Promise<AuthSession | null> {
  const token = (await cookies()).get("powerchain_session")?.value;
  if (!token) return null;
  const base = process.env.APP_API_URL ?? "http://localhost:4000";
  const response = await fetch(`${base}/api/v1/auth/session`, {
    headers: { authorization: `Bearer ${token}` }, cache: "no-store"
  }).catch(() => null);
  if (!response?.ok) return null;
  const payload = await response.json() as { data?: AuthSession };
  return payload.data ?? null;
}
