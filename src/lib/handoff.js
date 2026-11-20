// Way back from a page to the Home (HU-02). Every page sits "below" the Home: the Home opens it with a slide, as if it
// scrolled down to it (v11), and scrolling up past the page's top goes back, with the slide in reverse.

/** A pause longer than this, in ms, ends a wheel gesture: trackpad inertia keeps firing events closer together. */
export const GESTURE_GAP = 200;

/** Upward wheel travel, in px, that a gesture started at the top needs before it goes back (a mouse notch is ~100). */
export const RETURN_DISTANCE = 60;

/**
 * @typedef {object} Gesture
 * @property {number} last time of the gesture's latest wheel event, in ms
 * @property {boolean} fromTop whether the gesture started with the page at its top
 * @property {number} travel upward travel, in px, gathered at the top
 */

/**
 * Follows one wheel event. Only a gesture that starts at the top counts, so the inertia of a scroll that reached the
 * top cannot go back on its own: the visitor stops, then scrolls up again.
 * @param {Gesture | null} gesture the state the previous event returned, or null
 * @param {{ time: number, deltaY: number, atTop: boolean }} wheel the event's time (ms), vertical travel in px
 *   (negative is up) and whether the page sits at its top
 * @returns {{ gesture: Gesture, back: boolean }}
 */
export function followWheel(gesture, { time, deltaY, atTop }) {
  const fresh = !gesture || time - gesture.last > GESTURE_GAP;
  const next = fresh ? { last: time, fromTop: atTop, travel: 0 } : { ...gesture, last: time };
  if (deltaY > 0) next.travel = 0;
  else if (next.fromTop && atTop) next.travel -= deltaY;
  return { gesture: next, back: next.fromTop && next.travel >= RETURN_DISTANCE };
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
