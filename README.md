# AI 3D Site Builder — MVP starter

This is step 1-3 of the MVP plan: a hand-built block library, a codegen
script that picks and customizes blocks from a prompt, and a template that
turns the result into a real runnable React Three Fiber app. No preview UI,
no auth, no deploy step yet — on purpose. Get this part good before adding
anything else.

## How it fits together

```
src/blocks/<block-name>/
  block.md          <- description the LLM reads (what it is, when to use it, props)
  <Component>.jsx    <- the actual R3F component

generator/
  blockCatalog.mjs  <- reads every block.md into a catalog
  generate.mjs      <- takes a prompt, asks the LLM which blocks + props to use,
                       writes generated/App.jsx

generated/
  App.jsx           <- output of the generator (starts as a demo file)
```

## Run the demo (no API key needed)

```bash
npm install
npm run dev
```

You should see a particle field with a bobbing white sphere — that's the
`particle-background` and `floating-icon` blocks wired together by hand,
proving the blocks themselves work before the generator touches them.

## Try the generator without an API key

```bash
npm run generate -- "a landing page for my coding blog with a floating bunny mascot and a features section" --dry-run
npm run dev
```

`--dry-run` uses a dumb keyword heuristic instead of calling an LLM, so you
can test the whole pipeline — prompt in, App.jsx out — before you've wired
up billing on an API key.

## Try it for real

1. Copy `.env.example` to `.env` and add your `ANTHROPIC_API_KEY`
2. Load it into your shell (PowerShell: `$env:ANTHROPIC_API_KEY = "sk-ant-..."`)
3. Run without `--dry-run`:

```bash
npm run generate -- "a dark moody portfolio hero with ambient particles and a floating logo icon"
npm run dev
```

Open `generated/App.jsx` afterward and read it — it's plain, readable JSX,
not a black box. That's the point: the LLM is only ever choosing from and
configuring blocks *you* wrote and trust.

## Extending the block library (this is most of the real work)

To add a new block:
1. `mkdir src/blocks/your-block-name`
2. Write `block.md` — copy the format from an existing block. The
   "when to use it / when NOT to use it" sections matter most; that's what
   the LLM actually uses to decide.
3. Write the component. Keep props simple (colors, numbers, strings) —
   the LLM will only ever pass primitive prop values, not logic.

Aim for 8-12 blocks before moving to step 4 (live preview). Good
candidates: a shader gradient hero, an orbit/product-configurator rig, a
GLTF model loader wrapper, a text-reveal-on-scroll variant, a scroll-linked
camera path.

## Where this goes next (steps 4-6, not built yet)

- **Step 4:** wrap this in a thin web UI, swap the manual `npm run dev`
  step for WebContainers so the generated project runs live in-browser.
- **Step 5:** rebuild a real personal/client site with it — that's the
  actual MVP test, not "does it run."
- **Step 6:** only after step 5 works, decide whether auth/billing/hosting
  for other users is worth building.
