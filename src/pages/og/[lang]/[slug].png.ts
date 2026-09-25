import type { APIRoute, GetStaticPaths } from "astro";
import { renderOg } from "@/lib/og";
import { getProjects, slugOf } from "@/lib/content";
import { ui, type Lang } from "@/i18n/ui";

export const getStaticPaths = (async () => {
  const langs: Lang[] = ["en", "es"];
  const paths = [];
  for (const lang of langs) {
    paths.push({
      params: { lang, slug: "home" },
      props: { title: ui[lang]["home.title"], kicker: "jouler.dev" },
    });
    for (const p of await getProjects(lang)) {
      paths.push({
        params: { lang, slug: slugOf(p.id) },
        props: { title: p.data.title, kicker: ui[lang]["nav.projects"] },
      });
    }
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as { title: string; kicker: string });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
