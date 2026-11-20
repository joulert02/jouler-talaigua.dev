// Guards the way back from a page to the Home: a deliberate scroll up at the top goes back; inertia does not.
import { test } from "node:test";
import assert from "node:assert/strict";
import { followWheel, GESTURE_GAP, RETURN_DISTANCE, returnsToHome } from "../src/lib/handoff.js";

/** Plays wheel events through followWheel and says whether any of them went back. */
function play(events) {
  let gesture = null;
  let back = false;
  for (const wheel of events) {
    const result = followWheel(gesture, wheel);
    gesture = result.gesture;
    back ||= result.back;
  }
  return back;
}

test("one mouse notch up at the top goes back", () => {
  assert.equal(play([{ time: 0, deltaY: -100, atTop: true }]), true);
});

test("a small nudge up at the top does not", () => {
  assert.equal(play([{ time: 0, deltaY: -(RETURN_DISTANCE - 1), atTop: true }]), false);
});

test("a trackpad swipe up at the top goes back once its travel adds up", () => {
  const swipe = Array.from({ length: 10 }, (_, i) => ({ time: i * 16, deltaY: -8, atTop: true }));
  assert.equal(play(swipe), true);
});

test("the inertia of a scroll that reached the top does not go back", () => {
  const scroll = [
    { time: 0, deltaY: -40, atTop: false },
    { time: 16, deltaY: -30, atTop: false },
    // The page is at the top now; inertia keeps coming without a pause.
    ...Array.from({ length: 20 }, (_, i) => ({ time: 32 + i * 16, deltaY: -12, atTop: true })),
  ];
  assert.equal(play(scroll), false);
});

test("after a pause, scrolling up again at the top goes back", () => {
  const scroll = [
    { time: 0, deltaY: -40, atTop: false },
    { time: 16, deltaY: -30, atTop: true },
    { time: 16 + GESTURE_GAP + 1, deltaY: -100, atTop: true },
  ];
  assert.equal(play(scroll), true);
});

test("scrolling down resets the upward travel", () => {
  const scroll = [
    { time: 0, deltaY: -40, atTop: true },
    { time: 16, deltaY: 10, atTop: true },
    { time: 32, deltaY: -40, atTop: true },
  ];
  assert.equal(play(scroll), false);
});

const site = { homePaths: ["/", "/es/"], morphPaths: ["/more-about-me/", "/es/more-about-me/"] };

test("a page opened from the Home goes back to it, in either language", () => {
  assert.equal(returnsToHome({ ...site, previous: "/", current: "/work/" }), true);
  assert.equal(returnsToHome({ ...site, previous: "/es/", current: "/es/notes/" }), true);
});

test("a page opened from another page, or as the first page, scrolls as usual", () => {
  assert.equal(returnsToHome({ ...site, previous: "/work/", current: "/notes/" }), false);
  assert.equal(returnsToHome({ ...site, previous: undefined, current: "/notes/" }), false);
});

test("the Home and More about me scroll as usual", () => {
  assert.equal(returnsToHome({ ...site, previous: "/", current: "/es/" }), false);
  assert.equal(returnsToHome({ ...site, previous: "/", current: "/more-about-me/" }), false);
});
