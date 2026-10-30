// Guards the theme toggle when no theme is saved and the OS decides the theme.
import { test } from "node:test";
import assert from "node:assert/strict";
import { effectiveTheme, nextTheme } from "../src/lib/theme.js";

test("effective theme follows the OS when nothing is saved", () => {
  assert.equal(effectiveTheme(undefined, true), "dark");
  assert.equal(effectiveTheme(undefined, false), "light");
  assert.equal(effectiveTheme("light", true), "light");
});

test("first click always changes the visible theme", () => {
  assert.equal(nextTheme(undefined, true), "light");
  assert.equal(nextTheme(undefined, false), "dark");
  assert.equal(nextTheme("dark", false), "light");
});
