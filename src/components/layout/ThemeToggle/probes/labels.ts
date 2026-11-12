import { useTranslations, type Lang, type UiKey } from "../../../../i18n/ui";

export interface ThemeToggleLabels {
  /** `aria-label` of the button. */
  label: string;
  /** Tooltip shown on hover and focus. */
  tooltip: string;
}

/**
 * Option 3 helper: maps each field of a `labels` object to a UiKey and resolves it in `lang`. The result is typed by
 * the keys object, so it is checked against the pure component's `labels` type at the call site.
 * A container calls it once per page language.
 */
export function labelsFor<K extends Record<string, UiKey>>(lang: Lang, keys: K): { [F in keyof K]: string } {
  const t = useTranslations(lang);
  return Object.fromEntries(Object.entries(keys).map(([field, key]) => [field, t(key)])) as {
    [F in keyof K]: string;
  };
}

export const themeToggleKeys = {
  label: "dock.themeLabel",
  tooltip: "dock.themeTooltip",
} as const satisfies Record<keyof ThemeToggleLabels, UiKey>;
