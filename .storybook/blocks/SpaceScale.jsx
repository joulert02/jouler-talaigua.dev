import { useTokens } from "./useTokens.js";

/** @param {{ tokens: string[] }} props */
export function SpaceScale({ tokens }) {
  const [ref, values] = useTokens(tokens);
  return (
    <div ref={ref} className="sb-stack">
      {tokens.map((token) => (
        <div key={token} className="sb-row">
          <div className="sb-row__meta">
            <code>{token}</code>
            <span className="sb-muted">{values[token]}</span>
          </div>
          <span className="sb-space-bar" style={{ width: `var(${token})` }} />
        </div>
      ))}
    </div>
  );
}
