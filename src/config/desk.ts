// Copy of the Home desk's objects (HU-02), in both languages. Board/layout.ts places each object; this file only
// holds what the objects say. The ten first objects follow the sealed v11 design (docs/design/v11/app.js), except
// the ticket, which follows the Ticket story (Colombia to Valencia). The owner approved the copy on 2026-11-21;
// what is still pending carries a `TODO(verify)` marker.
import type { Lang } from "../i18n/ui";
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
      es: "Foto: en un viaje en moto por las montañas de Colombia",
    },
    alt: {
      en: "Jouler in riding gear next to his motorbike on a wet mountain road",
      es: "Jouler con equipo de moto junto a su moto en una carretera de montaña mojada",
    },
    caption: { en: "Road trip · Colombia", es: "Viaje en moto · Colombia" },
    note: {
      title: { en: "Two wheels, long roads.", es: "Dos ruedas, carreteras largas." },
      text: {
        en: "Riding is how I reset. Rain included.",
        es: "Montar en moto es como desconecto. Lluvia incluida.",
      },
    } satisfies Note,
  },
  portrait: {
    label: { en: "Photo: Jouler smiling at the camera", es: "Foto: Jouler sonriendo a la cámara" },
    alt: { en: "Jouler smiling at the camera", es: "Jouler sonriendo a la cámara" },
    caption: { en: "That's me", es: "Ese soy yo" },
    note: {
      title: { en: "Hi, I'm Jouler.", es: "Hola, soy Jouler." },
      text: {
        en: "Started in QA, now a senior engineer. Still curious.",
        es: "Empecé en QA y hoy soy ingeniero senior. Sigo con curiosidad.",
      },
    } satisfies Note,
  },
  // The ticket does not flip for now: its label and note wait here until it does.
  ticket: {
    label: { en: "Ticket from Colombia to Valencia", es: "Billete de Colombia a Valencia" },
    from: { code: "COL", place: { en: "Colombia", es: "Colombia" } },
    to: { code: "VLC", place: { en: "Valencia, Spain", es: "Valencia, España" } },
    details: [
      { en: "One way", es: "Solo ida" },
      { en: "Jun 2026", es: "Jun 2026" },
    ],
    note: {
      title: { en: "From Colombia to Spain.", es: "De Colombia a España." },
      text: {
        en: "Working remotely across Latin America and Europe, on CET.",
        es: "Trabajo en remoto entre Latinoamérica y Europa, en horario CET.",
      },
    } satisfies Note,
  },
  // The rocket and the envelope open the roadmap and the letter in v11 (HU-10); until those exist the rocket only
  // rests and the envelope only opens to show a blank letter.
  rocket: {
    title: { en: "Roadmap", es: "Roadmap" },
    text: { en: "Senior → Staff Engineer\nstep by step", es: "Senior → Staff Engineer\npaso a paso" },
  },
  envelope: {
    to: { en: "for you", es: "para ti" },
    label: { en: "Open the letter", es: "Abrir la carta" },
  },
  vinyl: {
    title: "Unicornio",
    artist: "Nanpa Básico",
    label: {
      en: "Play Unicornio by Nanpa Básico",
      es: "Reproducir Unicornio de Nanpa Básico",
    },
    // The whole album Unicornio.
    spotify: "spotify:album:4Ff07AMyi4ZUOORYUZpN9c",
  },
  naruto: {
    label: { en: "Card: favorite anime, Naruto", es: "Tarjeta: anime favorito, Naruto" },
    title: { en: "Favorite anime", es: "Anime favorito" },
    text: {
      en: "Naruto. Shippuden is my favorite era.",
      es: "Naruto. Shippuden es mi etapa favorita.",
    },
    note: {
      title: { en: "Favorite character: Naruto.", es: "Personaje favorito: Naruto." },
      text: { en: "Favorite era: Shippuden.", es: "Etapa favorita: Shippuden." },
    } satisfies Note,
  },
  lol: {
    label: { en: "Card: League of Legends", es: "Tarjeta: League of Legends" },
    title: { en: "League of Legends", es: "League of Legends" },
    text: { en: "ADC main. Lucian or Camille.", es: "Main ADC. Lucian o Camille." },
    note: {
      title: { en: "Team fights, not solo queue.", es: "Peleas en equipo, no solo queue." },
      text: {
        en: "Favorite champions: Lucian and Camille.",
        es: "Campeones favoritos: Lucian y Camille.",
      },
    } satisfies Note,
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
  talks: {
    label: { en: "Flip through photos of me teaching", es: "Pasa las fotos de mis clases" },
    // {n} and {total} are replaced with the print's place in the stack.
    caption: { en: "Teaching · {n} of {total}", es: "Clases · {n} de {total}" },
  },
  pet: {
    label: { en: "Talk to JOTA Pet", es: "Habla con JOTA Pet" },
    lines: [
      { en: "Hi. I'm JOTA Pet.", es: "Hola. Soy JOTA Pet." },
      {
        en: "On Jouler's Mac I float over the screen and keep today's plan in order.",
        es: "En el Mac de Jouler floto sobre la pantalla y mantengo en orden el plan del día.",
      },
      {
        en: "He built me in November 2026 to stay on plan. It mostly works.",
        es: "Me construyó en noviembre de 2026 para no salirse del plan. Casi siempre funciona.",
      },
    ],
  },
  mascot: {
    label: { en: "The co-author of this site", es: "El coautor de este sitio" },
    role: { en: "Co-author", es: "Coautor" },
    lines: [
      {
        title: { en: "Co-author.", es: "Coautor." },
        text: {
          en: "Jouler directs and decides; I draft, build and check.",
          es: "Jouler dirige y decide; yo redacto, construyo y reviso.",
        },
      },
      {
        title: { en: "It is on the record.", es: "Consta en el historial." },
        text: {
          en: "Every commit I work on carries a Co-Authored-By line.",
          es: "Cada commit en el que trabajo lleva una línea Co-Authored-By.",
        },
      },
      {
        title: { en: "This desk too.", es: "Este escritorio también." },
        text: {
          en: "The objects around you started as proposals we went through together.",
          es: "Los objetos que te rodean empezaron como propuestas que revisamos juntos.",
        },
      },
    ],
  },
  lamp: {
    label: {
      en: "Pull the cord to switch between light and dark",
      es: "Tira del cordón para cambiar entre claro y oscuro",
    },
    title: { en: "Lights out.", es: "Luces fuera." },
    text: {
      en: "The whole site has a dark theme. Pull again to switch back.",
      es: "Todo el sitio tiene un tema oscuro. Tira otra vez para volver.",
    },
  },
  bugJar: {
    name: { en: "bugs", es: "bugs" },
    catchLabel: { en: "Catch the bug", es: "Atrapa el bug" },
    releaseLabel: {
      en: "Bug jar: open it to let the bug go",
      es: "Tarro de bugs: ábrelo para soltar el bug",
    },
    title: { en: "Caught.", es: "Atrapado." },
    text: {
      en: "I started in QA in 2019, breaking other people's code. Press the jar to let it go.",
      es: "Empecé en QA en 2019, rompiendo el código de otros. Pulsa el tarro para soltarlo.",
    },
  },
  // {name} is replaced with the tool's name.
  sticker: { label: { en: "{name} sticker", es: "Sticker de {name}" } },
  // The other records. {title} and {artist} are replaced; titles and artists are as Spotify lists them.
  records: {
    label: { en: "Play {title} by {artist}", es: "Reproducir {title} de {artist}" },
    greenPrint: {
      title: "EL GREEN PRINT: La Saga (Disc 2)",
      artist: "Feid",
      spotify: "spotify:album:5lKHDf06WmHx6pN2K4phgh",
    },
    jazz: { title: "Don't Stop Me Now", artist: "Queen", spotify: "spotify:track:0UYjjEcUPvnYnZhD7rDGwL" },
    piex: { title: "50 MIL PIEX", artist: "Feid & Granuja", spotify: "spotify:track:7gSrtsnkzmO9bbDcEN3nz0" },
    impulsos: { title: "Impulsos", artist: "Isaac S.A", spotify: "spotify:track:684u5ae03t0QWIB1W65cFL" },
  },
  passport: {
    label: { en: "Open the passport", es: "Abrir el pasaporte" },
    cover: { en: "PASSPORT", es: "PASAPORTE" },
    route: "MDE · MAD · VLC",
    // Sample stamps: nothing records yet what a visitor found, so the first five show as earned.
    stamps: ["01", "03", "04", "05", "7A", "7B", "08", "09", "10", "11", "12", "13", "19"],
    found: 5,
  },
  bookShelf: {
    heading: { en: "MY REVIEW", es: "MI RESEÑA" },
    bookplate: "ex libris · JOTA",
    takeLabel: { en: "Take {title} off the shelf", es: "Sacar {title} del estante" },
    returnLabel: { en: "Put {title} back on the shelf", es: "Devolver {title} al estante" },
    bookLabel: { en: "{title}: open or close the book", es: "{title}: abrir o cerrar el libro" },
    // What Jouler wrote about each book, by its key in BoardObjects.astro. He wrote them in Spanish.
    reviews: {
      howToKnowAPerson: {
        en: "If anyone knows what it's about, tell me. I still don't know.",
        es: "Si alguien sabe de qué se trata, dígame; todavía no sé.",
      },
      elPrincipito: {
        en: "We all have an inner child. Let's not let it die.",
        es: "Todos tenemos un niño interior, no lo dejemos morir.",
      },
      comoGanarAmigos: {
        en: "Let's learn to communicate, let's learn to be more human.",
        es: "Aprendamos a comunicarnos, aprendamos a ser más humanos.",
      },
      elKybalion: {
        en: "We have all asked ourselves the whys. A great tool to stop asking.",
        es: "Todos nos hemos preguntado los porqués; gran herramienta para dejar de preguntárselos.",
      },
      patronesDeDiseno: {
        en: "One of the least boring technical books I have read.",
        es: "De los libros técnicos menos aburridos que he leído.",
      },
    },
  },
  sketchbook: {
    label: { en: "Sketch pad: draw with the pointer", es: "Bloc de dibujo: dibuja con el puntero" },
    caption: { en: "Learning to draw. Your turn.", es: "Aprendiendo a dibujar. Te toca." },
    clear: { en: "Clear", es: "Borrar" },
  },
  nowNotes: {
    label: {
      en: "Peel the top note to see what I am learning now",
      es: "Despega la nota de arriba para ver qué estoy aprendiendo ahora",
    },
    // {n} and {total} are replaced with the note's place in the pad.
    tag: { en: "NOW · {n}/{total}", es: "AHORA · {n}/{total}" },
    notes: [
      { en: "Backend depth: Java & Spring Boot", es: "Profundidad en backend: Java y Spring Boot" },
      { en: "Algorithms: NeetCode 150", es: "Algoritmos: NeetCode 150" },
      { en: "English, on the way to B2", es: "Inglés, camino al B2" },
      { en: "Learning to draw", es: "Aprendiendo a dibujar" },
    ],
  },
  bonsai: {
    label: { en: "Grow the binary tree", es: "Haz crecer el árbol binario" },
    count: { en: "{count} nodes.", es: "{count} nodos." },
    text: {
      en: "Algorithms practice: I grow it one problem at a time. Press again to keep growing.",
      es: "Práctica de algoritmos: lo hago crecer un problema a la vez. Pulsa otra vez para que siga creciendo.",
    },
  },
  coffee: {
    beans: {
      label: {
        en: "Bag of coffee beans: pour them into the grinder",
        es: "Bolsa de café en grano: échalo en el molino",
      },
    },
    grinder: {
      label: {
        en: "Coffee grinder: press and hold to grind",
        es: "Molino de café: mantén pulsado para moler",
      },
      notes: {
        empty: {
          title: { en: "The grinder is empty.", es: "El molino está vacío." },
          text: { en: "Drop the bag of beans on it first.", es: "Primero suelta la bolsa de café encima." },
        },
        beans: {
          title: { en: "Beans in.", es: "Café dentro." },
          text: { en: "Press and hold the grinder.", es: "Mantén pulsado el molino." },
        },
        ground: {
          title: { en: "Ground and ready.", es: "Molido y listo." },
          text: { en: "Now pour it over the dripper.", es: "Ahora viértelo sobre el gotero." },
        },
      },
    },
    // The dripper only brews ground coffee: pressed before that, it says how a V60 is made.
    pourOver: {
      label: {
        en: "Brew a V60 coffee: press and hold to pour",
        es: "Prepara un café en V60: mantén pulsado para verter",
      },
      recipe: {
        title: { en: "A V60 in three steps.", es: "Una V60 en tres pasos." },
        text: {
          en: "1. Pour the beans into the grinder. 2. Hold the grinder to grind them. 3. Hold the dripper to pour the water.",
          es: "1. Echa el café en el molino. 2. Mantén pulsado el molino para molerlo. 3. Mantén pulsado el gotero para verter el agua.",
        },
      },
      title: { en: "Well done!", es: "¡Bien hecho!" },
      text: { en: "Now you know how to brew a V60.", es: "Ahora sabes preparar una V60." },
    },
  },
  narutoSticker: {
    label: {
      en: "Naruto, my favorite anime: press to change what he is doing",
      es: "Naruto, mi anime favorito: pulsa para cambiar lo que hace",
    },
    title: { en: "Favorite anime: Naruto.", es: "Anime favorito: Naruto." },
    text: {
      en: "Shippuden is my favorite era. Go watch it.",
      es: "Shippuden es mi etapa favorita. Ve a verlo.",
    },
    credit: {
      en: "Naruto © Masashi Kishimoto / Shueisha. Fan sprite by IhakaUtu, from the codex-pets.net community gallery.",
      es: "Naruto © Masashi Kishimoto / Shueisha. Sprite de fan por IhakaUtu, de la galería de la comunidad codex-pets.net.",
    },
  },
  ramen: {
    label: { en: "Bowl of ramen: slurp it", es: "Tazón de ramen: sórbelo" },
    eating: {
      one: {
        title: { en: "Itadakimasu.", es: "Itadakimasu." },
        text: { en: "{left} more slurp to go.", es: "Queda {left} sorbo." },
      },
      other: {
        title: { en: "Itadakimasu.", es: "Itadakimasu." },
        text: { en: "{left} more slurps to go.", es: "Quedan {left} sorbos." },
      },
    },
    empty: {
      title: { en: "Empty.", es: "Vacío." },
      text: {
        en: "Ichiraku would be proud. Press for another bowl.",
        es: "Ichiraku estaría orgulloso. Pulsa para otro tazón.",
      },
    },
  },
  silks: {
    label: { en: "Play the aerial silks sequence", es: "Reproduce la secuencia de telas aéreas" },
    title: { en: "Aerial silks.", es: "Telas aéreas." },
    text: {
      en: "Where I stop thinking in numbers. Strength, patience and trusting the knot.",
      es: "Donde dejo de pensar en números. Fuerza, paciencia y confiar en el nudo.",
    },
  },
  boxing: {
    bagLabel: { en: "Punching bag: hit it", es: "Saco de boxeo: golpéalo" },
    board: {
      start: { en: "Hit the bag to start", es: "Golpea el saco para empezar" },
      score: { en: "{score} pts", es: "{score} pts" },
      combo: { en: "{score} pts · combo ×{streak}", es: "{score} pts · combo ×{streak}" },
      result: { en: "{score} points · best {best}", es: "{score} puntos · récord {best}" },
    },
    gloveLabel: { en: "Punch", es: "Golpear" },
    hits: {
      one: { en: "{count} hit!", es: "¡{count} golpe!" },
      other: { en: "{count} hits!", es: "¡{count} golpes!" },
    },
    text: {
      en: "I built Stream Fighters, a web boxing game played live at an event in November 2026.",
      es: "Construí Stream Fighters, un juego web de boxeo que se jugó en vivo en un evento en noviembre de 2026.",
    },
  },
  parade: {
    label: { en: "Start the Colombia parade", es: "Inicia el desfile de Colombia" },
    scenes: [
      "Feria de las Flores · Medellín",
      "Feria de Cali",
      "Carnaval de Barranquilla",
      "Sierra Nevada de Santa Marta",
      "Amo a mi Colombia",
    ] as const,
    sound: {
      off: { en: "Sound off", es: "Sonido apagado" },
      on: { en: "Sound on", es: "Sonido encendido" },
    },
  },
};

/** The same tree with every text in one language. */
type Localized<T> = T extends LocalizedText
  ? string
  : T extends readonly (infer Item)[]
    ? Localized<Item>[]
    : T extends object
      ? { [Key in keyof T]: Localized<T[Key]> }
      : T;

const isText = (value: object): value is LocalizedText =>
  "en" in value && "es" in value && Object.keys(value).length === 2;

/** `copy` with every `{ en, es }` replaced by its text in `lang`; everything else stays as it is. */
export function localized<T>(copy: T, lang: Lang): Localized<T> {
  const walk = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(walk);
    if (typeof value !== "object" || value === null) return value;
    if (isText(value)) return value[lang];
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, walk(item)]));
  };
  return walk(copy) as Localized<T>;
}
