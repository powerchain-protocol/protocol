import { createHash, randomUUID } from "node:crypto";
import { extname } from "node:path";
import { MemoryStorage } from "@powerchain/storage";

const storage = new MemoryStorage();
const allowedTypes = new Set(["application/pdf", "text/csv", "application/json", "image/png", "image/jpeg", "image/webp"]);

export async function storeUpload(input: { filename: string; mimetype: string; bytes: Uint8Array }) {
  if (!allowedTypes.has(input.mimetype)) throw Object.assign(new Error("Unsupported file type."), { statusCode: 415, code: "UNSUPPORTED_MEDIA_TYPE" });
  const digest = createHash("sha256").update(input.bytes).digest("hex");
  const extension = extname(input.filename).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const key = `uploads/${new Date().toISOString().slice(0, 10)}/${randomUUID()}${extension}`;
  const result = await storage.upload(key, input.bytes, input.mimetype);
  return { ...result, key, contentType: input.mimetype, size: input.bytes.byteLength, sha256: digest };
}
