import type { ReactNode } from "react";
export interface ExplorerPanelProps { title?: string; description?: string; actionLabel?: string; disabled?: boolean; onAction?: () => void; children?: ReactNode; }
export function ExplorerPanel({ title = "Search transactions, accounts, programs and tokens", description = "Powerchain SDK UI component", actionLabel = "Search", disabled, onAction, children }: ExplorerPanelProps) {
  return <section data-powerchain-ui="explorer" aria-label={title}><header><h2>{title}</h2><p>{description}</p></header>{children}<button type="button" disabled={disabled} onClick={onAction}>{actionLabel}</button></section>;
}
