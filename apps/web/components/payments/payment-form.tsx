
"use client";

import { useState } from "react";
import { CreditCard, LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PAYMENT_METHODS, type PaymentMethodId } from "./payment-methods";

export type PaymentFormValue = {
  email: string;
  organization: string;
  method: PaymentMethodId;
  reference: string;
};

export function PaymentForm({
  value,
  onChange
}: {
  value: PaymentFormValue;
  onChange: (value: PaymentFormValue) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const methods = showAll ? PAYMENT_METHODS : PAYMENT_METHODS.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <Label>Email</Label>
          <Input className="mt-2" type="email" value={value.email} onChange={(event) => onChange({ ...value, email: event.target.value })} />
        </label>
        <label>
          <Label>Organization</Label>
          <Input className="mt-2" value={value.organization} onChange={(event) => onChange({ ...value, organization: event.target.value })} />
        </label>
      </div>

      <label>
        <Label>Invoice or order reference</Label>
        <Input className="mt-2" value={value.reference} onChange={(event) => onChange({ ...value, reference: event.target.value })} />
      </label>

      <div>
        <Label>Payment method</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {methods.map((method) => (
            <button
              type="button"
              key={method.id}
              onClick={() => onChange({ ...value, method: method.id })}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left ${
                value.method === method.id ? "border-emerald-700 bg-emerald-50" : "hover:bg-slate-50"
              }`}
            >
              <span className="grid size-10 place-items-center rounded-full bg-white text-emerald-800 shadow-sm">
                <CreditCard className="size-5" />
              </span>
              <span><b className="block text-sm">{method.name}</b><small className="text-slate-500">{method.description}</small></span>
            </button>
          ))}
        </div>
        <button type="button" className="mt-3 text-sm font-semibold text-emerald-700" onClick={() => setShowAll((value) => !value)}>
          {showAll ? "Show fewer methods" : "Show all payment methods"}
        </button>
      </div>

      <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm">
        <LockKeyhole className="size-5 shrink-0 text-emerald-700" />
        Payment details are encrypted and the transaction is simulated before submission.
      </div>
    </div>
  );
}
