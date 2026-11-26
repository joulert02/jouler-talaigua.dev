// HU-11 acceptance, run on the build: every published page has its metadata and a share image that exists, and the
// sitemap lists exactly the published pages (no noindex page, nothing missing). Storybook (/storybook/) is not a page
// of the site: public/_headers keeps it out of indexes.
import { existsSync, globSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const attr = (html, pattern) => html.match(pattern)?.[1];
const meta = (html, key) =>
  attr(html, new RegExp(`<meta (?:name|property)="${key.replace(/[:.]/g, "\\$&")}" content="([^"]*)"`));

/** The page URL a built HTML file answers at; null for files that are not a route (404.html copies). */
function pageUrl(dir, file, site) {
  const path = relative(dir, file).replaceAll("\\", "/");
  if (!path.endsWith("index.html")) return null;
  return new URL(path.slice(0, -"index.html".length), site).href;
}

/** Returns the list of problems found in a built site at `dir`. */
export function auditSeo(dir, site) {
  const problems = [];
  const sitemapUrls = new Set(
    globSync("sitemap-*.xml", { cwd: dir })
      .filter((file) => file !== "sitemap-index.xml")
      .flatMap((file) =>
        [...readFileSync(join(dir, file), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
      ),
  );
  const published = new Set();
  for (const file of globSync("**/*.html", { cwd: dir, exclude: ["storybook/**"] }).map((f) =>
    join(dir, f),
  )) {
    const html = readFileSync(file, "utf8");
    const where = relative(dir, file);
    const url = pageUrl(dir, file, site);
    const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
    if (!attr(html, /<title>([^<]+)<\/title>/)) problems.push(`${where}: no <title>`);
    if (!meta(html, "description")) problems.push(`${where}: no description`);
    for (const key of ["og:title", "og:description", "og:image", "og:image:alt", "twitter:card"]) {
      if (!meta(html, key)) problems.push(`${where}: no ${key}`);
    }
    const image = meta(html, "og:image");
    if (image && !existsSync(join(dir, new URL(image).pathname)))
      problems.push(`${where}: missing image ${image}`);
    if (noindex || !url) continue;
    published.add(url);
    const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
    if (canonical !== url) problems.push(`${where}: canonical ${canonical} is not ${url}`);
    if (meta(html, "og:url") !== url) problems.push(`${where}: og:url is not ${url}`);
    for (const lang of ["en", "es", "x-default"]) {
      if (!new RegExp(`<link rel="alternate" hreflang="${lang}" href="https://`).test(html)) {
        problems.push(`${where}: no hreflang ${lang}`);
      }
    }
    if (!sitemapUrls.has(url)) problems.push(`${where}: published but not in the sitemap`);
  }
  for (const url of sitemapUrls) {
    if (!published.has(url)) problems.push(`sitemap: ${url} is not a published page`);
  }
  return problems;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const problems = auditSeo(
    fileURLToPath(new URL("../dist/", import.meta.url)),
    "https://jouler-talaigua.dev",
  );
  if (problems.length) {
    console.error(`SEO check failed:\n- ${problems.join("\n- ")}`);
    process.exit(1);
  }
  console.log("SEO check passed.");
}
