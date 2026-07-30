
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CheckoutConfirmationModal({
  open,
  onOpenChange,
  amount,
  method,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  amount: string;
  method: string;
  onConfirm: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-slate-950/55 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border bg-white p-6 shadow-[var(--pc-modal-shadow)]">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">Confirm payment</Dialog.Title>
            <Dialog.Close className="rounded-lg p-2 hover:bg-slate-100"><X className="size-4" /></Dialog.Close>
          </div>
          <div className="mt-6 rounded-2xl bg-emerald-950 p-6 text-white">
            <p className="text-xs text-emerald-200">Amount due</p>
            <strong className="mt-2 block text-4xl">{amount}</strong>
            <p className="mt-3 text-sm text-emerald-100">Payment method: {method}</p>
          </div>
          <div className="mt-5 flex gap-3 text-sm text-slate-600">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-700" />
            The payment request will be created only after confirmation.
          </div>
          <Button className="mt-6 w-full" onClick={onConfirm}>Confirm and continue</Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
