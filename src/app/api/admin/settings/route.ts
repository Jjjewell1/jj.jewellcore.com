import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const settings = await db.select().from(siteSettings);
  const map: Record<string, string | null> = {};
  for (const s of settings) map[s.key] = s.value;
  return NextResponse.json(map);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  for (const [key, value] of Object.entries(body) as [string, string][]) {
    await db
      .insert(siteSettings)
      .values({ key, value })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date() } });
  }
  return NextResponse.json({ ok: true });
}
