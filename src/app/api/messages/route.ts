import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function sendPushover(title: string, message: string, priority = 0) {
  const userKey = process.env.PUSHOVER_USER_KEY;
  const appToken = process.env.PUSHOVER_APP_TOKEN;

  if (!userKey || !appToken) {
    console.warn("Pushover not configured — skipping notification");
    return;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("token", appToken);
    formData.append("user", userKey);
    formData.append("title", title);
    formData.append("message", message);
    formData.append("priority", String(priority));
    formData.append("html", "1");

    await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
  } catch (err) {
    console.error("Pushover notification failed:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await db.insert(messages).values({ name, email, message });

    sendPushover(
      "New Contact Form Submission",
      `<b>From:</b> ${name}\n<b>Email:</b> ${email}\n<b>Message:</b>\n${message}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Message error:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allMessages = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt));

    return NextResponse.json(allMessages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
