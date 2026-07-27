"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "11+", label: "Years Leadership", sublabel: "Business Operations" },
  { number: "30+", label: "Technical Skills", sublabel: "Across 8 Categories" },
  { number: "5", label: "Projects Built", sublabel: "Self-Hosted & Deployed" },
  { number: "6", label: "Certifications", sublabel: "In Progress / Planned" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Stats() {
  return (
    <section id="stats" className="py-20 border-y border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground/60">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
