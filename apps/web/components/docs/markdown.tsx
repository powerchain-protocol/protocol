import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { Marker } from "./markers";

export const markdownComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="scroll-m-20 text-4xl font-bold tracking-tight" {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold" {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="mt-8 scroll-m-20 text-xl font-semibold" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="my-4 leading-7 text-foreground/80" {...props} />,
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => href.startsWith("/") ? <Link href={href} className="font-medium text-emerald-600 underline-offset-4 hover:underline" {...props} /> : <a href={href} className="font-medium text-emerald-600 underline-offset-4 hover:underline" rel="noreferrer" target="_blank" {...props} />,
  pre: (props: ComponentPropsWithoutRef<"pre">) => <pre className="my-5 overflow-x-auto rounded-xl border bg-zinc-950 p-4 text-sm text-zinc-100" {...props} />,
  code: (props: ComponentPropsWithoutRef<"code">) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => <blockquote className="my-5 border-l-4 border-emerald-600 pl-4 italic text-muted-foreground" {...props} />,
  Marker,
};
export function MarkdownArticle({ children }: { children: ReactNode }) { return <article className="mx-auto w-full max-w-4xl">{children}</article>; }
