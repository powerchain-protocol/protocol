import type { ReactNode } from "react";
export interface CrowdfundingPanelProps { title?: string; description?: string; actionLabel?: string; disabled?: boolean; onAction?: () => void; children?: ReactNode; }
export function CrowdfundingPanel({ title = "Fund transparent milestone-based campaigns", description = "Powerchain SDK UI component", actionLabel = "Explore campaigns", disabled, onAction, children }: CrowdfundingPanelProps) {
  return <section data-powerchain-ui="crowdfunding" aria-label={title}><header><h2>{title}</h2><p>{description}</p></header>{children}<button type="button" disabled={disabled} onClick={onAction}>{actionLabel}</button></section>;
}
