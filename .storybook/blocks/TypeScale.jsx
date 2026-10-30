import { useTokens } from "./useTokens.js";

/** @param {{ tokens: string[], family: string, sample?: string }} props */
export function TypeScale({ tokens, family, sample = "Calm surface, curious depth" }) {
  const [ref, values] = useTokens(tokens);
  return (
    <div ref={ref} className="sb-stack sb-unstyled">
      {tokens.map((token) => (
        <div key={token} className="sb-row">
          <div className="sb-row__meta">
            <code>{token}</code>
            <span className="sb-muted">{values[token]}</span>
          </div>
          <p style={{ fontFamily: `var(${family})`, fontSize: `var(${token})`, margin: 0, lineHeight: 1.3 }}>
            {sample}
          </p>
        </div>
      ))}
    </div>
  );
}
