
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/proxy";

const protectedRoutes = ["/account", "/settings", "/investments", "/staking", "/wallet"];
const authRoutes = ["/auth/signin", "/auth/signup", "/auth/reset-password"];

export async function proxy(request: NextRequest) {
  const response = await updateSession(request);
  const requestId = request.headers.get("x-request-id") ?? `req_${crypto.randomUUID()}`;
  response.headers.set("x-request-id", requestId);
  response.headers.set("x-powerchain-proxy", "active");

  const path = request.nextUrl.pathname;
  const hasSession = request.cookies.getAll().some((cookie) =>
    cookie.name.includes("auth-token") || cookie.name.includes("powerchain_session")
  );

  if (protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`)) && !hasSession) {
    const signIn = new URL("/auth/signin", request.url);
    signIn.searchParams.set("returnTo", `${path}${request.nextUrl.search}`);
    return NextResponse.redirect(signIn);
  }

  if (authRoutes.includes(path) && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/|screenshots/|site.webmanifest).*)"]
};
