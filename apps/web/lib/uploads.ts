import { z } from "zod";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const allowedTypes = new Set([
  "application/pdf",
  "text/csv",
  "application/json",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export const uploadResponseSchema = z.object({
  data: z.object({ key: z.string(), url: z.string().optional(), contentType: z.string().optional(), size: z.number().optional() }),
});

export function validateUpload(file: File) {
  if (file.size <= 0) throw new Error("The file is empty.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("The file exceeds the 10 MB upload limit.");
  if (!allowedTypes.has(file.type)) throw new Error("Unsupported file type.");
  return file;
}

export async function uploadFile(file: File, apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "") {
  validateUpload(file);
  const body = new FormData();
  body.append("file", file, file.name);
  const response = await fetch(`${apiBaseUrl}/api/v1/uploads`, {
    method: "POST",
    body,
    credentials: "include",
    headers: { "x-request-id": crypto.randomUUID() },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error?.message ?? "Upload failed.");
  return uploadResponseSchema.parse(payload).data;
}
