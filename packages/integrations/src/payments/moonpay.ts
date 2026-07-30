
import { createHmac } from "node:crypto";

export function createMoonPaySignature(url: string, secretKey: string) {
  const query = new URL(url).search;
  return createHmac("sha256", secretKey).update(query).digest("base64");
}

export function createMoonPayUrl(input: {
  baseUrl?: string;
  apiKey: string;
  walletAddress: string;
  currencyCode?: string;
  colorCode?: string;
}) {
  const url = new URL(input.baseUrl ?? "https://buy.moonpay.com");
  url.searchParams.set("apiKey", input.apiKey);
  url.searchParams.set("walletAddress", input.walletAddress);
  url.searchParams.set("currencyCode", input.currencyCode ?? "usdc");
  url.searchParams.set("colorCode", input.colorCode ?? "#087A3B");
  return url;
}
