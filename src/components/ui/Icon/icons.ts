// One file per icon in ./svg: a 20×20 viewBox drawn with strokes; Icon.astro sets the stroke and the size.
// To add one: drop the .svg in ./svg, import it here and add it to the map.
import home from "./svg/home.svg";
import work from "./svg/work.svg";
import notes from "./svg/notes.svg";
import roadmap from "./svg/roadmap.svg";
import email from "./svg/email.svg";
import theme from "./svg/theme.svg";
import settings from "./svg/settings.svg";

export const icons = { home, work, notes, roadmap, email, theme, settings };
export type IconName = keyof typeof icons;
