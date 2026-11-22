import preview from "../../../../../.storybook/preview";
import CloudFigure from "./CloudFigure.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/GoodRxObservability/CloudFigure",
  component: CloudFigure,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 02 of the GoodRx case: a still before/after of where the observability data lives, Datadog's storage or GoodRx's own cloud with groundcover (Bring Your Own Cloud). No interaction; resize to see it stack on phones. Copy in `cloud.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
