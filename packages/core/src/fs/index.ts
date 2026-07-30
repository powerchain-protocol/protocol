import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export async function ensureDir(directory: string): Promise<string> {
  await mkdir(directory, { recursive: true });
  return directory;
}

export async function removePath(target: string): Promise<void> {
  await rm(target, { recursive: true, force: true });
}

export async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

export async function writeJson(file: string, value: unknown): Promise<void> {
  await ensureDir(path.dirname(file));
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
