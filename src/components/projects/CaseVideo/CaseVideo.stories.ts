import preview from "../../../../.storybook/preview";
import CaseVideo from "./CaseVideo.astro";
import { withLocale } from "../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/CaseVideo",
  component: CaseVideo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A portrait video for a case intro (v11 Pragma reel): a 3:4 plate over a blurred copy of the poster, one Play button at rest and native controls once it plays. Give it the files (H.264 MP4 last as the fallback), WebVTT tracks in both languages (the page's language is on by default) and the duration, which the Play button shows and reads. Files live in `public/video/`; Storybook does not serve `public/`, so locally the player stays empty.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    sources: [{ src: "/video/pragma-reel.mp4", type: "video/mp4" }],
    poster: "/video/pragma-reel-poster.jpg",
    tracks: [
      { src: "/video/pragma-reel.en.vtt", srclang: "en", label: "English", kind: "subtitles" },
      { src: "/video/pragma-reel.es.vtt", srclang: "es", label: "Español", kind: "captions" },
    ],
    caption: "A video PRAGMA made for me",
    duration: 44,
    width: 540,
    height: 960,
    link: { href: "https://www.instagram.com/reel/C2QiirxRWHl/", label: "Watch on Instagram" },
  },
  parameters: {
    docs: { description: { story: "Press Play: the button leaves and the native controls take over." } },
  },
});
