
"use client";

import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, FileJson2, FileText, Server } from "lucide-react";
import { domains } from "@/config/domains";

type OpenApiSummary = {
  info?: { title?: string; version?: string; description?: string };
  paths?: Record<string, Record<string, unknown>>;
};

export function ApiReference() {
  const [spec, setSpec] = useState<OpenApiSummary>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch(`${domains.api.replace(/\/api\/v1$/, "")}/openapi.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load the OpenAPI document.");
        return response.json();
      })
      .then(setSpec)
      .catch((cause) => setError(cause instanceof Error ? cause.message : "Unable to load API documentation."));
  }, []);

  const endpointCount = spec?.paths ? Object.keys(spec.paths).length : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-3xl border bg-white p-6">
        <p className="text-xs font-black uppercase tracking-[.15em] text-emerald-700">API documentation</p>
        <h2 className="mt-2 text-2xl font-semibold">{spec?.info?.title ?? "Powerchain API"}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">{spec?.info?.description ?? "Versioned APIs for Powerchain applications."}</p>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between"><dt>Version</dt><dd className="font-semibold">{spec?.info?.version ?? "1.0.0-beta.12"}</dd></div>
          <div className="flex justify-between"><dt>Documented paths</dt><dd className="font-semibold">{endpointCount}</dd></div>
          <div className="flex justify-between"><dt>Base URL</dt><dd className="font-semibold text-emerald-700">API v1</dd></div>
        </dl>
      </aside>

      <section className="rounded-3xl border bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
        <div className="flex items-center gap-3"><Server className="size-6 text-emerald-700"/><h2 className="text-xl font-bold">Production endpoints</h2></div>
        <code className="mt-5 block overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm text-emerald-300">{domains.api}</code>
        {error && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">{error}</p>}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a href={`${domains.api.replace(/\/api\/v1$/, "")}/api-docs`} className="rounded-2xl border p-4 transition hover:border-emerald-300 hover:bg-emerald-50">
            <BookOpen className="size-5 text-emerald-700"/><b className="mt-3 block">Interactive docs</b><small className="mt-1 block text-slate-500">Swagger UI with request testing.</small>
          </a>
          <a href={`${domains.api.replace(/\/api\/v1$/, "")}/openapi.json`} className="rounded-2xl border p-4 transition hover:border-emerald-300 hover:bg-emerald-50">
            <FileJson2 className="size-5 text-emerald-700"/><b className="mt-3 block">OpenAPI JSON</b><small className="mt-1 block text-slate-500">Machine-readable API contract.</small>
          </a>
          <a href={`${domains.api.replace(/\/api\/v1$/, "")}/swagger.yaml`} className="rounded-2xl border p-4 transition hover:border-emerald-300 hover:bg-emerald-50">
            <FileText className="size-5 text-emerald-700"/><b className="mt-3 block">Swagger YAML</b><small className="mt-1 block text-slate-500">Portable API specification.</small>
          </a>
        </div>
        <a href={domains.docs} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">Open documentation site <ExternalLink className="size-4"/></a>
      </section>
    </div>
  );
}
