// Copy for ProductShot. Draft for the owner's review (2026-11-23 restructure of the Bancolombia case).
import type { Lang } from "../../../../i18n/ui";

export const productUrl = "https://svpersonas.apps.bancolombia.com/autenticacion";

export const productShotCopy = {
  en: {
    alt: "Sucursal Virtual Personas after signing in: the greeting, the most-used transactions, the accounts with their balance hidden, and recommendations.",
    live: "See it live",
  },
  es: {
    alt: "La Sucursal Virtual Personas después de iniciar sesión: el saludo, las transacciones más usadas, las cuentas con el saldo oculto y las recomendaciones.",
    live: "Ver en vivo",
  },
} as const satisfies Record<Lang, Record<string, string>>;
