"use client";

import { motion } from "framer-motion";
import { Folder, Globe, Mail, Terminal, Shield, Laptop2, Phone } from "lucide-react";
import Link from "next/link";

export function Linkstack() {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center gradient-text"
        >
          Project Collection
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Adventure Platform */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
            className="group rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-b from-cyan-500/10 to-blue-500/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="text-cyan-400 text-4xl" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2">Family Media & Web Platform</h3>
              <p className="text-muted-foreground/60 text-sm mb-4">
                adventures.jewellcore.com - WordPress multisite with sub-adventures content, deployed via GitHub → Coolify → Cloudflare pipeline.
              </p>
              <div className="flex items-center gap-2">
                <Link href="https://github.com/Jjjewell1" target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Home Lab Venus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
            className="group rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-b from-cyan-500/10 to-blue-500/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Folder className="text-cyan-400 text-4xl" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2">Home Lab "Venus" — Unraid Server</h3>
              <p className="text-muted-foreground/60 text-sm mb-4">
                Coolify, Nextcloud, Homepage dashboard, 10+ services on ZFS pool. Docker, KVM/QEMU, Cloudflare Tunnels.
              </p>
              <div className="flex items-center gap-2">
                <Link href="https://github.com/Jjjewell1" target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Local AI Dev Environment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
            className="group rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-b from-cyan-500/10 to-blue-500/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Laptop2 className="text-cyan-400 text-4xl" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2">Local AI Development Environment</h3>
              <p className="text-muted-foreground/60 text-sm mb-4">
                Ollama on RTX 5060 (8GB VRAM), custom Modelfile, Cline + OpenCode CLI for AI-assisted coding.
              </p>
              <div className="flex items-center gap-2">
                <Link href="https://github.com/Jjjewell1" target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Caregiver Support Tools */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.4 }}
            className="group rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-b from-cyan-500/10 to-blue-500/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="text-cyan-400 text-4xl" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2">Caregiver Support Tools</h3>
              <p className="text-muted-foreground/60 text-sm mb-4">
                Mobile-friendly wellness schedule & medication logger with CSV export, countdown timer, haptic alerts.
              </p>
              <div className="flex items-center gap-2">
                <Link href="https://github.com/Jjjewell1" target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Link>
              </div>
            </div>
          </motion.div>

          {/* WordPress Client Sites */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.5 }}
            className="group rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-b from-cyan-500/10 to-blue-500/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Phone className="text-cyan-400 text-4xl" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2">WordPress Client Sites</h3>
              <p className="text-muted-foreground/60 text-sm mb-4">
                Freelance development with Elementor, ACF, custom post types. Hosting & DNS management.
              </p>
              <div className="flex items-center gap-2">
                <Link href="https://github.com/Jjjewell1" target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}