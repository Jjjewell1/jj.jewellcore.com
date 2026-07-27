"use client";

import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Minus, Square, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const commands: Record<string, () => string> = {
  help: () =>
    `Available commands:
  jj --about       About Jeffrey JJ Jewell
  jj --skills      List all technical skills
  jj --experience  Work experience history
  jj --projects    Portfolio projects
  jj --certs       Certifications & status
  jj --contact     Contact information
  jj --education   Education background
  whoami           Display current user
  neofetch         System info
  date             Current date & time
  sudo hire-me     ??
  clear            Clear terminal
  help             Show this message`,

  "jj --about": () =>
    `JEFFREY JJ JEWELL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IT Professional | Cybersecurity Student
Self-Hosted Infrastructure & Automation

📍 Richlands, Virginia
📧 jj@jewellcore.com
🌐 jj.jewellcore.com

Hands-on IT professional pursuing degrees in
Cyber Security and IST at Southwest Virginia
Community College. Designs, deploys, and
troubleshoots self-hosted infrastructure spanning
containerized services, virtualization, CI/CD
pipelines, and local AI tooling.

Former business owner with 11+ years of
leadership, budgeting, and customer-facing
experience.`,

  "jj --skills": () =>
    `TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☁️  Cloud & Virtualization
    Docker (72%) • Docker Compose (68%) • Portainer (70%)
    Coolify (65%) • KVM/QEMU/libvirt (55%) • Unraid (74%)

🖥️  Systems Administration
    Unraid (74%) • Self-Hosted Apps (76%) • Web Hosting (72%)
    Windows Admin (63%) • Linux Admin (60%) • Troubleshooting (72%)

🌐  Networking
    TCP/IP (58%) • Container Networking (60%) • Docker Net Config (66%)
    DNS (60%) • Cloudflare Tunnels (65%)

💻  Software & Web Development
    WordPress (80%) • Elementor (78%) • WordPress Multisite (72%)
    HTML/CSS (60%) • PHP (55%) • Next.js (50%)

🤖  AI & Automation
    Ollama Local LLM (72%) • AI-Assisted Dev (68%)
    ComfyUI (50%) • OpenCode CLI (55%)

🔧  Scripting & Automation
    YAML Config (70%) • Git (55%) • GitHub Workflows (52%)
    CI/CD Pipelines (50%)

🗄️  Databases
    MySQL/MariaDB (58%) • PostgreSQL (50%) • DB Troubleshooting (56%)

🔒  Cybersecurity (Studying)
    Network Security (55%) • Access Control (58%)
    CompTIA Security+ (40%) • SIEM Concepts (35%)`,

  "jj --experience": () =>
    `WORK EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💼 Freelance Web Developer | 2021 — Present
   Self-Employed
   • Consult with clients to build & maintain WordPress sites
   • Manage hosting, DNS, backups, server troubleshooting
   • Develop with Elementor, ACF, custom post types

💼 Landscaping Business Owner | 2010 — 2021
   Self-Employed (11 Years)
   • Managed daily operations, crews, budgeting, scheduling
   • Handled customer relations, sales, estimating
   • 11+ years of leadership & business management`,

  "jj --projects": () =>
    `PORTFOLIO PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⭐ Family Media & Web Platform
   adventures.jewellcore.com
   WordPress multisite with sub-adventures content,
   deployed via GitHub → Coolify → Cloudflare pipeline.

⭐ Home Lab "Venus" — Unraid Server
   Coolify, Nextcloud, Homepage dashboard, 10+ services
   on ZFS pool. Docker, KVM/QEMU, Cloudflare Tunnels.

⭐ Local AI Development Environment
   Ollama on RTX 5060 (8GB VRAM), custom Modelfile,
   Cline + OpenCode CLI for AI-assisted coding.

  Caregiver Support Tools
   Mobile-friendly wellness schedule & medication logger
   with CSV export, countdown timer, haptic alerts.

  WordPress Client Sites
   Freelance development with Elementor, ACF,
   custom post types. Hosting & DNS management.`,

  "jj --certs": () =>
    `CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   [██░░░░░░░░] CompTIA A+            In Progress (30%)
   [░░░░░░░░░░] CompTIA Network+       Planned
   [░░░░░░░░░░] CompTIA Security+      Planned
   [░░░░░░░░░░] Linux+                 Planned
   [░░░░░░░░░░] Azure Fundamentals     Planned
   [░░░░░░░░░░] AWS Cloud Practitioner Planned`,

  "jj --contact": () =>
    `CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email:      jj@jewellcore.com
🌐 Website:    jj.jewellcore.com
🐙 GitHub:     github.com/Jjjewell1
💼 LinkedIn:  linkedin.com/in/jjewell
📍 Location:   Richlands, Virginia`,

  "jj --education": () =>
    `EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 Southwest Virginia Community College
   Associate Degree — Information Systems Technology (IST)
   Associate Degree — Cyber Security
   Status: In Progress`,

  whoami: () => "visitor@jj.jewellcore.com — Welcome! 👋",

  neofetch: () =>
    `       jj.jewellcore.com
  ┌──────────────────────┐  OS: Portfolio OS v2.0
  │  ████████████████    │  Host: Jeffrey JJ Jewell
  │  █ JJ JEWELL   █    │  Kernel: Next.js 16
  │  █ IT PRO      █    │  Shell: jj-shell 1.0
  │  ████████████████    │  DE: React 19 + Tailwind
  │  ████████████████    │  CPU: IT Professional
  │  █              █    │  Memory: 11+ Years Exp
  │  ████████████████    │  Uptime: Career in Progress
  └──────────────────────┘  Distro: Southwest Virginia CC`,

  date: () => new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }),

  "sudo hire-me": () =>
    `
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║   🎉 Great choice!                      ║
    ║                                          ║
    ║   Let's connect:                         ║
    ║   📧 jj@jewellcore.com                  ║
    ║   🌐 jj.jewellcore.com                  ║
    ║                                          ║
    ║   Scroll down to the contact form        ║
    ║   or send an email directly!             ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
    `,
};

