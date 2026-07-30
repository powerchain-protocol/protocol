
"use client";

import * as Popover from "@radix-ui/react-popover";
import { X } from "lucide-react";

export function PopoverCard({
  trigger,
  title,
  children
}: {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={10}
          className="z-50 w-[min(380px,calc(100vw-2rem))] rounded-2xl border bg-white p-5 shadow-[var(--pc-modal-shadow)]"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{title}</h2>
            <Popover.Close className="rounded-lg p-2 hover:bg-slate-100" aria-label="Close">
              <X className="size-4" />
            </Popover.Close>
          </div>
          <div className="mt-4">{children}</div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
