---
id: particle-background
name: Particle Background
component: ParticleBackground
renderTarget: canvas
---

## What it is
A full-screen field of drifting 3D points behind page content. Gives a
site an ambient, "alive" feeling without pulling focus from foreground
content.

## When to use it
- Hero sections that need atmosphere but no specific 3D object
- Dark, moody, or "tech" themed sites
- Backgrounds for text-heavy sections that would look flat otherwise

## When NOT to use it
- Product configurators or anything where the user needs to focus on a
  specific 3D object (competes for attention)
- Light, minimal, or corporate-clean sites (reads as too "gamer")

## Props
- `color` (hex string, default "#7f77dd") — particle color
- `count` (number, default 2000) — how many particles, lower for weaker GPUs
- `speed` (number, default 0.05) — drift/rotation speed
