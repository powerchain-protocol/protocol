
export function MetricRing({
  value,
  label,
  detail
}: {
  value: number;
  label: string;
  detail: string;
}) {
  const degrees = Math.max(0, Math.min(100, value)) * 3.6;
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-white p-4">
      <div
        className="grid size-20 place-items-center rounded-full"
        style={{ background: `conic-gradient(#087a3b ${degrees}deg, #e8efe9 0deg)` }}
      >
        <div className="grid size-14 place-items-center rounded-full bg-white text-sm font-bold">{value}%</div>
      </div>
      <div><b>{label}</b><p className="mt-1 text-xs text-slate-500">{detail}</p></div>
    </div>
  );
}
