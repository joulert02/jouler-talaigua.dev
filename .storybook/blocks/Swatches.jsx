import { useTokens } from "./useTokens.js";

/** @param {{ tokens: string[] }} props */
export function Swatches({ tokens }) {
  const [ref, values] = useTokens(tokens);
  return (
    <div ref={ref} className="sb-swatches sb-unstyled">
      {tokens.map((token) => (
        <div key={token} className="sb-swatch">
          <span className="sb-swatch__chip" style={{ background: `var(${token})` }} />
          <code>{token}</code>
          <span className="sb-muted">{values[token]}</span>
        </div>
      ))}
    </div>
  );
}
