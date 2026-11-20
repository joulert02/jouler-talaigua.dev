// "Show code" for every story, generated, never hand-written:
// - a story that renders its component gets the snippet from storybook-astro's own generator, built from the args, so
//   it follows the Controls (CSF-factory previews never load that generator, so it is registered here);
// - a composition story (components inside slots, which that generator cannot print) renders an example file through
//   .storybook/Example.astro (`args.example`, see example.js) and shows that same file.
// scripts/stories-source.test.mjs keeps every story on one of the two paths.
import { decorators } from "@storybook-astro/renderer/entry-preview-docs";
import { emitTransformCode, useEffect } from "storybook/preview-api";

const [generatedSource] = decorators;
const examples = import.meta.glob("../src/components/**/examples/*.astro", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const astroSource = (storyFn, context) => {
  const example = context.args.example;
  if (typeof example === "string") {
    const code = examples[`../src/components/${example}`];
    useEffect(() => {
      if (typeof code === "string") emitTransformCode(code, context);
    });
    return storyFn();
  }
  // `locale` is a story control (withLocale), not a prop: the page sets the language.
  const args = { ...context.args };
  delete args.locale;
  return generatedSource(storyFn, { ...context, args });
};
