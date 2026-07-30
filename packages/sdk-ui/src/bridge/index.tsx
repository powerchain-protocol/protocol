import type { ReactNode } from "react";
export interface BridgePanelProps { title?: string; description?: string; actionLabel?: string; disabled?: boolean; onAction?: () => void; children?: ReactNode; }
export function BridgePanel({ title = "Bridge PWRC and wPWRC across supported networks", description = "Powerchain SDK UI component", actionLabel = "Review bridge", disabled, onAction, children }: BridgePanelProps) {
  return <section data-powerchain-ui="bridge" aria-label={title}><header><h2>{title}</h2><p>{description}</p></header>{children}<button type="button" disabled={disabled} onClick={onAction}>{actionLabel}</button></section>;
}
