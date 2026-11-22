import preview from "../../../../../.storybook/preview";
import PrivacyPlayground from "./PrivacyPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/GoodRxObservability/PrivacyPlayground",
  component: PrivacyPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 04 of the GoodRx case: the SDK's three switches and what each captures. Turn session recording off, by hand or with “Configure it like we did”, and the verdict changes from not allowed to within GoodRx's policies. Copy in `privacy.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
