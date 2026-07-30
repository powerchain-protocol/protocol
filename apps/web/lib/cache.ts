import { unstable_cache } from "next/cache";

export type CachePolicy = {
  revalidate?: number | false;
  tags?: string[];
};

const DEFAULT_REVALIDATE_SECONDS = 60;

export function cached<TArgs extends readonly unknown[], TResult>(
  key: string,
  loader: (...args: TArgs) => Promise<TResult>,
  policy: CachePolicy = {},
) {
  const revalidate = policy.revalidate ?? DEFAULT_REVALIDATE_SECONDS;
  return unstable_cache(loader, ["powerchain", key], {
    revalidate,
    tags: policy.tags ?? [key],
  });
}

export function cacheKey(...parts: Array<string | number | boolean | null | undefined>) {
  return parts.filter((part) => part !== null && part !== undefined && part !== "").join(":");
}
