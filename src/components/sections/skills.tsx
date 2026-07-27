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
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState } from "react";

const skillCategories = [
  {
    title: "Networking",
    icon: Network,
    color: "#22d3ee",
    skills: [
      { name: "TCP/IP", proficiency: 58 },
      { name: "Container Networking", proficiency: 60 },
      { name: "Docker Network Config", proficiency: 66 },
      { name: "DNS", proficiency: 60 },
      { name: "Port Forwarding", proficiency: 55 },
      { name: "Cloudflare Tunnels", proficiency: 65 },
    ],
  },
  {
    title: "Systems Admin",
    icon: Server,
    color: "#3b82f6",
    skills: [
      { name: "Unraid", proficiency: 74 },
      { name: "Self-Hosted Applications", proficiency: 76 },
      { name: "Web Hosting", proficiency: 72 },
      { name: "Windows System Admin", proficiency: 63 },
      { name: "Linux Server Admin", proficiency: 60 },
      { name: "Troubleshooting & Log Analysis", proficiency: 72 },
    ],
  },
  {
    title: "Cloud & Virtualization",
    icon: Cloud,
    color: "#8b5cf6",
    skills: [
      { name: "Docker", proficiency: 72 },
      { name: "Docker Compose", proficiency: 68 },
      { name: "Portainer", proficiency: 70 },
      { name: "Coolify (PaaS)", proficiency: 65 },
      { name: "KVM/QEMU/libvirt", proficiency: 55 },
    ],
  },
  {
    title: "Scripting & Automation",
    icon: Code,
    color: "#10b981",
    skills: [
      { name: "YAML Configuration", proficiency: 70 },
      { name: "Git", proficiency: 55 },
      { name: "GitHub Deployment Workflows", proficiency: 52 },
      { name: "CI/CD Pipelines", proficiency: 50 },
    ],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    color: "#f59e0b",
    skills: [
      { name: "Network Security", proficiency: 55 },
      { name: "Access Control", proficiency: 58 },
      { name: "CompTIA Security+ (Studying)", proficiency: 40 },
      { name: "SIEM Concepts (Studying)", proficiency: 35 },
    ],
  },
  {
    title: "Software & Web",
    icon: Monitor,
    color: "#ec4899",
    skills: [
      { name: "WordPress", proficiency: 80 },
      { name: "WordPress Multisite", proficiency: 72 },
      { name: "Elementor", proficiency: 78 },
      { name: "HTML/CSS", proficiency: 60 },
      { name: "PHP", proficiency: 55 },
      { name: "Next.js", proficiency: 50 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    color: "#06b6d4",
    skills: [
      { name: "MySQL/MariaDB", proficiency: 58 },
      { name: "PostgreSQL", proficiency: 50 },
      { name: "Database Troubleshooting", proficiency: 56 },
    ],
  },
  {
    title: "AI & Automation Tools",
    icon: Terminal,
    color: "#a855f7",
    skills: [
      { name: "Ollama (Local LLM Hosting)", proficiency: 72 },
      { name: "AI-Assisted Development", proficiency: 68 },
      { name: "ComfyUI Image Generation", proficiency: 50 },
      { name: "OpenCode CLI", proficiency: 55 },
    ],
  },
];

const radarData = skillCategories.map((cat) => ({
  category: cat.title,
  score: Math.round(cat.skills.reduce((a, b) => a + b.proficiency, 0) / cat.skills.length),
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical capabilities across IT infrastructure
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="max-w-lg mx-auto">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="score"
                  stroke="#22d3ee"
                  fill="#22d3ee"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value) => [`${value}%`, "Avg Proficiency"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              onMouseEnter={() => setActiveCategory(catIndex)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg gradient-bg">
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                      </div>
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
