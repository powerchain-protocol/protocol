import type { ReactNode } from "react";
export interface DonatePanelProps { title?: string; description?: string; actionLabel?: string; disabled?: boolean; onAction?: () => void; children?: ReactNode; }
export function DonatePanel({ title = "Donate PWRC to verified ecosystem initiatives", description = "Powerchain SDK UI component", actionLabel = "Donate", disabled, onAction, children }: DonatePanelProps) {
  return <section data-powerchain-ui="donate" aria-label={title}><header><h2>{title}</h2><p>{description}</p></header>{children}<button type="button" disabled={disabled} onClick={onAction}>{actionLabel}</button></section>;
}
