"use client";

import { motion } from "framer-motion";

const topics = [
  { name: "Python", icon: "🐍" },
  { name: "Linux Administration", icon: "🐧" },
  { name: "Network Security", icon: "🔒" },
  { name: "Digital Forensics", icon: "🔍" },
  { name: "SIEM Concepts", icon: "📊" },
  { name: "Cloud Technologies", icon: "☁️" },
  { name: "Cybersecurity", icon: "🛡️" },
  { name: "Active Directory", icon: "🏢" },
];

export function LearningTicker() {
  return (
    <section className="py-8 overflow-hidden border-y border-border/50 bg-muted/10">
      <div className="max-w-6xl mx-auto px-6 mb-5">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/40"
        >
          Currently Expanding My Skillset
        </motion.p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-5 whitespace-nowrap"
        >
          {[...topics, ...topics].map((topic, index) => (
            <div
              key={`${topic.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border/40 bg-card/40 hover:bg-card/70 hover:border-border transition-all duration-300 group"
            >
              <span className="text-xl">{topic.icon}</span>
              <span className="text-base font-medium text-muted-foreground/70 group-hover:text-foreground transition-colors">{topic.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
