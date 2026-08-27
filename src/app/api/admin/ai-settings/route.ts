import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAiSettings, normalizeOllamaHost } from "@/lib/settings";

export async function GET() {
  const settings = await getAiSettings();
  let models: string[] = [];
  let status: "ok" | "error" = "ok";
  let error: string | null = null;

  try {
    const res = await fetch(`${settings.ollamaHost}/api/tags`, {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      models = (data.models || []).map((m: { name: string }) => m.name);
    } else {
      status = "error";
      error = `Ollama responded with status ${res.status}`;
    }
  } catch (err) {
    status = "error";
    error = err instanceof Error ? err.message : "Failed to reach Ollama";
  }

  return NextResponse.json({
    ollamaHost: settings.ollamaHost,
    ollamaModel: settings.ollamaModel,
    models,
    status,
    error,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const host = body.ollamaHost;
  const model = body.ollamaModel;

  if (!host || !model) {
    return NextResponse.json({ error: "Host and model are required" }, { status: 400 });
  }

  const normalizedHost = normalizeOllamaHost(host);
  const entries: Record<string, string> = {
    ollamaHost: normalizedHost,
    ollamaModel: model,
  };

  for (const [key, value] of Object.entries(entries)) {
    await db
      .insert(siteSettings)
      .values({ key, value })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date() } });
  }

  return NextResponse.json({ ok: true, ollamaHost: normalizedHost, ollamaModel: model });
}

export async function DELETE() {
  await db.delete(siteSettings).where(eq(siteSettings.key, "ollamaHost"));
  await db.delete(siteSettings).where(eq(siteSettings.key, "ollamaModel"));
  return NextResponse.json({ ok: true });
}
