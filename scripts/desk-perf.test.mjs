// Guards the phone desk's frame rate (HU-13). A camera move must only change the layer's translate, which the
// compositor applies without touching styles. The dot grid used to live on the viewport and follow the camera through
// --desk-camera-x/y: each write restyled the desk (every element on it while those were inherited) and repainted the
// grid, and JOTA Pet's pointermove read then forced that restyle in the middle of the move.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const camera = read("../src/components/ui/Desk/camera.ts");
const desk = read("../src/components/ui/Desk/Desk.astro");

test("a camera move writes no custom property", () => {
  assert.doesNotMatch(camera, /setProperty\(/);
});

test("the dot grid rides the world, not the viewport", () => {
  const viewport = desk.match(/\n {2}\.desk__viewport \{([^}]*)\}/)?.[1] ?? "";
  assert.doesNotMatch(viewport, /background-image/);
  const grid = desk.match(/\.desk__world::before \{([^}]*)\}/)?.[1] ?? "";
  assert.match(grid, /background-image: radial-gradient/);
});
