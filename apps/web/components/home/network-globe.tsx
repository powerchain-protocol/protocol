
import { Globe2 } from "lucide-react";

export function NetworkGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-[min(760px,92vw)]">
      <div className="absolute inset-[5%] rounded-full border border-lime-400/30 shadow-[0_0_110px_rgba(132,204,22,.18)]" />
      <div className="absolute inset-[14%] rounded-full border border-dashed border-emerald-400/30" />
      <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_45%_38%,rgba(190,242,100,.55),rgba(5,46,22,.8)_45%,#020b08_72%)]">
        <Globe2 className="h-full w-full p-[9%] text-lime-300/70" strokeWidth={.55} />
      </div>
      {[["16%","34%"],["28%","67%"],["48%","24%"],["61%","53%"],["74%","31%"],["80%","68%"]].map(([left,top])=>(
        <span key={`${left}-${top}`} className="absolute size-2 rounded-full bg-lime-300 shadow-[0_0_18px_5px_rgba(190,242,100,.45)]" style={{left,top}} />
      ))}
    </div>
  );
}
