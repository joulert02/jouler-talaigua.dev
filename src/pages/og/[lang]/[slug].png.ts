import type { APIRoute, GetStaticPaths } from "astro";
import { renderOg } from "@/lib/og";
import { getProjects, slugOf } from "@/lib/content";
import { ui, type Lang } from "@/i18n/ui";

const kicker = new URL(import.meta.env.SITE).host;

export const getStaticPaths = (async () => {
  const langs: Lang[] = ["en", "es"];
  const paths = [];
  for (const lang of langs) {
    paths.push({
      params: { lang, slug: "home" },
      props: { title: ui[lang]["home.title"], kicker },
    });
    paths.push({
      params: { lang, slug: "more-about-me" },
      props: { title: ui[lang]["layout.about"], kicker },
    });
    paths.push({
      params: { lang, slug: "work" },
      props: { title: ui[lang]["work.heading"], kicker },
    });
    // One per built case; a coming case shares the Work image (WorkCaseComing).
    for (const { id, data } of await getProjects(lang)) {
      if (data.case === "live")
        paths.push({ params: { lang, slug: slugOf(id) }, props: { title: data.title, kicker } });
    }
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as { title: string; kicker: string });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
