import { readdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOCKS_DIR = join(__dirname, "..", "src", "blocks");

// Minimal frontmatter parser — good enough for our simple "key: value"
// block.md files, no dependency needed.
function parseBlockMd(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("block.md missing frontmatter");
  const [, frontmatter, body] = match;
  const meta = {};
  for (const line of frontmatter.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key) meta[key.trim()] = rest.join(":").trim();
  }
  return { ...meta, description: body.trim() };
}

// Returns an array like:
// [{ id, name, component, description, folder }]
export function loadCatalog() {
  return readdirSync(BLOCKS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const folder = entry.name;
      const raw = readFileSync(join(BLOCKS_DIR, folder, "block.md"), "utf-8");
      return { ...parseBlockMd(raw), folder };
    });
}

// A compact text version of the catalog for the LLM prompt — keep this
// tight, the full block.md files would bloat the context for no benefit.
export function catalogAsPromptText(catalog) {
  return catalog
    .map(
      (b) =>
        `- id: "${b.id}" (component: ${b.component})\n  ${b.description
          .split("\n")
          .filter((l) => l.trim())
          .join(" ")
          .slice(0, 400)}`
    )
    .join("\n\n");
}
