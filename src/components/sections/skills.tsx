"use client";

import { motion } from "framer-motion";
import {
  Server,
  Network,
  Cloud,
  Code,
  Shield,
  Database,
  Monitor,
  Terminal,
} from "lucide-react";

const skillCategories = [
  {
    title: "Cloud & Virtualization",
    icon: Cloud,
    color: "#8b5cf6",
    skills: ["Docker", "Docker Compose", "Portainer", "Coolify (PaaS)", "KVM/QEMU/libvirt"],
  },
  {
    title: "Systems Administration",
    icon: Server,
    color: "#3b82f6",
    skills: ["Windows", "Linux (Ubuntu Server)", "Unraid", "Self-Hosted Apps", "Log Analysis"],
  },
  {
    title: "Networking",
    icon: Network,
    color: "#22d3ee",
    skills: ["TCP/IP", "DNS", "Port Forwarding", "Reverse Proxies", "Cloudflare Tunnels"],
  },
  {
    title: "Self-Hosted Services & Databases",
    icon: Database,
    color: "#06b6d4",
    skills: ["Nextcloud", "Home Assistant", "Plex", "Jellyfin", "MySQL/MariaDB", "PostgreSQL"],
  },
  {
    title: "Software & Web",
    icon: Monitor,
    color: "#ec4899",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "WordPress/Elementor/ACF", "Next.js"],
  },
  {
    title: "AI & Automation Tools",
    icon: Terminal,
    color: "#a855f7",
    skills: ["Ollama (Local LLM)", "OpenCode CLI", "Cline", "ComfyUI"],
  },
  {
    title: "Scripting & DevOps",
    icon: Code,
    color: "#10b981",
    skills: ["Git", "GitHub Workflows", "CI/CD Pipelines", "YAML Config"],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    color: "#f59e0b",
    skills: ["Network Security", "Digital Forensics", "SIEM Concepts", "Cloud Security"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Built for the <span className="gradient-text">full stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From networking and virtualization to web development, AI tooling, and security
            fundamentals — a hands-on toolkit built across a self-hosted home lab.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <div className="card-glow h-full rounded-xl border border-border/50 bg-card/30 p-6 hover:border-border hover:bg-card/60 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-muted/50 group-hover:gradient-bg transition-all duration-300">
                    <category.icon className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: category.color }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
