import type { ReactNode } from "react";
export interface PaymentsPanelProps { title?: string; description?: string; actionLabel?: string; disabled?: boolean; onAction?: () => void; children?: ReactNode; }
export function PaymentsPanel({ title = "Create and manage Powerchain payment intents", description = "Powerchain SDK UI component", actionLabel = "Create payment", disabled, onAction, children }: PaymentsPanelProps) {
  return <section data-powerchain-ui="payments" aria-label={title}><header><h2>{title}</h2><p>{description}</p></header>{children}<button type="button" disabled={disabled} onClick={onAction}>{actionLabel}</button></section>;
}
