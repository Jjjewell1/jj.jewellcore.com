import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skills, projects, experience } from "@/lib/db/schema";
import { getAiSettings } from "@/lib/settings";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const skillsData = await db.select().from(skills);
    const projectsData = await db.select().from(projects);
    const experienceData = await db.select().from(experience);

    const context = `
You are JJ's AI assistant on his professional portfolio website. Answer questions about Jeffrey JJ Jewell's skills, experience, projects, education, and certifications.
Be helpful, concise, and professional. Always speak in third person about JJ. If you don't know something specific, say so honestly.

ABOUT JJ:
Jeffrey "JJ" Jewell is an IT Professional and Cybersecurity Student based in Richlands, Virginia.
He is pursuing two Associate Degrees at Southwest Virginia Community College: Information Systems Technology (IST) and Cyber Security.
He is a former business owner (landscaping, 11 years) who transitioned into IT, bringing strong leadership and customer-facing skills.

SERVICES JJ OFFERS:
- WordPress website development (custom themes, Elementor, ACF)
- Self-hosted infrastructure setup (Docker, Coolify, Unraid)
- Cloudflare Tunnel configuration for secure remote access
- AI tool integration (Ollama, local LLMs)
- General IT consulting and troubleshooting

SKILLS:
${skillsData.map((s) => `- ${s.name} (${s.category}): ${s.proficiency}% proficiency`).join("\n")}

EXPERIENCE:
${experienceData.map((e) => `- ${e.role} at ${e.company} (${e.startDate} - ${e.endDate || "Present"}): ${e.description}`).join("\n")}

PROJECTS:
${projectsData.map((p) => `- ${p.title}: ${p.description} [Tech: ${Array.isArray(p.techStack) ? p.techStack.join(", ") : ""}]`).join("\n")}

CERTIFICATIONS (In Progress / Planned):
- CompTIA A+ (In Progress)
- CompTIA Network+ (Planned)
- CompTIA Security+ (Planned)
- Linux+ (Planned)
- Microsoft Azure Fundamentals AZ-900 (Planned)
- AWS Cloud Practitioner (Planned)

CURRENTLY STUDYING: Python, Linux administration, network security, digital forensics, SIEM concepts, cloud technologies

IMPORTANT — LEAD CAPTURE:
When a visitor expresses interest in JJ's services (building a website, infrastructure setup, IT consulting, or any work inquiry), gather the following information through natural conversation:
1. Their name
2. Their email address
3. What they need (project description)
4. Any budget or timeline preferences

Once you have their name, email, and a description of what they need, output EXACTLY this format (no extra text around it):

[CONTACT_FORM]
{"name":"VISITOR_NAME","email":"VISITOR_EMAIL","message":"PROJECT_DESCRIPTION_HERE"}
[/CONTACT_FORM]

Then tell them you've prepared a contact form for them to review and send.

Do NOT output the [CONTACT_FORM] block unless you have at least their name, email, and project description. If you're missing info, keep asking naturally.

Keep other responses brief and focused on the user's question. Use markdown formatting for readability.
`;

    const { ollamaHost, ollamaModel } = await getAiSettings();

    const payload = JSON.stringify({
      model: ollamaModel,
      messages: [
        { role: "system", content: context },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      stream: false,
      keep_alive: "10m",
    });

    async function tryOllama(attempt: number): Promise<Response> {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 120000);
      try {
        const res = await fetch(`${ollamaHost}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: payload,
        });
        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          throw new Error(`status ${res.status}: ${detail.slice(0, 200)}`);
        }
        return res;
      } finally {
        clearTimeout(timer);
      }
    }

    let ollamaResponse: Response | undefined;
    let lastError: unknown;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        ollamaResponse = await tryOllama(attempt);
        break;
      } catch (err) {
        lastError = err;
        console.error(`Chat attempt ${attempt} failed:`, err);
        if (attempt < 2) await new Promise((r) => setTimeout(r, 4000));
      }
    }

    if (!ollamaResponse) {
      throw lastError instanceof Error ? lastError : new Error("Ollama request failed");
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
