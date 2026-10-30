// Fails when draft placeholders remain in content or in the Storybook design docs. Strict only on production
// builds (Cloudflare Pages production branch, Vercel production) or with --strict, so drafts can live on
// branches and previews while real facts are being filled in.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const MARKER = "TODO(verify)";
const PRODUCTION_BRANCH = "main"; // docs/adr/001-stack.md
export const ROOTS = ["src/content/", ".storybook/docs/"];

/**
 * @param {Record<string, string | undefined>} env
 * @param {string[]} argv
 */
export function isStrict(env, argv) {
  return (
    argv.includes("--strict") ||
    env.VERCEL_ENV === "production" ||
    (env.CF_PAGES === "1" && env.CF_PAGES_BRANCH === PRODUCTION_BRANCH)
  );
}

/**
 * Line numbers (1-based) holding a marker. A marker inside inline code (`TODO(verify)`) is a mention.
 * @param {string} text
 */
export function markerLines(text) {
  return text
    .split("\n")
    .flatMap((line, i) => (line.replaceAll(`\`${MARKER}\``, "").includes(MARKER) ? [i + 1] : []));
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.mdx?$/.test(entry.name)) yield path;
  }
}

async function main() {
  const repo = fileURLToPath(new URL("../", import.meta.url));
  const hits = [];
  for (const root of ROOTS) {
    for await (const file of walk(join(repo, root))) {
      const lines = markerLines(await readFile(file, "utf8"));
      hits.push(...lines.map((n) => `${file.replace(repo, "")}:${n}`));
    }
  }

  if (hits.length) {
    console.log(`${hits.length} ${MARKER} placeholder(s) left:\n  ${hits.join("\n  ")}`);
    if (isStrict(process.env, process.argv)) process.exit(1);
  } else {
    console.log(`No ${MARKER} placeholders.`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
