
import Link from "next/link";
import { BookOpen, ChevronDown, Clipboard, Code2 } from "lucide-react";

const code = [
  ['import', ' { PowerChain } ', 'from', ' "@powerchain/web3.js";'],
  ["", "", "", ""],
  ["const", " client = new PowerChain({", "", ""],
  ["", '  endpoint: "https://api.powerchain.io",', "", ""],
  ["", '  commitment: "confirmed",', "", ""],
  ["", "});", "", ""],
  ["", "", "", ""],
  ["const", " balance = await client.getBalance(", "", ""],
  ["", '  "YourWalletAddress"', "", ""],
  ["", ");", "", ""],
  ["", "", "", ""],
  ["", "console.log(balance);", "", ""]
];

export function QuickStartCard() {
  return (
    <div className="developer-code-frame relative rounded-[30px] border border-slate-300 bg-white/90 p-4 shadow-[0_28px_80px_rgba(15,23,42,.15)] backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-800"><Code2 className="size-4" /></span>
          <b className="text-base">Quick Start</b>
          <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,.08)]" />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          TypeScript <ChevronDown className="size-3.5" />
          <button className="grid size-8 place-items-center rounded-lg hover:bg-slate-100" aria-label="Copy example"><Clipboard className="size-4" /></button>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl bg-[#101820] p-4 shadow-inner sm:p-5">
        <pre className="overflow-x-auto text-[11px] leading-6 text-slate-300 sm:text-[13px]">
          {code.map((line, index) => (
            <div className="grid grid-cols-[24px_1fr]" key={index}>
              <span className="select-none text-right text-slate-600">{index + 1}</span>
              <code className="pl-4">
                <span className="text-violet-300">{line[0]}</span>
                <span>{line[1]}</span>
                <span className="text-violet-300">{line[2]}</span>
                <span className="text-emerald-300">{line[3]}</span>
              </code>
            </div>
          ))}
        </pre>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Link href="#guides" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
          <BookOpen className="size-4" /> Read the Quick Start Guide <span aria-hidden>→</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">7K+ developers</span>
          <div className="flex -space-x-2">
            {["JD", "AK", "ML", "RS"].map((label, index) => (
              <span key={label} className={`grid size-7 place-items-center rounded-full border-2 border-white text-[9px] font-bold text-white ${["bg-slate-700","bg-blue-700","bg-amber-700","bg-emerald-700"][index]}`}>
                {label}
              </span>
            ))}
          </div>
          <span className="size-2 rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}
