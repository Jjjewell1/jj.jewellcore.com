"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    title: "Networking",
    icon: Network,
    skills: [
      { name: "TCP/IP", proficiency: 90 },
      { name: "DNS", proficiency: 85 },
      { name: "DHCP", proficiency: 85 },
      { name: "Firewalls", proficiency: 80 },
      { name: "VPN", proficiency: 75 },
      { name: "LAN/WAN", proficiency: 90 },
    ],
  },
  {
    title: "Systems",
    icon: Server,
    skills: [
      { name: "Windows Server", proficiency: 85 },
      { name: "Linux (Ubuntu/Debian)", proficiency: 80 },
      { name: "Active Directory", proficiency: 80 },
      { name: "Group Policy", proficiency: 75 },
      { name: "PowerShell", proficiency: 70 },
      { name: "Bash", proficiency: 65 },
    ],
  },
  {
    title: "Cloud & Virtualization",
    icon: Cloud,
    skills: [
      { name: "VMware", proficiency: 80 },
      { name: "Proxmox", proficiency: 75 },
      { name: "Hyper-V", proficiency: 70 },
      { name: "AWS (basics)", proficiency: 50 },
      { name: "Azure AD", proficiency: 65 },
      { name: "Unraid", proficiency: 85 },
    ],
  },
  {
    title: "DevOps & Automation",
    icon: Code,
    skills: [
      { name: "Docker", proficiency: 85 },
      { name: "Docker Compose", proficiency: 80 },
      { name: "CI/CD Pipelines", proficiency: 65 },
      { name: "Git", proficiency: 75 },
      { name: "Ansible", proficiency: 55 },
      { name: "Terraform", proficiency: 45 },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    skills: [
      { name: "Network Security", proficiency: 75 },
      { name: "Endpoint Protection", proficiency: 80 },
      { name: "SIEM Basics", proficiency: 60 },
      { name: "Patch Management", proficiency: 85 },
      { name: "Access Control", proficiency: 80 },
      { name: "Compliance", proficiency: 70 },
    ],
  },
  {
    title: "Monitoring & Tools",
    icon: Monitor,
    skills: [
      { name: "Grafana", proficiency: 75 },
      { name: "Prometheus", proficiency: 65 },
      { name: "PRTG", proficiency: 70 },
      { name: "Wireshark", proficiency: 75 },
      { name: "Nagios", proficiency: 60 },
      { name: "Ping Identity", proficiency: 55 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "SQL Server", proficiency: 70 },
      { name: "MySQL", proficiency: 65 },
      { name: "PostgreSQL", proficiency: 60 },
      { name: "SQLite", proficiency: 70 },
      { name: "Backup & Recovery", proficiency: 80 },
      { name: "Query Optimization", proficiency: 55 },
    ],
  },
  {
    title: "Scripting",
    icon: Terminal,
    skills: [
      { name: "PowerShell", proficiency: 75 },
      { name: "Python", proficiency: 60 },
      { name: "Bash", proficiency: 65 },
      { name: "Batch", proficiency: 70 },
      { name: "JavaScript", proficiency: 50 },
      { name: "HTML/CSS", proficiency: 55 },
    ],
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

export function Skills() {
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
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg gradient-bg">
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
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
                            className="h-full gradient-bg rounded-full"
                          />
                        </div>
                      </div>
                    ))}
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
