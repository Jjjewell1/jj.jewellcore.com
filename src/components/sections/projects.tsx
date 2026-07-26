"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import Link from "next/link";

const projects = [
  {
    title: "Homelab Infrastructure",
    description:
      "Complete homelab setup with Proxmox virtualization, Unraid storage server, Docker containers, and comprehensive monitoring with Grafana and Prometheus.",
    techStack: ["Unraid", "Proxmox", "Docker", "Grafana", "Prometheus", "Linux"],
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    title: "Network Monitoring Dashboard",
    description:
      "Real-time network monitoring solution with automated alerting, traffic analysis, and performance metrics visualization.",
    techStack: ["Grafana", "Prometheus", "SNMP", "Python", "Docker"],
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    title: "Automated Backup System",
    description:
      "Automated backup solution with encrypted storage, incremental backups, and email notifications for backup status.",
    techStack: ["Bash", "Cron", "Restic", "Docker", "PostgreSQL"],
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    title: "AD User Provisioning Scripts",
    description:
      "PowerShell scripts for automated Active Directory user creation, group management, and bulk operations.",
    techStack: ["PowerShell", "Active Directory", "Windows Server"],
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    title: "Docker Compose Stacks",
    description:
      "Collection of Docker Compose configurations for self-hosted applications including media servers, productivity tools, and monitoring.",
    techStack: ["Docker", "Docker Compose", "Nginx", "Linux"],
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    title: "Cloudflare Tunnel Setup",
    description:
      "Automated Cloudflare Tunnel configuration for secure remote access to homelab services without port forwarding.",
    techStack: ["Cloudflare", "Docker", "Linux", "Networking"],
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Projects() {
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
            Showcasing my technical projects and homelab builds
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground/80 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
