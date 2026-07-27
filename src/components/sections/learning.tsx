"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const topics = [
  "Python",
  "Linux Administration",
  "Network Security",
  "Digital Forensics",
  "SIEM Concepts",
  "Cloud Technologies",
  "Cybersecurity Fundamentals",
  "Active Directory",
];

export function LearningTicker() {
  return (
    <section className="py-10 overflow-hidden border-y border-border/50">
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-muted-foreground/60"
        >
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-medium">Currently Learning</span>
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 whitespace-nowrap"
        >
          {[...topics, ...topics].map((topic, index) => (
            <div
              key={`${topic}-${index}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30"
            >
              <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
              <span className="text-sm text-muted-foreground/70">{topic}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
