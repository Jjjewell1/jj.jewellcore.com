"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Your Current/Most Recent Company",
    role: "IT Support Specialist",
    startDate: "2022",
    endDate: "Present",
    description:
      "Manage and maintain IT infrastructure, provide technical support, administer Windows/Linux servers, manage network equipment, and implement security policies.",
    tags: ["Windows Server", "Active Directory", "Networking", "Docker"],
  },
  {
    company: "Previous Company",
    role: "Help Desk Technician",
    startDate: "2020",
    endDate: "2022",
    description:
      "Provided Tier 1-2 technical support, resolved hardware/software issues, managed user accounts, and assisted with system deployments.",
    tags: ["Help Desk", "Windows 10/11", "Hardware", "Troubleshooting"],
  },
  {
    company: "Homelab Projects",
    role: "Self-Taught Systems Administrator",
    startDate: "2018",
    endDate: "Present",
    description:
      "Built and maintain a comprehensive homelab environment including Proxmox/Unraid virtualization, Docker containers, networking labs, and monitoring solutions.",
    tags: ["Unraid", "Proxmox", "Docker", "Grafana", "Self-Hosted"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey in IT
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 gradient-bg" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className={`relative flex items-start mb-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 gradient-bg rounded-full -translate-x-1.5 mt-6" />

              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                    <p className="text-muted-foreground mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground/80 mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
