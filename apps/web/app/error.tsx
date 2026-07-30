
"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-sm font-bold text-emerald-700">Something went wrong</p>
        <h1 className="mt-3 text-4xl font-semibold">The page could not be loaded.</h1>
        <button className="mt-7 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
