"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Self-Employed",
    role: "Freelance Web Developer",
    startDate: "2021",
    endDate: "Present",
    description:
      "Consult with clients to build and maintain responsive WordPress websites. Manage hosting environments, DNS, backups, and ongoing server troubleshooting.",
    tags: ["WordPress", "Elementor", "ACF", "PHP", "MySQL", "DNS"],
  },
  {
    company: "Self-Employed",
    role: "Landscaping Business Owner",
    startDate: "2010",
    endDate: "2021",
    description:
      "Managed daily operations, crews, budgeting, scheduling, and equipment purchasing for an independent business. Over a decade of leadership, budgeting, and customer-facing experience.",
    tags: ["Leadership", "Budgeting", "Customer Relations", "Operations"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Where I&apos;ve <span className="gradient-text">worked</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.role}-${exp.company}`}
              variants={itemVariants}
              className={`relative flex items-start mb-10 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 gradient-bg rounded-full -translate-x-1.5 mt-7" />

              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
                <div className="rounded-xl border border-border/50 bg-card/30 p-6 hover:border-border transition-colors">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground/60 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                  <p className="text-muted-foreground/70 mb-3 flex items-center gap-2 text-sm">
                    <Briefcase className="h-3.5 w-3.5" />
                    {exp.company}
                  </p>
                  <p className="text-sm text-muted-foreground/80 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
