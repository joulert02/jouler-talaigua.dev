// Copy of the Home desk's objects (HU-02), in both languages. Board.astro places each object; this file only
// holds what the objects say. English comes from the sealed v11 design (docs/design/v11/app.js), except the ticket,
// which follows the Ticket story (Colombia to Valencia). Spanish reviewed by Jouler.

export const desk = {
  moto: {
    alt: {
      en: "Jouler in riding gear next to his motorbike on a wet mountain road",
      es: "Jouler con equipo de moto junto a su moto en una carretera de montaña mojada",
    },
    caption: { en: "Road trip · Colombia", es: "Viaje en moto · Colombia" },
  },
  teach: {
    alt: {
      en: "Jouler giving a talk in a university classroom",
      es: "Jouler dando una charla en un aula universitaria",
    },
    caption: { en: "Teaching · 2025", es: "Enseñando · 2025" },
  },
  portrait: {
    alt: {
      en: "Jouler smiling, framing the camera with his hands",
      es: "Jouler sonriendo, enmarcando la cámara con las manos",
    },
    caption: { en: "That's me", es: "Ese soy yo" },
  },
  ticket: {
    from: { code: "COL", place: { en: "Colombia", es: "Colombia" } },
    to: { code: "VLC", place: { en: "Valencia, Spain", es: "Valencia, España" } },
    details: [
      { en: "One way", es: "Solo ida" },
      { en: "Jun 2026", es: "Jun 2026" },
    ],
  },
  // The rocket and the envelope open the roadmap and the letter in v11 (HU-10); until those exist they only rest.
  rocket: {
    title: { en: "Roadmap", es: "Roadmap" },
    text: { en: "Senior → Staff, step by step", es: "Senior → Staff, paso a paso" },
  },
  envelope: {
    to: { en: "for you", es: "para ti" },
  },
  vinyl: {
    title: "Unicornio",
    artist: "Nanpa Básico",
    label: {
      en: "Play Unicornio by Nanpa Básico",
      es: "Reproducir Unicornio de Nanpa Básico",
    },
    // "Buena Energía", from the album Unicornio.
    spotify: "spotify:track:4v0QUhYPnfCgQXCGGQv7bW",
  },
  naruto: {
    title: { en: "Favorite anime", es: "Anime favorito" },
    text: {
      en: "Naruto. Shippuden is my favorite era.",
      es: "Naruto. Shippuden es mi etapa favorita.",
    },
  },
  lol: {
    title: { en: "League of Legends", es: "League of Legends" },
    text: { en: "ADC main. Lucian or Camille.", es: "Main ADC. Lucian o Camille." },
  },
  pole: {
    label: {
      en: "Card: pole sport. Flip to see a photo",
      es: "Tarjeta: pole sport. Dale la vuelta para ver una foto",
    },
    title: { en: "Pole sport", es: "Pole sport" },
    text: {
      en: "Strength, patience and a lot of falling. Flip it.",
      es: "Fuerza, paciencia y muchas caídas. Dale la vuelta.",
    },
    alt: {
      en: "Jouler holding a horizontal pole sport figure in a studio",
      es: "Jouler sosteniendo una figura horizontal de pole sport en un estudio",
    },
  },
};
