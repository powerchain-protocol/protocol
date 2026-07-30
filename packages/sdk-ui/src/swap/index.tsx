import type { ReactNode } from "react";
export interface SwapPanelProps { title?: string; description?: string; actionLabel?: string; disabled?: boolean; onAction?: () => void; children?: ReactNode; }
export function SwapPanel({ title = "Swap PWRC and supported assets", description = "Powerchain SDK UI component", actionLabel = "Review swap", disabled, onAction, children }: SwapPanelProps) {
  return <section data-powerchain-ui="swap" aria-label={title}><header><h2>{title}</h2><p>{description}</p></header>{children}<button type="button" disabled={disabled} onClick={onAction}>{actionLabel}</button></section>;
}
