import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";
import { renderOg, type OgCard } from "@/lib/og";
import { getProjects, slugOf } from "@/lib/content";
import { identity } from "@/config/profile";
import { ui, type Lang } from "@/i18n/ui";

// One share image per page type (HU-11): the Home, the Work hub, "More about me" and each built case. A coming case,
// the 404 and any other page share the Work or Home image.
export const getStaticPaths = (async () => {
  const langs: Lang[] = ["en", "es"];
  const paths: { params: { lang: Lang; slug: string }; props: OgCard }[] = [];
  for (const lang of langs) {
    const t = ui[lang];
    const byline = `${identity.brand.name} · ${identity.role[lang]}`;
    const projects = await getProjects(lang);
    const live = projects.filter(({ data }) => data.case === "live");
    const about = await getEntry("pages", `${lang}/more-about-me`);
    paths.push({
      params: { lang, slug: "home" },
      props: {
        kicker: "JOTA",
        title: identity.brand.name,
        summary: identity.sentence[lang],
        byline: identity.role[lang],
      },
    });
    paths.push({
      params: { lang, slug: "work" },
      props: {
        kicker: t["dock.work"],
        title: t["work.heading"],
        summary: [...new Set(live.map(({ data }) => data.company.split(" · ")[0]))].join(" · "),
        byline,
      },
    });
    paths.push({
      params: { lang, slug: "more-about-me" },
      props: {
        kicker: t["layout.about"],
        title: identity.brand.name,
        summary: about?.data.description,
        byline: identity.role[lang],
      },
    });
    for (const { id, data } of live) {
      paths.push({
        params: { lang, slug: slugOf(id) },
        props: {
          kicker: data.company,
          title: data.title,
          summary: data.summary,
          byline,
        },
      });
    }
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as OgCard);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
