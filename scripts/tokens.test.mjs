// Guards src/styles/tokens.css: theme blocks stay complete and text pairs keep WCAG AA contrast.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { contrastRatio } from "../.storybook/blocks/contrast.js";

const css = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const round = (n) => Math.round(n * 10) / 10;

function block(pattern) {
  const match = css.match(pattern);
  assert.ok(match, `missing block ${pattern}`);
  return Object.fromEntries(
    [...match[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim().toLowerCase()]),
  );
}

const light = () => block(/:root,\s*\[data-theme="light"\]\s*\{([^}]*)\}/);
const mediaDark = () =>
  block(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)\s*\{([^}]*)\}/);
const forcedDark = () => block(/:root\[data-theme="dark"\],\s*\[data-theme="dark"\]\s*\{([^}]*)\}/);

test("contrastRatio follows WCAG 2.x", () => {
  assert.equal(round(contrastRatio("#000000", "#FFFFFF")), 21);
  assert.equal(round(contrastRatio("#FFFFFF", "#FFFFFF")), 1);
  assert.equal(round(contrastRatio("#FFF", "rgb(0 0 0)")), 21);
});

test("light block is also scoped to [data-theme=light]", () => {
  assert.ok(Object.keys(light()).length > 0);
});

test("dark blocks re-declare the same themed tokens", () => {
  const media = Object.keys(mediaDark()).sort();
  const forced = Object.keys(forcedDark()).sort();
  assert.deepEqual(media, forced);
  const lightNames = Object.keys(light());
  for (const name of media) assert.ok(lightNames.includes(name), `${name} has no light value`);
  for (const name of lightNames.filter((n) => n.startsWith("--color-") && !n.startsWith("--color-flag-")))
    assert.ok(media.includes(name), `${name} has no dark value`);
});

test("spec values", () => {
  const l = light();
  const d = forcedDark();
  assert.equal(l["--color-bg"], "#f6f7f9");
  assert.equal(l["--color-accent"], "#6e44f0");
  assert.equal(d["--color-text-muted"], "#9aa0a9");
  assert.equal(d["--color-on-accent"], "#141418");
  assert.equal(l["--font-size-body"], "17px");
  assert.equal(l["--line-height-body"], "1.7");
  assert.equal(l["--measure-prose"], "62ch");
  assert.equal(l["--space-1"], "4px");
  assert.equal(l["--space-10"], "64px");
  assert.equal(l["--radius-pill"], "999px");
  assert.equal(l["--radius-round"], "50%");
  assert.equal(l["--duration-fast"], "200ms");
  assert.equal(l["--layout-container"], "1240px");
});

test("text pairs pass AA and match the 2026-10-29 measurements", () => {
  const pairs = [
    ["--color-text", "--color-bg", 17.0, 16.1],
    ["--color-text-muted", "--color-bg", 5.8, 7.0],
    ["--color-text-accent", "--color-bg", 6.8, 6.8],
    ["--color-on-accent", "--color-accent", 5.6, 6.8],
    ["--color-text-muted", "--color-bg-subtle", 5.5, null],
  ];
  const l = light();
  const d = forcedDark();
  for (const [fg, bg, lightRatio, darkRatio] of pairs) {
    const lr = round(contrastRatio(l[fg], l[bg]));
    assert.ok(lr >= 4.5, `${fg}/${bg} light ${lr}`);
    assert.equal(lr, lightRatio, `${fg}/${bg} light`);
    if (darkRatio === null) continue;
    const dr = round(contrastRatio(d[fg], d[bg]));
    assert.ok(dr >= 4.5, `${fg}/${bg} dark ${dr}`);
    assert.equal(dr, darkRatio, `${fg}/${bg} dark`);
  }
});

test("no legacy token names in src/ or .storybook/", () => {
  const hits = [];
  for (const dir of ["../src/", "../.storybook/"]) {
    const root = new URL(dir, import.meta.url);
    for (const file of readdirSync(root, { recursive: true })) {
      if (!/\.(css|astro|ts|tsx|js|jsx|mdx)$/.test(file)) continue;
      readFileSync(new URL(file, root), "utf8")
        .split("\n")
        .forEach(
          (line, i) => /var\(--(fg|bg|muted|line)\)/.test(line) && hits.push(`${dir}${file}:${i + 1}`),
        );
    }
  }
  assert.deepEqual(hits, []);
});
