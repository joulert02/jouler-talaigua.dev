// Copy for TenaPlayground, approved with the case (v11 page). The interface is a recreation of TENA's site, translated
// from Spanish in English. Everything shown inside it is placeholder test content: the Academy titles, dates and
// speaker are generic, and the images are abstract gradients generated for this project (no photos from the site).
import type { ImageMetadata } from "astro";
import type { Lang } from "../../../../i18n/ui";
import article1Card from "../../../../assets/projects/pragma/tena/academy-article-1-card.jpg";
import article1Hero from "../../../../assets/projects/pragma/tena/academy-article-1-hero.jpg";
import article1HeroMobile from "../../../../assets/projects/pragma/tena/academy-article-1-hero-mobile.jpg";
import article2Card from "../../../../assets/projects/pragma/tena/academy-article-2-card.jpg";
import article2Hero from "../../../../assets/projects/pragma/tena/academy-article-2-hero.jpg";
import article2HeroMobile from "../../../../assets/projects/pragma/tena/academy-article-2-hero-mobile.jpg";
import liveCard from "../../../../assets/projects/pragma/tena/academy-live-card.jpg";

/** Each screen's page on the live site; "See it live" follows the screen picked. */
export const tenaUrls = {
  registration: "https://www.tena.com.co/registro/",
  academy: "https://www.tena.com.co/academia-tena/",
} as const;

/** The user types on the registration's first step; `icon` picks the drawing in TenaPlayground. */
export type TenaUserIcon = "user" | "buyer" | "caregiver" | "institution";

/** An Academy card, as on the site: an article opens with a photo banner, a live with its video. */
export type TenaCard =
  | {
      format: "article";
      /** The card image (16:9), a generated placeholder. */
      image: ImageMetadata;
      /** The article's banner: wide from 720px, `mobile` below. */
      hero: { wide: ImageMetadata; mobile: ImageMetadata };
    }
  | {
      format: "live";
      /** The card image, also the video's poster in the opened view. */
      image: ImageMetadata;
    };

export const tenaCards: readonly TenaCard[] = [
  { format: "article", image: article1Card, hero: { wide: article1Hero, mobile: article1HeroMobile } },
  { format: "article", image: article2Card, hero: { wide: article2Hero, mobile: article2HeroMobile } },
  { format: "live", image: liveCard },
];

