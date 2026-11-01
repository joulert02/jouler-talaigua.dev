// Theme the visitor sees: the saved or applied choice, else the OS preference (as tokens.css does).

/** Theme names, as tokens.css reads them from `data-theme`. */
export const THEMES = /** @type {const} */ ({ light: "light", dark: "dark" });

/**
 * @param {string | undefined} current value of `data-theme` on the root, if any
 * @param {boolean} prefersDark whether `(prefers-color-scheme: dark)` matches
 * @returns {"light" | "dark"}
 */
export function effectiveTheme(current, prefersDark) {
  if (current === THEMES.light || current === THEMES.dark) return current;
  return prefersDark ? THEMES.dark : THEMES.light;
}

/**
 * @param {string | undefined} current
 * @param {boolean} prefersDark
 * @returns {"light" | "dark"}
 */
export function nextTheme(current, prefersDark) {
  return effectiveTheme(current, prefersDark) === THEMES.dark ? THEMES.light : THEMES.dark;
}
