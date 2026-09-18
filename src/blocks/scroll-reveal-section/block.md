---
id: scroll-reveal-section
name: Scroll Reveal Section
component: ScrollRevealSection
renderTarget: dom
---

## What it is
A page section wrapper that fades and slides its content into view as
the visitor scrolls to it, using GSAP ScrollTrigger. This is the
"sections transform as you scroll" pattern from cinematic 3D sites.

## When to use it
- Any content section below the hero (features, about, contact)
- When you want the page to feel directed/cinematic rather than static

## When NOT to use it
- The hero section itself (it's already visible on load, nothing to reveal)
- Content that needs to be immediately scannable (e.g. pricing tables —
  don't hide info behind a scroll animation)

## Props
- `direction` ("up" | "left" | "right", default "up") — which direction
  content slides in from
- `delay` (number, default 0) — seconds to delay the reveal
- `children` — the section content (plain HTML/React, not 3D)
