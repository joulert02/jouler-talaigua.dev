import { useLayoutEffect, useRef, useState } from "react";

/**
 * Reads the computed value of each custom property from an element inside the block,
 * so a surrounding [data-theme] container decides which theme is read.
 * @param {string[]} tokens
 * @returns {[import("react").RefObject<HTMLDivElement | null>, Record<string, string>]}
 */
export function useTokens(tokens) {
  const ref = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [values, setValues] = useState(/** @type {Record<string, string>} */ ({}));
  const key = tokens.join(",");
  useLayoutEffect(() => {
    if (!ref.current) return;
    const style = getComputedStyle(ref.current);
    setValues(Object.fromEntries(key.split(",").map((t) => [t, style.getPropertyValue(t).trim()])));
  }, [key]);
  return [ref, values];
}
