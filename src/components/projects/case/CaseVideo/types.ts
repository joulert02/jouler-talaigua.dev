export interface VideoSource {
  /** URL of the file, e.g. "/video/pragma-reel.mp4". */
  src: string;
  /** MIME type with codecs when it matters, e.g. 'video/mp4; codecs="av01.0.05M.08"'. */
  type: string;
}

export interface VideoTrack {
  /** URL of the WebVTT file. */
  src: string;
  /** Language of the text ("en", "es"). */
  srclang: string;
  /** Name in the player's menu ("English"). */
  label: string;
  /** `captions` for the spoken language (they can carry sounds), `subtitles` for a translation. */
  kind?: "captions" | "subtitles";
}
