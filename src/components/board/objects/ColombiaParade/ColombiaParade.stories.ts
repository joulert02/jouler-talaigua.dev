import preview from "../../../../../.storybook/preview";
import ColombiaParade from "./ColombiaParade.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/ColombiaParade",
  component: ColombiaParade,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "760px" },
      description: {
        component:
          "A strip of Colombia's flag taped to the desk. It is a toggle (`aria-pressed`): pressing it unrolls the flag into a 1000px street and a parade of drawn, jointed characters walks by above it for about a minute, with a slow skyline behind: the silleteros of Medellín's Feria de las Flores, salsa at the Feria de Cali, the Carnaval de Barranquilla and the Sierra Nevada de Santa Marta. The five `scenes` names are painted on the banners and announced under the flag as each passes. The sound button (`sound.off`, `sound.on`) is off until the visitor turns it on; each scene has its own original loop, synthesised in the browser with no recordings. Pressing the flag again, or the end of the parade, rolls it back. The parade opens 320px above the flag: leave that room free. Reduced motion lets it pass without dancing or confetti.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Start the Colombia parade",
    scenes: [
      "Feria de las Flores · Medellín",
      "Feria de Cali",
      "Carnaval de Barranquilla",
      "Sierra Nevada de Santa Marta",
      "Amo a mi Colombia",
    ],
    sound: { off: "Sound off", on: "Sound on" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Press the flag to start the parade, turn the sound on under it, and press the flag again to stop.",
      },
    },
  },
});
