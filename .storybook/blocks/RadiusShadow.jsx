import { useTokens } from "./useTokens.js";

/** @param {{ radii: string[], shadows: string[] }} props */
export function RadiusShadow({ radii, shadows }) {
  const [ref, values] = useTokens([...radii, ...shadows]);
  const tile = (token, style) => (
    <figure key={token} className="sb-tile">
      <span className="sb-tile__shape" style={style} />
      <figcaption>
        <code>{token}</code>
        <span className="sb-muted">{token.startsWith("--radius") ? values[token] : null}</span>
      </figcaption>
    </figure>
  );
  return (
    <div ref={ref} className="sb-stack sb-unstyled">
      <div className="sb-tiles">{radii.map((t) => tile(t, { borderRadius: `var(${t})` }))}</div>
      <div className="sb-tiles">
        {shadows.map((t) => tile(t, { boxShadow: `var(${t})`, borderRadius: "var(--radius-lg)" }))}
      </div>
    </div>
  );
}
