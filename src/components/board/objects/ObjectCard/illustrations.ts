// One file per illustration in ./illustrations: a 40×40 drawing in currentColor with one accent detail.
// To add one: drop the .svg in ./illustrations, import it here and add it to the map.
import anime from "./illustrations/anime.svg";
import game from "./illustrations/game.svg";
import pole from "./illustrations/pole.svg";

export const illustrations = { anime, game, pole };
export type IllustrationName = keyof typeof illustrations;
