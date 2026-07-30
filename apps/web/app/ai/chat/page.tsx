
import {Header} from "@/components/layout/header";import {Footer} from "@/components/layout/footer";import {ChatInterface} from "@/components/ai/chat-interface";
export default function Page(){return <><Header/><main className="mx-auto min-h-[800px] max-w-[1300px] px-5 py-14"><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">AI workspace</p><h1 className="mt-3 text-5xl font-semibold">Operational intelligence</h1><div className="mt-8"><ChatInterface/></div></main><Footer/></>}
