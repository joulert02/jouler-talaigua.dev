// Way back from a page to the Home (HU-02). Every page sits "below" the Home: the Home opens it with a slide, as if it
// scrolled down to it (v11), and scrolling up past the page's top goes back, with the slide in reverse.

/** A pause longer than this, in ms, ends a wheel gesture: trackpad inertia keeps firing events closer together. */
export const GESTURE_GAP = 200;

/**
 * Wheel travel, in px, that a pull needs before it hands off (about four mouse notches, or a deliberate trackpad
 * swipe): the resistance that keeps a scroll from changing page by accident. Used both ways: up past a page's top
 * back to the Home, and down past the Home desk's bottom edge to Work (ui/Desk/camera.ts).
 */
export const HANDOFF_DISTANCE = 400;

/** A pull survives pauses up to this long, in ms (slow mouse notches); a longer one empties it. */
export const PULL_HOLD = 700;

/**
 * @typedef {object} Gesture
 * @property {number} last time of the gesture's latest wheel event, in ms
 * @property {boolean} fromTop whether the gesture started with the page at its top
 * @property {number} travel upward travel, in px, gathered at the top
 */

/**
 * Follows one wheel event. Only a gesture that starts at the top counts, so the inertia of a scroll that reached the
 * top cannot pull on its own: the visitor stops, then scrolls up again. A new gesture at the top within PULL_HOLD of
 * a pull keeps its travel, so slow notches add up; scrolling down empties it.
 * @param {Gesture | null} gesture the state the previous event returned, or null
 * @param {{ time: number, deltaY: number, atTop: boolean }} wheel the event's time (ms), vertical travel in px
 *   (negative is up) and whether the page sits at its top
 * @returns {{ gesture: Gesture, progress: number, back: boolean }} progress of the pull, 0 to 1; back once it is full
 */
export function followWheel(gesture, { time, deltaY, atTop }) {
  const fresh = !gesture || time - gesture.last > GESTURE_GAP;
  const held = gesture && atTop && gesture.fromTop && gesture.travel > 0 && time - gesture.last <= PULL_HOLD;
  const next = fresh
    ? { last: time, fromTop: atTop, travel: held ? gesture.travel : 0 }
    : { ...gesture, last: time };
  if (deltaY > 0) next.travel = 0;
  else if (next.fromTop && atTop) next.travel -= deltaY;
  const progress = Math.min(next.travel / HANDOFF_DISTANCE, 1);
  return { gesture: next, progress, back: progress >= 1 };
}

/**
 * Whether scrolling up past the top of the current page goes back to the Home: the page was opened from the Home (the
 * previous history entry is a Home) and slides from it. The Home itself, and the pages the identity card morphs into
 * ("More about me"), scroll as usual.
 * @param {{ previous: string | undefined, current: string, homePaths: string[], morphPaths: string[] }} paths
 *   pathnames of the previous and current history entries, of the Home in every language and of the morph pages
 */
export function returnsToHome({ previous, current, homePaths, morphPaths }) {
  return (
    previous !== undefined &&
    homePaths.includes(previous) &&
    !homePaths.includes(current) &&
    !morphPaths.includes(current)
  );
}
