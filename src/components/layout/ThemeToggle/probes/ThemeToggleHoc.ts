// Option 1 usage: one line per component, plus the shared withLabels factory.
import ThemeTogglePure from "./ThemeTogglePure.astro";
import { withLabels } from "./withLabels";
import { themeToggleKeys, type ThemeToggleLabels } from "./labels";

export default withLabels<{ labels: ThemeToggleLabels }>(ThemeTogglePure, themeToggleKeys);
