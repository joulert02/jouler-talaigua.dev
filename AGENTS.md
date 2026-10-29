# jouler-talaigua.dev · instrucciones del repositorio

Base técnica compartida, ampliable por el propietario. Lee `README.md`, `docs/discovery-brief.md` y `docs/adr/001-stack.md` antes de trabajar.

- El stack aceptado es Astro con TypeScript estricto, MDX y content collections. Consulta `package.json` para versiones y comandos actuales. No reemplazarlo por una propuesta antigua del roadmap.
- Inglés en raíz y español bajo `/es/`. Respeta ambas versiones y la separación entre vistas, rutas, contenido y traducciones.
- Chrome del sitio en vanilla; React solo cuando la interacción lo justifique, según el ADR. Revisa la configuración y las instrucciones más específicas del directorio que vayas a modificar.
- El producto actual es una base/spike con contenido pendiente. No presentar un sitemap previsto, un borrador o los resultados históricos del spike como publicación o validación actual.
- No inventar hechos, métricas, permisos ni datos personales. Conservar `TODO(verify)` hasta confirmar el contenido. La comprobación estricta del script de placeholders bloquea publicaciones con esos marcadores; revisar también placeholders sin marcador.
- Usa los scripts de `package.json` apropiados al cambio. No ejecutar `format` sobre todo el repo durante una revisión de memoria ni instalar dependencias o alterar producto por una tarea pendiente no solicitada.
- Revisa y conserva los cambios locales. Ejecuta comandos de código, pruebas y Git desde este repo. El brief documenta ramas `claude/*` y merge del propietario a `main`; no hacer merge, commit, push, despliegues, compras ni publicaciones sin autorización.
- Mantener el contexto personal fuera de documentación compartida. Las reglas técnicas adicionales se completan progresivamente.
