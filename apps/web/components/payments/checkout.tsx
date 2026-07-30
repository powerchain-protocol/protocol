
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PaymentForm, type PaymentFormValue } from "./payment-form";
import { PAYMENT_METHODS } from "./payment-methods";
import { CheckoutConfirmationModal } from "@/components/modals/checkout-confirmation-modal";

export function Checkout() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PaymentFormValue>({
    email: "",
    organization: "",
    method: "pwrc",
    reference: "INV-2026-1045"
  });

  const method = PAYMENT_METHODS.find((item) => item.id === form.method)?.name ?? form.method;

  async function confirm() {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...form, amount: 12450, currency: "GBP" })
    });

    if (!response.ok) {
      toast.error("Checkout could not be created");
      return;
    }

    setOpen(false);
    toast.success("Checkout created", { description: "The transaction is ready for wallet approval." });
  }

  return (
    <>
      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border bg-white p-6 shadow-[var(--pc-card-shadow)] md:p-8">
          <h1 className="text-3xl font-semibold">Complete your payment</h1>
          <p className="mt-2 text-slate-500">Secure settlement for renewable infrastructure services.</p>
          <div className="mt-8"><PaymentForm value={form} onChange={setForm} /></div>
        </div>

        <aside className="h-fit rounded-3xl border bg-white p-6 shadow-[var(--pc-card-shadow)]">
          <h2 className="font-bold">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span>Infrastructure settlement</span><span>£12,000.00</span></div>
            <div className="flex justify-between"><span>Platform fee</span><span>£450.00</span></div>
            <div className="border-t pt-4 text-lg font-bold"><div className="flex justify-between"><span>Total</span><span>£12,450.00</span></div></div>
          </div>
          <Button className="mt-6 w-full" onClick={() => setOpen(true)}>Review payment</Button>
        </aside>
      </section>

      <CheckoutConfirmationModal
        open={open}
        onOpenChange={setOpen}
        amount="£12,450.00"
        method={method}
        onConfirm={confirm}
      />
    </>
  );
}
