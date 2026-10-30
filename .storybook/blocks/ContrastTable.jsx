import { contrastRatio } from "./contrast.js";
import { useTokens } from "./useTokens.js";

/** WCAG 2.x contrast of each text/background pair in the current theme. @param {{ pairs: [string, string][] }} props */
export function ContrastTable({ pairs }) {
  const [ref, values] = useTokens([...new Set(pairs.flat())]);
  return (
    <div ref={ref} className="sb-unstyled">
      <table className="sb-table">
        <thead>
          <tr>
            <th scope="col">Sample</th>
            <th scope="col">Text on background</th>
            <th scope="col">Ratio</th>
            <th scope="col">AA (4.5:1)</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(([fg, bg]) => {
            const ratio = values[fg] && values[bg] ? contrastRatio(values[fg], values[bg]) : null;
            return (
              <tr key={`${fg}/${bg}`}>
                <td>
                  <span
                    className="sb-contrast-sample"
                    style={{ color: `var(${fg})`, background: `var(${bg})` }}
                  >
                    Aa
                  </span>
                </td>
                <td>
                  <code>{fg}</code> on <code>{bg}</code>
                </td>
                <td>{ratio ? `${ratio.toFixed(1)}:1` : "…"}</td>
                <td>{ratio ? (ratio >= 4.5 ? "Passes" : "Fails") : "…"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
