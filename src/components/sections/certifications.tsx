"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, CheckCircle2 } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  status: "in-progress" | "planned" | "completed";
  progress: number;
}

const certifications: Certification[] = [
  { name: "CompTIA A+", issuer: "CompTIA", status: "in-progress", progress: 30 },
  { name: "CompTIA Network+", issuer: "CompTIA", status: "planned", progress: 10 },
  { name: "CompTIA Security+", issuer: "CompTIA", status: "planned", progress: 10 },
  { name: "Linux+", issuer: "CompTIA", status: "planned", progress: 5 },
  { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", status: "planned", progress: 5 },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", status: "planned", progress: 5 },
];

const statusConfig = {
  "in-progress": { label: "In Progress", color: "bg-blue-500", badgeClass: "border-blue-500/50 text-blue-400" },
  "planned": { label: "Planned", color: "bg-muted-foreground/40", badgeClass: "border-muted-foreground/30 text-muted-foreground" },
  "completed": { label: "Completed", color: "bg-green-500", badgeClass: "border-green-500/50 text-green-400" },
};

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

export function Certifications() {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pursuing industry-recognized certifications to validate my expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.name} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg gradient-bg">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline" className={`text-xs ${statusConfig[cert.status].badgeClass}`}>
                      {cert.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                      {cert.status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {statusConfig[cert.status].label}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs text-muted-foreground/60">{cert.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cert.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full gradient-bg rounded-full"
                      />
                    </div>
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
