// Theme the visitor sees: the saved or applied choice, else the OS preference (as tokens.css does).

/**
 * @param {string | undefined} current value of `data-theme` on the root, if any
 * @param {boolean} prefersDark whether `(prefers-color-scheme: dark)` matches
 * @returns {"light" | "dark"}
 */
export function effectiveTheme(current, prefersDark) {
  if (current === "light" || current === "dark") return current;
  return prefersDark ? "dark" : "light";
}

/**
 * @param {string | undefined} current
 * @param {boolean} prefersDark
 * @returns {"light" | "dark"}
 */
export function nextTheme(current, prefersDark) {
  return effectiveTheme(current, prefersDark) === "dark" ? "light" : "dark";
}
