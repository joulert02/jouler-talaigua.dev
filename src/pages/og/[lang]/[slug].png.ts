import type { APIRoute, GetStaticPaths } from "astro";
import { renderOg } from "@/lib/og";
import { ui, type Lang } from "@/i18n/ui";

export const getStaticPaths = (() => {
  const langs: Lang[] = ["en", "es"];
  const paths = [];
  for (const lang of langs) {
    paths.push({
      params: { lang, slug: "home" },
      props: { title: ui[lang]["home.title"], kicker: "jouler.dev" },
    });
    paths.push({
      params: { lang, slug: "more-about-me" },
      props: { title: ui[lang]["layout.about"], kicker: "jouler.dev" },
    });
    paths.push({
      params: { lang, slug: "work" },
      props: { title: ui[lang]["work.heading"], kicker: "jouler.dev" },
    });
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as { title: string; kicker: string });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
