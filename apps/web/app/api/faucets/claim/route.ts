import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import {
  createConfiguredDevnetFaucet,
  sendDevnetFaucetClaim,
} from "@powerchain/foucets-program";

export const runtime = "nodejs";
const COOLDOWN_MS = 24 * 60 * 60 * 1_000;
const cooldown = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { wallet?: string };
    const wallet = new PublicKey(body.wallet ?? "");
    const key = wallet.toBase58();
    const now = Date.now();
    const nextClaimAt = cooldown.get(key) ?? 0;

    if (nextClaimAt > now) {
      const retryAfterSeconds = Math.ceil((nextClaimAt - now) / 1_000);
      return NextResponse.json(
        { ok: false, error: "Faucet cooldown is active.", retryAfterSeconds },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
      );
    }

    const configured = createConfiguredDevnetFaucet();
    const result = await sendDevnetFaucetClaim({
      ...configured,
      recipient: wallet,
      tokenProgram: "token-2022",
    });

    cooldown.set(key, now + COOLDOWN_MS);
    return NextResponse.json({ ok: true, ...result });
  } catch (cause) {
    const error = cause instanceof Error ? cause.message : "Faucet claim failed.";
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }
}
