"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, Clock } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  status: "in-progress" | "planned";
  progress: number;
}

const certifications: Certification[] = [
  { name: "CompTIA A+", issuer: "CompTIA", status: "in-progress", progress: 30 },
  { name: "CompTIA Network+", issuer: "CompTIA", status: "planned", progress: 10 },
  { name: "CompTIA Security+", issuer: "CompTIA", status: "planned", progress: 10 },
  { name: "Linux+", issuer: "CompTIA", status: "planned", progress: 5 },
  { name: "Azure Fundamentals (AZ-900)", issuer: "Microsoft", status: "planned", progress: 5 },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", status: "planned", progress: 5 },
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

export function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Certifications & <span className="gradient-text">growth</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pursuing industry-recognized certifications to validate my expertise.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.name} variants={itemVariants}>
              <div className="card-glow h-full rounded-xl border border-border/50 bg-card/30 p-5 hover:border-border hover:bg-card/60 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <Award className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {cert.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                    {cert.status === "in-progress" ? "In Progress" : "Planned"}
                  </Badge>
                </div>
                <h3 className="text-base font-semibold mb-1">{cert.name}</h3>
                <p className="text-xs text-muted-foreground/60 mb-4">{cert.issuer}</p>
                <div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cert.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full gradient-bg rounded-full"
                    />
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
