
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TransactionReviewModal({
  open,
  onOpenChange,
  from,
  to,
  rate,
  fee,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  from: string;
  to: string;
  rate: string;
  fee: string;
  onConfirm: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-slate-950/55 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border bg-white p-6 shadow-[var(--pc-modal-shadow)]">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">Review swap</Dialog.Title>
            <Dialog.Close className="rounded-lg p-2 hover:bg-slate-100"><X className="size-4" /></Dialog.Close>
          </div>
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-5">
            <strong>{from}</strong><ArrowRight className="size-5 text-emerald-700" /><strong>{to}</strong>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Exchange rate</dt><dd>{rate}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Estimated network fee</dt><dd>{fee}</dd></div>
          </dl>
          <div className="mt-5 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm">
            <ShieldCheck className="size-5 shrink-0 text-emerald-700" />
            Protected routing, slippage controls, and route simulation are active.
          </div>
          <Button className="mt-6 w-full" onClick={onConfirm}>Confirm swap</Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
