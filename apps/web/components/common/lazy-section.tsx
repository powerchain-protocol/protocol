
"use client";

import { useEffect, useRef, useState } from "react";

export function LazySection({
  children,
  fallback,
  rootMargin = "240px"
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref}>
      {visible ? children : fallback ?? <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />}
    </div>
  );
}
