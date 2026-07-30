import type { ReactNode } from "react";
export interface CheckoutPanelProps { title?: string; description?: string; actionLabel?: string; disabled?: boolean; onAction?: () => void; children?: ReactNode; }
export function CheckoutPanel({ title = "Pay securely with PWRC", description = "Powerchain SDK UI component", actionLabel = "Continue to payment", disabled, onAction, children }: CheckoutPanelProps) {
  return <section data-powerchain-ui="checkout" aria-label={title}><header><h2>{title}</h2><p>{description}</p></header>{children}<button type="button" disabled={disabled} onClick={onAction}>{actionLabel}</button></section>;
}
