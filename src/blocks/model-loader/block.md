---
id: model-loader
name: Model Loader
component: ModelLoader
renderTarget: canvas
---

## What it is
A stage that loads a real external .glb 3D model file and makes it gently
bob and slowly rotate, lit with a colored rim light — the same "hero
mascot" treatment as floating-icon, but for an actual loaded 3D asset
instead of a placeholder mesh. Drop the .glb in `public/` (or anywhere
the app is served from) and point `modelPath` at it.

## When to use it
- A hero object that is a real 3D asset (downloaded model, product scan,
  character, mascot rig)
- Portfolio or landing page hero sections with a concrete 3D model
- Anywhere you want a loadable/replaceable 3D object instead of a
  hand-built placeholder

## When NOT to use it
- If there is no external model yet (use floating-icon with primitive
  geometry until the file exists)
- Multiple objects that need independent interaction (use a full scene instead)
- When the object needs user-driven rotation/zoom (pair with OrbitControls)
- Lightweight/simple shapes that don't justify a .glb download

## Props
- `modelPath` (string, required) — path to the .glb file, e.g.
  "/models/mascot.glb". Model should be in the served static folder.
- `scale` (number, default 1) — uniform size multiplier for the model
- `rimColor` (hex string, default "#4fd1ff") — accent rim light color
- `bobSpeed` (number, default 1) — bob animation speed
- `bobHeight` (number, default 0.15) — how far it bobs up/down