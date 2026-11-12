/**
 * Story args keep the real config shape, but every `href` becomes "#", so a link in a story never leaves Storybook.
 * StoryRoot also blocks navigation; this makes the intent visible in the controls too.
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function storyLinks(value) {
  if (Array.isArray(value)) return /** @type {T} */ (value.map(storyLinks));
  if (value && typeof value === "object") {
    return /** @type {T} */ (
      Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [key, key === "href" ? "#" : storyLinks(entry)]),
      )
    );
  }
  return value;
}
