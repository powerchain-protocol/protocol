"use client";
import { useCallback, useEffect, useState } from "react";
import type { AuthSession } from "@/types/auth";
export function useAuthSession() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    setLoading(true);
    try { const r = await fetch("/api/auth/session", { cache: "no-store" }); setSession(r.ok ? (await r.json()).data ?? null : null); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  const signOut = useCallback(async () => { await fetch("/api/auth/logout", { method: "POST" }); setSession(null); }, []);
  return { session, loading, refresh, signOut };
}
