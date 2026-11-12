// Option 1: HOC. NOT RUN: no dependencies on the runner, so `astro check` and Storybook have not seen this file.
// Astro has no public API for wrapping a component. `createComponent` and the factory signature
// `(result, props, slots)` are runtime internals, and the wrapper's props type has to be cast back by hand.
import { createComponent } from "astro/runtime/server/index.js";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { getLang, type UiKey } from "../../../../i18n/ui";
import { labelsFor } from "./labels";

export function withLabels<Props extends { labels: Record<string, string> }>(
  Component: AstroComponentFactory,
  keys: Record<keyof Props["labels"] & string, UiKey>,
) {
  const Wrapped = createComponent((result: any, props: Omit<Props, "labels">, slots: unknown) => {
    // SSRResult carries the two values getLang(Astro) reads.
    const lang = getLang({ locals: result.locals, currentLocale: result.currentLocale });
    return Component(result, { ...props, labels: labelsFor(lang, keys) }, slots as never);
  });
  // The cast is the cost: without it `astro check` sees an untyped factory.
  return Wrapped as unknown as AstroComponentFactory & ((props: Omit<Props, "labels">) => unknown);
}
