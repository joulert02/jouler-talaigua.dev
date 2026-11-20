// Guards the Home's Tab order: card, then Dock, then the board's objects, then the footer.
import { test } from "node:test";
import assert from "node:assert/strict";
import { nextStop } from "../src/lib/tab-order.js";

// The Home's stops in document order: skip link, the desk's viewport around the card, the card's links, an object,
// then the Dock (moved before the footer) and the footer. The number is the group.
const page = [
  ["skip", 0],
  ["desk", 3],
  ["contact", 1],
  ["cv", 1],
  ["pole", 3],
  ["dock-home", 2],
  ["dock-work", 2],
  ["footer-work", 4],
];
const stops = page.map(([name]) => name);
const rank = (stop) => new Map(page).get(stop);
const tab = (from, backwards = false, after = () => false) => nextStop(stops, rank, from, backwards, after);

test("Tab walks card, Dock, board, footer", () => {
  const walk = ["skip"];
  for (let next = tab("skip"); next; next = tab(next)) walk.push(next);
  assert.deepEqual(walk, ["skip", "contact", "cv", "dock-home", "dock-work", "desk", "pole", "footer-work"]);
});

test("Shift+Tab walks it backwards and leaves at the start", () => {
  assert.equal(tab("desk", true), "dock-work");
  assert.equal(tab("dock-home", true), "cv");
  assert.equal(tab("footer-work", true), "pole");
  assert.equal(tab("skip", true), null);
});

test("past the last stop the browser takes over", () => {
  assert.equal(tab("footer-work"), null);
});

test("from <main>, focused by the skip link, Tab lands on the card", () => {
  const insideOrAfterMain = (stop) => stop !== "skip";
  assert.equal(tab("main", false, insideOrAfterMain), "contact");
  assert.equal(tab("main", true, insideOrAfterMain), "skip");
});
