"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Mail, Download, MapPin } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 600], [0, 140]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const floatY = useSpring(useTransform(scrollY, [0, 600], [0, 60]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then(d => {
      if (d.profileImage) setProfileImage(d.profileImage);
    });
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative parallax orbs */}
      <motion.div
        style={{ x: mouse.x * -40, y: mouse.y * -40 }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan/10 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ x: mouse.x * 50, y: mouse.y * 50 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue/10 blur-3xl pointer-events-none"
      />

      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-green-400 font-medium">Open to IT Opportunities</span>
          </div>

          {profileImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
              style={{ x: mouse.x * 18, y: mouse.y * 18 }}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto">
                <div className="absolute inset-0 rounded-full gradient-bg blur-md opacity-40 animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-cyan/40 animate-float" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border/50 shadow-2xl">
                  <img src={profileImage} alt="Jeffrey JJ Jewell" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          )}

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 tracking-tight text-shimmer">
            Jeffrey JJ Jewell
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
            <Button size="lg" className="gradient-bg text-white hover:opacity-90 transition-opacity px-8 glow-cyan">
              Get In Touch
            </Button>
          </Link>
          <Link href="#projects">
            <Button size="lg" variant="outline" className="px-8 glass hover:bg-card/70">
              View Projects
            </Button>
          </Link>
          <a href="/resume" target="_blank">
            <Button size="lg" variant="outline" className="gap-2 px-8 glass hover:bg-card/70">
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
          {[
            { href: "https://github.com/Jjjewell1", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:jj@jewellcore.com", icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -4, scale: 1.15 }}
              className="text-muted-foreground/50 hover:text-cyan transition-colors"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
          style={{ y: floatY }}
        >
          <Link href="#stats" className="text-muted-foreground/30 hover:text-foreground transition-colors">
            <ArrowDown className="h-5 w-5 mx-auto animate-bounce" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
