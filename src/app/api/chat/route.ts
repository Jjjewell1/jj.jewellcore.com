import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skills, projects, experience } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const skillsData = await db.select().from(skills);
    const projectsData = await db.select().from(projects);
    const experienceData = await db.select().from(experience);

    const context = `
You are JJ's AI assistant. Answer questions about Jeffrey JJ Jewell's skills, experience, and projects.
Be helpful, concise, and professional. If you don't know something, say so.

SKILLS:
${skillsData.map((s) => `- ${s.name} (${s.category}): ${s.proficiency}% proficiency`).join("\n")}

EXPERIENCE:
${experienceData.map((e) => `- ${e.role} at ${e.company} (${e.startDate} - ${e.endDate || "Present"}): ${e.description}`).join("\n")}

PROJECTS:
${projectsData.map((p) => `- ${p.title}: ${p.description} [Tech: ${Array.isArray(p.techStack) ? p.techStack.join(", ") : ""}]`).join("\n")}

Keep responses brief and focused on the user's question. Use markdown formatting for readability.
`;

    const ollamaHost = process.env.OLLAMA_HOST || "http://localhost:11434";

    const ollamaResponse = await fetch(`${ollamaHost}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "hermes3:8b",
        messages: [
          { role: "system", content: context },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama responded with status ${ollamaResponse.status}`);
    }

    const data = await ollamaResponse.json();
    return NextResponse.json({ response: data.message?.content || "No response generated." });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { response: "I'm having trouble connecting to my AI brain right now. Please try again later." },
      { status: 500 }
    );
  }
}
