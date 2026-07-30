
export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-5 py-12" aria-busy="true">
      <div className="h-10 w-52 rounded-xl bg-black/10 dark:bg-white/10" />
      <div className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="h-5 w-44 rounded bg-black/10 dark:bg-white/10" />
          <div className="mt-6 h-20 max-w-xl rounded-2xl bg-black/10 dark:bg-white/10" />
          <div className="mt-4 h-20 max-w-lg rounded-2xl bg-black/10 dark:bg-white/10" />
          <div className="mt-8 h-12 w-48 rounded-xl bg-black/10 dark:bg-white/10" />
        </div>
        <div className="min-h-96 rounded-[2rem] bg-black/10 dark:bg-white/10" />
      </div>
    </main>
  );
}
