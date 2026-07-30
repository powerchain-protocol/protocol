import type { ReactNode } from "react";
export interface FaucetPanelProps { title?: string; description?: string; actionLabel?: string; disabled?: boolean; onAction?: () => void; children?: ReactNode; }
export function FaucetPanel({ title = "Request devnet PWRC", description = "Powerchain SDK UI component", actionLabel = "Claim", disabled, onAction, children }: FaucetPanelProps) {
  return <section data-powerchain-ui="faucets" aria-label={title}><header><h2>{title}</h2><p>{description}</p></header>{children}<button type="button" disabled={disabled} onClick={onAction}>{actionLabel}</button></section>;
}
