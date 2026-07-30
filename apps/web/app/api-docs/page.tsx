
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ApiReference } from "@/components/developers/api-reference";

export default function ApiDocsPage() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-[780px] px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Powerchain developers</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">API reference and OpenAPI contracts.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
            Explore production endpoints, authentication requirements, schemas, and interactive API documentation.
          </p>
          <div className="mt-10"><ApiReference /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
