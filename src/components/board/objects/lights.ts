// The desk's lights, announced on the window: the lamp dispatches the event and anything on the desk can react
// (Naruto falls asleep) without knowing the lamp.
export const LIGHTS_EVENT = "desk:lights";
export interface LightsDetail {
  /** True when the lights are on (light theme). */
  on: boolean;
}
