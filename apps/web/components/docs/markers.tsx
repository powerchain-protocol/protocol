import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, Lightbulb, ShieldAlert } from "lucide-react";

const variants = {
  info: { icon: Info, label: "Information", className: "border-sky-500/30 bg-sky-500/10" },
  note: { icon: Lightbulb, label: "Note", className: "border-emerald-500/30 bg-emerald-500/10" },
  warning: { icon: AlertTriangle, label: "Warning", className: "border-amber-500/30 bg-amber-500/10" },
  danger: { icon: ShieldAlert, label: "Security", className: "border-red-500/30 bg-red-500/10" },
  success: { icon: CheckCircle2, label: "Complete", className: "border-emerald-500/30 bg-emerald-500/10" },
} as const;
export type MarkerVariant = keyof typeof variants;
export function Marker({ variant = "info", title, children }: { variant?: MarkerVariant; title?: string; children: ReactNode }) {
  const config = variants[variant]; const Icon = config.icon;
  return <aside className={`my-5 rounded-xl border p-4 ${config.className}`} role={variant === "danger" ? "alert" : "note"}>
    <div className="flex gap-3"><Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div><p className="font-semibold">{title ?? config.label}</p><div className="mt-1 text-sm opacity-85">{children}</div></div>
    </div>
  </aside>;
}
