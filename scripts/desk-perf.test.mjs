// Guards the phone desk's frame rate (HU-13). The camera writes --desk-camera-x/y on the viewport on every move. As
// inherited custom properties (the default), each write restyled every element on the desk, and JOTA Pet's
// pointermove read then forced that restyle in the middle of the move: about 30 ms per move on a phone's CPU.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const desk = readFileSync(new URL("../src/components/ui/Desk/Desk.astro", import.meta.url), "utf8");

for (const name of ["--desk-camera-x", "--desk-camera-y"]) {
  test(`${name} is registered as not inherited`, () => {
    const rule = desk.match(new RegExp(`@property ${name} \\{([^}]*)\\}`))?.[1] ?? "";
    assert.match(rule, /inherits:\s*false/);
  });
}
