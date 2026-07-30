import "dotenv/config";
import { defineConfig } from "prisma/config";

const fallbackUrl = "postgresql://postgres:postgres@localhost:5432/powerchain";

/**
 * Prisma CLI configuration for Prisma ORM 7.
 *
 * Migrations prefer DIRECT_URL so pooled/serverless DATABASE_URL values are not
 * used for schema changes. Client generation does not connect to this fallback.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? fallbackUrl,
    ...(process.env.SHADOW_DATABASE_URL
      ? { shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL }
      : {}),
  },
});
