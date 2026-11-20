// Composition stories (see source.js): the meta sets `component: Example` (.storybook/Example.astro, written out
// because Storybook's index reads it statically) and each story names its example file in `args.example`.
// `exampleMeta(Component)` documents the real component's props, without live controls since the example file is
// fixed, and hides the `example` arg.
import { extractArgTypes } from "@storybook-astro/renderer/extractArgTypes";

/**
 * @param {unknown} component the component the stories document
 * @param {{ args?: object, argTypes?: object }} [extra] other meta args, e.g. withLocale, merged in
 */
export function exampleMeta(component, extra = {}) {
  const argTypes = Object.fromEntries(
    Object.entries(extractArgTypes(component) ?? {}).map(([name, argType]) => [
      name,
      { ...argType, control: false },
    ]),
  );
  return {
    args: { ...extra.args },
    // Example.astro's own props: `example` is internal, and `locale` shows only with the language control (withLocale).
    argTypes: {
      locale: { table: { disable: true } },
      ...argTypes,
      ...extra.argTypes,
      example: { table: { disable: true } },
    },
  };
}
