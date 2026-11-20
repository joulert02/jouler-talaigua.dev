// Copy of the Home desk's objects (HU-02), in both languages. Board.astro places each object; this file only
// holds what the objects say. English comes from the sealed v11 design (docs/design/v11/app.js), except the ticket,
// which follows the Ticket story (Colombia to Valencia). Spanish is a draft translation until reviewed.
import type { LocalizedText } from "./profile";

/** The note on the back of a card. */
interface Note {
  title: LocalizedText;
  text: LocalizedText;
}

export const desk = {
  moto: {
    label: {
      en: "Photo: on a motorbike trip in the Colombian mountains",
      es: "Foto: en un viaje en moto por las montañas de Colombia", // TODO(verify)
    },
    alt: {
      en: "Jouler in riding gear next to his motorbike on a wet mountain road",
      es: "Jouler con equipo de moto junto a su moto en una carretera de montaña mojada", // TODO(verify)
    },
    caption: { en: "Road trip · Colombia", es: "Viaje en moto · Colombia" }, // TODO(verify)
    note: {
      title: { en: "Two wheels, long roads.", es: "Dos ruedas, carreteras largas." }, // TODO(verify)
      text: {
        en: "Riding is how I reset. Rain included.",
        es: "Montar en moto es como desconecto. Lluvia incluida.", // TODO(verify)
      },
    } satisfies Note,
  },
  teach: {
    label: {
      en: "Photo: giving a talk at a university",
      es: "Foto: dando una charla en una universidad", // TODO(verify)
    },
    alt: {
      en: "Jouler giving a talk in a university classroom",
      es: "Jouler dando una charla en un aula universitaria", // TODO(verify)
    },
    caption: { en: "Teaching · 2025", es: "Enseñando · 2025" }, // TODO(verify)
    note: {
      title: { en: "I teach what I learn.", es: "Enseño lo que aprendo." }, // TODO(verify)
      text: {
        en: "Guest lectures at universities and a semester teaching at SENA.",
        es: "Charlas como invitado en universidades y un semestre como profesor en el SENA.", // TODO(verify)
      },
    } satisfies Note,
  },
  portrait: {
    label: {
      en: "Photo: Jouler framing the camera with his hands",
      es: "Foto: Jouler enmarcando la cámara con las manos", // TODO(verify)
    },
    alt: {
      en: "Jouler smiling, framing the camera with his hands",
      es: "Jouler sonriendo, enmarcando la cámara con las manos", // TODO(verify)
    },
    caption: { en: "That's me", es: "Ese soy yo" }, // TODO(verify)
    note: {
      title: { en: "Hi, I'm Jouler.", es: "Hola, soy Jouler." }, // TODO(verify)
      text: {
        en: "Started in QA, now a senior engineer. Still curious.",
        es: "Empecé en QA y hoy soy ingeniero senior. Sigo con curiosidad.", // TODO(verify)
      },
    } satisfies Note,
  },
  ticket: {
    label: { en: "Ticket from Colombia to Valencia", es: "Billete de Colombia a Valencia" }, // TODO(verify)
    from: { code: "COL", place: { en: "Colombia", es: "Colombia" } },
    to: { code: "VLC", place: { en: "Valencia, Spain", es: "Valencia, España" } }, // TODO(verify)
    details: [
      { en: "One way", es: "Solo ida" }, // TODO(verify)
      { en: "Jun 2026", es: "Jun 2026" }, // TODO(verify)
    ],
    note: {
      title: { en: "From Colombia to Spain.", es: "De Colombia a España." }, // TODO(verify)
      text: {
        en: "Working remotely across Latin America and Europe, on CET.",
        es: "Trabajo en remoto entre Latinoamérica y Europa, en horario CET.", // TODO(verify)
      },
    } satisfies Note,
  },
  // The rocket and the envelope open the roadmap and the letter in v11 (HU-10); until those exist they only rest.
  rocket: {
    title: { en: "Roadmap", es: "Hoja de ruta" }, // TODO(verify)
    text: { en: "Senior → Staff, step by step", es: "Senior → Staff, paso a paso" }, // TODO(verify)
  },
  envelope: {
    to: { en: "for you", es: "para ti" }, // TODO(verify)
  },
  vinyl: {
    title: "Unicornio",
    artist: "Nanpa Básico",
    label: {
      en: "Play Unicornio by Nanpa Básico",
      es: "Reproducir Unicornio de Nanpa Básico", // TODO(verify)
    },
    // "Buena Energía", from the album Unicornio.
    spotify: "spotify:track:4v0QUhYPnfCgQXCGGQv7bW",
  },
  naruto: {
    label: { en: "Card: favorite anime, Naruto", es: "Tarjeta: anime favorito, Naruto" }, // TODO(verify)
    title: { en: "Favorite anime", es: "Anime favorito" }, // TODO(verify)
    text: {
      en: "Naruto. Shippuden is my favorite era.",
      es: "Naruto. Shippuden es mi etapa favorita.", // TODO(verify)
    },
    note: {
      title: { en: "Favorite character: Naruto.", es: "Personaje favorito: Naruto." }, // TODO(verify)
      text: { en: "Favorite era: Shippuden.", es: "Etapa favorita: Shippuden." }, // TODO(verify)
    } satisfies Note,
  },
  lol: {
    label: { en: "Card: League of Legends", es: "Tarjeta: League of Legends" }, // TODO(verify)
    title: { en: "League of Legends", es: "League of Legends" },
    text: { en: "ADC main. Lucian or Camille.", es: "Main ADC. Lucian o Camille." }, // TODO(verify)
    note: {
      title: { en: "Team fights, not solo queue.", es: "Peleas en equipo, no solo queue." }, // TODO(verify)
      text: {
        en: "Favorite champions: Lucian and Camille.",
        es: "Campeones favoritos: Lucian y Camille.", // TODO(verify)
      },
    } satisfies Note,
  },
  pole: {
    label: {
      en: "Card: pole sport. Flip to see a photo",
      es: "Tarjeta: pole sport. Dale la vuelta para ver una foto", // TODO(verify)
    },
    title: { en: "Pole sport", es: "Pole sport" },
    text: {
      en: "Strength, patience and a lot of falling. Flip it.",
      es: "Fuerza, paciencia y muchas caídas. Dale la vuelta.", // TODO(verify)
    },
    alt: {
      en: "Jouler holding a horizontal pole sport figure in a studio",
      es: "Jouler sosteniendo una figura horizontal de pole sport en un estudio", // TODO(verify)
    },
  },
};
