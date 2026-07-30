
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Coin({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      <Image
        src="/developers/powerchain-coin.svg"
        alt="Powerchain token artwork"
        fill
        priority={priority}
        sizes="(max-width: 768px) 160px, 280px"
        className="object-cover"
      />
    </div>
  );
}
