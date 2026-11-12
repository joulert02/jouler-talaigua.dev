declare namespace App {
  interface Locals {
    /** Language of the whole render; overrides the route's locale (Storybook sets it from its toolbar). */
    lang?: import("./i18n/ui").Lang;
  }
}
