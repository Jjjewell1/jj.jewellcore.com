---
id: floating-icon
name: Floating Icon
component: FloatingIcon
renderTarget: canvas
---

## What it is
A stage that makes any 3D object (a mascot, a product, a logo mark)
gently bob and slowly rotate, lit with a colored rim light. This is the
"hero mascot" pattern — e.g. a coffee-sipping coding bunny floating
center-stage.

## When to use it
- A single hero object that represents the brand (mascot, product, logo)
- Portfolio or landing page hero sections
- Anywhere you want one object to feel alive without a whole scene

## When NOT to use it
- Multiple objects that need independent interaction (use a full scene instead)
- When the object itself needs user-driven rotation/zoom (pair with OrbitControls
  or use the orbit-configurator block instead)

## Props
- `rimColor` (hex string, default "#4fd1ff") — accent rim light color
- `bobSpeed` (number, default 1) — bob animation speed
- `bobHeight` (number, default 0.15) — how far it bobs up/down
- `children` — the 3D object/mesh to float (pass your own geometry or
  a loaded GLTF model)