export const tenaCopy = {
  en: {
    label: "Recreation of the shipped screens · not TENA code",
    screen: "Screen",
    registration: "Registration",
    screenAcademy: "Academy",
    hint: "Pick a user type, try A− / A+, or open an article and a live session.",
    region: "Recreation of the TENA site",
    demo: "Demo: nothing is sent or stored.",
    smaller: "Smaller text",
    larger: "Larger text",
    textSize: "Text size",
    welcome: "Welcome to TENA,",
    signUp: "Sign up if you don't have an account yet.",
    pick: "Select the type of user you are, or the one you identify with most.",
    types: [
      { icon: "user", title: "I'M A USER", text: "I use and buy TENA products." },
      { icon: "buyer", title: "I'M A BUYER", text: "I buy TENA products for someone else." },
      { icon: "caregiver", title: "I'M A CAREGIVER", text: "I buy TENA products for the person I care for." },
      {
        icon: "institution",
        title: "I'M AN INSTITUTION",
        text: "I work at an institution as the person in charge.",
      },
    ],
    details:
      "Enter your details to sign up, or to check whether you're already in our community. (*) Required fields.",
    fields: ["Document type *", "Document number *", "Your email *", "Your mobile number *"],
    terms: ["I have read the ", "terms and conditions", " and agree to join the TENA benefits programme."],
    privacy: ["I have read and authorise the ", "processing of my personal data", "."],
    legal:
      "Under Colombia's Habeas Data law, I authorise Essity to process my data in order to contact me through instant messaging (WhatsApp or similar), social networks, email or post, for surveys about products…",
    back: "Back",
    next: "Next",
    /** The link at the top of the registration photo. */
    home: "Back to home",
    help: "Need help with your registration?",
    promo: ["Try our products by requesting your ", "Free sample"],
    /** The promo's opening on phones, as on the site. */
    promoShort: "Request your ",
    search: "What are you looking for? Let us help",
    logIn: "Log in",
    register: "Sign up",
    nav: ["Products", "Advice", "Incontinence", "TENA Academy"],
    tabs: ["Shop", "Free sample"],
    bar: ["Home", "Search", "Free sample", "Shop", "Menu"],
    academy: "TENA Academy",
    designed: "Content designed for you",
    cards: [
      {
        category: "Self-care, health and wellbeing",
        kind: "Article",
        title: "Sample article title: a short test guide for every day",
        who: "TENA",
        when: "12 March 2026",
        stamp: "12/MAR/2026",
        open: "Read article",
      },
      {
        category: "Self-care, health and wellbeing",
        kind: "Article",
        title: "Second sample article: what this test topic is about",
        who: "TENA",
        when: "12 March 2026",
        stamp: "12/MAR/2026",
        open: "Read article",
      },
      {
        category: "Wellbeing",
        kind: "Live",
        title: "Sample live session: a test topic about wellbeing",
        who: "Guest specialist",
        when: "5 February 2026",
        stamp: "05/FEB/2026",
        open: "Watch live",
      },
    ],
    share: "Share",
    like: "Like",
    toList: "Back",
    aboutLive: "About the live",
    aimedAt: "Aimed at:",
    audience: "Caregivers",
    note: "The interface is a recreation of TENA's site, translated from Spanish. Titles, dates, speaker and images are placeholder test content, not TENA's.",
    live: "See it live on TENA",
  },
  es: {
    label: "Recreación de las pantallas publicadas · no es código de TENA",
    screen: "Pantalla",
    registration: "Registro",
    screenAcademy: "Academia",
    hint: "Elige un tipo de usuario, prueba A− / A+, o abre un artículo y un live.",
    region: "Recreación del sitio de TENA",
    demo: "Demo: no se envía ni se guarda nada.",
    smaller: "Texto más pequeño",
    larger: "Texto más grande",
    textSize: "Tamaño del texto",
    welcome: "Bienvenido a TENA,",
    signUp: "Regístrate si aún no tienes una cuenta.",
    pick: "Selecciona qué tipo de usuario eres o con el que mejor te identificas.",
    types: [
      { icon: "user", title: "SOY USUARIO", text: "Uso y compro productos relacionados con TENA." },
      { icon: "buyer", title: "SOY COMPRADOR", text: "Compro productos TENA para alguien más." },
      { icon: "caregiver", title: "SOY CUIDADOR", text: "Compro productos TENA para la persona que cuido." },
      {
        icon: "institution",
        title: "SOY UNA INSTITUCIÓN",
        text: "Trabajo en una institución como encargado.",
      },
    ],
    details:
      "Ingresa tus datos para registrarte o validar si ya existes en nuestra comunidad. (*) Campos obligatorios.",
    fields: ["Tipo de documento *", "Número de documento *", "Ingresa tu correo *", "Ingresa tu celular *"],
    terms: [
      "He leído los ",
      "términos y condiciones",
      " y autorizo hacer parte del programa de beneficios TENA.",
    ],
    privacy: ["He leído y autorizo el ", "tratamiento de mis datos personales", "."],
    legal:
      "De acuerdo a la Ley de Habeas Data, autorizo a Essity para que realice el tratamiento de mis datos con la finalidad de contactarme mediante aplicaciones de mensajería instantánea (WhatsApp o similares), redes sociales, correo electrónico o físico para la realización de encuestas sobre productos…",
    back: "Atrás",
    next: "Siguiente",
    home: "Volver al inicio",
    help: "¿Necesitas ayuda con tu registro?",
    promo: ["Prueba nuestros productos solicitando tu ", "Muestra gratis"],
    promoShort: "Solicita tu ",
    search: "¿Qué estás buscando? Déjanos ayudarte",
    logIn: "Inicia sesión",
    register: "Regístrate",
    nav: ["Productos", "Asesoría", "Incontinencia", "Academia TENA"],
    tabs: ["Comprar", "Muestra gratis"],
    bar: ["Inicio", "Buscar", "Muestra gratis", "Comprar", "Menú"],
    academy: "Academia TENA",
    designed: "Contenido diseñado para ti",
    cards: [
      {
        category: "Autocuidado, salud y bienestar",
        kind: "Artículo",
        title: "Título de artículo de ejemplo: una guía de prueba para el día a día",
        who: "TENA",
        when: "12 de marzo de 2026",
        stamp: "12/MAR/2026",
        open: "Leer artículo",
      },
      {
        category: "Autocuidado, salud y bienestar",
        kind: "Artículo",
        title: "Segundo artículo de ejemplo: de qué trata este tema de prueba",
        who: "TENA",
        when: "12 de marzo de 2026",
        stamp: "12/MAR/2026",
        open: "Leer artículo",
      },
      {
        category: "Bienestar",
        kind: "Live",
        title: "Live de ejemplo: un tema de prueba sobre bienestar",
        who: "Especialista invitada",
        when: "5 de febrero de 2026",
        stamp: "05/FEB/2026",
        open: "Ver live",
      },
    ],
    share: "Compartir",
    like: "Me gusta",
    toList: "Volver",
    aboutLive: "Sobre el live",
    aimedAt: "Dirigido a:",
    audience: "Cuidadores",
    note: "La interfaz es una recreación del sitio de TENA. Títulos, fechas, ponente e imágenes son contenido de prueba, no de TENA.",
    live: "Ver en vivo en TENA",
  },
} as const satisfies Record<Lang, unknown>;
