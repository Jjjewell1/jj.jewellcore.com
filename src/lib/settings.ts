import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getSetting(key: string): Promise<string | null> {
  const [row] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key));
  return row?.value ?? null;
}

export async function getProfileImage(): Promise<{ mime: string; base64: string } | null> {
  const src = await getSetting("profileImage");
  if (!src || !src.startsWith("data:image/")) return null;
  const [meta, base64] = src.split(",");
  const mime = /data:([^;,]+)/.exec(meta)?.[1] ?? "image/png";
  return { mime, base64 };
}

export interface AiSettings {
  ollamaHost: string;
  ollamaModel: string;
}

export async function getAiSettings(): Promise<AiSettings> {
  const host = await getSetting("ollamaHost");
  const model = await getSetting("ollamaModel");
  return {
    ollamaHost: normalizeOllamaHost(host || process.env.OLLAMA_HOST || "https://ollama.jewellcore.com"),
    ollamaModel: model || process.env.OLLAMA_MODEL || "hermes3:8b",
  };
}

export function normalizeOllamaHost(input: string): string {
  let host = (input || "").trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(host)) host = `https://${host}`;
  return host;
}
