import { useEffect, useState } from "react";
import { useTokens } from "./useTokens.js";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Moves a dot per duration (with the first easing) and per easing (with the middle duration). @param {{ durations: string[], easings: string[] }} props */
export function MotionDemo({ durations, easings }) {
  const [ref, values] = useTokens([...durations, ...easings]);
  const [moved, setMoved] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia(QUERY);
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const middle = durations[Math.floor(durations.length / 2)];
  const rows = [
    ...durations.map((d) => ({ token: d, duration: d, easing: easings[0] })),
    ...easings.map((e) => ({ token: e, duration: middle, easing: e })),
  ];
  return (
    <div ref={ref} className="sb-stack">
      {reduced ? (
        <p className="sb-muted">Reduced motion is on, so the demo shows the values without animating.</p>
      ) : (
        <button type="button" className="sb-button" onClick={() => setMoved((m) => !m)}>
          {moved ? "Move back" : "Play"}
        </button>
      )}
      {rows.map(({ token, duration, easing }) => (
        <div key={token} className="sb-row">
          <div className="sb-row__meta">
            <code>{token}</code>
            <span className="sb-muted">{values[token]}</span>
          </div>
          <div className="sb-track">
            <span
              className="sb-dot"
              style={{
                transform: moved && !reduced ? "translateX(calc(100% * 10))" : "none",
                transition: reduced ? "none" : `transform var(${duration}) var(${easing})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
