import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import CvDownloadButton from "./CvDownloadButton.astro";
import { cvLink } from "../../../config/profile";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Profile/CvDownloadButton",
  component: CvDownloadButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Downloads the CV PDF for the page's language without leaving the site. It reuses the ghost `Button` styles (`ui/Button/Button.css`), so it inherits any change to the Button; it is its own component because only the CV downloads a file. The link comes from `cvLink` in `src/config/profile.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { data: cvLink },
  parameters: {
    docs: { description: { story: "Switch `locale` to check the label and the PDF for each language." } },
  },
});
