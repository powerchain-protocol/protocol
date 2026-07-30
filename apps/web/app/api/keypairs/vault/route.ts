import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const USER_ID = /^[a-zA-Z0-9_-]{3,64}$/;
const MAX_BYTES = 256_000;

export async function POST(request: Request) {
  const userId = request.headers.get("x-powerchain-user-id") ?? "";
  if (!USER_ID.test(userId)) return NextResponse.json({ error: "A valid authenticated user id is required." }, { status: 401 });
  const raw = await request.text();
  if (Buffer.byteLength(raw) > MAX_BYTES) return NextResponse.json({ error: "Vault payload is too large." }, { status: 413 });
  let vault: unknown;
  try { vault = JSON.parse(raw); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  if (!vault || typeof vault !== "object" || !Array.isArray((vault as {records?:unknown}).records)) return NextResponse.json({ error: "Invalid encrypted vault." }, { status: 400 });
  const directory = path.join(process.cwd(), "..", "..", "storage", "keypairs", "users", userId);
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await writeFile(path.join(directory, "vault.json"), JSON.stringify(vault, null, 2), { mode: 0o600 });
  return NextResponse.json({ stored: true, encryptedOnly: true });
}