const autocompleteMap: Record<string, string> = {
  about: "jj --about",
  skills: "jj --skills",
  experience: "jj --experience",
  projects: "jj --projects",
  certs: "jj --certs",
  cert: "jj --certs",
  contact: "jj --contact",
  education: "jj --education",
  clear: "clear",
};

export function Terminal() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to jj-shell v1.0 — Type 'help' for available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const cmd = autocompleteMap[raw.toLowerCase()] || raw;
    let output = "";

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      setCommandHistory((prev) => [...prev, raw]);
      return;
    }

    if (commands[cmd]) {
      output = commands[cmd]();
    } else {
      output = `jj-shell: command not found: ${raw}\nType 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, `$ ${raw}`, output, ""]);
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <section id="terminal" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Try the Terminal</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my profile through an interactive command line
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl overflow-hidden border border-border/50 shadow-2xl"
        >
          <div className="bg-[#1a1a2e] px-4 py-2.5 flex items-center gap-2 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-2 ml-4 text-xs text-muted-foreground/60">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>jj-shell — visitor@jj.jewellcore.com</span>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="bg-[#0d1117] p-4 h-[420px] overflow-y-auto font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap leading-relaxed">
                {line.startsWith("$ ") ? (
                  <span>
                    <span className="text-cyan-400">visitor</span>
                    <span className="text-muted-foreground/50">@</span>
                    <span className="text-cyan-400">jj.jewellcore</span>
                    <span className="text-muted-foreground/50">:~$ </span>
                    <span className="text-green-400">{line.slice(2)}</span>
                  </span>
                ) : line === "clear" ? null : (
                  <span className="text-gray-300">{line}</span>
                )}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-cyan-400 shrink-0">visitor</span>
              <span className="text-muted-foreground/50 shrink-0">@</span>
              <span className="text-cyan-400 shrink-0">jj.jewellcore</span>
              <span className="text-muted-foreground/50 shrink-0">:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-400 font-mono caret-green-400"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
