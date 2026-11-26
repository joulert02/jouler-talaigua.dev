// Guards the HU-11 build check: what counts as a published page, and what it must carry.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { auditSeo } from "./check-seo.mjs";

const SITE = "https://example.dev";
const head = (path, extra = "") => `<html><head><title>T</title><meta name="description" content="D">
<meta property="og:title" content="T"><meta property="og:description" content="D">
<meta property="og:image" content="${SITE}/og/home.png"><meta property="og:image:alt" content="T">
<meta name="twitter:card" content="summary_large_image">${extra}</head></html>`;
const indexable = (path) =>
  head(
    path,
    `<link rel="canonical" href="${SITE}${path}"><meta property="og:url" content="${SITE}${path}">` +
      ["en", "es", "x-default"].map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/">`).join(""),
  );

function site(files) {
  const dir = mkdtempSync(join(tmpdir(), "seo-"));
  for (const [path, body] of Object.entries({ "og/home.png": "", ...files })) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), body);
  }
  return dir;
}
const sitemap = (...paths) => paths.map((p) => `<url><loc>${SITE}${p}</loc></url>`).join("");

test("a complete site passes", () => {
  const dir = site({
    "index.html": indexable("/"),
    "soon/index.html": head("/soon/", '<meta name="robots" content="noindex">'),
    "sitemap-0.xml": sitemap("/"),
  });
  assert.deepEqual(auditSeo(dir, SITE), []);
});

test("a noindex page in the sitemap and a published page out of it both fail", () => {
  const dir = site({
    "index.html": indexable("/"),
    "soon/index.html": head("/soon/", '<meta name="robots" content="noindex">'),
    "sitemap-0.xml": sitemap("/soon/"),
  });
  const problems = auditSeo(dir, SITE);
  assert.ok(problems.some((p) => p.includes("published but not in the sitemap")));
  assert.ok(problems.some((p) => p.includes("/soon/ is not a published page")));
});

test("a share image that was not built fails", () => {
  const dir = site({
    "index.html": indexable("/").replace("og/home.png", "og/missing.png"),
    "sitemap-0.xml": sitemap("/"),
  });
  assert.ok(auditSeo(dir, SITE).some((p) => p.includes("missing image")));
});
