/** Renders its children once per theme, side by side. @param {{ children: import("react").ReactNode }} props */
export function ThemePair({ children }) {
  return (
    <div className="sb-theme-pair sb-unstyled">
      {["light", "dark"].map((theme) => (
        <div key={theme} data-theme={theme} className="sb-theme">
          <p className="sb-label">{theme === "light" ? "Light" : "Dark"}</p>
          {children}
        </div>
      ))}
    </div>
  );
}
