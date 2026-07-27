"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Download, MapPin } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan/3 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-green-400 font-medium">Open to IT Opportunities</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            <span className="gradient-text">Jeffrey JJ Jewell</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light mb-4">
            IT Professional &amp; Cybersecurity Student
          </p>

          <p className="text-lg text-muted-foreground/60 mb-3">
            Self-Hosted Infrastructure &amp; Automation
          </p>

          <div className="flex items-center justify-center gap-2 text-muted-foreground/50 mb-10">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Richlands, Virginia</span>
          </div>

          <p className="text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-14 leading-relaxed">
            Designing, deploying, and troubleshooting self-hosted infrastructure spanning
            containerized services, virtualization, CI/CD pipelines, and local AI tooling.
            Former business owner bringing over a decade of leadership to a technical career.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#contact">
            <Button size="lg" className="gradient-bg text-white hover:opacity-90 transition-opacity px-8">
              Get In Touch
            </Button>
          </Link>
          <Link href="#projects">
            <Button size="lg" variant="outline" className="px-8">
              View Projects
            </Button>
          </Link>
          <a href="/resume" target="_blank">
            <Button size="lg" variant="outline" className="gap-2 px-8">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-8 mt-14"
        >
          <a
            href="https://github.com/Jjjewell1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:jj@jewellcore.com"
            className="text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20"
        >
          <Link href="#stats" className="text-muted-foreground/30 hover:text-foreground transition-colors">
            <ArrowDown className="h-5 w-5 mx-auto animate-bounce" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
