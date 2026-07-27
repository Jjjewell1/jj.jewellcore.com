"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="rounded-xl border border-border/50 bg-card/30 p-8">
            <div className="flex items-start gap-5">
              <div className="p-3 rounded-xl bg-muted/50 shrink-0">
                <GraduationCap className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Southwest Virginia Community College
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground/60 mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>In Progress</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline">Associate — Information Systems Technology</Badge>
                  <Badge variant="outline">Associate — Cyber Security</Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
