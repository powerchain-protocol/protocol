
import type { FastifyPluginAsync } from "fastify";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { domainConfig } from "../config/domains.js";

export const docsRouter: FastifyPluginAsync = async (app) => {
  const here = dirname(fileURLToPath(import.meta.url));
  const docsRoot = resolve(here, "../../../../docs");

  app.get("/swagger.yaml", async (_request, reply) => {
    return reply
      .type("application/yaml; charset=utf-8")
      .header("cache-control", "public, max-age=300, stale-while-revalidate=3600")
      .send(await readFile(resolve(docsRoot, "swagger.yaml"), "utf8"));
  });

  app.get("/openapi.json", async (_request, reply) => {
    return reply
      .type("application/json; charset=utf-8")
      .header("cache-control", "public, max-age=300, stale-while-revalidate=3600")
      .send(await readFile(resolve(docsRoot, "openapi.json"), "utf8"));
  });

  app.get("/docs", async (_request, reply) => {
    return reply.redirect(domainConfig.docsUrl, 302);
  });

  app.get("/api-docs", async (_request, reply) => reply.type("text/html").send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>Powerchain API Reference</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css">
  <style>
    :root{color-scheme:light dark}
    body{margin:0;background:#f7faf8}
    .topbar{display:none}
    .swagger-ui .info{margin:42px 0}
    .swagger-ui .scheme-container{box-shadow:none;border:1px solid #dbe7df;border-radius:18px}
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.ui = SwaggerUIBundle({
      url: "/swagger.yaml",
      dom_id: "#swagger-ui",
      deepLinking: true,
      displayRequestDuration: true,
      persistAuthorization: true,
      filter: true,
      tryItOutEnabled: true
    });
  </script>
</body>
</html>`));
};
