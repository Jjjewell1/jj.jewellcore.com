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
      "Consult with clients to build and maintain responsive WordPress websites. Manage hosting environments, DNS, backups, and ongoing server troubleshooting. Develop sites using Elementor, Advanced Custom Fields, and custom post types.",
    tags: ["WordPress", "Elementor", "ACF", "PHP", "MySQL", "DNS", "Web Hosting"],
  },
  {
    company: "Self-Employed",
    role: "Landscaping Business Owner",
    startDate: "2010",
    endDate: "2021",
    description:
      "Managed daily operations, crews, budgeting, scheduling, and equipment purchasing for an independent business. Handled customer relations, sales, and estimating. Over a decade of leadership, budgeting, and customer-facing experience.",
    tags: ["Business Management", "Leadership", "Budgeting", "Customer Relations", "Operations"],
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
            My professional journey
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
              key={`${exp.role}-${exp.company}`}
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
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                    <p className="text-muted-foreground mb-3 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {exp.company}
                    </p>
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
