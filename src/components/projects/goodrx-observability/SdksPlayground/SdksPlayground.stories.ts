import preview from "../../../../../.storybook/preview";
import SdksPlayground from "./SdksPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/GoodRxObservability/SdksPlayground",
  component: SdksPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 03 of the GoodRx case: the same user action captured by both SDKs side by side, then the release promoted from local to production. Send a few events, then press Promote until it is certified. Illustrative, not GoodRx data. Copy in `sdks.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
