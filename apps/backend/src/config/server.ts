
import { env } from "./env.js";

export const serverConfig = {
  port: env.port,
  host: env.host,
  trustProxy: true,
  bodyLimit: 2 * 1024 * 1024,
  requestTimeout: 30_000,
  keepAliveTimeout: 72_000,
  corsOrigins: env.corsOrigins,
  uploadLimit: 10 * 1024 * 1024,
  apiPrefix: "/api/v1"
} as const;
