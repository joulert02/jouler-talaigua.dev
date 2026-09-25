// Fails when draft placeholders remain in content. Runs in production builds only,
// so drafts can live on branches and previews while real facts are being filled in.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const MARKER = "TODO(verify)";
const root = new URL("../src/content/", import.meta.url).pathname;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.mdx?$/.test(entry.name)) yield path;
  }
}

const hits = [];
for await (const file of walk(root)) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach(
    (line, i) => line.includes(MARKER) && hits.push(`${file.replace(root, "src/content/")}:${i + 1}`),
  );
}

if (hits.length) {
  console.log(`${hits.length} ${MARKER} placeholder(s) left:\n  ${hits.join("\n  ")}`);
  if (process.env.VERCEL_ENV === "production" || process.argv.includes("--strict")) process.exit(1);
} else {
  console.log(`No ${MARKER} placeholders.`);
}
