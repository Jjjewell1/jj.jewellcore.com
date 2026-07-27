"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, ChevronRight } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  problem: string;
  whatJJDid: string;
  result: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: "Self-Hosted Family Media & Web Platform",
    description: "A self-hosted family travel/scrapbook site deployed through a CI/CD pipeline with collaborative development.",
    problem: "Needed a private, self-hosted platform for family to share travel stories and photos without relying on third-party services.",
    whatJJDid: "Built a custom WordPress multisite with nested \"sub-adventures\" content feature. Set up a GitHub → Coolify → Cloudflare Tunnel deployment pipeline. Collaborated with a second developer using shared GitHub workflows. Generated custom branding assets using ComfyUI.",
    result: "A fully self-hosted, publicly accessible family platform with custom branding, deployed via automated pipeline.",
    techStack: ["WordPress", "WordPress Multisite", "Coolify", "Cloudflare Tunnels", "GitHub Actions", "ComfyUI"],
    liveUrl: "https://adventures.jewellcore.com",
    featured: true,
  },
  {
    title: "Home Lab Infrastructure — \"Venus\"",
    description: "Complete home lab server running containerized services on Unraid with ZFS storage.",
    problem: "Needed a centralized, reliable self-hosted infrastructure for family services, media, and productivity tools.",
    whatJJDid: "Administer an Unraid server hosting Coolify, Homepage dashboard, Nextcloud, and multiple containerized services on a ZFS storage pool. Diagnosed and resolved Docker named-volume caching issues causing config changes not to reflect live. Troubleshot KVM/libvirt VM startup failures tied to loop-device conflicts.",
    result: "A stable, high-uptime home lab hosting 10+ services with secure public access via Cloudflare Tunnels.",
    techStack: ["Unraid", "Docker", "Coolify", "ZFS", "KVM/QEMU", "Cloudflare Tunnels", "Nextcloud"],
    featured: true,
  },
  {
    title: "Local AI Development Environment",
    description: "Local LLM hosting and AI-assisted coding workflow on a Windows workstation.",
    problem: "Wanted to leverage local AI models for coding assistance without sending code to external cloud services.",
    whatJJDid: "Configured Ollama on a Windows workstation (RTX 5060, 8GB VRAM) for local model inference. Diagnosed and fixed Cline tool-call failures caused by Ollama's default context window — resolved with a custom Modelfile raising num_ctx to 8192-16384. Evaluated and integrated OpenCode as a CLI-based coding agent.",
    result: "A fully functional local AI development stack enabling private, fast AI-assisted coding.",
    techStack: ["Ollama", "hermes3:8b", "VS Code", "Cline", "OpenCode", "NVIDIA RTX 5060"],
    featured: true,
  },
  {
    title: "Caregiver Support Tools",
    description: "Mobile-friendly wellness scheduling and medication tracking tools.",
    problem: "Needed responsive, mobile-friendly tools for daily care tasks that work across different devices.",
    whatJJDid: "Designed a mobile-friendly wellness schedule using fluid CSS Grid for responsive layout. Built an interactive medication-logging tool with per-dose checkboxes, timestamps, CSV export, and an in-page countdown timer with audio and haptic alerts.",
    result: "Practical, responsive tools that work seamlessly on phones, tablets, and desktops.",
    techStack: ["HTML", "CSS Grid", "JavaScript", "Progressive Web App"],
    featured: false,
  },
  {
    title: "WordPress Development & Client Sites",
    description: "Freelance WordPress development with Elementor, ACF, and custom post types.",
    problem: "Clients needed professional, responsive websites with easy content management.",
    whatJJDid: "Develop and maintain WordPress sites using Elementor, Advanced Custom Fields, and custom post types. Manage hosting environments, plugin configuration, backups, DNS, and performance optimization.",
    result: "Multiple successful client websites with ongoing maintenance and support since 2021.",
    techStack: ["WordPress", "Elementor", "ACF", "PHP", "MySQL", "DNS"],
    liveUrl: "https://jewellcore.com",
    featured: false,
  },
];

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

export function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world projects showcasing problem-solving and technical implementation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4 cursor-pointer" onClick={() => setExpandedProject(expandedProject === index ? null : index)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        {project.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground/80">{project.description}</p>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4 ${
                        expandedProject === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {expandedProject === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 pt-4 border-t border-border/50"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-cyan mb-1">Problem</h4>
                        <p className="text-sm text-muted-foreground/80">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-cyan mb-1">What JJ Did</h4>
                        <p className="text-sm text-muted-foreground/80">{project.whatJJDid}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-cyan mb-1">Result</h4>
                        <p className="text-sm text-muted-foreground/80">{project.result}</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
