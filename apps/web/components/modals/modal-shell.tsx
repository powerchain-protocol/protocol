"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
export function ModalShell({ open, onOpenChange, title, description, children }:{open:boolean;onOpenChange:(open:boolean)=>void;title:string;description?:string;children:React.ReactNode}) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/10 bg-white p-6 text-black shadow-2xl dark:border-white/10 dark:bg-neutral-950 dark:text-white">
      <div className="pr-10"><Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>{description ? <Dialog.Description className="mt-1 text-sm text-neutral-500">{description}</Dialog.Description> : null}</div>
      <Dialog.Close className="absolute right-4 top-4 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Close"><X size={18}/></Dialog.Close>
      <div className="mt-5">{children}</div>
    </Dialog.Content>
  </Dialog.Portal></Dialog.Root>;
}
